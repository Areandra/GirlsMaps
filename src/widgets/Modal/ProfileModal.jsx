import { FiLogOut, FiX } from "react-icons/fi";
import useWindowSize from "../../hooks/windowResizer";
import ColorPallate from "../../theme/Color";
import Profile from "../../components/Profile";
import GlobalModal from "../../components/Modal";
import Button from "../../components/Button/PrimaryButton";
import FavoriteStoreCards from "../CardGroupping/FavoriteStoreCards";

const ProfileModal = ({
  visible,
  useNavSize,
  onDismiss,
  user,
  favoriteStoreList,
  onClick,
}) => {
  const windowSize = useWindowSize();
  const navSize = useNavSize();

  return (
    <GlobalModal
      visible={visible}
      styles={{
        overflow: "auto",
        padding: 20,
        borderRadius: windowSize.width > 700 ? 30 : "20px 20px 0px 00px",
        position: "fixed",
        zIndex: 100,
        gap: 28,
        height: "75dvh",
        transition: "0.3s ease",
        ...(windowSize.width > 700
          ? {
              width: "25vw",
              top: navSize.height + windowSize.height * 0.06,
              left: navSize.width + navSize.left - 70,
              transform: "translateX(-100%)",
            }
          : {
              left: 0,
              bottom: 0,
              width: "90vw",
              padding: "5vw",
            }),
      }}
    >
      <div
        onClick={() => onDismiss()}
        style={{ position: "absolute", cursor: "pointer" }}
      >
        <FiX size={20} color={ColorPallate.text} />
      </div>
      <p
        style={{
          fontSize: "0.75rem",
          color: ColorPallate.text,
          fontWeight: 500,
        }}
      >
        {user?.email}
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        <Profile
          user={user}
          style={{
            container: {
              margin: "auto",
              justifyContent: "center",
              width: "80px",
              height: "80px",
            },
            img: {
              fontSize: 30,
            },
          }}
          edit={true}
        />
        <h1
          style={{
            color: ColorPallate.text,
            fontSize: 24,
            fontWeight: 500,
            margin: 0,
          }}
        >
          Hi, {user?.displayName}
        </h1>
        <div style={{ display: "flex", flexDirection: "row", gap: 8 }}>
          <button
            onClick={() => onClick.googleLink()}
            style={{
              backgroundColor: ColorPallate.text,
              color: "black",
              border: "none",
              outline: "none",
              fontSize: "12px",
              flex: 1,
              alignItems: "center",
              gap: "8px",
              borderRadius: "12px",
              justifyContent: "center",
              display: "flex",
              cursor: "pointer",
              boxShadow: `inset 0 0 0 2px ${ColorPallate.secondaryText}, inset 0 4px 8px rgba(0, 0, 0, 0.2)`,
            }}
          >
            <img
              src="https://img.icons8.com/?size=100&id=V5cGWnc9R4xj&format=png&color=000000"
              alt="google"
              style={{ width: 18, height: 18 }}
            />
            Google
          </button>
          <Button
            style={{ flex: 1 }}
            icon={FiLogOut}
            onclick={() => {
              signOut(auth);
              window.location.reload();
            }}
          >
            Log Out
          </Button>
        </div>
        {user?.admin && (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button
              style={{ color: ColorPallate.secondaryText }}
              text={true}
              onclick={() => onClick.adminTable()}
            >
              Edit Data Toko
            </Button>
            <p
              style={{
                fontSize: "0.75rem",
                color: ColorPallate.text,
                fontWeight: 500,
              }}
            >
              |
            </p>
            <Button style={{ color: ColorPallate.secondaryText }} text={true}>
              Edit Data Peta
            </Button>
          </div>
        )}
        <FavoriteStoreCards
          favoriteStoreList={favoriteStoreList}
          onClick={onClick}
        />
      </div>
    </GlobalModal>
  );
};

export default ProfileModal;
