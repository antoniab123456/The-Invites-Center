
let empty_profile_image = document.querySelector('.empty_profile_image'),
    file_label = document.querySelector('#file_label'),
    profile_pic_submit = document.querySelector('#profile_pic_submit'),
    not_an_img_err = document.querySelector('#not_an_img_err');

if(empty_profile_image !== null){
    empty_profile_image.onchange = () => {
        let uploaded_img = empty_profile_image.files[0];
        let imgRegex = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
        if(imgRegex.test(uploaded_img.name)){
            let reader = new FileReader();
            reader.onload = () => {
                file_label.style.background = `url("${reader.result}") no-repeat center`;
                file_label.style.backgroundSize = 'cover';
                profile_pic_submit.style.display = "block";
            } 
            reader.readAsDataURL(uploaded_img);
        } else {
            not_an_img_err.style.display = "block";
            setTimeout(() =>{
                not_an_img_err.style.display = "none";
            }, 3000);
            return false;
        }
    }
}

