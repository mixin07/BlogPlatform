"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { Member } from "../app/member/types/member";

interface AppContextType {
  members: Member[];
  addMember: (member: Member) => void;
  updateMember: (updatedMember: Member) => void;
  deleteMember: (id: number) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const initialMembers: Member[] = [
  { id: 1, name: "Alice", email: "alice@example.com", dateJoined: "2025-10-20", status: "active" },
  { id: 2, name: "Bob", email: "bob@example.com", dateJoined: "2025-10-21", status: "pending" },
  { id: 3, name: "Charlie", email: "charlie@example.com", dateJoined: "2025-10-22", status: "inactive" },
];

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [members, setMembers] = useState<Member[]>(initialMembers);

  // Add new member
  const addMember = (member: Member) => {
    setMembers((prev) => [...prev, member]);
  };

  // Update existing member
  const updateMember = (updatedMember: Member) => {
    setMembers((prev) =>
      prev.map((m) => (m.id === updatedMember.id ? updatedMember : m))
    );
  };

  // Delete member by id
  const deleteMember = (id: number) => {
    setMembers((prev) => prev.filter((m) => m.id !== id));
  };

  return (
    <AppContext.Provider value={{ members, addMember, updateMember, deleteMember }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use context
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useAppContext must be used within AppProvider");
  return context;
};
