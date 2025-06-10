import { useFormik } from "formik";
import Heading1 from "../Includes/Heading1";
import { FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { number, object, string } from "yup";
import ProductCard from "../Includes/ProductCard"
import { toast } from "react-toastify";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import ExcelJS from 'exceljs';

const exportWithExcelJS = async (data, fileName = "data-export") => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook?.addWorksheet("Products");

    worksheet.columns = Object?.keys(data[0]).map(key => ({
        header: key.toUpperCase(), key, width: 20 
    }));
    data?.forEach(item =>  {
        worksheet?.addRow(item);
    });
    worksheet.getRow(1).eachCell((cell) => {
        cell.font = { bold: true, color: { argb: "FFFFFFFF" } ,size:14};
        cell.fill = {
            type: 'pattern',
            pattern: 'solid', 
            fgColor: { argb: 'db041a' } 
        };
    });
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${fileName}.xlsx`;
    link.click();
};

const AddProducts = () => {
    const { State, dispatch } = useContext(AppContext)
    const {AllBooks}=State
    const validationSchema = object({
        title: string().required("Title is required"),
        author: string().required("Enter author name"),
        price: number().positive("Price can not be -ve").required("Enter price first."),
        img: string().url("Enter valid url").required("Enter image URL."),
        category: string().required("Select Category here.")
    });

    const formik = useFormik({
        initialValues: {
            title: "",
            author: "",
            price: "",
            category: "",
            img: "",
        },
        validationSchema,
        onSubmit: (values) => {
            dispatch({ type: "addProducts", newProduct: values })
            formik.resetForm();
            toast("New Product is added", {
                hideProgressBar: true,
                autoClose: 1500,
                closeOnClick: true,
                draggable: true,
                style: {
                    backgroundColor: "var(--primary-color)",
                    color: "white",
                    fontWeight: "bold",
                },
            });

        }
    });

    return (
        <div className="obj-width1">
            <Heading1 title="Add Products" desc="You can add more Products" />
            <form onSubmit={formik?.handleSubmit}>
                <div className="formRow row gap-2">
                    <TextField
                        className="col"
                        label="Book Title"
                        margin="dense"
                        variant="outlined"
                        {...formik?.getFieldProps("title")}
                        error={formik?.touched?.title && Boolean(formik?.errors?.title)}
                        helperText={formik?.touched?.title && formik?.errors?.title}
                    />
                    <TextField
                        className="col"
                        label="Author"
                        margin="dense"
                        variant="outlined"
                        {...formik.getFieldProps("author")}
                        error={formik?.touched?.author && Boolean(formik?.errors?.author)}
                        helperText={formik?.touched?.author && formik?.errors?.author}
                    />
                    <FormControl error={formik?.touched?.category && formik?.errors?.category} className="col" margin="dense">
                        <InputLabel>Category</InputLabel>
                        <Select
                            label="Category"
                            {...formik.getFieldProps("category")}
                        >
                            <MenuItem value={"business"}>Business</MenuItem>
                            <MenuItem value={"technology"}>Technology</MenuItem>
                            <MenuItem value={"romantic"}>Romantic</MenuItem>
                            <MenuItem value={"adventure"}>Adventure</MenuItem>
                            <MenuItem value={"fictional"}>Fictional</MenuItem>
                        </Select>
                        <FormHelperText>{formik?.touched?.category && formik?.errors?.category}</FormHelperText>
                    </FormControl>
                </div>

                <div className="formRow row gap-2">
                    <TextField
                        className="col"
                        label="Image URL"
                        margin="dense"
                        type="url"
                        variant="outlined"
                        {...formik.getFieldProps("img")}
                        error={formik?.touched?.img && Boolean(formik?.errors?.img)}
                        helperText={formik?.touched?.img && formik?.errors?.img}
                    />
                    <TextField
                        className="col"
                        label="Book Price"
                        margin="dense"
                        type="number"
                        variant="outlined"
                        {...formik.getFieldProps("price")}
                        error={formik?.touched?.price && Boolean(formik?.errors?.price)}
                        helperText={formik?.touched?.price && formik?.errors?.price}
                    />
                </div>

                <div className="field d-flex gap-3">
                    <input
                        className="btn btn-success mt-3"
                        type="submit"
                        value="Add Product"
                    />
                </div>
            </form>

            <section
                className="featured-sec mb-md-4 mb-sm-3 mt-5 mb-3"
            >
                     <button className="btn d-block btn-danger mb-3 ms-auto" onClick={()=>exportWithExcelJS(AllBooks, "products")
                    }>Export in Excel</button>
                <div className="featured-sec-inner obj-width1">
                   
                    <div className="row">
                        {AllBooks?.map((item, index) => {
                            return (
                                <ProductCard
                                    key={index}
                                    title={item?.title}
                                    author={item?.author}
                                    price={item?.price}
                                    img={item?.img}
                                />
                            );
                        })}
                    </div>
                </div>

            </section>
        </div>
    );
};

export default AddProducts;
