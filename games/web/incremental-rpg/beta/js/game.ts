interface Resource {
  slug: string;
  total: number;
  max: number;
  icon_path: string;
  icon_resource: string | null;
  cost?: { [key: string]: number };
  clickIncrement: number;
  autoIncrement: number;
  chance?: { [key: string]: number };
  chanceIncrement: number;
}

interface Meta {
  fps: number;
  tick: number;
  saveGameInterval: number;
  startPlayingTime: number;
  population: number;
  maxPopulation: number;
}

let resource: { [key: string]: Resource };
let meta: Meta;
let expenses: Array<[string, number]>;

/*
 * On Window Load
 */
window.onload = function () {
  setInterval(updateDisplay, meta.fps);
  setInterval(tick, meta.tick);
  setInterval(saveGame, meta.saveGameInterval);
  loadGame();
  initDisplay();
};

/*
 * Increments Resources
 */
function tick() {
  for (const r in resource) {
    autoIncrementResource(eval(resource[r]));
  }

  for (const w in workers) {
    if (eval(workers[w]).chance) {
      increaseChanceResourcesFromWorker(eval(workers[w]));
    }
  }
}

function forceUpdateSave() {
  lastSave = new Date().toLocaleString();
  timer = 0;
}

// Display the correct values.
function updateValues() {
  document.getElementById("autosave").innerHTML =
    "<b>Total Time Played: " +
    calculatePlayTime(meta.startPlayingTime) +
    " min (" +
    calculatePlayTime(meta.startPlayingTime, 'h') +
    "h) <br/><br/></b>Auto-Saving in " +
    timer +
    " Last Save: " +
    lastSave;
}

/*
 * Calculation Functions
 */
const Calc = {
  /*
   * Spend Multiple Resources
   * arr - array = Array of arrays. Each contains the resource object slug and the amount to spend of that resource.
   *
   * Returns true if all resources have been spent.
   * Returns false if one resource cannot be spent. It will not spend any resources if one cannot be spent.
   */
  spendResources: function (arr: Array<[string, number]>): boolean {
    const shortages: string[] = [];

    for (const a in arr) {
      const objSlug = arr[a][0];
      const obj = eval(resource[objSlug]);
      const i = arr[a][1];
      const newValue = obj.total - i;

      if (newValue < 0) {
        shortages.push(obj.name);
      }
    }

    if (shortages.length === 0) {
      for (const a in arr) {
        const objSlug = arr[a][0];
        const obj = eval(resource[objSlug]);
        const i = arr[a][1];
        obj.total -= i;
      }
      return true;
    } else {
      return false;
    }
  },

  /*
   * Takes an object of expenses and puts them into an array of arrays.
   * x - object = The cost object.
   * Returns an array of arrays [[the resource slug, the amount to spend], [...]]
   */
  expensesArray: function (x: { [key: string]: number }): Array<[string, number]> {
    const expenses: Array<[string, number]> = [];
    for (const i in x) {
      const costValue = x[i];
      expenses.push([i, costValue]);
    }
    return expenses;
  },
};

/* TODO: REWRITE THIS FUNCTION TO RETURN TRUE OR FALSE & PUT IT IN Calc
 * Increase a Resource Total
 * ui_element - HTMLElement = The UI element.
 * x - object = The resource object.
 * i - number = The amount to increase the total by.
 */
function increaseResourceTotalEffect(ui_element: HTMLElement, x: Resource, i: number): void {
  const newValue = x.total + i;

  // Check if the resource has a cost and manage that.
  if (typeof x.cost !== 'undefined') {
    for (const c in x.cost) {
      const obj = eval(resource[c]);
      const costNum = eval(x.cost[c]);
      const newValueOfCost = obj.total - costNum;
      if (newValueOfCost >= 0) {
        obj.total -= costNum;

        addBox(ui_element, x.slug, x.icon_resource == null ? x.icon_path : x.icon_resource);
        playSound(x.slug);
      } else {
        return;
      }
    }
  }

  if (newValue < x.max) {
    x.total += i;
    addBox(ui_element, x.slug, x.icon_resource == null ? x.icon_path : x.icon_resource);
    playSound(x.slug);
    increaseChanceResources(x, i);
    return true;
  } else {
    x.total = x.max;
    console.log("Unable to collect resource");
    return false;
  }
}

/* TODO: REWRITE THIS FUNCTION TO RETURN TRUE OR FALSE & PUT IT IN Calc
 * Increase a Resource Total
 * x - object = The resource object.
 * i - number = The amount to increase the total by.
 */
