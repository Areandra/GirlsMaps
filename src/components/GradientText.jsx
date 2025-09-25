import ColorPallate from "../theme/Color";

export const GradientText = ({ children, style }) => {
  return (
    <label
      style={{
        background: ColorPallate.primaryGradient,
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
        color: "transparent",
        ...style,
      }}
    >
      {children}
    </label>
  );
};
