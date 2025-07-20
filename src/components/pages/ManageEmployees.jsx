import { useFormik } from "formik"
import Heading1 from "../Includes/Heading1"
import { FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField } from "@mui/material"
import { employeeSchema } from "../../schema/YUP"
import userImg from "../../assets/profile-user (1).png"
import { useContext, useEffect, useState } from "react"
import { addEmployee, delEmployee, fetchDesignation, showEmployees } from "../../services/APIService"
import { AppContext } from "../../context/AppContext"
import { DeleteForeverOutlined, MessageOutlined } from "@mui/icons-material"
import EditIcon from '@mui/icons-material/Edit';
import CallIcon from '@mui/icons-material/Call';
import showToast from "../Includes/showToast"
import { useNavigate } from "react-router-dom"
const ManageEmployees = () => {
    const { State } = useContext(AppContext)
    const { token } = State
    const [profileImg, setProfileImg] = useState(userImg);
    const [desigData, setDesigData] = useState([])
    const [empData, setEmpData] = useState([])
    const [showLoader, setShowLoader] = useState(true)
    const navigate = useNavigate("")
    const getDesigData = async () => {
        try {
            const response = await fetchDesignation(token)
            console.log(response.data.data)
            setDesigData(response?.data?.data || [])
        }
        catch (err) {
            console.log(err)

        }
    }
    const getEmpData = async () => {
        try {
            setShowLoader(true)
            const response = await showEmployees(token)
            console.log(response?.data?.data)
            setEmpData(response?.data?.data || [])
        }
        catch (err) {
            console.log(err)
        }
        finally {
            setShowLoader(false)
        }
    }
    useEffect(() => {
        getDesigData()
        getEmpData()
    }, [])

    const addEmp = async (empData) => {
        setShowLoader(true);
        const formData = new FormData()
        for (let key in empData) {
            formData.append(key, empData[key])
        }
        try {
            await addEmployee(token, formData)
            getEmpData()
            showToast("New Employee Added Successfully", "var(--primary-color)")
        }
        catch (err) {
            console.log(err)
            showToast("Some thing went Wrong", "var(--error-color)")

        }
        finally {
            setShowLoader(false)
        }
    }
    const { handleSubmit, getFieldProps, errors, touched, resetForm, setValues, values } = useFormik({
        initialValues: {
            name: "",
            designation_id: "",
            gender: "",
            phone: "",
            email: "",
            id_card: "",
            joining_date: "",
            address: "",
            salary: ""
        },
        validationSchema: employeeSchema,
        onSubmit: (values) => {
            console.log(values)
            addEmp(values)
        }
    })
    const removeEmp = async (id) => {
        setShowLoader(true)
        const obj = {
            id,
            status: "deleted"
        }
        try {
            await delEmployee(token, obj)
            getEmpData()
            showToast("Employee Removed", "var(--primary-color)")
        }
        catch (err) {
            console.log(err)
            showToast("Some Error happen.", "var(--error-color)")
        }
        finally {
            setShowLoader(false)
        }
    }

    // const updateEmpData = async (newData) => {
    //     setShowLoader(true)
    //     try {
    //         const response = await editEmployee(token,newData)
    //         console.log(response)
    //     }
    //     catch (err) {
    //         console.log(err)
    //     }
    //     finally {
    //         setShowLoader(false)
    //     }
    // }
    const handleImageChange = (event) => {
        const file = event?.target?.files[0];
        if (file) {
            const previewURL = URL.createObjectURL(file);
            setProfileImg(previewURL);
            setValues({
                ...values,
                image: file,
                imageName: file?.name
            })

        } else {
            setProfileImg(userImg)
        }
    };
    return (
        <div className="obj-width1">
            <Heading1 title="Add Employee" desc="Add More Employees here." />
            <form className="row justify-content-between align-items-center" onSubmit={handleSubmit}>
                <div className="col-4 d-flex justify-content-center align-items-center">

                    <label htmlFor="imgField" id="imgLabel" className=" d-flex align-items-center justify-content-center flex-column">
                        <img src={profileImg} style={{ border: "3px solid #8c4f00" }} className="rounded-circle profileImg" alt="" />

                        <input className="d-none" id="imgField" type="file" onChange={(e) => handleImageChange(e)} />
                        <p>Click to add Profile Image</p>
                    </label>
                </div>
                <div className=" row row-cols-2 gx-2 gy-2 col-8">
                    <div className="col">
                        <TextField fullWidth
                            type="text"
                            label="Name"
                            {...getFieldProps("name")}
                            variant="outlined"
                            error={errors?.name && touched?.name}
                            helperText={touched?.name && errors?.name}
                        />
                    </div>
                    <div className="col">

                        <FormControl fullWidth error={touched?.gender && errors?.gender}>
                            <InputLabel>Gender</InputLabel>
                            <Select
                                label="Gender"
                                {...getFieldProps("gender")}
                            >
                                <MenuItem value="">Select Gender</MenuItem>

                                <MenuItem value={"male"}>
                                    Male
                                </MenuItem>
                                <MenuItem value={"female"}>
                                    Female
                                </MenuItem>
                                <MenuItem value={"others"}>
                                    Other
                                </MenuItem>

                            </Select>
                            <FormHelperText>{touched?.gender && errors?.gender}</FormHelperText>

                        </FormControl>
                    </div>
                    <div className="col">

                        <TextField fullWidth
                            type="date"
                            label="Date"
                            {...getFieldProps("joining_date")}
                            variant="outlined"
                            InputLabelProps={{ shrink: true }}
                            error={errors?.joining_date && touched?.joining_date}
                            helperText={touched?.joining_date && errors?.joining_date}
                        />
                    </div>
                    <div className="col">

                        <FormControl fullWidth error={touched?.designation_id && errors?.designation_id}>
                            <InputLabel>Designation</InputLabel>
                            <Select
                                label="Select Status"
                                {...getFieldProps("designation_id")}
                            >
                                <MenuItem value="">Select Designation</MenuItem>
                                {desigData?.map((item, index) => {
                                    return <MenuItem key={index} value={item?.id}>{item?.name}</MenuItem>
                                })}

                            </Select>
                            <FormHelperText>{touched?.designation_id && errors?.designation_id}</FormHelperText>

                        </FormControl>
                    </div>
                    <div className="col">

                        <TextField fullWidth

                            type="number"
                            {...getFieldProps("salary")}
                            label="Salary"
                            variant="outlined"
                            error={errors?.salary && touched?.salary}
                            helperText={touched?.salary && errors?.salary}
                        />
                    </div>
                    <div className="col">

                        <TextField fullWidth

                            type="text"
                            {...getFieldProps("phone")}
                            label="Phone Number"
                            variant="outlined"
                            error={errors?.phone && touched?.phone}
                            helperText={touched?.phone && errors?.phone}
                        />
                    </div>
                    <div className="col">

                        <TextField fullWidth

                            type="email"
                            {...getFieldProps("email")}
                            label="Email"
                            variant="outlined"
                            error={errors?.email && touched?.email}
                            helperText={touched?.email && errors?.email}
                        />
                    </div>
                    <div className="col">

                        <TextField fullWidth
                            type="number"
                            {...getFieldProps("id_card")}
                            label="ID Card"
                            variant="outlined"
                            error={errors?.id_card && touched?.id_card}
                            helperText={touched?.id_card && errors?.id_card}
                        />
                    </div>
                    <div className="col">

                        <TextField fullWidth
                            type="text"
                            {...getFieldProps("address")}
                            label="Address"
                            variant="outlined"
                            error={errors?.address && touched?.address}
                            helperText={touched?.address && errors?.address}
                        />
                    </div>
                </div>
                <div className="offset-4">

                    <button type="submit" className="btn btn-dark mt-3 w-25 btn-lg">Add</button>
                    <button type="reset" onClick={() => resetForm()} className="btn btn-danger mt-3 w-25 btn-lg ms-2">Reset Form</button>
                </div>
            </form>


            <div>
                <Heading1 title={"Total Employees"} desc={"All Employees are here."} />
                {<div className="row row-cols-3 g-3">
                    {empData?.length > 0 && empData?.map((item, index) => {

                        return <div className="col emp-card" key={index}>
                            <div className="card p-3 bg-light">
                                <div className="cardTop d-flex justify-content-between align-items-center">
                                    <img className="emp-card-img rounded-circle" src={item?.image} alt="" />
                                    <div className="d-flex flex-column gap-1">
                                        <button className="btn btn-danger btn-sm" onClick={() => removeEmp(item?.id)}><DeleteForeverOutlined fontSize="small" /></button>
                                        <button className="btn btn-success btn-sm" onClick={() => navigate(`/editEmployee/${item?.id}`)}><EditIcon fontSize="small" /></button>
                                    </div>
                                </div>
                                <div className="card-mid d-flex justify-content-between align-items-center mt-3">
                                    <b>{item?.name}</b>
                                    <b className="text-secondary">Sr# {index + 1}</b>
                                </div>
                                <div className="cardBtm bg-white mt-1 p-2 rounded-2">
                                    <div className="d-flex align-items-center justify-content-between ">
                                        <div className="d-flex flex-column align-items-center">
                                            <span className="card-heading fw-bold">Designation</span>
                                            <span className="text-secondary">{item?.designation}</span>
                                        </div>
                                        <div className="d-flex flex-column">
                                            <span className="card-heading  fw-bold">Joining Date</span>
                                            <span className="text-secondary ">{item?.joining_date}</span>
                                        </div>
                                    </div>
                                    <p className=" d-flex mt-3 align-items-center gap-1 mb-0">
                                        <MessageOutlined /> <span className="text-secondary">{item?.email}</span>
                                    </p>
                                    <p>
                                        <CallIcon /> <span className="text-secondary">{item?.phone}</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    })}
                </div>
                }
            </div>
        </div>
    )
}

export default ManageEmployees
