import {
    CButton, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow, CModal, CModalBody,
    CModalFooter, CModalHeader, CModalTitle, CForm, CFormInput, CFormLabel, CBadge, CFormTextarea
} from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import moment from "moment";
import jsPDF from "jspdf";
import "jspdf-autotable";

const Index = () => {
    const navigate = useNavigate();
    const [state, setState] = useState([])
    let record = JSON.parse(localStorage.getItem("record"))

    useEffect(() => {
        if (record) {
            setState(record)
        }
    }, [record])

    const handleClick = () => {
        navigate('/addBill')
    }

    const onEdit = (id) => {
        navigate(`/addBill/${id}`)
    }

    const onDelete = (id) => {
        let objIndex = record.findIndex((i) => i.id === id)
        record.splice(objIndex, 1)
        localStorage.setItem("record", JSON.stringify(record))
    }

    const generatePdf = () => {
        const unit = "pt";
        const size = "A4"; // Use A1, A2, A3 or A4
        const orientation = "portrait"; // portrait or landscape

        const marginLeft = 40;
        const doc = new jsPDF(orientation, unit, size);

        doc.setFontSize(15);

        const title = "My Report";
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
            <CTable striped style={{ background: "white" }}>
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
                                        <CButton color="success" style={{ marginRight: "6px" }} onClick={() => onEdit(item.id)}>
                                            Edit
                                        </CButton>
                                        <CButton color="danger" style={{ marginRight: "6px" }} onClick={() => onDelete(item.id)}>
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
        </>
    )
}

export default Index