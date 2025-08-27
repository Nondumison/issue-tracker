// "use client";

// import { useState, useEffect } from "react";
// import axios, { AxiosError } from "axios";

// export default function Home() {
//   const [token, setToken] = useState<string | null>(null);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [assignedTo, setAssignedTo] = useState("");
//   const [issues, setIssues] = useState<any[]>([]);
//   const [statusFilter, setStatusFilter] = useState("all");
//   const [users, setUsers] = useState<any[]>([]);
//   const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
//   const [showCreateForm, setShowCreateForm] = useState(false);
//   const [activeTab, setActiveTab] = useState("board");
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

//   // Show toast for 3 seconds
//   const showToast = (message: string, type: "success" | "error") => {
//     setToast({ message, type });
//     setTimeout(() => setToast(null), 3000);
//   };

//   const login = async () => {
//     try {
//       const res = await axios.post("http://localhost:3001/api/login", { email, password });
//       setToken(res.data.token);
//       localStorage.setItem("token", res.data.token);
//       await fetchIssues(res.data.token);
//       await fetchUsers(res.data.token);
//       showToast("Login successful", "success");
//     } catch (error) {
//       const err = error as AxiosError<{ error?: string }>;
//       console.error("Login error:", err);
//       showToast("Login failed: " + (err.response?.data?.error || "Unknown error"), "error");
//     }
//   };

//   const register = async () => {
//     try {
//       await axios.post("http://localhost:3001/api/register", { email, password });
//       showToast("Registration successful, logging in...", "success");
//       await login();
//     } catch (error) {
//       const err = error as AxiosError<{ error?: string }>;
//       console.error("Registration error:", err);
//       showToast("Registration failed: " + (err.response?.data?.error || "Unknown error"), "error");
//     }
//   };

//   const fetchUsers = async (token: string) => {
//     try {
//       const config = { headers: { Authorization: `Bearer ${token}` } };
//       const res = await axios.get("http://localhost:3001/api/users", config);
//       setUsers(res.data);
//     } catch (error) {
//       const err = error as AxiosError<{ error?: string }>;
//       console.error("Fetch users error:", err);
//       if (err.response?.status === 403) {
//         showToast("Session expired. Please log in again.", "error");
//         setToken(null);
//         localStorage.removeItem("token");
//       } else {
//         showToast("Failed to fetch users: " + (err.response?.data?.error || "Unknown error"), "error");
//       }
//     }
//   };

//   const fetchIssues = async (token: string) => {
//     try {
//       const config = { headers: { Authorization: `Bearer ${token}` } };
//       const res = await axios.get("http://localhost:3001/api/issues", config);
//       setIssues(res.data);
//     } catch (error) {
//       const err = error as AxiosError<{ error?: string }>;
//       console.error("Fetch issues error:", err);
//       if (err.response?.status === 403) {
//         showToast("Session expired. Please log in again.", "error");
//         setToken(null);
//         localStorage.removeItem("token");
//       } else {
//         showToast("Failed to fetch issues: " + (err.response?.data?.error || "Unknown error"), "error");
//       }
//     }
//   };

//   const createIssue = async () => {
//     if (!token) return;
//     try {
//       const config = { headers: { Authorization: `Bearer ${token}` } };
//       await axios.post("http://localhost:3001/api/issues", { title, description, assignedTo: assignedTo || null }, config);
//       setTitle("");
//       setDescription("");
//       setAssignedTo("");
//       setShowCreateForm(false);
//       await fetchIssues(token);
//       showToast("Issue created successfully", "success");
//     } catch (error) {
//       const err = error as AxiosError<{ error?: string }>;
//       console.error("Create issue error:", err);
//       if (err.response?.status === 403) {
//         showToast("Session expired. Please log in again.", "error");
//         setToken(null);
//         localStorage.removeItem("token");
//       } else {
//         showToast("Failed to create issue: " + (err.response?.data?.error || "Unknown error"), "error");
//       }
//     }
//   };

