import { useEffect, useLayoutEffect, useRef, useState } from "react";
import "./App.css";
import NavBar from "./components/NavBar.jsx";
import LandingPage from "./page/LandingPage.jsx";
import Maps from "./components/Maps.jsx";
import LoginPage from "./page/LoginPage.jsx";
import { useSearchParams } from "react-router-dom";
import MapsPage from "./page/MapsPage.jsx";
import Fuse from "fuse.js";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./service/firebaseConfig.jsx";
import { get, ref } from "firebase/database";

const storeLocation = [
  { Latitude: -0.8888343, Longitude: 119.877946, NamaTempat: "BNS Zone" },
  { Latitude: -0.8931146, Longitude: 119.8768305, NamaTempat: "Central" },
  {
    Latitude: -0.892791,
    Longitude: 119.876481,
    NamaTempat: "Miracle of beauty (jl.tadulako)",
  },
  {
    Latitude: -0.894745,
    Longitude: 119.873842,
    NamaTempat: "Miracle of Beauty (jl.Sedap Malam)",
  },
  { Latitude: -0.89541, Longitude: 119.876661, NamaTempat: "Mutiara" },
  { Latitude: -0.904135, Longitude: 119.899824, NamaTempat: "Elza" },
  {
    Latitude: -0.921445,
    Longitude: 119.894108,
    NamaTempat: "Ratu Kosmetik",
  },
  {
    Latitude: -0.8996060906082416,
    Longitude: 119.87546712453751,
    NamaTempat: "Palu Make Up",
  },
  {
    Latitude: -0.9031727925294253,
    Longitude: 119.87551520711328,
    NamaTempat: "Ulzzang Beauty Shop",
  },
  {
    Latitude: -0.9064716,
    Longitude: 119.8817745,
    NamaTempat: "Store Beauty Palu",
  },
  { Latitude: -0.9003111, Longitude: 119.8738284, NamaTempat: "Nims" },
  {
    Latitude: -0.9001559,
    Longitude: 119.8746103,
    NamaTempat: "Palu Mitra Utama (Latulipe)",
  },
  {
    Latitude: -0.924577,
    Longitude: 119.895209,
    NamaTempat: "Dobe (jl Dewi Sartika)",
  },
  { Latitude: -0.938144, Longitude: 119.900659, NamaTempat: "Di’Shop" },
  { Latitude: -0.938801, Longitude: 119.900634, NamaTempat: "Gauri Shop" },
  { Latitude: -0.931415, Longitude: 119.884736, NamaTempat: "Beauty Box" },
  { Latitude: -0.923439, Longitude: 119.879338, NamaTempat: "Suso Beauty" },
  {
    Latitude: -0.891926,
    Longitude: 119.855257,
    NamaTempat: "Dobe (jl. Diponegoro)",
  },
  { Latitude: -0.883634, Longitude: 119.842511, NamaTempat: "Sociolla" },
  { Latitude: -0.883521, Longitude: 119.842823, NamaTempat: "Oh Some" },
  { Latitude: -0.883789, Longitude: 119.842419, NamaTempat: "Hypermart" },
  { Latitude: -0.847277, Longitude: 119.882566, NamaTempat: "Mikha Shop" },
  {
    Latitude: -0.880195,
    Longitude: 119.872596,
    NamaTempat: "MS Glow Talise",
  },
  { Latitude: -0.85377, Longitude: 119.88379, NamaTempat: "Ce Arra" },
  {
    Latitude: -0.887125,
    Longitude: 119.884175,
    NamaTempat: "HN Beauty Store",
  },
  {
    Latitude: -0.847973,
    Longitude: 119.891954,
    NamaTempat: "Guzel Cosmetics",
  },
  {
    Latitude: -0.88571,
    Longitude: 119.881915,
    NamaTempat: "Lins Beauty Skin",
  },
];

const fuse = new Fuse(storeLocation, {
  keys: ["NamaTempat"],
  threshold: 0.3,
});

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
  );
}

export default App;
