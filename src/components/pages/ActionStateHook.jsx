import { TextField } from "@mui/material"
import Heading1 from "../Includes/Heading1"
import crossImg from "../../assets/failed.png"
import { useActionState, useContext, useEffect, useOptimistic, useState } from "react"
import { addCustomer, showCustomersData } from "../../services/APIService"
import showToast from "../Includes/showToast"
import { AppContext } from "../../context/AppContext"

const ActionStateHook = () => {
    const [customersData, setCustomersData] = useState([])

    const { State } = useContext(AppContext)
    const { token } = State;
    const showCustomers = async () => {
        const usersData = await showCustomersData(token)
        setCustomersData(usersData?.data?.data || [])
    }
    const handleRequest = (prevState, formData) => {

        const name = formData?.get("name")?.trim();
        const phone = formData?.get("phone")?.trim();
        const address = formData?.get("address")?.trim();
        const balance = formData?.get("balance")?.trim();

        const errors = {};

        if (!name) { errors.name = "Name is required"; }
        if (!phone) { errors.phone = "Phone number is required"; }
        if (!address) { errors.address = "Address is required"; }
        if (!balance) { errors.balance = "Balance is required"; }

        if (Object.keys(errors)?.length > 0) {
            return { errors };
        }
        else {
            const dataObj = { name, phone, address, balance };
            (async () => {
                try {
                    await addCustomer(token, dataObj)
                    showCustomers();
                    showToast("Customer Added Successfully.", "var(--primary-color)")
                }
                catch (err) {
                    console.log(err)
                    showToast("Some Error Occur", "var(--error-color)")
                }
            })()
        }
    }

    useEffect(() => {
        showCustomers()
    }, [])

    const [data, handleInputs, isPending] = useActionState(handleRequest, null)

 
    return (
        <div className="obj-width1">
            <Heading1 title="useActionState Hook" desc="You can add more Products" />
            <form action={handleInputs}>
                <div className="formRow row gap-2">
                    <TextField
                        className="col"
                        label="Enter Name"
                        margin="dense"
                        variant="outlined"
                        name="name"
                        error={data?.errors?.name}
                        helperText={data?.errors?.name}
                    />
                    <TextField
                        className="col"
                        label="Enter Phone number"
                        margin="dense"
                        type="number"
                        variant="outlined"
                        name="phone"
                        error={data?.errors?.phone ? true : false}
                        helperText={data?.errors?.phone}
                    />

                </div>

                <div className="formRow row gap-2">
                    <TextField
                        className="col"
                        label="Enter Balance"
                        margin="dense"
                        type="number"
                        variant="outlined"
                        name="balance"
                        error={data?.errors?.balance}
                        helperText={data?.errors?.balance}
                    />
                    <TextField
                        className="col"
                        label="Enter Address"
                        margin="dense"
                        type="string"
                        variant="outlined"
                        name="address"
                        error={data?.errors?.address}
                        helperText={data?.errors?.address}
                    />
                </div>
                <div className="field d-flex gap-3">
                    <input
                        className="btn btn-success mt-3"
                        type="submit"
                        value={isPending ? "Loading..." : "Add Customer"}
                    />
                </div>
            </form>
            <section
                className="mt-5"
            >
                <div className="obj-width1">

                    <div className="row gap-2">
                        {customersData?.length > 0 && customersData?.map((item, index) => {
                            return (
                                <div key={index} className="d-flex align-items-center justify-content-between bg-light rounded-2 p-3">
                                    <span className="fw-bold">{index + 1}</span>
                                    <span>{item?.name}</span>
                                    <span>{item?.address}</span>
                                    <span>{item?.phone}</span>
                                    <span>{item?.balance}</span>
                                    <span className="del-icon"><img className="w-50" src={crossImg} alt="" /></span>
                                </div>
                            )
                        })}
                    </div>
                </div>

            </section>
           
        </div>
    )
}

export default ActionStateHook
