import React, { useEffect, useState } from "react";
import { Box, Button, Grid, Modal, Select, Stack, styled, Tab, TablePagination, Typography } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import { CheckCircle, Circle, Close } from "@mui/icons-material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { makeStyles } from "@mui/styles";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import { DataGrid } from "@mui/x-data-grid";
import { Link, useNavigate, useParams } from "react-router-dom";
import profilePicture from "../../../common/images/profile_picture.svg";
import deactivateUser from "../../../common/images/deactivate-user.svg";
import { CreateSchoolInvoiceModal } from "../../Modals/Invoice/createSchoolInvoice";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CustomTable from "../../School/CustomTable";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { Menu } from "@mui/material";
import { SuccessAlert } from "../../snackBar Alerts/successAlert";
import { ErrorAlert } from "../../snackBar Alerts/errorAlert";
// import WarningIcon from "../../../School/Images/warning-remove-icn.svg";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";  
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";



let baseUrl = import.meta.env.VITE_BASE_URL;
import HttpComponent from './../../School/MakeRequest';

const AntTabs = styled(TabList)({
  borderBottom: "3px solid #e8e8e8",
  "& .MuiTabs-indicator": {
    backgroundColor: "#dc3545",
  },
});

const AntTab = styled((props) => <Tab disableRipple {...props} />)(({ theme }) => ({
  textTransform: "none",
  minWidth: 0,
  [theme.breakpoints.up("sm")]: {
    minWidth: 0,
  },
  fontWeight: theme.typography.fontWeightRegular,
  marginRight: theme.spacing(1),
  fontSize: "13px",
  fontStretch: "normal",
  fontStyle: "normal",
  lineHeight: "2.75",
  letterSpacing: "normal",
  textAlign: "left",
  color: "#6e7074",
  fontFamily: ["Poppins"].join(","),
  "&:hover": {
    color: "#032541",
    opacity: 1,
  },
  "&.Mui-selected": {
    color: "#dc3545",
    fontWeight: 600,
  },
  "&.Mui-focusVisible": {
    backgroundColor: "blue",
  },
}));

const useStyles = makeStyles({
  table: {
    minWidth: 800,
  },
});

