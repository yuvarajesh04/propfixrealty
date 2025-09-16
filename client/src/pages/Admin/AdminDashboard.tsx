import React from "react";
import AdminApi from "../../services/adminApi";
import './style/AdminDashboard.css'

interface User {
  name: string,
  email: string,
  mobile: string,
  message: string,
  time: string | Date
}

const AdminDashboard: React.FC = () => {
  const [users, setUsers] = React.useState<User[]>([]);

  React.useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await AdminApi.fetchAllUsers();
        setUsers(response.users);
      } catch (error) {
        console.log('Error fetching users:', error)
      }
    }

    getUsers();
  }, []); // ✅ run only once

  const thisMonthCount = users.filter(user => {
    const userDate = new Date(user.time);
    const now = new Date();
    return userDate.getMonth() === now.getMonth() && userDate.getFullYear() === now.getFullYear();
  }).length;

  return (
    <section className="dashboard-section p-lg-4">
      <div className="dashboard-header d-flex justify-content-between align-items-center mb-4">
        <h2>Admin Dashboard!</h2>
        <h2>Welcome {localStorage.getItem('name')}</h2>
      </div>

      <div className="client-datas-container">
        <div className="grid-box">
          <p>Total Clients</p>
          <p>{users?.length}</p>
        </div>
        <div className="grid-box">
          <p>This Month</p>
          <p>{thisMonthCount}</p>
        </div>
        <div className="grid-box">
          <p>Other Stats</p>
          <p>Hii</p>
        </div>
      </div>

      <div className="client-details-in-table mt-3">
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">S.No</th>
              <th scope="col">Name</th>
              <th scope="col">Mobile</th>
              <th scope="col">Email</th>
              <th scope="col">Message</th>
              <th scope="col">Date</th>
            </tr>
          </thead>
          <tbody>
            {users && users?.map((user, index)=> (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{user.name}</td>
                <td>{user.mobile}</td>
                <td>{user.email}</td>
                <td>{user.message}</td>
                <td>{new Date(user.time).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default AdminDashboard;
