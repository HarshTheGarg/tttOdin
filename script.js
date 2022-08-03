const Gameboard = (() => {
    const box1 = document.querySelector(".box1");
    const box2 = document.querySelector(".box2");
    const box3 = document.querySelector(".box3");
    const box4 = document.querySelector(".box4");
    const box5 = document.querySelector(".box5");
    const box6 = document.querySelector(".box6");
    const box7 = document.querySelector(".box7");
    const box8 = document.querySelector(".box8");
    const box9 = document.querySelector(".box9");

    const box = [box1, box2, box3, box4, box5, box6, box7, box8, box9];

    const container = document.querySelector(".container");
    const form = document.querySelector(".form")

    const button = document.querySelector(".submitNames");
    const input1 = document.querySelector("#player1")
    const input2 = document.querySelector("#player2");

    const formElements = {button, input1, input2};

    return {box, formElements, container, form};
})();

let symbol = "x";

const Game = (() => {
    Gameboard.formElements.button.addEventListener('click', makePlayers);
    
    function makePlayers(){

        /* console.log(Gameboard.formElements.input1.value);
        console.log(Gameboard.formElements.input2.value); */

        let player1Name;
        let player2Name

        if(Gameboard.formElements.input1.value == ''){
            player1Name = "Player X";
        }else{
            player1Name = Gameboard.formElements.input1.value;
        };

        if(Gameboard.formElements.input2.value == ''){
            player2Name = "Player O";
        }else{
            player2Name = Gameboard.formElements.input2.value;
        };

        const Player1 = Player(player1Name);
        const Player2 = Player(player2Name);

        Gameboard.form.style.display = "none";
        Gameboard.container.style.display = "grid";
    };


    for(let i = 0; i<Gameboard.box.length; i++){
        Gameboard.box[i].addEventListener('click', addSymbol);
    };

    function addSymbol(){
        this.textContent = symbol;
        checkWin()
    };

    function checkWin(){
        if(
            (
                (Gameboard.box[0].textContent == symbol) && 
                (Gameboard.box[1].textContent == symbol) && 
                (Gameboard.box[2].textContent == symbol)
            ) || (
                (Gameboard.box[3].textContent == symbol) && 
                (Gameboard.box[4].textContent == symbol) && 
                (Gameboard.box[5].textContent == symbol)
            ) || (
                (Gameboard.box[6].textContent == symbol) && 
                (Gameboard.box[7].textContent == symbol) && 
                (Gameboard.box[8].textContent == symbol)
            ) || (
                (Gameboard.box[0].textContent == symbol) && 
                (Gameboard.box[3].textContent == symbol) && 
                (Gameboard.box[6].textContent == symbol)
            ) || (
                (Gameboard.box[1].textContent == symbol) && 
                (Gameboard.box[4].textContent == symbol) && 
                (Gameboard.box[7].textContent == symbol)
            ) || (
                (Gameboard.box[2].textContent == symbol) && 
                (Gameboard.box[5].textContent == symbol) && 
                (Gameboard.box[8].textContent == symbol)
            ) || (
                (Gameboard.box[0].textContent == symbol) && 
                (Gameboard.box[4].textContent == symbol) && 
                (Gameboard.box[8].textContent == symbol)
            ) || (
                (Gameboard.box[2].textContent == symbol) && 
                (Gameboard.box[4].textContent == symbol) && 
                (Gameboard.box[6].textContent == symbol)
            )
        ){
            alert("dome won")
        };
    };
})();

const Player = (name) => {
    let pname = name;
    let points = 0;
};

