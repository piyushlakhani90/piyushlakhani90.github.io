import React, { useEffect, useReducer, useRef, useState } from "react";
import {
    CButton,
    CForm,
    CFormInput,
    CFormLabel,
    CFormSelect,
    CFormTextarea,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle,
} from "@coreui/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useLocation, useNavigate } from "react-router-dom";
import SimpleReactValidator from "simple-react-validator";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { createFormData, getBillData, updateFormData } from "../../../store/actions";
import Select from 'react-select';

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
    optionArr: [],
    partyOption: [],
    brokerOption: [],
    addressOption: []
};

const reducer = (state, payload) => ({ ...state, ...payload });

const AddBill = () => {
    const [bill, setBill] = useReducer(reducer, initialState);
    const { sendReq, optionArr, partyOption, brokerOption, addressOption } = bill;
    const validator = useRef(new SimpleReactValidator());
    const [, forceUpdate] = useState();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const paramId = window.location.pathname.split("/")[2];
    const { state } = useLocation();
    const [company, setCompany] = useState(false)
    const [party, setParty] = useState(false)
    const [broker, setBroker] = useState(false)
    const [address, setAddress] = useState(false)

    useEffect(() => {
        getBillData((res) => {
            let arr = [];
            let partyArr = [];
            let brokerArr = [];
            let addressArr = [];
            res.data.map((item, i) => {
                arr.push({ value: item.cname, label: item.cname })
                partyArr.push({ value: item.pname, label: item.pname })
                brokerArr.push({ value: item.bname, label: item.bname })
                addressArr.push({ value: item.address, label: item.address })
            });
            setBill({ optionArr: arr, partyOption: partyArr, brokerOption: brokerArr, addressOption: addressArr })
        })(dispatch)
    }, [])
    console.log('optionArr', optionArr,partyOption)

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
        console.log('name,value', name, value)
        setBill({
            ...bill,
            sendReq: {
                ...sendReq,
                [name]: value,
            },
        });
    };

    const handleChangeCompany = (e) => {
        console.log('e', e)
        setBill({
            ...bill,
            sendReq: {
                ...sendReq,
                cname: e.value,
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

    const onAddCompany = () => {
        setCompany(true)
    };

    const onAddParty = () => {
        setParty(true)
    };

    const onAddBroker = () => {
        setBroker(true)
    };

    const onAddAddress = () => {
        setAddress(true)
    };

    const onSaveCompany = () => {
        setCompany(false)
        setBill({ optionArr: [...optionArr,{ value: sendReq.cname, label: sendReq.cname }] })
    };

    const onSaveParty = () => {
        setParty(false)
        setBill({ partyOption: [...partyOption,{ value: sendReq.pname, label: sendReq.pname }] })
    };

    const onSaveBroker = () => {
        setBroker(false)
        setBill({ brokerOption: [...brokerOption,{ value: sendReq.bname, label: sendReq.bname }] })
    };

    const onSaveAddress = () => {
        setAddress(false)
        setBill({ addressOption: [...addressOption,{ value: sendReq.address, label: sendReq.address }] })
    };

    return (
        <div className="salesOrder">
            <h5 style={{ marginBottom: "20px" }}>Add Bill Details</h5>
            <CForm>
                <div className="sales_form ">
                    <div className="row">
                        <div className="mb-12 col-sm-12 col-md-6" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <div className="mb-3 col-sm-12 col-md-10">
                                <CFormLabel htmlFor="exampleFormControlTextarea1">
                                    Company Name
                                </CFormLabel>
                                <Select
                                    name="cname"
                                    value={sendReq.cname && optionArr.find(e => e.value === sendReq.cname)}
                                    components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                                    options={optionArr}
                                    onChange={(e) => handleChangeCompany(e)}
                                    placeholder="Search..."
                                />
                                <span style={{ color: "red" }}>
                                    {validator.current.message(
                                        "company name",
                                        sendReq.cname,
                                        "required"
                                    )}
                                </span>
                            </div>
                            <CButton color="primary" style={{ height: "40px" }} className="mt-3 ml-1" onClick={onAddCompany}>+</CButton>
                        </div>
                        <div className="mb-12 col-sm-12 col-md-6" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <div className="mb-3 col-sm-12 col-md-10">
                                <CFormLabel htmlFor="exampleFormControlTextarea1">
                                    Party Name
                                </CFormLabel>
                                <Select
                                    name="pname"
                                    value={sendReq.pname && partyOption.find(e => e.value === sendReq.pname)}
                                    components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                                    options={partyOption}
                                    onChange={(e) => handleChangeCompany(e)}
                                    placeholder="Search..."
                                />
                                <span style={{ color: "red" }}>
                                    {validator.current.message(
                                        "party name",
                                        sendReq.pname,
                                        "required"
                                    )}
                                </span>
                            </div>
                            <CButton color="primary" style={{ height: "40px" }} className="mt-3 ml-1" onClick={onAddParty}>+</CButton>
                        </div>
                    </div>
                    <div className="row">
                        <div className="mb-12 col-sm-12 col-md-6" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <div className="mb-3 col-sm-12 col-md-10">
                                <CFormLabel htmlFor="exampleFormControlTextarea1">
                                    Broker Name
                                </CFormLabel>
                                <Select
                                    name="bname"
                                    value={sendReq.bname && brokerOption.find(e => e.value === sendReq.bname)}
                                    components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                                    options={brokerOption}
                                    onChange={(e) => handleChangeCompany(e)}
                                    placeholder="Search..."
                                />
                                <span style={{ color: "red" }}>
                                    {validator.current.message(
                                        "broker name",
                                        sendReq.bname,
                                        "required"
                                    )}
                                </span>
                            </div>
                            <CButton color="primary" style={{ height: "40px" }} className="mt-3 ml-1" onClick={onAddBroker}>+</CButton>
                        </div>
                        <div className="mb-12 col-sm-12 col-md-6" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <div className="mb-3 col-sm-12 col-md-10">
                                <CFormLabel htmlFor="exampleFormControlTextarea1">
                                    {" "}
                                    Address{" "}
                                </CFormLabel>
                                <Select
                                    name="address"
                                    value={sendReq.address && addressOption.find(e => e.value === sendReq.address)}
                                    components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                                    options={addressOption}
                                    onChange={(e) => handleChangeCompany(e)}
                                    placeholder="Search..."
                                />
                                <span style={{ color: "red" }}>
                                    {validator.current.message(
                                        "address",
                                        sendReq.address,
                                        "required"
                                    )}
                                </span>
                            </div>
                            <CButton color="primary" style={{ height: "40px" }} className="mt-3 ml-1" onClick={onAddAddress}>+</CButton>
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
                                        dateFormat="dd/MM/yyyy"
                                        // minDate={new Date()}
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

            <CModal visible={company} onClose={() => setCompany(false)}>
                <CModalBody>
                    <CForm>
                        <div className="mb-3">
                            <CFormLabel htmlFor="exampleFormControlTextarea1">Company Name</CFormLabel>
                            <CFormInput type="text" name="cname" value={sendReq.cname} placeholder="Company Name" onChange={handleChange} />
                            <span style={{ color: 'red' }}>{validator.current.message('company', sendReq.cname, 'required')}</span>
                        </div>
                    </CForm>
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={() => setCompany(false)}>
                        Cancel
                    </CButton>
                    <CButton color="primary" onClick={onSaveCompany}>Save</CButton>
                </CModalFooter>
            </CModal>

            <CModal visible={party} onClose={() => setParty(false)}>
                <CModalBody>
                    <CForm>
                        <div className="mb-3">
                            <CFormLabel htmlFor="exampleFormControlTextarea1">Party Name</CFormLabel>
                            <CFormInput type="text" name="pname" value={sendReq.pname} placeholder="Party Name" onChange={handleChange} />
                            <span style={{ color: 'red' }}>{validator.current.message('company', sendReq.pname, 'required')}</span>
                        </div>
                    </CForm>
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={() => setParty(false)}>
                        Cancel
                    </CButton>
                    <CButton color="primary" onClick={onSaveParty}>Save</CButton>
                </CModalFooter>
            </CModal>

            <CModal visible={broker} onClose={() => setBroker(false)}>
                <CModalBody>
                    <CForm>
                        <div className="mb-3">
                            <CFormLabel htmlFor="exampleFormControlTextarea1">broker Name</CFormLabel>
                            <CFormInput type="text" name="bname" value={sendReq.bname} placeholder="Broker Name" onChange={handleChange} />
                            <span style={{ color: 'red' }}>{validator.current.message('company', sendReq.bname, 'required')}</span>
                        </div>
                    </CForm>
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={() => setBroker(false)}>
                        Cancel
                    </CButton>
                    <CButton color="primary" onClick={onSaveBroker}>Save</CButton>
                </CModalFooter>
            </CModal>

            <CModal visible={address} onClose={() => setAddress(false)}>
                <CModalBody>
                    <CForm>
                        <div className="mb-3">
                            <CFormLabel htmlFor="exampleFormControlTextarea1">Company Name</CFormLabel>
                            <CFormTextarea
                                    name="address"
                                    value={sendReq.address}
                                    placeholder="Address"
                                    rows="3"
                                    onChange={handleChange}
                                ></CFormTextarea>
                            <span style={{ color: 'red' }}>{validator.current.message('company', sendReq.address, 'required')}</span>
                        </div>
                    </CForm>
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={() => setAddress(false)}>
                        Cancel
                    </CButton>
                    <CButton color="primary" onClick={onSaveAddress}>Save</CButton>
                </CModalFooter>
            </CModal>


        </div>
    );
};

export default AddBill;
