let username_link_chat = document.querySelectorAll('.username_link_chat'),
    text_area_user = document.querySelector('.text_area_user');

if(username_link_chat !== null){
    for(let link of username_link_chat){
        link.onclick = (e) => {
            let xhr = new XMLHttpRequest;
            xhr.open('POST', link.href, true);
            xhr.onload = () => {
                if(xhr.status == 200){
                    let convo = JSON.parse(xhr.response);
                    if(document.querySelector(`#rendered_${convo._id}`) == null){
                        let chat_div_hat = document.createElement('div');
                        chat_div_hat.setAttribute('class', 'chat_div_hat');
                        
                        /* Create the element that will host all the chats*/
                        let chat_contents_container = document.createElement('div');
                        chat_contents_container.setAttribute('class', 'chat_contents_container');

                        /* Create the textarea */
                        let textarea_chat = document.createElement('textarea');
                        textarea_chat.setAttribute('class', 'textarea_chat')

                        /* Create the main div that will have all of the above created elemnts */
                        let chat_div = document.createElement('div');
                        chat_div.setAttribute('class', 'chat_main_div');
                        chat_div.setAttribute('id', `rendered_${convo._id}`);
                        
                        /* Append all the elements */
                        chat_div.appendChild(chat_div_hat);
                        chat_div.appendChild(chat_contents_container);
                        chat_div.appendChild(textarea_chat);
                        text_area_user.appendChild(chat_div);  

                        /* Make an xhr request to get the information abou the user*/
                        let receiver_xhr = new XMLHttpRequest;
                        receiver_xhr.open('GET', `/users/receiver?receiver=${convo.receiver}`, true);
                        receiver_xhr.onload = () => {
                            if(receiver_xhr.status == 200){
                                receiver_info = JSON.parse(receiver_xhr.response);
                                chat_div_hat.innerHTML = receiver_info.username;
                                chat_div_hat.setAttribute('id', `${receiver_info._id}`);
                            }
                        } 
                        receiver_xhr.send();
                    } else {
                        let chat_div_hat = document.querySelectorAll('.chat_div_hat');
                        if(chat_div_hat !== null){
                            for(let hat of chat_div_hat){
                                hat.onclick = (e) => {
                                    console.log(e);
                                }
                                if(convo.receiver === hat.getAttribute('id')){
                                    hat.style.backgroundColor = '#457fbb';
                                    let removeColor = () => {
                                        hat.style.backgroundColor = '';
                                    }
                                    setTimeout(removeColor, 2000);
                                }

                               
                            }
                        }
                    }
                }
            }
            xhr.send();
            e.preventDefault();
        }
    }
}



//USerimage in case no chats are found
//    "url('/users/image?image="+receiver_info.profile_img+"')";



        // if(convo.receiver === hat.getAttribute('id')){
//     hat.style.backgroundColor = '#457fbb';
//     let removeColor = () => {
//         hat.style.backgroundColor = '';
//     }
//     setTimeout(removeColor, 2000);
// }

/* Close the chats  */
// chat_div_hat.onclick = () => {
//     chat_div.style.display = 'none';
//     let xhr = new XMLHttpRequest;
//     xhr.open('GET', `/users/receiver?receiver=${convo.receiver}`, true);
//     receiver_xhr.onload = () => {
//         if(receiver_xhr.status == 200){
//             receiver_info = JSON.parse(receiver_xhr.response);

//         }
//     }
//     receiver_xhr.send();
// }