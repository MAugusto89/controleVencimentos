import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";
import dayjs from "dayjs";

const COLORS = ["#3b82f6", "#f59e0b", "#10b981", "#ef4444", "#6366f1", "#8b5cf6"];

export default function ExpiryChart({ products }) {
  const now = dayjs();
  const nextMonth = now.add(1, "month");

  // Filtra produtos com vencimento no mês atual ou no próximo
  const produtos = products.filter(p => {
    const data = dayjs(p.vencimento);
    return data.isValid() && (data.isSame(now, "month") || data.isSame(nextMonth, "month"));
  });

  // Agrupa produtos por nome e soma quantidades
  const agrupados = produtos.reduce((acc, prod) => {
    const nome = prod.nome;
    acc[nome] = (acc[nome] || 0) + (Number(prod.quantidade) || 0);
    return acc;
  }, {});

  // Converte para formato que o gráfico entende
  const data = Object.entries(agrupados)
    .map(([nome, quantidade]) => ({ name: nome, quantidade }))
    .sort((a, b) => b.quantidade - a.quantidade);

  if (data.length === 0) {
    return (
      <div className="w-full text-center text-gray-500 py-6">
        Nenhum produto vence este mês ou no próximo.
      </div>
    );
  }

  return (
    <div className="w-full h-72">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis allowDecimals={false} />
          <Tooltip formatter={(value) => [`${value} unidades`, "Quantidade"]} />
          <Legend />
          <Bar dataKey="quantidade" fill="#3b82f6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
