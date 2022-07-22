import React from "react";

import Card from "@components/common/card/card2";

function useOutsideAlerter(ref: React.MutableRefObject<unknown>, click: (ev: MouseEvent) => void) {
  React.useEffect(() => {
    // Bind the event listener
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !(ref as any).current.contains(event.target)) {
        click(event);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}

export interface ModalProps {
  open: boolean;
  setModal: Function;
}

export const Modal: React.FunctionComponent<React.PropsWithChildren<any>> = ({
  children,
  open,
  setModal,
}) => {
  const wrapperRef = React.useRef(null);

  const handleClickOutside = () => {
    console.log("click outside");
    open && setModal(false);
  };

  useOutsideAlerter(wrapperRef, handleClickOutside);

  if (!open) return null;

  return (
    <>
      <div
        id="defaultModal"
        className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full justify-center items-center flex bg-black/30"
        aria-modal="true"
        role="dialog"
      >
        <div className="relative p-4 w-full max-w-2xl h-full md:h-auto" ref={wrapperRef}>
          <div className="relative  rounded-lg shadow">
            <Card className="flex items-center p-6 space-x-2 rounded-b bg-darkblue rounded-xl p-4">
              {children}
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
