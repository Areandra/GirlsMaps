import { useState } from "react";
import ColorPallate from "../theme/Color";
import { InputForm } from "../components/InputForm";
import { FiUser, FiMail, FiLock, FiLogIn } from "react-icons/fi";
import Button from "../components/Button/PrimaryButton";
import logo from "../assets/logo.png";
import {
  handleLogin,
  handleRegister,
  loginWithGoogle,
} from "../service/authFunc";

const LoginPage = ({ lastPage, slideIn, setLastPage, windowSize }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginErrorMessege, setLoginErrorMessege] = useState({
    message: "",
    errorType: [],
  });

  const handleChangeMode = () => {
    setLastPage(lastPage === "login" ? "daftar" : "login");
    setLoginErrorMessege({
      message: "",
      errorType: [],
    });
  };

  const inputFields = [
    lastPage === "daftar" && {
      key: "username",
      text: "Username",
      spread: {
        icon: FiUser,
        placeholder: "example",
        value: username,
        onChange: (e) => setUsername(e.target.value),
      },
    },
    {
      key: "email",
      text: "Email",
      spread: {
        icon: FiMail,
        placeholder: "example@gmail.com",
        value: email,
        onChange: (e) => setEmail(e.target.value),
      },
    },
    {
      key: "password",
      text: "Password",
      spread: {
        icon: FiLock,
        type: "password",
        placeholder: "enter...",
        value: password,
        onChange: (e) => setPassword(e.target.value),
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
          ...(windowSize.width < 700
            ? { width: "65vw" }
            : { minWidth: "325px" }),
          ...(!slideIn ? styles.firstPosition : {}),
        }}
      >
        <div
          style={{
            justifyContent: "flex-start",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div style={styles.titleGroup}>
            <img src={logo} alt="" style={styles.logo} />
            <h1 style={styles.titleText}>Girls</h1>
            <h1 style={{ ...styles.titleText, color: ColorPallate.text }}>
              Map
            </h1>
          </div>
          <h2 style={styles.loginTitle}>
            Get Ready To Embark on A Journey
            <br />
            With Us
          </h2>
        </div>
        {loginErrorMessege.errorType.length !== 0 && (
          <div style={styles.separator}>
            <p
              style={{
                textAlign: "center",
                color: ColorPallate.inputBorder,
                fontSize: "12px",
              }}
            >
              {loginErrorMessege.message}
            </p>
          </div>
        )}
        <div
          style={{
            gap: "12px",
            display: "flex",
            flexDirection: "column",
            marginBottom: "10px",
          }}
        >
          {inputFields.map((field) => (
            <div
              key={field.key}
              style={{
                display: "flex",
                gap: "4px",
                flexDirection: "column",
              }}
            >
              <p
                style={{
                  color: ColorPallate.primary,
                  textAlign: "left",
                  fontSize: 12,
                  flex: 1,
                }}
              >
                {field.text}
              </p>
              <InputForm
                {...field.spread}
                style={{
                  ...(loginErrorMessege.errorType.find((i) => i === field.key)
                    ? {
                        container: {
                          boxShadow: `inset 0 0 0 2px red, 0 4px 8px ${ColorPallate.buttonShadow}`,
                        },
                      }
                    : {}),
                }}
              />
            </div>
          ))}
        </div>
        <Button
          type="normalbutton"
          onclick={
            lastPage === "login"
              ? async () => {
                  const info = await handleLogin({ email, password });
                  setLoginErrorMessege(info);
                }
              : async () => {
                  const info = await handleRegister({
                    email,
                    password,
                    username,
                  });
                  setLoginErrorMessege(info);
                }
          }
          icon={FiLogIn}
        >
          {lastPage === "login" ? "Sign In" : "Sign Up"}
        </Button>
        <div style={styles.separator}>
          <p
            style={{
              textAlign: "center",
              color: ColorPallate.inputBorder,
              fontSize: "12px",
            }}
          >
            - Or Sign In With -
          </p>
        </div>
        <div style={styles.socialContainer}>
          <button
            onClick={async () => {
              const info = await loginWithGoogle();
              setLoginErrorMessege(info);
            }}
            style={styles.buttonBox}
          >
            <img
              src="https://img.icons8.com/?size=100&id=V5cGWnc9R4xj&format=png&color=000000"
              alt="google"
              style={{ width: 18, height: 18 }}
            />
            Google
          </button>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <span style={{ color: "grey", fontSize: 12 }}>
            {lastPage === "login"
              ? "Don't have an account?"
              : "Already have an account?"}
          </span>
          <Button onclick={() => handleChangeMode()} text={true}>
            {lastPage === "login" ? "Register" : "Log In"}
          </Button>
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
    minHeight: "100dvh",
    minWidth: "100vw",
    position: "fixed",
    zIndex: 10,
    left: 0,
    top: 0,
    transition: "opacity 0.3s ease",
  },
  loginForm: {
    padding: 35,
    backgroundColor: ColorPallate.background,
    borderRadius: 20,
    display: "flex",
    flexDirection: "column",
    gap: 14,
    transition: "bottom 0.3s ease, transform 0.3s ease",
    boxShadow: `0px 2px 2px rgba(0, 0, 0, 0.25), 0 0 100vw rgba(50, 50, 50, 0.7), 0 0 100vw rgba(50, 50, 50, 0.5), 0 0 100vw rgba(50, 50, 50, 0.3)`,
  },
  firstPosition: {
    transform: "translateY(150%)",
  },
  loginTitle: {
    fontSize: "1rem",
    fontWeight: 500,
    color: ColorPallate.text,
    textAlign: "center",
    margin: 0,
  },
  buttonBox: {
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
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "grey",
  },
  separator: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  socialContainer: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
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
    justifyContent: "center",
    display: "flex",
    alignItems: "center",
  },
  titleText: {
    color: ColorPallate.primary,
    fontSize: "1.5rem",
    fontWeight: "bold",
    textAlign: "left",
    display: "inline",
  },
  logo: {
    width: "3rem",
    height: "3rem",
  },
};

export default LoginPage;
