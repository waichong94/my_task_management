import{r as a,j as s}from"./app-6bf46f0f.js";import u from"./ChecklistItem-e7f435da.js";import f from"./ChecklistItemCreateForm-9d5af4b1.js";import"./Checkbox-d48023ac.js";import"./PrimaryButton-c397a1f6.js";import"./TextArea-9f8298f7.js";import"./index.es-a437b02f.js";function F({className:h="",task:r}){const[o,d]=a.useState(r.checklist??[]),[c,i]=a.useState(null),x=(t,e)=>{let l;t.text===null||t.text.trim()===""?(l=o.filter((m,n)=>n!==e),d(l)):(l=o.map((m,n)=>n===e?{text:t.text,checked:t.checked}:m),d(l))},p=t=>{d([...o,t])};return s.jsxs("section",{className:h,children:[s.jsx("header",{children:s.jsx("h2",{className:"text-lg font-medium text-gray-900",children:"Checklist"})}),s.jsx("div",{className:"flex flex-col items-start mt-4 gap-4",children:o.map((t,e)=>s.jsx(u,{item:t,index:e,taskId:r.id,onItemEdited:x,isShowingForm:e==c,onShow:()=>i(e),onClose:()=>i(null)},e))}),s.jsx(f,{taskId:r.id,onItemAdded:p,isShowingForm:c=="add",onShow:()=>i("add"),onClose:()=>i(null)})]})}export{F as default};