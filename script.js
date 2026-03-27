const form = document.getElementById("registrationForm");
const successCard = document.getElementById("successCard");
const previewData = document.getElementById("previewData");

const fields = {
  fullName: document.getElementById("fullName"),
  username: document.getElementById("username"),
  email: document.getElementById("email"),
  phone: document.getElementById("phone"),
  dob: document.getElementById("dob"),
  country: document.getElementById("country"),
  password: document.getElementById("password"),
  confirmPassword: document.getElementById("confirmPassword"),
  terms: document.getElementById("terms")
};

const genderInputs = Array.from(document.querySelectorAll("input[name='gender']"));
const genderFieldset = document.querySelector("fieldset.radio-group");

const setError = (name, message, element = fields[name]) => {
  const target = document.getElementById(`${name}Error`);
  if (target) target.textContent = message;

  if (element) {
    if (message) {
      element.classList.add("invalid");
      element.setAttribute("aria-invalid", "true");
    } else {
      element.classList.remove("invalid");
      element.removeAttribute("aria-invalid");
    }
  }
};

const validators = {
  fullName(value) {
    if (!value.trim()) return "Full name is required.";
    if (!/^[A-Za-z ]{3,40}$/.test(value.trim())) {
      return "Use only letters/spaces (3-40 chars).";
    }
    return "";
  },
  username(value) {
    if (!value.trim()) return "Username is required.";
    if (!/^[A-Za-z0-9_]{4,16}$/.test(value.trim())) {
      return "4-16 chars: letters, numbers, underscore only.";
    }
    return "";
  },
  email(value) {
    if (!value.trim()) return "Email is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim())) {
      return "Enter a valid email address.";
    }
    return "";
  },
  phone(value) {
    if (!value.trim()) return "Phone number is required.";
    const compact = value.replace(/[\s()-]/g, "");
    if (!/^\+?[0-9]{10,14}$/.test(compact)) {
      return "Use 10-14 digits, optional +country code.";
    }
    return "";
  },
  dob(value) {
    if (!value) return "Date of birth is required.";

    const now = new Date();
    const selected = new Date(value);
    const age = now.getFullYear() - selected.getFullYear();
    const monthDiff = now.getMonth() - selected.getMonth();
    const dayDiff = now.getDate() - selected.getDate();

    let adjustedAge = age;
    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      adjustedAge--;
    }

    if (adjustedAge < 18) {
      return "You must be at least 18 years old.";
    }
    return "";
  },
  country(value) {
    if (!value) return "Please select a country.";
    return "";
  },
  password(value) {
    if (!value) return "Password is required.";
    const checks = [/[a-z]/, /[A-Z]/, /\d/, /[^A-Za-z0-9]/];
    if (value.length < 8 || !checks.every((r) => r.test(value))) {
      return "Min 8 chars with upper, lower, number, symbol.";
    }
    return "";
  },
  confirmPassword(value) {
    if (!value) return "Please confirm your password.";
    if (value !== fields.password.value) {
      return "Passwords do not match.";
    }
    return "";
  },
  terms(value) {
    if (!value) return "You must accept terms to continue.";
    return "";
  },
  gender() {
    const selected = genderInputs.some((input) => input.checked);
    if (!selected) return "Please choose a gender option.";
    return "";
  }
};

const validateField = (name) => {
  const field = fields[name];
  const value = field.type === "checkbox" ? field.checked : field.value;
  const message = validators[name](value);
  setError(name, message);
  return !message;
};

const validateGender = () => {
  const message = validators.gender();
  setError("gender", message, genderFieldset);
  return !message;
};

Object.keys(fields).forEach((name) => {
  const field = fields[name];
  const eventName = field.type === "checkbox" || field.tagName === "SELECT" ? "change" : "input";

  field.addEventListener(eventName, () => {
    validateField(name);
    if (name === "password" && fields.confirmPassword.value) {
      validateField("confirmPassword");
    }
  });

  field.addEventListener("blur", () => validateField(name));
});

genderInputs.forEach((input) => {
  input.addEventListener("change", validateGender);
});

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const basicValid = Object.keys(fields).every((name) => validateField(name));
  const genderValid = validateGender();

  if (!basicValid || !genderValid) {
    successCard.hidden = true;
    return;
  }

  const submittedData = {
    fullName: fields.fullName.value.trim(),
    username: fields.username.value.trim(),
    email: fields.email.value.trim(),
    phone: fields.phone.value.trim(),
    dob: fields.dob.value,
    country: fields.country.value,
    gender: genderInputs.find((input) => input.checked)?.value || "",
    passwordStrength: "Strong"
  };

  previewData.textContent = JSON.stringify(submittedData, null, 2);
  successCard.hidden = false;
  form.reset();
});
