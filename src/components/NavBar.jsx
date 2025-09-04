import { useState, useRef, useEffect } from "react";
import ButtonCostum from "./Button";
import ColorPallate from "../theme/Color";
import logo from "../assets/logo.png";
import { InputForm } from "./InputForm";
import { FiUnlock } from "react-icons/fi";

const NavBar = ({
  dismiss,
  buttonAction,
  currentPage,
  setCurrentPage,
  lastPage,
  setLastPage,
}) => {
  const [size, setSize] = useState();
  const [left, setLeft] = useState();
  const [buttonSize, setButtonSize] = useState([]);
  const ButtonRef = useRef([]);
  const containerRef = useRef();
  const navRef = useRef();

  const [showSearchBar, setshowSearchBar] = useState(false);

  const buttonList = [
    { id: "home", text: "Home" },
    { id: "map", text: "Map" },
    { id: "about", text: "About" },
  ];

  const styles = {
    nav: {
      position: "fixed",
      top: "3vh",
      left: "50%",
      transform: "translateX(-50%)",
      zIndex: 100,
      display: "flex",
      alignItems: "center",
      padding: "8px 14px",
      backgroundColor: ColorPallate.background,
      width: "80vw",
      borderRadius: "40px",
      boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
      transition:
        "top 0.3s ease, left 0.3s ease, transform 0.3s ease, width 0.3s ease",
      overflow: "hidden",
      gap: "2vw",
    },
    navResizeMap: {
      width: "auto",
      left: "2vw",
      transform: "translateX(-1%)",
    },

    navDismiss: {
      top: "-10vh",
    },
    navButtonGroup: {
      display: "flex",
      justifyContent: "center",
      flex: 1,
      gap: "24px",
      alignItems: "center",
      position: "relative",
      zIndex: 1,
    },
    navAuthButtonGroup: {
      display: "flex",
      justifyContent: "flex-end",
      flex: 1,
      gap: "8px",
      alignItems: "center",
      position: "relative",
      zIndex: 1,
      transition: "transform 0.3s ease out, right 0.3s ease out",
    },
    slider: {
      position: "absolute",
      padding: "16px 0",
      left: left - 10 + "px",
      width: size + 20 + "px",
      backgroundColor: ColorPallate.primary,
      borderRadius: "20px",
      transition: "left 0.3s ease, width 0.3s ease",
      zIndex: -1,
      boxShadow: `inset 0 0 0 3px ${ColorPallate.secondary}, inset 0 4px 8px rgba(0, 0, 0, 0.2),  0px 4px 4px rgba(0, 0, 0, 0.25)`,
    },
    titleGroup: {
      flex: 1,
      justifyContent: "flex-start",
      display: "flex",
      alignItems: "center",
    },
    titleText: {
      color: ColorPallate.primary,
      fontSize: "1rem",
      fontWeight: "bold",
      textAlign: "left",
      display: "inline",
    },
    logo: {
      width: "2rem",
      height: "2rem",
    },
    dissmisAuthButton: {
      right: 0,
      transform: "translateX(100%)",
    },
  };

  useEffect(() => {
    if (lastPage === "login") return;
    const updateButtonSize = () => {
      let buttonLists = [];
      const containerLeft = containerRef.current.getBoundingClientRect().left;
      ButtonRef.current.forEach((el, i) => {
        if (el) {
          const newSize = el.getBoundingClientRect().width;
          const newLeft = el.getBoundingClientRect().left;
          buttonLists.push({
            id: buttonList[i].id,
            width: newSize,
            left: newLeft - containerLeft,
          });
        }
      });
      setButtonSize(buttonLists);
    };

    updateButtonSize();

    const observer = new ResizeObserver(() => {
      updateButtonSize();
    });

    if (navRef.current) {
      observer.observe(navRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [lastPage]);

  useEffect(() => {
    if (lastPage === "login") return;

    const index = buttonList.findIndex((b) => b.id === currentPage);
    console.log("Index: ", index);
    console.log("Button Size: ", buttonSize);
    if (index >= 0 && buttonSize[index]) {
      console.log("Current Page: ", currentPage, index, buttonSize[index]);
      setSize(buttonSize[index].width);
      setLeft(buttonSize[index].left);
    }
  }, [currentPage, buttonSize, lastPage]);

  useEffect(() => {
    setshowSearchBar(lastPage === "map");
  }, [lastPage, showSearchBar]);

  return (
    <nav
      style={{
        ...styles.nav,
        ...(showSearchBar ? styles.navResizeMap : {}),
        ...(dismiss ? styles.navDismiss : {}),
      }}
      ref={navRef}
    >
      <div style={styles.titleGroup}>
        <img src={logo} alt="" style={styles.logo} />
        <h1 style={styles.titleText}>Girls</h1>
        <h1 style={{ ...styles.titleText, color: ColorPallate.text }}>Map</h1>
      </div>
      {lastPage !== "login" && (
        <div
          ref={containerRef}
          style={styles.navButtonGroup}
          onMouseLeave={() => {
            setCurrentPage(lastPage);
          }}
        >
          {buttonList.map((button, index) => {
            return (
              <div
                key={button.id}
                ref={(el) => (ButtonRef.current[index] = el)}
              >
                <ButtonCostum
                  currentPage={currentPage}
                  id={button.id}
                  type="navbarButton"
                  text={button.text}
                  onclick={() => {
                    setLastPage(currentPage);
                    setCurrentPage(button.id);
                    buttonAction.navButton?.[index]?.();
                  }}
                  onHoverEnter={() => {
                    setCurrentPage(button.id);
                  }}
                />
              </div>
            );
          })}
          <div style={styles.slider}></div>
        </div>
      )}
      {!showSearchBar ? (
        <div
          style={{
            ...styles.navAuthButtonGroup,
          }}
        >
          <ButtonCostum
            text="Masuk"
            type="textButton"
            icon={FiUnlock}
            onclick={() => {
              console.log("Login");
              buttonAction.navAuthButton?.[0]?.();
            }}
          />
          <ButtonCostum
            text="Ayo Mulai"
            onclick={() => {
              console.log("Login");
              buttonAction.navAuthButton?.[1]?.();
            }}
          />
        </div>
      ) : (
        <div style={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
          <InputForm
            text="Cari Toko"
            style={{
              container: {
                width: "18vw",
              },
            }}
          />
        </div>
      )}
    </nav>
  );
};

export default NavBar;
