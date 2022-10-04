import React, { useEffect, useReducer, useRef, useState } from "react";
import {
  CButton,
  CForm,
  CFormInput,
  CFormLabel,
  CFormTextarea,
} from "@coreui/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useLocation, useNavigate } from "react-router-dom";
import SimpleReactValidator from "simple-react-validator";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";
import { useDispatch } from "react-redux";
import { createFormData, updateFormData } from "../../../store/actions";

const initialState = {
  sendReq: {
    orderDate: new Date(),
    receivedDate: new Date(),
    billNo: "",
    billAmount: "",
    netDays: "",
    cname: "",
    bname: "",
    pname: "",
    address: "",
  },
};

const reducer = (state, payload) => ({ ...state, ...payload });

const AddBill = () => {
  const [bill, setBill] = useReducer(reducer, initialState);
  const { sendReq } = bill;
  const validator = useRef(new SimpleReactValidator());
  const [, forceUpdate] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const paramId = window.location.pathname.split("/")[2];
  const { state } = useLocation();

  useEffect(() => {
    if (paramId) {
      // let record = JSON.parse(localStorage.getItem("record"))
      // let obj = record.find((i) => i.id == paramId)
      // console.log('obj----------->', obj)
      setBill({
        ...bill,
        sendReq: {
          orderDate: moment(state.orderDate).toDate(),
          receivedDate: moment(state.receivedDate).toDate(),
          billNo: state.billNo,
          billAmount: state.billAmount,
          netDays: state.netDays,
          cname: state.cname,
          bname: state.bname,
          pname: state.pname,
          address: state.address,
        },
      });
    }
  }, []);
  console.log("sendReq", sendReq);

  const handleClick = () => {
    navigate("/bill");
  };

  const setStartDate = (date, name) => {
    if (name === "startDate") {
      setBill({
        ...bill,
        sendReq: {
          ...sendReq,
          orderDate: date,
        },
      });
    } else {
      setBill({
        ...bill,
        sendReq: {
          ...sendReq,
          receivedDate: date,
        },
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBill({
      ...bill,
      sendReq: {
        ...sendReq,
        [name]: value,
      },
    });
  };

  const onlyNumber = (event) => {
    const keycode = event.which;
    if (keycode === 13) {
    } else if (
      !(
        event.shiftKey === false &&
        (keycode === 8 ||
          keycode === 18 ||
          keycode === 37 ||
          keycode === 39 ||
          keycode === 46 ||
          (keycode >= 48 && keycode <= 57))
      )
    )
      event.preventDefault();
  };

  const onSave = () => {
    if (validator.current.allValid()) {
      if (
        sendReq.netDays >
        moment(
          moment(sendReq.receivedDate).format("DD.MM.YYYY"),
          "DD.MM.YYYY"
        ).diff(
          moment(moment(sendReq.orderDate).format("DD.MM.YYYY"), "DD.MM.YYYY"),
          "days"
        )
      ) {
        toast.error("please enter valid net days", {
          position: toast.POSITION.TOP_RIGHT,
        });
      } else {
        if (paramId) {
          updateFormData(sendReq, paramId, (res) => {
            if (res.message) {
              navigate("/bill");
            } else {
              toast.error(res.message, { position: toast.POSITION.TOP_RIGHT });
            }
          })(dispatch);
        } else {
          createFormData(sendReq, (res) => {
            if (res.data) {
              navigate("/bill");
            } else {
              toast.error(res.message, { position: toast.POSITION.TOP_RIGHT });
            }
          })(dispatch);
        }
      }
    } else {
      validator.current.showMessages(true);
      forceUpdate(1);
    }
  };

  return (
    <div className="salesOrder">
      <h5 style={{ marginBottom: "20px" }}>Add Bill Details</h5>
      <CForm>
        <div className="sales_form ">
          <div className="row">
            <div className="mb-12 col-sm-12 col-md-6">
              <div className="mb-3">
                <CFormLabel htmlFor="exampleFormControlTextarea1">
                  Company Name
                </CFormLabel>
                <CFormInput
                  type="text"
                  name="cname"
                  value={sendReq.cname}
                  placeholder="Company Name"
                  onChange={handleChange}
                />
                <span style={{ color: "red" }}>
                  {validator.current.message(
                    "company name",
                    sendReq.cname,
                    "required"
                  )}
                </span>
              </div>
            </div>
            <div className="mb-12 col-sm-12 col-md-6">
              <div className="mb-3">
                <CFormLabel htmlFor="exampleFormControlTextarea1">
                  Party Name
                </CFormLabel>
                <CFormInput
                  type="text"
                  name="pname"
                  value={sendReq.pname}
                  placeholder="Party Name"
                  onChange={handleChange}
                />
                <span style={{ color: "red" }}>
                  {validator.current.message(
                    "party name",
                    sendReq.pname,
                    "required"
                  )}
                </span>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="mb-12 col-sm-12 col-md-6">
              <div className="mb-3">
                <CFormLabel htmlFor="exampleFormControlTextarea1">
                  Broker Name
                </CFormLabel>
                <CFormInput
                  type="text"
                  name="bname"
                  value={sendReq.bname}
                  placeholder="Broker Name"
                  onChange={handleChange}
                />
                <span style={{ color: "red" }}>
                  {validator.current.message(
                    "broker name",
                    sendReq.bname,
                    "required"
                  )}
                </span>
              </div>
            </div>
            <div className="mb-12 col-sm-12 col-md-6">
              <div className="mb-3">
                <CFormLabel htmlFor="exampleFormControlTextarea1">
                  {" "}
                  Address{" "}
                </CFormLabel>
                <CFormTextarea
                  name="address"
                  value={sendReq.address}
                  placeholder="Address"
                  rows="3"
                  onChange={handleChange}
                ></CFormTextarea>
                <span style={{ color: "red" }}>
                  {validator.current.message(
                    "address",
                    sendReq.address,
                    "required"
                  )}
                </span>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="mb-12 col-sm-12 col-md-6">
              <div className="mb-3 datepicker">
                <CFormLabel htmlFor="exampleFormControlInput1">
                  Bill Date{" "}
                </CFormLabel>
                <div
                  className="d-flex flex-wrap"
                  style={{ position: "relative" }}
                >
                  <DatePicker
                    name="startDate"
                    autoComplete="off"
                    // minDate={new Date()}
                    dateFormat="dd/MM/yyyy"
                    selected={sendReq.orderDate}
                    selectsStart
                    onChange={(date) => setStartDate(date, "startDate")}
                  />
                  <span className="date_icon">
                    <img src="/img/date_icon.svg" alt="start date" />
                  </span>
                </div>
                <span style={{ color: "red" }}>
                  {validator.current.message(
                    "bill date",
                    sendReq.orderDate,
                    "required"
                  )}
                </span>
                {/* <CDatePicker date="2022/2/16" /> */}
              </div>
            </div>

            <div className="mb-12 col-sm-12 col-md-6">
              <div className="mb-3">
                <CFormLabel htmlFor="exampleFormControlInput1">
                  Bill No
                </CFormLabel>
                <CFormInput
                  type="text"
                  name="billNo"
                  id="exampleFormControlInput1"
                  placeholder="Bill No"
                  value={sendReq.billNo}
                  onChange={handleChange}
                  onKeyPress={onlyNumber}
                />
              </div>
              <span style={{ color: "red" }}>
                {validator.current.message(
                  "billNo",
                  sendReq.billNo,
                  "required"
                )}
              </span>
            </div>
          </div>
          <div className="row">
            <div className="mb-12 col-sm-12 col-md-6">
              <div className="mb-3 datepicker">
                <CFormLabel htmlFor="exampleFormControlInput1">
                  Received Date
                </CFormLabel>
                <div
                  className="d-flex flex-wrap"
                  style={{ position: "relative" }}
                >
                  <DatePicker
                    name="receivedDate"
                    autoComplete="off"
                    dateFormat="dd/MM/yyyy"
                    // minDate={new Date()}
                    selected={sendReq.receivedDate}
                    selectsStart
                    onChange={(date) => setStartDate(date, "receivedDate")}
                  />
                  <span className="date_icon">
                    <img src="/img/date_icon.svg" alt="start date" />
                  </span>
                </div>
                <span style={{ color: "red" }}>
                  {validator.current.message(
                    "receivedDate",
                    sendReq.receivedDate,
                    "required"
                  )}
                </span>
                {/* <CDatePicker date="2022/2/16" /> */}
              </div>
            </div>

            <div className="mb-12 col-sm-12 col-md-6">
              <div className="mb-3">
                <CFormLabel htmlFor="exampleFormControlInput1">
                  Bill Amount
                </CFormLabel>
                <CFormInput
                  type="text"
                  name="billAmount"
                  id="exampleFormControlInput1"
                  placeholder="Bill Amount"
                  value={sendReq.billAmount}
                  onChange={handleChange}
                  onKeyPress={onlyNumber}
                />
                <span style={{ color: "red" }}>
                  {validator.current.message(
                    "Bill Amount",
                    sendReq.billAmount,
                    "required"
                  )}
                </span>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="mb-12 col-sm-12 col-md-6">
              <div className="mb-3">
                <CFormLabel htmlFor="exampleFormControlInput1">
                  Net Days
                </CFormLabel>
                <CFormInput
                  type="text"
                  name="netDays"
                  id="exampleFormControlInput1"
                  placeholder="Net Days"
                  value={sendReq.netDays}
                  onChange={handleChange}
                  onKeyPress={onlyNumber}
                />
                <span style={{ color: "red" }}>
                  {validator.current.message(
                    "Net Days",
                    sendReq.netDays,
                    "required"
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>
      </CForm>
      <div style={{ textAlign: "center" }}>
        <CButton
          color="primary"
          style={{ marginRight: "6px" }}
          onClick={onSave}
        >
          Save
        </CButton>
        <CButton color="secondary" onClick={handleClick}>
          Cancel
        </CButton>
      </div>
      <ToastContainer position={toast.POSITION.TOP_RIGHT} autoClose={8000} />
    </div>
  );
};

export default AddBill;
