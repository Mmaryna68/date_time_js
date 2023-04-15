// Функция для очистки поля ввода
const clearInputField = (inputField) => (inputField.value = "");

// Функция для проверки на спам
const checkSpam = (str) => str.toLowerCase().replace(/viagra|xxx/gi, "***");

// Массив со ссылками на стандартные аватарки
const defaultAvatars = [
  "https://i.pravatar.cc/150?img=1",
  "https://i.pravatar.cc/150?img=2",
  "https://i.pravatar.cc/150?img=3",
  "https://i.pravatar.cc/150?img=4",
  "https://i.pravatar.cc/150?img=5",
];

// Функция, которая добавляет дату в комментарий
const addCommentDate = (comment) => {
  const date = new Date();
  const dateString = `${date.toLocaleDateString()} в ${date.toLocaleTimeString()}`;
  const dateSpan = document.createElement("span");
  dateSpan.classList.add("date");
  dateSpan.textContent = dateString;
  comment.appendChild(dateSpan);
};

// Получаем форму комментариев и все поля ввода
const commentForm = document.getElementById("comment-form");
const nameInput = document.getElementById("name-input");
const avatarInput = document.getElementById("avatar-input");
const messageInput = document.getElementById("message-input");
const commentsContainer = document.getElementById("comments-container");

// Добавляем обработчик событий на поле ввода имени
nameInput.addEventListener("blur", (event) => {
  event.target.value = event.target.value
    .toLowerCase()
    .replace(/\s+/g, " ")
    .replace(/(^|\s)\S/g, (match) => match.toUpperCase());
});

// Получаем радиокнопки "Нет" и  "Да"
const showNameNo = document.getElementById("show-name-no");
const showNameYes = document.getElementById("show-name-yes");

// Добавляем обработчик события на радиокнопку "Да"
showNameYes.addEventListener("click", () => {
  if (showNameYes.checked) {
    nameInput.disabled = false; // Делаем поле ввода имени активным
    avatarInput.disabled = false; // Делаем поле ввода ссылки на аватар активным
    nameInput.value = "";
    if (showNameNo.checked) {
      // Если была выбрана радиокнопка "Нет", то очищаем и делаем активными поля ввода имени и ссылки на аватар
      nameInput.disabled = false;
      avatarInput.disabled = false;
      nameInput.value = "";
      avatarInput.value = "";
    }
  }
});

// Добавляем обработчик события на радиокнопку "Нет"
showNameNo.addEventListener("click", () => {
  if (showNameNo.checked) {
    nameInput.disabled = true; // Делаем поле ввода имени неактивным
    avatarInput.disabled = true; // Делаем поле ввода ссылки на аватар неактивным
    nameInput.value = "username"; // Устанавливаем значение поля ввода имени равным "username"
  } else {
    nameInput.disabled = false; // Делаем поле ввода имени активным
    avatarInput.disabled = false; // Делаем поле ввода ссылки на аватар активным
    nameInput.value = ""; // Сбрасываем значение поля ввода имени
    avatarInput.value = ""; // Сбрасываем значение поля ввода ссылки на аватар
  }
});

// Добавляем обработчик события на отправку формы
commentForm.addEventListener("submit", (event) => {
  event.preventDefault(); // Отменяем действие по умолчанию

  // Получаем значения полей ввода
  const name = showNameNo.checked ? "username" : nameInput.value.trim();
  const avatar =
    avatarInput.value.trim() ||
    defaultAvatars[Math.floor(Math.random() * defaultAvatars.length)];
  const message = messageInput.value.trim();

  // Получаем значение чекбокса
  const showNameCheckbox = document.querySelector(
    'input[name="show-name"]:checked'
  );
  let showName;
  if (showNameCheckbox) {
    showName = showNameCheckbox.value;
  }

  // Проверяем, что все поля заполнены
  if (!name || !message) {
    alert("Пожалуйста, заполните все поля формы!");
    return;
  }

  // Создаём новый комментарий
  const newComment = document.createElement("div");
  newComment.classList.add("comment");

  // Добавляем аватар пользователя
  const avatarImg = document.createElement("img");
  avatarImg.classList.add("avatar");
  avatarImg.src = avatar;
  newComment.appendChild(avatarImg);

  // Добавляем имя пользователя
  const nameSpan = document.createElement("span");
  nameSpan.classList.add("name");
  nameSpan.textContent = name;
  newComment.appendChild(nameSpan);

  // Добавляем дату комментария
  addCommentDate(newComment);

  // Добавляем текст комментария
  const messagePara = document.createElement("p");
  messagePara.classList.add("message");
  messagePara.textContent = checkSpam(message);
  newComment.appendChild(messagePara);

  // Добавляем новый комментарий в контейнер комментариев
  commentsContainer.appendChild(newComment);

  // Очищаем поля ввода
  [nameInput, avatarInput, messageInput].forEach(clearInputField);
});
