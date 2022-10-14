import { ReactNode } from 'react';
import { ModalContent } from './ModalContent';

interface ModalProps {
  id: string;
  onClose: any;
  children: ReactNode;
}

function Modal({ id, onClose, children }: ModalProps) {
  return (
    <div
      id={id}
      onClick={onClose}
      className="fixed flex items-center justify-center w-full h-full inset-0 bg-[#0a0a0adb] z-20"
    >
      <ModalContent>{children}</ModalContent>
    </div>
  );
}

export default Modal;
