import { useLayoutEffect, useState } from "react";
import ButtonCostum from "../components/Button";
import { FetureCard, InfoCard } from "../components/Card";
import ColorPallate from "../theme/Color";

const LandingPage = ({
  lastPage,
  buttonOneOnClick,
  buttonTwoOnClick,
  navRef,
  windowSize,
  fetureCardOnClick,
  user,
  setLastPage,
}) => {
  const [navHeight, setNavHeight] = useState(0);

  const LandingPageStyles = {
    container: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      left: "10vw",
      width: "80vw",
      textAlign: windowSize.width > 700 ? "left" : "center",
      top: 0,
      position: "fixed",
      height: "100dvh",
      transition: "left 0.5s ease, transform 0.5s ease",
      zIndex: 10,
    },
    topGroup: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: windowSize.width > 700 ? "flex-start" : "center",
      gap: "28px",
      top: 0,
    },
    title: {
      fontSize: windowSize.width > 700 ? "3rem" : "1.5rem",
      fontWeight: 600,
      color: ColorPallate.text,
      ...(windowSize.width > 700 ? { width: "80vw" } : {}),
      marginBottom: 20,
    },
    subtitle: {
      marginBottom: 0,
      fontSize: "clamp(12px, 1.25vw, 1rem)",
      fontWeight: 500,
      color: ColorPallate.secondaryText,
      width: windowSize.width > 700 ? "100vw" : "100%",
    },
    paragraph: {
      fontSize: "0.75rem",
      maxWidth: windowSize.width > 700 ? "450px" : "100%",
      color: ColorPallate.secondaryText,
    },
    buttonGroup: {
      display: "flex",
      gap: "24px",
      zIndex: 10,
    },
    cardGroup: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: "4dvh",
      transition: "left 0.5s ease, transform 0.5s ease",
      zIndex: 10,
    },
    fetureCardGroup: {
      display: "flex",
      flexDirection: "row",
      gap: "8px",
      justifyContent: "center",
      alignContent: "center",
    },
    dismissCardGroup: {
      transform: "translateY(150%)",
    },
    containerDissmis: {
      left: "0",
      transform: "translateX(-100%)",
    },
    textBackground: {
      position: "absolute",
      top: "0",
      left: "0",
      width: "clamp(330px, 100vw, 100vw)",
      height: "100dvh",
      backgroundImage:
        "linear-gradient(to right, rgba(18, 18, 18, 1) 0%, rgba(18, 18, 18, 1) 40%, rgba(18, 18, 18, 0.8) 60%, rgba(18, 18, 18, 0.6) 70%, rgba(18, 18, 18, 0.4) 80%, rgba(18, 18, 18, 0.2) 90%, rgba(18, 18, 18, 0.1) 100%)",
      zIndex: 5,
      backdropFilter: "blur(1px)",
      transition: "left 0.5s ease, transform 0.5s ease",
    },
    textBackgroundDissmis: {
      transform: "translateX(-100%)",
    },
  };

  useLayoutEffect(() => {
    if (navRef.current) {
      setNavHeight(navRef.current.getBoundingClientRect().height);
    }
  }, [navRef]);

  const fetuereCardList = [
    {
      id: "locationStore",
      onClick: () => fetureCardOnClick[0](),
      text: "Lokasi Make Up & SkinCare Store",
    },
    {
      id: "searchProduct",
      text: "Pencarian Produk Di Store Terdekat",
    },
    {
      id: "rekomend",
      text: (
        <>
          Rekomendasi <br /> Kosmetik
        </>
      ),
    },
  ];

  const infoList = [
    {
      id: "store",
      title: ">30",
      deskripsi: "Lokasi Ada di DataBase di Kami",
    },
    {
      id: "store",
      title: ">15",
      deskripsi: "Inforamsi Produk Ada di DataBase Kami",
    },
  ];

  return (
    <>
      <div
        style={{
          ...LandingPageStyles.container,
          ...(lastPage != "home" ? LandingPageStyles.containerDissmis : {}),
        }}
      >
        <div style={LandingPageStyles.topGroup}>
          <div
            style={{
              marginTop: navHeight + window.innerHeight * 0.03,
              ...(windowSize.width < 700
                ? {
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems:
                      windowSize.width > 700 ? "flex-start" : "center",
                  }
                : {}),
            }}
          >
            <h3 style={LandingPageStyles.subtitle}>
              Layan Kami Yang Terbaik Untuk Anda
            </h3>
            <h1 style={LandingPageStyles.title}>
              Cari Produk yang Kamu Inginkan, Temukan Lokasinya Seketika
            </h1>
            <p style={LandingPageStyles.paragraph}>
              Jelajahi peta interaktif kami untuk menemukan toko kosmetik
              terdekat dan produk yang Anda cari dengan mudah. Semua informasi
              lokasi dan produk ada dalam satu aplikasi, cepat, akurat, dan
              praktis.
            </p>
          </div>
          <div style={LandingPageStyles.buttonGroup}>
            <ButtonCostum
              text={user ? "Buka Peta" : "Ayo Mulai"}
              type="primary"
              onclick={() => (user ? setLastPage("map") : buttonOneOnClick())}
            />
            <ButtonCostum
              text="Lebih Lanjut"
              type="textButton"
              onclick={() => buttonTwoOnClick()}
            />
          </div>
        </div>
        {windowSize.height > 575 && (
          <div
            style={{
              ...LandingPageStyles.cardGroup,
              ...(lastPage != "home" ? LandingPageStyles.dismissCardGroup : {}),
              ...(windowSize.width < 700
                ? {
                    justifyContent: "center",
                  }
                : {}),
            }}
          >
            <div
              style={{
                ...LandingPageStyles.fetureCardGroup,
                ...(windowSize.width < 450
                  ? {
                      width: `150px`,
                      justifyContent: "flex-start",
                      overflow: "auto",
                      padding: "8px 5px 8px 3px",
                      scrollSnapType: "x mandatory",
                    }
                  : {}),
              }}
            >
              {/* (
                <InfoCard
                  title={
                    <span>
                      Kami Telah
                      <br />
                      <span style={{ color: ColorPallate.text }}>
                        Mengumpulkan
                      </span>
                    </span>
                  }
                  infoList={infoList}
                />
              )*/}
              {fetuereCardList.map((i, index) => (
                <FetureCard
                  key={index}
                  text={i.text}
                  id={i.id}
                  imageUrl={i.imgUrl}
                  onClick={() => i.onClick()}
                  styles={{
                    ...(windowSize.width < 700
                      ? { scrollSnapAlign: "start" }
                      : {}),
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </div>
      <div
        style={{
          ...LandingPageStyles.textBackground,
          ...(lastPage != "home"
            ? LandingPageStyles.textBackgroundDissmis
            : {}),
        }}
      ></div>
    </>
  );
};

export default LandingPage;
