import ColorPallate from "../theme/Color";

export const FetureCard = ({ text, imageUrl, id }) => {
  const cardStyles = {
    container: {
      display: "flex",
      flexDirection: "column",
      padding: "12px",
      width: "10vw",
      height: "13vh",
      background: "#FFFFFF",
      boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
      borderRadius: "25px",
      marginTop: "auto"
    },
    image: {
      width: "40px",
      height: "40px",
      objectFit: "cover",
      borderRadius: "13px",
    },
    text: {
      fontSize: "0.7rem",
      fontWeight: "bold",
      textAlign: "left",
      color: "#333",
    },
  };
  return (
    <div id={id} style={cardStyles.container}>
      <img src={imageUrl} alt={text} style={cardStyles.image} />
      <p style={cardStyles.text}>{text}</p>
    </div>
  );
};

export const InfoCard = ({ title, infoList, id }) => {
  const cardStyles = {
    container: {
      display: "flex",
      flexDirection: "column",
      padding: "16px",
      width: "15vw",
      background: ColorPallate.primary,
      boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
      borderRadius: "30px",
      marginRight: "8px"
    },
    text: {
      fontSize: "1rem",
      fontWeight: "bold",
      textAlign: "center",
      color: "white",
    },
    deskripsi: {
      fontSize: "0.6rem",
      fontWeight: "bold",
      textAlign: "center",
      color: ColorPallate.text,
    },
    groupInfo: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-evenly",
    },
  };
  return (
    <div id={id} style={cardStyles.container}>
      <h1 style={cardStyles.text}>{title}</h1>
      <div style={cardStyles.groupInfo}>
        {infoList.map((i) => (
          <div id={i.id} style={cardStyles.groupInfoBody}>
            <h1 style={cardStyles.text}>{i.title}</h1>
            <p style={cardStyles.deskripsi}>{i.deskripsi}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
