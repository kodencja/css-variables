(this["webpackJsonpcss-variables"]=this["webpackJsonpcss-variables"]||[]).push([[0],{17:function(e,t,n){},18:function(e,t,n){"use strict";n.r(t);var a=n(0),s=n(1),l=n.n(s),c=n(3),o=n.n(c),i=function(e){e&&e instanceof Function&&n.e(16).then(n.bind(null,63)).then((function(t){var n=t.getCLS,a=t.getFID,s=t.getFCP,l=t.getLCP,c=t.getTTFB;n(e),a(e),s(e),l(e),c(e)}))},r=n(5);o.a.render(Object(a.jsx)(l.a.StrictMode,{children:Object(a.jsx)(r.b,{})}),document.getElementById("root")),i()},5:function(e,t,n){"use strict";n.d(t,"a",(function(){return k}));var a=n(6),s=n(7),l=n(8),c=n(10),o=n(9),i=n(0),r=n(1),u=n.n(r),d=n(4),j=Object(r.lazy)((function(){return n.e(9).then(n.bind(null,65))})),h=Object(r.lazy)((function(){return n.e(11).then(n.bind(null,66))})),b=Object(r.lazy)((function(){return n.e(8).then(n.bind(null,67))})),O=Object(r.lazy)((function(){return n.e(13).then(n.bind(null,68))})),p=Object(r.lazy)((function(){return n.e(14).then(n.bind(null,69))})),g=Object(r.lazy)((function(){return n.e(10).then(n.bind(null,70))}));function f(){var e=Object(r.useState)(!1),t=Object(d.a)(e,2),n=t[0],a=t[1],s=Object(r.useContext)(k),l=s.onChanging,c=s.onValue,o=s.onOutputStyle,u=function(e,t,n){if(void 0!==t&&null!==t){var a=parseInt(t.getAttribute("min")),s=parseInt(t.getAttribute("max"));return a<0&&(a*=-1),{left:100*(parseInt(e)+a)/(a+s)+n}}},f=n?"form-group controls px-2 row move-up-mrg":"form-group controls px-2 row";return Object(i.jsxs)("div",{role:"navigation",className:"container-fluid sec1 m-0",children:[Object(i.jsx)("form",{className:"py-1 mx-auto",children:Object(i.jsx)("div",{className:f,children:Object(i.jsxs)(r.Suspense,{fallback:Object(i.jsx)("p",{children:"Loading..."}),children:[Object(i.jsx)(h,{onChanging:l,onValue:c}),Object(i.jsx)(b,{onChanging:l,onValue:c}),Object(i.jsx)(O,{onChanging:l,onValue:c,onOutputStyle:o,onGetOutputStyle:u}),Object(i.jsx)(j,{onChanging:l,onValue:c,onOutputStyle:o,onGetOutputStyle:u}),Object(i.jsx)(p,{onChanging:l,onValue:c,onOutputStyle:o,onGetOutputStyle:u})]})})}),Object(i.jsx)("form",{className:"anim-choice my-2",children:Object(i.jsxs)(r.Suspense,{fallback:Object(i.jsx)("p",{children:"Loading..."}),children:[Object(i.jsx)(g,{onChanging:l}),Object(i.jsx)("button",{className:"toggle-icon btn",onClick:function(e){e.preventDefault(),console.log("toggle icon clicked!"),a(!n)},children:n?"Show":"Hide"})]})})]})}var m=u.a.memo(f);function x(e){var t=e.onModalOpen;return Object(i.jsxs)("footer",{className:"down-buttons text-center",children:[Object(i.jsx)("button",{type:"link",className:"btn-down home-page-link shadow-mid-dark",children:Object(i.jsx)("a",{href:"https://codencja.herokuapp.com/",target:"_blank",rel:"noreferrer",children:"Back to Home Page"})}),Object(i.jsxs)("div",{children:[" ",Object(i.jsx)("b",{children:"\xa9 2021 "}),Object(i.jsx)("i",{children:"by"})," ",Object(i.jsx)("strong",{children:"Codencja"})]}),Object(i.jsx)("button",{type:"button",className:"btn btn-down shadow-mid-dark",onClick:function(){return t(!0)},children:"Code info"})]})}n.e(5).then(n.t.bind(null,71,7));var y=u.a.memo(x),v=(n(16),n(17),Object(r.lazy)((function(){return Promise.all([n.e(2),n.e(12)]).then(n.bind(null,64))}))),S=Object(r.lazy)((function(){return Promise.all([n.e(3),n.e(15)]).then(n.bind(null,74))})),k=u.a.createContext(),C=function(e){Object(c.a)(n,e);var t=Object(o.a)(n);function n(){var e;Object(s.a)(this,n);for(var l=arguments.length,c=new Array(l),o=0;o<l;o++)c[o]=arguments[o];return(e=t.call.apply(t,[this].concat(c))).state={blur:"0",color:"#f7f9d0",bgrCol:"#527198",skew:10,skewChanged:!1,rotatex:0,rotatey:10,rotatez:15,spacing:10,transOrigX:50,transOrigY:50,transOrigZ:0,animation:"animRotateXYZ",modalIsOpen:!1,outputStyle:!1},e.appRef=u.a.createRef(),e.handleChange=function(t){e.setState(Object(a.a)({},t.target.name,t.target.value)),"skew"===t.target.name&&e.setState({skewChanged:!e.state.skewChanged})},e.setOutputStyle=function(){e.setState({outputStyle:!e.state.outputStyle})},e.handleVal=function(){return e.state.spacing},e.handleModalOpen=function(t){e.setState({modalIsOpen:t})},e}return Object(l.a)(n,[{key:"componentDidUpdate",value:function(){var e=this,t=getComputedStyle(this.appRef.current).getPropertyValue("--skewVal");if(parseInt(t)!=this.state.skew){var n=this.state.animation;this.setState({skewChanged:!this.state.skewChanged,animation:"none"},(function(){e.setState({animation:n})}))}}},{key:"render",value:function(){var e=this.state,t=e.blur,n=e.modalIsOpen,a=e.skewChanged,s=e.skew,l={};return a&&(l["--skewVal"]=s),Object(i.jsxs)("div",{className:"App",style:l,ref:this.appRef,children:[Object(i.jsxs)("main",{className:"main p-0 m-0",children:[Object(i.jsxs)("div",{className:"font-weight-bold p-3 main-title",children:[Object(i.jsx)("h2",{children:"React Rotate App"}),Object(i.jsxs)("h4",{children:[Object(i.jsx)("span",{className:"titleBlur",style:{filter:"blur("+t+"px)"},children:"Update CSS Vars"})," ",Object(i.jsx)("span",{className:"titleCol",children:"with JS"})]})]}),Object(i.jsx)(k.Provider,{value:{onChanging:this.handleChange,onValue:this.state,onOutputStyle:this.setOutputStyle},children:Object(i.jsx)(m,{})}),Object(i.jsx)(r.Suspense,{fallback:Object(i.jsx)("p",{children:"Loading..."}),children:Object(i.jsx)(v,{onState:this.state})})]}),Object(i.jsx)(y,{onModalOpen:this.handleModalOpen}),Object(i.jsx)(r.Suspense,{fallback:Object(i.jsx)("p",{children:"Loading..."}),children:Object(i.jsx)(k.Provider,{value:{modalIsOpen:n,handleModalOpen:this.handleModalOpen},children:Object(i.jsx)(S,{isModalOpen:n,handleModalOpen:this.handleModalOpen})})})]})}}]),n}(r.Component);t.b=C}},[[18,1,4]]]);
//# sourceMappingURL=main.2e3cbdfd.chunk.js.map