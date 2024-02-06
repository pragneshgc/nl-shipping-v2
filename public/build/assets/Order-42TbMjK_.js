import{r as y,e as ae,d as V,o as n,c as o,l as t,F as j,E as B,v as Y,n as i,D as I,q as p,_ as he,a as S,A as $,L as k,T as O,O as de,B as H,J as X,G as J,P as ee,Q as fe,x as De,R as se,S as be,f as ge,U as ye,K as _e,V as Ce,W as Pe}from"./app-4enESHji.js";const ie=(l,P)=>{let m=new Blob([l],{type:"application/"+P}),D=document.createElement("a");D.href=window.URL.createObjectURL(m),D.download=(void 0).currentOrderID+"."+P,document.body.appendChild(D),D.click(),document.body.removeChild(D)},ne=l=>{let P="http://localhost:63020",m={type:"pdf",url:l,printer:"Zebra  ZP 450-200 dpi"},D=new XMLHttpRequest;D.addEventListener("readystatechange",function(){this.readyState===4&&console.log(this.responseText)}),D.open("POST",P),D.setRequestHeader("Content-Type","application/x-www-form-urlencoded"),m=Object.keys(m).map(E=>encodeURIComponent(E)+"="+encodeURIComponent(m[E])).join("&"),D.send(m)},re=(l,P=!1)=>{let m="http://localhost:63020",D={type:"gif",url:l,printer:"Zebra  ZP 450-200 dpi"},E=new XMLHttpRequest;E.addEventListener("readystatechange",function(){this.readyState===4&&P&&P()}),E.open("POST",m),E.setRequestHeader("Content-Type","application/x-www-form-urlencoded"),D=Object.keys(D).map(h=>encodeURIComponent(h)+"="+encodeURIComponent(D[h])).join("&"),E.send(D)},ue=(l,P=!1)=>{var m=window.open(l,"PRINT","height=400,width=600");m.document.close(),m.focus(),setTimeout(function(){P||m.close()},1e3)},oe={1:"NEW",2:"APPROVED",3:"REJECTED",4:"QUERIED",5:"POSTPONED",6:"CANCELLED",7:"AWAITINGSHIPPED",8:"SHIPPED",9:"SAFETYCHECK",10:"ONHOLD",11:"CALL",12:"QUERIEDDISPENSED",13:"QUERIEDNOTDISPENSED",14:"QUERIEDNOREPLY",15:"QUERIEDARCHIVED"},Se={3:"images/logo/tnt.png",4:"images/logo/dpd.png",5:"images/logo/rmail.png",7:"images/logo/ups.png",8:"images/logo/tnt.png",10:"images/logo/dhl.png"},ce="/build/assets/iconPaper-Jsyd6hjU.png",K={Repeats:"Commercial Value",Name:"Name",Surname:"Surname",DAddress1:"Delivery Address Line 1",DAddress2:"Delivery Address Line 2",DAddress3:"Delivery Town",DAddress4:"Delivery Province",DPostcode:"Delivery Postcode",DCountryCode:"Delivery Country",Address1:"Home Address Line 1",Address2:"Home Address Line 2",Address3:"Home Town",Address4:"Home Province",Postcode:"Home Postcode",CountryCode:"Home Country",Telephone:"Telephone",Email:"Email",Notes:"Notes",TokenID:"COD Amount",TrackingCode:"Tracking Code",DeliveryID:"Delivery Company",APNotificationLanguage:"UPS Notification Language",APNotificationValue:"UPS Notification Email"},Ie={class:"table table-hover table-diff mt-20"},we=t("thead",null,[t("tr",null,[t("th",null," Field "),t("th",null," Current Value "),t("th",null," New Value ")])],-1),$e={key:0},Oe={key:1},Ee={key:2},ke={key:3},Ue={key:0},xe={key:1},Ae={key:2},Re={key:3},je={key:0},Te=t("td",{colspan:"3"},[t("h3",null,"UPS Access Point Details")],-1),Ne=[Te],Be={key:0},Le={key:1},Ve={key:2},He={key:3},ze={key:0},Me={key:1},qe={key:2},Fe={key:3},Ge={__name:"DiffTableAddress",props:["oldObject","oldObjectUPS","newObject","newObjectUPS","countriesProp","companiesProp","getDetails"],emits:["difftable.error"],setup(l,{emit:P}){const m=l,D=P,E=y([]),h=y([]),U=y(!0),T=y(!0);ae(()=>{m.getDetails&&(C(),N())});const _=V(()=>m.getDetails?E:m.countriesProp),L=V(()=>m.getDetails?h:m.companiesProp),e=(b,w=[])=>{let x="Unknown";return w.length<=0&&(w=_.value),w.forEach(a=>{a.CountryID==b&&(x=a.Name)}),x},C=()=>{axios.get("/countries").then(b=>{E.value=b.data.data,U.value=!1}).catch(b=>{console.warn(b.response.data.message),D("difftable.error"),U.value=!1})},s=(b,w=!1)=>{let x="Unknown";return w||(w=L.value),w.forEach(a=>{a.SettingID==b&&(x=a.Name)}),x},N=()=>{axios.get("/delivery-companies").then(b=>{h.value=b.data.data,T.value=!1}).catch(b=>{console.warn(b.response.data.message),D("difftable.error"),T.value=!1})};return(b,w)=>(n(),o("table",Ie,[we,t("tbody",null,[(n(!0),o(j,null,B(l.newObject,(x,a)=>(n(),o("tr",{key:a},[t("td",{class:Y([l.oldObject[a]==l.newObject[a]||l.oldObject[a]==null&&l.newObject[a]==""?"":"row-danger"])},i(I(K)[a]),3),t("td",{class:Y([l.oldObject[a]==l.newObject[a]||l.oldObject[a]==null&&l.newObject[a]==""?"":"row-danger"])},[a=="DeliveryID"?(n(),o("span",$e,i(s(l.oldObject[a])),1)):a=="DCountryCode"?(n(),o("span",Oe,i(e(l.oldObject[a])),1)):a=="CountryCode"?(n(),o("span",Ee,i(e(l.oldObject[a])),1)):(n(),o("span",ke,i(l.oldObject[a]),1))],2),t("td",{class:Y([l.oldObject[a]==l.newObject[a]||l.oldObject[a]==null&&l.newObject[a]==""?"":"row-danger"])},[a=="DeliveryID"?(n(),o("span",Ue,i(s(l.newObject[a])),1)):a=="DCountryCode"?(n(),o("span",xe,i(e(l.newObject[a])),1)):a=="CountryCode"?(n(),o("span",Ae,i(e(l.newObject[a])),1)):(n(),o("span",Re,i(l.newObject[a]),1))],2)]))),128)),l.newObjectUPS&&l.newObjectUPS.length!=0?(n(),o("tr",je,Ne)):p("",!0),(n(!0),o(j,null,B(l.newObjectUPS,(x,a)=>(n(),o("tr",{key:a},[t("td",{class:Y([l.oldObjectUPS[a]!=l.newObjectUPS[a]||!(l.oldObjectUPS[a]==null&&l.newObjectUPS[a]=="")?"row-danger":""])}," AP "+i(I(K)[a]),3),t("td",{class:Y([l.oldObjectUPS[a]!=l.newObjectUPS[a]||!(l.oldObjectUPS[a]==null&&l.newObjectUPS[a]=="")?"row-danger":""])},[a=="DeliveryID"?(n(),o("span",Be,i(s(l.oldObjectUPS[a])),1)):a=="DCountryCode"?(n(),o("span",Le,i(e(l.oldObjectUPS[a])),1)):a=="CountryCode"?(n(),o("span",Ve,i(e(l.oldObjectUPS[a])),1)):(n(),o("span",He,i(l.oldObjectUPS[a]),1))],2),t("td",{class:Y([l.oldObjectUPS[a]!=l.newObjectUPS[a]||!(l.oldObjectUPS[a]==null&&l.newObjectUPS[a]=="")?"row-danger":""])},[a=="DeliveryID"?(n(),o("span",ze,i(s(l.newObjectUPS[a])),1)):a=="DCountryCode"?(n(),o("span",Me,i(e(l.newObjectUPS[a])),1)):a=="CountryCode"?(n(),o("span",qe,i(e(l.newObjectUPS[a])),1)):(n(),o("span",Fe,i(l.newObjectUPS[a]),1))],2)]))),128))])]))}},Qe={class:"modal"},We={key:0,class:"modal-header"},Ye={class:"flexContent"},Ke={class:"orderDetails"},Ze=["src"],Je=t("span",null,"Order #: ",-1),Xe=t("span",null,"Name: ",-1),et=t("span",null,"Surname: ",-1),tt=t("span",null,"Status: ",-1),nt={key:0},ot=t("span",null,"Tracking Code: ",-1),at={key:1},lt=t("span",null,"Commercial value: ",-1),st={key:0,class:"flexContent"},it={class:"productListItem mb-10"},rt={class:"title"},ut={class:"form-column"},dt=t("h3",null,"Home Details",-1),ct={key:0,class:"form-group form-group-2"},vt=["for"],pt=["name","onUpdate:modelValue"],mt=["onUpdate:modelValue"],ht=["value"],ft=["onUpdate:modelValue"],Dt=["value"],bt={class:"form-column"},gt=t("h3",null,"Delivery Details",-1),yt={key:0,class:"form-group form-group-2"},_t=["for"],Ct=["name","onUpdate:modelValue"],Pt=["onUpdate:modelValue"],St=["value"],It=["onUpdate:modelValue"],wt=["value"],$t={class:"form-group form-group-2"},Ot={for:"Notes"},Et={class:"form-column"},kt={key:0},Ut=["for"],xt=["name","onUpdate:modelValue"],At=["onUpdate:modelValue"],Rt=["value"],jt={key:0,class:"pxp-form mb-20"},Tt=t("div",{class:"infoBox warning"},[t("p",null,"Please review and confirm all the changes in the order before saving!")],-1),Nt={key:0,class:"modal-footer"},Bt={key:0},Lt={key:1},Vt=t("span",null," Back ",-1),Ht=[Vt],zt={key:1,class:"loader",style:{}},Mt={__name:"EditOrderAddress",props:["orderID","orderStatus","products"],emits:["closeorder","orderupdate"],setup(l,{emit:P}){const m=l,D=P,E=["Repeats","DAddress1","DAddress2","DAddress3","DAddress4","DPostcode","DCountryCode","DeliveryID","TrackingCode"],h=["Name","Surname","Address1","Address2","Address3","Address4","Postcode","CountryCode","Telephone","Email","TokenID","APNotificationLanguage","APNotificationValue"],U=y([]),T=y({}),_=y({}),L=y({}),e=y({}),C=y([]),s=y({order:{},oldOrder:{},ups:{},oldUps:{}}),N=y(!0),b=y(!1);ae(()=>{a(),x(),q()});const w=()=>{b.value=!1,T.value={},L.value={},e.value={},s.value={order:{},oldOrder:{},ups:{},oldUps:{}},D("closeorder")},x=()=>{axios.get("/delivery-companies").then(f=>{U.value=f.data.data}).catch(f=>{console.warn(f.response.data.message)})},a=()=>{axios.get("/countries").then(f=>{C.value=f.data.data}).catch(f=>{console.warn(f.response.data.message)})},q=()=>{axios.get("/order-edit/"+m.orderID).then(f=>{s.value=f.data.data,N.value=!1}).catch(f=>{console.warn(f.response.data.message),N.value=!1})},F=he.isEqual,Z=()=>{b.value?G():axios.post(`/order-edit/check/${m.orderID}`,{order:s.value.order,ups:s.value.ups}).then(f=>{Object.keys(f.data.data.changes).length>0||Object.keys(f.data.data.changesUPS).length?(T.value=f.data.data.changes,_.value=f.data.data.changesUPS,L.value=f.data.data.old,e.value=f.data.data.oldUPS,b.value=!0):(b.value=!1,D("closeorder"))}).catch(f=>{b.value=!1,ee(f)})},G=()=>{axios.post("/order-edit/"+m.orderID,{order:s.value.order,ups:s.value.ups}).then(f=>{fe("Saved"),w(),b.value=!1,D("orderupdate")}).catch(f=>{ee(f),w(),b.value=!1,D("orderupdate")})},te=()=>{b.value=!1,T.value={},_.value={}};return(f,A)=>(n(),o("div",null,[t("div",{class:"backdrop",onClick:A[0]||(A[0]=g=>w())}),t("div",Qe,[N.value?p("",!0):(n(),o("div",We,[S(O,{name:"fade"},{default:$(()=>[t("section",Ye,[t("div",Ke,[t("img",{src:I(ce)},null,8,Ze),t("ul",null,[t("li",null,[Je,k(i(l.orderID),1)]),t("li",null,[Xe,k(i(s.value.order.Name),1)]),t("li",null,[et,k(i(s.value.order.Surname),1)]),t("li",null,[tt,k(i(l.orderStatus),1)]),s.value.order.TrackingCode!=""&&s.value.order.TrackingCode!=null?(n(),o("li",nt,[ot,k(i(s.value.order.TrackingCode),1)])):p("",!0),s.value.order.Repeats!="0"&&s.value.order.Repeats!=""&&[143,162,205,243].includes(s.value.order.DCountryCode)?(n(),o("li",at,[lt,k(i(s.value.order.Repeats),1)])):p("",!0)])])])]),_:1}),S(O,{name:"fade"},{default:$(()=>[l.products.length!=0?(n(),o("section",st,[(n(!0),o(j,null,B(l.products,g=>(n(),o("div",it,[t("div",rt,[t("h3",null,i(g.Name)+", "+i(g.Dosage)+" x "+i(g.Quantity)+" "+i(g.Unit),1)])]))),256))])):p("",!0)]),_:1})])),S(O,{name:"fade"},{default:$(()=>[C.value.length!=0&&U.value.length!=0&&!N.value&&Object.keys(T.value).length==0&&Object.keys(_.value).length==0?(n(),o("form",{key:0,onSubmit:de(Z,["prevent"]),class:"pxp-form mb-20"},[t("div",ut,[dt,(n(!0),o(j,null,B(s.value.order,(g,c)=>(n(),o(j,{key:c},[h.includes(c)?(n(),o("div",ct,[t("label",{for:g},i(I(K)[c]),9,vt),["CountryCode","DCountryCode","DeliveryID","Notes"].includes(c)?["DCountryCode","CountryCode"].includes(c)?H((n(),o("select",{key:1,"onUpdate:modelValue":r=>s.value.order[c]=r},[(n(!0),o(j,null,B(C.value,r=>(n(),o("option",{value:r.CountryID},i(r.Name),9,ht))),256))],8,mt)),[[J,s.value.order[c]]]):["DeliveryID"].includes(c)?H((n(),o("select",{key:2,"onUpdate:modelValue":r=>s.value.order[c]=r},[(n(!0),o(j,null,B(U.value,r=>(n(),o("option",{value:r.SettingID},i(r.Name),9,Dt))),256))],8,ft)),[[J,s.value.order[c]]]):p("",!0):H((n(),o("input",{key:0,class:"",name:g,placeholder:"","onUpdate:modelValue":r=>s.value.order[c]=r},null,8,pt)),[[X,s.value.order[c]]])])):p("",!0)],64))),128))]),t("div",bt,[gt,(n(!0),o(j,null,B(s.value.order,(g,c)=>(n(),o(j,{key:c},[E.includes(c)?(n(),o("div",yt,[t("label",{for:g},i(I(K)[c]),9,_t),["CountryCode","DCountryCode","DeliveryID","Notes"].includes(c)?["DCountryCode","CountryCode"].includes(c)?H((n(),o("select",{key:1,"onUpdate:modelValue":r=>s.value.order[c]=r},[(n(!0),o(j,null,B(C.value,r=>(n(),o("option",{value:r.CountryID},i(r.Name),9,St))),256))],8,Pt)),[[J,s.value.order[c]]]):["DeliveryID"].includes(c)?H((n(),o("select",{key:2,"onUpdate:modelValue":r=>s.value.order[c]=r},[(n(!0),o(j,null,B(U.value,r=>(n(),o("option",{value:r.SettingID},i(r.Name),9,wt))),256))],8,It)),[[J,s.value.order[c]]]):p("",!0):H((n(),o("input",{key:0,class:"",name:g,placeholder:"","onUpdate:modelValue":r=>s.value.order[c]=r},null,8,Ct)),[[X,s.value.order[c]]])])):p("",!0)],64))),128)),t("div",$t,[t("label",Ot,i(I(K).Notes),1),H(t("textarea",{style:{"min-width":"300px","min-height":"60px","line-height":"1"},placeholder:"Add notes here if you want them to show for dispensers and customer support","onUpdate:modelValue":A[1]||(A[1]=g=>s.value.order.Notes=g),class:"form-control tBoxSize02"},null,512),[[X,s.value.order.Notes]])])]),t("div",Et,[s.value.ups!=null?(n(),o("h3",kt,"UPS Access Point")):p("",!0),(n(!0),o(j,null,B(s.value.ups,(g,c)=>(n(),o("div",{class:"form-group",key:c},[t("label",{for:g},i(I(K)[c]),9,Ut),["CountryCode","DCountryCode"].includes(c)?["DCountryCode","CountryCode"].includes(c)?H((n(),o("select",{key:1,"onUpdate:modelValue":r=>s.value.ups[c]=r},[(n(!0),o(j,null,B(C.value,r=>(n(),o("option",{value:r.CountryID},i(r.Name),9,Rt))),256))],8,At)),[[J,s.value.ups[c]]]):p("",!0):H((n(),o("input",{key:0,class:"",name:g,placeholder:"","onUpdate:modelValue":r=>s.value.ups[c]=r},null,8,xt)),[[X,s.value.ups[c]]])]))),128))])],32)):p("",!0)]),_:1}),S(O,{name:"fade"},{default:$(()=>[(Object.keys(T.value).length>0||Object.keys(_.value).length>0)&&!N.value?(n(),o("div",jt,[Tt,S(Ge,{"old-object":L.value,"new-object":T.value,"old-object-u-p-s":e.value,"new-object-u-p-s":_.value,"countries-prop":C.value,"companies-prop":U.value},null,8,["old-object","new-object","old-object-u-p-s","new-object-u-p-s","countries-prop","companies-prop"])])):p("",!0)]),_:1}),S(O,{name:"fade"},{default:$(()=>[N.value?p("",!0):(n(),o("div",Nt,[!I(F)(s.value.order,s.value.oldOrder)||!I(F)(s.value.ups,s.value.oldUPS)?(n(),o("button",{key:0,onClick:A[2]||(A[2]=g=>Z()),class:"btn btnSize01 tertiaryBtn bigButton big-square-button"},[b.value?(n(),o("span",Lt," Save ")):(n(),o("span",Bt," Review "))])):p("",!0),(!I(F)(s.value.order,s.value.oldOrder)||!I(F)(s.value.ups,s.value.oldUPS))&&b.value?(n(),o("button",{key:1,onClick:A[3]||(A[3]=g=>te()),class:"btn btnSize01 tertiaryBtn bigButton big-square-button"},Ht)):p("",!0),t("button",{onClick:A[4]||(A[4]=g=>w()),class:"btn btnSize01 secondaryBtn bigButton"},"Cancel")]))]),_:1}),N.value?(n(),o("div",zt,"Loading...")):p("",!0),t("span",{class:"close",onClick:A[5]||(A[5]=g=>w())},"X")])]))}},qt={class:"content"},Ft={class:"orderSearch flexContent"},Gt=t("h3",null,"Search order",-1),Qt={class:"formItemsGroup floatLeft flex mt-20"},Wt=t("button",{class:"btn btnSize02 tertiaryBtn",type:"submit"}," Search ",-1),Yt={key:0,class:"flexContent"},Kt=t("h2",null,"Order Details",-1),Zt={class:"orderDetails"},Jt=["src"],Xt=t("span",null,"Order #: ",-1),en=t("span",null,"Name: ",-1),tn=t("span",null,"Surname: ",-1),nn=t("span",null,"Status: ",-1),on={key:0},an=t("span",null,"Tracking Code: ",-1),ln={key:1},sn=t("span",null,"Commercial value: ",-1),rn=["href"],un={key:0,title:"Download Documentation",class:"btn btnSize02 tertiaryBtn",type:"button"},dn=t("i",{class:"fa fa-file"},null,-1),cn=[dn],vn={key:0,class:"flexContent"},pn={key:0,class:"flexContent flex-direction-column"},mn={key:0,style:{float:"none",background:"#f7941d4f",width:"100%",padding:"5px","text-align":"center","font-weight":"700!important",border:"3px solid #d291007d","margin-bottom":"20px","font-size":"20px"}},hn=["src"],fn={key:0,class:"flexContent flex-direction-row"},Dn={style:{width:"100%",display:"flex","justify-content":"center","align-items":"center"}},bn={key:0,style:{display:"flex","justify-content":"center","align-items":"center"}},gn=["disabled"],yn={key:0,class:"loader",style:{}},_n={key:1},Cn=["disabled"],Pn=["disabled"],Sn={key:1},In={key:0},wn={class:"infoBox warning"},$n={key:0},On=t("div",{class:"infoBox warning"},[t("p",null," THIS ORDER HAS NO COMMERCIAL VALUE. PLEASE SET VALUE BY CLICKING EDIT. ")],-1),En=[On],kn={key:0},Un=t("div",{class:"infoBox warning"},[t("p",null," ORDER VALUE GREATER THAN 270 AND WILL REQUIRE CN23 FORM. USE ROYAL MAIL APP FOR SHIPPING. ")],-1),xn=[Un],An={key:0},Rn=t("div",{class:"infoBox warning"},[t("p",null," THIS ORDER IS NOT READY TO BE SHIPPED. PLEASE SPEAK TO A DISPENSING TEAM MEMBER ")],-1),jn=[Rn],Tn={key:1},Nn={class:"infoBox warning"},Bn={key:0,class:"activity"},Ln=t("h5",{class:"activity-log-header"},"Activities on this order",-1),Vn={class:"activity-action"},Hn={class:"activity-footer"},zn={key:1,class:"activity"},Mn=t("ul",{class:"activity-log-wrapper"},[t("li",{class:"activity-log-item"}," No activity log found ")],-1),qn=[Mn],Gn={__name:"Order",setup(l){const P=De(),m=y(P.params.id),D=y([]),E=appInfo,h=y(""),U=y(!1),T=y(!1);y("");const _=y(!1),L=y(!1),e=y(null),C=y(!1),s=userInfo;ae(()=>{z()});const N=V(()=>e.value!=null?e.value.DeliveryID=="10"?"/shipment-validation/"+e.value.PrescriptionID:e.value.DeliveryID=="7"?"/api/ups/shipment-validation/"+e.value.PrescriptionID:e.value.DeliveryID=="4"?"/api/dpd/shipment-validation/"+e.value.PrescriptionID:e.value.DeliveryID=="5"?`/api/rmail/shipment-validation/${e.value.PrescriptionID}`:!1:!1),b=V(()=>e.value.DeliveryID!="10"),w=V(()=>e.value.Repeats!="0"&&e.value.Repeats!=""&&[143,162,205,243].includes(e.value.DCountryCode)),x=V(()=>e.value.Repeats!="0"&&e.value.Repeats!=""&&[143].includes(e.value.DCountryCode)),a=V(()=>e.value.PaymentMethod!="0"),q=V(()=>e.value.PaymentMethod!="0"),F=V(()=>e.value!=null?e.value.DeliveryID=="10"?"/api/dhl/label/"+e.value.PrescriptionID:e.value.DeliveryID=="7"?a.value?"/api/ups/gif/"+e.value.PrescriptionID:"/api/ups/label/"+e.value.PrescriptionID:e.value.DeliveryID=="4"?"/api/dpd/label/"+e.value.PrescriptionID:e.value.DeliveryID=="5"?"/api/rmail/label/"+e.value.PrescriptionID:!1:!1),Z=u=>{if(E.label_reset_without_admin){let d={1:"System unresponsive",2:"Damaged label",3:"Label applied incorrectly"};Swal.fire({text:"Why is this label being reprinted?",input:"select",inputOptions:d,inputPlaceholder:"Select a reason",confirmButtonText:"Resend",showCancelButton:!0,inputValidator:v=>new Promise(R=>{v==="1"||v==="2"||v==="3"?R():R("Reason invalid")})}).then(v=>{v.value?(u(),axios.post("/log-reprint",{orderID:h.value,reason:d[v.value],code:"Not Required"}).then(R=>{console.log(R)}).catch(R=>{console.log(R)})):r()})}else Swal.fire({text:"Scan authorization code",input:"text",inputValue:"",inputClass:"key",inputAttributes:{autocomplete:"off",type:"hidden"},showCancelButton:!0,inputValidator:d=>new Promise(v=>{v!=""?axios.post("/resend-authorization",{code:d}).then(R=>{v()}).catch(R=>{v("The authorization code is incorrect")}):v("The authorization code can not be empty")})}).then(d=>{if(typeof d.value<"u"&&d.value!=""){let v={1:"System unresponsive",2:"Damaged label",3:"Label applied incorrectly"},R=d.value;Swal.fire({text:"Why is this label being reprinted?",input:"select",inputOptions:v,inputPlaceholder:"Select a reason",confirmButtonText:"Resend",showCancelButton:!0,inputValidator:Q=>new Promise(W=>{Q==="1"||Q==="2"||Q==="3"?W():W("Reason invalid")})}).then(Q=>{Q.value?(u(),axios.post("/log-reprint",{orderID:h.value,reason:v[Q.value],code:R}).then(W=>{console.log(W)}).catch(W=>{console.log(W)})):r()})}else r()})},G=()=>{g(()=>{te&&(C.value=!0,axios.get(te).then(u=>{if(e.value.Printed)Z(()=>{let d=e.value.DeliveryID=="7"?"xml":"csv";ie(u.data,d),e.value.Printed=!0,C.value=!1,r()});else{let d=e.value.DeliveryID=="7"?"xml":"csv";ie(u.data,d),e.value.Printed=!0,C.value=!1}M()}).catch(u=>{ee(u.response.data.message),C.value=!1,r(),M()}))})},te=V(()=>e.value!=null?e.value.DeliveryID=="10"?"/api/dhl/manual/"+e.value.PrescriptionID:e.value.DeliveryID=="7"?"/api/ups/manual/"+e.value.PrescriptionID:e.value.DeliveryID=="3"?"/api/tnt/manual/"+e.value.PrescriptionID:e.value.DeliveryID=="4"?"/api/dpd/manual/"+e.value.PrescriptionID:e.value.DeliveryID=="5"?"/api/rmail/manual/"+e.value.PrescriptionID:!1:!1),f=V(()=>e.value.Printed?"Manual Re-print":"Manual Print"),A=()=>{axios.get(`/order/${h.value}/check-document`).then(u=>{T.value=u.data.data}).catch(u=>{se(u.response.data.message)})},g=u=>{u()},c=u=>{U.value=!U.value},r=()=>{setTimeout(()=>{document.getElementById("orderID").focus()},300)},M=()=>{L.value=!0,axios.get("/order/"+h.value+"/activity").then(u=>{D.value=u.data.data,L.value=!1}).catch(u=>{ee(u.response.data.message),L.value=!1})},ve=(u=!1)=>{Z(()=>{C.value=!0,a.value?re(`${window.location.origin}/api/ups/gif/${h.value}?token=${s.token}`,()=>{}):ue(F.value,b.value),x.value&&ne(`${window.location.origin}/token/ups/invoice/${h.value}?token=${s.token}`),z(h.value),C.value=!1,r()})},le=()=>{axios.post(`/api/dhl/${h.value}/resend-pdf`).then(u=>{z(),M()}).catch(u=>{ee(u.response.data.message)})},pe=()=>{g(()=>{C.value=!0,N.value&&axios.get(N.value).then(u=>{u.data.data.paper_invoice&&ne(`${window.location.origin}/token/ups/invoice/${h.value}?token=${s.token}`),u.data.data.gif?re(`${window.location.origin}/api/ups/gif/${h.value}?token=${s.token}`,()=>{}):u.data.data.rml_api?ne(`${window.location.origin}/token/rml/label/${h.value}?token=${s.token}`):ue(F.value,!0),u.data.data.resend&&(Ce("Prescription PDF not sent to DHL! Trying to resend."),le()),m.value=h.value,z(),C.value=!1,r(),M()}).catch(u=>{Pe(u.response.data.message),z(),C.value=!1,r(),M()})})},me=()=>{axios.get("/reset-order/"+h.value).then(u=>{z(h.value),M()}).catch(u=>{console.warn(u),M()})},z=()=>{m.value!=""&&(h.value=m.value,m.value=""),M(),_.value=!0,axios.get("/order/"+h.value).then(u=>{e.value=u.data.data,A(),_.value=!1}).catch(u=>{e.value=null,se(u.response.data.message),_.value=!1}),P.params.id!=h.value&&be.push({params:{id:h.value}})};return ge(()=>P.params.id,()=>{typeof P.params.id<"u"&&h.value!=P.params.id&&(m.value=P.params.id,z())}),(u,d)=>(n(),o("div",null,[t("div",qt,[t("section",null,[t("div",Ft,[Gt,t("form",{onSubmit:de(z,["prevent"]),autocomplete:"on"},[t("div",Qt,[H(t("input",{required:"","onUpdate:modelValue":d[0]||(d[0]=v=>m.value=v),class:"tBox tBoxSize02",type:"text",id:"orderID",placeholder:"Order No"},null,512),[[X,m.value]]),Wt])],32)])]),S(O,{name:"fade"},{default:$(()=>[!_.value&&e.value!=null?(n(),o("section",Yt,[Kt,t("div",Zt,[t("img",{src:I(ce)},null,8,Jt),t("ul",null,[t("li",null,[Xt,k(i(e.value.PrescriptionID),1)]),t("li",null,[en,k(i(e.value.Name),1)]),t("li",null,[tn,k(i(e.value.Surname),1)]),t("li",null,[nn,k(i(I(oe)[e.value.Status]),1)]),e.value.TrackingCode!=""&&e.value.TrackingCode!=null?(n(),o("li",on,[an,k(i(e.value.TrackingCode),1)])):p("",!0),e.value.Repeats!="0"&&e.value.Repeats!=""&&[143,162,205,243].includes(e.value.DCountryCode)?(n(),o("li",ln,[sn,k(i(e.value.Repeats),1)])):p("",!0),t("li",null,[t("button",{onClick:d[1]||(d[1]=v=>c(e.value)),class:"btn btnSize02 tertiaryBtn",type:"button"}," Edit Address "),S(O,{name:"fade"},{default:$(()=>[t("a",{href:`/order/${h.value}/download-document`,target:"_blank"},[T.value?(n(),o("button",un,cn)):p("",!0)],8,rn)]),_:1})])])])])):p("",!0)]),_:1}),S(O,{name:"fade"},{default:$(()=>[!_.value&&e.value==null?(n(),o("section",vn," Loading ")):p("",!0)]),_:1}),S(O,{name:"fade"},{default:$(()=>[!_.value&&e.value!=null?(n(),o("section",pn,[e.value.DeliveryID==4&&e.value.SaturdayDelivery==1?(n(),o("div",mn," DPD Saturday Delivery ")):p("",!0),t("img",{style:{height:"50px"},src:I(Se)[e.value.DeliveryID]},null,8,hn)])):p("",!0)]),_:1}),S(O,{name:"fade"},{default:$(()=>[!_.value&&e.value!=null&&e.value.canPrintLabel&&[7,8].includes(e.value.Status)?(n(),o("section",fn,[t("div",Dn,[e.value.DeliveryID=="7"||e.value.DeliveryID=="10"||e.value.DeliveryID=="5"&&parseFloat(e.value.Repeats.split(/(\s+)/)[2])<=270||e.value.DeliveryID=="4"?(n(),o("div",bn,[(e.value.TrackingCode==""||e.value.TrackingCode==null)&&!q.value&&e.value.CanDecomission?(n(),o("button",{key:0,onClick:d[2]||(d[2]=v=>pe()),disabled:C.value||e.value.DeliveryID=="7",class:"btn btnSize01 tertiaryBtn bigButton mr-10 big-round-button",type:"submit"},[C.value?(n(),o("div",yn,"Loading...")):(n(),o("span",_n,"Request Label"))],8,gn)):!q.value&&e.value.CanDecomission?(n(),o("button",{key:1,onClick:d[3]||(d[3]=v=>ve(!0)),disabled:C.value,class:"btn btnSize01 tertiaryBtn bigButton big-round-button",type:"submit"}," Reprint Label ",8,Cn)):p("",!0),e.value.DeliveryID=="7"&&(q.value||x.value)?(n(),o("button",{key:2,onClick:d[4]||(d[4]=v=>G()),disabled:!0,class:"btn btnSize01 tertiaryBtn bigButton big-round-button",type:"submit"},i(f.value),1)):e.value.DeliveryID=="10"&&(q.value||x.value)?(n(),o("button",{key:3,onClick:d[5]||(d[5]=v=>G()),class:"btn btnSize01 tertiaryBtn bigButton big-round-button",type:"submit"},i(f.value),1)):e.value.DeliveryID=="7"&&w.value&&!x.value?(n(),o("button",{key:4,onClick:d[6]||(d[6]=v=>G()),disabled:!0,class:"btn btnSize01 tertiaryBtn",type:"submit"},i(f.value),1)):p("",!0),!q.value&&e.value.TrackingCode!=""&&e.value.TrackingCode!=null&&(I(s).role>=60||I(E).label_reset_without_admin)?(n(),o("button",{key:5,onClick:d[7]||(d[7]=v=>me()),disabled:C.value,class:"btn btnSize01 tertiaryBtn bigButton",type:"submit"}," Reset Label ",8,Pn)):p("",!0)])):(n(),o("div",Sn,[t("button",{onClick:d[8]||(d[8]=v=>G()),class:"btn btnSize01 tertiaryBtn bigButton big-round-button",type:"submit"},i(f.value),1)]))])])):p("",!0)]),_:1}),S(O,{name:"fade"},{default:$(()=>[!_.value&&e.value==null?(n(),o("section",In,[t("div",wn,[t("p",null,"Order with number "+i(h.value)+" was not found!",1)])])):p("",!0)]),_:1}),S(O,{name:"fade"},{default:$(()=>[!_.value&&e.value!=null&&(e.value.Repeats=="0"||e.value.Repeats=="")&&[143,162,205,243].includes(e.value.DCountryCode)?(n(),o("section",$n,En)):p("",!0)]),_:1}),S(O,{name:"fade"},{default:$(()=>[!_.value&&e.value!=null&&e.value.DeliveryID=="5"&&parseFloat(e.value.Repeats.split(/(\s+)/)[2])>270?(n(),o("section",kn,xn)):p("",!0)]),_:1}),S(O,{name:"fade"},{default:$(()=>{var v,R;return[!_.value&&e.value!=null&&!e.value.CanDecomission?(n(),o("section",An,jn)):!_.value&&![7,8].includes((v=e.value)==null?void 0:v.Status)?(n(),o("section",Tn,[t("div",Nn,[t("p",null,[k(" THIS ORDER IS NOT READY TO BE SHIPPED. THE ORDER STATUS IS "),t("b",null,i(I(oe)[(R=e.value)==null?void 0:R.Status]),1),k(". PLEASE SPEAK TO A PHARMACY TEAM MEMBER ")])])])):p("",!0)]}),_:1}),S(O,{name:"fade"},{default:$(()=>[D.value.length>0&&!L.value&&!_.value?(n(),o("section",Bn,[Ln,S(ye,{name:"slide-down",tag:"ul",class:"activity-log-wrapper",style:{"margin-top":"0px!important"}},{default:$(()=>[(n(!0),o(j,null,B(D.value,v=>(n(),o("li",{class:"activity-log-item",key:v.ActivityID},[t("div",Vn,[k(i(v.Action)+" ",1),v.Action=="DHL request label - PDF issue"&&v.Status==1?(n(),o("button",{key:0,style:{background:"red",border:"1px solid red"},class:"btn btnSize02 tertiaryBtn",onClick:d[9]||(d[9]=R=>le())}," Resend PDF ")):p("",!0)]),t("div",Hn,[t("span",null,i(v.Name),1),t("span",null,i(v.Date),1)])]))),128))]),_:1})])):!L.value&&!_.value?(n(),o("section",zn,qn)):p("",!0)]),_:1}),S(O,{name:"fade"},{default:$(()=>[U.value?(n(),_e(Mt,{key:0,onCloseorder:d[10]||(d[10]=v=>U.value=!U.value),products:w.value?e.value.Products:[],orderID:h.value,orderStatus:I(oe)[e.value.Status],onOrderupdate:d[11]||(d[11]=v=>z())},null,8,["products","orderID","orderStatus"])):p("",!0)]),_:1})])]))}};export{Gn as default};
