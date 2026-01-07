let appointmentData = {
  salon: "",
  salonAddress: "",
  services: [],
  selectedService: null,
  currentAppointment: {
    service: null,
    specialist: "",
    specialistDuration: 0,
    date: "",
    time: "",
    formattedDate: "",
  },
  clientName: "",
  clientPhone: "",
  clientEmail: "",
  clientComment: "",
  promocodeApplied: false,
  discountAmount: 0,
  originalTotal: 0,
  finalTotal: 0,
};

// Текущая дата для календаря
let currentDate = new Date();
currentDate.setDate(1);

// База данных занятых слотов из Django
let bookedSlotsFromDjango = {};

// Список услуг с продолжительностью и категориями
const servicesData = {
  1: {
    name: "Женская стрижка + укладка (короткие волосы)",
    price: 7210,
    duration: 90,
    category: "hair",
  },
  2: {
    name: "Женская стрижка + укладка (длинные волосы)",
    price: 7930,
    duration: 120,
    category: "hair",
  },
  3: {
    name: "Окрашивание волос",
    price: 13000,
    duration: 180,
    category: "hair",
  },
  4: {
    name: "Придание оттенка Luquias",
    price: 8860,
    duration: 90,
    category: "hair",
  },
  5: {
    name: "Стоун массаж",
    price: 4800,
    duration: 90,
    category: "massage",
  },
  6: {
    name: "Антицеллюлитный массаж",
    price: 5200,
    duration: 60,
    category: "massage",
  },
  7: {
    name: "Тайский массаж",
    price: 6700,
    duration: 90,
    category: "massage",
  },
  8: {
    name: "Массаж лица 'Тоффа'",
    price: 5300,
    duration: 60,
    category: "massage",
  },
  9: {
    name: "Увеличение губ Restylane",
    price: 17000,
    duration: 60,
    category: "cosmetology",
  },
  10: {
    name: "Увеличение губ Juvederm",
    price: 18000,
    duration: 60,
    category: "cosmetology",
  },
  11: {
    name: "Лазерная эпиляция",
    price: 2000,
    duration: 60,
    category: "cosmetology",
  },
  12: {
    name: "Консультация",
    price: 2000,
    duration: 60,
    category: "consultation",
  },
  13: {
    name: "Маникюр (без покрытия)",
    price: 3000,
    duration: 60,
    category: "nails",
  },
  14: {
    name: "Маникюр + Calget",
    price: 5500,
    duration: 60,
    category: "nails",
  },
  15: {
    name: "Маникюр + наращивание",
    price: 7500,
    duration: 120,
    category: "nails",
  },
  16: {
    name: "Коррекция наращивания",
    price: 6000,
    duration: 120,
    category: "nails",
  },
  17: {
    name: "Педикюр комплекс",
    price: 5900,
    duration: 60,
    category: "nails",
  },
  18: {
    name: "Ремонт ногтя",
    price: 3700,
    duration: 60,
    category: "nails",
  },
  19: {
    name: "Smart педикюр (мужской)",
    price: 3860,
    duration: 60,
    category: "nails",
  },
  20: {
    name: "Smart педикюр без покрытия",
    price: 4500,
    duration: 60,
    category: "nails",
  },
  21: {
    name: "Дневной макияж",
    price: 6200,
    duration: 60,
    category: "makeup",
  },
  22: {
    name: "Свадебный макияж",
    price: 7600,
    duration: 60,
    category: "makeup",
  },
  23: {
    name: "Обучающий макияж",
    price: 12500,
    duration: 60,
    category: "makeup",
  },
  24: {
    name: "Окрашивание бровей",
    price: 1350,
    duration: 60,
    category: "makeup",
  },
};

// Список мастеров с специализациями, рейтингами и фотографиями
const specialistsData = [
  {
    name: "АННА ПАВЛОВА",
    role: "Эстетист-массажист",
    specializations: ["massage"],
    rating: 5,
    image: "https://i.ibb.co/TBPqt35d/Anna-Pavlova.jpg",
  },
  {
    name: "ЮЛИЯ РОТАРЬ",
    role: "Парикхмахер-стилист",
    specializations: ["hair"],
    rating: 4,
    image: "https://i.ibb.co/DjhPMqj/Yuliya-Rotar.jpg",
  },
  {
    name: "НАТАЛИЯ ПОНУЛЯК",
    role: "Администратор",
    specializations: ["consultation"],
    rating: 5,
    image: "https://i.ibb.co/Df5w5MWt/Nataliya-Ponulyak.jpg",
  },
  {
    name: "АНАСТАСИЯ ДАХНО",
    role: "Мастер ногтевого сервиса",
    specializations: ["nails"],
    rating: 5,
    image: "https://i.ibb.co/rGD7twsj/Anastasiya-Dahno.jpg",
  },
  {
    name: "НАТАЛЬЯ ШТЕРН",
    role: "Косметолог",
    specializations: ["cosmetology"],
    rating: 4,
    image: "https://i.ibb.co/KcWfT4kL/Natalya-Shtern.jpg",
  },
  {
    name: "МАРИНА МИЩЕНКО",
    role: "Визажист",
    specializations: ["makeup"],
    rating: 5,
    image: "https://i.ibb.co/ZzzYjyb2/Marina-Mishchenko.jpg",
  },
];

