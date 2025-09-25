import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  linkWithPopup,
  reload,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { auth } from "./firebaseConfig";

export const handleLinkGoogle = async () => {
  const user = auth.currentUser;

  if (!user) {
    return "❌ No logged-in user. Please login first.";
  }

  try {
    const result = await linkWithPopup(user, new GoogleAuthProvider());

    const newPhotoURL = result.user.photoURL;

    if (newPhotoURL && user.photoURL !== newPhotoURL) {
      await updateProfile(user, {
        photoURL: newPhotoURL,
      });
    }
    return "✅ Success! Your account is now linked with Google.";
  } catch (error) {
    console.error("Link error:", error);

    let message = "❌";

    switch (error.code) {
      case "auth/provider-already-linked":
        message += "This Google account is already linked to your account.";
        break;
      case "auth/credential-already-in-use":
        message += "This Google account is already used by another user.";
        break;
      case "auth/popup-closed-by-user":
        message += "Popup closed before completing the sign-in.";
        break;
      case "auth/network-request-failed":
        message += "Network error. Please try again later.";
        break;
      default:
        message += "Failed to link Google account";
    }

    return message;
  }
};

export const handleRegister = async ({ email, password, username }) => {
  try {
    if (!username) {
      const err = new Error("Username cannot be empty");
      err.code = "auth/username-is-empty";
      throw err;
    }
    if (password.length < 8) {
      const err = new Error("Username cannot be under 8 length");
      err.code = "auth/password-is-to-short";
      throw err;
    }

    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    await updateProfile(userCredential.user, {
      displayName: username,
    });

    await reload(userCredential.user);
  } catch (error) {
    console.error("Register gagal:", error.message);

    let errorMessage = [];
    let errorType = [];

    if (!username || !email || !password) {
      if (!email) {
        errorMessage.push(`${errorMessage.length > 0 ? ", " : ""}Email`);
        errorType.push("email");
      }
      if (!password) {
        errorMessage.push(`${errorMessage.length > 0 ? " and " : ""}Password`);
        errorType.push("password");
      }
      errorMessage.push(" Cannot be Empty");
    } else {
      switch (error.code) {
        case "auth/invalid-email":
          errorMessage.push("Email Format is Invalid");
          errorType.push("email");
          break;
        case "auth/email-already-in-use":
          errorMessage.push("Email Already in Use");
          errorType.push("email");
          break;
        case "auth/username-is-empty":
          errorMessage.push("Username Cannot be Empty");
          errorType.push("username");
          break;
        case "auth/password-is-to-short":
          errorMessage.push(
            "Password is to Short, Password Minimal Length is 8"
          );
          errorType.push("password");
          break;
        default:
          errorMessage.push("Terjadi kesalahan, coba lagi.");
          errorType.push("");
      }
    }

    return {
      message: errorMessage.join(""),
      errorType,
    };
  }
};

export const handleLogin = async ({ email, password }) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    return;
  } catch (error) {
    console.error("Login gagal:", error.code);
    let errorMasege = [];
    let errorType = [];
    if (!password || !email) {
      if (!email) {
        errorMasege.push("Email");
        errorType.push("email");
      }
      if (!password) {
        errorMasege.push(`${!email ? " and " : ""}Password`);
        errorType.push("password");
      }
      errorMasege.push(" Cannot be Empty");
    } else {
      switch (error.code) {
        case "auth/invalid-email":
          errorMasege.push("Email Format is Invalid");
          errorType.push("email");
          break;
        case "auth/invalid-credential":
          errorMasege.push("Email or Password is Invalid");
          errorType.push("email");
          errorType.push("password");
          break;
        default:
          errorMasege.push("Terjadi kesalahan, coba lagi.");
      }
    }
    return {
      message: errorMasege.join(""),
      errorType: errorType,
    };
  }
};

export const loginWithGoogle = async () => {
  try {
    await signInWithPopup(auth, new GoogleAuthProvider());
  } catch (error) {
    console.error(error);
    let message = "";

    switch (error.code) {
      case "auth/provider-already-linked":
        message += "This Google account is already linked to your account.";
        break;
      case "auth/credential-already-in-use":
        message += "This Google account is already used by another user.";
        break;
      case "auth/popup-closed-by-user":
        message += "Popup closed before completing the sign-in.";
        break;
      case "auth/network-request-failed":
        message += "Network error. Please try again later.";
        break;
      default:
        message += "Failed to link Google account";
    }

    return {
      message,
      errorType: [],
    };
  }
};
