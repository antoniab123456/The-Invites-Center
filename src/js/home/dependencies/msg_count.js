let msg_count = {
    resetNewMsgs: (receiver_id, link) => {
        let chat_preview = document.querySelector(`#preview_${receiver_id}`);
        let users_rendered = document.querySelector(`#receiver_id${receiver_id}`);

        if(chat_preview){
            let new_msg = chat_preview.querySelector('.new_msg');
            new_msg.innerHTML = 0;
        }

        if(users_rendered){
            let message_count_icon = users_rendered.querySelector('.message_count_icon');
            message_count_icon.innerHTML = 0;
        }

        /* Read new msg when convo is open */
        link.parentElement.querySelector('.message_count_icon').style.display = 'none';
    },
    dispayReceivedMsg: (data) => {
        let chat_preview = document.querySelector(`#preview_${data.chat.createdBy}`);
        let convo_attr = document.querySelector(`#convo_${data.chat.createdBy}`);
        
        if(chat_preview){
            let new_msg = chat_preview.querySelector('.new_msg');
            new_msg.innerHTML = parseInt(new_msg.innerHTML) + 1;
            new_msg.style.display = 'block';
        } else {
            if(convo_attr){
                let all_chats = convo_attr.querySelector('.chat_contents_container');
                let chat_el = document.createElement('div');
                chat_el.innerHTML = data.chat.content;
                chat_el.setAttribute('class', 'chat_received');
                all_chats.appendChild(chat_el);

                let toBottom  = () => { all_chats.scrollTo(0, all_chats.scrollHeight); }
                all_chats.onload = toBottom();
                
            } else {
                let users_rendered = document.querySelector(`#receiver_id${data.chat.createdBy}`);
            
                if(users_rendered){
                    let message_count_icon = users_rendered.querySelector('.message_count_icon');
                    message_count_icon.style.display = 'block';
                    message_count_icon.innerHTML = parseInt(message_count_icon.innerHTML) + 1;
                } 
            }
        }             
    }
}

module.exports = msg_count;