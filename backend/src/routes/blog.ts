import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { createBlogInput , updateBlogInput } from "@priyanshu_18/medium-common-prog";
import { Hono } from "hono";
import { verify } from 'hono/jwt'

export const blogRouter = new Hono<{
    Bindings:{
        DATABASE_URL : string;
        JWT_SECRET: string;
        
    },
    Variables:{
      userId: any;//give this type any to avoid eror coming due to uuid used
    }
}>();

blogRouter.use("/*",async (c,next)=>{
  const token = c.req.header("Authorization") || "";
  // const token = header?.split(" ")[1] || "";
  try{
    const res = await verify(token,c.env.JWT_SECRET);
  
  if(res.id){
    c.set('userId',res.id);
    await next()
  }else{
    c.status(403);
    return c.json({
      error:"Unauthorized"
    })
  }
  }
  catch(e){
    c.status(403)
    return c.json({
      msg:"You are not logged in"
    })
  }
  
})

blogRouter.post('/',async (c) => {
    const body = await c.req.json();
    const authorId = c.get('userId');
    const { success} = createBlogInput.safeParse(body);
      if(!success){
        c.status(411);
        return c.json({
          msg:"Wrong Inputs"
        })
      }
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
  
    const Post = await prisma.post.create({
        data:{
          title:body.title,
          content:body.content,
          authorId:authorId
        }
    })
    // console.log(Post);

    return c.json({
      id:Post.id
    })
})
  
blogRouter.put('/', async (c) => {
  const body = await c.req.json();
  const { success} = updateBlogInput.safeParse(body);
      if(!success){
        c.status(411);
        return c.json({
          msg:"Wrong Inputs"
        })
      }
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const updatedblog = await prisma.post.update({
      where:{
        id : body.id
      },
      data:{
        title:body.title,
        content:body.content,
      }
    })

    return c.json({
      id:updatedblog.id
    })
  
})
 
//add pagination
blogRouter.get('/bulk', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())
  const blogs = await prisma.post.findMany({
    select:{
      content:true,
      title:true,
      id:true,
      author:{
        select:{
          name:true
        }
      }
    }
  });
  return c.json({
    blogs
  })
})

blogRouter.get('/:id',async (c) => {
  const id =  c.req.param("id");
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    try{
      const Post = await prisma.post.findFirst({
        where:{
          id : id
        },
        select:{
          id:true,
          title:true,
          content:true,
          author:{
            select:{
              name:true
            }
          }
        }
      })
  
      return c.json({
        Post
      })
    }
    catch(e){
      c.status(411);
      c.json({
        msg:"Error while fetching data"
      })
    }
    
})

blogRouter.delete('/:id',async (c)=>{
  const id =  c.req.param("id");
  console.log(id)
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())
  
  const response = await prisma.post.delete({
    where:{
      id:id
    }
  })
  if(response){
    return c.text("deleted")
  }else{
    return c.text("error")
  }
})
