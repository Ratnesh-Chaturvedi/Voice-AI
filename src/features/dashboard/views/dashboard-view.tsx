import PageHeader from "@/components/page-header"
import { HeroPattern } from "../components/hero-pattern"
import DashboardHeader from "../components/dashboard-header"
import { TextInputPanel } from "../components/text-input-panel"
import { QuickActionsPanel } from "../components/quick-action-panel"

export const DashboardView= ()=>{
    return (
        <div className="relative">
            <HeroPattern/>
            <PageHeader title="Dashboard" className="lg:hidden"/> 
            <div className="relative space-y-8 p-4 lg:p-16">
                <DashboardHeader/>
                <TextInputPanel/>
                <QuickActionsPanel/> 
            </div>
             </div>
    )
}