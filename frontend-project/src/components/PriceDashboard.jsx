import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { TrendingUp, TrendingDown, Minus, Info } from "lucide-react";
import "./PriceDashboard.css";

const PriceDashboard = () => {
  const USD_TO_UYU = 41.5;

  const [products] = useState([
    {
      id: 1,
      name: "Buzo de Unicornio",
      priceUSD: 33,
      priceUYU: 1369.5,
      description:
        "Seleccionado por su alta demanda para dueños de Perros y Gatos. Las búsquedas de 'unicornio' aumentaron 150% en la plataforma durante el último trimestre. Su diseño único y calidad premium lo posicionan como el producto estrella en la categoría infantil.",
      historicalData: [
        { day: 0, priceUSD: 32, priceUYU: 1328 },
        { day: 1, priceUSD: 32.1, priceUYU: 1332.15 },
        { day: 2, priceUSD: 32.4, priceUYU: 1344.6 },
        { day: 3, priceUSD: 32.8, priceUYU: 1361.2 },
        { day: 4, priceUSD: 32.6, priceUYU: 1352.9 },
        { day: 5, priceUSD: 32.9, priceUYU: 1365.35 },
        { day: 6, priceUSD: 33, priceUYU: 1369.5 },
        { day: 7, priceUSD: 33.3, priceUYU: 1381.95 },
        { day: 8, priceUSD: 33.1, priceUYU: 1373.65 },
        { day: 9, priceUSD: 33.5, priceUYU: 1390.25 },
        { day: 10, priceUSD: 33.4, priceUYU: 1386.1 },
      ],
    },
    {
      id: 2,
      name: "Lanzador de Pelotas",
      priceUSD: 22,
      priceUYU: 913,
      description:
        "Elegido por su excelente relación calidad-precio y alta rotación de inventario. Genera 25% de las ventas en la categoría 'mascotas'. Su versatilidad para perros de todas las razas y el aumento de adopciones post-pandemia lo mantienen como producto esencial.",
      historicalData: [
        { day: 0, priceUSD: 22.5, priceUYU: 933.75 },
        { day: 1, priceUSD: 22.4, priceUYU: 929.6 },
        { day: 2, priceUSD: 22.3, priceUYU: 925.45 },
        { day: 3, priceUSD: 22.1, priceUYU: 917.15 },
        { day: 4, priceUSD: 21.9, priceUYU: 908.85 },
        { day: 5, priceUSD: 21.8, priceUYU: 904.7 },
        { day: 6, priceUSD: 22, priceUYU: 913 },
        { day: 7, priceUSD: 22.1, priceUYU: 917.15 },
        { day: 8, priceUSD: 21.9, priceUYU: 908.85 },
        { day: 9, priceUSD: 22, priceUYU: 913 },
        { day: 10, priceUSD: 22.1, priceUYU: 917.15 },
      ],
    },
    {
      id: 3,
      name: "Eukanuba Cachorro Razas Pequeñas",
      priceUSD: 37.6,
      priceUYU: 1560.4,
      description:
        "Incluido por ser líder en el segmento premium de alimento para mascotas. Su precio estable refleja la lealtad de marca y compras recurrentes. Representa el 40% de las ventas en alimentos para cachorros y mantiene un margen de ganancia superior al 35%.",
      historicalData: [
        { day: 0, priceUSD: 37.5, priceUYU: 1556.25 },
        { day: 1, priceUSD: 37.6, priceUYU: 1560.4 },
        { day: 2, priceUSD: 37.5, priceUYU: 1556.25 },
        { day: 3, priceUSD: 37.6, priceUYU: 1560.4 },
        { day: 4, priceUSD: 37.5, priceUYU: 1556.25 },
        { day: 5, priceUSD: 37.6, priceUYU: 1560.4 },
        { day: 6, priceUSD: 37.6, priceUYU: 1560.4 },
        { day: 7, priceUSD: 37.6, priceUYU: 1560.4 },
        { day: 8, priceUSD: 37.6, priceUYU: 1560.4 },
        { day: 9, priceUSD: 37.7, priceUYU: 1564.55 },
        { day: 10, priceUSD: 37.6, priceUYU: 1560.4 },
      ],
    },
  ]);

  const [selectedProduct, setSelectedProduct] = useState(0);

  const calculateGrowthRate = (data) => {
    const firstPrice = data[0].priceUSD;
    const lastPrice = data[data.length - 1].priceUSD;
    return (((lastPrice - firstPrice) / firstPrice) * 100).toFixed(2);
  };

  const getTrend = (data) => {
    const growthRate = calculateGrowthRate(data);
    if (growthRate > 1) return "up";
    if (growthRate < -1) return "down";
    return "stable";
  };

  const currentProduct = products[selectedProduct];
  const growthRate = calculateGrowthRate(currentProduct.historicalData);
  const trend = getTrend(currentProduct.historicalData);

  const getTrendIcon = (trend) => {
    const iconStyle = { width: "20px", height: "20px" };
    switch (trend) {
      case "up":
        return <TrendingUp style={{ ...iconStyle, color: "#10b981" }} />;
      case "down":
        return <TrendingDown style={{ ...iconStyle, color: "#ef4444" }} />;
      default:
        return <Minus style={{ ...iconStyle, color: "#6b7280" }} />;
    }
  };

  return (
    <div className="dashboard-container">
      {/* Header */}
      <div className="dashboard-header">
        <h2 className="dashboard-title">Top 3 Productos Más Vendidos</h2>
        <p className="dashboard-subtitle">
          Análisis de precios con interpolación polinómica
        </p>
        <p className="dashboard-info">
          Precios mostrados en Dólares Americanos (USD) • Tasa: 1 USD ={" "}
          {USD_TO_UYU} UYU
        </p>
      </div>
      <div className="product-selector">
        {products.map((product, index) => (
          <button
            key={product.id}
            onClick={() => setSelectedProduct(index)}
            className={`product-button ${
              selectedProduct === index ? "active" : ""
            }`}
          >
            {product.name}
          </button>
        ))}
      </div>
      <div className="product-description">
        <div className="description-content">
          <Info
            style={{
              width: "20px",
              height: "20px",
              color: "#2563eb",
              marginTop: "2px",
              flexShrink: 0,
            }}
          />
          <div>
            <h4 className="description-title">
              ¿Por qué {currentProduct.name} está en el Top 3?
            </h4>
            <p className="description-text">{currentProduct.description}</p>
          </div>
        </div>
      </div>
      <div className="product-info-grid">
        <div className="info-card price-card">
          <p className="card-label">Precio Actual</p>
          <p className="card-value price-value">
            ${currentProduct.priceUSD} USD
          </p>
          <p className="card-secondary">(${currentProduct.priceUYU} UYU)</p>
        </div>
        <div className="info-card growth-card">
          <p className="card-label">Tasa de Crecimiento</p>
          <div className="growth-content">
            <span
              className={`growth-rate ${
                trend === "up"
                  ? "positive"
                  : trend === "down"
                  ? "negative"
                  : "neutral"
              }`}
            >
              {growthRate > 0 ? "+" : ""}
              {growthRate}%
            </span>
            {getTrendIcon(trend)}
          </div>
        </div>
        <div className="info-card trend-card">
          <p className="card-label">Tendencia</p>
          <div className="trend-content">
            {getTrendIcon(trend)}
            <span className="trend-text">
              {trend === "up"
                ? "Alcista"
                : trend === "down"
                ? "Bajista"
                : "Estable"}
            </span>
          </div>
        </div>
        <div className="info-card range-card">
          <p className="card-label">Rango de Precio</p>
          <p className="range-value">
            ${Math.min(...currentProduct.historicalData.map((d) => d.priceUSD))}{" "}
            - $
            {Math.max(...currentProduct.historicalData.map((d) => d.priceUSD))}{" "}
            USD
          </p>
        </div>
      </div>
      <div className="chart-container">
        <h3 className="chart-title">
          Historial de Precios: {currentProduct.name}
        </h3>
        <div className="chart-wrapper">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={currentProduct.historicalData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis
                dataKey="day"
                stroke="#666"
                fontSize={12}
                label={{ value: "Días", position: "insideBottom", offset: -5 }}
              />
              <YAxis
                stroke="#666"
                fontSize={12}
                domain={["dataMin - 1", "dataMax + 1"]}
                label={{
                  value: "Precio (USD)",
                  angle: -90,
                  position: "insideLeft",
                }}
              />
              <Tooltip
                formatter={(value, name) => {
                  if (name === "priceUSD") {
                    const uyuValue = (value * USD_TO_UYU).toFixed(2);
                    return [`$${value} USD ($${uyuValue} UYU)`, "Precio"];
                  }
                  return [value, name];
                }}
                labelFormatter={(label) => `Día ${label}`}
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  fontSize: "12px",
                }}
              />
              <Line
                type="monotone"
                dataKey="priceUSD"
                stroke="#2563eb"
                strokeWidth={3}
                dot={{ fill: "#2563eb", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, fill: "#1d4ed8" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="analysis-section">
        <h4 className="analysis-title">Análisis Matemático</h4>
        <div className="analysis-content">
          <p>
            <strong>Método:</strong> Interpolación polinómica para suavizar
            tendencias de precios
          </p>
          <p>
            <strong>Moneda base:</strong> Cálculos y visualización en USD,
            referencia en UYU (1 USD = {USD_TO_UYU} UYU)
          </p>
          <p>
            <strong>Ventaja:</strong> Mejor representación de variaciones de
            precios reales del mercado
          </p>
          <p>
            <strong>Cálculo de tasa:</strong> ((Precio final USD - Precio
            inicial USD) / Precio inicial USD) × 100%
          </p>
          <p>
            <strong>Aplicación:</strong> Predicción de tendencias y optimización
            de estrategias de pricing
          </p>
        </div>
      </div>
    </div>
  );
};

export default PriceDashboard;
