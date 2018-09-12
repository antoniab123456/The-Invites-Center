let fetchHistory = (response) => {
    fetch('/users/chats/history', {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            convo_id: response.data.convo._id
        })
    }).then((res) => {
        res.json().then(chats => {
            if(chats != '404'){
                chats.forEach(chat => {
                    /* For each chat create an element*/
                    let chat_el = document.createElement('div');
                    chat_el.innerHTML = chat.content;
                    /* If the chat was sent by the the user, 
                    render as sent, else as received */
                    if(chat.createdBy == response.data.createdBy){
                        chat_el.setAttribute('class', 'chat_sent');
                    } else{
                        chat_el.setAttribute('class', 'chat_received');
                    }
                    
                    let container = response.container;
                    container.appendChild(chat_el);
        
                    /* Scroll to the bottom when the chats load */
                    let toBottom  = () => { container.scrollTo(0, container.scrollHeight); }
                    container.onload = toBottom();
                })
            } else {
                console.log(404);
            }
        })
        .catch(err => {
            console.log(err);
        })
    })
                                            
}

module.exports = fetchHistory;

