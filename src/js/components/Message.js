export default class Message {
  constructor(container, store) {
    this.container = container;
    this.store = store;
    this.start = this.start.bind(this);
  }

  start() {
    while (this.container.lastChild && this.container.children.length > 2) {
      this.container.removeChild(this.container.lastChild);
    }
    this.store.getState().messages.forEach((elem) => this.addTMessage(elem));
  }

  // showWidget() {
  //   const widget = document.createElement('div');
  //   widget.classList.add('widget');
  //   widget.innerHTML = `
  //     <div class="stats">
  //       <p class="name">Stats</p>
  //       <div id="cont-stats" class="container">
  //           <div class="header">
  //               <div>Project</div>
  //               <div>Open</div>
  //           </div>
  //       </div>
  //     </div>
  //     <div class="tasks">
  //        <p class="name">Tasks</p>
  //        <div id="cont-tasks" class="container">
  //        </div>
  //     </div>
  //   `;
  //   this.container.appendChild(widget);
  // }
  //
  // /* eslint-disable */
  // addStats(stats) {
  //   const list = document.createElement('div');
  //   list.classList.add('stats-list');
  //
  //   stats.forEach((elem) => {
  //     const project = document.createElement('div');
  //     project.classList.add('project');
  //     const countTasks = elem.tasks.filter((t) => !t.isDone).length;
  //     project.innerHTML = `
  //       <div class="project-name">${elem.name}</div>
  //       <div class="project-tasks"><span>${countTasks}</span></div>
  //     `;
  //
  //     list.appendChild(project);
  //   });
  //   document.getElementById('cont-stats').appendChild(list);
  // }

  cheackForLink(text) {
    const link = text.match(/(?<![\w\-]="|">)(?<![\w\-=\#])(https?:\/\/[\w\-\.!~?&=+\*'(),\/\#\:]+)((?!\<\/\w\>))*?/);
    if (link) {
      const endPoint = link.index + link[0].length;
      const message = `
        ${text.slice(0, link.index)}
        <a target="_blank" href="${link[0]}">${link[0]}</a>
         ${text.slice(endPoint)}
        `;
      return message;
    }
    return text;
  }

  addTMessage(message) {
    const mesElem = document.createElement('div');
    mesElem.dataset.id = message.id;
    mesElem.classList.add('message');
    mesElem.classList.add('yours-message');
    mesElem.innerHTML = this.cheackForLink(message.data);

    this.container.appendChild(mesElem);
  }

  showList() {
    const list = document.createElement('div');
    list.classList.add('list-projects');
    list.innerHTML = `
      <div class="first">Project: </div> 
      <div class="second"></div> 
    `;
    document.getElementById('cont-tasks').appendChild(list);
    this.state.forEach((elem) => {
      const name = document.createElement('div');
      name.classList.add('project-name');
      name.id = elem.id;
      name.textContent = elem.name;
      if (elem.isCheck) {
        document.querySelector('.first').insertAdjacentElement('beforeend', name);
        name.classList.add('choose');
      } else {
        document.querySelector('.second').insertAdjacentElement('beforeend', name);
      }
    });
  }
}
