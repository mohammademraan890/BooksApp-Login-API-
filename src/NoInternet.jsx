import { useEffect, useState } from "react";

const NoInternet = ({ children }) => {
    const [online, setOnline] = useState(navigator.onLine)
  
    useEffect(() => {
        window.addEventListener("online", () => setOnline(true))
        window.addEventListener("offline", () => setOnline(false))
    }, []);
    if (online) {
        return children
    }
   else {

    return (
      <div className="bg-light d-flex  align-items-center justify-content-center " style={{ height: "100vh" }}><h1>You are offline</h1></div>
    )
  }
}

export default NoInternet
