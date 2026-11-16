// All OnLoad Functions
// Modal Commented out during development
$(document).ready(function () {
  

    updateValues();


    // Get town and mayor names and display them.
    $('#modalClose').click(function () {

        console.log("clicou em fechar janela");        
        meta.town = document.getElementById('town').value;
        document.getElementById("townName").innerHTML = meta.town;
        meta.mayor = document.getElementById('mayor').value;
        document.getElementById("mayorName").innerHTML = meta.mayor;
    });

   
 
    function Timer(){
    	if(timer > 0){
        	timer--;
            updateValues();
        } else{
        	lastSave = new Date().toLocaleString();
        	timer = 10;
            updateValues();
        }
    }


    setInterval(Timer,1000);
    
	setInterval(function () { saveGame(); }, 10000);


    /*
    setTimeout(function() {
            
          console.log("reloading page");

          location.reload();
        
        }, 10 * 60 * 1000);*/


//	load_game();
}); /*document.ready*/



// Send a query to the browser process.
function sendMessage() {

    console.log('sendMessage teste');

  window.cefQuery({
    request: 'BindingTest:' + ' checando integração',
    onSuccess: function(response) {
      document.getElementById('result').value = 'Response: '+response;
    },
    onFailure: function(error_code, error_message) {}
  });
}

