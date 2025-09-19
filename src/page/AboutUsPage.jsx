import { useLayoutEffect } from "react";
import ButtonCostum from "../components/Button";
import ColorPallate from "../theme/Color";
import { FiCheckCircle, FiMap, FiSearch } from "react-icons/fi";
import { FaGrinStars } from "react-icons/fa";
import {
  BsFillMoonStarsFill,
  BsFillRocketTakeoffFill,
  BsRocketTakeoff,
  BsRocketTakeoffFill,
} from "react-icons/bs";
import { AiFillRocket } from "react-icons/ai";

const AboutUsPage = ({ lastPage, windowSize, user, setLastPage }) => {
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
          <div style={{ display: "flex", justifyContent: "center" }}>
            <ButtonCostum
              icon={!user ? FiCheckCircle : FiMap}
              text={user ? "Start Exploring" : "Join Our Comunity"}
              type="primary"
              onclick={() => setLastPage("map")}
            />
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
                    color: ColorPallate.text,
                    gap: 6,
                    display: "flex",
                    alignItems: "center",
                    marginBlockEnd: 8,
                    fontSize: 14,
                  }}
                >
                  Our{""}
                  <label
                    style={{
                      background: ColorPallate.primaryGradient,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                      color: "transparent",
                    }}
                  >
                    Vision
                  </label>
                  <BsFillMoonStarsFill color="rgba(255, 242, 0, 1)" />
                </label>
                To become the go-to platform for every Indonesian woman to
                discover and support local beauty spots. <br />
                <br />
                <label
                  style={{
                    fontSize: 14,
                    gap: 8,
                    display: "flex",
                    alignItems: "center",
                    marginBlockEnd: 8,
                  }}
                >
                  Our
                  <label
                    style={{
                      background: ColorPallate.primaryGradient,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                      color: "transparent",
                    }}
                  >
                    Mission
                  </label>
                  <BsRocketTakeoffFill color="rgba(168, 241, 126, 1)" />
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
