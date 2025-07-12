import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
import dayjs from "dayjs";

const COLORS = ["#3b82f6", "#f59e0b", "#10b981", "#ef4444", "#6366f1", "#8b5cf6"];

export default function ExpiryChart({ products }) {
  const now = dayjs();
  const nextMonth = now.add(1, "month");

  const produtos = products.filter(p => {
    const data = dayjs(p.vencimento);
    return data.isValid() && (data.isSame(now, "month") || data.isSame(nextMonth, "month"));
  });

  const agrupados = produtos.reduce((acc, prod) => {
    const nome = prod.nome;
    acc[nome] = (acc[nome] || 0) + (Number(prod.quantidade) || 0);
    return acc;
  }, {});

  const data = Object.entries(agrupados)
    .map(([nome, quantidade]) => ({ name: nome, value: quantidade }))
    .sort((a, b) => b.value - a.value);

  if (data.length === 0) {
    return (
      <div className="w-full text-center text-gray-500 py-6">
        Nenhum produto vence este mês ou no próximo.
      </div>
    );
  }

  return (
    <div className="w-full h-72">
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={90}
            label={({ name }) => name}
          >
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => [`${value} unidades`, "Produto"]} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
