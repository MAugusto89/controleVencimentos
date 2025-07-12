import "./Pages.css";
import ExpiryChart from "../components/ExpiryChart";
import dayjs from "dayjs";
import { useState } from "react";
import ConfirmarPerdaModal from "../components/ConfirmarPerdaModal";

export default function Home({ products, onDelete, onConfirmarPerda }) {
  const deposito = products.filter(p => p.local === "Depósito");
  const area = products.filter(p => p.local === "Área");
  const vencidos = products.filter(p => {
    const data = dayjs(p.vencimento);
    return data.isValid() && data.isBefore(dayjs(), "day");
  });

  const [modalProduto, setModalProduto] = useState(null);

  function abrirModal(produto) {
    setModalProduto(produto);
  }

  function fecharModal() {
    setModalProduto(null);
  }

  function confirmarPerdaModal(quantidadePerdida) {
    if (modalProduto) {
      onConfirmarPerda(modalProduto, quantidadePerdida);
      fecharModal();
    }
  }

  return (
    <div className="home-container">
      <h2 className="home-title">Resumo</h2>

      <div className="home-card">
        <ExpiryChart products={products} />
      </div>

      <div className="home-card alert-card">
        <h3 className="home-card-title text-red-600">Produtos Vencidos</h3>
        {vencidos.length > 0 ? (
          <ul className="product-list">
            {vencidos.map(p => (
              <li key={p.id} className="product-item flex justify-between items-center">
                <div>
                  {p.nome} - {Number(p.quantidade)} (vencido em{" "}
                  {dayjs(p.vencimento).format("DD/MM/YYYY")})
                </div>
                <button
                  className="ml-4 bg-yellow-500 text-white px-3 py-1 rounded"
                  onClick={() => abrirModal(p)}
                >
                  Confirmar Perda
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">Nenhum produto vencido.</p>
        )}
      </div>

      <div className="home-grid">
        <div className="home-card">
          <h3 className="home-card-title">Depósito</h3>
          <ul className="product-list">
            {deposito.map(p => (
              <li key={p.id} className="product-item">
                {p.nome} - {Number(p.quantidade)}
              </li>
            ))}
          </ul>
        </div>

        <div className="home-card">
          <h3 className="home-card-title">Área</h3>
          <ul className="product-list">
            {area.map(p => (
              <li key={p.id} className="product-item">
                {p.nome} - {Number(p.quantidade)}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Modal */}
      {modalProduto && (
        <ConfirmarPerdaModal
          produto={modalProduto}
          isOpen={!!modalProduto}
          onClose={fecharModal}
          onConfirm={confirmarPerdaModal}
        />
      )}
    </div>
  );
}
