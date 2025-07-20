import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input"
import { host } from "@/utils/constants";
import { Loader2 } from "lucide-react";
import { FormEvent, useState } from "react"
import toast from "react-hot-toast";

function ResetPassword() {
  const [email, setEmail] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      setIsLoading(false);
      return;
    }

    try{
      const response = await fetch(`${host}/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          newPassword,
        }),
      })
      const data = await response.json();
      if (data.success) {
        toast.success(data.message);
        setEmail("");
        setNewPassword("");
      }
      else {
        toast.error(data.message || "Failed to reset password");
      }
    } catch (error) {
      console.error("Error resetting password:", error);
      return;
    }
    finally {
      setIsLoading(false);
      setEmail("");
      setNewPassword("");
      setConfirmPassword("");
    }
  }
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-md p-2">
        <CardHeader>
          <CardTitle>Reset Password</CardTitle>
          <CardDescription>Enter your email and new password</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold">Reset Password</h3>
            </div>
            <div className="mb-4 w-full">
              <label htmlFor="email">Email</label>
              <Input 
                type="email" 
                id="email"
                name="email" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className="mb-4 w-full">
              <label htmlFor="new-password">New Password</label>
              <Input 
                type="password" 
                id="newPassword" 
                name="newPassword" 
                required 
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                />
            </div>
            <div className="mb-4 w-full">
              <label htmlFor="confirm-password">Confirm Password</label>
              <Input 
                type="password" 
                id="confirmPassword" 
                name="confirmPassword" 
                required 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                />
            </div>
            <div className="mt-4">
              <Button type="submit" className="w-full p-2 text-white rounded" disabled={isLoading}>{isLoading ? <div>
                <Loader2 className="animate-spin mr-2" /> resetting
              </div> : "Reset Password"}</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default ResetPassword