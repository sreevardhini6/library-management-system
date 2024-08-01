import { Footer } from "../components/Footer"
import { Heroes } from "../components/Heroes"

 

export const Dashboard = () => {

    return <>

    <div className="flex w-3xl  h-full bg-opacity-35 text-black" style={{paddingInline: `px` ,height: '92vh'}}>
        <div className="flex-1 flex flex-col justify-center p-20" style={{wordSpacing:'1%'}}>
                <h1 className=" my-10 shadow-md p-2 rounded-lg  text-xl sm:text-5xl md:text-6xl font-bold">BS-CS Library</h1>
            <div  className="max-w-screen-sm mb-20 text-lg">
        <Heroes />
            </div>
        </div>
            <div className="flex flex-1 bg-cover bg-no-repeat">
            </div>
    </div>
    <Footer />
    </>
}
