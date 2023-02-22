import { Colors } from './../Colors';
import logo from "../../assets/white-rook.png";
import { Cell } from '../Cell';

export enum FigureNames {
    FIGURE = "",
    KING = 'king',
    KNIGHT = 'knight',
    PAWN = 'pawn',
    QUEEN = 'queen',
    ROOK = "rook",
    BISHOP = "bishop"
}

export class Figure {
    color: Colors;
    logo: typeof logo | null;
    cell: Cell;
    name: FigureNames;
    id: number;

    constructor(color: Colors, cell: Cell) {
        this.color = color;
        this.cell = cell;
        this.cell.figure = this;
        this.logo = null;
        this.name = FigureNames.FIGURE;
        this.id = Math.random();
    }

    canMove(target: Cell) : boolean {
        if (target.figure?.color === this.color) {
            return false;
        }

        return true;
    }

    moveFigure(target: Cell) {}

    canAttack(target: Cell): boolean {
        return this.canMove(target);
    }
}
