 import { Suspense } from "react"
import {HealthCheck} from "./health-check"
 import {trpc,HydrateClient,prefetch} from "@/trpc/server"
import { ErrorBoundary } from "react-error-boundary"
 export default function TestPage(){
    prefetch(trpc.health.queryOptions()) 

    return(
    <HydrateClient>
        <ErrorBoundary fallback={<div>Something went wrong</div>}>

        <Suspense fallback={<div className="text-center">Loading....🏵️</div>}>
    <HealthCheck/>
        </Suspense>
        </ErrorBoundary>
    </HydrateClient>    
)    
  }