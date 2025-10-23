"use client";

import React, { useState, useMemo } from "react";
import { useAppContext } from "../../../context/AppContext"; // adjust if needed
import MemberCard from "../components/MemberCard";
import FilterBar from "../components/FilterBar";
import Link from "next/link";
import { Member } from "../types/member";

const MemberDashboard: React.FC = () => {
  const { members } = useAppContext(); // members: Member[]
  const [search, setSearch] = useState<string>("");
  const [filterStatus, setFilterStatus] = useState<string>("");

  // Filtered and searched members
  const filteredMembers: Member[] = useMemo(() => {
    return members.filter((member: Member) => {
      const matchesSearch =
        member.name.toLowerCase().includes(search.toLowerCase()) ||
        member.email.toLowerCase().includes(search.toLowerCase());

      const matchesStatus = filterStatus ? member.status === filterStatus : true;

      return matchesSearch && matchesStatus;
    });
  }, [members, search, filterStatus]);

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white/80 rounded-2xl shadow-md space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Members</h2>
        <Link
          href="/member/create"
          className="bg-green-500 px-4 py-2 rounded text-white hover:bg-green-600"
        >
          + Add Member
        </Link>
      </div>

      {/* Filter and Search */}
      <FilterBar
        search={search}
        setSearch={setSearch}
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
      />

      {/* Member List */}
      <div className="space-y-3">
        {filteredMembers.length > 0 ? (
          filteredMembers.map((member: Member) => (
            <MemberCard key={member.id} member={member} />
          ))
        ) : (
          <p className="text-gray-500">No members found.</p>
        )}
      </div>
    </div>
  );
};

export default MemberDashboard;
