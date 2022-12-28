import {Link,Outlet,useSearchParams} from 'react-router-dom'

export default function PostLayout(){
    const [searchParams,setSearchParams]=useSearchParams({id:3})
    const number = searchParams.get("id")
    return (<>
        <input type="number" 
        value={number}
        onChange={e=>{setSearchParams({id:e.target.value})}}/>
        <br/>
        <Link to="/posts" state="Hi">Posts</Link>
        <br/>
        <Link to="/posts/1" state="Hi">Post 1</Link>
        <br/>
        <Link to="/posts/2" >Post 2</Link>
        <br/>
        <Link to={`/posts/${number}`} >Post {number}</Link>
        <br/>
        <Link to="/posts/add" >New Post</Link>
        <Outlet context={{hello: "World"}}/>
        
    </>)
}