import React from "react";
import AdminApi from "../../services/adminApi";
import "./style/AdminDashboard.css";
import { useNavigate } from "react-router-dom";
import locationApi from '../../services/locationApi';

interface User {
  name: string;
  email: string;
  mobile: string;
  message: string;
  time: string | Date;
}

interface Location {
  location: string;
  price: string;
  des: string;
}

const AdminDashboard: React.FC = () => {
  const [users, setUsers] = React.useState<User[]>([]);
  const [locationData, setLocationData] = React.useState<Location>({
    location: "",
    price: "",
    des: `Explore real estate project in`,
  });
  const [addLocation, setAddLocation] = React.useState<boolean>(false);
  const [message, setMessage] = React.useState<string>('');
  const navigate = useNavigate();

  function handleAddProject() {
    navigate("/admin/add-project");
  }

  function handleAddLocation() {
    setAddLocation(true);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setLocationData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  React.useEffect(() => {
    window.scroll(0, 0);
    const getUsers = async () => {
      try {
        const response = await AdminApi.fetchAllUsers();
        setUsers(response.users);
      } catch (error) {
        console.log("Error fetching users:", error);
      }
    };

    getUsers();
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = {
      location: locationData.location,
      price: locationData.price,
      des: locationData.des + " " + locationData.location,
      createdBy: `${localStorage.getItem('name')}`
    }

    const res = await locationApi.addLocation(formData);
    setMessage(res.message)
    if (res.success) {
      setLocationData({
        location: '',
        price: '',
        des: 'Explore real estate project in'
      })
    }

    setAddLocation(false);
  }

  const thisMonthCount = users.filter((user) => {
    const userDate = new Date(user.time);
    const now = new Date();
    return (
      userDate.getMonth() === now.getMonth() &&
      userDate.getFullYear() === now.getFullYear()
    );
  }).length;

  return (
    <section className="dashboard-section p-lg-4">
      {/* Header */}
      <div className="dashboard-header d-flex justify-content-between align-items-center mb-4">
        <h2>Admin Dashboard!</h2>
        <h2>Welcome {localStorage.getItem("name")}</h2>
      </div>

      {/* Stats */}
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
          <button
            className="add-project-btn btn text-white fw-bold"
            onClick={handleAddProject}
          >
            <span className="plus">+</span> Add Project
          </button>
        </div>
      </div>

      {/* Add Location Modal */}
      {addLocation && (
        <div
          className="add-location-container d-flex justify-content-center align-items-center"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            height: "100vh",
            width: "100vw",
            zIndex: 1000,
          }}
        >
          {/* Overlay */}
          <div
            className="overlay"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              height: "100%",
              width: "100%",
              background: "black",
              opacity: 0.5,
              zIndex: 1000,
            }}
            onClick={() => setAddLocation(false)}
          ></div>

          {/* Modal / Form */}
          <div
            className="addlocation-form bg-white p-4 rounded shadow"
            style={{
              position: "relative",
              zIndex: 1001,
              minWidth: "350px",
            }}
          >
            <form onSubmit={handleSubmit}>
              <h4 className="mb-3">Add Location</h4>

              <div className="form-group mb-3">
                <label htmlFor="location" className="form-label">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={locationData.location}
                  required
                  placeholder="Chennai"
                  onChange={handleChange}
                  className="form-input form-control"
                />
              </div>

              <div className="form-group mb-3">
                <label htmlFor="price" className="form-label">
                  Price
                </label>
                <input
                  type="text"
                  name="price"
                  value={locationData.price}
                  required
                  placeholder="10L - 35L"
                  onChange={handleChange}
                  className="form-input form-control"
                />
              </div>

              {
                message && (
                  <p>{message}</p>
                )
              }

              <button
                type="submit"
                className="p-2 rounded border-0 text-white fw-semibold"
                style={{
                  background: "linear-gradient(135deg, #4f79ac, #08aef5)",
                }}
              >
                Submit Form
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Open Modal Button */}
      <div className="add-location-div">
        <button
          className="border-0 p-3 rounded text-white fw-semibold"
          onClick={handleAddLocation}
          style={{
            background: "linear-gradient(135deg, #4f79ac, #08aef5)",
          }}
        >
          Add Location
        </button>
      </div>

      {/* Clients Table */}
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
            {users &&
              users?.map((user, index) => (
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
  );
};

export default AdminDashboard;
