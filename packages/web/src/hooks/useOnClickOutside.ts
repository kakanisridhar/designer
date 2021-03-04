import { useEffect, MutableRefObject } from 'react';

function useOnClickOutside(
  refs: MutableRefObject<HTMLElement>[],
  handler: (evt: globalThis.MouseEvent) => void,
) {
  useEffect(() => {
    const listener = (event: globalThis.MouseEvent) => {
      const clickOnRefs = refs.reduce(
        (acc, ref) =>
          acc || !ref.current || ref.current.contains(event.target as Node),
        false,
      );

      if (clickOnRefs) return;

      handler(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [refs, handler]);
}

export default useOnClickOutside;
