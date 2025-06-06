'use client';

import Navbar from '@/components/Navbar';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

/**
 * RegisterPage handles user registration.
 *
 * - Collects username, email, and password
 * - Sends data to the /api/register endpoint
 * - On success, stores login status and navigates to user profile
 */
export default function RegisterPage() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const router = useRouter();

  /**
   * Handles input field changes and updates form state.
   *
   * @param {React.ChangeEvent<HTMLInputElement | HTMLSelectElement>} e - The change event
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  /**
   * Submits the registration form.
   * Sends user data to the backend and redirects on success.
   *
   * @param {React.FormEvent} e - The form submission event
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const error = await res.json();
        alert(error.error || 'Registration failed');
        return;
      }

      const { user } = await res.json();

      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userEmail', user.email);

      router.push('/user');
    } catch (err) {
      console.error('Register error:', err);
      alert('Something went wrong.');
    }
  };

  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/images/DarkBlueBackground.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Foreground content */}
      <div className="relative z-10">
        <Navbar />

        <div className="flex justify-center items-center min-h-[calc(100vh-64px)] px-4">
          <form
            onSubmit={handleSubmit}
            className="bg-[#0f172a] bg-opacity-90 p-8 rounded-2xl max-w-md w-full text-white shadow-lg"
          >
            <h2 className="text-2xl font-semibold mb-6 text-center">Register</h2>

            <label className="block text-sm font-medium mb-1">Username</label>
            <input
              type="text"
              name="username"
              placeholder="Display name"
              value={formData.username}
              onChange={handleChange}
              className="w-full p-2 rounded bg-[#1e293b] text-white mb-4"
              required
            />

            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Email address"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 rounded bg-[#1e293b] text-white mb-4"
              required
            />

            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 rounded bg-[#1e293b] text-white mb-4"
              required
            />

            <button
              type="submit"
              className="w-full bg-[#334155] hover:bg-[#475569] text-white py-2 rounded font-semibold transition"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
