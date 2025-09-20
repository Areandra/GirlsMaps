import {
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
import { MdFavorite } from "react-icons/md";
import { useEffect, useRef, useState } from "react";

const dayList = [
  "Senin",
  "Selasa",
  "Rabu",
  "Kamis",
  "Jumat",
  "Sabtu",
  "Minggu",
];

const MapsPage = ({ dismiss, navRef, currentPin, windowSize }) => {
  if (dismiss) return;

  const [showDeskripsi, setShowDeskripsi] = useState(false);
  const [showFullDeskripsi, setShowFullDeskripsi] = useState(false);
  const [deskripsiData, setDeskripsiData] = useState(null);
  const deskripsiRef = useRef();

  useEffect(() => {
    if (deskripsiRef.current && !showFullDeskripsi) {
      console.log("panggil");
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
            width: "22vw",
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
                {currentPin?.product.lenght !== 0 &&
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
              <div style={styles.line}></div>
              <ButtonCostum text="Favorit" icon={MdFavorite} />
            </div>
          </GlobalModal>
        )}
      </div>
    </div>
  );
};

export default MapsPage;
