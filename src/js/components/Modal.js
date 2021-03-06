export default class Modal {
  static showModal(file) {
    document.querySelector('.card-modal').classList.remove('hidden');
    document.getElementById('cover-main').classList.add('cover-main-on');
    document.querySelector('.card-title').textContent = file.name;
    const type = file.type.split('/')[0];
    let elem;

    switch (type) {
      case 'image':
        elem = document.createElement('img');
        elem.classList.add('card-img');
        elem.dataset.type = type;
        break;
      case 'video':
        elem = document.createElement('video');
        elem.classList.add('card-video');
        elem.dataset.type = type;
        elem.controls = true;
        break;
      case 'audio':
        elem = document.createElement('audio');
        elem.classList.add('card-audio');
        elem.dataset.type = type;
        elem.controls = true;
        break;
      default:
        elem = document.createElement('a');
        elem.dataset.type = type;
        elem.innerHTML = `
        <div class="card-file__icon">
            <svg width="2em" height="2em" viewBox="0 0 16 16" class="bi bi-file-earmark-font" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 0h5.5v1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h1V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2z"/>
            <path d="M9.5 3V0L14 4.5h-3A1.5 1.5 0 0 1 9.5 3zm1.443 3H5.057L5 8h.5c.18-1.096.356-1.192 1.694-1.235l.293-.01v5.09c0 .47-.1.582-.898.655v.5H9.41v-.5c-.803-.073-.903-.184-.903-.654V6.755l.298.01c1.338.043 1.514.14 1.694 1.235h.5l-.057-2z"/>
            </svg>
        </div>
        <div class="card-file__name">${file.name.slice(0, 15)}</div>
        `;
        elem.classList.add('card-file');
        break;
    }
    elem.src = file.data;
    URL.revokeObjectURL(elem.src);
    document.querySelector('.preview').appendChild(elem);
  }

  static hideModal() {
    document.querySelector('.card-modal').classList.add('hidden');
    document.getElementById('cover-main').classList.remove('cover-main-on');
    document.querySelector('.card-title').textContent = '';
    document.querySelector('.preview').firstElementChild.remove();
  }
}
