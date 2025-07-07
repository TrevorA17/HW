import React, { useState, useEffect, useContext } from "react";
import { warehousestyles } from "../styles";
import { Grid, Button, Breadcrumbs, Tab, styled, List, ListItem, Box} from "@mui/material";
import HttpComponent from "../../School/MakeRequest";
import CustomDataGrid from "../../products/stockComponents/customDataGrid";
import { Edit, DeleteOutline, CheckCircle, Cancel, RestoreFromTrash, Block} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { TokenContext } from "../../../context/TokenComponent";
import { Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText, Typography} from "@mui/material";
import { ErrorAlertRightAligned, SuccessAlertRightAligned } from "../../bills/startorderModals/modals";



const Activemainstore = (selectedTab) => {
  const navigate = useNavigate();
  const {  branchText } = useContext(TokenContext)
  const [mainStores, setMainStores] = useState([]);
  const [openApproveDialog, setOpenApproveDialog] = useState(false);
  const [openDeclineDialog, setOpenDeclineDialog] = useState(false);
  const [selectedStoreId, setSelectedStoreId] = useState(null);
  const [approveDialogOpen, setApproveDialogOpen] = useState(false);
  const [isSuccess, setSuccess] = useState({ state: false, message: "" });
  const [isError, setError] = useState({ state: false, message: "" });
  const [openRestoreDialog, setOpenRestoreDialog] = useState(false);
  const [openBlockDialog, setOpenBlockDialog] = useState(false);



  // DataGrid Pagination
  const [dataGridPageSize, setPageSize] = React.useState(5);
  const [pageState, setPageState] = useState({ isLoading: true, data: [], total: 0, page: 1, pageSize: dataGridPageSize });
  const statusMap =["ACTIVE", "EDITED", "DEACTIVATION_REQUEST", "INACTIVE"];
  const statusToQuery = statusMap[selectedTab?.selectedTab] || "ACTIVE";

  const handleOpenApproveDialog = (storeId) => {
  setSelectedStoreId(storeId);
  setOpenApproveDialog(true);
};

const handleOpenDeclineDialog = (storeId) => {
  setSelectedStoreId(storeId);
  setOpenDeclineDialog(true);
};

const handleCloseDialogs = () => {
  setOpenApproveDialog(false);
  setOpenDeclineDialog(false);
  setSelectedStoreId(null);
};

const handleApproveStore = async () => {
  try {
    const storeDetailsRes = await HttpComponent({
      method: "GET",
      url: `/api/get_store_details?storeType=stores&storeId=${selectedStoreId}`,
      body: null,
      token: localStorage.getItem("X-Authorization"),
    });

    if (storeDetailsRes.status !== 200 || !storeDetailsRes.response?.data?.length) {
      return setError({ state: true, message: "Failed to fetch store details." });
    }

    const store = storeDetailsRes.response.data.find((s) => s._id === selectedStoreId);
    const storeName = store?.name || "";
    const assignedUserId = store?.storeUsers?.[0]?.userId || ""; 

    const updateRes = await HttpComponent({
      method: "POST",
      url: `/api/update_stores_by_id?storeId=${selectedStoreId}`,
      body: {
        storeName,
        assignedUserId,
        status: "ACTIVE",
      },
      token: localStorage.getItem("X-Authorization"),
    });

    if (updateRes.status === 202) {
      setSuccess({ state: true, message: "Store Edit Approved Successfully!" });
      getMainStores(); 
      setTimeout(() => {
        setSuccess({ state: false });
        setApproveDialogOpen(false);
      }, 2000);
    } else {
      setError({ state: true, message: updateRes.response?.message || "Approval failed." });
    }
  } catch (error) {
    setError({ state: true, message: error.message || "Unexpected error during approval." });
  }
};

const handleStatusChange = async (newStatus) => {
  try {
    const storeDetailsRes = await HttpComponent({
      method: "GET",
      url: `/api/get_store_details?storeType=stores&storeId=${selectedStoreId}`,
      body: null,
      token: localStorage.getItem("X-Authorization"),
    });

    if (storeDetailsRes.status !== 200 || !storeDetailsRes.response?.data?.length) {
      return setError({ state: true, message: "Failed to fetch store details." });
    }

    const store = storeDetailsRes.response.data.find((s) => s._id === selectedStoreId);
    const storeName = store?.name || "";
    const assignedUserId = store?.storeUsers?.[0]?.userId || "";

    const updateRes = await HttpComponent({
      method: "POST",
      url: `/api/update_stores_by_id?storeId=${selectedStoreId}`,
      body: {
        storeName,
        assignedUserId,
        status: newStatus,
      },
      token: localStorage.getItem("X-Authorization"),
    });

    if (updateRes.status === 202) {
      setSuccess({ state: true, message: `Store status updated to ${newStatus}.` });
      getMainStores();
      setTimeout(() => {
        setSuccess({ state: false });
      }, 2000);
    } else {
      setError({ state: true, message: updateRes.response?.message || "Update failed." });
    }
  } catch (error) {
    setError({ state: true, message: error.message || "Unexpected error." });
  }
};
const handleRestoreStore = async () => {
  try {
    const storeDetailsRes = await HttpComponent({
      method: "GET",
      url: `/api/get_store_details?storeType=stores&storeId=${selectedStoreId}`,
      body: null,
      token: localStorage.getItem("X-Authorization"),
    });

    if (storeDetailsRes.status !== 200 || !storeDetailsRes.response?.data?.length) {
      return setError({ state: true, message: "Failed to fetch store details." });
    }

    const store = storeDetailsRes.response.data.find((s) => s._id === selectedStoreId);
    const storeName = store?.name || "";
    const assignedUserId = store?.storeUsers?.[0]?.userId || "";

    const updateRes = await HttpComponent({
      method: "POST",
      url: `/api/update_stores_by_id?storeId=${selectedStoreId}`,
      body: {
        storeName,
        assignedUserId,
        status: "ACTIVE",
      },
      token: localStorage.getItem("X-Authorization"),
    });

    if (updateRes.status === 202) {
      setSuccess({ state: true, message: "Store successfully restored to ACTIVE!" });
      getMainStores();
      setTimeout(() => {
        setSuccess({ state: false });
        setApproveDialogOpen(false);
      }, 2000);
    } else {
      setError({ state: true, message: updateRes.response?.message || "Restoration failed." });
    }
  } catch (error) {
    setError({ state: true, message: error.message || "Unexpected error during restoration." });
  }
};

  const getMainStores = () => {
    HttpComponent({
      method: "GET",
      url: `/api/list_all_stores_by_type_status?storeType=MainStore&status=${statusToQuery}&page=1&limit=1000`,
      body: null,
      token: localStorage.getItem("X-Authorization"),
    })
      .then((data) => {
        console.log(data);

        if (data.status === 200) {
          setPageState({ ...pageState, data: data.response.data, isLoading: false });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getMainStores();
  }, [statusToQuery]);

  // console.log(pageState.data);

  const mainStoresColumn = [
    { field: "name", headerName: "Name", flex: 1 , renderHeader:()=>(<span style={{ fontWeight:"700", fontSize:"14px"}}>Name</span>)},
    { field: "branchName", headerName: `${branchText} Name`, flex: 1 , renderHeader:()=>(<span style={{ fontWeight:"700", fontSize:"14px"}}>{`${branchText} Name`}</span>)},
    {
      field: "Action",
      headerName: "Action",
      flex: 1,
      renderHeader:()=>(<span style={{ fontWeight:"700", fontSize:"14px"}}>Action</span>),
     renderCell: (params) => {
      const storeId = params?.row?.storeId;
      const isEditedTab = selectedTab?.selectedTab === 1;
      const isDeactivationTab = selectedTab?.selectedTab === 2;
      const isInactiveTab = selectedTab?.selectedTab === 3;

      if (isEditedTab) {
            return (
              <>
                <CheckCircle
                  style={{ cursor: "pointer", color: "green", marginRight: 10 }}
                  onClick={() => {
                    setSelectedStoreId(storeId);
                    setApproveDialogOpen(true);
                  }}
                />
                <Cancel
                  style={{ cursor: "pointer", color: "red" }}
                  onClick={() => {
                    setSelectedStoreId(storeId);
                    setOpenDeclineDialog(true);
                  }}
                />
              </>
            );
          }

          if (isDeactivationTab) {
            return (
              <>
                <RestoreFromTrash
                  style={{ cursor: "pointer", color: "#2e7d32", marginRight: 10 }}
                  onClick={() => {
                    setSelectedStoreId(storeId);
                  setApproveDialogOpen(true);
                  }}
                />
                <Block
                  style={{ cursor: "pointer", color: "red" }}
                  onClick={() => {
                    setSelectedStoreId(storeId);
                    setOpenDeclineDialog(true); 
                  }}
                />
              </>
            );
          }

          if (isInactiveTab) {
            return (
              <RestoreFromTrash
                style={{ cursor: "pointer", color: "green" }}
                onClick={() => {
                  setSelectedStoreId(storeId);
                  setApproveDialogOpen(true); 
                }}
              />
            );
      }

      // Default for ACTIVE tab
      return (
        <>
          <Edit
            style={{ cursor: "pointer", marginRight: 10 }}
            onClick={() =>
              navigate(`/mainstores/editUser/?${params?.row?.storeId}?${params?.row?.branchName}`)
            }
          />
          <DeleteOutline
            style={{ cursor: "pointer", color: "red" }}
            onClick={() => {
              setSelectedStoreId(storeId);
              setOpenDeclineDialog(true); 
            }}
          />
        </>
      );
    },

        },
      ];

      const mainStoreData = pageState.data.map((store, index) => ({
        id: index,
        name: store?.name,
        branchName: store?.branchName,
        storeId: store._id,
      }));

    const handleDeclineOrDeactivate = async () => {
      try {
        const storeDetailsRes = await HttpComponent({
          method: "GET",
          url: `/api/get_store_details?storeType=stores&storeId=${selectedStoreId}`,
          body: null,
          token: localStorage.getItem("X-Authorization"),
        });

        if (storeDetailsRes.status !== 200 || !storeDetailsRes.response?.data?.length) {
          return setError({ state: true, message: "Failed to fetch store details." });
        }

        const store = storeDetailsRes.response.data.find((s) => s._id === selectedStoreId);
        const storeName = store?.name || "";
        const assignedUserId = store?.storeUsers?.[0]?.userId || "";

        // ✅ Determine status based on current tab
        const isDeactivationTab = selectedTab?.selectedTab === 2;
        const statusToSet = isDeactivationTab ? "INACTIVE" : "DEACTIVATION_REQUEST";

        const updateRes = await HttpComponent({
          method: "POST",
          url: `/api/update_stores_by_id?storeId=${selectedStoreId}`,
          body: {
            storeName,
            assignedUserId,
            status: statusToSet,
          },
          token: localStorage.getItem("X-Authorization"),
        });

        if (updateRes.status === 202) {
          const message = isDeactivationTab
            ? "Store successfully inactivated."
            : "Deactivation request sent successfully!";
          setSuccess({ state: true, message });
          getMainStores();
          setTimeout(() => {
            setSuccess({ state: false });
            handleCloseDialogs();
          }, 2000);
        } else {
          setError({ state: true, message: updateRes.response?.message || "Request failed." });
        }
      } catch (error) {
        setError({ state: true, message: error.message || "Unexpected error during request." });
      }
    };

  return (  
    <div>
      {isSuccess.state && <SuccessAlertRightAligned sucess={isSuccess.state} message={isSuccess.message} />}
      {isError.state && <ErrorAlertRightAligned error={isError.state} message={isError.message} />}
      <Grid container width={"100%"}>
        <CustomDataGrid column={mainStoresColumn} setPageSize={setPageSize} setPageState={setPageState} pageState={pageState} dataGridPageSize={dataGridPageSize} row={mainStoreData} />
      </Grid>
        {/* Decline / Deactivate Dialog */}
      <Dialog
        open={openDeclineDialog}
        onClose={handleCloseDialogs}
        PaperProps={{ sx: { width: "380px", maxWidth: "100%" } }}
      >
        <DialogTitle sx={{ textAlign: "center", px: 3, pt: 3 }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              color: "#032541",
              fontSize: "16px",
              fontFamily: "Poppins",
              mb: 1,
            }}
          >
            {selectedTab?.selectedTab === 2 ? "Inactivate Store" : "Deactivate Branch"}
          </Typography>
          <DialogContentText
            sx={{ fontFamily: "Poppins", fontSize: "14px", textAlign: "center" }}
          >
            {selectedTab?.selectedTab === 2
              ? "Are you sure you want to permanently inactivate this store?"
              : "Are you sure you want to deactivate this branch?"}
          </DialogContentText>
        </DialogTitle>
        <DialogActions sx={{ justifyContent: "center", pb: 3 }}>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              onClick={handleCloseDialogs}
              sx={{
                height: "45px",
                width: "125px",
                borderRadius: "4px",
                border: "1px solid #002543",
                color: "#002543",
                fontSize: "14px",
                fontWeight: 500,
                fontFamily: "Poppins",
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleDeclineOrDeactivate}
              variant="contained"
              color="error"
              sx={{
                height: "45px",
                width: "125px",
                fontSize: "14px",
                fontWeight: 600,
                fontFamily: "Poppins",
              }}
            >
              Confirm
            </Button>
          </Box>
        </DialogActions>
      </Dialog>

      {/* Restore Dialog */}
      <Dialog
        open={openRestoreDialog}
        onClose={() => setOpenRestoreDialog(false)}
        PaperProps={{ sx: { width: "380px", maxWidth: "100%" } }}
      >
        <DialogTitle sx={{ textAlign: "center", px: 3, pt: 3 }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              color: "#032541",
              fontSize: "16px",
              fontFamily: "Poppins",
              mb: 1,
            }}
          >
            Restore Store
          </Typography>
          <DialogContentText
            sx={{ fontFamily: "Poppins", fontSize: "14px", textAlign: "center" }}
          >
            Are you sure you want to restore this store to active status?
          </DialogContentText>
        </DialogTitle>
        <DialogActions sx={{ justifyContent: "center", pb: 3 }}>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              onClick={() => setOpenRestoreDialog(false)}
              sx={{
                height: "45px",
                width: "125px",
                borderRadius: "4px",
                border: "1px solid #002543",
                color: "#002543",
                fontSize: "14px",
                fontWeight: 500,
                fontFamily: "Poppins",
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                handleStatusChange("ACTIVE");
                setOpenRestoreDialog(false);
              }}
              variant="contained"
              color="primary"
              sx={{
                height: "45px",
                width: "125px",
                fontSize: "14px",
                fontWeight: 600,
                fontFamily: "Poppins",
              }}
            >
              Confirm
            </Button>
          </Box>
        </DialogActions>
      </Dialog>

      {/* Block (Inactivate) Dialog */}
      <Dialog
        open={openBlockDialog}
        onClose={() => setOpenBlockDialog(false)}
        PaperProps={{ sx: { width: "380px", maxWidth: "100%" } }}
      >
        <DialogTitle sx={{ textAlign: "center", px: 3, pt: 3 }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              color: "#032541",
              fontSize: "16px",
              fontFamily: "Poppins",
              mb: 1,
            }}
          >
            Inactivate Store
          </Typography>
          <DialogContentText
            sx={{ fontFamily: "Poppins", fontSize: "14px", textAlign: "center" }}
          >
            Are you sure you want to permanently inactivate this store?
          </DialogContentText>
        </DialogTitle>
        <DialogActions sx={{ justifyContent: "center", pb: 3 }}>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              onClick={() => setOpenBlockDialog(false)}
              sx={{
                height: "45px",
                width: "125px",
                borderRadius: "4px",
                border: "1px solid #002543",
                color: "#002543",
                fontSize: "14px",
                fontWeight: 500,
                fontFamily: "Poppins",
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                handleStatusChange("INACTIVE");
                setOpenBlockDialog(false);
              }}
              variant="contained"
              color="error"
              sx={{
                height: "45px",
                width: "125px",
                fontSize: "14px",
                fontWeight: 600,
                fontFamily: "Poppins",
              }}
            >
              Confirm
            </Button>
          </Box>
        </DialogActions>
      </Dialog>

      {/* Approve or Restore Dialog */}
      <Dialog
        open={approveDialogOpen}
        onClose={() => setApproveDialogOpen(false)}
        PaperProps={{ sx: { width: "380px", maxWidth: "100%" } }}
      >
        <DialogTitle sx={{ textAlign: "center", px: 3, pt: 3 }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              color: "#032541",
              fontSize: "16px",
              fontFamily: "Poppins",
              mb: 1,
            }}
          >
            {(selectedTab?.selectedTab === 3 || selectedTab?.selectedTab === 2)
              ? "Restore Store"
              : "Approve Store Edit"}
          </Typography>
          <DialogContentText
            sx={{ fontFamily: "Poppins", fontSize: "14px", textAlign: "center" }}
          >
            {(selectedTab?.selectedTab === 3 || selectedTab?.selectedTab === 2)
              ? "Are you sure you want to restore this store to ACTIVE?"
              : "Are you sure you want to approve the edited branch?"}
          </DialogContentText>
        </DialogTitle>
        <DialogActions sx={{ justifyContent: "center", pb: 3 }}>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              onClick={() => setApproveDialogOpen(false)}
              sx={{
                height: "45px",
                width: "125px",
                borderRadius: "4px",
                border: "1px solid #002543",
                color: "#002543",
                fontSize: "14px",
                fontWeight: 500,
                fontFamily: "Poppins",
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                if (selectedTab?.selectedTab === 3 || selectedTab?.selectedTab === 2) {
                  handleRestoreStore();
                } else {
                  handleApproveStore();
                }
              }}
              variant="contained"
              color="primary"
              sx={{
                height: "45px",
                width: "125px",
                fontSize: "14px",
                fontWeight: 600,
                fontFamily: "Poppins",
              }}
            >
              {selectedTab?.selectedTab === 3 ? "Restore" : "Approve"}
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
    </div>   
  );  
};

export default Activemainstore;
