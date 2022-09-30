"use strict";(self.webpackChunkciara_donnen=self.webpackChunkciara_donnen||[]).push([[875],{4627:function(e,n,t){t.d(n,{ki:function(){return f},ep:function(){return p},UQ:function(){return m},Zv:function(){return h}});var r=t(4569),a=t.n(r)().create(),o={validateStatus:function(e){if(401!==e)return!0}};function l(e){return e}function i(e){return e}a.defaults.headers.post["Content-Type"]="application/json",a.defaults.headers.post.Accept="application/json";var c=function(e){return a.get("https://market-area.herokuapp.com/",o).then(i,l)},s=function(e){return a.post("https://market-area.herokuapp.com/add",e,o).then(i,l)},d=function(e,n){return a.put("https://market-area.herokuapp.com/".concat(n),e,o).then(i,l)},u=function(e){return a.delete("https://market-area.herokuapp.com/".concat(e),o).then(i,l)};function m(e){return function(n){n({type:"LOADING",payload:!0}),c().then((function(t){n({type:"GET_DATA",payload:t.data}),e(t.data)})).catch((function(e){}))}}function f(e,n){return function(t){t({type:"LOADING",payload:!0}),s(e).then((function(e){t({type:"ADD_DATA",payload:e.data}),n(e.data)})).catch((function(e){}))}}function h(e,n,t){return function(r){r({type:"LOADING",payload:!0}),d(e,n).then((function(e){r({type:"UPDATE_DATA",payload:e.data}),t(e.data)})).catch((function(e){}))}}function p(e,n){return function(t){t({type:"LOADING",payload:!0}),u(e).then((function(e){t({type:"DELETE_DATA",payload:e.data}),n(e.data)})).catch((function(e){}))}}},6875:function(e,n,t){t.r(n);var r=t(2982),a=t(4942),o=t(885),l=t(1413),i=t(8983),c=t(2791),s=t(7689),d=t(2426),u=t.n(d),m=(t(5125),t(1052),t(6030)),f=t(4627),h=(t(6912),t(9085)),p=(t(5462),t(4045)),D=t(5062),Y=t(4846),x=t(7898),y=t(184),j={optionArr:[],company:"",party:"",broker:""},v=function(e,n){return(0,l.Z)((0,l.Z)({},e),n)};n.default=function(){var e=(0,c.useReducer)(v,j),n=(0,o.Z)(e,2),t=n[0],d=n[1],A=t.company,g=t.optionArr,M=t.party,N=t.broker,b=(0,s.s0)(),k=(0,m.I0)(),C=(0,c.useState)([]),T=(0,o.Z)(C,2),w=T[0],R=T[1],Z=(0,c.useState)(""),B=(0,o.Z)(Z,2),I=B[0],_=B[1],E=(0,c.useState)(!1),F=(0,o.Z)(E,2),S=F[0],L=F[1];(0,c.useEffect)((function(){(0,f.UQ)((function(e){R(e.data),d({optionArr:e.data})}))(k)}),[]);var P=function(e){var n=e.target,r=n.name,o=n.value;if("company"===r){var i;i=g.filter((function(e){return e.cname==o})),d((0,l.Z)((0,l.Z)({},t),{},(0,a.Z)({},r,o))),R(i)}else if("party"===r){var c;c=g.filter((function(e){return e.pname==o})),d((0,l.Z)((0,l.Z)({},t),{},(0,a.Z)({},r,o))),R(c)}else{var s;s=g.filter((function(e){return e.bname==o})),d((0,l.Z)((0,l.Z)({},t),{},(0,a.Z)({},r,o))),R(s)}},H=function(e){var n=new ArrayBuffer(e.length);console.log(n);var t=new Uint8Array(n);console.log(t);for(var r=0;r!==e.length;++r)console.log(e.charCodeAt(r)),t[r]=e.charCodeAt(r);return n},O=function(){var e=[{A:w[0].cname},{}],n=[{A:"Bill Date",B:"Bill No",C:"Bill Amount",D:"Received Date",E:"Total Days",F:"Net Days",G:"Interest Days",h:"interest Amount"}];w.forEach((function(e){var t=e;n.push({A:u()(t.orderDate).format("DD/MM/YYYY"),B:t.billNo,C:t.billAmount,D:u()(t.receivedDate).format("DD/MM/YYYY"),E:u()(u()(t.receivedDate).format("DD.MM.YYYY"),"DD.MM.YYYY").diff(u()(u()(t.orderDate).format("DD.MM.YYYY"),"DD.MM.YYYY"),"days"),F:t.netDays,G:u()(u()(t.receivedDate).format("DD.MM.YYYY"),"DD.MM.YYYY").diff(u()(u()(t.orderDate).format("DD.MM.YYYY"),"DD.MM.YYYY"),"days")-t.netDays,h:(.015*t.billAmount/30*(u()(u()(t.receivedDate).format("DD.MM.YYYY"),"DD.MM.YYYY").diff(u()(u()(t.orderDate).format("DD.MM.YYYY"),"DD.MM.YYYY"),"days")-t.netDays)).toFixed(2)})})),n=[{A:w[0].pname}].concat([{A:w[0].address}]).concat(n).concat([{A:"Total =",C:w.reduce((function(e,n){return e+Number(n.billAmount)}),0)}]);var t=[].concat(e,(0,r.Z)(n)),a=p.P6.book_new(),o=p.P6.json_to_sheet(t,{skipHeader:!0});p.P6.book_append_sheet(a,o,"report");var l=function(e){var n=p.cW(e,{bookType:"xlsx",bookSST:!1,type:"binary"});return new Blob([H(n)],{type:"application/octet-stream"})}(a),i=[];t.forEach((function(e,n){return"Bill Date"===e.A?i.push(n):null}));w.length;var c={titleRange:"A1:H2",partyName:"A3:D3",brokerName:"E3:H3",address:"A4:H4",total:"A".concat(t.length,":H").concat(t.length),totalInt:"H".concat(t.length),tbodyRange:"A5:H".concat(t.length),theadRange:(null===i||void 0===i?void 0:i.length)>=1?"A".concat(i[0]+1,":H").concat(i[0]+1):null};return G(l,c)},G=function(e,n){var t=w.reduce((function(e,n){return e+Number((.015*n.billAmount/30*(u()(u()(n.receivedDate).format("DD.MM.YYYY"),"DD.MM.YYYY").diff(u()(u()(n.orderDate).format("DD.MM.YYYY"),"DD.MM.YYYY"),"days")-n.netDays)).toFixed(2))}),0);return D.fromDataAsync(e).then((function(e){return e.sheets().forEach((function(e){e.usedRange().style({fontFamily:"Arial",border:!0}),e.column("A").width(15),e.column("B").width(15),e.column("C").width(15),e.column("D").width(15),e.column("E").width(15),e.column("G").width(15),e.column("H").width(20),e.cell(n.totalInt).value(t.toFixed(2)),e.range(n.titleRange).merged(!0).style({bold:!0,horizontalAlignment:"center",verticalAlignment:"center",fill:"808080"}),n.tbodyRange&&e.range(n.tbodyRange).style({horizontalAlignment:"center"}),e.range(n.partyName).merged(!0).style({bold:!0,horizontalAlignment:"left"}),e.range(n.brokerName).merged(!0).style({bold:!0,horizontalAlignment:"right"}).value(w[0].bname),e.range(n.address).merged(!0).style({bold:!0,horizontalAlignment:"left"}),e.range(n.theadRange).style({fill:"808080",bold:!0,horizontalAlignment:"center"}),e.range(n.total).style({bold:!0})})),e.outputAsync().then((function(e){return URL.createObjectURL(e)}))}))};return(0,y.jsxs)(y.Fragment,{children:[(0,y.jsxs)("div",{className:"row",children:[(0,y.jsx)("div",{className:"mb-12 col-sm-12 col-md-2",children:(0,y.jsxs)("div",{className:"mb-3",style:{display:"flex",flexDirection:"column"},children:[(0,y.jsx)(i.L8,{htmlFor:"exampleFormControlTextarea1",children:"Company Name"}),(0,y.jsxs)(i.LX,{"aria-label":"Default select example",name:"company",value:A,onChange:P,children:[(0,y.jsx)("option",{value:"",disabled:!0,children:"Company Name"}),Array.from(new Set(g.map((function(e){return e.cname})))).map((function(e){return(0,y.jsx)("option",{value:e,children:e})}))]})]})}),(0,y.jsx)("div",{className:"mb-12 col-sm-12 col-md-2",children:(0,y.jsxs)("div",{className:"mb-3",style:{display:"flex",flexDirection:"column"},children:[(0,y.jsx)(i.L8,{htmlFor:"exampleFormControlTextarea1",children:"Party Name"}),(0,y.jsxs)(i.LX,{"aria-label":"Default select example",name:"party",value:M,onChange:P,children:[(0,y.jsx)("option",{value:"",disabled:!0,children:"Party Name"}),Array.from(new Set(g.map((function(e){return e.pname})))).map((function(e){return(0,y.jsx)("option",{value:e,children:e})}))]})]})}),(0,y.jsx)("div",{className:"mb-12 col-sm-12 col-md-2",children:(0,y.jsxs)("div",{className:"mb-3",style:{display:"flex",flexDirection:"column"},children:[(0,y.jsx)(i.L8,{htmlFor:"exampleFormControlTextarea1",children:"Broker Name"}),(0,y.jsxs)(i.LX,{"aria-label":"Default select example",name:"broker",value:N,onChange:P,children:[(0,y.jsx)("option",{value:"",disabled:!0,children:"Broker Name"}),Array.from(new Set(g.map((function(e){return e.bname})))).map((function(e){return(0,y.jsx)("option",{value:e,children:e})}))]})]})}),(0,y.jsx)("div",{className:"mb-12 col-sm-12 col-md-2",children:(0,y.jsx)("div",{className:"mb-3 pt-1",style:{display:"flex",flexDirection:"column"},children:(0,y.jsx)(i.u5,{color:"success",style:{float:"right",marginTop:"27px"},onClick:function(e){d((0,l.Z)((0,l.Z)({},t),{},{company:"",party:"",broker:""})),(0,f.UQ)((function(e){R(e.data),d({optionArr:e.data})}))(k)},children:"Clear filter"})})})]}),(0,y.jsxs)("div",{style:{display:"flex",justifyContent:"end"},children:[(0,y.jsx)(i.u5,{color:"success",className:"px-4",style:{marginBottom:"25px",marginRight:"10px"},onClick:function(){O().then((function(e){console.log(e);var n=document.createElement("a");n.setAttribute("href",e),n.setAttribute("download","Report.xlsx"),n.click(),n.remove()}))},children:"Preview PDF"}),(0,y.jsx)(i.u5,{color:"primary",className:"px-4",style:{marginBottom:"25px",marginRight:"10px"},onClick:function(){b("/addBill")},children:"Add New"})]}),(0,y.jsx)("div",{style:{overflowX:"auto"},children:(0,y.jsxs)(i.Sx,{striped:!0,style:{background:"white"},children:[(0,y.jsx)(i.V,{children:(0,y.jsxs)(i.T6,{children:[(0,y.jsx)(i.is,{scope:"col",children:"Bill Date"}),(0,y.jsx)(i.is,{scope:"col",children:"Bill No"}),(0,y.jsx)(i.is,{scope:"col",children:"Bill Amount"}),(0,y.jsx)(i.is,{scope:"col",children:"Received Date"}),(0,y.jsx)(i.is,{scope:"col",children:"Total Days"}),(0,y.jsx)(i.is,{scope:"col",children:"Net Days"}),(0,y.jsx)(i.is,{scope:"col",children:"Interest Days"}),(0,y.jsx)(i.is,{scope:"col",children:"Interest Amount"}),(0,y.jsx)(i.is,{scope:"col",children:"Action"})]})}),(0,y.jsx)(i.NR,{children:0!=w.length?w.map((function(e){return(0,y.jsxs)(i.T6,{children:[(0,y.jsx)(i.NN,{children:u()(e.orderDate).format("DD/MM/YYYY")}),(0,y.jsx)(i.NN,{children:e.billNo}),(0,y.jsx)(i.NN,{children:e.billAmount}),(0,y.jsx)(i.NN,{children:u()(e.receivedDate).format("DD/MM/YYYY")}),(0,y.jsx)(i.NN,{children:u()(u()(e.receivedDate).format("DD.MM.YYYY"),"DD.MM.YYYY").diff(u()(u()(e.orderDate).format("DD.MM.YYYY"),"DD.MM.YYYY"),"days")}),(0,y.jsx)(i.NN,{children:e.netDays}),(0,y.jsx)(i.NN,{children:u()(u()(e.receivedDate).format("DD.MM.YYYY"),"DD.MM.YYYY").diff(u()(u()(e.orderDate).format("DD.MM.YYYY"),"DD.MM.YYYY"),"days")-e.netDays}),(0,y.jsx)(i.NN,{children:(.015*e.billAmount/30*(u()(u()(e.receivedDate).format("DD.MM.YYYY"),"DD.MM.YYYY").diff(u()(u()(e.orderDate).format("DD.MM.YYYY"),"DD.MM.YYYY"),"days")-e.netDays)).toFixed(2)}),(0,y.jsxs)(i.NN,{children:[(0,y.jsx)(i.u5,{color:"success",style:{marginRight:"6px",marginBottom:"3px"},onClick:function(){return function(e,n){b("/addBill/".concat(e),{state:n})}(e._id,e)},children:"Edit"}),(0,y.jsx)(i.u5,{color:"danger",style:{marginRight:"6px"},onClick:function(){return n=e._id,_(n),void L(!0);var n},children:"Delete"})]})]})})):(0,y.jsx)(i.T6,{children:(0,y.jsx)(i.NN,{colSpan:9,style:{textAlign:"center"},children:"No items found"})})})]})}),(0,y.jsxs)(i.Tk,{visible:S,onClose:function(){return L(!1)},children:[(0,y.jsx)(i.p0,{onClose:function(){return L(!1)},children:(0,y.jsx)(i.fl,{children:"Delete Confirmation"})}),(0,y.jsx)(i.sD,{children:(0,y.jsxs)("div",{className:"delete_popup",children:[(0,y.jsx)("div",{className:"warning_icon",children:(0,y.jsx)(Y.Z,{icon:x.D,customClassName:"nav-icon"})}),(0,y.jsx)("p",{children:" Are you sure? "}),(0,y.jsx)("p",{children:"you want to delete this Record?"}),(0,y.jsxs)("div",{className:"button",children:[(0,y.jsx)(i.u5,{color:"secondary",onClick:function(){return L(!1)},children:" No"}),(0,y.jsx)(i.u5,{color:"danger",onClick:function(){(0,f.ep)(I,(function(e){h.Am.error("Deleted Successfuly!!!",{position:h.Am.POSITION.TOP_RIGHT}),L(!1),(0,f.UQ)((function(e){R(e.data)}))(k)}))(k)},children:"Yes"})]})]})})]}),(0,y.jsx)(h.Ix,{position:h.Am.POSITION.TOP_RIGHT,autoClose:5e3})]})}}}]);
//# sourceMappingURL=875.63a1f396.chunk.js.map