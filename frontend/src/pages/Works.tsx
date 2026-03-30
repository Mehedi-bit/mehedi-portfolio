import { ExternalLink, Github, Eye, ArrowLeft } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ProjectPreviewModal } from "@/components/ProjectPreviewModal";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchProjects } from "@/redux/projectsSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";





const Works = () => {
  const navigate = useNavigate();
  const [previewModal, setPreviewModal] = useState<{ isOpen: boolean; url: string; title: string }>({
    isOpen: false,
    url: "",
    title: "",
  });

  const openPreview = (url: string, title: string) => {
    setPreviewModal({ isOpen: true, url, title });
  };

  const closePreview = () => {
    setPreviewModal({ isOpen: false, url: "", title: "" });
  };





    // redux things
  
    const dispatch = useAppDispatch()
    const { projects, loading, error } = useAppSelector((state) => state.projects)
  
  
    useEffect(()=> {
      dispatch(fetchProjects())
    }, [dispatch])
  
  
    if (loading) return <p className="text-muted-foreground text-center">Loading projects...</p>;
    
    if (error) return <p className="text-muted-foreground text-center">Sorry..</p>; 




  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border backdrop-blur-md bg-background/80 sticky top-0 z-50">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-mono text-sm">Back to Home</span>
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto max-w-7xl relative">
          <div className="mb-12 sm:mb-16 text-center">
            <p className="text-primary font-mono text-sm mb-4 tracking-widest uppercase">Portfolio</p>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6">
              All{" "}
              <span className="text-primary glow-text">Works</span>
            </h1>
            <div className="w-16 sm:w-20 h-1 bg-primary mx-auto mb-6" />
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              A collection of projects I've built — from full-stack web apps to fun games.
            </p>
          </div>

          {/* Projects Grid */}
          
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6 sm:gap-8 justify-center">
              {projects
                // .sort((a, b) => Number(a.order) - Number(b.order))
                .map((project, index) => (
                <Card
                  key={index}
                  className="group relative overflow-hidden border-2 border-border hover:border-primary transition-all duration-500 hover-lift bg-card"
                >
                  {/* Project Image */}
                  <div className="relative overflow-hidden aspect-video">
                    <img
                      src={project.image.url}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                    <div className="absolute top-3 right-3 text-4xl font-bold text-primary/20 font-mono group-hover:text-primary/40 transition-colors">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 sm:p-6">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed line-clamp-2">
                      {project.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {project.techs.map((tech) => (
                        <span
                          key={tech}
                          className="text-xs font-mono px-2.5 py-0.5 bg-muted border border-border rounded"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Links */}
                    <div className="flex gap-2 pt-3 border-t border-border">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => window.open(project.github, "_blank")}
                        title="View Source"
                      >
                        <Github className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => window.open(project.liveLink, "_blank")}
                        title="Visit Live"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openPreview(project.liveLink, project.title)}
                        title="Quick Preview"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          

        </div>
      </section>

      {/* Contact / Let's Build Something Amazing */}
      <Contact />

      {/* Footer */}
      <Footer />

      <ProjectPreviewModal
        isOpen={previewModal.isOpen}
        onClose={closePreview}
        projectUrl={previewModal.url}
        projectTitle={previewModal.title}
      />
    </div>
  );
};

export default Works;
