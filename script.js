// Seleccionamos elementos do DOM
const habitInput = document.getElementById("habit-name");
const addButton = document.getElementById("add-habit-button");
const habitList = document.getElementById("habit-list-js");

// Array de hábitos: cargamos de localStorage ou creamos un vacío
let habits = JSON.parse(localStorage.getItem("habits")) || [];

// Función para crear un li de hábito
function createHabitLi(habitObj) {
  const li = document.createElement("li");

  // Checkbox
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.className = "habit-check";
  checkbox.checked = habitObj.completed || false;

  // Texto do hábito
  const text = document.createElement("span");
  text.className = "habit-text";
  text.textContent = habitObj.name;

  // Botón eliminar
  const deleteBtn = document.createElement("button");
  deleteBtn.className = "delete-button";
  deleteBtn.textContent = "Eliminar";

  // Engadimos os elementos ao li
  li.appendChild(checkbox);
  li.appendChild(text);
  li.appendChild(deleteBtn);

  // Engadimos o li á lista
  habitList.appendChild(li);

  // Funcionalidade do checkbox
  checkbox.addEventListener("change", () => {
    habitObj.completed = checkbox.checked;
    localStorage.setItem("habits", JSON.stringify(habits));
  });

  // Funcionalidade do botón eliminar
  deleteBtn.addEventListener("click", () => {
    habitList.removeChild(li);
    habits = habits.filter(h => h !== habitObj);
    localStorage.setItem("habits", JSON.stringify(habits));
  });
}

// Cargar hábitos gardados ao iniciar a páxina
habits.forEach(h => createHabitLi(h));

// Engadir novo hábito
addButton.addEventListener("click", () => {
  const name = habitInput.value.trim();
  if (name === "") return; // Non engadir se está baleiro

  const newHabit = { name: name, completed: false };
  habits.push(newHabit);
  localStorage.setItem("habits", JSON.stringify(habits));

  createHabitLi(newHabit);
  habitInput.value = ""; // Limpiamos o input
});