function increaseResourceTotal(x: Resource, i: number): void {
  const newValue = x.total + i;

  // Check if the resource has a cost and manage that.
  if (typeof x.cost !== 'undefined') {
    for (const c in x.cost) {
      const obj = eval(resource[c]);
      const costNum = eval(x.cost[c]);
      const newValueOfCost = obj.total - costNum;
      if (newValueOfCost >= 0) {
        obj.total -= costNum;
      } else {
        return;
      }
    }
  }

  if (newValue < x.max) {
    x.total += i;
    increaseChanceResources(x, i);
    return true;
  } else {
    x.total = x.max;
    return false;
  }
}

/*
 * Increment Resource from a Click
 * Initiated from the DOM
 * ui_element - HTMLElement = The UI element.
 * x - object = The resource object.
 */
function clickIncrement(ui_element: HTMLElement, x: Resource): void {
  increaseResourceTotalEffect(ui_element, x, x.clickIncrement);
}

/*
 * Increment Resource Automatically
 * x - object = The resource object.
 */
function autoIncrementResource(x: Resource): void {
  if (x.autoIncrement > 0) {
    increaseResourceTotal(x, x.autoIncrement);
  }
}

/* AWFULLY WET
 * Increment Resource in the Chance Object of the Passed Resource
 * x - object = The resource object. (Which contains the `chance` object.)
 * i - number = The number of times the chance check should run.
 */
function increaseChanceResources(x: Resource, i: number): void {
  if (typeof x.chance !== 'undefined') {
    for (const c in x.chance) {
      let counter = 0;
      while (counter < i) {
        const num = x.chance[c];
        const rand = Math.floor(Math.random() * 101);
        if (rand <= num) {
          const obj = eval(resource[c]);
          increaseResourceTotal(obj, obj.chanceIncrement);
        }
        counter++;
      }
    }
  }
}

/* AWFULLY WET
 * Increment Resources from Worker Chance Object
 * x - object = The worker object.
 */
function increaseChanceResourcesFromWorker(x: Resource): void {
  if (typeof x.chance !== 'undefined') {
    for (const c in x.chance) {
      const num = eval(x.chance[c]);
      const rand = Math.floor(Math.random() * 101);
      if (rand <= num) {
        const obj = eval(resource[c]);
        increaseResourceTotal(obj, obj.chanceIncrement);
      }
    }
  }
}

// Load Game State from Local Storage
function loadGame(): void {
  if (typeof Storage !== 'undefined') {
    if (localStorage.getItem('resource')) {
      const loadedGame = JSON.parse(localStorage.getItem('resource'));
      for (const r in loadedGame) {
        const obj = eval(resource[r]);
        obj.total = loadedGame[r].total;
      }
    }
    if (localStorage.getItem('meta')) {
      const loadedMeta = JSON.parse(localStorage.getItem('meta'));
      meta.startPlayingTime = loadedMeta.startPlayingTime;
      meta.population = loadedMeta.population;
    }
    if (localStorage.getItem('expenses')) {
      expenses = JSON.parse(localStorage.getItem('expenses'));
    }
  } else {
    console.log("Sorry, your browser does not support web storage.");
  }
}

// Save Game State to Local Storage
function saveGame(): void {
  if (typeof Storage !== 'undefined') {
    const saveObj = {};
    for (const r in resource) {
      saveObj[r] = { total: eval(resource[r]).total };
    }
    localStorage.setItem('resource', JSON.stringify(saveObj));
    localStorage.setItem('meta', JSON.stringify(meta));
    localStorage.setItem('expenses', JSON.stringify(expenses));
  } else {
    console.log("Sorry, your browser does not support web storage.");
  }
}

// Update the display
function updateDisplay(): void {
  updateValues();
}

// Calculate the total play time
function calculatePlayTime(start: number, format: string = 'm'): number {
  const now = new Date().getTime();
  const elapsedTime = now - start;
  let minutes = Math.floor(elapsedTime / 60000);
  if (format === 'h') {
    minutes = Math.floor(elapsedTime / 3600000);
  }
  return minutes;
}

// Add a box to the UI
function addBox(ui_element: HTMLElement, slug: string, icon_path: string): void {
  const img = document.createElement('img');
  img.src = icon_path;
  img.className = 'icon_img';
  ui_element.appendChild(img);
}

// Play a sound effect
function playSound(slug: string): void {
  const audio = new Audio('sounds/' + slug + '.mp3');
  audio.play();
}

// Initialize the display
function initDisplay(): void {
  // Display initial values for resources
  for (const r in resource) {
    const obj = eval(resource[r]);
    const slug = obj.slug;
    const total = obj.total;
    const icon_path = obj.icon_path;
    const ui_element = document.getElementById(slug + '_total');

    ui_element.innerHTML = total;
    addBox(ui_element, slug, icon_path);
  }

  // Display initial values for expenses
  for (const e in expenses) {
    const expense = expenses[e];
    const slug = expense[0];
    const amount = expense[1];
    const ui_element = document.getElementById(slug + '_amount');

    ui_element.innerHTML = amount;
  }
}