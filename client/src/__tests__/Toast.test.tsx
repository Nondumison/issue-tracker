import { render, screen, fireEvent } from '@testing-library/react';
import Toast from '../components/Toast';


describe('Toast', () => {
  const mockSetToast = jest.fn();

  it('does not render when toast is null', () => {
    render(<Toast toast={null} setToast={mockSetToast} />);
    expect(screen.queryByText(/./)).not.toBeInTheDocument();
  });

  it('renders success toast with correct message and styling', () => {
    render(<Toast toast={{ message: 'Success message', type: 'success' }} setToast={mockSetToast} />);
    expect(screen.getByText('Success message')).toBeInTheDocument();
    expect(screen.getByText('Success message').parentElement).toHaveClass('bg-green-600');
  });

  it('renders error toast with correct message and styling', () => {
    render(<Toast toast={{ message: 'Error message', type: 'error' }} setToast={mockSetToast} />);
    expect(screen.getByText('Error message')).toBeInTheDocument();
    expect(screen.getByText('Error message').parentElement).toHaveClass('bg-red-600');
  });

  it('calls setToast with null when close button is clicked', () => {
    render(<Toast toast={{ message: 'Test message', type: 'success' }} setToast={mockSetToast} />);
    fireEvent.click(screen.getByRole('button'));
    expect(mockSetToast).toHaveBeenCalledWith(null);
  });
});