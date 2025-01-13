import { useEffect, useState, FormEvent } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { userDetail } from "@/utils/types";
import { Button } from "@/components/ui/button";
import { host } from "@/utils/constants";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";
import { Input } from "@/components/ui/input";

function Edit() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [studentDetail, setStudentDetails] = useState<userDetail>({
    username: "",
    email: "",
    profileImage: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const stud = searchParams.get("studentId");
  const { token } = useAuth();

  // Fetching user details
  useEffect(() => {
    if (stud) {
      setIsLoading(true);
      fetch(`${host}/users/${stud}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch student details.");
          }
          return response.json();
        })
        .then((data) => setStudentDetails(data))
        .catch((error) => {
          console.error(error);
          toast.error("Error fetching student details.");
        })
        .finally(() => setIsLoading(false));
    }
  }, [stud, token]);

  // Submitting the form
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!stud) {
      toast.error("User ID is missing.");
      return;
    }

    if (!studentDetail.username || !studentDetail.email) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("username", studentDetail.username);
      formData.append("email", studentDetail.email);
      if (studentDetail.profileImage) {
        formData.append("profileImage", studentDetail.profileImage);
      }

      const response = await fetch(`${host}/update/${stud}`, {
        method: "PUT",
        headers: {
          authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Error updating user details.");
      }

      const data = await response.json();
      toast.success(data.message || "User updated successfully.");
      navigate("/user");
    } catch (error: any) {
      console.error(error);
      toast.error(`Error updating user details: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex items-center justify-center flex-col m-5">
        <div className="w-full mt-3">
          <label htmlFor="username">Username</label>
          <Input
            id="username"
            type="text"
            className="mt-1 w-full"
            value={studentDetail.username}
            onChange={(e) =>
              setStudentDetails({ ...studentDetail, username: e.target.value })
            }
            disabled={isLoading}
            aria-label="Username"
            required
          />
        </div>
        <div className="mt-3 w-full">
          <label htmlFor="email">Email</label>
          <Input
            id="email"
            type="email"
            className="mt-1 w-full"
            value={studentDetail.email}
            onChange={(e) =>
              setStudentDetails({ ...studentDetail, email: e.target.value })
            }
            disabled={isLoading}
            aria-label="Email"
            required
          />
        </div>
        <div className="mt-3 w-full">
          <label htmlFor="profileImage">Profile Image</label>
          <Input
            id="profileImage"
            type="file"
            className="mt-1 w-full"
            name="profileImage"
            onChange={(e) => {
              const file = e.target.files?.[0] || null;
              setStudentDetails({ ...studentDetail, profileImage: file });
            }}
            disabled={isLoading}
            aria-label="Profile Image"
          />
        </div>
        <Button type="submit" className="mt-3 w-full" disabled={isLoading}>
          {isLoading ? "Updating..." : "Update User"}
        </Button>
      </form>
    </div>
  );
}

export default Edit;
