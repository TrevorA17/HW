import { Typography,Button, Box, Grid, Breadcrumbs, TextField, Snackbar, Alert } from "@mui/material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { useEffect, useState } from "react";
// import { Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useSearchParams } from "react-router-dom";




let baseUrl = import.meta.env.VITE_BASE_URL;
const ParentEdit = (props) => {
  const [searchParams] = useSearchParams();
  const isSecondary = searchParams.get("type") === "secondary";
  const [openSnack, setOpenSnack] = useState(false);
  const [openeErrorSnack, setOpenErrorSnack] = useState(false);
  const [message, setMessage] = "successfully updated .......";
  const [parentInfo, setParentInfo] = useState({ firstName: "", lastName: "", country: "", phone: "", email: "", id_number: "" });

  const onInputChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    setParentInfo({ ...parentInfo, [name]: value });
  };

  const { customerId } = useParams();
  const navigate = useNavigate();
  const breadcrumbs = [
  <Typography key="X" sx={{ color: "#707070", fontSize: "0.875rem" }}>
    Dashboard
  </Typography>,
  <Typography key={"Invoices"} sx={{ color: "#707070", fontSize: "0.875rem" }}>
    Parents/Guardians
  </Typography>,
  <Typography key={"Invoices"} sx={{ color: "#707070", fontSize: "0.875rem" }}>
    Parent Profile
  </Typography>,
  <Typography key={"Invoices"} sx={{ color: "#707070", fontSize: "0.875rem" }}>
      {isSecondary ? "Secondary Parent" : "Primary Parent"}
  </Typography>,
  <Typography key={"Invoices"} sx={{ color: "#DC3545", fontSize: "0.875rem" }}>
      Edit {isSecondary ? "Secondary" : "Primary"} Parent
  </Typography>,
];


  //parent info
  const getDataFromUrl = async () => {
    try {
      const response = await fetch(baseUrl + `/api/get_customer_by_customer_id?customerId=${customerId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "X-Authorization": localStorage.getItem("X-Authorization"),
        },
      });
      const data = await response.json();
      console.log(data, "parent info");
      setParentInfo({ ...parentInfo, firstName: data.data.firstName, lastName: data?.data?.lastName, country: data?.data?.country, phone: data?.data?.phone, email: data?.data?.email, id_number : data?.data?.id_number });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDataFromUrl();
  }, []);

  //handle update user
  const editUserInfo = async () => {
    try {
      const updatedInfo = await fetch(`${baseUrl}/api/updateCustomer?customerId=${customerId}`, {
        method: "PUT",
        body: JSON.stringify({ firstName: parentInfo.firstName, lastName: parentInfo.lastName, phone: parentInfo.phone, email: parentInfo.email, country: parentInfo.country, id_number: parentInfo.id_number}),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "X-Authorization": localStorage.getItem("X-Authorization"),
        },
      });
      await updatedInfo.json().then((data) => {
        if (data.Status === "SUCCESS") {
          setTimeout(() => {
            window.location.reload();
          }, 2000);
          navigate("/school/parents");
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Grid container>
      <Box component="div" mb={4}>
        <Box component="div" sx={{ display: "flex", alignItems: "center" }}>
        <Box component="div" sx={{ display: "flex", alignItems: "center", cursor: "pointer" }} onClick={() => navigate(`/school/parent/${customerId}`)}>
          <ArrowBackIosIcon style={{ color: "#032541" }} />
            <Typography sx={{ color: "#032541", fontSize: "1.563rem", fontWeight: 700 }}>
          Edit {isSecondary ? "Secondary" : "Primary"} Parent Profile
          </Typography>
        </Box>        
      </Box>
        <Box component="div" sx={{mt:1}}>
          <Breadcrumbs separator={<FiberManualRecordIcon sx={{ fontSize: "0.625rem", fontFamily: "Poppins", color: "#e1e5e8" }} />} aria-label="breadcrumb">
            {breadcrumbs}
          </Breadcrumbs>
        </Box>
      </Box>
      <Grid container>
        <Grid container spacing={3} mb={2}>
          <Grid item>
            <TextField name="firstName" value={parentInfo.firstName} onChange={onInputChange} fullWidth type="text" InputProps={{ style: { fontFamily: "Poppins" } }} InputLabelProps={{ style: { fontFamily: "Poppins", fontSize: "13px", color: "#032541" } }} style={{ border: "solid 0px #e4e4e4", fontSize: "12px" }} id="outlined-basic" label="First Name" variant="outlined" required />
          </Grid>
          <Grid item>
            <TextField name="lastName" value={parentInfo?.lastName} onChange={onInputChange} fullWidth type="text" InputProps={{ style: { fontFamily: "Poppins" } }} InputLabelProps={{ style: { fontFamily: "Poppins", fontSize: "13px", color: "#032541" } }} style={{ border: "solid 0px #e4e4e4", fontSize: "12px" }} id="outlined-basic" label="Second Name" variant="outlined" required />
          </Grid>
        </Grid>
        <Grid container spacing={3} mb={2}>
          <Grid item>
            <TextField name="phone" value={parentInfo?.phone} onChange={onInputChange} fullWidth type="text" InputProps={{ style: { fontFamily: "Poppins" } }} InputLabelProps={{ style: { fontFamily: "Poppins", fontSize: "13px", color: "#032541" } }} style={{ border: "solid 0px #e4e4e4", fontSize: "12px" }} id="outlined-basic" label="Mobile Number" variant="outlined" required />
          </Grid>
          <Grid item>
            <TextField name="country" value={parentInfo?.country} onChange={onInputChange} fullWidth type="text" InputProps={{ style: { fontFamily: "Poppins" } }} InputLabelProps={{ style: { fontFamily: "Poppins", fontSize: "13px", color: "#032541" } }} style={{ border: "solid 0px #e4e4e4", fontSize: "12px" }} id="outlined-basic" label="Address" variant="outlined" required />
          </Grid>
        </Grid>
        <Grid container spacing={3} mb={2}>
          <Grid item>
            <TextField name="email" value={parentInfo?.email} onChange={onInputChange} fullWidth type="text" InputProps={{ style: { fontFamily: "Poppins" } }} InputLabelProps={{ style: { fontFamily: "Poppins", fontSize: "13px", color: "#032541" } }} style={{ border: "solid 0px #e4e4e4", fontSize: "12px" }} id="outlined-basic" label="Email" variant="outlined" required />
          </Grid>
          <Grid item>
            <TextField name="id_number" value={parentInfo?.id_number} onChange={onInputChange} fullWidth type="text" InputProps={{ style: { fontFamily: "Poppins" } }} InputLabelProps={{ style: { fontFamily: "Poppins", fontSize: "13px", color: "#032541" } }} style={{ border: "solid 0px #e4e4e4", fontSize: "12px" }} id="outlined-basic" label="ID Number" variant="outlined" required />
          </Grid>
        </Grid>
        <Grid item style={{ marginLeft: "17%" , marginTop: "20px", display: "flex", justifyContent: "center" }}>
          <Button style={{ background: "#fff", color: "#dc3545", padding: "12.5px 36.7px 12.5px 38.3px", border: "2px solid #dc3545" }} onClick={() => navigate(`/school/parent/${customerId}`)}>Cancel</Button>
          <Button onClick={editUserInfo} style={{ background: "#032541", marginLeft: "20px", color: "#fff",  padding: "12.5px 36.7px 12.5px 38.3px" }}>
            Update
          </Button>
        </Grid>
      </Grid>
      <Snackbar open={openSnack} autoHideDuration={2000} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
        <Alert severity="success" sx={{ width: "100%" }}>
          <span>{message}</span>
        </Alert>
      </Snackbar>
    </Grid>
  );
};
export default ParentEdit;
