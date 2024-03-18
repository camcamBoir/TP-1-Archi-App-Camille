baseUrl = 'https://a4526571-1881-41a6-b897-d102728645b6-00-or9dvd710qy0.janeway.replit.dev/';


msgs = [
  { "msg": "Hello World" },
  { "msg": "Blah Blah" },
  { "msg": "blob" }
]

function update(messages) {
  document.getElementById('messages-list').innerHTML = '';

  messages.forEach(function(message) {
    let li = document.createElement('li');
    li.textContent = message.msg;
    let deleteButton = document.createElement('button');
    deleteButton.textContent = 'Supprimer';
    deleteButton.addEventListener('click', function() {
      deleteMessage(messages.indexOf(message));
      li.remove();
    });
    li.appendChild(deleteButton);
    document.getElementById('messages-list').appendChild(li);
  });
}

function postMessage() {
  let newMessage = document.getElementById('text-area').value;
  if (newMessage != '') {
    fetch(baseUrl + `msg/post/${escape(newMessage)}`)
      .then(function(response) {
        return response.json();
      })
      .then(() => {
        msgs.push({ "msg": newMessage })
        update(msgs)
        document.getElementById('text-area').value = '';
      })
  }
}

function getAllMessages() {
  fetch(baseUrl + 'msg/getAll')
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      msgs = data
      update(msgs)
    });
}

function changeBaseUrl() {
  baseUrl = document.getElementById('input-baseUrl').value;
  getAllMessages();
};

function deleteMessage(index) {
  fetch(baseUrl + 'msg/del/' + index)
    .then(function(response) {
      return response.json();
    })
}

getAllMessages();
