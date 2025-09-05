import {
  FiChevronLeft,
  FiChevronRight,
  FiClock,
  FiMapPin,
  FiPhoneCall,
  FiShoppingBag,
} from "react-icons/fi";
import ButtonCostum from "../components/Button";
import GlobalModal from "../components/Modal";
import ColorPallate from "../theme/Color";
import { BsFillStarFill } from "react-icons/bs";
import { MdFavorite } from "react-icons/md";
import { useEffect, useState } from "react";
import { InputForm } from "../components/InputForm";
import { PiMapPinSimpleLight } from "react-icons/pi";

const dayList = [
  "Senin",
  "Selasa",
  "Rabu",
  "Kamis",
  "Jumat",
  "Sabtu",
  "Minggu",
];

const infoList = [
  {
    id: "alamat",
    value: "Alamat Lengkap",
    icon: FiMapPin,
  },
  {
    id: "time",
    value: [
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
    value: "0812-3456-7890",
    icon: FiPhoneCall,
  },
];

const MapsPage = ({ dismiss, navRef, currentPin }) => {
  if (dismiss || !navRef?.current) return;

  const [showDeskripsi, setShowDeskripsi] = useState(false);
  const [showProduct, setShowProduct] = useState(false);

  useEffect(() => {
    console.log("lappor", currentPin);
    if (currentPin) setShowDeskripsi(true);
    else setShowDeskripsi(false);
  }, [currentPin]);

  const styles = {
    containerModal: {
      pointerEvents: showDeskripsi ? "all" : "none",
      left: "2vw",
      top:
        navRef?.current?.getBoundingClientRect?.()?.height +
        window.innerHeight * 0.06,
      position: "fixed",
    },
    deskripsiModal: {
      gap: 16,
      borderRadius: "30px",
      display: "flex",
      flexDirection: "column",
      overflow: "auto",
      width: "22vw",
      height: "77vh ",
      boxShadow: `0px 8px 8px rgba(0, 0, 0, 0.25)`,
    },
    productModal: {
      right: "2vw",
      top:
        navRef?.current?.getBoundingClientRect?.()?.height +
        window.innerHeight * 0.06,
      position: "fixed",
      gap: 16,
      borderRadius: "30px",
      display: "flex",
      flexDirection: "column",
      overflow: "auto",
      width: "22vw",
      height: "77vh ",
      boxShadow: `0px 8px 8px rgba(0, 0, 0, 0.25)`,
    },
    img: {
      borderRadius: "1vw",
      width: "100%",
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
      color: ColorPallate.text,
      textAlign: "left",
      fontSize: 16,
      alignItems: "center",
      fontWeight: 400,
      padding: 0,
    },
    contentContainer: {
      padding: 10,
      margin: 0,
      display: "flex",
      flexDirection: "column",
      maxWidth: "45vw",
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
        position: "absolute",
        zIndex: 10,
      }}
    >
      <ButtonCostum
        text="Cari Produk"
        icon={FiShoppingBag}
        type="floatingButton"
        onclick={() => setShowProduct(!showProduct)}
      />
      <div style={styles.containerModal}>
        <ButtonCostum
          onclick={() => setShowDeskripsi(!showDeskripsi)}
          content={
            showDeskripsi ? (
              <FiChevronLeft size={14} />
            ) : (
              <FiChevronRight size={14} />
            )
          }
          style={{
            position: "absolute",
            right: 0,
            top: "50%",
            transform: showDeskripsi
              ? "translateY(-50%) translateX(50%)"
              : "translateY(-50%) translateX(-22vw)",
            textAlign: "center",
            padding: 10,
            borderRadius: "12px",
            zIndex: 11,
            pointerEvents: "all"
          }}
          hoverScale={showDeskripsi ? 1.05 : 1}
        />
        <GlobalModal visible={showDeskripsi} styles={styles.deskripsiModal}>
          <img
            style={styles.img}
            src="https://fastly.picsum.photos/id/10/2500/1667.jpg?hmac=J04WWC_ebchx3WwzbM-Z4_KC_LeLBWr5LZMaAkWkF68"
          ></img>
          <div style={styles.contentContainer}>
            <h1 style={styles.tittleText}>
              {currentPin?.NamaTempat || "Store Name"}
            </h1>
            <span style={styles.rating}>
              <BsFillStarFill size={16} color="gold" />{" "}
              {currentPin?.rate || "0.0"} {currentPin?.rater || "(000)"}
            </span>
            <div style={styles.line}></div>
            <div style={styles.infoContainer}>
              {infoList.map((i) => {
                const IconComponent = i.icon;
                return (
                  <div
                    key={i.id}
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: i.id !== "time" ? "center" : "flex-start",
                      gap: 14,
                      justifyContent: "flex-start",
                    }}
                  >
                    <IconComponent size={20} color="black" />
                    {i.id !== "time" ? (
                      <p style={styles.lebelInfo}>{i.value}</p>
                    ) : (
                      <div
                        style={{
                          lineHeight: 1,
                          display: "flex",
                          flexDirection: "column",
                          gap: 8,
                        }}
                      >
                        {i.value.map((j, index) => (
                          <div
                            key={index}
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              width: "15vw",
                              fontSize: 16,
                              color: ColorPallate.text,
                              flexDirection: "row",
                            }}
                          >
                            <span style={{ flex: 1, textAlign: "left" }}>
                              {dayList[index]}
                            </span>
                            <span style={{ flex: 1, textAlign: "left" }}>
                              {j}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            <div style={styles.line}></div>
            <ButtonCostum text="Favorit" icon={MdFavorite} />
          </div>
        </GlobalModal>
      </div>
      <GlobalModal visible={showProduct} styles={styles.productModal}>
        <div style={styles.contentContainer}>
          <h1 style={styles.tittleText}>
            {currentPin?.NamaTempat || "Cari Produk"}
          </h1>
          <span style={styles.rating}>
            Bingung mencari produk yang Anda butuhkan? Kami menyediakan fitur
            pencarian lokasi berdasarkan produk pilihan Anda.{" "}
          </span>
          <InputForm
            placeholder="Cari Produk"
            style={{
              container: {
                width: "auto",
                borderRadius: 30,
              },
            }}
            hovercolor={ColorPallate.primary}
            color={ColorPallate.background}
            value={""}
            onChange={() => {}}
            clearQuery={() => {}}
          />
          <div style={styles.line}></div>
          <div style={styles.productContainer}></div>
          <div style={styles.line}></div>
          <ButtonCostum text="Temukan Produk Anda" icon={PiMapPinSimpleLight} />
        </div>
      </GlobalModal>
    </div>
  );
};

export default MapsPage;
