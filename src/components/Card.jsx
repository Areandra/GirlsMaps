import ColorPallate from "../theme/Color";

export const Card = ({ text, imageUrl, id, onClick, styles, chidren }) => {
  const cardStyles = {
    container: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-end",
      padding: "12px",
      width: "200px",
      background: ColorPallate.background,
      boxShadow: `0px 4px 4px rgba(0, 0, 0, 0.25), inset 0px 0px 0px 2px ${ColorPallate.background}`,
      borderRadius: "16px",
      minHeight: "120px",
      gap: 10,
      minWidth: "200px",
      backgroundImage: `url(${imageUrl})`,
      backgroundSize: "cover",
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
      onClick={() => {
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
