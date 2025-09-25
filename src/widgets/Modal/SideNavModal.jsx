import { FiX } from "react-icons/fi";
import logo from "../../assets/logo.png";
import Button from "../../components/Button/PrimaryButton";
import GlobalModal from "../../components/Modal";
import ColorPallate from "../../theme/Color";

const SideNavModal = ({ visible, onDismis, buttonList }) => {
  return (
    <div
      style={{
        width: "100vw",
        height: "100lvh",
        background: "rgba(18, 18,18, 0.75)",
        backdropFilter: "blur(5px)",
        left: 0,
        position: "fixed",
        opacity: visible ? 1 : 0,
        zIndex: 1000,
        top: 0,
        pointerEvents: "none",
      }}
    >
      <GlobalModal
        visible={visible}
        styles={{
          position: "fixed",
          zIndex: 9999,
          gap: 14,
          transition: "0.3s ease",
          top: 0,
          right: 0,
          bottom: 0,
          width: "65vw",
          height: "100lvh",
          padding: "20px",
          borderRadius: 0,
        }}
      >
        <div
          onClick={() => onDismis()}
          style={{ position: "absolute", cursor: "pointer", right: 20 }}
        >
          <FiX size={20} color={ColorPallate.text} />
        </div>
        <img
          style={{
            position: "relative",
            width: "38px",
            left: -10,
            top: -10,
          }}
          src={logo}
        />
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          {buttonList.map((button) => (
            <div key={button.id}>
              <Button
                onclick={() => {
                  button.onClick();
                  onDismis();
                }}
                text={true}
              >
                {button.text}
              </Button>
            </div>
          ))}
        </div>
      </GlobalModal>
    </div>
  );
};

export default SideNavModal;
