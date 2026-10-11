import React from 'react';
import type { Plant } from '../types/plant';
import { AlertTriangle, Trash2, X } from 'lucide-react';

interface DeleteConfirmModalProps {
  plant: Plant | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  plant,
  isOpen,
  onClose,
  onConfirm,
}) => {
  if (!isOpen || !plant) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
      <div className="relative w-full max-w-md bg-gray-800 border border-gray-700 rounded-xl shadow-2xl p-6 animate-in fade-in zoom-in-95 duration-150">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-gray-400 hover:text-gray-200 hover:bg-gray-700 rounded-lg transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-start gap-4">
          <div className="p-3 bg-red-950/60 border border-red-800/80 rounded-xl text-red-400 flex-shrink-0">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-bold text-gray-100 mb-1">
              株データを削除しますか？
            </h3>
            <p className="text-xs text-gray-400 mb-3">
              この操作は取り消せません。LocalStorageから完全に削除されます。
            </p>
            <div className="p-3 bg-gray-900 border border-gray-700 rounded-lg text-xs space-y-1">
              <div>
                <span className="text-gray-500">管理ID:</span>{' '}
                <span className="font-mono font-semibold text-emerald-400">{plant.id}</span>
              </div>
              <div>
                <span className="text-gray-500">植物名:</span>{' '}
                <span className="font-medium text-gray-200">{plant.name}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-gray-300 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
          >
            キャンセル
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="px-4 py-2 text-xs font-medium text-white bg-red-600 hover:bg-red-500 rounded-lg transition-colors flex items-center gap-1.5 shadow-md shadow-red-950"
          >
            <Trash2 className="w-3.5 h-3.5" />
            削除を実行する
          </button>
        </div>
      </div>
    </div>
  );
};
