// В стартовом проекте нет готовой логики домашней работы.
// Спроектируйте модель данных и переходы между состояниями самостоятельно.

console.log("Стартовый проект подключен")

const form = document.querySelector(".card-form");

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

  console.log(card);
});

