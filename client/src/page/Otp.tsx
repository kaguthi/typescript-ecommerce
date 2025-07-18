import { Button } from "@/components/ui/button"
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
  } from "@/components/ui/input-otp"
import { useAuth } from "@/context/AuthContext";
import { host } from "@/utils/constants";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Otp() {
  const [otp, setOtp] = useState<string>("");
  const { userId} = useAuth();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    if (!otp || otp.length < 6) {
      toast.error("Please enter a valid OTP");
      setIsLoading(false);
      return;
    }
    if (!userId) {
      toast.error("User ID is missing");
      setIsLoading(false);
      return;
    }

    const url = `${host}/verifyotp`;

    const sendData = async () => {
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ otp, userId }),
        });

        const data = await response.json();
        if (data.success) {
          toast.success("OTP verified successfully");
          navigate("/signin");
        } else {
          toast.error(data.message || "Failed to verify OTP");
        }
      } catch (error) {
        console.error("Error verifying OTP:", error);
        toast.error("An error occurred while verifying OTP");
      } finally {
        setIsLoading(false);
      }
    }
    sendData();
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <div className="text-2xl font-semibold mb-4">
          <h3>Verify OTP</h3>
        </div>
        <div>
            <InputOTP maxLength={6} value={otp} onChange={(value) => setOtp(value)} className="w-full">
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
        </div>
        <div className="mt-4 w-full">
          <Button type="submit" disabled={isLoading}>{isLoading ? <div className="flex items-center"><Loader2 className="animate-spin mr-2" /> Verifying...</div> : "Verify"}</Button>
        </div>
      </form>
    </div>
  )
}

export default Otp