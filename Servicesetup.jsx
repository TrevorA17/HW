import { Typography, Breadcrumbs, Grid, MenuItem, FormControl, Select, InputLabel, Menu, Tab, Checkbox, Dialog, DialogContent, DialogContentText, DialogTitle, DialogActions, Button, Tooltip, Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import CustomSearchInput from "../../School/CustomSearchInput";
import DeleteIcon from '@mui/icons-material/Delete';
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import HttpComponent from "../../School/MakeRequest";
import { useSelector } from "react-redux";
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from "react-router-dom";
import WarningImg from "../../../images/warning.png"
import { NoRowsOverlay } from "../../No Rows/noRowsOverlay";
import CreateNewServiceProduct from "./createmewservice";
import TabList from "@mui/lab/TabList";
import { alpha, styled } from "@mui/material/styles";
import { TabContext, TabPanel } from "@mui/lab";
import ActImg from '../../../images/actImg.svg'
import DeImg from '../../../images/crosImg.svg'
import ApprovImg from "../../../images/Appro.svg"
import { forwardRef, useEffect, useState } from "react";
import Slide from '@mui/material/Slide';
import restoreImg from "../../../images/restoreImg.svg"
import { SuccessAlert } from "../../snackBar Alerts/successAlert";
import { ErrorAlert } from "../../snackBar Alerts/errorAlert";
import DateFormatter from "../../../utils/dateFormatter";
import AddTenantService from "../../customerAccounts/tenantComponents/addServiceDetails";
import ListServicesDetails from "../../customerAccounts/tenantComponents/listServiceDetails";
import { ProductUploadModal } from "../../Modals/Upload/ProductUploadModal";
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { Exports } from "../../customerAccounts/customerComponents/exports";
import ServiceTab from "./serviceTabs";
import moment from "moment-timezone";

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


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
const AntTabService = styled((props) => <Tab disableRipple {...props} />)(({ theme }) => ({
    textTransform: "none", minWidth: 0, [theme.breakpoints.up("sm")]: { minWidth: 0 },
    fontWeight: theme.typography.fontWeightRegular, marginRight: theme.spacing(1),
    fontSize: "18px", fontStretch: "normal", fontStyle: "normal", lineHeight: "2.75",
    letterSpacing: "normal", textAlign: "left", color: "#6e7074", fontFamily: ["Poppins"].join(","),
    "&:hover": { color: "#032541", opacity: 1 }, "&.Mui-selected": { color: "#dc3545", fontWeight: 600 },
    "&.Mui-focusVisible": { backgroundColor: "blue" },
}));
const StyledMenu = styled((props) => (
    <Menu
        elevation={0}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{
            vertical: "top",
            horizontal: "right",
            frontFamily: "Poppins",
        }}
        {...props}
    />
))(({ theme }) => ({ "& .MuiPaper-root": { borderRadius: 6, marginTop: theme.spacing(1), minWidth: 18, frontFamily: "Poppins", color: theme.palette.mode === "light" ? "rgb(55, 65, 81)" : theme.palette.grey[300], boxShadow: "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px", "& .MuiMenu-list": { padding: "4px 0" }, "& .MuiMenuItem-root": { "& .MuiSvgIcon-root": { frontFamily: "Poppins", fontSize: 18, color: theme.palette.text.secondary, marginRight: theme.spacing(1.5), }, "&:active": { backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity), }, }, }, }));

