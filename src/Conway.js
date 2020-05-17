import React, { useState, useCallback, memo, useMemo } from 'react'

import Cell from './Cell';

import { getLiveNeighboursCount, composeClassNames } from './utils';

import './style.css';

const Conway = ({ rowSize = 30, colSize = 30, sideWidth = 600, timeSlot = 50, className }) => {
  const [rows, setRows] = useState(Array(rowSize).fill(0).map(() => Array(colSize).fill(false)));
  const [intervalId, setIntervalId] = useState(null);

  const handleSelect = useCallback(({ rowIndex, colIndex, isLive }) => {
    if (intervalId) return;
    setRows(prevRows => {
      const accumRows = [...prevRows];
      accumRows[rowIndex][colIndex] = isLive;
      return accumRows;
    });
  }, [intervalId]);

  const handleNext = useCallback(() => {
    if (intervalId) return;
    setRows(prevRows => {
      const accumPrevRows = prevRows.map((col, rowIndex) => {
        return col.map((isLive, colIndex) => {
          const liveNeighboursCount = getLiveNeighboursCount(rowIndex, colIndex, prevRows);
          if (!isLive) {
            return liveNeighboursCount === 3;
          } else {
            return liveNeighboursCount === 2 || liveNeighboursCount === 3;
          }
        });
      });

      return accumPrevRows;
    });
  }, [intervalId]);

  const handleStart = useCallback(() => {
    const intervalId = setInterval(handleNext, timeSlot);
    setIntervalId(intervalId);
  }, [handleNext, timeSlot]);

  const handleStop = useCallback(() => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
  }, [intervalId]);

  const handleClear = useCallback(() => {
    if (intervalId) return;
    setRows(Array(rowSize).fill(0).map(() => Array(colSize).fill(false)));
  }, [intervalId, rowSize, colSize]);

  const composeClassName = useMemo(() => composeClassNames(className), [className]);

  return (
    <div className={`conway${composeClassName()}`}>
      <div className="conway_table" style={{ height: sideWidth, width: sideWidth }}>
        {rows.map((col, rowIndex) => (
          <div className={`conway_row${composeClassName('row', 'okay')}`} key={rowIndex}>
            {col.map((isLive, colIndex) => (
              <Cell
                key={colIndex}
                isLive={isLive}
                rowIndex={rowIndex}
                colIndex={colIndex}
                onSelect={handleSelect}
                height={sideWidth / rowSize}
                width={sideWidth / colSize}
                className={className}
              />
            ))}
          </div>
        ))}
      </div>
      <div className={`conway_buttonContainer${composeClassName('buttonContainer')}`}>
        <button type="button" onClick={handleNext} disabled={intervalId}>NEXT</button>
        <button type="button" onClick={handleStart}>START</button>
        <button type="button" onClick={handleStop} disabled={!intervalId}>STOP</button>
        <button type="button" onClick={handleClear} disabled={intervalId}>CLEAR</button>
      </div>
    </div>
  );
};

export default memo(Conway);
