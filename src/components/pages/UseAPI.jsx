import { useFormik } from "formik";
import Heading1 from "../Includes/Heading1";
import { TextField } from "@mui/material";
import { addCustomer, showCustomersData } from "../../services/APIService";
import { Suspense, use, useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { API_YUP } from "../../schema/YUP";
import crossImg from "../../assets/failed.png";


const UseAPI = () => {
    const { State } = useContext(AppContext);
    const { token } = State;

    const formik = useFormik({
        initialValues: {
            name: "",
            phone: "",
            address: "",
            balance: "",
        },
        validationSchema: API_YUP,
        onSubmit: async (values, { resetForm }) => {
            try {
                await addCustomer(token, values);
                resetForm();
            } catch (err) {
                console.log(err);
            }
        },
    });

    const customersPromise = showCustomersData(token)

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

            <Suspense fallback={<h3 className="text-center">Loading Customers...</h3>}>
                <API promise={customersPromise} />
            </Suspense>
        </div>
    );
};

export default UseAPI;


const API = ({ promise }) => {
    const customersDataResponse = use(promise);
    const customersData= customersDataResponse.data.data
    console.log(customersData)
    return (
        <section className="mt-5 obj-width1">
            <div className="row gap-2">
                {customersData?.length > 0 &&
                    customersData?.map((item, index) => (
                        <div
                            key={index}
                            className="d-flex align-items-center justify-content-between bg-light rounded-2 p-3"
                        >
                            <span className="fw-bold">{index + 1}</span>
                            <span>{item?.name}</span>
                            <span>{item?.address}</span>
                            <span>{item?.phone}</span>
                            <span>{item?.balance}</span>
                            <span className="del-icon">
                                <img className="w-50" src={crossImg} alt="" />
                            </span>
                        </div>
                    ))}
            </div>
        </section>
    );
};

