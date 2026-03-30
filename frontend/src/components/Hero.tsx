import { ArrowRight, Github, Linkedin, Mail } from "lucide-react";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { useNavigate } from "react-router-dom";
import heroBg from "@/assets/hero-bg.jpg";
import profileImg from "@/assets/profile.jpg";
import profileImg2 from "@/assets/profileImg2.jpg"
import {useAppDispatch, useAppSelector} from "../redux/hooks";
import { fetchAdmin } from "@/redux/adminSlice";
import { useEffect } from "react";

export const Hero = () => {
  const navigate = useNavigate();



  const dispatch = useAppDispatch()
  const { settings, loading, error } = useAppSelector((state) => state.admin);

  
  useEffect(() => {
    dispatch(fetchAdmin());
  }, [dispatch]);

  if (loading) {
    return (
        <div className="flex flex-col gap-7 items-center justify-center min-h-screen">
          <p className="text-muted-foreground/50 ml-2 text-4xl">Salam Alaikum</p>
          <p className="text-muted-foreground">This is Mehedi Hasan</p>
        </div>
    );
  }


  if (error) {
    return (
        <div className="flex flex-col gap-7 items-center justify-center min-h-screen">
          <p className="text-muted-foreground/50 ml-2 text-4xl">Salam Alaikum</p>
          <p className="text-muted-foreground">This is Mehedi Hasan</p>
        </div>
    );
  }



  
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/50 to-background" />
      
      {/* Profile image - Top right corner */}
      <div className="absolute top-4 right-4 sm:top-8 sm:right-8 z-20">
        <Popover>
          <PopoverTrigger asChild>
            <button 
              className="relative w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden border-2 border-primary transition-all duration-300 flex-shrink-0 hover:scale-105"
              aria-label="Profile"
            >
              <img 
                src={profileImg2} 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-48 p-3" align="end">
            <div className="flex flex-col gap-3">
              <div className="text-center pb-2 border-b border-border/50">
                <p className="text-sm font-medium text-foreground">{settings?.admin?.name}</p>
              </div>
              <Button 
                className="w-full" 
                variant="default"
                onClick={() => navigate('/login')}
              >
                Login
              </Button>
            </div>
          </PopoverContent>
        </Popover>
        
        {/* Animated name and title text */}
        <div className="absolute right-[calc(100%+8px)] sm:right-[calc(100%+12px)] top-1/2 -translate-y-1/2 pointer-events-none overflow-visible w-auto">
          <div className="flex flex-col gap-0.5 items-end">
            <p className="text-[10px] sm:text-xs text-muted-foreground/60 font-medium whitespace-nowrap animate-slide-in-left">
              {settings?.admin?.name.split(' ').slice(0, -1).join(' ')}
            </p>
            <p className="text-[9px] sm:text-[11px] text-muted-foreground/50 font-normal whitespace-nowrap animate-slide-in-left-delayed">
              Web developer
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container relative z-10 px-4 sm:px-6 py-12 sm:py-20">
        <div className="max-w-5xl mx-auto">
          {/* Intro text */}
          <div className="mb-4 sm:mb-6 animate-fade-up">
            <span className="text-primary text-xs sm:text-sm font-mono tracking-wider">
              &lt;developer /&gt;
            </span>
          </div>
          
          {/* Main heading */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold mb-4 sm:mb-6 animate-fade-up leading-none">
            {settings?.hero?.title.split(' ')[0]}
            <br />
            <span className="text-primary glow-text">{settings?.hero?.title.split(' ')[1]}</span>
            <br />
            {settings?.hero?.title.split(' ')[2]}
          </h1>
          
          {/* Description */}
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mb-8 sm:mb-12 animate-fade-up text-balance">
            {settings?.hero?.description}
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 animate-fade-up">
            <Button 
              variant="hero" 
              size="lg" 
              className="group w-full sm:w-auto"
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            >
              View Projects
              <ArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button 
              variant="outline_glow" 
              size="lg" 
              className="w-full sm:w-auto"
              asChild
            >
              <a href={`mailto:${settings?.admin?.email}`} target="_blank" rel="noopener noreferrer">
                Get in Touch
              </a>
            </Button>
          </div>
          
          {/* Social Links */}
          <div className="flex gap-4 mt-12 sm:mt-16 animate-fade-up">
            <a 
              href={settings?.admin?.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors p-2"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5 sm:w-6 sm:h-6" />
            </a>
            <a 
              href={settings?.admin?.linkedin} 
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors p-2"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5 sm:w-6 sm:h-6" />
            </a>
            <a 
              href={`mailto:${settings?.admin?.email}`} 
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors p-2"
              aria-label="Email"
            >
              <Mail className="w-5 h-5 sm:w-6 sm:h-6" />
            </a>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-glow-pulse" />
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-glow-pulse delay-1000" />
    </section>
  );
};
