import React, { lazy, Suspense , useEffect} from "react";
import CssBaseline from '@mui/material/CssBaseline';
import { useSelector } from "react-redux";
// import ParentPayOptions from "./components/customerAccounts/customerComponents/parentPay";
// import TenantDetails from "./components/customerAccounts/tenantComponents/tenantDetails";
import TenantInvoicePreview from "./components/customerAccounts/tenantComponents/tenantInvoice";
import TenantPayInvoice from "./components/customerAccounts/tenantComponents/tenantPayInvoice";
import TenantPaymentOption from "./components/customerAccounts/tenantComponents/tenantPaymentOptions";
import Tenants from "./components/customerAccounts/tenants";
import NewUserDashboard from "./components/Dashboard/newUserDashboard";


import Signup from "./components/login/signup";
import CreateBusiness from "./components/new user/createBusiness";
import AddServiceFromInvoice from "./components/Rental/components/invoice/addServiceFromInvoice";
import DefineUnits from "./components/Rental/components/Units/defineUnits";
import PreviewTenantInvoice from "./components/Rental/components/invoice/previewTenantInvoice";
import RentalMultiSetup from "./components/Rental/rentalBusinessSetup";
import Transactions from "./components/transactions/transactions";
import Terminal from "./components/terminals/terminals";
import Otp from "./components/otp/otp";
import ResetPassword from "./components/passwordReset/reset";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Unauthorised from "./components/unauthorised/unauthorised";
import Logout from "./components/logout/logout";
import Shops from "./components/shops/shops";
import BusinessTerminals from "./components/businessTerminals/businessTerminals";
import Users from "./components/users/users";
import UserGroupsState from "./components/users/userGroups";
import Groups from "./components/groups/groups";
import Stock from "./components/products/stock";
import TransferStockTable from "./components/products/transferStockTable";
import ForgotPass from "./components/login/forgotPass";
import ResetSuccess from "./components/passwordReset/successReset";
import SentMail from "./components/passwordReset/sentMail";
import ForgotReset from "./components/passwordReset/forgotReset";
import ResetPin from "./components/passwordReset/resetPin";
import ResetExpPass from "./components/passwordReset/resetExpiredPass";
import Configuration from "./components/configuration/config";
import Reasons from "./components/configuration/reasons";
import BusinessCategories from "./components/configuration/businessCategories";
import ReportsByCashier from "./components/reports/reportsByCashier";
import ReportsUnpaidOrdersByCashier from "./components/reports/reportsUnpaidOrdersByCashier";
import ReportsDetailedSalesByCashier from "./components/reports/reportsDetailedSalesByCashier";
import ReportSalesTotalByProduct from "./components/reports/reportSalesTotalByProduct";
import ReportSalesTotalByProductByPayment from "./components/reports/reportSalesTotalByProductByPayment";
import ReportSalesTotalByProductCategory from "./components/reports/reportSalesTotalByProductCategory";
import ReportFailedSales from "./components/configuration/reportFailedSales";
import Customerdetails from "./components/customerAccounts/customerComponents/customerdetails";
import InvoicePreview from "./components/customerAccounts/customerComponents/invoicePreview";
import Invoices from "./components/shops/invoices";
import Startorder from "./components/bills/startorder";
import OrdersListing from "./components/pos/orderslisting"
import DetailedBills from "./components/bills/billscomponents/DetailedBills";
import Invoice from "./components/customerAccounts/customerComponents/invoice";
import { StockConfig } from "./components/configuration/stockConfigs";
import { BusinessConfig } from "./components/configuration/businessConfigs";
import InvoiceReminderForm from "./components/configuration/InvoiceReminderForm";
import Detailedbill from "./components/bills/billscomponents/detailedbill";
import { NotFound } from "./common/404NotFound";
import "./common/font/Poppins-Regular.ttf";
import CustomerAccountDash from "./components/customerAccounts/customerAccountDash";
import PrivateRoutes from "./components/layouts/PrivateRoutes";
import PublicRoutes from "./components/layouts/PublicRoutes";
import { SchoolCustomers } from "./components/customerAccounts/customerComponents/schoolCustomers";
import { ParentProfile } from "./components/customerAccounts/customerComponents/parentProfile";
import { StudentProfile } from "./components/customerAccounts/customerComponents/studentProfile";
import { SchoolStudents } from "./components/customerAccounts/customerComponents/schoolStudents";
import CreateEmergency from './components/customerAccounts/customerComponents/addContacts';
import EditProfile from './components/customerAccounts/customerComponents/editStudentProfile';
import { StudentDash } from "./components/customerAccounts/studentDash";
import SchoolInvoicePreview from "./components/customerAccounts/customerComponents/schoolInvoicePreview";
import Receipts from "./components/customerAccounts/customerComponents/receipts";
import Receipt from "./components/customerAccounts/customerComponents/receipt";
import Expenditure from "./components/expenditure/expenditure";
import AddExpense from "./components/expenditure/addExpense"
import Cashier from "./components/cashier/cashier";
import SettleCashier from "./components/cashier/settlecashier";
import SchoolSetup from "./components/School/SchoolSetup";
import SchoolInvoiceBatches from "./components/School/InvoiceBatches";
import InvoicesInBatch from "./components/School/InvoicesInBatch";
import GenerateSchoolInvoices from "./components/School/GenerateSchoolInvoices";
import CreditNotePage from "./components/creditnote/creditnote";
import VouchersPage from "./components/vouchers/vouchers";
import ReportAllCashiersSettle from "./components/cashier/allcashiers";
import OpeningAndClosingReport from "./components/reports/closingandOpening";
import SchoolListParents from "./components/School/SchoolListParents";
import SchoolAddParent from "./components/School/SchoolAddParent";
import SchoolListStudents from "./components/School/SchoolListStudents";
import VoucherDetails from "./components/vouchers/voucherdetails";
import VoucherGiftPreview from "./components/vouchers/vouchergift";
import UploadParentsStudents from "./components/School/UploadParentsStudents";
import EditSchoolInvoice from "./components/School/editSchoolInvoice";
import UnauthInvoice from "./components/School/UnauthInvoice";
import UnauthPayment from "./components/School/UnauthPayment";
import PaymentSetup from "./components/PaymentSetup/paymentSetup";
import TransactionSummary from "./components/Rental/Dashboard/calenderDrillDown";
import SchoolAddService from "./components/School/SchooAddService";
import AddUsers from "./components/users/addUsers";
import Createcreditnote from "./components/creditnote/creditnotecomponents/createcreditnote";
import Units from "./components/customerAccounts/tenantComponents/units";
import OccupiedUnits from "./components/customerAccounts/tenantComponents/units/occupiedUnits";
import UnoccupiedUnits from "./components/customerAccounts/tenantComponents/units/unoccupiedUnits";
import TenantInvoice from "./components/customerAccounts/tenantComponents/Invoice & Receipts/invoice";
import TenantReceipt from "./components/customerAccounts/tenantComponents/Invoice & Receipts/receipts";
import Previewcreditnote from "./components/creditnote/creditnotecomponents/previewcreditNote";
import PaymentSettingUp from "./components/paymentmodule/paymentsettingup";
import TenantStatement from "./components/customerAccounts/tenantComponents/tenantDetails/tenantStatement";
import TenantReport from "./components/customerAccounts/tenantComponents/tenantReport";
import TenantPreviewInvoice from "./components/customerAccounts/tenantComponents/Invoice & Receipts/tenantPreviewInvoice";
import HousingHistory from "./components/customerAccounts/tenantComponents/houseHistory/unitHistory";
import AddStudentExistingParent from "./components/School/addstudentexistingparent";
import ParentEdit from "./components/customerAccounts/customerComponents/parentEdit";
import AddSecondaryParent from "./components/customerAccounts/customerComponents/addSecondaryParent.jsx";
import Suppliers from './components/warehouse/suppliers';
import Employee from './components/warehouse/employee';
import { Addsupplier } from "./components/warehouse/supplierscomponents/createsupplier";
import ServiceForm from "./components/School/ServiceForm";
import ParentPayMakePayment from "./components/School/parentmakepayment";
import SchoolReports from './components/School/studentsreports';
import CreateEtimsInvoice from "./components/customerAccounts/customerComponents/createInvoiceEtims";

import Warehouses from "./components/warehouse/warehouse";
import Addwarehouse from "./components/warehouse/warehousecomponents/addwarehouse";
import Substores from "./components/warehouse/substores";
import Addsubstore from "./components/warehouse/substorecomponents/addsubstore";
import Mainstores from "./components/warehouse/mainstore";
import MainStoreEdit from "./components/warehouse/mainstorecomponents/mainstoreEdit";
import Createcustomer from "./components/customerAccounts/customerComponents/createcustomer";
import Customerlist from "./components/customerAccounts/customerlist";
import SupplierList from "./components/customerAccounts/SupplierList";
import AddSupplier from "./components/customerAccounts/supplierComponents/AddSupplier";
import SchoolTranscations from "./components/School/schooltranscations";
import { CreditAccount } from "./components/customerAccounts/customerComponents/creditaccount";
import { CreateInvoice } from "./components/Modals/Invoice/createInvoice";
import GeneralBusinessSetup from "./components/GenaralBusiness/generalBusinessSetup";
import NoticePdf from "./components/customerAccounts/tenantComponents/tenantsExit/NoticePdf";
import StudentPaymentHistory from "./components/School/studentpayments";
import EditTenantInfo from "./components/Rental/components/Tenant/EditTenant";
import BusinessInvoice from "./components/customerAccounts/customerComponents/businessinvoices";
import CustomerReceipts from "./components/customerAccounts/customerComponents/customerreceipts";
import Paymentreceipt from "./components/customerAccounts/customerComponents/paymentreceipt";
import TenantConfig from "./components/configuration/tenantConfig";

