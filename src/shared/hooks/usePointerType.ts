/** Handy hook for checking if the device has a pointer or not **/

import { useEffect, useState } from 'react';

export const usePointerType = () => {
  const [hasPointer, setHasPointer] = useState(false);

  useEffect(() => {
    const checkPointerType = () => {
      const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
      const hasHover = window.matchMedia('(hover: hover)').matches;
      setHasPointer(hasFinePointer && hasHover);
    };

    checkPointerType();

    const finePointerQuery = window.matchMedia('(pointer: fine)');
    const hoverQuery = window.matchMedia('(hover: hover)');

    finePointerQuery.addEventListener('change', checkPointerType);
    hoverQuery.addEventListener('change', checkPointerType);

    return () => {
      finePointerQuery.removeEventListener('change', checkPointerType);
      hoverQuery.removeEventListener('change', checkPointerType);
    };
  }, []);

  return { hasPointer, isTouchDevice: !hasPointer };
};
