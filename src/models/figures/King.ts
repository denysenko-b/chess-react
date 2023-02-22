import { Cell } from "./../Cell";
import { Colors } from "./../Colors";
import { Figure, FigureNames } from "./Figure";

import blackLogo from "../../assets/black-king.png";
import whiteLogo from "../../assets/white-king.png";

export class King extends Figure {

    isBeenUnderAttack: boolean = false;

    constructor(color: Colors, cell: Cell) {
        super(color, cell);
        this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
        this.name = FigureNames.KING;
    }
    canMove(target: Cell): boolean {
        if (!super.canMove(target)) return false;

        for (let dx = 0; dx < 3; dx++) {
            for (let dy = 0; dy < 3; dy++) {
                if (dx === 1 && dy === 1) {
                    continue;
                }
                if (
                    target.x === this.cell.x - 1 + dx &&
                    target.y === this.cell.y - 1 + dy &&
                    !this.cell.isUnderAttack(target, this.color)
                ) {
                    return true;
                }
            }
        }

        return false;
    }

    canAttack(target: Cell): boolean {
        if (!super.canMove(target)) return false;

        for (let dx = 0; dx < 3; dx++) {
            for (let dy = 0; dy < 3; dy++) {
                if (dx === 1 && dy === 1) {
                    continue;
                }
                if (
                    target.x === this.cell.x - 1 + dx &&
                    target.y === this.cell.y - 1 + dy
                ) {
                    return true;
                }
            }
        }

        return false;
    }
}
