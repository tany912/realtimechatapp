const socket = io();
var name;

do{
     name = prompt("Please enter your name:");
}while(name == null || name == "" );

let messagearea = document.querySelector(".message__area");
let textarea = document.querySelector("#textarea");



textarea.addEventListener('keyup', (e) => {
    if(e.key === 'Enter') {
        sendMessage(e.target.value)
    }
})

function sendMessage(message){
    let msg = {
            user: name,
            message: message
    }
//Appending to Html
appendMessage(msg,"outgoing");
scrollToBottom();
textarea.value="";

// Sending to Server
socket.emit("message",msg);

}

function appendMessage(msg,type){
    let mainDiv = document.createElement("div");
    mainDiv.classList.add(type,"message");
    let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `
    mainDiv.innerHTML=markup;

    messagearea.appendChild(mainDiv);
}   

// function appendtyper(name){
//     let node = document.querySelector(".brand");
//     let userDiv = document.createElement("div");
//     userDiv.classList.add("typing");
//     userDiv.innerHTML= `${name} is Typing..`;
// node.parentNode.insertBefore(userDiv, node.nextSibling);

// }

//Reciving the message from Server
socket.on('message', (msg) => {
    appendMessage(msg, 'incoming');
    scrollToBottom();
})

function scrollToBottom() {
    messagearea.scrollTop = messagearea.scrollHeight
}