import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const localStorageKey = 'feedback-form-state';

function chekInputValue() {
  
  const savedData = localStorage.getItem(localStorageKey);
  const parsedData = JSON.parse(savedData);
  if (parsedData === null) {
    return;
  }
  form[0].value = parsedData.email;
  form[1].value = parsedData.message;
}
chekInputValue();

form.addEventListener('input', throttle(onInputListener, 500));
function onInputListener(evt) {

  const enteredData = {
    email: form.email.value,
    message: form.message.value.trim(),
  };

  localStorage.setItem(localStorageKey, JSON.stringify(enteredData));
  const savedSettings = localStorage.getItem(localStorageKey);
  const parsedSettings = JSON.parse(savedSettings);
 
}

form.addEventListener('submit', onSubmitListener);
function onSubmitListener(evt) {
  
  evt.preventDefault();
  const savedData = localStorage.getItem(localStorageKey);
  const parsedData = JSON.parse(savedData);

 
  if (parsedData === null) {
    return alert('All fields must be filled!');
  }
  if (parsedData.email === '' || parsedData.message === '') {
    return alert('All fields must be filled!');
  }
  console.log(parsedData);
  localStorage.removeItem(localStorageKey);
  form.reset();
}
