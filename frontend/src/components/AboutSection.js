import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Zap, Shield, Activity } from "lucide-react";
import "./AboutSection.css";

export default function AboutSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  const features = [
    {
      icon: Zap,
      title: "Real-Time Updates",
      description:
        "WebSocket technology ensures instant price updates with minimal latency for accurate market tracking.",
    },
    {
      icon: Shield,
      title: "Reliable Connection",
      description:
        "Built with Go backend for high performance and automatic reconnection handling.",
    },
    {
      icon: Activity,
      title: "Live Analytics",
      description:
        "Comprehensive statistics and historical data visualization to track Bitcoin performance.",
    },
  ];

  return (
    <section id="about" className="about-section" ref={sectionRef}>
      <div className="about-container">
        {/* Header */}
        <motion.div
          className="about-header"
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="about-title">
            ABOUT <span className="about-title-accent">THE PLATFORM</span>
          </h2>
          <p className="about-description">
            A modern Bitcoin price tracker built with cutting-edge web
            technologies. Our platform delivers real-time cryptocurrency data
            through a persistent WebSocket connection, ensuring you never miss a
            market movement.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="about-features">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                className="about-feature-card"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 + index * 0.1, duration: 0.6 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className="feature-icon-wrapper">
                  <Icon size={40} className="feature-icon" />
                </div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Tech Stack */}
        <motion.div
          className="about-tech"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <h3 className="tech-title">Built With</h3>
          <div className="tech-stack">
            <div className="tech-item">
              <span className="tech-name">React</span>
              <span className="tech-description">Frontend Framework</span>
            </div>
            <div className="tech-divider"></div>
            <div className="tech-item">
              <span className="tech-name">Go</span>
              <span className="tech-description">Backend Server</span>
            </div>
            <div className="tech-divider"></div>
            <div className="tech-item">
              <span className="tech-name">WebSocket</span>
              <span className="tech-description">Real-time Communication</span>
            </div>
            <div className="tech-divider"></div>
            <div className="tech-item">
              <span className="tech-name">Chart.js</span>
              <span className="tech-description">Data Visualization</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
