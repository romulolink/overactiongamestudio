//Audio Declarations
var chopping_wood_audio = new Audio("sounds/resources/chopping_wood.mp3");
var mine_stone_audio = new Audio("sounds/resources/mine_stone.mp3");
var mine_iron_audio = new Audio("sounds/resources/mine_iron.mp3");
var gather_food_audio = new Audio("sounds/resources/cow.ogg");
var btn_over_audio = new Audio("sounds/resources/btn_over.wav");
var background_audio = new Audio("sounds/background/title_menu.wav");

var coin_audio = new Audio("sounds/resources/coin.wav");
var success_audio = new Audio("sounds/sfx/success.wav");
var smelting_audio = new Audio("sounds/resources/smelting.wav");

//Audio Helper Function

function audioHelper(audioSupport){
	if(audioSupport.duration > 0 && !audioSupport.paused){

        if(meta.isMute != undefined){
            audioSupport.muted = meta.isMute;
        }

		//already playing
		audioSupport.pause();
		audioSupport.currentTime = 0;
		audioSupport.play();

	} else{

            if(meta.isMute){
                audioSupport.muted = meta.isMute;
            }

            audioSupport.play();    

        }
}


function musicVolumeControl(){

         const volumeSlider = document.getElementById("music_volume");

          // Event listener para ajustar o volume
          volumeSlider.addEventListener("input", () => {

            const volume = volumeSlider.value / 100;
            musica.volume = volume;
            audioSupport.play();
            console.log('aaaaaaaaaa');

        });
}


function toggleSound() {
  var soundButton = document.getElementById('sound-button');
  var audioElement = document.getElementById('sound-button');

  if (meta.isMute) {

    meta.isMute = false 
    soundButton.innerHTML = "&#128264";
    soundButton.style.backgroundColor = 'green';
  
  } else {

    meta.isMute = true;
    soundButton.innerHTML = "&#128263";
    soundButton.style.backgroundColor = 'gray';
  
  }

  console.log('ativando o som para ' + meta.isMute);
}


//Audio Helper Function

function playSound(sound_name){

    if(sound_name == 'btn_over'){
            audioHelper(btn_over_audio);  
     }

   if(sound_name == 'title'){

            audioHelper(background_audio); 
     }
	
 if(sound_name == 'wood'){
            audioHelper(chopping_wood_audio);  
     }

 if(sound_name == 'stone' || sound_name == 'brick' || sound_name == 'gold'  || sound_name == 'silver'){
            audioHelper(mine_stone_audio);  
         }

 if(sound_name == 'goldenBar'){
            audioHelper(smelting_audio);  
         }

 if(sound_name == 'coin'){
            audioHelper(coin_audio);  
         }

 if(sound_name == 'iron'){
            audioHelper(mine_iron_audio);  
         }

 if(sound_name == 'meat'){
            audioHelper(gather_food_audio);  
         }

if(sound_name == 'success'){
          audioHelper(success_audio);  
       }


}