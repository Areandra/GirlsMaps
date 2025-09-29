import React, { useState, useRef, useEffect } from "react";
import ButtonCostum from "./Button";
import ColorPallate from "../theme/Color";
import logo from "../assets/logo.png";
import { InputForm } from "./InputForm";
import { FiAlignLeft, FiLogIn, FiUnlock } from "react-icons/fi";
import GlobalModal from "./Modal";
import SideNavModal from "../widgets/Modal/SideNavModal";
import Profile from "./Profile";
import ProfileModal from "../widgets/Modal/ProfileModal";
import { useNavigate, useSearchParams } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../service/firebaseConfig";

const NavBar = React.memo(
  ({
    dismiss,
    buttonAction,
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
    favoriteStore,
    handleDelStorage,
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
    const [urlParams, setUrlParams] = useSearchParams();
    const [currentPage, setCurrentPage] = useState(
      urlParams.get("page") || "home"
    );

    useEffect(() => {
      const page = urlParams.get("page");
      setCurrentPage(page || "home");
    }, [urlParams]);

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
        transition: "0.3s ease",
        gap: "2vw",
      },
      navResizeMap: {
        width: "75vw",
        ...(windowSize.width > 700
          ? { transform: "translateX(-63%)" }
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
        transition: "0.3s ease",
      },
      slider: {
        position: "absolute",
        padding: "16px 0",
        left: left - 5 + "px",
        width: size + 10 + "px",
        background: ColorPallate.primaryGradient,
        borderRadius: "12px",
        transition: "0.3s ease",
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
    };

    const buttonList = [
      { id: "home", text: "Beranda", onClick: () => setLastPage("home") },
      { id: "map", text: "Peta", onClick: () => setLastPage("map") },
      {
        id: "about",
        text: "Tentang Kami",
        onClick: () => setLastPage("about"),
      },
    ];

    useEffect(() => {
      if (windowSize.width < 700) return;
      if (!containerRef.current && !ButtonRef.current) return;
      const updateButtonSize = () => {
        let buttonLists = [];
        const containerLeft =
          containerRef?.current?.getBoundingClientRect().left;
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

    return (
      <div>
        <SideNavModal
          buttonList={buttonList}
          onDismis={() => setShowSideNav(false)}
          visible={showSideNav}
        />
        <ProfileModal
          visible={showProfileModal}
          useNavSize={() => ({
            width: navRef?.current?.getBoundingClientRect?.().width,
            height: navRef?.current?.getBoundingClientRect?.().height,
            left: navRef?.current?.getBoundingClientRect?.().left,
          })}
          onDismiss={() => setShowProfileModal(false)}
          user={user}
          favoriteStoreList={queryResult.filter((i) =>
            favoriteStore.includes(i.id)
          )}
          onClick={{
            navToStore: (i) => {
              setShowProfileModal(false);
              setCurrentPin(i);
            },
            delFavStore: (id) => handleDelStorage(id),
            googleLink: async () => {
              const info = await handleLinkGoogle();
              setNotif(info);
            },
            adminTable: () => {
              setLastPage(null);
              navigate("/doss/" + user?.uid);
              setShowProfileModal(false);
            },
            logout: () => {
              signOut(auth);
              window.location.reload();
            },
          }}
        />
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
              <div
                onClick={() => setLastPage("home")}
                style={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                }}
              >
                <img src={logo} alt="" style={styles.logo} />
                {windowSize.width > 900 && (
                  <>
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
                    <h1
                      style={{ ...styles.titleText, color: ColorPallate.text }}
                    >
                      Map
                    </h1>
                  </>
                )}
              </div>
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
                    style={{ whiteSpace: "nowrap" }}
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
            <div
              style={{ flex: 1, display: "flex", justifyContent: "flex-end" }}
            >
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
                    width:
                      searchBarRef?.current?.getBoundingClientRect().width - 4,
                    padding: "12px 2px",
                    top:
                      searchBarRef?.current?.getBoundingClientRect().height + 4,
                    borderRadius: "0px 0px 8px 8px",
                    position: "absolute",
                    zIndex: 100,
                    gap: 4,
                    transition: "0.3s ease",
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
                      text="Masuk"
                      style={{ paddingBlock: 7.2 }}
                      type="textButton"
                      icon={FiUnlock}
                      onclick={() => {
                        buttonAction.navAuthButton?.[0]?.();
                      }}
                    />
                  )}
                  <ButtonCostum
                    text="Daftar"
                    style={{ minWidth: "110px", padding: 7.2 }}
                    onclick={() => {
                      buttonAction.navAuthButton?.[1]?.();
                    }}
                    icon={FiLogIn}
                  />
                </>
              ) : (
                <Profile
                  user={user}
                  visible={showProfileModal}
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
  }
);

export default NavBar;
