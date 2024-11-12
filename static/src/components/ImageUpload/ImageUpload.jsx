import React, {useState} from "react";
import Button from '../Button/Button.jsx'
import styled from "styled-components"

const InpUploadWrapper = styled.div`
        padding-block: 10px;

        .btn-type {
            position: relative;
            width: 100%;
            max-width: fit-content;
            display: inline-block;
            margin-right: 10px;

            input {
                position: absolute;
                width: 0;
                height: 0;
                opacity: 0;
                z-index: 2;
            }
        }
    `;

const ImageUpload = ({imgUrl, onUpload }) => {
    const [file, setFile] = useState(null);
    const [imageUrl, setImageUrl] = useState(imgUrl || '');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Cloudinary config
    const CLOUD_NAME = "dzeeenijr"; // Replace with your Cloudinary cloud name
    const UPLOAD_PRESET = "presetOne"; // Replace with your unsigned upload preset


    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];

        // Validate file type
        if (selectedFile && !["image/jpeg", "image/jpg", "image/png"].includes(selectedFile.type)) {
            setError("Only JPG, JPEG, and PNG files are allowed.");
            setFile(null);
        } else {
            setError(""); // Clear any previous errors
            setFile(selectedFile);
        }
    };



    const handleUpload = async () => {
        setLoading(true);
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", UPLOAD_PRESET);

        try {
            const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
                method: "POST",
                body: formData,
            });
            const data = await response.json();
            setImageUrl(data.secure_url); // URL of the uploaded image
            setLoading(false);
            onUpload(data.secure_url)
        } catch (error) {
            console.error("Error uploading image:", error);
            setLoading(false);
        }
    };

    return (
        <InpUploadWrapper>
            <label className="btn-type pointer">
                <span>Choose your image</span>
                <span></span>
                <input
                    type="file"
                    onChange={handleFileChange}
                    className="pointer"
                    accept="image/jpeg, image/jpg, image/png" // Restrict file types
                />
            </label>
            {error && <p className="error">{error}</p>} {/* Display any validation error */}

            <Button type="button" className="transition1" onClick={handleUpload} disabled={!file || loading}>
                {loading ? "Uploading..." : "Upload Image"}
            </Button>
            {imageUrl && (
                <div>
                    <p>Uploaded Image:</p>
                    <img src={imageUrl} alt="Uploaded" width="200"/>
                </div>
            )}
        </InpUploadWrapper>
    );
};

export default ImageUpload;