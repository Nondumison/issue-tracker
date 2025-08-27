import { Dispatch, SetStateAction } from "react";

interface AuthFormProps {
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
  password: string;
  setPassword: Dispatch<SetStateAction<string>>;
  login: () => void;
  register: () => void;
  toast: { message: string; type: "success" | "error" } | null;
  setToast: Dispatch<SetStateAction<{ message: string; type: "success" | "error" } | null>>;
}

export default function AuthForm({
  email,
  setEmail,
  password,
  setPassword,
  login,
  register,
  toast,
  setToast,
}: AuthFormProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md p-8 bg-white dark:bg-gray-800 rounded-xl shadow-2xl space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Issue Tracker</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">Sign in to your account</p>
        </div>
        
        <div className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>
          
          <div className="flex space-x-4 pt-2">
            <button
              onClick={login}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition shadow-md hover:shadow-lg"
            >
              Login
            </button>
            <button
              onClick={register}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition shadow-md hover:shadow-lg"
            >
              Register
            </button>
          </div>
        </div>
      </div>
      
      {toast && (
        <div className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg text-white font-medium flex items-center justify-between space-x-4 transition-transform duration-300 ${toast.type === "success" ? "bg-green-600" : "bg-red-600"}`}>
          <span>{toast.message}</span>
          <button onClick={() => setToast(null)} className="text-white hover:text-gray-200">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}