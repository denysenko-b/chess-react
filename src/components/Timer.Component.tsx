import React, { FC, useState, useRef, useEffect } from "react";
import { Colors } from "../models/Colors";
import { Player } from "../models/Player";

interface TimerProps {
    currentPlayer: Player | null;
    restart: () => void;
    reload: (callback: Function) => void;
}

const TimerComponent: FC<TimerProps> = ({ currentPlayer, restart, reload }) => {
    const [whiteTime, setWhiteTime] = useState(300);
    const [blackTime, setBlackTime] = useState(300);

    useEffect(() => {
        reload(() => restartTimer);
    }, []);

    useEffect(() => {
        startTimer();
    }, [currentPlayer]);

    const timer = useRef<null | ReturnType<typeof setInterval>>(null);

    function startTimer() {
        if (timer.current) {
            clearInterval(timer.current);
        }
        const callback =
            currentPlayer?.color === Colors.WHITE
                ? decrementWhiteTimer
                : decrementBlackTimer;

        timer.current = setInterval(callback, 1000);
    }

    function decrementBlackTimer() {
        setBlackTime((prev) => prev - 1);
    }

    function decrementWhiteTimer() {
        setWhiteTime((prev) => prev - 1);
    }

    function handleRestart() {
        restartTimer();
        restart();
    }

    function restartTimer() {
        setWhiteTime(300);
        setBlackTime(300);
    }

    return (
        <div className="timer">
            <button onClick={handleRestart}>Restart game</button>
            <h3>Black - {blackTime}</h3>
            <h3>White - {whiteTime}</h3>
        </div>
    );
};

export default TimerComponent;
