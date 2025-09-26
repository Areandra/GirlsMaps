import { useLayoutEffect, useState } from "react";
import Button from "../components/Button/PrimaryButton";
import ColorPallate from "../theme/Color";
import service1 from "../assets/Service1.png";
import service2 from "../assets/Service2.png";
import { FiChevronRight, FiMap } from "react-icons/fi";
import { GradientText } from "../components/GradientText";
import { AutoSlideCard } from "../widgets/CardGroupping/AutoSlidesCard";

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
              ...LandingPageStyles.textGroup,
            }}
          >
            <div style={LandingPageStyles.sloganGroup}>
              <div>
                <GradientText
                  style={{
                    ...LandingPageStyles.subtitle,
                    fontSize: windowSize.width > 450 ? "0.75rem" : "10px",
                  }}
                >
                  #1 & Best
                </GradientText>
              </div>
              <h3
                style={{
                  ...LandingPageStyles.subtitle,
                  fontSize: windowSize.width > 450 ? "0.75rem" : "10px",
                }}
              >
                Your Beauty Compass
              </h3>
            </div>
            <h1
              style={{
                ...LandingPageStyles.title,
                fontSize: windowSize.width > 800 ? "2.75rem" : "1.5rem",
                width: windowSize.width > 800 ? "70vw" : "",
              }}
            >
              Know the Product? We'll Find the Store
              <br />
              Maps the City's Best{" "}
              <GradientText
                style={{
                  fontSize: windowSize.width > 800 ? "2.75rem" : "1.5rem",
                }}
              >
                Beauty Spots
              </GradientText>
              .
            </h1>
            <p
              style={{
                ...LandingPageStyles.paragraph,
                fontSize: windowSize.width > 450 ? "0.75rem" : "10px",
                width: windowSize.width > 700 ? "72vw" : "100%",
              }}
            >
              Let our interactive map be your compass. Search for your favorite
              products and brands, and embark on a journey to discover every
              local store that holds what you're looking for. We provide the
              location, you make the purchase. It's that simple.
            </p>
          </div>
          <div style={LandingPageStyles.buttonGroup}>
            <Button
              icon={!user ? FiChevronRight : FiMap}
              onclick={() => (user ? setLastPage("map") : buttonOneOnClick())}
            >
              {user ? "Start Exploring" : "Get Started"}
            </Button>
            <Button onclick={() => buttonTwoOnClick()} text={true}>
              Lets Know Us
            </Button>
          </div>
        </div>
        {windowSize.height > 575 && (
          <div style={LandingPageStyles.cardGroup}>
            <AutoSlideCard cardContentList={fetuereCardList} />
          </div>
        )}
      </div>
    </>
  );
};

const LandingPageStyles = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    opacity: 1,
    width: "100vw",
    textAlign: "center",
    top: 0,
    position: "fixed",
    height: "100dvh",
    transition: "0.5s ease",
    top: "0",
    left: "0",
    height: "100dvh",
    backgroundImage:
      "linear-gradient(to right, rgba(16, 18, 22, 1) 0%, rgba(16, 18, 22, 1) 40%, rgba(16, 18, 22, 0.8) 60%, rgba(16, 18, 22, 0.6) 70%, rgba(16, 18, 22, 0.4) 80%, rgba(16, 18, 22, 0.2) 90%, rgba(16, 18, 22, 0.1) 100%)",
    zIndex: 5,
    backdropFilter: "blur(4px)",
  },
  topGroup: {
    flex: 1,
    width: "80%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "28px",
    top: 0,
  },
  textGroup: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  sloganGroup: {
    padding: "8px 14px",
    background: ColorPallate.background,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    backgroundBlendMode: "overlay",
    gap: 8,
  },
  title: {
    fontWeight: 500,
    color: ColorPallate.text,
    marginBlock: 20,
  },
  subtitle: {
    margin: 0,
    fontWeight: 500,
    color: ColorPallate.secondaryText,
  },
  paragraph: {
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
    alignItems: "center",
  },
  containerDissmis: {
    left: "0",
    opacity: 0,
    transform: "translateX(-100%)",
  },
};

export default LandingPage;
