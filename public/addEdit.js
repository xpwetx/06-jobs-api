// addEdit.js
import { setDiv, enableInput, token, message } from "./index.js";
import { showTasks } from "./tasks.js";

let editDiv = null;
let titleInput = null;
let descriptionInput = null;
let statusSelect = null;
let addingButton = null;
let cancelButton = null;

export const handleAddEdit = () => {
  editDiv = document.getElementById("edit-task");
  titleInput = document.getElementById("title");
  descriptionInput = document.getElementById("description");
  statusSelect = document.getElementById("status");
  addingButton = document.getElementById("adding-task");
  cancelButton = document.getElementById("edit-cancel");

  if (!editDiv || !titleInput || !descriptionInput || !statusSelect || !addingButton || !cancelButton) {
    console.error("Add/Edit elements not found in DOM");
    return;
  }

  // Add or edit task
  addingButton.addEventListener("click", async () => {
    const task = {
      title: titleInput.value,
      description: descriptionInput.value,
      status: statusSelect.value,
    };

    enableInput(false);

    try {
      // Determine if editing or adding
      const method = addingButton.dataset.id ? "PUT" : "POST";
      const url = addingButton.dataset.id
        ? `/api/v1/tasks/${addingButton.dataset.id}`
        : "/api/v1/tasks";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(task),
      });

      if (response.ok) {
        // refresh tasks table
        await showTasks();
      } else {
        const data = await response.json();
        message.textContent = data.msg || "Failed to save task";
      }
    } catch (err) {
      console.error(err);
      message.textContent = "Communication error while saving task";
    } finally {
      enableInput(true);
    }
  });

  // Cancel button
  cancelButton.addEventListener("click", () => {
    showTasks();
  });
};

// Show the add/edit form
export const showAddEdit = (id = null) => {
  if (!editDiv || !addingButton) return;

  addingButton.dataset.id = id || ""; // empty if adding
  titleInput.value = "";
  descriptionInput.value = "";
  statusSelect.value = "pending";

  setDiv(editDiv);
};
