

import { Button } from "./Button"
// import { ArrowRight } from "lucide-react"


export const Heroes = () => {
    return (
        <div className="max-w-3xl space-y-4">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold">
              Your Books, Documents, & Registers. Unified. Welcome to <span className="underline">Library Management System</span>
                </h1>
                <h3 className="text-base sm:text-xl md:text-2xl font-medium">
                All the books related to BS-MS available here 
                </h3>
                <Button>
                    Enter Library
                    {/* <ArrowRight className="h-4 w-4 ml-2"/> */}
                </Button>
        </div>

    )
}