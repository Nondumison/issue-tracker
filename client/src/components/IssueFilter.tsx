import { Dispatch, SetStateAction } from "react";

interface IssueFilterProps {
  statusFilter: string;
  setStatusFilter: Dispatch<SetStateAction<string>>;
}

export default function IssueFilter({ statusFilter, setStatusFilter }: IssueFilterProps) {
  return (
    <div className="bg-white dark:bg-gray-800 p-2 rounded-lg shadow-sm">
      <label htmlFor="status-filter" className="font-semibold mr-2 text-sm">Filter by Status:</label>
      <select
        id="status-filter"
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
        className="p-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="all">All</option>
        <option value="open">Open</option>
        <option value="closed">Closed</option>
      </select>
    </div>
  );
}