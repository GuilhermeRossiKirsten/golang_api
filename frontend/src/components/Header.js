import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TrendingUp, Menu, X } from "lucide-react";
import "./Header.css";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setIsMobileMenuOpen(false);
    }
  };

  const handleLogoClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <motion.header
      className={`header ${isScrolled ? "header-scrolled" : ""}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="header-container">
        {/* Logo */}
        <motion.div
          className="header-logo"
          onClick={handleLogoClick}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <TrendingUp className="logo-icon" size={28} strokeWidth={2.5} />
          <span className="logo-text">
            BIT<span className="logo-accent">COIN</span>
          </span>
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="header-nav desktop-nav">
          <button onClick={() => scrollToSection("hero")} className="nav-link">
            HOME
          </button>
          <button onClick={() => scrollToSection("stats")} className="nav-link">
            STATS
          </button>
          <button onClick={() => scrollToSection("chart")} className="nav-link">
            CHART
          </button>
          <button onClick={() => scrollToSection("about")} className="nav-link">
            ABOUT
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="mobile-menu-btn"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.nav
            className="mobile-nav"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <button
              onClick={() => scrollToSection("hero")}
              className="nav-link-mobile"
            >
              HOME
            </button>
            <button
              onClick={() => scrollToSection("stats")}
              className="nav-link-mobile"
            >
              STATS
            </button>
            <button
              onClick={() => scrollToSection("chart")}
              className="nav-link-mobile"
            >
              CHART
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className="nav-link-mobile"
            >
              ABOUT
            </button>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
