import { FiGrid } from "react-icons/fi";
import useWindowSize from "../hooks/windowResizer";
import ColorPallate from "../theme/Color";
import { useState } from "react";

const Profile = ({ style, edit, onClick, user, visible }) => {
  const [hover, setHover] = useState(false);
  const windowSize = useWindowSize();
  return (
    <>
      <div
        style={{ ...styles.profileContainer, ...style?.container }}
        onClick={() => onClick()}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        {user?.photoURL ? (
          <img
            src={user?.photoURL}
            alt=""
            style={{ ...styles.profileImg, ...style?.img }}
          />
        ) : (
          <h1
            style={{
              ...styles.profileImg,
              ...(user?.photoURL
                ? {}
                : {
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    color: "transparent",
                  }),
              ...style?.img,
            }}
          >
            {user?.displayName?.slice(0, 1)}
          </h1>
        )}
        {!edit && (
          <div
            style={{
              top: 1,
              backgroundColor: "transparent",
              padding: windowSize.width > 700 ? "35px 14px 29px 14px" : 14,
              display: "flex",
              alignItems: "center",
              transition: "0.3s ease",
              position: "absolute",
              clipPath:
                "polygon(100% 0, 100% 100%, 50% 80%, 0% 100%, 0 53%, 0% 0%)",
              opacity: 0,
              ...(visible
                ? {
                    background: ColorPallate.background,
                    opacity: 1,
                    transform: "translateY(45px)",
                  }
                : { scale: 0 }),
            }}
          >
            <FiGrid size={18} color={ColorPallate.text} />
          </div>
        )}
      </div>
    </>
  );
};

export default Profile;

const styles = {
  profileContainer: {
    justifyContent: "center",
    display: "flex",
    alignItems: "center",
    borderRadius: "100%",
    width: "36px",
    boxShadow: `inset 0 0 0 3px ${ColorPallate.background}, inset 0 4px 8px rgba(0, 0, 0, 0.2),  0px 4px 4px rgba(0, 0, 0, 0.25)`,
    height: "36px",
    padding: 2,
    background: "transparent",
    position: "relative",
  },
  profileImg: {
    background: ColorPallate.primaryGradient,
    textAlign: "center",
    margin: 0,
    fontSize: 16,
    padding: 0,
    width: "100%",
    borderRadius: "100%",
  },
};
