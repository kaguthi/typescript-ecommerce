/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { userSchema } from "@/utils/types";
import { Button } from "@/components/ui/button";
import { host } from "@/utils/constants";
import toast from "react-hot-toast";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { CardTitle, Card, CardHeader, CardDescription, CardContent } from "@/components/ui/card";

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

      const data = await response.json();
      if(data.success === true){
        toast.success(data.message);
        navigate('/verify');
      }
      else {
        toast.error(data.message)
      }
    } catch (error: any) {
      toast.error(error.message);
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center flex-col min-h-screen p-2">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
          <CardDescription>Please fill in the details below to create an account.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="w-full">
              <label htmlFor="username">Username</label>
              <Input
                className="mt-1"
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
                className="mt-1"
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
                className="mt-1"
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
                className="mt-1"
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
              <Button type="submit" className="p-3" disabled={isLoading}>{isLoading ? <div className="flex items-center"><Loader2 className="animate-spin mr-2" />Sign Up</div> : "Sign Up"}</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default Signin;
