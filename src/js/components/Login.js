import { sendUser } from '../reducers/reduce-registr';

export default class Login {
  constructor(store) {
    this.store = store;
    this.registr = document.querySelector('.registration');
    this.login = document.getElementById('login');
    this.signin = document.getElementById('signin');
    this.inputs = document.querySelectorAll('.registration input');
    this.addUser = this.addUser.bind(this);
    this.checkUser = this.checkUser.bind(this);
    // this.checkInput = this.checkInput.bind(this);

    this.login.addEventListener('submit', this.checkUser);
    this.signin.addEventListener('submit', this.addUser);
    this.login.addEventListener('focus', (event) => {
      Login.deleteError(event.target);
    }, true);
    this.signin.addEventListener('focus', (event) => {
      Login.deleteError(event.target);
    }, true);
    this.signin.addEventListener('blur', (event) => {
      Login.checkInput(event.target);
    }, true);
    this.login.addEventListener('blur', (event) => {
      Login.checkInput(event.target);
    }, true);
  }

  showLoader() {
    if (this.store.getState().users.isLoader) {
      const loader = document.createElement('div');
      loader.classList.add('loader');
      loader.innerHTML = `
      <div class="spinner-border text-primary" role="status">
        <span class="sr-only">Loading...</span>
      </div>`;
      this.registr.appendChild(loader);
    } else if (this.registr.querySelector('.loader')) {
      this.registr.querySelector('.loader').remove();
    }
  }

  checkUser(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    if (formData.get('name').length < 3) {
      Login.showError(event.target.name, 'Name must be longer 3 symbols');
    } else if (formData.get('password').length < 8) {
      Login.showError(event.target.password, 'Password must be longer 8 symbols');
    } else {
      event.target.password.value = '';
      event.target.name.value = '';
      sendUser({
        type: 'checkUser',
        password: formData.get('password').trim(),
        name: formData.get('name').trim(),
      }, this.store);
    }
  }

  addUser(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    if (formData.get('passwordAgain') !== formData.get('password')) {
      Login.showError(event.target.password, 'Passwords aren`t the same');
    } else if (formData.get('name').length < 3) {
      Login.showError(event.target.name, 'Name must be longer 3 symbols');
    } else if (formData.get('passwordAgain').length < 8) {
      Login.showError(event.target.passwordAgain, 'Password must be longer 8 symbols');
    } else if (formData.get('password').length < 8) {
      Login.showError(event.target.password, 'Password must be longer 8 symbols');
    } else {
      event.target.password.value = '';
      event.target.passwordAgain.value = '';
      event.target.name.value = '';
      sendUser({
        type: 'newUser',
        password: formData.get('password').trim(),
        name: formData.get('name').trim(),
      }, this.store);
    }
  }

  static checkInput(target) {
    if (target.value.trim() === '') Login.showError(target, 'This field can`t be empty');
    else if (target.type === 'password' && target.value.length < 8) Login.showError(target, 'Password must be more 8 symbols');
  }

  static showError(target, text) {
    if (target.type !== 'submit') {
      const error = document.createElement('div');
      error.dataset.id = 'error';
      error.className = 'form-error';
      error.textContent = `${text}`;

      const block = target.closest('.col');
      block.appendChild(error);

      error.style.top = `${window.scrollY + block.offsetHeight}px`;
      error.style.left = `${window.scrollX + block.offsetWidth - 15}px`;
      target.classList.add('wrong-field');
    }
  }

  static deleteError(target) {
    const block = target.closest('.col');
    if (target.type !== 'submit' && block.querySelector('.form-error')) {
      block.querySelector('.form-error').remove();
      target.classList.remove('wrong-field');
    }
  }

  hideForm() {
    this.registr.classList.add('hidden');
    if (document.querySelector('.form-error')) {
      document.querySelector('.form-error').remove();
    }
    document.querySelector('.container').classList.remove('hidden');
  }
}
