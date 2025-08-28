import IssueCard from "./IssueCard";

interface BoardViewProps {
  statusFilter: string;
  issuesByStatus: { open: any[]; closed: any[] };
  users: any[];
  updateStatus: (id: number, status: string) => void;
  deleteIssue: (id: number) => void;
}

export default function BoardView({
  statusFilter,
  issuesByStatus,
  users,
  updateStatus,
  deleteIssue,
}: BoardViewProps) {
  return (
    <div className={`grid gap-6 ${statusFilter === 'all' ? 'md:grid-cols-2' : 'md:grid-cols-1'}`}>
      {(statusFilter === 'all' || statusFilter === 'open') && (
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl shadow-sm">
          <h3 className="font-semibold text-lg mb-4 flex items-center">
            <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
            Open Issues ({issuesByStatus.open.length})
          </h3>
          <div className="space-y-4">
            {issuesByStatus.open.map((issue) => (
              <IssueCard 
                key={issue.id} 
                issue={issue} 
                users={users} 
                updateStatus={updateStatus} 
                deleteIssue={deleteIssue}
              />
            ))}
            {issuesByStatus.open.length === 0 && (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                No open issues
              </div>
            )}
          </div>
        </div>
      )}

      {(statusFilter === 'all' || statusFilter === 'closed') && (
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl shadow-sm">
          <h3 className="font-semibold text-lg mb-4 flex items-center">
            <span className="w-3 h-3 bg-red-500 rounded-full mr-2"></span>
            Closed Issues ({issuesByStatus.closed.length})
          </h3>
          <div className="space-y-4">
            {issuesByStatus.closed.map((issue) => (
              <IssueCard 
                key={issue.id} 
                issue={issue} 
                users={users} 
                updateStatus={updateStatus} 
                deleteIssue={deleteIssue}
              />
            ))}
            {issuesByStatus.closed.length === 0 && (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                No closed issues
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}