import { useState, useRef, useEffect } from "react";
import ButtonCostum from "./Button";
import ColorPallate from "../theme/Color";
import logo from "../assets/logo.png";
import { InputForm } from "./InputForm";
import {
  FiAlignLeft,
  FiGrid,
  FiLogIn,
  FiLogOut,
  FiUnlock,
  FiX,
} from "react-icons/fi";
import GlobalModal from "./Modal";
import { linkWithPopup, signOut, GoogleAuthProvider } from "firebase/auth";
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
  queryResult,
  setCurrentPin,
  setNotif,
}) => {
  const [size, setSize] = useState();
  const [left, setLeft] = useState();
  const [showSearchBar, setshowSearchBar] = useState(false);
  const [buttonSize, setButtonSize] = useState([]);
  const ButtonRef = useRef([]);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const containerRef = useRef();
  const searchBarRef = useRef();
  const navigate = useNavigate();
  const [showSideNav, setShowSideNav] = useState(false);
  const [hover, setHover] = useState(false);

  const provider = new GoogleAuthProvider();

  const handleLinkGoogle = async () => {
    const user = auth.currentUser;

    if (!user) {
      setNotif("❌ No logged-in user. Please login first.");
      return;
    }

    try {
      const result = await linkWithPopup(user, provider);

      const newPhotoURL = result.user.photoURL;

      if (newPhotoURL && user.photoURL !== newPhotoURL) {
        await updateProfile(user, {
          photoURL: newPhotoURL,
        });
        console.log("User photoURL successfully updated.");
      }
      setNotif("✅ Success! Your account is now linked with Google.");
    } catch (error) {
      console.error("Link error:", error);

      let message = "❌";

      switch (error.code) {
        case "auth/provider-already-linked":
          message += "This Google account is already linked to your account.";
          break;
        case "auth/credential-already-in-use":
          message += "This Google account is already used by another user.";
          break;
        case "auth/popup-closed-by-user":
          message += "Popup closed before completing the sign-in.";
          break;
        case "auth/network-request-failed":
          message += "Network error. Please try again later.";
          break;
        default:
          message += "Failed to link Google account";
      }

      setNotif(message);
    }
  };

  const styles = {
    nav: {
      position: "fixed",
      top: windowSize.width > 700 ? "3dvh" : "2dvh",
      left: "50%",
      transform: "translateX(-50%)",
      zIndex: 100,
      display: "flex",
      alignItems: "center",
      padding: "6px 14px",
      backgroundColor: ColorPallate.background,
      backdropFilter: "blur(6px)",
      width: windowSize.width > 700 ? "80vw" : "85vw",
      borderRadius: "16px",
      boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
      transition:
        "transform 0.3s ease, width 0.3s ease, height 0.3s ease, left 0.3s ease, right 0.3s ease",
      gap: "2vw",
    },
    navResizeMap: {
      width: "70vw",
      ...(windowSize.width > 700
        ? { transform: "translateX(-67%)" }
        : { width: "85vw" }),
    },
    navDismiss: {
      top: "-10dvh",
    },
    navButtonGroup: {
      display: "flex",
      justifyContent: "center",
      flex: lastPage !== "map" ? 1 : 0,
      gap: "24px",
      alignItems: "center",
      position: "relative",
      zIndex: 1,
    },
    navAuthButtonGroup: {
      flex: lastPage !== "map" ? 1 : 0,
      display: "flex",
      justifyContent: "flex-end",
      gap: "8px",
      alignItems: "center",
      position: "relative",
      zIndex: 1,
      transition: "transform 0.3s ease out, right 0.3s ease out",
    },
    slider: {
      position: "absolute",
      padding: "16px 0",
      left: left - 5 + "px",
      width: size + 10 + "px",
      background: ColorPallate.primaryGradient,
      borderRadius: "12px",
      transition: "left 0.3s ease, width 0.3s ease",
      zIndex: -1,
      boxShadow: `inset 0 0 0 3px ${ColorPallate.secondary}, inset 0 4px 8px rgba(0, 0, 0, 0.2),  0px 4px 4px rgba(0, 0, 0, 0.25)`,
    },
    titleGroup: {
      flex: windowSize.width > 700 ? (lastPage !== "map" ? 1 : 0) : 0,
      justifyContent: "flex-start",
      display: "flex",
      alignItems: "center",
    },
    titleText: {
      color: ColorPallate.primary,
      fontSize: "1rem",
      fontWeight: 600,
      textAlign: "left",
      display: "inline",
    },
    logo: {
      width: "1.75rem",
      height: "1.75rem",
      alignSelf: "center",
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
      width: "32px",
      boxShadow: `inset 0 0 0 3px ${ColorPallate.secondary}, inset 0 4px 8px rgba(0, 0, 0, 0.2),  0px 4px 4px rgba(0, 0, 0, 0.25)`,
      height: "32px",
      padding: 2,
      background: "transparent",
      position: "relative",
    },
    profileImg: {
      background: ColorPallate.primaryGradient,
      ...(user.photoURL
        ? {}
        : {
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            color: "transparent",
          }),
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
    if (windowSize.width < 700) return;
    if (!containerRef.current && !ButtonRef.current) return;
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
  }, []);

  useEffect(() => {
    if (windowSize.width < 700) return;
    if (lastPage === "login") return;

    const index = buttonList.findIndex((b) => b.id === currentPage);
    if (index >= 0 && buttonSize[index]) {
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
                backgroundColor:
                  lastPage === "map" ? ColorPallate.background : "transparent",
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
          height: "100lvh",
          background: "rgba(18, 18,18, 0.75)",
          backdropFilter: "blur(5px)",
          left: 0,
          position: "fixed",
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
            height: "100lvh",
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
            borderRadius: windowSize.width > 700 ? 30 : "30px 30px 0px 00px",
            position: "fixed",
            zIndex: 100,
            gap: 28,
            transition: "opacity 0.3s ease, transform 0.3s ease",
            ...(windowSize.width > 700
              ? {
                  width: "25vw",
                  top:
                    navRef?.current?.getBoundingClientRect?.()?.height +
                    windowSize.height * 0.06,
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
              <button
                onClick={() => handleLinkGoogle()}
                style={{
                  backgroundColor: ColorPallate.text,
                  color: "black",
                  border: "none",
                  outline: "none",
                  fontSize: "12px",
                  flex: 1,
                  alignItems: "center",
                  gap: "8px",
                  borderRadius: "12px",
                  justifyContent: "center",
                  display: "flex",
                  cursor: "pointer",
                  boxShadow: `inset 0 0 0 2px ${ColorPallate.secondaryText}, inset 0 4px 8px rgba(0, 0, 0, 0.2)`,
                }}
              >
                <img
                  src="https://img.icons8.com/?size=100&id=V5cGWnc9R4xj&format=png&color=000000"
                  alt="google"
                  style={{ width: 18, height: 18 }}
                />
                Google
              </button>
              <ButtonCostum
                type="normalButton"
                text="Log Out"
                style={{ flex: 1 }}
                icon={FiLogOut}
                onclick={() => {
                  signOut(auth);
                  window.location.reload();
                }}
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
        {(lastPage !== "map" ? true : windowSize.width > 700) ? (
          <div style={styles.titleGroup}>
            <img src={logo} alt="" style={styles.logo} />
            <h1
              style={{
                ...styles.titleText,
                background: ColorPallate.primaryGradient,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              Girls
            </h1>
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
              style={{ padding: 4 }}
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
              ref={searchBarRef}
              placeholder="Cari Toko & Product atau Merek Kesenangan Anda"
              style={{
                container: {
                  flex: 1,
                  ...(queryResult.length > 0 && searchQuery
                    ? { borderRadius: "10px 10px 0px 0px" }
                    : {}),
                },
              }}
              hovercolor={ColorPallate.primary}
              color={ColorPallate.background}
              value={searchQuery}
              onChange={handleSearch}
              clearQuery={() => setSearchQuery("")}
            />
            {searchQuery.trim() !== "" && queryResult.length > 0 && (
              <GlobalModal
                visible={searchQuery.trim() !== ""}
                styles={{
                  width: searchBarRef.current.getBoundingClientRect().width - 4,
                  padding: "12px 2px",
                  top: searchBarRef.current.getBoundingClientRect().height + 4,
                  borderRadius: "0px 0px 8px 8px",
                  position: "absolute",
                  zIndex: 100,
                  gap: 4,
                  transition: "opacity 0.3s ease, transform 0.3s ease",
                  boxShadow: `inset 0 0 0 2px ${ColorPallate.inputBorder}, 0 4px 8px ${ColorPallate.buttonShadow}`,
                }}
              >
                {queryResult?.slice(0, 12).map((i, index) => {
                  return (
                    <div
                      onMouseEnter={() => setHover(index + 1)}
                      onMouseLeave={() => setHover(0)}
                      onClick={() => {
                        setSearchQuery("");
                        setCurrentPin(i);
                      }}
                      style={{
                        padding: "10px 8px",
                        ...(hover === index + 1
                          ? { background: ColorPallate.primaryGradient }
                          : {}),
                      }}
                    >
                      <p
                        style={{
                          color: ColorPallate.text,
                          fontSize: 12,
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          textAlign: "left",
                        }}
                      >
                        {i.namaToko}, {i.alamat}
                      </p>
                    </div>
                  );
                })}
              </GlobalModal>
            )}
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
                    text="Sign In"
                    style={{ paddingBlock: 7.2 }}
                    type="textButton"
                    icon={FiUnlock}
                    onclick={() => {
                      buttonAction.navAuthButton?.[0]?.();
                    }}
                  />
                )}
                <ButtonCostum
                  text="Register"
                  style={{ minWidth: "110px", padding: 7.2 }}
                  onclick={() => {
                    buttonAction.navAuthButton?.[1]?.();
                  }}
                  icon={FiLogIn}
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
            {lastPage !== "map" && windowSize.width < 700 && (
              <ButtonCostum
                onclick={() => setShowSideNav(true)}
                type={"textButton"}
                icon={FiAlignLeft}
                style={{ padding: 4 }}
              />
            )}
          </div>
        )}
      </nav>
    </div>
  );
};

export default NavBar;
