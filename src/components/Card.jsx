import ColorPallate from "../theme/Color";
import { useState } from "react";

export const FetureCard = ({ text, imageUrl, id, onClick }) => {
  const [hover, setHover] = useState(false);
  const cardStyles = {
    container: {
      display: "flex",
      flexDirection: "column",
      padding: "12px",
      width: "10vw",
      height: "13dvh",
      background: "#FFFFFF",
      boxShadow: `0px 4px 4px rgba(0, 0, 0, 0.25)`,
      borderRadius: "25px",
      marginTop: "auto",
      minHeight: "87px",
      minWidth: "128px",
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
    hover: {
      boxShadow: `0px 4px 4px rgba(0, 0, 0, 0.25), 0 0 10px rgba(248, 187, 208, 0.7), 0 0 20px rgba(248, 187, 208, 0.5), 0 0 30px rgba(248, 187, 208, 0.3)`,
      transition: "translate 0.3s ease",
      transform: "translateY(-5%)",
    },
  };
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => {
        console.log("tatekan op");
        onClick();
      }}
      id={id}
      style={{
        ...cardStyles.container,
        ...(hover ? cardStyles.hover : {}),
      }}
    >
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
      boxShadow: `inset 0 0 0 3px ${ColorPallate.secondary}, inset 0 5px 5px rgba(0, 0, 0, 0.2),  0px 4px 4px rgba(0, 0, 0, 0.25)`,
      borderRadius: "30px",
      marginRight: "0.5vw",
      minWidth: "192px",
      maxHeight: "125px",
    },
    text: {
      fontSize: "1em",
      fontWeight: "bold",
      textAlign: "center",
      color: "white",
    },
    deskripsi: {
      fontSize: "0.6em",
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
        {infoList.map((i, index) => (
          <div key={index} style={cardStyles.groupInfoBody}>
            <h1 style={cardStyles.text}>{i.title}</h1>
            <p style={cardStyles.deskripsi}>{i.deskripsi}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
