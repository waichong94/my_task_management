import{W as f,r as g,j as e}from"./app-6bf46f0f.js";import{I as m}from"./InputError-ae87ab17.js";import{I as i}from"./InputLabel-46b18513.js";import{P as N}from"./PrimaryButton-c397a1f6.js";import{T as b}from"./TextInput-804bfba3.js";import{T as k}from"./TextArea-9f8298f7.js";import{S as o}from"./SelectInput-64e8010c.js";import{M as d,D}from"./DatePicker-9edb47b2.js";import{t as F}from"./transition-a7caa09f.js";function B({mustVerifyEmail:w,status:C,className:c="",task:y,userList:l,projectList:n,statusList:u}){const{data:t,setData:a,post:p,errors:r,processing:x,recentlySuccessful:j}=f({task_name:"",description:"",pic_uid:"",project_ids:[],member_ids:[],due_date:"",status:""}),[h,_]=g.useState({startDate:t.due_date,endDate:t.due_date}),v=s=>{s.preventDefault(),p(route("tasks.store"))};return e.jsxs("section",{className:c,children:[e.jsx("header",{children:e.jsx("h2",{className:"text-lg font-medium text-gray-900",children:"Add Task"})}),e.jsxs("form",{onSubmit:v,className:"mt-6 space-y-6",children:[e.jsxs("div",{children:[e.jsx(i,{htmlFor:"task_name",value:"Name"}),e.jsx(b,{id:"task_name",className:"mt-1 block w-full",value:t.task_name,onChange:s=>a("task_name",s.target.value),required:!0,isFocused:!0,autoComplete:"task_name"}),e.jsx(m,{className:"mt-2",message:r.name})]}),e.jsxs("div",{children:[e.jsx(i,{htmlFor:"description",value:"Description"}),e.jsx(k,{id:"description",className:"mt-1 block w-full",value:t.description,onChange:s=>a("description",s.target.value),isFocused:!0,autoComplete:"description"}),e.jsx(m,{className:"mt-2",message:r.name})]}),e.jsxs("div",{className:"mt-4",children:[e.jsx(i,{htmlFor:"project_ids",value:"Project"}),e.jsx(d,{id:"project_ids",className:"mt-1 block w-full",options:n,value:t.project_ids,onChange:s=>a("project_ids",s)}),e.jsx(m,{message:r.project_ids,className:"mt-2"})]}),e.jsxs("div",{className:"mt-4",children:[e.jsx(i,{htmlFor:"pic_uid",value:"Person In Charge"}),e.jsx(o,{id:"pic_uid",className:"mt-1 block w-full",options:l,value:t.pic_uid,onChange:s=>a("pic_uid",s.target.value)}),e.jsx(m,{message:r.pic_uid,className:"mt-2"})]}),e.jsxs("div",{className:"mt-4",children:[e.jsx(i,{htmlFor:"member_ids",value:"Members"}),e.jsx(d,{id:"member_ids",className:"mt-1 block w-full",options:l,value:t.member_ids,onChange:s=>a("member_ids",s),placeholder:"Add Member..."}),e.jsx(m,{message:r.member_ids,className:"mt-2"})]}),e.jsxs("div",{className:"mt-4",children:[e.jsx(i,{htmlFor:"status",value:"Status"}),e.jsx(o,{id:"status",className:"mt-1 block w-full",options:u,value:t.status,onChange:s=>a("status",s.target.value),required:!0}),e.jsx(m,{message:r.status,className:"mt-2"})]}),e.jsxs("div",{className:"mt-4",children:[e.jsx(i,{htmlFor:"due_date",value:"Due Date"}),e.jsx(D,{id:"due_date",asSingle:!0,useRange:!1,value:h,onChange:s=>{_(s),a("due_date",s.startDate)}}),e.jsx(m,{message:r.due_date,className:"mt-2"})]}),e.jsx("div",{className:"flex items-center gap-4 justify-between",children:e.jsxs("div",{className:"flex flex-row items-center justify-between",children:[e.jsx(N,{className:"mr-5",disabled:x,children:"Add"}),e.jsx(F,{show:j,enter:"transition ease-in-out",enterFrom:"opacity-0",leave:"transition ease-in-out",leaveTo:"opacity-0",children:e.jsx("p",{className:"text-sm text-green-500 font-semibold",children:"Added."})})]})})]})]})}export{B as default};
