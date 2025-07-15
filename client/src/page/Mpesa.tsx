import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { host } from "@/utils/constants";
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
    <div className="flex flex-col items-center justify-center min-h-screen">
      <form onSubmit={handleSubmit} className="w-full max-w-md p-5 bg-white rounded-lg shadow-md">
        <div className="mb-4">
          <h3 className="text-center font-bold text-lg">Lipa Na Mpesa</h3>
        </div>
        <div className="w-full mt-2">
          <label htmlFor="phone">Phone number</label>
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
          />
        </div>
        <div className="w-full mt-3">
          <Button className="bg-green-700 text-white w-full" disabled={isLoading}>
            {isLoading ? "Processing..." : "Pay Now"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Mpesa;
