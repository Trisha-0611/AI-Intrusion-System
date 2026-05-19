import { createContext, useContext, useState, useEffect } from "react";
import { checkConnectivity } from "../api/threatService";

const ConnectivityContext = createContext();

export function ConnectivityProvider({ children }) {
  const [isConnected, setIsConnected] = useState(true);
  const [lastChecked, setLastChecked] = useState(null);

  useEffect(() => {
    // Check connectivity on mount
    const checkStatus = async () => {
      const status = await checkConnectivity();
      setIsConnected(status);
      setLastChecked(new Date());
    };

    checkStatus();

    // Poll connectivity every 10 seconds
    const interval = setInterval(checkStatus, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <ConnectivityContext.Provider value={{ isConnected, lastChecked }}>
      {children}
    </ConnectivityContext.Provider>
  );
}

export function useConnectivity() {
  const context = useContext(ConnectivityContext);
  if (!context) {
    throw new Error("useConnectivity must be used within ConnectivityProvider");
  }
  return context;
}
