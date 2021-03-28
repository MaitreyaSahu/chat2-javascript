const chatForm = document.getElementById('chat-form');
const chatRoom = document.querySelector('.chat-messages');


const socket = io();

socket.on('message', message => {
    console.log(message);
    outputMessage(message);
    
    chatRoom.scrollTop = chatRoom.scrollHeight;
});

//message submit
chatForm.addEventListener('submit', e => {
    e.preventDefault();

    let msg = e.target.elements.msg.value;

    socket.emit('chatMessage', msg);

    e.target.elements.msg.value = '';
    e.target.elements.msg.focus();
})

function outputMessage(message){
    let div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `<div class="message">
    <p class="meta">Mary <span>9:15pm</span></p>
    <p class="text">
        ${message}
    </p>
</div>`;
    let chatbox = document.querySelector('.chat-messages');
    chatbox.appendChild(div);
}