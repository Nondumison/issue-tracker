import { render, screen, fireEvent } from '@testing-library/react';
import IssueFilter from '../components/IssueFilter';


describe('IssueFilter', () => {
  const mockSetStatusFilter = jest.fn();

  it('renders filter dropdown with correct options', () => {
    render(<IssueFilter statusFilter="all" setStatusFilter={mockSetStatusFilter} />);
    expect(screen.getByLabelText('Filter by Status:')).toBeInTheDocument();
    expect(screen.getByText('All')).toBeInTheDocument();
    expect(screen.getByText('Open')).toBeInTheDocument();
    expect(screen.getByText('Closed')).toBeInTheDocument();
  });

  it('displays correct selected status', () => {
    render(<IssueFilter statusFilter="open" setStatusFilter={mockSetStatusFilter} />);
    expect(screen.getByRole('combobox')).toHaveValue('open');
  });

  it('calls setStatusFilter when selection changes', () => {
    render(<IssueFilter statusFilter="all" setStatusFilter={mockSetStatusFilter} />);
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'closed' } });
    expect(mockSetStatusFilter).toHaveBeenCalledWith('closed');
  });
});