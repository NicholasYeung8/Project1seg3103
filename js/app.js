const generalInquery = document.getElementById("general_inqueries");
const userInfo = document.getElementById("user_information");
const nextFormBtn = document.getElementById("next-form");

// toggle form inputs
nextFormBtn?.addEventListener("click", () => {
  generalInquery.style.display = "none";
  userInfo.style.display = "block";
  nextFormBtn.setAttribute("type", "submit");
  nextFormBtn.value = "Confirm Booking";
});

// form submit functionalities
const submitForm = (e) => {
  e.preventDefault();

  // Sweet alert
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  const formData = {
    date: e.target.date.value,
    time: e.target.time.value,
    cleaner: e.target.cleaner.value,
    service: e.target.service.value,
    fullname: e.target.name.value,
    phone: e.target.phone.value,
    email: e.target.email.value,
  };

  const selectedTime = formData.time;
  const startTime = "09:00";
  const endTime = "17:00";

  if (!formData.date) {
    Toast.fire({
      icon: "error",
      title: "Please select a date",
    });
    setInterval(() => {
      window.location.reload();
    }, 2000);
    return;
  } else if (!formData.time) {
    Toast.fire({
      icon: "error",
      title: "Please select a time",
    });
    setInterval(() => {
      window.location.reload();
    }, 2000);
    return;
  } else if (
    selectedTime >= startTime &&
    selectedTime <= endTime &&
    selectedTime !== ""
  ) {
    // Rest of the form submission logic
    console.log("Form Submitted and the data are:", formData);
    localStorage.setItem("booking-data", JSON.stringify(formData));
    e.target.reset();

    Toast.fire({
      icon: "success",
      title: "Booking Confirmed",
    });

    generalInquery.style.display = "flex";
    userInfo.style.display = "none";

    setTimeout(() => {
      window.location.href = "./confirmbooking.html";
    }, 2000);
  } else {
    // Sweet alert
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });

    Toast.fire({
      icon: "error",
      title: "Please select a time between 9am and 5pm.",
    });

    setTimeout(() => {
      window.location.reload();
    }, 2000);
  }
};

// Show details to the booking confirm page

const bookingDatas = JSON.parse(localStorage.getItem("booking-data"));
const { time, date } = bookingDatas;
const title = document.getElementById("updated_title");

// Formating Date
const parsedDate = new Date(date);
const formattedDate = parsedDate.toLocaleDateString("en-US", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

// Formating Time
const parsedTime = new Date(`2000-01-01T${time}`);
const formattedTime = parsedTime.toLocaleString("en-US", {
  hour: "numeric",
  minute: "numeric",
  hour12: true,
});

// Render the data on the UI

if (bookingDatas) {
  title.innerText = "Congrats! Booking Confirmed";
  document.getElementById("customer_name").innerText = bookingDatas?.fullname;
  document.getElementById("customer_number").innerText = bookingDatas?.phone;
  document.getElementById("customer_email").innerText = bookingDatas?.email;
  document.getElementById("cleaning_date").innerText = `${formattedDate}`;
  document.getElementById("cleaning_time").innerText = `${formattedTime}`;
  document.getElementById("choosed_cleaner").innerText = bookingDatas?.cleaner;
  document.getElementById("choosed_service").innerText = bookingDatas?.service;
}