import StatementPreveiw from "./components/customerAccounts/customerComponents/statementpreview";
import Statements from "./components/customerAccounts/customerComponents/statement";
import AllStudents from "./components/School/allstudents";
import PreviewTenantInvoicePage from "./components/Rental/components/invoice/previewInvoicePage";
import NewStudents from "./components/School/newStudents";
import StudentWithBalances from "./components/School/studentwithbalances";
import StudentPaidInvoices from "./components/School/studentspaidinvoices";
import StudentUnpaidInvoices from "./components/School/studentsunpaidinvoice";
import SchoolConfigurationEnable from "./components/School/SchoolConfigurationEnable";
import ProductSetUp from "./components/products/productsetup/Productsetup";
import QbProduct from "./components/products/productsetup/QbProduct";
import ServiceSetUp from "./components/products/servicesetup/ServiceSetUp";
import EditProductService from "./components/products/productsetup/editproductcategory";
import EditProductServiceQb from "./components/products/productsetup/editQbcategory";
import EditSingleProduct from "./components/products/servicesetup/editProduct";
import PaymentReport from "./components/School/PaymentReport";
import ReceiptInvoice from "./components/School/receiptsinvoice";

import Activestock from "./components/products/stockComponents/activeStock";
import { ADDSTOCK } from "./components/products/stockComponents/addStock";
import Transferstock from "./components/products/stockComponents/transferstock";
import { APPROVAL } from "./components/products/stockComponents/approval";
import ViewMoreStock from "./components/products/stockComponents/viewMoreStock";
import { STOCKTAKE } from "./components/products/stockComponents/stockTake";
import StockOrder from "./components/products/stockComponents/stockOrder";
import StockOrders from "./components/products/stockComponents/stockOrders";
import ReceiveStock from "./components/products/stockComponents/receiveStock";
import { REPORT } from "./components/products/stockComponents/report";
import StudentsPartiallyPaid from "./components/School/studentPartiallyPaid";
import FailedPayitTransactions from "./components/School/payitfailedtransaction";
import MainBankSetUp from "./common/user Dashboard Components/banks/mainbanksetup";
import { AccountingConfig } from "./components/configuration/accountingconfig";
import XeroAccountConfig from "./components/configuration/xeroAccountConfig";
import SchoolGradesForm from "./components/School/schoolGradesForm";
import AllcustomersTransactions from "./components/customerAccounts/customerComponents/allTransaction";
import UploadParentsStudentsBalances from "./components/School/uploadstudentBalances";
import TerminalUser from "./components/payit/components/terminalusers/terminaluser";
import TerminalOutlets from "./components/payit/components/outlets/outlets";
import TerminalDevices from "./components/payit/components/devicemodels/devicemodel";
import TerminalMgnt from "./components/payit/components/terminalmngnt/terminalmgnt";
import RequestService from "./components/School/requestService";
import PreviewRequestableService from "./components/School/previewRequestableInvoice";
import EditbS from "./components/shops/editBusiness";
import BusinessInfo from "./components/shops/businessinfo";
import RequestJoinBs from "./components/shops/requestjoinbs";
import Upcoming from "./components/appointments/upcoming";
import TimeOff from './components/timeOff';
// import InProgress from "./components/appointments/inProgress";
// import Completed from "./components/appointments/completed";
// import Cancelled from "./components/appointments/cancelled";
// import Expired from "./components/appointments/expired";
import ApproveJoinBs from "./components/shops/approvejoinbs";
import CardBins from "./components/payit/components/cardbins/cardbins";
import PreviewRequestServiceInvoice from "./components/customerAccounts/customerComponents/previewRequestserviceInvoice";
import ConveninienceFee from "./common/user Dashboard Components/convenienceFee/conviniencemain";
import ConveninienceFeeOtherBiz from "./components/School/convinienceset";
import VoidTransaction from "./components/reports/voidTransaction";
import PayModesLanding from "./components/configuration/zedPayItConfigs/payModeLanding";
import MainBankStatementsSetup from "./components/School/bankstatements/mainBankStatement";
import SchoolAdminPayitDashboard from "./components/payit/components/schoolAdminDashboard/schooladminpayitdashboard";
import GeneralLedgerSetUp from "./common/user Dashboard Components/generalLedgerAcc/mainGlsetUp";
import AllPayitTransactions from "./components/payit/components/payitschoolReports/allpayittransaction";
import AllBioTransactions from "./components/payit/components/payitschoolReports/biotransactions";
import AllPayitCardTransactions from "./components/payit/components/payitschoolReports/payitcardtransactions";
import PromoteStudentSetup from "./components/School/studentpromotion/promotestude";
import PayablesAdminTransactions from "./components/payables/admincomponents/transactions/payableTransactions";
import PayitSuperAdminDashboard from "./components/payit/components/superadmin/payitSuperAdmin";
import PayablesGeneralBusinessTransactions from "./components/payables/generalComponents/payablestranscations";
import { PayableSetStatus } from "./components/configuration/payablesconfig";
import { QuickBooks } from "./components/configuration/quickBooks";
import { Evoucher } from "./components/configuration/evoucher";
import EvoucherBooking  from "./components/configuration/booking";
import EvoucherAndBooking from './components/configuration/evoucherbooking';
import PayablesApprovers from "./components/payables/generalComponents/payablesApprovers"; 
import ConvenienceFeeMgt from './components/SuperAdmin/pages/ConvenienceFeeMgt'
import AdjustFee from './components/SuperAdmin/components/ConvenienceFeeMgt/AdjustFee'
import EnableFee from './components/SuperAdmin/components/ConvenienceFeeMgt/EnableFee'
import TestPage from './components/SuperAdmin/pages/TestPage'
import Banks from './components/SuperAdmin/pages/Banks'
import EditBank from './components/SuperAdmin/components/Banks/EditBank'
import EditTerminal from './components/SuperAdmin/components/TerminalsAndPrinters/EditTerminal'
import AddTerminal from './components/SuperAdmin/components/TerminalsAndPrinters/AddTerminal'
import AssignTerminal from './components/SuperAdmin/components/TerminalsAndPrinters/AssignTerminal'
import AddBank from './components/SuperAdmin/components/Banks/AddBank'
import TerminalsAndPrinters from './components/SuperAdmin/pages/TerminalsAndPrinters'
import Businesses from './components/SuperAdmin/pages/Businesses'
import EditBusiness from './components/SuperAdmin/components/Businesses/EditBusiness'
import ViewModules from './components/SuperAdmin/components/Businesses/ViewModules'
import ViewBranches from './components/SuperAdmin/components/Businesses/ViewBranches'
import AddBusiness from './components/SuperAdmin/components/Businesses/AddBusiness'
import AdminCreateBusiness from './components/SuperAdmin/components/Businesses/AddBusinessFiles/AdminCreateBusiness'
import Partners from './components/SuperAdmin/pages/Partners'
import EditPartner from './components/SuperAdmin/components/Partners/EditPartner'
import AddPartner from './components/SuperAdmin/components/Partners/AddPartner'
import AddPartnerUser from './components/SuperAdmin/components/Partners/AddPartnerUser'
import ViewPartnerUsers from './components/SuperAdmin/components/Partners/ViewPartnerUsers'
import UserGroups from './components/SuperAdmin/pages/UserGroups'
import EditUserGroup from './components/SuperAdmin/components/UserGroups/EditUserGroup'
import EditTerminalUser from './components/SuperAdmin/components/TerminalUsers/EditTerminalUser'
import ResetUserPassword from './components/SuperAdmin/components/TerminalUsers/ResetUserPassword'
import MoveTermUser from './components/SuperAdmin/components/TerminalUsers/MoveTermUser'
import AddUserGroup from './components/SuperAdmin/components/UserGroups/AddUserGroup'
import AllTransactions from './components/SuperAdmin/pages/AllTransactions'
import VoidTransactions from './components/SuperAdmin/pages/VoidTransactions'
import OverallPerformance from './components/SuperAdmin/pages/OverallPerformance'
import Outlets from './components/SuperAdmin/pages/Outlets'
import Cardbins from './components/SuperAdmin/pages/Cardbins'
import AddCardbin from './components/SuperAdmin/components/Cardbins/AddCardbin'
import EditCardbin from './components/SuperAdmin/components/Cardbins/EditCardbin'
import EditGlobalConfig from './components/SuperAdmin/components/GlobalConfigurations/EditGlobalConfig'
import EditReasonCode from './components/SuperAdmin/components/ReasonCodes/EditReasonCode'
import AddReasonCode from './components/SuperAdmin/components/ReasonCodes/AddReasonCode'
import GlobalConfigurations from './components/SuperAdmin/pages/GlobalConfigurations'
import Customers2 from './components/SuperAdmin/pages/Customers'
import BusinessCats from './components/SuperAdmin/pages/BusinessCategories'
import AddBusinessCategory from './components/SuperAdmin/components/BusinessCategories/AddBusinessCategory'
import EditBusinessCategory from './components/SuperAdmin/components/BusinessCategories/EditBusinessCategory'
import ReasonCodes from './components/SuperAdmin/pages/ReasonCodes'
import AnnualMaintenanceFee from './components/SuperAdmin/pages/AnnualMaintenanceFee'
import DeviceModels from './components/SuperAdmin/pages/DeviceModels'
import TermUsers from './components/SuperAdmin/pages/TerminalUsers'
import SuperAdminUsers from './components/SuperAdmin/pages/Users'
import AssignPartner from './components/SuperAdmin/components/Businesses/AssignPartner'
import EditDeviceModel from './components/SuperAdmin/components/DeviceModels/EditDeviceModel'
import AddDeviceModel from './components/SuperAdmin/components/DeviceModels/AddDeviceModel'
import EditUser from './components/SuperAdmin/components/Users/EditUser'
import { MTNdashboard } from "./components/mtn/mtnDashboard";
import { MTNTransactions } from "./components/mtn/mtntransactions";
import { ListAgents } from "./components/mtn/mtnagents";
import { PayitReportZedSchool } from "./components/SuperAdmin/components/zpm/payitzedreport";


