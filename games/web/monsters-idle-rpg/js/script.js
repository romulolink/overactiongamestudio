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


function openModal(title, message) {
    var modal = document.getElementById('modal');
    var modalContent = document.getElementById('modal-content');
    var modalTitle = document.getElementById('modal-title');

    modal.style.display = 'block';

    modalContent.innerHTML = message;
    modalTitle.innerHTML = title;
}


function openInventory() {

    var modal = document.getElementById('inventory-modal');

    modal.style.display = 'block';
}

function openTab(tabId) {
                  // Esconder todas as abas
  var tabContents = document.getElementsByClassName('tab-content');
  for (var i = 0; i < tabContents.length; i++) {
    tabContents[i].classList.remove('show');
    }

                      // Exibir a aba selecionada
    var selectedTab = document.getElementById(tabId);
    selectedTab.classList.add('show');

    if(tabId === "tab7")
        simulateCombat();
    
    if(tabId === "tab6"){
        stopCombat();
        closeModal('combat-modal')
    }


}

function openCombat() {

    var modal = document.getElementById('combat-modal');

    simulateCombat();

    modal.style.display = 'block';
}


function closeModal(modalId = 'modal') {
    var modal = document.getElementById(modalId);
    modal.style.display = 'none';
}





function showNotification(message, duration = 2) {
    var notificationBox = document.getElementById('notificationBox');
    notificationBox.innerHTML = message;
    notificationBox.style.display = 'block';

    setTimeout(function() {
        notificationBox.style.display = 'none';
    }, duration * 1000);
}