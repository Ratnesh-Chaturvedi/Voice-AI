import {prisma} from "@/lib/db"

export default async function TestPage(){

    const voices=await prisma.voice.findMany()

    return (
        <div>
            
            count of voices:{voices.length}
            <div>

           I made changes in the test folder
            </div>
            
        </div>
    )
    
} 