const GlobalModal = ({ visible, onDissmis, children, styles }) => {
  if (!visible) return;
  return (
    <div
      styles={{
        backgroundColor: "#fff",
        borderRadius: "16px",
        padding: "24px",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
        maxHeight: "90vh",
        overflowY: "auto",
      }}
    >
      {children}
    </div>
  );
};

export default GlobalModal