interface IssueCardProps {
    issue: any;
    users: any[];
    updateStatus: (id: number, status: string) => void;
    deleteIssue: (id: number) => void;
  }
  
  export default function IssueCard({ issue, users, updateStatus, deleteIssue }: IssueCardProps) {
    return (
      <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow border-l-4 border-blue-500 hover:shadow-md transition">
        <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">{issue.title}</h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{issue.description}</p>
        
        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-4">
          <span>Created: {new Date(issue.createdAt).toLocaleDateString()}</span>
          <span>By: {users.find((u) => u.id === issue.createdBy)?.email || "Unknown"}</span>
        </div>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <span className="text-xs font-medium mr-2">Assigned to:</span>
            <span className="text-xs px-2 py-1 bg-gray-200 dark:bg-gray-600 rounded-full">
              {users.find((u) => u.id === issue.assignedTo)?.email || "Unassigned"}
            </span>
          </div>
          
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            issue.status === "open" 
              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" 
              : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
          }`}>
            {issue.status}
          </span>
        </div>
        
        <div className="flex space-x-2">
          <button
            onClick={() => updateStatus(issue.id, issue.status === "open" ? "closed" : "open")}
            className="flex-1 bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 text-gray-800 dark:text-gray-200 text-sm font-medium py-2 px-3 rounded-lg transition"
          >
            {issue.status === "open" ? "Close Issue" : "Reopen Issue"}
          </button>
          {issue.status === "closed" && (
            <button
              onClick={() => deleteIssue(issue.id)}
              className="bg-red-100 dark:bg-red-900 hover:bg-red-200 dark:hover:bg-red-800 text-red-800 dark:text-red-200 text-sm font-medium py-2 px-3 rounded-lg transition"
            >
              Delete
            </button>
          )}
        </div>
      </div>
    );
  }