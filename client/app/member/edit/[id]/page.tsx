"use client";

import React from "react";
import { useRouter, useParams } from "next/navigation";
import { useAppContext } from "../../../../context/AppContext";
import MemberForm from "../../components/MemberForm";
import { MemberFormValues } from "../../schemas/member";

const EditMemberPage: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const { members, updateMember } = useAppContext();
  const memberId = Number(params?.id);

  const member = members.find((m) => m.id === memberId);
  if (!member) return <p>Member not found</p>;

  const handleEdit = (data: MemberFormValues) => {
    updateMember({ id: memberId, ...data });
    router.push("/member/dashboard");
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white/80 rounded-2xl shadow-md">
      <h2 className="text-2xl font-bold mb-4">Edit Member</h2>
      <MemberForm initialValues={member} onSubmit={handleEdit} />
    </div>
  );
};

export default EditMemberPage;
