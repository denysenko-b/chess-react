import React, { FC } from "react";
import { Colors } from "../models/Colors";
import { Figure } from "../models/figures/Figure";

interface LostFiguresProps {
    color: Colors;
    figures: Figure[];
}

const LostFiguresComponent: FC<LostFiguresProps> = ({ color, figures }) => {
    return (
        <div className="lost-pieces">
            <h3>{color} losts</h3>
            {figures.map((figure) => (
                <span key={figure.id}>
                    {figure.name}{" "}
                    {figure.logo && (
                        <img src={figure.logo} width={20} height={20} />
                    )}
                </span>
            ))}
        </div>
    );
};

export default LostFiguresComponent;
