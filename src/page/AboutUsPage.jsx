import { useEffect, useLayoutEffect, useRef, useState } from "react";
import ButtonCostum from "../components/Button";
import ColorPallate from "../theme/Color";
import service1 from "../assets/Service1.png";
import service2 from "../assets/Service2.png";
import { FiArrowDownLeft, FiArrowDownRight } from "react-icons/fi";

const AboutUsPage = ({
  lastPage,
  buttonOneOnClick,
  buttonTwoOnClick,
  navRef,
  windowSize,
  user,
  setLastPage,
}) => {
  const [navHeight, setNavHeight] = useState(0);
  const serviceContainerRef = useRef();

  const AboutUsPageStyles = {
    container: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
      left: "10vw",
      width: "80vw",
      top: 0,
      position: "absolute",
      transition: "left 0.5s ease, transform 0.5s ease",
      zIndex: 10,
    },
    topGroup: {
      height: "85dvh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      gap: "28px",
      top: 0,
    },
    title: {
      fontSize: windowSize.width > 700 ? "2.75rem" : "1.5rem",
      fontWeight: 500,
      color: ColorPallate.text,
      marginBlock: 20,
    },
    subtitle: {
      margin: 0,
      fontSize: windowSize.width > 450 ? "0.75rem" : "11px",
      fontWeight: 500,
      color: ColorPallate.secondaryText,
    },
    paragraph: {
      fontSize: windowSize.width > 450 ? "0.75rem" : "11px",
      width: windowSize.width > 700 ? "72vw" : "100%",
      color: ColorPallate.secondaryText,
    },
    buttonGroup: {
      display: "flex",
      gap: "24px",
      zIndex: 10,
    },
    containerDissmis: {
      left: "0",
      transform: "translateX(-100%)",
    },
  };

  useLayoutEffect(() => {
    if (navRef.current) {
      setNavHeight(navRef.current.getBoundingClientRect().height);
    }
  }, [navRef]);

  return (
    <>
      <div
        style={{
          ...AboutUsPageStyles.container,
          ...(lastPage != "about" ? AboutUsPageStyles.containerDissmis : {}),
        }}
      >
        <div style={AboutUsPageStyles.topGroup}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <h1 style={AboutUsPageStyles.title}>
              Mapping the World of{" "}
              <label
                style={{
                  ...AboutUsPageStyles.title,
                  background: ColorPallate.primaryGradient,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                Beauty
              </label>
              ,<br />
              Just for You.
            </h1>
            <p style={AboutUsPageStyles.paragraph}>
              We believe finding your favorite beauty products should be a
              delightful adventure, not a tiring hunt. That's why GirlsMap was
              born.
            </p>
          </div>
        </div>
        <div
          style={{
            ...AboutUsPageStyles.topGroup,
            height: windowSize.width > 700 ? "75dvh" : "65dvh",
            justifyContent: "flex-end",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              textAlign: "left",
            }}
          >
            <h1
              style={{
                ...AboutUsPageStyles.title,
                width: windowSize.width > 700 ? "70vw" : "",
              }}
            >
              From a Simple{" "}
              <label
                style={{
                  ...AboutUsPageStyles.title,
                  background: ColorPallate.primaryGradient,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                Coffee Chat
              </label>{" "}
              to a Community Map.
            </h1>
          </div>
        </div>
        <div
          style={{
            ...AboutUsPageStyles.topGroup,
            height: "100%",
            justifyContent: "flex-end",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              textAlign: "left",
              marginTop: "4vh",
            }}
          >
            <h1
              style={{
                ...AboutUsPageStyles.title,
                fontSize: 20,
                background: ColorPallate.primaryGradient,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              Our Story
            </h1>
            <div
              style={{
                justifyContent: "flex-start",
                display: "flex",
              }}
            >
              <p
                style={{
                  ...AboutUsPageStyles.paragraph,
                  width: windowSize.width > 700 ? "45vw" : "",
                }}
              >
                GirlsMap started over a cup of coffee and one simple question:
                "Where can I find serum X in this city?" We were tired of
                spending our weekends searching fruitlessly. From that moment,
                we were determined to create a solution.
                <br />
                <br />
                <label
                  style={{
                    ...AboutUsPageStyles.paragraph,
                    background: ColorPallate.primaryGradient,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  Our Vision{" "}
                </label>
                To become the go-to platform for every Indonesian woman to
                discover and support local beauty spots.{" "}
                <label
                  style={{
                    ...AboutUsPageStyles.paragraph,
                    background: ColorPallate.primaryGradient,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  Our Mission{" "}
                </label>
                To provide an accurate interactive map, authentic reviews, and a
                supportive community.
              </p>
            </div>
          </div>
        </div>
        <div style={AboutUsPageStyles.topGroup}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <h1 style={AboutUsPageStyles.title}>
              Mapping the World of{" "}
              <label
                style={{
                  ...AboutUsPageStyles.title,
                  background: ColorPallate.primaryGradient,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                Beauty
              </label>
              ,<br />
              Just for You.
            </h1>
            <p style={AboutUsPageStyles.paragraph}>
              We believe finding your favorite beauty products should be a
              delightful adventure, not a tiring hunt. That's why GirlsMap was
              born.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUsPage;
