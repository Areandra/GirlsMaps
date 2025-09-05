import { useState } from "react";
import ColorPallate from "../theme/Color";
import { InputForm } from "../components/InputForm";
import { FiUser, FiMail, FiLock } from "react-icons/fi";
import ButtonCostum from "../components/Button";
import logo from "../assets/logo.png";

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

  const inputFields = [
    lastPage === "daftar" && {
      key: "username",
      icon: FiUser,
      text: "Username",
      placeholder: "example",
      value: username,
      onChange: (e) => setUsername(e.target.value),
      wrapperStyle: {
        display: "flex",
        gap: "4px",
        flexDirection: "column",
      },
      labelStyle: {
        color: ColorPallate.primary,
        textAlign: "left",
        fontSize: 14,
        flex: 1,
      },
    },
    {
      key: "email",
      icon: FiMail,
      text: "Email",
      placeholder: "example@gmail.com",
      value: email,
      onChange: (e) => setEmail(e.target.value),
      wrapperStyle: {
        display: "flex",
        gap: "4px",
        flexDirection: "column",
      },
      labelStyle: {
        color: ColorPallate.primary,
        textAlign: "left",
        fontSize: 14,
        flex: 1,
      },
    },
    {
      key: "password",
      icon: FiLock,
      text: "Password",
      type: "password",
      placeholder: "enter...",

      value: password,
      onChange: (e) => setPassword(e.target.value),
      wrapperStyle: {
        display: "flex",
        gap: "4px",
        flexDirection: "column",
      },
      labelStyle: {
        color: ColorPallate.primary,
        textAlign: "left",
        fontSize: 14,
        flex: 1,
      },
    },
  ].filter(Boolean);

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
        <div style={{justifyContent: "flex-start", display: "flex", flexDirection: "column", }}>
          <div style={styles.titleGroup}>
            <img src={logo} alt="" style={styles.logo} />
            <h1 style={styles.titleText}>Girls</h1>
            <h1 style={{ ...styles.titleText, color: ColorPallate.text }}>
              Map
            </h1>
          </div>
          <h2 style={styles.loginTitle}>Welcome Boss!</h2>

          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <span style={{ color: "grey", fontSize: 12 }}>
              {lastPage === "login"
                ? "Belum Punya Akun Ya?"
                : "Sudah Punya Akun Sebelumnya?"}
            </span>
            <ButtonCostum
              type="textButton"
              text={lastPage === "login" ? "Daftar" : "Masuk"}
              onclick={() => handleChangeMode()}
            />
          </div>
        </div>

        <div style={{ gap: "8px", display: "flex", flexDirection: "column" }}>
          {inputFields.map((field) =>
            field.wrapperStyle ? (
              <div key={field.key} style={field.wrapperStyle}>
                <p style={field.labelStyle}>{field.text}</p>
                <InputForm {...field} />
              </div>
            ) : (
              <InputForm key={field.key} {...field} />
            )
          )}
        </div>

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
    minWidth: "360px",
    padding: 20,
    backgroundColor: ColorPallate.background,
    borderRadius: 20,
    display: "flex",
    flexDirection: "column",
    gap: 20,
    transition: "bottom 0.3s ease, transform 0.3s ease",
    boxShadow: `inset 0 0 0 2px ${ColorPallate.secondaryText}, inset 0 8px 8px rgba(0, 0, 0, 0.2),  0px 4px 4px rgba(0, 0, 0, 0.25), 0 0 100vw rgba(148, 81, 81, 0.7), 0 0 100vw rgba(0, 45, 103, 0.5), 0 0 100vw rgba(0, 255, 21, 0.3)`,
  },
  firstPosition: {
    transform: "translateY(150%)",
  },
  loginTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: ColorPallate.text,
    textAlign: "left",
    marginBottom: 0,
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
  titleGroup: {
    flex: 1,
    justifyContent: "flex-start",
    display: "flex",
    alignItems: "center",
  },
  titleText: {
    color: ColorPallate.primary,
    fontSize: "1rem",
    fontWeight: "bold",
    textAlign: "left",
    display: "inline",
  },
  logo: {
    width: "2rem",
    height: "2rem",
  },
};

export default LoginPage;
