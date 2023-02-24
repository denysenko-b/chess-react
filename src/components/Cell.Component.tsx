import React, { FC } from "react";
import { Cell } from "../models/Cell";
import { Colors } from "../models/Colors";

interface CellProps {
    cell: Cell;
    selected: boolean;
    click: (cell: Cell) => void;
    isUnderAttack: boolean;
}

const CellComponent: FC<CellProps> = ({
    cell,
    selected,
    click,
    isUnderAttack,
}) => {
    return (
        <div
            className={[
                "square",
                cell.color === Colors.BLACK ? "square--dark" : "square--light",
                isUnderAttack ? "square--under_attack" : "",
            ].join(" ")}
            onClick={() => click(cell)}
        >
            <div
                className={[
                    "piece",
                    cell.figure?.color === Colors.BLACK
                        ? "piece--black"
                        : "piece--white",
                    selected ? "piece--selected" : "",
                    cell.avaliable ? "piece--available" : "",
                    cell.figure
                        ? "piece--" + cell.figure.name.toLowerCase()
                        : "",
                ].join(" ")}
            >
                {cell.figure?.logo && <img src={cell.figure?.logo} />}
            </div>
        </div>
    );
};

export default CellComponent;
