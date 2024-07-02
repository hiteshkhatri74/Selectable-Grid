import React from 'react';
import { useState, useCallback } from "react";

const SelectableGrid = ({rows,cols}) => {
    const [isMouseDown, setIsMouseDown] = useState(false);
    const [selectedBoxes, setSelectedBoxes] = useState([]);

    const handleMouseDown = (boxNumber) => {
        setIsMouseDown(true);
        setSelectedBoxes([boxNumber]);
    }

    const handleMouseUp = () => {
        setIsMouseDown(false);
    }

    const handleMouseEnter = useCallback(
        (boxNumber) => {
            if(isMouseDown){
                const startBox = selectedBoxes[0];
                const endBox = boxNumber;

                const startRow = Math.floor((startBox - 1) / cols);
                const startCol = (startBox - 1) % cols;

                const endRow = Math.floor((endBox - 1) / cols);
                const endCol = (endBox - 1) % cols;

                const minRow = Math.min(startRow, endRow);
                const maxRow = Math.max(startRow, endRow);

                const minCol = Math.min(startCol, endCol);
                const maxCol = Math.max(startCol, endCol);

                const selected = [];
                for(let row = minRow;row <= maxRow;row++){
                    for(let col = minCol;col <= maxCol;col++){
                        selected.push(row * cols +col + 1);
                    }
                }

                setSelectedBoxes(selected);
            }
        },
        [isMouseDown]
    )

  return (
    <div 
         className='grid'
         style={{"--rows": rows, "--cols":cols}}
         onMouseUp={handleMouseUp}
    >
      {
        [...Array(rows * cols).keys()].map((i) => (
            <div
                 key={i}
                 className={`box ${selectedBoxes.includes(i+1) ? "selected":""}`}
                 onMouseDown={() => handleMouseDown(i+1)}
                 onMouseEnter={() => handleMouseEnter(i+1)}
            >
                { i+1 }
            </div>
        ))
      }
    </div>
  );
};

export default SelectableGrid;
