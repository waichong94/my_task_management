import{j as i,a as t,d as a}from"./app-6bf46f0f.js";import{A as o}from"./AuthenticatedLayout-4c7d45be.js";import"./TextInput-804bfba3.js";import m from"./UpdatePasswordForm-a981544a.js";import d from"./UpdateProfileInformationForm-6527f426.js";import"./transition-a7caa09f.js";import"./ApplicationLogo-62c2a134.js";import"./index.es-a437b02f.js";import"./moment-fbc5633a.js";import"./InputError-ae87ab17.js";import"./InputLabel-46b18513.js";import"./PrimaryButton-c397a1f6.js";function N({auth:s,mustVerifyEmail:e,status:r}){return i.jsxs(o,{notification:s.notification,sidebar:s.sidebar,user:s.user,header:i.jsx("h2",{className:"font-semibold text-xl text-gray-800 leading-tight",children:"Profile"}),children:[i.jsx(t,{title:"Profile"}),i.jsx(i.Fragment,{children:i.jsxs("div",{className:"max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6",children:[i.jsx(a,{onClick:()=>{window.history.back()},children:"< Back"}),i.jsx("div",{className:"p-4 sm:p-8 bg-white shadow sm:rounded-lg",children:i.jsx(d,{mustVerifyEmail:e,status:r,className:"max-w-xl"})}),i.jsx("div",{className:"p-4 sm:p-8 bg-white shadow sm:rounded-lg",children:i.jsx(m,{className:"max-w-xl"})})]})})]})}export{N as default};