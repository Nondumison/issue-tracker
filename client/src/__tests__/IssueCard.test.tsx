// import { render, screen, fireEvent } from '@testing-library/react';
// import IssueCard from '../components/IssueCard';


// describe('IssueCard', () => {
//   const mockIssue = {
//     id: 1,
//     title: 'Test Issue',
//     description: 'This is a test issue',
//     status: 'open',
//     createdAt: '2025-08-27T10:00:00Z',
//     createdBy: 1,
//     assignedTo: 2,
//   };
//   const mockUsers = [
//     { id: 1, email: 'creator@example.com' },
//     { id: 2, email: 'assignee@example.com' },
//   ];
//   const mockUpdateStatus = jest.fn();
//   const mockDeleteIssue = jest.fn();

//   it('renders issue title and description', () => {
//     render(
//       <IssueCard
//         issue={mockIssue}
//         users={mockUsers}
//         updateStatus={mockUpdateStatus}
//         deleteIssue={mockDeleteIssue}
//       />
//     );
//     expect(screen.getByText('Test Issue')).toBeInTheDocument();
//     expect(screen.getByText('This is a test issue')).toBeInTheDocument();
//   });

//   it('displays correct creator and assignee', () => {
//     render(
//       <IssueCard
//         issue={mockIssue}
//         users={mockUsers}
//         updateStatus={mockUpdateStatus}
//         deleteIssue={mockDeleteIssue}
//       />
//     );
//     expect(screen.getByText('By: creator@example.com')).toBeInTheDocument();
//     expect(screen.getByText('assignee@example.com')).toBeInTheDocument();
//   });

//   it('shows open status and close button', () => {
//     render(
//       <IssueCard
//         issue={mockIssue}
//         users={mockUsers}
//         updateStatus={mockUpdateStatus}
//         deleteIssue={mockDeleteIssue}
//       />
//     );
//     expect(screen.getByText('open')).toHaveClass('bg-green-100');
//     expect(screen.getByText('Close Issue')).toBeInTheDocument();
//     expect(screen.queryByText('Delete')).not.toBeInTheDocument();
//   });

//   it('calls updateStatus when close button is clicked', () => {
//     render(
//       <IssueCard
//         issue={mockIssue}
//         users={mockUsers}
//         updateStatus={mockUpdateStatus}
//         deleteIssue={mockDeleteIssue}
//       />
//     );
//     fireEvent.click(screen.getByText('Close Issue'));
//     expect(mockUpdateStatus).toHaveBeenCalledWith(1, 'closed');
//   });

//   it('shows delete button for closed issue and calls deleteIssue', () => {
//     const closedIssue = { ...mockIssue, status: 'closed' };
//     render(
//       <IssueCard
//         issue={closedIssue}
//         users={mockUsers}
//         updateStatus={mockUpdateStatus}
//         deleteIssue={mockDeleteIssue}
//       />
//     );
//     expect(screen.getByText('closed')).toHaveClass('bg-red-100');
//     expect(screen.getByText('Reopen Issue')).toBeInTheDocument();
//     expect(screen.getByText('Delete')).toBeInTheDocument();
//     fireEvent.click(screen.getByText('Delete'));
//     expect(mockDeleteIssue).toHaveBeenCalledWith(1);
//   });
// });

import { render, screen, fireEvent } from "@testing-library/react";
import IssueCard from "../components/IssueCard";

