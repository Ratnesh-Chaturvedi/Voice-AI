import {prisma} from "@/lib/db"

export default async function TestPage(){

    const voices=await prisma.voice.findMany()

    return (
        <div>
            
            count of voices:{voices.length}
            <div>

            {voices.map((item)=>(
                <div key={item.id}>
                <h1>{item.name}</h1>
                <h1>{item.variant}</h1>
            </div>
            ))}    

            </div>
            
        </div>
    )
    
} 