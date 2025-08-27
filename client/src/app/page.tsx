"use client";

import { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";

export default function Home() {
  const [token, setToken] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [issues, setIssues] = useState<any[]>([]);
  const [statusFilter, setStatusFilter] = useState("all");

  const login = async () => {
    try {
      const res = await axios.post("http://localhost:3001/api/login", { email, password });
      setToken(res.data.token);
      localStorage.setItem("token", res.data.token);
      await fetchIssues(res.data.token);
    } catch (error) {
      const err = error as AxiosError<{ error?: string }>;
      console.error("Login error:", err);
      alert("Login failed: " + (err.response?.data?.error || "Unknown error"));
    }
  };

  const register = async () => {
    try {
      await axios.post("http://localhost:3001/api/register", { email, password });
      alert("Registration successful, logging in...");
      await login();
    } catch (error) {
      const err = error as AxiosError<{ error?: string }>;
      console.error("Registration error:", err);
      alert("Registration failed: " + (err.response?.data?.error || "Unknown error"));
    }
  };

  const fetchIssues = async (token: string) => {
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const url = statusFilter === "all" ? "http://localhost:3001/api/issues" : `http://localhost:3001/api/issues/filter?status=${statusFilter}`;
      const res = await axios.get(url, config);
      setIssues(res.data);
    } catch (error) {
      const err = error as AxiosError<{ error?: string }>;
      console.error("Fetch issues error:", err);
      alert("Failed to fetch issues: " + (err.response?.data?.error || "Unknown error"));
    }
  };

  const createIssue = async () => {
    if (!token) return;
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      await axios.post("http://localhost:3001/api/issues", { title, description }, config);
      setTitle("");
      setDescription("");
      await fetchIssues(token);
    } catch (error) {
      const err = error as AxiosError<{ error?: string }>;
      console.error("Create issue error:", err);
      alert("Failed to create issue: " + (err.response?.data?.error || "Unknown error"));
    }
  };

  const updateStatus = async (id: number, status: string) => {
    if (!token) return;
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      await axios.put(`http://localhost:3001/api/issues/${id}`, { status }, config);
      await fetchIssues(token);
    } catch (error) {
      const err = error as AxiosError<{ error?: string }>;
      console.error("Update status error:", err);
      alert("Failed to update issue: " + (err.response?.data?.error || "Unknown error"));
    }
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      fetchIssues(storedToken);
    }
  }, [statusFilter]);

  if (!token) {
    return (
      <div style={{ padding: "16px" }}>
        <h1 style={{ fontSize: "24px", marginBottom: "16px" }}>Issue Tracker</h1>
        <div style={{ marginBottom: "16px" }}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ border: "1px solid #ccc", padding: "8px", marginRight: "8px" }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ border: "1px solid #ccc", padding: "8px", marginRight: "8px" }}
          />
          <button
            onClick={login}
            style={{ backgroundColor: "#3b82f6", color: "white", padding: "8px", marginRight: "8px" }}
          >
            Login
          </button>
          <button
            onClick={register}
            style={{ backgroundColor: "#22c55e", color: "white", padding: "8px" }}
          >
            Register
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: "16px" }}>
      <h1 style={{ fontSize: "24px", marginBottom: "16px" }}>Issue Tracker</h1>
      <button
        onClick={() => {
          setToken(null);
          localStorage.removeItem("token");
        }}
        style={{ backgroundColor: "#ef4444", color: "white", padding: "8px", marginBottom: "16px" }}
      >
        Logout
      </button>
      <div style={{ marginBottom: "16px" }}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ border: "1px solid #ccc", padding: "8px", marginRight: "8px" }}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ border: "1px solid #ccc", padding: "8px", marginRight: "8px" }}
        />
        <button
          onClick={createIssue}
          style={{ backgroundColor: "#3b82f6", color: "white", padding: "8px" }}
        >
          Add Issue
        </button>
      </div>
      <div style={{ marginBottom: "16px" }}>
        <label style={{ marginRight: "8px" }}>Filter by Status:</label>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          style={{ border: "1px solid #ccc", padding: "8px" }}
        >
          <option value="all">All</option>
          <option value="open">Open</option>
          <option value="closed">Closed</option>
        </select>
      </div>
      <ul>
        {issues.map((issue) => (
          <li
            key={issue.id}
            style={{ border: "1px solid #ccc", padding: "8px", marginBottom: "8px" }}
          >
            <h3>{issue.title}</h3>
            <p>{issue.description}</p>
            <p>Status: {issue.status}</p>
            <button
              onClick={() => updateStatus(issue.id, issue.status === "open" ? "closed" : "open")}
              style={{ backgroundColor: "#f59e0b", color: "white", padding: "4px" }}
            >
              Toggle Status
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}