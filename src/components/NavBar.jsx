import { useState, useRef, useEffect } from "react";
import ButtonCostum from "./Button";
import ColorPallate from "../theme/Color";

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
      padding: "8px 24px",
      backgroundColor: ColorPallate.background,
      width: "80vw",
      borderRadius: "40px",
      boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    },
    navDismiss: {
      top: "-10vh",
      transition: "top 0.3s ease",
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
    },
    slider: {
      position: "absolute",
      padding: "16px 0",
      left: left - 10 + "px",
      width: size + 20 + "px",
      backgroundColor: ColorPallate.primary,
      borderRadius: "20px",
      transition: "left 0.3s ease",
      zIndex: -1,
      boxShadow: `inset 0 0 0 3px ${ColorPallate.secondary}, inset 0 4px 8px rgba(0, 0, 0, 0.2),  0px 4px 4px rgba(0, 0, 0, 0.25)`,
    },
    titleGroup: {
      flex: 1,
      justifyContent: "flex-start",
      display: "flex",
    },
    titleText: {
      color: ColorPallate.primary,
      fontSize: "1rem",
      fontWeight: "bold",
      textAlign: "left",
      display: "inine",
    },
  };

  useEffect(() => {
    let buttonLists = [];
    const containerLeft = containerRef.current.getBoundingClientRect().left;
    ButtonRef.current.forEach((el, i) => {
      if (el) {
        const newSize = el.getBoundingClientRect().width;
        const newLeft = el.getBoundingClientRect().left;
        console.log(buttonList[i], newSize);
        buttonLists.push({
          id: buttonList[i].id,
          width: newSize,
          left: newLeft - containerLeft,
        });
      }
    });
    setButtonSize(buttonLists);
    console.log("Button Size: ", buttonLists);
  }, []);

  useEffect(() => {
    const index = buttonList.findIndex((b) => b.id === currentPage);
    console.log("Index: ", index);
    console.log("Button Size: ", buttonSize);
    if (index >= 0 && buttonSize[index]) {
      console.log("Current Page: ", currentPage, index, buttonSize[index]);
      setSize(buttonSize[index].width);
      setLeft(buttonSize[index].left);
    }
  }, [currentPage, buttonSize]);

  return (
    <nav
      style={{
        ...styles.nav,
        ...(dismiss ? styles.navDismiss : {}),
      }}
    >
      <div style={styles.titleGroup}>
        <h1 style={styles.titleText}>Girls</h1>
        <h1 style={{ ...styles.titleText, color: ColorPallate.text }}>Map</h1>
      </div>
      <div
        ref={containerRef}
        style={styles.navButtonGroup}
        onMouseLeave={() => {
          setCurrentPage(lastPage);
        }}
      >
        {buttonList.map((button, index) => {
          return (
            <div key={button.id} ref={(el) => (ButtonRef.current[index] = el)}>
              <ButtonCostum
                key={index}
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
      <div style={styles.navAuthButtonGroup}>
        <ButtonCostum
          text="Masuk"
          type="textButton"
          onclick={() => {
            console.log("Login");
            buttonAction.navAuthButton?.[0]?.();
          }}
        />
        <ButtonCostum
          text="Masuk"
          onclick={() => {
            console.log("Login");
            buttonAction.navAuthButton?.[1]?.();
          }}
        />
      </div>
    </nav>
  );
};

export default NavBar;
