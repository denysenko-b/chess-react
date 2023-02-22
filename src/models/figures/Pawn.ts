import { Cell } from "./../Cell";
import { Colors } from "./../Colors";
import { Figure, FigureNames } from "./Figure";

import blackLogo from "../../assets/black-pawn.png";
import whiteLogo from "../../assets/white-pawn.png";

export class Pawn extends Figure {
    isFirstStep: boolean = true;
    waitForChange: boolean = false;

    constructor(color: Colors, cell: Cell) {
        super(color, cell);
        this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
        this.name = FigureNames.PAWN;
    }

    canMove(target: Cell): boolean {
        if (!super.canMove(target)) return false;

        const direction = this.cell.figure?.color === Colors.BLACK ? 1 : -1;

        if (
            ((target.y === this.cell.y + direction ||
                (this.isFirstStep &&
                    target.y === this.cell.y + direction * 2)) &&
                target.x === this.cell.x &&
                !this.cell.hasFigure(target.x, target.y)) ||
            (this.canAttack(target) && this.cell.hasFigure(target.x, target.y))
        ) {
            return true;
        }

        return false;
    }

    canAttack(target: Cell): boolean {
        const direction = this.cell.figure?.color === Colors.BLACK ? 1 : -1;

        if (
            target.y === this.cell.y + direction &&
            (target.x === this.cell.x + 1 || target.x === this.cell.x - 1)
        ) {
            return true;
        }

        return false;
    }

    moveFigure(target: Cell): void {
        super.moveFigure(target);
        this.isFirstStep = false;

        this.waitForChange = this.cell.figure?.color === Colors.BLACK ? this.cell.y === 7 : this.cell.y === 0;
    }
}
