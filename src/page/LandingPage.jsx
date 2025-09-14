import { useEffect, useLayoutEffect, useRef, useState } from "react";
import ButtonCostum from "../components/Button";
import { FetureCard } from "../components/Card";
import ColorPallate from "../theme/Color";
import service1 from "../assets/Service1.png";
import service2 from "../assets/Service2.png";

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
  const serviceContainerRef = useRef();

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
      fontSize: windowSize.width > 700 ? "2.75rem" : "1.5rem",
      fontWeight: 500,
      color: ColorPallate.text,
      ...(windowSize.width > 700 ? { width: "80vw" } : {}),
      marginBlock: 20,
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
      flexDirection: "column",
      marginBottom: "4dvh",
      transition: "left 0.5s ease, transform 0.5s ease",
      zIndex: 10,
    },
    fetureCardGroup: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
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
      text: "Lokasi Store Make Up dan SkinCare",
      imageUrl: service1,
    },
    {
      id: "searchProduct",
      text: "Pencarian Produk Di Store Terdekat",
      imageUrl: service2,
    },
  ];

  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    if (activeIndex === null) setActiveIndex(0);
  }, [activeIndex])

  useEffect(() => {
    const container = serviceContainerRef.current;

    const handleScroll = () => {
      const itemWidth = container.children[0].offsetWidth;
      const index = Math.round(container.scrollLeft / itemWidth);
      setActiveIndex(index);
    };

    container.addEventListener("scroll", handleScroll);

    const interval = setInterval(() => {
      container.scrollBy({
        left: activeIndex === 0
          ? container.children[0].offsetWidth
          : -container.children[0].offsetWidth,
        behavior: "smooth",
      });
    }, 5000);

    return () => {
      clearInterval(interval);
      container.removeEventListener("scroll", handleScroll);
    };
  }, [activeIndex]);

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
                    alignItems: "center",
                  }
                : {}),
            }}
          >
            <div
              ref={serviceContainerRef}
              style={{
                ...LandingPageStyles.fetureCardGroup,
                width: 200,
                justifyContent: "flex-start",
                overflow: "auto",
                padding: "10px 14px 10px 14px",
                scrollSnapType: "x mandatory",
                scrollbarWidth: "none"
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
                  imageUrl={i.imageUrl}
                  onClick={() => i.onClick()}
                  styles={{
                    scrollSnapAlign: "start",
                  }}
                />
              ))}
            </div>
            <div
              style={{
                width: 228,
                justifyContent: "center",
                display: "flex",
              }}
            >
              <div style={{ display: "flex", flexDirection: "row", gap: 4 }}>
                <div
                  style={{
                    transition: "width 5s linear",
                    width: activeIndex === 0 ? 50 : 10,
                    height: 6,
                    borderRadius: 20,
                    background: ColorPallate.primaryGradient,
                  }}
                ></div>
                <div
                  style={{
                    transition: "width 5s linear",
                    width: activeIndex === 1 ? 50 : 10,
                    height: 6,
                    borderRadius: 20,
                    background: ColorPallate.primaryGradient,
                  }}
                ></div>
              </div>
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
