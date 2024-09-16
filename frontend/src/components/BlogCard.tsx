import { Link } from "react-router-dom";

interface BlogCardInput {
    authorName:string;
    title:string;
    content:string;
    publishedDate:string;
    id:string;
}
export const BlogCard = ({id,authorName,title,content,publishedDate}: BlogCardInput)=>{
    return <Link to={`/blog/${id}`}> 
        <div className="border-b pb-4 border-slate-200 p-4 w-screen max-w-screen-sm cursor-pointer">
            <div className="flex">
                <Avatar name={authorName} size="small" />
                <div className="font-normal pl-2 text-sm flex justify-center flex-col">{authorName}</div>
                <div className="flex justify-center flex-col pl-2 ">
                    <Circle/>
                </div>
                <div className="pl-2 font-thin text-slate-500 text-sm flex justify-center flex-col">
                    {publishedDate}
                </div>
                
            </div>
            <div className="text-x1 font-bold pt-2"> 
                {title}
            </div>
            <div className="text-md font-thin">
                {content.length>100 ? content.slice(0,100) + "..." :content}
            </div>
            <div className="text-slate-500 text-sm font-thin pt-4">
                {`${Math.ceil(content.length/100)} minute(s) read`}
            </div>
        </div>
    </Link>
}

export const Avatar = ({name,size = "small"} : {name:string,size?:"small" | "big"})=>{
    return <div className={`relative inline-flex items-center justify-center  overflow-hidden
    bg-gray-100 rounded-full dark:bg-gray-600 ${size==="small" ? "w-6 h-6" : "w-10 h-10"}`}>
        <span className={`${size==="small" ? "text-xs" : "text-md"} text-gray-600 dark:text-gray-300`}>{name[0]}</span>
    </div>
    
}

export const Circle = () =>{
    return <div className="h-1 w-1 rounded-full bg-slate-500">

    </div>
}