//   const updateStatus = async (id: number, status: string) => {
//     if (!token) return;
//     try {
//       const config = { headers: { Authorization: `Bearer ${token}` } };
//       await axios.put(`http://localhost:3001/api/issues/${id}`, { status }, config);
//       await fetchIssues(token);
//       showToast("Issue status updated", "success");
//     } catch (error) {
//       const err = error as AxiosError<{ error?: string }>;
//       console.error("Update status error:", err);
//       if (err.response?.status === 403) {
//         showToast("Session expired. Please log in again.", "error");
//         setToken(null);
//         localStorage.removeItem("token");
//       } else {
//         showToast("Failed to update issue: " + (err.response?.data?.error || "Unknown error"), "error");
//       }
//     }
//   };

//   const deleteIssue = async (id: number) => {
//     if (!token) return;
//     try {
//       const config = { headers: { Authorization: `Bearer ${token}` } };
//       await axios.delete(`http://localhost:3001/api/issues/${id}`, config);
//       await fetchIssues(token);
//       showToast("Issue deleted successfully", "success");
//     } catch (error) {
//       const err = error as AxiosError<{ error?: string }>;
//       console.error("Delete issue error:", err);
//       if (err.response?.status === 403) {
//         showToast("Session expired. Please log in again.", "error");
//         setToken(null);
//         localStorage.removeItem("token");
//       } else {
//         showToast("Failed to delete issue: " + (err.response?.data?.error || "Unknown error"), "error");
//       }
//     }
//   };

//   useEffect(() => {
//     const storedToken = localStorage.getItem("token");
//     if (storedToken) {
//       setToken(storedToken);
//       fetchIssues(storedToken);
//       fetchUsers(storedToken);
//     }
//   }, []);

//   // Filter issues based on status
//   const filteredIssues = issues.filter(issue => {
//     if (statusFilter === "all") return true;
//     return issue.status === statusFilter;
//   });

//   // Group filtered issues by status for board view
//   const issuesByStatus = {
//     open: filteredIssues.filter(issue => issue.status === 'open'),
//     closed: filteredIssues.filter(issue => issue.status === 'closed')
//   };

//   if (!token) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
//         <div className="w-full max-w-md p-8 bg-white dark:bg-gray-800 rounded-xl shadow-2xl space-y-6">
//           <div className="text-center">
//             <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Issue Tracker</h1>
//             <p className="mt-2 text-gray-600 dark:text-gray-300">Sign in to your account</p>
//           </div>
          
//           <div className="space-y-4">
//             <div>
//               <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                 Email
//               </label>
//               <input
//                 id="email"
//                 type="email"
//                 placeholder="Enter your email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
//               />
//             </div>
            
//             <div>
//               <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                 Password
//               </label>
//               <input
//                 id="password"
//                 type="password"
//                 placeholder="Enter your password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
//               />
//             </div>
            
//             <div className="flex space-x-4 pt-2">
//               <button
//                 onClick={login}
//                 className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition shadow-md hover:shadow-lg"
//               >
//                 Login
//               </button>
//               <button
//                 onClick={register}
//                 className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition shadow-md hover:shadow-lg"
//               >
//                 Register
//               </button>
//             </div>
//           </div>
//         </div>
        
//         {toast && (
//           <div className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg text-white font-medium flex items-center justify-between space-x-4 transition-transform duration-300 ${toast.type === "success" ? "bg-green-600" : "bg-red-600"}`}>
//             <span>{toast.message}</span>
//             <button onClick={() => setToast(null)} className="text-white hover:text-gray-200">
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//                 <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
//               </svg>
//             </button>
//           </div>
//         )}
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
//       {/* Header */}
//       <header className="bg-white dark:bg-gray-800 shadow-sm">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center h-16">
//             <div className="flex items-center">
//               <h1 className="text-xl md:text-2xl font-bold text-blue-600 dark:text-blue-400">Issue Tracker</h1>
              
//               {/* Desktop Navigation */}
//               <nav className="hidden md:ml-8 md:flex space-x-4">
//                 <button 
//                   onClick={() => setActiveTab('board')} 
//                   className={`px-3 py-2 rounded-md text-sm font-medium ${activeTab === 'board' ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300' : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'}`}
//                 >
//                   Board
//                 </button>
//                 <button 
//                   onClick={() => setActiveTab('list')} 
//                   className={`px-3 py-2 rounded-md text-sm font-medium ${activeTab === 'list' ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300' : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'}`}
//                 >
//                   List
//                 </button>
//               </nav>
//             </div>
            
