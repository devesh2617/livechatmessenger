const socket = io();

//taking name from the user
let n = "";

do{
    n = prompt("Enter your name to enter the chat");
}while(!n);

//sending the user details to the server 
socket.emit('newUser',n);
socket.on('newUser',(user)=>
{
    let newUser = document.createElement('h4');
    newUser.innerHTML = `${user} joined the chat`;
    newUser.classList.add('new-user','left');
    document.querySelector('.container').appendChild(newUser); 
})

//getting the message from the form 
let msg;
document.getElementById('send-container').addEventListener('submit',(e)=>{

 e.preventDefault();
 let msgBox = document.querySelector('.text-box');
  msg = msgBox.value;
  msgBox.value = "";
  if(msg) sendMessage(msg); 
 
});

function sendMessage(msg)
{
   let mssg = {
    user: n,
    message: msg
   }

   //append message in the container
   let msgBox = document.createElement('div');

   msgBox.classList.add('message','right');


   let markup = `<p>You: ${mssg.message}<p>`;

   msgBox.innerHTML = markup;
   
   let msgArea = document.querySelector('.container');
   msgArea.appendChild(msgBox);

   //sending the message to the server
   socket.emit('messageToServer',mssg);
}

//receiving message from the server 
socket.on('messageToClients',(msg)=>
{
    appendMessage(msg,'left');
});

//append message function
function appendMessage(mssg,type)
{
    let msgBox = document.createElement('div');

    msgBox.classList.add('message',type);


    let markup = `<p>${mssg.user}: ${mssg.message}<p>`;

    msgBox.innerHTML = markup;
    
    let msgArea = document.querySelector('.container');
    msgArea.appendChild(msgBox);
}

socket.on('left',who=>{
    console.log(who)
  let ele = document.createElement('h4');
  ele.innerHTML = `${who} left the chat`;
  ele.classList.add('new-user', 'left');
  document.querySelector('.container').appendChild(ele);
});












