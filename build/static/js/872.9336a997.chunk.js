"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[872],{4872:function(t,e,r){r.r(e);var n=r(4165),a=r(5861),s=r(9439),c=r(2791),u=r(7689),o=r(1087),i=r(4390),p=r(6710),f=r(184);e.default=function(){var t=(0,u.UO)(),e=(0,c.useState)([]),r=(0,s.Z)(e,2),l=r[0],h=r[1];return(0,c.useEffect)((function(){function e(){return(e=(0,a.Z)((0,n.Z)().mark((function e(){var r;return(0,n.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,(0,i.Yt)(t.courseId);case 2:r=e.sent,h(r);case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}!function(){e.apply(this,arguments)}()}),[t.courseId]),(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)(o.rU,{to:"/courses",children:"Back to courses"}),l&&l.lessons&&l.lessons[0]&&(0,f.jsx)(p.Z,{url:l.lessons[0].link,controls:!0,width:"100%",height:"auto"})]})}},4390:function(t,e,r){r.d(e,{Ho:function(){return i},Yt:function(){return f}});var n=r(4165),a=r(5861),s=r(1243),c="https://api.wisey.app/api/v1";function u(){return o.apply(this,arguments)}function o(){return(o=(0,a.Z)((0,n.Z)().mark((function t(){var e,r,a;return(0,n.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(localStorage.getItem("wiseyToken")&&""!==localStorage.getItem("wiseyToken")){t.next=9;break}return t.next=3,s.Z.get("".concat(c,"/auth/anonymous?platform=subscriptions"));case 3:return e=t.sent,r=e.data.token,localStorage.setItem("wiseyToken",r),t.abrupt("return",r);case 9:return a=localStorage.getItem("wiseyToken"),t.abrupt("return",a);case 11:case"end":return t.stop()}}),t)})))).apply(this,arguments)}function i(){return p.apply(this,arguments)}function p(){return(p=(0,a.Z)((0,n.Z)().mark((function t(){var e,r,a;return(0,n.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,u();case 2:return e=t.sent,r={Authorization:"Bearer ".concat(e)},t.next=6,s.Z.get("".concat(c,"/core/preview-courses"),{headers:r});case 6:return a=t.sent,t.abrupt("return",a.data);case 8:case"end":return t.stop()}}),t)})))).apply(this,arguments)}function f(t){return l.apply(this,arguments)}function l(){return(l=(0,a.Z)((0,n.Z)().mark((function t(e){var r,a,o;return(0,n.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,u();case 2:return r=t.sent,a={Authorization:"Bearer ".concat(r)},t.next=6,s.Z.get("".concat(c,"/core/preview-courses/").concat(e),{headers:a});case 6:return o=t.sent,t.abrupt("return",o.data);case 8:case"end":return t.stop()}}),t)})))).apply(this,arguments)}}}]);
//# sourceMappingURL=872.9336a997.chunk.js.map