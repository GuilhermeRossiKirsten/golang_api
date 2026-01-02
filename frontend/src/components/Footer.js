import React from "react";
import { TrendingUp, Github, Linkedin, Twitter } from "lucide-react";
import "./Footer.css";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Top Section */}
        <div className="footer-top">
          <div className="footer-brand">
            <div className="footer-logo">
              <TrendingUp size={32} />
              <span className="footer-logo-text">
                BIT<span className="footer-logo-accent">COIN</span>
              </span>
            </div>
            <p className="footer-description">
              Real-time Bitcoin price tracking with WebSocket technology. Built
              with React and Go.
            </p>
          </div>

          <div className="footer-links">
            <div className="footer-column">
              <h3 className="footer-title">Navigation</h3>
              <a href="#hero" className="footer-link">
                Home
              </a>
              <a href="#stats" className="footer-link">
                Stats
              </a>
              <a href="#chart" className="footer-link">
                Chart
              </a>
              <a href="#about" className="footer-link">
                About
              </a>
            </div>

            <div className="footer-column">
              <h3 className="footer-title">Resources</h3>
              <a
                href="https://bitcoin.org"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link"
              >
                Bitcoin.org
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link"
              >
                GitHub
              </a>
              <a href="#" className="footer-link">
                API Docs
              </a>
            </div>

            <div className="footer-column">
              <h3 className="footer-title">Connect</h3>
              <div className="footer-social">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                >
                  <Github size={20} />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                >
                  <Twitter size={20} />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                >
                  <Linkedin size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="footer-bottom">
          <p className="footer-copyright">
            © {currentYear} Bitcoin Price Tracker. Built with Lorenzo Design
            System.
          </p>
        </div>
      </div>
    </footer>
  );
}