import { createTheme, ThemeProvider } from '@mui/material/styles'
import ViewPayablesApprovers from "./components/payables/generalComponents/viewPayablesApprover";
import TopUpsPayables from "./components/payables/generalComponents/topUpsPayables";
import ViewTranscation from "./components/payables/generalComponents/viewtranscation";
import Payees from "./components/payables/generalComponents/payees";
import RaisePaymentSupplier from "./components/payables/generalComponents/raisePaymentSupplier";
import SupplierVendorInvoices from "./components/warehouse/supplierscomponents/supplierVendorInvoices";
import SupplierProfile from "./components/warehouse/supplierscomponents/supplierProfile";
import Zpmalltransaction from "./components/SuperAdmin/components/Reports/zpmalltransaction";
import ZPMbioreports from "./components/SuperAdmin/components/Reports/zpmbioreports";
import Zpmcardreports from "./components/SuperAdmin/components/Reports/zpmcardreports";
import FeeeConfigsAdmin from "./components/SuperAdmin/components/FeeConfigs";
import ZPMActivationFeeReport from "./components/SuperAdmin/components/Reports/zpmActivationReport";
import Ticket from "./components/Ticketing/ticket";
import AllPayitSelfOrderMpesaTransactions from "./components/payit/components/payitschoolReports/mpesaselforderreport";
import BioRegestrationReports from "./components/payit/components/payitschoolReports/bioregestrationreport";
import ZPMBioRegistrationReports from "./components/SuperAdmin/components/Reports/bioregestrationreports";
import StaffUniversityMain from "./components/School/studentpromotion/StaffUniversityMain";
import AllPayitCashTransactions from "./components/payit/components/payitschoolReports/payitcashreports";
import SchoolUnitsMainSetUp from "./components/School/units/schoolunitsmain";
import UnitsAssignedToTeachingStaff from "./components/School/units/unitsAssignedToStaff";
import MessagingActivity from "./components/School/messagingComponent/messagingActivity";
import SchoolCreateMessage from "./components/School/messagingComponent/schoolCreateMessage";
import SchoolSessionReport from "./components/School/reports/schoolsessionreport";
import StaffSessionReportProfile from "./components/School/sessionReport/staffsessionReportProfile";
import DeleteAccountRequest from "./components/passwordReset/deleteAccountRequest";
import DeleteRequestAdmin from "./components/passwordReset/deleteRequest";
import Ecitizen from "./components/ecitizenComponent/ecitizen";
import AllPayitCashTransactionsAdmin from "./components/payit/components/payitschoolReports/allPayitCashReportsAdminSuper";
import PartnerBusiness from "./components/SuperAdmin/components/Partners/partnerBusiness";
import AdminZPMStudentWalleteReport from "./components/SuperAdmin/components/Reports/zpmAdminReports";
import ZpmReconciliationReports from "./components/SuperAdmin/components/Reports/zpmReconciliationReport";
import ZpmStudentWalleteBal from "./components/SuperAdmin/components/zpm/zpmwalletebalanceSchoolAdmin";
import AddTerminalAndAssign from "./components/payit/components/terminalmngnt/AddTerminalAndAssign";
import FailedPayitCardTransactions from "./components/SuperAdmin/components/Reports/FailedcardReportAdmin";
import CreateOutlet from "./components/SuperAdmin/components/Outlets/CreateOutlet";
import CreateTerminalUser from "./components/SuperAdmin/components/TerminalUsers/CreateTerminalUser";
import AuditLogsAdmin from "./components/SuperAdmin/components/AuditLogs/AuditLogs";
import TransportPartnerDashboard from "./components/transportpartner/transportPartnerDashboard";
import InsuranceCompanies from "./components/SuperAdmin/components/psv/Insurance/InsuranceCompanies";
import VehicleRoutes from "./components/SuperAdmin/components/psv/vehicles/VehicleRoutes";
import VehicleTypes from "./components/SuperAdmin/components/psv/vehicles/VehicleTypes";
import AssignCategoriesToOutlet from "./components/SuperAdmin/components/Outlets/AssignCategoriesToOutlet";
import PartnerCreateProduct from "./components/SuperAdmin/components/Outlets/PartnerCreateProduct";
// import PartnerCreateCategory from "./components/SuperAdmin/components/Outlets/PartnerCreateCategory";
import AllInsuranceVehicles from "./components/transportpartner/allinsuranceVehicle";
import AllInsuranceOperators from "./components/transportpartner/allinsuranceOperators";
import AllInsuranceTransactions from "./components/transportpartner/allInsuranceTransaction";
import PartnerProducts from "./components/SuperAdmin/components/Partners/partnerProducts";
import PartnerProductsCategories from "./components/SuperAdmin/components/Partners/partnerCategory";
import SchoolBioSalesReport from "./common/DashBoard Components/schoolBioSalesReport";
import TerminalSummaryReport from "./components/payit/components/payitschoolReports/terminalSummaryReport";
import StudentSummaryReport from "./components/School/summaryReport";
import TransportBusinessSetUp from "./components/transportBusiness/TransportBusinessSetup";
import VehicleOwnermain from "./components/transportBusiness/vehcleowner/vehicleOwnerMain";
import ViewAllSaccoVehicles from "./components/transportBusiness/vehcleowner/veiwAllSaccoVehicles";
import OperatorsMainView from "./components/transportBusiness/operators/operatorsmainview";
import SaccoTransactionReports from "./components/transportBusiness/reports/saccoTransportReports";
import FleetControlReport from "./components/transportBusiness/reports/fleetControlReport";
import AllSaccoTransactionReports from "./components/transportBusiness/reports/transactionsaccrepo";
import TransportConfigurationFile from "./components/transportBusiness/configurations/configurationFile";
import CollectFareForSacco from "./components/transportBusiness/operators/saccooperatorcollect";
import ProductSalesReport from "./components/reports/productSalesReport";
import TransportPaymentSetup from "./components/transportBusiness/transportPayment/paymentSetuptransport";
import ShopifyConfig from "./components/configuration/shopifyConfig";
import ShopifyCallbackPage from "./shopifyComponent/shopifyComponent";
import ShopifyComponent from "./shopifyComponent/shopifyComponent";
import StartOrder from "./components/pos/poscomponents/startorder";
import PartnerBranches from "./components/SuperAdmin/components/Branches/partnerBranches";
import PartnerRegions from "./components/SuperAdmin/components/Regions/partnerRegions";
import { CircularProgress, Typography } from "@mui/material";
import ZedEcommerceSetup from "./components/ZedEcommerce/zedEcommerceSetup";
import ZedEcommerceSwitch from "./components/ZedEcommerce/zedSwitchEcommerce";
import PartnerSalesPerson from "./components/SuperAdmin/components/PartnerSales/salesPersonView";
import { ZedAdminDarajaSetup } from "./components/SuperAdmin/components/GlobalConfigurations/zedAdminDarajasetup";
import Toast from "./components/customerAccounts/supplierComponents/Toast";
import EditSupplier from "./components/customerAccounts/supplierComponents/EditSupplier";
import { ZedB2BTransactions } from "./components/SuperAdmin/components/Reports/zedB2Btransactions";
import ZpmBankPaybillReport from "./components/payit/components/payitschoolReports/zpmbankpaybillreport";
import { StudentSelfOrderReports } from "./components/SuperAdmin/components/zpm/StudentSelfOrder";
import ReprintReport from "./components/payit/components/payitschoolReports/zpmreprintreport";
import Merchantfeeconfig from "./components/SuperAdmin/components/cardpresent/merchantfeeconfig";
import ReprintReportDetails from "./components/payit/components/payitschoolReports/viewreprintreport";
import MerchantReport from "./components/SuperAdmin/components/cardpresent/merchantreport";
import Cardpresentsummary from "./components/SuperAdmin/components/cardpresent/cardpresentsummary";
import Settlementreport from "./components/SuperAdmin/components/cardpresent/settlementreport";
import Revenuesharereport from "./components/SuperAdmin/components/cardpresent/revenuesharereport";
import { ListStudentSponsored } from "./components/School/studentsponsors/listSponsoredStudents";
import { StudentSponsors } from "./components/School/studentsponsors/sponsors";
import MerchantAccountConfig from "./components/SuperAdmin/components/cardpresent/merchantaccountdetails";
import MerchantsettlementScheduling from "./components/SuperAdmin/components/cardpresent/merchantsettlementconfig";
import { ListSponsorInvoices } from "./components/School/studentsponsors/sponsorInvoices";
import { SponsorPaymentHistory } from "./components/School/studentsponsors/paymentHistory";
import SettlementPreview from "./components/SuperAdmin/components/cardpresent/settlementpreview";
import { BatchView } from "./components/customerAccounts/customerComponents/batchView";
import UserProfile from "./components/profile/userProfile";
import EnableTwoFactorInNormalBs from "./components/profile/2faconfignormalbs";
import ZedReconciliationReport from "./components/School/reports/zedReconcilliationReport";
import FundTransferCustomerSetUp from "./components/School/ftsetup/ftBankDetails";
import OpenEvoucher from "./components/vouchers/openEvoucher";
import ListOpenEvouchers from "./components/vouchers/listEvouchers";
import OpenEvoucherDetails from "./components/vouchers/evoucherDetails";
import CreateOpenEvoucher from "./components/vouchers/createEvoucher";
import EvoucherReceipt from "./components/vouchers/evoucherReceipt";
import PromoteStudentHistory from "./components/School/studentpromotion/PromoteStudentHistory";
import TransportBusinessSetUpTracker from "./components/transportBusiness/transportbsTracker";
import RecentTransactions from "./components/SuperAdmin/components/Billing/RecentTransactions";
import PushNotifications from "./components/SuperAdmin/components/pos/pushNotifications";
import AddConfig from "./components/SuperAdmin/components/Billing/AddConfig";
import PreviewKRACreditNote from "./components/creditnote/previewCreditNote";
import Discounts from "./components/School/discounts/Discounts";
import CreateDiscount from "./components/School/discounts/AddDiscount";
import EditDiscount from "./components/School/discounts/editDiscount";
import ListBillingPlans from "./components/SuperAdmin/components/Billing/billingPlans/listBillingPlans";
import BillingHomePage from "./components/SuperAdmin/components/Billing/billingHomePage";
import MerchantBillingPackages from "./components/SuperAdmin/components/Billing/customerBilling/merchantBillingPackages";
import CustomBillingPage from "./components/SuperAdmin/components/Billing/customerBilling/customBillingPage";
import CashierSettlementPage from "./components/cashier/cashierSettlement";
import { BatchProductStockView } from "./components/products/stockComponents/batchViewProducts";
import AllWithdrawalTransactions from "./components/payit/components/payitschoolReports/withdrawalReports";
import ProfitAndLoss from "./components/reports/profitAndLoss";
import BranchLimit from "./components/payables/generalComponents/branchLimitPayables";
import BranchBalance from "./components/payables/generalComponents/branchBalancePayables";

