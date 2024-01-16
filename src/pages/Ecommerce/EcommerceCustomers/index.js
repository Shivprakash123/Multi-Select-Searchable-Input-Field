import React, { useEffect, useState, useMemo } from "react"
import { Link } from "react-router-dom"
import PropTypes from "prop-types"
import { isEmpty } from "lodash"
import * as Yup from "yup"
import { useFormik } from "formik"
import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Row,
  Modal,
  ModalHeader,
  ModalBody,
  UncontrolledTooltip,
  Input,
  FormFeedback,
  Label,
  Form,
  Dropdown,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap"

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb"

import DeleteModal from "../../../components/Common/DeleteModal"
import {
  getCustomers as onGetCustomers,
  addNewCustomer as onAddNewCustomer,
  updateCustomer as onUpdateCustomer,
  deleteCustomer as onDeleteCustomer,
} from "store/e-commerce/actions"

//redux
import { useSelector, useDispatch } from "react-redux"
import TableContainer from "../../../components/Common/TableContainer"

// Column
import {
  CompanyName,
  CompanyType,
  AdminEmailId,
  AdminPhoneNo,
  Address,
  City,
  State,
  Pincode,
  PanNo,
  GstinNo,
  RegistrationDate,

  /*
  UserName,
  PhoneEmail,
  Address,
  Rating,
  WalletBalances,
  JoiningDate,
  */
} from "./EcommerceCustCol"

