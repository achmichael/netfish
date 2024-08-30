import React from "react";
import confused from './confused.png';

const NotFound = () => {
    return (
        <div className="min-h-screen bg-black text-white">
            <Container/>
        </div>  
    )
}

const Container = () => {
    return (
        <div className="text-center flex flex-col">
            <img src={confused} className="w-[20%]" alt="" />
            <div className="text-5xl lg:text-7xl text-bold">404</div>
            <div className="text-lg lg:text-xl">Page Not Found</div>
            <a href="#" onClick={() => history.back()} className="py-4 px-2">Go Back</a>
        </div>
    )
}

export default NotFound;