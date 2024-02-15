import{r as b,o as le,c as L,b as n,d as a,e as t,F as x,f as N,D as W,t as i,N as P,h as m,_ as fe,j as C,M as $,i as w,T as O,U as ce,w as V,O as Z,v as X,V as ee,p as De,E as be,W as ie,X as ge,n as ye,Y as _e,P as Ce,Z as Pe,$ as Se}from"./app-GhbSiDN1.js";import{a as ae,b as re,c as ue}from"./print-dNO72lYB.js";const de=(s,j)=>{let _=new Blob([s],{type:"application/"+j}),S=document.createElement("a");S.href=window.URL.createObjectURL(_),S.download=(void 0).currentOrderID+"."+j,document.body.appendChild(S),S.click(),document.body.removeChild(S)},oe={1:"NEW",2:"APPROVED",3:"REJECTED",4:"QUERIED",5:"POSTPONED",6:"CANCELLED",7:"AWAITINGSHIPPED",8:"SHIPPED",9:"SAFETYCHECK",10:"ONHOLD",11:"CALL",12:"QUERIEDDISPENSED",13:"QUERIEDNOTDISPENSED",14:"QUERIEDNOREPLY",15:"QUERIEDARCHIVED"},Ie={3:"images/logo/tnt.png",4:"images/logo/dpd.png",5:"images/logo/rmail.png",7:"images/logo/ups.png",8:"images/logo/tnt.png",10:"images/logo/dhl.png"},ve="/build/assets/iconPaper-Jsyd6hjU.png",K={Repeats:"Commercial Value",Name:"Name",Surname:"Surname",DAddress1:"Delivery Address Line 1",DAddress2:"Delivery Address Line 2",DAddress3:"Delivery Town",DAddress4:"Delivery Province",DPostcode:"Delivery Postcode",DCountryCode:"Delivery Country",Address1:"Home Address Line 1",Address2:"Home Address Line 2",Address3:"Home Town",Address4:"Home Province",Postcode:"Home Postcode",CountryCode:"Home Country",Telephone:"Telephone",Email:"Email",Notes:"Notes",TokenID:"COD Amount",TrackingCode:"Tracking Code",DeliveryID:"Delivery Company",APNotificationLanguage:"UPS Notification Language",APNotificationValue:"UPS Notification Email"},$e={class:"table table-hover table-diff mt-20"},Oe=t("thead",null,[t("tr",null,[t("th",null," Field "),t("th",null," Current Value "),t("th",null," New Value ")])],-1),we={key:0},Ee={key:1},ke={key:2},Ue={key:3},Ae={key:0},xe={key:1},je={key:2},Te={key:3},Re={key:0},Ne=t("td",{colspan:"3"},[t("h3",null,"UPS Access Point Details")],-1),Be=[Ne],Le={key:0},Ve={key:1},He={key:2},ze={key:3},Me={key:0},Fe={key:1},qe={key:2},Ye={key:3},Ge={__name:"DiffTableAddress",props:["oldObject","oldObjectUPS","newObject","newObjectUPS","countriesProp","companiesProp","getDetails"],emits:["difftable.error"],setup(s,{emit:j}){const _=s,S=j,M=b([]),h=b([]),E=b(!0),T=b(!0);le(()=>{_.getDetails&&(y(),R())});const g=L(()=>_.getDetails?M:_.countriesProp),B=L(()=>_.getDetails?h:_.companiesProp),e=(f,I=[])=>{let k="Unknown";return I.length<=0&&(I=g.value),I.forEach(o=>{o.CountryID==f&&(k=o.Name)}),k},y=()=>{axios.get("/countries").then(f=>{M.value=f.data.data,E.value=!1}).catch(f=>{console.warn(f.response.data.message),S("difftable.error"),E.value=!1})},l=(f,I=!1)=>{let k="Unknown";return I||(I=B.value),I.forEach(o=>{o.SettingID==f&&(k=o.Name)}),k},R=()=>{axios.get("/delivery-companies").then(f=>{h.value=f.data.data,T.value=!1}).catch(f=>{console.warn(f.response.data.message),S("difftable.error"),T.value=!1})};return(f,I)=>(n(),a("table",$e,[Oe,t("tbody",null,[(n(!0),a(x,null,N(s.newObject,(k,o)=>(n(),a("tr",{key:o},[t("td",{class:W([s.oldObject[o]==s.newObject[o]||s.oldObject[o]==null&&s.newObject[o]==""?"":"row-danger"])},i(P(K)[o]),3),t("td",{class:W([s.oldObject[o]==s.newObject[o]||s.oldObject[o]==null&&s.newObject[o]==""?"":"row-danger"])},[o=="DeliveryID"?(n(),a("span",we,i(l(s.oldObject[o])),1)):o=="DCountryCode"?(n(),a("span",Ee,i(e(s.oldObject[o])),1)):o=="CountryCode"?(n(),a("span",ke,i(e(s.oldObject[o])),1)):(n(),a("span",Ue,i(s.oldObject[o]),1))],2),t("td",{class:W([s.oldObject[o]==s.newObject[o]||s.oldObject[o]==null&&s.newObject[o]==""?"":"row-danger"])},[o=="DeliveryID"?(n(),a("span",Ae,i(l(s.newObject[o])),1)):o=="DCountryCode"?(n(),a("span",xe,i(e(s.newObject[o])),1)):o=="CountryCode"?(n(),a("span",je,i(e(s.newObject[o])),1)):(n(),a("span",Te,i(s.newObject[o]),1))],2)]))),128)),s.newObjectUPS&&s.newObjectUPS.length!=0?(n(),a("tr",Re,Be)):m("",!0),(n(!0),a(x,null,N(s.newObjectUPS,(k,o)=>(n(),a("tr",{key:o},[t("td",{class:W([s.oldObjectUPS[o]!=s.newObjectUPS[o]||!(s.oldObjectUPS[o]==null&&s.newObjectUPS[o]=="")?"row-danger":""])}," AP "+i(P(K)[o]),3),t("td",{class:W([s.oldObjectUPS[o]!=s.newObjectUPS[o]||!(s.oldObjectUPS[o]==null&&s.newObjectUPS[o]=="")?"row-danger":""])},[o=="DeliveryID"?(n(),a("span",Le,i(l(s.oldObjectUPS[o])),1)):o=="DCountryCode"?(n(),a("span",Ve,i(e(s.oldObjectUPS[o])),1)):o=="CountryCode"?(n(),a("span",He,i(e(s.oldObjectUPS[o])),1)):(n(),a("span",ze,i(s.oldObjectUPS[o]),1))],2),t("td",{class:W([s.oldObjectUPS[o]!=s.newObjectUPS[o]||!(s.oldObjectUPS[o]==null&&s.newObjectUPS[o]=="")?"row-danger":""])},[o=="DeliveryID"?(n(),a("span",Me,i(l(s.newObjectUPS[o])),1)):o=="DCountryCode"?(n(),a("span",Fe,i(e(s.newObjectUPS[o])),1)):o=="CountryCode"?(n(),a("span",qe,i(e(s.newObjectUPS[o])),1)):(n(),a("span",Ye,i(s.newObjectUPS[o]),1))],2)]))),128))])]))}},Qe={class:"modal"},We={key:0,class:"modal-header"},Ke={class:"flexContent"},Je={class:"orderDetails"},Xe=["src"],Ze=t("span",null,"Order #: ",-1),et=t("span",null,"Name: ",-1),tt=t("span",null,"Surname: ",-1),nt=t("span",null,"Status: ",-1),at={key:0},ot=t("span",null,"Tracking Code: ",-1),lt={key:1},st=t("span",null,"Commercial value: ",-1),it={key:0,class:"flexContent"},rt={class:"productListItem mb-10"},ut={class:"title"},dt={class:"form-column"},ct=t("h3",null,"Home Details",-1),vt={key:0,class:"form-group form-group-2"},mt=["for"],pt=["name","onUpdate:modelValue"],ht=["onUpdate:modelValue"],ft=["value"],Dt=["onUpdate:modelValue"],bt=["value"],gt={class:"form-column"},yt=t("h3",null,"Delivery Details",-1),_t={key:0,class:"form-group form-group-2"},Ct=["for"],Pt=["name","onUpdate:modelValue"],St=["onUpdate:modelValue"],It=["value"],$t=["onUpdate:modelValue"],Ot=["value"],wt={class:"form-group form-group-2"},Et={for:"Notes"},kt={class:"form-column"},Ut={key:0},At=["for"],xt=["name","onUpdate:modelValue"],jt=["onUpdate:modelValue"],Tt=["value"],Rt={key:0,class:"pxp-form mb-20"},Nt=t("div",{class:"infoBox warning"},[t("p",null,"Please review and confirm all the changes in the order before saving!")],-1),Bt={key:0,class:"modal-footer"},Lt={key:0},Vt={key:1},Ht=t("span",null," Back ",-1),zt=[Ht],Mt={key:1,class:"loader",style:{}},Ft={__name:"EditOrderAddress",props:["orderID","orderStatus","products"],emits:["closeorder","orderupdate"],setup(s,{emit:j}){const _=s,S=j,M=["Repeats","DAddress1","DAddress2","DAddress3","DAddress4","DPostcode","DCountryCode","DeliveryID","TrackingCode"],h=["Name","Surname","Address1","Address2","Address3","Address4","Postcode","CountryCode","Telephone","Email","TokenID","APNotificationLanguage","APNotificationValue"],E=b([]),T=b({}),g=b({}),B=b({}),e=b({}),y=b([]),l=b({order:{},oldOrder:{},ups:{},oldUps:{}}),R=b(!0),f=b(!1);le(()=>{o(),k(),F()});const I=()=>{f.value=!1,T.value={},B.value={},e.value={},l.value={order:{},oldOrder:{},ups:{},oldUps:{}},S("closeorder")},k=()=>{axios.get("/delivery-companies").then(p=>{E.value=p.data.data}).catch(p=>{console.warn(p.response.data.message)})},o=()=>{axios.get("/countries").then(p=>{y.value=p.data.data}).catch(p=>{console.warn(p.response.data.message)})},F=()=>{axios.get("/order-edit/"+_.orderID).then(p=>{l.value=p.data.data,R.value=!1}).catch(p=>{console.warn(p.response.data.message),R.value=!1})},q=fe.isEqual,J=()=>{f.value?Y():axios.post(`/order-edit/check/${_.orderID}`,{order:l.value.order,ups:l.value.ups}).then(p=>{Object.keys(p.data.data.changes).length>0||Object.keys(p.data.data.changesUPS).length?(T.value=p.data.data.changes,g.value=p.data.data.changesUPS,B.value=p.data.data.old,e.value=p.data.data.oldUPS,f.value=!0):(f.value=!1,S("closeorder"))}).catch(p=>{f.value=!1,ee(p)})},Y=()=>{axios.post("/order-edit/"+_.orderID,{order:l.value.order,ups:l.value.ups}).then(p=>{De("Saved"),I(),f.value=!1,S("orderupdate")}).catch(p=>{ee(p),I(),f.value=!1,S("orderupdate")})},te=()=>{f.value=!1,T.value={},g.value={}};return(p,U)=>(n(),a("div",null,[t("div",{class:"backdrop",onClick:U[0]||(U[0]=D=>I())}),t("div",Qe,[R.value?m("",!0):(n(),a("div",We,[C(O,{name:"fade"},{default:$(()=>[t("section",Ke,[t("div",Je,[t("img",{src:P(ve)},null,8,Xe),t("ul",null,[t("li",null,[Ze,w(i(s.orderID),1)]),t("li",null,[et,w(i(l.value.order.Name),1)]),t("li",null,[tt,w(i(l.value.order.Surname),1)]),t("li",null,[nt,w(i(s.orderStatus),1)]),l.value.order.TrackingCode!=""&&l.value.order.TrackingCode!=null?(n(),a("li",at,[ot,w(i(l.value.order.TrackingCode),1)])):m("",!0),l.value.order.Repeats!="0"&&l.value.order.Repeats!=""&&[143,162,205,243].includes(l.value.order.DCountryCode)?(n(),a("li",lt,[st,w(i(l.value.order.Repeats),1)])):m("",!0)])])])]),_:1}),C(O,{name:"fade"},{default:$(()=>[s.products.length!=0?(n(),a("section",it,[(n(!0),a(x,null,N(s.products,D=>(n(),a("div",rt,[t("div",ut,[t("h3",null,i(D.Name)+", "+i(D.Dosage)+" x "+i(D.Quantity)+" "+i(D.Unit),1)])]))),256))])):m("",!0)]),_:1})])),C(O,{name:"fade"},{default:$(()=>[y.value.length!=0&&E.value.length!=0&&!R.value&&Object.keys(T.value).length==0&&Object.keys(g.value).length==0?(n(),a("form",{key:0,onSubmit:ce(J,["prevent"]),class:"pxp-form mb-20"},[t("div",dt,[ct,(n(!0),a(x,null,N(l.value.order,(D,c)=>(n(),a(x,{key:c},[h.includes(c)?(n(),a("div",vt,[t("label",{for:D},i(P(K)[c]),9,mt),["CountryCode","DCountryCode","DeliveryID","Notes"].includes(c)?["DCountryCode","CountryCode"].includes(c)?V((n(),a("select",{key:1,"onUpdate:modelValue":r=>l.value.order[c]=r},[(n(!0),a(x,null,N(y.value,r=>(n(),a("option",{value:r.CountryID},i(r.Name),9,ft))),256))],8,ht)),[[X,l.value.order[c]]]):["DeliveryID"].includes(c)?V((n(),a("select",{key:2,"onUpdate:modelValue":r=>l.value.order[c]=r},[(n(!0),a(x,null,N(E.value,r=>(n(),a("option",{value:r.SettingID},i(r.Name),9,bt))),256))],8,Dt)),[[X,l.value.order[c]]]):m("",!0):V((n(),a("input",{key:0,class:"",name:D,placeholder:"","onUpdate:modelValue":r=>l.value.order[c]=r},null,8,pt)),[[Z,l.value.order[c]]])])):m("",!0)],64))),128))]),t("div",gt,[yt,(n(!0),a(x,null,N(l.value.order,(D,c)=>(n(),a(x,{key:c},[M.includes(c)?(n(),a("div",_t,[t("label",{for:D},i(P(K)[c]),9,Ct),["CountryCode","DCountryCode","DeliveryID","Notes"].includes(c)?["DCountryCode","CountryCode"].includes(c)?V((n(),a("select",{key:1,"onUpdate:modelValue":r=>l.value.order[c]=r},[(n(!0),a(x,null,N(y.value,r=>(n(),a("option",{value:r.CountryID},i(r.Name),9,It))),256))],8,St)),[[X,l.value.order[c]]]):["DeliveryID"].includes(c)?V((n(),a("select",{key:2,"onUpdate:modelValue":r=>l.value.order[c]=r},[(n(!0),a(x,null,N(E.value,r=>(n(),a("option",{value:r.SettingID},i(r.Name),9,Ot))),256))],8,$t)),[[X,l.value.order[c]]]):m("",!0):V((n(),a("input",{key:0,class:"",name:D,placeholder:"","onUpdate:modelValue":r=>l.value.order[c]=r},null,8,Pt)),[[Z,l.value.order[c]]])])):m("",!0)],64))),128)),t("div",wt,[t("label",Et,i(P(K).Notes),1),V(t("textarea",{style:{"min-width":"300px","min-height":"60px","line-height":"1"},placeholder:"Add notes here if you want them to show for dispensers and customer support","onUpdate:modelValue":U[1]||(U[1]=D=>l.value.order.Notes=D),class:"form-control tBoxSize02"},null,512),[[Z,l.value.order.Notes]])])]),t("div",kt,[l.value.ups!=null?(n(),a("h3",Ut,"UPS Access Point")):m("",!0),(n(!0),a(x,null,N(l.value.ups,(D,c)=>(n(),a("div",{class:"form-group",key:c},[t("label",{for:D},i(P(K)[c]),9,At),["CountryCode","DCountryCode"].includes(c)?["DCountryCode","CountryCode"].includes(c)?V((n(),a("select",{key:1,"onUpdate:modelValue":r=>l.value.ups[c]=r},[(n(!0),a(x,null,N(y.value,r=>(n(),a("option",{value:r.CountryID},i(r.Name),9,Tt))),256))],8,jt)),[[X,l.value.ups[c]]]):m("",!0):V((n(),a("input",{key:0,class:"",name:D,placeholder:"","onUpdate:modelValue":r=>l.value.ups[c]=r},null,8,xt)),[[Z,l.value.ups[c]]])]))),128))])],32)):m("",!0)]),_:1}),C(O,{name:"fade"},{default:$(()=>[(Object.keys(T.value).length>0||Object.keys(g.value).length>0)&&!R.value?(n(),a("div",Rt,[Nt,C(Ge,{"old-object":B.value,"new-object":T.value,"old-object-u-p-s":e.value,"new-object-u-p-s":g.value,"countries-prop":y.value,"companies-prop":E.value},null,8,["old-object","new-object","old-object-u-p-s","new-object-u-p-s","countries-prop","companies-prop"])])):m("",!0)]),_:1}),C(O,{name:"fade"},{default:$(()=>[R.value?m("",!0):(n(),a("div",Bt,[!P(q)(l.value.order,l.value.oldOrder)||!P(q)(l.value.ups,l.value.oldUPS)?(n(),a("button",{key:0,onClick:U[2]||(U[2]=D=>J()),class:"btn btnSize01 tertiaryBtn bigButton big-square-button"},[f.value?(n(),a("span",Vt," Save ")):(n(),a("span",Lt," Review "))])):m("",!0),(!P(q)(l.value.order,l.value.oldOrder)||!P(q)(l.value.ups,l.value.oldUPS))&&f.value?(n(),a("button",{key:1,onClick:U[3]||(U[3]=D=>te()),class:"btn btnSize01 tertiaryBtn bigButton big-square-button"},zt)):m("",!0),t("button",{onClick:U[4]||(U[4]=D=>I()),class:"btn btnSize01 secondaryBtn bigButton"},"Cancel")]))]),_:1}),R.value?(n(),a("div",Mt,"Loading...")):m("",!0),t("span",{class:"close",onClick:U[5]||(U[5]=D=>I())},"X")])]))}},ne={TNT:3,DPD:4,RML:5,UPS:7,TNT_UK:8,DHL:10},qt={class:"content"},Yt={class:"orderSearch flexContent"},Gt=t("h3",null,"Search order",-1),Qt={class:"formItemsGroup floatLeft flex mt-20"},Wt=t("button",{class:"btn btnSize02 tertiaryBtn",type:"submit"}," Search ",-1),Kt={key:0,class:"flexContent"},Jt=t("h2",null,"Order Details",-1),Xt={class:"orderDetails"},Zt=["src"],en=t("span",null,"Order #: ",-1),tn=t("span",null,"Name: ",-1),nn=t("span",null,"Surname: ",-1),an=t("span",null,"Status: ",-1),on={key:0},ln=t("span",null,"Tracking Code: ",-1),sn={key:1},rn=t("span",null,"Commercial value: ",-1),un=["href"],dn={key:0,title:"Download Documentation",class:"btn btnSize02 tertiaryBtn",type:"button"},cn=t("i",{class:"fa fa-file"},null,-1),vn=[cn],mn={key:0,class:"flexContent"},pn={key:0,class:"flexContent flex-direction-column"},hn={key:0,style:{float:"none",background:"#f7941d4f",width:"100%",padding:"5px","text-align":"center","font-weight":"700!important",border:"3px solid #d291007d","margin-bottom":"20px","font-size":"20px"}},fn=["src"],Dn={key:0,class:"flexContent flex-direction-row"},bn={style:{width:"100%",display:"flex","justify-content":"center","align-items":"center"}},gn={key:0,style:{display:"flex","justify-content":"center","align-items":"center"}},yn=["disabled"],_n={key:0,class:"loader",style:{}},Cn={key:1},Pn=["disabled"],Sn=["disabled"],In={key:1},$n={key:0},On={class:"infoBox warning"},wn={key:0},En=t("div",{class:"infoBox warning"},[t("p",null," THIS ORDER HAS NO COMMERCIAL VALUE. PLEASE SET VALUE BY CLICKING EDIT. ")],-1),kn=[En],Un={key:0},An=t("div",{class:"infoBox warning"},[t("p",null," ORDER VALUE GREATER THAN 270 AND WILL REQUIRE CN23 FORM. USE ROYAL MAIL APP FOR SHIPPING. ")],-1),xn=[An],jn={key:0},Tn=t("div",{class:"infoBox warning"},[t("p",null," THIS ORDER IS NOT READY TO BE SHIPPED. PLEASE SPEAK TO A DISPENSING TEAM MEMBER ")],-1),Rn=[Tn],Nn={key:1},Bn={class:"infoBox warning"},Ln={key:0,class:"activity"},Vn=t("h5",{class:"activity-log-header"},"Activities on this order",-1),Hn={class:"activity-action"},zn={class:"activity-footer"},Mn={key:1,class:"activity"},Fn=t("ul",{class:"activity-log-wrapper"},[t("li",{class:"activity-log-item"}," No activity log found ")],-1),qn=[Fn],Qn={__name:"Order",setup(s){const j=be(),_=b(j.params.id),S=b([]),M=appInfo,h=b(""),E=b(!1),T=b(!1);b("");const g=b(!1),B=b(!1),e=b(null),y=b(!1),l=userInfo;le(()=>{H()});const R=L(()=>e.value!=null?e.value.DeliveryID==ne.DHL?"/shipment-validation/"+e.value.PrescriptionID:e.value.DeliveryID==ne.UPS?"/api/ups/shipment-validation/"+e.value.PrescriptionID:e.value.DeliveryID==ne.DPD?"/api/dpd/shipment-validation/"+e.value.PrescriptionID:e.value.DeliveryID==ne.RML?`/api/rmail/shipment-validation/${e.value.PrescriptionID}`:!1:!1),f=L(()=>e.value.DeliveryID!="10"),I=L(()=>e.value.Repeats!="0"&&e.value.Repeats!=""&&[143,162,205,243].includes(e.value.DCountryCode)),k=L(()=>e.value.Repeats!="0"&&e.value.Repeats!=""&&[143].includes(e.value.DCountryCode)),o=L(()=>e.value.PaymentMethod!="0"),F=L(()=>e.value.PaymentMethod!="0"),q=L(()=>e.value!=null?e.value.DeliveryID=="10"?"/api/dhl/label/"+e.value.PrescriptionID:e.value.DeliveryID=="7"?o.value?"/api/ups/gif/"+e.value.PrescriptionID:"/api/ups/label/"+e.value.PrescriptionID:e.value.DeliveryID=="4"?"/api/dpd/label/"+e.value.PrescriptionID:e.value.DeliveryID=="5"?"/api/rmail/label/"+e.value.PrescriptionID:!1:!1),J=u=>{if(M.label_reset_without_admin){let d={1:"System unresponsive",2:"Damaged label",3:"Label applied incorrectly"};Swal.fire({text:"Why is this label being reprinted?",input:"select",inputOptions:d,inputPlaceholder:"Select a reason",confirmButtonText:"Resend",showCancelButton:!0,inputValidator:v=>new Promise(A=>{v==="1"||v==="2"||v==="3"?A():A("Reason invalid")})}).then(v=>{v.value?(u(),axios.post("/log-reprint",{orderID:h.value,reason:d[v.value],code:"Not Required"}).then(A=>{console.log(A)}).catch(A=>{console.log(A)})):r()})}else Swal.fire({text:"Scan authorization code",input:"text",inputValue:"",inputClass:"key",inputAttributes:{autocomplete:"off",type:"hidden"},showCancelButton:!0,inputValidator:d=>new Promise(v=>{v!=""?axios.post("/resend-authorization",{code:d}).then(A=>{v()}).catch(A=>{v("The authorization code is incorrect")}):v("The authorization code can not be empty")})}).then(d=>{if(typeof d.value<"u"&&d.value!=""){let v={1:"System unresponsive",2:"Damaged label",3:"Label applied incorrectly"},A=d.value;Swal.fire({text:"Why is this label being reprinted?",input:"select",inputOptions:v,inputPlaceholder:"Select a reason",confirmButtonText:"Resend",showCancelButton:!0,inputValidator:G=>new Promise(Q=>{G==="1"||G==="2"||G==="3"?Q():Q("Reason invalid")})}).then(G=>{G.value?(u(),axios.post("/log-reprint",{orderID:h.value,reason:v[G.value],code:A}).then(Q=>{console.log(Q)}).catch(Q=>{console.log(Q)})):r()})}else r()})},Y=()=>{D(()=>{te&&(y.value=!0,axios.get(te).then(u=>{if(e.value.Printed)J(()=>{let d=e.value.DeliveryID=="7"?"xml":"csv";de(u.data,d),e.value.Printed=!0,y.value=!1,r()});else{let d=e.value.DeliveryID=="7"?"xml":"csv";de(u.data,d),e.value.Printed=!0,y.value=!1}z()}).catch(u=>{ee(u.response.data.message),y.value=!1,r(),z()}))})},te=L(()=>e.value!=null?e.value.DeliveryID=="10"?"/api/dhl/manual/"+e.value.PrescriptionID:e.value.DeliveryID=="7"?"/api/ups/manual/"+e.value.PrescriptionID:e.value.DeliveryID=="3"?"/api/tnt/manual/"+e.value.PrescriptionID:e.value.DeliveryID=="4"?"/api/dpd/manual/"+e.value.PrescriptionID:e.value.DeliveryID=="5"?"/api/rmail/manual/"+e.value.PrescriptionID:!1:!1),p=L(()=>e.value.Printed?"Manual Re-print":"Manual Print"),U=()=>{axios.get(`/order/${h.value}/check-document`).then(u=>{T.value=u.data.data}).catch(u=>{ie(u.response.data.message)})},D=u=>{u()},c=u=>{E.value=!E.value},r=()=>{setTimeout(()=>{document.getElementById("orderID").focus()},300)},z=()=>{B.value=!0,axios.get("/order/"+h.value+"/activity").then(u=>{S.value=u.data.data,B.value=!1}).catch(u=>{ee(u.response.data.message),B.value=!1})},me=(u=!1)=>{J(()=>{y.value=!0,o.value?re(`${window.location.origin}/api/ups/gif/${h.value}?token=${l.token}`,()=>{}):ue(q.value,f.value),k.value&&ae(`${window.location.origin}/token/ups/invoice/${h.value}?token=${l.token}`),H(h.value),y.value=!1,r()})},se=()=>{axios.post(`/api/dhl/${h.value}/resend-pdf`).then(u=>{H(),z()}).catch(u=>{ee(u.response.data.message)})},pe=()=>{D(()=>{y.value=!0,R.value&&axios.get(R.value).then(u=>{u.data.data.paper_invoice&&ae(`${window.location.origin}/token/ups/invoice/${h.value}?token=${l.token}`),u.data.data.gif?re(`${window.location.origin}/api/ups/gif/${h.value}?token=${l.token}`,()=>{}):u.data.data.rml_api?ae(`${window.location.origin}/token/rml/label/${h.value}?token=${l.token}`):ue(q.value,!0),u.data.data.resend&&(Pe("Prescription PDF not sent to DHL! Trying to resend."),se()),_.value=h.value,H(),y.value=!1,r(),z()}).catch(u=>{Se(u.response.data.message),H(),y.value=!1,r(),z()})})},he=()=>{axios.get("/reset-order/"+h.value).then(u=>{H(h.value),z()}).catch(u=>{console.warn(u),z()})},H=()=>{_.value!=""&&(h.value=_.value,_.value=""),z(),g.value=!0,axios.get("/order/"+h.value).then(u=>{e.value=u.data.data,U(),g.value=!1}).catch(u=>{e.value=null,ie(u.response.data.message),g.value=!1}),j.params.id!=h.value&&ge.push({params:{id:h.value}})};return ye(()=>j.params.id,()=>{typeof j.params.id<"u"&&h.value!=j.params.id&&(_.value=j.params.id,H())}),(u,d)=>(n(),a("div",null,[t("div",qt,[t("section",null,[t("div",Yt,[Gt,t("form",{onSubmit:ce(H,["prevent"]),autocomplete:"on"},[t("div",Qt,[V(t("input",{required:"","onUpdate:modelValue":d[0]||(d[0]=v=>_.value=v),class:"tBox tBoxSize02",type:"text",id:"orderID",placeholder:"Order No"},null,512),[[Z,_.value]]),Wt])],32)])]),C(O,{name:"fade"},{default:$(()=>[!g.value&&e.value!=null?(n(),a("section",Kt,[Jt,t("div",Xt,[t("img",{src:P(ve)},null,8,Zt),t("ul",null,[t("li",null,[en,w(i(e.value.PrescriptionID),1)]),t("li",null,[tn,w(i(e.value.Name),1)]),t("li",null,[nn,w(i(e.value.Surname),1)]),t("li",null,[an,w(i(P(oe)[e.value.Status]),1)]),e.value.TrackingCode!=""&&e.value.TrackingCode!=null?(n(),a("li",on,[ln,w(i(e.value.TrackingCode),1)])):m("",!0),e.value.Repeats!="0"&&e.value.Repeats!=""&&[143,162,205,243].includes(e.value.DCountryCode)?(n(),a("li",sn,[rn,w(i(e.value.Repeats),1)])):m("",!0),t("li",null,[t("button",{onClick:d[1]||(d[1]=v=>c(e.value)),class:"btn btnSize02 tertiaryBtn",type:"button"}," Edit Address "),C(O,{name:"fade"},{default:$(()=>[t("a",{href:`/order/${h.value}/download-document`,target:"_blank"},[T.value?(n(),a("button",dn,vn)):m("",!0)],8,un)]),_:1})])])])])):m("",!0)]),_:1}),C(O,{name:"fade"},{default:$(()=>[!g.value&&e.value==null?(n(),a("section",mn," Loading ")):m("",!0)]),_:1}),C(O,{name:"fade"},{default:$(()=>[!g.value&&e.value!=null?(n(),a("section",pn,[e.value.DeliveryID==4&&e.value.SaturdayDelivery==1?(n(),a("div",hn," DPD Saturday Delivery ")):m("",!0),t("img",{style:{height:"50px"},src:P(Ie)[e.value.DeliveryID]},null,8,fn)])):m("",!0)]),_:1}),C(O,{name:"fade"},{default:$(()=>[!g.value&&e.value!=null&&e.value.canPrintLabel&&[7,8].includes(e.value.Status)?(n(),a("section",Dn,[t("div",bn,[e.value.DeliveryID=="7"||e.value.DeliveryID=="10"||e.value.DeliveryID=="5"&&parseFloat(e.value.Repeats.split(/(\s+)/)[2])<=270||e.value.DeliveryID=="4"?(n(),a("div",gn,[(e.value.TrackingCode==""||e.value.TrackingCode==null)&&!F.value&&e.value.CanDecomission?(n(),a("button",{key:0,onClick:d[2]||(d[2]=v=>pe()),disabled:y.value||e.value.DeliveryID=="7",class:"btn btnSize01 tertiaryBtn bigButton mr-10 big-round-button",type:"submit"},[y.value?(n(),a("div",_n,"Loading...")):(n(),a("span",Cn,"Request Label"))],8,yn)):!F.value&&e.value.CanDecomission?(n(),a("button",{key:1,onClick:d[3]||(d[3]=v=>me(!0)),disabled:y.value,class:"btn btnSize01 tertiaryBtn bigButton big-round-button",type:"submit"}," Reprint Label ",8,Pn)):m("",!0),e.value.DeliveryID=="7"&&(F.value||k.value)?(n(),a("button",{key:2,onClick:d[4]||(d[4]=v=>Y()),disabled:!0,class:"btn btnSize01 tertiaryBtn bigButton big-round-button",type:"submit"},i(p.value),1)):e.value.DeliveryID=="10"&&(F.value||k.value)?(n(),a("button",{key:3,onClick:d[5]||(d[5]=v=>Y()),class:"btn btnSize01 tertiaryBtn bigButton big-round-button",type:"submit"},i(p.value),1)):e.value.DeliveryID=="7"&&I.value&&!k.value?(n(),a("button",{key:4,onClick:d[6]||(d[6]=v=>Y()),disabled:!0,class:"btn btnSize01 tertiaryBtn",type:"submit"},i(p.value),1)):m("",!0),!F.value&&e.value.TrackingCode!=""&&e.value.TrackingCode!=null&&(P(l).role>=60||P(M).label_reset_without_admin)?(n(),a("button",{key:5,onClick:d[7]||(d[7]=v=>he()),disabled:y.value,class:"btn btnSize01 tertiaryBtn bigButton",type:"submit"}," Reset Label ",8,Sn)):m("",!0)])):(n(),a("div",In,[t("button",{onClick:d[8]||(d[8]=v=>Y()),class:"btn btnSize01 tertiaryBtn bigButton big-round-button",type:"submit"},i(p.value),1)]))])])):m("",!0)]),_:1}),C(O,{name:"fade"},{default:$(()=>[!g.value&&e.value==null?(n(),a("section",$n,[t("div",On,[t("p",null,"Order with number "+i(h.value)+" was not found!",1)])])):m("",!0)]),_:1}),C(O,{name:"fade"},{default:$(()=>[!g.value&&e.value!=null&&(e.value.Repeats=="0"||e.value.Repeats=="")&&[143,162,205,243].includes(e.value.DCountryCode)?(n(),a("section",wn,kn)):m("",!0)]),_:1}),C(O,{name:"fade"},{default:$(()=>[!g.value&&e.value!=null&&e.value.DeliveryID=="5"&&parseFloat(e.value.Repeats.split(/(\s+)/)[2])>270?(n(),a("section",Un,xn)):m("",!0)]),_:1}),C(O,{name:"fade"},{default:$(()=>{var v,A;return[!g.value&&e.value!=null&&!e.value.CanDecomission?(n(),a("section",jn,Rn)):!g.value&&![7,8].includes((v=e.value)==null?void 0:v.Status)?(n(),a("section",Nn,[t("div",Bn,[t("p",null,[w(" THIS ORDER IS NOT READY TO BE SHIPPED. THE ORDER STATUS IS "),t("b",null,i(P(oe)[(A=e.value)==null?void 0:A.Status]),1),w(". PLEASE SPEAK TO A PHARMACY TEAM MEMBER ")])])])):m("",!0)]}),_:1}),C(O,{name:"fade"},{default:$(()=>[S.value.length>0&&!B.value&&!g.value?(n(),a("section",Ln,[Vn,C(_e,{name:"slide-down",tag:"ul",class:"activity-log-wrapper",style:{"margin-top":"0px!important"}},{default:$(()=>[(n(!0),a(x,null,N(S.value,v=>(n(),a("li",{class:"activity-log-item",key:v.ActivityID},[t("div",Hn,[w(i(v.Action)+" ",1),v.Action=="DHL request label - PDF issue"&&v.Status==1?(n(),a("button",{key:0,style:{background:"red",border:"1px solid red"},class:"btn btnSize02 tertiaryBtn",onClick:d[9]||(d[9]=A=>se())}," Resend PDF ")):m("",!0)]),t("div",zn,[t("span",null,i(v.Name),1),t("span",null,i(v.Date),1)])]))),128))]),_:1})])):!B.value&&!g.value?(n(),a("section",Mn,qn)):m("",!0)]),_:1}),C(O,{name:"fade"},{default:$(()=>[E.value?(n(),Ce(Ft,{key:0,onCloseorder:d[10]||(d[10]=v=>E.value=!E.value),products:I.value?e.value.Products:[],orderID:h.value,orderStatus:P(oe)[e.value.Status],onOrderupdate:d[11]||(d[11]=v=>H())},null,8,["products","orderID","orderStatus"])):m("",!0)]),_:1})])]))}};export{Qn as default};