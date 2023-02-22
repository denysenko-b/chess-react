import React, { useState, useEffect } from "react";
import "./App.css";
import BoardComponent from "./components/Board.Component";
import LoserComponent from "./components/Loser.Component";
import LostFiguresComponent from "./components/LostFigures.Component";
import TimerComponent from "./components/Timer.Component";
import { Board } from "./models/Board";
import { Colors } from "./models/Colors";
import { Player } from "./models/Player";

const App = () => {
    const [board, setBoard] = useState(new Board());
    const [whitePlayer, setWhitePlayer] = useState(new Player(Colors.WHITE));
    const [blackPlayer, setBlackPlayer] = useState(new Player(Colors.BLACK));
    const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);
    const [loser, setLoser] = useState<Player | null>(null);
    const [reloadTimer, setReloadTimer] = useState<Function | null>(null);

    useEffect(() => {
        restart();
        setCurrentPlayer(whitePlayer);
    }, []);

    useEffect(() => {
        checkKingIsUnderAttack(whitePlayer);
        checkKingIsUnderAttack(blackPlayer);
    }, [currentPlayer]);

    function restart() {
        const newBoard = new Board();
        newBoard.initCells();
        newBoard.addFigures();
        setBoard(newBoard);
        setLoser(null);
        setBlackPlayer(new Player(Colors.BLACK));
        setWhitePlayer(new Player(Colors.WHITE));
    }

    function end(player: Player) {
        setLoser(player);
    }

    function swapPlayer() {
        setCurrentPlayer(
            currentPlayer?.color === Colors.WHITE ? blackPlayer : whitePlayer
        );
    }

    function checkKingIsUnderAttack(player: Player) {
        if (player) {
            if (board.checkKingIsUnderAttack(player)) {
                player.checkmate();
            } else {
                player.kingIsUnderAttack = false;
            }
        }

        if (player?.loser) {
            end(player);
        }
    }

    return (
        <div className="app">
            <LostFiguresComponent
                color={Colors.BLACK}
                figures={board.lostBlackFigures}
            />
            <div className="main">
                <BoardComponent
                    board={board}
                    setBoard={setBoard}
                    currentPlayer={currentPlayer}
                    swapPlayer={swapPlayer}
                />
                <TimerComponent
                    currentPlayer={currentPlayer}
                    restart={restart}
                    reload={setReloadTimer}
                />
            </div>
            <LostFiguresComponent
                color={Colors.WHITE}
                figures={board.lostWhiteFigures}
            />
            {loser && (
                <LoserComponent
                    restart={() => {
                        restart();
                        if (reloadTimer) {
                            reloadTimer();
                        }
                    }}
                    loser={loser}
                />
            )}
        </div>
    );
};

export default App;
