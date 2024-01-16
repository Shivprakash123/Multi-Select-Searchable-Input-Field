import React from "react"
import { Link } from "react-router-dom"

const CustId = cell => {
  return (
    <Link to="#" className="text-body fw-bold">
      {cell.value ? cell.value : ""}
    </Link>
  )
}

const CompanyName = cell => {
  return cell.value ? cell.value : ""
}

const CompanyType = cell => {
  return cell.value ? cell.value : ""
}

const AdminEmailId = cell => {
  return cell.value ? cell.value : ""
}

const AdminPhoneNo = cell => {
  return cell.value ? cell.value : ""
}

const Address = cell => {
  return cell.value ? cell.value : ""
}

const City = cell => {
  return cell.value ? cell.value : ""
}

const State = cell => {
  return cell.value ? cell.value : ""
}

const Pincode = cell => {
  return cell.value ? cell.value : ""
}

const PanNo = cell => {
  return cell.value ? cell.value : ""
}

const GstinNo = cell => {
  return cell.value ? cell.value : ""
}

const RegistrationDate = cell => {
  return cell.value ? cell.value : ""
}

{
  /* 
const UserName = cell => {
  return cell.value ? cell.value : ""
}

const PhoneEmail = cell => {
  return cell.value ? cell.value : ""
}

const Address = cell => {
  return cell.value ? cell.value : ""
}

const Rating = cell => {
  return (
    <span className="bg-success font-size-12 badge bg-success">
      <i className="mdi mdi-star me-1"></i>
      {cell.value}
    </span>
  )
}

const WalletBalances = cell => {
  return cell.value ? cell.value : ""
}

const JoiningDate = cell => {
  return cell.value ? cell.value : ""
}

*/
}

export {
  CustId,
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
}
