import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Line } from "react-chartjs-2";
import { BarChart3 } from "lucide-react";
import "./ChartSection.css";

export default function ChartSection({ priceHistory, timeLabels }) {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const chartData = {
    labels: timeLabels,
    datasets: [
      {
        label: "Bitcoin Price (USD)",
        data: priceHistory,
        borderColor: "#f7931a",
        backgroundColor: "rgba(247, 147, 26, 0.1)",
        borderWidth: 2,
        fill: true,
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 6,
        pointHoverBackgroundColor: "#f7931a",
        pointHoverBorderColor: "#fff",
        pointHoverBorderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: "index",
      intersect: false,
    },
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
      tooltip: {
        backgroundColor: "rgba(26, 26, 26, 0.95)",
        titleColor: "#f7931a",
        bodyColor: "#e8e8e3",
        borderColor: "#f7931a",
        borderWidth: 1,
        padding: 12,
        displayColors: false,
        callbacks: {
          label: function (context) {
            return `$${context.parsed.y.toFixed(2)}`;
          },
        },
      },
    },
    scales: {
      x: {
        display: true,
        grid: {
          display: true,
          color: "rgba(255, 255, 255, 0.05)",
          drawBorder: false,
        },
        ticks: {
          display: true,
          color: "rgba(255, 255, 255, 0.5)",
          maxTicksLimit: 10,
          font: {
            size: 11,
            family: "Roboto",
          },
        },
      },
      y: {
        display: true,
        grid: {
          display: true,
          color: "rgba(255, 255, 255, 0.05)",
          drawBorder: false,
        },
        ticks: {
          color: "rgba(255, 255, 255, 0.5)",
          font: {
            size: 12,
            family: "Roboto",
          },
          callback: function (value) {
            return "$" + value.toFixed(0);
          },
        },
      },
    },
  };

  const calculateStats = () => {
    if (priceHistory.length === 0) return { min: 0, max: 0, avg: 0 };
    const min = Math.min(...priceHistory);
    const max = Math.max(...priceHistory);
    const avg = priceHistory.reduce((a, b) => a + b, 0) / priceHistory.length;
    return { min, max, avg };
  };

  const stats = calculateStats();

  return (
    <section id="chart" className="chart-section" ref={sectionRef}>
      <div className="chart-container">
        {/* Header */}
        <motion.div
          className="chart-header"
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="chart-title-wrapper">
            <BarChart3 size={40} className="chart-icon" />
            <h2 className="chart-title">
              PRICE <span className="chart-title-accent">HISTORY</span>
            </h2>
          </div>
          <p className="chart-subtitle">
            Last {priceHistory.length} data points from WebSocket stream
          </p>
        </motion.div>

        {/* Chart */}
        <motion.div
          className="chart-wrapper"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div className="chart-canvas">
            {priceHistory.length > 0 ? (
              <Line data={chartData} options={chartOptions} />
            ) : (
              <div className="chart-empty">
                <p>Waiting for data...</p>
              </div>
            )}
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          className="chart-stats"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <div className="chart-stat-card">
            <span className="chart-stat-label">Minimum</span>
            <span className="chart-stat-value chart-stat-min">
              ${stats.min.toFixed(2)}
            </span>
          </div>
          <div className="chart-stat-card">
            <span className="chart-stat-label">Average</span>
            <span className="chart-stat-value chart-stat-avg">
              ${stats.avg.toFixed(2)}
            </span>
          </div>
          <div className="chart-stat-card">
            <span className="chart-stat-label">Maximum</span>
            <span className="chart-stat-value chart-stat-max">
              ${stats.max.toFixed(2)}
            </span>
          </div>
        </motion.div>
      </div>

      {/* Background */}
      <div className="chart-background">
        <div className="chart-grid"></div>
      </div>
    </section>
  );
}