const ParentProfile = (props) => {
  const { customerId } = useParams();
  const [tabValue, setTabValue] = useState("invoices");
  const [students, setStudents] = useState([]);
  const [parentData, setParentData] = useState();
  const [customerActivity, setCustomerActivity] = useState([]);
  const [customerTransRows, setCustomerTransRows] = useState([]);
  const [customerTransPageSize, setCustomerTransPageSize] = useState(10);
  const [dataGridPageSize, setPageSize] = React.useState(5);
  const [pageState, setPageState] = useState({ isLoading: true, data: [], count: 0, page: 1, pageSize: dataGridPageSize });
  const [createInvoiceModal, setCreateInvoiceModal] = useState(false);
  const [invoiceData, setInvoiceData] = useState([]);

  console.log("parent data.data",parentData)

  let localCurrency = localStorage.getItem('localCurrency')

  if (!localCurrency || localCurrency === 'undefined' || localCurrency === undefined ) {
    localCurrency = 'KES'
  }
  
  const numberFormat = (value) => new Intl.NumberFormat("en-US", { style: "currency", currency: localCurrency === 'undefined' ? 'KES':localCurrency}).format(value);

  const classes = useStyles();
  const theColumns = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  };

  function convertDate(dateString) {
    let date = new Date(dateString);
    let options = { month: "short" };
    let day = date.getDate();
    let suffix = "th";

    if (day === 1 || day === 21 || day === 31) {
      suffix = "st";
    } else if (day === 2 || day === 22) {
      suffix = "nd";
    } else if (day === 3 || day === 23) {
      suffix = "rd";
    }

    return day + suffix + " " + date.toLocaleString("default", options) + " " + date.getFullYear();
  }

  const commonTextSize = {
    fontSize: "15px",
  };
  const setNewValue = (event, newValue) => {
    setTabValue(newValue);
  };

  const getTransactions = async () => {
    console.log("test working");
    const customerDetailsResponse = await fetch(baseUrl + `/api/customerTransactions/?customerId=${customerId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "X-Authorization": localStorage.getItem("X-Authorization"),
      },
    });
    if (customerDetailsResponse.status === 201) {
      await customerDetailsResponse.json().then((data) => {
        console.log("transa", data.transaction);
        let counter = 1;
        const rowsWithIds = data.transaction.map((row) => {
          let transactionTimeDate = new Date(row.transactionTime).toLocaleDateString("en-US", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          });
          let transactionTimeTime = new Date(row.transactionTime).toLocaleTimeString("en-US");
          let transactionTime = `${transactionTimeDate} ${transactionTimeTime}`;
          return { ...row, id: counter++, transactionTime };
        });
        console.log("new rows", rowsWithIds);
        setCustomerTransRows(rowsWithIds);
      });
    }
  };

  const fetchActivity = async () => {
    const customerDetailsResponse = await fetch(baseUrl + `/api/CustomersActivities/?customerId=${customerId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "X-Authorization": localStorage.getItem("X-Authorization"),
      },
    });
    if (customerDetailsResponse.status === 201) {
      const customerDetailsData = await customerDetailsResponse.json();
      console.log("CUSTOMERS ......", customerDetailsData.data);
      setCustomerActivity(customerDetailsData.data);
    }
  };

  const fetchInvoices = async () => {
    // /api/get_invoice_by_customerId/:customerId
    const customerDetailsResponse = await fetch(baseUrl + `/api/get_invoice_by_customerId/${customerId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "X-Authorization": localStorage.getItem("X-Authorization"),
      },
    });
    if (customerDetailsResponse.status === 200) {
      const customerDetailsData = await customerDetailsResponse.json();
      console.log("invoices", customerDetailsData.data);
      setInvoiceData(customerDetailsData.data);
    }
  };

  const formatDate = (date) => {
    let transactionTimeDate = new Date(date).toLocaleDateString("en-US", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
    let transactionTimeTime = new Date(date).toLocaleTimeString("en-US");
    return `${transactionTimeDate} ${transactionTimeTime}`;
  };

  const fetchStudentsInfo = async () => {
    let url = baseUrl + `/api/getBillableItems?page=${pageState.page}&limit=${dataGridPageSize}`;
    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Authorization": localStorage.getItem("X-Authorization"),
      },
      body: JSON.stringify({
        customerId: customerId,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("student info", data);
        setStudents(data?.data);
        setPageState({ ...pageState, isLoading: false, data: data?.data, count: data?.count });

      })
      .catch((error) => {
        console.error(error);
      });
  };
  const columns = [
    { field: "id", headerName: "Admission Number", flex: 1 },
    {
      field: "Student Name", headerName: "Student Name", flex: 1, renderCell: (params) => (
        <strong>
          {params.row.firstName} {params.row.lastName}
        </strong>
      )
    },

    { field: "grade", headerName: "Grade", flex: 1 },
    { field: "term", headerName: "Term", flex: 1 },
    { field: "stream", headerName: "Stream", flex: 1 },
    { field: "boardingStatus", headerName: "Boarding Status", flex: 1 },
    // { field: "status", headerName: "Student Status", flex: 1},
    // {field: 'servedBy', headerName: 'Served By',minWidth:130},
    {
      field: "additionalInfo", headerName: "AdditionalInfo", flex: 1, renderCell: (params) => (
        <strong>
          {params.row.additionalInfo === "" ? "N/A" : "Yes"}
        </strong>
      )
    },
    { field: "pendingInvoices", headerName: "Pending Invoices", flex: 1 },
    { field: "pendingBalance", headerName: "Pending Balance", flex: 1 },
    {
      field: "status",
      headerName: "Student Status",
      flex: 1,
      renderCell: (params) => (
        <Typography
          sx={{
            color: params.row.status === "Deactivated" ? "#dc3545" : params.row.status === "ACTIVE" ? "#17ae7b" : "#000", // Default color if neither
          }}
        >
          {params.row.status}
        </Typography>
      ),
    },
    {
      field: "action", headerName: "Action", flex: 1, renderCell: (params) => (
        <strong>
          <MoreVertIcon />
        </strong>
      )
    },

    // {field: 'approvedBy', headerName: 'Approved By',minWidth:130}
  ]
  const studentsRows = students.map((student) => {
    return {
      id: student.itemNumber,
      firstName: student.firstName,
      lastName: student.lastName,
      grade: student.grade,
      term: student.term,
      stream: student.stream,
      boardingStatus: student.boardingStatus,
      amount: student.amount,
      additionalInfo: student.additionalInfo,
      pendingInvoices: student.pendingInvoices,
      pendingBalance: student.pendingBalance,
      status: student.status,
    };
  });
  const fetchCustomerInfo = async () => {
    const productResponse = await fetch(baseUrl + `/api/get_customer_by_customer_id?customerId=${customerId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "X-Authorization": localStorage.getItem("X-Authorization"),
      },
    });

    if (productResponse.status === 200) {
      const customerData = await productResponse.json();
      console.log("customer data", customerData);
      setParentData(customerData?.data);
    }
  };

  const fetchReceivedReceipts = async () => {
    try {
      const options = {
        method: "GET",
        headers: {
          "X-Authorization": localStorage.getItem("X-Authorization"),
        },
      };
      const response = await fetch(baseUrl + `/api/get_customer_receipts?page=1&limit=1000000000&customerId=${customerId}`, options);
      if (response.status === 201) {
        await response.json().then((data) => {
          console.log("received receipts", data);
          const rowsWithIds = data.data.map((row) => {
            const issuedDate = new Date(row.issuedDate).toLocaleDateString("de-DE", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            });
            const amount = numberFormat(row.amount);
            return { ...row, id: row.transactionId, issuedDate, amount };
          });
          setReceivedReceipts(rowsWithIds);
        });
      }
    } catch (e) {
      console.error("error fetching recived invoices", e.message);
    }
  };

  const fetchCreditAdjustments = async () => {
    try {
        const options = {
            method: "GET",
            headers: {
                "X-Authorization": localStorage.getItem("X-Authorization"),
            },
        };
        const response = await fetch(baseUrl + `/api/v1/get_parent_overpayments?customerId=${customerId}&page=1&limit=1000000000`, options);
        
        // Check if the response status is OK (200)
        if (response.ok) {
            const data = await response.json(); // Parse the JSON response
            console.log("received credit adjustments", data);
            const rowsWithIds = data.data.map((row) => {
                const payment_type = "Credit Adjustment";
                return { ...row, id: row._id, payment_type };
            });
            setCreditAdjustments(rowsWithIds);
        } else {
            console.error("Error fetching credit adjustments: ", response.status, response.statusText);
        }
    } catch (e) {
        console.error("error fetching credit adjustments", e.message);
    }
};

  useEffect(() => {
    fetchReceivedReceipts();
    fetchStudentsInfo();
    fetchCustomerInfo();
    fetchActivity();
    getTransactions();
    fetchInvoices();
    fetchCreditAdjustments();
  }, [pageState.page, dataGridPageSize]);

  const [receivedReceipts, setReceivedReceipts] = useState([]);
  const [secondaryParentModal, setSecondaryParentModal] = useState(false);
  const [secondaryParentData, setSecondaryParentData] = useState([]);
  const [creditAdjustments, setCreditAdjustments] = useState([]);
  console.log('secondaryParentData', secondaryParentData)

  const changeSecondaryParent = () => {
    if (secondaryParentModal) {
      setSecondaryParentModal(false);
    }else if(!secondaryParentModal){
      setSecondaryParentModal(true);
      getDetailsOfParents();
    }
    
  }
  const getDetailsOfParents = async () => {
    try {
      const customerDetailsResponse = await fetch(baseUrl + `/api/v1/customers/get_secondary_parent`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "X-Authorization": localStorage.getItem("X-Authorization"),
        },
        body: JSON.stringify({
          primaryParentId: customerId
        })
      });
      
      const customerDetailsData = await customerDetailsResponse.json();
      console.log("Secondary parent data:", customerDetailsData);
      
      if (customerDetailsData.Status === "SUCCESS" && customerDetailsData.data) {
        setSecondaryParentData(customerDetailsData.data);
      } else {
        setSecondaryParentData(null); 
      }
    } catch (error) {
      console.error("Error fetching secondary parent:", error);
      setSecondaryParentData(null);
    }
  }


  useEffect(() => {
    getDetailsOfParents()
  }, [])
  const navigate = useNavigate();

  console.log(parentData, 'shhhhhhhhhhhhhhhhhhh')

  const [anchorEl, setAnchorEl] = useState(null);
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEditProfile = () => {
    navigate(`/school/parent/edit/${customerId}`);
  };

