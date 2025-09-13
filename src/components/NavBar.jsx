import { useState, useRef, useEffect } from "react";
import ButtonCostum from "./Button";
import ColorPallate from "../theme/Color";
import logo from "../assets/logo.png";
import { InputForm } from "./InputForm";
import {
  FiAlignLeft,
  FiEdit,
  FiGrid,
  FiLogOut,
  FiUnlock,
  FiUser,
  FiX,
  FiXCircle,
} from "react-icons/fi";
import GlobalModal from "./Modal";
import { signOut } from "firebase/auth";
import { auth } from "../service/firebaseConfig";
import { useNavigate } from "react-router-dom";

const NavBar = ({
  dismiss,
  buttonAction,
  currentPage,
  setCurrentPage,
  lastPage,
  setLastPage,
  handleSearch,
  searchQuery,
  setSearchQuery,
  navRef,
  windowSize,
  user,
}) => {
  const [size, setSize] = useState();
  const [left, setLeft] = useState();
  const [showSearchBar, setshowSearchBar] = useState(false);
  const [buttonSize, setButtonSize] = useState([]);
  const ButtonRef = useRef([]);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const containerRef = useRef();
  const navigate = useNavigate();
  const [showSideNav, setShowSideNav] = useState(false);

  const styles = {
    nav: {
      position: "fixed",
      top: "3dvh",
      left: "50%",
      transform: "translateX(-50%)",
      zIndex: 100,
      display: "flex",
      alignItems: "center",
      padding: "8px 14px",
      backgroundColor: ColorPallate.background,
      width: "80vw",
      borderRadius: "10px",
      boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
      transition:
        "top 0.3s ease, left 0.3s ease, transform 0.3s ease, width 0.3s ease, height 0.3s ease",
      gap: "2vw",
    },
    navResizeMap: {
      width: "auto",
      ...(windowSize.width > 700
        ? { left: "2vw", transform: "translateX(-1%)" }
        : { width: "80vw", transform: "translateX(-50%)" }),
    },
    navDismiss: {
      top: "-10dvh",
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
      padding: "18px 0",
      left: left - 10 + "px",
      width: size + 20 + "px",
      background: ColorPallate.primaryGradient,
      borderRadius: "8px",
      transition: "left 0.3s ease, width 0.3s ease",
      zIndex: -1,
      boxShadow: `inset 0 0 0 3px ${ColorPallate.secondary}, inset 0 4px 8px rgba(0, 0, 0, 0.2),  0px 4px 4px rgba(0, 0, 0, 0.25)`,
    },
    titleGroup: {
      flex: windowSize.width > 700 ? 1 : 0,
      justifyContent: "flex-start",
      display: "flex",
      alignItems: "center",
    },
    titleText: {
      color: ColorPallate.primary,
      fontSize: "1rem",
      fontWeight: 500,
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
    profileContainer: {
      justifyContent: "center",
      display: "flex",
      alignItems: "center",
      borderRadius: "100%",
      width: "38px",
      boxShadow: `inset 0 0 0 3px ${ColorPallate.secondary}, inset 0 4px 8px rgba(0, 0, 0, 0.2),  0px 4px 4px rgba(0, 0, 0, 0.25)`,
      height: "38px",
      padding: 2,
      background: ColorPallate.primaryGradient,
      position: "relative",
    },
    profileImg: {
      color: ColorPallate.background,
      textAlign: "center",
      margin: 0,
      fontSize: 16,
      padding: 0,
      width: "100%",
      borderRadius: "100%",
    },
  };

  const buttonList = [
    { id: "home", text: "Home" },
    { id: "map", text: "Map" },
    { id: "about", text: "About" },
  ];

  useEffect(() => {
    if (!containerRef.current && !ButtonRef.current) return;
    if (lastPage === "login") return;
    const updateButtonSize = () => {
      let buttonLists = [];
      const containerLeft = containerRef?.current?.getBoundingClientRect().left;
      ButtonRef.current.forEach((el, i) => {
        if (el) {
          const newSize = el?.getBoundingClientRect().width;
          const newLeft = el?.getBoundingClientRect().left;
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

  const Profile = ({ style, edit, onClick }) => {
    const [hover, setHover] = useState(false);
    return (
      <>
        <div
          style={{ ...styles.profileContainer, ...style?.container }}
          onClick={() => onClick()}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          {user?.photoURL ? (
            <img
              src={user?.photoURL}
              alt=""
              style={{ ...styles.profileImg, ...style?.img }}
            />
          ) : (
            <h1 style={{ ...styles.profileImg, ...style?.img }}>
              {user?.displayName?.slice(0, 1)}
            </h1>
          )}
          {!edit && (
            <div
              style={{
                backgroundColor: ColorPallate.background,
                borderRadius:
                  windowSize.width > 700
                    ? "0px 50px 50px 0px"
                    : "0px 0px 50px 50px",
                padding: 14,
                display: "flex",
                alignItems: "center",
                transition: "opacity 0.3s ease, transform 0.3s ease",
                position: "absolute",
                opacity: 0,
                ...((showProfileModal ? true : hover)
                  ? {
                      opacity: 1,
                      transform:
                        windowSize.width > 700
                          ? `translateX(${lastPage === "map" ? "" : "-"}45px)`
                          : "translateY(45px)",
                    }
                  : {}),
              }}
            >
              <FiGrid size={18} color={ColorPallate.text} />
            </div>
          )}
        </div>
      </>
    );
  };

  return (
    <div>
      <div
        style={{
          width: "100vw",
          height: "100dvh",
          background: "rgba(18, 18,18, 0.75)",
          backdropFilter: "blur(5px)",
          left: 0,
          position: "absolute",
          opacity: showSideNav ? 1 : 0,
          zIndex: 1000,
          top: 0,
          pointerEvents: "none",
        }}
      >
        <GlobalModal
          visible={showSideNav}
          styles={{
            position: "fixed",
            zIndex: 9999,
            gap: 14,
            transition: "opacity 0.3s ease, transform 0.3s ease",
            top: 0,
            ...(lastPage === "map" ? { left: 0 } : { right: 0 }),
            bottom: 0,
            width: "65vw",
            height: "100dvh",
            padding: "20px",
            borderRadius: 0,
          }}
        >
          <div
            onClick={() => setShowSideNav(false)}
            style={{ position: "absolute", cursor: "pointer", right: 20 }}
          >
            <FiX size={20} color={ColorPallate.text} />
          </div>
          <img
            style={{
              position: "relative",
              width: "38px",
              left: -10,
              top: -10,
            }}
            src={logo}
          />
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            {buttonList.map((button, index) => (
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
                    setLastPage(button.id);
                    setCurrentPage(button.id);
                    setShowSideNav(false);
                    buttonAction.navButton?.[index]?.();
                  }}
                  onHoverEnter={() => {
                    setCurrentPage(button.id);
                  }}
                  hoverColor={ColorPallate.primary}
                  activeColor={ColorPallate.primary}
                />
              </div>
            ))}
          </div>
        </GlobalModal>
      </div>
      {user && (
        <GlobalModal
          visible={showProfileModal}
          styles={{
            padding: 20,
            borderRadius: 30,
            position: "fixed",
            zIndex: 100,
            gap: 28,
            transition: "opacity 0.3s ease, transform 0.3s ease",
            ...(windowSize.width > 700
              ? {
                  width: "25vw",
                  top:
                    navRef?.current?.getBoundingClientRect?.()?.height +
                    window.innerHeight * 0.06,
                  ...(lastPage !== "map"
                    ? { right: "10vw" }
                    : {
                        left: navRef?.current?.getBoundingClientRect?.()?.width,
                        transform: "translateX(-100%)",
                      }),
                }
              : {
                  left: 0,
                  bottom: 0,
                  width: "90vw",
                  height: "75dvh",
                  padding: "5vw",
                }),
          }}
        >
          <div
            onClick={() => setShowProfileModal(false)}
            style={{ position: "absolute", cursor: "pointer" }}
          >
            <FiX size={20} color={ColorPallate.text} />
          </div>
          <p
            style={{
              fontSize: "0.75rem",
              color: ColorPallate.text,
              fontWeight: 500,
            }}
          >
            {user?.email}
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <Profile
              style={{
                container: {
                  margin: "auto",
                  justifyContent: "center",
                  width: "80px",
                  height: "80px",
                },
                img: {
                  fontSize: 30,
                },
              }}
              edit={true}
            />
            <h1
              style={{
                color: ColorPallate.text,
                fontSize: 24,
                fontWeight: 500,
                margin: 0,
              }}
            >
              Hi, {user?.displayName}
            </h1>
            <div style={{ display: "flex", flexDirection: "row", gap: 8 }}>
              <ButtonCostum
                type="normalButton"
                text={user?.admin ? "Admin" : "Pengguna"}
                icon={FiUser}
                style={{ flex: 1 }}
              />
              <ButtonCostum
                type="normalButton"
                text="Log Out"
                style={{ flex: 1 }}
                icon={FiLogOut}
                onclick={() => signOut(auth)}
              />
            </div>
            {user?.admin && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <ButtonCostum
                  style={{ color: ColorPallate.secondaryText }}
                  type="textButton"
                  text="Edit Data Toko"
                  onclick={() => navigate("/doss/" + user?.uid)}
                />
                <p
                  style={{
                    fontSize: "0.75rem",
                    color: ColorPallate.text,
                    fontWeight: 500,
                  }}
                >
                  |
                </p>
                <ButtonCostum
                  style={{ color: ColorPallate.secondaryText }}
                  type="textButton"
                  text="Edit Data Peta"
                />
              </div>
            )}
          </div>
        </GlobalModal>
      )}
      <nav
        style={{
          ...styles.nav,
          ...(showSearchBar ? styles.navResizeMap : {}),
          ...(dismiss ? styles.navDismiss : {}),
        }}
        ref={navRef}
      >
        {(lastPage === "home" ? true : windowSize.width > 700) ? (
          <div style={styles.titleGroup}>
            <img src={logo} alt="" style={styles.logo} />
            <h1 style={styles.titleText}>Girls</h1>
            <h1 style={{ ...styles.titleText, color: ColorPallate.text }}>
              Map
            </h1>
          </div>
        ) : (
          <>
            <ButtonCostum
              onclick={() => setShowSideNav(true)}
              type={"textButton"}
              icon={FiAlignLeft}
            />
          </>
        )}
        {windowSize?.width > 700 ? (
          <div
            ref={containerRef}
            style={styles.navButtonGroup}
            onMouseLeave={() => {
              setCurrentPage(lastPage);
            }}
          >
            {buttonList.map((button, index) => (
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
                    setLastPage(button.id);
                    setCurrentPage(button.id);
                    buttonAction.navButton?.[index]?.();
                  }}
                  onHoverEnter={() => {
                    setCurrentPage(button.id);
                  }}
                />
              </div>
            ))}
            <div style={styles.slider}></div>
          </div>
        ) : (
          <></>
        )}
        {showSearchBar && (
          <div style={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
            <InputForm
              placeholder="Cari Toko"
              style={{
                container: {
                  flex: 1,
                },
              }}
              hovercolor={ColorPallate.primary}
              color={ColorPallate.background}
              value={searchQuery}
              onChange={handleSearch}
              clearQuery={() => setSearchQuery("")}
            />
          </div>
        )}
        {(user ? true : !(lastPage === "map")) && (
          <div
            style={{
              ...styles.navAuthButtonGroup,
            }}
          >
            {!user ? (
              <>
                {windowSize.width > 510 && (
                  <ButtonCostum
                    text="Masuk"
                    type="textButton"
                    icon={FiUnlock}
                    onclick={() => {
                      console.log("Login");
                      buttonAction.navAuthButton?.[0]?.();
                    }}
                  />
                )}
                <ButtonCostum
                  text="Ayo Mulai"
                  style={{ minWidth: "110px" }}
                  onclick={() => {
                    console.log("Login");
                    buttonAction.navAuthButton?.[1]?.();
                  }}
                />
              </>
            ) : (
              <Profile
                onClick={() => setShowProfileModal(!showProfileModal)}
                style={{
                  container: {
                    cursor: "pointer",
                  },
                }}
              />
            )}
            {lastPage !== "map" && (
              <ButtonCostum
                onclick={() => setShowSideNav(true)}
                type={"textButton"}
                icon={FiAlignLeft}
              />
            )}
          </div>
        )}
      </nav>
    </div>
  );
};

export default NavBar;
