



export const Loading = () => {

    return   <div className="animate-pulse">
        {/* <div className="bg-gray-300 animate-pulse w-full h-2 mb-2 p-8"></div> */}

        <div className="grid grid-cols-3  justify-evenly p-6">
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        </div>
        
    </div>  
}

const CardSkeleton = () =>{
    return     <div className="flex flex-row justify-evenly p-6 mb-12 animate-pulse">

     <div className="p-8 shadow-md shadow-slate-300  cursor-pointer pb-4  max-w-screen-lg rounded-lg w-60  ">
    <div className="bg-gray-100 rounded-xl w-18  p-2 m-2">.

<h1 className="font-extrabold text-center "></h1>
<h1 className="font-extrabold text-center "> </h1>
    </div>
 <h1 className="font-bold "></h1> 


</div>
    </div>

}