//Прилагане на тъмната тема при зареждане на страниците
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
  document.body.classList.add("dark-theme");
}  

// Цитати по категории
const quotes = {
    motivation: [
      "Силата не идва от победите. Тя идва от борбите, през които преминаваш.",
      "Най-добрият начин да започнеш е да престанеш да говориш и да започнеш да действаш.",
      "Не се отказвай. Началото винаги е най-трудно.",
      "Успехът е сбор от малки усилия, повтаряни всеки ден.",
      "Бъди промяната, която искаш да видиш в света.",
      "Границите съществуват само в ума ни.",
      "Всеки ден е нов шанс да започнеш отначало."
    ],
    humor: [
      "Животът е твърде кратък, за да се вземаме на сериозно. Смей се повече!",
      "Смехът е най-доброто лекарство - освен ако имаш костна фрактура.",
      "Имам шест коремни плочки, просто ги пазя под слой щастие.",
      "Не съм мързелив – просто съм на режим на енергоспестяване.",
      "Знам, че нищо не знам, но и това не е сигурно.",
      "Ако животът ти поднесе лимони, намери някой, на когото му се е паднала текила."
    ],
    romance: [
    "Любовта е като вятъра - не можеш да я видиш, но можеш да я усетиш.",
    "Истинската любов започва там, където свършва егото.",
    "Да обичаш някого означава да видиш всички негови несъвършенства и все пак да го избираш всеки ден.",
    "Обичам те не защото си съвършен, а защото си съвършен за мен.",
    "Сърцето ми бие с една мисъл – теб.",
    "Ти си моят дом в този объркан свят."
    ],
    melancholy: [
      "Понякога тъгата е просто начинът, по който душата си поема дъх.",
      "Най-тихите вечери често крият най-силните чувства.",
      "Дъждът отвън често отразява бурята вътре в нас.",
      "Меланхолията е споменът за нещо, което никога не си имал.",
      "Празнотата понякога говори по-силно от думите.",
      "Красотата на болката е, че ни учи да ценим светлината.",
      "Има моменти, в които мълчанието казва всичко."
    ]    
  };
  
  // Превключвам тъмната тема
  const themeBtn = document.getElementById("theme-toggle");
  if (themeBtn) {
    themeBtn.addEventListener("click", () => {
      document.body.classList.toggle("dark-theme");
      const isDark = document.body.classList.contains("dark-theme");
      localStorage.setItem("theme", isDark ? "dark" : "light");
    });
  }
  
  // Генерирам цитат по тема
  const generateBtn = document.getElementById("generate-button");
  if (generateBtn) {
    generateBtn.addEventListener("click", () => {
      const theme = document.getElementById("theme").value;
      const quoteList = document.getElementById("quote-list");
      const randomIndex = Math.floor(Math.random() * quotes[theme].length);
      const newQuote = quotes[theme][randomIndex];
  
      const listItem = document.createElement("li");
      listItem.textContent = newQuote;
      quoteList.appendChild(listItem);
  
      // Запазване в localStorage
      let stored = JSON.parse(localStorage.getItem("userQuotes")) || [];
      stored.push(newQuote);
      localStorage.setItem("userQuotes", JSON.stringify(stored));
    });
  }
  
  // Изпращане на контактна форма
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();
  
      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const message = document.getElementById("message").value.trim();
  
      if (name && email && message) {
        alert(`Благодарим ви, ${name}! Вашето съобщение е изпратено успешно.`);
        contactForm.reset();
      } else {
        alert("Моля, попълнете всички полета.");
      }
    });
  }
  
  // Drag & drop логика за custom цитатите
const dropArea = document.getElementById("drop-area");
const generateCustom = document.getElementById("generate-custom");
const output = document.getElementById("custom-quote");

