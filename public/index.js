// index.js

export let inputEnabled = true;
export const enableInput = (state) => {
  inputEnabled = state;
};

export let token = null;
export const setToken = (value) => {
  token = value;
  if (value) {
    localStorage.setItem("token", value);
  } else {
    localStorage.removeItem("token");
  }
};

export let message = null;

let activeDiv = null;
export const setDiv = (newDiv) => {
  if (newDiv !== activeDiv) {
    if (activeDiv) activeDiv.style.display = "none";
    if (newDiv) newDiv.style.display = "block";
    activeDiv = newDiv;
  }
};

import { showTasks, handleTasks } from "./tasks.js";
import { showLoginRegister, handleLoginRegister } from "./loginRegister.js";
import { handleLogin } from "./login.js";
import { handleAddEdit } from "./addEdit.js";
import { handleRegister } from "./register.js";

document.addEventListener("DOMContentLoaded", () => {
  token = localStorage.getItem("token");

  message = document.getElementById("message");

  handleLoginRegister();
  handleLogin();
  handleTasks();
  handleRegister();
  handleAddEdit();

  if (token) {
    showTasks().catch((err) => {
      console.error("Error showing tasks:", err);
      message.textContent = "Failed to load tasks. Please log in again.";
      const logonRegisterDiv = document.getElementById("logon-register");
      if (logonRegisterDiv) setDiv(logonRegisterDiv);
    });
  } else {
    const logonRegisterDiv = document.getElementById("logon-register");
    if (logonRegisterDiv) setDiv(logonRegisterDiv);
  }
});
