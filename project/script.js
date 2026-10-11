// В стартовом проекте нет готовой логики домашней работы.
// Спроектируйте модель данных и переходы между состояниями самостоятельно.

console.log("Стартовый проект подключен")

const form = document.querySelector(".card-form");
const panels = document.querySelectorAll("[data-state-panel]");
const cardFields = document.querySelectorAll("[data-card-field]");
const createButton = document.querySelector('[data-action="create"]');
const cancelButton = document.querySelector('[data-action="cancel"]');
const editButton = document.querySelector('[data-action="edit"]');
const deleteButton = document.querySelector('[data-action="delete"]');

const STORAGE_KEY = "movie-card";
const DRAFT_KEY = "movie-card-draft";

let savedCard = null;

function saveCard(card) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(card));
}

function readJson(storage, key) {
  const json = storage.getItem(key);

  if (json === null) {
    return null;
  }

  return JSON.parse(json);
}

function showState(name) {
  panels.forEach((panel) => {
    panel.hidden = panel.dataset.statePanel !== name;
  });
}

function renderCard(card) {
  cardFields.forEach((element) => {
    element.textContent = card[element.dataset.cardField];
  });
}

function fillForm(card) {
  Object.entries(card).forEach(([name, value]) => {
    form.elements[name].value = value;
  });
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(form);

  const card = {
    title: formData.get("title"),
    genre: formData.get("genre"),
    year: Number(formData.get("year")),
    watchedAt: formData.get("watchedAt"),
    rating: Number(formData.get("rating")),
    review: formData.get("review"),
  };

  savedCard = card;
  saveCard(savedCard);
  sessionStorage.removeItem(DRAFT_KEY);
  renderCard(savedCard);
  showState("viewer");
});

form.addEventListener("input", () => {
  const draft = Object.fromEntries(new FormData(form));
  sessionStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
});

createButton.addEventListener("click", () => {
  form.reset();
  showState("editor");
});

cancelButton.addEventListener("click", () => {
  sessionStorage.removeItem(DRAFT_KEY);
  showState(savedCard ? "viewer" : "empty");
});

editButton.addEventListener("click", () => {
  fillForm(savedCard);
  showState("editor");
});

deleteButton.addEventListener("click", () => {
  savedCard = null;
  localStorage.removeItem(STORAGE_KEY);
  form.reset();
  showState("empty");
});

savedCard = readJson(localStorage, STORAGE_KEY);

if (savedCard) {
  renderCard(savedCard);
}

const draft = readJson(sessionStorage, DRAFT_KEY);

if (draft) {
  fillForm(draft);
  showState("editor");
} else if (savedCard) {
  showState("viewer");
} else {
  showState("empty");
}
