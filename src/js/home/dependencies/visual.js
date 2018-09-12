let visual = {
    highlightSendBtn: (response) => {
        response.tarea.onkeyup = () => {
            if(response.tarea.value.length > 0){
                response.send_btn.style.color = 'rgb(80, 77, 77)'
            } else {
                response.send_btn.style.color = '';
            }
        }
    },

    highlightConvo: (receiver_id) => {
        let convo_div_hat = document.querySelectorAll('.convo_div_hat');
        for(hat of convo_div_hat){
            if(hat.getAttribute('id')){
                if(hat.getAttribute('id').split('_')[1] == receiver_id){
                    hat.style.backgroundColor = "#457fbb";
                    
                    setTimeout(() => {
                        hat.style.backgroundColor = "";
                    }, 3000)
                }
            }
        }
    }
    
}

module.exports = visual;


                                