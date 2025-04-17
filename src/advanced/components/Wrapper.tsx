import { ReactNode } from 'react';

interface PropType {
  children: ReactNode;
}

function Wrapper({ children }: PropType) {
  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8">{children}</div>
  );
}

export default Wrapper;
