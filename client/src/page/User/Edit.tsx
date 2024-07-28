import { useEffect, useState, FormEvent } from "react";
import { useSearchParams, useNavigate } from "react-router-dom"
import { userDetail } from "@/utils/types";
import { Button } from "@/components/ui/button";
import { host } from "@/utils/constants";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";
import { Input } from "@/components/ui/input";

function Edit() {
    const [student] = useSearchParams();
    const navigate = useNavigate();

    const [studentDetail, setStudentDetails] = useState<userDetail>({ username: "", email: "", profileImage: null });
    const stud = student.get("studentId");
    const { token } = useAuth();
    useEffect(() =>{
      if (stud) {
        fetch(`${host}/users/${stud}`,
          {
            headers: {
              "authorization": `Bearer ${token}`,
            }
          }
        )
          .then(response => response.json())
          .then(data => setStudentDetails(data))
          .catch(error => console.error('Error fetching student details:', error));
      }
    },[stud, token]);
    // submitting the form
    const handleSubmit = async (e: FormEvent) => {
      e.preventDefault();
      if (!stud) {
        toast.error("User ID is missing");
        return;
      }
  
      try {
        const formData = new FormData();
        formData.append("username", studentDetail.username)
        formData.append("email", studentDetail.email)
        if (studentDetail.profileImage) {
          formData.append("profileImage", studentDetail.profileImage)
        }
        const response = await fetch(`${host}/update/${stud}`, {
          method: "PUT",
          headers: {
            'authorization': `Bearer ${token}`,
          },
          body: formData,
        });
  
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Error updating student details: ${errorText}`);
        }
  
        const data = await response.json();
        toast.success(data.message);
        navigate('/user');
      } catch (error: any) {
        toast.error(`Error updating student details: ${error.message}`);
      }
    };
  return (
    <div>
      <form onSubmit={handleSubmit} className="flex items-center justify-center flex-col m-5">
        <div className="w-full mt-3">
          <label htmlFor="username">Username</label>
            <Input
              type="text"
              className="mt-1 w-full" 
              value={studentDetail.username} 
              onChange={(e) => setStudentDetails({ ...studentDetail, username: e.target.value })} 
            />
        </div>
        <div className="mt-3 w-full">
          <label htmlFor="email">Email</label>
          <Input 
            type="email"
            className="mt-1 w-full"
            value={studentDetail.email} 
            onChange={(e) => setStudentDetails({ ...studentDetail, email: e.target.value })} 
          />
          </div>
          <div className="mt-3 w-full">
            <label htmlFor="profileImage">Profile Image</label>
            <Input 
              type="file" 
              className="mt-1 w-full"
              name="profileImage"
              onChange={(e) => {
                const file = e.target.files?.[0] || null;
                setStudentDetails({ ...studentDetail, profileImage: file})
              }}
              />
          </div>
          <Button type="submit" className="mt-3 w-full">Update User</Button>
      </form>
  </div>
  )
}

export default Edit