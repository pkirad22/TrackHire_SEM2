import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

const AuthContext = createContext();

export const useAuth = () =>
  useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ─────────────────────────────────────────────
  // LOAD USER FROM LOCAL STORAGE
  // ─────────────────────────────────────────────
  useEffect(() => {
    const storedUser = localStorage.getItem('trackhire_user');
    const storedToken = localStorage.getItem('trackhireToken'); // ✅ FIXED KEY

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
    }

    setLoading(false);
  }, []);

  // ─────────────────────────────────────────────
  // LOGIN
  // ─────────────────────────────────────────────
  const login = async (email, password) => {
    const response = await fetch(
      'http://localhost:5000/api/auth/login',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      }
    );

    const data = await response.json();
    console.log('AUTH RESPONSE:', data);

    if (!response.ok) {
      throw new Error(data.msg || 'Login failed');
    }

    // ✅ FIXED KEY NAME (IMPORTANT)
    localStorage.setItem('trackhireToken', data.token);
    localStorage.setItem('trackhire_user', JSON.stringify(data.user));

    setUser(data.user);

    return data;
  };

  // ─────────────────────────────────────────────
  // REGISTER
  // ─────────────────────────────────────────────
  const register = async (formData) => {
    const response = await fetch(
      'http://localhost:5000/api/auth/register',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.msg || 'Registration failed');
    }

    // ✅ FIXED KEY NAME
    localStorage.setItem('trackhireToken', data.token);
    localStorage.setItem('trackhire_user', JSON.stringify(data.user));

    setUser(data.user);

    return data;
  };

  // ─────────────────────────────────────────────
  // LOGOUT
  // ─────────────────────────────────────────────
  const logout = () => {
    localStorage.removeItem('trackhireToken'); // ✅ FIXED
    localStorage.removeItem('trackhire_user');

    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};