export default class Login {
  constructor() {
    this.registr = document.querySelector('.registration');
    this.login = document.getElementById('login');
    this.signin = document.getElementById('signin');
    this.inputs = document.querySelectorAll('.registration input');
    // this.addUser = this.addUser.bind(this);
    // this.checkUser = this.checkUser.bind(this);
    // this.checkInput = this.checkInput.bind(this);

    this.login.addEventListener('submit', this.checkUser);
    this.signin.addEventListener('submit', this.addUser);
    // this.inputs.forEach((e) => {
    //   e.addEventListener('blur', (event) => {
    //     this.checkInput(event.target);
    //   });
    //   e.addEventListener('focus', (event) => {
    //     console.log(event.target);
    //     this.deleteError();
    //   });
    // });
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

  static checkUser(event) {
    event.preventDefault();
    // const formData = new FormData(event.target);
  }

  static addUser(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    if (formData.get('passwordAgain') !== formData.get('password')) {
      Login.showError(event.target.password, 'Passwords aren`t the same');
    }
    // else if (formData.get('password')) {
    //
    // }
  }

  static checkInput(target) {
    if (target.value === '') Login.showError(target, 'This field can`t be empty');
    else if (target.type === 'password' && target.value.length < 8) Login.showError(target, 'Password must be more 8 symbols');
  }

  static showError(target, text) {
    if (target.type !== 'submit') {
      const error = document.createElement('div');
      error.dataset.id = 'error';
      error.className = 'form-error';
      error.textContent = `${text}`;

      document.body.appendChild(error);
      const { top, left } = target.getBoundingClientRect();
      error.style.top = `${window.scrollY + top + target.offsetHeight}px`;
      error.style.left = `${window.scrollX + left + target.offsetWidth}px`;
      target.classList.add('wrong-field');
    }
  }

  static deleteError(target) {
    if (document.querySelector('.form-error') && target.type !== 'submit') {
      document.querySelector('.form-error').remove();
      target.classList.remove('wrong-field');
    }
  }
}
