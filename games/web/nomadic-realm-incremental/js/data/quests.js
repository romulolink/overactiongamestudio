 var quests = [
      {
        id: "mainQuest1",
        title: "Explore the forest",
        description: "Click in the forest icon, get 10 woods and make your first battle",
        isMainQuest: true,
        sequence: 1,
        isCompleted: false,
        isActive: true,
        conditions: [
          { type: 'collect', item: 'wood', amount: 10 },
          { type: 'defeat', enemy: 'any' }
        ],
        reward: {
          experience: 100,
          gold: 50
        }
      },
      {
        id: "sideQuest1",
        title: "Side Quest 1",
        description: "Collect 10 wood and defeat one enemy.",
        isMainQuest: false,
        sequence: 1,
        isCompleted: false,
        isActive: false,
        conditions: [
          { type: 'collect', item: 'wood', amount: 10 },
          { type: 'defeat', enemy: 'any' }
        ],
        reward: {
          experience: 100,
          gold: 50
        }
      },
      {
        id: "mainQuest2",
        title: "Buy Island",
        description: "Sell 100 woods and buy the island on the right",
        isMainQuest: true,
        sequence: 2,
        isCompleted: false,
        isActive: false,
        conditions: [
          { type: 'sell', item: 'wood', amount: 100 },
          { type: 'buy', item: 'island-14', amount: 1 }
        ],
        reward: {
          experience: 100,
          gold: 50
        }
      },
      {
        id: "mainQuest3",
        title: "Buy Island",
        description: "Collect 30 rune-essences and craft 10 plant rune",
        isMainQuest: true,
        sequence: 3,
        isCompleted: false,
        isActive: false,
        conditions: [
          { type: 'collect', item: 'rune_essence', amount: 30 },
          { type: 'collect', item: 'rune_plant', amount: 10 }
        ],
        reward: {
          experience: 100,
          gold: 50
        }
      },
      {
        id: "mainQuest4",
        title: "Plant Elementar Flowers",
        description: "Plant 10 Lotus of Fire",
        isMainQuest: true,
        sequence:4,
        isCompleted: false,
        isActive: false,
        conditions: [
          { type: 'collect', item: 'fire_lotus', amount: 10 }
        ],
        reward: {
          experience: 100,
          gold: 50
        }
      },
      {
        id: "mainQuest5",
        title: "Capture all monsters",
        description: "Defeat and capture all monsters from Arkcadius",
        isMainQuest: true,
        sequence:5,
        isCompleted: false,
        isActive: false,
        conditions: [
          { type: 'collect', item: 'fire_lotus', amount: 10000000 }
        ],
        reward: {
          experience: 100,
          gold: 50
        }
      },

    ];
