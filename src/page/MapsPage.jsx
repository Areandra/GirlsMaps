import {
  FiBookmark,
  FiChevronLeft,
  FiChevronRight,
  FiChevronUp,
  FiClock,
  FiMapPin,
  FiPhoneCall,
  FiX,
} from "react-icons/fi";
import ButtonCostum from "../components/Button";
import GlobalModal from "../components/Modal";
import ColorPallate from "../theme/Color";
import { BsFillStarFill } from "react-icons/bs";
import { useEffect, useRef, useState } from "react";
import { setUserData } from "../service/crudDB";
import { BiShare } from "react-icons/bi";

const dayList = [
  "Senin",
  "Selasa",
  "Rabu",
  "Kamis",
  "Jumat",
  "Sabtu",
  "Minggu",
];

const MapsPage = ({
  dismiss,
  navRef,
  currentPin,
  windowSize,
  user,
  SetUpdateFS,
  setNotif,
  favoriteStore,
}) => {
  if (dismiss) return;

  const [showDeskripsi, setShowDeskripsi] = useState(false);
  const [showFullDeskripsi, setShowFullDeskripsi] = useState(false);
  const [deskripsiData, setDeskripsiData] = useState(null);
  const deskripsiRef = useRef();

  useEffect(() => {
    if (deskripsiRef.current && !showFullDeskripsi) {
      deskripsiRef.current.scrollTo({
        top: 0,
        behavior: "auto",
      });
    }
  }, [showFullDeskripsi]);

  useEffect(() => {
    if (currentPin !== null) {
      const newData = [
        {
          id: "alamat",
          value: currentPin.alamat || "Alamat Lengkap",
          icon: FiMapPin,
        },
        {
          id: "openTime",
          value: currentPin.openTime || [
            "00.00 - 00.00",
            "00.00 - 00.00",
            "00.00 - 00.00",
            "00.00 - 00.00",
            "00.00 - 00.00",
            "00.00 - 00.00",
            "Closed",
          ],
          icon: FiClock,
        },
        {
          id: "contact",
          value: currentPin?.contact || "0812-3456-7890",
          icon: FiPhoneCall,
        },
      ];
      setDeskripsiData(newData);
      setShowDeskripsi(true);
    } else setShowDeskripsi(false);
  }, [currentPin]);

  const styles = {
    containerModal: {
      pointerEvents: showDeskripsi ? "all" : "none",
      left: windowSize.width > 700 ? "2vw" : "50%",
      ...(windowSize.width < 700
        ? {
            transform: "translateX(-50%)",
            bottom: 0,
          }
        : {
            top:
              navRef?.current?.getBoundingClientRect?.()?.height +
              window.innerHeight * 0.06,
          }),
      position: "fixed",
    },
    deskripsiModal: {
      transition: "height 0.3s ease",
      overflowX: "hidden",
      overflowY:
        windowSize.width > 700
          ? "auto"
          : !showFullDeskripsi
          ? "hidden"
          : "auto",
      boxShadow: `0px 8px 8px rgba(0, 0, 0, 0.25)`,
      flexDirection: "column",
      borderRadius: "10px",
      display: "flex",
      gap: 16,
      ...(windowSize.width > 700
        ? {
            width: "40vw",
            height: 520,
          }
        : showFullDeskripsi
        ? {
            left: "50%",
            width: "90vw",
            height: "70dvh ",
          }
        : {
            left: "50%",
            width: "90vw",
            height: "40dvh ",
          }),
    },
    img: {
      transition: "height 0.3s ease",
      borderRadius: "10px",
      width: "100%",
      objectFit: "cover",
      ...(windowSize.width < 700 && !showFullDeskripsi
        ? { minHeight: windowSize.height * 0.4 - 68 }
        : {}),
      boxShadow: `0px 4px 4px rgba(0, 0, 0, 0.25)`,
    },
    tittleText: {
      fontSize: 20,
      color: ColorPallate.text,
      fontWeight: 500,
      textAlign: "left",
      margin: 0,
    },
    lebelInfo: {
      color: ColorPallate.secondaryText,
      textAlign: "left",
      fontSize: 12,
      alignItems: "center",
      fontWeight: 400,
      padding: 0,
    },
    contentContainer: {
      padding: 10,
      margin: 8,
      display: "flex",
      flexDirection: "column",
      wordWrap: "break-word",
      overflowWrap: "break-word",
      justifyContent: "flex-start",
      gap: 14,
    },
    rating: {
      color: ColorPallate.secondaryText,
      textAlign: "left",
      fontSize: 12,
      alignItems: "center",
    },
    line: {
      height: 1.5,
      width: "100%",
      backgroundColor: ColorPallate.secondaryText,
      color: "black",
    },
    infoContainer: {
      display: "flex",
      flexDirection: "column",
      gap: 20,
    },
  };

  const handleSetFavorite = async (dataID) => {
    if (favoriteStore.includes(dataID)) {
      setNotif("This Store Is Already On Your Favorite List");
      return;
    }
    const res = await setUserData(user.uid, dataID, `favoriteStore/${dataID}`);
    setNotif(res.messege);
    SetUpdateFS(true);
  };

  return (
    <div
      style={{
        position: "fixed",
        zIndex: 10,
      }}
    >
      <div style={styles.containerModal}>
        {currentPin && (
          <ButtonCostum
            onclick={
              windowSize.width > 700
                ? () => {
                    setShowDeskripsi(!showDeskripsi);
                  }
                : !showFullDeskripsi
                ? () => setShowFullDeskripsi(true)
                : () => {
                    setShowFullDeskripsi(false);
                  }
            }
            content={
              windowSize.width > 700 ? (
                showDeskripsi ? (
                  <FiChevronLeft size={14} />
                ) : (
                  <FiChevronRight size={14} />
                )
              ) : showFullDeskripsi ? (
                <FiX size={14} />
              ) : (
                <FiChevronUp size={14} />
              )
            }
            style={{
              position: "absolute",
              right: windowSize.width > 700 ? 0 : "50%",
              top: windowSize.width > 700 ? "50%" : 0,
              transform:
                windowSize.width > 700
                  ? showDeskripsi
                    ? "translateY(-50%) translateX(50%)"
                    : "translateY(100%) translateX(100%)"
                  : showDeskripsi
                  ? "translateY(-50%) translateX(50%)"
                  : "translateX(50%) translateY(-150%)",
              textAlign: "center",
              padding: 10,
              borderRadius: "12px",
              zIndex: 11,
              pointerEvents: "all",
            }}
            hoverScale={showDeskripsi ? 1.05 : 1}
          />
        )}
        {showDeskripsi && (
          <GlobalModal
            ref={deskripsiRef}
            visible={showDeskripsi}
            styles={styles.deskripsiModal}
          >
            <img
              style={styles.img}
              src={
                currentPin?.urlImage ||
                "https://fastly.picsum.photos/id/10/2500/1667.jpg?hmac=J04WWC_ebchx3WwzbM-Z4_KC_LeLBWr5LZMaAkWkF68"
              }
            ></img>
            <div style={styles.contentContainer}>
              <h1 style={styles.tittleText}>
                {currentPin?.namaToko || "Store Name"}
              </h1>
              <span style={styles.rating}>
                {currentPin?.rate && <BsFillStarFill size={16} color="gold" />}
                {currentPin?.rate ||
                  "Information of This Store Rating Currently Not Available"}{" "}
                {currentPin?.rater || ""}
              </span>
              <div style={styles.line}></div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <ButtonCostum
                    onclick={() => handleSetFavorite(currentPin.id)}
                    icon={FiBookmark}
                  />
                  <p style={{ ...styles.lebelInfo, textAlign: "center" }}>
                    Save
                  </p>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <button
                    onClick={() =>
                      window.open(
                        `https://www.google.com/maps?q=${currentPin.koordinat}(${currentPin.namaToko})`
                      )
                    }
                    style={{
                      backgroundColor: ColorPallate.text,
                      color: "black",
                      border: "none",
                      outline: "none",
                      fontSize: "12px",
                      alignItems: "center",
                      borderRadius: "12px",
                      justifyContent: "center",
                      padding: "10px 12px",
                      display: "flex",
                      cursor: "pointer",
                      boxShadow: `inset 0 0 0 2px ${ColorPallate.secondaryText}, inset 0 4px 8px rgba(0, 0, 0, 0.2)`,
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      x="0px"
                      y="0px"
                      width="18"
                      height="18"
                      viewBox="0 0 48 48"
                    >
                      <path
                        fill="#48b564"
                        d="M35.76,26.36h0.01c0,0-3.77,5.53-6.94,9.64c-2.74,3.55-3.54,6.59-3.77,8.06	C24.97,44.6,24.53,45,24,45s-0.97-0.4-1.06-0.94c-0.23-1.47-1.03-4.51-3.77-8.06c-0.42-0.55-0.85-1.12-1.28-1.7L28.24,22l8.33-9.88	C37.49,14.05,38,16.21,38,18.5C38,21.4,37.17,24.09,35.76,26.36z"
                      ></path>
                      <path
                        fill="#fcc60e"
                        d="M28.24,22L17.89,34.3c-2.82-3.78-5.66-7.94-5.66-7.94h0.01c-0.3-0.48-0.57-0.97-0.8-1.48L19.76,15	c-0.79,0.95-1.26,2.17-1.26,3.5c0,3.04,2.46,5.5,5.5,5.5C25.71,24,27.24,23.22,28.24,22z"
                      ></path>
                      <path
                        fill="#2c85eb"
                        d="M28.4,4.74l-8.57,10.18L13.27,9.2C15.83,6.02,19.69,4,24,4C25.54,4,27.02,4.26,28.4,4.74z"
                      ></path>
                      <path
                        fill="#ed5748"
                        d="M19.83,14.92L19.76,15l-8.32,9.88C10.52,22.95,10,20.79,10,18.5c0-3.54,1.23-6.79,3.27-9.3	L19.83,14.92z"
                      ></path>
                      <path
                        fill="#5695f6"
                        d="M28.24,22c0.79-0.95,1.26-2.17,1.26-3.5c0-3.04-2.46-5.5-5.5-5.5c-1.71,0-3.24,0.78-4.24,2L28.4,4.74	c3.59,1.22,6.53,3.91,8.17,7.38L28.24,22z"
                      ></path>
                    </svg>
                  </button>
                  <p style={{ ...styles.lebelInfo, textAlign: "center" }}>
                    Open In
                  </p>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <ButtonCostum
                    onclick={() => {
                      setNotif("✅ Link is Copied");
                      navigator.clipboard.writeText(window.location.href);
                    }}
                    icon={BiShare}
                  />
                  <p style={{ ...styles.lebelInfo, textAlign: "center" }}>
                    Share
                  </p>
                </div>
              </div>
              <div style={styles.line}></div>
              <div style={styles.infoContainer}>
                {deskripsiData.map((i) => {
                  const IconComponent = i.icon;
                  return (
                    <div
                      key={i.id}
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "flex-start",
                        gap: 14,
                        justifyContent: "flex-start",
                      }}
                    >
                      <div
                        style={{
                          minWidth: 16,
                        }}
                      >
                        <IconComponent size={16} color={ColorPallate.text} />
                      </div>
                      {i.id !== "openTime" ? (
                        <p style={styles.lebelInfo}>{i.value}</p>
                      ) : (
                        <div
                          style={{
                            lineHeight: 1,
                            display: "flex",
                            flexDirection: "column",
                            gap: 8,
                            width: "100%",
                          }}
                        >
                          {i.value.map((j, index) => (
                            <div
                              key={index}
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                flexDirection: "row",
                              }}
                            >
                              <p
                                style={{
                                  flex: 1,
                                  textAlign: "left",
                                  ...styles.lebelInfo,
                                }}
                              >
                                {dayList[index]}
                              </p>
                              <p
                                style={{
                                  flex: 1,
                                  textAlign: "left",
                                  ...styles.lebelInfo,
                                }}
                              >
                                {j}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
              <div style={styles.line}></div>
              <h1 style={styles.tittleText}>Product</h1>
              <div
                style={{ display: "flex", flexDirection: "column", gap: 10 }}
              >
                {currentPin?.product.length !== 0 &&
                currentPin?.product[0].merek !== "" ? (
                  <>
                    {currentPin?.product.map((i) => (
                      <div
                        style={{
                          ...styles.lebelInfo,
                          background: "rgba(15, 15,15, 0.5)",
                          color: ColorPallate.text,
                          padding: 18,
                          borderRadius: 8,
                        }}
                      >
                        <p
                          style={{ fontSize: 14, color: ColorPallate.primary }}
                        >
                          {i.merek} :
                        </p>
                        <div
                          style={{
                            gap: "16px",
                          }}
                        >
                          {i.namaProduk.map((j) => (
                            <div>
                              <p>- {j}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </>
                ) : (
                  <p style={styles.lebelInfo}>
                    Information of This Store Product Currently not Available
                  </p>
                )}
              </div>
            </div>
          </GlobalModal>
        )}
      </div>
    </div>
  );
};

export default MapsPage;
