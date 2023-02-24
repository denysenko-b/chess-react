import { Cell } from "./../Cell";
import { Colors } from "./../Colors";
import { Figure, FigureNames } from "./Figure";

import logo from "../../assets/bishop.svg";

export class Queen extends Figure {
    constructor(color: Colors, cell: Cell) {
        super(color, cell);
        this.logo = logo;
        this.name = FigureNames.QUEEN;
    }
    canMove(target: Cell): boolean {
        if (!super.canMove(target)) return false;

        if (
            this.cell.isEmptyVertical(target) ||
            this.cell.isEmptyHoryzontal(target) ||
            this.cell.isEmptyDiagonal(target)
        ) {
            return true;
        }

        return false;
    }
}
