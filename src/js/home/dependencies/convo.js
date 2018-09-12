let minimizeConvo = require('./minimize');

let renderConversation = (receiver, response) => {
    
    let all_chats_container = document.querySelector('.all_chats_container'),
        convo_main_div = document.querySelector(".convo_main_div");
        
    /* Copy the convo_div for each converstion*/
    let convo_div = convo_main_div.cloneNode(true);
    convo_div.style.display = 'block';
    convo_div.setAttribute('id', `convo_${receiver}`);

    /* Display the username in the hat */
    let convo_div_hat = convo_div.querySelector('.convo_div_hat');
    convo_div_hat.innerText = response.username;
    convo_div_hat.setAttribute('id', `hat_${receiver}`);

    /* Emit online status */
    let online_status_convo = convo_div.querySelector(".online_status_convo");

    if(response.status == 'online'){
        online_status_convo.style.display = 'block';
    } else {
        online_status_convo.style.display = 'none';
    }

    let profile_img = convo_div.querySelector('.convo_div_profile_image');

    /* if the user has a profile_img, display, if not, leave the default */
    if(response.profile_img){                     
        profile_img.style.background = `url("/users/image?image=${response.profile_img}") no-repeat center`;
        profile_img.style.backgroundSize = 'cover';
    } 

    all_chats_container.appendChild(convo_div); 

    /* On click on the hat, delete the elem from the dom,
    and finish the function execution */
    convo_div_hat.onclick = () =>{
        convo_div.remove();
        return false;
    }
    
    /* Minimize the convo on minimize sign click */
    let minimize_convo_view = convo_div.querySelector('.minimize_convo');

    minimize_convo_view.onclick = () => {
        minimizeConvo(convo_div, receiver, response, all_chats_container);
    }

    return convo_div;
}


module.exports = renderConversation;