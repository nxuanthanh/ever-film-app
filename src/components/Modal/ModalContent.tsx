import { ReactNode, useRef } from 'react';
import { CgClose } from 'react-icons/cg';
interface ModalContentProps {
  onClose: Function;
  children: ReactNode;
}

export function ModalContent({ onClose, children }: ModalContentProps) {
  const contentRef = useRef<any>(null);

  const closeModal = () => {
    if (onClose) onClose();
  };

  return (
    <div ref={contentRef} className="">
      <div className="absolute top-6 right-6 text-white cursor-pointer mt" onClick={closeModal}>
        <CgClose size={24} />
      </div>
      {children}
    </div>
  );
}
