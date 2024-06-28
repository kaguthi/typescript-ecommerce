import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { userSchema } from "@/utils/types";
import { Button } from "@/components/ui/button";
import { host } from "@/utils/constants";
import toast from "react-hot-toast";

function Signin() {
  const navigate = useNavigate();

  const [studentDetail, setStudentDetails] = useState<userSchema>({
    username: "",
    email: "",
    password: "",
    profileImage: null
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

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
      toast.error("Something went wrong");
      console.log(error.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex items-center justify-center flex-col m-5">
        <label htmlFor="username">Username</label>
        <input
          className="p-3 border border-orange-500 rounded-md w-full"
          type="text"
          name="username"
          required
          value={studentDetail.username}
          onChange={(e) => setStudentDetails({ ...studentDetail, username: e.target.value })}
        />
        <label htmlFor="email">Email</label>
        <input
          className="p-3 m-5 border border-orange-500 rounded-md w-full"
          type="email"
          name="email"
          required
          value={studentDetail.email}
          onChange={(e) => setStudentDetails({ ...studentDetail, email: e.target.value })}
        />
        <label htmlFor="password">Password</label>
        <input
          className="p-3 m-5 border border-orange-500 rounded-md w-full"
          type="password"
          name="password"
          required
          value={studentDetail.password}
          onChange={(e) => setStudentDetails({ ...studentDetail, password: e.target.value })}
        />
        <label htmlFor="profileImage">Profile Image</label>
        <input
          className="p-3 m-5 border border-orange-500 rounded-md w-full"
          type="file"
          name="profileImage"
          required
          onChange={(e) => {
            const file = e.target.files?.[0] || null;
            setStudentDetails({ ...studentDetail, profileImage: file });
          }}
        />
        <Button type="submit" className="mt-3 w-full">Sign in</Button>
      </form>
    </div>
  );
}

export default Signin;
