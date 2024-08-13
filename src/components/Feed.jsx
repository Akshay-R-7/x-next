import { app } from "@/firebase"
import { collection, getDocs, getFirestore, orderBy, query, Timestamp  } from "firebase/firestore"
import Posts from "./Posts"

export default async function Feed() {
    const db = getFirestore(app)
    const q = query(collection(db,'posts'),orderBy('timestamp','desc'))
    const querySnapshot = await getDocs(q)
    const data = []
    querySnapshot.forEach((doc)=>{
        data.push(
            {id:doc.id, ...doc.data()}
        )
    })
    
  return (
    <div>
        {data.map((post)=>(
            <Posts key={post.id} post={post} id={post.id} />
        ))}
    </div>
  )
}
