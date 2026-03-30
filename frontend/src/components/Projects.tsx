import { ExternalLink, Github, Eye } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { ProjectPreviewModal } from "./ProjectPreviewModal";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchProjects } from "@/redux/projectsSlice";



export const Projects = () => {

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


  if (loading) return <p>Loading projects...</p>;
  




  return (
    <section className="py-16 sm:py-24 md:py-32 px-4 sm:px-6" id="projects">
      <div className="container mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mb-12 sm:mb-16 md:mb-20">
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6">
            Featured
            <br />
            <span className="text-primary">Work</span>
          </h2>
          <div className="w-16 sm:w-20 h-1 bg-primary" />
        </div>
        
        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {projects.map((project, index) => (
            <Card
              key={index}
              className={`group relative overflow-hidden border-2 border-border hover:border-primary transition-all duration-500 hover-lift bg-gradient-to-br ${project.gradient}`}
            >
              {/* Project Image */}
              <div className="relative h-48 sm:h-56 overflow-hidden">
                <img
                  src={project.image.url}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
                {/* Project Number */}
                <div className="absolute top-3 right-3 sm:top-4 sm:right-4 text-4xl sm:text-5xl font-bold text-primary-foreground/20 group-hover:text-primary-foreground/40 transition-colors">
                  {String(index + 1).padStart(2, '0')}
                </div>
              </div>

              {/* Content */}
              <div className="relative z-10 p-6 sm:p-8 pt-4 sm:pt-5">
                <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-5 leading-relaxed">
                  {project.description}
                </p>

                {/* Techs */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {project.techs.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs font-mono px-3 py-1 bg-muted border border-border rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-3">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => window.open(project.github, "_blank")}
                  >
                    <Github className="w-4 h-4 hover:text-primary transition-colors" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => window.open(project.liveLink, "_blank")}
                  >
                    <ExternalLink className="w-4 h-4 hover:text-primary transition-colors" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => openPreview(project.liveLink, project.title)}
                  >
                    <Eye className="w-4 h-4 hover:text-primary transition-colors" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
      </div>

        {/* Show More Button */}
        <div className="mt-12 sm:mt-16 text-center">
          <a
            href="/works"
            className="inline-flex items-center gap-2 px-8 py-3 border-2 border-primary text-primary font-semibold rounded hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover-lift"
          >
            Show More
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>

      <ProjectPreviewModal
        isOpen={previewModal.isOpen}
        onClose={closePreview}
        projectUrl={previewModal.url}
        projectTitle={previewModal.title}
      />
    </section>
  );
};
