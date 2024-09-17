import { Link } from "react-router-dom"
import { Avatar } from "./BlogCard"

export const Appbar = ()=>{
    return <div className="border-b px-4 py-2 flex justify-between">
        <Link className="flex flex-col justify-center cursor-pointer font-semibold text-lg" to={'/blogs'}>
            Blogify      
        </Link>
        <div>
            <Link to={'/signin'}>
                <button onClick={()=>{
                    localStorage.removeItem("token")
                }} type="button" className="mr-8 text-white bg-red-700 hover:bg-red-800 focus:outline-none 
                focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 
                text-center me-2 mb-2">Log out</button>
            </Link>
            <Link to={'/publish'}>
                <button type="button" className="mr-8 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4
                focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 
                text-center me-2 mb-2">Publish</button>
            </Link>
            <Avatar size="big" name="Priyanshu"/>
        </div>
    </div>
}