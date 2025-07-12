/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { host } from "@/utils/constants";
import { useState } from "react"
import toast from "react-hot-toast";

function Mpesa() {
    const [phone, setPhone] = useState<number>(0);
    const[isLoading, setLoading] = useState<boolean>(false);
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        try {
            const sendData = await fetch(`${host}/payment/mpesa`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({phone})
            });
            const data = await sendData.json();
            if (!sendData.ok) {
                throw new Error(data.message || 'Payment failed');
            }
            toast.success(data.message);
            setPhone(0);
        } catch (error: any) {
            toast.error(error.message)
        }
        finally {
            setLoading(false);
        }
    }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
        <form method="post" onSubmit={handleSubmit} className="w-full max-w-md p-5 bg-white rounded-lg shadow-md">
            <div className="mb-4">
                <h3 className="text-center font-bold">Lipa Na Mpesa</h3>
            </div>
            <div className="w-full mt-2">
                <label htmlFor="username">Phone number</label>
                <Input
                    className="w-full mt-1"
                    type="number"
                    name="phone"
                    required
                    placeholder="2547xxxxxxxx"
                    onChange={(e) => setPhone(parseInt(e.target.value))}
                    value={phone}
                />
            </div>
            <div className="w-full mt-3">
                <Button className="bg-green-700 text-white w-full" disabled={isLoading}>{isLoading ? "Loading ...": "Pay Now"}</Button>
            </div>
        </form>
    </div>
  )
}

export default Mpesa