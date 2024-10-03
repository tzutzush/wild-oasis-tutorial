"use client";

import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface ReservationContextType {
  range: { from: any; to: any };
  setRange: Dispatch<SetStateAction<{ from: any; to: any }>>;
  resetRange: () => void;
}

const initialState = {
  from: undefined,
  to: undefined,
};

// Set the default value of the context to `null`
const ReservationContext = createContext<ReservationContextType | null>(null);

function ReservationProvider({ children }: { children: React.ReactNode }) {
  const [range, setRange] = useState(initialState);
  const resetRange = () => {
    setRange(initialState);
  };
  return (
    <ReservationContext.Provider value={{ range, setRange, resetRange }}>
      {children}
    </ReservationContext.Provider>
  );
}

function useReservation() {
  const context = useContext(ReservationContext);

  if (!context) {
    throw new Error("useReservation must be used within a ReservationProvider");
  }

  return context;
}

export { ReservationProvider, useReservation };
