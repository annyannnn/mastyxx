// Данные приложения
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
  },
  clientName: "",
  clientPhone: "",
  clientEmail: "",
  clientComment: "",
  reminder: false,
  promocodeApplied: false,
  discountAmount: 0,
  originalTotal: 0,
};

// Текущая дата для календаря
let currentDate = new Date();
currentDate.setDate(1);

// База данных занятых слотов
const bookedSlots = {
  "АННА ПАВЛОВА": ["2024-01-15 10:00", "2024-01-15 14:30"],
  "ЮЛИЯ РОТАРЬ": ["2024-01-15 12:00", "2024-01-16 10:00"],
  "МАРИНА МИШЕНКО": ["2024-01-15 10:00", "2024-01-16 12:30"],
  "НАТАЛЬЯ ШТЕРН": ["2024-01-15 11:00", "2024-01-17 13:00"],
  "АНАСТАСИЯ ДАХНО": ["2024-01-16 10:00", "2024-01-17 12:00"],
  "НАТАЛИЯ ПОНУЛЯК": ["2024-01-15 10:00", "2024-01-16 11:00"],
};

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
  8: {
    name: "Окрашивание бровей",
    price: 1350,
    duration: 30,
    category: "cosmetology",
  },
  9: {
    name: "Стоун массаж",
    price: 4800,
    duration: 90,
    category: "massage",
  },
  10: {
    name: "Антицеллюлитный массаж",
    price: 5200,
    duration: 60,
    category: "massage",
  },
  11: {
    name: "Массаж лица 'Тоффа'",
    price: 5300,
    duration: 50,
    category: "cosmetology",
  },
  12: {
    name: "Тайский массаж",
    price: 6700,
    duration: 90,
    category: "massage",
  },
  13: {
    name: "Классический маникюр",
    price: 2500,
    duration: 90,
    category: "nails",
  },
  14: {
    name: "Аппаратный педикюр",
    price: 3500,
    duration: 90,
    category: "nails",
  },
};

