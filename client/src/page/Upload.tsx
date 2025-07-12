import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { host } from "@/utils/constants";
import { FormEvent, useState } from "react";

function Upload() {
    const [file, setFile] = useState<File | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!file) return;
        setIsLoading(true);
        const formData = new FormData();
        formData.append("file", file);
        try {
            const response = await fetch(`${host}/upload`, {
                method: "POST",
                body: formData,
            });
            if (!response.ok) throw new Error("Failed to upload file");
            // Handle success
            const data = await response.json();
            console.log("File uploaded successfully:", data);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
        <h1>Upload Page</h1>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
            <Input type="file" name="file" onChange={(e) => setFile(e.target.files?.[0] || null)} />
            <Button type="submit">{isLoading ? "Uploading..." : "Upload"}</Button>
        </form>
    </div>
  )
}

export default Upload;