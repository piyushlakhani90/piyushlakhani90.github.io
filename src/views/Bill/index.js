import { CButton, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow, CFormLabel, CFormSelect } from '@coreui/react'
import React, { useEffect, useReducer, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import moment from "moment";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { useDispatch } from 'react-redux';
import { deleteBillData, getBillData } from '../../store/actions';
import { useDownloadExcel } from 'react-export-table-to-excel';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as XLSX from "xlsx";
import * as XlsxPopulate from "xlsx-populate/browser/xlsx-populate";

const initialState = {
    optionArr: [],
    company: "",
    party: "",
    broker: ""
}

const reducer = (state, payload) => ({ ...state, ...payload });

const Index = () => {
    const [bill, setBill] = useReducer(reducer, initialState);
    const { company, optionArr, party, broker } = bill;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [state, setState] = useState([])
    let record = JSON.parse(localStorage.getItem("record"))

    useEffect(() => {
        getBillData((res) => {
            setState(res.data)
            setBill({ optionArr: res.data })
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "company") {
            let arr = [];
            arr = optionArr.filter((e) => e.cname == value)
            setBill({
                ...bill,
                [name]: value,
            })
            setState(arr)
        } else if (name === "party") {
            let arr = [];
            arr = optionArr.filter((e) => e.pname == value)
            setBill({
                ...bill,
                [name]: value,
            })
            setState(arr)
        } else {
            let arr = [];
            arr = optionArr.filter((e) => e.bname == value)
            setBill({
                ...bill,
                [name]: value,
            })
            setState(arr)
        }
    }

    const onClear = (e) => {
        setBill({
            ...bill,
            company: "",
            party: "",
            broker: ""
        })
        getBillData((res) => {
            setState(res.data)
            setBill({ optionArr: res.data })
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

   
        const createDownLoadData = () => {
            handleExport().then((url) => {
              console.log(url);
              const downloadAnchorNode = document.createElement("a");
              downloadAnchorNode.setAttribute("href", url);
              downloadAnchorNode.setAttribute("download", "student_report.xlsx");
              downloadAnchorNode.click();
              downloadAnchorNode.remove();
            });
          };
        
          const workbook2blob = (workbook) => {
            const wopts = {
              bookType: "xlsx",
              bookSST: false,
              type: "binary",
            };
        
            const wbout = XLSX.write(workbook, wopts);
        
            // The application/octet-stream MIME type is used for unknown binary files.
            // It preserves the file contents, but requires the receiver to determine file type,
            // for example, from the filename extension.
            const blob = new Blob([s2ab(wbout)], {
              type: "application/octet-stream",
            });
        
            return blob;
          };
        
          const s2ab = (s) => {
            // The ArrayBuffer() constructor is used to create ArrayBuffer objects.
            // create an ArrayBuffer with a size in bytes
            const buf = new ArrayBuffer(s.length);
        
            console.log(buf);
        
            //create a 8 bit integer array
            const view = new Uint8Array(buf);
        
            console.log(view);
            //charCodeAt The charCodeAt() method returns an integer between 0 and 65535 representing the UTF-16 code
            for (let i = 0; i !== s.length; ++i) {
              console.log(s.charCodeAt(i));
              view[i] = s.charCodeAt(i);
            }
        
            return buf;
          };
        
          const handleExport = () => {
            const title = [{ A: state[0].cname }, {}];
        
            let table1 = [
              {
                A: "Bill Date",
                B: "Bill No",
                C: "Bill Amount",
                D: "Received Date",
                E: "Total Days",
                F: "Net Days",
                G: "Interest Days",
                h: "interest Amount",
              },
            ];
           
            state.forEach((row) => {
              const billDetails = row;
        
              table1.push({
                A: moment(billDetails.orderDate).format("DD/MM/YYYY"),
                B: billDetails.billNo,
                C: billDetails.billAmount,
                D: moment(billDetails.receivedDate).format("DD/MM/YYYY"),
                E: moment(moment(billDetails.receivedDate).format("DD.MM.YYYY"), "DD.MM.YYYY").diff(moment(moment(billDetails.orderDate).format("DD.MM.YYYY"), "DD.MM.YYYY"), 'days'),
                F: billDetails.netDays,
                G: moment(moment(billDetails.receivedDate).format("DD.MM.YYYY"), "DD.MM.YYYY").diff(moment(moment(billDetails.orderDate).format("DD.MM.YYYY"), "DD.MM.YYYY"), 'days') - billDetails.netDays,
                h: ((billDetails.billAmount * 0.015 / 30) * (moment(moment(billDetails.receivedDate).format("DD.MM.YYYY"), "DD.MM.YYYY").diff(moment(moment(billDetails.orderDate).format("DD.MM.YYYY"), "DD.MM.YYYY"), 'days') - billDetails.netDays)).toFixed(2),
              });
        
            });

            table1 = [{ A: state[0].pname }]
            .concat([{ A: state[0].address }])
                .concat(table1).concat([{ A: "Total =", C: state.reduce(function (cnt, o) { return cnt + Number(o.billAmount); }, 0)}])
        
            const finalData = [...title, ...table1];
        
            //create a new workbook
            const wb = XLSX.utils.book_new();
        
            const sheet = XLSX.utils.json_to_sheet(finalData, {
              skipHeader: true,
            });
        
            XLSX.utils.book_append_sheet(wb, sheet, "report");
        
            // binary large object
            // Since blobs can store binary data, they can be used to store images or other multimedia files.
        
            const workbookBlob = workbook2blob(wb);
        
            var headerIndexes = [];
            finalData.forEach((data, index) =>{
              return data["A"] === "Bill Date" ? headerIndexes.push(index) : null
            }
            );
        
            const totalRecords = state.length;
            const dataInfo = {
              titleRange: "A1:H2",
              partyName: 'A3:D3',
              brokerName:'E3:H3',
              address:'A4:H4',
              total:`A${finalData.length}:H${finalData.length}`,
              totalInt:`H${finalData.length}`,
              tbodyRange: `A5:H${finalData.length}`,
              theadRange: 
                headerIndexes?.length >= 1
                  ? `A${headerIndexes[0] + 1}:H${headerIndexes[0] + 1}`
                  : null,
            //   theadRange1:
            //     headerIndexes?.length >= 2
            //       ? `A${headerIndexes[1] + 1}:H${headerIndexes[1] + 1}`
            //       : null,
            //   tFirstColumnRange:
            //     headerIndexes?.length >= 1
            //       ? `A${headerIndexes[0] + 1}:A${totalRecords + headerIndexes[0] + 1}`
            //       : null,
            //   tLastColumnRange:
            //     headerIndexes?.length >= 1
            //       ? `G${headerIndexes[0] + 1}:H${totalRecords + headerIndexes[0] + 1}`
            //       : null,
        
            
            };
        
            return addStyle(workbookBlob, dataInfo);
          };
        
          const addStyle = (workbookBlob, dataInfo) => {
            var totalInterest = state.reduce( function(cnt,o){ return cnt + Number(((o.billAmount * 0.015 / 30) * (moment(moment(o.receivedDate).format("DD.MM.YYYY"), "DD.MM.YYYY").diff(moment(moment(o.orderDate).format("DD.MM.YYYY"), "DD.MM.YYYY"), 'days') - o.netDays)).toFixed(2)); }, 0)

            return XlsxPopulate.fromDataAsync(workbookBlob).then((workbook) => {
              workbook.sheets().forEach((sheet) => {
                sheet.usedRange().style({
                  fontFamily: "Arial",
                  border:true
                });
        
                sheet.column("A").width(15);
                sheet.column("B").width(15);
                sheet.column("C").width(15);
                sheet.column("D").width(15);
                sheet.column("E").width(15);  
                sheet.column("G").width(15);
                sheet.column("H").width(20);
                sheet.cell(dataInfo.totalInt).value(totalInterest.toFixed(2));;
                sheet.range(dataInfo.titleRange).merged(true).style({
                  bold: true,
                  horizontalAlignment: "center",
                  verticalAlignment: "center",
                  fill: "808080",
                });
        
                if (dataInfo.tbodyRange) {
                  sheet.range(dataInfo.tbodyRange).style({
                    horizontalAlignment: "center",
                  });
                }
        
                sheet.range(dataInfo.partyName).merged(true).style({
                    bold: true,
                    horizontalAlignment:"left"
                  });
        
                sheet.range(dataInfo.brokerName).merged(true).style({
                  bold: true,
                  horizontalAlignment: "right"
                }).value(state[0].bname);
        
                sheet.range(dataInfo.address).merged(true).style({
                  bold: true,
                  horizontalAlignment: "left"
                });
                  
                sheet.range(dataInfo.theadRange).style({
                  fill: "808080",
                  bold: true,
                  horizontalAlignment: "center",
                });
        
                sheet.range(dataInfo.total).style({
                  bold: true,
                });
        
                // if (dataInfo.theadRange1) {
                //   sheet.range(dataInfo.theadRange1).style({
                //     fill: "808080",
                //     bold: true,
                //     horizontalAlignment: "center",
                //     fontColor: "ffffff",
                //   });
                // }
        
                // if (dataInfo.tFirstColumnRange) {
                //   sheet.range(dataInfo.tFirstColumnRange).style({
                //     bold: true,
                //   });
                // }
        
                // if (dataInfo.tLastColumnRange) {
                //   sheet.range(dataInfo.tLastColumnRange).style({
                //     bold: true,
                //   });
                // }
        
                // if (dataInfo.tFirstColumnRange1) {
                //   sheet.range(dataInfo.tFirstColumnRange1).style({
                //     bold: true,
                //   });
                // }
        
                // if (dataInfo.tLastColumnRange1) {
                //   sheet.range(dataInfo.tLastColumnRange1).style({
                //     bold: true,
                //   });
                // }
              });
        
              return workbook
                .outputAsync()
                .then((workbookBlob) => URL.createObjectURL(workbookBlob));
            });
          };
        

    return (
        <>
            <div className='row'>
                <div className='mb-12 col-sm-12 col-md-2'>
                    <div className="mb-3" style={{ display: "flex", flexDirection: "column" }}>
                        <CFormLabel htmlFor="exampleFormControlTextarea1">Bill to</CFormLabel>
                        <CFormSelect aria-label="Default select example" name="company" value={company} onChange={handleChange}>
                            <option value="" disabled>Company Name</option>
                            {Array.from(new Set(optionArr.map(obj => obj.cname))).map(cname => {
                                return <option value={cname}>{cname}</option>
                            })}
                        </CFormSelect>
                    </div>
                </div>
                <div className='mb-12 col-sm-12 col-md-2'>
                    <div className="mb-3" style={{ display: "flex", flexDirection: "column" }}>
                        <CFormLabel htmlFor="exampleFormControlTextarea1">Bill to</CFormLabel>
                        <CFormSelect aria-label="Default select example" name="party" value={party} onChange={handleChange}>
                            <option value="" disabled>Party Name</option>
                            {Array.from(new Set(optionArr.map(obj => obj.pname))).map(pname => {
                                return <option value={pname}>{pname}</option>
                            })}
                        </CFormSelect>
                    </div>
                </div>
                <div className='mb-12 col-sm-12 col-md-2'>
                    <div className="mb-3" style={{ display: "flex", flexDirection: "column" }}>
                        <CFormLabel htmlFor="exampleFormControlTextarea1">Bill to</CFormLabel>
                        <CFormSelect aria-label="Default select example" name="broker" value={broker} onChange={handleChange}>
                            <option value="" disabled>Broker Name</option>
                            {Array.from(new Set(optionArr.map(obj => obj.bname))).map(bname => {
                                return <option value={bname}>{bname}</option>
                            })}
                        </CFormSelect>
                    </div>
                </div>
                <div className='mb-12 col-sm-12 col-md-2'>
                    <div className="mb-3 pt-1" style={{ display: "flex", flexDirection: "column" }}>
                        <CButton color="success" style={{ float: "right",marginTop: "27px"}} onClick={onClear}>
                            Clear filter
                        </CButton>
                    </div>
                </div>
            </div>
            <div style={{ display:"flex",justifyContent: "end" }}>
                <CButton color="success" className="px-4" style={{  marginBottom: "25px",marginRight: "10px" }} onClick={createDownLoadData}>
                    Preview PDF
                </CButton>
                <CButton color="primary" className="px-4" style={{ marginBottom: "25px", marginRight: "10px" }} onClick={handleClick}>
                    Add New
                </CButton>
            </div>
            <div style={{ overflowX:"auto" }}>
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
                                            <CButton color="success" style={{ marginRight: "6px",marginBottom:"3px" }} onClick={() => onEdit(item._id, item)}>
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
            </div>
            <ToastContainer position={toast.POSITION.TOP_RIGHT} autoClose={5000} />
        </>
    )
}

export default Index