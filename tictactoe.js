const prompt = require('prompt-sync')();

let plateau = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',' '];
let joueur = "O";
let etatPartie = true;

function printBoard() {
    console.log(` 
        ${plateau[0]} | ${plateau[1]} | ${plateau[2]}
        ---------
        ${plateau[3]} | ${plateau[4]} | ${plateau[5]}
        ---------
        ${plateau[6]} | ${plateau[7]} | ${plateau[8]}
    `);
}

function gagne() {
    const conditions = [
        [0, 1, 2], 
        [3, 4, 5], 
        [6, 7, 8],
        [0, 3, 6], 
        [1, 4, 7], 
        [2, 5, 8], 
        [0, 4, 8],
        [2, 4, 6]
    ];

    return conditions.some(condition => {
        const [a, b, c] = condition;
        return plateau[a] === joueur && plateau[b] === joueur && plateau[c] === joueur;
    });
}

function jouer(position) {
    if (plateau[position] == " ") {
        plateau[position] = joueur;
    } else {
        console.log("Case occupée, sélectionne une autre");
        return false;
    }
    if (gagne()) {
        printBoard();
        console.log(`Le joueur ${joueur} a gagné !`);
        etatPartie = false;
        return true;
    }
    if (plateau.every(cell => cell != " ")) {
        printBoard();
        console.log("Egalité !");
        etatPartie = false;
        return true;
    }

    joueur = joueur === "O" ? "X" : "O";
    return true;
}

while (etatPartie) {
    printBoard();
    const position = prompt(`Joueur ${joueur}, veuillez entrer un nombre (0-8) :`);

    if(position >= 0 && position <= 8) {
        jouer(parseInt(position));
    } else {
        console.log("Le nombre n'est pas valide, veuillez entrer un nombre entre 0 et 8.");
    }
}