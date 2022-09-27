import {
    CButton, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow, CModal, CModalBody,
    CModalFooter, CModalHeader, CModalTitle, CForm, CFormInput, CFormLabel, CBadge, CFormTextarea
} from '@coreui/react'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import moment from "moment";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { useDispatch } from 'react-redux';
import { deleteBillData, getBillData } from '../../store/actions';
import { useDownloadExcel  } from 'react-export-table-to-excel';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Index = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [state, setState] = useState([])
    let record = JSON.parse(localStorage.getItem("record"))
    const tableRef = useRef(null);

    const { onDownload } = useDownloadExcel({
        currentTableRef: tableRef.current,
        filename: 'Users table',
        sheet: 'Users'
    })

    useEffect(() => {
        getBillData((res) => {
            setState(res.data)
        })(dispatch)
    }, [])

    const handleClick = () => {
        navigate('/addBill')
    }

    const onEdit = (id, item) => {
        navigate(`/addBill/${id}`, {
            state: item
        })
    }

    const onDelete = (id) => {
        deleteBillData(id, (res) => {
            toast.error("Deleted Successfuly!!!", { position: toast.POSITION.TOP_RIGHT, });
            getBillData((res) => {
                setState(res.data)
            })(dispatch)
        })(dispatch)
    }

    const generatePdf = () => {
        const unit = "pt";
        const size = "A4"; // Use A1, A2, A3 or A4
        const orientation = "portrait"; // portrait or landscape

        const marginLeft = 40;
        const doc = new jsPDF(orientation, unit, size);

        doc.setFontSize(15);

        const title = `Company Name : ${state[0].cname}      Party Name :  ${state[0].pname}       Address : ${state[0].address}`;
        const headers = [["Bill Date", "Bill No", "Bill Amount", "Received Date", "Total Days", "Net Days", "Interest Days", "Interest Amount"]];

        const data = state.map(item => [moment(item.orderDate).format("DD/MM/YYYY"), item.billNo, item.billAmount, moment(item.receivedDate).format("DD/MM/YYYY"), moment(moment(item.receivedDate).format("DD.MM.YYYY"), "DD.MM.YYYY").diff(moment(moment(item.orderDate).format("DD.MM.YYYY"), "DD.MM.YYYY"), 'days'),
        item.netDays, moment(moment(item.receivedDate).format("DD.MM.YYYY"), "DD.MM.YYYY").diff(moment(moment(item.orderDate).format("DD.MM.YYYY"), "DD.MM.YYYY"), 'days') - item.netDays, ((item.billAmount * 0.015 / 30) * (moment(moment(item.receivedDate).format("DD.MM.YYYY"), "DD.MM.YYYY").diff(moment(moment(item.orderDate).format("DD.MM.YYYY"), "DD.MM.YYYY"), 'days') - item.netDays)).toFixed(2)]);

        let content = {
            startY: 50,
            head: headers,
            body: data
        };

        doc.text(title, marginLeft, 40);
        doc.autoTable(content);
        doc.save("report.pdf")
    }

    return (
        <>
            <CButton color="success" className="px-4" style={{ float: "right", marginBottom: "25px" }} onClick={generatePdf}>
                Preview PDF
            </CButton>
            <CButton color="primary" className="px-4" style={{ float: "right", marginBottom: "25px", marginRight: "10px" }} onClick={handleClick}>
                Add New
            </CButton>
            <CTable striped style={{ background: "white" }} ref={tableRef}>
                <CTableHead>
                    <CTableRow>
                        <CTableHeaderCell scope="col">Bill Date</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Bill No</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Bill Amount</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Received Date</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Total Days</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Net Days</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Interest Days</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Interest Amount</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                    </CTableRow>
                </CTableHead>
                <CTableBody>
                    {
                        state.length != 0 ? state.map((item) => {
                            return (
                                <CTableRow>
                                    <CTableDataCell>{moment(item.orderDate).format("DD/MM/YYYY")}</CTableDataCell>
                                    <CTableDataCell>{item.billNo}</CTableDataCell>
                                    <CTableDataCell>{item.billAmount}</CTableDataCell>
                                    <CTableDataCell>{moment(item.receivedDate).format("DD/MM/YYYY")}</CTableDataCell>
                                    <CTableDataCell>{moment(moment(item.receivedDate).format("DD.MM.YYYY"), "DD.MM.YYYY").diff(moment(moment(item.orderDate).format("DD.MM.YYYY"), "DD.MM.YYYY"), 'days')}</CTableDataCell>
                                    <CTableDataCell>{item.netDays}</CTableDataCell>
                                    <CTableDataCell>{moment(moment(item.receivedDate).format("DD.MM.YYYY"), "DD.MM.YYYY").diff(moment(moment(item.orderDate).format("DD.MM.YYYY"), "DD.MM.YYYY"), 'days') - item.netDays}</CTableDataCell>
                                    <CTableDataCell>{((item.billAmount * 0.015 / 30) * (moment(moment(item.receivedDate).format("DD.MM.YYYY"), "DD.MM.YYYY").diff(moment(moment(item.orderDate).format("DD.MM.YYYY"), "DD.MM.YYYY"), 'days') - item.netDays)).toFixed(2)}</CTableDataCell>
                                    <CTableDataCell>
                                        <CButton color="success" style={{ marginRight: "6px" }} onClick={() => onEdit(item._id, item)}>
                                            Edit
                                        </CButton>
                                        <CButton color="danger" style={{ marginRight: "6px" }} onClick={() => onDelete(item._id)}>
                                            Delete
                                        </CButton>
                                    </CTableDataCell>
                                </CTableRow>
                            )
                        }) :
                            <CTableRow >
                                <CTableDataCell colSpan={9} style={{ textAlign: 'center' }}>No items found</CTableDataCell>
                            </CTableRow>
                    }
                </CTableBody>
            </CTable>
            <ToastContainer position={toast.POSITION.TOP_RIGHT} autoClose={5000} />

        </>
    )
}

export default Index