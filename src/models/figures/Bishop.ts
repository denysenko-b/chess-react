import { Cell } from "./../Cell";
import { Colors } from "./../Colors";
import { Figure, FigureNames } from "./Figure";

import logo from "../../assets/bishop.svg";

export class Bishop extends Figure {
    constructor(color: Colors, cell: Cell) {
        super(color, cell);
        this.logo = logo;
        this.name = FigureNames.BISHOP;
    }
    canMove(target: Cell): boolean {
        if (!super.canMove(target)) return false;

        if (this.cell.isEmptyDiagonal(target)) {
            return true;
        }

        return false;
    }
}
