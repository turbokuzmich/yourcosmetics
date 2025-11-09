"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import PrivacyPolicy from "./privacy-policy";

// Context for Privacy Policy modal
interface PrivacyPolicyContextType {
  isOpen: boolean;
  openPrivacyPolicy: () => void;
  closePrivacyPolicy: () => void;
}

const PrivacyPolicyContext = createContext<
  PrivacyPolicyContextType | undefined
>(undefined);

export function usePrivacyPolicy() {
  const context = useContext(PrivacyPolicyContext);
  if (!context) {
    throw new Error(
      "usePrivacyPolicy must be used within PrivacyPolicyProvider"
    );
  }
  return context;
}

export default function PrivacyPolicyProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const openPrivacyPolicy = () => setIsOpen(true);
  const closePrivacyPolicy = () => setIsOpen(false);

  return (
    <PrivacyPolicyContext.Provider
      value={{ isOpen, openPrivacyPolicy, closePrivacyPolicy }}
    >
      {children}
      <PrivacyPolicy isOpen={isOpen} onClose={closePrivacyPolicy} />
    </PrivacyPolicyContext.Provider>
  );
}
