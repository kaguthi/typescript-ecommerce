/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/context/AuthContext';
import { host } from '@/utils/constants';
import { userSchema } from '@/utils/types';
import { FormEvent, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';

type EditProps = {
  userdata: userSchema;
};

const Edit: React.FC<EditProps> = ({ userdata }) => {
  const [user, setUser] = useState<userSchema>(userdata);
  const { token, userId, setName, setProfileImage} = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: files && files.length > 0 ? files[0] : value
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!userId) {
      toast.error("User id is missing")
      return;
    }
    setIsLoading(true);
    try {
        const formData = new FormData()
        formData.append('username', user.username)
        formData.append("email", user.email)
        if (user.profileImage) {
            formData.append("profileImage", user.profileImage)
        }
        const response = await fetch(`${host}/update/${userId}`,
        {
            headers: {
                'authorization' : `Bearer ${token}`
            },
            method: "PUT",
            body: formData
        }
        );
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText);
        }
        const data = await response.json();
        toast.success(data.message);
        queryClient.invalidateQueries({ queryKey: ["user"] });
        setName(data.user.username);
        setProfileImage(data.user.profileImage);
        navigate("/profile");
    } catch (error: any) {
        toast.error(error.message)
    }
    finally{
        setIsLoading(false);  
    }
  }

  return (
    <div className='flex flex-col items-center justify-center w-full'>
     <form onSubmit={handleSubmit} className='w-full'>
        <div className='w-full'>
        <label htmlFor="username">Username</label>
        <Input
            type='text'
            name='username'
            id='username'
            className='w-full mt-1'
            value={user.username}
            onChange={handleInputChange}
        />
        </div>
        <div className='w-full mt-2'>
        <label htmlFor="email">Email</label>
        <Input
            type='email'
            name='email'
            id='email'
            className='w-full mt-1'
            value={user.email}
            onChange={handleInputChange}
        />
        </div>
        <div className='w-full mt-2'>
        <label htmlFor="profileImage">Profile Image</label>
        <Input
            type='file'
            name='profileImage'
            id='profileImage'
            accept='image/*'
            className='w-full mt-1'
            onChange={handleInputChange}
        />
        </div>
        <div className='w-full mt-3'>
        <Button type='submit' disabled={isLoading}>{isLoading ? <div className="flex items-center"><Loader2 className="animate-spin" /> Update</div> : "Update Now"}</Button>
        </div>
     </form>
    </div>
  );
};

export default Edit;
