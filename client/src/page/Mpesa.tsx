import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

function Mpesa() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
        <form method="post">
            <div className="mb-4">
                <h3 className="text-center font-bold">Lipa Na Mpesa</h3>
            </div>
            <div w-full mt-2>
                <label htmlFor="username">Phone number</label>
                <Input
                    className="w-full mt-1"
                    type="number"
                    name="phone"
                    required
                    placeholder="2547xxxxxxxx"
                />
            </div>
            <div>
                <Button className="bg-green-700 text-white w-full mt-3">Pay now</Button>
            </div>
        </form>
    </div>
  )
}

export default Mpesa