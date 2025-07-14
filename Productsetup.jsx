import { Typography, Breadcrumbs, Grid, Button, FormControl, Select, MenuItem, Modal, Box, Tab, InputLabel, Checkbox, DialogContent, DialogTitle, DialogContentText, DialogActions, Dialog, Slide } from "@mui/material";
import { forwardRef, useEffect, useState } from "react";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import EditIcon from '@mui/icons-material/Edit';
import CustomSearchInput from "../../School/CustomSearchInput";
import DeleteIcon from '@mui/icons-material/Delete';
import { DataGrid } from "@mui/x-data-grid";
import HttpComponent from "../../School/MakeRequest";
import { useSelector } from "react-redux";
import { NoRowsOverlay } from "../../No Rows/noRowsOverlay";
import CreateProductService from "./createnewproductcategory";
import WarningImg from "../../../images/warning.png"
import { useNavigate } from "react-router-dom";
import TabList from "@mui/lab/TabList";
import { styled } from "@mui/material/styles";
import { TabContext, TabPanel } from "@mui/lab";
import restoreImg from '../../../images/restoreImg.svg'
import ApprovImg from '../../../images/actImg.svg'
import DateFormatter from "../../../utils/dateFormatter";
import DeImg from '../../../images/crosImg.svg'
import { SuccessAlert } from "../../snackBar Alerts/successAlert";
import { ErrorAlert } from "../../snackBar Alerts/errorAlert";
import UploadFileIcon from '@mui/icons-material/UploadFile';
import {ProductCategoryUploadModal} from "../../Modals/Upload/ProductCategoryUploadModal";
import { Exports } from "../../customerAccounts/customerComponents/exports";

const baseUrl =  import.meta.env.VITE_BASE_URL

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


const breadcrumbs = [
    <Typography key="X" sx={{ color: "#707070", fontSize: "0.875rem" }}>
        Dashboard
    </Typography>,
    <Typography key={"add"} sx={{ color: "#dc3545", fontSize: "0.875rem" }}>
        Products / Services Categories
    </Typography>
];

// Custom Tab Styling
const AntTabs = styled(TabList)({ borderBottom: "0px solid #e8e8e8", "& .MuiTabs-indicator": { backgroundColor: "#dc3545" } });

const AntTab = styled((props) => <Tab disableRipple {...props} />)(({ theme }) => ({
    textTransform: "none", minWidth: 0, [theme.breakpoints.up("sm")]: { minWidth: 0 },
    fontWeight: theme.typography.fontWeightRegular, marginRight: theme.spacing(1),
    fontSize: "18px", fontStretch: "normal", fontStyle: "normal", lineHeight: "2.75",
    letterSpacing: "normal", textAlign: "left", color: "#6e7074", fontFamily: ["Poppins"].join(","),
    "&:hover": { color: "#032541", opacity: 1 }, "&.Mui-selected": { color: "#dc3545", fontWeight: 600 },
    "&.Mui-focusVisible": { backgroundColor: "blue" },
}));


