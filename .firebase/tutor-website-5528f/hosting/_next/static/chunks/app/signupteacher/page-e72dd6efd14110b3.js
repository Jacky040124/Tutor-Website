(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[545],{8323:function(e,t,s){Promise.resolve().then(s.bind(s,9587))},7648:function(e,t,s){"use strict";s.d(t,{default:function(){return l.a}});var n=s(2972),l=s.n(n)},5956:function(e,t,s){"use strict";s.d(t,{I8:function(){return c},JU:function(){return l.JU},QT:function(){return l.QT},db:function(){return r},pl:function(){return l.pl}});var n=s(2848),l=s(4353),i=s(9271);let a=(0,n.ZF)({apiKey:"AIzaSyDdKApKZNEERKmPLfB8SxlGsJRTZV5ALvc",authDomain:"tutor-website-5528f.firebaseapp.com",projectId:"tutor-website-5528f",storageBucket:"tutor-website-5528f.appspot.com",messagingSenderId:"320690040214",appId:"1:320690040214:web:fde29b5326692c27e981b7",measurementId:"G-J0MZ8W9SSG"}),r=(0,l.ad)(a),c=(0,i.v0)(a)},9587:function(e,t,s){"use strict";s.r(t),s.d(t,{default:function(){return u}});var n=s(7437),l=s(2265),i=s(9271),a=s(5956),r=s(7648),c=s(8201),o=s(6900);function u(){let[e,t]=(0,l.useState)(""),[s,u]=(0,l.useState)(""),[d,f]=(0,l.useState)(""),x=async t=>{t.preventDefault(),console.log("Starting teacher signup process with email:",e);try{let t=(await (0,i.Xb)(a.I8,e,s)).user;await (0,a.pl)((0,a.JU)(a.db,"users",t.uid),{email:t.email,uid:t.uid,createdAt:new Date().toISOString(),type:"teacher",description:"",availability:[]}),f("Sign Up Successful, Sign in here")}catch(e){"auth/email-already-in-use"===e.code?f("You already have an Account, Sign in here"):f(e.message),console.error("Error during sign-up:",e.message)}};return(0,n.jsxs)("div",{className:"flex min-h-screen",children:[(0,n.jsxs)("div",{className:"w-1/2 flex flex-col px-8 lg:px-12 xl:px-16",children:[(0,n.jsx)("div",{className:"absolute top-4 left-4",children:(0,n.jsx)(r.default,{href:"/","aria-label":"Home",children:(0,n.jsx)(c.z,{variant:"outline",color:"slate",children:"← Back to home"})})}),(0,n.jsxs)("div",{className:"flex-1 flex flex-col justify-center max-w-md mx-auto w-full",children:[(0,n.jsxs)("div",{children:[(0,n.jsx)("h2",{className:"text-3xl font-bold",children:"Create your teacher account"}),(0,n.jsxs)("p",{className:"mt-2 text-sm text-gray-600",children:["Already have an account?"," ",(0,n.jsx)(r.default,{href:"/signin",className:"font-medium text-green-600 hover:text-green-500",children:"Sign in"})]})]}),(0,n.jsx)("div",{className:"mt-8",children:(0,n.jsxs)("form",{className:"space-y-6",action:"#",method:"POST",children:[(0,n.jsx)(o.n,{label:"Email address",name:"email",type:"email",autoComplete:"email",onChange:e=>t(e.target.value),required:!0}),(0,n.jsx)(o.n,{label:"Password",name:"password",type:"password",autoComplete:"new-password",onChange:e=>u(e.target.value),required:!0}),d&&(0,n.jsxs)("div",{className:"text-sm",children:[(0,n.jsx)("p",{className:"text-red-500",children:d}),(d.includes("Sign Up Successful")||d.includes("already have an Account"))&&(0,n.jsx)(r.default,{href:"/signin",className:"text-green-600 hover:text-green-500 font-medium",children:"Sign In"})]}),(0,n.jsxs)("div",{className:"space-y-4",children:[(0,n.jsx)(c.z,{variant:"solid",color:"blue",className:"w-full flex justify-center bg-green-600 hover:bg-green-700",onClick:x,children:"Sign up as teacher →"}),(0,n.jsx)(r.default,{href:"/signup",className:"block text-center text-sm text-gray-600 hover:text-gray-900",children:"Sign up as a student instead"})]})]})})]})]}),(0,n.jsx)("div",{className:"hidden lg:block w-1/2 bg-green-600 relative",children:(0,n.jsxs)("div",{className:"absolute inset-0 flex flex-col justify-center items-center text-white p-12",children:[(0,n.jsx)("h1",{className:"text-4xl font-bold mb-6",children:"Start Teaching Today"}),(0,n.jsx)("p",{className:"text-xl text-center max-w-md",children:"Join our community of expert tutors and help students achieve their educational goals."})]})})]})}},8201:function(e,t,s){"use strict";s.d(t,{z:function(){return c}});var n=s(7437),l=s(7648),i=function(){for(var e,t,s=0,n="",l=arguments.length;s<l;s++)(e=arguments[s])&&(t=function e(t){var s,n,l="";if("string"==typeof t||"number"==typeof t)l+=t;else if("object"==typeof t){if(Array.isArray(t)){var i=t.length;for(s=0;s<i;s++)t[s]&&(n=e(t[s]))&&(l&&(l+=" "),l+=n)}else for(n in t)t[n]&&(l&&(l+=" "),l+=n)}return l}(e))&&(n&&(n+=" "),n+=t);return n};let a={solid:"group inline-flex items-center justify-center rounded-full py-2 px-4 text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2",outline:"group inline-flex ring-1 items-center justify-center rounded-full py-2 px-4 text-sm focus:outline-none"},r={solid:{slate:"bg-slate-900 text-white hover:bg-slate-700 hover:text-slate-100 active:bg-slate-800 active:text-slate-300 focus-visible:outline-slate-900",blue:"bg-blue-600 text-white hover:text-slate-100 hover:bg-blue-500 active:bg-blue-800 active:text-blue-100 focus-visible:outline-blue-600",white:"bg-white text-slate-900 hover:bg-blue-50 active:bg-blue-200 active:text-slate-600 focus-visible:outline-white"},outline:{slate:"ring-slate-200 text-slate-700 hover:text-slate-900 hover:ring-slate-300 active:bg-slate-100 active:text-slate-600 focus-visible:outline-blue-600 focus-visible:ring-slate-300",white:"ring-slate-700 text-white hover:ring-slate-500 active:ring-slate-700 active:text-slate-400 focus-visible:outline-white"}};function c(e){let{variant:t,color:s,className:c,...o}=e;return s=null!=s?s:"slate",c=i(a[t=null!=t?t:"solid"],r[t][s],c),void 0===o.href?(0,n.jsx)("button",{className:c,...o}):(0,n.jsx)(l.default,{className:c,...o})}},6900:function(e,t,s){"use strict";s.d(t,{n:function(){return a}});var n=s(7437),l=s(2265);function i(e){let{id:t,children:s}=e;return(0,n.jsx)("label",{htmlFor:t,className:"mb-3 block text-sm font-medium text-gray-700",children:s})}function a(e){let{label:t,type:s="text",className:a,...r}=e,c=(0,l.useId)();return(0,n.jsxs)("div",{className:a,children:[t&&(0,n.jsx)(i,{id:c,children:t}),(0,n.jsx)("input",{id:c,type:s,...r,className:"block w-full appearance-none rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-blue-500 sm:text-sm"})]})}}},function(e){e.O(0,[301,83,417,972,971,117,744],function(){return e(e.s=8323)}),_N_E=e.O()}]);