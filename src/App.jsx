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

function App() {
  const [urlParams, setUrlParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(
    urlParams.get("page") || "home"
  );
  const [lastPage, setPageTo] = useState(urlParams.get("page") || "home");
  const [searchQuery, setSearchQuery] = useState("");
  const [queryResult, setQueryResult] = useState(storeLocation);
  const [currentPin, setCurrentPin] = useState(null);
  const [user, setUser] = useState(null);
  const navRef = useRef();

  const fuse = new Fuse(storeData, {
    keys: ["namaToko"],
    threshold: 0.3,
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        if (lastPage === "login" || lastPage === "daftar") {
          setLastPage("home");
        }
        const snapshot = await get(ref(db, `admin/${currentUser.uid}`));
        console.log(snapshot);
        const isAdmin = snapshot.exists();
        setUser({ ...currentUser, admin: isAdmin });
      } else {
        console.log("Belum login");
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
    } else setQueryResult(storeLocation);
  };

  const setLastPage = (p) => {
    setUrlParams({ page: p });
  };

  useEffect(() => {
    const paramLastPage = urlParams.get("page") || "home";
    console.log("cek:", lastPage === paramLastPage, {
      lastPage,
      paramLastPage,
    });
    if (lastPage === (urlParams.get("page") || "home")) return;
    setPageTo(urlParams.get("page") || "home");
    setCurrentPage(urlParams.get("page") || "home");
    setCurrentPin(null);
  }, [urlParams]);

  const navButtonAction = {
    navButton: [],
    navAuthButton: [
      () => {
        console.log("is called");
        setCurrentPage("login");
        setLastPage("login");
      },
      () => {
        console.log("is called");
        setCurrentPage("daftar");
        setLastPage("daftar");
      },
    ],
  };

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
            />
            <Maps
              lastPage={lastPage}
              queryResult={queryResult}
              setCurrentPin={setCurrentPin}
              windowSize={windowSize}
            />
            <LandingPage
              user={user}
              setLastPage={setLastPage}
              lastPage={lastPage}
              buttonOneOnClick={() => {
                console.log("is called");
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
