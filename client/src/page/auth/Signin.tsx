import { useState, FormEvent } from "react"
import {useNavigate } from "react-router-dom"
import { loginDetail } from "@/utils/types";
import { Button } from "@/components/ui/button";
import { host } from "@/utils/constants";
import toast from "react-hot-toast";
import { useAuth } from "./AuthContext";

function Signin() {
  const navigate = useNavigate();
  const { setToken, setName, setProfileImage } = useAuth();

  const [studentDetail, setStudentDetails] = useState<loginDetail>({ username: "", password: ""});
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch (`${host}/login`,
        {
          method: "POST",
          headers: {
            "Content-Type" : "application/json"
          },
          body: JSON.stringify(studentDetail)
        }
      )
      const data = await response.json();
      if(data.success === true){
        const { profileImage, token, username } = data;
        localStorage.setItem("profileImage", profileImage)
        localStorage.setItem("username", username);
        localStorage.setItem("token", token)
        toast.success(data.message);
        setProfileImage(profileImage);
        setToken(token)
        setName(username)
        navigate("/");
      }else{
        toast.error(data.message);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
   }

  return (
    <div className="flex items-center justify-center flex-col h-screen">
      <form onSubmit={handleSubmit} className="h-[300px] w-[500px] flex items-center justify-center flex-col rounded-sm p-5 shadow-md">
        <div className="w-full m-2 text-2xl">
          <h3 className="font-semibold">SignIn</h3>
        </div>
        <div className="w-full mt-2">
          <label htmlFor="username">Username</label>
          <input
            className="p-2 border border-slate-900 rounded-md w-full" 
            type="text"
            name="username"
            required
            value={studentDetail.username} 
            onChange={(e) => setStudentDetails({ ...studentDetail, username: e.target.value })} 
          />
        </div>
        <div className="w-full mt-2">
          <label htmlFor="password">Password</label>
          <input 
            className="p-2  border border-slate-900 rounded-md w-full"
            type="password"
            name="password"
            required
            value={studentDetail.password} 
            onChange={(e) => setStudentDetails({ ...studentDetail, password: e.target.value })} 
          />
        </div>
        <div className="w-full mt-5">
          <Button type="submit" className="p-3">Sign up</Button>
        </div>
      </form>
  </div>
  )
}

export default Signin