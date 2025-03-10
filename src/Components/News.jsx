import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area, ScatterChart, Scatter
} from "recharts";
import { Chart as ChartJS, LineController, LineElement, PointElement, LinearScale, TimeScale, ScatterController } from "chart.js";
import "chartjs-adapter-date-fns";
import annotationPlugin from "chartjs-plugin-annotation";
import { Chart } from "react-chartjs-2";

// Register Chart.js components
ChartJS.register(LineController, LineElement, PointElement, LinearScale, TimeScale, ScatterController, annotationPlugin);

const StockNews = () => {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [darkMode, setDarkMode] = useState(true);
  const [timeFrame, setTimeFrame] = useState("1D");

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const initialTicker = params.get("ticker") || "TCS.NS";
  const [ticker, setTicker] = useState(initialTicker);

  // Format stock symbol
  const formatStockSymbol = (symbol) => {
    symbol = symbol.trim().toUpperCase().replace(/\s+/g, "");
    return symbol.endsWith(".NS") ? symbol : `${symbol}.NS`;
  };

  // Fetch stock data from API
  const fetchStockData = async (ticker) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post("https://stock-prediction-wyr4.onrender.com/predict", {
        tickers: [ticker.trim()],
        timeFrame,
      });
      if (response.status === 200 && Array.isArray(response.data)) {
        setStocks(response.data);
      } else {
        setError("⚠️ Invalid response format from server.");
      }
    } catch (err) {
      setError("⚠️ Error fetching stock data. Please check the server.");
      console.error("Error fetching stock data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (ticker) {
      fetchStockData(ticker);
      const interval = setInterval(() => fetchStockData(ticker), 60000);
      return () => clearInterval(interval);
    }
  }, [timeFrame]);

  const addToWatchlist = () => {
    if (ticker.trim()) {
      // Get the current watchlist from localStorage or use default if none exists
      const currentWatchlist = JSON.parse(localStorage.getItem("watchlist")) || [
        "ITC.NS",
        "ASIANPAINT.NS",
        "TATAMOTORS.NS",
      ];

      // Format the ticker (assuming stock symbols similar to your previous code)
      const formattedTicker = ticker.trim().toUpperCase().replace(/\s+/g, "");
      const newStock = formattedTicker.endsWith(".NS") ? formattedTicker : `${formattedTicker}.NS`;

      // Check if the stock is already in the watchlist to avoid duplicates
      if (!currentWatchlist.includes(newStock)) {
        const newWatchlist = [...currentWatchlist, newStock];
        // Update localStorage with the new watchlist
        localStorage.setItem("watchlist", JSON.stringify(newWatchlist));
        console.log(`Added ${newStock} to watchlist:`, newWatchlist); // For debugging
      } else {
        console.log(`${newStock} is already in the watchlist`);
      }

      // Clear the ticker field after adding
      setTicker("");
    }
  };

  // Chart 1: Line Chart (Actual vs Predicted with Hover Values)
  const getLineChartData = (stock) => {
    const historicalDays = 30;
    const historicalData = Array.from({ length: historicalDays }, (_, index) => ({
      x: new Date(Date.now() - (historicalDays - index) * 86400000),
      y: stock.current_price * (0.95 + Math.random() * 0.1),
    }));

    const currentDay = { x: new Date(Date.now()), y: stock.current_price };
    const predictedDay = {
      x: new Date(Date.now() + 86400000),
      y: stock.target_price,
    };

    return {
      datasets: [
        {
          label: "Actual Price",
          data: [...historicalData, currentDay],
          borderColor: "#007bff",
          backgroundColor: (context) => {
            const ctx = context.chart.ctx;
            const gradient = ctx.createLinearGradient(0, 0, 0, 400);
            gradient.addColorStop(0, "rgba(0, 123, 255, 0.3)");
            gradient.addColorStop(1, "rgba(0, 123, 255, 0)");
            return gradient;
          },
          borderWidth: 2,
          fill: true,
          pointRadius: 0,
          tension: 0.4,
        },
        {
          label: "Predicted Price",
          data: [currentDay, predictedDay],
          borderColor: "#ff0000",
          borderWidth: 2,
          borderDash: [5, 5],
          fill: false,
          pointRadius: 3,
          pointBackgroundColor: "#ff0000",
          tension: 0.4,
        },
      ],
    };
  };

  const getLineChartOptions = (stock) => ({
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: "time",
        time: { unit: "day", displayFormats: { day: "MMM d" } },
        title: { display: true, text: "Date", color: darkMode ? "#fff" : "#000" },
        ticks: { color: darkMode ? "#fff" : "#000" },
        grid: { display: false },
      },
      y: {
        title: { display: true, text: "Stock Price (₹)", color: darkMode ? "#fff" : "#000" },
        ticks: { color: darkMode ? "#fff" : "#000" },
        grid: { color: darkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)" },
      },
    },
    plugins: {
      legend: { position: "top", labels: { color: darkMode ? "#fff" : "#000", font: { size: 14 } } },
      tooltip: {
        backgroundColor: darkMode ? "#333" : "#fff",
        titleColor: darkMode ? "#fff" : "#000",
        bodyColor: darkMode ? "#fff" : "#000",
        callbacks: {
          label: (context) => {
            const { label, parsed } = context;
            return `${label}: ₹${parsed.y.toFixed(2)}`;
          },
          afterBody: (context) => {
            return [
              `Support: ₹${stock.support?.toFixed(2) || "N/A"}`,
              `Resistance: ₹${stock.resistance?.toFixed(2) || "N/A"}`,
            ];
          },
        },
      },
      annotation: {
        annotations: {
          support: {
            type: "line",
            yMin: stock.support,
            yMax: stock.support,
            borderColor: "#00FF00",
            borderWidth: 2,
            borderDash: [5, 5],
            label: {
              content: `Support: ₹${stock.support.toFixed(2)}`,
              enabled: true,
              position: "start",
              backgroundColor: darkMode ? "rgba(0, 255, 0, 0.8)" : "rgba(0, 255, 0, 0.6)",
              color: "#fff",
              font: { size: 12 },
            },
          },
          resistance: {
            type: "line",
            yMin: stock.resistance,
            yMax: stock.resistance,
            borderColor: "#FFD700",
            borderWidth: 2,
            borderDash: [5, 5],
            label: {
              content: `Resistance: ₹${stock.resistance.toFixed(2)}`,
              enabled: true,
              position: "start",
              backgroundColor: darkMode ? "rgba(255, 215, 0, 0.8)" : "rgba(255, 215, 0, 0.6)",
              color: "#fff",
              font: { size: 12 },
            },
          },
        },
      },
    },
    interaction: {
      mode: "nearest",
      intersect: false,
    },
  });

  // Chart 2: Area Chart (Price Trend Analysis)
  const getAreaChartData = (stock) => {
    const historicalDays = 30;
    return Array.from({ length: historicalDays + 1 }, (_, index) => ({
      date: new Date(Date.now() - (historicalDays - index) * 86400000),
      price: index === historicalDays ? stock.current_price : stock.current_price * (0.95 + Math.random() * 0.1),
    }));
  };

  // Chart 3: Bar Chart (Price Ranges)
  const getBarChartData = (stock) => [
    { name: "Range", min: stock.support, max: stock.resistance },
    { name: "Trading", min: stock.buy_price, max: stock.sell_price },
  ];

  // Chart 4: Pie Chart (Signal Distribution)
  const pieData = stocks.map(stock => ({
    name: stock.suggested_action.split(" ")[1],
    value: 1,
  })).reduce((acc, curr) => {
    const existing = acc.find(item => item.name === curr.name);
    if (existing) existing.value += 1;
    else acc.push(curr);
    return acc;
  }, []);

  const COLORS = ["#FFD700", "#00CED1", "#32CD32", "#FF4500"];

  // Chart 5: Scatter Chart (Price Points)
  const getScatterData = (stock) => {
    return {
      datasets: [
        {
          label: "Current Price",
          data: [{ x: new Date(Date.now()), y: stock.current_price }],
          backgroundColor: "#007bff",
          pointRadius: 6,
        },
        {
          label: "Target Price",
          data: [{ x: new Date(Date.now() + 86400000), y: stock.target_price }],
          backgroundColor: "#ff0000",
          pointRadius: 6,
        },
      ],
    };
  };

  const getScatterOptions = (stock) => ({
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: "time",
        time: { unit: "day", displayFormats: { day: "MMM d" } },
        title: { display: true, text: "Date", color: darkMode ? "#fff" : "#000" },
        ticks: { color: darkMode ? "#fff" : "#000" },
      },
      y: {
        title: { display: true, text: "Price (₹)", color: darkMode ? "#fff" : "#000" },
        ticks: { color: darkMode ? "#fff" : "#000" },
      },
    },
    plugins: {
      legend: { position: "top", labels: { color: darkMode ? "#fff" : "#000" } },
      tooltip: {
        backgroundColor: darkMode ? "#333" : "#fff",
        titleColor: darkMode ? "#fff" : "#000",
        bodyColor: darkMode ? "#fff" : "#000",
        callbacks: {
          label: (context) => `Price: ₹${context.parsed.y.toFixed(2)}`,
        },
      },
    },
  });

  // Signal Highlighting with Animation
  const getSignalStyle = (action) => {
    if (action.includes("BUY")) return "bg-green-500 text-white animate-pulse";
    if (action.includes("SELL")) return "bg-red-500 text-white animate-pulse";
    if (action.includes("HOLD")) return "bg-blue-500 text-white animate-pulse";
    if (action.includes("WAIT")) return "bg-yellow-500 text-gray-900 animate-pulse";
    return "bg-gray-500 text-white animate-pulse";
  };

  const handleSearch = () => {
    if (ticker.trim()) {
      const formattedTicker = formatStockSymbol(ticker);
      setTicker(formattedTicker);
      fetchStockData(formattedTicker);
    }
  };

  return (
    <div className={`min-h-screen w-full ${darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"} transition-colors duration-300`}>
      {/* Header */}
      <header className="p-6 flex justify-between items-center border-b border-gray-200 dark:border-gray-700">
        <h1 className="text-3xl font-bold">📈Stock Prediction Dashboard</h1>
        <div className="flex items-center gap-4">
          
          
        </div>
      </header>

      {/* Search Bar */}
      <div className="p-6 flex flex-col md:flex-row items-center justify-center gap-4">
        <input
          type="text"
          placeholder="Enter stock ticker (e.g., TCS)"
          className={`border px-4 py-3 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 w-full md:w-72 ${darkMode ? "bg-gray-800 text-white border-gray-700" : "bg-white text-gray-900 border-gray-300"}`}
          value={ticker}
          onChange={(e) => setTicker(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSearch()}
        />
        <button
          className={`bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400 ${darkMode ? "dark:bg-blue-500 dark:hover:bg-blue-600" : ""}`}
          onClick={handleSearch}
          disabled={loading}
        >
          🔍 Search
        </button>
        <button
          className={`bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400 ${darkMode ? "dark:bg-blue-500 dark:hover:bg-blue-600" : ""}`}
          onClick={addToWatchlist}
          
        >
         Add to Watchlist
        </button>
      </div>

      {/* Loading & Error Messages */}
      {loading && <div className="text-center text-blue-500 text-lg p-6">Loading stock data...</div>}
      {error && <div className="text-center text-red-500 text-lg p-6">{error}</div>}

      {/* Stock Data & Visualizations */}
      {!loading && !error && stocks.length > 0 && (
        <div className="p-6 grid grid-cols-1 gap-6">
          {stocks.map((stock, index) => (
            <div key={index} className={`w-full p-6 rounded-lg shadow-lg ${darkMode ? "bg-gray-800" : "bg-white"} transition-all duration-300`}>
              {/* Stock Header */}
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold">{stock.ticker}</h2>
                <span className={`px-4 py-2 rounded-full text-lg font-semibold ${getSignalStyle(stock.suggested_action)}`}>
                  {stock.suggested_action}
                </span>
              </div>

{/* Interactive Price Info */}
<div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
  <div className="p-4 rounded-lg bg-blue-600 dark:bg-blue-900 hover:bg-blue-700 dark:hover:bg-blue-800 transition-all transform hover:scale-105 cursor-pointer">
    <p className="text-sm font-semibold text-white">📊 Current Price</p>
    <p className="text-lg font-bold text-white">₹{stock.current_price?.toFixed(2)}</p>
  </div>
  <div className="p-4 rounded-lg bg-green-600 dark:bg-green-900 hover:bg-green-700 dark:hover:bg-green-800 transition-all transform hover:scale-105 cursor-pointer">
    <p className="text-sm font-semibold text-white">✅ Buy Price</p>
    <p className="text-lg font-bold text-white">₹{stock.buy_price?.toFixed(2)}</p>
  </div>
  <div className="p-4 rounded-lg bg-red-600 dark:bg-red-900 hover:bg-red-700 dark:hover:bg-red-800 transition-all transform hover:scale-105 cursor-pointer">
    <p className="text-sm font-semibold text-white">❌ Sell Price</p>
    <p className="text-lg font-bold text-white">₹{stock.sell_price?.toFixed(2)}</p>
  </div>
  <div className="p-4 rounded-lg bg-yellow-600 dark:bg-yellow-900 hover:bg-yellow-700 dark:hover:bg-yellow-800 transition-all transform hover:scale-105 cursor-pointer">
    <p className="text-sm font-semibold text-white">🎯 Target Price</p>
    <p className="text-lg font-bold text-white">₹{stock.target_price?.toFixed(2)}</p>
  </div>
  <div className="p-4 rounded-lg bg-gray-700 dark:bg-gray-900 hover:bg-gray-800 dark:hover:bg-gray-800 transition-all transform hover:scale-105 cursor-pointer">
    <p className="text-sm font-semibold text-white">🛑 Stop Loss</p>
    <p className="text-lg font-bold text-white">₹{stock.stop_loss?.toFixed(2)}</p>
  </div>
  <div className="p-4 rounded-lg bg-green-700 dark:bg-green-900 hover:bg-green-800 dark:hover:bg-green-800 transition-all transform hover:scale-105 cursor-pointer">
    <p className="text-sm font-semibold text-white">🛡️ Support</p>
    <p className="text-lg font-bold text-white">₹{stock.support?.toFixed(2)}</p>
  </div>
  <div className="p-4 rounded-lg bg-orange-600 dark:bg-orange-900 hover:bg-orange-700 dark:hover:bg-orange-800 transition-all transform hover:scale-105 cursor-pointer">
    <p className="text-sm font-semibold text-white">🚧 Resistance</p>
    <p className="text-lg font-bold text-white">₹{stock.resistance?.toFixed(2)}</p>
  </div>
</div>
              {/* Chart 1: Line Chart (Actual vs Predicted) */}
              <div className="w-full mb-6" style={{ height: "400px" }}>
                <h3 className="text-lg font-semibold mb-2">Price Prediction</h3>
                <Chart type="line" data={getLineChartData(stock)} options={getLineChartOptions(stock)} />
              </div>
              


              

              
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StockNews;
