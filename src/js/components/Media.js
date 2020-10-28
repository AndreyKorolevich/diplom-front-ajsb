export default class Media {
  constructor(store) {
    this.store = store;
    this.videos = document.querySelector('.count-videos');
    this.files = document.querySelector('.count-files');
    this.audios = document.querySelector('.count-audio');
    this.links = document.querySelector('.count-links');
    this.voices = document.querySelector('.count-voices');
  }

  start() {
    if (this.store.state.media) {
      this.videos.textContent = this.store.state.media.videos.length
      this.files.textContent = this.store.state.media.files.length
      this.audios.textContent = this.store.state.media.audios.length
      this.links.textContent = this.store.state.media.links.length
      this.voices.textContent = this.store.state.media.voices.length
    }
  }
}

