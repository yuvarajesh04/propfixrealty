import React, { useState } from "react";
import styles from "./style/AddNewProject.module.css";
import projectApi from "../../services/projectApi";

interface Facility {
  type: string;
  name: string;
  distance: string;
}

export interface ProjectForm {
  title: string;
  location: string;
  propertyType: string;
  size: string;
  builder: string;
  status: string;
  landArea: string;
  price: string;
  nearby: Facility[];
  amenities: string[];
  images: File[];
  des: string;
}

const AddNewProject: React.FC = () => {
  const [formData, setFormData] = useState<ProjectForm>({
    title: "",
    location: "",
    propertyType: "",
    size: "",
    builder: "",
    status: "",
    landArea: "",
    price: "",
    nearby: [{ type: "", name: "", distance: "" }],
    amenities: [""],
    images: [],
    des: "",
  });

  const [message, setMessage] = React.useState("");

  // Handle text/select/textarea changes (includes textarea now)
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const target = e.target as
      | HTMLInputElement
      | HTMLSelectElement
      | HTMLTextAreaElement;
    const { id, value } = target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  // ---------------- Nearby Facilities ----------------
  const handleNearbyChange = (
    index: number,
    field: keyof Facility,
    value: string
  ) => {
    const newNearby = [...formData.nearby];
    newNearby[index] = { ...newNearby[index], [field]: value };
    setFormData((prev) => ({ ...prev, nearby: newNearby }));
  };

  const addNearby = () => {
    setFormData((prev) => ({
      ...prev,
      nearby: [...prev.nearby, { type: "", name: "", distance: "" }],
    }));
  };

  const removeNearby = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      nearby: prev.nearby.filter((_, i) => i !== index),
    }));
  };

  // ---------------- Amenities ----------------
  const handleAmenityChange = (index: number, value: string) => {
    const newAmenities = [...formData.amenities];
    newAmenities[index] = value;
    setFormData((prev) => ({ ...prev, amenities: newAmenities }));
  };

  const addAmenity = () => {
    setFormData((prev) => ({ ...prev, amenities: [...prev.amenities, ""] }));
  };

  const removeAmenity = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      amenities: prev.amenities.filter((_, i) => i !== index),
    }));
  };

  // ---------------- Images ----------------
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      // Append to existing files (so user can add more later)
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...Array.from(files)],
      }));
    }
  };

  const removeImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  // ---------------- Submit ----------------
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic client-side validation (optional)
    if (!formData.title || !formData.location || !formData.size) {
      setMessage("Please fill required fields: title, location, size.");
      setTimeout(() => setMessage(""), 4000);
      return;
    }

    const form = new FormData();
    form.append("title", formData.title);
    form.append("des", formData.des);
    form.append("location", formData.location);
    form.append("size", formData.size);
    form.append("builder", formData.builder);
    form.append("totalland", formData.landArea);
    form.append("price", formData.price);
    form.append("type", formData.propertyType);
    form.append("status", formData.status);

    // Nearby facilities and amenities are sent as JSON strings
    form.append("nearby", JSON.stringify(formData.nearby));
    form.append("amenities", JSON.stringify(formData.amenities));

    // Append images (field name "images" should match multer config)
    formData.images.forEach((img) => {
      form.append("images", img);
    });

    try {
      const res = await projectApi.createProject(form);
      setMessage(res?.message || "Project created successfully");

      // Reset form after success
      setFormData({
        title: "",
        location: "",
        propertyType: "",
        size: "",
        builder: "",
        status: "",
        landArea: "",
        price: "",
        nearby: [{ type: "", name: "", distance: "" }],
        amenities: [""],
        images: [],
        des: "",
      });

      setTimeout(() => setMessage(""), 4000);
    } catch (error) {
      console.error("Submit error:", error);
      setMessage("Error creating project");
      setTimeout(() => setMessage(""), 4000);
    }
  };

  return (
    <section className="add-new-project d-flex justify-content-center align-items-center">
      <div
        className="form-container w-100 border p-5 m-4 shadow-sm bg-white rounded"
        style={{ maxWidth: "1000px" }}
      >
        <h2 className="mb-4 text-center">Add New Project</h2>

        <form onSubmit={handleSubmit}>
          {/* ---------- Basic Info ---------- */}
          <div className="row">
            <div className="col-lg-6 mb-3">
              <label htmlFor="title">Title</label>
              <input
                id="title"
                type="text"
                value={formData.title}
                onChange={handleChange}
                className={styles.formInput}
                required
              />
            </div>

            <div className="col-lg-6 mb-3">
              <label htmlFor="location">Location</label>
              <input
                id="location"
                type="text"
                value={formData.location}
                onChange={handleChange}
                className={styles.formInput}
                required
              />
            </div>

            <div className="col-lg-6 mb-3">
              <label htmlFor="propertyType">Property Type</label>
              <select
                id="propertyType"
                value={formData.propertyType}
                onChange={handleChange}
                className={styles.formInput}
              >
                <option value="">Select</option>
                <option value="plot">Plot</option>
                <option value="villa">Villa</option>
                <option value="apartment">Apartment</option>
              </select>
            </div>

            <div className="col-lg-6 mb-3">
              <label htmlFor="size">Size</label>
              <input
                id="size"
                type="text"
                value={formData.size}
                onChange={handleChange}
                className={styles.formInput}
                required
              />
            </div>

            <div className="col-lg-6 mb-3">
              <label htmlFor="builder">Builder</label>
              <input
                id="builder"
                type="text"
                value={formData.builder}
                onChange={handleChange}
                className={styles.formInput}
              />
            </div>

            <div className="col-lg-6 mb-3">
              <label htmlFor="status">Status</label>
              <select
                id="status"
                value={formData.status}
                onChange={handleChange}
                className={styles.formInput}
              >
                <option value="">Select</option>
                <option value="ready to move">Ready to Move</option>
                <option value="under construction">Under Construction</option>
                <option value="up comming">Upcoming</option>
              </select>
            </div>

            <div className="col-lg-6 mb-3">
              <label htmlFor="landArea">Land Area</label>
              <input
                id="landArea"
                type="text"
                value={formData.landArea}
                onChange={handleChange}
                className={styles.formInput}
              />
            </div>

            <div className="col-lg-6 mb-3">
              <label htmlFor="price">Price</label>
              <input
                id="price"
                type="text"
                value={formData.price}
                onChange={handleChange}
                className={styles.formInput}
              />
            </div>

            <div className="col-lg-12 mb-3">
              <label htmlFor="des">Description</label>
              <textarea
                id="des"
                value={formData.des}
                onChange={handleChange}
                className={styles.formInput}
              />
            </div>
          </div>

          {/* ---------- Nearby Facilities ---------- */}
          <div className="mt-4">
            <h5>Nearby Facilities</h5>
            {formData.nearby.map((facility, index) => (
              <div className="row mb-3" key={index}>
                <div className="col-md-3">
                  <select
                    value={facility.type}
                    onChange={(e) =>
                      handleNearbyChange(index, "type", e.target.value)
                    }
                    className={styles.formInput}
                  >
                    <option value="">Type</option>
                    <option value="school">School</option>
                    <option value="college">College</option>
                    <option value="hospital">Hospital</option>
                    <option value="mall">Mall</option>
                    <option value="metro">Metro</option>
                    <option value="airport">Airport</option>
                    <option value="industrial">Industrial</option>
                    <option value="itpark">ITPark</option>
                    <option value="entertainment">Entertainment</option>
                    <option value="amusement">Amusement</option>
                    <option value="area">Area</option>
                    <option value="road">Road</option>
                    <option value="railway">Railway Station</option>
                  </select>
                </div>

                <div className="col-md-4">
                  <input
                    type="text"
                    placeholder="Name"
                    value={facility.name}
                    onChange={(e) =>
                      handleNearbyChange(index, "name", e.target.value)
                    }
                    className={styles.formInput}
                  />
                </div>

                <div className="col-md-3">
                  <input
                    type="text"
                    placeholder="Distance (km)"
                    value={facility.distance}
                    onChange={(e) =>
                      handleNearbyChange(index, "distance", e.target.value)
                    }
                    className={styles.formInput}
                  />
                </div>

                <div className="col-md-2 d-flex align-items-center">
                  <button
                    type="button"
                    className="btn btn-danger btn-sm"
                    onClick={() => removeNearby(index)}
                  >
                    X
                  </button>
                </div>
              </div>
            ))}
            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={addNearby}
            >
              + Add Facility
            </button>
          </div>

          {/* ---------- Amenities ---------- */}
          <div className="mt-4">
            <h5>Amenities</h5>
            {formData.amenities.map((amenity, index) => (
              <div className="row mb-2" key={index}>
                <div className="col-md-10">
                  <input
                    type="text"
                    placeholder="Amenity point"
                    value={amenity}
                    onChange={(e) => handleAmenityChange(index, e.target.value)}
                    className={styles.formInput}
                  />
                </div>
                <div className="col-md-2">
                  <button
                    type="button"
                    className="btn btn-danger btn-sm"
                    onClick={() => removeAmenity(index)}
                  >
                    X
                  </button>
                </div>
              </div>
            ))}
            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={addAmenity}
            >
              + Add Amenity
            </button>
          </div>

          {/* ---------- Images ---------- */}
          <div className="mt-4">
            <h5>Upload Images</h5>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageChange}
              className="form-control"
            />
            <div className="d-flex flex-wrap mt-3">
              {formData.images.map((image, index) => (
                <div key={index} className="position-relative me-3 mb-3">
                  <img
                    src={URL.createObjectURL(image)}
                    alt="preview"
                    width="120"
                    height="90"
                    className="border rounded"
                  />
                  <button
                    type="button"
                    className="btn btn-danger btn-sm position-absolute top-0 end-0"
                    onClick={() => removeImage(index)}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* ---------- Message ---------- */}
          {message && <p className="mt-3 text-success">{message}</p>}

          {/* ---------- Submit ---------- */}
          <div className="text-center mt-4">
            <button type="submit" className="btn btn-success px-4 py-2">
              Submit Project
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AddNewProject;
