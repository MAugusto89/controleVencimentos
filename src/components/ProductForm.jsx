import { useState } from "react";
import "./Components.css";

export default function ProductForm({ handleSubmit, handleChange, onAdd }) {
  const [product, setProduct] = useState({
    nome: "",
    quantidade: 0,
    vencimento: "",
    local: "Depósito",
  });

  function handleChange(e) {
    setProduct({ ...product, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAdd({ ...product, id: Date.now() });
    setProduct({ nome: "", quantidade: 0, vencimento: "", local: "Depósito" });
  }

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h2 className="form-title">Cadastrar Produto</h2>

      <div className="form-grid">
        <input
          name="nome"
          placeholder="Nome"
          value={product.nome}
          onChange={handleChange}
          required
          className="form-input"
        />
        <input
          name="quantidade"
          type="number"
          value={product.quantidade}
          onChange={handleChange}
          required
          className="form-input"
        />
      </div>

      <div className="form-grid">
        <input
          name="vencimento"
          type="date"
          value={product.vencimento}
          onChange={handleChange}
          required
          className="form-input"
        />
        <select
          name="local"
          value={product.local}
          onChange={handleChange}
          className="form-input"
        >
          <option>Depósito</option>
          <option>Área</option>
        </select>
      </div>

      <div className="form-button-container">
        <button type="submit" className="form-button">
          Cadastrar
        </button>
      </div>
    </form>
  );
};