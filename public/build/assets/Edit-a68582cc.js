import{j as i,a as r,d as o}from"./app-6bf46f0f.js";import{A as a}from"./AuthenticatedLayout-4c7d45be.js";import m from"./UpdateUserForm-5a2b64be.js";import"./transition-a7caa09f.js";import"./ApplicationLogo-62c2a134.js";import"./index.es-a437b02f.js";import"./moment-fbc5633a.js";import"./InputError-ae87ab17.js";import"./InputLabel-46b18513.js";import"./PrimaryButton-c397a1f6.js";import"./TextInput-804bfba3.js";import"./SelectInput-64e8010c.js";function u({auth:s,user:t,departmentList:e}){return i.jsxs(a,{notification:s.notification,sidebar:s.sidebar,user:s.user,header:i.jsxs("h2",{className:"font-semibold text-xl text-gray-800 leading-tight",children:["User #",t.id]}),children:[i.jsx(r,{title:"User #"+t.id}),i.jsx("div",{className:"py-12",children:i.jsxs("div",{className:"max-w-7xl mx-auto sm:px-6 lg:px-8",children:[i.jsx(o,{onClick:()=>{window.history.back()},children:"< Back"}),i.jsx("div",{className:"p-4 sm:p-8 bg-white overflow-hidden shadow-sm sm:rounded-lg",children:i.jsx(m,{user:t,departmentList:e,className:"max-w-xl"})})]})})]})}export{u as default};