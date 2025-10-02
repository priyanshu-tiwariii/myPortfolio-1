import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function Introduction() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  
  const [infoData, setInfoData] = useState({
    name: "",
    email: "",
    headlines: "",
    subHeading: "",
    about: "",
    location: "",
    city: "",
    hobbies: "",
    interests: "",
    languages: "",
    image: [],
    resumePdf: [],
  });

  const [imageFile, setImageFile] = useState(null);
  const [resumeFile, setResumeFile] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [updateMessage, setUpdateMessage] = useState("");
  const [pdfLoading, setPdfLoading] = useState(false);
  const [changeAbout, setChangeAbout] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  // Get JWT token from localStorage
  const getToken = () => {
    return localStorage.getItem('token') || localStorage.getItem('accessToken');
  };

  // Check if user is authenticated
  const isAuthenticated = () => {
    const token = getToken();
    if (!token) return false;

    // Optional: Add token expiration check here
    return true;
  };

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated()) {
      setError("Please login to access this page");
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    }
  }, [navigate]);

  const handleChanges = (e) => {
    setInfoData({
      ...infoData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isAuthenticated()) {
      setError("Please login to perform this action");
      setTimeout(() => {
        navigate('/login');
      }, 2000);
      return;
    }

    try {
      setError("");
      setLoading(true);
      
      const token = getToken();
      const method = isEditing ? "PUT" : "POST";
      const endpoint = isEditing ? "updateIntro" : "createIntro";
      
      const res = await fetch(`${apiUrl}/api/intro/${endpoint}`, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          ...infoData,
          about: changeAbout || infoData.about
        }),
      });
      
      const data = await res.json();
      if (!res.ok) {
        if (res.status === 401) {
          setError("Session expired. Please login again.");
          localStorage.removeItem('token');
          setTimeout(() => {
            navigate('/login');
          }, 2000);
          return;
        }
        setLoading(false);
        setUpdateMessage("");
        setError(data.message || `Failed to ${isEditing ? 'update' : 'create'} information.`);
        return;
      }

      setInfoData(data.data);
      setUpdateMessage(data.message || `Information ${isEditing ? 'updated' : 'created'} successfully!`);
      setIsEditing(true);
      setLoading(false);
      setError("");
      
    } catch (err) {
      console.error("Submit error:", err);
      setError("Something went wrong while saving data");
      setLoading(false);
    } finally {
      setTimeout(() => {
        setUpdateMessage("");
        setError("");
      }, 5000);
    }
  };

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const res = await fetch(`${apiUrl}/api/intro/getIntro`);
        const data = await res.json();
        
        if (res.ok && data.data) {
          if (data.data.name || data.data.email) {
            setIsEditing(true);
          }
          
          setInfoData({
            name: data.data.name || "",
            email: data.data.email || "",
            headlines: data.data.headlines || "",
            subHeading: data.data.subHeading || "",
            about: data.data.about || "",
            location: data.data.location || "",
            city: data.data.city || "",
            hobbies: data.data.hobbies || "",
            interests: data.data.interests || "",
            languages: data.data.languages || "",
            image: data.data.image || [],
            resumePdf: data.data.resumePdf || [],
          });
          setChangeAbout(data.data.about || "");
        } else {
          setError(data.message || "Could not fetch data.");
          setIsEditing(false);
        }
      } catch (error) {
        console.error("Fetch error:", error);
        setError("Something went wrong while fetching data!");
        setTimeout(() => {
          setError("");
        }, 5000);
      }
    };
    
    if (isAuthenticated()) {
      fetchInfo();
    }
  }, [apiUrl]);

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handlePDFChange = (e) => {
    setResumeFile(e.target.files[0]);
  };

  const handleImageSubmit = async (e) => {
    e.preventDefault();
    
    if (!isAuthenticated()) {
      setError("Please login to upload images");
      setTimeout(() => {
        navigate('/login');
      }, 2000);
      return;
    }

    if (!imageFile) {
      setError("Please select an image file");
      return;
    }

    const formData = new FormData();
    formData.append("profileImage", imageFile);
    const token = getToken();

    try {
      setLoading(true);
      setError("");
      setUpdateMessage("");
      
      const res = await fetch(`${apiUrl}/api/intro/uploadProfileImage`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`
        },
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        if (res.status === 401) {
          setError("Session expired. Please login again.");
          localStorage.removeItem('token');
          setTimeout(() => {
            navigate('/login');
          }, 2000);
          return;
        }
        setError(data.message || "Error while uploading image");
        return;
      }

      setInfoData(data.data);
      setUpdateMessage("Image uploaded successfully");
      setImageFile(null);
      document.getElementById("profile-image-input").value = "";
      
    } catch (error) {
      console.error("Image upload error:", error);
      setError("Unable to upload image");
    } finally {
      setLoading(false);
      setTimeout(() => {
        setUpdateMessage("");
        setError("");
      }, 5000);
    }
  };

  const handleDelete = async (publicId) => {
    if (!isAuthenticated()) {
      setError("Please login to delete images");
      setTimeout(() => {
        navigate('/login');
      }, 2000);
      return;
    }

    try {
      setError("");
      setUpdateMessage("");
      const token = getToken();
      
      const res = await fetch(
        `${apiUrl}/api/intro/deleteProfileImage?publicId=${publicId}`,
        {
          method: "DELETE",
          headers: {
            "Authorization": `Bearer ${token}`
          }
        }
      );
      
      const data = await res.json();
      if (!res.ok) {
        if (res.status === 401) {
          setError("Session expired. Please login again.");
          localStorage.removeItem('token');
          setTimeout(() => {
            navigate('/login');
          }, 2000);
          return;
        }
        setError(data.message || "Failed to delete image.");
        return;
      }

      setInfoData((prevData) => ({
        ...prevData,
        image: prevData.image.filter((img) => img.public_id !== publicId),
      }));

      setUpdateMessage(data.message || "Image deleted successfully");
      
    } catch (error) {
      console.error("Delete error:", error);
      setError("Unable to delete image.");
    } finally {
      setTimeout(() => {
        setUpdateMessage("");
        setError("");
      }, 5000);
    }
  };

  const handlePDFSubmit = async (e) => {
    e.preventDefault();
    
    if (!isAuthenticated()) {
      setError("Please login to upload PDF");
      setTimeout(() => {
        navigate('/login');
      }, 2000);
      return;
    }

    if (!resumeFile) {
      setError("Please select a PDF file");
      return;
    }

    const pdfData = new FormData();
    pdfData.append("resumePdf", resumeFile);
    const token = getToken();

    try {
      setPdfLoading(true);
      setError("");
      setUpdateMessage("");
      
      const res = await fetch(`${apiUrl}/api/intro/uploadResumePdf`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`
        },
        body: pdfData,
      });

      const data = await res.json();
      if (!res.ok) {
        if (res.status === 401) {
          setError("Session expired. Please login again.");
          localStorage.removeItem('token');
          setTimeout(() => {
            navigate('/login');
          }, 2000);
          return;
        }
        setError(data.message || "Error while uploading PDF");
        return;
      }

      setInfoData(data.data);
      setUpdateMessage("PDF uploaded successfully");
      setResumeFile(null);
      document.getElementById("resume-pdf-input").value = "";
      
    } catch (error) {
      console.error("PDF upload error:", error);
      setError("Unable to upload PDF");
    } finally {
      setPdfLoading(false);
      setTimeout(() => {
        setUpdateMessage("");
        setError("");
      }, 5000);
    }
  };

  const handlePDFDelete = async (publicId) => {
    if (!isAuthenticated()) {
      setError("Please login to delete PDF");
      setTimeout(() => {
        navigate('/login');
      }, 2000);
      return;
    }

    try {
      setError("");
      setUpdateMessage("");
      const token = getToken();
      
      const res = await fetch(
        `${apiUrl}/api/intro/deleteResumePdf?publicId=${publicId}`,
        {
          method: "DELETE",
          headers: {
            "Authorization": `Bearer ${token}`
          }
        }
      );
      
      const data = await res.json();
      if (!res.ok) {
        if (res.status === 401) {
          setError("Session expired. Please login again.");
          localStorage.removeItem('token');
          setTimeout(() => {
            navigate('/login');
          }, 2000);
          return;
        }
        setError(data.message || "Failed to delete PDF.");
        return;
      }

      setInfoData((prevData) => ({
        ...prevData,
        resumePdf: prevData.resumePdf.filter(
          (pdf) => pdf.public_id !== publicId
        ),
      }));

      setUpdateMessage(data.message || "PDF deleted successfully");
      
    } catch (error) {
      console.error("PDF delete error:", error);
      setError("Unable to delete PDF.");
    } finally {
      setTimeout(() => {
        setUpdateMessage("");
        setError("");
      }, 5000);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('accessToken');
    navigate('/login');
  };

  // Show login prompt if not authenticated
  if (!isAuthenticated()) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-50 via-gray-50 to-green-100/40 dark:bg-gradient-to-r dark:from-neutral-900 dark:via-neutral-900 dark:to-neutral-900">
        <div className="text-center">
          <div className="text-red-600 bg-red-100 p-4 rounded-lg mb-4">
            Please login to access the Introduction page
          </div>
          <button
            onClick={() => navigate('/login')}
            className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden p-3 dark:glass-container md:w-2/4 md:px-14 min-h-screen mx-auto bg-gradient-to-r from-gray-50 via-gray-50 to-green-100/40 dark:bg-gradient-to-r dark:from-neutral-900 dark:via-neutral-900 dark:to-neutral-900">
      <div className="mb-4 flex items-center justify-between rounded-lg py-2">
        <h1 className="text-2xl font-heading_font text-black/80 dark:text-green-50">
          Introduction
        </h1>
        <div className="flex items-center gap-2">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            isEditing 
              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
              : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
          }`}>
            {isEditing ? 'Edit Mode' : 'Create Mode'}
          </span>
          <button
            onClick={handleLogout}
            className="px-3 py-1 bg-red-500 text-white rounded-md text-sm hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Rest of your JSX remains the same */}
      <form onSubmit={handleSubmit}>
        <div className="rounded-lg border border-dashed p-4">
          <p className="text-lg font-subheading_font text-black/80 dark:text-green-50">
            Basic Info
          </p>
          <div className="mt-4 gap-6 dark:text-gray-500 font-body_font space-y-4 md:grid md:grid-cols-2 md:space-y-0">
            {/* Name */}
            <div className="w-full">
              <label
                className="text-sm font-medium leading-none"
                htmlFor="name"
              >
                My Name
                <span className="text-red-700">*</span>
              </label>
              <input
                className="flex h-10 w-full rounded-md border border-black/30 bg-transparent text-gray-400 px-3 py-2 text-sm dark:border-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30"
                type="text"
                id="name"
                value={infoData.name}
                onChange={handleChanges}
                required
              />
            </div>

            {/* My Email */}
            <div className="w-full">
              <label
                className="text-sm font-medium leading-none"
                htmlFor="email"
              >
                Email<span className="text-red-700">*</span>
              </label>
              <input
                className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm dark:border-gray-600 text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30"
                type="email"
                placeholder="Enter your email"
                id="email"
                value={infoData.email}
                onChange={handleChanges}
                required
              />
            </div>

            {/* Headlines */}
            <div className="col-span-2">
              <label
                className="text-sm font-medium leading-none"
                htmlFor="headlines"
              >
                Headlines
              </label>
              <input
                className="flex h-10 w-full rounded-md border border-black/30 bg-transparent text-gray-400 px-3 py-2 text-sm dark:border-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30"
                type="text"
                placeholder="Enter Headlines"
                id="headlines"
                value={infoData.headlines}
                onChange={handleChanges}
              />
            </div>

            {/* Sub Heading */}
            <div className="col-span-2">
              <label
                className="text-sm font-medium leading-none"
                htmlFor="subHeading"
              >
                Sub Heading
              </label>
              <input
                className="flex h-10 w-full rounded-md border border-black/30 bg-transparent text-gray-400 px-3 py-2 text-sm dark:border-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30"
                type="text"
                placeholder="Enter Sub Headings"
                id="subHeading"
                value={infoData.subHeading}
                onChange={handleChanges}
              />
            </div>

            {/* About with ReactQuill */}
            <div className="col-span-2">
              <label
                className="text-sm font-medium leading-none"
                htmlFor="about"
              >
                About<span className="text-red-700">*</span>
              </label>
              <ReactQuill
                theme="snow"
                className="h-72 mb-12"
                id="about"
                placeholder="Enter Description"
                value={changeAbout}
                onChange={(value) => setChangeAbout(value)}
              />
            </div>
          </div>
        </div>

        {/* Other Info Section */}
        <div className="mt-4 rounded-lg border border-dashed p-4">
          <p className="text-lg mt-2 font-subheading_font text-black/80 dark:text-green-50">
            Other Info
          </p>

          <div className="mt-2 dark:text-gray-500 font-body_font mb-2 gap-6 space-y-4 md:grid md:grid-cols-2 md:space-y-0">
            {/* Location */}
            <div className="w-full">
              <label className="text-sm font-medium" htmlFor="location">
                Location<span className="text-red-700">*</span>
              </label>
              <input
                className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm"
                type="text"
                placeholder="Enter location"
                id="location"
                value={infoData.location}
                onChange={handleChanges}
                required
              />
            </div>

            {/* City */}
            <div className="w-full">
              <label className="text-sm font-medium" htmlFor="city">
                City<span className="text-red-700">*</span>
              </label>
              <input
                className="flex h-10 w-full rounded-md border border-black/30 bg-transparent text-gray-400 px-3 py-2 text-sm"
                type="text"
                placeholder="Enter city"
                id="city"
                value={infoData.city}
                onChange={handleChanges}
                required
              />
            </div>

            {/* Hobbies */}
            <div className="w-full">
              <label className="text-sm font-medium" htmlFor="hobbies">
                Hobbies<span className="text-red-700">*</span>
              </label>
              <input
                className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm"
                type="text"
                placeholder="Hobbies"
                id="hobbies"
                value={infoData.hobbies}
                onChange={handleChanges}
                required
              />
            </div>

            {/* Interests */}
            <div className="w-full">
              <label className="text-sm font-medium" htmlFor="interests">
                Interests<span className="text-red-700">*</span>
              </label>
              <input
                className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm"
                type="text"
                placeholder="Enter Interests"
                id="interests"
                value={infoData.interests}
                onChange={handleChanges}
                required
              />
            </div>

            {/* Languages */}
            <div className="col-span-2">
              <label className="text-sm font-medium" htmlFor="languages">
                Languages<span className="text-red-700">*</span>
              </label>
              <input
                className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm"
                type="text"
                placeholder="Enter Languages you know"
                id="languages"
                value={infoData.languages}
                onChange={handleChanges}
                required
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-4">
          <button
            type="submit"
            className="flex items-center justify-center w-full h-10 rounded-md bg-green-500 text-white font-medium text-sm hover:bg-green-600"
            disabled={loading}
          >
            {loading ? "Processing..." : (isEditing ? "Update Info" : "Create Info")}
          </button>
        </div>
      </form>

      {/* Image Upload Section */}
      <form onSubmit={handleImageSubmit} className="border-t border-dashed mt-6">
        <div className="w-full my-3 flex flex-col sm:flex-row gap-4 items-center">
          <div className="w-full sm:flex-[6]">
            <label
              className="text-sm text-gray-500 font-medium"
              htmlFor="profile-image-input"
            >
              Profile Image <span className="text-red-700">*</span>
            </label>
            <input
              className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm"
              type="file"
              id="profile-image-input"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>
          <div className="w-full sm:flex-[2] flex items-center sm:mt-5">
            <button
              type="submit"
              className="flex items-center justify-center h-10 p-4 w-full rounded-md bg-green-500 text-white font-medium text-sm hover:bg-green-600"
              disabled={loading || !imageFile}
            >
              {loading ? "Uploading..." : "Upload Image"}
            </button>
          </div>
        </div>
      </form>

      {/* Display Uploaded Images */}
      <div className="flex flex-wrap justify-center gap-4 mt-4">
        {infoData?.image?.map((image) => (
          <div
            key={image.public_id}
            className="w-full sm:w-1/2 md:w-1/3 lg:w-2/5"
          >
            <img
              src={image.url}
              alt="Profile"
              className="w-full h-auto rounded-md border border-gray-300"
            />
            <div className="flex justify-center mt-2">
              <button
                onClick={() => handleDelete(image.public_id)}
                className="bg-red-500 text-white rounded-md p-2 px-5 hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* PDF Upload Section */}
      <form onSubmit={handlePDFSubmit} className="border-t border-dashed mt-6">
        <div className="w-full my-3 flex flex-col sm:flex-row gap-4 items-center">
          <div className="w-full sm:flex-[6]">
            <label
              className="text-sm text-gray-500 font-medium"
              htmlFor="resume-pdf-input"
            >
              Resume PDF <span className="text-red-700">*</span>
            </label>
            <input
              className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm"
              type="file"
              id="resume-pdf-input"
              accept=".pdf"
              onChange={handlePDFChange}
            />
          </div>
          <div className="w-full sm:flex-[2] flex items-center sm:mt-5">
            <button
              type="submit"
              className="flex items-center justify-center h-10 p-4 w-full rounded-md bg-green-500 text-white font-medium text-sm hover:bg-green-600"
              disabled={pdfLoading || !resumeFile}
            >
              {pdfLoading ? "Uploading..." : "Upload PDF"}
            </button>
          </div>
        </div>
      </form>

      {/* Display Uploaded PDFs */}
      <div className="flex flex-wrap gap-4 mt-4">
        {infoData?.resumePdf?.map((pdf) => (
          <div key={pdf.public_id} className="w-full gap-6 flex flex-col">
            <embed
              src={pdf.url}
              type="application/pdf"
              className="w-full h-auto rounded-md border border-gray-300"
              width="100%"
              height="400px"
            />
            <div className="flex flex-row justify-center gap-6">
              <Link to={pdf.url} target="_blank" rel="noopener noreferrer">
                <button className="dark:bg-green-100 dark:text-black text-white bg-black/80 rounded-md p-2 px-6 hover:bg-green-600">
                  Show
                </button>
              </Link>
              <button
                onClick={() => handlePDFDelete(pdf.public_id)}
                className="bg-red-500 text-white rounded-md p-2 px-5 hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Error and Success Messages */}
      {error && (
        <div className="text-center mt-4 p-2 text-red-600 error bg-red-100 rounded-md">
          {error}
        </div>
      )}
      {updateMessage && (
        <div className="text-center mt-4 p-2 text-green-600 success bg-green-100 rounded-md">
          {updateMessage}
        </div>
      )}
    </div>
  );
}

export default Introduction;
