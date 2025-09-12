import { useEffect, useState } from "react";

interface Users {
  id: number,
  name: string,
  email: string,
  mobile: string,
  message: string,
}

function UserList() {
  const [users, setUsers] = useState<Users[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://propfixrealty.com/index.php", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok " + res.statusText);
        }
        return res.json();
      })
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching users:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return (
    <div className="loading-container">
      <div className="spinner"></div>
      <p>Loading...used ss on dashboard.tsx</p>
    </div>
  );

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">User List</h1>
      <div className="table-container">
        <table className="custom-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Message</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.mobile}</td>
                <td>{user.message}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <style>{`
        .dashboard-container {
          padding: 2rem;
          background: #f8f9fa;
          border-radius: 10px;
          box-shadow: 0 0 15px rgba(0,0,0,0.1);
          margin: 20px;
        }

        .dashboard-title {
          color: #2c3e50;
          margin-bottom: 2rem;
          font-size: 2rem;
          font-weight: 600;
          text-align: center;
        }

        .table-container {
          overflow-x: auto;
          overflow-y: auto;
          max-height: 70vh;
          background: white;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.05);
        }

        .custom-table {
          width: 100%;
          border-collapse: collapse;
          min-width: 600px;
        }

        .custom-table th {
          background: #3498db;
          color: white;
          padding: 1rem;
          text-align: left;
          font-weight: 500;
        }

        .custom-table td {
          padding: 1rem;
          border-bottom: 1px solid #eee;
        }

        .custom-table tr:hover {
          background-color: #f5f6fa;
        }

        .loading-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 50vh;
        }

        .spinner {
          width: 50px;
          height: 50px;
          border: 5px solid #f3f3f3;
          border-top: 5px solid #3498db;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

export default UserList;
