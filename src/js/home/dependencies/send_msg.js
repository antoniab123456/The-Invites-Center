let sendMsg = (response, receiver, socket) => {
    response.send_btn.onclick = () => {
        if(response.tarea.value.length !== 0){
            let date = new Date();
            /* Pass the needed information to the server */
            let message = {
                convo_id: response.data.convo._id,                   
                message: response.tarea.value,
                receiver: receiver,
                sender: response.data.convo.users.find((user) => {
                    return user != receiver;
                }),
                hours: date.getHours(),
                mins: date.getMinutes(),
                date: date.getDate(), 
                month: date.getMonth() + 1,
                year: date.getFullYear() 
            }

            socket.send(JSON.stringify(message));
            
            /* Clear the textarea, and make the ligher after the message is sent */
            response.tarea.value = '';
            response.send_btn.style.color = '';
        }
    }

}

module.exports = sendMsg;


