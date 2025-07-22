import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input"
import { host } from "@/utils/constants";
import { Loader2 } from "lucide-react";
import { useState } from "react"
import toast from "react-hot-toast";

function Mpesa() {
  const [phone, setPhone] = useState<string>("");
  const [isLoading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    if (!/^2547\d{8}$/.test(phone)) {
      toast.error("Invalid phone number. Must start with 2547 and be 12 digits.");
      setLoading(false);
      return;
    }

    try {
      const sendData = await fetch(`${host}/payment/mpesa`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ phone })
      });

      const data = await sendData.json();

      if (!sendData.ok) {
        throw new Error(data.message || "Payment failed");
      }

      toast.success(data.message);
      setPhone("");
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-2">
      <Card className="w-full max-w-md">
        <CardHeader className="flex">
          <CardTitle className="text-2xl font-bold">Lipa Na Mpesa</CardTitle>
          <CardDescription className="text-xs text-gray-500 mb-2">Enter your phone number to proceed with the payment</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="w-full">
              <Input
                id="phone"
                type="tel"
                name="phone"
                placeholder="2547xxxxxxxx"
                required
                pattern="^2547\d{8}$"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                disabled={isLoading}
                autoFocus
                className="mt-1"
              />
            </div>
            <div className="w-full mt-3">
              <Button disabled={isLoading}>
                {isLoading ? <div className="flex items-center"><Loader2 className="animate-spin mr-2" /> Processing</div> : "Pay Now"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default Mpesa;
