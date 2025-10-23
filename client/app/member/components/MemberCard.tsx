"use client";

import React from "react";
import { Member } from "../types/member";
import Link from "next/link";
import { useAppContext } from "../../../context/AppContext";

interface MemberCardProps {
  member: Member;
}

const statusColors: Record<string, string> = {
  active: "bg-green-500",
  inactive: "bg-red-500",
  pending: "bg-yellow-400",
};

const MemberCard: React.FC<MemberCardProps> = ({ member }) => {
  const { deleteMember } = useAppContext();

  const handleDelete = () => {
    if (confirm(`Are you sure you want to delete ${member.name}?`)) {
      deleteMember(member.id);
    }
  };

  return (
    <div className="border p-4 rounded shadow-md flex justify-between items-center">
      <div>
        <h3 className="font-bold text-lg">{member.name}</h3>
        <p className="text-gray-500">{member.email}</p>
        <p className="text-gray-500">{new Date(member.dateJoined).toLocaleDateString()}</p>
        <span className={`text-white px-2 py-1 rounded ${statusColors[member.status]}`}>
          {member.status}
        </span>
      </div>

      <div className="flex gap-2">
        <Link
          href={`/member/edit/${member.id}`}
          className="bg-yellow-400 px-3 py-1 rounded hover:bg-yellow-500"
        >
          Edit
        </Link>

        <button
          onClick={handleDelete}
          className="bg-red-500 px-3 py-1 rounded text-white hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default MemberCard;
