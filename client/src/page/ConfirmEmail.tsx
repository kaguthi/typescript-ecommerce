import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { host } from "@/utils/constants";
import { FormEvent, useState } from "react"
import { toast } from "react-hot-toast";

function ConfirmEmail() {
    const [email, setEmail] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);
        try {
            const response = await fetch(`${host}/confirm-email`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            });
            const data = await response.json();
            if (data.success) {
                toast.success(data.message);
            }
        } catch (error) {
            toast.error("Error confirming email: " + error);
            return;
        }
        finally {
            setIsLoading(false);
            setEmail("");
        }
    }
  return (
    <div className="flex items-center justify-center min-h-screen">
        <form onSubmit={handleSubmit} className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
            <div className="text-center">
                <h3 className="text-2xl font-semibold">Confirm Email</h3>
            </div>
            <div className="mt-4 w-full">
                <label htmlFor="email">Email</label>
                <Input 
                    type="email" 
                    name="email" 
                    className="w-full mt-1 p-2 border rounded" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required 
                />
            </div>
            <div>
                <Button type="submit" className="w-full mt-4 p-2 text-white rounded">{isLoading ? "Loading..." : "Confirm Email"}</Button>
            </div>
        </form>
    </div>
  )
}

export default ConfirmEmail