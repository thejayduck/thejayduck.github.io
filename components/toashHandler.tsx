import styles from "../styles/components/ToastNotification.module.scss";

import { AnimatePresence } from "framer-motion";

import { createContext, useContext, useState } from "react";

import ToastNotifaction from "./toastNotification";

interface ToastContextType {
  showToast: (
    title: string,
    summary: string,
    icon?: string,
    priority?: "low" | "normal" | "critical"
  ) => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

export function ToastHandler({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<
    Array<{
      id: number;
      title: string;
      summary: string;
      icon?: string;
      urgency?: "low" | "normal" | "critical";
    }>
  >([]);

  const showToast = (
    title: string,
    summary: string,
    icon?: string,
    urgency?: "low" | "normal" | "critical"
  ) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, title, summary, icon, urgency }]);

    // Auto remove after 5 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 5000);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className={styles.toastContainer}>
        <AnimatePresence>
          {toasts.map((toast, index) => (
            <ToastNotifaction
              key={toast.id}
              title={toast.title}
              summary={toast.summary}
              icon={toast.icon}
              urgency={toast.urgency}
            />
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used within ToastProvider");
  return context;
};
