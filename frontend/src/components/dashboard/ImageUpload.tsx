import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import type { ImageData } from "@/types/dashboard";

interface ImageUploadProps {
  label: string;
  value: ImageData;
  onChange: (data: ImageData) => void;
}

const ImageUpload = ({ label, value, onChange }: ImageUploadProps) => {
  const [preview, setPreview] = useState<string>(value.url || "");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setPreview(base64);
        // In a real scenario, you would upload to your backend and get url/public_id
        onChange({
          url: base64, // This would be replaced with actual URL from backend
          public_id: `temp_${Date.now()}`, // This would be replaced with actual public_id
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUrlChange = (url: string) => {
    setPreview(url);
    onChange({ ...value, url });
  };

  const clearImage = () => {
    setPreview("");
    onChange({ url: "", public_id: "" });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-3">
      <Label>{label}</Label>
      
      {/* Preview */}
      <div className="relative w-full aspect-video rounded-lg border-2 border-dashed border-muted-foreground/25 overflow-hidden bg-muted/50">
        {preview ? (
          <>
            <img
              src={preview}
              alt="Preview"
              className="w-full h-full object-cover"
            />
            <Button
              type="button"
              variant="destructive"
              size="icon"
              className="absolute top-2 right-2"
              onClick={clearImage}
            >
              <X className="h-4 w-4" />
            </Button>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
            <ImageIcon className="h-10 w-10 mb-2" />
            <span className="text-sm">No image selected</span>
          </div>
        )}
      </div>

      {/* Upload Options */}
      <div className="flex gap-2">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload className="h-4 w-4 mr-2" />
          Upload
        </Button>
      </div>

      {/* URL Input */}
      <div className="space-y-1">
        <Label className="text-xs text-muted-foreground">Or enter URL</Label>
        <Input
          type="url"
          placeholder="https://example.com/image.jpg"
          value={value.url}
          onChange={(e) => handleUrlChange(e.target.value)}
        />
      </div>

      {/* Public ID (read-only display) */}
      {value.public_id && (
        <div className="text-xs text-muted-foreground">
          Public ID: {value.public_id}
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
