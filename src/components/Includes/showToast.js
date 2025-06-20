import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const showToast = (text="hello", bgColor) => {
  
        toast( text , {
            hideProgressBar: true,
            autoClose: 1500,
            closeOnClick: true,
            draggable: true,
            style:{
                fontWeight:700,
                backgroundColor:bgColor,
                color:"white"
            }
        })
    
}

export default showToast
