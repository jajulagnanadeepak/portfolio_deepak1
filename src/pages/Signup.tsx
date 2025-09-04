import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('All fields are required');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword
      });

      setSuccess('Signup successful! Redirecting...');
      setFormData({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
      });

      setTimeout(() => navigate('/login'), 2000);
    } catch (err: any) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || 'Something went wrong');
      } else {
        setError('Unexpected error');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.heading}>Sign Up</h2>
        {error && <p style={styles.error}>{error}</p>}
        {success && <p style={styles.success}>{success}</p>}
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <button type="submit" disabled={isLoading} style={styles.button}>
            {isLoading ? 'Signing up...' : 'Sign Up'}
          </button>
        </form>
        <p style={styles.linkText}>
          Already have an account? <Link to="/login" style={styles.link}>Login</Link>
        </p>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    padding: '24px',
    background: 'linear-gradient(to right, #e0f7fa, #e0f2f1)' // Light theme gradient
  },
  card: {
    background: 'white',
    padding: '40px',
    borderRadius: '24px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
    width: '100%',
    maxWidth: '420px'
  },
  heading: {
    fontSize: '32px',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '24px',
    color: '#1e3a8a'
  },
  error: {
    color: '#dc2626',
    marginBottom: '10px',
    textAlign: 'center',
    fontWeight: '500'
  },
  success: {
    color: '#16a34a',
    marginBottom: '10px',
    textAlign: 'center',
    fontWeight: '500'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },
  input: {
    padding: '12px',
    borderRadius: '10px',
    border: '1px solid #d1d5db',
    fontSize: '16px',
    backgroundColor: '#f9fafb',
    transition: 'border 0.2s ease-in-out'
  },
  button: {
    padding: '12px',
    borderRadius: '10px',
    background: 'linear-gradient(to right, #2563eb, #14b8a6)',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: '16px',
    border: 'none',
    cursor: 'pointer',
    transition: 'transform 0.2s ease-in-out'
  },
  linkText: {
    textAlign: 'center',
    marginTop: '16px',
    fontSize: '14px'
  },
  link: {
    color: '#2563eb',
    fontWeight: '500',
    textDecoration: 'underline'
  }
};

export default Signup;
