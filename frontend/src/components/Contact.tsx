import { Mail, MapPin, Phone } from "lucide-react";
import { Button } from "./ui/button";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useEffect, useState } from "react";
import { fetchAdmin } from "@/redux/adminSlice";
import { resetContactState, sendContactMessage } from "@/redux/contactsSlice";

export const Contact = () => {


  const dispatch = useAppDispatch()
    const { settings } = useAppSelector((state) => state.admin);

    const {loading, error, success} = useAppSelector((state)=> state.contacts);
  
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [message, setMessage] = useState("")              
    
  useEffect(() => {
    dispatch(fetchAdmin());
  }, [dispatch]);


  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()

    if (!name || !email || !message) return

    const userMsgInfo = {name, email, message}

    dispatch(sendContactMessage(userMsgInfo))

  }


  // Reset form fields when message is successfully sent
  useEffect(() => {
    if (success) {
      setName("");
      setEmail("");
      setMessage("");
      // reset success for next submission after 3s
      const timer = setTimeout(() => {
        dispatch(resetContactState());
      }, 3000);

      return () => clearTimeout(timer); // cleanup
    }
  }, [success, dispatch]);




  return (
    <section className="py-16 sm:py-24 md:py-32 px-4 sm:px-6" id="contact">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 lg:gap-20 items-center">
          {/* Left Column */}
          <div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 sm:mb-8 leading-tight">
              {/* get the first 2 or 1 word of the contactPitch title */}
              {settings?.contactPitch?.title ? settings?.contactPitch?.title.split(' ').slice(0, settings?.contactPitch?.title.split(' ').length >= 4 ? 2 : 1).join(' ') : ''}
              <br />
              <span className="text-primary glow-text">
              {/* get the 2nd word or 3rd word if it exists */}
              {settings?.contactPitch?.title ? settings?.contactPitch?.title.split(' ')[settings?.contactPitch?.title.split(' ').length >= 4 ? 2 : 1] : ''}
              </span>
              <br />
              {/* get the rest full text */}
              {
                ((w) => w.slice(w.length >= 4 ? 3 : 2).join(' '))(
                  settings?.contactPitch?.title?.split(' ') || []
                )
              }
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground mb-8 sm:mb-12 max-w-lg text-balance">
              {settings?.contactPitch?.description}
            </p>
            
            {/* Contact Info */}
            <div className="space-y-4 sm:space-y-6">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 border-2 border-primary rounded flex items-center justify-center flex-shrink-0">
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm text-muted-foreground mb-1">Email</p>
                  <a href="mailto:mh.hasanemon287@gmail.com" className="text-base sm:text-lg hover:text-primary transition-colors break-all">
                    {settings?.admin?.email}
                  </a>
                </div>
              </div>
              
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 border-2 border-primary rounded flex items-center justify-center flex-shrink-0">
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm text-muted-foreground mb-1">Phone / WhatsApp</p>
                  <a href={`https://wa.me/88${settings?.admin?.phone}`} target="_blank" rel="noopener noreferrer" className="text-base sm:text-lg hover:text-primary transition-colors">
                    +88{settings?.admin?.phone}
                  </a>
                </div>
              </div>
              
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 border-2 border-primary rounded flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm text-muted-foreground mb-1">Location</p>
                  <p className="text-base sm:text-lg">Bangladesh</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Column - Form */}
          <div className="relative">
            <div className="absolute -inset-2 sm:-inset-4 bg-primary/10 rounded-lg blur-2xl" />
            <div className="relative bg-card border-2 border-border rounded-lg p-4 sm:p-6 md:p-8">
              <form 
                className="space-y-4 sm:space-y-6"
                onSubmit={handleSubmit}
              >
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-background border-2 border-border rounded px-4 py-3 focus:border-primary focus:outline-none transition-colors"
                    placeholder="Your name"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-background border-2 border-border rounded px-4 py-3 focus:border-primary focus:outline-none transition-colors"
                    placeholder="your.email@example.com"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-background border-2 border-border rounded px-4 py-3 focus:border-primary focus:outline-none transition-colors resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>
                
                <Button variant="hero" size="lg" className="w-full" disabled={loading}>
                  {loading ? "Sending..." : "Send Message"}
                </Button>

                {error && <p className="text-red-500 mt-2">{error}</p>}
                {success && <p className="text-cyan-500 mt-2">Message sent successfully!</p>}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
