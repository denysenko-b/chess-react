import { Figure, FigureNames } from './figures/Figure';
import { Knight } from "./figures/Knight";
import { Rook } from "./figures/Rook";
import { Pawn } from "./figures/Pawn";
import { King } from "./figures/King";
import { Queen } from "./figures/Queen";
import { Colors } from "./Colors";
import { Cell } from "./Cell";
import { Bishop } from "./figures/Bishop";
import { Player } from './Player';
export class Board {
    cells: Cell[][] = [];
    lostBlackFigures: Figure[] = [];
    lostWhiteFigures: Figure[] = [];

    public initCells() {
        for (let i = 0; i < 8; i++) {
            const row: Cell[] = [];

            for (let j = 0; j < 8; j++) {
                if ((i + j) % 2 !== 0) {
                    row.push(new Cell(this, j, i, Colors.BLACK, null)); //black
                } else {
                    row.push(new Cell(this, j, i, Colors.WHITE, null)); //white
                }
            }

            this.cells.push(row);
        }
    }

    public addFigures() {
        this.fillFiguresLines(Colors.WHITE);
        this.fillFiguresLines(Colors.BLACK);
    }

    private fillFiguresLines(color: Colors) {
        new Rook(color, this.getCell(0, color === Colors.BLACK ? 0 : 7));
        new Knight(color, this.getCell(1, color === Colors.BLACK ? 0 : 7));
        new Bishop(color, this.getCell(2, color === Colors.BLACK ? 0 : 7));
        new Queen(color, this.getCell(3, color === Colors.BLACK ? 0 : 7));
        new King(color, this.getCell(4, color === Colors.BLACK ? 0 : 7));
        new Bishop(color, this.getCell(5, color === Colors.BLACK ? 0 : 7));
        new Knight(color, this.getCell(6, color === Colors.BLACK ? 0 : 7));
        new Rook(color, this.getCell(7, color === Colors.BLACK ? 0 : 7));

        for (let i = 0; i < 8; i++) {
            new Pawn(color, this.getCell(i, color === Colors.BLACK ? 1 : 6));
        }
    }

    public getCell(x: number, y: number) : Cell {
        return this.cells[y][x];
    }

    public highlightCells(selectedCell: Cell | null) {
        for (let i = 0; i < this.cells.length; i++) {
            const row = this.cells[i];
            for (let j = 0; j < row.length; j++) {
                const target = row[j];
                target.avaliable = !!selectedCell?.figure?.canMove(target);
            }
        }
    }

    public getCopyBoard(): Board {
        const newBoard = new Board();
        newBoard.cells = this.cells;
        newBoard.lostBlackFigures = this.lostBlackFigures;
        newBoard.lostWhiteFigures = this.lostWhiteFigures;
        return newBoard;
    }

    public checkKingIsUnderAttack(player: Player | null) : boolean {
        const kingCell = this.getKingCell(player);

        return !!kingCell?.figure && kingCell?.isUnderAttack(kingCell, kingCell.figure?.color);
    }

    private getKingCell(player: Player | null) : Cell | null {
        for (let i = 0; i < this.cells.length; i++) {
            const row = this.cells[i];
            for (let j = 0; j < row.length; j++) {
                const target = row[j];
                if (target?.figure?.name === FigureNames.KING && target?.figure?.color === player?.color) {
                    return target;
                }
            }
        }
        return null;
    }
}