if (dropArea && generateCustom && output) {
  let selectedWords = [];

  document.querySelectorAll(".draggable-word").forEach(word => {
    word.addEventListener("dragstart", e => {
      e.dataTransfer.setData("text/plain", word.textContent);
    });
  });

  dropArea.addEventListener("dragover", e => {
    e.preventDefault();
    dropArea.classList.add("highlight");
  });

  dropArea.addEventListener("dragleave", () => {
    dropArea.classList.remove("highlight");
  });

  dropArea.addEventListener("drop", e => {
    e.preventDefault();
    dropArea.classList.remove("highlight");
    const word = e.dataTransfer.getData("text/plain");
    if (!selectedWords.includes(word)) {
      selectedWords.push(word);
      const tag = document.createElement("span");
      tag.className = "draggable-word";
      tag.textContent = word;
      dropArea.appendChild(tag);
    }
  });

  generateCustom.addEventListener("click", () => {
    if (selectedWords.length === 0) {
      output.textContent = "Моля, добавете поне една дума.";
      return;
    }

    const clearWordsButton = document.getElementById("clear-words");

if (clearWordsButton) {
  clearWordsButton.addEventListener("click", () => {
    selectedWords = [];
    // Премахвам всички добавени елементи от dropArea, освен първоначалния параграф
    const elementsToRemove = dropArea.querySelectorAll("span");
    elementsToRemove.forEach(el => el.remove());

    output.textContent = ""; // Изчиства и генерирания цитат (по желание)!!!
  });
}


    // Шаблони
    const templates = [
      "Пътят към {word} започва с малка крачка, но с голямо сърце.",
      "Вдъхновението се крие в {word}, дори когато не го виждаме ясно.",
      "Без {word} няма истински успех.",
      "Мечтите започват с {word} и завършват с действие.",
      "Всеки ден е нов шанс да откриеш {word}.",
      "С {word} в сърцето, няма невъзможни неща."
    ];

    // Изберане на случайна дума и шаблон
    const word = selectedWords[Math.floor(Math.random() * selectedWords.length)];
    const template = templates[Math.floor(Math.random() * templates.length)];

    // Генериране на цитата
    const quote = template.replace("{word}", word);
    output.textContent = quote;
  });
}

  // Зареждане на цитати в quotes.html (ако сме на тази страница)

  const quoteListElement = document.getElementById("quote-list");
  const favoritesList = document.getElementById("favorites-list");

  function createQuoteItem(text, isFavorite = false) {
    const li = document.createElement("li");
    li.classList.add("quote-item");
  
    const quoteText = document.createElement("span");
    quoteText.textContent = text;
  
    const heartBtn = document.createElement("button");
    heartBtn.className = "heart-btn";
    heartBtn.innerHTML = "❤️";
  
    if (isFavorite) {
      heartBtn.title = "Премахни от любими";
      heartBtn.addEventListener("click", () => {
        removeFromFavorites(text);
      });
    } else {
      heartBtn.title = "Добави в любими";
      heartBtn.addEventListener("click", () => {
        addToFavorites(text);
      });
    }
  
    li.appendChild(quoteText);
    li.appendChild(heartBtn);
    return li;
  }
  
  
  function renderQuotes() {
    quoteListElement.innerHTML = "";
    const savedQuotes = JSON.parse(localStorage.getItem("userQuotes")) || [];
  
    if (savedQuotes.length === 0) {
      quoteListElement.innerHTML = "<li>Все още няма генерирани цитати.</li>";
    } else {
      savedQuotes.forEach(quote => {
        quoteListElement.appendChild(createQuoteItem(quote));
      });
    }
  }
  
  function renderFavorites() {
    favoritesList.innerHTML = "";
    const favorites = JSON.parse(localStorage.getItem("favoriteQuotes")) || [];
  
    if (favorites.length === 0) {
      favoritesList.innerHTML = "<li>Няма добавени любими цитати.</li>";
    } else {
      favorites.forEach(quote => {
        favoritesList.appendChild(createQuoteItem(quote, true));
      });
    }
  }
  
  function addToFavorites(quote) {
    let favorites = JSON.parse(localStorage.getItem("favoriteQuotes")) || [];
    if (!favorites.includes(quote)) {
      favorites.push(quote);
      localStorage.setItem("favoriteQuotes", JSON.stringify(favorites));
      renderFavorites();
    }
  }
  
  function removeFromFavorites(quote) {
    let favorites = JSON.parse(localStorage.getItem("favoriteQuotes")) || [];
    favorites = favorites.filter(fav => fav !== quote);
    localStorage.setItem("favoriteQuotes", JSON.stringify(favorites));
    renderFavorites();
  }

// Изчистване на историята на цитати
// const clearButton = document.getElementById("clear-history");
// if (clearButton && quoteListElement) {
//   clearButton.addEventListener("click", () => {
//     localStorage.removeItem("userQuotes");
//     quoteListElement.innerHTML = ""; // Изчистване на списъка
//     const li = document.createElement("li");
//     li.textContent = "Историята е изчистена.";
//     quoteListElement.appendChild(li);
//   });
// }

const clearHistoryBtn = document.getElementById("clear-history");
if (clearHistoryBtn && quoteListElement) {
  clearHistoryBtn.addEventListener("click", () => {
    localStorage.removeItem("userQuotes");
    renderQuotes();
  });
}

const clearFavoritesBtn = document.getElementById("clear-favorites");
if (clearFavoritesBtn && favoritesList) {
  clearFavoritesBtn.addEventListener("click", () => {
    localStorage.removeItem("favoriteQuotes");
    renderFavorites();
  });
}

if (quoteListElement && !generateBtn) {
  renderQuotes();
  renderFavorites();
}

