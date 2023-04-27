import { RefObject, useEffect } from "react";

export default function useOnClickOutside(
  ref: RefObject<HTMLDivElement>,
  handler: (e: boolean) => void,
  refBtn: RefObject<HTMLButtonElement>
) {
  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (
        event.target instanceof Node &&
        !ref.current?.contains(event?.target) &&
        !refBtn.current?.contains(event.target)
      ) {
        handler(false);
      }
    }

    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [ref, handler]);
}
