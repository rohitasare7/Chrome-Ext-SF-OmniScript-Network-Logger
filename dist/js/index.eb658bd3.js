(function(){"use strict";var e={6095:function(e,t,r){var o=r(5130),a=r(6768);function n(e,t,r,o,n,l){const s=(0,a.g2)("AppIndex");return(0,a.uX)(),(0,a.Wv)(s)}r(4114);var l=r(4232),s=r(144);const u=["type"];var i={__name:"SVGIconButton",props:{type:{type:String,default:"button"},icon:{type:String,default:""},color:{type:String,default:""},isSquare:{type:Boolean,default:!1}},setup(e){return(t,r)=>((0,a.uX)(),(0,a.CE)("button",{type:e.type,class:(0,l.C4)(["inline-flex items-center p-1 border shadow-md rounded-full font-semibold text-xs focus:outline-none disabled:opacity-25 transition ease-in-out duration-300",{"bg-rose-700 hover:bg-rose-600 border-rose-800 dark:bg-rose-100 dark:hover:bg-rose-200 dark:border-rose-300/50 ":"red"==e.color,"bg-green-100 hover:bg-green-200 border-green-300 dark:bg-green-700 dark:hover:bg-green-600 dark:border-green-900 ":"green"==e.color,"bg-blue-700 hover:bg-blue-600 border-blue-800 dark:bg-blue-100 dark:hover:bg-blue-200 dark:border-blue-300/50 ":"blue"==e.color,"bg-gray-100 hover:bg-gray-200 border-gray-300 dark:bg-zinc-600 dark:hover:bg-zinc-500 dark:border-gray-800 ":"gray"==e.color,"!rounded-md":e.isSquare}])},[((0,a.uX)(),(0,a.Wv)((0,a.$y)(e.icon),{class:(0,l.C4)(["w-4 h-4 stroke-2 transition duration-75",{"fill-red-100 hover:fill-red-200 dark:fill-red-800 text-red-100 dark:text-red-700":"red"==e.color,"fill-green-700 hover:fill-green-800 dark:fill-green-100 text-green-100 dark:text-green-700":"green"==e.color,"fill-blue-700 hover:fill-blue-800 dark:fill-blue-100 text-blue-100 dark:text-blue-700":"blue"==e.color,"fill-gray-600 hover:fill-gray-700 dark:fill-gray-100 text-gray-100 dark:text-gray-700":"gray"==e.color}])},null,8,["class"])),(0,a.RG)(t.$slots,"default")],10,u))}};const d=i;var c=d;const p={xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"};function g(e,t){return(0,a.uX)(),(0,a.CE)("svg",p,t[0]||(t[0]=[(0,a.Lk)("path",{fill:"currentColor",d:"M7 21q-.825 0-1.412-.587T5 19V6q-.425 0-.712-.288T4 5t.288-.712T5 4h4q0-.425.288-.712T10 3h4q.425 0 .713.288T15 4h4q.425 0 .713.288T20 5t-.288.713T19 6v13q0 .825-.587 1.413T17 21zm5-7.1l1.9 1.9q.275.275.7.275t.7-.275t.275-.7t-.275-.7l-1.9-1.9l1.9-1.9q.275-.275.275-.7t-.275-.7t-.7-.275t-.7.275L12 11.1l-1.9-1.9q-.275-.275-.7-.275t-.7.275t-.275.7t.275.7l1.9 1.9l-1.9 1.9q-.275.275-.275.7t.275.7t.7.275t.7-.275z"},null,-1)]))}var v=r(1241);const b={},m=(0,v.A)(b,[["render",g]]);var f=m;const y={class:"block font-semibold text-gray-700 dark:text-gray-300 text-sm"},h={key:0},k={key:1};var R={__name:"InputLabel",props:{value:String},setup(e){return(t,r)=>((0,a.uX)(),(0,a.CE)("label",y,[(0,a.eW)((0,l.v_)(e.value)+" ",1),e.value?((0,a.uX)(),(0,a.CE)("span",h)):((0,a.uX)(),(0,a.CE)("span",k,[(0,a.RG)(t.$slots,"default")]))]))}};const x=R;var N=x;const T=["value"];var C={__name:"TextInput",props:{modelValue:String},emits:["update:modelValue"],setup(e,{expose:t}){const r=(0,s.KR)(null);return(0,a.sV)((()=>{r.value.hasAttribute("autofocus")&&r.value.focus()})),t({focus:()=>r.value.focus()}),(t,o)=>((0,a.uX)(),(0,a.CE)("input",{ref_key:"input",ref:r,class:"text-base border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm py-1 px-2 border outline-indigo-500 dark:outline-none",value:e.modelValue,onInput:o[0]||(o[0]=e=>t.$emit("update:modelValue",e.target.value))},null,40,T))}};const w=C;var A=w;const E={xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"};function O(e,t){return(0,a.uX)(),(0,a.CE)("svg",E,t[0]||(t[0]=[(0,a.Lk)("path",{fill:"currentColor",d:"M9 18q-.825 0-1.412-.587T7 16V4q0-.825.588-1.412T9 2h9q.825 0 1.413.588T20 4v12q0 .825-.587 1.413T18 18zm0-2h9V4H9zm-4 6q-.825 0-1.412-.587T3 20V7q0-.425.288-.712T4 6t.713.288T5 7v13h10q.425 0 .713.288T16 21t-.288.713T15 22zm4-6V4z"},null,-1)]))}const I={},_=(0,v.A)(I,[["render",O]]);var V=_;const P={class:"relative inline-block"},S={key:0,class:"absolute top-0 right-8 w-44 ml-2 px-2 py-1 bg-green-200 border border-green-500/20 text-green-800 text-sm rounded-lg transition-opacity duration-1000 ease-out opacity-100 hover:opacity-0"};var L={__name:"CopyButton",props:["copyValue"],setup(e){const t=e,r=(0,s.KR)(!1),o=()=>{const e=document.createElement("textarea");e.value=t.copyValue,document.body.appendChild(e),e.select(),e.setSelectionRange(0,e.value.length);try{document.execCommand("copy"),r.value=!0,setTimeout((()=>{r.value=!1}),3e3)}catch(o){console.error("Failed to copy text:",o)}document.body.removeChild(e)};return(e,t)=>((0,a.uX)(),(0,a.CE)("div",P,[r.value?((0,a.uX)(),(0,a.CE)("div",S," Content Copied! ")):(0,a.Q3)("",!0),(0,a.bF)(c,{icon:V,isSquare:!1,color:"blue",onClick:o,title:"Copy to Clipboard"},{default:(0,a.k6)((()=>[(0,a.RG)(e.$slots,"default")])),_:3})]))}};const q=L;var D=q;r(4603),r(7566),r(8721);const M="Data Raptor",F="Integration Procedure",X="Remote Action",J="Matrix Action",U="HTTP Action",z="FlexRuntime",W=[M,F,X,J,U,z],B={INTEGRATION_PROCEDURE:F,REMOTE_ACTION:X,DATA_RAPTOR:M,FLEXCARD:z,HTTP_ACTION:U},j={EXTRACT:"Extract",LOAD:"Load",TRANSFORM:"Transform",TURBO_EXTRACT:"Turbo Extract"},K=e=>{try{return"string"===typeof e?JSON.parse(e):e}catch(t){return console.error("JSON Parse Error:",t),{}}},G=e=>{try{const t=e?.request?.postData?.text||null;if(!t)return null;const r=$(t);return H(r)}catch(t){return console.error("Error extracting request details:",t),{input:"Error parsing request",sClassName:"N/A",sMethodName:"N/A"}}},$=e=>{try{const t=new URLSearchParams(decodeURIComponent(e)),r=t.get("message");return r?JSON?.parse(r):null}catch(t){return console.error("Error parsing message node:",t),console.log("Mostly if message item is not JSON then you can expect this, can be ignored."),null}},H=e=>{if(!e||!e.actions?.length)return{input:"N/A",sClassName:"N/A",sMethodName:"N/A"};const t=e.actions[0],r=(t.params,ee(t));console.log("data --\x3e "+JSON.stringify(r)),console.log("data.inputs --\x3e "+JSON.stringify(r.inputs));const o=JSON.stringify(r.inputs,null,4),a=JSON.stringify(r.options,null,4);return{input:o||"N/A",options:a||"N/A",sClassName:r.className||"N/A",sMethodName:r.methodName||"N/A"}},Y=(e,t)=>{try{const r=JSON.parse(e),o=r.actions||[];if(!o.length)return{IPResult:"No IPResult found",error:"No error"};const a=o[0].returnValue||{},n=a.returnValue?JSON.parse(a.returnValue):{},l=te(n,t);return console.log("actionStr --\x3e "+t),console.log("parsedReturnValue --\x3e "+JSON.stringify(n)),console.log("new resp --\x3e "+JSON.stringify(l)),{IPResult:JSON.stringify(l||"No IPResult found",null,2),error:n.error||"No error"}}catch(r){return console.error("Error parsing response body:",r),{IPResult:"Error parsing response body",error:"No error"}}},Q=e=>{switch(e){case"invokeOutboundDR":return j.EXTRACT;case"invokeInboundDR":return j.LOAD;case"invokeDRTransform":return j.TRANSFORM;case"invokeTurboExtractAction":return j.TURBO_EXTRACT;default:return"Unknown DR Type"}},Z=e=>{const t=e?.params||{},r=t?.params||{},o=K(r?.options||"{}"),a=o?.vlcClass||"",n=t?.classname||"";return"FlexRuntime"===n?B.FLEXCARD:a.includes("DefaultDROmniScriptIntegration")||a.includes("vlocity_cmt.DefaultDROmniScriptIntegration")?B.DATA_RAPTOR:a.includes("IntegrationProcedureService")?B.INTEGRATION_PROCEDURE:a&&!a.includes("vlocity_cmt")?B.REMOTE_ACTION:a.includes("DefaultOmniscriptApexRestService")?B.HTTP_ACTION:"Unknown"},ee=e=>{const t=e?.params||{},r=t?.params||{},o=Z(e);console.log("actionSource --\x3e "+o);let a={actionType:o,className:t.classname||"",methodName:t.method||r.sMethodName||"",inputs:{},options:{}};switch(a.className=o,o){case B.DATA_RAPTOR:{const e=K(r.input);a.drType=Q(r.sMethodName),a.methodName=e?.Bundle||e?.bundleName,a.inputs=e?.DRParams||e?.objectList||{},a.options=K(r.options);break}case B.FLEXCARD:{const e=K(r.dataSourceMap||"{}");console.log("dsMap.type --\x3e "+e.type),"IntegrationProcedures"===e.type&&(a.className=B.INTEGRATION_PROCEDURE,a.methodName=e.value.ipMethod,a.inputs=K(e.value.inputMap),a.options=K(e.value.optionsMap),a.additional={vlocityAsync:e.value.vlocityAsync,dsDelay:e.value.dsDelay,resultVar:e.value.resultVar,orderBy:e.value.orderBy,contextVariables:e.value.contextVariables});break}case B.INTEGRATION_PROCEDURE:a.inputs=K(r.input),a.options=K(r.options),a.methodName=r.sMethodName;break;case B.REMOTE_ACTION:a.inputs=K(r.input),a.options=K(r.options),a.methodName=`${r.sClassName}.${r.sMethodName}`;break;default:a.inputs=K(r.input),a.options=K(r.options),a.methodName=r.sMethodName;break}return console.log("details --\x3e "+JSON.stringify(a)),a},te=(e,t)=>{let r={};switch(t){case B.DATA_RAPTOR:case B.REMOTE_ACTION:r=e;break;case B.INTEGRATION_PROCEDURE:r=e.IPResult;break;default:r=e;break}return r};var re=r(2663),oe=r(5643),ae=r(5242),ne=r(8814);const le={class:"h-screen flex flex-col dark:bg-gray-800"},se={class:"p-2 bg-gray-100 border-b dark:border-gray-700 flex space-x-4 items-center dark:bg-gray-800"},ue=["value"],ie={key:0,class:"flex flex-grow overflow-hidden dark:bg-gray-800"},de={class:"w-1/4 border-r dark:border-gray-700 bg-gray-50 overflow-auto dark:bg-gray-800"},ce={class:"p-4 space-y-2"},pe=["onClick"],ge={key:0,class:"w-3/4 p-4 overflow-auto"},ve={class:"flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4 mt-2"},be={class:"w-full mr-3 lg:w-1/2"},me={class:"flex justify-between"},fe={class:"dark:border dark:border-gray-600 rounded-md mt-2"},ye={class:"w-full mr-3 lg:w-1/2"},he={class:"flex justify-between"},ke={class:"dark:border dark:border-gray-600 rounded-md mt-2"},Re={class:"mt-4"},xe={class:"flex justify-between"},Ne={class:"dark:border dark:border-gray-600 rounded-md mt-2"},Te={key:1,class:"p-4 space-y-2"};var Ce={__name:"AppIndex",setup(e){const t=[(0,oe.Pq)(),ae.bM,ne.Lz.lineWrapping],r=(0,s.IJ)(),n=e=>{r.value=e.view},u=(0,s.KR)(!1),i=(0,s.KR)([]),d=(0,s.KR)({input:"No Input",IPResult:"No IPResult"});(0,a.wB)(i,(e=>{1===e.length&&v(e[0].id)}),{deep:!0});const p=(0,s.KR)(null),g=e=>{try{const t=G(e);if(console.log("extractedRequestValues --\x3e "+JSON.stringify(t)),!t)return;const r=W.some((e=>t.sClassName.includes(e)));if(console.log("isAllowedAction --\x3e "+r),r){const r=i.value.length;i.value.push({id:r,details:{...t,extractedResponseValues:{}},rawRequest:e})}}catch(t){alert(JSON.stringify(t))}},v=e=>{p.value=e;const t=i.value.find((t=>t.id===e));if(t)try{t.rawRequest.getContent((e=>{if(e){const r=Y(e,t.details.sClassName);u.value=!0,d.value={input:t.details.input||"No Input",IPResult:r.IPResult||"No IPResult",options:t.details.options||"No IPResult",elementName:t.details.sMethodName}}}))}catch(r){d.value={input:"Error loading details",IPResult:r.message||"No IPResult"}}},b=(0,s.KR)(""),m=(0,s.KR)("All"),y=(0,a.EW)((()=>i.value.filter((e=>{const t=e.details.sClassName.toLowerCase().includes(b.value.toLowerCase())||e.details.sMethodName.toLowerCase().includes(b.value.toLowerCase()),r="All"===m.value||e.details.sClassName===m.value;return t&&r})))),h=()=>{u.value=!1,i.value=[],d.value={input:"No Input",IPResult:"No IPResult"}};return chrome.devtools.network.onRequestFinished.addListener(g),(e,r)=>((0,a.uX)(),(0,a.CE)("div",le,[(0,a.Lk)("div",se,[(0,a.bF)(A,{modelValue:b.value,"onUpdate:modelValue":r[0]||(r[0]=e=>b.value=e),placeholder:"Search by Action or Element",class:"text-xs w-48 !py-1.5 text-gray-700 ml-2"},null,8,["modelValue"]),(0,a.bo)((0,a.Lk)("select",{"onUpdate:modelValue":r[1]||(r[1]=e=>m.value=e),class:"text-xs py-1.5 px-2 block w-48 text-gray-700 border border-gray-300 shadow-sm rounded-md focus:border-indigo-500 focus:ring-indigo-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-900 dark:border-gray-700 dark:text-gray-400 dark:placeholder-gray-500 dark:focus:ring-gray-600 outline-indigo-500 dark:outline-none"},[r[5]||(r[5]=(0,a.Lk)("option",{value:"All"},"All Actions",-1)),((0,a.uX)(!0),(0,a.CE)(a.FK,null,(0,a.pI)([...new Set(i.value.map((e=>e.details.sClassName)))],(e=>((0,a.uX)(),(0,a.CE)("option",{key:e,value:e},(0,l.v_)(e),9,ue)))),128))],512),[[o.u1,m.value]]),(0,a.bF)(c,{onClick:h,icon:f,isSquare:!1,color:"red",title:"Clear All Requests",class:"mr-2"})]),i.value.length>0?((0,a.uX)(),(0,a.CE)("div",ie,[(0,a.Lk)("div",de,[(0,a.Lk)("ul",ce,[((0,a.uX)(!0),(0,a.CE)(a.FK,null,(0,a.pI)(y.value,(e=>((0,a.uX)(),(0,a.CE)("li",{key:e.id,class:(0,l.C4)(["p-2 border rounded-md cursor-pointer text-gray-800 dark:text-gray-400 dark:border-gray-700",{"bg-blue-700 text-white dark:bg-gray-900 dark:border-gray-700 shadow-xl":p.value===e.id,"bg-white dark:bg-gray-700 dark:border-gray-600 shadow-sm":p.value!=e.id}]),onClick:t=>v(e.id)},[(0,a.eW)(" Action : "+(0,l.v_)(e.details.sClassName||"N/A")+" ",1),r[6]||(r[6]=(0,a.Lk)("br",null,null,-1)),(0,a.eW)(" Element : "+(0,l.v_)(e.details.sMethodName||"N/A"),1)],10,pe)))),128))])]),u.value?((0,a.uX)(),(0,a.CE)("div",ge,[(0,a.bF)(N,null,{default:(0,a.k6)((()=>[(0,a.eW)("Element : "+(0,l.v_)(d.value.elementName),1)])),_:1}),(0,a.Lk)("div",ve,[(0,a.Lk)("div",be,[(0,a.Lk)("div",me,[(0,a.bF)(N,null,{default:(0,a.k6)((()=>r[7]||(r[7]=[(0,a.eW)("Input :")]))),_:1}),(0,a.bF)(D,{copyValue:d.value.input,class:"mr-2"},null,8,["copyValue"])]),(0,a.Lk)("div",fe,[(0,a.bF)((0,s.R1)(re.bE),{modelValue:d.value.input,"onUpdate:modelValue":r[2]||(r[2]=e=>d.value.input=e),placeholder:"Your data will appear here",style:{height:"100px",borderRadius:"5px",overflow:"hidden"},autofocus:!0,"indent-with-tab":!0,"tab-size":2,extensions:t,onReady:n},null,8,["modelValue"])])]),(0,a.Lk)("div",ye,[(0,a.Lk)("div",he,[(0,a.bF)(N,null,{default:(0,a.k6)((()=>r[8]||(r[8]=[(0,a.eW)("Output :")]))),_:1}),(0,a.bF)(D,{copyValue:d.value.IPResult,class:"mr-2"},null,8,["copyValue"])]),(0,a.Lk)("div",ke,[(0,a.bF)((0,s.R1)(re.bE),{modelValue:d.value.IPResult,"onUpdate:modelValue":r[3]||(r[3]=e=>d.value.IPResult=e),placeholder:"Your data will appear here",style:{height:"100px",borderRadius:"5px",overflow:"hidden"},autofocus:!0,"indent-with-tab":!0,"tab-size":2,extensions:t,onReady:n},null,8,["modelValue"])])])]),(0,a.Lk)("div",Re,[(0,a.Lk)("div",xe,[(0,a.bF)(N,null,{default:(0,a.k6)((()=>r[9]||(r[9]=[(0,a.eW)("Options :")]))),_:1}),(0,a.bF)(D,{copyValue:d.value.options,class:"mr-2"},null,8,["copyValue"])]),(0,a.Lk)("div",Ne,[(0,a.bF)((0,s.R1)(re.bE),{modelValue:d.value.options,"onUpdate:modelValue":r[4]||(r[4]=e=>d.value.options=e),placeholder:"Your data will appear here",style:{height:"100px",borderRadius:"5px",overflow:"hidden"},autofocus:!0,"indent-with-tab":!0,"tab-size":2,extensions:t,onReady:n},null,8,["modelValue"])])])])):(0,a.Q3)("",!0)])):((0,a.uX)(),(0,a.CE)("div",Te,[(0,a.bF)(N,null,{default:(0,a.k6)((()=>r[10]||(r[10]=[(0,a.eW)("No requests found.")]))),_:1})]))]))}};const we=Ce;var Ae=we,Ee={name:"App",components:{AppIndex:Ae}};const Oe=(0,v.A)(Ee,[["render",n]]);var Ie=Oe;(0,o.Ef)(Ie).mount("#app")}},t={};function r(o){var a=t[o];if(void 0!==a)return a.exports;var n=t[o]={exports:{}};return e[o].call(n.exports,n,n.exports,r),n.exports}r.m=e,function(){var e=[];r.O=function(t,o,a,n){if(!o){var l=1/0;for(d=0;d<e.length;d++){o=e[d][0],a=e[d][1],n=e[d][2];for(var s=!0,u=0;u<o.length;u++)(!1&n||l>=n)&&Object.keys(r.O).every((function(e){return r.O[e](o[u])}))?o.splice(u--,1):(s=!1,n<l&&(l=n));if(s){e.splice(d--,1);var i=a();void 0!==i&&(t=i)}}return t}n=n||0;for(var d=e.length;d>0&&e[d-1][2]>n;d--)e[d]=e[d-1];e[d]=[o,a,n]}}(),function(){r.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return r.d(t,{a:t}),t}}(),function(){r.d=function(e,t){for(var o in t)r.o(t,o)&&!r.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})}}(),function(){r.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){var e={57:0};r.O.j=function(t){return 0===e[t]};var t=function(t,o){var a,n,l=o[0],s=o[1],u=o[2],i=0;if(l.some((function(t){return 0!==e[t]}))){for(a in s)r.o(s,a)&&(r.m[a]=s[a]);if(u)var d=u(r)}for(t&&t(o);i<l.length;i++)n=l[i],r.o(e,n)&&e[n]&&e[n][0](),e[n]=0;return r.O(d)},o=self["webpackChunkmy_chrome_extension"]=self["webpackChunkmy_chrome_extension"]||[];o.forEach(t.bind(null,0)),o.push=t.bind(null,o.push.bind(o))}();var o=r.O(void 0,[504],(function(){return r(6095)}));o=r.O(o)})();
//# sourceMappingURL=index.eb658bd3.js.map