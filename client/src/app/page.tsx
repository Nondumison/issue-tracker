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
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [activeTab, setActiveTab] = useState("board");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const login = async () => {
    try {
      const res = await axios.post("http://localhost:3001/api/login", {
        email,
        password,
      });
      setToken(res.data.token);
      localStorage.setItem("token", res.data.token);
      await fetchIssues(res.data.token);
      await fetchUsers(res.data.token);
      showToast("Login successful", "success");
    } catch (error) {
      const err = error as AxiosError<{ error?: string }>;
      console.error("Login error:", err);
      showToast(
        "Login failed: " + (err.response?.data?.error || "Unknown error"),
        "error"
      );
    }
  };

  const register = async () => {
    try {
      await axios.post("http://localhost:3001/api/register", {
        email,
        password,
      });
      showToast("Registration successful, logging in...", "success");
      await login();
    } catch (error) {
      const err = error as AxiosError<{ error?: string }>;
      console.error("Registration error:", err);
      showToast(
        "Registration failed: " +
          (err.response?.data?.error || "Unknown error"),
        "error"
      );
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
        showToast(
          "Failed to fetch users: " +
            (err.response?.data?.error || "Unknown error"),
          "error"
        );
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
        showToast(
          "Failed to fetch issues: " +
            (err.response?.data?.error || "Unknown error"),
          "error"
        );
      }
    }
  };

  const createIssue = async () => {
    if (!token) return;
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      await axios.post(
        "http://localhost:3001/api/issues",
        { title, description, assignedTo: assignedTo || null },
        config
      );
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
        showToast(
          "Failed to create issue: " +
            (err.response?.data?.error || "Unknown error"),
          "error"
        );
      }
    }
  };

  const updateStatus = async (id: number, status: string) => {
    if (!token) return;
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      await axios.put(
        `http://localhost:3001/api/issues/${id}`,
        { status },
        config
      );
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
        showToast(
          "Failed to update issue: " +
            (err.response?.data?.error || "Unknown error"),
          "error"
        );
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
        showToast(
          "Failed to delete issue: " +
            (err.response?.data?.error || "Unknown error"),
          "error"
        );
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

  const filteredIssues = issues.filter((issue) => {
    if (statusFilter === "all") return true;
    return issue.status === statusFilter;
  });

  const issuesByStatus = {
    open: filteredIssues.filter((issue) => issue.status === "open"),
    closed: filteredIssues.filter((issue) => issue.status === "closed"),
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
    // <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
    <div className="min-h-screen bg-gradient-to-br from-blue-300 via-purple-300 to-indigo-400 text-gray-900 dark:text-gray-100">

      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        email={email}
        logout={logout}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Create Issue</span>
            </button>
          </div>
        </div>

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

        {activeTab === "board" ? (
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