// Список мастеров с специализациями
const specialistsData = [
  {
    name: "АННА ПАВЛОВА",
    role: "Эстетист-массажист",
    duration: 90,
    specializations: ["massage", "cosmetology"],
  },
  {
    name: "ЮЛИЯ РОТАРЬ",
    role: "Стилист",
    duration: 120,
    specializations: ["hair"],
  },
  {
    name: "НАТАЛИЯ ПОНУЛЯК",
    role: "Администратор",
    duration: 60,
    specializations: ["consultation"],
  },
  {
    name: "АНАСТАСИЯ ДАХНО",
    role: "Мастер ногтевого сервиса",
    duration: 120,
    specializations: ["nails"],
  },
  {
    name: "НАТАЛЬЯ ШТЕРН",
    role: "Косметолог",
    duration: 120,
    specializations: ["cosmetology"],
  },
  {
    name: "МАРИНА МИШЕНКО",
    role: "Визажист",
    duration: 150,
    specializations: ["makeup"],
  },
];

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
  } else if (pageId === "page-add-service") {
    updateAllAppointedServices();
  } else if (pageId === "page-final") {
    updateSummary();
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
  // Снимаем выделение со всех услуг
  document.querySelectorAll(".service-item").forEach((item) => {
    item.classList.remove("selected");
  });

  // Выделяем выбранную услугу
  element.classList.add("selected");

  const service = servicesData[serviceId];
  appointmentData.selectedService = {
    id: serviceId,
    name: service.name,
    price: service.price,
    duration: service.duration,
    category: category,
  };

  // Активируем кнопку "Далее"
  document.getElementById("btn-continue-services").disabled = false;

  // Обновляем превью выбранных услуг
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
                                      )}`;

  // Показываем только мастеров с подходящей специализацией
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
      selectSpecialist(specialist.name, specialist.duration, specialistElement);

    specialistElement.innerHTML = `
                    <div class="specialist-name">${specialist.name}</div>
                    <div class="specialist-role">${specialist.role}</div>
                    <div class="specialist-duration">Продолжительность: ${
                      specialist.duration
                    } мин</div>
                    <div class="specialist-specialization">Специализация: ${getSpecializationsText(
                      specialist.specializations
                    )}</div>
                `;

    specialistsContainer.appendChild(specialistElement);
  });

  // Сбрасываем выбор мастера при загрузке страницы
  appointmentData.currentAppointment.specialist = "";
  appointmentData.currentAppointment.specialistDuration = 0;
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

function selectSpecialist(name, duration, element) {
  document.querySelectorAll(".specialist-card").forEach((card) => {
    card.classList.remove("selected");
  });
  element.classList.add("selected");
  appointmentData.currentAppointment.specialist = name;
  appointmentData.currentAppointment.specialistDuration = duration;
  document.getElementById("btn-continue-specialist").disabled = false;
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
  // Сохраняем текущую запись в список услуг
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
      time: appointmentData.currentAppointment.time,
    };
    appointmentData.services.push(serviceWithAppointment);
  }

  // Сбрасываем выбор для новой услуги
  appointmentData.selectedService = null;
  appointmentData.currentAppointment = {
    service: null,
    specialist: "",
    specialistDuration: 0,
    date: "",
    time: "",
  };

  document.querySelectorAll(".service-item").forEach((item) => {
    item.classList.remove("selected");
  });
  document.getElementById("btn-continue-services").disabled = true;

  showPage("page-services");
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

function selectDate(day, element) {
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

  generateTimeSlots();
}

function generateTimeSlots() {
  if (
    !appointmentData.currentAppointment.specialist ||
    !appointmentData.currentAppointment.date
  )
    return;

  const duration = appointmentData.currentAppointment.specialistDuration;
  document.getElementById(
    "duration-info"
  ).textContent = `Продолжительность услуги: ${duration} минут`;
  document.getElementById("time-slots-display").style.display = "block";

  document.getElementById("morning-slots").innerHTML = "";
  document.getElementById("day-slots").innerHTML = "";
  document.getElementById("evening-slots").innerHTML = "";

  const timeSlots = [];
  const startHour = 10;
  const endHour = 21;

  let intervalMinutes = duration;

  let currentTime = startHour * 60;

  while (currentTime + duration <= endHour * 60) {
    const hour = Math.floor(currentTime / 60);
    const minute = currentTime % 60;

    const timeString = `${hour.toString().padStart(2, "0")}:${minute
      .toString()
      .padStart(2, "0")}`;
    const endTimeMinutes = currentTime + duration;
    const endHourValue = Math.floor(endTimeMinutes / 60);
    const endMinuteValue = endTimeMinutes % 60;
    const endTimeString = `${endHourValue
      .toString()
      .padStart(2, "0")}:${endMinuteValue.toString().padStart(2, "0")}`;

    const dateTimeStr = `${appointmentData.currentAppointment.formattedDate} ${timeString}`;

    const specialistBookedSlots =
      bookedSlots[appointmentData.currentAppointment.specialist] || [];
    const isBooked = specialistBookedSlots.includes(dateTimeStr);

    timeSlots.push({
      time: timeString,
      endTime: endTimeString,
      booked: isBooked,
      duration: duration,
    });

    currentTime += intervalMinutes;
  }

  timeSlots.forEach((slot) => {
    const hour = parseInt(slot.time.split(":")[0]);
    const slotElement = document.createElement("div");

    if (slot.booked) {
      slotElement.className = "time-slot booked";
      slotElement.title = "Это время уже занято";
    } else {
      slotElement.className = "time-slot";
      slotElement.onclick = () => selectTimeSlot(slot.time, slotElement);
      slotElement.title = `${slot.time} - ${slot.endTime} (${slot.duration} мин)`;
    }

    slotElement.textContent = slot.time;

    if (hour < 13) {
      document.getElementById("morning-slots").appendChild(slotElement);
    } else if (hour < 17) {
      document.getElementById("day-slots").appendChild(slotElement);
    } else {
      document.getElementById("evening-slots").appendChild(slotElement);
    }
  });
}

function selectTimeSlot(time, element) {
  document.querySelectorAll(".time-slot").forEach((slot) => {
    if (!slot.classList.contains("booked")) {
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
      (s) => s.id === appointmentData.selectedService.id
    )
  ) {
    const serviceWithAppointment = {
      ...appointmentData.selectedService,
      specialist: appointmentData.currentAppointment.specialist,
      date: appointmentData.currentAppointment.date,
      time: appointmentData.currentAppointment.time,
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

    // Сохраняем оригинальную сумму
    appointmentData.originalTotal = total;

    // Применяем скидку если промокод активирован
    let finalTotal = total;
    if (appointmentData.promocodeApplied) {
      appointmentData.discountAmount = total * 0.05;
      finalTotal = total - appointmentData.discountAmount;

      // Показываем блок скидки
      discountSection.style.display = "block";
      discountAmountElement.textContent = `-${appointmentData.discountAmount.toLocaleString()} ₽`;

      // Показываем оригинальную цену
      originalPriceElement.textContent = `${total.toLocaleString()} ₽`;
      originalPriceElement.style.display = "inline";
    } else {
      // Скрываем блок скидки
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

  // Сбрасываем предыдущие сообщения
  discountApplied.style.display = "none";
  discountError.style.display = "none";

  if (enteredCode === "MASTY5") {
    // Правильный промокод
    appointmentData.promocodeApplied = true;
    discountApplied.style.display = "block";
    applyButton.disabled = true;
    promocodeInput.disabled = true;
    applyButton.textContent = "Применено";
    applyButton.style.background = "#6c757d";

    // Обновляем итоговую сумму
    updateSummary();
  } else if (enteredCode === "") {
    // Пустое поле
    discountError.textContent = "Введите промокод";
    discountError.style.display = "block";
  } else {
    // Неверный промокод
    discountError.textContent = "❌ Неверный промокод";
    discountError.style.display = "block";
  }
}

function validateForm() {
  const name = document.getElementById("client-name").value.trim();
  const phone = document.getElementById("client-phone").value.trim();
  const nameError = document.getElementById("name-error");
  const phoneError = document.getElementById("phone-error");
  const submitBtn = document.getElementById("btn-submit");

  let isValid = true;

  if (name.length < 2) {
    nameError.style.display = "block";
    isValid = false;
  } else {
    nameError.style.display = "none";
  }

  const phoneRegex = /^[\+]?[7-8]?[0-9\s\-\(\)]{10,}$/;
  if (!phoneRegex.test(phone)) {
    phoneError.style.display = "block";
    isValid = false;
  } else {
    phoneError.style.display = "none";
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
  appointmentData.reminder = document.getElementById("reminder").checked;

  document.getElementById("final-name").textContent =
    appointmentData.clientName;
  document.getElementById("final-phone").textContent =
    appointmentData.clientPhone;
  document.getElementById(
    "final-salon"
  ).textContent = `${appointmentData.salon}, ${appointmentData.salonAddress}`;

  let finalServicesHTML = "";
  let total = appointmentData.originalTotal;
  let finalTotal = total;
  const finalDiscountSection = document.getElementById(
    "final-discount-section"
  );
  const finalDiscountAmount = document.getElementById("final-discount-amount");
  const finalOriginalPrice = document.getElementById("final-original-price");
  const finalTotalElement = document.getElementById("final-total");

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

  // Применяем скидку на странице благодарности
  if (appointmentData.promocodeApplied) {
    finalTotal = total - appointmentData.discountAmount;
    finalDiscountSection.style.display = "block";
    finalDiscountAmount.textContent = `-${appointmentData.discountAmount.toLocaleString()} ₽`;
    finalOriginalPrice.textContent = `${total.toLocaleString()} ₽`;
    finalOriginalPrice.style.display = "inline";
  } else {
    finalDiscountSection.style.display = "none";
    finalOriginalPrice.style.display = "none";
  }

  finalTotalElement.textContent = finalTotal.toLocaleString();

  document.getElementById("booking-number").textContent = Math.floor(
    11000 + Math.random() * 1000
  );

  showPage("page-thankyou");

  console.log("Данные записи:", appointmentData);
}

// Инициализация
document.addEventListener("DOMContentLoaded", function () {
  showPage("page-salon");
  renderCalendar();

  // Добавляем обработчик Enter для поля промокода
  const promocodeInput = document.getElementById("promocode-input");
  promocodeInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      applyPromocode();
    }
  });
});
