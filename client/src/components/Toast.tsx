import { Dispatch, SetStateAction } from "react";

interface ToastProps {
  toast: { message: string; type: "success" | "error" } | null;
  setToast: Dispatch<SetStateAction<{ message: string; type: "success" | "error" } | null>>;
}

export default function Toast({ toast, setToast }: ToastProps) {
  return (
    <>
      {toast && (
        <div className={`fixed bottom-4 right-4 md:top-4 md:bottom-auto p-4 rounded-lg shadow-lg text-white font-medium flex items-center justify-between space-x-4 transition-transform duration-300 ${toast.type === "success" ? "bg-green-600" : "bg-red-600"}`}>
          <span>{toast.message}</span>
          <button onClick={() => setToast(null)} className="text-white hover:text-gray-200">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      )}
    </>
  );
}