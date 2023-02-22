import React, { FC } from "react";
import { Player } from "../models/Player";

interface LoserProps {
    loser: Player;
    restart: () => void;
}

const LoserComponent: FC<LoserProps> = ({ loser, restart }) => {
    return (
        <div className="loser-message">
            <h3 className="loser-message__text">Loser - {loser.color}</h3>
            <button onClick={restart} className="loser-message__button">
                Restart
            </button>
        </div>
    );
};

export default LoserComponent;
