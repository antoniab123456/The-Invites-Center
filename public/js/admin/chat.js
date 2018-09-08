let username_link_chat = document.querySelectorAll('.username_link_chat'),
    text_area_user = document.querySelector('.text_area_user'),
    chat_main_div = document.querySelector(".chat_main_div"),
    socket_textarea = document.querySelector('#socket_textarea');

    

/* If this url is accessed, the fire sockets */
if (window.location.pathname === "/users/admin") {

    /* Socket setup */
    const socket = new WebSocket('ws://localhost:4000/');

    socket.onopen = () => {
        console.log('connection is open');
    };

    socket.onerror = () => {
        console.log("error");
    };

    socket.onmessage = (msg) => {
        let data = JSON.parse(msg.data);
        /* Receiving the socket id from the server */
        if(data.init_socket){
            /* Making request to get the current user */
            fetch('/users/find_user', {
                credentials: 'include'
            })
            .then((res) => {
                res.json().then(resp => {
                    /* Saving the socket_id + user_id in cookies */
                    document.cookie = `socket_user=${resp.user};`
                    document.cookie = `socket=${data.init_socket}; `
                    socket.send(JSON.stringify({socket_user_id: resp.user}));
                });
            });
        } else {      
            
            let open_chat = document.querySelectorAll('.chat_main_div');
            
            /* If there is a conversation open show the messages*/
            if(open_chat){
                for(let convo of open_chat){
                    if(convo.getAttribute('id')){
                        let attr = convo.getAttribute('id').split('_')[1];
                        /* Function for use */
                        showMessages = (attrib, cls) => {
                            if(attr == attrib){
                                let all_chats = convo.querySelector('.chat_contents_container');
                                let chat_el = document.createElement('div');
                                chat_el.innerHTML = data.chat.content;
                                chat_el.setAttribute('class', cls);
                                all_chats.appendChild(chat_el);
            
                                let toBottom  = () => { all_chats.scrollTo(0, all_chats.scrollHeight); }
                                all_chats.onload = toBottom();
                            }
                                
                        }
                        /* If the server send the message to the sender -> Render as sent, 
                        else render as received */
                        if(data.who == 'sender'){ 
                            showMessages(data.chat.createdFor, 'chat_sent');
                        } else {
                            showMessages(data.chat.createdBy, 'chat_received');
                        }
                    }
                }
            }
        }
    }

    if(username_link_chat !== null){
        for(let link of username_link_chat){
            link.onclick = (e) => {

                /* After clicking on the user, open the conversation if it's open yet*/
                if(document.querySelector(`#rendered_${link.href.split('=')[1]}`) == null){
                    /* Request to /users/conversation?receiver=receiver_id, 
                    send the request to find an ecisting convo, or create a new one */
                    fetch(link.href, {
                        method: 'POST',
                        credentials: 'include'
                    }).then(response => {
                        response.json()
                        .then((res)=>{
                            invitation_footer.style.display = 'none';
                            /* Copy the chat_div for each converstion*/
                            let chat_div = chat_main_div.cloneNode(true);
                            chat_div.style.display = 'block';
                            chat_div.setAttribute('id', `rendered_${link.href.split('=')[1]}`);

                            /* Display the username in the hat */
                            let chat_div_hat = chat_div.querySelector('.chat_div_hat');
                            chat_div_hat.innerText = res.username;
                            chat_div_hat.setAttribute('id', `hat_${link.href.split('=')[1]}`);

                            let profile_img = chat_div.querySelector('.chat_div_profile_image');

                            /* if the user has a profile_img, display, if not, leave the default */
                            if(res.profile_img){                     
                                profile_img.style.background = `url("/users/image?image=${res.profile_img}") no-repeat center`;
                                profile_img.style.backgroundSize = 'cover';
                            } 
                            
                            text_area_user.appendChild(chat_div); 
                            
                            /* On chat close delete the elem from the dom,
                             and finish the function execution */
                            chat_div_hat.onclick = () =>{
                                chat_div.remove();
                                return false;
                            }
                            
                            
                            let textarea_chat = {
                                chat_div: chat_div,
                                tarea: chat_div.querySelector(".textarea_chat"),
                                contain: chat_div.querySelector(".chat_contents_container"),
                                send_btn: chat_div.querySelector(".send_msg_btn"),
                                res: res
                            }

                            /*Resolve the promise with the returned elements 
                            and the conversation info */
                            return textarea_chat;
                        })
                        .then((panel) => { 
                            /* Fetching the messsages in the db after the conversation has loaded*/
                            fetch('/users/chats/history', {
                                method: 'POST', 
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({
                                    convo_id: panel.res.convo._id
                                })
                            }).then((res) => {
                                res.json().then(res => {
                                    if(res != '404'){
                                        res.forEach(chat => {
                                            /* For each chat create an element*/
                                            let chat_el = document.createElement('div');
                                            chat_el.innerHTML = chat.content;
                                            /* If the chat was sent by the the user, 
                                            render as sent, else as received */
                                            if(chat.createdBy == panel.res.createdBy){
                                                chat_el.setAttribute('class', 'chat_sent');
                                            } else{
                                                chat_el.setAttribute('class', 'chat_received');
                                            }
                                            panel.contain.appendChild(chat_el);
                                    
                                            /* Scroll to the bottom when the chats load */
                                            let toBottom  = () => { panel.contain.scrollTo(0, panel.contain.scrollHeight); }
                                            panel.contain.onload = toBottom();
                                        })
                                    } else {
                                        console.log(404);
                                    }
                                })
                                .catch(err => {
                                    console.log(err);
                                })
                            })
                                
                            /* Onkeyup, make the send buttom brighter */
                            panel.tarea.onkeyup = () => {
                                if(panel.tarea.value.length > 0){
                                    panel.send_btn.style.color = 'rgb(80, 77, 77)'
                                } else {
                                    panel.send_btn.style.color = '';
                                }
                            }

                            /* Sending messages for users */
                            panel.send_btn.onclick = () => {
                                if(panel.tarea.value.length !== 0){
                                    let date = new Date();
                                    /* Pass the needed information to the server */
                                    let message = {
                                        convo_id: panel.res.convo._id,                   
                                        message: panel.tarea.value,
                                        createdBy: panel.res.createdBy,
                                        sender: {
                                            socket_id: document.cookie.split(';')[1].split('=')[1],
                                            user_id: document.cookie.split(';')[0].split('=')[1],
                                        },
                                        receiver: link.href.split('=')[1],
                                        hours: date.getHours(),
                                        mins: date.getMinutes(),
                                        date: date.getDate(), 
                                        month: date.getMonth() + 1,
                                        year: date.getFullYear() 
                                    }

                                    socket.send(JSON.stringify(message));
                                    
                                    /* Clear the textarea, and make the ligher after the message is sent */
                                    panel.tarea.value = '';
                                    panel.send_btn.style.color = '';
                                }
                            }
                            /* Return the promise with the needed values */
                            let obj  = {
                                contain: panel.contain,
                                panel: panel.res
                            }
                            return obj;
                        })
                    })                    
                    .catch(err => {
                        console.log(err);
                    })
                } else {
                    /* Hignlight, if it's already open  */
                    let chat_div_hat = document.querySelectorAll('.chat_div_hat');
                    for(hat of chat_div_hat){
                        if(hat.getAttribute('id')){
                            if(hat.getAttribute('id').split('_')[1] == link.href.split('=')[1]){
                        
                                let setDisp = () => {
                                    console.log(hat);
                                    hat.style.backgroundColor = "rgb(0, 0, 0)";
                                }
                                setTimeout(setDisp, 0);
                            }
                        }
                    }
                }

                e.preventDefault();
            }
        }
    }

}




