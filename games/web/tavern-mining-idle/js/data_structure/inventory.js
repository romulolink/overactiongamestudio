var inventory = {
  coin: {
    slug: "coin",
    name: "Coin",
    description: "the main game currency",
    total: 0,
    icon_path: "img/images/coin.png",
    max: 100,
    cost: {
      gold_bar: 1,
    },
  },
  diamond: {
    slug: "diamond",
    name: "Diamond",
    description: "A valuable and rare item",
    total: 0,
    icon_path: "img/images/diamond.png",
    max: 100,
    cost: {
      coin: 1000,
    },
  },
  stone: {
    slug: "stone",
    name: "Stone",
    description: "A common rock",
    total: 0,
    icon_path: "img/images/stone.png",
    max: 100,
    cost: {
      coin: 5000,
    },
  },
  increaseCoinSpeedUpgrade: {
    slug: "coinSpeedUpgrade",
    name: "coinSpeedUpgrade",
    description: "A coinUpgrade can increase the speed of coin production",
    total: 0,
    icon_path: "img/images/coinUpgrade.png",
    max: 100,
    cost: {
      coin: 5000,
    },
  },
};
