import { fetchAdmin } from "@/redux/adminSlice";
import { useAppSelector } from "@/redux/hooks";
import { Github, Linkedin, Mail, Facebook, MessageCircle } from "lucide-react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export const Footer = () => {


  const dispatch = useDispatch()
  const {settings, loading, error} = useAppSelector((state)=> state.admin)

  useEffect(() => {
    dispatch(fetchAdmin());
  }, [dispatch]);
  

  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="relative border-t border-border py-12 px-6">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Left */}
          <div className="text-center md:text-left">
            <p className="text-muted-foreground">
              © {currentYear} <span className="text-primary font-bold">{settings?.admin?.name}</span>. All rights reserved.
            </p>
          </div>
          
          {/* Right - Social Links */}
          <div className="flex gap-4">
            <a 
              href={settings?.admin?.github}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 border border-border rounded flex items-center justify-center hover:border-primary hover:bg-primary/10 transition-all"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            <a 
              href={settings?.admin?.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 border border-border rounded flex items-center justify-center hover:border-primary hover:bg-primary/10 transition-all"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a 
              href={settings?.admin?.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 border border-border rounded flex items-center justify-center hover:border-primary hover:bg-primary/10 transition-all"
              aria-label="Facebook"
            >
              <Facebook className="w-5 h-5" />
            </a>
            <a 
              href={`https://wa.me/88${settings?.admin?.phone}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 border border-border rounded flex items-center justify-center hover:border-primary hover:bg-primary/10 transition-all"
              aria-label="WhatsApp"
            >
              <MessageCircle className="w-5 h-5" />
            </a>
            <a 
              href={`mailto:${settings?.admin?.email}`} 
              className="w-10 h-10 border border-border rounded flex items-center justify-center hover:border-primary hover:bg-primary/10 transition-all"
              aria-label="Email"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
