import ButtonCostum from "../components/Button";
import ColorPallate from "../theme/Color";
import { FiMap } from "react-icons/fi";
import { BsRocketTakeoffFill } from "react-icons/bs";
import { RiUserCommunityLine } from "react-icons/ri";
import { BiCheckDouble } from "react-icons/bi";
import { MdSupportAgent } from "react-icons/md";
import logo from "../assets/logo.png";
import aril from "../assets/Aril.jpg";
import caca from "../assets/caca.jpg";
import kelpin from "../assets/kelpin.jpg";
import { GradientText } from "../components/GradientText";
import React from "react";

const AboutUsPage = React.memo(
  ({ lastPage, windowSize, setLastPage, setNotif }) => {
    const AboutUsPageStyles = {
      container: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        left: "10vw",
        width: "80vw",
        top: 0,
        position: "absolute",
        transition: lastPage != "about" ? "" : "0.3s ease",
        zIndex: 10,
      },
      topGroup: {
        height: "85vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: "28px",
        top: 0,
      },
      title: {
        fontSize: windowSize.width > 700 ? "2.75rem" : "1.5rem",
        fontWeight: 500,
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
        bottom: 0,
        transform: "translateY(100%)",
        opacity: 0,
      },
    };

    const teamList = [
      {
        name: "Salsabila",
        title: "Project Manager",
        description: "System Analysis, QA & Tech Documentation",
        imgSrc: caca,
      },
      {
        name: "Putu Kelvin Desta Pratama",
        title: "Product Designer",
        description: "UI/UX, System & Database Architecture",
        imgSrc: kelpin,
      },
      {
        name: "Muh. Ariel aka Areandra",
        title: "Full-Stack Software Engineer",
        description: "Software Development & Implementation",
        imgSrc: aril,
      },
    ];

    const ourValues = [
      {
        title: "Terkurasi & Akurat",
        body: "Setiap toko kami datangi langsung. Menjamin data 100% akurat.",
        icon: RiUserCommunityLine,
      },
      {
        title: "Fokus pada Kosmetik",
        body: "Hanya toko kosmetik. Menjamin pencarianmu selalu relevan.",
        icon: BiCheckDouble,
      },
      {
        title: "Cepat & Efisien",
        body: "Temukan lokasi dalam hitungan detik. Tanpa perlu scroll tanpa henti.",
        icon: MdSupportAgent,
      },
      {
        title: "Terlengkap di Palu",
        body: "Memetakan semua toko kosmetik di Palu, bahkan tersembunyi.",
        icon: MdSupportAgent,
      },
    ];

    const footerList = [
      {
        tittle: "Fitur",
        list: ["Peta", "Cari Toko Berdasarkan Produk"],
        onclick: [() => setLastPage("map"), () => setLastPage("map")],
      },
      {
        tittle: "Kami",
        list: ["GirlsMap", "Tentang Kami"],
        onclick: [() => setLastPage("home"), () => setLastPage("about")],
      },
      {
        tittle: "Atribusi & Lisensi",
        list: [
          "Leaflet",
          "Esri",
          "DeLorme",
          "NAVTEQ",
          "Copyright - 2025 Nawsome",
        ],
        onclick: [
          () => window.open("https://leafletjs.com", "_blank"),
          () => window.open("https://www.esri.com", "_blank"),
          () => window.open("https://www.esri.com", "_blank"),
          () => window.open("https://www.esri.com", "_blank"),
          () =>
            setNotif(`Permission is hereby granted, free of charge, to any person
            obtaining a copy of this software and associated documentation files
            (the "Software"), to deal in the Software without restriction,
            including without limitation the rights to use, copy, modify, merge,
            publish, distribute, sublicense, and/or sell copies of the Software,
            and to permit persons to whom the Software is furnished to do so,
            subject to the following conditions: The above copyright notice and
            this permission notice shall be included in all copies or
            substantial portions of the Software. THE SOFTWARE IS PROVIDED "AS
            IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT
            NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
            PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
            AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR
            OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
            OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE
            OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.`),
        ],
      },
      {
        tittle: "Connect",
        list: ["Contoct Us", "Instagram"],
        onclick: [
          () => {},
          () =>
            window.open(
              "https://www.instagram.com/byteb24?igsh=NnR2bDU3aGdiYWll",
              "_blank"
            ),
        ],
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
                Panduan{" "}
                <GradientText style={AboutUsPageStyles.title}>
                  Kecantikan
                </GradientText>{" "}
                Terlengkap
                <br />
                Dibuat Untukmu.
              </h1>
              <p style={AboutUsPageStyles.paragraph}>
                Kami percaya menemukan produk kecantikan favoritmu seharusnya
                menjadi petualangan yang menyenangkan, bukan perburuan yang
                melelahkan. Itulah mengapa GirlsMap lahir.
              </p>
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <ButtonCostum
                icon={FiMap}
                text={"Ayo Jelajah"}
                type="primary"
                onclick={() => setLastPage("map")}
              />
            </div>
          </div>
          <div
            style={{
              ...AboutUsPageStyles.topGroup,
              height: windowSize.width > 700 ? "75vh" : "65vh",
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
                Dari Keluhan{" "}
                <GradientText style={AboutUsPageStyles.title}>
                  Saat Ngopi
                </GradientText>{" "}
                Menjadi Sebuah Solusi.
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
              <GradientText style={{ fontSize: 24, fontWeight: 600 }}>
                Cerita Kami
              </GradientText>
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
                  Berawal dari obrolan santai (dan sedikit keluhan!), kami sadar
                  betapa sulitnya menemukan informasi toko kosmetik yang lengkap
                  dan akurat di Palu. Dari sanalah ide GirlsMap lahir: satu peta
                  terpusat yang kami bangun dan verifikasi secara khusus untuk
                  menjadi kompas kecantikan andalan Anda di kota ini
                  <br />
                  <br />
                  <label
                    style={{
                      color: ColorPallate.text,
                      fontSize: 14,
                      gap: 8,
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <GradientText>Misi</GradientText> Kami
                    <BsRocketTakeoffFill color="rgba(168, 241, 126, 1)" />
                  </label>
                  Kami lelah dengan info toko kosmetik di Palu yang tidak pasti.
                  Jadi, kami ciptakan solusinya: satu peta terkurasi untuk semua
                  kebutuhan kecantikanmu.
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
                Kenapa Pilih{" "}
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
                Kami percaya, menemukan informasi kecantikan haruslah mudah dan
                bisa diandalkan. Karena itu, kami membangun GirlsMap bukan
                sekadar sebagai peta, melainkan sebagai kompas tepercaya Anda di
                Palu. Inilah yang membuat kami berbeda.{" "}
                <label
                  style={{
                    background: ColorPallate.primaryGradient,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  Keunggulan Kami
                </label>
                ?.
              </p>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  width: "100%",
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
                    style={{
                      width: "40px",
                      height: "40px",
                      marginRight: "16px",
                    }}
                  />
                  <h1
                    style={{
                      fontSize: "24px",
                      fontWeight: "600",
                      margin: "0",
                    }}
                  >
                    <GradientText style={{ fontSize: "24px" }}>
                      Girls
                    </GradientText>
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
                    32+ Toko <GradientText>Kecantikan</GradientText> di Palu
                    terpetakan
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
                    }}
                  >
                    50+ Produk <GradientText>Kecantikan</GradientText> telah
                    terdaftar
                  </p>
                </div>
              </div>
              <h1 style={{ ...AboutUsPageStyles.title, marginBlockStart: 0 }}>
                Temukan{" "}
                <GradientText style={AboutUsPageStyles.title}>
                  Informasi
                </GradientText>{" "}
                Yang Kamu Cari.
              </h1>
              <p style={AboutUsPageStyles.paragraph}>
                GirlsMap lahir di Palu, untuk Palu. Tujuan kami sederhana :
                <br />
                menjadi sumber informasi kecantikan nomor satu di kota ini
              </p>
            </div>
          </div>
          <div
            style={{
              ...AboutUsPageStyles.topGroup,
              justifyContent: "flex-end",
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
                Kenalan
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
                  Yuk!
                </label>
              </h1>
              <p style={AboutUsPageStyles.paragraph}>
                Tim kecil kecilan dengan visi besar.
              </p>
              <div
                style={{
                  width: "100%",
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                }}
              >
                {teamList.map((i, idx) => (
                  <div
                    key={idx}
                    style={{
                      marginInline: "auto",
                      marginBlockStart: "5vh",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-end",
                      padding: "4px",
                      maxWidth: "300px",
                      width: "65vw",
                      background: ColorPallate.background,
                      boxShadow: `0px 4px 4px rgba(0, 0, 0, 0.25), inset 0px 0px 0px 2px ${ColorPallate.background}`,
                      borderRadius: "16px",
                      height: "86.67vw",
                      maxHeight: "400px",
                      minWidth: "200px",
                      backgroundSize: "cover",
                    }}
                  >
                    <div
                      style={{
                        padding: 12,
                        position: "relative",
                        zIndex: 1,
                        display: "flex",
                        flexDirection: "column",
                        gap: 8,
                      }}
                    >
                      {" "}
                      <p
                        style={{
                          fontWeight: "bold",
                          textAlign: "left",
                          color: ColorPallate.text,
                        }}
                      >
                        {i.name}
                      </p>
                      <p
                        style={{
                          ...AboutUsPageStyles.paragraph,
                          width: "100%",
                          textAlign: "left",
                          color: ColorPallate.secondaryText,
                        }}
                      >
                        {i.title}
                      </p>
                      <p
                        style={{
                          width: "100%",
                          textAlign: "left",
                          color: ColorPallate.secondaryText,
                          fontSize: "12px",
                          marginTop: "-4px",
                          fontStyle: "italic",
                        }}
                      >
                        {i.description}
                      </p>
                    </div>
                    {i.imgSrc && (
                      <img
                        style={{
                          position: "absolute",
                          objectPosition: "top",
                          maxWidth: "300px",
                          width: "65vw",
                          height: "86.67vw",
                          objectFit: "cover",
                          maxHeight: "400px",
                          borderRadius: 12,
                          WebkitMaskImage:
                            "linear-gradient(to bottom, rgba(0,0,0,1) 65%, rgba(0,0,0,0) 85%)",
                          maskImage:
                            "linear-gradient(to bottom, rgba(0,0,0,1) 65%, rgba(0,0,0,0) 85%)",
                        }}
                        src={i.imgSrc}
                        alt=""
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div style={{ ...AboutUsPageStyles.topGroup, marginBlock: "-10vh" }}>
            <h1 style={AboutUsPageStyles.title}>
              Siap Menjelajah Dunia <GradientText>Kecantikan</GradientText>{" "}
              Palu?
            </h1>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <ButtonCostum
                icon={FiMap}
                text="Ayo Jelajahi Peta Sekarang"
                type="primary"
                onclick={() => setLastPage("map")}
              />
            </div>
          </div>
          <div
            style={{
              ...AboutUsPageStyles.topGroup,
              justifyContent: "flex-end",
              marginBlockEnd: "50px",
              height: "auto",
              width: "auto",
            }}
          >
            <div
              style={{
                textAlign: "center",
                width: "100vvw",
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))",
                borderBlockStart: `2px ${ColorPallate.background} solid`,
                paddingBlock: "3vh",
              }}
            >
              <div>
                <img
                  onClick={() => setLastPage("home")}
                  style={{
                    width: 30,
                    paddingBlockStart: "2vh",
                    cursor: "pointer",
                  }}
                  src={logo}
                />
              </div>
              {footerList.map((i, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: 12,
                    position: "relative",
                    zIndex: 1,
                    display: "flex",
                    flexDirection: "column",
                    gap: 8,
                  }}
                >
                  {" "}
                  <p
                    style={{
                      fontWeight: "bold",
                      textAlign: "left",
                      color: ColorPallate.text,
                    }}
                  >
                    {i.tittle}
                  </p>
                  {i.list.map((j, idxj) => (
                    <a
                      onClick={() => i.onclick[idxj]()}
                      key={idxj}
                      style={{
                        ...AboutUsPageStyles.paragraph,
                        width: "90%",
                        textAlign: "left",
                        color: ColorPallate.secondaryText,
                        cursor: "pointer",
                      }}
                    >
                      {j}
                    </a>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </>
    );
  }
);

export default AboutUsPage;
