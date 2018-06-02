var socket = io.connect('http://localhost:3000');


/*var btn_gen = document.getElementById('generate_link');
var link_placement = document.getElementById('link_placement');
var around = document.getElementById('around_input');



btn_gen.addEventListener('click', () => {
    socket.emit('getLink');

});


socket.on('getLink', (data, link) => {
   around.innerHTML += '<div class="copy"><p>copy</p></div><div><input id="link_placement" type="text" id="links" value="'+link+'" readonly></div>';
});

///append this <div class="copy"> 
             // <p>copy</p>
              //</div>
               //<div>
                 // <input id="link_placement" type="text" id="links" value="" readonly>
                //</div>*/