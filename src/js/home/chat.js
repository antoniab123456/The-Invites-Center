
/* Exported functions */
let trackActivity = require('./dependencies/activity'),
    renderConversation = require('./dependencies/convo'),
    fetchHistory = require('./dependencies/history'),
    sendMsg = require('./dependencies/send_msg'),
    renderSocketMsgs = require('./dependencies/new_msgs');
  
/* Exported objects */    
let visual = require('./dependencies/visual'), 
    msg_count = require('./dependencies/msg_count');

let chat = () => {
    let all_users_section =document.querySelector('#all_users_section');

    if(all_users_section){

        /* If this url is accessed, the fire sockets */
        if (window.location.pathname === "/users/home") {

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
                        res.json().then(response => {
                        /* Saving the socket_id + user_id in cookies */
                            socket.send(JSON.stringify({
                                socket: {
                                    socket_user_id: response.user, 
                                    socket_id: data.init_socket
                                }
                            }));

                            console.log(document.cookie);
                        });
                    });
                }
                
                /* Track if the user is online or not */
                trackActivity(data.online_socket, 'block');
                trackActivity(data.socket_disconnected, 'none');

                /* Render the messages received from the server */
                renderSocketMsgs(data);  
            }

            /* Watch if the users loaded */
            let callback = (mutationsList) => {
                for(let mutation of mutationsList) {
                    if (mutation.type == 'childList') {
                        let link = mutation.addedNodes[0].children[0].children[0];
                        link.onclick = (e) => {
                            let receiver_id = link.href.split('=')[1];

                            /* Set the amount of new messages to 0 when a convo is open */
                            msg_count.resetNewMsgs(receiver_id, link);
                               
                            /* After clicking on the user, open the conversation if it's open yet*/
                            if(document.querySelector(`#convo_${receiver_id}`) == null){
                                /* Request to /users/conversation?receiver=receiver_id */
                                fetch(link.href, {
                                    method: 'POST',
                                    credentials: 'include'
                                }).then(res => {
                                    res.json()
                                    .then((response)=>{
                                        invitation_footer.style.display = 'none';

                                        /* Copy the convo_div for each converstion*/
                                        let convo_div = renderConversation(receiver_id, response);

                                        /*Resolve the promise with the returned elements and the conversation info */
                                        return {
                                            convo_div: convo_div,
                                            tarea: convo_div.querySelector(".textarea_chat"),
                                            container: convo_div.querySelector(".chat_contents_container"),
                                            send_btn: convo_div.querySelector(".send_msg_btn"),
                                            data: response
                                        };
                                    })
                                    .then((response) => { 
                                        console.log(response.data);
                                        /* Fetching the messsages in the db after the conversation has loaded*/
                                        fetchHistory(response);
                                       /* Onkeyup, make the send buttom brighter */
                                        visual.highlightSendBtn(response);
                                        /* Sending messages for users */
                                        sendMsg(response, receiver_id, socket);
                                    })
                                })                    
                                .catch(err => { console.log(err); })
                            } else {
                                /* Highlight, if it's already open  */
                                visual.highlightConvo(receiver_id);
                            }
                            e.preventDefault();
                        }
                        
                    }
                }
            };
                
            let observer = new MutationObserver(callback);
            observer.observe(all_users_ul,  {childList: true});
        }

    }

}


module.exports = chat;