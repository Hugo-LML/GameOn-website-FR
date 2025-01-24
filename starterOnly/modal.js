function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");

// Launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// Launch form modal
function launchModal() {
  modalbg.style.display = "block";
}

// Close modal event
document.querySelector('.close').addEventListener('click', closeModal);
document.querySelector('.btn-close').addEventListener('click', resetForm);

// Close form modal
function closeModal() {
  modalbg.style.display = 'none';
}

function resetForm() {
  modalbg.style.display = 'none';
  form.style.display = 'block';
  document.querySelector('.form-submitted').style.display = 'none';
}

// Form element
const form = document.forms['reserve'];

// Check inputs validity
const checkInput = (input, message, condition) => {
  const spanError = input.nextElementSibling;
  if (condition) {
    spanError.innerText = '';
    input.classList.remove('error');
  } else {
    spanError.innerText = message;
    input.classList.add('error');
  }
}

// Check if checkbox is checked
const checkCheckbox = (checkboxCheckedSelector, errorElementId, message) => {
  const checkboxChecked = form.querySelector(checkboxCheckedSelector);
  const errorElement = document.getElementById(errorElementId);
  errorElement.innerText = checkboxChecked ? '' : message;
}

// List of inputs to check
const inputs = [
  {
    name: 'first',
    message: 'Veuillez entrer 2 caractères ou plus pour le champ du prénom',
    condition: value => value.trim().length >= 2
  },
  {
    name: 'last',
    message: 'Veuillez entrer 2 caractères ou plus pour le champ du nom',
    condition: value => value.trim().length >= 2
  },
  {
    name: 'email',
    message: 'Veuillez entrer une adresse mail valide',
    condition: value => value.trim().match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
  },
  {
    name: 'birthdate',
    message: 'Veuillez entrer une date de naissance valide',
    condition: value => value.trim().match(/^\d{4}-\d{2}-\d{2}$/)
  },
  {
    name: 'quantity',
    message: 'Veuillez entrer un chiffre',
    condition: value => value.trim().match(/^\d+$/)
  },
];

// Console log form results
const showResults = () => {
  inputs.forEach(input => {
    const value = form[input.name].value.trim();
    console.log(`${input.name}: ${value}`);
  });
  const location = form['location'].value;
  console.log(`location: ${location}`);
  const terms = form['checkbox1'].checked;
  console.log(`terms: ${terms}`);
}

// Check if form is valid
const checkFormValidity = () => {
  const errors = document.querySelectorAll('.error-text');
  if (Array.from(errors).every(error => !error.innerText)) {
    showResults();
    form.reset();
    form.style.display = 'none';
    document.querySelector('.form-submitted').style.display = 'block';
  }
}

// Form submit event
form.addEventListener('submit', (e) => {
  e.preventDefault();

  inputs.forEach(input => {
    const value = form[input.name].value;
    checkInput(form[input.name], input.message, input.condition(value));
  });

  checkCheckbox(
    'input[name="location"]:checked',
    'locationError',
    'Vous devez choisir une option'
  );
  checkCheckbox(
    'input[id="checkbox1"]:checked',
    'termsError',
    'Vous devez vérifier que vous acceptez les termes et conditions'
  );

  checkFormValidity();
});
