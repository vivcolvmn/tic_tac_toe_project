window.onload = () => {
    let counter = 0;
    let gameStatus = "open"
    let playerX = "";
    let playerO = "";

    const possibleWins = {
        0: "square-0 square-1 square-2",
        1: "square-3 square-4 square-5",
        2: "square-6 square-7 square-8",
        3: "square-0 square-4 square-8",
        4: "square-2 square-4 square-6",
        5: "square-0 square-3 square-6",
        6: "square-1 square-4 square-7",
        7: "square-2 square-5 square-8"
    }

    const h1 = document.querySelector("h1");
    const main = document.getElementsByClassName("main")[0];
    const newGameBtn = document.getElementById("newGame");
    const giveUpBtn = document.getElementById("giveUp");

    const playerMoves = (player, targetId) => {
        player += (" " + targetId);
        return player;
    }

    const checkWinner = (mvStr, winsObj) => {
        wins = Object.values(winsObj);
        for (let i = 0; i < wins.length; i++) {
            win = wins[i];
            winStr = win.split(" ");
            if (mvStr.includes(winStr[0]) &&
                mvStr.includes(winStr[1]) &&
                mvStr.includes(winStr[2])) {
                return true;
            }
        }
        return false;
    }

    const endGame = (winner) => {
        playerX = "";
        playerO = "";
        h1.className = `${winner}`
        gameStatus = "closed";
        newGameBtn.disabled = false;
        giveUpBtn.disabled = true;
        counter = 0;
    }

    if (gameStatus === "closed") {
        setInterval(displayWinner(winner), 1000);
    }

    newGameBtn.disabled = true;

    main.addEventListener("click", (event) => {
        const imgEl = document.createElement("img");
        if (gameStatus === "open") {
            if (event.target.tagName !== "IMG" && (counter === 0 || counter % 2 === 0)) {
                imgEl.src = "resources/rick_token.png";
                event.target.appendChild(imgEl);
                imgEl.className = "rickToken"
                counter += 1;
                playerX = playerMoves(playerX, event.target.id);
                if (checkWinner(playerX, possibleWins)) {
                    endGame("rick")
                };
            }
            else if (event.target.tagName !== "IMG" && counter % 2 !== 0) {
                imgEl.src = "resources/morty_token.png";
                event.target.appendChild(imgEl);
                imgEl.className = "mortyToken"
                counter += 1;
                playerO = playerMoves(playerO, event.target.id);
                if (checkWinner(playerO, possibleWins)) {
                    endGame("morty")
                };
            }
        }
        if (gameStatus === "open" && counter === 9) {
            endGame("nobody")
        }
    })

    giveUpBtn.addEventListener("click", () => {
        if (gameStatus === "open") {
            if (counter % 2 === 0) {
                endGame("morty")
            }
            if (counter % 2 !== 0) {
                endGame("rick")
            }
        }
    })

    newGameBtn.addEventListener("click", () => {
        h1.className = "";
        Array.from(main.children).forEach(square => {
            square.innerHTML = ""
        });
        gameStatus = "open";
        playerX = "";
        playerO = "";
        newGameBtn.disabled = true;
        giveUpBtn.disabled = false;
        counter = 0;
    })
}
