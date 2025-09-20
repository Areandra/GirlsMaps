import ButtonCostum from "../components/Button";
import ColorPallate from "../theme/Color";
import { FiCheckCircle, FiMap } from "react-icons/fi";
import { BsFillMoonStarsFill, BsRocketTakeoffFill } from "react-icons/bs";
import { RiUserCommunityLine } from "react-icons/ri";
import { BiCheckDouble } from "react-icons/bi";
import { GiJourney } from "react-icons/gi";
import { MdSupportAgent } from "react-icons/md";
import logo from "../assets/logo.png";

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

  const ourValues = [
    {
      title: "Community First",
      body: "We believe true strength comes from collaboration and sharing",
      icon: RiUserCommunityLine,
    },
    {
      title: "Authenticity",
      body: "Every review is honest, transparent, and from real experiences.",
      icon: BiCheckDouble,
    },
    {
      title: "Empowerment",
      body: "Supporting women to share, learn, and grow together.",
      icon: MdSupportAgent,
    },
    {
      title: "Innovation",
      body: "Constantly evolving to create the best experience possible",
      icon: GiJourney,
    },
  ];

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
              <div
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
                discover, support, and share local beauty spots with ease and
                joy. <br />
                <br />
                <label
                  style={{
                    fontSize: 14,
                    gap: 8,
                    display: "flex",
                    alignItems: "center",
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
                <ul
                  style={{
                    paddingInline: 16,
                    marginBlockStart: 8,
                  }}
                >
                  <li>Provide an accurate, interactive beauty map.</li>
                  <li>
                    Deliver authentic reviews from real community members.
                  </li>
                  <li>Build a supportive and empowering beauty community.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div
          style={{
            ...AboutUsPageStyles.topGroup,
            justifyContent: "flex-end",
            marginBlock: "20vh",
            height: "auto",
            width: "auto",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <h1 style={AboutUsPageStyles.title}>
              Why Choose{" "}
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
                Girls
              </label>
              Map?
            </h1>
            <p style={AboutUsPageStyles.paragraph}>
              With GirlsMap, you’re not just finding products — you’re joining a
              supportive community that values authenticity and empowerment.
              Together, we make beauty exploration fun, trustworthy, and
              inspiring.{" "}
              <label
                style={{
                  background: ColorPallate.primaryGradient,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                Our Values
              </label>
              ?.
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                width: "100%", // biar grid bisa melebar
                marginBlockStart: "8vh",
              }}
            >
              {ourValues.map((i, idx) => {
                const IconComponent = i.icon;
                return (
                  <div
                    key={idx}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: 20,
                      ...((idx + 1) % 2 !== 0
                        ? {
                            borderInlineEnd: `1px ${ColorPallate.background} solid`,
                          }
                        : {
                            borderInlineStart: `1px ${ColorPallate.background} solid`,
                          }),
                      ...(idx < 2
                        ? {
                            borderBlockEnd: `1px ${ColorPallate.background} solid`,
                            borderRadius: `0px 0px ${
                              (idx + 1) % 2 !== 0 ? 12 : 0
                            }px ${(idx + 1) % 2 === 0 ? 12 : 0}px`,
                          }
                        : {
                            borderBlockStart: `1px ${ColorPallate.background} solid`,
                            borderRadius: `${(idx + 1) % 2 == 0 ? 12 : 0}px ${
                              (idx + 1) % 2 !== 0 ? 12 : 0
                            }px 0px 0px`,
                          }),
                      gap: 10,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        padding: 8,
                        borderRadius: "50%",
                        background: ColorPallate.primaryGradient,
                        boxShadow: `inset 0 0 0 2px ${ColorPallate.secondary}, inset 0 4px 8px rgba(0, 0, 0, 0.2),  0px 4px 4px rgba(0, 0, 0, 0.1)`,
                      }}
                    >
                      <IconComponent color={"rgb(18,18,18)"} size={20} />
                    </div>
                    <p
                      style={{
                        ...AboutUsPageStyles.subtitle,
                        color: ColorPallate.text,
                      }}
                    >
                      {i.title}
                    </p>
                    <p
                      style={{
                        ...AboutUsPageStyles.paragraph,
                        width: "auto",
                      }}
                    >
                      {i.body}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div
          style={{
            ...AboutUsPageStyles.topGroup,
            justifyContent: "flex-end",
            marginBlockEnd: "20vh",
            height: "auto",
            width: "auto",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                padding: "20px",
                background: ColorPallate.background,
                boxShadow: `0px 4px 4px rgba(0, 0, 0, 0.25), inset 0px 0px 0px 4px ${ColorPallate.background}`,
                borderRadius: "16px",
                gap: 10,
                WebkitMaskImage:
                  "linear-gradient(to bottom, rgba(0,0,0,1)70%, rgba(0,0,0,0))",
                maskImage:
                  "linear-gradient(to bottom, rgba(0,0,0,1)70%, rgba(0,0,0,0))",
                backgroundSize: "cover",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "16px",
                }}
              >
                <img
                  src={logo}
                  alt="Girls Map Logo"
                  style={{ width: "40px", height: "40px", marginRight: "16px" }}
                />
                <h1
                  style={{
                    fontSize: "24px",
                    fontWeight: "600",
                    color: "#FFFFFF",
                    margin: "0",
                  }}
                >
                  <label
                    style={{
                      fontSize: "24px",
                      fontWeight: "600",
                      background:
                        "linear-gradient(to right, #FF76AF 0%, #F8494C 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      marginBottom: "24px",
                      paddingLeft: "4px",
                    }}
                  >
                    Girls
                  </label>
                  Map
                </h1>
              </div>
              <div style={{ textAlign: "centers" }}>
                <p
                  style={{
                    backgroundColor: ColorPallate.background,
                    color: ColorPallate.text,
                    padding: "16px 20px",
                    borderRadius: "14px",
                    marginBottom: "12px",
                    fontSize: "14px",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    transition: "background-color 0.3s ease",
                  }}
                >
                  30+{" "}
                  <label
                    style={{
                      background: ColorPallate.primaryGradient,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                      color: "transparent",
                    }}
                  >
                    Beauty
                  </label>{" "}
                  Stores already mapped in Palu
                </p>
                <p
                  style={{
                    color: ColorPallate.text,
                    backgroundColor: ColorPallate.background,
                    padding: "16px 20px",
                    borderRadius: "14px",
                    marginBottom: "12px",
                    fontSize: "14px",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    display: "flex",
                    alignItems: "center",
                    transition: "background-color 0.3s ease",
                  }}
                >
                  Dozens of Products listed and growing
                </p>
              </div>
            </div>
            <h1 style={{ ...AboutUsPageStyles.title, marginBlockStart: 0 }}>
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
                Community
              </label>{" "}
              Today?
            </h1>
            <p style={AboutUsPageStyles.paragraph}>
              We are just getting started — and we’re proud of it! <br />
              (Soon, expanding to more cities across Indonesia!)
            </p>
          </div>
        </div>
        <div
          style={{
            ...AboutUsPageStyles.topGroup,
            justifyContent: "flex-end",
            marginBlockEnd: "20vh",
            height: "auto",
            width: "auto",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <h1 style={{ ...AboutUsPageStyles.title, marginBlockStart: 0 }}>
              Meet The
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
                {" "}
                Team`s
              </label>
            </h1>
            <p style={AboutUsPageStyles.paragraph}>
              A small team with a big vision.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUsPage;