//             <div className="flex items-center space-x-4">
//               <span className="hidden md:inline text-sm text-gray-600 dark:text-gray-300">Welcome, {email}</span>
              
//               {/* Mobile menu button */}
//               <button 
//                 onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//                 className="md:hidden rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
//               >
//                 <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
//                 </svg>
//               </button>
              
//               <button
//                 onClick={() => {
//                   setToken(null);
//                   localStorage.removeItem("token");
//                 }}
//                 className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-medium py-2 px-4 rounded-lg transition hidden md:block"
//               >
//                 Logout
//               </button>
//             </div>
//           </div>
//         </div>
        
//         {/* Mobile Navigation */}
//         {mobileMenuOpen && (
//           <div className="md:hidden bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
//             <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
//               <button 
//                 onClick={() => { setActiveTab('board'); setMobileMenuOpen(false); }}
//                 className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${activeTab === 'board' ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300' : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'}`}
//               >
//                 Board
//               </button>
//               <button 
//                 onClick={() => { setActiveTab('list'); setMobileMenuOpen(false); }}
//                 className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${activeTab === 'list' ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300' : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'}`}
//               >
//                 List
//               </button>
//               <div className="px-3 py-2 text-sm text-gray-600 dark:text-gray-300">Welcome, {email}</div>
//               <button
//                 onClick={() => {
//                   setToken(null);
//                   localStorage.removeItem("token");
//                 }}
//                 className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
//               >
//                 Logout
//               </button>
//             </div>
//           </div>
//         )}
//       </header>

//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
//         {/* Create Issue Button and Filter */}
//         <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 space-y-4 md:space-y-0">
//           <h2 className="text-xl font-semibold">Issues</h2>
          
//           <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
//             <div className="bg-white dark:bg-gray-800 p-2 rounded-lg shadow-sm">
//               <label className="font-semibold mr-2 text-sm">Filter by Status:</label>
//               <select
//                 value={statusFilter}
//                 onChange={(e) => setStatusFilter(e.target.value)}
//                 className="p-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500"
//               >
//                 <option value="all">All</option>
//                 <option value="open">Open</option>
//                 <option value="closed">Closed</option>
//               </select>
//             </div>
            
//             <button
//               onClick={() => setShowCreateForm(!showCreateForm)}
//               className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition flex items-center justify-center space-x-2"
//             >
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//                 <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
//               </svg>
//               <span>Create Issue</span>
//             </button>
//           </div>
//         </div>

//         {/* Create Issue Form */}
//         {showCreateForm && (
//           <div className="bg-white dark:bg-gray-800 p-4 md:p-6 rounded-xl shadow-md mb-6">
//             <h3 className="text-lg font-semibold mb-4">Create New Issue</h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title</label>
//                 <input
//                   type="text"
//                   placeholder="Issue title"
//                   value={title}
//                   onChange={(e) => setTitle(e.target.value)}
//                   className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Assign To</label>
//                 <select
//                   value={assignedTo}
//                   onChange={(e) => setAssignedTo(e.target.value)}
//                   className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 >
//                   <option value="">Unassigned</option>
//                   {users.map((user) => (
//                     <option key={user.id} value={user.id}>
//                       {user.email}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             </div>
//             <div className="mb-4">
//               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
//               <textarea
//                 placeholder="Issue description"
//                 value={description}
//                 onChange={(e) => setDescription(e.target.value)}
//                 rows={3}
//                 className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>
//             <div className="flex justify-end space-x-3">
//               <button
//                 onClick={() => setShowCreateForm(false)}
//                 className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-medium py-2 px-4 rounded-lg transition"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={createIssue}
//                 className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition"
//               >
//                 Create Issue
//               </button>
//             </div>
//           </div>
//         )}

