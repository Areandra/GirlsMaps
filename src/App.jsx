import { useEffect, useState } from "react";
import "./App.css";
import NavBar from "./components/NavBar.jsx";
import LandingPage from "./page/LandingPage.jsx";
import Maps from "./components/Maps.jsx";
import LoginPage from "./page/LoginPage.jsx";
import { useSearchParams } from "react-router-dom";
import MapsPage from "./page/MapsPage.jsx";

function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [urlParams, setUrlParams] = useSearchParams();
  const [lastPage, setPageTo] = useState(urlParams.get("page") || "home");

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
  }, [urlParams]);

  const navButtonAction = {
    navButton: [],
    navAuthButton: [
      () => {
        console.log("is called");
        setCurrentPage("daftar");
        setLastPage("daftar");
      },
      () => {
        console.log("is called");
        setCurrentPage("login");
        setLastPage("login");
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
      />
      <Maps lastPage={lastPage} />
      <LandingPage
        lastPage={lastPage}
        buttonOneOnClick={() => {
          console.log("is called");
          setCurrentPage("login");
          setLastPage("login");
        }}
      />
      <MapsPage dismiss={lastPage !== "map"} />
      <LoginPage
        lastPage={lastPage}
        slideIn={lastPage === "login" || lastPage === "daftar"}
        setLastPage={setLastPage}
      />
    </>
  );
}

export default App;
