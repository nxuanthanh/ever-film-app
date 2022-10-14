import { ReactNode } from 'react';
import { CgClose } from 'react-icons/cg';
interface ModalContentProps {
  children: ReactNode;
}

export function ModalContent({ children }: ModalContentProps) {
  const handlePropagation = (event: React.MouseEvent<HTMLDivElement>) => {
    event?.stopPropagation();
  };

  return (
    <>
      <div className="absolute top-6 right-6 text-white cursor-pointer">
        <CgClose size={24} />
      </div>
      <div onClick={handlePropagation}>{children}</div>
    </>
  );
}
