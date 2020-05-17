import React, { memo, useCallback, useMemo } from 'react';
import { composeClassNames } from './utils';
import './style.scss';

const Cell = ({
  isLive,
  onSelect,
  rowIndex,
  colIndex,
  height,
  width,
  className
}) => {
  const handleClick = useCallback(() => {
    onSelect({
      rowIndex,
      colIndex,
      isLive: !isLive
    });
  }, [isLive, onSelect, rowIndex, colIndex]);
  const composeClassName = useMemo(() => composeClassNames(className), [className]);
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: `conway_cell${isLive ? ' conway_cell__live' : ''}${composeClassName('cell', isLive && 'live')}`,
    onClick: handleClick,
    style: {
      width,
      height
    }
  });
};

export default memo(Cell);