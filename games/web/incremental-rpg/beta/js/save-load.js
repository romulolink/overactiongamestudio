/*
 * Save the Game to Local Storage
 */
function saveGame() {
    console.log('Saving Game');
    localStorage['rpg_save[meta]'] = btoa(JSON.stringify(meta));
    localStorage['rpg_save[resource]'] = btoa(JSON.stringify(resource));
    localStorage['rpg_save[workers]'] = btoa(JSON.stringify(workers));
    localStorage['rpg_save[buildings]'] = btoa(JSON.stringify(buildings));
    localStorage['rpg_save[upgrades]'] = btoa(JSON.stringify(upgrades));

    forceUpdateSave();
}

/*
 * Load the Game from Local Storage
 */
function loadGame() {
    if (!localStorage['rpg_save[meta]']) {
        message('No Saved Game - Starting Fresh', 'info');

         $('#onLoadModal').modal();

        meta.startPlayingTime = new Date().getTime();

        return;
    } else {
        message('Loading Saved Game', 'info');
    }

   
    verifySaveStructure(meta,localStorage['rpg_save[meta]']);    
    verifySaveStructure(resource,localStorage['rpg_save[resource]'], true);
    verifySaveStructure(workers,localStorage['rpg_save[workers]'], true);
    verifySaveStructure(buildings,localStorage['rpg_save[buildings]'], true);
    verifySaveStructure(upgrades,localStorage['rpg_save[upgrades]'], true);
  
}


/*
 * Process savefiles to avoid braking it after an update
 * basically it stores the save to an temp_var, iterate in every property 
 * from the save structure and check if the current save structure has it
 * if so, it migrates the property to the new structure and removes the old save
 * structure

 */
function verifySaveStructure(saveEntry,localStorageData,checkSubEntries = false){

    data_old = JSON.parse(atob(localStorageData));

    // Migrate date from old structure to a new structure without break the save file
      for (const prop in data_old) {
        if (saveEntry.hasOwnProperty(prop)) {

            if(checkSubEntries){
                verifySavePropStructure(saveEntry[prop], data_old[prop]);
            }
            else
                saveEntry[prop] = data_old[prop];
        }
      }

    // Remove the old save structure
    data_old = undefined;
          
    //  Store data to a new local store structure 
    localStorageData = btoa(JSON.stringify(saveEntry));
      
}


function verifySavePropStructure(currentPropEntry,oldPropEntry){

    data_old_prop = oldPropEntry;

    // Migrate date from old structure to a new structure without break the save file
      for (const prop in data_old_prop) {
        if (currentPropEntry.hasOwnProperty(prop)) {

           currentPropEntry[prop] = data_old_prop[prop];
        }
      }

    // Remove the old save structure
    data_old_prop = undefined;
          
    //  Store data to a new local store structure 
    oldPropEntry = currentPropEntry;
      
}



// Import from a base64 file
function importSaveFile(fileInput) {
  var file = fileInput.files[0];
  var reader = new FileReader();
  reader.onload = function(e) {
    var saveFileContent = e.target.result;
    var saveData = JSON.parse(saveFileContent);
    
    // Decodificar os dados do save game
    meta = JSON.parse(atob(saveData.meta));
    resource = JSON.parse(atob(saveData.resource));
    workers = JSON.parse(atob(saveData.workers));
    buildings = JSON.parse(atob(saveData.buildings));
    upgrades = JSON.parse(atob(saveData.upgrades));
    
    // Outras ações necessárias após importar o save game
    // ...
    
    console.log("Save game importado com sucesso!");
  };
  
  reader.readAsText(file);
}



// export to a base64 file
function exportSaveFile() {
  var saveData = {
    meta: btoa(JSON.stringify(meta)),
    resource: btoa(JSON.stringify(resource)),
    workers: btoa(JSON.stringify(workers)),
    buildings: btoa(JSON.stringify(buildings)),
    upgrades: btoa(JSON.stringify(upgrades))
  };

  var saveFileContent = JSON.stringify(saveData);
  var saveFileName = "savefile.txt";
  
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(saveFileContent));
  element.setAttribute('download', saveFileName);
  
  element.style.display = 'none';
  document.body.appendChild(element);
  
  element.click();
  
  document.body.removeChild(element);
}



// Export to a clear Json file
function exportSaveJson() {
    var saveData = {
        meta: meta,
        resource: resource,
        workers: workers,
        buildings: buildings,
        upgrades: upgrades
    };

    var saveString = JSON.stringify(saveData);
    var saveBase64 = btoa(saveString);

    var downloadLink = document.createElement('a');
    downloadLink.href = 'data:application/octet-stream;base64,' + saveBase64;
    downloadLink.download = 'save.txt';
    downloadLink.click();
}

// Import from a clear Json save file
function importSaveJson(event) {
    var file = event.target.files[0];
    var reader = new FileReader();

    reader.onload = function (e) {
        var saveBase64 = e.target.result.split(',')[1];
        var saveString = atob(saveBase64);
        var saveData = JSON.parse(saveString);

        meta = saveData.meta;
        resource = saveData.resource;
        workers = saveData.workers;
        buildings = saveData.buildings;
        upgrades = saveData.upgrades;

        // Atualizar o save na memória local
        localStorage['rpg_save[meta]'] = btoa(JSON.stringify(meta));
        localStorage['rpg_save[resource]'] = btoa(JSON.stringify(resource));
        localStorage['rpg_save[workers]'] = btoa(JSON.stringify(workers));
        localStorage['rpg_save[buildings]'] = btoa(JSON.stringify(buildings));
        localStorage['rpg_save[upgrades]'] = btoa(JSON.stringify(upgrades));

        forceUpdateSave();
    };

    reader.readAsDataURL(file);
}


