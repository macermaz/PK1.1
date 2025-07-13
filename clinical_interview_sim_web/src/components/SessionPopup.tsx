import React, { ReactNode } from 'react';
import { FiPlusCircle, FiFileText, FiXCircle, FiHome } from 'react-icons/fi';

interface Props {
  open: boolean;
  onClose: () => void;
  onNewSession: () => void;
  onDxTool: () => void;
  onCancel: () => void;
  onMenu: () => void;
}

export const SessionPopup = ({
  open,
  onClose,
  onNewSession,
  onDxTool,
  onCancel,
  onMenu,
}: Props) => {
  if (!open) return null;

  const Btn = ({
    icon,
    children,
    onClick,
  }: {
    icon: ReactNode;
    children: ReactNode;
    onClick: () => void;
  }) => (
    <button
      onClick={onClick}
      className="flex w-full items-center gap-3 bg-indigo-50 hover:bg-indigo-100 px-4 py-3 rounded-lg text-indigo-700 font-medium"
    >
      {icon}
      {children}
    </button>
  );

  return (
    <div className="fixed inset-0 bg-black/40 z-40 flex items-end justify-center sm:items-center">
      <div className="bg-white w-full sm:max-w-sm p-4 rounded-t-2xl sm:rounded-2xl shadow-lg space-y-3 animate-slide-up">
        <Btn icon={<FiPlusCircle size={18} />} onClick={onNewSession}>
          Nueva cita
        </Btn>
        <Btn icon={<FiFileText size={18} />} onClick={onDxTool}>
          Herramienta Diagnóstico
        </Btn>
        <Btn icon={<FiXCircle size={18} />} onClick={onCancel}>
          Cancelar sesión
        </Btn>
        <Btn icon={<FiHome size={18} />} onClick={onMenu}>
          Menú principal
        </Btn>

        <button
          onClick={onClose}
          className="w-full text-center text-sm text-gray-500 pt-2"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};
