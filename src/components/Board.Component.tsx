import React, { FC, useEffect, useState } from "react";
import { Board } from "../models/Board";
import { Cell } from "../models/Cell";
import { FigureNames } from "../models/figures/Figure";
import { Player } from "../models/Player";
import CellComponent from "./Cell.Component";

interface BoardProps {
    board: Board;
    setBoard: (board: Board) => void;
    currentPlayer: Player | null;
    swapPlayer: () => void;
}

const BoardComponent: FC<BoardProps> = ({
    board,
    setBoard,
    currentPlayer,
    swapPlayer
}) => {
    const [selectedCell, setSelectedCell] = useState<Cell | null>(null);

    useEffect(() => {
        highlightCells();
    }, [selectedCell]);

    function click(cell: Cell) {
        //after click on empty cell clear selected cell
        if (
            cell === selectedCell ||
            (cell.figure === null && !selectedCell?.figure?.canMove(cell))
        ) {
            setSelectedCell(null);
        }
        //move figure
        else if (
            selectedCell &&
            selectedCell !== cell &&
            selectedCell?.figure?.canMove(cell)
        ) {
            selectedCell.moveFigure(cell);
            swapPlayer();
            setSelectedCell(null);
        }
        //select cell
        else if (cell.figure && cell.figure.color === currentPlayer?.color) {
            setSelectedCell(cell);
        }
    }

    function highlightCells() {
        board.highlightCells(selectedCell);
        updateBoard();
    }

    function updateBoard() {
        const newBoard = board.getCopyBoard();
        setBoard(newBoard);
    }

    return (
        <div className="chessboard--container">
            <h2>Current Player - {currentPlayer?.color}</h2>
            <div className="chessboard">
                {board.cells.map((row, index) => (
                    <React.Fragment key={index}>
                        {row.map((cell) => (
                            <CellComponent
                                key={cell.id}
                                cell={cell}
                                selected={selectedCell?.id === cell.id}
                                click={click}
                                isUnderAttack={
                                    !!currentPlayer &&
                                    currentPlayer.color ===
                                        cell.figure?.color &&
                                    currentPlayer.kingIsUnderAttack &&
                                    cell.figure.name === FigureNames.KING
                                }
                            />
                        ))}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};

export default BoardComponent;
