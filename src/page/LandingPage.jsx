import { useEffect, useLayoutEffect, useRef, useState } from "react";
import ButtonCostum from "../components/Button";
import { FetureCard } from "../components/Card";
import ColorPallate from "../theme/Color";
import service1 from "../assets/Service1.png";
import service2 from "../assets/Service2.png";
import { FiChevronRight } from "react-icons/fi";

const LandingPage = ({
  lastPage,
  buttonOneOnClick,
  buttonTwoOnClick,
  navRef,
  windowSize,
  fetureCardOnClick,
  user,
  setLastPage,
  dissmis,
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
      textAlign: "center",
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
      alignItems: "center",
      gap: "28px",
      top: 0,
    },
    title: {
      fontSize: windowSize.width > 700 ? "2.75rem" : "1.5rem",
      fontWeight: 500,
      color: ColorPallate.text,
      marginBlock: 20,
      width: windowSize.width > 700 ? "70vw" : "",
    },
    subtitle: {
      margin: 0,
      fontSize: windowSize.width > 450 ? "0.75rem" : "10px",
      fontWeight: 500,
      color: ColorPallate.secondaryText,
    },
    paragraph: {
      fontSize: windowSize.width > 450 ? "0.75rem" : "10px",
      width: windowSize.width > 700 ? "72vw" : "100%",
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
      opacity: 1,
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
  }, [activeIndex]);

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
        left:
          activeIndex === 0
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
          ...(lastPage != "home" && !dissmis
            ? LandingPageStyles.containerDissmis
            : {}),
        }}
      >
        <div style={LandingPageStyles.topGroup}>
          <div
            style={{
              marginTop: navHeight + window.innerHeight * 0.03,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{
                padding: "8px 14px",
                background: ColorPallate.background,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                borderRadius: 12,
                backgroundBlendMode: "overlay",
                gap: 8,
              }}
            >
              <div>
                <h3
                  style={{
                    ...LandingPageStyles.subtitle,
                    background: ColorPallate.primaryGradient,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  #1 & Best
                </h3>
              </div>
              <h3 style={LandingPageStyles.subtitle}>Your Beauty Compass</h3>
            </div>
            <h1 style={LandingPageStyles.title}>
              Know the Product? We'll Find the Store
              <br />
              Maps the City's Best{" "}
              <label
                style={{
                  ...LandingPageStyles.title,
                  background: ColorPallate.primaryGradient,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                Beauty Spots
              </label>
              .
            </h1>
            <p style={LandingPageStyles.paragraph}>
              Let our interactive map be your compass. Search for your favorite
              products and brands, and embark on a journey to discover every
              local store that holds what you're looking for. We provide the
              location, you make the purchase. It's that simple.
            </p>
          </div>
          <div style={LandingPageStyles.buttonGroup}>
            <ButtonCostum
              icon={!user ? FiChevronRight : FiMap}
              text={user ? "Start Exploring" : "Get Started"}
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
              alignItems: "center",
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
                scrollbarWidth: "none",
              }}
            >
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
