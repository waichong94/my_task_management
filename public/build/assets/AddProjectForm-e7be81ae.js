import{W as c,j as e}from"./app-6bf46f0f.js";import{I as d}from"./InputError-ae87ab17.js";import{I as u}from"./InputLabel-46b18513.js";import{P as x}from"./PrimaryButton-c397a1f6.js";import{T as p}from"./TextInput-804bfba3.js";import"./SelectInput-64e8010c.js";import{t as f}from"./transition-a7caa09f.js";function A({mustVerifyEmail:j,status:h,className:s="",departmentList:y}){const{data:r,setData:a,post:m,errors:o,processing:n,recentlySuccessful:i}=c({name:""}),l=t=>{t.preventDefault(),m(route("project.store"))};return e.jsxs("section",{className:s,children:[e.jsxs("header",{children:[e.jsx("h2",{className:"text-lg font-medium text-gray-900",children:"Add Project"}),e.jsx("p",{className:"mt-1 text-sm text-gray-600",children:"Please fill in the form to add new project."})]}),e.jsxs("form",{onSubmit:l,className:"mt-6 space-y-6",children:[e.jsxs("div",{children:[e.jsx(u,{htmlFor:"name",value:"Project Name"}),e.jsx(p,{id:"name",className:"mt-1 block w-full",value:r.name,onChange:t=>a("name",t.target.value),required:!0,isFocused:!0,autoComplete:"name"}),e.jsx(d,{className:"mt-2",message:o.name})]}),e.jsx("div",{className:"flex items-center gap-4 justify-between",children:e.jsxs("div",{className:"flex flex-row items-center justify-between",children:[e.jsx(x,{className:"mr-5",disabled:n,children:"Add"}),e.jsx(f,{show:i,enter:"transition ease-in-out",enterFrom:"opacity-0",leave:"transition ease-in-out",leaveTo:"opacity-0",children:e.jsx("p",{className:"text-sm text-green-500 font-semibold",children:"Added."})})]})})]})]})}export{A as default};