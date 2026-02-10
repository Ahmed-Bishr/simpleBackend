const apiBase = "http://127.0.0.1:8000";

// Theme Management
function toggleTheme() {
  const body = document.body;
  const themeToggle = document.getElementById('themeToggle');

  body.classList.toggle('dark-mode');
  const isDark = body.classList.contains('dark-mode');

  themeToggle.textContent = isDark ? '☀️' : '🌙';
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

// Load saved theme
function loadTheme() {
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const isDark = savedTheme === 'dark' || (!savedTheme && prefersDark);

  if (isDark) {
    document.body.classList.add('dark-mode');
    document.getElementById('themeToggle').textContent = '☀️';
  }
}

// Task Management
async function fetchTasks() {
  try {
    const res = await fetch(`${apiBase}/tasks`);
    const tasks = await res.json();
    const container = document.getElementById("taskList");

    if (tasks.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon">📝</div>
          <div class="empty-state-text">No tasks yet. Add one to get started!</div>
        </div>
      `;
      return;
    }

    container.innerHTML = "";
    tasks.forEach((task, index) => {
      const div = document.createElement("div");
      div.className = `task-item ${task.done ? 'done' : ''}`;
      div.style.animationDelay = `${index * 0.05}s`;
      div.innerHTML = `
        <div class="task-content">
          <div class="task-id">${task.id}</div>
          <div class="task-title">${escapeHtml(task.title)}</div>
        </div>
        <div class="task-actions">
          <button class="btn btn-sm btn-success" onclick="toggleTask(${task.id}, ${!task.done})">
            ${task.done ? '↩️ Undo' : '✓ Done'}
          </button>
          <button class="btn btn-sm btn-danger" onclick="deleteTask(${task.id}, this)">
            🗑️ Delete
          </button>
        </div>
      `;
      container.appendChild(div);
    });
  } catch (error) {
    console.error('Failed to fetch tasks:', error);
  }
}

async function addTask() {
  const idInput = document.getElementById("taskId");
  const titleInput = document.getElementById("taskTitle");
  const id = parseInt(idInput.value);
  const title = titleInput.value.trim();

  if (!id || !title) {
    showAlert("Please enter both ID and title");
    return;
  }

  try {
    const res = await fetch(`${apiBase}/tasks`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({id, title, done: false})
    });

    if (res.ok) {
      idInput.value = "";
      titleInput.value = "";
      titleInput.blur();
      fetchTasks();
    } else {
      const err = await res.json();
      showAlert(err.detail || "Failed to add task");
    }
  } catch (error) {
    showAlert("Network error. Please check your connection.");
  }
}

async function toggleTask(id, done) {
  try {
    await fetch(`${apiBase}/tasks/${id}?done=${done}`, { method: "PUT" });
    fetchTasks();
  } catch (error) {
    showAlert("Failed to update task");
  }
}

async function deleteTask(id, button) {
  const taskItem = button.closest('.task-item');
  taskItem.classList.add('fade-out');

  setTimeout(async () => {
    try {
      await fetch(`${apiBase}/tasks/${id}`, { method: "DELETE" });
      fetchTasks();
    } catch (error) {
      showAlert("Failed to delete task");
      taskItem.classList.remove('fade-out');
    }
  }, 300);
}

// Utility Functions
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function showAlert(message) {
  alert(message);
}

// Event Listeners
function setupEventListeners() {
  // Enter key support for task title
  document.getElementById("taskTitle").addEventListener("keypress", (e) => {
    if (e.key === "Enter") addTask();
  });

  // Enter key support for task ID
  document.getElementById("taskId").addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      document.getElementById("taskTitle").focus();
    }
  });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  loadTheme();
  setupEventListeners();
  fetchTasks();
});