// Функция для загрузки занятых слотов из Django
async function loadBookedSlotsFromDjango(specialistName, date) {
  try {
    console.log(`Загрузка занятых слотов для ${specialistName} на ${date}`);

    // Показываем спиннер загрузки
    document.getElementById("loading-slots").style.display = "block";
    document.getElementById("time-slots-display").style.display = "none";

    // Отправляем запрос на сервер Django для получения занятых слотов
    const response = await fetch(
      `/api/get-booked-slots/?specialist=${encodeURIComponent(
        specialistName
      )}&date=${date}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Ответ сервера:", response.status, response.statusText);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Получены данные:", data);

    // Сохраняем полученные данные
    if (data.booked_slots && data.booked_slots[specialistName]) {
      bookedSlotsFromDjango[specialistName] = data.booked_slots[specialistName];
      console.log(
        `Сохранено ${bookedSlotsFromDjango[specialistName].length} занятых слотов для ${specialistName}`
      );
    } else {
      bookedSlotsFromDjango[specialistName] = [];
      console.log(`Нет занятых слотов для ${specialistName}`);
    }

    // Скрываем спиннер
    document.getElementById("loading-slots").style.display = "none";
    return true;
  } catch (error) {
    console.error("Ошибка загрузки занятых слотов:", error);
    document.getElementById("loading-slots").style.display = "none";

    // В случае ошибки используем пустой список
    bookedSlotsFromDjango[specialistName] = [];
    return false;
  }
}

// Функция для проверки, занят ли слот (из базы данных Django)
function isTimeSlotBookedFromDjango(specialistName, dateTimeStr, duration) {
  if (!bookedSlotsFromDjango[specialistName]) {
    console.log(`Нет данных о занятых слотах для ${specialistName}`);
    return false;
  }

  const [date, startTime] = dateTimeStr.split(" ");
  const startMinutes = timeToMinutes(startTime);
  const endMinutes = startMinutes + duration;

  console.log(`Проверка слота: ${dateTimeStr} (${startMinutes}-${endMinutes})`);

  // Проверяем все занятые слоты мастера на эту дату
  for (const bookedSlot of bookedSlotsFromDjango[specialistName]) {
    console.log("Сравниваем с занятым слотом:", bookedSlot);

    const [bookedDate, bookedStartTime] = bookedSlot.start_time.split(" ");
    const bookedEndTime = bookedSlot.end_time;

    // Проверяем только слоты на ту же дату
    if (bookedDate === date) {
      const bookedStartMinutes = timeToMinutes(bookedStartTime);
      const bookedEndMinutes = bookedEndTime
        ? timeToMinutes(bookedEndTime.split(" ")[1])
        : bookedStartMinutes + bookedSlot.duration;

      // Проверяем пересечение интервалов
      if (
        (startMinutes >= bookedStartMinutes &&
          startMinutes < bookedEndMinutes) ||
        (endMinutes > bookedStartMinutes && endMinutes <= bookedEndMinutes) ||
        (startMinutes <= bookedStartMinutes && endMinutes >= bookedEndMinutes)
      ) {
        console.log(
          `Слот занят! Пересечение с ${bookedStartTime}-${
            bookedEndTime ? bookedEndTime.split(" ")[1] : "?"
          }`
        );
        return true;
      }
    }
  }

  console.log("Слот свободен");
  return false;
}

// Функция преобразования времени в минуты
function timeToMinutes(time) {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

// Функция для форматирования номера телефона
function formatPhoneNumber(input) {
  const cursorPosition = input.selectionStart;
  let value = input.value;
  let numbers = value.replace(/\D/g, "");

  if (numbers.startsWith("7") || numbers.startsWith("8")) {
    numbers = numbers.substring(1);
  }

  if (numbers.length > 10) {
    numbers = numbers.substring(0, 10);
  }

  let formattedValue = "+7";

  if (numbers.length > 0) {
    formattedValue += " (" + numbers.substring(0, 3);
  }
  if (numbers.length > 3) {
    formattedValue += ") " + numbers.substring(3, 6);
  }
  if (numbers.length > 6) {
    formattedValue += "-" + numbers.substring(6, 8);
  }
  if (numbers.length > 8) {
    formattedValue += "-" + numbers.substring(8, 10);
  }

  input.value = formattedValue;
  const newCursorPosition = Math.min(cursorPosition, formattedValue.length);
  input.setSelectionRange(newCursorPosition, newCursorPosition);

  validatePhone();
  validateForm();
}

// Функция для обработки клавиш при вводе телефона
function handlePhoneKeyDown(event) {
  const allowedKeys = [
    "Backspace",
    "Delete",
    "Tab",
    "ArrowLeft",
    "ArrowRight",
    "ArrowUp",
    "ArrowDown",
    "Home",
    "End",
  ];

  if (
    (event.key >= "0" && event.key <= "9") ||
    allowedKeys.includes(event.key)
  ) {
    return;
  }

  event.preventDefault();
}

// Функция валидации телефона
function validatePhone() {
  const phoneInput = document.getElementById("client-phone");
  const phoneError = document.getElementById("phone-error");
  const phone = phoneInput.value.replace(/\D/g, "");

  let cleanPhone = phone;
  if (phone.startsWith("7") || phone.startsWith("8")) {
    cleanPhone = phone.substring(1);
  }

  if (cleanPhone.length === 10) {
    phoneError.style.display = "none";
    return true;
  } else {
    phoneError.style.display = "block";
    return false;
  }
}

// Функция валидации email
function validateEmail() {
  const emailInput = document.getElementById("client-email");
  const emailError = document.getElementById("email-error");
  const email = emailInput.value.trim();

  if (email === "") {
    emailError.style.display = "none";
    return true;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (emailRegex.test(email)) {
    emailError.style.display = "none";
    return true;
  } else {
    emailError.style.display = "block";
    return false;
  }
}

// Функция для обновления счетчика символов в комментарии
function updateCommentCounter() {
  const commentTextarea = document.getElementById("client-comment");
  const counter = document.getElementById("comment-counter");
  const currentLength = commentTextarea.value.length;

  counter.textContent = currentLength;

  if (currentLength > 4500) {
    counter.style.color = "#ff6b6b";
  } else if (currentLength > 4000) {
    counter.style.color = "#ffa726";
  } else {
    counter.style.color = "#666";
  }

  if (currentLength > 5000) {
    commentTextarea.value = commentTextarea.value.substring(0, 5000);
    counter.textContent = 5000;
  }
}
// Простая и понятная функция форматирования
function formatPhoneSimple(input) {
  let value = input.value.replace(/\D/g, "");

  // Всегда начинаем с +7
  if (!value.startsWith("7")) {
    if (value.length > 0) {
      value = "7" + value;
    }
  }

  // Ограничиваем 11 цифрами (7 + 10)
  if (value.length > 11) {
    value = value.substring(0, 11);
  }

  // Форматируем
  let formatted = "+7";
  if (value.length > 1) {
    formatted += " (" + value.substring(1, 4);
  }
  if (value.length > 4) {
    formatted += ") " + value.substring(4, 7);
  }
  if (value.length > 7) {
    formatted += "-" + value.substring(7, 9);
  }
  if (value.length > 9) {
    formatted += "-" + value.substring(9, 11);
  }

  input.value = formatted;
}

// Простая валидация
function validatePhoneSimple() {
  const phoneInput = document.getElementById("client-phone");
  const phoneError = document.getElementById("phone-error");
  const digits = phoneInput.value.replace(/\D/g, "");

  if (digits.length === 11) {
    // 7 + 10 цифр
    phoneError.style.display = "none";
    phoneInput.style.borderColor = "#856A65";
    return true;
  } else {
    phoneError.style.display = "block";
    phoneInput.style.borderColor = "#ff6b6b";
    return false;
  }
}

// Обновите также validateForm() чтобы использовала новую валидацию
function validateForm() {
  const name = document.getElementById("client-name").value.trim();
  const nameError = document.getElementById("name-error");
  const submitBtn = document.getElementById("btn-submit");

  let isValid = true;

  // Валидация имени
  if (name.length < 2) {
    nameError.style.display = "block";
    isValid = false;
  } else {
    nameError.style.display = "none";
  }

  // Валидация телефона (используем новую функцию)
  const phoneValid = validatePhoneSimple();
  if (!phoneValid) {
    isValid = false;
  }

  // Валидация email
  const emailValid = validateEmail();
  if (!emailValid) {
    isValid = false;
  }

  submitBtn.disabled = !isValid;
  return isValid;
}
// Функция для отображения звездочек рейтинга
function getRatingStars(rating) {
  let stars = "";
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars += "★";
    } else {
      stars += "☆";
    }
  }
  return stars;
}

// Функция для получения CSRF токена (для Django)
function getCSRFToken() {
  const name = "csrftoken";
  const cookieValue = document.cookie
    .split("; ")
    .find((row) => row.startsWith(name + "="))
    ?.split("=")[1];

  if (!cookieValue) {
    const metaToken = document.querySelector('meta[name="csrf-token"]');
    if (metaToken) {
      return metaToken.getAttribute("content");
    }
    return "";
  }
  return cookieValue;
}

// Функции для работы с формой
function showPage(pageId) {
  document.querySelectorAll(".page").forEach((page) => {
    page.classList.remove("active");
  });
  document.getElementById(pageId).classList.add("active");

  if (pageId === "page-specialists") {
    loadSpecialists();
  } else if (pageId === "page-date") {
    renderCalendar();
    updateSelectedServiceInfo();
    updateAppointedServicesPreview();
    hideOverlapWarning();
  } else if (pageId === "page-add-service") {
    updateAllAppointedServices();
  } else if (pageId === "page-final") {
    updateSummary();
    updateCommentCounter();
  }

  window.scrollTo(0, 0);
}

function selectSalon(name, address, element) {
  document.querySelectorAll(".salon-card").forEach((card) => {
    card.classList.remove("selected");
  });
  element.classList.add("selected");
  appointmentData.salon = name;
  appointmentData.salonAddress = address;
}

function toggleService(serviceId, element, category) {
  document.querySelectorAll(".service-item").forEach((item) => {
    item.classList.remove("selected");
  });

  element.classList.add("selected");

  const service = servicesData[serviceId];
  if (!service) {
    console.error(`Услуга с ID ${serviceId} не найдена!`);
    return;
  }

  appointmentData.selectedService = {
    id: serviceId,
    name: service.name,
    price: service.price,
    duration: service.duration,
    category: category,
  };

  document.getElementById("btn-continue-services").disabled = false;
  updateSelectedServicesPreview();
}

function updateSelectedServicesPreview() {
  const preview = document.getElementById("selected-services-preview");
  const list = document.getElementById("selected-services-list");

  if (appointmentData.services.length > 0) {
    list.innerHTML = "";
    appointmentData.services.forEach((service) => {
      const serviceElement = document.createElement("div");
      serviceElement.className = "appointed-service-item";
      serviceElement.innerHTML = `
                        <div><strong>${service.name}</strong></div>
                        <div>Мастер: ${service.specialist}</div>
                        <div>Время: ${service.date} в ${service.time}</div>
                        <div>Продолжительность: ${service.duration} мин</div>
                        <div>Цена: ${service.price.toLocaleString()} ₽</div>
                    `;
      list.appendChild(serviceElement);
    });
    preview.style.display = "block";
  } else {
    preview.style.display = "none";
  }
}

function loadSpecialists() {
  const specialistsContainer = document.getElementById("specialists-container");
  const selectionInfo = document.getElementById("specialist-selection-info");

  specialistsContainer.innerHTML = "";

  if (!appointmentData.selectedService) {
    selectionInfo.innerHTML = "<strong>Ошибка:</strong> Услуга не выбрана";
    return;
  }

  const selectedCategory = appointmentData.selectedService.category;
  selectionInfo.innerHTML = `<strong>Выбранная услуга:</strong> ${
    appointmentData.selectedService.name
  }<br>
                                      <strong>Категория:</strong> ${getCategoryName(
                                        selectedCategory
                                      )}<br>
                                      <strong>Продолжительность:</strong> ${
                                        appointmentData.selectedService.duration
                                      } минут`;

  const availableSpecialists = specialistsData.filter((specialist) =>
    specialist.specializations.includes(selectedCategory)
  );

  if (availableSpecialists.length === 0) {
    specialistsContainer.innerHTML =
      '<p style="text-align: center; color: #666;">Нет доступных мастеров для выбранной услуги</p>';
    document.getElementById("btn-continue-specialist").disabled = true;
    return;
  }

  availableSpecialists.forEach((specialist) => {
    const specialistElement = document.createElement("div");
    specialistElement.className = "specialist-card";
    specialistElement.onclick = () =>
      selectSpecialist(specialist.name, specialistElement);

    const ratingStars = getRatingStars(specialist.rating);

    specialistElement.innerHTML = `
                    <img src="${specialist.image}" alt="${
      specialist.name
    }" class="specialist-image"
                         onerror="this.onerror=null; this.src='https://via.placeholder.com/120/e8cec9/856a65?text=${encodeURIComponent(
                           specialist.name.split(" ")[0]
                         )}'">
                    <div class="specialist-name">${specialist.name}</div>
                    <div class="specialist-role">${specialist.role}</div>
                    <div class="specialist-rating">${ratingStars}</div>
                    <div class="specialist-specialization">Специализация: ${getSpecializationsText(
                      specialist.specializations
                    )}</div>
                `;

    specialistsContainer.appendChild(specialistElement);
  });

  appointmentData.currentAppointment.specialist = "";
  document.getElementById("btn-continue-specialist").disabled = true;
}

function getCategoryName(category) {
  const categories = {
    hair: "Парикмахерские услуги",
    massage: "Массаж",
    cosmetology: "Косметология",
    nails: "Ногтевой сервис",
    makeup: "Макияж",
    consultation: "Консультации",
  };
  return categories[category] || category;
}

function getSpecializationsText(specializations) {
  return specializations.map((spec) => getCategoryName(spec)).join(", ");
}

function selectSpecialist(name, element) {
  document.querySelectorAll(".specialist-card").forEach((card) => {
    card.classList.remove("selected");
  });
  element.classList.add("selected");
  appointmentData.currentAppointment.specialist = name;
  document.getElementById("btn-continue-specialist").disabled = false;

  // Если дата уже выбрана, загружаем занятые слоты
  if (appointmentData.currentAppointment.formattedDate) {
    console.log("Мастер выбран, загружаем занятые слоты...");
    loadBookedSlotsFromDjango(
      name,
      appointmentData.currentAppointment.formattedDate
    );
  }
}

function updateSelectedServiceInfo() {
  if (
    appointmentData.selectedService &&
    appointmentData.currentAppointment.specialist
  ) {
    document.getElementById("selected-service-info").textContent =
      appointmentData.selectedService.name;
    document.getElementById("selected-specialist-info").textContent =
      appointmentData.currentAppointment.specialist;
  }
}

function updateAppointedServicesPreview() {
  const preview = document.getElementById("appointed-services-preview");
  const list = document.getElementById("appointed-services-list");

  if (appointmentData.services.length > 0) {
    list.innerHTML = "";
    appointmentData.services.forEach((service) => {
      const serviceElement = document.createElement("div");
      serviceElement.className = "appointed-service-item";
      serviceElement.innerHTML = `
                        <div><strong>${service.name}</strong></div>
                        <div>Мастер: ${service.specialist}</div>
                        <div>Время: ${service.date} в ${service.time}</div>
                        <div>Продолжительность: ${service.duration} мин</div>
                        <div>Цена: ${service.price.toLocaleString()} ₽</div>
                    `;
      list.appendChild(serviceElement);
    });
    preview.style.display = "block";
  } else {
    preview.style.display = "none";
  }
}

function updateAllAppointedServices() {
  const container = document.getElementById("all-appointed-services");

  if (appointmentData.services.length > 0) {
    let html =
      '<div class="selection-info"><strong>Все записанные услуги:</strong>';

    appointmentData.services.forEach((service, index) => {
      html += `
                        <div class="appointed-service-item">
                            <div><strong>${service.name}</strong></div>
                            <div>Мастер: ${service.specialist}</div>
                            <div>Время: ${service.date} в ${service.time}</div>
                            <div>Продолжительность: ${
                              service.duration
                            } мин</div>
                            <div>Цена: ${service.price.toLocaleString()} ₽</div>
                        </div>
                    `;
    });

    html += "</div>";
    container.innerHTML = html;
  } else {
    container.innerHTML = "";
  }
}

function addAnotherService() {
  if (
    appointmentData.selectedService &&
    appointmentData.currentAppointment.specialist &&
    appointmentData.currentAppointment.date &&
    appointmentData.currentAppointment.time
  ) {
    const serviceWithAppointment = {
      ...appointmentData.selectedService,
      specialist: appointmentData.currentAppointment.specialist,
      date: appointmentData.currentAppointment.date,
      formattedDate: appointmentData.currentAppointment.formattedDate,
      time: appointmentData.currentAppointment.time,
      endTime: calculateEndTime(
        appointmentData.currentAppointment.time,
        appointmentData.selectedService.duration
      ),
    };
    appointmentData.services.push(serviceWithAppointment);
  }

  appointmentData.selectedService = null;
  appointmentData.currentAppointment = {
    service: null,
    specialist: "",
    specialistDuration: 0,
    date: "",
    time: "",
    formattedDate: "",
  };

  document.querySelectorAll(".service-item").forEach((item) => {
    item.classList.remove("selected");
  });
  document.getElementById("btn-continue-services").disabled = true;

  showPage("page-services");
}

// Функция для расчета времени окончания
function calculateEndTime(startTime, duration) {
  const [hours, minutes] = startTime.split(":").map(Number);
  const totalMinutes = hours * 60 + minutes + duration;
  const endHours = Math.floor(totalMinutes / 60);
  const endMinutes = totalMinutes % 60;
  return `${endHours.toString().padStart(2, "0")}:${endMinutes
    .toString()
    .padStart(2, "0")}`;
}

// Функции календаря и временных слотов
function renderCalendar() {
  const monthNames = [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь",
  ];
  document.getElementById("current-month").textContent = `${
    monthNames[currentDate.getMonth()]
  } ${currentDate.getFullYear()}`;

  const calendarDays = document.getElementById("calendar-days");
  calendarDays.innerHTML = "";

  const firstDay = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  );
  const lastDay = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  );
  const prevLastDay = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    0
  ).getDate();
  const firstDayIndex = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1;
  const today = new Date();

  for (let i = firstDayIndex; i > 0; i--) {
    const day = prevLastDay - i + 1;
    const dayElement = document.createElement("div");
    dayElement.className = "calendar-day other-month";
    dayElement.textContent = day;
    calendarDays.appendChild(dayElement);
  }

  for (let i = 1; i <= lastDay.getDate(); i++) {
    const dayElement = document.createElement("div");
    dayElement.className = "calendar-day";
    dayElement.textContent = i;

    const cellDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      i
    );

    if (
      today.getDate() === i &&
      today.getMonth() === currentDate.getMonth() &&
      today.getFullYear() === currentDate.getFullYear()
    ) {
      dayElement.classList.add("today");
    }

    if (
      cellDate <
      new Date(today.getFullYear(), today.getMonth(), today.getDate())
    ) {
      dayElement.classList.add("disabled");
    } else {
      dayElement.onclick = () => selectDate(i, dayElement);
    }

    calendarDays.appendChild(dayElement);
  }

  const totalCells = 42;
  const nextDays = totalCells - (firstDayIndex + lastDay.getDate());

  for (let i = 1; i <= nextDays; i++) {
    const dayElement = document.createElement("div");
    dayElement.className = "calendar-day other-month";
    dayElement.textContent = i;
    calendarDays.appendChild(dayElement);
  }
}

function changeMonth(direction) {
  currentDate.setMonth(currentDate.getMonth() + direction);
  renderCalendar();
}

async function selectDate(day, element) {
  document.querySelectorAll(".calendar-day").forEach((dayEl) => {
    dayEl.classList.remove("selected");
  });
  element.classList.add("selected");

  const selectedDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    day
  );
  const formattedDate = `${selectedDate.getFullYear()}-${(
    selectedDate.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}-${selectedDate.getDate().toString().padStart(2, "0")}`;
  appointmentData.currentAppointment.date =
    selectedDate.toLocaleDateString("ru-RU");
  appointmentData.currentAppointment.formattedDate = formattedDate;

  console.log(`Выбрана дата: ${formattedDate}`);

  // Загружаем занятые слоты из Django
  if (appointmentData.currentAppointment.specialist) {
    console.log(
      `Загружаем слоты для ${appointmentData.currentAppointment.specialist} на ${formattedDate}`
    );
    await loadBookedSlotsFromDjango(
      appointmentData.currentAppointment.specialist,
      formattedDate
    );
  } else {
    console.warn("Мастер не выбран, не загружаем слоты");
  }

  generateTimeSlots();
}

// Функция для проверки пересечения временных интервалов
function hasTimeOverlap(
  newStartTime,
  newDuration,
  existingServices,
  currentFormattedDate
) {
  if (!appointmentData.selectedService || !currentFormattedDate) return false;

  const newStart = timeToMinutes(newStartTime);
  const newEnd = newStart + newDuration;

  for (const service of existingServices) {
    if (service.formattedDate === currentFormattedDate) {
      const existingStart = timeToMinutes(service.time);
      const existingEnd = existingStart + service.duration;

      if (
        (newStart >= existingStart && newStart < existingEnd) ||
        (newEnd > existingStart && newEnd <= existingEnd) ||
        (newStart <= existingStart && newEnd >= existingEnd)
      ) {
        return true;
      }
    }
  }
  return false;
}

// Функция для скрытия предупреждения о пересечении
function hideOverlapWarning() {
  document.getElementById("overlap-warning").style.display = "none";
}

// Функция для показа предупреждения о пересечении
function showOverlapWarning() {
  document.getElementById("overlap-warning").style.display = "block";
}

async function generateTimeSlots() {
  if (
    !appointmentData.currentAppointment.specialist ||
    !appointmentData.currentAppointment.date
  ) {
    console.error("Не выбран мастер или дата");
    return;
  }

  if (!appointmentData.selectedService) {
    console.error("Услуга не выбрана");
    return;
  }

  const duration = appointmentData.selectedService.duration;
  document.getElementById(
    "duration-info"
  ).textContent = `Продолжительность услуги: ${duration} минут`;
  document.getElementById("time-slots-display").style.display = "none";

  // Показываем спиннер загрузки
  document.getElementById("loading-slots").style.display = "block";

  // Ждем завершения загрузки занятых слотов (если еще не загружены)
  if (!bookedSlotsFromDjango[appointmentData.currentAppointment.specialist]) {
    console.log("Слоты еще не загружены, загружаем...");
    await loadBookedSlotsFromDjango(
      appointmentData.currentAppointment.specialist,
      appointmentData.currentAppointment.formattedDate
    );
  }

  // Скрываем спиннер и показываем слоты
  document.getElementById("loading-slots").style.display = "none";
  document.getElementById("time-slots-display").style.display = "block";

  document.getElementById("morning-slots").innerHTML = "";
  document.getElementById("day-slots").innerHTML = "";
  document.getElementById("evening-slots").innerHTML = "";

  const timeSlots = [];
  const startHour = 10;
  const endHour = 21;

  let intervalMinutes = 30;
  let currentTime = startHour * 60;

  console.log(
    `Генерация слотов с ${startHour}:00 до ${endHour}:00, интервал ${intervalMinutes} мин`
  );

  while (currentTime + duration <= endHour * 60) {
    const hour = Math.floor(currentTime / 60);
    const minute = currentTime % 60;

    const timeString = `${hour.toString().padStart(2, "0")}:${minute
      .toString()
      .padStart(2, "0")}`;
    const endTimeString = calculateEndTime(timeString, duration);

    const dateTimeStr = `${appointmentData.currentAppointment.formattedDate} ${timeString}`;

    // Проверяем занят ли слот в базе данных Django
    const isBookedFromDjango = isTimeSlotBookedFromDjango(
      appointmentData.currentAppointment.specialist,
      dateTimeStr,
      duration
    );

    // Проверяем пересечение с уже выбранными услугами
    const hasOverlap = hasTimeOverlap(
      timeString,
      duration,
      appointmentData.services,
      appointmentData.currentAppointment.formattedDate
    );

    timeSlots.push({
      time: timeString,
      endTime: endTimeString,
      booked: isBookedFromDjango,
      hasOverlap: hasOverlap,
      duration: duration,
    });

    currentTime += intervalMinutes;
  }

  console.log(`Сгенерировано ${timeSlots.length} временных слотов`);

  timeSlots.forEach((slot) => {
    const hour = parseInt(slot.time.split(":")[0]);
    const slotElement = document.createElement("div");

    if (slot.booked) {
      slotElement.className = "time-slot booked";
      slotElement.title = "Это время уже занято другим клиентом";
      slotElement.innerHTML = `${slot.time}<br><small>Занято</small>`;
    } else if (slot.hasOverlap) {
      slotElement.className = "time-slot overlap";
      slotElement.title = `Пересекается с другой вашей записью (${slot.time} - ${slot.endTime})`;
      slotElement.innerHTML = `${slot.time}<br><small>Пересечение</small>`;
    } else {
      slotElement.className = "time-slot";
      slotElement.onclick = () => selectTimeSlot(slot.time, slotElement);
      slotElement.title = `${slot.time} - ${slot.endTime} (${slot.duration} мин)`;
      slotElement.textContent = slot.time;
    }

    if (hour < 13) {
      document.getElementById("morning-slots").appendChild(slotElement);
    } else if (hour < 17) {
      document.getElementById("day-slots").appendChild(slotElement);
    } else {
      document.getElementById("evening-slots").appendChild(slotElement);
    }
  });

  // Сбрасываем выбранное время при генерации новых слотов
  appointmentData.currentAppointment.time = "";
  document.getElementById("btn-continue-date").disabled = true;
  document.querySelectorAll(".time-slot.selected").forEach((slot) => {
    slot.classList.remove("selected");
  });
  hideOverlapWarning();

  // Проверяем, есть ли свободные слотов
  const freeSlots = timeSlots.filter(
    (slot) => !slot.booked && !slot.hasOverlap
  ).length;
  console.log(`Свободных слотов: ${freeSlots}`);

  if (freeSlots === 0) {
    document.getElementById("duration-info").textContent +=
      " (Нет свободных слотов на выбранную дату)";
  }
}

function selectTimeSlot(time, element) {
  // Проверяем пересечение с другими услугами
  const hasOverlap = hasTimeOverlap(
    time,
    appointmentData.selectedService.duration,
    appointmentData.services,
    appointmentData.currentAppointment.formattedDate
  );

  if (hasOverlap) {
    showOverlapWarning();
    return;
  }

  hideOverlapWarning();

  document.querySelectorAll(".time-slot").forEach((slot) => {
    if (
      !slot.classList.contains("booked") &&
      !slot.classList.contains("overlap")
    ) {
      slot.classList.remove("selected");
    }
  });
  element.classList.add("selected");
  appointmentData.currentAppointment.time = time;
  document.getElementById("btn-continue-date").disabled = false;
}

function updateSummary() {
  // Добавляем текущую выбранную услугу в список
  if (
    appointmentData.selectedService &&
    appointmentData.currentAppointment.specialist &&
    appointmentData.currentAppointment.date &&
    appointmentData.currentAppointment.time &&
    !appointmentData.services.find(
      (s) =>
        s.id === appointmentData.selectedService.id &&
        s.formattedDate === appointmentData.currentAppointment.formattedDate &&
        s.time === appointmentData.currentAppointment.time
    )
  ) {
    const serviceWithAppointment = {
      ...appointmentData.selectedService,
      specialist: appointmentData.currentAppointment.specialist,
      date: appointmentData.currentAppointment.date,
      formattedDate: appointmentData.currentAppointment.formattedDate,
      time: appointmentData.currentAppointment.time,
      endTime: calculateEndTime(
        appointmentData.currentAppointment.time,
        appointmentData.selectedService.duration
      ),
    };
    appointmentData.services.push(serviceWithAppointment);
  }

  document.getElementById(
    "summary-salon"
  ).textContent = `${appointmentData.salon}, ${appointmentData.salonAddress}`;

  const servicesContainer = document.getElementById("summary-services");
  const totalElement = document.getElementById("summary-total");
  const originalPriceElement = document.getElementById("original-price");
  const discountSection = document.getElementById("discount-section");
  const discountAmountElement = document.getElementById("discount-amount");

  if (appointmentData.services.length > 0) {
    let servicesHTML = "";
    let total = 0;

    appointmentData.services.forEach((service) => {
      servicesHTML += `
                        <div class="service-summary-item">
                            <span>${service.name} (${service.specialist}, ${
        service.date
      } в ${service.time})</span>
                            <span>${service.price.toLocaleString()} ₽</span>
                        </div>
                    `;
      total += service.price;
    });

    servicesContainer.innerHTML = servicesHTML;

    appointmentData.originalTotal = total;

    let finalTotal = total;
    if (appointmentData.promocodeApplied) {
      appointmentData.discountAmount = total * 0.05;
      finalTotal = total - appointmentData.discountAmount;

      discountSection.style.display = "block";
      discountAmountElement.textContent = `-${appointmentData.discountAmount.toLocaleString()} ₽`;

      originalPriceElement.textContent = `${total.toLocaleString()} ₽`;
      originalPriceElement.style.display = "inline";
    } else {
      discountSection.style.display = "none";
      originalPriceElement.style.display = "none";
    }

    totalElement.textContent = finalTotal.toLocaleString();
  } else {
    servicesContainer.textContent = "Не выбрано";
    totalElement.textContent = "0";
    discountSection.style.display = "none";
    originalPriceElement.style.display = "none";
  }
}

// Функция применения промокода
function applyPromocode() {
  const promocodeInput = document.getElementById("promocode-input");
  const discountApplied = document.getElementById("discount-applied");
  const discountError = document.getElementById("discount-error");
  const applyButton = document.getElementById("apply-promocode");

  const enteredCode = promocodeInput.value.trim().toUpperCase();

  discountApplied.style.display = "none";
  discountError.style.display = "none";

  if (enteredCode === "MASTY5") {
    appointmentData.promocodeApplied = true;
    discountApplied.style.display = "block";
    applyButton.disabled = true;
    promocodeInput.disabled = true;
    applyButton.textContent = "Применено";
    applyButton.style.background = "#6c757d";

    updateSummary();
  } else if (enteredCode === "") {
    discountError.textContent = "Введите промокод";
    discountError.style.display = "block";
  } else {
    discountError.textContent = "❌ Неверный промокод";
    discountError.style.display = "block";
  }
}

function validateForm() {
  const name = document.getElementById("client-name").value.trim();
  const nameError = document.getElementById("name-error");
  const submitBtn = document.getElementById("btn-submit");

  let isValid = true;

  if (name.length < 2) {
    nameError.style.display = "block";
    isValid = false;
  } else {
    nameError.style.display = "none";
  }

  const phoneValid = validatePhone();
  if (!phoneValid) {
    isValid = false;
  }

  const emailValid = validateEmail();
  if (!emailValid) {
    isValid = false;
  }

  submitBtn.disabled = !isValid;
  return isValid;
}

function submitForm() {
  if (!validateForm()) return;

  appointmentData.clientName = document
    .getElementById("client-name")
    .value.trim();
  appointmentData.clientPhone = document
    .getElementById("client-phone")
    .value.trim();
  appointmentData.clientEmail = document
    .getElementById("client-email")
    .value.trim();
  appointmentData.clientComment = document
    .getElementById("client-comment")
    .value.trim();

  let total = 0;
  let servicesForAPI = [];

  appointmentData.services.forEach((service) => {
    total += service.price;

    let formattedDateForAPI = "";
    if (service.formattedDate) {
      formattedDateForAPI = service.formattedDate;
    } else if (service.date) {
      try {
        const parts = service.date.split(".");
        if (parts.length === 3) {
          formattedDateForAPI = `${parts[2]}-${parts[1]}-${parts[0]}`;
        }
      } catch (e) {
        console.error("Ошибка конвертации даты:", e);
      }
    }

    if (
      !formattedDateForAPI ||
      !/^\d{4}-\d{2}-\d{2}$/.test(formattedDateForAPI)
    ) {
      console.warn("Некорректная дата для услуги:", service);
      return;
    }

    servicesForAPI.push({
      name: service.name,
      price: service.price,
      duration: service.duration,
      specialist: service.specialist,
      date: formattedDateForAPI,
      time: service.time,
    });
  });

  if (servicesForAPI.length === 0) {
    alert("Ошибка: Нет корректных услуг для отправки");
    return;
  }

  appointmentData.originalTotal = total;
  appointmentData.finalTotal =
    total -
    (appointmentData.promocodeApplied ? appointmentData.discountAmount : 0);

  const dataToSend = {
    salon: appointmentData.salon || "Салон красоты «Masty»",
    salonAddress: appointmentData.salonAddress || "ул. Зацепа, 22",
    clientName: appointmentData.clientName,
    clientPhone: appointmentData.clientPhone,
    clientEmail: appointmentData.clientEmail,
    clientComment: appointmentData.clientComment,
    reminder: false,
    promocodeApplied: appointmentData.promocodeApplied,
    discountAmount: appointmentData.discountAmount,
    originalTotal: appointmentData.originalTotal,
    finalTotal: appointmentData.finalTotal,
    services: servicesForAPI,
  };

  console.log("Отправка данных на сервер:", dataToSend);

  const submitBtn = document.getElementById("btn-submit");
  submitBtn.disabled = true;
  submitBtn.textContent = "Отправка...";

  const csrfToken = getCSRFToken();

  fetch("/api/book-appointment/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": csrfToken,
    },
    body: JSON.stringify(dataToSend),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log("Ответ от сервера:", data);

      if (data.success) {
        document.getElementById("booking-number").textContent =
          data.booking_number;

        document.getElementById("final-name").textContent =
          appointmentData.clientName;
        document.getElementById("final-phone").textContent =
          appointmentData.clientPhone;
        document.getElementById(
          "final-salon"
        ).textContent = `${appointmentData.salon}, ${appointmentData.salonAddress}`;

        let finalServicesHTML = "";
        appointmentData.services.forEach((service) => {
          finalServicesHTML += `
                            <div class="service-summary-item">
                                <span>${service.name} (${service.specialist}, ${
            service.date
          } в ${service.time})</span>
                                <span>${service.price.toLocaleString()} ₽</span>
                            </div>
                        `;
        });

        document.getElementById("final-services").innerHTML = finalServicesHTML;

        const finalDiscountSection = document.getElementById(
          "final-discount-section"
        );
        const finalDiscountAmount = document.getElementById(
          "final-discount-amount"
        );
        const finalOriginalPrice = document.getElementById(
          "final-original-price"
        );
        const finalTotalElement = document.getElementById("final-total");

        if (appointmentData.promocodeApplied) {
          finalDiscountSection.style.display = "block";
          finalDiscountAmount.textContent = `-${appointmentData.discountAmount.toLocaleString()} ₽`;
          finalOriginalPrice.textContent = `${appointmentData.originalTotal.toLocaleString()} ₽`;
          finalOriginalPrice.style.display = "inline";
        } else {
          finalDiscountSection.style.display = "none";
          finalOriginalPrice.style.display = "none";
        }

        finalTotalElement.textContent =
          appointmentData.finalTotal.toLocaleString();

        showPage("page-thankyou");
      } else {
        alert("Ошибка сервера: " + (data.error || "Неизвестная ошибка"));
        submitBtn.disabled = false;
        submitBtn.textContent = "Записаться";
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Ошибка сети: " + error.message);
      submitBtn.disabled = false;
      submitBtn.textContent = "Записаться";
    });
}

// Инициализация
document.addEventListener("DOMContentLoaded", function () {
  showPage("page-salon");
  renderCalendar();

  const promocodeInput = document.getElementById("promocode-input");
  promocodeInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      applyPromocode();
    }
  });

  updateCommentCounter();

  console.log("Система записи инициализирована");
});
