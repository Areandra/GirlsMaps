import ButtonCostum from "../components/Button";
import { FetureCard, InfoCard } from "../components/Card";
import ColorPallate from "../theme/Color";

const LandingPage = ({ lastPage, buttonOneOnClick, buttonTwoOnClick }) => {
  const fetuereCardList = [
    {
      id: "locationStore",
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

  const LandingPageStyles = {
    container: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      gap: "24px",
      left: "5vw",
      top: "25vh",
      position: "absolute",
      maxWidth: "40vw",
      transition: "left 0.5s ease, transform 0.5s ease",
    },
    title: {
      fontSize: "1.5rem",
      fontWeight: "bold",
      textAlign: "left",
      color: ColorPallate.text,
    },
    subtitle: {
      textAlign: "left",
      fontSize: "1rem",
      color: ColorPallate.text,
    },
    paragraph: {
      fontSize: "0.75rem",
      color: "#333",
      maxWidth: "600px",
      textAlign: "left",
      color: ColorPallate.text,
    },
    buttonGroup: {
      display: "flex",
      gap: "16px",
    },
    cardGroup: {
      display: "flex",
      position: "absolute",
      flexDirection: "row",
      justifyContent: "",
      gap: "16px",
      bottom: "8vh",
      left: "5vw",
      transition: "left 0.5s ease, transform 0.5s ease",
    },
    fetureCardGroup: {
      display: "flex",
      flexDirection: "row",
      gap: "8px",
    },
    dismissCardGroup: {
      transform: "translateY(150%)",
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
          ...LandingPageStyles.container,
          ...(lastPage != "home" ? LandingPageStyles.containerDissmis : {}),
        }}
      >
        <div style={LandingPageStyles.textGroup}>
          <h3 style={LandingPageStyles.subtitle}>
            Layan Kami Yang Terbaik Untuk Anda
          </h3>
          <h1 style={LandingPageStyles.title}>
            Solusi Untuk Kebingungan Anda Terkait SkinCare dan Kosmetik
          </h1>
          <p style={LandingPageStyles.paragraph}>
            Tidak perlu bingung lagi untuk memilih skincare! temukan rekomendasi
            produk yang tepat untuk kulit anda dan beserta toko terdekat hanya
            dengan satu klik.
          </p>
        </div>
        <div style={LandingPageStyles.buttonGroup}>
          <ButtonCostum text="Mulai" type="primary" onclick={() => buttonOneOnClick()}/>
          <ButtonCostum text="Lebih Lanjut" type="textButton" onclick={() => buttonTwoOnClick()}/>
        </div>
      </div>
      <div
        style={{
          ...LandingPageStyles.cardGroup,
          ...(lastPage != "home" ? LandingPageStyles.dismissCardGroup : {}),
        }}
      >
        <div style={LandingPageStyles.fetureCardGroup}>
          <InfoCard
            title={
              <span>
                Kami Telah
                <br />
                <span style={{ color: ColorPallate.text }}>Mengumpulkan</span>
              </span>
            }
            infoList={infoList}
            id="kumpulan"
          />
          {fetuereCardList.map((i) => (
            <FetureCard text={i.text} id={i.id} imageUrl={i.imgUrl} />
          ))}
        </div>
      </div>
    </>
  );
};

export default LandingPage;
