import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input"
import { host } from "@/utils/constants";
import { Loader2 } from "lucide-react";
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
    <div className="flex items-center justify-center min-h-screen p-2">
        <Card>
            <CardHeader>
                <CardTitle>Confirm Email</CardTitle>
                <CardDescription>
                    Please enter your email to confirm your account.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit}>
                    <div className="mt-4 w-full">
                        <label htmlFor="email">Email</label>
                        <Input 
                            type="email" 
                            name="email" 
                            className="mt-1d" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required 
                        />
                    </div>
                    <div>
                        <Button type="submit" className="w-full mt-4 p-2 text-white rounded">{isLoading ? <div className="flex items-center"><Loader2 className="animate-spin mr-2" /> Loading</div> : "Confirm Email"}</Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    </div>
  )
}

export default ConfirmEmail