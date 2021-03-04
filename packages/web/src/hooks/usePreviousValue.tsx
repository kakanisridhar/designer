import React from 'react';

function usePreviousValue<T>(value: T): T {
  const refPrevious = React.useRef(value);
  const refCurrent = React.useRef(value);

  if (refPrevious.current !== refCurrent.current) {
    refPrevious.current = refCurrent.current;
  }

  if (refCurrent.current !== value) {
    refCurrent.current = value;
  }

  return refPrevious.current;
}

export default usePreviousValue;
