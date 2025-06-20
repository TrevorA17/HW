import {
  Typography,
  Button,
  Box,
  Grid,
  Breadcrumbs,
  TextField,
  Snackbar,
  Alert,
  CircularProgress
} from "@mui/material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setParentToAdd } from "../../../features/customerSlice";


let baseUrl = import.meta.env.VITE_BASE_URL;

const AddSecondaryParent = () => {
  const { customerId } = useParams();
  const navigate = useNavigate();

  const [openSnack, setOpenSnack] = useState(false);
  const [openErrorSnack, setOpenErrorSnack] = useState(false);
  const [message, setMessage] = useState("Secondary parent successfully added.");
  const [loading, setLoading] = useState(false);
  
  const [parentInfo, setParentInfo] = useState({
    firstName: "",
    lastName: "",
    country: "",
    phone: "",
    email: "",
    id_number: "",
    customerType: "Individual",
    isParentPrimary: false,
    parentType: "Secondary",
    primaryParentReference: customerId
  });

  const [errors, setErrors] = useState({
    firstName: false,
    lastName: false,
    phone: false,
    email: false
  });

  const validateForm = () => {
    const newErrors = {
      firstName: !parentInfo.firstName.trim(),
      lastName: !parentInfo.lastName.trim(),
      phone: !parentInfo.phone.trim(),
      email: !/^\S+@\S+\.\S+$/.test(parentInfo.email)
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some(Boolean);
  };

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setParentInfo({ ...parentInfo, [name]: value });
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: false });
    }
  };

  const breadcrumbs = [
    <Typography key="X" sx={{ color: "#707070", fontSize: "0.875rem" }}>
      Dashboard
    </Typography>,
    <Typography key="B" sx={{ color: "#707070", fontSize: "0.875rem" }}>
      Parents/Guardians
    </Typography>,
    <Typography key="C" sx={{ color: "#707070", fontSize: "0.875rem" }}>
      Parent Profile
    </Typography>,
    <Typography key="E" sx={{ color: "#DC3545", fontSize: "0.875rem" }}>
      Add Secondary Parent
    </Typography>
  ];


