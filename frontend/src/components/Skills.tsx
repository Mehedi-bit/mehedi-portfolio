import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchSkills } from "@/redux/sklillsSlice";
import { useEffect } from "react";
import { Stats } from "./Stats";







export const Skills = () => {

  const dispatch = useAppDispatch()
  const { skillset, loading, error } = useAppSelector((state) => state.skills)


  useEffect(()=> {
    dispatch(fetchSkills())
  }, [dispatch])

  if (loading) return <p className="text-center m-5">Searching skills..</p>

  if (error) return <p className="text-center m-5">Something went wrong..</p>



  const skillCategories = [
      {
        category: "Frontend",
        skills: skillset?.frontend || []
      },
      {
        category: "Backend",
        skills: skillset?.backend || []
      },
      {
        category: "Tools & Others",
        skills: skillset?.tools || []
      },
  ];



  return (
    <section className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 bg-card/30" id="skills">
      <div className="container mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mb-12 sm:mb-16 md:mb-20">
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6">
            Tech
            <br />
            <span className="text-primary">Stack</span>
          </h2>
          <div className="w-16 sm:w-20 h-1 bg-primary" />
        </div>
        
        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {skillCategories.map((category, idx) => (
            <div
              key={idx}
              className="group border-l-4 border-primary pl-4 sm:pl-6 hover:border-secondary transition-colors duration-300"
            >
              <h3 className="text-xs sm:text-sm font-mono text-primary mb-4 sm:mb-6 uppercase tracking-wider">
                {category.category}
              </h3>
              <div className="space-y-2 sm:space-y-3">
                {category.skills.map((skill) => (
                  <div
                    key={skill}
                    className="flex items-center gap-2 sm:gap-3 text-base sm:text-lg hover:translate-x-2 transition-transform duration-200 cursor-default"
                  >
                    <span className="w-2 h-2 bg-foreground group-hover:bg-primary transition-colors flex-shrink-0" />
                    <span className="font-medium">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        {/* Terminal-style stats */}
        {/* <div className="mt-12 sm:mt-16 md:mt-20 bg-background border-2 border-border rounded p-4 sm:p-6 md:p-8 font-mono text-xs sm:text-sm overflow-x-auto">
          <div className="flex items-center gap-2 mb-3 sm:mb-4 pb-3 sm:pb-4 border-b border-border">
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-destructive" />
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-secondary" />
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-primary" />
          </div>
          <div className="space-y-1.5 sm:space-y-2 text-muted-foreground">
            <p><span className="text-primary">$</span> cat ./stats.txt</p>
            <p className="pl-3 sm:pl-4">Years of Experience: <span className="text-foreground">5+</span></p>
            <p className="pl-3 sm:pl-4">Projects Completed: <span className="text-foreground">50+</span></p>
            <p className="pl-3 sm:pl-4">Happy Clients: <span className="text-foreground">30+</span></p>
            <p className="pl-3 sm:pl-4">Coffee Consumed: <span className="text-foreground">∞</span></p>
            <p><span className="text-primary">$</span> <span className="animate-pulse">_</span></p>
          </div>
        </div> */}

          {/* <Stats /> */}

      </div>
    </section>
  );
};