describe("IssueCard", () => {
  const mockIssue = {
    id: 1,
    title: "Sample Issue",
    description: "This is a test issue",
    status: "open",
    createdAt: "2025-08-27T10:00:00Z",
    createdBy: 1,
    assignedTo: 2,
  };

  const mockUsers = [
    { id: 1, email: "creator@example.com" },
    { id: 2, email: "assignee@example.com" },
  ];

  const mockUpdateStatus = jest.fn();
  const mockDeleteIssue = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders issue title and description", () => {
    render(
      <IssueCard
        issue={mockIssue}
        users={mockUsers}
        updateStatus={mockUpdateStatus}
        deleteIssue={mockDeleteIssue}
      />
    );

    expect(screen.getByText("Sample Issue")).toBeInTheDocument();
    expect(screen.getByText("This is a test issue")).toBeInTheDocument();
  });

  it("displays created date and creator email", () => {
    render(
      <IssueCard
        issue={mockIssue}
        users={mockUsers}
        updateStatus={mockUpdateStatus}
        deleteIssue={mockDeleteIssue}
      />
    );

    expect(screen.getByText(/Created:/)).toHaveTextContent("Created:");
    expect(screen.getByText(/By:/)).toHaveTextContent("creator@example.com");
  });

  it("shows assignee email", () => {
    render(
      <IssueCard
        issue={mockIssue}
        users={mockUsers}
        updateStatus={mockUpdateStatus}
        deleteIssue={mockDeleteIssue}
      />
    );

    expect(screen.getByText("assignee@example.com")).toBeInTheDocument();
  });

  it("renders open status with correct styles", () => {
    render(
      <IssueCard
        issue={mockIssue}
        users={mockUsers}
        updateStatus={mockUpdateStatus}
        deleteIssue={mockDeleteIssue}
      />
    );

    const status = screen.getByText("open");
    expect(status).toBeInTheDocument();
    expect(status).toHaveClass("bg-green-100");
  });

  it("calls updateStatus when closing an open issue", () => {
    render(
      <IssueCard
        issue={mockIssue}
        users={mockUsers}
        updateStatus={mockUpdateStatus}
        deleteIssue={mockDeleteIssue}
      />
    );

    fireEvent.click(screen.getByText("Close Issue"));
    expect(mockUpdateStatus).toHaveBeenCalledWith(1, "closed");
  });

  it("renders closed issue with reopen and delete buttons", () => {
    const closedIssue = { ...mockIssue, status: "closed" };

    render(
      <IssueCard
        issue={closedIssue}
        users={mockUsers}
        updateStatus={mockUpdateStatus}
        deleteIssue={mockDeleteIssue}
      />
    );

    expect(screen.getByText("closed")).toHaveClass("bg-red-100");
    expect(screen.getByText("Reopen Issue")).toBeInTheDocument();
    expect(screen.getByText("Delete")).toBeInTheDocument();
  });

  it("calls updateStatus when reopening a closed issue", () => {
    const closedIssue = { ...mockIssue, status: "closed" };

    render(
      <IssueCard
        issue={closedIssue}
        users={mockUsers}
        updateStatus={mockUpdateStatus}
        deleteIssue={mockDeleteIssue}
      />
    );

    fireEvent.click(screen.getByText("Reopen Issue"));
    expect(mockUpdateStatus).toHaveBeenCalledWith(1, "open");
  });

  it("calls deleteIssue when delete button is clicked", () => {
    const closedIssue = { ...mockIssue, status: "closed" };

    render(
      <IssueCard
        issue={closedIssue}
        users={mockUsers}
        updateStatus={mockUpdateStatus}
        deleteIssue={mockDeleteIssue}
      />
    );

    fireEvent.click(screen.getByText("Delete"));
    expect(mockDeleteIssue).toHaveBeenCalledWith(1);
  });

  it("renders 'Unknown' when creator not found", () => {
    const issueWithUnknownCreator = { ...mockIssue, createdBy: 999 };

    render(
      <IssueCard
        issue={issueWithUnknownCreator}
        users={mockUsers}
        updateStatus={mockUpdateStatus}
        deleteIssue={mockDeleteIssue}
      />
    );

    expect(screen.getByText(/By:/)).toHaveTextContent("Unknown");
  });

  it("renders 'Unassigned' when no assigned user", () => {
    const unassignedIssue = { ...mockIssue, assignedTo: null };

    render(
      <IssueCard
        issue={unassignedIssue}
        users={mockUsers}
        updateStatus={mockUpdateStatus}
        deleteIssue={mockDeleteIssue}
      />
    );

    expect(screen.getByText("Unassigned")).toBeInTheDocument();
  });
});
