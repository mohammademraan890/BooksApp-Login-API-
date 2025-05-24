import { toast } from "react-toastify";

const Toast = ({ text, bgColor }) => {
    return (
        toast( text , {
            hideProgressBar: true,
            autoClose: 1500,
            closeOnClick: true,
            draggable: true,
            style: {
                backgroundColor:  bgColor ,
                color: "white",
                fontWeight: "bold",
            },
        })
    )
}

export default Toast
