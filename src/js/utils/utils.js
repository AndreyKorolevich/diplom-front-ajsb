const search = document.getElementById('search');
search.addEventListener('click', () => {
  document.querySelector('.form-inline').classList.toggle('hidden');
  setTimeout(() => {
    document.querySelector('.form-inline .form-control').classList.toggle('form-inline-transition');
  }, 0);
});

const box = document.querySelector('.right-aside-box');
const cover = document.getElementById('cover');
box.addEventListener('click', () => {
  box.classList.add('hidden');
  document.querySelector('.right-aside').classList.add('right-aside-tansition');
  cover.classList.add('cover-on');
  cover.classList.remove('cover-off');
});

cover.addEventListener('click', (event) => {
  if (event.target.classList.contains('cover-on')) {
    cover.classList.remove('cover-on');
    cover.classList.add('cover-off');
    document.querySelector('.right-aside').classList.remove('right-aside-tansition');
    box.classList.remove('hidden');
  }
});
