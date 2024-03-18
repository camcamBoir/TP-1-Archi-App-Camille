baseUrl = 'https://a4526571-1881-41a6-b897-d102728645b6-00-or9dvd710qy0.janeway.replit.dev/';


function fact(n) {
  if (n === 0 || n === 1) {
    return 1;
  } else {
    return n * fact(n - 1);
  }
}

function applique(f, tab) {
  return tab.map(f);
}

console.log(fact(6))
console.log(applique(fact, [1, 2, 3, 4, 5, 6]))
console.log(applique(function(n) { return (n + 1); }, [1, 2, 3, 4, 5, 6]))


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
  console.log('dans getAllMessages');
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
