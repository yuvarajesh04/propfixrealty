import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./style/Login.css";
import AdminApi from "../../services/adminApi";

const AdminLogin: React.FC = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = React.useState({
    email: "",
    password: "",
  });
  const [formStatus, setFormStatus] = React.useState("");
  const [success, setSuccess] = React.useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.id]: e.target.value });
  };

  const handleClose = () => {
    navigate("/"); // Redirect to home page
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await AdminApi.adminLogin(credentials);
      console.log("Login response:", response);

      setFormStatus(response?.message || "Login attempt made");

      if (response?.success) {
        setSuccess(true);
        localStorage.setItem("name", response.name);
        localStorage.setItem('token', response.token);
        navigate("/admin/dashboard");
        setCredentials({ email: "", password: "" });
      } else {
        setSuccess(false);
      }
    } catch (error: any) {
      console.log("Login error:", error);
      setSuccess(false);
      setFormStatus(error.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setTimeout(() => {
        setFormStatus("");
      }, 5000);
    }
  };

  return (
    <section className="admin-login-overlay">
      <div className="login-box">
        <div className="login-header">
          <div className="container-heading d-flex justify-content-between align-items-center">
            <h2>Admin Login</h2>
            <button
              type="button"
              className="btn-close btn-close-dark"
              aria-label="Close"
              onClick={handleClose}
            ></button>
          </div>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              placeholder="Enter email"
              required
              value={credentials.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter password"
              required
              value={credentials.password}
              onChange={handleChange}
            />
          </div>

          {formStatus && (
            <p
              className="form-status text-start m-0 p-0 mx-1"
              style={{ fontSize: "14px", color: success ? "green" : "red" }}
            >
              {formStatus}
            </p>
          )}

          <button type="submit" className="login-btn">
            Login
          </button>
        </form>
      </div>
    </section>
  );
};

export default AdminLogin;
