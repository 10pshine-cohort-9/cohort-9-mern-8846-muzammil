import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {
  const token = localStorage.getItem('token');

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={token ? <Navigate to="/" replace /> : <Login />} />
        <Route path="/signup" element={token ? <Navigate to="/" replace /> : <Signup />} />
        <Route
          path="/"
          element={
            token ? (
              <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-10">
                <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-xl">
                  <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">Dashboard</p>
                  <h1 className="mt-3 text-3xl font-semibold text-slate-900">Welcome back</h1>
                  <p className="mt-2 text-slate-600">You are signed in.</p>
                </div>
              </div>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
