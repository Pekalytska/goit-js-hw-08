import throttle from 'lodash.throttle';
import storageSettings from './storage';

const ref = {
  form: document.querySelector('.feedback-form'),
  input: document.querySelector('.feedback-form input'),
  textarea: document.querySelector('.feedback-form textarea'),
};
const FORMDATA_KEY = 'feedback-form-state';
let formData = storageSettings.load(FORMDATA_KEY) || {};
//let formData = JSON.parse(localStorage.getItem(FORMDATA_KEY)) || {};

ref.form.addEventListener('input', throttle(onFormInput, 500));
function onFormInput(e) {
  formData[e.target.name] = e.target.value;
  storageSettings.save(FORMDATA_KEY, formData);
  //localStorage.setItem(FORMDATA_KEY, JSON.stringify(formData));
}

function formSaveData(data) {
  ref.input.value = data.email || '';
  ref.textarea.value = data.message || '';
}
formSaveData(formData);

ref.form.addEventListener('submit', onFormSubmit);
function onFormSubmit(e) {
  e.preventDefault();

  console.log(formData);
  storageSettings.remove(FORMDATA_KEY);
  //localStorage.removeItem(FORMDATA_KEY);
  ref.input.value = '';
  ref.textarea.value = '';
  formData = {};
  //  e.target[0].value = '';
  //  e.target[1].value = '';
}
