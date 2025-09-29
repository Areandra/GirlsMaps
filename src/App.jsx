import { useEffect, useLayoutEffect, useRef, useState } from "react";
import "./App.css";
import NavBar from "./components/NavBar.jsx";
import LandingPage from "./page/LandingPage.jsx";
import Maps from "./components/Maps.jsx";
import LoginPage from "./page/LoginPage.jsx";
import { Routes, useSearchParams } from "react-router-dom";
import MapsPage from "./page/MapsPage.jsx";
import Fuse from "fuse.js";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./service/firebaseConfig.jsx";
import { get, ref } from "firebase/database";
import { Route } from "react-router-dom";
import DatabaseManagement from "./page/DatabaseManagement.jsx";
import { delUserData, getStoreData, getUserData } from "./service/crudDB.js";
import AboutUsPage from "./page/AboutUsPage.jsx";
import GlobalModal from "./components/Modal.jsx";
import ColorPallate from "./theme/Color.jsx";
import useWindowSize from "./hooks/windowResizer.jsx";
import Loader from "./components/Loader.jsx";

function App() {
  const [urlParams, setUrlParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [storeData, setStoreData] = useState(null);
  const [lastPage, setPageTo] = useState(urlParams.get("page") || "home");
  const [searchQuery, setSearchQuery] = useState("");
  const [queryResult, setQueryResult] = useState(storeData);
  const [notifMassege, setNotifMassege] = useState("");
  const [currentPin, setPin] = useState({});
  const [user, setUser] = useState(null);
  const navRef = useRef();
  const [fuse, setFuse] = useState(null);
  const [updateData, setUpdateData] = useState(false);
  const [updateFS, setUpdateFS] = useState(false);
  const [visibleNotif, setVisibleNotif] = useState(false);
  const windowSize = useWindowSize();
  const [favoriteStore, setFavoriteStore] = useState([]);

  useEffect(() => {
    if (lastPage === "about") {
      document.body.style.overflowY = "auto";
      document.body.style.height = "auto";
    } else {
      window.scrollTo({
        top: 0,
        behavior: "instant",
      });
      document.body.style.overflowY = "hidden";
      document.body.style.height = "100dvh";
    }
  }, [lastPage]);

  useEffect(() => {
    if (user?.uid) {
      const fetchFavoriteStore = async () => {
        try {
          const snaps = await getUserData(user.uid, "favoriteStore");
          const data = Object.values(snaps) || [];
          setFavoriteStore(data);
          setUpdateFS(false);
        } catch (error) {
          console.error(error);
        }
      };
      fetchFavoriteStore();
    }
  }, [user, updateFS]);

  useEffect(() => {
    if (!storeData || updateData) {
      const fetchStoreData = async () => {
        try {
          const snaps = await getStoreData();
          setStoreData(snaps || []);
        } catch (error) {
          console.error(error);
        }
      };
      fetchStoreData();
    } else if (!fuse) {
      const fuse = new Fuse(storeData, {
        keys: ["namaToko", "product.merek", "product.namaProduk", "alamat"],
        threshold: 0.3,
      });
      setQueryResult(storeData);
      setFuse(fuse);
    }
    if (fuse) {
      setLoading(false);
      setUpdateData(false);
    }
  }, [storeData, fuse, loading, updateData]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        if (lastPage === "login" || lastPage === "daftar") {
          setLastPage("home");
        }
        const snapshot = await get(ref(db, `admin/${currentUser.uid}`));
        const isAdmin = snapshot.exists();
        setUser({ ...currentUser, admin: isAdmin });
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, [lastPage]);

  useEffect(() => {
    if (notifMassege) {
      setVisibleNotif(true);
      setTimeout(() => {
        setVisibleNotif(false);
        setTimeout(() => setNotifMassege(""), 300);
      }, 5000);
    }
  }, [notifMassege]);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchQuery(value);

    if (value) {
      const result = fuse.search(value).map((r) => r.item);
      setQueryResult(result);
    } else setQueryResult(storeData);
  };

  const handleDelStorage = async (id) => {
    const res = await delUserData(user.uid, "favoriteStore", id);
    setNotif(res.messege);
    setUpdateFS(true);
  };

  useEffect(() => {
    handleSearch({ target: { value: "" } });
  }, [storeData]);

  const setLastPage = (p) => {
    const newParams = new URLSearchParams(urlParams);
    if (!p) newParams.delete("page");
    else newParams.set("page", p);
    setUrlParams(newParams);
  };

  const setCurrentPin = (p) => {
    const newParams = new URLSearchParams(urlParams);
    newParams.delete("cariToko");

    if (!p) newParams.delete("toko"), newParams.delete("koordinat");
    else {
      newParams.set("page", "map");
      newParams.set("toko", p.namaToko);
      newParams.set("koordinat", p.koordinat.join("_"));
    }
    setUrlParams(newParams);
  };

  useEffect(() => {
    const validPges = ["home", "map", "login", "daftar", "about"];
    const page = urlParams.get("page");

    if (!validPges.includes(page) && page != null) {
      setLastPage("home");
      return;
    }

    const storeName = urlParams.get("toko");
    const coordinates = urlParams.get("koordinat");
    const cariToko = urlParams.get("cariToko");

    setPageTo(page || "home");

    if (page !== "map") {
      setCurrentPin(null);
      return;
    }

    if (!storeData) return;

    let found = null;

    const namaToko = storeName ? decodeURIComponent(storeName) : null;
    const koordinatStr = coordinates ? decodeURIComponent(coordinates) : null;
    const koordinat = koordinatStr ? koordinatStr.split("_").map(Number) : null;
    const cari = cariToko
      ? decodeURIComponent(cariToko).trim().toLowerCase()
      : null;

    if (koordinat) {
      found = storeData.find(
        (i) => i.koordinat?.join("_") === koordinat.join("_")
      );
    }

    if (!found && namaToko) {
      found = storeData.find(
        (i) =>
          i.namaToko?.trim().toLowerCase() === namaToko.trim().toLowerCase()
      );
    }

    if (!found && cari) {
      found = storeData.find(
        (i) =>
          i.namaToko?.trim().toLowerCase() === cari ||
          i.alamat?.trim().toLowerCase() === cari
      );
    }

    const currentPinStr = currentPin ? currentPin.koordinat?.join("_") : null;
    const newPinStr = found ? found.koordinat?.join("_") : null;

    if (currentPinStr !== newPinStr) {
      setPin(found || null);
    }
  }, [urlParams, storeData]);

  const navButtonAction = {
    navButton: [],
    navAuthButton: [
      () => {
        setLastPage("login");
      },
      () => {
        setLastPage("daftar");
      },
    ],  
  };

  const setNotif = (p) => {
    if (notifMassege) return;
    setNotifMassege(p);
  };

  if (loading)
    return (
      <div
        style={{
          scale: 0.5,
          width: "100vw",
          height: "100dvh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "transparent",
        }}
      >
        <Loader />
      </div>
    );

  return (
    <>
      <GlobalModal
        styles={{
          position: "fixed",
          left: "50%",
          bottom: "0px",
          padding: "12px 20px",
          transform: `translateX(-50%) translateY(${
            !visibleNotif ? 100 : -60
          }%)`,
          borderRadius: 12,
          boxShadow: `inset 0 0 0 2px ${ColorPallate.inputBorder}, 0 4px 8px ${ColorPallate.buttonShadow}`,
          gap: 6,
        }}
        visible={visibleNotif}
      >
        <p
          style={{
            fontSize: 12,
            color: "rgba(255, 234, 0, 0.8)",
          }}
        >
          Notification :
        </p>
        <p style={{ fontSize: 12, color: ColorPallate.text }}>{notifMassege}</p>
      </GlobalModal>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <NavBar
                storeData={storeData}
                dismiss={lastPage === "login" || lastPage === "daftar"}
                buttonAction={navButtonAction}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                lastPage={lastPage}
                setLastPage={setLastPage}
                handleSearch={handleSearch}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                navRef={navRef}
                windowSize={windowSize}
                user={user}
                queryResult={queryResult}
                setCurrentPin={setCurrentPin}
                setNotif={setNotif}
                favoriteStore={favoriteStore}
                handleDelStorage={handleDelStorage}
                SetUpdateFS={setUpdateFS}
              />
              <Maps
                lastPage={lastPage}
                queryResult={queryResult}
                setCurrentPin={setCurrentPin}
                windowSize={windowSize}
                currentPin={currentPin}
              />
              <LandingPage
                user={user}
                setLastPage={setLastPage}
                lastPage={lastPage}
                navRef={navRef}
                windowSize={windowSize}
              />
              <AboutUsPage
                user={user}
                setLastPage={setLastPage}
                lastPage={lastPage}
                navRef={navRef}
                windowSize={windowSize}
              />
              <MapsPage
                dismiss={lastPage !== "map"}
                navRef={navRef}
                currentPin={currentPin}
                windowSize={windowSize}
                setCurrentPin={setCurrentPin}
                user={user}
                SetUpdateFS={setUpdateFS}
                setNotif={setNotif}
                favoriteStore={favoriteStore}
              />
              <LoginPage
                lastPage={lastPage}
                slideIn={lastPage === "login" || lastPage === "daftar"}
                setLastPage={setLastPage}
                windowSize={windowSize}
                setUser={setUser}
              />
            </>
          }
        />
        <Route
          path={"/doss/" + user?.uid}
          element={
            <DatabaseManagement
              setUrlParams={setUrlParams}
              urlParams={urlParams}
              dismiss={windowSize.width < 850}
              loading={loading}
              setUpdateData={setUpdateData}
              storeDatas={queryResult}
              setSearchQuery={setSearchQuery}
              searchQuery={searchQuery}
              handleSearch={handleSearch}
              setNotif={setNotif}
            />
          }
        />
      </Routes>
    </>
  );
}

export default App;
