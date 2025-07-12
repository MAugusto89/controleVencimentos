import { 
  collection, addDoc, getDocs, deleteDoc, doc, updateDoc, Timestamp 
} from "firebase/firestore";
import { useState, useEffect } from "react";
import { db } from "./firebase";
import ProductForm from "./components/ProductForm";
import Home from "./pages/Home";

export default function Admin() {
  const [products, setProducts] = useState([]);

  async function fetchProducts() {
    const snapshot = await getDocs(collection(db, "produtos"));
    const list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setProducts(list);
  }

  async function handleAdd(product) {
    await addDoc(collection(db, "produtos"), {
      ...product,
      quantidade: Number(product.quantidade),
    });
    fetchProducts();
  }

  async function handleDelete(id) {
    try {
      await deleteDoc(doc(db, "produtos", id));
      fetchProducts();
    } catch (error) {
      alert("Erro ao excluir produto: " + error.message);
    }
  }

  // Função para confirmar perda de produto e salvar no Firestore
  async function confirmarPerda(produto, quantidadePerdida) {
    try {
      if (!quantidadePerdida || quantidadePerdida <= 0) {
        alert("Quantidade de perda deve ser maior que zero.");
        return;
      }

      if (quantidadePerdida > produto.quantidade) {
        alert("Quantidade de perda não pode ser maior que a quantidade disponível.");
        return;
      }

      // Adiciona documento na coleção 'perdas'
      await addDoc(collection(db, "perdas"), {
        produtoId: produto.id,
        nome: produto.nome,
        quantidadePerdida,
        dataConfirmacao: Timestamp.now(),
      });

      // Atualiza a quantidade do produto na coleção 'produtos'
      const produtoRef = doc(db, "produtos", produto.id);
      const novaQuantidade = (produto.quantidade || 0) - quantidadePerdida;
      await updateDoc(produtoRef, {
        quantidade: novaQuantidade >= 0 ? novaQuantidade : 0,
      });

      // Atualiza a lista local de produtos
      fetchProducts();

      alert("Perda confirmada com sucesso!");
    } catch (error) {
      alert("Erro ao confirmar perda: " + error.message);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <header className="bg-blue-600 text-white p-4 shadow-md">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-semibold">Controle de Vencimentos</h1>
        </div>
      </header>

      <main className="pt-6 px-4 max-w-5xl mx-auto space-y-6">
        <section className="bg-white p-6 rounded-xl shadow">
          <ProductForm onAdd={handleAdd} />
        </section>

        <section className="bg-white p-6 rounded-xl shadow">
          {/* Passa a função confirmarPerda para o componente Home */}
          <Home 
            products={products} 
            onDelete={handleDelete} 
            onConfirmarPerda={confirmarPerda} 
          />
        </section>
      </main>
    </div>
  );
}
