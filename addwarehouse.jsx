import { Grid, TextField, Button, Breadcrumbs, MenuItem, Box } from "@mui/material";
import React, { useState, useEffect } from "react";
import { warehousestyles } from "../styles";
import PhoneInput from "react-phone-input-2";
import HttpComponent from "../../School/MakeRequest";
import { ErrorAlertRightAligned, SuccessAlertRightAligned } from "../../bills/startorderModals/modals";
import { NavigateNext } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router";
import { ArrowBackIos } from "@mui/icons-material";
import AddUser from "./addUser";
import GeoLocation from "../../../hooks/useLocation";

const Addwarehouse = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  const [warehouseDetails, setWarehouseDetails] = useState({ warehousename: "", warehouselocation: "" });
  const [allInputsFilled, setAllInputsFilled] = useState(false);
  const [operators, setOperators] = useState([]);
  const [selectedValue ,setSelectedValue] = useState('')


  const getUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setWarehouseDetails({ ...warehouseDetails, [name]: value });
  };

  const [assignedUserId, setAssignedUserId] = useState("");
  const changeUserInput = (e) => {
    setAssignedUserId(e.target.value);
  };

  useEffect(() => {
    if (warehouseDetails.warehousename && selectedValue) {
      setAllInputsFilled(true);
    } else if (warehouseDetails.warehousename === "" && selectedValue === "") {
      setAllInputsFilled(false);
    }
  }, [warehouseDetails.warehousename, selectedValue]);

  //   add warehouse
  const [success, setSucess] = useState({ state: false, message: "" });

  const addWarehouse = () => {
    setWarehouseDetails({ warehousename: "", warehouselocation: "" });
    
    HttpComponent({
      method: "POST",
      url: `/api/addStore`,
      body: assignedUserId ? {
        storeName: warehouseDetails.warehousename,
        location: selectedValue?.description,
        storeType: "Warehouse",
        assignedUserId: assignedUserId,
      } : {storeName: warehouseDetails.warehousename,
        location:selectedValue?.description,
        storeType: "Warehouse",},
      token: localStorage.getItem("X-Authorization"),
    })
      .then((data) => {
        if (data.status === 201) {
          setSucess({ state: true, message: "warehouse added successfully!" });
          setTimeout(() => {
            navigate(-1);
          }, 2000);
        } else if (data?.status === 400) {
          setError({ state: true, message: data?.response?.error });
        }

        setTimeout(() => {
          setSucess({ state: false });
        }, 3000);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // get single substore details;

  const getWarehouse = () => {
    HttpComponent({
      method: "GET",
      url: `/api/get_store_details?storeType=stores&storeId=${id}`,
      body: null,
      token: localStorage.getItem("X-Authorization"),
    })
      .then((data) => {
        if (data.status === 200) {
          const { name, location } = data.response.data[0];

          setWarehouseDetails({ warehousename: name });
          setSelectedValue(location)
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  useEffect(() => {
    if (id !== "addwarehouse") {
      getWarehouse();
    }
  }, [id]);

  const editWareHouse = () => {
    HttpComponent({
      method: "POST",
      url: `/api/update_stores_by_id?storeId=${id}`,
      body: { storeName: warehouseDetails?.warehousename, location: selectedValue?.description, assignedUserId: assignedUserId },
      token: localStorage.getItem("X-Authorization"),
    })
      .then((data) => {
        if (data.status === 202) {
          setSucess({ state: true, message: "Warehouse has been edited sucessfully!" });
          setTimeout(() => {
            setSucess({ state: false });
            navigate(-1);
          }, 2000);
        } else if (data?.status === 400) {
          setError({ state: true, message: data?.response?.error });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getActiveUser = () => {
    HttpComponent({
      method: "GET",
      url: `/api/listUsers/Active?page=${1}&limit=${1000}`,
      body: null,
      token: localStorage.getItem("X-Authorization"),
    })
      .then((data) => {
        //  get only storeoperators;

        // console.log("data?.response?.data ====<><>", data?.response?.data);
        const warehouseOperators = data?.response?.data?.filter((store) => {
          if (store.userRole === "STOREMANAGER") return store;
        });
        setOperators(warehouseOperators);
      })
      .catch((e) => {
        console.log(e.message);
      });
  };

  useEffect(() => {
    getActiveUser();
  }, []);

  const [isError, setError] = useState({ state: false, message: "" });
  const [isMissingQuan, setMissingQuan] = useState({ state: false, message: "" });
  const [isSuccess, setSuccess] = useState({ state: false, message: "" });

  const errorMessage = <ErrorAlertRightAligned error={isError.state} message={isError.message} />;
  const successMessage = <SuccessAlertRightAligned sucess={isSuccess.state} message={isSuccess.message} />;

  useEffect(() => {
    if (isSuccess.state) {
      setTimeout(() => {
        setSuccess({ state: false });
        navigate(`/addwarehouse/addwarehouse`);
      }, 2000);
    }

    if (isError.state) {
      setTimeout(() => {
        setError({ state: false });
      }, 2000);
    }
  }, [isSuccess.state, isError.state]);

  return (
    <div style={warehousestyles.mainDivStyling}>
      {isError.state && errorMessage}

      {isSuccess.state && successMessage}

      <Grid container style={warehousestyles.gridContainerMargin}>
        <Grid item>
          <span onClick={() => navigate(`/warehouses`)} style={warehousestyles.supplierText}>
            {" "}
            <ArrowBackIos style={{ cursor: "pointer" }} /> Warehouses
          </span>
        </Grid>
      </Grid>
      <Grid container style={warehousestyles.gridContainerMargin}>
        <Grid item>
          <Breadcrumbs separator={<NavigateNext fontSize="small" />} aria-label="breadcrumb">
            <span>Dashboard</span>
            <span onClick={() => navigate(-1)}>Warehouses</span>
            {id === "addwarehouse" ? <span style={{ color: "red" }}>Add Warehouse</span> : id === "addOperator" ? <span style={{ color: "red" }}>Add Operator</span> : <span style={{ color: "red" }}>Edit Warehouse</span>}
          </Breadcrumbs>
        </Grid>
      </Grid>

      {id === "addOperator" ? (
        <AddUser storeTypeToAdd={"Warehouse"} />
      ) : (
        <>
          <Grid container direction={"column"} width={"100%"}>
            <Grid item style={warehousestyles.addsupplierGridItems}>
              <TextField name="warehousename" value={warehouseDetails.warehousename} onChange={getUserInput} style={warehousestyles.addsupplierInputs} label="Warehouse Name" variant="outlined" />
            </Grid>

            <Grid item style={{}}>
              <GeoLocation sx={{width:"410px" , marginBottom:"30px", marginRight:"10px"}} onValueChange={(location)=>setSelectedValue(location)} selectedValue={selectedValue}/>
              {/* <TextField name="warehouselocation" value={warehouseDetails.warehouselocation} onChange={getUserInput} style={warehousestyles.addsupplierInputs} label="warehouselocation" variant="outlined" /> */}
            </Grid>

            <Grid item style={warehousestyles.addsupplierGridItems}>
              <TextField id="outlined-select-currency" style={{ width: "50%" }} select label="Assign User(Optional)" onChange={changeUserInput}>
                <MenuItem id="outlined-select-currency" onClick={() => navigate(`/addwarehouse/addOperator`)}>
                  Create User
                </MenuItem>

                {operators?.map((option) => (
                  <MenuItem key={option._id} value={option?.userId}>
                    {option?.userName}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item style={warehousestyles.addsupplierGridItems}>
              <div style={warehousestyles.rightAlignedButtonHolder}>
                {id === "addwarehouse" ? (
                  <Button style={!allInputsFilled ? warehousestyles.createcustomerInactiveBtn : warehousestyles.createCustomerActiveBtn} onClick={() => (allInputsFilled ? addWarehouse() : null)}>
                    Add
                  </Button>
                ) : (
                  <Button style={!allInputsFilled ? warehousestyles.createcustomerInactiveBtn : warehousestyles.createCustomerActiveBtn} onClick={() => (allInputsFilled ? editWareHouse() : null)}>
                    Update
                  </Button>
                )}
              </div>
            </Grid>
          </Grid>
        </>
      )}

      {/* {success && <SuccessAlertRightAligned message={success.message} sucess={success.state} />} */}
    </div>
  );
};

export default Addwarehouse;