// Edit Occupied Unit
import EditOccupiedUnit from "./components/customerAccounts/tenantComponents/units/editOccupiedUnits";
import TransferStatusStock from "./components/products/transferStockStatus";
import TransferStockNote from "./components/products/transferStockNote";
import FleetManagementReport from "./components/transportBusiness/reports/fleetManagementReport";
import PayitOutletPerformance from "./components/payit/components/payitschoolReports/payitOutletPerfomance";
import PayitOutletPerfomanceAdmin from "./components/payit/components/payitschoolReports/payitOutletAdmin";
import SchoolCountryForm from "./components/School/SchoolCountryForm";
const SignInOptions  = lazy(() => import("./components/login/SignInOptions")) ;
const PayFareMobile = lazy(() => import("./components/transportpartner/payFareMobilePage"));
const Dashboard = lazy(() => import("./components/Dashboard/pageDashboard"));
const Login = lazy(() => import("./components/login/login"));
const VerifyOtpLogin = lazy(() => import("./components/login/otpLogin"));
const CardNoAuth = lazy(() => import("./components/School/config/cardFormUnAuth"));

const SignUpOptions = lazy(() => import("./components/login/SignUpOptions"))
const AdminDashboard = lazy(() => import('./components/SuperAdmin/pages/AdminDashboard'))
const ParentPayOptions =  lazy(() => import("./components/customerAccounts/customerComponents/parentPay"))
const TenantDetails =  lazy(() => import("./components/customerAccounts/tenantComponents/tenantDetails"))
const  DashboardPayables =  lazy (() => import("./components/payables/generalComponents/dashboardPayables"));



import BillingFeaturesCheck from "./common/BillingFeaturesCheck";


const theme = createTheme({ typography: { fontFamily: ["Poppins"].join(",") } });

