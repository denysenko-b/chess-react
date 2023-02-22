import { Player } from "./Player";
import { Board } from "./Board";
import { Figure, FigureNames } from "./figures/Figure";
import { Colors } from "./Colors";

export class Cell {
    readonly x: number;
    readonly y: number;
    readonly color: Colors;

    figure: Figure | null;

    board: Board;
    avaliable: boolean;
    id: string;

    constructor(
        board: Board,
        x: number,
        y: number,
        color: Colors,
        figure: Figure | null
    ) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.board = board;
        this.figure = figure;
        this.id = "" + x + y;
        this.avaliable = false;
    }

    addLostFigure(figure: Figure) {
        if (figure.color === Colors.BLACK) {
            this.board.lostBlackFigures.push(figure);
        } else {
            this.board.lostWhiteFigures.push(figure);
        }
    }

    moveFigure(target: Cell) {
        if (this?.figure?.canMove(target)) {
            this.figure.moveFigure(target);
            if (target.figure) {
                this.addLostFigure(target.figure);
            }
            target.setFigure(this.figure);
            this.figure = null;
        }
    }

    private setFigure(figure: Figure) {
        this.figure = figure;
        this.figure.cell = this;
    }

    hasFigure(x: number, y: number): boolean {
        return this.board.getCell(x, y).figure !== null;
    }

    isEmpty(): boolean {
        return this.figure === null;
    }

    isEnemy(target: Cell): boolean {
        return !!target.figure && this.figure?.color !== target.figure?.color;
    }

    isEmptyVertical(target: Cell): boolean {
        if (this.x !== target.x) {
            return false;
        }

        const min = Math.min(this.y, target.y);
        const max = Math.max(this.y, target.y);

        for (let y = min + 1; y < max; y++) {
            const cell = this.board.getCell(this.x, y);
            if (!cell.isEmpty() && cell.figure?.name !== FigureNames.KING) {
                return false;
            }
        }

        return true;
    }

    isEmptyHoryzontal(target: Cell): boolean {
        if (this.y !== target.y) {
            return false;
        }

        const min = Math.min(this.x, target.x);
        const max = Math.max(this.x, target.x);

        for (let x = min + 1; x < max; x++) {
            const cell = this.board.getCell(x, this.y);
            if (!cell.isEmpty() && cell.figure?.name !== FigureNames.KING) {
                return false;
            }
        }

        return true;
    }

    isEmptyDiagonal(target: Cell): boolean {
        const absX = Math.abs(this.x - target.x);
        const absY = Math.abs(this.y - target.y);

        if (absX !== absY) {
            return false;
        }

        const dy = this.y < target.y ? 1 : -1;
        const dx = this.x < target.x ? 1 : -1;

        for (let i = 1; i < absY; i++) {
            const cell = this.board.getCell(this.x + dx * i, this.y + dy * i);
            if (!cell.isEmpty() && cell.figure?.name !== FigureNames.KING) {
                return false;
            }
        }

        return true;
    }

    isUnderAttack(target: Cell, allyColor: Colors): boolean {
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                const figure = this.board.getCell(i, j).figure;
                if (figure?.color !== allyColor && figure?.canAttack(target)) {
                    return true;
                }
            }
        }

        return false;
    }

    // whichCellsIsUnderAttack(target: Cell) : Cell[] {
    //     const cellsUnderAttack: Cell[] = [];

    //     for (let i = 0; i < 8; i++) {
    //         for (let j = 0; j < 8; j++) {
    //             if ()
    //         }
    //     }

    //     return cellsUnderAttack;
    // }
}