export default function ServiceSetUp(props) {
    const [flagState, setFlagState] = useState('listProductService')
    const [searchValue, setSearchValue] = useState('')
    const [selectedValue, setSelectedValue] = useState('')
    const { X_Authorization } = useSelector((store) => store.user)
    const [typeOptions, setTypeOptions] = useState([])
    const [checked, setChecked] = useState([])
    const [isRowSelected, seIsRowSelected] = useState(false)
    const navigate = useNavigate()
    const [allProducts, setAllProducts] = useState([])
    const [open, setOpen] = useState(false);
    const [productModalOpen, setProductModalOpen] = useState(false)
    const [openAlertDialog, setOpenAlertDialog] = useState(false)
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
    const [successShow, setSuccessShow] = useState({ state: false, message: "" })
    const [errorShow, setErrorShow] = useState({ state: false, message: "" })
    const [openInActive, setOpenInActive] = useState(false)
    const [deleteInActive, setDeleteInActive] = useState(false)
    const localCurrency = localStorage.getItem('localCurrency')

    const openInActiveProducts = () => setOpenInActive(true)
    const closeInActiveProducts = () => setOpenInActive(false)
    const openDeleteInActiveProducts = () => setDeleteInActive(true)
    const closeDeleteInActiveProducts = () => setDeleteInActive(false)
    const { schoolTypeName, schoolTypeId } = useSelector((store) => store.schoolType.schoolTypeDetail)


    let baseUrl = import.meta.env.VITE_BASE_URL

    //bs category

    const [addService, setAddService] = useState(false)
    const businessCat = localStorage.getItem('businessCategory')
    const userGroup = localStorage.getItem('group')
    const isRental = (userGroup === 'Merchant' && businessCat === 'Rental')
    const isSchool = (userGroup === 'Merchant' && businessCat === 'School')
    const [showcol, setShowCol] = useState(true)
    const [status, setStatus] = useState()


    const handleOpen = () => {
        if (businessCat === "School") {
            navigate("/school/services/add")
        } else {
            setOpen(true)
        }

    };

    const checkCategoryState = localStorage.getItem('businessCategory')
    const productService = localStorage.getItem('product and service')
    const invertoryOn = localStorage.getItem('invetoryON')



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
                    // console.log('status getWareHouseStatus ', response.data.enabled);
                    setStatus(response?.data?.enabled)
                })

        } catch (error) {


        }


    }

    useEffect(() => {
        getWareHouseStatus()
    }, [])

    const handleCloseDialog = () => {
        setOpenAlertDialog(false)
    }
    const [productId, setProductId] = useState('')

    //const get productData to delete or activate
    const getProductId = (productId) => {
        setProductId(productId)
    }

    const handleOpenDeleteDialog = () => {
        setOpenDeleteDialog(true)
    }

    const handleCloseDeleteDialog = () => {
        setOpenDeleteDialog(false)
    }

    const handleOpenDialog = () => {
        setOpenAlertDialog(true)
    }
    //handle previous

    const handlePrevious = () => {
        setFlagState('listProductService')
    }

    //tabs
    const [tabValue, setTabValue] = useState('Active')
    const handleTabChange = (event, newValue) => {
        setTabValue(newValue)
    }

    // state

    const queryparams = decodeURIComponent(window.location.search);
    const state = queryparams.slice(1)
    const localstoredbsNumber = localStorage.getItem('businessId')

    const breadcrumbs = [
        <Typography key="X" sx={{ color: "#707070", fontSize: "0.875rem" }}>
            Dashboard
        </Typography>,
        <Typography key={"add"} sx={{ color: "#dc3545", fontSize: "0.875rem" }}>
            {state === 'Product' ? 'Products' : 'Services'}
        </Typography>
    ];


    //fetch product categories

    function fetchProductCategories() {
        try {
            HttpComponent({
                method: 'GET',
                url: `/api/listCategories/All?businessNumber=${localstoredbsNumber}`,
                token: localStorage.getItem('X-Authorization')
            }).then((data) => {
                if (data?.status === 200) {
                    setTypeOptions(data.response.data)   
                    
                }

            })
        } catch (error) {

        }
    }


    useEffect(() => {
        fetchProductCategories()
    }, []);



    const handleDeleteModal = () => {
        setOpen(true)
    }

    const handleClose = () => setOpen(false);

    //change the flagstate
    const handleFlagState = (state) => {
        setFlagState(state)
    }



    const mapOptions = typeOptions.map((option) => ({ value: option.categoryName, label: option.categoryName}))

    const [dataGridPageSize, setPageSize] = useState(10);
    const [pageState, setPageState] = useState({ isLoading: false, data: [], total: 0, page: 1, pageSize: dataGridPageSize, })

    const [selectedSchoolType, setSelectedSchoolType] = useState('')
    // get school types
    const [allSchoolCategory, setAllSchoolCategory] = useState([])
  
    function GetType_school() {
      try {
        HttpComponent({
          method: 'GET',
          url: `/api/v1/config/school_classification`,
          token: localStorage.getItem('X-Authorization')
        }).then((data) => {
          if (data?.status === 201) {
            setAllSchoolCategory(data?.response?.data)
          }
        })
      } catch (error) {
        console.log(error)
      }
    }
    useEffect(() => {
      GetType_school()
    }, [])

    //functions to fetch data depending on the tab value

    let urlActive = `/api/listProducts/${tabValue}?page=${pageState.page}&limit=${dataGridPageSize}&productService=${state}&search=${searchValue}&categoryName=${selectedValue}`

    if (tabValue === 'Inactive' && state === 'Service') {
        urlActive = `/api/listProducts/Inactive?page=${pageState.page}&limit=${dataGridPageSize}&search=${searchValue}&categoryName=${selectedValue}`;
        if (selectedSchoolType) {
            urlActive += `&classification=${selectedSchoolType}`;
        }
    }
    else if(state === 'Product'){
        urlActive = `/api/listProducts/${tabValue}?page=${pageState.page}&limit=${dataGridPageSize}&productService=${state}&search=${searchValue}&categoryName=${selectedValue}`
    }else if(state === 'Service' && !selectedSchoolType){
        urlActive = `/api/listProducts/${tabValue}?page=${pageState.page}&limit=${dataGridPageSize}&productService=${state}&search=${searchValue}&categoryName=${selectedValue}`
    }else if (state === 'Service' && selectedSchoolType){
        urlActive = `/api/listProducts/${tabValue}?page=${pageState.page}&limit=${dataGridPageSize}&productService=${state}&classification=${selectedSchoolType}&search=${searchValue}&categoryName=${selectedValue}`
    }else if (state === 'Service' && tabValue === 'Requestable'){
        urlActive =`/api/listProducts/Active?limit=${pageState.page}&limit=${dataGridPageSize}&search=${searchValue}&categoryName=${selectedValue}&productService=Service&requested=true`
    }

    // export products data

    function handleExportCSV() {
        try {
          HttpComponent({
            method: 'GET',
            url: `/api/exportproducts/${tabValue}?exportData=exportData&search=${searchValue}&categoryName=${selectedValue}`,
            token: localStorage.getItem("X-Authorization"),
          }).then((data)=>{
            if(data?.status === 200){
               setSuccessShow({state:true , message:data?.response?.message})
            }else{
              setErrorShow({state:true , message:data?.response?.message})
            }
          })
        } catch (error) {
            setErrorShow({state:true , message:error?.message})
        }
      }

    //fectch all active 

    function fetchAllActiveProducts() {
        setPageState({ ...pageState, isLoading: true, total: 0, data: [] });
        try {
            HttpComponent({
            method: 'GET',
            url: urlActive,
            token: localStorage.getItem('X-Authorization')
            }).then((data) => {
            if (data?.status === 200) {
                setPageState({
                ...pageState,
                isLoading: false,
                total: data?.response?.count,
                data: data?.response?.data?.filter((product)=>product?.productName !== 'Convenience Fee' && product?.productName !== 'Zpm Activation Fee')
                });
                console.log(data,"data.....for pdf")
            }
            });
        } catch (error) {}
    }

    useEffect(() => {
        fetchAllActiveProducts()
    }, [tabValue,state, urlActive, searchValue, businessCat , dataGridPageSize, pageState?.page, selectedSchoolType , flagState, selectedValue , props ,productModalOpen]);

    const [requestableService, setRequestableService] = useState([])

    const fetchRequestableService = () => {
        setPageState({ ...pageState, isLoading: true, total: 0, data: [] })
        try {
            HttpComponent({
                method: "GET",
                url: `/api/listProducts/Active?limit=${dataGridPageSize}&page=${pageState.page}&search=&productService=Service&requested=true`,
                token: X_Authorization
            }).then((data) => {
                setRequestableService(data.response.data)
                setPageState({ ...pageState, isLoading: false, total: data?.response?.count, data: data.response.data })

            })

        } catch (error) {
            setErrorShow({state:true , message:error?.message})
        }
    }

    useEffect(() => {
        if (tabValue === "Requestable" && state === 'Service' ) 
            fetchRequestableService()
    }, [tabValue,state, urlActive, searchValue, dataGridPageSize, selectedSchoolType, pageState?.page , props])

    const [editState ,setEditState] = useState('')
    const [isEtimsEnabled, setIsEtimsEnabled] = useState(true)

    useEffect(() => {
        const fetchBusinessInfo = async () => {
            try {
                const response = await HttpComponent({
                    method: "POST",
                    url: '/api/get_business_info',
                    body: { businessId: localStorage.getItem('businessID') },
                    token: localStorage.getItem('X-Authorization')
                });
                if (response.status === 200) {
                    setIsEtimsEnabled(response?.response?.data.etimsStatus || false);
                }
            } catch (error) {
                console.error('Error fetching business info:', error);
            }
        };
        
        fetchBusinessInfo();
    }, []);

    const productColumns = [
        {
            headerName: "productName", field: 'productName', headerAlign: 'left', align: 'left', flex: 1, renderHeader: () => { return (<strong style={{ fontSize: '14px', color: '#032541', fontWeight: 700 }} >Name</strong>) }, renderCell: (params) => {
                const getSelected = (productId) => {

                    const updatedChecked = [...checked];
                  
                    const currentIndex = updatedChecked.indexOf(productId);
                  
                    if(currentIndex === -1) {
                      updatedChecked.push(productId);
                    } else {
                      updatedChecked.splice(currentIndex, 1);
                    }
                  
                    setChecked(updatedChecked);
                  
                    seIsRowSelected(updatedChecked.includes(productId));
                  
                  };
                return (
                    <>
                        <Checkbox checked={checked.includes(params?.row?._id)}  onClick={() => getSelected(params.row._id)} style={{ marginLeft: "10px", color: isRowSelected ? '#dc3545' : null }}></Checkbox>
                        <Tooltip sx={{cursor:'pointer'}} title={params?.row?.productName} arrow>
                            <span
                                style={{
                                    fontSize: '12px',
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    maxWidth: '100%',
                                    cursor:'pointer'
                                }}
                            >
                                {params.row.productName}
                            </span>
                        </Tooltip>

                    </>
                )
            }
        },
        { headerName: "productCategory", field: 'productCategory', headerAlign: 'left', align: 'left', flex: 1, renderHeader: () => { return (<strong style={{ fontSize: '14px', fontWeight:"700", color: '#032541', }} >Category</strong>) } , renderCell:(params)=><Typography style={{fontSize:"12px"}}>{params?.row?.productCategory}</Typography> },
        { headerName: "productService", field: 'productService', headerAlign: 'left', align: 'left', flex: 1, renderHeader: () => { return (<strong style={{ fontSize: '14px', fontWeight:"700", color: '#032541',  }} >Type</strong>) } , renderCell:(params)=><Typography style={{fontSize:"12px"}}>{params?.row?.productService}</Typography> },
        { headerName: "productCode", field: 'productCode', headerAlign: 'left', align: 'left', flex: 1, renderHeader: () => { return (<strong style={{ fontSize: '14px', fontWeight:"700", color: '#032541',  }} >Product Code</strong>) } , renderCell:(params)=><Typography style={{fontSize:"12px"}}>{params?.row?.productCode}</Typography> },      
        { headerName: "priceStatus", field: 'priceStatus', headerAlign: 'left', align: 'left', flex: 1, renderHeader: () => { return (<strong style={{ fontSize: '14px',  fontWeight:"700", color: '#032541',  }} >Amount Type</strong>) }  , renderCell:(params)=><Typography style={{fontSize:"12px"}}>{params?.row?.priceStatus}</Typography>},
        { headerName: "productPrice", field: 'productPrice', headerAlign: 'left', align: 'left', flex: 1, renderHeader: () => { return (<strong style={{ fontSize: '14px', fontWeight:"700", color: '#032541', }} >{`Amount (${localCurrency})`}</strong>) } , renderCell:(params)=><Typography style={{fontSize:"12px"}}>{params?.row?.productPrice}</Typography> },
        { headerName: "buyingPrice", field: 'buyingPrice', headerAlign: 'left', align: 'left', flex: 1, renderHeader: () => { return (<strong style={{ fontSize: '14px', fontWeight:"700", color: '#032541',  }} >{`Buying Price (${localCurrency})`}</strong>) } , renderCell:(params)=><Typography style={{fontSize:"12px"}}>{params?.row?.buyingPrice}</Typography> },
        { headerName: "productDescription", field: 'productDescription', headerAlign: 'left', align: 'left', flex: 1, renderHeader: () => { return (<strong style={{ fontSize: '14px', fontWeight:"700", color: '#032541', }} >Category Description</strong>) } , renderCell:(params)=><Typography style={{fontSize:"12px"}}>{params?.row?.productDescription}</Typography> },
        {
            headerName: "Action", field: 'action', headerAlign: 'left', align: 'left', flex: 1, renderHeader: () => { return (<strong style={{ fontSize: '14px', color: '#032541', fontWeight: 700 }} >Action</strong>) },
            renderCell: (params) => {
                console.log(params , 'tttttttt')
                function deactivateProducts() {
                    try {
                        HttpComponent({
                            method: 'PUT',
                            url: `/api/updateProduct`,
                            body: {
                                productState: "Deactivation",
                                productId: [productId]
                            },
                            token: X_Authorization
                        }).then((data) => {


                            if (data.status === 202) {
                                setSuccessShow({ state: true, message: 'product has been deactivated' })
                                fetchAllActiveProducts();
                            } else {
                                setErrorShow({ state: true, message: data.response.message })
                                fetchAllActiveProducts();
                            }

                        })
                    } catch (error) {

                    }
                }

                return (
                    <div style={{ display: "flex", alignItems: 'center' }}>
                        <MenuItem disableRipple >
                            <EditIcon onClick={() =>  navigate(`/products/edit/${params.row._id}?${params?.row?.productService}`)} style={{ color: "#032541" }} />
                        </MenuItem>
                        <div>
                            <img onClick={() => { handleOpenDeleteDialog(); getProductId(params?.row?._id) }} src={DeImg} alt='activate' />
                           <Dialog
                            open={openDeleteDialog}
                            TransitionComponent={Transition}
                            keepMounted
                            onClose={handleClose}
                            PaperProps={{
                                sx: {
                                width: "350px",
                                maxWidth: "90%",
                                px: 2,
                                py: 2,
                                fontFamily: "Poppins",
                                borderRadius: 2,
                                boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)",
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
                                <Typography variant="h6" sx={{ fontWeight: 600, color: "#032541", fontSize: "18px", fontFamily: "Poppins", }} > Decline Products / Service </Typography>
                            </DialogTitle>
                            <DialogContent sx={{ pt: 2, pb: 2, mt: 1 }}>
                                <DialogContentText sx={{ fontFamily: "Poppins", fontSize: "15px", color: "#323d52" }}> Selected products or services will be declined for your business. You can restore them later. </DialogContentText>
                            </DialogContent>
                            <DialogActions sx={{ justifyContent: "center", pb: 3 }}>
                                <Button onClick={handleCloseDeleteDialog} sx={{ height: "45px", width: "125px", borderRadius: "4px", border: "1px solid #032541", color: "#032541", fontSize: "14px", fontWeight: 500, fontFamily: "Poppins", mr: 2, }} > Cancel </Button>
                                <Button onClick={() => { handleCloseDeleteDialog(); deactivateProducts(); }} variant="contained" sx={{ height: "45px", width: "125px", fontSize: "14px", fontWeight: 600, fontFamily: "Poppins", backgroundColor: "#dc3545", "&:hover": { backgroundColor: "#c9302c", }, }} > Deactivate </Button>
                            </DialogActions>
                            </Dialog>
                        </div>

                    </div>
                )
            }
        },
    ]

    if (businessCat !== 'Rental' && businessCat !== 'School') {
        const extraColum = { headerName: "reorderLevel", field: 'reorderLevel', headerAlign: 'left', align: 'left', flex: 1, renderHeader: () => { return (<strong style={{ fontSize: '14px', color: '#032541', fontWeight: 700 }} >Re-order Level</strong>) } }
        productColumns.splice(3, 0, extraColum);
    }

    if(isEtimsEnabled){
        const extraColum = { headerName: "etimsCode", field: 'etimsCode', headerAlign: 'left', align: 'left', flex: 1, renderHeader: () => { return (<strong style={{ fontSize: '14px', color: '#032541', fontWeight: 700 }} >Etims Code</strong>) } }
        const extraEtimsCodeCategory  ={ headerName: "etimsCategory", field: 'etimsCategory', headerAlign: 'left', align: 'left', flex: 1, renderHeader: () => { return (<strong style={{ fontSize: '12px', color: '#032541', fontWeight: 600 }} >Etims Category</strong>) } }
        productColumns.splice(2, 0, extraEtimsCodeCategory);
        productColumns.splice(4, 0, extraColum);

        productColumns.splice(1, 1);
        productColumns.splice(5, 1);



    }


    //pending products


    const pendingProductsColumns = [
        {
            headerName: "productName", field: 'productName', headerAlign: 'left', align: 'left', flex: 1,fontSize:12, renderHeader: () => { return (<strong style={{ fontSize: '14px', color: '#032541', fontWeight: 700 }} >Name</strong>) }, renderCell: (params) => {

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
                        <Checkbox checked={checked.includes(params?.row?._id)} onClick={() => getSelected(params.row._id)} style={{ marginLeft: "10px", color: isRowSelected ? '#dc3545' : null }}></Checkbox>
                        <Tooltip sx={{cursor:'pointer'}} title={params?.row?.productName} arrow>
                            <span
                                style={{
                                    fontSize: '12px',
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    maxWidth: '100%',
                                    cursor:'pointer'
                                }}
                            >
                                {params.row.productName}
                            </span>
                        </Tooltip>

                    </>
                )
            }
        },
        { headerName: "productCategory", field: 'productCategory', headerAlign: 'left', align: 'left', flex: 1,fontSize:12, renderHeader: () => { return (<strong style={{ fontSize: '14px', color: '#032541', fontWeight: 700 }} >Category</strong>) } , renderCell:(params)=><Typography style={{fontSize:'12px'}}>{params?.row?.productCategory}</Typography> },
        { headerName: "priceStatus", field: 'priceStatus', headerAlign: 'left', align: 'left', flex: 1,fontSize:12, renderHeader: () => { return (<strong style={{ fontSize: '14px', color: '#032541', fontWeight: 700 }} >Amount Type</strong>) } ,renderCell:(params)=><Typography style={{fontSize:'12px'}}>{params?.row?.priceStatus}</Typography>  },
        { headerName: "productPrice", field: 'productPrice', headerAlign: 'left', align: 'left', flex: 1,fontSize:12, renderHeader: () => { return (<strong style={{ fontSize: '14px', color: '#032541', fontWeight: 700 }} >Amount (KES)</strong>) },renderCell:(params)=><Typography style={{fontSize:'12px'}}>{params?.row?.productPrice}</Typography>  },
        { headerName: "buyingPrice", field: 'buyingPrice', headerAlign: 'left', align: 'left', flex: 1,fontSize:12, renderHeader: () => { return (<strong style={{ fontSize: '14px', color: '#032541', fontWeight: 700 }} >Buying Price (KES)</strong>) },renderCell:(params)=><Typography style={{fontSize:'12px'}}>{params?.row?.buyingPrice}</Typography>  },
        {
            headerName: "createdAt", field: 'createdAt', headerAlign: 'left', align: 'left', flex: 1,fontSize:12, renderHeader: () => { return (<strong style={{ fontSize: '14px', color: '#032541', fontWeight: 700 }} >Created On</strong>) }, renderCell: (params) => {
                return (
                    <>
                        <span style={{fontSize:'12px'}}>{DateFormatter(params.row.createdAt)}</span>
                    </>
                )
            }
        },
        {
            headerName: "createdBy", field: 'createdBy', headerAlign: 'left', align: 'left', flex: 1,fontSize:12, renderHeader: () => { return (<strong style={{ fontSize: '14px', color: '#032541', fontWeight: 700 }} >Created By</strong>) }, renderCell: (params) => {
                return (
                    <>
                        <span style={{fontSize:'12px'}}>{params.row.createdByName}</span>
                    </>
                )
            }
        },
        { headerName: "productDescription", field: 'productDescription', headerAlign: 'left',fontSize:12, align: 'left', flex: 1, renderHeader: () => { return (<strong style={{ fontSize: '14px', color: '#032541', fontWeight: 700 }} >Category Description</strong>) } ,renderCell:(params)=><Typography style={{fontSize:'12px'}}>{params?.row?.productDescription}</Typography>  },
        {
            headerName: "Action", field: 'action', headerAlign: 'left', align: 'left', flex: 1,fontSize:12, renderHeader: () => { return (<strong style={{ fontSize: '14px', color: '#032541', fontWeight: 700 }} >Action</strong>) },
            renderCell: (params) => {

                //activate product

                function ActivateProduct() {
                    try {
                        HttpComponent({
                            method: 'PUT',
                            url: `/api/updateProduct`,
                            body: {
                                productState: "Active",
                                productId: [productId]
                            },
                            token: X_Authorization
                        }).then((data) => {
                            if (data.status === 202) {
                                setSuccessShow({ state: true, message: data.response.message })
                                //fetchPendingProducts()
                                fetchAllActiveProducts()
                            } else {
                                setErrorShow({ state: true, message: data.response.message })
                                //fetchPendingProducts()
                                fetchAllActiveProducts()
                            }


                        })
                    } catch (error) {

                    }
                }


                //deactivate products from pending requests

                function deactivateProduct() {
                    try {
                        HttpComponent({
                            method: 'PUT',
                            url: `/api/updateProduct`,
                            body: {
                                productState: "Deactivation",
                                productId: [productId]
                            },
                            token: X_Authorization
                        }).then((data) => {
                            if (data.status === 202) {
                                setSuccessShow({ state: true, message: data.response.message })
                                // fetchPendingProducts();
                                fetchAllActiveProducts()
                            } else {
                                setErrorShow({ state: true, message: data.response.message })
                                fetchAllActiveProducts()
                               // fetchPendingProducts();
                            }

                        })
                    } catch (error) {

                    }
                }

                return (
                    <div style={{ display: "flex", alignItems: 'center', justifyContent: "space-between" }}>
                        <div>
                            <img onClick={() => { handleOpenDialog(); getProductId(params?.row?._id) }} src={ActImg} alt='activate' />
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
                                onClose={handleClose}
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
                                    <Button onClick={handleCloseDialog} style={{ border: "1px solid #032541", color: "#032541", backgroundColor: "transparent", textTransform: 'inherit', cursor: 'pointer', width: "100px", marginRight: '10px' }} onClose={handleClose}>Cancel</Button>
                                    <Button onClick={() => { handleCloseDialog(); ActivateProduct() }} style={{ backgroundColor: "#17ae7b", border: 'none', color: "#fff", textTransform: 'inherit', cursor: 'pointer', width: "100px" }}>Approve</Button>
                                </DialogActions>
                            </Dialog>
                        </div>
                        <div style={{ marginLeft: "10px" }}>
                            <img onClick={() => { handleOpenDeleteDialog(); getProductId(params?.row?._id)}} src={DeImg} alt='activate' />
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
                                onClose={handleClose}
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
                                    <Button onClick={handleCloseDeleteDialog} style={{ border: "1px solid #032541", color: "#032541", backgroundColor: "transparent", textTransform: 'inherit', cursor: 'pointer', width: "100px", marginRight: '10px' }} onClose={handleClose}>Cancel</Button>
                                    <Button onClick={() => { handleCloseDeleteDialog(); deactivateProduct() }} style={{ backgroundColor: "#dc3545", border: 'none', color: "#fff", textTransform: 'inherit', cursor: 'pointer', width: "100px" }}>Decline</Button>
                                </DialogActions>
                            </Dialog>
                        </div>
                    </div>
                )
            }
        },
    ]

    //edited products
    const editedColumns = [
        {
            headerName: "productName", field: 'productName', headerAlign: 'left', align: 'left', flex: 1,fontSize:12, renderHeader: () => { return (<strong style={{ fontSize: '14px', color: '#032541', fontWeight: 700 }} >Name</strong>) },
            renderCell: (params) => {
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
                    <div>
                        <Checkbox onClick={() => getSelected(params.row._id)} style={{ marginLeft: "10px", color: isRowSelected ? '#dc3545' : null }}></Checkbox>
                       <Tooltip sx={{cursor:'pointer'}} title={params?.row?.productName} arrow>
                            <span
                                style={{
                                    fontSize: '12px',
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    maxWidth: '100%',
                                    cursor:'pointer'
                                }}
                            >
                                {params.row.productName}
                            </span>
                        </Tooltip>

                    </div>
                )
            }
        },
        { headerName: "productCategory", field: 'productCategory', headerAlign: 'left', align: 'left', flex: 1,fontSize:12, renderHeader: () => { return (<strong style={{ fontSize: '14px', color: '#032541', fontWeight: 700 }} >Category</strong>) } },
        { headerName: "productService", field: 'productService', headerAlign: 'left', align: 'left', flex: 1,fontSize:12, renderHeader: () => { return (<strong style={{ fontSize: '14px', color: '#032541', fontWeight: 700 }} >Amount Type</strong>) } },
        { headerName: "productPrice", field: 'productPrice', headerAlign: 'left', align: 'left', flex: 1,fontSize:12, renderHeader: () => { return (<strong style={{ fontSize: '14px', color: '#032541', fontWeight: 700 }} >Amount (KES)</strong>) } },
        { headerName: "buyingPrice", field: 'buyingPrice', headerAlign: 'left', align: 'left', flex: 1,fontSize:12, renderHeader: () => { return (<strong style={{ fontSize: '14px', color: '#032541', fontWeight: 700 }} >Buying Price (KES)</strong>) } },
        {
            headerName: "createdAt", field: 'createdAt', headerAlign: 'left', align: 'left', flex: 1,fontSize:12, renderHeader: () => { return (<strong style={{ fontSize: '14px', color: '#032541', fontWeight: 700 }} >Created On</strong>) }, renderCell: (params) => {
                return (
                    <>
                        <span>{DateFormatter(params.row.createdAt)}</span>
                    </>
                )
            }
        },
        { headerName: "modifiedByName", field: 'modifiedByName', headerAlign: 'left', align: 'left', flex: 1,fontSize:12, renderHeader: () => { return (<strong style={{ fontSize: '14px', color: '#032541', fontWeight: 700 }} >Edited By</strong>) } },
        {
            headerName: "updatedAt", field: 'updatedAt', headerAlign: 'left', align: 'left', flex: 1,fontSize:12, renderHeader: () => { return (<strong style={{ fontSize: '14px', color: '#032541', fontWeight: 700 }} >Edited  On</strong>) }, renderCell: (params) => {
                return (
                    <>
                        <span>{DateFormatter(params.row.updatedAt)}</span>
                    </>
                )
            }
        },
        {
            headerName: "Action", field: 'action', headerAlign: 'left', align: 'left', flex: 1,fontSize:12, renderHeader: () => { return (<strong style={{ fontSize: '14px', color: '#032541', fontWeight: 700 }} >Action</strong>) },
            renderCell: (params) => {

                //activate the product

                function ActivateProduct() {
                    try {
                        HttpComponent({
                            method: 'PUT',
                            url: `/api/updateProduct`,
                            body: {
                                productState: "Active",
                                productId: [productId]
                            },
                            token: X_Authorization
                        }).then((data) => {
                            if (data.status === 202) {
                                setSuccessShow({ state: true, message: data.response.message })
                                fetchAllActiveProducts()
                               // fetchEditedProducts()
                            } else {
                                setErrorShow({ state: true, message: data.response.message })
                                fetchAllActiveProducts()
                               // fetchEditedProducts()
                            }


                        })
                    } catch (error) {

                    }
                }

                //deactivate products from pending requests

                function deactivateProduct() {
                    try {
                        HttpComponent({
                            method: 'PUT',
                            url: `/api/updateProduct`,
                            body: {
                                productState: "Deactivation",
                                productId: [productId]
                            },
                            token: X_Authorization
                        }).then((data) => {
                            if (data.status === 202) {
                                setSuccessShow({ state: true, message: data.response.message })
                                fetchAllActiveProducts()
                                //fetchEditedProducts()
                            } else {
                                setErrorShow({ state: true, message: data.response.message })
                                fetchAllActiveProducts()
                                //fetchEditedProducts()
                            }

                        })

                    } catch (error) {

                    }
                }

                return (
                    <div style={{ display: "flex", alignItems: 'center', justifyContent: "space-between" }}>                        
                        <div>
                            <img onClick={() => { handleOpenDeleteDialog(); getProductId(params?.row?._id) }} src={DeImg} alt='activate' />
                       <Dialog
                        open={openDeleteDialog}
                        TransitionComponent={Transition}
                        keepMounted
                        onClose={handleClose}
                        PaperProps={{
                            sx: {
                            width: "350px",
                            maxWidth: "90%",
                            px: 2,
                            py: 2,
                            fontFamily: "Poppins",
                            borderRadius: 2,
                            boxShadow:
                                "0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)",
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
                            <Typography variant="h6" sx={{ fontWeight: 600, color: "#032541", fontSize: "18px", fontFamily: "Poppins", }}> Decline Products / Service </Typography>
                        </DialogTitle>
                        <DialogContent sx={{ pt: 2, pb: 2, mt: 1 }}>
                            <DialogContentText sx={{ fontFamily: "Poppins", fontSize: "15px", color: "#323d52" }}> Selected products or services will be declined for your business. You can restore them later if needed.
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions sx={{ justifyContent: "center", pb: 3 }}>
                            <Button onClick={handleCloseDeleteDialog} sx={{ height: "45px", width: "125px", borderRadius: "4px", border: "1px solid #032541", color: "#032541", fontSize: "14px", fontWeight: 500, fontFamily: "Poppins", mr: 2, }} > Cancel </Button>
                            <Button onClick={() => { handleCloseDeleteDialog(); deactivateProduct(); }} variant="contained" sx={{ height: "45px", width: "125px", backgroundColor: "#dc3545", fontSize: "14px", fontWeight: 600, fontFamily: "Poppins", "&:hover": { backgroundColor: "#c82333", }, }}> Decline </Button>
                        </DialogActions>
                        </Dialog>
                        </div>

                        <div style={{ marginLeft: "10px" }}>
                            <img onClick={() => { handleOpenDialog(); getProductId(params?.row?._id)}} src={ActImg} alt='activate' />
                          <Dialog
                            open={openAlertDialog}
                            TransitionComponent={Transition}
                            keepMounted
                            onClose={handleClose}
                            PaperProps={{
                                sx: {
                                width: "350px",
                                maxWidth: "90%",
                                px: 2,
                                py: 2,
                                fontFamily: "Poppins",
                                borderRadius: 2,
                                boxShadow:
                                    "0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)",
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
                                <Typography variant="h6" sx={{ fontWeight: 600, color: "#032541", fontSize: "18px", fontFamily: "Poppins", }} > Approve Products / Service </Typography>
                            </DialogTitle>
                            <DialogContent sx={{ pt: 2, pb: 2, mt: 1 }}>
                                <DialogContentText sx={{ fontFamily: "Poppins", fontSize: "15px", color: "#323d52" }}> Selected products or services will be activated for your business. </DialogContentText>
                            </DialogContent>
                            <DialogActions sx={{ justifyContent: "center", pb: 3 }}>
                                <Button onClick={handleCloseDialog} sx={{ height: "45px", width: "125px", borderRadius: "4px", border: "1px solid #032541", color: "#032541", fontSize: "14px", fontWeight: 500, fontFamily: "Poppins", mr: 2, }}> Cancel </Button>
                                <Button onClick={() => { handleCloseDialog(); ActivateProduct();}} variant="contained" sx={{ height: "45px", width: "125px", backgroundColor: "#17ae7b", fontSize: "14px", fontWeight: 600, fontFamily: "Poppins", "&:hover": { backgroundColor: "#129867", }, }}> Approve </Button>
                            </DialogActions>
                            </Dialog>
                        </div>
                    </div>
                )
            }
        },


    ]




    //deactivated products

    const deactivatedProductsColumns = [
        {
            headerName: "productName", field: 'productName', headerAlign: 'left', align: 'left', flex: 1,fontSize:12, renderHeader: () => { return (<strong style={{ fontSize: '14px', color: '#032541', fontWeight: 700 }} >Name</strong>) },
            renderCell: (params) => {
                const getSelected = (productId) => {

                    const updatedChecked = [...checked];
                  
                    const currentIndex = updatedChecked.indexOf(productId);
                  
                    if(currentIndex === -1) {
                      updatedChecked.push(productId);
                    } else {
                      updatedChecked.splice(currentIndex, 1);
                    }
                  
                    setChecked(updatedChecked);
                  
                    seIsRowSelected(updatedChecked.includes(productId));
                  
                };
                // const getSelected = (productId) => {

                //     const newChecked = [...checked];

                //     const currentIndex = newChecked.indexOf(productId)
                //     if (currentIndex === -1) {
                //         newChecked.push(productId)
                //         seIsRowSelected(true)
                //     } else {
                //         newChecked.splice(currentIndex, 1)
                //         seIsRowSelected(false)
                //     }

                //     setChecked(newChecked)
                //     seIsRowSelected(true)
                // }

                return (
                    <div>
                        <Checkbox checked={checked.includes(params?.row?._id)}  onClick={() => getSelected(params.row._id)} style={{ marginLeft: "10px", color: isRowSelected ? '#dc3545' : null }}></Checkbox> 
                        {/* <Checkbox onClick={() => getSelected(params.row._id)} style={{ marginLeft: "10px", color: isRowSelected ? '#dc3545' : null }}></Checkbox> */}
                       <Tooltip sx={{cursor:'pointer'}} title={params?.row?.productName} arrow>
                            <span
                                style={{
                                    fontSize: '12px',
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    maxWidth: '100%',
                                    cursor:'pointer'
                                }}
                            >
                                {params.row.productName}
                            </span>
                        </Tooltip>

                    </div>
                )
            }
        },
        { headerName: "productCategory", field: 'productCategory', headerAlign: 'left', align: 'left', flex: 1,fontSize:12, renderHeader: () => { return (<strong style={{ fontSize: '14px', color: '#032541', fontWeight: 700 }} >Category</strong>) } },
        { headerName: "productService", field: 'productService', headerAlign: 'left', align: 'left', flex: 1,fontSize:12, renderHeader: () => { return (<strong style={{ fontSize: '14px', color: '#032541', fontWeight: 700 }} >Amount Type</strong>) } },
        { headerName: "productPrice", field: 'productPrice', headerAlign: 'left', align: 'left', flex: 1,fontSize:12, renderHeader: () => { return (<strong style={{ fontSize: '14px', color: '#032541', fontWeight: 700 }} >Amount (KES)</strong>) } },
        { headerName: "buyingPrice", field: 'buyingPrice', headerAlign: 'left', align: 'left', flex: 1,fontSize:12, renderHeader: () => { return (<strong style={{ fontSize: '14px', color: '#032541', fontWeight: 700 }} >Buying Price (KES)</strong>) } },
        {
            headerName: "createdAt", field: 'createdAt', headerAlign: 'left', align: 'left', flex: 1,fontSize:12, renderHeader: () => { return (<strong style={{ fontSize: '14px', color: '#032541', fontWeight: 700 }} >Created On</strong>) }, enderCell: (params) => {
                return (
                    <>
                        <span>{DateFormatter(params.row.createdAt)}</span>
                    </>
                )
            }
        },
        {
            headerName: "createdBy", field: 'createdBy', headerAlign: 'left', align: 'left', flex: 1,fontSize:12, renderHeader: () => { return (<strong style={{ fontSize: '14px', color: '#032541', fontWeight: 700 }} >Created By</strong>) }, renderCell: (params) => {
                return (
                    <>
                        <span>{params?.row?.createdByName}</span>
                    </>
                )
            }
        },
        {
            headerName: "updatedAt", field: 'updatedAt', headerAlign: 'left', align: 'left', flex: 1,fontSize:12, renderHeader: () => { return (<strong style={{ fontSize: '14px', color: '#032541', fontWeight: 700 }} >Declined On</strong>) }, renderCell: (params) => {
                return (
                    <>
                        <span>{DateFormatter(params.row.updatedAt)}</span>
                    </>
                )
            }
        },
        {
            headerName: "modifiedBy", field: 'modifiedBy', headerAlign: 'left', align: 'left', flex: 1,fontSize:12, renderHeader: () => { return (<strong style={{ fontSize: '14px', color: '#032541', fontWeight: 700 }} >Deactivated By</strong>) }, renderCell: (params) => {
                return (
                    <>
                        <span>{params.row.modifiedByName}</span>

                    </>
                )
            }
        },
        {
            headerName: "Action", field: 'action', headerAlign: 'left', align: 'left', flex: 1,fontSize:12, renderHeader: () => { return (<strong style={{ fontSize: '14px', color: '#032541', fontWeight: 700 }} >Action</strong>) },
            renderCell: (params) => {

                //restore deactivated product


                function ActivateServiceProduct(id) {
                    try {
                        HttpComponent({
                            method: 'PUT',
                            url: `/api/updateProduct`,
                            body: {
                                productState: "Active",
                                productId: [productId]
                            },
                            token: X_Authorization
                        }).then((data) => {
                            if (data.status === 202) {
                                setSuccessShow({ state: true, message: data.response.message })
                                //fetchDeactivatedProducts()
                                fetchAllActiveProducts()
                            } else {
                                setErrorShow({ state: true, message: data.response.message })
                               // fetchDeactivatedProducts()
                               fetchAllActiveProducts()

                            }

                        })

                    } catch (error) {

                    }
                }


                //deactivate product or service completely

                //deactivate products from pending requests


                function deactivateProduct() {
                    try {
                        HttpComponent({
                            method: 'PUT',
                            url: `/api/updateProduct`,
                            body: {
                                productState: "Inactive",
                                productId: [productId]
                            },
                            token: X_Authorization
                        }).then((data) => {
                            if (data.status === 202) {
                                setSuccessShow({ state: true, message: data.response.message })
                                fetchAllActiveProducts()
                               // fetchDeactivatedProducts()
                            } else {
                                setErrorShow({ state: true, message: data.response.message })
                               // fetchDeactivatedProducts()
                                fetchAllActiveProducts()
                            }
                        })


                    } catch (error) {

                    }
                }


                return (
                    <div style={{ display: "flex", alignItems: 'center', justifyContent: "space-between" }}>                        
                        <div>
                            <img onClick={() => { handleOpenDeleteDialog(); getProductId(params?.row?._id) }} src={DeImg} alt='activate' />
                         <Dialog
                        open={openDeleteDialog}
                        TransitionComponent={Transition}
                        keepMounted
                        onClose={handleClose}
                        PaperProps={{
                            sx: {
                            width: "350px",
                            maxWidth: "90%",
                            px: 2,
                            py: 2,
                            fontFamily: "Poppins",
                            borderRadius: 2,
                            boxShadow:
                                "0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)",
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
                            <Typography variant="h6" sx={{ fontWeight: 600, color: "#032541", fontSize: "18px", fontFamily: "Poppins", }}> Decline Products / Service </Typography>
                        </DialogTitle>
                        <DialogContent sx={{ pt: 2, pb: 2, mt: 1 }}>
                            <DialogContentText sx={{ fontFamily: "Poppins", fontSize: "15px", color: "#323d52" }}> Selected products or services will be declined for your business. You can restore them later. </DialogContentText>
                        </DialogContent>
                        <DialogActions sx={{ justifyContent: "center", pb: 3 }}>
                            <Button onClick={handleCloseDeleteDialog} sx={{ height: "45px", width: "125px", borderRadius: "4px", border: "1px solid #032541", color: "#032541", fontSize: "14px", fontWeight: 500, fontFamily: "Poppins", mr: 2, }} > Cancel </Button>
                            <Button onClick={() => { handleCloseDeleteDialog(); deactivateProduct(params.row._id); }} variant="contained" sx={{ height: "45px", width: "125px", fontSize: "14px", fontWeight: 600, fontFamily: "Poppins", backgroundColor: "#dc3545", "&:hover": { backgroundColor: "#c9302c",}, }}> Deactivate </Button>
                        </DialogActions>
                        </Dialog>
                        </div>
                        <div style={{ marginLeft: "10px" }}>
                            <img onClick={() => { handleOpenDialog(); getProductId(params?.row?._id) }} src={ActImg} alt='activate' />
                         <Dialog
                            open={openAlertDialog}
                            TransitionComponent={Transition}
                            keepMounted
                            onClose={handleClose}
                            PaperProps={{
                                sx: {
                                width: "350px",
                                maxWidth: "90%",
                                px: 2,
                                py: 2,
                                fontFamily: "Poppins",
                                borderRadius: 2,
                                boxShadow:
                                    "0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)",
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
                                <Typography variant="h6" sx={{ fontWeight: 600, color: "#032541", fontSize: "18px", fontFamily: "Poppins",}}> Restore Products / Service </Typography>
                            </DialogTitle>
                            <DialogContent sx={{ pt: 2, pb: 2, mt: 1 }}>
                                <DialogContentText sx={{ fontFamily: "Poppins", fontSize: "15px", color: "#323d52" }}> Selected products or services will be activated for your business. </DialogContentText>
                            </DialogContent>
                            <DialogActions sx={{ justifyContent: "center", pb: 3 }}>
                                <Button onClick={handleCloseDialog} sx={{ height: "45px", width: "125px", borderRadius: "4px", border: "1px solid #032541", color: "#032541", fontSize: "14px", fontWeight: 500, fontFamily: "Poppins", mr: 2,}} > Cancel </Button>
                                <Button onClick={() => { handleCloseDialog(); ActivateServiceProduct(params.row._id); }} variant="contained" sx={{ height: "45px", width: "125px", fontSize: "14px", fontWeight: 600, fontFamily: "Poppins", backgroundColor: "#17ae7b", "&:hover": { backgroundColor: "#129867", }, }} > Restore </Button>
                            </DialogActions>
                            </Dialog>
                        </div>
                    </div>
                )
            }
        },
    ]

    // inactive

    const InactiveColumns = [
        {
            headerName: "productName", field: 'productName', headerAlign: 'left', align: 'left',fontSize:12, flex: 1, renderHeader: () => { return (<strong style={{ fontSize: '14px', color: '#032541', fontWeight: 700 }} >Name</strong>) },
            renderCell: (params) => {
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
                    <div>
                        <Checkbox onClick={() => getSelected(params.row._id)} style={{ marginLeft: "10px", color: isRowSelected ? '#dc3545' : null }}></Checkbox>
                        <Tooltip sx={{cursor:'pointer'}} title={params?.row?.productName} arrow>
                            <span
                                style={{
                                    fontSize: '12px',
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    maxWidth: '100%',
                                    cursor:'pointer'
                                }}
                            >
                                {params.row.productName}
                            </span>
                        </Tooltip>

                    </div>
                )
            }
        },
        { headerName: "productCategory", field: 'productCategory', headerAlign: 'left', align: 'left', flex: 1,fontSize:12, renderHeader: () => { return (<strong style={{ fontSize: '14px', color: '#032541', fontWeight: 700 }} >Category</strong>) } , rendercell:(params)=><Typography style={{fontSize:"12px"}}>{params?.row?.productCategory}</Typography> },
        { headerName: "productService", field: 'productService', headerAlign: 'left', align: 'left', flex: 1,fontSize:12, renderHeader: () => { return (<strong style={{ fontSize: '14px', color: '#032541', fontWeight: 700 }} >Amount Type</strong>) }  ,rendercell:(params)=><Typography style={{fontSize:"12px"}}>{params?.row?.productService}</Typography>},
        { headerName: "productPrice", field: 'productPrice', headerAlign: 'left', align: 'left', flex: 1,fontSize:12, renderHeader: () => { return (<strong style={{ fontSize: '14px', color: '#032541', fontWeight: 700 }} >Amount (KES)</strong>) } ,rendercell:(params)=><Typography style={{fontSize:"12px"}}>{params?.row?.productPrice}</Typography>},
        { headerName: "buyingPrice", field: 'buyingPrice', headerAlign: 'left', align: 'left', flex: 1,fontSize:12, renderHeader: () => { return (<strong style={{ fontSize: '14px', color: '#032541', fontWeight: 700 }} >Buying Price (KES)</strong>) } ,rendercell:(params)=><Typography style={{fontSize:"12px"}}>{params?.row?.buyingPrice}</Typography>},
        {
            headerName: "createdAt", field: 'createdAt', headerAlign: 'left', align: 'left', flex: 1,fontSize:12, renderHeader: () => { return (<strong style={{ fontSize: '14px', color: '#032541', fontWeight: 700 }} >Created On</strong>) }, renderCell: (params) => {
                return (
                    <>
                        <span style={{fontSize:'12px'}}>{DateFormatter(params.row.createdAt)}</span>
                    </>
                )
            }
        },
        {
            headerName: "createdBy", field: 'createdBy', headerAlign: 'left', align: 'left', flex: 1,fontSize:12, renderHeader: () => { return (<strong style={{ fontSize: '14px', color: '#032541', fontWeight: 700 }} >Created By</strong>) }, renderCell: (params) => {
                return (
                    <>
                        <span style={{fontSize:'12px'}}>{params.row.createdBy}</span>

                    </>

                )
            }
        },
        {
            headerName: "modifiedBy", field: 'modifiedBy', headerAlign: 'left', align: 'left', flex: 1,fontSize:12, renderHeader: () => { return (<strong style={{ fontSize: '14px', color: '#032541', fontWeight: 700 }} >Deactivated By</strong>) }, renderCell: (params) => {
                return (
                    <>
                        <span style={{fontSize:'12px'}}>{params.row.modifiedByName}</span>
                    </>
                )
            }
        },
        {
            headerName: "Action", field: 'action', headerAlign: 'left', align: 'left', flex: 1,fontSize:12, renderHeader: () => { return (<strong style={{ fontSize: '14px', color: '#032541', fontWeight: 700 }} >Action</strong>) },
            renderCell: (params) => {

                function ActivateServiceProduct() {
                    try {
                        HttpComponent({
                            method: 'PUT',
                            url: `/api/updateProduct`,
                            body: {
                                productState: "Active",
                                productId: [productId]
                            },
                            token: X_Authorization
                        }).then((data) => {
                            if (data.status === 202) {
                                setSuccessShow({ state: true, message: data.response.message })
                               // fetchInActiveProducts()

                               fetchAllActiveProducts()
                            } else {
                                setErrorShow({ state: true, message: data.response.message })
                               // fetchInActiveProducts()

                               fetchAllActiveProducts()
                            }
                        })

                    } catch (error) {

                    }
                }


                return (
                    <div style={{ display: "flex", alignItems: 'center' }}>
                        <MenuItem disableRipple >
                            <img onClick={() => { openInActiveProducts(); getProductId(params?.row?._id) }} src={restoreImg} alt='activate' />
                           <Dialog
                            open={openInActive}
                            TransitionComponent={Transition}
                            keepMounted
                            onClose={handleClose}
                            PaperProps={{
                                sx: {
                                width: "350px",
                                maxWidth: "90%",
                                px: 2,
                                py: 2,
                                fontFamily: "Poppins",
                                borderRadius: 2,
                                boxShadow:
                                    "0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)",
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
                                <Typography variant="h6" sx={{ fontWeight: 600, color: "#032541", fontSize: "18px", fontFamily: "Poppins",}} > Restore Products / Service </Typography>
                            </DialogTitle>
                            <DialogContent sx={{ pt: 2, pb: 2, mt: 1 }}>
                                <DialogContentText
                                sx={{ fontFamily: "Poppins", fontSize: "15px", color: "#323d52" }}
                                >
                                Selected products or services will be restored for your business.
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions sx={{ justifyContent: "center", pb: 3 }}>
                                <Button
                                onClick={closeInActiveProducts}
                                sx={{
                                    height: "45px",
                                    width: "125px",
                                    borderRadius: "4px",
                                    border: "1px solid #032541",
                                    color: "#032541",
                                    fontSize: "14px",
                                    fontWeight: 500,
                                    fontFamily: "Poppins",
                                    mr: 2,
                                }}
                                >
                                Cancel
                                </Button>
                                <Button
                                onClick={() => {
                                    closeInActiveProducts();
                                    ActivateServiceProduct();
                                }}
                                variant="contained"
                                sx={{
                                    height: "45px",
                                    width: "125px",
                                    backgroundColor: "#17ae7b",
                                    fontSize: "14px",
                                    fontWeight: 600,
                                    fontFamily: "Poppins",
                                    "&:hover": {
                                    backgroundColor: "#129867",
                                    },
                                }}
                                >
                                Restore
                                </Button>
                            </DialogActions>
                            </Dialog>
                        </MenuItem>
                        <MenuItem disableRipple >
                            <DeleteIcon onClick={() => { openDeleteInActiveProducts(); getProductId(params?.row?._id) }} style={{ color: "#DC3545FF" }} />
                          <Dialog
                            open={deleteInActive}
                            TransitionComponent={Transition}
                            keepMounted
                            onClose={closeDeleteInActiveProducts}
                            PaperProps={{
                                sx: {
                                width: "350px",
                                maxWidth: "90%",
                                px: 2,
                                py: 2,
                                fontFamily: "Poppins",
                                borderRadius: 2,
                                boxShadow:
                                    "0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)",
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
                                <Typography variant="h6" sx={{ fontWeight: 600, color: "#032541", fontSize: "18px", fontFamily: "Poppins", }}> Delete Inactive Products / Service </Typography>
                            </DialogTitle>
                            <DialogContent sx={{ pt: 2, pb: 2, mt: 1 }}>
                                <DialogContentText sx={{ fontFamily: "Poppins", fontSize: "15px", color: "#323d52" }}> Selected products or services will be deleted from your business. <br /> This action cannot be undone.
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions sx={{ justifyContent: "center", pb: 3 }}>
                                <Button onClick={closeDeleteInActiveProducts} sx={{ height: "45px", width: "125px", borderRadius: "4px", border: "1px solid #032541", color: "#032541", fontSize: "14px", fontWeight: 500, fontFamily: "Poppins", mr: 2, }}> Cancel </Button>
                                <Button onClick={ActivateServiceProduct} variant="contained" sx={{ height: "45px", width: "125px", backgroundColor: "#DC3545FF", fontSize: "14px", fontWeight: 600, fontFamily: "Poppins", "&:hover": { backgroundColor: "#c92d3d", },}}> Delete </Button>
                            </DialogActions>
                            </Dialog>
                        </MenuItem>
                    </div>
                )
            }
        },

    ]

    const requestServiceColumns = [
        {
            headerName: "Service Name", field: 'productName', headerAlign: 'left', align: 'left', flex: 1, fontSize:'12px', renderHeader: () => { return (<strong style={{ fontSize: '12px', color: '#032541', fontWeight: 600 }} >Service Name</strong> )}, renderCell:(params)=><Typography style={{fontSize:'12px'}}>{params?.row?.productName}</Typography> ,
        },
        {
            headerName: "Course", field: 'grade', headerAlign: 'left', align: 'left', flex: 1, renderHeader: () => { return (<strong style={{ fontSize: '12px', color: '#032541', fontWeight: 600 }} > {schoolTypeName.includes("University") ? "Course" : "Grade"} </strong>) },renderCell:(params)=><Typography style={{fontSize:'12px'}}>{params?.row?.grade}</Typography>
        },
        {
            headerName: "Amount Type", field: 'priceStatus', headerAlign: 'left', align: 'left', flex: 1,fontSize:12, renderHeader: () => { return (<strong style={{ fontSize: '12px', color: '#032541', fontWeight: 600 }} >Amount Type</strong>) },renderCell:(params)=><Typography style={{fontSize:'12px'}}>{params?.row?.priceStatus}</Typography>
        },
        {
            headerName: "Service Type", field: 'serviceType', headerAlign: 'left', align: 'left', flex: 1,fontSize:12, renderHeader: () => { return (<strong style={{ fontSize: '12px', color: '#032541', fontWeight: 600 }} >Service Type</strong>) },renderCell:(params)=><Typography style={{fontSize:'12px'}}>{params?.row?.serviceType}</Typography>
        },

        {
            headerName: "Term", field: 'term', headerAlign: 'left', align: 'left', flex: 1,fontSize:12, renderHeader: () => { return (<strong style={{ fontSize: '12px', color: '#032541', fontWeight: 600 }} > {schoolTypeName.includes("University") ? "Semester" : "Term"}</strong>) },renderCell:(params)=><Typography style={{fontSize:'12px'}}>{params?.row?.term}</Typography>
        },
        {
            headerName: "Amount", field: 'productPrice', headerAlign: 'left', align: 'left', flex: 1,fontSize:12, renderHeader: () => { return (<strong style={{ fontSize: '12px', color: '#032541', fontWeight: 600 }} >Amount</strong>) },renderCell:(params)=><Typography style={{fontSize:'12px'}}>{params?.row?.productPrice}</Typography>
        },
        {
            renderCell: (params) => {
                return (
                    <div>
                        <Typography style={{fontSize:"12px"}}>{params.row.serviceExpiry ? moment(params.row.serviceExpiry).format('DD/MM/YYYY') : "N/A"}</Typography>
                    </div>
                )
            }
        },

        {
            headerName: "Action", field: 'action', headerAlign: 'left', align: 'left', flex: 1, renderHeader: () => { return (<strong style={{ fontSize: '12px', color: '#032541', fontWeight: 600 }} >Action</strong>) },
            renderCell: (params) => {

                function deactivateProducts() {
                    try {
                        HttpComponent({
                            method: 'PUT',
                            url: `/api/updateProduct`,
                            body: {
                                productState: "Deactivation",
                                productId: [productId]
                            },
                            token: X_Authorization
                        }).then((data) => {


                            if (data.status === 202) {
                                setSuccessShow({ state: true, message: 'product has been deactivated' })
                                fetchAllActiveProducts();
                            } else {
                                setErrorShow({ state: true, message: data.response.message })
                                fetchAllActiveProducts();
                            }

                        })
                    } catch (error) {

                    }
                }

                return (
                    <div style={{ display: "flex", alignItems: 'center' }}>
                        <MenuItem disableRipple >
                            <EditIcon onClick={() => navigate(`/products/edit/${params.row._id}?${params?.row?.productService}`)} style={{ color: "#032541" }} />
                        </MenuItem>
                        <div>
                            <img onClick={() => { handleOpenDeleteDialog(); getProductId(params?.row?._id) }} src={DeImg} alt='activate' />
                            <Dialog
                                open={openDeleteDialog}
                                TransitionComponent={Transition}
                                keepMounted
                                PaperProps={{
                                    style: {
                                        height: "300px",
                                        width: "400px",
                                        boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)"
                                    },
                                }}
                                onClose={handleClose}
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
                                    <Button onClick={handleCloseDeleteDialog} style={{ border: "1px solid #032541", color: "#032541", backgroundColor: "transparent", textTransform: 'inherit', cursor: 'pointer', width: "100px", marginRight: '10px' }} onClose={handleClose}>Cancel</Button>
                                    <Button onClick={() => { handleCloseDeleteDialog(); deactivateProducts() }} style={{ backgroundColor: "#dc3545", border: 'none', color: "#fff", textTransform: 'inherit', cursor: 'pointer', width: "100px", paddingLeft: "10px" }}>Deactivate</Button>
                                </DialogActions>
                            </Dialog>
                        </div>

                    </div>
                )
            }
        },


    ]

    function ActivateProduct() {
        try {
            HttpComponent({
                method: 'PUT',
                url: `/api/updateProduct`,
                body: {
                    productState: "Active",
                    productId: checked
                },
                token: X_Authorization
            }).then((data) => {

                if (data.status === 202) {
                    setSuccessShow({ state: true, message: data.response.message })
                    seIsRowSelected(false)
                    // fetchDeactivatedProducts()
                    // fetchInActiveProducts()
                    // fetchEditedProducts()
                     fetchAllActiveProducts()
                    // fetchPendingProducts()
                } else {
                    setErrorShow({ state: true, message: data.response.message })
                }
                //fetchAllActiveProducts()
               // fetchPendingProducts()
            })
        } catch (error) {

        }
    }

    //deactivate a product

    function deactivateProduct() {
        try {
            HttpComponent({
                method: 'PUT',
                url: `/api/updateProduct`,
                body: {
                    // productState: "Inactive",
                    productState: "Deactivation",
                    productId: checked
                },
                token: X_Authorization
            }).then((data) => {
                if (data.status === 202) {
                    setSuccessShow({ state: true, message: data.response.message })
                    seIsRowSelected(false)
                    // fetchDeactivatedProducts()
                    // fetchInActiveProducts()
                    // fetchEditedProducts()
                    fetchAllActiveProducts()
                    // fetchPendingProducts()

                } else {
                    setErrorShow({ state: true, message: data.response.message })
                   // fetchDeactivatedProducts()
                }

            })

        } catch (error) {

        }
    }

    function declineProduct() {
        try {
            HttpComponent({
                method: 'PUT',
                url: `/api/updateProduct`,
                body: {
                    productState: "Deactivation",
                    productId: checked
                },
                token: X_Authorization
            }).then((data) => {
                if (data.status === 202) {
                    setSuccessShow({ state: true, message: data.response.message })
                    seIsRowSelected(false)
                    // fetchDeactivatedProducts()
                    // fetchInActiveProducts()
                    // fetchEditedProducts()
                    fetchAllActiveProducts()
                    // fetchPendingProducts()
                } else {
                    setErrorShow({ state: true, message: data.response.message })
                    // fetchDeactivatedProducts()
                }

            })

        } catch (error) {

        }
    }


    // list services

    const handleListService = () => {
        if (flagState === 'listServices') {
            return <ListServicesDetails />
        } else {
            return null
        }
    }
    const handleProductClose = () => {
        setProductModalOpen(false)
    }

    const [exportData, setExportData] = useState({ headers: [], data: [] });
    // csv data exports;
    const [csvExport, setCsvExport] = useState({ headers: [], data: [] });
    const businessName = localStorage.getItem("businessName");
    const branchName = localStorage.getItem("branch")

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric'};
        const formattedDate = new Date(dateString).toLocaleDateString('en-US', options);
        return formattedDate;
      };
    // exports Data;
    useEffect(() => {


        

        if (tabValue === 'Active') {
            // pdf Data;
            const pdfData = pageState?.data?.map((prod) => [prod?.productName, prod?.productService, prod?.priceStatus, prod?.productCategory, prod?.buyingPrice,prod?.productCode,prod?.productDescription,prod?.priceStatus,formatDate(prod?.createdAt)])
            const pdfHeaders = [["Service Name", "Service Type", "Price Status", "Service Category", "Buying Price","Service Code", "Service Description","AmontType ","Date created"]]

            setExportData({ headers: pdfHeaders, data: pdfData })

            const csvHeaders = [
                { label: 'Service Name', key: 'Service Name' },
                { label: 'Service Type', key: 'Service Type' },
                { label: 'Price Status', key: 'Price Status' },
                { label: 'Service Category', key: 'Service Category' },
                { label: 'Buying Price', key: 'Buying Price' },
                {label: 'Service Code ',key:'Service Code'},
                { label :'Service Descritption',key:'Service Description'},
                {label :'Amount Type', key:'Amount Type'},
                {label:'Date Created',key :'Date Created'}
            ]

            const csvData = pageState?.data?.map((prod) => {
                return {
                    "Service Name": prod?.productName,
                    "Service Type": prod?.productService,
                    "Price Status": prod?.priceStatus,
                    "Service Category": prod?.Category,
                    "Buying Price": prod?.buyingPrice,
                    "Service Code":prod?.productCode,
                    "Service Descritption":prod?.productDescription,
                    "Amount Type":prod?.priceStatus,
                    "Date Created":formatDate(prod?.createdAt)
                }
            })

            setCsvExport({ data: csvData, headers: csvHeaders })
        }
    }, [dataGridPageSize, pageState?.page, , pageState?.data])



    return (
        <>
            {addService ? <AddTenantService setFlagListServices={handleListService} isFromProducts={true} doneSaving={() => { setAddService(false) }} /> :
                <>
                    <SuccessAlert vertical="top" horizontal="right" onClose={() => setSuccessShow({ ...successShow, state: false })} open={successShow.state} message={successShow.message} />
                    <ErrorAlert vertical="top" horizontal="right" onClose={() => setErrorShow({ ...errorShow, state: false })} open={errorShow.state} message={errorShow.message} />
                    <div>
                        {flagState === 'listProductService' ?
                            <Grid container direction={'column'}>
                                <Grid item display={'flex'} justifyContent={'space-between'} marginBottom={'2px'}>
                                    <Typography variant="h6" style={{ color: '#032541', fontWeight: 700, fontSize: "25px" }}>  {state === 'Product' ? 'Products' : 'Services'}</Typography>
                                    <Grid item>

                                        {/* {businessCat !== 'Rental' && businessCat !== 'School' ? <Button onClick={() => setProductModalOpen(true)} style={{ color: "#032541", border: "1px solid #032541", marginRight: 5, fontSize: "10px", width: "136px", height: "37px", fontWeight: 700 }} startIcon={<UploadFileIcon />}>Upload File</Button> : null} */}
                                        <Button onClick={() => setProductModalOpen(true)} style={{ color: "#032541", border: "1px solid #032541", marginRight: 5, fontSize: "10px", width: "136px", height: "37px", fontWeight: 700 }} startIcon={<UploadFileIcon />}>Upload File</Button>
                                        <Button onClick={() => checkCategoryState === "Rental" ? setAddService(true) : checkCategoryState === 'School' && productService === "false" ? handleOpen() : businessCat === "School" && productService === "true" ? handleFlagState('createproductorservice') : handleFlagState('createproductorservice')}
                                            style={{ color: '#fff', border: "none", fontWeight: 400, marginLeft: "10px", textTransform: "inherit", background: '#032541' }}>
                                            {businessCat === "School" && productService === "false" || businessCat === "Rental" ? "Add Service" : businessCat === "School" && productService === "true" ? "Create Product/Service" : "Create Product/Service"}
                                        </Button>
                                    </Grid>
                                </Grid>
                                <Grid item mb={'10px'} mt={'10px'}>
                                    <Breadcrumbs style={{ fontFamily: 'Poppins', fontSize: '14px' }} separator={<FiberManualRecordIcon style={{ fontSize: "0.625rem", fontFamily: 'Poppins', color: "#e1e5e8" }} />} aria-label="breadcrumb">
                                        {breadcrumbs}
                                    </Breadcrumbs>
                                </Grid>
                                {/* {businessCat === "School" ? <ServiceTab state={'service'}/> : null} */}

                                <TabContext value={tabValue}>
                                     {businessCat === "School" && state === "Service" ? (
                                        <>
                                        {/* Primary Tabs */}
                                        <AntTabs onChange={handleTabChange} textColor="primary" TabIndicatorProps={{ hidden: true }}>
                                            <AntTab label="Service" value="Active" />
                                            <AntTab label="Requestable" value="Requestable" />
                                        </AntTabs>

                                        {/* Secondary Filter Tabs*/}
                                        <Box sx={{ mt: -2 }}>
                                        <AntTabs onChange={handleTabChange} textColor="primary" TabIndicatorProps={{ hidden: true }}>
                                            <AntTab label="Active"  value="Active"/>
                                            <AntTab label="Edited" value="Edited" />
                                            <AntTab label="Deactivation Request" value="Deactivation" />
                                            <AntTab label="Inactive" value="Inactive" />
                                            </AntTabs>
                                        </Box>
                                        </>
                                    ) :
                                        <AntTabs onChange={handleTabChange} textColor="primary" TabIndicatorProps={{ hidden: true }}>
                                            <AntTab label="Active" value="Active" />
                                            <AntTab label="New" value="New" />
                                            <AntTab label="Edited Products" value="Edited" />
                                            <AntTab label="Deactivation Request" value="Deactivation" />
                                            <AntTab label="Inactive" value="Inactive" />
                                        </AntTabs>
                                    }
                                    <TabPanel value="Active">
                                        <Grid container width={'100%'} alignItems={'center'} direction={'row'} justifyContent={'space-between'} mt={'10px'}>
                                            <Grid item display={'flex'} alignItems={'center'}>
                                                <CustomSearchInput  name={'search'} placeholder={'Search'} value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
                                                <FormControl sx={{ mx: 1, minWidth: 200 ,mt:-0.7, height: "3.438rem" }}>
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
                                                </FormControl>
                                                {businessCat === 'School' && schoolTypeName === 'Kindergarten/Junior/High School' ?
                                                    <FormControl style={{ width: "200px", marginLeft: "10px", marginTop:-0.7, marginRight: "10px", height: "3.438rem", border: "solid 1px #cdd39d9", color: "#fff" }}>
                                                        <InputLabel id="year-select-label">School Type</InputLabel>
                                                        <Select
                                                            labelId="year-select-label"
                                                            id="year-select"
                                                            value={selectedSchoolType}
                                                            label="School Type"
                                                            onChange={(e) => setSelectedSchoolType(e.target.value)}
                                                        >
                                                            <MenuItem value="">
                                                                Select School
                                                            </MenuItem>
                                                            {allSchoolCategory.map((school) => (
                                                                <MenuItem key={school} value={school}>
                                                                    {school}
                                                                </MenuItem>
                                                            ))}
                                                        </Select>
                                                    </FormControl> : null}
                                            </Grid>
                                            <Grid item>
                                                <Exports exportData={exportData} activeTabs={`${tabValue === 'Active' ? ` ${businessName?.toLocaleUpperCase()} ACTIVE PRODUCTS  OF ${branchName?.toLocaleUpperCase()} BRANCH  PRINTED ON` : ''}`} csvExport={csvExport} sendCSVEmail={handleExportCSV}/>
                                            </Grid>
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
                                                getRowId={row => row?._id} />
                                        </Grid>
                                        {checked.length > 0 ?
                                            <Grid item display={'flex'} justifyContent={'flex-end'}>
                                                <Button onClick={deactivateProduct} style={{ backgroundColor: "#dc3545", border: "none", textTransform:"inherit" , color:'#fff' }}>Deactivate</Button>
                                            </Grid>
                                            : null}
                                    </TabPanel>
                                    <TabPanel value="New">
                                        <Grid item mt={'10px'}>
                                            <CustomSearchInput name={'search'} placeholder={'Search'} value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
                                            <FormControl sx={{ m: 1, minWidth: 200 }}>
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
                                            </FormControl>
                                        </Grid>
                                        <Grid item>
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
                                                columns={pendingProductsColumns}
                                                rows={pageState?.data}
                                                getRowId={row => row?._id} />

                                        </Grid>
                                        {checked.length > 0 ?
                                            <Grid item display={'flex'} justifyContent={'flex-end'}>
                                                <Button onClick={declineProduct} style={{ backgroundColor: "#dc3545", border: "none" , textTransform:"inherit" , color:"#fff" }}>Decline</Button>
                                                <Button onClick={ActivateProduct} style={{ backgroundColor: "#17ae7b", border: "none", marginLeft: "10px" ,  textTransform:"inherit" , color:"#fff" }}>Approve</Button>
                                            </Grid>
                                            : null
                                        }

                                    </TabPanel>
                                    <TabPanel value="Edited">
                                        <Grid item mt={'10px'}>
                                            <CustomSearchInput name={'search'} placeholder={'Search'} value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
                                            <FormControl sx={{ m: 1, minWidth: 200 }}>
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
                                            </FormControl>

                                        </Grid>
                                        <Grid item>
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
                                                getRowId={row => row?._id} />

                                        </Grid>
                                        {checked.length > 0 ?
                                            <Grid item display={'flex'} justifyContent={'flex-end'}>
                                                <Button onClick={declineProduct} style={{ backgroundColor: "#dc3545", border: "none" , textTransform:'inherit' ,color:'#fff' }}>Deactivate</Button>
                                                <Button onClick={ActivateProduct} style={{ backgroundColor: "#17ae7b", border: "none", marginLeft: "10px" , textTransform:'inherit',color:'#fff' }}>Activate</Button>
                                            </Grid>
                                            : null
                                        }

                                    </TabPanel>
                                    <TabPanel value="Deactivation">
                                        <Grid item mt={'10px'}>
                                            <CustomSearchInput name={'search'} placeholder={'Search'} value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
                                            <FormControl sx={{ m: 1, minWidth: 200 }}>
                                                <InputLabel id="demo-simple-select-label">Category :</InputLabel>
                                                <Select
                                                    label="Category :"
                                                    value={selectedValue}
                                                    onChange={(e) => setSelectedValue(e.target.value)}
                                                    displayEmpty
                                                >
                                                    <MenuItem value="ALL"> ALL </MenuItem>
                                                    checkboxSelection {mapOptions.map((option) => {
                                                        return (
                                                            <MenuItem value={option.value}>{option.label}</MenuItem>
                                                        )
                                                    })}
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid item>
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
                                                getRowId={row => row?._id} />

                                        </Grid>
                                        {checked.length > 0 ?
                                            <Grid item display={'flex'} justifyContent={'flex-end'}>
                                                <Button onClick={deactivateProduct} style={{ backgroundColor: "#dc3545", border: "none",textTransform:'inherit', color:'#fff' }}>Decline</Button>
                                                <Button onClick={ActivateProduct} style={{ backgroundColor: "#17ae7b", border: "none", marginLeft: "10px" ,color:'#fff',textTransform:'inherit' }}>Approve</Button>
                                            </Grid>
                                            : null
                                        }
                                    </TabPanel>
                                    <TabPanel value="Inactive">
                                        <Grid item mt={'10px'}>
                                            <CustomSearchInput name={'search'} placeholder={'Search'} value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
                                            <FormControl sx={{ m: 1, minWidth: 200 }}>
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
                                            </FormControl>
                                        </Grid>
                                        <Grid item>
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
                                                columns={InactiveColumns}
                                                rows={pageState?.data}
                                                getRowId={row => row._id} />

                                        </Grid>
                                        {checked.length > 0 ?
                                            <Grid item display={'flex'} justifyContent={'flex-end'}>
                                                <Button onClick={declineProduct} style={{ backgroundColor: "#dc3545", border: "none" , textTransform:"inherit" , color:'#fff' }}>Deactivate</Button>
                                                <Button onClick={ActivateProduct} style={{ backgroundColor: "#17ae7b", border: "none", marginLeft: "10px" ,textTransform:"inherit" , color:'#fff' }}>Restore</Button>
                                            </Grid>
                                            : null}
                                    </TabPanel>
                                    <TabPanel value="Requestable">
                                        <Grid item mt={'10px'}>
                                            <CustomSearchInput name={'search'} placeholder={'Search'} value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
                                            <FormControl sx={{ m: 1, minWidth: 200 }}>
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
                                            </FormControl>
                                        </Grid>
                                        <Grid item>
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
                                                columns={requestServiceColumns}
                                                rows={requestableService}
                                                getRowId={row => row?._id} />

                                        </Grid>
                                        {checked.length > 0 ?
                                            <Grid item display={'flex'} justifyContent={'flex-end'}>
                                                <Button onClick={declineProduct} style={{ backgroundColor: "#dc3545", border: "none" , textTransform:"inherit" , color:'#fff'  }}>Deactivate</Button>
                                                <Button onClick={ActivateProduct} style={{ backgroundColor: "#17ae7b", border: "none",textTransform:"inherit", marginLeft: "10px" , color:'#fff' }}>Restore</Button>
                                            </Grid>
                                            : null}
                                    </TabPanel>
                                </TabContext>

                                <ProductUploadModal productOpen={productModalOpen} onClose={handleProductClose} />
                            </Grid>
                            : flagState === 'createproductorservice' ? <CreateNewServiceProduct goBack={handlePrevious} /> : null}
                    </div>
                </>
            }
        </>
    )
}