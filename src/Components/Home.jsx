import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [input, setInput] = useState("");
  const [trendingStocks, setTrendingStocks] = useState([]);
  const [marketIndices, setMarketIndices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showFullReport, setShowFullReport] = useState(false);
  const navigate = useNavigate();

  // Load watchlist from localStorage or set default
  const [watchlist, setWatchlist] = useState(() => {
    return JSON.parse(localStorage.getItem("watchlist")) || ["ITC.NS", "ASIANPAINT.NS", "TATAMOTORS.NS"];
  });

  // Function to update watchlist
  const updateWatchlist = (newWatchlist) => {
    setWatchlist(newWatchlist);
    localStorage.setItem("watchlist", JSON.stringify(newWatchlist));
  };

  // Load watchlist from localStorage on mount
  useEffect(() => {
    const savedWatchlist = JSON.parse(localStorage.getItem("watchlist"));
    if (savedWatchlist) {
      setWatchlist(savedWatchlist);
    }
  }, []);

  // Format stock symbol
  const formatStockSymbol = (symbol) => {
    symbol = symbol.trim().toUpperCase().replace(/\s+/g, "");
    return symbol.endsWith(".NS") ? symbol : `${symbol}.NS`;
  };

  // Add stock to watchlist
  const addStock = () => {
    const formattedInput = formatStockSymbol(input);
    if (formattedInput && !watchlist.includes(formattedInput)) {
      const newWatchlist = [...watchlist, formattedInput];
      updateWatchlist(newWatchlist);
    }
    setInput("");
  };

  // Redirect to /news with formatted ticker
  const handleSearch = () => {
    if (input.trim()) {
      const formattedInput = formatStockSymbol(input);
      navigate(`/news?ticker=${formattedInput}`);
    }
  };

  // Handle quick suggestion click
  const handleSuggestionClick = (stock) => {
    const formattedStock = formatStockSymbol(stock);
    setInput(formattedStock);
    navigate(`/news?ticker=${formattedStock}`);
  };

  // Fetch trending stocks (mock API call - replace with real API)
  useEffect(() => {
    const fetchTrendingStocks = async () => {
      setLoading(true);
      try {
        // Replace with your API endpoint for trending stocks
        const response = await axios.get("https://api.example.com/trending-stocks");
        setTrendingStocks(response.data.slice(0, 6)); // Limit to 6 stocks
      } catch (err) {
        console.error("Error fetching trending stocks:", err);
        // Mock data if API fails
        setTrendingStocks([
          { symbol: "RELIANCE.NS", price: 2950.25, change: 2.5 },
          { symbol: "HDFCBANK.NS", price: 1650.75, change: -1.2 },
          { symbol: "SBIN.NS", price: 820.50, change: 0.8 },
          { symbol: "INFY.NS", price: 1850.30, change: 3.1 },
          { symbol: "TCS.NS", price: 4100.45, change: -0.5 },
          { symbol: "ICICIBANK.NS", price: 1150.90, change: 1.7 },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingStocks();
  }, []);

  // Fetch market indices (mock API call - replace with real API)
  useEffect(() => {
    const fetchMarketIndices = async () => {
      try {
        // Replace with your API endpoint for market indices
        const response = await axios.get("https://api.example.com/market-indices");
        setMarketIndices(response.data);
      } catch (err) {
        console.error("Error fetching market indices:", err);
        // Mock data if API fails
        setMarketIndices([
          { name: "NIFTY 50", value: 24350.25, change: 0.75 },
          { name: "SENSEX", value: 81750.60, change: 0.62 },
          { name: "NIFTY BANK", value: 51250.30, change: -0.25 },
          { name: "NIFTY MIDCAP", value: 11250.75, change: 1.15 },
          { name: "NIFTY SMALLCAP", value: 18250.45, change: -0.35 },
        ]);
      }
    };

    fetchMarketIndices();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4 animate-fade-in-down">
            Predict the Market, Win the Future
          </h1>
          <p className="text-lg md:text-xl mb-8 animate-fade-in-up">
            Advanced stock analysis and prediction tool for investors in India. Stay ahead with real-time insights and AI-driven forecasts.
          </p>

          {/* Search Bar */}
          <div className="flex justify-center mb-6">
            <input
              aria-label="Search for a stock"
              type="search"
              spellCheck="false"
              placeholder="Search for a Stock (e.g., TCS)"
              className="w-full max-w-lg py-3 px-5 text-gray-900 rounded-l-lg shadow-lg focus:ring-2 focus:ring-blue-400 outline-none transition-all duration-300"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSearch()}
            />
            <button
              onClick={handleSearch}
              className="bg-green-500 text-white px-6 py-3 rounded-r-lg hover:bg-green-600 transition-all duration-300 shadow-lg"
              disabled={!input.trim()} // Disable if input is empty
            >
              🔍 Search
            </button>
          </div>

          {/* Quick Suggestions */}
          <div className="flex flex-wrap justify-center gap-2">
            {["ITC", "ASIANPAINT", "TATAMOTORS", "SBIN", "RELIANCE", "HDFCBANK"].map((stock) => (
              <button
                key={stock}
                onClick={() => handleSuggestionClick(stock)}
                className="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-300 shadow-md transform hover:scale-105"
              >
                {formatStockSymbol(stock)}
              </button>
            ))}
          </div>
        </div>

        {/* Background Overlay */}
        <div className="absolute  opacity-20 bg-[url('/src/assets/stock-bg-pattern.png')] bg-cover bg-center"></div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-6 p-6">
        {/* Watchlist (Left Side on Desktop, Below on Mobile) */}
        <div className="lg:w-1/4 bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">📌 My Watchlist</h2>
          <div className="flex mb-4">
            <input
              type="text"
              placeholder="Add stock (e.g., RELIANCE)"
              className="border px-3 py-2 w-full rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && addStock()}
            />
            <button
              onClick={addStock}
              className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 transition-all duration-300 disabled:bg-gray-400"
              disabled={!input.trim()} // Disable if input is empty
            >
              +
            </button>
          </div>
          <ul className="space-y-3">
            {watchlist.length === 0 ? (
              <p className="text-gray-500 text-center">Your watchlist is empty.</p>
            ) : (
              watchlist.map((stock, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center bg-gray-200 p-3 rounded-lg hover:bg-gray-300 transition-all duration-300 transform hover:scale-102 cursor-pointer"
                  onClick={() => navigate(`/news?ticker=${stock}`)}
                >
                  <span className="font-semibold text-gray-800">{stock}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent navigation when clicking the remove button
                      const newWatchlist = watchlist.filter((s) => s !== stock);
                      updateWatchlist(newWatchlist);
                    }}
                    className="text-red-500 hover:text-red-700"
                  >
                    ✖
                  </button>
                </li>
              ))
            )}
          </ul>
        </div>

        {/* Main Content (Right Side on Desktop) */}
        <div className="flex-grow">
          {/* Trending Stocks Section */}
          <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">🔥 Trending Stocks</h2>
            {loading ? (
              <div className="text-center text-blue-500">Loading trending stocks...</div>
            ) : trendingStocks.length === 0 ? (
              <div className="text-center text-gray-500">No trending stocks available.</div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {trendingStocks.map((stock, index) => (
                  <div
                    key={index}
                    className="p-4 bg-gray-100 rounded-lg hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 cursor-pointer"
                    onClick={() => navigate(`/news?ticker=${stock.symbol}`)}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">{stock.symbol}</h3>
                        <p className="text-sm text-gray-600">₹{stock.price.toFixed(2)}</p>
                      </div>
                      <span
                        className={`text-sm font-semibold ${stock.change >= 0 ? "text-green-500" : "text-red-500"
                          }`}
                      >
                        {stock.change >= 0 ? "↑" : "↓"} {Math.abs(stock.change).toFixed(2)}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Market Insights Section */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">📈 Market Insights</h2>
            <div className="space-y-4">
              {/* Initial Indices (NIFTY 50, SENSEX) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {marketIndices.slice(0, 2).map((index, idx) => (
                  <div
                    key={idx}
                    className={`p-4 rounded-lg ${idx === 0 ? "bg-blue-100" : "bg-green-100"
                      }`}
                  >
                    <h3 className={`text-lg font-semibold ${idx === 0 ? "text-blue-800" : "text-green-800"}`}>{index.name}</h3>
                    <p className={`text-sm ${idx === 0 ? "text-blue-600" : "text-green-600"}`}>
                      {index.value.toFixed(2)} <span className={index.change >= 0 ? "text-green-500" : "text-red-500"}>{index.change >= 0 ? "+" : ""}{index.change.toFixed(2)}%</span>
                    </p>
                  </div>
                ))}
              </div>

              {/* Toggle Full Market Report */}
              <button
                onClick={() => setShowFullReport(!showFullReport)}
                className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-300"
              >
                {showFullReport ? "Hide Full Market Report" : "View Full Market Report"}
              </button>

              {/* Full Market Report (Additional Indices) */}
              {showFullReport && (
                <div className="mt-4 space-y-4 animate-fade-in-down">
                  {marketIndices.slice(2).map((index, idx) => (
                    <div
                      key={idx}
                      className={`p-4 rounded-lg ${idx % 2 === 0 ? "bg-purple-100" : "bg-orange-100"
                        }`}
                    >
                      <h3 className={`text-lg font-semibold ${idx % 2 === 0 ? "text-purple-800" : "text-orange-800"}`}>{index.name}</h3>
                      <p className={`text-sm ${idx % 2 === 0 ? "text-purple-600" : "text-orange-600"}`}>
                        {index.value.toFixed(2)} <span className={index.change >= 0 ? "text-green-500" : "text-red-500"}>{index.change >= 0 ? "+" : ""}{index.change.toFixed(2)}%</span>
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6 px-6 text-center">
        <p className="text-sm">© 2025 Stock Prediction App. All rights reserved.</p>
        <div className="mt-2 flex justify-center gap-4">
          <Link to="/" className="text-blue-400 hover:text-blue-300">Home</Link>
          <Link to="/about" className="text-blue-400 hover:text-blue-300">About</Link>
          <Link to="/policy" className="text-blue-400 hover:text-blue-300">Privacy Policy</Link>
        </div>
      </footer>
    </div>
  );
};

export default Home;