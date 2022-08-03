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

    const container = document.querySelector(".game");
    const form = document.querySelector(".form");

    const button = document.querySelector(".submitNames");
    const input1 = document.querySelector("#player1");
    const input2 = document.querySelector("#player2");

    const formElements = {button, input1, input2};


    const scoreBoard = (labelClass, scoreClass, index) => {
        const label = document.querySelector(`${labelClass}`);
        const score = document.querySelector(`${scoreClass}`);
        const board = document.querySelectorAll(".playerStats")[`${index}`]

        return {label, score, board};
    };

    const sb1 = scoreBoard(".player1label", ".player1score", 0);
    const sb2 = scoreBoard(".player2label", ".player2score", 1);
    sb = [sb1, sb2];

    const reset = document.querySelector(".reset");

    const footer = document.querySelector("footer");

    return {container, box, form, formElements, sb, reset, footer};
})();


const Game = (() => {
    let Player1;
    let Player2;

    Gameboard.formElements.button.addEventListener('click', submit);

    function submit(){
        makePlayers();
        changeDisplay();
        setNameOnBoard();
        setScore();
        playGame();
    };
    
    function makePlayers(){

        /* console.log(Gameboard.formElements.input1.value);
        console.log(Gameboard.formElements.input2.value); */

        let player1Name;
        let player2Name;

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

        Player1 = Player(player1Name, 'x', 0);
        Player2 = Player(player2Name, 'o', 1);
    };
    
    function changeDisplay(){
        Gameboard.form.style.display = "none";
        Gameboard.container.style.display = "flex";
    };

    function setNameOnBoard(){
        Gameboard.sb[0].label.textContent = Player1.pname;
        Gameboard.sb[1].label.textContent = Player2.pname;
    }

    Gameboard.reset.addEventListener("click", playGame);
    Gameboard.reset.style["background-color"] = "#9596d9"; 



    function playGame(){
        let currentPlayer = Player1;
        Gameboard.footer.textContent = '';

        Gameboard.sb[1].board.classList.remove("currentCard");
        Gameboard.sb[0].board.classList.add("currentCard");

        for(let i = 0; i<Gameboard.box.length; i++){
            Gameboard.box[i].textContent = '';
            Gameboard.box[i].addEventListener('click', addSymbol);
            Gameboard.box[i].style.cursor = "pointer";
        };

        function addSymbol(){
            if(this.textContent == ''){
                this.textContent = currentPlayer.symbol;
                this.style.cursor = "default";
                res = checkWin();
                if(res == 0){
                    Gameboard.sb[currentPlayer.number].board.classList.toggle("currentCard");
                    togglePlayer();
                    Gameboard.sb[currentPlayer.number].board.classList.toggle("currentCard");
                }else if(res == 1){
                    Gameboard.sb[currentPlayer.number].board.classList.remove("currentCard");
                };
            };
        };

        function checkWin(){
            if(
                (
                    (Gameboard.box[0].textContent == currentPlayer.symbol) && 
                    (Gameboard.box[1].textContent == currentPlayer.symbol) && 
                    (Gameboard.box[2].textContent == currentPlayer.symbol)
                ) || (
                    (Gameboard.box[3].textContent == currentPlayer.symbol) && 
                    (Gameboard.box[4].textContent == currentPlayer.symbol) && 
                    (Gameboard.box[5].textContent == currentPlayer.symbol)
                ) || (
                    (Gameboard.box[6].textContent == currentPlayer.symbol) && 
                    (Gameboard.box[7].textContent == currentPlayer.symbol) && 
                    (Gameboard.box[8].textContent == currentPlayer.symbol)
                ) || (
                    (Gameboard.box[0].textContent == currentPlayer.symbol) && 
                    (Gameboard.box[3].textContent == currentPlayer.symbol) && 
                    (Gameboard.box[6].textContent == currentPlayer.symbol)
                ) || (
                    (Gameboard.box[1].textContent == currentPlayer.symbol) && 
                    (Gameboard.box[4].textContent == currentPlayer.symbol) && 
                    (Gameboard.box[7].textContent == currentPlayer.symbol)
                ) || (
                    (Gameboard.box[2].textContent == currentPlayer.symbol) && 
                    (Gameboard.box[5].textContent == currentPlayer.symbol) && 
                    (Gameboard.box[8].textContent == currentPlayer.symbol)
                ) || (
                    (Gameboard.box[0].textContent == currentPlayer.symbol) && 
                    (Gameboard.box[4].textContent == currentPlayer.symbol) && 
                    (Gameboard.box[8].textContent == currentPlayer.symbol)
                ) || (
                    (Gameboard.box[2].textContent == currentPlayer.symbol) && 
                    (Gameboard.box[4].textContent == currentPlayer.symbol) && 
                    (Gameboard.box[6].textContent == currentPlayer.symbol)
                )
            ){
                currentPlayer.points += 1;
                setScore();

                Gameboard.footer.textContent = `${currentPlayer.pname} Won!`;

                for(let i = 0; i<Gameboard.box.length; i++){
                    Gameboard.box[i].removeEventListener("click", addSymbol);
                    Gameboard.box[i].style.cursor = "default";
                };
                return (1);

            }else if(
                Gameboard.box[0].textContent != '' &&
                Gameboard.box[1].textContent != '' &&
                Gameboard.box[2].textContent != '' &&
                Gameboard.box[3].textContent != '' &&
                Gameboard.box[4].textContent != '' &&
                Gameboard.box[5].textContent != '' &&
                Gameboard.box[6].textContent != '' &&
                Gameboard.box[7].textContent != '' &&
                Gameboard.box[8].textContent != '' 
            ){
                Gameboard.footer.textContent = `Tie`;

                for(let i = 0; i<Gameboard.box.length; i++){
                    Gameboard.box[i].removeEventListener("click", addSymbol);
                    Gameboard.box[i].style.cursor = "default";
                };
                return (1);
            }else{
                return (0);
            };
        };

        function togglePlayer(){
            if(currentPlayer == Player1){
                currentPlayer = Player2;
            }else{
                currentPlayer = Player1;
            };
        };
    };

    function setScore(){
        Gameboard.sb[0].score.textContent = Player1.points;
        Gameboard.sb[1].score.textContent = Player2.points;
    }

})();

const Player = (name, symbol, number) => {
    let pname = name;
    let points = 0;

    return {pname, points, symbol, number}
};

