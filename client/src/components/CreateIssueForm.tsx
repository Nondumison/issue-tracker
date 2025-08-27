import { Dispatch, SetStateAction } from "react";

interface CreateIssueFormProps {
  title: string;
  setTitle: Dispatch<SetStateAction<string>>;
  description: string;
  setDescription: Dispatch<SetStateAction<string>>;
  assignedTo: string;
  setAssignedTo: Dispatch<SetStateAction<string>>;
  users: any[];
  createIssue: () => void;
  setShowCreateForm: Dispatch<SetStateAction<boolean>>;
}

export default function CreateIssueForm({
  title,
  setTitle,
  description,
  setDescription,
  assignedTo,
  setAssignedTo,
  users,
  createIssue,
  setShowCreateForm,
}: CreateIssueFormProps) {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 md:p-6 rounded-xl shadow-md mb-6">
      <h3 className="text-lg font-semibold mb-4">Create New Issue</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title</label>
          <input
            type="text"
            placeholder="Issue title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Assign To</label>
          <select
            value={assignedTo}
            onChange={(e) => setAssignedTo(e.target.value)}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Unassigned</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.email}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
        <textarea
          placeholder="Issue description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="flex justify-end space-x-3">
        <button
          onClick={() => setShowCreateForm(false)}
          className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-medium py-2 px-4 rounded-lg transition"
        >
          Cancel
        </button>
        <button
          onClick={createIssue}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition"
        >
          Create Issue
        </button>
      </div>
    </div>
  );
}