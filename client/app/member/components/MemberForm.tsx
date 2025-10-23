"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { memberSchema, MemberFormValues } from "../schemas/member";

interface MemberFormProps {
  initialValues?: MemberFormValues;
  onSubmit: (data: MemberFormValues) => void;
}

const MemberForm: React.FC<MemberFormProps> = ({ initialValues, onSubmit }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<MemberFormValues>({
    resolver: zodResolver(memberSchema),
    defaultValues: initialValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block font-medium">Name</label>
        <input
          {...register("name")}
          className="w-full border p-2 rounded"
          placeholder="Enter member name"
        />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
      </div>

      <div>
        <label className="block font-medium">Email</label>
        <input
          {...register("email")}
          type="email"
          className="w-full border p-2 rounded"
          placeholder="Enter email"
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
      </div>

      <div>
        <label className="block font-medium">Date Joined</label>
        <input
          {...register("dateJoined")}
          type="date"
          className="w-full border p-2 rounded"
        />
        {errors.dateJoined && <p className="text-red-500">{errors.dateJoined.message}</p>}
      </div>

      <div>
        <label className="block font-medium">Status</label>
        <select {...register("status")} className="w-full border p-2 rounded">
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="pending">Pending</option>
        </select>
        {errors.status && <p className="text-red-500">{errors.status.message}</p>}
      </div>

      <button
        type="submit"
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        Submit
      </button>
    </form>
  );
};

export default MemberForm;
