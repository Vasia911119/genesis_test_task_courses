"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[961],{9961:function(e,t,n){n.r(t),n.d(t,{default:function(){return v}});var r=n(4165),s=n(5861),a=n(9439),c=n(2791),o=n(7689),i=n(1087),u=n(4390),l=n(184),p=function(e){for(var t=e.coursesPerPage,n=e.totalCourses,r=e.paginate,s=e.currentPage,a=[],c=1;c<=Math.ceil(n/t);c++)a.push(c);return(0,l.jsx)("nav",{children:(0,l.jsx)("ul",{className:"pagination",children:a.map((function(e){return(0,l.jsx)("li",{className:s===e?"active":"",children:(0,l.jsx)("button",{onClick:function(){return r(e)},children:e})},e)}))})})},d=n(8978),f=n(7238),m=n(5667),h="LinkToTop_link__YI-lp",x="LinkToTop_icon__+mSBQ",g=function(){var e=(0,c.useState)(!1),t=(0,a.Z)(e,2),r=t[0],s=t[1],o=n(5667).animateScroll;return(0,c.useEffect)((function(){window.addEventListener("scroll",(function(){window.scrollY>400?s(!0):s(!1)}))}),[]),(0,l.jsx)(l.Fragment,{children:r&&(0,l.jsx)(m.Link,{to:"#",onClick:function(){return o.scrollToTop({smooth:!0,hashSpy:!0})},className:h,"aria-label":"scroll to Top","aria-controls":"scroll to Top",children:(0,l.jsx)(f,{className:x})})})},v=function(){var e=(0,o.TH)().pathname,t=(0,c.useState)([]),n=(0,a.Z)(t,2),f=n[0],m=n[1],h=(0,c.useState)(1),x=(0,a.Z)(h,2),v=x[0],j=x[1],w=(0,c.useState)(!0),k=(0,a.Z)(w,2),b=k[0],Z=k[1];console.log(f),(0,c.useEffect)((function(){function e(){return(e=(0,s.Z)((0,r.Z)().mark((function e(){var t;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return Z(!0),e.next=3,(0,u.Ho)();case 3:t=e.sent,m(t.courses),Z(!1);case 6:case"end":return e.stop()}}),e)})))).apply(this,arguments)}!function(){e.apply(this,arguments)}()}),[]);var y=10*v,N=y-10,T=f.slice(N,y);return(0,l.jsxs)("div",{className:"container",children:[b?(0,l.jsx)(d.Z,{}):(0,l.jsx)("ul",{className:"grid",children:null===T||void 0===T?void 0:T.map((function(t){return(0,l.jsx)("li",{className:"p-4 my-4 border-2 md:max-w-[376px] rounded border-blue-200 border-solid bg-gradient-to-b from-teal-500 to-blue-500",children:(0,l.jsxs)(i.rU,{to:"".concat(e,"/").concat(t.id),children:[(0,l.jsx)("h2",{className:"text-center mb-4 text-xl font-bold",children:t.title}),(0,l.jsxs)("div",{children:[(0,l.jsx)("img",{className:"w-[400px] h-[200px] rounded mx-auto mb-4",src:t.previewImageLink+"/cover.webp",alt:t.title}),(0,l.jsxs)("div",{children:[(0,l.jsx)("p",{className:"mb-4 text-center",children:t.description}),t.meta.skills&&(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)("p",{className:"text-center font-medium",children:"Skills:"}),(0,l.jsx)("ul",{className:"mb-4",children:t.meta.skills.map((function(e,t){return(0,l.jsx)("li",{className:"text-center",children:e},t)}))})]}),(0,l.jsxs)("div",{className:"flex justify-center gap-4",children:[(0,l.jsxs)("p",{className:"font-medium",children:["Lessons: ",t.lessonsCount]}),(0,l.jsxs)("p",{className:"font-medium",children:["Rating: ",t.rating]})]})]})]})]})},t.id)}))}),(0,l.jsx)("div",{children:f.length>10&&(0,l.jsx)(p,{coursesPerPage:10,totalCourses:f.length,paginate:function(e){return j(e)},currentPage:v})}),(0,l.jsx)(g,{})]})}},4390:function(e,t,n){n.d(t,{Ho:function(){return u},Yt:function(){return p}});var r=n(4165),s=n(5861),a=n(1243),c="https://api.wisey.app/api/v1";function o(){return i.apply(this,arguments)}function i(){return(i=(0,s.Z)((0,r.Z)().mark((function e(){var t,n,s;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(localStorage.getItem("wiseyToken")&&""!==localStorage.getItem("wiseyToken")){e.next=9;break}return e.next=3,a.Z.get("".concat(c,"/auth/anonymous?platform=subscriptions"));case 3:return t=e.sent,n=t.data.token,localStorage.setItem("wiseyToken",n),e.abrupt("return",n);case 9:return s=localStorage.getItem("wiseyToken"),e.abrupt("return",s);case 11:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function u(){return l.apply(this,arguments)}function l(){return(l=(0,s.Z)((0,r.Z)().mark((function e(){var t,n,s;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,o();case 2:return t=e.sent,n={Authorization:"Bearer ".concat(t)},e.next=6,a.Z.get("".concat(c,"/core/preview-courses"),{headers:n});case 6:return s=e.sent,e.abrupt("return",s.data);case 8:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function p(e){return d.apply(this,arguments)}function d(){return(d=(0,s.Z)((0,r.Z)().mark((function e(t){var n,s,i;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,o();case 2:return n=e.sent,s={Authorization:"Bearer ".concat(n)},e.next=6,a.Z.get("".concat(c,"/core/preview-courses/").concat(t),{headers:s});case 6:return i=e.sent,e.abrupt("return",i.data);case 8:case"end":return e.stop()}}),e)})))).apply(this,arguments)}}}]);
//# sourceMappingURL=961.aff3983e.chunk.js.map