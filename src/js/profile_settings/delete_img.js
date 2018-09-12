let delete_img = () => {
    let bin_inside = document.querySelector('#bin_inside'), 
        delete_inside_note_modal = document.querySelector('#delete_inside_note_modal'),
        delete_btn = document.querySelector('.delete_btn'),
        cancel_btn = document.querySelector('.cancel_btn');

    /* Deleting images from the profile settings */

    if(bin_inside){
        bin_inside.onclick = (e) => {
            delete_inside_note_modal.style.display = 'block';
        
            /* Hide the delete mode if you click outside*/  
            window.onclick = (e) =>{
                if(e.target == delete_inside_note_modal){
                    delete_inside_note_modal.style.display = 'none';
                }
            }
            delete_btn.onclick = (e) => {
                let xhr = new XMLHttpRequest;
                xhr.open('DELETE', bin_inside.href, true);
                xhr.onload = () =>{
                    window.location.assign('/users/profile');
                    delete_inside_note_modal.style.display = 'none';
                }
                xhr.send();  
                e.preventDefault();
            }
            cancel_btn.onclick = (e) =>{
                delete_inside_note_modal.style.display = 'none';
                e.preventDefault();
            }
            e.preventDefault();
        }    
    }
}


module.exports = delete_img();
