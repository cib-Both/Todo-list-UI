const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const emptyState = document.getElementById("empty-state");
const totalTasksEl = document.getElementById("total-tasks");
const completedTasksEl = document.getElementById("completed-tasks");

// Add task function
function addTask() {
  const taskText = inputBox.value.trim();
  
  if (taskText === '') {
    // Shake animation for empty input
    inputBox.style.animation = 'shake 0.5s';
    setTimeout(() => {
      inputBox.style.animation = '';
    }, 500);
    return;
  }
  
  // Create task item
  const li = document.createElement("li");
  
  // Create task text span
  const taskSpan = document.createElement("span");
  taskSpan.className = "task-text";
  taskSpan.textContent = taskText;
  li.appendChild(taskSpan);
  
  // Create delete button
  const deleteBtn = document.createElement("span");
  deleteBtn.className = "delete-btn";
  deleteBtn.innerHTML = "×";
  li.appendChild(deleteBtn);
  
  listContainer.appendChild(li);
  inputBox.value = "";
  
  updateUI();
  saveData();
}

// Handle task interactions
listContainer.addEventListener("click", function(e) {
  const target = e.target;
  const li = target.closest('li');
  
  if (!li) return;
  
  if (target.classList.contains('delete-btn')) {
    // Delete task with animation
    li.style.animation = 'taskSlideOut 0.3s ease-out';
    setTimeout(() => {
      li.remove();
      updateUI();
      saveData();
    }, 300);
  } else if (target.classList.contains('task-text') || target.tagName === 'LI') {
    // Toggle task completion
    li.classList.toggle("checked");
    updateUI();
    saveData();
  }
});

// Allow Enter key to add task
inputBox.addEventListener("keypress", function(e) {
  if (e.key === "Enter") {
    addTask();
  }
});

// Update UI (stats and empty state)
function updateUI() {
  const tasks = listContainer.querySelectorAll('li');
  const completedTasks = listContainer.querySelectorAll('li.checked');
  
  totalTasksEl.textContent = tasks.length;
  completedTasksEl.textContent = completedTasks.length;
  
  if (tasks.length === 0) {
    emptyState.classList.remove('hidden');
  } else {
    emptyState.classList.add('hidden');
  }
}

// Save tasks to localStorage
function saveData() {
  localStorage.setItem("data", listContainer.innerHTML);
}

// Load tasks from localStorage
function showTask() {
  const savedData = localStorage.getItem("data");
  if (savedData) {
    listContainer.innerHTML = savedData;
  }
  updateUI();
}

// Add shake animation to CSS dynamically
const style = document.createElement('style');
style.textContent = `
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
    20%, 40%, 60%, 80% { transform: translateX(5px); }
  }
  
  @keyframes taskSlideOut {
    to {
      opacity: 0;
      transform: translateX(100%);
    }
  }
`;
document.head.appendChild(style);

// Initialize app
showTask();
