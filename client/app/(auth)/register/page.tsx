"use client";
import { useState } from "react";
import axios from "axios";

type RegisterPayload = {
  name: string;
  email: string;
  reg_no: string;
  year: string;
  domain: string;
};

export default function RegisterPage() {
  const [payload, setPayload] = useState<RegisterPayload>({
    name: "",
    email: "",
    reg_no: "",
    year: "",
    domain: ""
  });

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const r = await axios.post<{ user: { ref_code: string } }>("/api/auth/register", payload);
      alert(`Registered. Ref code: ${r.data.user.ref_code}`);
    } catch (err: any) {
      alert(err.response?.data?.error || err.message);
    }
  }

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={submit}>
        <input
          placeholder="name"
          value={payload.name}
          onChange={(e) => setPayload({ ...payload, name: e.target.value })}
          required
        />
        <input
          placeholder="email"
          type="email"
          value={payload.email}
          onChange={(e) => setPayload({ ...payload, email: e.target.value })}
          required
        />
        <input
          placeholder="reg_no"
          value={payload.reg_no}
          onChange={(e) => setPayload({ ...payload, reg_no: e.target.value })}
          required
        />
        <input
          placeholder="year"
          value={payload.year}
          onChange={(e) => setPayload({ ...payload, year: e.target.value })}
          required
        />
        <input
          placeholder="domain"
          value={payload.domain}
          onChange={(e) => setPayload({ ...payload, domain: e.target.value })}
          required
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
