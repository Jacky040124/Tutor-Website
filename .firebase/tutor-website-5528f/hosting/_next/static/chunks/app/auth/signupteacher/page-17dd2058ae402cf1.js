(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[702],{7368:function(e,t,n){Promise.resolve().then(n.bind(n,6129))},7648:function(e,t,n){"use strict";n.d(t,{default:function(){return i.a}});var s=n(2972),i=n.n(s)},6129:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return m}});var s=n(7437),i=n(2265),r=n(9271),a=n(4353),l=n(8858),o=n(7648),u=n(8931),c=n(6554);function d(e){let{text1:t,text2:n}=e;return(0,s.jsx)("div",{className:"hidden lg:block w-1/2 bg-green-600 relative",children:(0,s.jsxs)("div",{className:"absolute inset-0 flex flex-col justify-center items-center text-white p-12",children:[(0,s.jsx)("h1",{className:"text-4xl font-bold mb-6",children:t}),(0,s.jsx)("p",{className:"text-xl text-center max-w-md",children:n})]})})}function f(){return(0,s.jsx)("div",{className:"absolute top-4 left-4",children:(0,s.jsx)(o.default,{href:"/","aria-label":"Home",children:(0,s.jsx)(u.z,{variant:"outline",color:"slate",children:"← Back to home"})})})}var x=n(2894);function m(){let[e,t]=(0,i.useState)(""),[n,m]=(0,i.useState)(""),[h,b]=(0,i.useState)(""),[g,p]=(0,i.useState)(""),[v,j]=(0,i.useState)(""),y=async t=>{t.preventDefault(),console.log("Starting teacher signup process with email:",e);try{let t=(await (0,r.Xb)(l.I8,e,n)).user;await (0,a.pl)((0,a.JU)(l.db,"users",t.uid),{email:t.email,uid:t.uid,createdAt:new Date().toISOString(),type:"teacher",nickname:g,description:v,availability:[],pricing:0}),b("Sign Up Successful, Sign in here")}catch(e){"auth/email-already-in-use"===e.code?b("You already have an Account, Sign in here"):b(e.message),console.error("Error during sign-up:",e.message)}};return(0,s.jsxs)("div",{className:"flex min-h-screen",children:[(0,s.jsxs)("div",{className:"w-1/2 flex flex-col px-8 lg:px-12 xl:px-16",children:[(0,s.jsx)(f,{}),(0,s.jsxs)("div",{className:"flex-1 flex flex-col justify-center max-w-md mx-auto w-full",children:[(0,s.jsxs)("div",{children:[(0,s.jsx)("h2",{className:"text-3xl font-bold",children:"Create your teacher account"}),(0,s.jsxs)("p",{className:"mt-2 text-sm text-gray-600",children:["Already have an account?"," ",(0,s.jsx)(o.default,{href:"/auth/signin",className:"font-medium text-green-600 hover:text-green-500",children:"Sign in"})]})]}),(0,s.jsx)("div",{className:"mt-8",children:(0,s.jsxs)("form",{className:"space-y-6",action:"#",method:"POST",children:[(0,s.jsx)(c.n,{label:"Nickname",name:"nickname",type:"nickname",autoComplete:"nickname",onChange:e=>p(e.target.value),required:!0}),(0,s.jsx)(c.n,{label:"Description",name:"description",type:"description",autoComplete:"description",onChange:e=>j(e.target.value),required:!0}),(0,s.jsx)(c.n,{label:"Email address",name:"email",type:"email",autoComplete:"email",onChange:e=>t(e.target.value),required:!0}),(0,s.jsx)(c.n,{label:"Password",name:"password",type:"password",autoComplete:"new-password",onChange:e=>m(e.target.value),required:!0}),h&&(0,s.jsx)(x.Z,{message:h}),(0,s.jsxs)("div",{className:"space-y-4",children:[(0,s.jsx)(u.z,{variant:"solid",color:"blue",className:"w-full flex justify-center bg-green-600 hover:bg-green-700",onClick:y,children:"Sign up as teacher →"}),(0,s.jsx)(o.default,{href:"/auth/signup",className:"block text-center text-sm text-gray-600 hover:text-gray-900",children:"Sign up as a student instead"})]})]})})]})]}),(0,s.jsx)(d,{text1:"Start Teaching Today",text2:"Join our community of expert tutors and help students achieve their educational goals."})]})}},8931:function(e,t,n){"use strict";n.d(t,{z:function(){return o}});var s=n(7437),i=n(7648),r=function(){for(var e,t,n=0,s="",i=arguments.length;n<i;n++)(e=arguments[n])&&(t=function e(t){var n,s,i="";if("string"==typeof t||"number"==typeof t)i+=t;else if("object"==typeof t){if(Array.isArray(t)){var r=t.length;for(n=0;n<r;n++)t[n]&&(s=e(t[n]))&&(i&&(i+=" "),i+=s)}else for(s in t)t[s]&&(i&&(i+=" "),i+=s)}return i}(e))&&(s&&(s+=" "),s+=t);return s};let a={solid:"group inline-flex items-center justify-center rounded-full py-2 px-4 text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2",outline:"group inline-flex ring-1 items-center justify-center rounded-full py-2 px-4 text-sm focus:outline-none"},l={solid:{slate:"bg-slate-900 text-white hover:bg-slate-700 hover:text-slate-100 active:bg-slate-800 active:text-slate-300 focus-visible:outline-slate-900",blue:"bg-blue-600 text-white hover:text-slate-100 hover:bg-blue-500 active:bg-blue-800 active:text-blue-100 focus-visible:outline-blue-600",white:"bg-white text-slate-900 hover:bg-blue-50 active:bg-blue-200 active:text-slate-600 focus-visible:outline-white"},outline:{slate:"ring-slate-200 text-slate-700 hover:text-slate-900 hover:ring-slate-300 active:bg-slate-100 active:text-slate-600 focus-visible:outline-blue-600 focus-visible:ring-slate-300",white:"ring-slate-700 text-white hover:ring-slate-500 active:ring-slate-700 active:text-slate-400 focus-visible:outline-white"}};function o(e){let{variant:t,color:n,className:o,...u}=e;return n=null!=n?n:"slate",o=r(a[t=null!=t?t:"solid"],l[t][n],o),void 0===u.href?(0,s.jsx)("button",{className:o,...u}):(0,s.jsx)(i.default,{className:o,...u})}},2894:function(e,t,n){"use strict";n.d(t,{Z:function(){return i}});var s=n(7437);function i(e){let{message:t}=e;return t?(0,s.jsxs)("div",{className:"fixed bottom-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative",role:"alert",children:[(0,s.jsx)("strong",{className:"font-bold",children:"Error: "}),(0,s.jsx)("span",{className:"block sm:inline",children:t})]}):null}},6554:function(e,t,n){"use strict";n.d(t,{n:function(){return a}});var s=n(7437),i=n(2265);function r(e){let{id:t,children:n}=e;return(0,s.jsx)("label",{htmlFor:t,className:"mb-3 block text-sm font-medium text-gray-700",children:n})}function a(e){let{label:t,type:n="text",className:a,...l}=e,o=(0,i.useId)();return(0,s.jsxs)("div",{className:a,children:[t&&(0,s.jsx)(r,{id:o,children:t}),(0,s.jsx)("input",{id:o,type:n,...l,className:"block w-full appearance-none rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-blue-500 sm:text-sm"})]})}},8858:function(e,t,n){"use strict";n.d(t,{I8:function(){return o},JU:function(){return s.JU},PL:function(){return s.PL},QT:function(){return s.QT},db:function(){return l},hJ:function(){return s.hJ},pl:function(){return s.pl}});var s=n(4353),i=n(2848),r=n(9271);let a=(0,i.ZF)({apiKey:"AIzaSyDdKApKZNEERKmPLfB8SxlGsJRTZV5ALvc",authDomain:"tutor-website-5528f.firebaseapp.com",projectId:"tutor-website-5528f",storageBucket:"tutor-website-5528f.appspot.com",messagingSenderId:"320690040214",appId:"1:320690040214:web:fde29b5326692c27e981b7",measurementId:"G-J0MZ8W9SSG"}),l=(0,s.ad)(a),o=(0,r.v0)(a)}},function(e){e.O(0,[301,83,649,972,971,117,744],function(){return e(e.s=7368)}),_N_E=e.O()}]);