const proceedWithFlow = () => {
  if (!validateForm()) {
    setMessage("Please fill all required fields correctly");
    setOpenErrorSnack(true);
    return;
  }

  // Pass parentInfo as state to new flow
  navigate(`/school/parent/add/secondary/${customerId}`, {
    state: { secondaryParent: parentInfo }
  });
};

  return (
    <Grid container>
      <Box component="div" mb={4}>
        <Box
          component="div"
          sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
          onClick={() => navigate(`/school/parent/${customerId}`)}
        >
          <ArrowBackIosIcon style={{ color: "#032541" }} />
          <Typography sx={{ color: "#032541", fontSize: "1.563rem", fontWeight: 700 }}>
            Add Secondary Parent
          </Typography>
        </Box>

        <Box component="div" sx={{ mt: 1 }}>
          <Breadcrumbs
            separator={
              <FiberManualRecordIcon
                sx={{
                  fontSize: "0.625rem",
                  fontFamily: "Poppins",
                  color: "#e1e5e8"
                }}
              />
            }
            aria-label="breadcrumb"
          >
            {breadcrumbs}
          </Breadcrumbs>
        </Box>
      </Box>

      {/* FORM */}
      <Grid container>
        <Grid container spacing={3} mb={2}>
          <Grid item>
            <TextField
              name="firstName"
              value={parentInfo.firstName}
              onChange={onInputChange}
              fullWidth
              type="text"
              InputProps={{ style: { fontFamily: "Poppins" } }}
              InputLabelProps={{
                style: { fontFamily: "Poppins", fontSize: "13px", color: "#032541" }
              }}
              style={{ border: errors.firstName ? "solid 1px #dc3545" : "solid 0px #e4e4e4", fontSize: "12px" }}
              label="First Name"
              variant="outlined"
              required
              error={errors.firstName}
              helperText={errors.firstName ? "First name is required" : ""}
              sx={{ width: '260px' }} 
            />
          </Grid>
          <Grid item>
            <TextField
              name="lastName"
              value={parentInfo.lastName}
              onChange={onInputChange}
              fullWidth
              type="text"
              InputProps={{ style: { fontFamily: "Poppins" } }}
              InputLabelProps={{
                style: { fontFamily: "Poppins", fontSize: "13px", color: "#032541" }
              }}
              style={{ border: errors.lastName ? "solid 1px #dc3545" : "solid 0px #e4e4e4", fontSize: "12px" }}
              label="Last Name"
              variant="outlined"
              required
              error={errors.lastName}
              helperText={errors.lastName ? "Last name is required" : ""}
              sx={{ width: '260px' }} 
            />
          </Grid>
        </Grid>

        <Grid container spacing={3} mb={2}>
          <Grid item>
            <TextField
              name="phone"
              value={parentInfo.phone}
              onChange={onInputChange}
              fullWidth
              type="tel"
              InputProps={{ style: { fontFamily: "Poppins" } }}
              InputLabelProps={{
                style: { fontFamily: "Poppins", fontSize: "13px", color: "#032541" }
              }}
              style={{ border: errors.phone ? "solid 1px #dc3545" : "solid 0px #e4e4e4", fontSize: "12px" }}
              label="Mobile Number"
              variant="outlined"
              required
              error={errors.phone}
              helperText={errors.phone ? "Phone number is required" : ""}
              sx={{ width: '260px' }} 
            />
          </Grid>
          <Grid item>
            <TextField
              name="email"
              value={parentInfo.email}
              onChange={onInputChange}
              fullWidth
              type="email"
              InputProps={{ style: { fontFamily: "Poppins" } }}
              InputLabelProps={{
                style: { fontFamily: "Poppins", fontSize: "13px", color: "#032541" }
              }}
              style={{ border: errors.email ? "solid 1px #dc3545" : "solid 0px #e4e4e4", fontSize: "12px" }}
              label="Email"
              variant="outlined"
              required
              error={errors.email}
              helperText={errors.email ? "Valid email is required" : ""}
              sx={{ width: '260px' }} 
            />
          </Grid>
        </Grid>

        <Grid container spacing={3} mb={2}>
          <Grid item>
            <TextField
              name="country"
              value={parentInfo.country}
              onChange={onInputChange}
              fullWidth
              type="text"
              InputProps={{ style: { fontFamily: "Poppins" } }}
              InputLabelProps={{
                style: { fontFamily: "Poppins", fontSize: "13px", color: "#032541" }
              }}
              style={{ border: "solid 0px #e4e4e4", fontSize: "12px" }}
              label="Address"
              variant="outlined"
              sx={{ width: '260px' }} 
            />
          </Grid>
          <Grid item>
            <TextField
              name="id_number"
              value={parentInfo.id_number}
              onChange={onInputChange}
              fullWidth
              type="text"
              InputProps={{ style: { fontFamily: "Poppins" } }}
              InputLabelProps={{
                style: { fontFamily: "Poppins", fontSize: "13px", color: "#032541" }
              }}
              style={{ border: "solid 0px #e4e4e4", fontSize: "12px" }}
              label="ID Number"
              variant="outlined"
              sx={{ width: '260px' }} 
            />
          </Grid>
        </Grid>

        {/* Buttons */}
        <Grid
          item
          style={{
            marginLeft: "23.5%",
            marginTop: "20px",
            display: "flex",
            justifyContent: "center"
          }}
        >
          <Button
            style={{
              background: "#fff",
              color: "#dc3545",
              padding: "12.5px 36.7px 12.5px 38.3px",
              border: "2px solid #dc3545"
            }}
            onClick={() => navigate(`/school/parent/${customerId}`)}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
          onClick={proceedWithFlow}
            style={{
              background: "#032541",
              marginLeft: "20px",
              color: "#fff",
              padding: "12.5px 36.7px 12.5px 38.3px"
            }}
            disabled={loading}
            startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
          >
            {loading ? "Adding..." : "Add"}
          </Button>
        </Grid>
      </Grid>

      {/* Success Snackbar */}
      <Snackbar
        open={openSnack}
        autoHideDuration={2000}
        onClose={() => setOpenSnack(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>

      {/* Error Snackbar */}
      <Snackbar
        open={openErrorSnack}
        autoHideDuration={6000}
        onClose={() => setOpenErrorSnack(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="error" sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </Grid>
  );
};

export default AddSecondaryParent;