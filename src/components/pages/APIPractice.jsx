import { useFormik } from "formik";
import Heading1 from "../Includes/Heading1";
import { TextField } from "@mui/material";
import crossImg from "../../assets/failed.png"
import { addCustomer, editCustomersData, showCustomersData } from "../../services/APIService";
import { useContext, useEffect, useState } from "react";
import showToast from "../Includes/showToast";
import { AppContext } from "../../context/AppContext";
import { API_YUP } from "../../schema/YUP";

const APIPractice = () => {
    const [customersData, setCustomersData] = useState([])
    const { State } = useContext(AppContext)
    const { token } = State;
       const showCustomers = async () => {
        const usersData = await showCustomersData(token)
        setCustomersData(usersData?.data?.data || [])
    }
    const formik = useFormik({
        initialValues: {
            name: "",
            phone: "",
            address: "",
            balance: "",
        },
        validationSchema: API_YUP,
        onSubmit: (values, { resetForm }) => {
            console.log(values);
            (async () => {
                try {
                    await addCustomer(token, values)
                    showCustomers();
                    showToast("Customer Added Successfully.", "var(--primary-color)")
                }
                catch (err) {
                    console.log(err)
                    showToast("Some Error Occur", "var(--error-color)")
                }
            })()
            resetForm();
        }
    });
    useEffect(() => {
        showCustomers()
    }, [])
    const DelCustomer = async (id) => {
        const data = { id, status: "deleted" }
        try {
            await editCustomersData(token, data)
            showCustomers();
            showToast("Customer removed.", "var(--primary-color)")
        }
        catch (err) {
            console.log(err)
        }
    }
    return (
        <div className="obj-width1">
            <Heading1 title="Add Products" desc="You can add more Products" />
            
            <form onSubmit={formik?.handleSubmit}>
                <div className="formRow row gap-2">
                    <TextField
                        className="col"
                        label="Enter Name"
                        margin="dense"
                        variant="outlined"
                        {...formik?.getFieldProps("name")}
                        error={formik?.touched?.name && Boolean(formik?.errors?.name)}
                        helperText={formik?.touched?.name && formik?.errors?.name}
                    />
                    <TextField
                        className="col"
                        label="Enter Phone number"
                        margin="dense"
                        type="number"
                        variant="outlined"
                        {...formik.getFieldProps("phone")}
                        error={formik?.touched?.phone && Boolean(formik?.errors?.phone)}
                        helperText={formik?.touched?.phone && formik?.errors?.phone}
                    />

                </div>

                <div className="formRow row gap-2">
                    <TextField
                        className="col"
                        label="Enter Balance"
                        margin="dense"
                        type="number"
                        variant="outlined"
                        {...formik.getFieldProps("balance")}
                        error={formik?.touched?.balance && Boolean(formik?.errors?.balance)}
                        helperText={formik?.touched?.balance && formik?.errors?.balance}
                    />
                    <TextField
                        className="col"
                        label="Enter Address"
                        margin="dense"
                        type="string"
                        variant="outlined"
                        {...formik.getFieldProps("address")}
                        error={formik?.touched?.address && Boolean(formik?.errors?.address)}
                        helperText={formik?.touched?.address && formik?.errors?.address}
                    />
                </div>
                <div className="field d-flex gap-3">
                    <input
                        className="btn btn-success mt-3"
                        type="submit"
                        value="Add Customer."
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
                                    <span className="del-icon"><img onClick={() => DelCustomer(item?.id)} className="w-50" src={crossImg} alt="" /></span>
                                </div>
                            )
                        })}
                    </div>
                </div>

            </section>
        </div>
    );
};

export default APIPractice;
