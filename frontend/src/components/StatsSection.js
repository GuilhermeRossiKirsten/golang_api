import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Activity,
  Clock,
  TrendingUp,
  Database,
  RefreshCw,
  RotateCcw,
} from "lucide-react";
import "./StatsSection.css";

export default function StatsSection({
  price,
  timestamp,
  updateCount,
  priceHistory,
  status,
  onReconnect,
  onReset,
}) {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  const formatPrice = (price) => {
    if (!price) return "US$ 0.00";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    }).format(price);
  };

  const calculateChange = () => {
    if (priceHistory.length < 2) return { value: 0, percentage: 0 };
    const firstPrice = priceHistory[0];
    const currentPrice = priceHistory[priceHistory.length - 1];
    const change = currentPrice - firstPrice;
    const percentage = ((change / firstPrice) * 100).toFixed(2);
    return { value: change, percentage };
  };

  const change = calculateChange();
  const isPositive = change.value >= 0;

  const stats = [
    {
      icon: TrendingUp,
      label: "Current Price",
      value: formatPrice(price),
      color: "var(--lorenzo-accent)",
    },
    {
      icon: Activity,
      label: "Change",
      value: `${isPositive ? "+" : ""}${change.percentage}%`,
      color: isPositive ? "var(--success-green)" : "var(--danger-red)",
      subvalue: `${isPositive ? "+US$ " : "-US$ "}${Math.abs(
        change.value
      ).toFixed(1)}`,
    },
    {
      icon: Clock,
      label: "Last Update",
      value: timestamp,
      color: "var(--lorenzo-light)",
    },
    {
      icon: Database,
      label: "Updates Received",
      value: updateCount.toLocaleString("en-US"),
      color: "var(--lorenzo-light)",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section id="stats" className="stats-section" ref={sectionRef}>
      <div className="stats-container">
        {/* Header */}
        <motion.div
          className="stats-header"
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="stats-header-content">
            <div>
              <h2 className="stats-title">
                LIVE <span className="stats-title-accent">STATISTICS</span>
              </h2>
              <p className="stats-subtitle">
                Real-time data streamed directly from our WebSocket server
              </p>
            </div>
            <div className="stats-controls">
              {(status === "Desconectado" || status === "Erro na conexão") && (
                <motion.button
                  className="stats-btn stats-btn-reconnect"
                  onClick={onReconnect}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <RefreshCw size={18} />
                  Reconnect
                </motion.button>
              )}
              <motion.button
                className="stats-btn stats-btn-reset"
                onClick={onReset}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <RotateCcw size={18} />
                Reset Data
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          className="stats-grid"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                className="stat-card"
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="stat-icon" style={{ color: stat.color }}>
                  <Icon size={32} />
                </div>
                <div className="stat-content">
                  <span className="stat-label">{stat.label}</span>
                  <span className="stat-value" style={{ color: stat.color }}>
                    {stat.value}
                  </span>
                  {stat.subvalue && (
                    <span className="stat-subvalue">{stat.subvalue}</span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Info Card */}
        <motion.div
          className="stats-info"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <div className="info-content">
            <h3 className="info-title">Real-Time WebSocket Connection</h3>
            <p className="info-description">
              This dashboard receives live Bitcoin price updates through a
              persistent WebSocket connection to our Go backend server. Data is
              streamed continuously with minimal latency, ensuring you always
              have the most up-to-date market information.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Background Decoration */}
      <div className="stats-background">
        <div className="stats-gradient"></div>
      </div>
    </section>
  );
}
