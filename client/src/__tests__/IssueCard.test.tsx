import { render, screen, fireEvent } from "@testing-library/react";
import IssueCard from "../components/IssueCard";
import "@testing-library/jest-dom";

describe("IssueCard", () => {
  const mockUpdateStatus = jest.fn();
  const mockDeleteIssue = jest.fn();

  const users = [
    { id: 1, email: "creator@example.com" },
    { id: 2, email: "assignee@example.com" },
  ];

  const baseIssue = {
    id: 123,
    title: "Sample Issue",
    description: "This is a test issue",
    createdAt: new Date("2024-08-27").toISOString(),
    createdBy: 1,
    assignedTo: 2,
    status: "open",
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders issue details", () => {
    render(
      <IssueCard
        issue={baseIssue}
        users={users}
        updateStatus={mockUpdateStatus}
        deleteIssue={mockDeleteIssue}
      />
    );

    expect(screen.getByText("Sample Issue")).toBeInTheDocument();
    expect(screen.getByText("This is a test issue")).toBeInTheDocument();
    expect(screen.getByText(/Created:/)).toBeInTheDocument();
    expect(screen.getByText("By: creator@example.com")).toBeInTheDocument();
    expect(screen.getByText("assignee@example.com")).toBeInTheDocument();
    expect(screen.getByText("open")).toBeInTheDocument();
  });

  it("shows 'Unassigned' if no user is assigned", () => {
    const unassignedIssue = { ...baseIssue, assignedTo: null };
    render(
      <IssueCard
        issue={unassignedIssue}
        users={users}
        updateStatus={mockUpdateStatus}
        deleteIssue={mockDeleteIssue}
      />
    );
    expect(screen.getByText("Unassigned")).toBeInTheDocument();
  });

  it("calls updateStatus when status button is clicked", () => {
    render(
      <IssueCard
        issue={baseIssue}
        users={users}
        updateStatus={mockUpdateStatus}
        deleteIssue={mockDeleteIssue}
      />
    );

    const button = screen.getByRole("button", { name: /Close Issue/i });
    fireEvent.click(button);
    expect(mockUpdateStatus).toHaveBeenCalledWith(123, "closed");
  });

  it("shows delete button when issue is closed", () => {
    const closedIssue = { ...baseIssue, status: "closed" };
    render(
      <IssueCard
        issue={closedIssue}
        users={users}
        updateStatus={mockUpdateStatus}
        deleteIssue={mockDeleteIssue}
      />
    );

    const deleteButton = screen.getByRole("button", { name: /Delete/i });
    expect(deleteButton).toBeInTheDocument();

    fireEvent.click(deleteButton);
    expect(mockDeleteIssue).toHaveBeenCalledWith(123);
  });
});
