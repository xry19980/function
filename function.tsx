import { FC, useState,useEffect,useRef,React} from "react";
type userType = {
  name:string
  email:string
}
const UserData:FC=({userId})=>{
    const [user,setUser] = useState<userType|null>(null);
    const [seconds,setSeconds] = useState<number>(0)
    const timerRef = useRef(null)
    useEffect(()=>{
      fetchUserData()
      timerRef.current = setInterval(() => {
        setSeconds(prevState => ({ seconds: prevState.seconds + 1 }));
      }, 1000);
      return ()=>{
        clearInterval(timerRef.current)
      }
    },[])

    useEffect(()=>{
      fetchUserData()
    },[userId])
    
    const fetchUserData = () => {
      fetch(`https://secret.url/user/${userId}`)
        .then(response => response.json())
        .then(data => setUser({ user: data }))
        .catch(error => console.error('Error fetching user data:', error));
    }

    return(
      <div>
        <h1>User Data Component</h1>
        {user ? (
          <div>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
          </div>
        ) : (
          <p>Loading user data...</p>
        )}
        <p>Timer: {seconds} seconds</p>
      </div>
    )
}


export default UserData;
