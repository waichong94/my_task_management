import{j as e,d as o}from"./app-6bf46f0f.js";import{P as p}from"./PrimaryButton-c397a1f6.js";function i({items:d,columns:l,primary:s,action:t,highlight:x={}}){return e.jsx("div",{className:"relative overflow-x-auto border shadow-md sm:rounded-lg",children:e.jsxs("table",{className:"w-full text-sm text-left text-gray-500 dark:text-gray-400",children:[e.jsx("thead",{className:"text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400",children:e.jsxs("tr",{children:[s&&e.jsx("th",{scope:"col",className:"px-6 py-3",children:s}),l.map(r=>e.jsx("th",{scope:"col",className:"px-6 py-3",children:r.name.replace("_"," ")},r.name)),t&&e.jsx("th",{scope:"col",className:"px-6 py-3",children:"Action"})]})}),e.jsx("tbody",{children:d===null||d.length===0?e.jsx("tr",{className:"bg-white border-b dark:bg-gray-900 dark:border-gray-700",children:e.jsx("th",{scope:"row",className:"px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white",children:"No Data Found"})}):d.map((r,n)=>e.jsxs("tr",{className:`${Object.keys(x).length!=0?x.valueColor[r[x.column]]:""} border-b dark:bg-gray-900 dark:border-gray-700`,children:[r.id&&e.jsxs("th",{scope:"row",className:"px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white",children:["#",r.id]}),l.map((a,c)=>e.jsx("td",{className:`px-6 py-4 text-gray-900 dark:text-white
                            ${a.css!==""&&typeof a.css[r[a.name]]<"u"?a.css[r[a.name]]:a.css} `,children:r[a.name]},c)),e.jsx("td",{className:"px-6 py-4",children:t&&t.map((a,c)=>e.jsx("a",{href:route(a.route,r.id),children:e.jsx(p,{className:"bg-blue-800 m-1",children:a.label})},c))})]},n))})]})})}function b({links:d,...l}){return e.jsx("div",{className:"mb-4",children:e.jsx("div",{className:"flex flex-wrap mt-8",children:d.map((s,t)=>s.url!==null?e.jsx(o,{id:t,href:s.url,only:l.only??[],className:"mr-1 mb-1 px-4 py-3 text-sm leading-4 border rounded hover:bg-white focus:border-primary focus:text-primary"+(s.active?" bg-blue-700 text-white hover:text-inherit":""),children:e.jsx("p",{dangerouslySetInnerHTML:{__html:s.label}})},t):e.jsx("span",{id:t,className:"mr-1 mb-1 px-4 py-3 text-sm leading-4 text-gray-400 border rounded",children:e.jsx("p",{dangerouslySetInnerHTML:{__html:s.label}})},t))})})}export{b as P,i as T};