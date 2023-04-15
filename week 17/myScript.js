//*** Задание под звездочкой
function formatDate(date) {
  let now = new Date(); // получаем текущую дату и время
  let secondsAgo = Math.round((now - date) / 1000); // вычисляем количество секунд, прошедших с момента переданной даты до текущего момента

  if (secondsAgo < 1) {
    // если прошло менее одной секунды
    return "прямо сейчас"; //возвращаем "прямо сейчас"
  } else if (secondsAgo < 60) {
    // если прошло меньше минуты
    return `${secondsAgo} сек. назад`; // возвращаем количество секунд с суффиксом "сек. назад"
  } else if (secondsAgo < 60 * 60) {
    // если прошло меньше часа
    let minutesAgo = Math.floor(secondsAgo / 60); // вычисляем количество минут, прошедших с момента переданной даты до текущего момента
    return `${minutesAgo} мин. назад`; // возвращаем количество минут с суффиксом "мин. назад"
  } else {
    let day = date.getDate().toString().padStart(2, "0"); // получаем день месяца и приводим его к строке, дополненной нулем слева, если необходимо
    let month = (date.getMonth() + 1).toString().padStart(2, "0"); // получаем номер месяца (начиная с 0) и приводим его к строке, дополненной нулем слева, если необходимо
    let year = date.getFullYear().toString().slice(2); // получаем год и оставляем только две последние цифры
    let hours = date.getHours().toString().padStart(2, "0"); // получаем часы и приводим их к строке, дополненной нулем слева, если необходимо
    let minutes = date.getMinutes().toString().padStart(2, "0"); // получаем минуты и приводим их к строке, дополненной нулем слева, если необходимо
    return `${day}.${month}.${year} ${hours}:${minutes}`; // возвращаем дату и время в формате "день.месяц.год часы:минуты"
  }
}

let dateElement = document.getElementById("myDate");
dateElement.innerHTML = formatDate(new Date());
//вызываем функцию и добавляем результат внутрь элемента div
let output = document.getElementById("output");
output.innerHTML = formatDate(new Date(new Date() - 1));
output.innerHTML += "<br>";
output.innerHTML += formatDate(new Date(new Date() - 30 * 1000));
output.innerHTML += "<br>";
output.innerHTML += formatDate(new Date(new Date() - 5 * 60 * 1000));
output.innerHTML += "<br>";
output.innerHTML += formatDate(new Date(new Date() - 86400 * 4 * 1000));
