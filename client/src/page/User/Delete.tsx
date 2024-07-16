import {useSearchParams, useNavigate } from 'react-router-dom';
import { useEffect, useState, FormEvent } from "react";
import { userDetail } from "@/utils/types";
import { Button } from "@/components/ui/button";
import { host } from "@/utils/constants";
import toast from "react-hot-toast";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useAuth } from '../../context/AuthContext';


function Delete() {
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
                "authorization" : `Bearer ${token}`,
              }
            }
          )
            .then(response => response.json())
            .then(data => setStudentDetails(data))
            .catch(error => console.error('Error fetching student details:', error));
        }
      },[stud, token]);
      const handleDelete = async (e: FormEvent) => {
        e.preventDefault();
        if (!stud) {
          toast.error("Student ID is missing");
          return;
        }
    
        try {
          const response = await fetch(`${host}/delete/${stud}`, {
            method : "DELETE",
            headers : {
              "authorization" : `Bearer ${token}`,
            }
          });
    
          if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Error Deleting student details: ${errorText}`);
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
        <form className="flex items-center justify-center flex-col m-5">
        <input
            className="p-3 border border-orange-500 rounded-md w-full" 
            value={studentDetail.username} 
            onChange={(e) => setStudentDetails({ ...studentDetail, username: e.target.value })} />
        <input 
            className="p-3 mt-5 border border-orange-500 rounded-md w-full"
            value={studentDetail.email} 
            onChange={(e) => setStudentDetails({ ...studentDetail, email: e.target.value })} />
            <Dialog>
              <DialogTrigger className="bg-primary mt-10 p-3 w-full text-slate-50 rounded-md">Delete</DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Confirm Delete of User</DialogTitle>
                  <DialogDescription>
                    Are you sure you want to delete this user?
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter className="sm:justify-start">
                  <Button type='button' onClick={handleDelete}>Delete</Button>
                  <DialogClose asChild>
                    <Button type="button" variant="secondary">
                      Cancel
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
        </form>
    </div>
  )
}

export default Delete