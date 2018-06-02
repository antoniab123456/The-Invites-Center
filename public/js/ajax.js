// the button generate_link
//the input to which i need to append   <div id="around_input">
//<input id="link_placement" type="text" id="links" value="" readonly>
 //</div>
//the copy sign <div class="copy"><p>copy</p></div>
$(function(){
  $('generate_link').on('click', function(){
      $.ajax({
          url: "/invitation/generate_link",
          contentType: 'application '
      });
  });
});           