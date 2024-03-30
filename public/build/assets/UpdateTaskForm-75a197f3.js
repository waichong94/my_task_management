import{W as g,r as N,j as e}from"./app-6bf46f0f.js";import{I as m}from"./InputError-ae87ab17.js";import{I as l}from"./InputLabel-46b18513.js";import{P as b}from"./PrimaryButton-c397a1f6.js";import{T as D}from"./TextInput-804bfba3.js";import{T as F}from"./TextArea-9f8298f7.js";import{S as d}from"./SelectInput-64e8010c.js";import{M as c,D as w}from"./DatePicker-9edb47b2.js";import{t as C}from"./transition-a7caa09f.js";function B({mustVerifyEmail:S,status:k,className:n="",task:t,userList:o,projectList:u,statusList:p}){const{data:a,setData:r,patch:j,errors:i,processing:x,recentlySuccessful:h}=g({task_name:t.task_name,description:t.description,pic_uid:t.uid??"",project_ids:t.project_ids??[],member_ids:t.member_ids??[],due_date:t.due_date??"",status:t.status??""}),[_,v]=N.useState({startDate:a.due_date,endDate:a.due_date}),f=s=>{s.preventDefault(),j(route("tasks.update",t.id))};return e.jsxs("section",{className:n,children:[e.jsx("header",{children:e.jsxs("h2",{className:"text-lg font-medium text-gray-900",children:["Task #",t.id]})}),e.jsxs("form",{onSubmit:f,className:"mt-6 space-y-6",children:[e.jsxs("div",{children:[e.jsx(l,{htmlFor:"task_name",value:"Name"}),e.jsx(D,{id:"task_name",className:"mt-1 block w-full",value:a.task_name,onChange:s=>r("task_name",s.target.value),required:!0,isFocused:!0,autoComplete:"task_name"}),e.jsx(m,{className:"mt-2",message:i.name})]}),e.jsxs("div",{children:[e.jsx(l,{htmlFor:"description",value:"Description"}),e.jsx(F,{id:"description",className:"mt-1 block w-full",value:a.description,onChange:s=>r("description",s.target.value),isFocused:!0,autoComplete:"description"}),e.jsx(m,{className:"mt-2",message:i.name})]}),e.jsxs("div",{className:"mt-4",children:[e.jsx(l,{htmlFor:"project_ids",value:"Project"}),e.jsx(c,{id:"project_ids",className:"mt-1 block w-full",options:u,value:a.project_ids,onChange:s=>r("project_ids",s),placeholder:"Add Project..."}),e.jsx(m,{message:i.project_ids,className:"mt-2"})]}),e.jsxs("div",{className:"mt-4",children:[e.jsx(l,{htmlFor:"pic_uid",value:"Person In Charge"}),e.jsx(d,{id:"pic_uid",className:"mt-1 block w-full",options:o,value:a.pic_uid,onChange:s=>r("pic_uid",s.target.value)}),e.jsx(m,{message:i.pic_uid,className:"mt-2"})]}),e.jsxs("div",{className:"mt-4",children:[e.jsx(l,{htmlFor:"member_ids",value:"Members"}),e.jsx(c,{id:"member_ids",className:"mt-1 block w-full",options:o,value:a.member_ids,onChange:s=>r("member_ids",s),placeholder:"Add Member..."}),e.jsx(m,{message:i.member_ids,className:"mt-2"})]}),e.jsxs("div",{className:"mt-4",children:[e.jsx(l,{htmlFor:"status",value:"Status"}),e.jsx(d,{id:"status",className:"mt-1 block w-full",options:p,value:a.status,onChange:s=>r("status",s.target.value),required:!0}),e.jsx(m,{message:i.status,className:"mt-2"})]}),e.jsxs("div",{className:"mt-4",children:[e.jsx(l,{htmlFor:"due_date",value:"Due Date"}),e.jsx(w,{id:"due_date",asSingle:!0,useRange:!1,value:_,onChange:s=>{v(s),r("due_date",s.startDate)}}),e.jsx(m,{message:i.due_date,className:"mt-2"})]}),e.jsx("div",{className:"flex items-center gap-4 justify-between",children:e.jsxs("div",{className:"flex flex-row items-center justify-between",children:[e.jsx(b,{className:"mr-5 bg-green-500",disabled:x,children:"Save"}),e.jsx(C,{show:h,enter:"transition ease-in-out",enterFrom:"opacity-0",leave:"transition ease-in-out",leaveTo:"opacity-0",children:e.jsx("p",{className:"text-sm text-green-500 font-semibold",children:"Saved."})})]})})]})]})}export{B as default};
