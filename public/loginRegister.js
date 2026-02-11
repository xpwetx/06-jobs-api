// loginRegister.js
import { setDiv, enableInput } from "./index.js";

let logonRegisterDiv = null;
let logonDiv = null;
let registerDiv = null;

export const handleLoginRegister = () => {
  logonRegisterDiv = document.getElementById("logon-register");
  logonDiv = document.getElementById("logon-div");
  registerDiv = document.getElementById("register-div");

  if (!logonRegisterDiv || !logonDiv || !registerDiv) {
    console.error("Login/Register elements not found in DOM");
    return;
  }

  logonRegisterDiv.addEventListener("click", (e) => {
    if (!e.target.matches("button")) return;

    if (e.target.id === "logon") {
      enableInput(false);
      setDiv(logonDiv);
    } else if (e.target.id === "register") {
      enableInput(false);
      setDiv(registerDiv);
    }
  });
};

export const showLoginRegister = () => {
  if (logonRegisterDiv) setDiv(logonRegisterDiv);
};
