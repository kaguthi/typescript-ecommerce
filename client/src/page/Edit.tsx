import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/context/AuthContext';
import { host } from '@/utils/constants';
import { userSchema } from '@/utils/types';
import { FormEvent, useState } from 'react';
import toast from 'react-hot-toast';

type EditProps = {
  userdata: userSchema;
};

const Edit: React.FC<EditProps> = ({ userdata }) => {
  const [user, setUser] = useState<userSchema>(userdata);
  const { token, userId} = useAuth();

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
    try {
        const formData = new FormData()
        formData.append('username', user.username)
        formData.append("email", user.email)
        if (user.profileImage) {
            formData.append("profileImage", user.profileImage)
        }
        formData.append("password", user.password)
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
            throw new Error(`Error updating student details: ${errorText}`);
        }
        const data = await response.json();
        toast.success(data.message)
    } catch (error: any) {
        toast.error(error.message)
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
            className='w-full mt-1'
            onChange={handleInputChange}
        />
        </div>
        <div className='w-full mt-3'>
        <Button type='submit'>Update</Button>
        </div>
     </form>
    </div>
  );
};

export default Edit;
