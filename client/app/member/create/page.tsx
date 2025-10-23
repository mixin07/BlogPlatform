"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useAppContext } from "../../../context/AppContext";
import MemberForm from "../components/MemberForm";
import { MemberFormValues } from "../schemas/member";

const CreateMemberPage: React.FC = () => {
  const router = useRouter();
  const { members, addMember } = useAppContext();

  const handleCreate = (data: MemberFormValues) => {
    addMember({ id: members.length + 1, ...data });
    router.push("/member/dashboard");
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white/80 rounded-2xl shadow-md">
      <h2 className="text-2xl font-bold mb-4">Create New Member</h2>
      <MemberForm onSubmit={handleCreate} />
    </div>
  );
};

export default CreateMemberPage;
