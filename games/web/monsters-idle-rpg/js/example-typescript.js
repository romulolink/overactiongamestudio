"use strict";
// Classe Player
class PlayerCharacter {
    // Construtor da classe
    constructor(name, level, health) {
        this._name = name;
        this._level = level;
        this._health = health;
    }
    // Método público
    attack(target) {
        console.log(`${this._name} is attacking ${target.getName()}!`);
        // Lógica de ataque aqui...
    }
    // Métodos getter e setter
    getName() {
        return this._name;
    }
    setName(name) {
        this._name = name;
    }
    getLevel() {
        return this._level;
    }
    setLevel(level) {
        this._level = level;
    }
    getHealth() {
        return this._health;
    }
    setHealth(health) {
        this._health = health;
    }
}
// Criando instâncias da classe PlayerCharacter
const player1 = new PlayerCharacter("Player 1", 1, 100);
const player2 = new PlayerCharacter("Player 2", 1, 100);
// Acessando e modificando propriedades
player1.setName("New Name");
console.log(player1.getName()); // Output: New Name
// Chamando um método
player1.attack(player2);
