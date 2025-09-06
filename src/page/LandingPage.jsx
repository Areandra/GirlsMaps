import { useEffect, useLayoutEffect, useState } from "react";
import ButtonCostum from "../components/Button";
import { FetureCard, InfoCard } from "../components/Card";
import ColorPallate from "../theme/Color";
import { FiUnlock } from "react-icons/fi";

const LandingPage = ({
  lastPage,
  buttonOneOnClick,
  buttonTwoOnClick,
  navRef,
  windowSize,
  fetureCardOnClick,
}) => {
  const [navHeight, setNavHeight] = useState(0);

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
      imgUrl:
        "https://via.assets.so/img.jpg?w=400&h=400&pattern=waves&fg=ef4444&bg=fee2e2",
    },
    {
      id: "searchProduct",
      text: "Pencarian Produk Di Store Terdekat",
      imgUrl:
        "https://via.assets.so/img.jpg?w=400&h=400&pattern=waves&fg=ef4444&bg=fee2e2",
    },
    {
      id: "rekomend",
      text: (
        <>
          Rekomendasi <br /> Kosmetik
        </>
      ),
      imgUrl:
        "https://via.assets.so/img.jpg?w=400&h=400&pattern=waves&fg=ef4444&bg=fee2e2",
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
            }}
          >
            <h3 style={LandingPageStyles.subtitle}>
              Layan Kami Yang Terbaik Untuk Anda
            </h3>
            <h1 style={LandingPageStyles.title}>
              Solusi Untuk Kebingungan Anda Terkait SkinCare dan Kosmetik
            </h1>
            <p style={LandingPageStyles.paragraph}>
              Tidak perlu bingung lagi untuk memilih skincare! temukan
              rekomendasi produk yang tepat untuk kulit anda dan beserta toko
              terdekat hanya dengan satu klik.
            </p>
          </div>
          <div style={LandingPageStyles.buttonGroup}>
            <ButtonCostum
              text="Ayo Mulai"
              type="primary"
              onclick={() => buttonOneOnClick()}
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
            }}
          >
            <div
              style={{
                ...LandingPageStyles.fetureCardGroup,
                ...(windowSize.width < 450
                  ? {
                      width: `${150 * 2 + 10}px`,
                      justifyContent: "flex-start",
                      overflow: "auto",
                      padding: "8px 5px 8px 3px",
                      scrollbarWidth: "none",
                    }
                  : {}),
              }}
            >
              {windowSize.width > 450 && (
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
              )}
              {fetuereCardList.map((i, index) => (
                <FetureCard
                  key={index}
                  text={i.text}
                  id={i.id}
                  imageUrl={i.imgUrl}
                  onClick={() => i.onClick()}
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

const LandingPageStyles = {
  container: {
    display: "flex",
    flexDirection: "column",
    left: "5vw",
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
    left: "5vw",
    gap: "24px",
    top: 0,
    maxWidth: "clamp(250px, 40vw, 40vw)",
  },
  title: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    textAlign: "left",
    color: ColorPallate.text,
  },
  subtitle: {
    textAlign: "left",
    marginTop: 0,
    fontSize: "1rem",
    color: ColorPallate.text,
    width: "100vw",
  },
  paragraph: {
    fontSize: "0.75rem",
    maxWidth: "600px",
    textAlign: "left",
    color: ColorPallate.text,
  },
  buttonGroup: {
    display: "flex",
    gap: "16px",
    zIndex: 10,
  },
  cardGroup: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between", // ⬅️ ganti ini      gap: "16px",
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
    width: "clamp(330px, 65vw, 65vw)",
    height: "100dvh",
    backgroundImage:
      "linear-gradient(to right, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 40%, rgba(255,255,255,0.8) 60%, rgba(255,255,255,0.6) 70%, rgba(255,255,255,0.4) 80%, rgba(255,255,255,0.2) 90%, rgba(255,255,255,0.1) 100%)",
    zIndex: 5,
    transition: "left 0.5s ease, transform 0.5s ease",
  },
  textBackgroundDissmis: {
    transform: "translateX(-100%)",
  },
};

export default LandingPage;
