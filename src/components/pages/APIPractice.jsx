import { useContext, useEffect, useState } from "react"
import { AppContext } from "../../context/AppContext"
import Heading1 from "../Includes/Heading1"
import axios from "axios"

const APIPractice = () => {
    //   async function post() {
    //   try {
    //     for (const element of AllBooks) {
    //       await axios.post("https://crudcrud.com/api/fbff212639c74f799d02277d885051c3/booksData", element);
    //     }
    //   } catch (err) {
    //     console.log(err);
    //   }
    // }

    const get = async () => {
        try {
            // const response = await axios.delete("https://jsonplaceholder.typicode.com/posts/50",
            const response = await axios.get("https://httpbin.org/get",
                {
                    headers: {
                        name: "xyz",
                        class: "hello world",
                        Accept: "122314",
                    }

                }
            )
            console.log(response)
            // setResponse(response.data)
        }
        catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        // post()
        get()
    }, [])
    return (
        <div className="my-5 obj-width1">
            <Heading1 title={"API Practice"} desc="GET,POST,PUT,DELETE requests" />
            {/* <h2>{response?.title}</h2> */}
        </div>
    )
}

export default APIPractice
