const search = document.getElementById('search');
search.addEventListener('click', () => {
  document.querySelector('.form-inline').classList.toggle('hidden');
  setTimeout(() => {
    document.querySelector('.form-inline .form-control').classList.toggle('form-inline-transition');
  }, 0);
});

const box = document.querySelector('.right-aside-box');
box.addEventListener('click', () => {
  box.classList.add('hidden');
  document.querySelector('.right-aside').classList.add('right-aside-tansition');
});
