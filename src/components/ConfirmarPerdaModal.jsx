import React, { useState, useEffect } from "react";

export default function ConfirmarPerdaModal({ produto, isOpen, onClose, onConfirm }) {
  const [quantidade, setQuantidade] = useState("");

  useEffect(() => {
    if (isOpen) {
      setQuantidade("");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  function handleConfirm() {
    const q = Number(quantidade);
    if (isNaN(q) || q <= 0) {
      alert("Informe uma quantidade válida maior que zero.");
      return;
    }
    if (q > produto.quantidade) {
      alert("Quantidade maior que a disponível.");
      return;
    }
    onConfirm(q);
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-80 shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Confirmar perda</h2>
        <p className="mb-2">
          Produto: <strong>{produto.nome}</strong>
        </p>
        <p className="mb-4">Quantidade disponível: {produto.quantidade}</p>
        <input
          type="number"
          min="1"
          max={produto.quantidade}
          value={quantidade}
          onChange={(e) => setQuantidade(e.target.value)}
          placeholder="Quantidade perdida"
          className="border border-gray-300 rounded px-3 py-2 w-full mb-4"
        />
        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
          >
            Cancelar
          </button>
          <button
            onClick={handleConfirm}
            className="px-4 py-2 rounded bg-yellow-500 text-white hover:bg-yellow-600"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}
