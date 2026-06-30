"use client"
import {useSuspenseQuery} from "@tanstack/react-query"
import {useTRPC} from "@/trpc/client"


export function HealthCheck(){
    const trpc=useTRPC()
    const {data}=useSuspenseQuery(trpc.health.queryOptions())
    return (
        <div className="text-center text-3xl ">
           <p>
            TRPC Status
           </p>
           <p>
             <span>🌸{data.status}</span>
           </p>
        </div>
    )
}