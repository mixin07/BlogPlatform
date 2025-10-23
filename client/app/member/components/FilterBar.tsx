"use client";

import React from "react";

interface FilterBarProps {
  search: string;
  setSearch: (value: string) => void;
  filterStatus: string;
  setFilterStatus: (value: string) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ search, setSearch, filterStatus, setFilterStatus }) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between mb-4 gap-2">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search by name or email..."
        className="border p-2 rounded w-full sm:w-1/2"
      />

      <select
        value={filterStatus}
        onChange={(e) => setFilterStatus(e.target.value)}
        className="border p-2 rounded w-full sm:w-1/4"
      >
        <option value="">All Status</option>
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
        <option value="pending">Pending</option>
      </select>
    </div>
  );
};

export default FilterBar;
