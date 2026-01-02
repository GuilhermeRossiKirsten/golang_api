import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

// Lorenzo Design System Components
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import StatsSection from "./components/StatsSection";
import ChartSection from "./components/ChartSection";
import AboutSection from "./components/AboutSection";
import Footer from "./components/Footer";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

function App() {
  const [price, setPrice] = useState(null);
  const [timestamp, setTimestamp] = useState("");
  const [status, setStatus] = useState("Conectando...");
  const [priceHistory, setPriceHistory] = useState([]);
  const [timeLabels, setTimeLabels] = useState([]);
  const [reconnectTrigger, setReconnectTrigger] = useState(0);
  const [updateCount, setUpdateCount] = useState(0);

  const maxDataPoints = 200; // Limite de pontos no gráfico
  const messageCountRef = useRef(0);
  const lastUpdateTimeRef = useRef(Date.now());

  const connectWebSocket = () => {
    setStatus("Conectando...");
    messageCountRef.current = 0;
    lastUpdateTimeRef.current = Date.now();

    // Detecta se está rodando no Codespaces
    const isCodespaces = window.location.hostname.includes("app.github.dev");
    let wsUrl;

    if (isCodespaces) {
      const hostname = window.location.hostname;
      const backendHost = hostname.replace("-3000.", "-8080.");
      wsUrl = `wss://${backendHost}/ws`;
    } else {
      wsUrl = "ws://localhost:8080/ws";
    }

    console.log("Tentando conectar ao WebSocket:", wsUrl);
    const ws = new WebSocket(wsUrl);

    ws.onopen = () => {
      setStatus("Conectado");
      console.log("✅ Conectado ao WebSocket");
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      messageCountRef.current++;

      // Atualiza o preço atual sempre
      setPrice(data.price);
      setTimestamp(data.timestamp);
      setUpdateCount(messageCountRef.current);

      // Adiciona TODOS os pontos ao gráfico (sem amostragem)
      setPriceHistory((prev) => {
        const newHistory = [...prev, data.price];
        return newHistory.slice(-maxDataPoints);
      });

      setTimeLabels((prev) => {
        const newLabels = [...prev, data.timestamp];
        return newLabels.slice(-maxDataPoints);
      });
    };

    ws.onerror = (error) => {
      console.error("Erro no WebSocket:", error);
      setStatus("Erro na conexão");
    };

    ws.onclose = () => {
      setStatus("Desconectado");
      console.log("WebSocket desconectado");
    };

    return ws;
  };

  useEffect(() => {
    const ws = connectWebSocket();

    return () => {
      ws.close();
    };
  }, [reconnectTrigger]);

  const handleReconnect = () => {
    setReconnectTrigger((prev) => prev + 1);
  };

  const handleReset = async () => {
    try {
      // Detecta se está rodando no Codespaces
      const isCodespaces = window.location.hostname.includes("app.github.dev");
      let resetUrl;

      if (isCodespaces) {
        const hostname = window.location.hostname;
        const backendHost = hostname.replace("-3000.", "-8080.");
        resetUrl = `https://${backendHost}/reset`;
      } else {
        resetUrl = "http://localhost:8080/reset";
      }

      const response = await fetch(resetUrl, {
        method: "POST",
      });

      if (response.ok) {
        console.log("✅ Cache resetado no backend");

        // Limpa o estado local do frontend
        setPriceHistory([]);
        setTimeLabels([]);
        setPrice(null);
        setTimestamp("");
        setUpdateCount(0);
        messageCountRef.current = 0;
        lastUpdateTimeRef.current = Date.now();

        // Reconecta para receber os novos dados
        setReconnectTrigger((prev) => prev + 1);
      } else {
        console.error("Erro ao resetar cache:", response.statusText);
      }
    } catch (error) {
      console.error("Erro ao chamar endpoint de reset:", error);
    }
  };

  return (
    <div className="App">
      <Header />
      <main>
        <HeroSection price={price} status={status} />
        <StatsSection
          price={price}
          timestamp={timestamp}
          updateCount={updateCount}
          priceHistory={priceHistory}
          status={status}
          onReconnect={handleReconnect}
          onReset={handleReset}
        />
        <ChartSection priceHistory={priceHistory} timeLabels={timeLabels} />
        <AboutSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
