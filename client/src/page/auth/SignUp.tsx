import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { userSchema } from "@/utils/types";
import { Button } from "@/components/ui/button";
import { host } from "@/utils/constants";
import toast from "react-hot-toast";
import { Input } from "@/components/ui/input";

function Signin() {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState<boolean>(false);

  const [studentDetail, setStudentDetails] = useState<userSchema>({
    username: "",
    email: "",
    password: "",
    profileImage: null
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("username", studentDetail.username);
      formData.append("email", studentDetail.email);
      formData.append("password", studentDetail.password);
      if (studentDetail.profileImage) {
        formData.append("profileImage", studentDetail.profileImage);
      }

      const response = await fetch(`${host}/register`, {
        method: "POST",
        body: formData
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error occurred due to: ${errorText}`);
      }

      const data = await response.json();
      toast.success(data.message);
      navigate('/signin');
    } catch (error: any) {
      toast.error(error.message);
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center flex-col min-h-screen p-4">
      <form onSubmit={handleSubmit} className="w-full max-w-md flex flex-col items-center rounded-lg p-5 shadow-md bg-white">
        <div className="w-full">
          <h3 className="font-bold text-2xl">SignUp</h3>
        </div>
        <div className="w-full mt-2">
          <label htmlFor="username">Username</label>
          <Input
            className="w-full mt-1"
            type="text"
            name="username"
            required
            value={studentDetail.username}
            onChange={(e) => setStudentDetails({ ...studentDetail, username: e.target.value })}
          />
        </div>
        <div className="w-full mt-2">
          <label htmlFor="email">Email</label>
          <Input
            className="w-full mt-1"
            type="email"
            name="email"
            required
            value={studentDetail.email}
            onChange={(e) => setStudentDetails({ ...studentDetail, email: e.target.value })}
          />
        </div>
        <div className="w-full mt-2">
          <label htmlFor="password">Password</label>
          <Input
            className="w-full mt-1"
            type="password"
            name="password"
            required
            value={studentDetail.password}
            onChange={(e) => setStudentDetails({ ...studentDetail, password: e.target.value })}
          />
        </div>
        <div className="w-full mt-2">
          <label htmlFor="profileImage">Profile Image</label>
          <Input
            className="w-full mt-1"
            type="file"
            name="profileImage"
            required
            onChange={(e) => {
              const file = e.target.files?.[0] || null;
              setStudentDetails({ ...studentDetail, profileImage: file });
            }}
          />
        </div>
        <div className="w-full mt-3">
          <Button type="submit" className="p-3" disabled={isLoading}>{isLoading ? "Signing Up...": "Sign Up"}</Button>
        </div>  
      </form>
    </div>
  );
}

export default Signin;
