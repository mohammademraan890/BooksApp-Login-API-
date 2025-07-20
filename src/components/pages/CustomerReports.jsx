import { useContext, useEffect, useState } from "react";
import Heading1 from "../Includes/Heading1";
import { jsPDF } from "jspdf";
import { autoTable } from 'jspdf-autotable'
import { AppContext } from "../../context/AppContext";
import { format } from "date-fns"
import {
    getSuppliersName,
    showCustomersReport,
} from "../../services/APIService";
import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import showToast from "../Includes/showToast";
import Skeleton from "react-loading-skeleton";
import { useFormik } from "formik";
import { apiSchema } from "../../schema/YUP";
import ExcelJS from 'exceljs';

// import { apiSchema } from "../../schema/YUP";

const CustomerReports = () => {
    const { State } = useContext(AppContext);
    const [suppliersData, setSuppliersData] = useState([]);
    const [reportData, setReportData] = useState([]);
    const [showLoader, setShowLoader] = useState(true);
    const { token } = State;
    const reportsData = async (formValues = {}, loader = true) => {

        const { startDate, endDate } = formValues
        const dateStart = new Date(startDate)
        const dateEnd = new Date(endDate)


        let values = formValues;
        if (dateEnd <= dateStart) {
            values = {
                ...formValues, startDate: "",
                endDate: "",
            }
        }
        try {
            loader && setShowLoader(true);
            const response = await showCustomersReport(token, values);
            const responseData = response?.data?.data?.data || []
            setReportData(responseData);
            return responseData
        } catch (err) {
            console.log(err);

            if (err?.status === 404) {
                setReportData(null);
                showToast("This Supplier has no record", "var(--error-color)");
            }
        } finally {
            setShowLoader(false);
        }
    }

    const { values, errors, touched, handleBlur, handleChange, handleSubmit, getFieldProps, resetForm, initialValues } = useFormik({
        initialValues: {
            supplierField: "",
            statusField: "",
            startDate: "",
            endDate: "",
        },
        validationSchema: apiSchema,
        onSubmit: (values) => {
            reportsData(values)
        },
    });
    const showSuppliersName = async () => {
        const response = await getSuppliersName(token);
        const suppliers = response?.data?.data || [];
        setSuppliersData(suppliers);
    };

    useEffect(() => {
        reportsData(values)
        if (suppliersData?.length === 0) {
            showSuppliersName();
        }
    }, [values?.supplierField, values?.statusField])

    const formattedDateTime = format(new Date(), "MMM dd,yyyy hh:mm a")
    const exportPdf = async () => {
        const response = await reportsData(initialValues, false)
        const doc = new jsPDF()
        const cols = ["supplier_name", "quantity", "tax", "Total Bill", "Payment Status", "Date","status"]
        const rows = response?.map((item) => [item?.supplier_name, item?.quantity, item?.tax, item?.total_bill, item?.payment_status, item?.Date,item?.status
        ])

        doc.text("Customer Report", 14, 10);
        doc.setFontSize(10);

        autoTable(doc, {
            startY: 20,
            theme: "grid",
            head: [cols],
            body: rows,
            headStyles: { fillColor: "#8c4f00" }
        });
        doc.save(`Customers Report ${formattedDateTime}.pdf`);
    }
    const exportExcel = async () => {
        const response = await reportsData(initialValues, false);

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("Customers");

        const cols = ["supplier_name", "quantity", "tax", "Total Bill", "Payment Status", "Date", "status"];

        worksheet.columns = cols.map(col => ({
            header: col,
            key: col,
            width: 20,
        }));

        response.forEach(item => {
            const row = [
                item?.supplier_name,
                item?.quantity,
                item?.tax,
                item?.total_bill,
                item?.payment_status,
                item?.Date,
                item?.status
            ];
            worksheet.addRow(row);
        });

        worksheet.getRow(1).eachCell(cell => {
            cell.font = { bold: true, color: { argb: "FFFFFFFF" }, size: 14 };
            cell.fill = {
                type: "pattern",
                pattern: "solid",
                fgColor: { argb: "8c4f00" }
            };
        });

        const buffer = await workbook.xlsx.writeBuffer();
        const blob = new Blob([buffer], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `Customers Report ${formattedDateTime}.xlsx`;
        link.click();
    };

    return (
        <div className="obj-width1">
            <Heading1
                title={"Customer Reports"}
                desc="Practice of handling Complex API"
            />
            <form
                onSubmit={handleSubmit}
                className="d-flex justify-content-between align-items-center"
            >
                <div className=" d-flex gap-2">
                    <FormControl
                        sx={{ width: "150px", marginBottom: "20px" }}
                        disabled={showLoader}
                    >
                        <InputLabel>Select Supplier</InputLabel>
                        <Select
                            label="Select Supplier"
                            name="supplierField"
                            value={values?.supplierField}
                            onBlur={handleBlur}
                            onChange={handleChange}
                        >
                            {suppliersData?.map((supplier, index) => {
                                return (
                                    <MenuItem key={index} value={supplier?.id}>
                                        {supplier?.name}
                                    </MenuItem>
                                );
                            })}
                        </Select>
                    </FormControl>
                    <FormControl
                        sx={{ width: "150px", marginBottom: "20px" }}
                        disabled={showLoader}
                    >
                        <InputLabel>Select Status</InputLabel>
                        <Select
                            label="Select Status"
                            value={values?.statusField}
                            name="statusField"
                            onBlur={handleBlur}
                            onChange={handleChange}
                        >
                            <MenuItem value="Paid">Paid</MenuItem>
                            <MenuItem value="Pending">Pending</MenuItem>
                            <MenuItem value="Partial">Partial</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        disabled={showLoader}
                        name="startDate"
                        onBlur={handleBlur}
                        value={values?.startDate}
                        onChange={handleChange}
                        type="date"
                        label="From"
                        variant="outlined"
                        InputLabelProps={{ shrink: true }}
                        error={errors?.startDate && touched?.startDate}
                        helperText={touched?.startDate && errors?.startDate}
                    />
                    <TextField
                        disabled={showLoader}
                        type="date"
                        {...getFieldProps("endDate")}
                        label="To"
                        variant="outlined"
                        InputLabelProps={{ shrink: true }}
                        error={errors?.endDate && touched?.endDate}
                        helperText={touched?.endDate && errors?.endDate}
                    />
                </div>
                <div>
                    <button disabled={showLoader} type="submit" className="btn btn-dark">
                        Search
                    </button>
                    <button
                        disabled={showLoader}
                        className="btn btn-danger ms-2"
                        onClick={() => { resetForm() }}
                        type="reset"
                    >
                        Reset
                    </button>
                </div>
            </form>
            <div className="d-flex gap-2 mb-4">
                <button className="btn btn-primary" onClick={exportPdf}>Export in PDF</button>
                <button className="btn btn-success" onClick={exportExcel}>Export in Excel</button>
            </div>

            {!showLoader ? (
                reportData && reportData?.length > 0 ? (
                    <table className="table text-center table-hover">
                        <thead>
                            <tr>
                                <th scope="col" className="bg-light">
                                    Sr#
                                </th>
                                <th scope="col" className="bg-light">
                                    Purchase Date
                                </th>
                                <th scope="col" className="bg-light">
                                    Supplier Name
                                </th>
                                <th scope="col" className="bg-light">
                                    Tax
                                </th>
                                <th scope="col" className="bg-light">
                                    Total Bill
                                </th>
                                <th scope="col" className="bg-light">
                                    Payment Status
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {reportData?.map((customer, index) => {
                                return (
                                    <tr key={index}>
                                        <th className="bg-light" scope="row">
                                            {index + 1}
                                        </th>
                                        <td>{customer?.Date}</td>
                                        <td>{customer?.supplier_name}</td>
                                        <td>{customer?.tax}</td>
                                        <td>{customer?.total_bill}</td>
                                        <td>{customer?.payment_status}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                ) : (
                    <h3 className="my-4 text-center text-danger">No Any Record Found</h3>
                )
            ) : (
                <Skeleton count={5} height={"30px"} />
            )}
        </div>
    );
};

export default CustomerReports;
