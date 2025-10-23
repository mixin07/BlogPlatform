export type MemberStatus = "active" | "inactive" | "pending";

export interface Member {
  id: number;           // Unique identifier
  name: string;         // Member name
  email: string;        // Member email
  dateJoined: string;   // ISO date
  status: MemberStatus; // Current status
}
