import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import Loading from "../components/Loading";
import { smoother } from "../components/Navbar";

interface LoadingType {
  isLoading: boolean;
  setIsLoading: (state: boolean) => void;
  setLoading: (percent: number) => void;
}

export const LoadingContext = createContext<LoadingType | null>(null);

export const LoadingProvider = ({ children }: PropsWithChildren) => {
  const [isLoading, setIsLoading] = useState(true);
  const [loading, setLoading] = useState(0);

  const value = {
    isLoading,
    setIsLoading,
    setLoading,
  };
  useEffect(() => {
    const failSafeTimer = window.setTimeout(() => {
      setIsLoading(false);
    }, 5500);

    return () => {
      window.clearTimeout(failSafeTimer);
    };
  }, []);

  useEffect(() => {
    if (isLoading) {
      document.documentElement.style.overflowY = "hidden";
      document.body.style.overflowY = "hidden";
      return;
    }

    document.documentElement.style.overflowY = "auto";
    document.body.style.overflow = "auto";
    document.body.style.overflowX = "hidden";
    smoother?.paused(false);
  }, [isLoading]);

  return (
    <LoadingContext.Provider value={value as LoadingType}>
      {isLoading && <Loading percent={loading} />}
      <main className="main-body">{children}</main>
    </LoadingContext.Provider>
  );
};

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
};
