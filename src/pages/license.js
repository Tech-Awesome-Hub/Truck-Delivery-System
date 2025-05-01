import React, { useState } from "react";
import axios from "axios";

const LicenseUpload = ({ driverId }) => {
  const [frontImage, setFrontImage] = useState(null);
  const [backImage, setBackImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!frontImage || !backImage) {
      alert("Both images are required");
      return;
    }

    const formData = new FormData();
    formData.append("driver_id", driverId);
    formData.append("license_front", frontImage);
    formData.append("license_back", backImage);

    try {
      const response = await axios.post(
        "http://localhost/dtms/api/upload_license.php",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      alert(response.data.message);
    } catch (error) {
      console.error("Error uploading images:", error);
      alert("Image upload failed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Upload License Images</h2>
      <div>
        <label>Front Image:</label>
        <input type="file" onChange={(e) => setFrontImage(e.target.files[0])} />
      </div>
      <div>
        <label>Back Image:</label>
        <input type="file" onChange={(e) => setBackImage(e.target.files[0])} />
      </div>
      <button type="submit">Upload</button>
    </form>
  );
};

export default LicenseUpload;
