import React, { useEffect, useState } from 'react';
import { Box, Breadcrumbs, Button, Grid, MenuItem, Tab, Typography } from "@mui/material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import TabList from "@mui/lab/TabList";
import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";
import CustomSearchInput from "./CustomSearchInput";
import { useSelector } from "react-redux";
import HttpComponent from "./MakeRequest";
import { useNavigate } from "react-router-dom";
import DeactivateIcon from "./Images/deactivate-icn.svg"
import ReplayIcon from "@mui/icons-material/Replay";
import { ErrorAlert } from "../snackBar Alerts/errorAlert";
import { SuccessAlert } from "../snackBar Alerts/successAlert";
import ExportMenu from "./ExportMenu";
import { DataGrid } from '@mui/x-data-grid';
import { NoRowsOverlay } from '../No Rows/noRowsOverlay';

const breadcrumbs = [
    <Typography key="X" sx={{ color: "#707070", fontSize: "0.875rem" }}>
        Dashboard
    </Typography>,
    <Typography key={"Invoices"} sx={{ color: "#dc3545", fontSize: "0.875rem" }}>
        Parents/Guardians
    </Typography>
];

const SchoolListParents = () => {
    const [tabValue, setTabValue] = useState("ACTIVE");
    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };
    const [formData, setFormData] = useState(
        {
            search: "",
        }
    )
    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    const { X_Authorization } = useSelector((store) => store.user);
    const [gridLoading, setGridLoading] = useState(false)
    const [errorShow, setErrorShow] = useState({ state: false, message: "" })
    const [successShow, setSuccessShow] = useState({ state: false, message: "" })
    const [dataGridPageSize, setPageSize] = React.useState(10);
    const [searchValue, setSearchValue] = useState('')
    const [pageState, setPageState] = useState({ isLoading: true, data: [], count: 0, page: 1, pageSize: dataGridPageSize });

    const fetchParents = () => {
        setPageState((old) => ({ ...old, isLoading: true }));
        HttpComponent({
            method: 'GET',
            url: `/api/customers_list?limit=${dataGridPageSize}&page=${pageState?.page}&status=${tabValue}&searchValue=${searchValue}`,
            body: null,
            token: localStorage.getItem('X-Authorization')
        }).then((data) => {
            console.log("here store is data", data);
            if (data.status === 200) {
                setPageState({ ...pageState, isLoading: false, count: data?.response?.count, data: data.response.data })
            } else {
                setErrorShow({ state: true, message: data.response.message })
            }
        }).catch((error) => {
        })
    }

    const navigate = useNavigate();

    const createButton = {
        width: "125px",
        height: "45px",
        borderRadius: "5px",
        border: "solid 1px #002543",
        backgroundColor: "#032541",
        color: "#ffffff"
    }

    const headerStyles = {
        fontSize: "16px",
        fontWeight: "700",
        color: "#032541",
        textAlign: "left",
    };

    const cellStyles = {
        fontSize: "14px",
        fontWeight: "300",
        color: "#032541",
        textAlign: "left",
    };

    const countStudents = (parent) => {
        if (parent.isParentPrimary || parent.parentType === 'Primary') {
            return parent.students?.length || 0;
        }
        if (parent.linkedStudent) {
            return 1;
        }
        return 0;
    };

    const activeColumns = [
        {
            headerName: "Parent Name", 
            field: "customerName", 
            flex: 1.3, 
            headerAlign: 'left', 
            align: 'left',
            renderHeader: () => (
                <Typography style={headerStyles}>
                    Parent Name
                </Typography>
            ),
            renderCell: params => (
                <Typography style={{cursor:"pointer"}} sx={{ color: "#032541", textDecoration: "underline" ,}} onClick={() => navigate(`/school/parent/${params.row._id}`)}>
                    {params.row?.customerName}
                </Typography>
            )
        },
        {
            headerName: "Parent Type", 
            field: "parentType", 
            flex: 1, 
            headerAlign: 'left', 
            align: 'left',
            renderHeader: () => (
                <Typography style={headerStyles}>
                    Parent Type
                </Typography>
            ),
            renderCell: params => (
                <Typography style={cellStyles}>
                    {params.row?.parentType}
                </Typography>
            ) 
        },
        {
            headerName: "Mobile No", 
            field: "mobileNumber", 
            flex: 1, 
            headerAlign: 'left', 
            align: 'left',
            renderHeader: () => (
                <Typography style={headerStyles}>
                    Mobile No
                </Typography>
            ),
            renderCell: params => (
                <Typography style={cellStyles}>
                    {params.row?.mobileNumber}
                </Typography>
            ) 
        },
        { 
            headerName: "Email", 
            field: "email", 
            flex: 1.2, 
            headerAlign: 'left', 
            align: 'left',
            renderHeader: () => (
                <Typography style={headerStyles}>
                    Email
                </Typography>
            ),
            renderCell: params => (
                <Typography style={cellStyles}>
                    {params.row?.email}
                </Typography>
            )
        },
        {
            headerName: "Students", 
            field: "students", 
            flex: 1, 
            headerAlign: 'left', 
            align: 'left',
            renderHeader: () => (
                <Typography style={headerStyles}>
                    Students
                </Typography>
            ),
            renderCell: params => (
                <Typography style={cellStyles}>
                    {countStudents(params.row)}
                </Typography>
            )
        },
        {
            headerName: "Pending Invoices", 
            field: "pendingInvoices", 
            flex: 1, 
            headerAlign: 'left', 
            align: 'left',
            renderHeader: () => (
                <Typography style={headerStyles}>
                    Pending Inv
                </Typography>
            ),
            renderCell: params => (
                <Typography style={cellStyles}>
                    {params?.row?.pendingInvoices}
                </Typography>
            )
        },
        {
            headerName: "Amount Due", 
            field: "pendingAmount", 
            flex: 1, 
            headerAlign: 'left', 
            align: 'left',
            renderHeader: () => (
                <Typography style={headerStyles}>
                    Amt Due
                </Typography>
            ),
            renderCell: params => (
                <Typography style={cellStyles}>
                    {params?.row?.pendingAmount}
                </Typography>
            )
        },
        {
            headerName: "Action", 
            field: "action", 
            flex: 1, 
            headerAlign: 'left', 
            align: 'left',
            renderHeader: () => (
                <Typography style={headerStyles}>
                    Action
                </Typography>
            ),
            renderCell: params => (
                <Box component="div" sx={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                    <img style={{ cursor: "pointer" }} src={DeactivateIcon} alt="" onClick={() => suspendCustomer(params.row._id)} />
                </Box>
            )
        },
    ];

    const suspendedColumns = [
        {
            headerName: "Parent Name", 
            field: "customerName", 
            flex: 1.4,
            renderCell: params => (
                <Typography sx={{ color: "#33699d", textDecoration: "underline" }}>
                    {params.row?.customerName}
                </Typography>
            )
        },
        { 
            headerName: "Mobile No", 
            field: "mobileNumber", 
            flex: 1 
        },
        { 
            headerName: "Email", 
            field: "email", 
            flex: 1 
        },
        {
            headerName: "Students", 
            field: "billableItems", 
            flex: 1,
            renderCell: params => (
                <Typography>
                    {countStudents(params.row)}
                </Typography>
            )
        },
        {
            headerName: "Deactivated On", 
            field: "createdOn", 
            flex: 1,
            renderCell: params => (
                <Typography>
                    {formatDate(params?.row?.createdOn)}
                </Typography>
            )
        },
        {
            headerName: "Action", 
            field: "action", 
            flex: 1,
            renderCell: params => (
                <Box sx={{ display: "flex" }}>
                    <Box sx={{
                        width: "1.313rem",
                        height: "1.313rem",
                        borderRadius: "50%",
                        border: "1px solid #17ae7b",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        marginX: 0.5,
                        cursor: "pointer"
                    }}
                    >
                        <ReplayIcon onClick={() => restoreCustomer(params.row._id)} sx={{ color: "#17ae7b", alignSelf: "center", fontSize: "1rem" }} />
                    </Box>
                </Box>
            )
        },
    ];

    const suspendCustomer = (customerId) => {
        setGridLoading(true)
        HttpComponent({
            method: 'GET',
            url: `/api/suspendCustomer?customerId=${customerId}`,
            body: null,
            token: X_Authorization
        }).then((data) => {
            console.log("here store is data", data);
            if (data.status === 202) {
                fetchParents()
                setSuccessShow({
                    state: true,
                    message: "Parent Deactivated Successfully"
                })
                setGridLoading(false)
            } else {
                console.error("Error setting info")
                setErrorShow({ state: true, message: data.response.message })
                setGridLoading(false)
            }
        }).catch((error) => {
            console.error(error.message);
            setGridLoading(false)
        })
    }

    const restoreCustomer = (customerId) => {
        setGridLoading(true)
        HttpComponent({
            method: 'GET',
            url: `/api/activateCustomer?customerId=${customerId}`,
            body: null,
            token: X_Authorization
        }).then((data) => {
            console.log("here store is data", data);
            if (data.status === 202) {
                fetchParents()
                setSuccessShow({
                    state: true,
                    message: "Parent Activated Successfully"
                })
                setGridLoading(false)
            } else {
                console.error("Error setting info")
                setErrorShow({ state: true, message: data.response.message })
                setGridLoading(false)
            }
        }).catch((error) => {
            console.error(error.message);
            setGridLoading(false)
        })
    }

    function formatDate(inputDate) {
        const dateObj = new Date(inputDate);
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return dateObj.toLocaleDateString('en-US', options);
    }

    useEffect(() => {
        fetchParents()
    }, [tabValue, dataGridPageSize, pageState?.count, searchValue, pageState.page]);

    const fileData = pageState?.data.map((parent) => {
        return {
            "Parent Name": parent?.customerName,
            "Mobile No": parent?.mobileNumber,
            "Email": parent?.email,
            "Students": countStudents(parent),
            "Pending Invoices": parent?.pendingInvoices,
            "Amount Due": parent?.pendingAmount,
        };
    });

    const fileDataPDF = pageState.data.map((parent) => [
        parent?.customerName,
        parent?.mobileNumber,
        parent?.email,
        countStudents(parent),
        parent?.pendingInvoices,
        parent?.pendingAmount,
    ]);

    const csvColumns = [
        { label: "Parent Name", key: "Parent Name" },
        { label: "Mobile No", key: "Mobile No" },
        { label: "Email", key: "Email" },
        { label: "Students", key: "Students" },
        { label: "Pending Invoices", key: "Pending Invoices" },
        { label: "Amount Due", key: "Amount Due" },
    ];

    const fileHeaders = [[
        "Parent Name",
        "Mobile No",
        "Email",
        "Students",
        "Pending Invoices",
        "Amount Due"
    ]]
    const renderTable = (columns, title, fileName) => (
        <Box component="div" sx={{ display: "flex", flexDirection: "column" }}>
            <Box component="div" sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box component="div" sx={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <CustomSearchInput
                name="search"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Search:"
                />
            </Box>
            <ExportMenu
                csvColumns={csvColumns}
                fileData={fileData}
                fileHeaders={fileHeaders}
                fileDataPDF={fileDataPDF}
                title={title}
                fileName={fileName}
            />
            </Box>
            <Grid item>
            <DataGrid
                components={{ NoRowsOverlay: NoRowsOverlay }}
                sx={{ height: '400px', width: 'auto', fontFamily: 'Poppins', fontSize: "10px", color: '#272d3d', boxShadow: 0, border: 0 }}
                rowsPerPageOptions={[1, 5, 10, 20, 50, 100]}
                rowCount={pageState?.count}
                loading={pageState?.isLoading}
                pagination
                page={pageState.page - 1}
                pageSize={dataGridPageSize}
                paginationMode="server"
                onPageChange={(newPage) => { setPageState((old) => ({ ...old, page: newPage + 1, pageSize: dataGridPageSize })); }}
                onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                columns={columns}
                rows={pageState?.data}
                getRowId={row => row._id}
            />
            </Grid>
        </Box>
        );

    return (
        <Box component="div">
            <SuccessAlert
                vertical="top"
                horizontal="right"
                onClose={() => setSuccessShow({ ...successShow, state: false })}
                open={successShow.state}
                message={successShow.message} />
            <ErrorAlert
                vertical="top"
                horizontal="right"
                onClose={() => setErrorShow({ ...errorShow, state: false })}
                open={errorShow.state}
                message={errorShow.message} />
            <Box component="div" sx={{ display: "flex", justifyContent: "space-between" }}>
                <Box component="div">
                    <Box component="div" sx={{mb: 1}}>
                        <Typography sx={{ color: "#032541", fontSize: "1.563rem", fontWeight: 700 }}>
                            Parents/Guardians
                        </Typography>
                    </Box>
                    <Box component="div" sx={{}}>
                        <Breadcrumbs
                            separator={<FiberManualRecordIcon sx={{ fontSize: "0.625rem", fontFamily: 'Poppins', color: "#e1e5e8" }} />}
                            aria-label="breadcrumb">
                            {breadcrumbs}
                        </Breadcrumbs>
                    </Box>
                </Box>

                <Box component="div" sx={{ gap: 2 }}>
                    <Button sx={{
                        "width": "125px",
                        "height": "45px",
                        "borderRadius": "4px",
                        "backgroundColor": "#f5f6f7",
                        marginX: 1,
                        color: "#032541",
                        "&:hover": {
                            color: "#032541",
                            "backgroundColor": "#f5f6f7",
                        },
                    }} onClick={() => navigate("/school/parent/add/upload")}>
                        Upload File
                    </Button>

                    <Button sx={createButton} onClick={() => navigate("/school/parent/add")}>
                        Add New
                    </Button>
                </Box>
            </Box>

            <TabContext value={tabValue}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList
                        onChange={handleTabChange}
                        TabIndicatorProps={{
                            style: { display: 'none' },
                        }}
                    >
                        <Tab label="Active" value="ACTIVE" centered sx={{
                            color: '#6e7074',
                            '&.Mui-selected': {
                                color: '#dc3545',
                            }
                        }} />
                         <Tab label="New" value="NEW" sx={{
                            color: '#6e7074',
                            '&.Mui-selected': {
                                color: '#dc3545',
                            }
                        }} />
                           <Tab label="Edited" value="Edited" sx={{
                            color: '#6e7074',
                            '&.Mui-selected': {
                                color: '#dc3545',
                            }
                        }} />
                        <Tab label="Deactivation Request" 
                        value="DEACTIVATION_REQUEST" sx={{
                            color: '#6e7074',
                            '&.Mui-selected': {
                                color: '#dc3545',
                            }
                        }} />
                        <Tab label="Inactive" value="Suspended" centered sx={{
                            color: '#6e7074',
                            '&.Mui-selected': {
                                color: '#dc3545',
                            }
                        }} />
                    </TabList>
                </Box>

                <TabPanel value="ACTIVE">
                    <Box component="div" sx={{ display: "flex", flexDirection: "column" }}>
                        <Box component="div" sx={{ display: "flex", justifyContent: "space-between" }}>
                            <Box component="div" sx={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                                <CustomSearchInput name={"search"} value={searchValue} onChange={(e) => setSearchValue(e.target.value)} placeholder="Search:" />
                            </Box>
                            <ExportMenu
                                csvColumns={csvColumns}
                                fileData={fileData}
                                fileHeaders={fileHeaders}
                                fileDataPDF={fileDataPDF}
                                title={"Active Parents"}
                                fileName={"ActiveParents"}
                            />
                        </Box>
                        <Grid item>
                            <DataGrid
                                components={{ NoRowsOverlay: NoRowsOverlay }}
                                sx={{ height: '400px', width: 'auto', fontFamily: 'Poppins', fontSize: "10px", color: '#272d3d', boxShadow: 0, border: 0 }}
                                rowsPerPageOptions={[1, 5, 10, 20, 50, 100]}
                                rowCount={pageState?.count}
                                loading={pageState?.isLoading}
                                pagination
                                page={pageState.page - 1}
                                pageSize={dataGridPageSize}
                                paginationMode="server"
                                onPageChange={(newPage) => { setPageState((old) => ({ ...old, page: newPage + 1, pageSize: dataGridPageSize })); }}
                                onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                                columns={activeColumns}
                                rows={pageState?.data}
                                getRowId={row => row._id} />
                        </Grid>
                    </Box>
                </TabPanel>

                <TabPanel value="NEW">
                {renderTable(activeColumns, "New Parents", "NewParents")}
                </TabPanel>

                <TabPanel value="Edited">
                {renderTable(activeColumns, "New Parents", "NewParents")}
                </TabPanel>

                <TabPanel value="DEACTIVATION_REQUEST">
                {renderTable(activeColumns, "Deactivation Request", "DeactivationRequest")}
                </TabPanel>

                <TabPanel value="Suspended">
                    <Box component="div" sx={{ display: "flex", flexDirection: "column" }}>
                        <Box component="div" sx={{ display: "flex", justifyContent: "space-between" }}>
                            <Box component="div" sx={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                                <CustomSearchInput name={"search"} value={formData.search} onChange={handleInputChange} placeholder="Search:" />
                            </Box>
                            <ExportMenu
                                csvColumns={csvColumns}
                                fileData={fileData}
                                fileHeaders={fileHeaders}
                                fileDataPDF={fileDataPDF}
                                title={"Deactivated Parents"}
                                fileName={"DeactivatedParents"}
                            />
                        </Box>
                        <Grid item>
                            <DataGrid
                                components={{ NoRowsOverlay: NoRowsOverlay }}
                                sx={{ height: '400px', width: 'auto', fontFamily: 'Poppins', fontSize: "10px", color: '#272d3d', boxShadow: 0, border: 0 }}
                                rowsPerPageOptions={[1, 5, 10, 20, 50, 100]}
                                rowCount={pageState?.count}
                                loading={pageState?.isLoading}
                                pagination
                                page={pageState.page - 1}
                                pageSize={dataGridPageSize}
                                paginationMode="server"
                                onPageChange={(newPage) => { setPageState((old) => ({ ...old, page: newPage + 1, pageSize: dataGridPageSize })); }}
                                onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                                columns={suspendedColumns}
                                rows={pageState?.data}
                                getRowId={row => row._id} />
                        </Grid>
                    </Box>
                </TabPanel>
            </TabContext>
        </Box>
    )
}

export default SchoolListParents;