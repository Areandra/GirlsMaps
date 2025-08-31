import { useEffect, useState } from "react";
import "./App.css";
import NavBar from "./components/NavBar.jsx";
import LandingPage from "./page/LandingPage.jsx";

function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [lastPage, setLastPage] = useState("home");
  const [navDismiss, setNavDismiss] = useState(false);

  const navButtonAction = {
    navButton: [],
    navAuthButton: [
      () => {
        console.log("is called");
        setNavDismiss(true);
        setCurrentPage("login");
        setLastPage("login");
      },
      () => {
        console.log("is called");
        setNavDismiss(true);
        setCurrentPage("login");
        setLastPage("login");
      },
    ],
  };

  return (
    <>
      <NavBar
        dismiss={navDismiss}
        buttonAction={navButtonAction}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        lastPage={lastPage}
        setLastPage={setLastPage}
      />
      <LandingPage
        lastPage={lastPage}
        buttonOneOnClick={() => {
          console.log("is called");
          setNavDismiss(true);
          setCurrentPage("login");
          setLastPage("login");
        }}
      />
    </>
  );
}

export default App;
