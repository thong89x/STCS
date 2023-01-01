import {Link,Outlet,useSearchParams} from 'react-router-dom'

export default function PostLayout(){
    const [searchParams,setSearchParams]=useSearchParams({id:3})
    const number = searchParams.get("id")
    return (<>
        {/* <input type="number" 
        value={number}
        onChange={e=>{setSearchParams({id:e.target.value})}}/> */}
        <br/>
        
        <Outlet context={{hello: "World"}}/>
        
    </>)
}