const handleAddSecondaryParent = () => {
  navigate("/school/parent/add");
};



  const handleAddStudent = () => {
    navigate(`/school/student/add/${customerId}`);
  };


  const [secondaryMenuAnchor, setSecondaryMenuAnchor] = useState(null);

 const handleEditSecondaryParent = () => {
  navigate(`/school/parent/edit/${secondaryParentData?.customerId}?type=secondary`);
};


  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [errorShow, setErrorShow] = useState({ state: false, message: "" });
  const [successShow, setSuccessShow] = useState({ state: false, message: "" });
  const [gridLoading, setGridLoading] = useState(false);

  const handleDeleteSecondaryParent = () => {
  setDeleteDialogOpen(true);
};

const handleConfirmDelete = () => {
  setDeleteDialogOpen(false);
  setGridLoading(true);

  HttpComponent({
    method: 'GET',
    url: `/api/suspendCustomer?customerId=${secondaryParentData?.customerId}`,
    body: null,
    token: localStorage.getItem("X-Authorization")
  })
    .then((data) => {
      if (data.status === 202) {
        setSuccessShow({
          state: true,
          message: "Secondary parent deactivated successfully"
        });
        setSecondaryParentData(null);
        setSecondaryParentModal(false);
        if (typeof fetchParents === "function") fetchParents();
      } else {
        setErrorShow({
          state: true,
          message: data.response?.message || "Failed to deactivate secondary parent"
        });
      }
    })
    .catch((error) => {
      console.error("Error suspending secondary parent:", error);
      setErrorShow({
        state: true,
        message: error.message || "An error occurred"
      });
    })
    .finally(() => {
      setGridLoading(false);
    });
};



    return (
    <>
    <SuccessAlert
  vertical="top"
  horizontal="right"
  onClose={() => setSuccessShow({ ...successShow, state: false })}
  open={successShow.state}
  message={successShow.message} 
/>
<ErrorAlert
  vertical="top"
  horizontal="right"
  onClose={() => setErrorShow({ ...errorShow, state: false })}
  open={errorShow.state}
  message={errorShow.message}
/>
      <Grid container marginBottom="10px">
        <Grid item style={{ width: "100%" }}>
        <div
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "20px",
        }}
          >
            {/* Top row with arrow and title + buttons */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center", color: "#032541" }}>
              <Link to="/school/parents" style={{ display: "flex", alignItems: "center", textDecoration: "none", color: "inherit" }}>
                <ArrowBackIosIcon style={{ marginRight: "4px" }} />
              </Link>               
               <div style={{ fontSize: "25px", fontWeight: "600" }}>
                  Parent Profile
              </div>
              </div>

              <div>               
                <Button
                  style={{
                    width: "190px",
                    height: "45px",
                    padding: "13px 13px 12px",
                    borderRadius: "5px",
                    backgroundColor:
                      secondaryParentModal || secondaryParentData ? "#f5f6f7" : "#e0e0e0", 
                    textTransform: "none",
                    color: secondaryParentModal || secondaryParentData ? "#032541" : "#a0a0a0", 
                    fontWeight: 500,
                    marginRight: "10px",
                    cursor:
                      secondaryParentModal || secondaryParentData ? "pointer" : "not-allowed", 
                  }}
                  onClick={() => {
                    setSecondaryParentModal(!secondaryParentModal);
                    if (!secondaryParentModal && !secondaryParentData) {
                      getDetailsOfParents();
                    }
                  }}
                  disabled={secondaryParentModal ? false : !secondaryParentData}
                >
                  {secondaryParentModal ? "View Primary Parent" : "View Secondary Parent"}
                </Button>
              </div>
            </div>

            {/* Breadcrumbs */}
            <Breadcrumbs
              separator={<FiberManualRecordIcon style={{ fontSize: 10, color:"#e1e5e8" }} />}
              aria-label="breadcrumb"
              style={{ marginTop: "5px", color: "#032541" }}
            >
              <Typography color="#707070"> Dashboard </Typography>
              <Typography color="#707070"> Parents/Guardians </Typography>
              <Typography color="#dc3545">Parent Profile</Typography>
            </Breadcrumbs>
          </div>

          {secondaryParentModal ?
            <>
          <div style={{ display: "flex", justifyContent: "center" }}>
          <div
            style={{
              position: "relative",
              display: "flex",
              width: "95%",
              boxShadow: "0 4px 9px rgba(0, 0, 0, 0.16)",
              borderRadius: "15px",
              marginTop: "1%",
              padding: "30px",
              backgroundColor: "#fff",
            }}
          >
            {/* MoreVert Icon at Top-Right */}
            <div style={{ position: "absolute", top: "15px", right: "15px" }}>
              <IconButton onClick={(e) => setSecondaryMenuAnchor(e.currentTarget)}>
                <MoreVertIcon />
              </IconButton>
              <Menu
                anchorEl={secondaryMenuAnchor}
                open={Boolean(secondaryMenuAnchor)}
                onClose={() => setSecondaryMenuAnchor(null)}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                PaperProps={{
                  style: { transform: "translateX(-35px)" },
                }}
              >
                <MenuItem onClick={() => { handleEditSecondaryParent(); setSecondaryMenuAnchor(null); }}>
                  Edit Parent
                </MenuItem>
                <MenuItem onClick={() => { handleDeleteSecondaryParent(); setSecondaryMenuAnchor(null);}}sx={{ color: '#DC3545' }}>
                  Delete
                </MenuItem>
              </Menu>
            </div>

            {/* Profile Picture */}
            <div style={{ display: "flex", alignItems: "center", marginRight: "30px" }}>
              <img
                src={profilePicture}
                alt="Profile"
                style={{ height: "110px", width: "110px", borderRadius: "8px" }}
              />
            </div>

            {/* Data Grid with 4 Columns */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                columnGap: "40px",
                rowGap: "13px",
                flex: 2,
              }}
            >
              {/* Column 1: Name, Created Date, Mobile */}
              <div>
                <div style={{ fontSize: "25px", fontWeight: "bold", color: "#032541", whiteSpace: "nowrap", overflow: "hidden",textOverflow: "ellipsis", maxWidth: "100%",}}>
                  {secondaryParentData?.firstName} {secondaryParentData?.lastName}
              </div>

                <div style={{ fontSize: "15px", color: "#666f76", marginTop: "8px" }}>
                  Added On {convertDate(parentData?.createdAt)}
                </div>
                <div style={{ fontSize: "15px", color: "#666f76", marginTop: "8px" }}>
                  <strong style={{ color: "#032541" }}>Mobile Number:<br /></strong>
                  {secondaryParentData?.phone}
                </div>
              </div>

              {/* Column 2: Address, No. of Students */}
              <div>
                <div style={{ fontSize: "15px", color: "#666f76" }}>
                  <strong style={{ color: "#032541" }}>Address:<br /></strong>
                  {secondaryParentData?.country}
                </div>
                <div style={{ fontSize: "15px", color: "#666f76", marginTop: "8px" }}>
                  <strong style={{ color: "#032541" }}>No. of Students:<br /></strong>
                  {pageState.count}
                </div>
              </div>

              {/* Column 3: Email, Pending Invoices */}
              <div>
                <div style={{ fontSize: "15px", color: "#666f76" }}>
                  <strong style={{ color: "#032541" }}>Email:<br /></strong>
                  {secondaryParentData?.email}
                </div>
                <div style={{ fontSize: "15px", color: "#666f76", marginTop: "8px" }}>
                  <strong style={{ color: "#032541" }}>Mobile Number:<br /></strong>
                  {secondaryParentData?.phone}
                </div>
              </div>

              {/* Column 4: Pending Balance */}
              <div>
                <div style={{ fontSize: "15px", color: "#666f76" }}>
                  <strong style={{ color: "#032541" }}>Pending Balance:<br /></strong>
                  <span style={{ color: "#17ae7b" }}>{localCurrency} {secondaryParentData?.pendingAmount}</span>
                </div>
                <div style={{ fontSize: "15px", color: "#666f76", marginTop: "8px" }}>
                  <strong style={{ color: "#032541" }}>Pending Invoices:<br /></strong>
                  <span style={{ color: "#17ae7b" }}>{localCurrency} {secondaryParentData?.pendingInvoiceCount}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

          </> :
          <>
        <div style={{ display: "flex", justifyContent: "center" }}>
              <div
                style={{
                  position: "relative",
                  display: "flex",
                  width: "95%",
                  boxShadow: "0 4px 9px rgba(0, 0, 0, 0.16)",
                  borderRadius: "15px",
                  marginTop: "1%",
                  padding: "30px",
                  backgroundColor: "#fff",
                }}
              >
                {/* MoreVert Icon at Top-Right */}
                <div style={{ position: "absolute", top: "15px", right: "15px" }}>
                  <IconButton onClick={handleMenuClick}>
                    <MoreVertIcon />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                    anchorOrigin={{ vertical: "top", horizontal: "right" }}
                    transformOrigin={{ vertical: "top", horizontal: "right" }}
                    PaperProps={{
                      style: { transform: "translateX(-35px)" },
                    }}
                  >
                    <MenuItem onClick={() => { handleEditProfile(); handleMenuClose(); }}>
                      Edit Profile
                    </MenuItem>
                    <MenuItem onClick={() => {handleAddSecondaryParent(); handleMenuClose();}}
                      disabled={!secondaryParentModal && !secondaryParentData}
                      sx={{
                        color: (!secondaryParentModal && !secondaryParentData) ? '#a0a0a0' : 'inherit'
                      }}
                    >
                      Add Secondary Parent
                    </MenuItem>
                    <MenuItem onClick={() => { handleAddStudent(); handleMenuClose(); }}>
                      Add Student
                    </MenuItem>
                  </Menu>
                </div>

                {/* Profile Picture */}
                <div style={{ display: "flex", alignItems: "center", marginRight: "30px" }}>
                  <img
                    src={profilePicture}
                    alt="Profile"
                    style={{ height: "110px", width: "110px", borderRadius: "8px" }}
                  />
                </div>

                {/* Data Grid with 4 Columns */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(4, 1fr)",
                    columnGap: "30px",
                    rowGap: "12px",
                    flex: 1,
                  }}
                >
                  {/* Column 1: Name, Created Date, Mobile */}
                  <div>
                    <div style={{ fontSize: "25px", fontWeight: "bold", color: "#032541" }}>
                      {parentData?.firstName} {parentData?.lastName}
                    </div>
                    <div style={{ fontSize: "15px", color: "#666f76", marginTop: "8px" }}>
                      Added on {convertDate(parentData?.createdAt)}
                    </div>
                    <div style={{ fontSize: "15px", color: "#666f76", marginTop: "8px" }}>
                      <strong style={{ color: "#032541" }}>Mobile Number:<br /></strong>
                      {parentData?.phone}
                    </div>
                  </div>

                  {/* Column 2: Address, No. of Students */}
                  <div>
                    <div style={{ fontSize: "15px", color: "#666f76" }}>
                      <strong style={{ color: "#032541" }}>Address:<br /></strong>
                      {parentData?.country}
                    </div>
                    <div style={{ fontSize: "15px", color: "#666f76", marginTop: "8px" }}>
                      <strong style={{ color: "#032541" }}>No. of Students:<br /></strong>
                      {pageState.count}
                    </div>
                  </div>

                  {/* Column 3: Email, Phone */}
                  <div>
                    <div style={{ fontSize: "15px", color: "#666f76" }}>
                      <strong style={{ color: "#032541" }}>Email:<br /></strong>
                      {parentData?.email}
                    </div>
                    <div style={{ fontSize: "15px", color: "#666f76", marginTop: "8px" }}>
                      <strong style={{ color: "#032541" }}>Phone:<br /></strong>
                      {parentData?.phone}
                    </div>
                  </div>

                  {/* Column 4: Pending Invoices, Pending Balance */}
                  <div>
                    <div style={{ fontSize: "15px", color: "#666f76" }}>
                      <strong style={{ color: "#032541" }}>Pending Invoices:<br /></strong>
                      <span style={{ color: "#17ae7b" }}>{localCurrency} {parentData?.pendingInvoices}</span>
                    </div>
                    <div style={{ fontSize: "15px", color: "#666f76", marginTop: "8px" }}>
                      <strong style={{ color: "#032541" }}>Pending Balance:<br /></strong>
                      <span style={{ color: "#17ae7b" }}>{localCurrency} {parentData?.pendingAmount}</span>
                    </div>
                  </div>
                </div>
              </div>
              </div>

            </>}
          <TabContext value={tabValue}>
            <Box>

              <AntTabs onChange={setNewValue}>
                <AntTab value="invoices" label="Invoices" />
                <AntTab value="transactions" label="Transactions" />
                <AntTab label="Receipts" value="Receipts" />
                <AntTab value="creditAdjustments" label="Credit Adjustments" />
                <AntTab value="students" label="Students" />
                {/*<AntTab value="activity" label="Activity" />*/}
              </AntTabs>
            </Box>

            <TabPanel value="students">
              {/* <div
                style={{
                  height: "350px",
                  minWidth: "1000px",
                }}
              >
                <Table className={classes.table} aria-label="students data grid">
                  <TableHead>
                    <TableRow>
                      <TableCell>Student ID</TableCell>
                      <TableCell>Student Name</TableCell>
                      <TableCell>Grade</TableCell>
                      <TableCell>Term</TableCell>
                      <TableCell>Additional Info</TableCell>
                      <TableCell>Pending Invoices</TableCell>
                      <TableCell>Amount Due</TableCell>
                      <TableCell>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {students?.map((student) => (
                      <TableRow key={student._id}>
                        <TableCell>
                          <Link to={`/school/student/${customerId}/${student.itemNumber}`}>{student.itemNumber}</Link>
                        </TableCell>
                        <TableCell>
                          {student.firstName} {student.lastName}
                        </TableCell>
                      
                        <TableCell>{student.grade}</TableCell>
                        <TableCell>{student.term}</TableCell>
                        <TableCell>{student.additionalInfo === "" ? "N/A" : "Yes"}</TableCell>
                        <TableCell>{student.pendingInvoices}</TableCell>
                        <TableCell>KES {student.pendingBalance}</TableCell>
                        <TableCell>
                          <MoreVertIcon />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div> */}

              <div style={{ height: "600px", minWidth: "1000px", }} >

                <DataGrid
                  columns={columns}
                  rows={studentsRows}
                  width="100%"
                  rowsPerPageOptions={[5, 10, 20, 50, 100]}
                  rowCount={pageState.count}
                  loading={pageState.isLoading}
                  pagination
                  page={pageState.page - 1}
                  pageSize={dataGridPageSize}
                  paginationMode="server"
                  onPageChange={(newPage) => {
                    setPageState((old) => ({ ...old, page: newPage + 1, pageSize: dataGridPageSize }));
                  }}
                  onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                />
              </div>
            </TabPanel>

            <TabPanel value="transactions">
              <div
                style={{
                  height: "350px",
                  minWidth: "1000px",
                }}
              >
                <DataGrid
                  pagination
                  rows={customerTransRows}
                  width="100%"
                  getRowId={(row) => row.id}
                  pageSize={customerTransPageSize}
                  onPageSizeChange={(newPageSize) => setCustomerTransPageSize(newPageSize)}
                  rowsPerPageOptions={[5, 10, 20, 50, 100]}
                  columns={[
                    { field: "transactionNo", headerName: "Transaction No", flex: 1 },
                    { field: "transactionTime", headerName: "Date/Time", flex: 1 },
                    // {field: 'servedBy', headerName: 'Served By',minWidth:130},
                    { field: "noOfItems", headerName: "No. Of Items", flex: 1 },
                    { field: "business", headerName: "Business", flex: 1 },
                    { field: "branchName", headerName: "Branch", flex: 1 },                    
                    { field: "amount", headerName: "Amount", flex: 1 },
                    {
                      field: "status",headerName: "Status",flex: 1,
                      renderCell: (params) => (
                        <Typography sx={{ color: params.value === "ACTIVE" ? "#17ae7b" : params.value === "VOIDED" ? "#dc3545" : "#000" }} >
                          {params.value}
                        </Typography>
                      ),
                    },
                    // {field: 'approvedBy', headerName: 'Approved By',minWidth:130}
                  ]}
                />
              </div>
            </TabPanel>

            {/*<TabPanel value="activity">*/}
            {/*    <div style={{*/}
            {/*        height:"350px",*/}
            {/*        minWidth:"1000px"*/}
            {/*    }}>*/}
            {/*        {customerActivity.length < 1 ?(*/}
            {/*            <div style={{*/}
            {/*                display:"flex",*/}
            {/*                justifyContent:"center"*/}
            {/*            }}>*/}
            {/*                <div>*/}
            {/*                    No Customer Activity*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*        ):(*/}
            {/*            <>*/}
            {/*                {customerActivity?.map((activity, index) => (*/}
            {/*                    <div key={index}>*/}
            {/*                        {numberFormat(activity.amount)} {activity.customerPaymentType === "credit" ? "credited" : "debited"} {activity.customerPaymentType === "credit" ? "to" : "from"} customer account by {activity.createdBy}*/}
            {/*                    </div>*/}
            {/*                ))}*/}
            {/*            </>*/}
            {/*        )}*/}

            {/*    </div>*/}
            {/*</TabPanel>*/}

            <TabPanel value="Receipts">
              <div
                style={{
                  height: "350px",
                  minWidth: "1000px",
                }}
              >
                <CustomTable
                  data={receivedReceipts}
                  columns={[
                    {
                      field: "receiptNo",
                      headerName: "Receipt Number",
                      flex: 1,
                      renderCell: (params) => {
                        return <Link style={{color:'#032541'}} to={`/receipt/${params.value}/${params.row.invoiceNumber}`}>{params.value}</Link>;
                      },
                    },
                    { field: "invoiceNumber", headerName: "Invoice Number", flex: 1 },
                    { field: "from", headerName: "From", flex: 1 },
                    { field: "amount", headerName: "Amount Paid", flex: 1 },
                    {
                      field: "transactionDate",
                      headerName: "Date Issued",
                      flex: 1,
                      renderCell: (params) => {
                        if (!params.value) {
                          return "N/A";
                        }
                        return formatDate(params.value);
                      },
                    }
                  ]}
                  rowsPerPage={5}
                />
              </div>
            </TabPanel>

            <TabPanel value="creditAdjustments">
              <div
                style={{
                  height: "350px",
                  minWidth: "1000px",
                }}
              >
                <CustomTable
                  data={creditAdjustments}
                  columns={[
                    { field: "payment_type", headerName: "Payment Type", flex: 1 },
                    { field: "invoiceNumber", headerName: "Invoice Number", flex: 1 },
                    { field: "overPaymentPaid", headerName: "Amount", flex: 1 },                    {
                      field: "overPaymentPaidDate",
                      headerName: "Date Paid",
                      flex: 1,
                      renderCell: (params) => {
                        if (!params.value) {
                          return "N/A";
                        }
                        return formatDate(params.value);
                      },
                    }
                  ]}
                  rowsPerPage={5}
                />
              </div>
            </TabPanel>

            <TabPanel value="invoices">
              <div
                style={{
                  height: "350px",
                  minWidth: "1000px",
                }}
              >
                <Table className={classes.table} aria-label="students data grid">
                  <TableHead>
                    <TableRow>
                      <TableCell>Invoice No</TableCell>
                      {/*<TableCell>From</TableCell>*/}
                      <TableCell>Date/Time Issued</TableCell>
                      <TableCell>Student Name</TableCell>
                      <TableCell>Admission Number</TableCell>
                      <TableCell>Amount</TableCell>
                      <TableCell>Discount Amount</TableCell>
                      <TableCell>Amount Paid</TableCell>
                      <TableCell>Type</TableCell>
                      <TableCell>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {invoiceData?.map((invoice) => (
                      <TableRow key={invoice._id}>
                        <TableCell>
                          <Link style={{color:'#032541'}} to={`/invoice/${invoice.invoiceNumber}`}>{invoice.invoiceNumber}</Link>
                        </TableCell>
                        {/*<TableCell>{student.firstName} {student.lastName}</TableCell>*/}
                        <TableCell>{formatDate(invoice.createdAt)}</TableCell>
                        <TableCell>{invoice?.studentName}</TableCell>
                        <TableCell>{invoice?.admissionNumber}</TableCell>
                        <TableCell>{invoice?.invoiceAmount}</TableCell>
                        <TableCell>{invoice?.discountAmount}</TableCell>
                        <TableCell>{invoice?.amountPaid}</TableCell>
                        <TableCell>{invoice.invoiceType}</TableCell>
                        <TableCell>
                          <Typography
                            sx={{
                              color: invoice.invoiceStatus == "Paid" ? "#17ae7b" : invoice.invoiceStatus == "Unpaid" ? "#dc3545" : invoice.invoiceStatus == "Partially Paid" ? "#ff8503" : "#032541",
                            }}
                          >
                            {invoice.invoiceStatus}
                          </Typography>
                        </TableCell>
                        {/*<TableCell>{student.additionalInfo === "" ? "N/A" : "Yes"}</TableCell>*/}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabPanel>
          </TabContext>
        </Grid>
      </Grid>
      <CreateSchoolInvoiceModal modalOpen={createInvoiceModal} onClose={() => setCreateInvoiceModal(false)} />
<Dialog 
  open={deleteDialogOpen} 
  onClose={() => setDeleteDialogOpen(false)}
>
  <DialogTitle sx={{ display: "flex", alignItems: "center", gap: "15px" }}>
    <Box>
      {/* <img src={WarningIcon} alt="warning icon" width={70} height={70} /> */}
    </Box>
    <Box>
      <Typography
        variant="h6"
        sx={{
          fontWeight: "600",
          color: "#032541",
          fontSize: "16px",
          fontFamily: "Poppins",
        }}
      >
        Delete Secondary Parent?
      </Typography>
      <DialogContentText>
        Are you sure you want to delete the secondary parent <br />{" "}
        <strong style={{ color: "#032541" }}>
          {secondaryParentData?.firstName} {secondaryParentData?.lastName}
        </strong>{" "}
        ?
      </DialogContentText>
    </Box>
  </DialogTitle>
  <DialogActions sx={{ justifyContent: "center", marginBottom: "30px" }}>
    <Button
      style={{
        height: "45px",
        width: "125px",
        marginRight: "20px",
        borderRadius: "4px",
        border: "1px solid #002543",
        color: "#002543",
        fontSize: "14px",
        fontWeight: "500",
        fontFamily: "Poppins",
      }}
      onClick={() => setDeleteDialogOpen(false)}
    >
      Cancel
    </Button>
    <Button
      style={{
        height: "45px",
        width: "125px",
        fontSize: "14px",
        fontWeight: "600",
        fontFamily: "Poppins",
      }}
      onClick={handleConfirmDelete}
      color="error"
      variant="contained"
    >
      Delete
    </Button>
  </DialogActions>
</Dialog>

    </>
    
  );
};

export { ParentProfile };