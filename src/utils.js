export const getLiveNeighboursCount = (rowIndex, colIndex, currentRows) => {
  let count = 0;
  const nextNeighb = (colIndex + 1) === currentRows[0].length ? false : currentRows[rowIndex][colIndex + 1];
  if (nextNeighb) count++;
  const prevNeighb = !~(colIndex - 1) ? false : currentRows[rowIndex][colIndex - 1];
  if (prevNeighb) count++;
  if (~(rowIndex - 1)) {
    const topNeighb = currentRows[rowIndex - 1][colIndex];
    if (topNeighb) count++;
    const topNextNeighb = (colIndex + 1) === currentRows[0].length ? false : currentRows[rowIndex - 1][colIndex + 1];
    if (topNextNeighb) count++;
    const topPrevNeighb = !~(colIndex - 1) ? false : currentRows[rowIndex - 1][colIndex - 1];
    if (topPrevNeighb) count++;
  }
  if ((rowIndex + 1) !== currentRows.length) {
    const bottomNeighb = currentRows[rowIndex + 1][colIndex];
    if (bottomNeighb) count++;
    const bottomNextNeighb = (colIndex + 1) === currentRows.length ? false : currentRows[rowIndex + 1][colIndex + 1];
    if (bottomNextNeighb) count++;
    const bottomPrevNeighb = !~(colIndex - 1) ? false : currentRows[rowIndex + 1][colIndex - 1];
    if (bottomPrevNeighb) count++;
  }

  return count;
};

const generateKey = (...keys) => keys.join('_');

export const composeClassNames = (className) => {
  const cachedResult = new Map();
  let result = '';
  if (!className || typeof className !== 'string') return () => '';
  const correctClassName = className.split(' ')[0];

  return (elem = '', mod = '') => {
    const key = generateKey(elem, mod);
    if (cachedResult.has(key)) {
      return cachedResult.get(key);
    }

    result = ` ${correctClassName}`;
    if (!elem || typeof elem !== 'string') return result;
    result += `_${elem}`;
    if (!mod || typeof mod !== 'string') return result;
    result += ` ${correctClassName}_${elem}__${mod}`;

    cachedResult.set(key, result);

    return result;
  };
};
