(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[492],{1127:function(e,n,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/blog/[slug]",function(){return t(9)}])},9884:function(e,n,t){"use strict";t.d(n,{Z:function(){return o}});var r=t(5893),i=t(3808),c=t.n(i);function o(e){var n=e.children;return(0,r.jsx)("main",{className:c().container,children:n})}},6359:function(e,n,t){"use strict";t.d(n,{Z:function(){return a}});var r=t(5893),i=t(1607),c=t.n(i),o=t(1664),u=t.n(o);function a(e){var n=e.icon,t=e.title,i=e.label,o=e.href,a=e.onClick,s=e.newPage,l=void 0===s||s;return(0,r.jsx)("li",{className:"cardItem ".concat(c().social),children:(0,r.jsx)(u(),{href:o,children:(0,r.jsxs)("a",{onClick:a,"aria-label":i,target:l?"_blank":"_self",title:t,rel:"noreferrer",children:[(0,r.jsx)("i",{className:n}),t?(0,r.jsx)("span",{children:t}):(0,r.jsx)(r.Fragment,{})]})})})}},715:function(e,n,t){"use strict";function r(e){return(e=(e=(e=e.replace(/\b(\w+)\/(\w+(?!#\d+))\b/,"\n")).replace(/<[^>]*>/g," ")).trim()).split(" ").length}function i(e){return Math.ceil(e/200)}function c(e,n){return e.length>n?"".concat(e.substring(0,n-1),"..."):e}function o(e){for(var n,t=/<h[1-6]+.*?id="([^"]*?)".*?>(.+?)<\/h[1-6]>/gi,r=[];null!==(n=t.exec(e));)r.push({id:n[1],content:n[2]});return r}t.d(n,{$G:function(){return c},CS:function(){return i},Ht:function(){return r},qk:function(){return o}})},9:function(e,n,t){"use strict";t.r(n),t.d(n,{__N_SSG:function(){return R},default:function(){return S}});var r=t(5893),i=t(7927),c=t.n(i),o=t(9008),u=t.n(o),a=t(1163),s=t(655),l=t(7294),f=t(4735),d=t(5411);var h=t(240),x=t(6681),m=0;function p(){var e=m;return m++,e}var v=function(e){var n=e.children,t=e.initial,r=e.isPresent,i=e.onExitComplete,c=e.custom,o=e.presenceAffectsLayout,u=(0,x.h)(_),a=(0,x.h)(p),f=(0,l.useMemo)((function(){return{id:a,initial:t,isPresent:r,custom:c,onExitComplete:function(e){var n,t;u.set(e,!0);try{for(var r=(0,s.XA)(u.values()),c=r.next();!c.done;c=r.next()){if(!c.value)return}}catch(o){n={error:o}}finally{try{c&&!c.done&&(t=r.return)&&t.call(r)}finally{if(n)throw n.error}}null===i||void 0===i||i()},register:function(e){return u.set(e,!1),function(){return u.delete(e)}}}}),o?void 0:[r]);return(0,l.useMemo)((function(){u.forEach((function(e,n){return u.set(n,!1)}))}),[r]),l.useEffect((function(){!r&&!u.size&&(null===i||void 0===i||i())}),[r]),l.createElement(h.O.Provider,{value:f},n)};function _(){return new Map}var g=t(5364);function E(e){return e.key||""}var b=function(e){var n=e.children,t=e.custom,r=e.initial,i=void 0===r||r,c=e.onExitComplete,o=e.exitBeforeEnter,u=e.presenceAffectsLayout,a=void 0===u||u,h=(0,s.CR)(function(){var e=(0,l.useRef)(!1),n=(0,s.CR)((0,l.useState)(0),2),t=n[0],r=n[1];(0,d.z)((function(){return e.current=!0}));var i=(0,l.useCallback)((function(){!e.current&&r(t+1)}),[t]);return[(0,l.useCallback)((function(){return f.ZP.postRender(i)}),[i]),t]}(),1),x=h[0],m=(0,l.useContext)(g.p).forceRender;m&&(x=m);var p=(0,l.useRef)(!0),_=(0,l.useRef)(!0);(0,l.useEffect)((function(){return function(){_.current=!1}}),[]);var b=function(e){var n=[];return l.Children.forEach(e,(function(e){(0,l.isValidElement)(e)&&n.push(e)})),n}(n),j=(0,l.useRef)(b),k=(0,l.useRef)(new Map).current,y=(0,l.useRef)(new Set).current;if(function(e,n){e.forEach((function(e){var t=E(e);n.set(t,e)}))}(b,k),p.current)return p.current=!1,l.createElement(l.Fragment,null,b.map((function(e){return l.createElement(v,{key:E(e),isPresent:!0,initial:!!i&&void 0,presenceAffectsLayout:a},e)})));for(var P=(0,s.ev)([],(0,s.CR)(b),!1),w=j.current.map(E),C=b.map(E),N=w.length,R=0;R<N;R++){var S=w[R];-1===C.indexOf(S)?y.add(S):y.delete(S)}return o&&y.size&&(P=[]),y.forEach((function(e){if(-1===C.indexOf(e)){var n=k.get(e);if(n){var r=w.indexOf(e);P.splice(r,0,l.createElement(v,{key:E(n),isPresent:!1,onExitComplete:function(){k.delete(e),y.delete(e);var n=j.current.findIndex((function(n){return n.key===e}));if(j.current.splice(n,1),!y.size){if(j.current=b,!1===_.current)return;x(),c&&c()}},custom:t,presenceAffectsLayout:a},n))}}})),P=P.map((function(e){var n=e.key;return y.has(n)?e:l.createElement(v,{key:E(e),isPresent:!0,presenceAffectsLayout:a},e)})),j.current=P,l.createElement(l.Fragment,null,y.size?P:P.map((function(e){return(0,l.cloneElement)(e)})))},j=t(2023),k=t(4768),y=t(1499),P=t(6284),w=t(9884),C=t(6359),N=t(715),R=!0;function S(e){var n=e.posts,t=(0,a.useRouter)().query.slug,i=n.find((function(e){return e.slug==t}));if(!i)throw new Error("Unable to find post.");var o=(0,N.Ht)(i.content),s=(0,N.CS)(o),f=(0,N.qk)(i.content),d=(0,l.useState)(!0),h=d[0],x=d[1];return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(u(),{children:(0,r.jsxs)("title",{children:[i.title," \xb7 Arda Fevzi Armutcu"]})}),(0,r.jsxs)(w.Z,{children:[(0,r.jsx)("ul",{className:"flex flexRight ".concat(c().backButton),children:(0,r.jsx)(C.Z,{icon:"bx bx-undo",label:"back",title:"Back to Posts",href:"/blog",newPage:!1})}),(0,r.jsxs)("section",{className:"flex ".concat(c().mainSection),children:[(0,r.jsx)(j.E.div,{layoutId:i.slug,initial:!1,className:"cardItem ".concat(c().post),children:(0,r.jsxs)(j.E.div,{layout:"size",initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},children:[(0,r.jsxs)("span",{children:[i.date," \ud83d\uddd3\ufe0f | ",o," Words \ud83d\udcc4 | ~",s," Minutes \u23f1\ufe0f"]}),(0,r.jsx)("hr",{}),(0,r.jsx)(P.D,{remarkPlugins:[y.Z],rehypePlugins:[k.Z],children:i.content})]})}),(0,r.jsxs)(j.E.section,{className:c().anchorList,animate:{flex:h?"1 0 250px":0},transition:{stiffness:200},children:[(0,r.jsx)("ul",{children:(0,r.jsx)(C.Z,{icon:h?"bx bx-arrow-from-left":"bx bx-arrow-from-right",label:"hide",title:h?"Hide Sidebar":"",href:"#",onClick:function(){return x((function(e){return!e}))},newPage:!1})}),(0,r.jsx)(b,{children:h&&(0,r.jsx)(j.E.ul,{className:"".concat(c().anchors),initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},children:f.map((function(e){return(0,r.jsx)(C.Z,{icon:"bx bxs-chevron-right",label:e.id,title:(0,N.$G)(e.content,25),href:"#".concat(e.id),newPage:!1},e.id)}))})})]})]})]})]})}},7927:function(e){e.exports={backButton:"BlogPost_backButton__pZKrv",mainSection:"BlogPost_mainSection__m3aMO",anchorList:"BlogPost_anchorList__a6ZRE",post:"BlogPost_post__nMizz",anchors:"BlogPost_anchors__uuomk"}},3808:function(e){e.exports={container:"PageBase_container__Y3eAZ"}},1607:function(e){e.exports={social:"SocialItem_social__cwe7h"}},1163:function(e,n,t){e.exports=t(880)}},function(e){e.O(0,[399,257,774,888,179],(function(){return n=1127,e(e.s=n);var n}));var n=e.O();_N_E=n}]);