const App = () => {

  const { group, branchId } = useSelector((store) => store.user);
  const { category } = useSelector((store) => store.category)

  const branchID = localStorage.getItem("BranchID");
  const Group = localStorage.getItem("group");
  const partnerBusinessGroup = localStorage.getItem('partnerbusinessType')
  const businessCat = localStorage.getItem('businessCategory');
  const noBranchAndIsAdmin = !branchID && Group && Group == "Admin";
  const isZedPmAdmin = Group && Group === "ZPM School Admin"
  const isZedEcommerce = Group && Group === "ZED Ecommerce" && businessCat && businessCat === 'ZED Ecommerce'
  const isStoreOperator = Group && Group.toLocaleLowerCase().includes("storeoperator")
  const isStoreManger = Group && Group.toLocaleLowerCase().includes("storemanager")
  const isGoogleUser = localStorage.getItem('group') === 'User' && !localStorage.getItem('businessCategory')
  const isCashier = branchID && Group && Group == "Cashier" || branchID && isStoreOperator || branchID && Group && Group == "payItUser" || branchID && Group && Group == "SalesPerson"
  const isBusinessUser = Group && Group === 'Customer' && businessCat !== 'Rental' || businessCat !== 'School'
  const isAdmin = Group && Group == "Admin";
  const isUser = Group && Group === "User"
  const isTransportPartner = (Group && Group === "Merchant" && businessCat && businessCat === 'Transport') || (Group && Group === 'TransportPartner');
  const isPartner = Group && Group == "Partner" && (partnerBusinessGroup && partnerBusinessGroup !== 'FMCG' || !partnerBusinessGroup);
  const isPartnerMTN  =  (Group && Group === "Partner") && (partnerBusinessGroup && partnerBusinessGroup) === 'FMCG'
  const isSupervisor = Group && Group == "Supervisor";
  const isPrincipal = Group && Group == "Principal";
  const isTeacher =  Group && Group == "Teacher";
  const isMerchant = (Group && Group == "Merchant") || Group == "Owner" || Group === "Customer";
  const isCashierOrAdminOrSupervisorOrMerchant = isCashier || isAdmin || isSupervisor || isMerchant || Group === "Director";
  const canViewProducts = Group === "Accountant" || Group === "Director" || Group === "Caretaker"
  const noBranchAndIsAdminOrMerchant = noBranchAndIsAdmin || isMerchant || isAdmin || canViewProducts || isCashier || isStoreManger || isStoreOperator || isSupervisor || isZedPmAdmin || isPrincipal || isTeacher || isUser;
  // const usertoken
  if(localStorage.getItem("X-Authorization")){

  }
  //remove all consoles on test and production!
  if (import.meta.env.VITE_BASE_URL !== "https://api.dev.zed.business") {
    console.log = function (){}

    // prevent right click on test and production!
    // window.addEventListener('contextmenu', (e) => {
    //   e.preventDefault();
    // });
  }


  const lazyLoadComponent = () => {
    return <div style={{display:"flex", justifyContent:"center", alignItems:"center", width: "100%", height:"100vh",}}>
      <CircularProgress color="success" />
    </div>
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Suspense fallback={lazyLoadComponent()}>
        <Toast />
          <Routes>
            <Route element={<PublicRoutes />}>
              <Route path="*" element={<NotFound />} />
              <Route path="/" element={<SignInOptions />} />
              <Route path="/signup" element={< SignUpOptions />} />
              <Route path="/login/:AuthState" element={<Login />} />
              <Route path="/signup/email" element={<Signup />} />
              <Route path="/verify/otp" element={<VerifyOtpLogin />} />
              <Route path="/401" element={<Unauthorised />} />
              <Route path="/forgot" element={<ForgotPass />} />
              <Route path={"/resetSuccess"} element={<ResetSuccess />} />
              <Route path={"/sentMail"} element={<SentMail />} />
              <Route path="/reset" element={<ResetPassword />} />
              <Route path="/forgotReset" element={<ForgotReset />} />
            </Route>

            <Route element={<PrivateRoutes />}>
              <Route path="/change-pin" element={<ResetPin />} />
              <Route path="/userDashboard" element={<NewUserDashboard />} />
              {/*Transport , PSV & Insurance*/}
            {(Group && Group === 'TransportPartner' ) &&  <Route path="/transport/insuranceVehicles" element={<AllInsuranceVehicles/> }/>}
            {(Group && Group === 'TransportPartner' ) &&  <Route path="/transport/insuranceOpeators" element={<AllInsuranceOperators/> }/>}
            {(Group && Group === 'TransportPartner' ) &&  <Route path="/transport/insuranceTransactions" element={<AllInsuranceTransactions/> }/>}

              {/* <Route path="/dashboard" element={isCashier ? <Navigate to="/orders/startorder" /> : <Dashboard />} /> */}
              {(isAdmin || isPartner) ? <Route path="/adminDashboard" element={<AdminDashboard />} /> :
              isTransportPartner ?  <Route path="/partnerstransport" element={<TransportPartnerDashboard />} />:<Route path="/dashboard" element={<Dashboard />} />}
              <Route path="/createBusiness" element={<CreateBusiness />} />
              <Route path={"/sc_preview_invoice"} element={<SchoolInvoicePreview />} />
              <Route path={"/transportBusinessSetUpTracker"} element={<TransportBusinessSetUpTracker/>} />
              <Route path="/transactions" element={<Transactions />} />
              <Route path="/sacco/vehicleowners" element={<VehicleOwnermain/>} /> 
              <Route path="/sacco/vehicles" element={<ViewAllSaccoVehicles/>} /> 
              <Route path="/sacco/vehiclesoperators" element={<OperatorsMainView/>} /> 
              <Route path="/sacco/transactionreports" element={<SaccoTransactionReports/>} /> 
              <Route path="/sacco/itineraryreports" element={<FleetControlReport/>} /> 
              <Route path="/sacco/management/report" element={<FleetManagementReport/>} /> 
              <Route path="/transport/paymentsetup" element={<TransportPaymentSetup/>} />  
              <Route path="/sacco/operatorcollect" element={<CollectFareForSacco/>} /> 
              <Route path="/sacco/allsaccotransactions" element={<AllSaccoTransactionReports/>} />
              <Route path="/sacco/configuration" element={<TransportConfigurationFile/>} />
              <Route path="/customers" element={<Customerlist />} />
              <Route path="/supplierlist" element={<SupplierList />} />
              <Route path="/addsupplier" element={<AddSupplier />} />
              <Route path="/supplier/edit/:id" element={<EditSupplier />} />
              <Route path="/allcustomerstransaction" element={<AllcustomersTransactions />} />
              <Route path="/customerreceipts" element={<CustomerReceipts />} />
              <Route path="/paymentreceipt/:id/:path" element={<Paymentreceipt />} />
              <Route path="/statementReview" element={<StatementPreveiw />} />
              <Route path="/viewstatement/:id" element={<Statements />} />
              <Route path="/createcustomer/:id" element={<Createcustomer />} />
              <Route path="/creditcustomer/:id/:payType" element={<CreditAccount />} />
              <Route path="/tenants" element={<Tenants />} />
              <Route path="/tenant_invoice_preview" element={<TenantInvoicePreview />} />
              <Route path="/tenants/notice/:noticeNumber" element={<NoticePdf />} />
              <Route path="/invoice/:invoiceNumber" element={<Invoice />} />
              <Route path="/parent/pay/:invoiceNumber" element={<ParentPayMakePayment />} />
              <Route path="/terminal/users" element={<TerminalUser />} />
              <Route path="/outlets" element={<TerminalOutlets />} />
              <Route path="/terminal/devices" element={<TerminalDevices />} />
              <Route path="/terminal/mngt" element={<TerminalMgnt />} />
              <Route path="/AddTerminalAndAssign" element={<AddTerminalAndAssign />} />
              <Route path="/cards/cardbins" element={<CardBins />} />
              <Route path="/tenantInvoice/:invoiceNumber" element={<TenantPayInvoice />} />
              <Route path="/tenantPay/:invoiceNumber" element={<TenantPaymentOption />} />
              {/*<Route path="/tenantReceipt/:invoiceNumber" element={<TenantPaymentOption />} />*/}
              <Route path={"/parent/:customerId"} element={<ParentProfile />} />
              <Route path={"/sc_preview_invoice"} element={<SchoolInvoicePreview />} />
              <Route path={"/request/service/invoice"} element={<PreviewRequestableService />} />
              <Route path="/invoices" element={<Invoices />} />
              <Route path={"/receipts"} element={<Receipts />} />
              <Route path={"/receipt/:receiptNumber/:itemNumber"} element={<Receipt />} />
              <Route path={"/cashier"} element={<Cashier />} />
              <Route path={"/get_all_cashier_to_settle"} element={<ReportAllCashiersSettle />} />
              <Route path={"/cashier/:id"} element={<SettleCashier />} />
              <Route path={"/cashier/settlement/:id?"} element={<CashierSettlementPage />} />
              <Route path={"/creditnote"} element={
                <BillingFeaturesCheck featureName="Credit Notes" routeGuard={true}>
                  <CreditNotePage />
                </BillingFeaturesCheck>
              } />
              <Route path={"/vouchers"} element={<VouchersPage />} />
              <Route path={"/open-evouchers"} element={<ListOpenEvouchers />} />
              <Route path={"/open-evoucher/:voucherId"} element={<OpenEvoucher />} />
              <Route path={"/open-evoucher/evoucherDetails/:voucherId"} element={<OpenEvoucherDetails />} />
              <Route path={"/create/personal/evoucher"} element={<CreateOpenEvoucher />} />
              <Route path={"/evoucher/receipt/:paymentId"} element={<EvoucherReceipt /> } />
              <Route path={"/createcreditnote"} element={<Createcreditnote />} />
              <Route path={"/previewcreditnote/:id"} element={<Previewcreditnote />} />
              <Route path={"/receipt/:receiptNumber/:itemNumber"} element={<Receipt />} />
              <Route path={"/cashier/:id"} element={<Cashier />} />
              <Route path={"/cashier/cash/:id"} element={<SettleCashier />} />
              <Route path={"/creditnote"} element={<CreditNotePage />} />
              <Route path={"/billingpage"} element={<MerchantBillingPackages/>} />
              <Route path={"/vouchers"} element={<VouchersPage />} />
              <Route path={"/createcreditnote"} element={<Createcreditnote />} />
              {/* <Route path={"/previewcreditnote/:id"} element={<Previewcreditnote />} /> */}
              <Route path={"/suppliers"} element={<Suppliers />} />
              <Route path={"/employees"} element={<Employee />} />
              <Route path={"/addsupplier/:id"} element={<Addsupplier />} />
              <Route path={"/addwarehouse/:id"} element={<Addwarehouse />} />
              <Route path={"/warehouses"} element={<Warehouses />} />
              <Route path={"/substores"} element={<Substores />} />
              <Route path={"/addsubstore/:id"} element={<Addsubstore />} />
              <Route path={"/mainstores"} element={<Mainstores />} />
              <Route path={"/mainstores/:id"} element={<MainStoreEdit />} />
              {/*Rental*/}
              <Route path="/userDashboard" element={<NewUserDashboard />} />
              <Route path="/setup/rental/:businessName" element={<RentalMultiSetup />} />
              <Route path="/setup/transport/:businessName" element={<TransportBusinessSetUp />} />
              <Route path="/setup/zedEcommerce/:businessName" element={<ZedEcommerceSetup />} />
              <Route path="/defineUnits" element={<DefineUnits />} />
              <Route path="/tenantPreviewInvoice" element={<PreviewTenantInvoice />} />
              <Route path="/tenantPreviewInvoices" element={<PreviewTenantInvoicePage />} />
              <Route path="/addServiceFromInvoice" element={<AddServiceFromInvoice />} />
              <Route path="/tenantDetails/:id" element={<TenantDetails />} />
              <Route path="/tenant/edit/:customerId" element={<EditTenantInfo />} />
              <Route path="/paymentSetup" element={<PaymentSetup />} />
              <Route path="/transactionSummary/:month/:year" element={<TransactionSummary />} />
              <Route path="/school/transcations/:month/:year" element={<SchoolTranscations />} />
              <Route path="/school/studentpayments/:studentID" element={<StudentPaymentHistory />} />


              <Route path="/units" element={<Units />} />
              <Route path="/units/occupied" element={<OccupiedUnits />} />
              <Route path="/units/unoccupied" element={<UnoccupiedUnits />} />
              <Route path="/units/edit/:unitId" element={<EditOccupiedUnit />} />
              <Route path="/tenantInvoices" element={<TenantInvoice />} />
              <Route path="/tenantReceipts" element={<TenantReceipt />} />
              <Route path="/paymentsettingup" element={<PaymentSettingUp />} />
              <Route path="/business/ftseup" element={<FundTransferCustomerSetUp/>} />
              <Route path="/tenantInvoicePreview/:invoiceNumber" element={<TenantPreviewInvoice />} />
              <Route path="/tenantStatement/:id" element={<TenantStatement />} />
              <Route path="/tenantsReport" element={<TenantReport />} />
              <Route path="/housingHistory" element={<HousingHistory />} />

              {/*School*/}
              <Route path="/parentPay/:invoiceNumber" element={<ParentPayOptions />} />
              <Route path="/setup/school/:businessName" element={<SchoolSetup />} />
              {/* <Route path="/setup/school/:businessName" element={<SchoolCountryForm />} /> */}
              <Route path="/school/units" element={<SchoolUnitsMainSetUp />} />
              <Route path="/school/service/create" element={<ServiceForm />} />
              <Route path="/school/grades" element={<SchoolGradesForm />} />
              <Route path="/school/universityStaff" element={<StaffUniversityMain />} />
              <Route path="/school/discounts" element={<Discounts />} />
              <Route path="/school/discounts/add" element={<CreateDiscount />} />
              <Route path="/school/discounts/edit/:id" element={<EditDiscount />} />
              <Route path={"/school/generate/invoice"} element={<GenerateSchoolInvoices />} />
              <Route path={"/school/invoices/:batch"} element={<SchoolInvoiceBatches />} />
              <Route path={"/school/upload/studentbalance"} element={<UploadParentsStudentsBalances />} />
              <Route path={"/school/invoices/batch/:batchId"} element={<InvoicesInBatch />} />
              <Route path={"/school/batch/view/:batchId"} element={<BatchView />} />
              <Route path={"/school/invoice/:invoiceNumber"} element={<Invoice />} />
              <Route path={"/school/student/:customerId/:itemNo"} element={<StudentProfile />} />
              <Route path={"/editprofile/:customerId"} element={<EditProfile />} />
              <Route path="/school/parents" element={<SchoolListParents />} />
              <Route path="/school/students" element={<SchoolListStudents />} />
              <Route path="/school/bankstatements" element={<MainBankStatementsSetup />} />
              <Route path="/school/studentpromotion" element={<PromoteStudentSetup />} />
              <Route path="/school/student-promotions" element={<PromoteStudentHistory />} />
              <Route path="/school/reports" element={<SchoolReports />} />
              <Route path="/payment-reports" element={<PaymentReport />} />
              <Route path={"/school/parent/add"} element={<SchoolAddParent />} />
              <Route path={"/school/student/add/:customerId"} element={<AddStudentExistingParent />} />
              <Route path={"/school/parent/:customerId"} element={<ParentProfile />} />
              <Route path={"/school/parent/add/upload"} element={<UploadParentsStudents />} />
              <Route path={"/school/invoice/edit/:invoiceNumber"} element={<EditSchoolInvoice />} />
              <Route path={"/school/services/add"} element={<SchoolAddService />} />
              <Route path={"/add/user"} element={<AddUsers />} />
              <Route path={"/school/parent/edit/:customerId"} element={<ParentEdit />} />
               <Route path="/school/parent/addSecondary/:customerId" element={<AddSecondaryParent />} />
              <Route path={"/school/request/service"} element={<RequestService />} />
              <Route path={"/school/allstudents"} element={<AllStudents />} />
              <Route path={"/school/newstudents"} element={<NewStudents />} />
              <Route path={"/school/studentswithbalances"} element={<StudentWithBalances />} />
              <Route path={"/school/studentspaidinvoices"} element={<StudentPaidInvoices />} />
              <Route path={"/school/unpaidinvoices"} element={< StudentUnpaidInvoices/>} />
              <Route path={"/school/summaryReports/:status"} element={< StudentSummaryReport/>} />
              <Route path={"/school/pmbioregistrationreport"} element={<BioRegestrationReports/>} />
              <Route path={"/school/partiallypaidinvoices"} element={< StudentsPartiallyPaid/>} /> 
              <Route path={"/school/sessionreport"} element={<SchoolSessionReport/>} /> 
              <Route path={"/school/staff/sessionreport"} element={<StaffSessionReportProfile/>} />
              <Route path={"/school/sponsors"} element={<StudentSponsors/>} />
              <Route path={"/school/sponsors/students"} element={<ListStudentSponsored/>} />
              <Route path={"/school/sponsors/invoices"} element={<ListSponsorInvoices/>} />
              <Route path={"/school/sponsors/paymenthistory"} element={<SponsorPaymentHistory/>} />
              <Route path="/ecitizen/pay/:invoiceNumber/:customerId" element={<Ecitizen />} />
              {/* <Route path={"/school/partiallypaidinvoices"} element={< StudentUnpaidInvoices/>} /> */}
              <Route path={"/school/failedtransactions"} element={<FailedPayitTransactions />} />
              <Route path={"/school/payitshooladmin"} element={<SchoolAdminPayitDashboard />} />
              <Route path={"/school/configuration"} element={<SchoolConfigurationEnable />} />
              <Route path={"/config/auth/enable2fa"} element={<EnableTwoFactorInNormalBs/>} />
              <Route path={"/user/profile"} element={<UserProfile />} />
              <Route path={"/school/parent/preview"} element={<SchoolConfigurationEnable />} />
              <Route path={"/school/request/preview/invoice"} element={<PreviewRequestServiceInvoice />} />
              <Route path={"/conviniencefee/otherbusiness"} element={<ConveninienceFeeOtherBiz />} />
              <Route path={"/ledgersetup"} element={<GeneralLedgerSetUp />} />
              <Route path={"/school/allpayitTransactions"} element={<AllPayitTransactions />} />
              <Route path={"/school/studentwalletereports"} element={<ZpmStudentWalleteBal />} />
              <Route path={"/school/zedpayitreports"} element={<PayitReportZedSchool />} />
              <Route path={"/school/payitoutletperformance"} element={<PayitOutletPerformance />} />
              <Route path={"/school/zedselforderreports"} element={<StudentSelfOrderReports/>} />
              <Route path={"/school/zpmreconciliationreports"} element={<ZedReconciliationReport/>} />
              <Route path={"/school/biotransactions"} element={<AllBioTransactions />} />
              <Route path={"/school/cardtransactions"} element={<AllPayitCardTransactions />} />
              <Route path={"/school/withdrawaltransactions"} element={<AllWithdrawalTransactions />} />
              <Route path={"/school/selfordermpesatransactions"} element={<AllPayitSelfOrderMpesaTransactions />} />
              <Route path={"/school/pmcashreports"} element={<AllPayitCashTransactions />} />
              <Route path={"/school/staff/unitenrolled"} element={<UnitsAssignedToTeachingStaff />} />
              <Route path={"/school/receiptreprintreport"} element={<ReprintReport />} />
              <Route path={"/school/receiptreprintreport/:id"} element={<ReprintReportDetails />} />
              {/* Messaging Services */}
              <Route path="/messaging/service" element={<MessagingActivity />} />
              <Route path="/school/create/message" element={<SchoolCreateMessage />} />


              {/*<Route path="/school/customer" element={<SchoolCustomerAccount/>}/>*/}
              {/* general business setup route */}
              <Route path="/setup/:category" element={<GeneralBusinessSetup />} />
              <Route path="/shops/edit/:id" element={<EditbS />} />
              <Route path="/shop/businessinfo" element={<BusinessInfo />} />
              <Route path="/requestjoinbusiness" element={<RequestJoinBs />} />
              <Route path="/appointments" element={<Upcoming />} />
              <Route path="/timeoff" element={<TimeOff />} />

              <Route path="/approverequests" element={<ApproveJoinBs />} />
              <Route path="/addcontacts/:customerId" element={<CreateEmergency />} />
              {isPartnerMTN && <Route path="/partner/agents" element={<ListAgents/>} />}
              {isPartnerMTN && <Route path="/partners/transactions" element={<MTNTransactions/>} />}


              {/* Payables  */}
              {isAdmin && <Route path="/payables/admin/transactions" element={<PayablesAdminTransactions />} />}
              <Route path="/payables/transcations" element={<PayablesGeneralBusinessTransactions />} />
              <Route path="/payables/dashboard" element={<DashboardPayables />} />
              <Route path="/payables/branchlimit" element={<BranchLimit />} />
              <Route path="/payables/branchbalance" element={<BranchBalance />} />
              <Route path="/payables/topups" element={<TopUpsPayables />} />
              <Route path="/payables/approvers" element={<PayablesApprovers />} />
              <Route path="/payables/view/approvers/:amountRangeId" element={<ViewPayablesApprovers />} />
              <Route path="/payables/transcation/:transcationId" element={<ViewTranscation />} />
              <Route path="/payables/otherpayments" element={<Payees />} />
              <Route path="/payables/suppplier/raisepayment" element={<RaisePaymentSupplier />} />
              <Route path="/creditNote/preview/:creditNoteId" element={<PreviewKRACreditNote />} />
              <Route path="/supplier/vendor/invoices" element={<SupplierVendorInvoices />} />
              <Route path="/supplier/invoices/:supplierId" element={<SupplierProfile />} />
              {(isPartner || group === 'Merchant') && <Route path="/partner/terminalsummaryreports" element={<TerminalSummaryReport />} />}

              {/* end of hotel routes */}
              {/* superAdmin Routes */}
              {(isAdmin || isPartner) && <Route path="/adminDashboard" element={<AdminDashboard />} />}
              {(isAdmin || isPartner) && <Route path="/feeconfigs" element={<FeeeConfigsAdmin />} />}
              {isAdmin && <Route path="/ConvenienceFeeMgt" element={<ConvenienceFeeMgt />} />}
              {isAdmin && <Route path="/partners/insurancecompanies" element={<InsuranceCompanies/>} />}
              {isAdmin && <Route path="/partners/vehicleroutes" element={<VehicleRoutes/>} />}
              {isAdmin && <Route path="/admin/zedmpesadarajasetup" element={<ZedAdminDarajaSetup/>} />}
              {isAdmin && <Route path="/partners/vehicletypes" element={<VehicleTypes/>} />}
              {isAdmin && <Route path="/admin/adminreconciliationreport" element={<ZpmReconciliationReports/>} />}
              {(isAdmin || isPartner) && <Route path="/failedcardreportadmin" element={<FailedPayitCardTransactions/>} />}
              {isAdmin && <Route path="/AdjustFee" element={<AdjustFee />} />}
              {isAdmin && <Route path="/EnableFee" element={<EnableFee />} />}
              {isAdmin && <Route path="/viewPartnerBusiness" element={<PartnerBusiness />} />}
              {isAdmin && <Route path="/adminbanksetup" element={<MainBankSetUp />} />}
              {isAdmin && <Route path="/testPage" element={<TestPage />} />}
              {isAdmin && <Route path="/Banks" element={<Banks />} />}
              {isAdmin && <Route path="/EditBank" element={<EditBank />} />}
              {isAdmin && <Route path="/AddBank" element={<AddBank />} />}
              {(isAdmin || isPartner) && <Route path="/TerminalsAndPrinters" element={<TerminalsAndPrinters />} />}
              {(isAdmin || isPartner) && <Route path="/AddTerminal" element={<AddTerminal />} />}
              {(isAdmin || isPartner) && <Route path="/EditTerminal" element={<EditTerminal />} />}
              {(isAdmin || isPartner) && <Route path="/AssignTerminal" element={<AssignTerminal />} />}
              {(isAdmin || isPartner) && <Route path="/Businesses" element={<Businesses />} />}
              {(isAdmin || isPartner) && <Route path="/EditBusiness" element={<EditBusiness />} />}
              {(isAdmin || isPartner) && <Route path="/ViewModules" element={<ViewModules />} />}
              {(isAdmin || isPartner) && <Route path="/ViewBranches" element={<ViewBranches />} />}
              {(isAdmin || isPartner) && <Route path="/CreateOutlet" element={<CreateOutlet />} />}
              {isAdmin && <Route path="/AddBusiness" element={<AddBusiness />} />}
              {isAdmin && <Route path="/AdminCreateBusiness" element={<AdminCreateBusiness />} />}
              {isAdmin && <Route path="/conviniencefee" element={<ConveninienceFee />} />}
              {isAdmin && <Route path="/payItMode" element={<PayModesLanding />} />}
              {isAdmin && <Route path="/payit/payitadmin" element={<PayitSuperAdminDashboard />} />}
              {isAdmin && <Route path="/partners" element={<Partners />} />}
              {isAdmin && <Route path="/EditPartner" element={<EditPartner />} />}
              {isAdmin && <Route path="/failedcardreportadmin" element={<FailedPayitCardTransactions/>} />}
              {isAdmin && <Route path="/AddPartner" element={<AddPartner />} />}
              {isAdmin && <Route path="/UserGroups" element={<UserGroups />} />}
              {isAdmin && <Route path="/EditUserGroup" element={<EditUserGroup />} />}
              {(isAdmin || isPartner) && <Route path="/EditTerminalUser" element={<EditTerminalUser />} />}
              {(isAdmin || isPartner) && <Route path="/CreateTerminalUser" element={<CreateTerminalUser />} />}
              {(isAdmin || isPartner) && <Route path="/ResetUserPassword" element={<ResetUserPassword />} />}
              {(isAdmin || isPartner) && <Route path="/MoveTermUser" element={<MoveTermUser />} />}
              {isAdmin && <Route path="/AddUserGroup" element={<AddUserGroup />} />}
              {(isAdmin || isPartner) && <Route path="/AllTransactions" element={<AllTransactions />} />}
              {(isAdmin || isPartner) && <Route path="/VoidTransactions" element={<VoidTransactions />} />}
              {(isAdmin || isPartner) && <Route path="/OverallPerformance" element={<OverallPerformance />} />}
              {(isAdmin || isPartner) && <Route path="/Outlet" element={<Outlets />} />}
              {(isAdmin || isPartner) && <Route path="/CardBins" element={<Cardbins />} />}
              {(isAdmin || isPartner) && <Route path="/AddCardbin" element={<AddCardbin />} />}
              {(isAdmin || isPartner) && <Route path="/EditCardbin" element={<EditCardbin />} />}
              {isAdmin && <Route path="/GlobalConfigurations" element={<GlobalConfigurations />} />}
              {isAdmin && <Route path="/EditGlobalConfig" element={<EditGlobalConfig />} />}
              {isAdmin && <Route path="/ReasonCodes" element={<ReasonCodes />} />}
              {isAdmin && <Route path="/EditReasonCode" element={<EditReasonCode />} />}
              {isAdmin && <Route path="/AddReasonCode" element={<AddReasonCode />} />}
              {isAdmin && <Route path="/BusinessCategories" element={<BusinessCats />} />}
              {isAdmin && <Route path="/AddBusinessCategory" element={<AddBusinessCategory />} />}
              {isAdmin && <Route path="/EditBusinessCategory" element={<EditBusinessCategory />} />}
              {isAdmin && <Route path="/admin/auditlogs" element={<AuditLogsAdmin/>} />}
              {isAdmin && <Route path="/AssignPartner" element={<AssignPartner />} />}
              {isAdmin && <Route path="/AnnualMaintenanceFee" element={<AnnualMaintenanceFee />} />}
              {isAdmin && <Route path="/admin/adminwalletereports" element={<AdminZPMStudentWalleteReport/>} />}
              {isAdmin && <Route path="/admin/merchantreport" element={<MerchantReport />} /> }
              {isAdmin && <Route path="/admin/merchantfeeconfig" element={<Merchantfeeconfig />} />  }
              {isAdmin && <Route path="/admin/summarydetails" element={<Cardpresentsummary />} /> }
              {isAdmin && <Route path="/admin/settlmentreport" element={<Settlementreport />} /> }
              {isAdmin && <Route path="/admin/revenueshare" element={<Revenuesharereport />} /> }
              {isAdmin && <Route path="/admin/settlementreview" element={<SettlementPreview />} /> }
              
              {isAdmin && <Route path="/admin/merchantaccountconfig" element={<MerchantAccountConfig />} /> }
              {isAdmin && <Route path="/admin/merchantscheduling" element={<MerchantsettlementScheduling />} /> }
              {(isAdmin || isPartner) && <Route path="/zpmactivationfeereport" element={<ZPMActivationFeeReport />} />}
              {(isAdmin || isPartner) && <Route path="/zpmbioregistrationreport" element={<ZPMBioRegistrationReports />} />}
              {(isAdmin || isPartner) && <Route path="/partner/overalloutletperformance" element={<PayitOutletPerfomanceAdmin />} />}
              {(isAdmin || isPartner) && <Route path="/DeviceModels" element={<DeviceModels />} />}
              {(isAdmin || isPartner) && <Route path="/EditDeviceModel" element={<EditDeviceModel />} />}
              {(isAdmin || isPartner) && <Route path="/AddDeviceModel" element={<AddDeviceModel />} />}
              {(isAdmin || isPartner) && <Route path="/TermUsers" element={<TermUsers />} />}
              {(isAdmin || isPartner) && <Route path="/SuperAdminUsers" element={<SuperAdminUsers />} />}
              {isAdmin && <Route path="/EditUser" element={<EditUser />} />}
              {(isAdmin || isPartner) && <Route path="/admin/allzpmtransactions" element={<Zpmalltransaction />} />}
              {isAdmin && <Route path="/zedb2btransactions" element={<ZedB2BTransactions />} />}
              {(isAdmin || isPartner) && <Route path="/admin/zpmbiotransactions" element={<ZPMbioreports />} />}
              {(isAdmin || isPartner) && <Route path="/admin/zpmcardtransactions" element={<Zpmcardreports />} />}
              {(isAdmin || isPartner) && <Route path="/admin/zpmcashtransactionsadmin" element={<AllPayitCashTransactionsAdmin />} />}
              {(isAdmin || isPartner) && <Route path="/Customers2" element={<Customers2 />} />}
              {(isAdmin || isPartner) && <Route path="/AssignCategoriesToOutlet" element={<AssignCategoriesToOutlet />} />}
              {/* {(isAdmin || isPartner) && <Route path="/PartnerCreateProduct" element={<PartnerCreateProduct />} />} */}
              {/* {(isAdmin || isPartner) && <Route path="/PartnerCreateCategory" element={<PartnerCreateCategory />} />} */}
              {isPartner && <Route path="/partnerproducts" element={<PartnerProducts />} />}
              {isPartner && <Route path="/partner/terminalsummaryreports" element={<TerminalSummaryReport />} />}
              {isPartner && <Route path="/partner/zpmbankpaybillreport" element={<ZpmBankPaybillReport/>} />}
              {isPartner && <Route path="/partner/regions" element={<PartnerRegions />} />}
              {isPartner && <Route path="/partner/branches" element={<PartnerBranches />} />}
              {isPartner && <Route path="/partner/salesperson" element={<PartnerSalesPerson />} />}
              {isPartner && <Route path="/partnerproductscategories" element={<PartnerProductsCategories />} />}
              
              {isAdmin && <Route path="/AddPartnerUser" element={<AddPartnerUser />} />}
              {isAdmin && <Route path="/ViewPartnerUsers" element={<ViewPartnerUsers />} />}
              {isAdmin && <Route path="/delete_requests_admin" element={<DeleteRequestAdmin />} />}




              {/*<Route path="/defineServices" element={<DefineServices />} />*/}
              {isCashierOrAdminOrSupervisorOrMerchant && <Route path="/orders/:tabValue" element={<StartOrder />} />}
              {isCashierOrAdminOrSupervisorOrMerchant && <Route path="/pos/:tabValue" element={<OrdersListing />} />}
              {isCashierOrAdminOrSupervisorOrMerchant && <Route path="/detailedbill/:id" element={<Detailedbill />} />}
              {isCashierOrAdminOrSupervisorOrMerchant && <Route path="/startorder/:parentId" element={<Startorder />} />}
              {isCashierOrAdminOrSupervisorOrMerchant && <Route path="/detailedunpaidbill/:businessNo/:billId" element={<DetailedBills />} />}
              {isCashierOrAdminOrSupervisorOrMerchant && <Route path="/detailedpaidbill/:businessNo/:billId" element={<DetailedBills />} />}
              {isCashierOrAdminOrSupervisorOrMerchant && <Route path="/detailedpartialbill/:businessNo/:billId" element={<DetailedBills />} />}
              {isCashierOrAdminOrSupervisorOrMerchant && <Route path="/detailedcancelledbill/:businessNo/:billId" element={<DetailedBills />} />}
              {isCashierOrAdminOrSupervisorOrMerchant && <Route path="/voucher/:id" element={<VoucherDetails />} />}
              {isCashierOrAdminOrSupervisorOrMerchant && <Route path="/giftvoucher/:id" element={<VoucherGiftPreview />} />}

              {noBranchAndIsAdminOrMerchant && !isCashier && <Route path="/terminals" element={<Terminal />} />}
              {noBranchAndIsAdminOrMerchant && !isCashier && <Route path="/otp" element={<Otp />} />}
              {noBranchAndIsAdminOrMerchant && <Route path="/shops" element={<Shops />} />}
              {noBranchAndIsAdminOrMerchant && !isCashier && <Route path="/businessTerminals" element={<BusinessTerminals />} />}
              {noBranchAndIsAdminOrMerchant && !isCashier && <Route path="/users" element={<Users />} />}
              {noBranchAndIsAdminOrMerchant && !isCashier && <Route path="/users_groups" element={<UserGroupsState />} />}
              {/* {noBranchAndIsAdminOrMerchant && !isCashier && <Route path="/reports" element={<ProductSalesReport />} />} */}
              {noBranchAndIsAdminOrMerchant && <Route path="/voidtransactionreport" element={<VoidTransaction />} />}
              {noBranchAndIsAdminOrMerchant && <Route path="/reports-by-cashier" element={<ReportsByCashier />} />}
              {noBranchAndIsAdminOrMerchant && <Route path="/get_unpaid_orders_by_cashier" element={<ReportsUnpaidOrdersByCashier />} />}
              {noBranchAndIsAdminOrMerchant && <Route path="/get_detailed_sales_report" element={<ReportsDetailedSalesByCashier />} />}
              {noBranchAndIsAdminOrMerchant && <Route path="/get_sales_total_by_product" element={<ReportSalesTotalByProduct />} />}
              {noBranchAndIsAdminOrMerchant && <Route path="/get_sales_total_by_product" element={<ReportSalesTotalByProduct />} />}
              {noBranchAndIsAdminOrMerchant && <Route path="/profit_and_loss" element={<ProfitAndLoss />} />}
              {noBranchAndIsAdminOrMerchant && !isCashier && <Route path="/customerDetails/:id" element={<Customerdetails />} />}
              {/*{  noBranchAndIsAdminOrMerchant && !isCashier && <Route path="/tenantDetails/:id" element={<TenantDetails />} />}*/}
              {noBranchAndIsAdminOrMerchant && !isCashier && <Route path="/get_total_sales_by_item_by_payments" element={<ReportSalesTotalByProductByPayment />} />}
              {noBranchAndIsAdminOrMerchant && !isCashier && <Route path="/get_total_sales_by_product_category" element={<ReportSalesTotalByProductCategory />} />}
              {noBranchAndIsAdminOrMerchant && !isCashier && <Route path="/school/biosalesreport" element={<SchoolBioSalesReport />} />}
              {/* {noBranchAndIsAdminOrMerchant && !isCashier && <Route path="/get_all_cashier_to_settle" element={<ReportAllCashiersSettle />} />} */}
              {noBranchAndIsAdminOrMerchant && !isCashier && <Route path="/get_opening_closing_Report" element={<OpeningAndClosingReport />} />}
              {noBranchAndIsAdminOrMerchant && !isCashier && <Route path="/groups" element={<Groups />} />}
              {noBranchAndIsAdminOrMerchant && <Route path="/products" element={<ServiceSetUp />} />}
              {noBranchAndIsAdminOrMerchant && !isCashier && <Route path="/products/edit/:id" element={<EditSingleProduct />} />}
              {noBranchAndIsAdminOrMerchant && !isCashier && <Route path="/expenditure" element={<Expenditure />} />}
              {noBranchAndIsAdminOrMerchant && !isCashier && <Route path="/addExpense" element={<AddExpense />} />}


              {noBranchAndIsAdminOrMerchant && <Route path="/categories" element={<BillingFeaturesCheck featureName="Inventory Management" routeGuard={true}><ProductSetUp /></BillingFeaturesCheck>} />}
              {noBranchAndIsAdminOrMerchant && <Route path="/qbcategories" element={<QbProduct />} />}
              {noBranchAndIsAdminOrMerchant && !isCashier && <Route path="/categories/edit/:id" element={<EditProductService />} />}
              {noBranchAndIsAdminOrMerchant && !isCashier && <Route path="/Qbcategories/edit/:id" element={<EditProductServiceQb />} />}
              {noBranchAndIsAdminOrMerchant && <Route path="/stock" element={<Stock />} />}
              {noBranchAndIsAdminOrMerchant && <Route path="/stock/transfer" element={<TransferStockTable />} />}
              {noBranchAndIsAdminOrMerchant && <Route path="/transferstock/details/:batchId" element={<TransferStatusStock />} />}
              {noBranchAndIsAdminOrMerchant && <Route path="/stock/transfer/note/:noteType" element={<TransferStockNote />} />}
              {noBranchAndIsAdminOrMerchant && <Route path="/activestock" element={<Activestock />} />}
              {noBranchAndIsAdminOrMerchant && <Route path="/transferstock/:state" element={<Transferstock />} />}
              {noBranchAndIsAdminOrMerchant && <Route path="/approvestock" element={<APPROVAL />} />}
              {noBranchAndIsAdminOrMerchant && <Route path="/viewmoreStock/:status/:id/:state" element={<ViewMoreStock />} />}
              {noBranchAndIsAdminOrMerchant && <Route path="/view-stock/:status" element={<BatchProductStockView />} />}
              {noBranchAndIsAdminOrMerchant && <Route path="/addstock/:state" element={<ADDSTOCK />} />}
              {noBranchAndIsAdminOrMerchant && <Route path="/stockOrder/:state" element={<StockOrder />} />}
              {noBranchAndIsAdminOrMerchant && <Route path="/stockOrder" element={<StockOrders />} />}
              {noBranchAndIsAdminOrMerchant && <Route path="/receiveStock/:state" element={<ReceiveStock />} />}
              {noBranchAndIsAdminOrMerchant && <Route path="/reports/:state" element={<REPORT />} />}
              {noBranchAndIsAdminOrMerchant && <Route path="/stockTake" element={<STOCKTAKE />} />}
              {noBranchAndIsAdminOrMerchant && !isCashier && <Route path="/stockConfig" element={<StockConfig />} />}
              {noBranchAndIsAdminOrMerchant && !isCashier && <Route path="/accountConfig" element={<AccountingConfig />} />}
              {noBranchAndIsAdminOrMerchant && !isCashier && <Route path="/xero_config" element={<XeroAccountConfig />} />}
              {noBranchAndIsAdminOrMerchant && !isCashier && <Route path="/shopifyConfig" element={<ShopifyConfig />} />}
              {noBranchAndIsAdminOrMerchant && !isCashier && <Route path="//payablesConfig" element={<PayableSetStatus />} />}
              {noBranchAndIsAdminOrMerchant && !isCashier && <Route path="/quickbooks" element={<QuickBooks />} />}
              {noBranchAndIsAdminOrMerchant && !isCashier && <Route path="/evoucher" element={<Evoucher />} />}
              {noBranchAndIsAdminOrMerchant && !isCashier && <Route path="/evoucher_booking" element={<EvoucherBooking />} />}
              {noBranchAndIsAdminOrMerchant && !isCashier && <Route path="/evoucher_booking_config" element={<EvoucherAndBooking />} />}
              {noBranchAndIsAdminOrMerchant && !isCashier && <Route path="/businessConfig" element={<BusinessConfig />} />}
              {noBranchAndIsAdminOrMerchant && !isCashier && <Route path="/invoice-reminders" element={<InvoiceReminderForm />} />}
              {noBranchAndIsAdminOrMerchant && !isCashier && <Route path="/tenantConfig" element={<TenantConfig />} />}
              {noBranchAndIsAdminOrMerchant && !isCashier && <Route path="/expPass" element={<ResetExpPass />} />}
              {noBranchAndIsAdminOrMerchant && !isCashier && <Route path="/configuration" element={<Configuration />} />}
              {noBranchAndIsAdminOrMerchant && !isCashier && <Route path="/reasons" element={<Reasons />} />}
              {noBranchAndIsAdminOrMerchant && !isCashier && <Route path="/businessCategories" element={<BusinessCategories />} />}
              {noBranchAndIsAdminOrMerchant && !isCashier && <Route path="/reportFailedSales" element={<ReportFailedSales />} />}
              {noBranchAndIsAdminOrMerchant  && <Route path="/createInvoice/:id" element={<CreateInvoice />} />}
              {noBranchAndIsAdminOrMerchant && !isCashier && <Route path="/createInvoice/create/etims" element={<CreateEtimsInvoice />} />}
              {noBranchAndIsAdminOrMerchant  && <Route path="/businessinvoice" element={<BusinessInvoice />} />}
              {noBranchAndIsAdminOrMerchant && !isCashier && <Route path="/preview_invoice" element={<InvoicePreview />} />}
              {noBranchAndIsAdminOrMerchant && !isCashier && <Route path={"/test_coa_dash"} element={<CustomerAccountDash />} />}
              {noBranchAndIsAdminOrMerchant && !isCashier && <Route path={"/test_parent_display"} element={<SchoolCustomers />} />}
              {noBranchAndIsAdminOrMerchant && !isCashier && <Route path={"/test_student_profile"} element={<StudentProfile />} />}
              {noBranchAndIsAdminOrMerchant && !isCashier && <Route path={"/test_school_students"} element={<SchoolStudents />} />}
              {noBranchAndIsAdminOrMerchant && !isCashier && <Route path={"/test_student_dash"} element={<StudentDash />} />}

              {/* Billing Routes **************************** */}

              {isAdmin && <Route path="/admin/billing/transactions" element={<RecentTransactions />} /> }
              {isAdmin && <Route path="/pos/pushNotifications" element={<PushNotifications />} /> }
              {isAdmin && <Route path="/admin/billing/add_config" element={<AddConfig />} /> }
              {isAdmin && <Route path="/admin/billing/billingplans" element={<ListBillingPlans />} /> }
              {isAdmin && <Route path="/admin/billing" element={<BillingHomePage />} /> }
              <Route path="/subscribe-billing" element={<CustomBillingPage />} />

            </Route>



            <Route path="/logout" element={<Logout />} />
            {/* eceipt/REI4U97DSC/INV_46702 */}
            <Route path="/view/receipt/:receiptNo/:invoiceNumber/:businessNo" element={<ReceiptInvoice />} />
            <Route path="/delete/user/account/request" element={<DeleteAccountRequest />} />
            <Route path="/view/purchaseorder/:PoNo/:businessNo" element={<UnauthInvoice />} />
            <Route path="/view/deliverynote/:Dnote/:businessNo" element={<UnauthInvoice />} />
            <Route path="/view/invoice/:invoiceNumber/:darajaConfigId" element={<UnauthInvoice />} />
            <Route path="/pay/invoice/:invoiceNumber/:darajaConfigId" element={<UnauthPayment />} />
            <Route path="/ticket/e_ticket/:ticketNumber" element={<Ticket />} />
            <Route path="/paymatatufare/:regNo/:customerId/:payBill/:paymentMethod" element={<PayFareMobile />} />
            <Route path="/shopify_callback" element={<ShopifyComponent />} />
            <Route path="/cardpay/:firstName/:lastName/:amount/:invoiceNumber/:email/:orderid/:businessNumber" element={<CardNoAuth />} />
            <Route path="/shopify_callback_test" element={<ShopifyComponent />} />

            {/* {isZedEcommerce && <Route path="/zed/ecommerce/redirect" element={<ZedEcommerceSwitch />} />} */}
          </Routes>
      </Suspense>
    </ThemeProvider>
  );
};

export default App;
