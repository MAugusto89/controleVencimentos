import React from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";

export default function AdicionarProduto() {
  async function handleAddProduct() {
    try {
      const docRef = await addDoc(collection(db, "produtos"), {
        nome: "Sabonete",
        validade: "2025-12-31",
        quantidade: 10
      });
      alert("Produto adicionado com ID: " + docRef.id);
    } catch (e) {
      alert("Erro ao adicionar produto: " + e.message);
    }
  }

  return (
    <div>
      <button onClick={handleAddProduct}>Adicionar Produto</button>
    </div>
  );
}
