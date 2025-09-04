import { useState } from "react";
import ColorPallate from "../theme/Color";
import { InputForm } from "../components/InputForm";
import { FiUser, FiMail, FiLock } from "react-icons/fi";
import ButtonCostum from "../components/Button";

const LoginPage = ({ lastPage, slideIn, setLastPage }) => {
  const [username, setUsername] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChangeMode = () =>
    setLastPage(lastPage === "login" ? "daftar" : "login");

  const handleLogin = (data) => {
    console.log("Login:", data);
  };

  const handleRegister = (data) => {
    console.log("Register:", data);
  };

  return (
    <div
      style={{
        ...styles.container,
        ...(!slideIn ? { opacity: 0, pointerEvents: "none" } : { opacity: 1 }),
      }}
    >
      <div
        style={{
          ...styles.loginForm,
          ...(!slideIn ? styles.firstPosition : {}),
        }}
      >
        <h2 style={styles.loginTitle}>Welcome Boss!</h2>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <span style={{ color: "grey", fontSize: 12 }}>
            {lastPage === "login"
              ? "Belum Punya Akun Ya? "
              : "Sudah Punya Akun Sebelumnya? "}
          </span>
          <ButtonCostum
            type="textButton"
            text={lastPage === "login" ? "Daftar" : "Masuk"}
            onclick={() => handleChangeMode()}
          />
        </div>

        {lastPage === "daftar" && (
          <InputForm
            icon={FiUser}
            text="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        )}

        <InputForm
          text="Email"
          icon={FiMail}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <InputForm
          icon={FiLock}
          type="password"
          text="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <ButtonCostum
          type="normalbutton"
          text={lastPage === "login" ? "Masuk" : "Daftar"}
          onclick={
            lastPage === "login"
              ? () => handleLogin({ email, password })
              : () =>
                  handleRegister({
                    email,
                    password,
                    name: username,
                    companyName,
                  })
          }
        />

        <div style={styles.separator}>
          <div style={styles.line}></div>
          <p style={{ textAlign: "center", color: "grey", fontSize: "12px" }}>
            OR
          </p>
          <div style={styles.line}></div>
        </div>

        <div style={styles.socialContainer}>
          <button
            onClick={() => handleLogin({ type: "google" })}
            style={styles.buttonBox}
          >
            <img
              src="https://img.icons8.com/?size=100&id=V5cGWnc9R4xj&format=png&color=000000"
              alt="google"
              style={{ width: 24, height: 24 }}
            />
          </button>
          <button style={styles.buttonBox}>
            <img
              src="https://img.icons8.com/?size=100&id=uLWV5A9vXIPu&format=png&color=000000"
              alt="facebook"
              style={{ width: 24, height: 24 }}
            />
          </button>
          <button style={styles.buttonBox}>
            <img
              src="https://img.icons8.com/?size=100&id=fJp7hepMryiw&format=png&color=000000"
              alt="twitter"
              style={{ width: 24, height: 24 }}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    backdropFilter: "blur(10px)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    minWidth: "100vw",
    position: "absolute",
    zIndex: 10,
    left: 0,
    top: 0,
    transition: "opacity 0.3s ease",
  },
  loginForm: {
    minWidth: "280px",
    padding: 20,
    backgroundColor: ColorPallate.background,
    borderRadius: 40,
    display: "flex",
    flexDirection: "column",
    gap: 20,
    transition: "bottom 0.3s ease, transform 0.3s ease",
    boxShadow: `inset 0 0 0 2px ${ColorPallate.secondaryText}, inset 0 8px 8px rgba(0, 0, 0, 0.2),  0px 4px 4px rgba(0, 0, 0, 0.25), 0 0 800px rgba(248, 187, 208, 0.7), 0 0 800px rgba(248, 187, 208, 0.5), 0 0 800px rgba(248, 187, 208, 0.3)`,
  },
  firstPosition: {
    transform: "translateY(150%)",
  },
  loginTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: ColorPallate.text,
    textAlign: "center",
  },
  buttonBox: {
    backgroundColor: ColorPallate.primary,
    height: 34,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    cursor: "pointer",
    border: "none",
    boxShadow: `inset 0 0 0 3px ${ColorPallate.secondary}, inset 0 4px 8px rgba(0, 0, 0, 0.2),  0px 4px 4px rgba(0, 0, 0, 0.25)`,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "grey",
  },
  separator: {
    display: "flex",
    alignItems: "center",
    gap: 10,
  },
  socialContainer: {
    display: "flex",
    justifyContent: "center",
    gap: 10,
  },
  linkButton: {
    background: "none",
    border: "none",
    color: "white",
    fontSize: 12,
    cursor: "pointer",
    marginLeft: 5,
  },
};

export default LoginPage;
