import React, { useState, useEffect } from "react";
import AdicionarProduto from "./AdicionarProduto";
import Home from "./Home";
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";

export default function Dashboard() {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const snapshot = await getDocs(collection(db, "produtos"));
    const lista = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setProducts(lista);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAdd = async (novoProduto) => {
    await addDoc(collection(db, "produtos"), novoProduto);
    fetchProducts(); // atualiza lista após adicionar
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "produtos", id));
    fetchProducts(); // atualiza lista após excluir
  };

  return (
    <div>
      <AdicionarProduto onAdd={handleAdd} />
      <Home products={products} onDelete={handleDelete} />
    </div>
  );
}