const EcommerceCustomers = props => {
  //meta title
  document.title = "Customers | Skote - React Admin & Dashboard Template"

  const [file, setFile] = useState(null)

  const handleFileChange = e => {
    const selectedFile = e.target.files[0]
    setFile(selectedFile)
  }

  const handleRemoveFile = () => {
    setFile(null)
  }

  const dispatch = useDispatch()

  const { customers } = useSelector(state => ({
    customers: state.ecommerce.customers,
  }))

  const [modal, setModal] = useState(false)
  const [customerList, setCustomerList] = useState([])
  const [isEdit, setIsEdit] = useState(false)
  const [customer, setCustomer] = useState(null)

  // validation
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      companyName: (customer && customer.companyName) || "",
      companyType: (customer && customer.companyType) || "",
      adminEmailId: (customer && customer.adminEmailId) || "",
      adminPhoneNo: (customer && customer.adminPhoneNo) || "",
      address: (customer && customer.address) || "",
      city: (customer && customer.city) || "",
      state: (customer && customer.state) || "",
      pincode: (customer && customer.pincode) || "",
      panNo: (customer && customer.panNo) || "",
      gstinNo: (customer && customer.gstinNo) || "",
      registrationDate: (customer && customer.registrationDate) || "",

      /* phone: (customer && customer.phone) || "",
      email: (customer && customer.email) || "",
      address: (customer && customer.address) || "",
      rating: (customer && customer.rating) || "",
      walletBalance: (customer && customer.walletBalance) || "",
      joiningDate: (customer && customer.joiningDate) || "",
      */
    },
    validationSchema: Yup.object({
      companyName: Yup.string().required("Please Enter Your Company Name"),
      companyType: Yup.string().required("Please Enter Your Company Type"),

      adminPhoneNo: Yup.string().required("Please Enter Your Phone No"),
      adminEmailId: Yup.string()
        .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Please Enter Valid Email")
        .required("Please Enter Your Email ID"),
      address: Yup.string().required("Please Enter Your Address"),
      city: Yup.string().required("Please Enter Your Address"),
      state: Yup.string().required("Please Enter Your Address"),
      pincode: Yup.string().required("Please Enter Your Pincode"),
      panNo: Yup.string().required("Please Enter Your PAN No"),
      gstinNo: Yup.string().required("Please Enter Your GSTIN No"),
      registrationDate: Yup.string().required(
        "Please Enter Your Registration Date"
      ),

      /*
      rating: Yup.string()
        .matches(/\b([0-9]|10)\b/, "Please Enter Valid Rating")
        .required("Please Enter Your Rating"), 
        
      walletBalance: Yup.string().required("Please Enter Your Wallet Balance"),
      joiningDate: Yup.string().required("Please Enter Your Joining Date"),
      */
    }),
    onSubmit: values => {
      if (isEdit) {
        const updateCustomer = {
          id: customer ? customer.id : 0,
          companyName: values.companyName,
          companyType: values.companyType,
          adminEmailId: values.adminEmailId,
          adminPhoneNo: values.adminPhoneNo,
          address: values.address,
          city: values.city,
          state: values.state,
          pincode: values.pincode,
          panNo: values.panNo,
          gstinNo: values.gstinNo,
          registrationDate: values.registrationDate,

          /*
          username: values.usernamee,
          phone: values.phone,
          email: values.email,
          address: values.address,
          rating: values.rating,
          walletBalance: values.walletBalance,
          joiningDate: values.joiningDate,
          */
        }
        // update customer
        dispatch(onUpdateCustomer(updateCustomer))
        validation.resetForm()
      } else {
        const newCustomer = {
          id: Math.floor(Math.random() * (30 - 20)) + 20,

          companyName: values["companyName"],
          companyType: values["companyType"],
          adminEmailId: values["adminEmailId"],
          adminPhoneNo: values["adminPhoneNo"],
          address: values["address"],
          city: values["city"],
          state: values["state"],
          pincode: values["pincode"],
          panNo: values["panNo"],
          gstinNo: values["gstinNo"],
          registrationDate: values["registrationDate"],

          /*
          companyName: values["companyName"],
          phone: values["phone"],
          email: values["email"],
          address: values["address"],
          rating: values["rating"],
          walletBalance: values["walletBalance"],
          joiningDate: values["joiningDate"],
          */
        }
        // save new customer
        dispatch(onAddNewCustomer(newCustomer))
        validation.resetForm()
      }
      toggle()
    },
  })

  const handleCustomerClick = arg => {
    const customer = arg

    setCustomer({
      id: customer.id,

      companyName: customer.companyName,
      companyType: customer.companyType,
      adminEmailId: customer.adminEmailId,
      adminPhoneNo: customer.adminPhoneNo,
      address: customer.address,
      city: customer.city,
      state: customer.state,
      pincode: customer.pincode,
      panNo: customer.panNo,
      gstinNo: customer.gstinNo,
      registrationDate: customer.registrationDate,

      /*
      username: customer.username,
      phone: customer.phone,
      email: customer.email,
      address: customer.address,
      rating: customer.rating,
      walletBalance: customer.walletBalance,
      joiningDate: customer.joiningDate,
      */
    })

    setIsEdit(true)
    toggle()
  }

  // Customber Column
  const columns = useMemo(
    () => [
      {
        Header: "#",
        Cell: () => {
          return <input type="checkbox" className="form-check-input" />
        },
      },
      {
        Header: "Company Name",
        accessor: "companyName",
        filterable: true,
        Cell: cellProps => {
          return <CompanyName {...cellProps} />
        },
      },
      {
        Header: "Company Type",
        accessor: "companyType",
        filterable: true,
        Cell: cellProps => {
          return <CompanyType {...cellProps} />
        },
      },
      {
        Header: "Email ID",
        accessor: "adminEmailId",
        filterable: true,
        Cell: cellProps => {
          return <AdminEmailId {...cellProps} />
        },
      },
      {
        Header: "Phone No",
        accessor: "adminPhoneNo",
        filterable: true,
        Cell: cellProps => {
          return <AdminPhoneNo {...cellProps} />
        },
      },
      {
        Header: "Address",
        accessor: "address",
        filterable: true,
        Cell: cellProps => {
          return <Address {...cellProps} />
        },
      },
      {
        Header: "City",
        accessor: "city",
        filterable: true,
        Cell: cellProps => {
          return <City {...cellProps} />
        },
      },
      {
        Header: "State",
        accessor: "state",
        filterable: true,
        Cell: cellProps => {
          return <State {...cellProps} />
        },
      },
      {
        Header: "Pincode",
        accessor: "pincode",
        filterable: true,
        Cell: cellProps => {
          return <Pincode {...cellProps} />
        },
      },
      {
        Header: "PAN Number",
        accessor: "panNo",
        filterable: true,
        Cell: cellProps => {
          return <PanNo {...cellProps} />
        },
      },
      {
        Header: "GSTIN Number",
        accessor: "gstinNo",
        filterable: true,
        Cell: cellProps => {
          return <GstinNo {...cellProps} />
        },
      },
      {
        Header: "Registration Date",
        accessor: "registrationDate",
        filterable: true,
        Cell: cellProps => {
          return <RegistrationDate {...cellProps} />
        },
      },

      /*
      {
        Header: "Address",
        accessor: "address",
        filterable: true,
        Cell: cellProps => {
          return <Address {...cellProps} />
        },
      },
      {
        Header: "Rating",
        accessor: "rating",
        filterable: true,
        Cell: cellProps => {
          return <Rating {...cellProps} />
        },
      },
      {
        Header: "Wallet Balances",
        accessor: "walletBalance",
        filterable: true,
        Cell: cellProps => {
          return <WalletBalances {...cellProps} />
        },
      },
      {
        Header: "Joining Date",
        accessor: "joiningDate",
        Cell: cellProps => {
          return <JoiningDate {...cellProps} />
        },
      },
      */
      {
        Header: "Action",
        Cell: cellProps => {
          return (
            <UncontrolledDropdown>
              <DropdownToggle tag="a" className="card-drop">
                <i className="mdi mdi-dots-horizontal font-size-18"></i>
              </DropdownToggle>

              <DropdownMenu className="dropdown-menu-end">
                <DropdownItem
                  onClick={() => {
                    const customerData = cellProps.row.original
                    handleCustomerClick(customerData)
                  }}
                >
                  <i
                    className="mdi mdi-pencil font-size-16 text-success me-1"
                    id="edittooltip"
                  ></i>
                  Edit
                  <UncontrolledTooltip placement="top" target="edittooltip">
                    Edit
                  </UncontrolledTooltip>
                </DropdownItem>

                <DropdownItem
                  onClick={() => {
                    const customerData = cellProps.row.original
                    onClickDelete(customerData)
                  }}
                >
                  <i
                    className="mdi mdi-trash-can font-size-16 text-danger me-1"
                    id="deletetooltip"
                  ></i>
                  Delete
                  <UncontrolledTooltip placement="top" target="deletetooltip">
                    Delete
                  </UncontrolledTooltip>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          )
        },
      },
    ],
    []
  )

  const toggle = () => {
    if (modal) {
      setModal(false)
      setCustomer(null)
    } else {
      setModal(true)
    }
  }

  //delete customer
  const [deleteModal, setDeleteModal] = useState(false)

  const onClickDelete = customer => {
    setCustomer(customer)
    setDeleteModal(true)
  }

  const handleDeleteCustomer = () => {
    if (customer && customer.id) {
      dispatch(onDeleteCustomer(customer.id))
      setDeleteModal(false)
    }
  }

  useEffect(() => {
    if (customers && !customers.length) {
      dispatch(onGetCustomers())
    }
  }, [dispatch, customers])

  useEffect(() => {
    setCustomerList(customers)
  }, [customers])

  useEffect(() => {
    if (!isEmpty(customers)) {
      setCustomerList(customers)
    }
  }, [customers])

  const handleCustomerClicks = () => {
    setCustomerList("")
    setIsEdit(false)
    toggle()
  }

  return (
    <React.Fragment>
      <DeleteModal
        show={deleteModal}
        onDeleteClick={handleDeleteCustomer}
        onCloseClick={() => setDeleteModal(false)}
      />
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Ecommerce" breadcrumbItem="Customers" />
          <Row>
            <Col xs="12">
              <Card>
                <CardBody>
                  <TableContainer
                    columns={columns}
                    data={customers}
                    isGlobalFilter={true}
                    isAddCustList={true}
                    handleCustomerClick={handleCustomerClicks}
                    customPageSize={10}
                    className="custom-header-css"
                  />

                  <Modal isOpen={modal} toggle={toggle}>
                    <ModalHeader toggle={toggle} tag="h4">
                      {!!isEdit ? "Edit Organization" : "Add Organization"}
                    </ModalHeader>
                    <ModalBody>
                      <Form
                        onSubmit={e => {
                          e.preventDefault()
                          validation.handleSubmit()
                          return false
                        }}
                      >
                        <Row>
                          <Col className="col-12">
                            <div className="mb-3">
                              <Label className="form-label">Company Name</Label>
                              <Input
                                name="companyName"
                                type="text"
                                placeholder="Enter Company Name"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.companyName || ""}
                                invalid={
                                  validation.touched.companyName &&
                                  validation.errors.companyName
                                    ? true
                                    : false
                                }
                              />
                              {validation.touched.companyName &&
                              validation.errors.companyName ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.companyName}
                                </FormFeedback>
                              ) : null}
                            </div>

                            <div className="mb-3">
                              <Label className="form-label">Company Type</Label>
                              <Input
                                name="companyType"
                                type="text"
                                placeholder="Enter Company Type"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.companyType || ""}
                                invalid={
                                  validation.touched.companyType &&
                                  validation.errors.companyType
                                    ? true
                                    : false
                                }
                              />
                              {validation.touched.companyType &&
                              validation.errors.companyType ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.companyType}
                                </FormFeedback>
                              ) : null}
                            </div>

                            <div className="mb-3">
                              <Label
                                htmlFor="formFileMultiple"
                                className="form-label"
                              >
                                Company Image
                              </Label>
                              <Input
                                className="form-control"
                                type="file"
                                id="formFileMultiple"
                                multiple
                                onChange={handleFileChange}
                              />
                              {file && (
                                <div>
                                  <Label className="file-name">
                                    {file.name}
                                  </Label>
                                  <Button
                                    onClick={handleRemoveFile}
                                    className="m-2"
                                    size="sm"
                                  >
                                    Remove
                                  </Button>
                                </div>
                              )}
                            </div>

                            <div className="mb-3">
                              <Label
                                htmlFor="formFileMultiple"
                                className="form-label"
                              >
                                Company Logo
                              </Label>
                              <Input
                                className="form-control"
                                type="file"
                                id="formFileMultiple"
                                multiple
                                onChange={handleFileChange}
                              />
                              {file && (
                                <div>
                                  <Label className="file-name">
                                    {file.name}
                                  </Label>
                                  <Button
                                    onClick={handleRemoveFile}
                                    className="m-2"
                                    size="sm"
                                  >
                                    Remove
                                  </Button>
                                </div>
                              )}
                            </div>

                            <div className="mb-3">
                              <Label className="form-label">
                                Admin Email Id
                              </Label>
                              <Input
                                name="adminEmailId"
                                type="email"
                                placeholder="Enter Email Id"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.adminEmailId || ""}
                                invalid={
                                  validation.touched.adminEmailId &&
                                  validation.errors.adminEmailId
                                    ? true
                                    : false
                                }
                              />
                              {validation.touched.adminEmailId &&
                              validation.errors.adminEmailId ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.adminEmailId}
                                </FormFeedback>
                              ) : null}
                            </div>

                            <div className="mb-3">
                              <Label className="form-label">
                                Admin Phone No
                              </Label>
                              <Input
                                name="adminPhoneNo"
                                type="number"
                                placeholder="Enter Phone No"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.adminPhoneNo || ""}
                                invalid={
                                  validation.touched.adminPhoneNo &&
                                  validation.errors.adminPhoneNo
                                    ? true
                                    : false
                                }
                              />
                              {validation.touched.adminPhoneNo &&
                              validation.errors.adminPhoneNo ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.adminPhoneNo}
                                </FormFeedback>
                              ) : null}
                            </div>

                            <div className="mb-3">
                              <Label className="form-label">
                                Address Line 1
                              </Label>
                              <Input
                                name="address"
                                type="text"
                                placeholder="Enter Company Address"
                                rows="1"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.address || ""}
                                invalid={
                                  validation.touched.address &&
                                  validation.errors.address
                                    ? true
                                    : false
                                }
                              />
                              {validation.touched.address &&
                              validation.errors.address ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.address}
                                </FormFeedback>
                              ) : null}
                            </div>

                            <div className="mb-3">
                              <Label className="form-label">
                                Address Line 2
                              </Label>
                              <Input
                                name="address"
                                type="textarea"
                                placeholder="Enter Company Address"
                                rows="1"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.address || ""}
                                invalid={
                                  validation.touched.address &&
                                  validation.errors.address
                                    ? true
                                    : false
                                }
                              />
                              {validation.touched.address &&
                              validation.errors.address ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.address}
                                </FormFeedback>
                              ) : null}
                            </div>

                            <div className="mb-3">
                              <Label className="form-label">City</Label>
                              <select
                                className="form-select"
                                aria-label="Default select example"
                              >
                                <option selected>Select a City</option>
                                <option value="1">Mumbai</option>
                                <option value="2">Pune</option>
                                <option value="3">Thane</option>
                              </select>
                            </div>

                            <div className="mb-3">
                              <Label className="form-label">State</Label>
                              <select
                                className="form-select"
                                aria-label="Default select example"
                                /*
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.state || ""}
                                 invalid={
                                   validation.touched.state &&
                                   validation.errors.state
                                     ? true
                                     : false
                                 }
                                 */
                              >
                                <option selected>Select a State</option>
                                <option value="1">Maharashtra</option>
                                <option value="2">Delhi</option>
                                <option value="3">Assam</option>
                              </select>
                            </div>

                            <div className="mb-3">
                              <Label className="form-label">Pincode</Label>
                              <Input
                                name="pincode"
                                type="number"
                                placeholder="Enter Pincode"
                                rows="1"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.pincode || ""}
                                invalid={
                                  validation.touched.pincode &&
                                  validation.errors.pincode
                                    ? true
                                    : false
                                }
                              />
                              {validation.touched.pincode &&
                              validation.errors.pincode ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.pincode}
                                </FormFeedback>
                              ) : null}
                            </div>

                            <div className="mb-3">
                              <Label className="form-label">PAN Number</Label>
                              <Input
                                name="panNo"
                                type="text"
                                placeholder="Enter PAN Number"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.panNo || ""}
                                invalid={
                                  validation.touched.panNo &&
                                  validation.errors.panNo
                                    ? true
                                    : false
                                }
                              />
                              {validation.touched.panNo &&
                              validation.errors.panNo ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.panNo}
                                </FormFeedback>
                              ) : null}
                            </div>

                            <div className="mb-3">
                              <Label className="form-label">GST Number</Label>
                              <Input
                                name="gstinNo"
                                type="text"
                                placeholder="Enter GST Number"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.gstinNo || ""}
                                invalid={
                                  validation.touched.gstinNo &&
                                  validation.errors.gstinNo
                                    ? true
                                    : false
                                }
                              />
                              {validation.touched.gstinNo &&
                              validation.errors.gstinNo ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.gstinNo}
                                </FormFeedback>
                              ) : null}
                            </div>

                            <div className="mb-3">
                              <Label className="form-label">
                                Registration Date
                              </Label>
                              <Input
                                name="registrationDate"
                                type="date"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.registrationDate || ""}
                                invalid={
                                  validation.touched.registrationDate &&
                                  validation.errors.registrationDate
                                    ? true
                                    : false
                                }
                              />
                              {validation.touched.registrationDate &&
                              validation.errors.registrationDate ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.registrationDate}
                                </FormFeedback>
                              ) : null}
                            </div>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <div className="text-end">
                              <button
                                type="submit"
                                className="btn btn-success save-customer"
                              >
                                Save
                              </button>
                            </div>
                          </Col>
                        </Row>
                      </Form>
                    </ModalBody>
                  </Modal>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

