import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { TrendingUp, ArrowDown } from "lucide-react";
import "./HeroSection.css";

export default function HeroSection({ price, status }) {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  const scrollToStats = () => {
    const statsSection = document.getElementById("stats");
    if (statsSection) {
      statsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const formatPrice = (price) => {
    if (!price) return "Loading...";
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
  };

  return (
    <section id="hero" className="hero-section" ref={heroRef}>
      <motion.div className="hero-container" style={{ opacity, scale, y }}>
        {/* Status Badge */}
        <motion.div
          className={`hero-status ${
            status === "Conectado" ? "status-connected" : "status-disconnected"
          }`}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <span className="status-dot"></span>
          {status}
        </motion.div>

        {/* Main Content */}
        <motion.div
          className="hero-content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="hero-icon"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
          >
            <TrendingUp size={80} />
          </motion.div>

          <motion.h1
            className="hero-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <span className="hero-title-main">BITCOIN</span>
            <span className="hero-title-accent">TRACKER</span>
          </motion.h1>

          <motion.p
            className="hero-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            Real-time cryptocurrency monitoring powered by WebSocket
          </motion.p>

          {/* Price Display */}
          <motion.div
            className="hero-price"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
          >
            <span className="hero-price-label">Current Price</span>
            <span className="hero-price-value">{formatPrice(price)}</span>
          </motion.div>

          {/* CTA Button */}
          <motion.button
            className="hero-cta"
            onClick={scrollToStats}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>View Stats</span>
            <ArrowDown size={20} />
          </motion.button>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="hero-scroll-indicator"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, repeat: Infinity, duration: 1.5 }}
        >
          <div className="scroll-line"></div>
        </motion.div>
      </motion.div>

      {/* Background Elements */}
      <div className="hero-background">
        <div className="hero-grid"></div>
        <div className="hero-gradient-1"></div>
        <div className="hero-gradient-2"></div>
      </div>
    </section>
  );
}
