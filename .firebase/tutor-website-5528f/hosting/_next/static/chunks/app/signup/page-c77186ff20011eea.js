(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[966],{8984:function(e,t,n){Promise.resolve().then(n.bind(n,537))},7648:function(e,t,n){"use strict";n.d(t,{default:function(){return a.a}});var s=n(2972),a=n.n(s)},5956:function(e,t,n){"use strict";n.d(t,{I8:function(){return u},JU:function(){return a.JU},PL:function(){return a.PL},QT:function(){return a.QT},db:function(){return r},hJ:function(){return a.hJ},pl:function(){return a.pl}});var s=n(2848),a=n(4353),l=n(9271);let i=(0,s.ZF)({apiKey:"AIzaSyDdKApKZNEERKmPLfB8SxlGsJRTZV5ALvc",authDomain:"tutor-website-5528f.firebaseapp.com",projectId:"tutor-website-5528f",storageBucket:"tutor-website-5528f.appspot.com",messagingSenderId:"320690040214",appId:"1:320690040214:web:fde29b5326692c27e981b7",measurementId:"G-J0MZ8W9SSG"}),r=(0,a.ad)(i),u=(0,l.v0)(i)},537:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return o}});var s=n(7437),a=n(2265),l=n(9271),i=n(5956),r=n(7648),u=n(8201),c=n(6900);function o(){let[e,t]=(0,a.useState)(""),[n,o]=(0,a.useState)(""),[d,f]=(0,a.useState)(""),[x,m]=(0,a.useState)(""),h=async t=>{t.preventDefault();try{let t=(await (0,l.Xb)(i.I8,e,n)).user;await (0,i.pl)((0,i.JU)(i.db,"users",t.uid),{createdAt:new Date().toISOString(),email:t.email,uid:t.uid,type:"student",nickname:d,balance:0,bookingHistory:[]}),m("Sign Up Successful, Sign in here")}catch(e){"auth/email-already-in-use"===e.code?m("You already have an Account, Sign in here"):m(e.message),console.error("Error during sign-up:",e.message)}};return(0,s.jsxs)("div",{className:"flex min-h-screen",children:[(0,s.jsxs)("div",{className:"w-1/2 flex flex-col px-8 lg:px-12 xl:px-16",children:[(0,s.jsx)("div",{className:"absolute top-4 left-4",children:(0,s.jsx)(r.default,{href:"/","aria-label":"Home",children:(0,s.jsx)(u.z,{variant:"outline",color:"slate",children:"← Back to home"})})}),(0,s.jsxs)("div",{className:"flex-1 flex flex-col justify-center max-w-md mx-auto w-full",children:[(0,s.jsxs)("div",{children:[(0,s.jsx)("h2",{className:"text-3xl font-bold",children:"Create your account"}),(0,s.jsxs)("p",{className:"mt-2 text-sm text-gray-600",children:["Already have an account?"," ",(0,s.jsx)(r.default,{href:"/signin",className:"font-medium text-green-600 hover:text-green-500",children:"Sign in"})]})]}),(0,s.jsx)("div",{className:"mt-8",children:(0,s.jsxs)("form",{className:"space-y-6",action:"#",method:"POST",children:[(0,s.jsx)(c.n,{label:"Nickname",name:"nickname",type:"nickname",autoComplete:"nickname",onChange:e=>f(e.target.value),required:!0}),(0,s.jsx)(c.n,{label:"Email address",name:"email",type:"email",autoComplete:"email",onChange:e=>t(e.target.value),required:!0}),(0,s.jsx)(c.n,{label:"Password",name:"password",type:"password",autoComplete:"new-password",onChange:e=>o(e.target.value),required:!0}),x&&(0,s.jsxs)("div",{className:"text-sm",children:[(0,s.jsx)("p",{className:"text-red-500",children:x}),(x.includes("Sign Up Successful")||x.includes("already have an Account"))&&(0,s.jsx)(r.default,{href:"/signin",className:"text-green-600 hover:text-green-500 font-medium",children:"Sign In"})]}),(0,s.jsxs)("div",{className:"space-y-4",children:[(0,s.jsx)(u.z,{variant:"solid",color:"blue",className:"w-full flex justify-center bg-green-600 hover:bg-green-700",onClick:h,children:"Sign up as teacher →"}),(0,s.jsx)(r.default,{href:"/signupteacher",className:"block text-center text-sm text-gray-600 hover:text-gray-900",children:"Sign up as a teacher instead"})]})]})})]})]}),(0,s.jsx)("div",{className:"hidden lg:block w-1/2 bg-green-600 relative",children:(0,s.jsxs)("div",{className:"absolute inset-0 flex flex-col justify-center items-center text-white p-12",children:[(0,s.jsx)("h1",{className:"text-4xl font-bold mb-6",children:"Start Learning Today"}),(0,s.jsx)("p",{className:"text-xl text-center max-w-md",children:"Join our community and learn from the best."})]})})]})}},8201:function(e,t,n){"use strict";n.d(t,{z:function(){return u}});var s=n(7437),a=n(7648),l=function(){for(var e,t,n=0,s="",a=arguments.length;n<a;n++)(e=arguments[n])&&(t=function e(t){var n,s,a="";if("string"==typeof t||"number"==typeof t)a+=t;else if("object"==typeof t){if(Array.isArray(t)){var l=t.length;for(n=0;n<l;n++)t[n]&&(s=e(t[n]))&&(a&&(a+=" "),a+=s)}else for(s in t)t[s]&&(a&&(a+=" "),a+=s)}return a}(e))&&(s&&(s+=" "),s+=t);return s};let i={solid:"group inline-flex items-center justify-center rounded-full py-2 px-4 text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2",outline:"group inline-flex ring-1 items-center justify-center rounded-full py-2 px-4 text-sm focus:outline-none"},r={solid:{slate:"bg-slate-900 text-white hover:bg-slate-700 hover:text-slate-100 active:bg-slate-800 active:text-slate-300 focus-visible:outline-slate-900",blue:"bg-blue-600 text-white hover:text-slate-100 hover:bg-blue-500 active:bg-blue-800 active:text-blue-100 focus-visible:outline-blue-600",white:"bg-white text-slate-900 hover:bg-blue-50 active:bg-blue-200 active:text-slate-600 focus-visible:outline-white"},outline:{slate:"ring-slate-200 text-slate-700 hover:text-slate-900 hover:ring-slate-300 active:bg-slate-100 active:text-slate-600 focus-visible:outline-blue-600 focus-visible:ring-slate-300",white:"ring-slate-700 text-white hover:ring-slate-500 active:ring-slate-700 active:text-slate-400 focus-visible:outline-white"}};function u(e){let{variant:t,color:n,className:u,...c}=e;return n=null!=n?n:"slate",u=l(i[t=null!=t?t:"solid"],r[t][n],u),void 0===c.href?(0,s.jsx)("button",{className:u,...c}):(0,s.jsx)(a.default,{className:u,...c})}},6900:function(e,t,n){"use strict";n.d(t,{n:function(){return i}});var s=n(7437),a=n(2265);function l(e){let{id:t,children:n}=e;return(0,s.jsx)("label",{htmlFor:t,className:"mb-3 block text-sm font-medium text-gray-700",children:n})}function i(e){let{label:t,type:n="text",className:i,...r}=e,u=(0,a.useId)();return(0,s.jsxs)("div",{className:i,children:[t&&(0,s.jsx)(l,{id:u,children:t}),(0,s.jsx)("input",{id:u,type:n,...r,className:"block w-full appearance-none rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-blue-500 sm:text-sm"})]})}}},function(e){e.O(0,[301,83,417,972,971,117,744],function(){return e(e.s=8984)}),_N_E=e.O()}]);