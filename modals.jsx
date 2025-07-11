import React from "react";
import { Modal, Button, Box, Typography } from "@mui/material";
import { warehousestyles } from "./styles";
import powericon from "../../common/images/warning.svg";
import restore from "../../common/images/restore-icn.svg";

export const Suspendsuppliermodal = (props) => {
  const openSuspendModal = props.openSuspendModal;
  const setSuspendModal = props.setSuspendModal;
  const supplierToSuspendName = props.supplierToSuspendName;
  const suspendSupplier = props.suspendSupplier;

  // suspendwarehouse
  const suspendWareHouseName = props.suspendWareHouseName;
  const suspendWareHouse = props.suspendWareHouse;
  const warehousesToBeSuspended = props.warehousesToBeSuspended;

  // suspend substores
  const storesToBeSuspended = props.storesToBeSuspended;
  const storeNameToSuspend = props.storeNameToSuspend;
  const suspendSubstore = props.suspendSubstore;
  return (
    <Modal open={openSuspendModal} onClose={() => setSuspendModal(false)}>
    <Box
      sx={{
        width: "360px",
        maxWidth: "90%",
        bgcolor: "#fff",
        borderRadius: "12px",
        p: 3,
        fontFamily: "Poppins",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)",
      }}
    >
      <Box sx={{ display: "flex", gap: 2 }}>
        <img src={powericon} alt="power icon" width={60} height={60} />
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 600, color: "#032541", fontSize: "18px" }}> {suspendWareHouseName ? "Suspend Warehouse?" : storeNameToSuspend ? "Suspend Sub Store?" : "Suspend Supplier?"}</Typography>
          <Typography sx={{ fontSize: "15px", color: "#323d52", mt: 1 }}> Selected{" "} {suspendWareHouseName? "warehouse" : storeNameToSuspend ? "sub store" : "supplier"}{" "} will be suspended and no longer listed when managing stores. </Typography>
          {(supplierToSuspendName || suspendWareHouseName || storeNameToSuspend) && (
          <Typography sx={{ fontSize: "15px", color: "#323d52", mt: 1 }}> {suspendWareHouseName || storeNameToSuspend || supplierToSuspendName} </Typography> )}
          <Box sx={{ display: "flex", justifyContent: "center", mt: 3, gap: 2, ml:-2 }}>
            <Button onClick={() => setSuspendModal(false)} sx={{ border: "1px solid #032541", color: "#032541", height: 45, width: 120, fontFamily: "Poppins", fontWeight: 500, textTransform: "none", }}> Cancel </Button>
            <Button variant="contained" color="error" onClick={() => suspendWareHouseName || warehousesToBeSuspended ? suspendWareHouse() : storesToBeSuspended || storeNameToSuspend ? suspendSubstore() : suspendSupplier()} sx={{ height: 45, width: 120, fontFamily: "Poppins", fontWeight: 600, textTransform: "none", }}> Suspend </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  </Modal>
  );
};

export const Reactivatesuppliermodal = (props) => {
  const reactivateSupplier = props.reactivateSupplier;
  const setReactivateSupplier = props.setReactivateSupplier;
  const reactivateName = props.reactivateName;
  const reactivateId = props.reactivateId;
  const reactivateCustomer = props.reactivateCustomer;
  const suppliersToBeActivated = props.suppliersToBeActivated;

  // reactivate warehouse;
  const reactivateWarehouseName = props.reactivateWarehouseName;
  const reactivateWarehouse = props.reactivateWarehouse;
  const reactivateSubstores = props.reactivateSubstores;
  const reactivateSubstoreName = props.reactivateSubstoreName;
  const substoresToBeReactivated = props.substoresToBeReactivated;

  return (
    <Modal open={reactivateSupplier} onClose={() => setReactivateSupplier(false)}>
      <Box
        sx={{
          width: "360px",
          maxWidth: "90%",
          bgcolor: "#fff",
          borderRadius: "12px",
          p: 3,
          fontFamily: "Poppins",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)",
        }}
      >
        <Box sx={{ display: "flex", gap: 2 }}>
          <img src={restore} alt="reactivate icon" width={60} height={60} />
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 600, color: "#032541", fontSize: "18px" }}> Reactivate{" "} {reactivateWarehouseName? "Warehouse?" : reactivateSubstoreName ? "Substore?" : "Supplier?"} </Typography>
            <Typography sx={{ fontSize: "15px", color: "#323d52", mt: 1 }}> Selected{" "} {reactivateWarehouseName ? "warehouse" : reactivateSubstoreName? "substore" : "supplier"}{" "} will be reactivated and listed when managing stores. </Typography>
            {(reactivateName || reactivateWarehouseName || reactivateSubstoreName) && (
              <Typography sx={{ fontSize: "15px", color: "#323d52", mt: 1 }}> {reactivateWarehouseName || reactivateSubstoreName || reactivateName}</Typography> )}
            <Box sx={{ display: "flex", justifyContent: "center", mt: 3, gap: 2, ml: -2 }}>
              <Button onClick={() => setReactivateSupplier(false)} sx={{ border: "1px solid #032541", color: "#032541", height: 45, width: 120, fontFamily: "Poppins", fontWeight: 500, textTransform: "none", }}> Cancel </Button>
              <Button variant="contained" sx={{ backgroundColor: "#17ae7b", "&:hover": { backgroundColor: "#129867" }, color: "#fff", height: 45, width: 120, fontFamily: "Poppins", fontWeight: 600, textTransform: "none", }} onClick={() => reactivateName || suppliersToBeActivated ? reactivateCustomer() : reactivateSubstoreName || substoresToBeReactivated ? reactivateSubstores() : reactivateWarehouse() } > Activate </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Modal>

  );
};
