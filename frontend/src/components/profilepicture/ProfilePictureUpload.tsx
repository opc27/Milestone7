import React, { useState } from "react";

const ProfilePictureUpload: React.FC = () => {
const [image, setImage] = useState<string | null>(null);

const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
if (event.target.files && event.target.files[0]) {
    const file = event.target.files[0];
    setImage(URL.createObjectURL(file)); // Generates a temporary preview URL
}
};

return (
<div style={{ textAlign: "center", marginTop: "20px" }}>
    <h2>Upload Profile Picture</h2>
    <input type="file" accept="image/*" onChange={handleImageChange} />
    {image && (
    <div>
        <h3>Preview:</h3>
        <img 
        src={image} 
        alt="Profile" 
        style={{ width: "150px", height: "150px", borderRadius: "50%", marginTop: "10px" }} 
        />
    </div>
    )}
</div>
);
};

export default ProfilePictureUpload;
