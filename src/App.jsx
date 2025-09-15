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
import { getStoreData } from "./service/crudDB.js";
import AboutUsPage from "./page/AboutUsPage.jsx";

function App() {
  const [urlParams, setUrlParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(
    urlParams.get("page") || "home"
  );
  const [loading, setLoading] = useState(true);
  const [storeData, setStoreData] = useState(null);
  const [lastPage, setPageTo] = useState(urlParams.get("page") || "home");
  const [searchQuery, setSearchQuery] = useState("");
  const [queryResult, setQueryResult] = useState(storeData);
  const [currentPin, setCurrentPin] = useState(null);
  const [user, setUser] = useState(null);
  const navRef = useRef();
  const [fuse, setFuse] = useState(null);

  useEffect(() => {
    if (lastPage === "about") {
      document.body.style.overflowY = "auto";
      document.body.style.height = "auto";
    }
  }, [lastPage]);

  useEffect(() => {
    if (!storeData) {
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
        keys: ["namaToko", "product.merek", "product.namaProduk"],
        threshold: 0.3,
      });
      setQueryResult(storeData);
      setFuse(fuse);
    }
    if (fuse && loading) setLoading(false);
  }, [storeData, fuse, loading]);

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

  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useLayoutEffect(() => {
    const handleResize = () =>
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchQuery(value);

    if (value) {
      const result = fuse.search(value).map((r) => r.item);
      setQueryResult(result);
    } else setQueryResult(storeData);
  };

  const setLastPage = (p) => {
    setUrlParams({ page: p });
  };

  useEffect(() => {
    if (lastPage === (urlParams.get("page") || "home")) return;
    setPageTo(urlParams.get("page") || "home");
    setCurrentPage(urlParams.get("page") || "home");
    setCurrentPin(null);
  }, [urlParams]);

  const navButtonAction = {
    navButton: [],
    navAuthButton: [
      () => {
        setCurrentPage("login");
        setLastPage("login");
      },
      () => {
        setCurrentPage("daftar");
        setLastPage("daftar");
      },
    ],
  };

  if (loading) return <></>;

  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <NavBar
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
              buttonOneOnClick={() => {
                setCurrentPage("login");
                setLastPage("login");
              }}
              navRef={navRef}
              windowSize={windowSize}
              fetureCardOnClick={[
                () => {
                  setLastPage("map");
                  setCurrentPage("map");
                },
              ]}
            />
            <AboutUsPage
              user={user}
              setLastPage={setLastPage}
              lastPage={lastPage}
              buttonOneOnClick={() => {
                setCurrentPage("login");
                setLastPage("login");
              }}
              navRef={navRef}
              windowSize={windowSize}
              fetureCardOnClick={[
                () => {
                  setLastPage("map");
                  setCurrentPage("map");
                },
              ]}
            />
            <MapsPage
              dismiss={lastPage !== "map"}
              navRef={navRef}
              currentPin={currentPin}
              windowSize={windowSize}
              setCurrentPin={setCurrentPin}
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
          />
        }
      />
    </Routes>
  );
}

export default App;
