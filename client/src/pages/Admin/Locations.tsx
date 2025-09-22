import React from "react";
import locationApi from "../../services/locationApi";

interface LocationType {
    location: string,
    price: string,
    des: string,
    createdBy: string,
    _id?: string
}

const Location: React.FC = () => {
    const [locations, setLocations] = React.useState<LocationType[]>([]);
    const [addLocation, setAddLocation] = React.useState<boolean>(false);
    const [editLocation, setEditLocation] = React.useState<LocationType>({
        location: '',
        price: '',
        des: '',
        createdBy: '',
        _id: ''
    })
    const [message, setMessage] = React.useState("");

    const fetchLocations = async () => {
        try {
            const res = await locationApi.getLocations();
            setLocations(res.locations)
        } catch (error) {
            console.log('View locations error:', error)
        }
    }

    React.useEffect(() => {
        fetchLocations();
    }, []);

    const handleDelete = async (id: string) => {
        if (!id) {
            alert("Id not found");
            return;
        }

        const confirm = window.confirm('Are you sure want to delete ?')

        if (confirm) {
            const res = await locationApi.deleteLocation(id);
            if (res.success) {
                alert("Deleted successfully");
                fetchLocations();
            }
        }
    }

    const handleEdit = (editId: string) => {
        const data = locations.find((loc) => loc._id === editId);
        if (!data) return;
        setAddLocation(true);
        setEditLocation({
            location: data.location,
            price: data.price,
            des: data.des,
            createdBy: data.createdBy,
            _id: editId,
        });
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditLocation((prev) => ({ ...prev, [name]: value }));
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await locationApi.editLocation(editLocation);
            if (res.success) {
                alert("Location updated successfully");
                fetchLocations();
                setAddLocation(false);
            }
        } catch (error) {
            setMessage("Error updating location");
        }
    }

    return (
        <>
            <table className="table table-hover m-5" style={{ overflow: 'hidden' }}>
                <thead>
                    <tr>
                        <th scope="col">S.No</th>
                        <th scope="col">Location</th>
                        <th scope="col">Price</th>
                        <th scope="col">Des</th>
                        <th scope="col">CreatedBy</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {locations &&
                        locations.map((loc, index) => (
                            <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{loc.location}</td>
                                <td>{loc.price}</td>
                                <td>{loc.des}</td>
                                <td>{loc.createdBy}</td>
                                <td>
                                    <button
                                        className="btn btn-sm btn-outline-primary me-2"
                                        onClick={() => handleEdit(loc._id!)}
                                    >
                                        <i className="bi bi-pencil-square"></i>
                                    </button>
                                    <button
                                        className="btn btn-sm btn-outline-danger"
                                        onClick={() => handleDelete(loc._id!)}
                                    >
                                        <i className="bi bi-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>

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
                        overflowY: "auto",
                        padding: "20px"
                    }}
                >
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

                    <div
                        className="addlocation-form bg-white p-4 rounded shadow"
                        style={{
                            position: "relative",
                            zIndex: 1001,
                            width: "100%",
                            maxWidth: "500px",
                            maxHeight: "90vh",
                            overflowY: "auto",
                        }}
                    >
                        <form onSubmit={handleSubmit}>
                            <h4 className="mb-3">Edit Location</h4>
                            <div className="form-group mb-3">
                                <label htmlFor="location" className="form-label">
                                    Location
                                </label>
                                <input
                                    type="text"
                                    name="location"
                                    value={editLocation.location}
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
                                    value={editLocation.price}
                                    required
                                    placeholder="10L - 35L"
                                    onChange={handleChange}
                                    className="form-input form-control"
                                />
                            </div>
                            {message && <p>{message}</p>}
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
        </>
    )
}

export default Location
