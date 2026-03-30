import { Dialog, DialogContent } from "./ui/dialog";
import { Button } from "./ui/button";
import { Monitor, Tablet, Smartphone, X, ExternalLink } from "lucide-react";
import { useState } from "react";

interface ProjectPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectUrl: string;
  projectTitle: string;
}

type ViewportSize = "desktop" | "tablet" | "mobile";

export const ProjectPreviewModal = ({
  isOpen,
  onClose,
  projectUrl,
  projectTitle,
}: ProjectPreviewModalProps) => {
  const [viewport, setViewport] = useState<ViewportSize>("desktop");

  const viewportSizes = {
    desktop: "w-full h-full",
    tablet: "w-[768px] h-[1024px]",
    mobile: "w-[375px] h-[667px]",
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[95vw] max-h-[95vh] h-[95vh] p-0 gap-0">
        {/* Header */}
        <div className="flex items-center justify-between py-1 px-2 border-b border-border">
          <div className="flex items-center gap-3">
            <h3 className="font-semibold text-base">{projectTitle}</h3>
            <div className="flex gap-1">
              <Button
                variant={viewport === "desktop" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewport("desktop")}
              >
                <Monitor className="w-4 h-4" />
              </Button>
              <Button
                variant={viewport === "tablet" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewport("tablet")}
              >
                <Tablet className="w-4 h-4" />
              </Button>
              <Button
                variant={viewport === "mobile" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewport("mobile")}
              >
                <Smartphone className="w-4 h-4" />
              </Button>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => window.open(projectUrl, "_blank")}
              title="Open in browser"
            >
              <ExternalLink className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Preview Area */}
        <div className="flex-1 overflow-auto bg-muted/30 flex items-start justify-center p-4">
          <div className={`${viewportSizes[viewport]} bg-background border border-border shadow-lg transition-all duration-300`}>
            <iframe
              src={projectUrl}
              title={projectTitle}
              className="w-full h-full"
              sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