//         {/* Board View */}
//         {activeTab === 'board' ? (
//           <div className={`grid gap-6 ${statusFilter === 'all' ? 'md:grid-cols-2' : 'md:grid-cols-1'}`}>
//             {/* Open Issues Column - only show if 'all' or 'open' is selected */}
//             {(statusFilter === 'all' || statusFilter === 'open') && (
//               <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl shadow-sm">
//                 <h3 className="font-semibold text-lg mb-4 flex items-center">
//                   <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
//                   Open Issues ({issuesByStatus.open.length})
//                 </h3>
//                 <div className="space-y-4">
//                   {issuesByStatus.open.map((issue) => (
//                     <IssueCard 
//                       key={issue.id} 
//                       issue={issue} 
//                       users={users} 
//                       updateStatus={updateStatus} 
//                       deleteIssue={deleteIssue}
//                     />
//                   ))}
//                   {issuesByStatus.open.length === 0 && (
//                     <div className="text-center py-8 text-gray-500 dark:text-gray-400">
//                       No open issues
//                     </div>
//                   )}
//                 </div>
//               </div>
//             )}

//             {/* Closed Issues Column - only show if 'all' or 'closed' is selected */}
//             {(statusFilter === 'all' || statusFilter === 'closed') && (
//               <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl shadow-sm">
//                 <h3 className="font-semibold text-lg mb-4 flex items-center">
//                   <span className="w-3 h-3 bg-red-500 rounded-full mr-2"></span>
//                   Closed Issues ({issuesByStatus.closed.length})
//                 </h3>
//                 <div className="space-y-4">
//                   {issuesByStatus.closed.map((issue) => (
//                     <IssueCard 
//                       key={issue.id} 
//                       issue={issue} 
//                       users={users} 
//                       updateStatus={updateStatus} 
//                       deleteIssue={deleteIssue}
//                     />
//                   ))}
//                   {issuesByStatus.closed.length === 0 && (
//                     <div className="text-center py-8 text-gray-500 dark:text-gray-400">
//                       No closed issues
//                     </div>
//                   )}
//                 </div>
//               </div>
//             )}
//           </div>
//         ) : (
//           /* List View */
//           <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
//             <div className="overflow-x-auto">
//               <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
//                 <thead className="bg-gray-50 dark:bg-gray-700">
//                   <tr>
//                     <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Title</th>
//                     <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
//                     <th scope="col" className="hidden md:table-cell px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Assigned To</th>
//                     <th scope="col" className="hidden sm:table-cell px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Created</th>
//                     <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
//                   {filteredIssues.map((issue) => (
//                     <tr key={issue.id}>
//                       <td className="px-4 py-4 whitespace-nowrap">
//                         <div className="text-sm font-medium text-gray-900 dark:text-white">{issue.title}</div>
//                         <div className="text-sm text-gray-500 dark:text-gray-400 truncate max-w-xs">{issue.description}</div>
//                       </td>
//                       <td className="px-4 py-4 whitespace-nowrap">
//                         <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
//                           issue.status === "open" 
//                             ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" 
//                             : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
//                         }`}>
//                           {issue.status}
//                         </span>
//                       </td>
//                       <td className="hidden md:table-cell px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
//                         {users.find((u) => u.id === issue.assignedTo)?.email || "Unassigned"}
//                       </td>
//                       <td className="hidden sm:table-cell px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
//                         {new Date(issue.createdAt).toLocaleDateString()}
//                       </td>
//                       <td className="px-4 py-4 whitespace-nowrap text-sm font-medium space-x-2">
//                         <button
//                           onClick={() => updateStatus(issue.id, issue.status === "open" ? "closed" : "open")}
//                           className="text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300"
//                         >
//                           {issue.status === "open" ? "Close" : "Reopen"}
//                         </button>
//                         {issue.status === "closed" && (
//                           <button
//                             onClick={() => deleteIssue(issue.id)}
//                             className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300"
//                           >
//                             Delete
//                           </button>
//                         )}
//                       </td>
//                     </tr>
//                   ))}
//                   {filteredIssues.length === 0 && (
//                     <tr>
//                       <td colSpan={5} className="px-4 py-8 text-center text-gray-500 dark:text-gray-400">
//                         No issues found
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         )}
//       </main>

//       {toast && (
//         <div className={`fixed bottom-4 right-4 md:top-4 md:bottom-auto p-4 rounded-lg shadow-lg text-white font-medium flex items-center justify-between space-x-4 transition-transform duration-300 ${toast.type === "success" ? "bg-green-600" : "bg-red-600"}`}>
//           <span>{toast.message}</span>
//           <button onClick={() => setToast(null)} className="text-white hover:text-gray-200">
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//               <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
//             </svg>
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }

// // Issue Card Component for Board View
// function IssueCard({ issue, users, updateStatus, deleteIssue }: { 
//   issue: any; 
//   users: any[]; 
//   updateStatus: (id: number, status: string) => void; 
//   deleteIssue: (id: number) => void;
// }) {
//   return (
//     <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow border-l-4 border-blue-500 hover:shadow-md transition">
//       <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">{issue.title}</h3>
//       <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{issue.description}</p>
      
//       <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-4">
//         <span>Created: {new Date(issue.createdAt).toLocaleDateString()}</span>
//         <span>By: {users.find((u) => u.id === issue.createdBy)?.email || "Unknown"}</span>
//       </div>
      
//       <div className="flex items-center justify-between mb-4">
//         <div className="flex items-center">
//           <span className="text-xs font-medium mr-2">Assigned to:</span>
//           <span className="text-xs px-2 py-1 bg-gray-200 dark:bg-gray-600 rounded-full">
//             {users.find((u) => u.id === issue.assignedTo)?.email || "Unassigned"}
//           </span>
//         </div>
        
//         <span className={`px-2 py-1 rounded-full text-xs font-medium ${
//           issue.status === "open" 
//             ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" 
//             : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
//         }`}>
//           {issue.status}
//         </span>
//       </div>
      
//       <div className="flex space-x-2">
//         <button
//           onClick={() => updateStatus(issue.id, issue.status === "open" ? "closed" : "open")}
//           className="flex-1 bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 text-gray-800 dark:text-gray-200 text-sm font-medium py-2 px-3 rounded-lg transition"
//         >
//           {issue.status === "open" ? "Close Issue" : "Reopen Issue"}
//         </button>
//         {issue.status === "closed" && (
//           <button
//             onClick={() => deleteIssue(issue.id)}
//             className="bg-red-100 dark:bg-red-900 hover:bg-red-200 dark:hover:bg-red-800 text-red-800 dark:text-red-200 text-sm font-medium py-2 px-3 rounded-lg transition"
//           >
//             Delete
//           </button>
//         )}
//       </div>
//     </div>
//   );
// }

// src/app/page.tsx
"use client";

import { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
import AuthForm from "../components/AuthForm";
import Header from "../components/Header";
import IssueFilter from "../components/IssueFilter";
import CreateIssueForm from "../components/CreateIssueForm";
import BoardView from "../components/BoardView";
import ListView from "../components/ListView";
import Toast from "../components/Toast";

export default function Home() {
  const [token, setToken] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [issues, setIssues] = useState<any[]>([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [users, setUsers] = useState<any[]>([]);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [activeTab, setActiveTab] = useState("board");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Show toast for 3 seconds
  const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const login = async () => {
    try {
      const res = await axios.post("http://localhost:3001/api/login", { email, password });
      setToken(res.data.token);
      localStorage.setItem("token", res.data.token);
      await fetchIssues(res.data.token);
      await fetchUsers(res.data.token);
      showToast("Login successful", "success");
    } catch (error) {
      const err = error as AxiosError<{ error?: string }>;
      console.error("Login error:", err);
      showToast("Login failed: " + (err.response?.data?.error || "Unknown error"), "error");
    }
  };

  const register = async () => {
    try {
      await axios.post("http://localhost:3001/api/register", { email, password });
      showToast("Registration successful, logging in...", "success");
      await login();
    } catch (error) {
      const err = error as AxiosError<{ error?: string }>;
      console.error("Registration error:", err);
      showToast("Registration failed: " + (err.response?.data?.error || "Unknown error"), "error");
    }
  };

  const fetchUsers = async (token: string) => {
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const res = await axios.get("http://localhost:3001/api/users", config);
      setUsers(res.data);
    } catch (error) {
      const err = error as AxiosError<{ error?: string }>;
      console.error("Fetch users error:", err);
      if (err.response?.status === 403) {
        showToast("Session expired. Please log in again.", "error");
        setToken(null);
        localStorage.removeItem("token");
      } else {
        showToast("Failed to fetch users: " + (err.response?.data?.error || "Unknown error"), "error");
      }
    }
  };

  const fetchIssues = async (token: string) => {
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const res = await axios.get("http://localhost:3001/api/issues", config);
      setIssues(res.data);
    } catch (error) {
      const err = error as AxiosError<{ error?: string }>;
      console.error("Fetch issues error:", err);
      if (err.response?.status === 403) {
        showToast("Session expired. Please log in again.", "error");
        setToken(null);
        localStorage.removeItem("token");
      } else {
        showToast("Failed to fetch issues: " + (err.response?.data?.error || "Unknown error"), "error");
      }
    }
  };

  const createIssue = async () => {
    if (!token) return;
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      await axios.post("http://localhost:3001/api/issues", { title, description, assignedTo: assignedTo || null }, config);
      setTitle("");
      setDescription("");
      setAssignedTo("");
      setShowCreateForm(false);
      await fetchIssues(token);
      showToast("Issue created successfully", "success");
    } catch (error) {
      const err = error as AxiosError<{ error?: string }>;
      console.error("Create issue error:", err);
      if (err.response?.status === 403) {
        showToast("Session expired. Please log in again.", "error");
        setToken(null);
        localStorage.removeItem("token");
      } else {
        showToast("Failed to create issue: " + (err.response?.data?.error || "Unknown error"), "error");
      }
    }
  };

  const updateStatus = async (id: number, status: string) => {
    if (!token) return;
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      await axios.put(`http://localhost:3001/api/issues/${id}`, { status }, config);
      await fetchIssues(token);
      showToast("Issue status updated", "success");
    } catch (error) {
      const err = error as AxiosError<{ error?: string }>;
      console.error("Update status error:", err);
      if (err.response?.status === 403) {
        showToast("Session expired. Please log in again.", "error");
        setToken(null);
        localStorage.removeItem("token");
      } else {
        showToast("Failed to update issue: " + (err.response?.data?.error || "Unknown error"), "error");
      }
    }
  };

  const deleteIssue = async (id: number) => {
    if (!token) return;
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      await axios.delete(`http://localhost:3001/api/issues/${id}`, config);
      await fetchIssues(token);
      showToast("Issue deleted successfully", "success");
    } catch (error) {
      const err = error as AxiosError<{ error?: string }>;
      console.error("Delete issue error:", err);
      if (err.response?.status === 403) {
        showToast("Session expired. Please log in again.", "error");
        setToken(null);
        localStorage.removeItem("token");
      } else {
        showToast("Failed to delete issue: " + (err.response?.data?.error || "Unknown error"), "error");
      }
    }
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      fetchIssues(storedToken);
      fetchUsers(storedToken);
    }
  }, []);

  // Filter issues based on status
  const filteredIssues = issues.filter(issue => {
    if (statusFilter === "all") return true;
    return issue.status === statusFilter;
  });

  // Group filtered issues by status for board view
  const issuesByStatus = {
    open: filteredIssues.filter(issue => issue.status === 'open'),
    closed: filteredIssues.filter(issue => issue.status === 'closed')
  };

  if (!token) {
    return (
      <AuthForm 
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        login={login}
        register={register}
        toast={toast}
        setToast={setToast}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Header 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        email={email}
        logout={logout}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Create Issue Button and Filter */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 space-y-4 md:space-y-0">
          <h2 className="text-xl font-semibold">Issues</h2>
          
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
            <IssueFilter 
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
            />
            
            <button
              onClick={() => setShowCreateForm(!showCreateForm)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition flex items-center justify-center space-x-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              <span>Create Issue</span>
            </button>
          </div>
        </div>

        {/* Create Issue Form */}
        {showCreateForm && (
          <CreateIssueForm 
            title={title}
            setTitle={setTitle}
            description={description}
            setDescription={setDescription}
            assignedTo={assignedTo}
            setAssignedTo={setAssignedTo}
            users={users}
            createIssue={createIssue}
            setShowCreateForm={setShowCreateForm}
          />
        )}

        {/* Board or List View */}
        {activeTab === 'board' ? (
          <BoardView 
            statusFilter={statusFilter}
            issuesByStatus={issuesByStatus}
            users={users}
            updateStatus={updateStatus}
            deleteIssue={deleteIssue}
          />
        ) : (
          <ListView 
            filteredIssues={filteredIssues}
            users={users}
            updateStatus={updateStatus}
            deleteIssue={deleteIssue}
          />
        )}
      </main>

      <Toast toast={toast} setToast={setToast} />
    </div>
  );
}