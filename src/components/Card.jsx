import ColorPallate from "../theme/Color";
import { useState } from "react";
import pinIcon from "../assets/pin.svg";

export const FetureCard = ({ text, imageUrl, id, onClick, styles }) => {
  const [hover, setHover] = useState(false);

  const cardStyles = {
    container: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-end",
      padding: "12px",
      width: "200px",
      background: ColorPallate.background,
      boxShadow: `0px 4px 4px rgba(0, 0, 0, 0.25), inset 0px 0px 0px 2px ${ColorPallate.background}`,
      borderRadius: "12px",
      minHeight: "120px",
      gap: 10,
      minWidth: "200px",
      backgroundImage: `url(${imageUrl})`,
      backgroundSize: "cover"
    },
    text: {
      fontSize: "0.7rem",
      fontWeight: "bold",
      textAlign: "left",
      color: ColorPallate.text,
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
        ...styles,
      }}
    >
      <p style={cardStyles.text}>{text}</p>
    </div>
  );
};