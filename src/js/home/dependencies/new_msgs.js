let msg_count = require('./msg_count');

let renderSocketMsgs = (data) => {
    if(data.who){
        /* If the message is coming from the sender */
        if(data.who == 'sender'){
            let convo = document.querySelector(`#convo_${data.chat.createdFor}`);
            let all_chats = convo.querySelector('.chat_contents_container');

            /* Create the chat element in the needed conversation */
            let chat_el = document.createElement('div');
            chat_el.innerHTML = data.chat.content;
            chat_el.setAttribute('class', 'chat_sent');

            all_chats.appendChild(chat_el);
            let toBottom  = () => { all_chats.scrollTo(0, all_chats.scrollHeight); }
            all_chats.onload = toBottom();
        } else {
            msg_count.dispayReceivedMsg(data);
        }
    } 
}


module.exports = renderSocketMsgs;

