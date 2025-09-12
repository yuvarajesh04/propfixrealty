import React, { useState, useEffect } from 'react';
import { Modal, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import profixrealtyLogo from '../../assets/profixrealtyicon.jpg';

interface FormStatus {
  show: boolean;
  type: 'success' | 'danger';
  message: string;
}

interface LoginResponse {
  success: boolean;
  admin_id?: string;
  error?: string;
}

const AdminLogin: React.FC = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  
  const [formStatus, setFormStatus] = useState<FormStatus | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [show, setShow] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // Clear form status after 5 seconds
  useEffect(() => {
    if (formStatus) {
      const timer = setTimeout(() => {
        setFormStatus(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [formStatus]);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear form status when user starts typing
    if (formStatus) {
      setFormStatus(null);
    }
  };

  // Handle modal close
  const handleClose = () => {
    setShow(false);
    // Add small delay before navigation for smooth transition
    setTimeout(() => {
      navigate('/');
    }, 300);
  };

  // Validate form before submission
  const validateForm = (): boolean => {
    if (!formData.username.trim()) {
      setFormStatus({
        show: true,
        type: 'danger',
        message: 'Username is required'
      });
      return false;
    }
    
    if (!formData.password.trim()) {
      setFormStatus({
        show: true,
        type: 'danger',
        message: 'Password is required'
      });
      return false;
    }
    
    if (formData.username.length < 3) {
      setFormStatus({
        show: true,
        type: 'danger',
        message: 'Username must be at least 3 characters long'
      });
      return false;
    }
    
    if (formData.password.length < 6) {
      setFormStatus({
        show: true,
        type: 'danger',
        message: 'Password must be at least 6 characters long'
      });
      return false;
    }
    
    return true;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch("https://propfixrealty.com/index.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "admin_verify",
          username: formData.username.trim(),
          password: formData.password,
        }),
      });

      const data: LoginResponse = await response.json();

      if (response.ok && data.success) {
        setFormStatus({
          show: true,
          type: 'success',
          message: `✅ Login successful! Welcome back, ${formData.username}`
        });
        
        // Store admin session (if needed)
        if (data.admin_id) {
          sessionStorage.setItem('admin_id', data.admin_id);
          sessionStorage.setItem('admin_username', formData.username);
        }
        
        // Navigate after short delay
        setTimeout(() => {
          navigate('/admin/dashboard');
        }, 1500);
        
      } else {
        setFormStatus({
          show: true,
          type: 'danger',
          message: data.error || 'Invalid credentials. Please try again.'
        });
      }
    } catch (error) {
      console.error('Login error:', error);
      setFormStatus({
        show: true,
        type: 'danger',
        message: 'Connection error. Please check your internet connection and try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle Enter key press
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isSubmitting) {
      handleSubmit(e as any);
    }
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      backdrop="static"
      keyboard={false}
      size="sm"
      className="admin-login-modal"
    >
      <Modal.Header 
        closeButton 
        className="border-0 p-0 position-absolute" 
        style={{ right: '1rem', top: '1rem', zIndex: 1050 }} 
      />
      
      <Modal.Body className="p-4">
        <div className="text-center mb-4">
          <img
            src={profixrealtyLogo}
            alt="Propfix Realty Icon"
            width={80}
            height={80}
            className="img-fluid mb-3 rounded-circle shadow-sm"
            style={{ objectFit: 'cover' }}
          />
          <h4 className="mb-2 fw-bold" style={{ color: '#2c3e50' }}>Admin Login</h4>
          <p className="text-muted small mb-0">
            Please enter your credentials to access the admin area.
          </p>
        </div>
        
        {formStatus && (
          <Alert 
            variant={formStatus.type} 
            onClose={() => setFormStatus(null)} 
            dismissible
            className="mb-3 py-2 small"
          >
            {formStatus.message}
          </Alert>
        )}
        
        <Form onSubmit={handleSubmit} noValidate>
          <Form.Group className="mb-3">
            <Form.Label className="small fw-semibold">Username</Form.Label>
            <Form.Control 
              type="text" 
              name="username" 
              value={formData.username}
              onChange={handleChange}
              onKeyPress={handleKeyPress}
              required 
              placeholder="Enter your username"
              disabled={isSubmitting}
              size="sm"
              autoComplete="username"
              className={formStatus?.type === 'danger' ? 'is-invalid' : ''}
            />
          </Form.Group>
          
          <Form.Group className="mb-4">
            <Form.Label className="small fw-semibold">Password</Form.Label>
            <div className="position-relative">
              <Form.Control 
                type={showPassword ? "text" : "password"} 
                name="password" 
                value={formData.password}
                onChange={handleChange}
                onKeyPress={handleKeyPress}
                required 
                placeholder="Enter your password"
                disabled={isSubmitting}
                size="sm"
                autoComplete="current-password"
                className={formStatus?.type === 'danger' ? 'is-invalid' : ''}
              />
              <Button
                variant="link"
                size="sm"
                className="position-absolute end-0 top-50 translate-middle-y border-0 p-1"
                onClick={togglePasswordVisibility}
                style={{ 
                  zIndex: 10,
                  color: '#6c757d',
                  textDecoration: 'none'
                }}
                disabled={isSubmitting}
              >
                <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
              </Button>
            </div>
          </Form.Group>
          
          <Button 
            type="submit" 
            className="w-100 py-2 fw-semibold"
            style={{ 
              backgroundColor: '#2c3e50', 
              border: 'none',
              transition: 'all 0.3s ease'
            }}
            disabled={isSubmitting || !formData.username.trim() || !formData.password.trim()}
            size="sm"
            onMouseOver={(e) => {
              if (!isSubmitting) {
                e.currentTarget.style.backgroundColor = '#34495e';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = '#2c3e50';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            {isSubmitting ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Logging in...
              </>
            ) : (
              'Login'
            )}
          </Button>
        </Form>
        
        {/* Additional Security Info */}
        <div className="text-center mt-3">
          <small className="text-muted">
            <i className="bi bi-shield-lock me-1"></i>
            Secure admin access
          </small>
        </div>
      </Modal.Body>
      
      <style>{`
        .admin-login-modal .modal-content {
          border: none;
          border-radius: 15px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
        }
        
        .form-control:focus {
          border-color: #2c3e50;
          box-shadow: 0 0 0 0.2rem rgba(44, 62, 80, 0.25);
        }
        
        .is-invalid {
          border-color: #dc3545 !important;
        }
        
        @media (max-width: 576px) {
          .modal-dialog {
            margin: 1rem;
          }
        }
      `}</style>
    </Modal>
  );
};

export default AdminLogin;
