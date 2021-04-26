
  const chatHelp = document.querySelector('#chat_help');
  const chatInSupport = document.querySelector('#chat_in_support');

document.querySelector("#start_chat").addEventListener("click", (event) => {
  

  chatHelp.style.display = 'none'; //Hide First Form
  chatInSupport.style.display = 'block'; //Show Chat Form
  
  const email = document.querySelector('#email').value;
  const text = document.querySelector('#txt_help').value;

  const socket = io();

  socket.on('connect',() =>{
    params = {
      email,
      text
    }
    socket.emit('client_first_connection', params, (callback, error) =>{
      if(error){
        console.error(error);
      }else{
        console.log(callback);
      }
    });
  })
});
