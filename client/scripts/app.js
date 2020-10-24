// YOUR CODE HERE:

const app = {
  server: 'http://127.0.0.1:3000/classes/messages',
  userServer: 'http://127.0.0.1:3000/classes/users',
  init: () => {
    app.inputUsername();
    app.addEventHandlers();
    app.fetch((json) => {
      console.log(json);
      json.forEach(app.renderMessage);
    });
  },
  inputUsername: () => {
    let message = 'user의 name을 입력하세요';
    let name = window.prompt(message, name);
    let obj = {};
    obj.username = name;
    app.handleSubmit(obj);
  },
  handleUsername: (userData) => {
    app.sendUsername(userData, () => {
      app.renderUsername();
    });
  },
  sendUsername: (userData, callback) => {
    window
      .fetch(app.userServer, {
        method: 'POST',
        body: JSON.stringify(userData),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((res) => res.json())
      .then(callback);
  },
  renderUsername: () => {},
  fetchAndRender: () => {
    app.fetch((data) => {
      data.forEach(app.renderMessage);
    });
  },
  addEventHandlers: () => {
    let submit = document.querySelector('#send .submit');
    if (submit) {
      submit.addEventListener('submit', app.handleSubmit);
    }
  },
  fetch: (callback) => {
    window
      .fetch(app.server)
      .then((resp) => {
        return resp.json();
      })
      .then(callback);
  },
  send: (data, callback) => {
    window
      .fetch(app.server, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((resp) => {
        return resp.json();
      })
      .then(callback);
  },
  clearMessages: () => {
    document.querySelector('#chats').innerHTML = '';
  },
  clearForm: () => {
    document.querySelector('.inputUser').value = '';
    document.querySelector('.inputChat').value = '';
  },
  renderMessage: ({ username, text, date, roomname }) => {
    const tmpl = `<div class="chat">
      <div class="username">${username
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')}</div>
      <div>${text.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</div>
      <div>${date}</div>
      <div>${roomname.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</div>
    </div>`;

    document.querySelector('#chats').innerHTML =
      tmpl + document.querySelector('#chats').innerHTML;
  },
  handleSubmit: (e) => {
    e.preventDefault();
    app.clearMessages();
    app.send(
      {
        userId: document.querySelector('#userId_input').value,
        text: document.querySelector('.inputChat').value,
        roomname: document.querySelector('.inputRoomname').value,
      },
      () => {
        app.fetchAndRender();
        app.clearForm();
      }
    );
  },
};

app.init();
