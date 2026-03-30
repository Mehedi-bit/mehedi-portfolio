import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { fetchStats } from "@/redux/statsSlice"
import { useEffect } from "react"


export const Stats = () => {


    const dispatch = useAppDispatch()
    const { stats, loading, error } = useAppSelector((state) => state.stats)


    useEffect(()=> {
        dispatch(fetchStats())
    }, [dispatch])


    if (loading) return <p className="text-center m-5">Searching stats..</p>

    if (error) return <p className="text-center m-5">Something went wrong..</p>




    return (
        <section>
            {/* Terminal-style stats */}
            <div className="mt-12 sm:mt-16 md:mt-20 bg-background border-2 border-border rounded p-4 sm:p-6 md:p-8 font-mono text-xs sm:text-sm overflow-x-auto">
            <div className="flex items-center gap-2 mb-3 sm:mb-4 pb-3 sm:pb-4 border-b border-border">
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-destructive" />
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-secondary" />
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-primary" />
            </div>
            <div className="space-y-1.5 sm:space-y-2 text-muted-foreground">

                {
                    stats && (
                        <>
                            <p><span className="text-primary">$</span> cat ./stats.txt</p>
                            <p className="pl-3 sm:pl-4">Years of Experience: <span className="text-foreground">{stats.yearsOfExperience}</span></p>
                            <p className="pl-3 sm:pl-4">Projects Completed: <span className="text-foreground">{stats.projectsCompleted}</span></p>
                            <p className="pl-3 sm:pl-4">Happy Clients: <span className="text-foreground">{stats.happyClients}</span></p>
                            <p className="pl-3 sm:pl-4">Coffee Consumed: <span className="text-foreground">{stats.coffeeConsumed}</span></p>
                            <p><span className="text-primary">$</span> <span className="animate-pulse">_</span></p>
                        </>
                    )
                }
                </div>
            </div>
        </section>
    )


}