export default function ProductSetUp(props) {
    const [categoryId ,setCategoryId] = useState('')
    const [flagState, setFlagState] = useState('showProducts')
    const [searchValue, setSearchValue] = useState('')
    const [selectedValue, setSelectedValue] = useState('')
    const [products, setProducts] = useState([])
    const [editCategory ,setEditedCategory] = useState([])
    const [openInActive, setOpenInActive] = useState(false)
    const navigate = useNavigate()
    const { X_Authorization } = useSelector((store) => store.user)
    const businessCategory = localStorage.getItem('businessCategory')

   
    const openInActiveProducts = () => setOpenInActive(true)
    const closeInActiveProducts = () => setOpenInActive(false)
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
    const handleOpenDeleteDialog = () => { setOpenDeleteDialog(true) }
    const handleCloseDeleteDialog = () => { setOpenDeleteDialog(false) }
    const [openAlertDialog, setOpenAlertDialog] = useState(false)
    const handleOpenDialog = () => { setOpenAlertDialog(true) }
    const handleCloseDialog = () => { setOpenAlertDialog(false) }
    const [successShow, setSuccessShow] = useState({state: false, message: ""})
	const [errorShow, setErrorShow] = useState({state: false, message: ""})
    const [categoryModalOpen, setCategoryModalOpen] = useState(false)

    const queryparams = decodeURIComponent(window.location.search);
    const stateParams = queryparams.slice(1)
   


    const handleCategoryClose = () => {
        setCategoryModalOpen(false);
    }

    const handleFlagState = (state) => {
        setFlagState(state)
    }

    const handlePrev = () => {
        setFlagState('showProducts')
    }

    const getCategoryId = (categoryId)=>{
        setCategoryId(categoryId)
    }

    //type
    const typeOptions = [
        {
            value: "Product",
            label: "Product",
        },
        {
            value: "Service",
            label: "Service",
        }
    ]

    //map through the types

    const mapOptions = typeOptions.map((option) => ({ value: option.value, label: option.label }))

    const [dataGridPageSize, setPageSize] = useState(10);
    const [pageState, setPageState] = useState({ isLoading: false, data: [], total: 0, page: 1, pageSize: dataGridPageSize, })

    //tabs
    const [tabValue, setTabValue] = useState('Active')
    const handleTabChange = (event, newValue) => { setTabValue(newValue) };

    const getWareHouseStatus = async () => {
		try {
			const response = await fetch(`${baseUrl}/api/v1/stores/get_inventory_status `, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
					"X-Authorization": localStorage.getItem("X-Authorization"),

				},
			})
			const data = response.json()
				.then((response) => {
					console.log('status getWareHouseStatus ', response.data.enabled);
					//setStatus(response?.data?.enabled)
					const inventoryStatus=response.data.enabled;
					if (inventoryStatus==="false"){
						localStorage.setItem("category","Service")
					}		
					
				})


		} catch (error) {


		}


	}


	useEffect(() => {
		getWareHouseStatus()
	}, [])

    const productServiceParam =  (businessCategory === "Service Industry (Barber shop, Beauty spa)") ? '' : stateParams;

    // ?.filter((product)=>product?.categoryName !== 'Convenience Fee')
    // let productUrlActive = `/api/listCategories/${tabValue}?page=${pageState.page}&limit=${dataGridPageSize}&productService=${stateParams}&searchValue=${searchValue}`

    const getCategoryDependingOnState = () => {
        setPageState({...pageState, data: [], total: 0, isLoading: true})

        const productServiceParam = (businessCategory === "Service industry (Barber shop, Beauty spa)") ? '' : stateParams;
        try {
            HttpComponent({
                method:'GET',
                url:`/api/listCategories/${tabValue}?page=${pageState.page}&limit=${dataGridPageSize}&productService=${productServiceParam}&searchValue=${searchValue}`,
                token:localStorage.getItem('X-Authorization')
            }).then((data)=>{
                if(data?.status === 200){
                    setPageState({...pageState, data: data?.response?.data?.filter((category)=>category?.categoryName !== 'Zpm Activation Fee' && category?.categoryName !== 'Convenience Fee' ), total: data.response.count, isLoading: false})
                }
            })
            
        } catch (error) {
            
        }

    }

    useEffect(()=>{
        getCategoryDependingOnState()
    },[tabValue ,dataGridPageSize ,stateParams ,pageState?.page , searchValue , flagState])


   


    const [checked, setChecked] = useState([])
    const [isRowSelected, seIsRowSelected] = useState(false)

    const productColumns = [
        {
            headerName: "categoryName", field: 'categoryName', headerAlign: 'left', align: 'left', flex: 1, renderHeader: () => { return (<strong style={{ fontSize: '12px', color: '#032541', fontWeight: 600 }} >Category Name</strong>) }, renderCell: (params) => {

                const getSelected = (productId) => {

                    const newChecked = [...checked];

                    const currentIndex = newChecked.indexOf(productId)
                    if (currentIndex === -1) {
                        newChecked.push(productId)
                        seIsRowSelected(true)
                    } else {
                        newChecked.splice(currentIndex, 1)
                        seIsRowSelected(false)
                    }

                    setChecked(newChecked)
                    seIsRowSelected(true)
                }
                return (
                    <>
                        <Checkbox onClick={() => getSelected(params.row._id)} style={{ marginLeft: "10px", color: isRowSelected ? '#dc3545' : null }}></Checkbox>
                        <span>{params.row.categoryName}</span>
                    </>
                )
            }
        },
        { headerName: "productService", field: 'productService', headerAlign: 'left', align: 'left', flex: 1, renderHeader: () => { return (<strong style={{ fontSize: '12px', color: '#032541', fontWeight: 600 }} >Type</strong>) } },
        { headerName: "categoryDescription", field: 'categoryDescription', headerAlign: 'left', align: 'left', flex: 1, renderHeader: () => { return (<strong style={{ fontSize: '12px', color: '#032541', fontWeight: 600 }} >Category Description</strong>) } },
        { headerName: "accountId", field: 'accountId', headerAlign: 'left', align: 'left', flex: 1, renderHeader: () => { return (<strong style={{ fontSize: '12px', color: '#032541', fontWeight: 600 }} >GL Account (Income)</strong>) } ,renderCell:(params)=>{
            return(
                <div style={{display:'flex' , alignItems:'center'}}>
                    {/* <span>{params?.row?.accountId}</span> */}
                    <span style={{marginLeft:"10px"}}>{params?.row?.glAccountName ? params?.row?.glAccountName :'N/A' }</span>
                </div>
            )
        }},
        { headerName: "expenseAccountId", field: 'expenseAccountId', headerAlign: 'left', align: 'left', flex: 1, renderHeader: () => { return (<strong style={{ fontSize: '12px', color: '#032541', fontWeight: 600 }} >GL Account (Expense)</strong>) } ,renderCell:(params)=>{
            return(
                <div style={{display:'flex' , alignItems:'center'}}>
                    {/* <span>{params?.row?.accountId}</span> */}
                    <span style={{marginLeft:"10px"}}>{ params?.row?.glExpenseAccountName? params?.row?.glExpenseAccountName :'N/A' }</span>
                </div>
            )
        }}, 
        {
            headerName: "Action", field: 'action', headerAlign: 'left', align: 'left', flex: 1, renderHeader: () => { return (<strong style={{ fontSize: '12px', color: '#032541', fontWeight: 600 }} >Action</strong>) },
            renderCell: (params) => {

                function fetchSingleProductToDelete() {
                    try {
                        HttpComponent({
                            method: 'PUT',
                            url: `/api/updateCategory`,
                            body: {
                                categoryState: "Inactive",
                                categoryId:[categoryId]
                            },
                            token: X_Authorization
                        }).then((data) => {

                            if(data.status ===  202){
                                setSuccessShow({state:true ,message:'Category has been Inactivated'})
                                getCategoryDependingOnState();
                               // fetchProducts();
                            }else{
                                setErrorShow({state:true , message:data.response.message})
                                getCategoryDependingOnState();
                               // fetchProducts()
                            }
                          
                           
                        })

                    } catch (error) {

                    }
                }

                return (
                    <div style={{ display: "flex", alignItems: 'center' }}>
                        <MenuItem disableRipple >
                            <EditIcon onClick={() => navigate(`/categories/edit/${params.row._id}`)} style={{ color: "#DC3545FF" }} />
                        </MenuItem>
                        <MenuItem disableRipple>
                            <DeleteIcon onClick={()=>{handleOpenDeleteDialog();getCategoryId(params.row._id)}} style={{ color: "#DC3545FF" }} />
                            <Dialog
                            open={openDeleteDialog}
                            TransitionComponent={Transition}
                            keepMounted
                            onClose={handleCloseDeleteDialog}
                            PaperProps={{
                                sx: {
                                width: "350px",
                                maxWidth: "90%",
                                px: 2,
                                py: 2,
                                borderRadius: "8px",
                                boxShadow:
                                    "0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)",
                                },
                            }}
                            BackdropProps={{
                                style: {
                                backgroundColor: "transparent",
                                opacity: "0.9",
                                backdropFilter: "blur(0.5px)",
                                },
                            }}
                            aria-describedby="alert-dialog-slide-description"
                            >
                            <DialogTitle sx={{ display: "flex", alignItems: "center", gap: 2, pb: 0 }}>
                                <img src={WarningImg} alt="warning icon" width={60} height={60} />
                                <Typography variant="h6" sx={{ fontWeight: 600, color: "#032541", fontSize: "18px", fontFamily: "Poppins",}}> Deactivate Category </Typography>
                            </DialogTitle>
                            <DialogContent sx={{ pt: 2, pb: 2, mt: 1 }}>
                                <DialogContentText sx={{ fontFamily: "Poppins", fontSize: "15px", color: "#323d52" }}>
                                Selected categories will be declined for your business.
                                You can restore them later.
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions sx={{ justifyContent: "center", pb: 3 }}>
                                <Button onClick={handleCloseDeleteDialog} sx={{ height: "45px", width: "125px", borderRadius: "4px", border: "1px solid #032541", color: "#032541", fontSize: "14px", fontWeight: 500, fontFamily: "Poppins", mr: 2, textTransform: "none", }} > Cancel </Button>
                                <Button onClick={() => {handleCloseDeleteDialog(); fetchSingleProductToDelete(); }} variant="contained" color="error" sx={{ height: "45px", width: "125px", fontSize: "14px", fontWeight: 600, fontFamily: "Poppins", textTransform: "none", }}> Deactivate </Button>
                            </DialogActions>
                            </Dialog>
                        </MenuItem>
                    </div>
                )
            }
        },
    ]

    //pending columns for approval

    const pendingColumns = [
        {
            headerName: "categoryName", field: 'categoryName', headerAlign: 'left', align: 'left', flex: 1, renderHeader: () => { return (<strong style={{ fontSize: '12px', color: '#032541', fontWeight: 600 }} >Category Name</strong>) }, renderCell: (params) => {

                const getSelected = (productId) => {

                    const newChecked = [...checked];

                    const currentIndex = newChecked.indexOf(productId)
                    if (currentIndex === -1) {
                        newChecked.push(productId)
                        seIsRowSelected(true)
                    } else {
                        newChecked.splice(currentIndex, 1)
                        seIsRowSelected(false)
                    }

                    setChecked(newChecked)
                    seIsRowSelected(true)
                }
                return (
                    <>
                        <Checkbox onClick={() => getSelected(params.row._id)} style={{ marginLeft: "10px", color: isRowSelected ? '#dc3545' : null }}></Checkbox>
                        <span>{params.row.categoryName}</span>
                    </>
                )
            }
        },
        { headerName: "productService", field: 'productService', headerAlign: 'left', align: 'left', flex: 1, renderHeader: () => { return (<strong style={{ fontSize: '12px', color: '#032541', fontWeight: 600 }} >Type</strong>) } },
        { headerName: "categoryDescription", field: 'categoryDescription', headerAlign: 'left', align: 'left', flex: 1, renderHeader: () => { return (<strong style={{ fontSize: '12px', color: '#032541', fontWeight: 600 }} >Category Description</strong>) } },
        { headerName: "accountId", field: 'accountId', headerAlign: 'left', align: 'left', flex: 1, renderHeader: () => { return (<strong style={{ fontSize: '12px', color: '#032541', fontWeight: 600 }} >GL Account (Income)</strong>) } ,renderCell:(params)=>{
            return(
                <div style={{display:'flex' , alignItems:'center'}}>
                    {/* <span>{params?.row?.accountId}</span> */}
                    <span style={{marginLeft:"10px"}}>{params?.row?.glAccountName ? params?.row?.glAccountName :'N/A' }</span>
                </div>
            )
        }},
        { headerName: "expenseAccountId", field: 'expenseAccountId', headerAlign: 'left', align: 'left', flex: 1, renderHeader: () => { return (<strong style={{ fontSize: '12px', color: '#032541', fontWeight: 600 }} >GL Account (Expense)</strong>) } ,renderCell:(params)=>{
            return(
                <div style={{display:'flex' , alignItems:'center'}}>
                    {/* <span>{params?.row?.accountId}</span> */}
                    <span style={{marginLeft:"10px"}}>{ params?.row?.glExpenseAccountName? params?.row?.glExpenseAccountName :'N/A' }</span>
                </div>
            )
        }}, 
        {
            headerName: "createdAt", field: 'createdAt', headerAlign: 'left', align: 'left', flex: 1, renderHeader: () => { return (<strong style={{ fontSize: '12px', color: '#032541', fontWeight: 600 }} >Created On</strong>) }, renderCell: (params) => {
                return (
                    <>
                        <span>{DateFormatter(params.row.dateCreated)}</span>
                    </>
                )
            }
        },
        {
            headerName: "Action", field: 'action', headerAlign: 'left', align: 'left', flex: 1, renderHeader: () => { return (<strong style={{ fontSize: '12px', color: '#032541', fontWeight: 600 }} >Action</strong>) },
            renderCell: (params) => {

                //approve a category

                function approveCategory() {
                    try {
                        HttpComponent({
                            method: 'PUT',
                            url: `/api/updateCategory`,
                            body: {
                                categoryState: "Active",
                                categoryId:[categoryId]
                            },
                            token: X_Authorization
                        }).then((data) => {
                            console.log(data, 'approved')

                            if(data.status ===  202){
                                setSuccessShow({state:true ,message:'Category has been Approved'})
                                // fetchNewProducts();
                                getCategoryDependingOnState();
                            }else{
                                setErrorShow({state:true , message:data.response.message})
                                getCategoryDependingOnState();
                                // fetchNewProducts();
                            }
                        })
                    } catch (error) {

                    }
                }



                //decline a category
                function deactivateCategory() {
                    try {
                        HttpComponent({
                            method: 'PUT',
                            url: `/api/updateCategory`,
                            body: {
                                categoryState: "Deactivation",
                                categoryId:[categoryId]
                            },
                            token: X_Authorization
                        }).then((data) => {
                            console.log(data, 'approved')
                            if(data.status ===  202){
                                setSuccessShow({state:true ,message:'Category has been Declined'})
                                getCategoryDependingOnState();
                                //fetchNewProducts();
                            }else{
                                setErrorShow({state:true , message:data.response.message})
                                getCategoryDependingOnState();
                               // fetchNewProducts();
                            }
                           
                        })
                    } catch (error) {

                    }
                }

                return (
                    <div style={{ display: "flex", alignItems: 'center' }}>
                        <div>
                            <img onClick={()=>{getCategoryId(params.row._id);handleOpenDialog()}} src={ApprovImg} alt='activate' />
                            <Dialog
                                open={openAlertDialog}
                                TransitionComponent={Transition}
                                keepMounted
                                PaperProps={{
                                    style: {
                                        height: "300px",
                                        boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)"
                                    },
                                }}

                                BackdropProps={{ style: { backgroundColor: "transparent", opacity: "0.9", backdropFilter: "blur(0.5px)", } }}
                                aria-describedby="alert-dialog-slide-description"
                            >
                                <DialogContent sx={{ display: "flex", justifyContent: 'space-evenly', alignContent: "center", alignItems: "center" }}>
                                    <img src={ApprovImg} alt='approve' />
                                    <div style={{ marginLeft: '20px' }}>
                                        <h6>Approve New Products / Service</h6>
                                        <span>Selected new products/service will be <br></br> activated for your business.</span>
                                    </div>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleCloseDialog} style={{ border: "1px solid #032541", color: "#032541", backgroundColor: "transparent", textTransform: 'inherit', cursor: 'pointer', width: "100px", marginRight: '10px' }}>Cancel</Button>
                                    <Button onClick={()=>{handleCloseDialog();approveCategory()}} style={{ backgroundColor: "#17ae7b", border: 'none', color: "#fff", textTransform: 'inherit', cursor: 'pointer', width: "100px" }}>Approve</Button>
                                </DialogActions>
                            </Dialog>
                        </div>
                        <div>
                            <img onClick={()=>{getCategoryId(params.row._id) ; handleOpenDeleteDialog()}} src={DeImg} alt='activate' />
                            <Dialog
                                open={openDeleteDialog}
                                TransitionComponent={Transition}
                                keepMounted
                                PaperProps={{
                                    style: {
                                        height: "300px",
                                        boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)"
                                    },
                                }}

                                BackdropProps={{ style: { backgroundColor: "transparent", opacity: "0.9", backdropFilter: "blur(0.5px)", } }}
                                aria-describedby="alert-dialog-slide-description"
                            >
                                <DialogContent sx={{ display: "flex", justifyContent: 'space-evenly', alignContent: "center", alignItems: "center" }}>
                                    <img src={WarningImg} alt='approve' />
                                    <div style={{ marginLeft: '20px' }}>
                                        <h6>Decline Products / Service</h6>
                                        <span>Selected products/service will be <br></br> declined for your business.</span><br></br>
                                        <span>You can restore later</span>
                                    </div>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleCloseDeleteDialog} style={{ border: "1px solid #032541", color: "#032541", backgroundColor: "transparent", textTransform: 'inherit', cursor: 'pointer', width: "100px", marginRight: '10px' }}>Cancel</Button>
                                    <Button onClick={()=>{handleCloseDeleteDialog();deactivateCategory()}} style={{ backgroundColor: "#dc3545", border: 'none', color: "#fff", textTransform: 'inherit', cursor: 'pointer', width: "100px" }}>Decline</Button>
                                </DialogActions>
                            </Dialog>
                        </div>

                    </div>
                )
            }
        },

    ]

    // declined products

    const declinedProductsColumns = [
        {
            headerName: "categoryName", field: 'categoryName', headerAlign: 'left', align: 'left', flex: 1, renderHeader: () => { return (<strong style={{ fontSize: '12px', color: '#032541', fontWeight: 600 }} >Category Name</strong>) }, renderCell: (params) => {

                const getSelected = (productId) => {

                    const newChecked = [...checked];

                    const currentIndex = newChecked.indexOf(productId)
                    if (currentIndex === -1) {
                        newChecked.push(productId)
                        seIsRowSelected(true)
                    } else {
                        newChecked.splice(currentIndex, 1)
                        seIsRowSelected(false)
                    }

                    setChecked(newChecked)
                    seIsRowSelected(true)
                }
                return (
                    <>
                        <Checkbox onClick={() => getSelected(params.row._id)} style={{ marginLeft: "10px", color: isRowSelected ? '#dc3545' : null }}></Checkbox>
                        <span>{params.row.categoryName}</span>
                    </>
                )
            }
        },
        { headerName: "productService", field: 'productService', headerAlign: 'left', align: 'left', flex: 1, renderHeader: () => { return (<strong style={{ fontSize: '12px', color: '#032541', fontWeight: 600 }} >Type</strong>) } },
        { headerName: "categoryDescription", field: 'categoryDescription', headerAlign: 'left', align: 'left', flex: 1, renderHeader: () => { return (<strong style={{ fontSize: '12px', color: '#032541', fontWeight: 600 }} >Category Description</strong>) } },
        { headerName: "accountId", field: 'accountId', headerAlign: 'left', align: 'left', flex: 1, renderHeader: () => { return (<strong style={{ fontSize: '12px', color: '#032541', fontWeight: 600 }} >GL Account (Income)</strong>) } ,renderCell:(params)=>{
            return(
                <div style={{display:'flex' , alignItems:'center'}}>
                    {/* <span>{params?.row?.accountId}</span> */}
                    <span style={{marginLeft:"10px"}}>{params?.row?.glAccountName ? params?.row?.glAccountName :'N/A' }</span>
                </div>
            )
        }},
        { headerName: "expenseAccountId", field: 'expenseAccountId', headerAlign: 'left', align: 'left', flex: 1, renderHeader: () => { return (<strong style={{ fontSize: '12px', color: '#032541', fontWeight: 600 }} >GL Account (Expense)</strong>) } ,renderCell:(params)=>{
            return(
                <div style={{display:'flex' , alignItems:'center'}}>
                    {/* <span>{params?.row?.accountId}</span> */}
                    <span style={{marginLeft:"10px"}}>{ params?.row?.glExpenseAccountName? params?.row?.glExpenseAccountName :'N/A' }</span>
                </div>
            )
        }}, 
        {
            headerName: "declinedOn", field: 'declinedOn', headerAlign: 'left', align: 'left', flex: 1, renderHeader: () => { return (<strong style={{ fontSize: '12px', color: '#032541', fontWeight: 600 }} >Created On</strong>) }, renderCell: (params) => {
                return (
                    <>
                        <span>{DateFormatter(params.row.dateCreated)}</span>
                    </>
                )
            }
        },
        {
            headerName: "Action", field: 'action', headerAlign: 'left', align: 'left', flex: 1, renderHeader: () => { return (<strong style={{ fontSize: '12px', color: '#032541', fontWeight: 600 }} >Action</strong>) },
            renderCell: (params) => {

                function productCategoryToRestore() {
                    try {
                        HttpComponent({
                            method: 'PUT',
                            url: `/api/updateCategory`,
                            body: {
                                categoryState: 'Active',
                                categoryId:[categoryId]
                            },
                            token: X_Authorization
                        }).then((data) => {
                            console.log(data, 'updated')
                            if(data.status ===  202){
                                setSuccessShow({state:true ,message:'Category has been Approved'})
                                getCategoryDependingOnState();
                                //fetchDeclinedProducts()
                            }else{
                                setErrorShow({state:true , message:data.response.message})
                                getCategoryDependingOnState();
                                //fetchDeclinedProducts()
            
                            }
                            // fetchDeclinedProducts();
                            getCategoryDependingOnState()
                        })

                    } catch (error) {

                    }
                }

                return (
                    <div style={{ display: "flex", alignItems: 'center' }}>
                        <MenuItem disableRipple >
                            <img onClick={()=>{getCategoryId(params.row._id);openInActiveProducts()}} src={restoreImg} alt='activate' />
                            <Dialog
                            open={openInActive}
                            TransitionComponent={Transition}
                            keepMounted
                            PaperProps={{
                                sx: {
                                width: "350px",
                                maxWidth: "90%",
                                px: 2,
                                py: 2,
                                fontFamily: "Poppins",
                                borderRadius: 2,
                                boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
                                },
                            }}
                            BackdropProps={{
                                style: {
                                backgroundColor: "transparent",
                                opacity: "0.9",
                                backdropFilter: "blur(0.5px)",
                                },
                            }}
                            aria-describedby="alert-dialog-slide-description"
                            >
                            <DialogTitle sx={{ display: "flex", alignItems: "center", gap: 2, pb: 0 }}>
                                <img src={restoreImg} alt="restore icon" width={60} height={60} />
                                <Typography variant="h6" sx={{ fontWeight: 600, color: "#032541", fontSize: "18px", fontFamily: "Poppins", }}> Restore Deactivated Categories </Typography>
                            </DialogTitle>
                            <DialogContent sx={{ pt: 2, pb: 2, mt: 1 }}>
                                <DialogContentText sx={{ fontFamily: "Poppins", fontSize: "15px", color: "#323d52" }}> Selected categories will be restored for your business. </DialogContentText>
                            </DialogContent>
                            <DialogActions sx={{ justifyContent: "center", pb: 3 }}>
                                <Button onClick={closeInActiveProducts} sx={{ height: "45px", width: "125px", borderRadius: "4px", border: "1px solid #032541", color: "#032541", fontSize: "14px", fontWeight: 500, fontFamily: "Poppins", mr: 2, }} > Cancel </Button>
                                <Button onClick={() => { closeInActiveProducts(); productCategoryToRestore(); }} variant="contained" sx={{ height: "45px", width: "125px", fontSize: "14px", fontWeight: 600, fontFamily: "Poppins", backgroundColor: "#17ae7b", "&:hover": { backgroundColor: "#129867",},}}> Restore </Button>
                            </DialogActions>
                            </Dialog>
                        </MenuItem>
                    </div>
                )
            }
        },

    ]

    //edited columns

    const editedColumns = [
        {
            headerName: "categoryName", field: 'categoryName', headerAlign: 'left', align: 'left', flex: 1, renderHeader: () => { return (<strong style={{ fontSize: '12px', color: '#032541', fontWeight: 600 }} >Category Name</strong>) }, renderCell: (params) => {

                const getSelected = (productId) => {

                    const newChecked = [...checked];

                    const currentIndex = newChecked.indexOf(productId)
                    if (currentIndex === -1) {
                        newChecked.push(productId)
                        seIsRowSelected(true)
                    } else {
                        newChecked.splice(currentIndex, 1)
                        seIsRowSelected(false)
                    }

                    setChecked(newChecked)
                    seIsRowSelected(true)
                }
                return (
                    <>
                        <Checkbox onClick={() => getSelected(params.row._id)} style={{ marginLeft: "10px", color: isRowSelected ? '#dc3545' : null }}></Checkbox>
                        <span>{params.row.categoryName}</span>
                    </>
                )
            }
        },
        { headerName: "productService", field: 'productService', headerAlign: 'left', align: 'left', flex: 1, renderHeader: () => { return (<strong style={{ fontSize: '12px', color: '#032541', fontWeight: 600 }} >Type</strong>) } },
        { headerName: "categoryDescription", field: 'categoryDescription', headerAlign: 'left', align: 'left', flex: 1, renderHeader: () => { return (<strong style={{ fontSize: '12px', color: '#032541', fontWeight: 600 }} >Category Description</strong>) } },
        { headerName: "accountId", field: 'accountId', headerAlign: 'left', align: 'left', flex: 1, renderHeader: () => { return (<strong style={{ fontSize: '12px', color: '#032541', fontWeight: 600 }} >GL Account (Income)</strong>) } ,renderCell:(params)=>{
            return(
                <div style={{display:'flex' , alignItems:'center'}}>
                    {/* <span>{params?.row?.accountId}</span> */}
                    <span style={{marginLeft:"10px"}}>{params?.row?.glAccountName ? params?.row?.glAccountName :'N/A' }</span>
                </div>
            )
        }},
        { headerName: "expenseAccountId", field: 'expenseAccountId', headerAlign: 'left', align: 'left', flex: 1, renderHeader: () => { return (<strong style={{ fontSize: '12px', color: '#032541', fontWeight: 600 }} >GL Account (Expense)</strong>) } ,renderCell:(params)=>{
            return(
                <div style={{display:'flex' , alignItems:'center'}}>
                    {/* <span>{params?.row?.accountId}</span> */}
                    <span style={{marginLeft:"10px"}}>{ params?.row?.glExpenseAccountName? params?.row?.glExpenseAccountName :'N/A' }</span>
                </div>
            )
        }}, 
        { headerName: "updatedAt", field: 'updatedAt', headerAlign: 'left', align: 'left', flex: 1, renderHeader: () => { return (<strong style={{ fontSize: '12px', color: '#032541', fontWeight: 600 }} >Edited On</strong>) },renderCell:(params) => {
            return (
                <>
                <span>{DateFormatter(params.row.updatedAt)}</span>
                </>
            )
        }},
        { headerName: "modifiedByName", field: 'modifiedByName', headerAlign: 'left', align: 'left', flex: 1, renderHeader: () => { return (<strong style={{ fontSize: '12px', color: '#032541', fontWeight: 600 }} >Edited By</strong>) },renderCell:(params) => {
            return (
                <>
                <span>{params.row.modifiedByName}</span>
                </>
            )
        }},
        {
            headerName: "Action", field: 'action', headerAlign: 'left', align: 'left', flex: 1, renderHeader: () => { return (<strong style={{ fontSize: '12px', color: '#032541', fontWeight: 600 }} >Action</strong>) },
            renderCell: (params) => {

                //approve a category

                function approveCategory() {
                    try {
                        HttpComponent({
                            method: 'PUT',
                            url: `/api/updateCategory`,
                            body: {
                                categoryState: "Active",
                                categoryId:[categoryId]
                            },
                            token: X_Authorization
                        }).then((data) => {
                            console.log(data, 'approved')

                            if(data.status ===  202){
                                setSuccessShow({state:true ,message:'Category has been Approved'})
                                getCategoryDependingOnState();
                               // getEditedCategory()
                            }else{
                                setErrorShow({state:true , message:data.response.message})
                                getCategoryDependingOnState();
                                //getEditedCategory()
                            }
                           
                        })
                    } catch (error) {

                    }
                }



                //decline a category
                function deactivateCategory() {
                    try {
                        HttpComponent({
                            method: 'PUT',
                            url: `/api/updateCategory`,
                            body: {
                                categoryState: "Deactivation",
                                categoryId:[categoryId]
                            },
                            token: X_Authorization
                        }).then((data) => {
                            console.log(data, 'approved')
                            if(data.status ===  202){
                                setSuccessShow({state:true ,message:'Category has been declined'})
                                getCategoryDependingOnState();
                                //fetchNewProducts();
                            }else{
                                setErrorShow({state:true , message:data.response.message})
                                getCategoryDependingOnState();
                               // fetchNewProducts();
                            }
                            
                        })
                    } catch (error) {

                    }
                }


                return (
                    <div style={{ display: "flex", alignItems: 'center' }}>
                        <div>
                            <img onClick={()=>{getCategoryId(params.row._id);handleOpenDialog()}} src={ApprovImg} alt='activate' />
                        <Dialog
                            open={openAlertDialog}
                            TransitionComponent={Transition}
                            keepMounted
                            onClose={handleCloseDialog}
                            PaperProps={{
                                sx: {
                                width: "350px",
                                maxWidth: "90%",
                                px: 2,
                                py: 2,
                                borderRadius: "8px",
                                boxShadow:
                                    "0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)",
                                },
                            }}
                            BackdropProps={{
                                style: {
                                backgroundColor: "transparent",
                                opacity: "0.9",
                                backdropFilter: "blur(0.5px)",
                                },
                            }}
                            aria-describedby="alert-dialog-slide-description"
                            >
                            <DialogTitle sx={{ display: "flex", alignItems: "center", gap: 2, pb: 0 }}>
                                <img src={ApprovImg} alt="approve icon" width={60} height={60} />
                                <Typography variant="h6" sx={{ fontWeight: 600, color: "#032541", fontSize: "18px", fontFamily: "Poppins", }}> Approve New Products/Services </Typography>
                            </DialogTitle>
                            <DialogContent sx={{ pt: 2, pb: 2, mt: 1 }}>
                                <DialogContentText sx={{ fontFamily: "Poppins", fontSize: "15px", color: "#323d52", }}> Selected new products or services will be activated for your business. </DialogContentText>
                            </DialogContent>
                            <DialogActions sx={{ justifyContent: "center", pb: 3 }}>
                                <Button onClick={handleCloseDialog} sx={{ height: "45px", width: "125px", borderRadius: "4px", border: "1px solid #032541", color: "#032541", fontSize: "14px", fontWeight: 500, fontFamily: "Poppins", mr: 2, textTransform: "none",}}> Cancel </Button>
                                <Button onClick={() => { handleCloseDialog(); approveCategory(); }} variant="contained" sx={{ height: "45px", width: "125px", fontSize: "14px", fontWeight: 600, fontFamily: "Poppins", backgroundColor: "#17ae7b", textTransform: "none", "&:hover": { backgroundColor: "#129867",}, }}> Approve </Button>
                            </DialogActions>
                        </Dialog>
                        </div>
                        <div>
                            <img onClick={()=>{getCategoryId(params.row._id);handleOpenDeleteDialog()}} src={DeImg} alt='activate' />
                            <Dialog
                            open={openDeleteDialog}
                            TransitionComponent={Transition}
                            keepMounted
                            PaperProps={{
                                sx: {
                                width: "350px",
                                maxWidth: "90%",
                                px: 2,
                                py: 2,
                                fontFamily: "Poppins",
                                borderRadius: 2,
                                boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
                                },
                            }}
                            BackdropProps={{
                                style: {
                                backgroundColor: "transparent",
                                opacity: "0.9",
                                backdropFilter: "blur(0.5px)",
                                },
                            }}
                            aria-describedby="alert-dialog-slide-description"
                            >
                            <DialogTitle sx={{ display: "flex", alignItems: "center", gap: 2, pb: 0 }}>
                                <img src={WarningImg} alt="decline icon" width={60} height={60} />
                                <Typography variant="h6" sx={{ fontWeight: 600, color: "#032541", fontSize: "18px", fontFamily: "Poppins", }}> Decline Products / Service </Typography>
                            </DialogTitle>
                            <DialogContent sx={{ pt: 2, pb: 2, mt: 1 }}>
                                <DialogContentText sx={{ fontFamily: "Poppins", fontSize: "15px", color: "#323d52" }}> Selected products/service will be declined for your business. <br /> You can restore later.
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions sx={{ justifyContent: "center", pb: 3 }}>
                                <Button onClick={handleCloseDeleteDialog} sx={{ height: "45px", width: "125px", borderRadius: "4px", border: "1px solid #032541", color: "#032541", fontSize: "14px", fontWeight: 500, fontFamily: "Poppins", mr: 2, }}> Cancel </Button>
                                <Button onClick={() => { handleCloseDeleteDialog(); deactivateCategory();}} variant="contained" color="error" sx={{ height: "45px", width: "125px", fontSize: "14px", fontWeight: 600, fontFamily: "Poppins",}} > Decline </Button>
                            </DialogActions>
                            </Dialog>
                        </div>

                    </div>
                )
            }
        },


    ]



    //deactivate dcategories

    const deactivatedProductsColumns = [
        {
            headerName: "categoryName", field: 'categoryName', headerAlign: 'left', align: 'left', flex: 1, renderHeader: () => { return (<strong style={{ fontSize: '12px', color: '#032541', fontWeight: 600 }} >Category Name</strong>) }, renderCell: (params) => {

                const getSelected = (productId) => {

                    const newChecked = [...checked];

                    const currentIndex = newChecked.indexOf(productId)
                    if (currentIndex === -1) {
                        newChecked.push(productId)
                        seIsRowSelected(true)
                    } else {
                        newChecked.splice(currentIndex, 1)
                        seIsRowSelected(false)
                    }

                    setChecked(newChecked)
                    seIsRowSelected(true)
                }
                return (
                    <>
                        <Checkbox onClick={() => getSelected(params.row._id)} style={{ marginLeft: "10px", color: isRowSelected ? '#dc3545' : null }}></Checkbox>
                        <span>{params.row.categoryName}</span>
                    </>
                )
            }
        },
        { headerName: "productService", field: 'productService', headerAlign: 'left', align: 'left', flex: 1, renderHeader: () => { return (<strong style={{ fontSize: '12px', color: '#032541', fontWeight: 600 }} >Type</strong>) } },
        { headerName: "categoryDescription", field: 'categoryDescription', headerAlign: 'left', align: 'left', flex: 1, renderHeader: () => { return (<strong style={{ fontSize: '12px', color: '#032541', fontWeight: 600 }} >Category Description</strong>) } },
        { headerName: "accountId", field: 'accountId', headerAlign: 'left', align: 'left', flex: 1, renderHeader: () => { return (<strong style={{ fontSize: '12px', color: '#032541', fontWeight: 600 }} >GL Account (Income)</strong>) } ,renderCell:(params)=>{
            return(
                <div style={{display:'flex' , alignItems:'center'}}>
                    {/* <span>{params?.row?.accountId}</span> */}
                    <span style={{marginLeft:"10px"}}>{params?.row?.glAccountName ? params?.row?.glAccountName :'N/A' }</span>
                </div>
            )
        }},
        { headerName: "expenseAccountId", field: 'expenseAccountId', headerAlign: 'left', align: 'left', flex: 1, renderHeader: () => { return (<strong style={{ fontSize: '12px', color: '#032541', fontWeight: 600 }} >GL Account (Expense)</strong>) } ,renderCell:(params)=>{
            return(
                <div style={{display:'flex' , alignItems:'center'}}>
                    {/* <span>{params?.row?.accountId}</span> */}
                    <span style={{marginLeft:"10px"}}>{ params?.row?.glExpenseAccountName? params?.row?.glExpenseAccountName :'N/A' }</span>
                </div>
            )
        }}, 
        {
            headerName: "declinedOn", field: 'declinedOn', headerAlign: 'left', align: 'left', flex: 1, renderHeader: () => { return (<strong style={{ fontSize: '12px', color: '#032541', fontWeight: 600 }} >Deactivated On</strong>) }, renderCell: (params) => {
                return (
                    <>
                        <span>{DateFormatter(params.row.dateCreated)}</span>
                    </>
                )
            }
        },
        {
            headerName: "Action", field: 'action', headerAlign: 'left', align: 'left', flex: 1, renderHeader: () => { return (<strong style={{ fontSize: '12px', color: '#032541', fontWeight: 600 }} >Action</strong>) },
            renderCell: (params) => {

                function productCategoryToRestore() {
                    try {
                        HttpComponent({
                            method: 'PUT',
                            url: `/api/updateCategory`,
                            body: {
                                categoryState: 'Active',
                                categoryId:[categoryId]
                            },
                            token: X_Authorization
                        }).then((data) => {
                            console.log(data, 'updated')
                            if(data.status ===  202){
                                setSuccessShow({state:true ,message:'Category has been Activated'})
                                getCategoryDependingOnState();
                                //fetchAllDeclinedProducts();
                               
                            }else{
                                setErrorShow({state:true , message:data.response.message})
                                getCategoryDependingOnState();
                               // fetchAllDeclinedProducts();
                            }
                           
                        })

                    } catch (error) {

                    }
                }

                return (
                    <div style={{ display: "flex", alignItems: 'center' }}>
                        <MenuItem disableRipple >
                            <img onClick={()=>{getCategoryId(params.row._id);openInActiveProducts()}} src={restoreImg} alt='activate' />
                         <Dialog
                            open={openInActive}
                            TransitionComponent={Transition}
                            keepMounted
                            PaperProps={{
                                sx: {
                                width: "350px",
                                maxWidth: "90%",
                                px: 2,
                                py: 2,
                                fontFamily: "Poppins",
                                borderRadius: 2,
                                boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
                                },
                            }}
                            BackdropProps={{
                                style: {
                                backgroundColor: "transparent",
                                opacity: "0.9",
                                backdropFilter: "blur(0.5px)",
                                },
                            }}
                            aria-describedby="alert-dialog-slide-description"
                            >
                            <DialogTitle sx={{ display: "flex", alignItems: "center", gap: 2, pb: 0 }}>
                                <img src={restoreImg} alt="restore icon" width={60} height={60} />
                                <Typography variant="h6" sx={{ fontWeight: 600, color: "#032541", fontSize: "18px", fontFamily: "Poppins",}}> Restore Categories </Typography>
                            </DialogTitle>
                            <DialogContent sx={{ pt: 2, pb: 2, mt: 1 }}>
                                <DialogContentText sx={{ fontFamily: "Poppins", fontSize: "15px", color: "#323d52" }}> Selected categories will be restored for your business. </DialogContentText>
                            </DialogContent>
                            <DialogActions sx={{ justifyContent: "center", pb: 3 }}>
                                <Button onClick={closeInActiveProducts} sx={{ height: "45px",width: "125px", borderRadius: "4px", border: "1px solid #032541", color: "#032541", fontSize: "14px", fontWeight: 500, fontFamily: "Poppins", mr: 2, }} > Cancel </Button>
                                <Button onClick={() => { closeInActiveProducts(); productCategoryToRestore(); }} variant="contained" sx={{ height: "45px", width: "125px", fontSize: "14px", fontWeight: 600, fontFamily: "Poppins", backgroundColor: "#17ae7b", "&:hover": { backgroundColor: "#129867", }, }}> Restore </Button>
                            </DialogActions>
                            </Dialog>
                        </MenuItem>
                    </div>
                )
            }
        },

    ]


    //activate globally

    function ActivateProduct() {
        try {
            HttpComponent({
                method: 'PUT',
                url: `/api/updateCategory`,
                body: {
                    categoryState: "Active",
                    categoryId:checked
                },
                token: X_Authorization
            }).then((data) => {
                console.log(data , 'testttt')
               if(data.status === 202){
                    setSuccessShow({state:true ,message:data.response.message})
                    //fetchProducts()
                    getCategoryDependingOnState();
               }else {
                 setErrorShow({state:true ,message:data.response.message})
                 getCategoryDependingOnState();
                 //fetchProducts()
               }
               
            })
        } catch (error) {

        }
    }

    //deactivate
    function deactivateProduct() {
        try {
            HttpComponent({
                method: 'PUT',
                url: `/api/updateCategory`,
                body: {
                    categoryState: "Inactive",
                    categoryId:checked
                },
                token: X_Authorization
            }).then((data) => {
                console.log(data , 'testttt')
               if(data.status === 202){
                    setSuccessShow({state:true ,message:data.response.message})
                    getCategoryDependingOnState();
                    //fetchAllDeclinedProducts()
                    //fetchDeclinedProducts()

               }else {
                 setErrorShow({state:true ,message:data.response.message})
                 getCategoryDependingOnState();
                 //fetchAllDeclinedProducts()
                 //fetchDeclinedProducts()
               }
            })
        } catch (error) {

        }
    }
    


    const businessCat = localStorage.getItem('businessCategory')
    const [exportData, setExportData] = useState({ headers: [], data: [] });
    // csv data exports;
    const [csvExport, setCsvExport] = useState({ headers: [], data: [] });
    const businessName = localStorage.getItem("businessName");
    const branchName = localStorage.getItem("branch");


    

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric'};
        const formattedDate = new Date(dateString).toLocaleDateString('en-US', options);
        return formattedDate;
      };

    useEffect(() => {

        const pdfData = pageState?.data?.map((cat) => [cat?.categoryName, cat?.productService, cat?.categoryDescription,cat?.glAccountName,formatDate(cat?.dateCreated)]);
        const pdfHeaders = [['Category Name', 'Category Type','Category Description','GL Account', 'Date Created']]

        setExportData({headers : pdfHeaders , data: pdfData})

        const csvHeaders = [
            {label:'Category Name', key:'Category Name' },
            {label:'Category Type', key:'Category Type' },
            {label:'Category Description',key:'Category Description'},
            {label:'GL Account',key:'GL Account'},
            {label:'Date Created', key:'Date Created'}
        ]

        const csvData = pageState?.data?.map((cat) => {
            return {
                "Category Name":cat?.categoryName,
                "Category Type":cat?.productService,
                "Category Description":cat?.categoryDescription,
                "GL Account":cat?.glAccountName,
                "Date created":formatDate(cat?.dateCreated),
            }
        })

        setCsvExport({data: csvData , headers: csvHeaders})
    },[pageState?.data, dataGridPageSize, pageState?.data])

  console.log("cretae product or service flagState", flagState)


    return (
        <>
        <SuccessAlert vertical="top" horizontal="right" onClose={()=>setSuccessShow({...successShow, state:false})} open={successShow.state} message={successShow.message}/>
		<ErrorAlert vertical="top" horizontal="right" onClose={()=>setErrorShow({...errorShow, state:false})} open={errorShow.state} message={errorShow.message}/>
        <div>
            {flagState === 'showProducts' ?
                <Grid container direction={'column'}>
                    <Grid item display={'flex'} justifyContent={'space-between'} marginBottom={'2px'}>
                        <Grid container  display={'flex'} direction={'row'} alignContent={'center'} justifyContent={'space-between'}>
                            <Grid item>
                                 <Typography variant="h6" style={{ color: '#032541', fontWeight: 700, fontSize: "25px" }}>  {stateParams === 'Product' ? 'Product Categories' : 'Service Categories'}</Typography>
                            </Grid>
                            <Grid item>
                                <Button   onClick={() => setCategoryModalOpen(true)}  style={{color: "#032541",border:"1px solid #032541",marginRight:5,fontSize:"10px",width: "136px",height: "37px",fontWeight:700}} startIcon={<UploadFileIcon/>}>Upload File</Button>
                                 <Button onClick={() =>  handleFlagState('createproductservice')} style={{ color: '#fff', fontWeight: 400, textTransform: "inherit", background: '#032541' }}>Create Category</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item mb={'10px'} mt={'10px'}>
                        <Breadcrumbs style={{ fontFamily: 'Poppins', fontSize: '14px' }} separator={<FiberManualRecordIcon style={{ fontSize: "0.625rem", fontFamily: 'Poppins', color: "#e1e5e8" }} />} aria-label="breadcrumb">
                            {breadcrumbs}
                        </Breadcrumbs>
                    </Grid>
                    <TabContext value={tabValue}>
                        <AntTabs onChange={handleTabChange} textColor="primary" TabIndicatorProps={{ hidden: true }}>
                                <AntTab label="Active" value="Active" />
                                <AntTab label="New" value="New" />
                                <AntTab label="Edited Categories" value="Edited" />
                                <AntTab label="Deactivation Request" value="Deactivation" />
                                <AntTab label="Inactive" value="Inactive" />
                        </AntTabs>
                        <TabPanel value="Active">
                            <Grid container mt={'10px'} alignItems={"center"} justifyContent={"space-between"} >
                                <Grid item>
                                <CustomSearchInput name={'search'} placeholder={'Search'} value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
                                {/* <FormControl sx={{ m: 1, minWidth: 200 }}>
                                    <InputLabel id="demo-simple-select-label">Category:</InputLabel>
                                    <Select
                                        label="Category :"
                                        value={selectedValue}
                                        onChange={(e) => setSelectedValue(e.target.value)}
                                        displayEmpty
                                    >
                                        <MenuItem value="ALL"> ALL </MenuItem>
                                        {mapOptions.map((option) => {
                                            return (
                                                <MenuItem value={option.value}>{option.label}</MenuItem>
                                            )
                                        })}
                                    </Select>
                                </FormControl> */}
                                </Grid>

                                <Grid item>
                                    <Exports exportData={exportData} activeTabs={`${tabValue === 'Active' ? ` ${businessName?.toLocaleUpperCase()} ACTIVE CATEGORY  OF ${branchName ?  branchName?.toLocaleUpperCase() : '' } BRANCH  PRINTED ON` : '' }`} csvExport={csvExport} />
                                </Grid>
                            </Grid>
                            <Grid item >
                                        {/* <Exports */}
                            </Grid>
                            <Grid item>
                                {/* data grid to fetch all products */}
                                <DataGrid
                                    components={{ NoRowsOverlay: NoRowsOverlay }}
                                    sx={{ height: '550px', width: 'auto', fontFamily: 'Poppins', fontSize: "10px", color: '#272d3d', boxShadow: 0, border: 0 }}
                                    rowsPerPageOptions={[1, 5, 10, 20, 50, 100]}
                                    rowCount={pageState.total}
                                    loading={pageState.isLoading}
                                    pagination
                                    page={pageState.page - 1}
                                    pageSize={dataGridPageSize}
                                    paginationMode="server"
                                    onPageChange={(newPage) => { setPageState((old) => ({ ...old, page: newPage + 1, pageSize: dataGridPageSize })); }}
                                    onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                                    columns={productColumns}
                                    rows={pageState?.data}
                                    getRowId={row => row._id} />
                            </Grid>
                            {checked.length > 0 ?
                                <Grid item display={'flex'} justifyContent={'flex-end'}>
                                    <Button onClick={deactivateProduct} style={{ backgroundColor: "#dc3545",color:'#fff', textTransform:'inherit', border: "none" }}>Deactivate</Button>
                                </Grid>
                            : null}
                        </TabPanel>
                        <TabPanel value="New">
                            <Grid item mt={'10px'}>
                                <CustomSearchInput name={'search'} placeholder={'Search'} value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
                                {/* <FormControl sx={{ m: 1, minWidth: 200 }}>
                                    <InputLabel id="demo-simple-select-label">Category :</InputLabel>
                                    <Select
                                        label="Category :"
                                        value={selectedValue}
                                        onChange={(e) => setSelectedValue(e.target.value)}
                                        displayEmpty
                                    >
                                        <MenuItem value="ALL"> ALL </MenuItem>
                                        {mapOptions.map((option) => {
                                            return (
                                                <MenuItem value={option.value}>{option.label}</MenuItem>
                                            )
                                        })}
                                    </Select>
                                </FormControl> */}
                            </Grid>
                            <Grid item>
                                {/* data grid to fetch all products */}
                                <DataGrid
                                    components={{ NoRowsOverlay: NoRowsOverlay }}
                                    sx={{ height: '550px', width: 'auto', fontFamily: 'Poppins', fontSize: "10px", color: '#272d3d', boxShadow: 0, border: 0 }}
                                    rowsPerPageOptions={[1, 5, 10, 20, 50, 100]}
                                    rowCount={pageState.total}
                                    loading={pageState.isLoading}
                                    pagination
                                    page={pageState.page - 1}
                                    pageSize={dataGridPageSize}
                                    paginationMode="server"
                                    onPageChange={(newPage) => { setPageState((old) => ({ ...old, page: newPage + 1, pageSize: dataGridPageSize })); }}
                                    onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                                    columns={pendingColumns}
                                    rows={pageState?.data}
                                    getRowId={row => row._id} />
                            </Grid>

                            {checked.length > 0 ?
                                    <Grid item display={'flex'} justifyContent={'flex-end'}>
                                        <Button style={{ backgroundColor: "#dc3545", color:'#fff', textTransform:'inherit', border: "none" }}>Decline</Button>
                                        <Button style={{ backgroundColor: "#17ae7b", color:'#fff', textTransform:'inherit', border: "none", marginLeft: "10px" }}>Approve</Button>
                                    </Grid>
                                    : null
                                }

                        </TabPanel>
                        <TabPanel value="Edited">
                            <Grid item mt={'10px'}>
                                <CustomSearchInput name={'search'} placeholder={'Search'} value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
                                {/* <FormControl sx={{ m: 1, minWidth: 200 }}>
                                    <InputLabel id="demo-simple-select-label">Category :</InputLabel>
                                    <Select
                                        label="Category :"
                                        value={selectedValue}
                                        onChange={(e) => setSelectedValue(e.target.value)}
                                        displayEmpty
                                    >
                                        <MenuItem value="ALL"> ALL </MenuItem>
                                        {mapOptions.map((option) => {
                                            return (
                                                <MenuItem value={option.value}>{option.label}</MenuItem>
                                            )
                                        })}
                                    </Select>
                                </FormControl> */}
                            </Grid>
                            <Grid item>
                                {/* data grid to fetch all products */}
                                <DataGrid
                                    components={{ NoRowsOverlay: NoRowsOverlay }}
                                    sx={{ height: '550px', width: 'auto', fontFamily: 'Poppins', fontSize: "10px", color: '#272d3d', boxShadow: 0, border: 0 }}
                                    rowsPerPageOptions={[1, 5, 10, 20, 50, 100]}
                                    rowCount={pageState.total}
                                    loading={pageState.isLoading}
                                    pagination
                                    page={pageState.page - 1}
                                    pageSize={dataGridPageSize}
                                    paginationMode="server"
                                    onPageChange={(newPage) => { setPageState((old) => ({ ...old, page: newPage + 1, pageSize: dataGridPageSize })); }}
                                    onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                                    columns={editedColumns}
                                    rows={pageState?.data}
                                    getRowId={row => row._id} />
                            </Grid>

                            {checked.length > 0 ?
                                    <Grid item display={'flex'} justifyContent={'flex-end'}>
                                        <Button style={{ backgroundColor: "#dc3545", color:'#fff', textTransform:'inherit', border: "none" }}>Decline</Button>
                                        <Button style={{ backgroundColor: "#17ae7b", color:'#fff', textTransform:'inherit', border: "none", marginLeft: "10px" }}>Approve</Button>
                                    </Grid>
                                    : null
                                }

                        </TabPanel>
                        <TabPanel value="Deactivation">
                            <Grid item mt={'10px'}>
                                <CustomSearchInput name={'search'} placeholder={'Search'} value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
                                {/* <FormControl sx={{ m: 1, minWidth: 200 }}>
                                    <InputLabel id="demo-simple-select-label">Category :</InputLabel>
                                    <Select
                                        label="Category :"
                                        value={selectedValue}
                                        onChange={(e) => setSelectedValue(e.target.value)}
                                        displayEmpty
                                    >
                                        <MenuItem value="ALL"> ALL </MenuItem>
                                        {mapOptions.map((option) => {
                                            return (
                                                <MenuItem value={option.value}>{option.label}</MenuItem>
                                            )
                                        })}
                                    </Select>
                                </FormControl> */}
                            </Grid>
                            <Grid item>
                                {/* data grid to fetch all products */}
                                <DataGrid
                                    components={{ NoRowsOverlay: NoRowsOverlay }}
                                    sx={{ height: '550px', width: 'auto', fontFamily: 'Poppins', fontSize: "10px", color: '#272d3d', boxShadow: 0, border: 0 }}
                                    rowsPerPageOptions={[1, 5, 10, 20, 50, 100]}
                                    rowCount={pageState.total}
                                    loading={pageState.isLoading}
                                    pagination
                                    page={pageState.page - 1}
                                    pageSize={dataGridPageSize}
                                    paginationMode="server"
                                    onPageChange={(newPage) => { setPageState((old) => ({ ...old, page: newPage + 1, pageSize: dataGridPageSize })); }}
                                    onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                                    columns={declinedProductsColumns}
                                    rows={pageState?.data}
                                    getRowId={row => row._id} />
                            </Grid>
                            {checked.length > 0 ?
                                    <Grid item display={'flex'} justifyContent={'flex-end'}>
                                        <Button style={{ backgroundColor: "#17ae7b", color:'#fff', textTransform:'inherit', border: "none", marginLeft: "10px" }}>Restore</Button>
                                    </Grid>
                                    : null
                                }
                        </TabPanel>
                        <TabPanel value="Inactive">
                            <Grid item mt={'10px'}>
                                <CustomSearchInput name={'search'} placeholder={'Search'} value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
                                {/* <FormControl sx={{ m: 1, minWidth: 200 }}>
                                    <InputLabel id="demo-simple-select-label">Category :</InputLabel>
                                    
                                    <Select
                                        label="Category :"
                                        value={selectedValue}
                                        onChange={(e) => setSelectedValue(e.target.value)}
                                        displayEmpty
                                    >
                                        <MenuItem value="ALL"> ALL </MenuItem>
                                        {mapOptions.map((option) => {
                                            return (
                                                <MenuItem value={option.value}>{option.label}</MenuItem>
                                            )
                                        })}
                                    </Select>
                                    
                                </FormControl> */}
                            </Grid>
                            <Grid item>
                                {/* data grid to fetch all products */}
                                <DataGrid
                                    components={{ NoRowsOverlay: NoRowsOverlay }}
                                    sx={{ height: '550px', width: 'auto', fontFamily: 'Poppins', fontSize: "10px", color: '#272d3d', boxShadow: 0, border: 0 }}
                                    rowsPerPageOptions={[1, 5, 10, 20, 50, 100]}
                                    rowCount={pageState.total}
                                    loading={pageState.isLoading}
                                    pagination
                                    page={pageState.page - 1}
                                    pageSize={dataGridPageSize}
                                    paginationMode="server"
                                    onPageChange={(newPage) => { setPageState((old) => ({ ...old, page: newPage + 1, pageSize: dataGridPageSize })); }}
                                    onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                                    columns={deactivatedProductsColumns}
                                    rows={pageState?.data}
                                    getRowId={row => row._id} />
                            </Grid>
                            {checked.length > 0 ?
                                    <Grid item display={'flex'} justifyContent={'flex-end'}>
                                        <Button onClick={ActivateProduct} style={{ backgroundColor: "#17ae7b", color:'#fff', textTransform:'inherit', border: "none", marginLeft: "10px" }}>Restore</Button>
                                    </Grid>
                                    : null
                                }
                        </TabPanel>
                    </TabContext>

                    <ProductCategoryUploadModal
                        categoryOpen={categoryModalOpen}
                        onClose={handleCategoryClose}
                    />

                </Grid>
                : flagState === 'createproductservice' ? <CreateProductService goBack={handlePrev} /> : null
            }
        </div>
    </>
    )
}