EcommerceCustomers.propTypes = {
  customers: PropTypes.array,
  onGetCustomers: PropTypes.func,
  onAddNewCustomer: PropTypes.func,
  onDeleteCustomer: PropTypes.func,
  onUpdateCustomer: PropTypes.func,
}

export default EcommerceCustomers

{
  /* <ModalBody>
<div id="kyc-verify-wizard" className="wizard clearfix">
 
  <div className="content clearfix">
    <TabContent
      activeTab={activeTab}
      className="twitter-bs-wizard-tab-content"
    >
      <TabPane tabId={1} id="personal-info">
        <Form>
          <Row>
            <Col lg="6">
              <FormGroup className="mb-3">
                <Label
                  htmlFor="kycfirstname-input"
                  className="form-label"
                >
                  First name
                </Label>
                <Input
                  type="text"
                  className="form-control"
                  id="kycfirstname-input"
                  placeholder="Enter First name"
                />
              </FormGroup>
            </Col>
            <Col lg="6">
              <FormGroup className="mb-3">
                <Label
                  htmlFor="kyclastname-input"
                  className="form-label"
                >
                  Last name
                </Label>
                <Input
                  type="text"
                  className="form-control"
                  id="kyclastname-input"
                  placeholder="Enter Last name"
                />
              </FormGroup>
            </Col>
          </Row>

          <Row>
            <Col lg="6">
              <FormGroup className="mb-3">
                <Label
                  htmlFor="kycphoneno-input"
                  className="form-label"
                >
                  Phone
                </Label>
                <Input
                  type="text"
                  className="form-control"
                  id="kycphoneno-input"
                  placeholder="Enter Phone number"
                />
              </FormGroup>
            </Col>
            <Col lg="6">
              <FormGroup className="mb-3">
                <Label
                  htmlFor="kycbirthdate-input"
                  className="form-label"
                >
                  Date of birth
                </Label>
                <Input
                  type="text"
                  className="form-control"
                  id="kycbirthdate-input"
                  placeholder="Enter Date of birth"
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col lg="12">
              <FormGroup className="mb-3">
                <Label
                  htmlFor="kycselectcity-input"
                  className="form-label"
                >
                  City
                </Label>
                <select
                  className="form-select"
                  id="kycselectcity-input"
                >
                  <option>San Francisco</option>
                  <option>Los Angeles</option>
                  <option>San Diego</option>
                </select>
              </FormGroup>
            </Col>
          </Row>
        </Form>
      </TabPane>
      <TabPane tabId={2} id="confirm-email">
        <div>
          <Form>
            <Row>
              <Col lg={6}>
                <div className="mb-3">
                  <Label htmlFor="basicpill-pancard-input">PAN Card</Label>
                  <Input type="text" className="form-control" id="basicpill-pancard-input" placeholder="PAN Card No." />
                </div>
              </Col>

              <Col lg={6}>
                <div className="mb-3">
                  <Label htmlFor="basicpill-vatno-input">VAT/TIN No.</Label>
                  <Input type="text" className="form-control" id="basicpill-vatno-input" placeholder="VAT/TIN No" />
                </div>
              </Col>
            </Row>
            <Row>
              <Col lg={6}>
                <div className="mb-3">
                  <Label htmlFor="basicpill-cstno-input">CST No.</Label>
                  <Input type="text" className="form-control" id="basicpill-cstno-input" placeholder="CST No." />
                </div>
              </Col>

              <Col lg={6}>
                <div className="mb-3">
                  <Label htmlFor="basicpill-servicetax-input">Service Tax No.</Label>
                  <Input type="text" className="form-control" id="basicpill-servicetax-input" placeholder="Service Tax No." />
                </div>
              </Col>
            </Row>
            <Row>
              <Col lg={6}>
                <div className="mb-3">
                  <Label htmlFor="basicpill-companyuin-input">Company UIN</Label>
                  <Input type="text" className="form-control" id="basicpill-companyuin-input" placeholder="Company UIN" />
                </div>
              </Col>

              <Col lg={6}>
                <div className="mb-3">
                  <Label htmlFor="basicpill-declaration-input">Declaration</Label>
                  <Input type="text" className="form-control" id="basicpill-Declaration-input" placeholder="Declaration" />
                </div>
              </Col>

              <Col lg={6}>
                <div className="mb-3">
                  Didn&t recieve code ?
                  <button className="btn btn-link">Resend Code</button>
                </div>
              </Col>


            </Row>
          </Form>
        </div>
      </TabPane>
      <TabPane tabId={3} id="doc-verification">
        <h5 className="font-size-14 mb-3">
          Upload document file for a verification
        </h5>
        <div className="kyc-doc-verification mb-3">
          <Dropzone
            onDrop={acceptedFiles =>
              handleAcceptedFiles(acceptedFiles)
            }
          >
            {({ getRootProps, getInputProps }) => (
              <div className="dropzone">
                <div
                  className="dz-message needsclick"
                  {...getRootProps()}
                >
                  <Input {...getInputProps()} />
                  <div className="mb-3">
                    <i className="display-4 text-muted bx bxs-cloud-upload"></i>
                  </div>
                  <h4>
                    Drop files here or click to upload.
                  </h4>
                </div>
              </div>
            )}
          </Dropzone>
          <div
            className="dropzone-previews mt-3"
            id="file-previews"
          >
            {selectedFiles.map((f, i) => {
              return (
                <Card
                  className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete"
                  key={i + "-file"}
                >
                  <div className="p-2">
                    <Row className="align-items-center">
                      <Col className="col-auto">
                        <img
                          data-dz-thumbnail=""
                          height="80"
                          className="avatar-sm rounded bg-light"
                          alt={f.name}
                          src={f.preview}
                        />
                      </Col>
                      <Col>
                        <Link
                          to="#"
                          className="text-muted font-weight-bold"
                        >
                          {f.name}
                        </Link>
                        <p className="mb-0">
                          <strong>
                            {f.formattedSize}
                          </strong>
                        </p>
                      </Col>
                    </Row>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </TabPane>
    </TabContent>
  </div>
  <div className="actions clearfix">
    <ul role="menu" aria-label="Pagination">
      <li
        className={
          activeTab === 1
            ? "previous disabled"
            : "previous"
        }
      >
        <Link
          to="#"
          onClick={() => {
            toggleTab(activeTab - 1);
          }}
        >
          Previous
        </Link>
      </li>
      <li
        className={
          activeTab === 3 ? "next disabled" : "next"
        }
      >
        <Link
          to="#"
          onClick={() => {
            toggleTab(activeTab + 1);
          }}
        >
          Next
        </Link>
      </li>
    </ul>
  </div>
</div>
</ModalBody> */
}
