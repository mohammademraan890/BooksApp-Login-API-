import { useFormik } from "formik";
import { employeeSchema } from "../../schema/YUP";
import Heading1 from "../Includes/Heading1";
import { editEmployee, fetchDesignation, selectEmployee } from "../../services/APIService";
import userImg from "../../assets/profile-user (1).png"
import { useContext, useEffect, useState } from "react";
import { FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { AppContext } from "../../context/AppContext";
import { useNavigate, useParams } from "react-router-dom";
import showToast from "../Includes/showToast";

const EditEmployee = () => {
    const { State } = useContext(AppContext)
    const { token } = State
    const [profileImg, setProfileImg] = useState(userImg);
    const [desigData, setDesigData] = useState([])
    // const [selectedEmp, setSelectedEmp] = useState([])
    const { id } = useParams()
    const navigate = useNavigate("")
    const editEmp = async (newData) => {
        const formData = new FormData()
        for (let key in newData) {
            formData?.append(key, newData[key])
        }
        formData?.append("id", id)
        try {
            await editEmployee(token, formData)
            navigate("/manageEmployee")
            showToast("Employee Edit Successfully", "var(--primary-color)")
        }
        catch (err) {
            console.log(err)
            showToast("Some thing went wrong", "var(--error-color)")

        }
    }
    const { handleSubmit, getFieldProps, errors, touched, setValues, values } = useFormik({
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
            editEmp(values)
        }
    })
    const selectEmp = async () => {
        try {
            const response = await selectEmployee(token, id)
            const selectedData = response?.data?.data[0] || {}
            console.log(selectedData)
            const { image, name, designation_id, gender, phone, email, id_card, joining_date, address, salary } = selectedData
            setValues({ name, designation_id, gender, phone, email, id_card, joining_date, address, salary })
            setProfileImg(image)
        }
        catch (err) {
            console.log(err)
        }
    }

    const getDesigData = async () => {
        try {
            const response = await fetchDesignation(token)
            setDesigData(response?.data?.data || [])
        }
        catch (err) {
            console.log(err)

        }
    }
    useEffect(() => {
        getDesigData()
        selectEmp()
    }, [])

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        console.log(file)
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
            <Heading1 title="Edit Employee Data" desc="You can edit Employees here." />
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
                    <button type="submit" className="btn btn-success mt-3 w-25 btn-lg">Update</button>
                </div>
            </form>


        </div>
    )
}

export default EditEmployee
