import Modal from "../components/Modal";

const dowload = (file) => new Promise((resolve, reject) => {
  if (file === undefined) {
    const error = new Error('There`s no choose file');
    reject(error);
  } else {
    const reader = new FileReader();
    reader.addEventListener('load', (evt) => {
      resolve({data: evt.target.result, type: file.type, name: file.name});
    });
    reader.addEventListener('error', (evt) => {
      reject(evt.target.error);
    });
    reader.readAsDataURL(file);
  }
});

self.addEventListener('message', async (event) => {
  const result = await dowload(event.data.file);
  self.postMessage(result);
});
