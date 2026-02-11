// tasks.js
import { inputEnabled, enableInput, setDiv, message, token } from "./index.js";
import { showAddEdit } from "./addEdit.js";
import { showLoginRegister } from "./loginRegister.js";

let tasksDiv = null;
let tasksTable = null;
let tasksTableHeader = null;


export const handleTasks = () => {
  tasksDiv = document.getElementById("tasks");
  tasksTable = document.getElementById("tasks-table");
  tasksTableHeader = document.getElementById("tasks-table-header");

  if (!tasksDiv || !tasksTable || !tasksTableHeader) {
    console.error("Tasks elements not found in DOM");
    return;
  }

  const addTaskButton = document.getElementById("add-task");
  const logoffButton = document.getElementById("logoff");

  tasksDiv.addEventListener("click", (e) => {
    if (!inputEnabled) return;

    if (e.target.nodeName === "BUTTON") {
      if (e.target === addTaskButton) {
        showAddEdit(null); 
      } else if (e.target === logoffButton) {
        localStorage.removeItem("token");
        setDiv(document.getElementById("logon-register"));
      } else if (e.target.classList.contains("editButton")) {
        const id = e.target.dataset.id;
        showAddEdit(id); // show form with task data
      } else if (e.target.classList.contains("deleteButton")) {
        const id = e.target.dataset.id;
        deleteTask(id);
      }
    }
  });
};


const deleteTask = async (id) => {
  if (!confirm("Are you sure you want to delete this task?")) return;

  try {
    enableInput(false);
    const response = await fetch(`/api/v1/tasks/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (response.ok) {
      showTasks(); 
    } else {
      const data = await response.json();
      message.textContent = data.msg || "Failed to delete task";
    }
  } catch (err) {
    console.error(err);
    message.textContent = "Communication error while deleting task";
  } finally {
    enableInput(true);
  }
};


export const showTasks = async () => {
  tasksDiv = document.getElementById("tasks");
  tasksTable = document.getElementById("tasks-table");
  tasksTableHeader = document.getElementById("tasks-table-header");

  if (!tasksDiv || !tasksTable || !tasksTableHeader) return;

  enableInput(false);

  try {
    const response = await fetch("/api/v1/tasks", {
      method: "GET",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    });

    const data = await response.json();

    
    let rows = [tasksTableHeader];

    if (response.ok) {
      if (!data.tasks || data.tasks.length === 0) {
        tasksTable.replaceChildren(...rows);
      } else {
        data.tasks.forEach((task) => {
          const row = document.createElement("tr");
          row.innerHTML = `
            <td>${task.title}</td>
            <td>${task.description}</td>
            <td>${task.status}</td>
            <td><button type="button" class="editButton" data-id="${task._id}">edit</button></td>
            <td><button type="button" class="deleteButton" data-id="${task._id}">delete</button></td>
          `;
          rows.push(row);
        });
        tasksTable.replaceChildren(...rows);
      }
    } else {
      message.textContent = data.msg || "Failed to load tasks";
    }
  } catch (err) {
    console.error(err);
    message.textContent = "A communication error occurred.";
  } finally {
    enableInput(true);
    setDiv(tasksDiv);
  }
};
