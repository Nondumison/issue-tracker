interface ListViewProps {
    filteredIssues: any[];
    users: any[];
    updateStatus: (id: number, status: string) => void;
    deleteIssue: (id: number) => void;
  }
  
  export default function ListView({
    filteredIssues,
    users,
    updateStatus,
    deleteIssue,
  }: ListViewProps) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Title</th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                <th scope="col" className="hidden md:table-cell px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Assigned To</th>
                <th scope="col" className="hidden sm:table-cell px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Created</th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredIssues.map((issue) => (
                <tr key={issue.id}>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">{issue.title}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 truncate max-w-xs">{issue.description}</div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      issue.status === "open" 
                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" 
                        : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                    }`}>
                      {issue.status}
                    </span>
                  </td>
                  <td className="hidden md:table-cell px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {users.find((u) => u.id === issue.assignedTo)?.email || "Unassigned"}
                  </td>
                  <td className="hidden sm:table-cell px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {new Date(issue.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button
                      onClick={() => updateStatus(issue.id, issue.status === "open" ? "closed" : "open")}
                      className="text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300"
                    >
                      {issue.status === "open" ? "Close" : "Reopen"}
                    </button>
                    {issue.status === "closed" && (
                      <button
                        onClick={() => deleteIssue(issue.id)}
                        className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300"
                      >
                        Delete
                      </button>
                    )}
                  </td>
                </tr>
              ))}
              {filteredIssues.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-gray-500 dark:text-gray-400">
                    No issues found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  }