(function(){"use strict";var e={4864:function(e,t,a){var r=a(5130),o=a(6768);function s(e,t,a,r,s,n){const l=(0,o.g2)("MainApp");return(0,o.uX)(),(0,o.Wv)(l)}a(4114);var n=a(4232),l=a(144);const i=["type"];var u={__name:"SVGIconButton",props:{type:{type:String,default:"button"},icon:{type:String,default:""},color:{type:String,default:""},isSquare:{type:Boolean,default:!1}},setup(e){return(t,a)=>((0,o.uX)(),(0,o.CE)("button",{type:e.type,class:(0,n.C4)(["inline-flex items-center p-1 border shadow-md rounded-full font-semibold text-xs focus:outline-none disabled:opacity-25 transition ease-in-out duration-300",{"bg-rose-700 hover:bg-rose-600 border-rose-800/60 dark:bg-rose-100 dark:hover:bg-rose-200 dark:border-rose-300/50 ":"red"==e.color,"bg-green-100 hover:bg-green-200 border-green-300 dark:bg-green-700 dark:hover:bg-green-600 dark:border-green-900 ":"green"==e.color,"bg-blue-700 hover:bg-blue-600 border-blue-800/50 dark:bg-blue-100 dark:hover:bg-blue-200 dark:border-blue-300/50 ":"blue"==e.color,"bg-gray-100 hover:bg-gray-200 border-gray-300 dark:bg-zinc-600 dark:hover:bg-zinc-500 dark:border-gray-800 ":"gray"==e.color,"!rounded-md":e.isSquare}])},[((0,o.uX)(),(0,o.Wv)((0,o.$y)(e.icon),{class:(0,n.C4)(["w-5 h-5 stroke-2 transition duration-75",{"fill-red-100 hover:fill-red-200 dark:fill-red-800 text-red-100 dark:text-red-700":"red"==e.color,"fill-green-700 hover:fill-green-800 dark:fill-green-100 text-green-100 dark:text-green-700":"green"==e.color,"fill-blue-700 hover:fill-blue-800 dark:fill-blue-100 text-blue-100 dark:text-blue-700":"blue"==e.color,"fill-gray-600 hover:fill-gray-700 dark:fill-gray-100 text-gray-100 dark:text-gray-700":"gray"==e.color}])},null,8,["class"])),(0,o.RG)(t.$slots,"default")],10,i))}};const d=u;var c=d;const p={xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"};function m(e,t){return(0,o.uX)(),(0,o.CE)("svg",p,t[0]||(t[0]=[(0,o.Lk)("path",{fill:"currentColor",d:"M7 21q-.825 0-1.412-.587T5 19V6q-.425 0-.712-.288T4 5t.288-.712T5 4h4q0-.425.288-.712T10 3h4q.425 0 .713.288T15 4h4q.425 0 .713.288T20 5t-.288.713T19 6v13q0 .825-.587 1.413T17 21zm5-7.1l1.9 1.9q.275.275.7.275t.7-.275t.275-.7t-.275-.7l-1.9-1.9l1.9-1.9q.275-.275.275-.7t-.275-.7t-.7-.275t-.7.275L12 11.1l-1.9-1.9q-.275-.275-.7-.275t-.7.275t-.275.7t.275.7l1.9 1.9l-1.9 1.9q-.275.275-.275.7t.275.7t.7.275t.7-.275z"},null,-1)]))}var v=a(1241);const g={},f=(0,v.A)(g,[["render",m]]);var y=f;const b={class:"block font-semibold text-gray-700 dark:text-gray-300 text-sm"},h={key:0},k={key:1};var x={__name:"InputLabel",props:{value:String},setup(e){return(t,a)=>((0,o.uX)(),(0,o.CE)("label",b,[(0,o.eW)((0,n.v_)(e.value)+" ",1),e.value?((0,o.uX)(),(0,o.CE)("span",h)):((0,o.uX)(),(0,o.CE)("span",k,[(0,o.RG)(t.$slots,"default")]))]))}};const R=x;var w=R;const N=["value"];var C={__name:"TextInput",props:{modelValue:String},emits:["update:modelValue"],setup(e,{expose:t}){const a=(0,l.KR)(null);return(0,o.sV)((()=>{a.value.hasAttribute("autofocus")&&a.value.focus()})),t({focus:()=>a.value.focus()}),(t,r)=>((0,o.uX)(),(0,o.CE)("input",{ref_key:"input",ref:a,class:"text-base border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm py-1 px-2 border outline-indigo-500 dark:outline-none",value:e.modelValue,onInput:r[0]||(r[0]=e=>t.$emit("update:modelValue",e.target.value))},null,40,N))}};const _=C;var T=_;const E={xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"};function O(e,t){return(0,o.uX)(),(0,o.CE)("svg",E,t[0]||(t[0]=[(0,o.Lk)("path",{fill:"currentColor",d:"M9 18q-.825 0-1.412-.587T7 16V4q0-.825.588-1.412T9 2h9q.825 0 1.413.588T20 4v12q0 .825-.587 1.413T18 18zm0-2h9V4H9zm-4 6q-.825 0-1.412-.587T3 20V7q0-.425.288-.712T4 6t.713.288T5 7v13h10q.425 0 .713.288T16 21t-.288.713T15 22zm4-6V4z"},null,-1)]))}const A={},L=(0,v.A)(A,[["render",O]]);var S=L,I=(0,l.Kh)({items:[],add(e){this.items.unshift({key:Symbol(),...e})},remove(e){this.items.splice(e,1)}});const P=(e,t="Success")=>{I.add({message:{text:e,type:t}})},V={class:"relative inline-block"};var D={__name:"CopyButton",props:["copyValue"],setup(e){const t=e,a=()=>{const e=document.createElement("textarea");e.value=t.copyValue,document.body.appendChild(e),e.select(),e.setSelectionRange(0,e.value.length);try{document.execCommand("copy"),P("Content copied to clipboard.","Success")}catch(a){console.error("Failed to copy text:",a)}document.body.removeChild(e)};return(e,t)=>((0,o.uX)(),(0,o.CE)("div",V,[(0,o.bF)(S,{class:"cursor-pointer w-5 h-5 stroke-2 transition duration-300 fill-gray-400 hover:fill-gray-500 dark:fill-gray-300 text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400",onClick:a,title:"Copy to Clipboard"},{default:(0,o.k6)((()=>[(0,o.RG)(e.$slots,"default")])),_:3})]))}};const F=D;var M=F;const X={class:"flex items-center rounded-lg bg-white p-2 text-gray-500 shadow-2xl dark:bg-gray-900 dark:text-gray-400 border border-gray-100 dark:border-gray-700",role:"alert"},q={key:0,class:"inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200"},J={key:1,class:"inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200"},U={class:"ml-3 text-sm font-normal"};var j={__name:"ToastListItem",props:{message:Object,duration:{type:Number,default:2e3}},emits:["remove"],setup(e,{emit:t}){const a=e;(0,o.sV)((()=>{setTimeout((()=>r("remove")),a.duration)}));const r=t;return(e,t)=>((0,o.uX)(),(0,o.CE)("div",X,["Error"!=a.message.type?((0,o.uX)(),(0,o.CE)("div",q,t[1]||(t[1]=[(0,o.Lk)("svg",{class:"w-5 h-5","aria-hidden":"true",xmlns:"http://www.w3.org/2000/svg",fill:"currentColor",viewBox:"0 0 20 20"},[(0,o.Lk)("path",{d:"M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"})],-1),(0,o.Lk)("span",{class:"sr-only"},"Check icon",-1)]))):(0,o.Q3)("",!0),"Error"==a.message.type?((0,o.uX)(),(0,o.CE)("div",J,t[2]||(t[2]=[(0,o.Lk)("svg",{class:"w-5 h-5","aria-hidden":"true",xmlns:"http://www.w3.org/2000/svg",fill:"currentColor",viewBox:"0 0 20 20"},[(0,o.Lk)("path",{d:"M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z"})],-1),(0,o.Lk)("span",{class:"sr-only"},"Error icon",-1)]))):(0,o.Q3)("",!0),(0,o.Lk)("div",U,(0,n.v_)(a.message.text),1),(0,o.Lk)("button",{onClick:t[0]||(t[0]=e=>r("remove")),type:"button",class:"-mx-1 -my-1.5 ml-auto inline-flex h-8 w-8 rounded-lg bg-white p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-900 focus:ring-2 focus:ring-gray-300 dark:bg-gray-800 dark:text-gray-500 dark:hover:bg-gray-700 dark:hover:text-white","data-dismiss-target":"#toast-default","aria-label":"Close"},t[3]||(t[3]=[(0,o.Lk)("span",{class:"sr-only"},"Close",-1),(0,o.Lk)("svg",{"aria-hidden":"true",class:"h-5 w-5",fill:"currentColor",viewBox:"0 0 20 20",xmlns:"http://www.w3.org/2000/svg"},[(0,o.Lk)("path",{"fill-rule":"evenodd",d:"M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z","clip-rule":"evenodd"})],-1)]))]))}};const z=j;var K=z,B={__name:"ToastList",setup(e){function t(e){I.remove(e)}return(e,a)=>((0,o.uX)(),(0,o.Wv)(r.F,{tag:"div","enter-from-class":"translate-x-full opacity-0","enter-active-class":"transition-all duration-500","leave-active-class":"transition-all duration-500","leave-to-class":"translate-x-full opacity-0","move-class":"transform transition-all duration-500",class:"fixed top-4 right-4 z-90 w-full max-w-xs space-y-4 toastList"},{default:(0,o.k6)((()=>[((0,o.uX)(!0),(0,o.CE)(o.FK,null,(0,o.pI)((0,l.R1)(I).items,((e,a)=>((0,o.uX)(),(0,o.Wv)(K,{key:e.key,message:e.message,type:e.type,duration:5500,onRemove:e=>t(a),class:"transform transition-all duration-500"},null,8,["message","type","onRemove"])))),128))])),_:1}))}};const W=B;var G=W;a(4603),a(7566),a(8721);class ${static safeParseJSON(e){try{return"string"===typeof e?JSON.parse(e):e}catch(t){return console.error("JSON Parse Error:",t),{}}}static parseMessageNode(e){try{const t=new URLSearchParams(decodeURIComponent(e)),a=t.get("message");return a?JSON.parse(a):null}catch(t){return console.warn("Message parsing failed, likely not JSON format:",t),null}}static beautifyJSON(e){try{return JSON.stringify(e,null,4)}catch(t){return console.error("JSON beautification failed:",t),"N/A"}}}const H=["ApexAction.execute"],Q={DATA_RAPTOR:"Data Raptor",INTEGRATION_PROCEDURE:"Integration Procedure",REMOTE_ACTION:"Remote Action",MATRIX_ACTION:"Matrix Action",HTTP_ACTION:"HTTP Action",FLEXCARD:"FlexRuntime",FLEXCARD_RUNTIME:"FlexCardRuntime"},Z={EXTRACT:"Extract",LOAD:"Load",TRANSFORM:"Transform",TURBO_EXTRACT:"Turbo Extract"},Y={CLASSNAME_RULES:[{type:Q.FLEXCARD,matcher:e=>e===Q.FLEXCARD}],VLC_CLASS_RULES:[{type:Q.DATA_RAPTOR,matchers:["DefaultDROmniScriptIntegration","vlocity_cmt.DefaultDROmniScriptIntegration","omnistudiocore.DefaultDROmniScriptIntegration"]},{type:Q.INTEGRATION_PROCEDURE,matchers:["IntegrationProcedureService","vlocity_cmt.IntegrationProcedureService","omnistudiocore.IPService"]},{type:Q.HTTP_ACTION,matchers:["DefaultOmniscriptApexRestService","vlocity_cmt.DefaultOmniscriptApexRestService","omnistudiocore.DefaultOmniscriptApexRestService"]}],CUSTOM_RULES:[{type:Q.REMOTE_ACTION,matcher:e=>e&&!e.includes("vlocity_cmt")}]};class ee{static matchesVlcClass(e,t){return t.some((t=>e.includes(t)))}static matchesClassName(e,t){return t(e)}static matchesCustomRule(e,t){return t(e)}}class te{static identifyActionSource(e){const t=e?.params||{},a=t?.params||{},r=$.safeParseJSON(a?.options||"{}"),o=r?.vlcClass||"",s=t?.classname||"";for(const n of Y.CLASSNAME_RULES)if(ee.matchesClassName(s,n.matcher))return n.type;for(const n of Y.VLC_CLASS_RULES)if(ee.matchesVlcClass(o,n.matchers))return n.type;for(const n of Y.CUSTOM_RULES)if(ee.matchesCustomRule(o,n.matcher))return n.type}static identifyDRType(e){const t={invokeOutboundDR:Z.EXTRACT,invokeInboundDR:Z.LOAD,invokeDRTransform:Z.TRANSFORM,invokeTransformDR:Z.TRANSFORM,invokeTurboExtractAction:Z.TURBO_EXTRACT};return t[e]||"Unknown DR Type"}static extractActionDetails(e){const t=e?.params||{},a=t?.params||{},r=this.identifyActionSource(e);if(!r)return null;const o={actionType:r,className:r,methodName:t.method||a.sMethodName||"",inputs:{},options:{}},s={[Q.DATA_RAPTOR]:()=>{const e=$.safeParseJSON(a.input);return{...o,drType:this.identifyDRType(a.sMethodName),methodName:e?.Bundle||e?.bundleName,inputs:e?.DRParams||e?.objectList||{},options:$.safeParseJSON(a.options)}},[Q.FLEXCARD]:()=>{const e=$.safeParseJSON(a?.dataSourceMap||a?.scope||null);return"object"!==typeof e||null===e?null:"IntegrationProcedures"===e.type?{...o,actionType:Q.INTEGRATION_PROCEDURE,className:Q.INTEGRATION_PROCEDURE,methodName:e.value.ipMethod,inputs:$.safeParseJSON(e.value.inputMap),options:$.safeParseJSON(e.value.optionsMap),additional:{vlocityAsync:e.value.vlocityAsync,dsDelay:e.value.dsDelay,resultVar:e.value.resultVar,orderBy:e.value.orderBy,contextVariables:e.value.contextVariables}}:a?.globalKey?{...o,actionType:Q.FLEXCARD_RUNTIME,className:Q.FLEXCARD,methodName:a?.globalKey,inputs:$.safeParseJSON(a?.scope),options:"No Output"}:void 0},[Q.INTEGRATION_PROCEDURE]:()=>({...o,inputs:$.safeParseJSON(a.input),options:$.safeParseJSON(a.options),methodName:a.sMethodName}),[Q.REMOTE_ACTION]:()=>({...o,inputs:$.safeParseJSON(a.input),options:$.safeParseJSON(a.options),methodName:`${a.sClassName}.${a.sMethodName}`})};return s&&s[r]?(s[r]||(()=>({...o,inputs:$.safeParseJSON(a.input),options:$.safeParseJSON(a.options),methodName:a.sMethodName})))():null}}const ae={for:"theme",class:"theme md:top-6 md:right-6 z-40 rounded-2xl dark:shadow-xl"},re={class:"theme__toggle-wrap"};var oe={__name:"ToggleLightDarkMode",setup(e){const t=(0,l.KR)(!1);(0,o.sV)((()=>{const e=localStorage.getItem("color-theme");("dark"===e||!e&&window.matchMedia("(prefers-color-scheme: dark)").matches)&&(t.value=!0,document.documentElement.classList.add("dark"))}));const a=()=>{t.value=!t.value,t.value?(document.documentElement.classList.add("dark"),localStorage.setItem("color-theme","dark")):(document.documentElement.classList.remove("dark"),localStorage.setItem("color-theme","light"))};return(e,s)=>((0,o.uX)(),(0,o.CE)("label",ae,[(0,o.Lk)("span",re,[(0,o.bo)((0,o.Lk)("input",{id:"theme",class:"theme__toggle",type:"checkbox",role:"switch",name:"theme",value:"dark",onClick:a,"onUpdate:modelValue":s[0]||(s[0]=e=>t.value=e)},null,512),[[r.lH,t.value]]),s[1]||(s[1]=(0,o.Fv)('<span class="theme__icon" data-v-53d1f54b><span class="theme__icon-part" data-v-53d1f54b></span><span class="theme__icon-part" data-v-53d1f54b></span><span class="theme__icon-part" data-v-53d1f54b></span><span class="theme__icon-part" data-v-53d1f54b></span><span class="theme__icon-part" data-v-53d1f54b></span><span class="theme__icon-part" data-v-53d1f54b></span><span class="theme__icon-part" data-v-53d1f54b></span><span class="theme__icon-part" data-v-53d1f54b></span><span class="theme__icon-part" data-v-53d1f54b></span></span>',1))])]))}};const se=(0,v.A)(oe,[["__scopeId","data-v-53d1f54b"]]);var ne=se,le=a(2582),ie=a(5643),ue=a(5242),de=a(8814);const ce={class:"h-screen flex flex-col dark:bg-gray-800 z-10"},pe={class:"p-2 bg-gray-100 border-b dark:border-gray-700 flex space-x-4 items-center justify-between dark:bg-gray-800"},me={class:"flex space-x-4 items-center"},ve=["value"],ge={key:0,class:"flex flex-grow overflow-hidden dark:bg-gray-800"},fe={class:"w-1/4 border-r dark:border-gray-700 bg-gray-50 overflow-auto dark:bg-gray-800"},ye={class:"p-4 space-y-2"},be=["onClick"],he={key:0,class:"w-3/4 p-4 overflow-auto"},ke={class:"flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4 mt-2"},xe={class:"w-full mr-3 lg:w-1/2"},Re={class:"flex justify-between items-center"},we={class:"dark:border dark:border-gray-600 rounded-md mt-2"},Ne={class:"w-full mr-3 lg:w-1/2"},Ce={class:"flex justify-between items-center"},_e={class:"dark:border dark:border-gray-600 rounded-md mt-2"},Te={key:0,class:"mt-4"},Ee={class:"flex justify-between items-center"},Oe={class:"dark:border dark:border-gray-600 rounded-md mt-2"},Ae={key:1,class:"p-4 space-y-2"};var Le={__name:"MainApp",setup(e){const t=[(0,ie.Pq)(),ue.bM,de.Lz.lineWrapping],a=(0,l.IJ)(),s=(0,l.KR)([]),i=(0,l.KR)(null),u=(0,l.KR)(!1),d=(0,l.KR)(""),p=(0,l.KR)("All"),m=(0,l.KR)({input:"No Input",IPResult:"No IPResult"}),v=e=>{a.value=e.view};(0,o.wB)(s,(e=>{1===e.length&&f(e[0].id)}),{deep:!0});const g=e=>{try{if(!H.some((t=>e.request.url.includes(t))))return;const t=e?.request?.postData?.text;if(!t)return;const a=$.parseMessageNode(t);if(!a?.actions?.length)return;a.actions.forEach(((t,a)=>{const r=te.extractActionDetails(t);if(!r||!r?.className)return;if(!Object.values(Q).includes(r?.className))return;const o=s.value.length;s.value.push({id:o,details:{...r,extractedResponseValues:{},actionIndex:a},rawRequest:e})}))}catch(t){console.error("Failed to add request:",t)}},f=async e=>{i.value=e;const t=s.value.find((t=>t.id===e));if(t)try{const e=await new Promise((e=>{t.rawRequest.getContent(e)}));if(e){const a=$.safeParseJSON(e),r=t.details.actionIndex,o=a.actions?.[r]?.returnValue,s=o?.returnValue?$.safeParseJSON(o.returnValue):{},n=s.IPResult??s;u.value=!0,m.value={input:$.beautifyJSON(t.details.inputs)||"No Input",IPResult:$.beautifyJSON(n)||"No IPResult",options:"No Output"===t.details.options?"No Output":$.beautifyJSON(t.details.options)||"No Options",elementName:t.details.methodName,actionType:t.details.actionType,actionIndex:r}}}catch(a){console.error("Failed to show request details:",a),m.value={input:"Error loading details",IPResult:a.message||"No IPResult"}}},b=(0,o.EW)((()=>{const e=d.value.toLowerCase();return s.value.filter((t=>{const a=t.details.actionType.toLowerCase().includes(e)||t.details.methodName.toLowerCase().includes(e),r="All"===p.value||t.details.actionType===p.value;return a&&r}))})),h=()=>{u.value=!1,s.value=[],m.value={input:"No Input",IPResult:"No IPResult"}};return chrome.devtools.network.onRequestFinished.addListener(g),(e,a)=>((0,o.uX)(),(0,o.CE)(o.FK,null,[(0,o.bF)(G),(0,o.Lk)("div",ce,[(0,o.Lk)("div",pe,[(0,o.Lk)("div",me,[(0,o.bF)(T,{modelValue:d.value,"onUpdate:modelValue":a[0]||(a[0]=e=>d.value=e),placeholder:"Search by Action or Element",class:"text-xs w-48 !py-1.5 text-gray-700 ml-2"},null,8,["modelValue"]),(0,o.bo)((0,o.Lk)("select",{"onUpdate:modelValue":a[1]||(a[1]=e=>p.value=e),class:"text-xs py-1.5 px-2 block w-48 text-gray-700 border border-gray-300 shadow-sm rounded-md focus:border-indigo-500 focus:ring-indigo-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-900 dark:border-gray-700 dark:text-gray-400 dark:placeholder-gray-500 dark:focus:ring-gray-600 outline-indigo-500 dark:outline-none"},[a[5]||(a[5]=(0,o.Lk)("option",{value:"All"},"All Actions",-1)),((0,o.uX)(!0),(0,o.CE)(o.FK,null,(0,o.pI)([...new Set(s.value.map((e=>e.details.actionType)))],(e=>((0,o.uX)(),(0,o.CE)("option",{key:e,value:e},(0,n.v_)(e),9,ve)))),128))],512),[[r.u1,p.value]]),(0,o.bF)(c,{onClick:h,icon:y,isSquare:!1,color:"red",title:"Clear All Requests",class:"mr-2"})]),(0,o.Lk)("div",null,[(0,o.bF)(ne)])]),s.value.length>0?((0,o.uX)(),(0,o.CE)("div",ge,[(0,o.Lk)("div",fe,[(0,o.Lk)("ul",ye,[((0,o.uX)(!0),(0,o.CE)(o.FK,null,(0,o.pI)(b.value,(e=>((0,o.uX)(),(0,o.CE)("li",{key:e.id,class:(0,n.C4)(["p-2 border rounded-md cursor-pointer text-gray-800 dark:text-gray-400 dark:border-gray-700",{"bg-blue-700 text-white dark:bg-gray-900 dark:border-gray-700 shadow-xl":i.value===e.id,"bg-white dark:bg-gray-700 dark:border-gray-600 shadow-sm":i.value!=e.id}]),onClick:t=>f(e.id)},[(0,o.eW)(" Action : "+(0,n.v_)(e.details.actionType||"N/A")+" ",1),a[6]||(a[6]=(0,o.Lk)("br",null,null,-1)),(0,o.eW)(" Element : "+(0,n.v_)(e.details.methodName||"N/A"),1)],10,be)))),128))])]),u.value?((0,o.uX)(),(0,o.CE)("div",he,[(0,o.bF)(w,null,{default:(0,o.k6)((()=>[(0,o.eW)("Element : "+(0,n.v_)(m.value.elementName),1)])),_:1}),(0,o.Lk)("div",ke,[(0,o.Lk)("div",xe,[(0,o.Lk)("div",Re,[(0,o.bF)(w,null,{default:(0,o.k6)((()=>a[7]||(a[7]=[(0,o.eW)("Input :")]))),_:1}),(0,o.bF)(M,{copyValue:m.value.input,class:"mr-1"},null,8,["copyValue"])]),(0,o.Lk)("div",we,[(0,o.bF)((0,l.R1)(le.bE),{modelValue:m.value.input,"onUpdate:modelValue":a[2]||(a[2]=e=>m.value.input=e),placeholder:"Your data will appear here",style:{height:"100px",borderRadius:"5px",overflow:"hidden"},autofocus:!0,"indent-with-tab":!0,"tab-size":2,extensions:t,onReady:v},null,8,["modelValue"])])]),(0,o.Lk)("div",Ne,[(0,o.Lk)("div",Ce,[(0,o.bF)(w,null,{default:(0,o.k6)((()=>a[8]||(a[8]=[(0,o.eW)("Output :")]))),_:1}),(0,o.bF)(M,{copyValue:m.value.IPResult,class:"mr-2"},null,8,["copyValue"])]),(0,o.Lk)("div",_e,[(0,o.bF)((0,l.R1)(le.bE),{modelValue:m.value.IPResult,"onUpdate:modelValue":a[3]||(a[3]=e=>m.value.IPResult=e),placeholder:"Your data will appear here",style:{height:"100px",borderRadius:"5px",overflow:"hidden"},autofocus:!0,"indent-with-tab":!0,"tab-size":2,extensions:t,onReady:v},null,8,["modelValue"])])])]),"No Output"!=m.value.options?((0,o.uX)(),(0,o.CE)("div",Te,[(0,o.Lk)("div",Ee,[(0,o.bF)(w,null,{default:(0,o.k6)((()=>a[9]||(a[9]=[(0,o.eW)("Options :")]))),_:1}),(0,o.bF)(M,{copyValue:m.value.options,class:"mr-2"},null,8,["copyValue"])]),(0,o.Lk)("div",Oe,[(0,o.bF)((0,l.R1)(le.bE),{modelValue:m.value.options,"onUpdate:modelValue":a[4]||(a[4]=e=>m.value.options=e),placeholder:"Your data will appear here",style:{height:"100px",borderRadius:"5px",overflow:"hidden"},autofocus:!0,"indent-with-tab":!0,"tab-size":2,extensions:t,onReady:v},null,8,["modelValue"])])])):(0,o.Q3)("",!0)])):(0,o.Q3)("",!0)])):((0,o.uX)(),(0,o.CE)("div",Ae,[(0,o.bF)(w,null,{default:(0,o.k6)((()=>a[10]||(a[10]=[(0,o.eW)("No requests found.")]))),_:1})]))])],64))}};const Se=Le;var Ie=Se,Pe={name:"App",components:{MainApp:Ie}};const Ve=(0,v.A)(Pe,[["render",s]]);var De=Ve;(0,r.Ef)(De).mount("#app")}},t={};function a(r){var o=t[r];if(void 0!==o)return o.exports;var s=t[r]={exports:{}};return e[r].call(s.exports,s,s.exports,a),s.exports}a.m=e,function(){var e=[];a.O=function(t,r,o,s){if(!r){var n=1/0;for(d=0;d<e.length;d++){r=e[d][0],o=e[d][1],s=e[d][2];for(var l=!0,i=0;i<r.length;i++)(!1&s||n>=s)&&Object.keys(a.O).every((function(e){return a.O[e](r[i])}))?r.splice(i--,1):(l=!1,s<n&&(n=s));if(l){e.splice(d--,1);var u=o();void 0!==u&&(t=u)}}return t}s=s||0;for(var d=e.length;d>0&&e[d-1][2]>s;d--)e[d]=e[d-1];e[d]=[r,o,s]}}(),function(){a.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return a.d(t,{a:t}),t}}(),function(){a.d=function(e,t){for(var r in t)a.o(t,r)&&!a.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})}}(),function(){a.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){a.j=57}(),function(){var e={57:0,996:0};a.O.j=function(t){return 0===e[t]};var t=function(t,r){var o,s,n=r[0],l=r[1],i=r[2],u=0;if(n.some((function(t){return 0!==e[t]}))){for(o in l)a.o(l,o)&&(a.m[o]=l[o]);if(i)var d=i(a)}for(t&&t(r);u<n.length;u++)s=n[u],a.o(e,s)&&e[s]&&e[s][0](),e[s]=0;return a.O(d)},r=self["webpackChunkmy_chrome_extension"]=self["webpackChunkmy_chrome_extension"]||[];r.forEach(t.bind(null,0)),r.push=t.bind(null,r.push.bind(r))}();var r=a.O(void 0,[504,996],(function(){return a(4864)}));r=a.O(r)})();
//# sourceMappingURL=index.b5458782.js.map