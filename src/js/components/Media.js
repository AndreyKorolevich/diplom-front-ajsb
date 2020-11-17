import { addMessage } from '../reducers/reduce-message';
import Worker from '../webworker/web.worker';

export default class Media {
  constructor(store, worker) {
    this.store = store;
    this.worker = worker;
    this.videos = document.querySelector('.count-videos');
    this.files = document.querySelector('.count-files');
    this.audios = document.querySelector('.count-audio');
    this.links = document.querySelector('.count-links');
    this.voices = document.querySelector('.count-voices');
    this.timerId = null;
    this.recordData = this.recordData.bind(this);
    this.hideTimer = this.hideTimer.bind(this);
    document.querySelector('.footer .nav').addEventListener('click', this.recordData);
  }

  start() {
    if (this.store.state.media) {
      this.videos.textContent = this.store.state.media.videos.length;
      this.files.textContent = this.store.state.media.files.length;
      this.audios.textContent = this.store.state.media.audios.length;
      this.links.textContent = this.store.state.media.links.length;
      this.voices.textContent = this.store.state.media.voices.length;
    }
  }

  timer() {
    const time = document.querySelector('.footer .time');
    let count = 1;
    this.timerId = setInterval(() => {
      time.textContent = count;
      count += 1;
    }, 1000);
  }

  // eslint-disable-next-line
  showTimer() {
    const timer = document.createElement('li');
    timer.classList.add('timer');
    timer.innerHTML = ` 
    <div class="timer-ok">&#9655</div>
    <div class="time"></div>
    <div class="timer-stop">&#9724</div>
    `;
    document.querySelector('.footer .nav').insertAdjacentElement('beforeend', timer);
  }

  hideTimer(event, recorder, stream) {
    if (event.target.classList.contains('timer-ok') || event.target.classList.contains('timer-stop')) {
      clearInterval(this.timerId);
      recorder.stop();
      stream.getTracks().forEach((track) => track.stop());
      document.querySelector('.nav .micro').classList.remove('hidden');
      document.querySelector('.nav .video').classList.remove('hidden');
      document.querySelector('.timer').remove();
      if (document.querySelector('.box')) {
        document.querySelector('.box').remove();
      }
    }
  }

  recordData(event) {
    const target = event.target.closest('li');
    if (target.classList.contains('micro') || target.classList.contains('video')) {
      document.querySelector('.nav .micro').classList.add('hidden');
      document.querySelector('.nav .video').classList.add('hidden');
      this.showTimer();
      this.timer();

      (async () => {
        if (!navigator.mediaDevices && !window.MediaRecorder) {
          return;
        }
        try {
          let stream;
          let
            elem;
          if (target.classList.contains('micro')) {
            elem = document.createElement('audio');
            elem.controls = true;
            stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
          } else {
            elem = document.createElement('video');
            elem.controls = true;
            stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
            const box = document.createElement('div');
            box.classList.add('box');
            box.appendChild(elem);
            document.querySelector('.article').insertAdjacentElement('beforeend', box);

            elem.srcObject = stream;
            elem.play();
          }
          const recorder = new MediaRecorder(stream);
          const chunks = [];
          recorder.addEventListener('dataavailable', (evt) => {
            chunks.push(evt.data);
          });

          recorder.addEventListener('stop', (evt) => {
            elem.srcObject = null;
            URL.revokeObjectURL(elem.src);
            const blob = {
              file: new Blob(chunks, {
                type: 'audio/wav',
              }),
            };
            const typeData = evt.target.mimeType.split('/')[0];
            // eslint-disable-next-line
            const userId = this.store.getState().users.curentUser._id;
            Media.processingFile(addMessage, typeData, userId, this.store, blob);
          });
          recorder.start();

          document.querySelector('.timer').addEventListener('click', (e) => {
            this.hideTimer(e, recorder, stream);
          });
        } catch (e) {
          console.error(e);
        }
      })();
    }
  }

  static async processingFile(callback, typeData, userId, store, file) {
    const worker = new Worker();
    worker.addEventListener('message', ({ data: result }) => {
      worker.terminate();
      const res = {
        type: 'addMessage',
        text: '',
        typeData,
        file: result.data,
        userId,
      };
      callback(res, store);
    });
    worker.postMessage(file);
  }
}
