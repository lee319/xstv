(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7825"],{"2a96":function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"layout-search"},[a("div",{staticClass:"layout-search-search"},[a("Form",{attrs:{model:t.search,inline:""}},[a("FormItem",{attrs:{label:"来源名称:","label-width":70}},[a("Input",{staticStyle:{width:"200px"},attrs:{placeholder:"请输入来源名称..."},model:{value:t.search.src_name,callback:function(e){t.$set(t.search,"src_name",e)},expression:"search.src_name"}})],1),a("FormItem",[a("Button",{attrs:{type:"primary"},on:{click:t.query}},[t._v("搜索")])],1)],1)],1),a("div",{staticClass:"layout-search-table"},[a("Table",{attrs:{border:"",columns:t.columns1,data:t.data1}})],1),a("div",{staticClass:"layout-search-page"},[a("Page",{attrs:{total:t.total,current:t.page,"page-size":t.pageSize,"show-elevator":""},on:{"on-change":t.changePage}})],1),a("Modal",{attrs:{title:"来源播放优先级"},model:{value:t.modalEdit,callback:function(e){t.modalEdit=e},expression:"modalEdit"}},[a("div",{attrs:{slot:"footer"},slot:"footer"},[a("a",{staticClass:"span",on:{click:t.modalEditBtn}},[t._v("取消")]),a("Button",{attrs:{type:"primary"},on:{click:t.okEdit}},[t._v("确定")])],1),a("Form",{attrs:{model:t.edit,"label-position":"right","label-width":100}},[a("FormItem",{attrs:{label:"来源ID:"}},[a("Input",{attrs:{disabled:""},model:{value:t.edit.id,callback:function(e){t.$set(t.edit,"id",e)},expression:"edit.id"}})],1),a("FormItem",{attrs:{label:"来源名称:"}},[a("Input",{attrs:{disabled:""},model:{value:t.edit.src_name,callback:function(e){t.$set(t.edit,"src_name",e)},expression:"edit.src_name"}})],1),a("FormItem",{attrs:{label:"播放排序:"}},[a("Input",{model:{value:t.edit.order,callback:function(e){t.$set(t.edit,"order",e)},expression:"edit.order"}})],1),a("FormItem",{attrs:{label:"描述:"}},[a("Input",{attrs:{type:"textarea",rows:4},model:{value:t.edit.desc,callback:function(e){t.$set(t.edit,"desc",e)},expression:"edit.desc"}})],1)],1)],1)],1)},s=[],r={data:function(){var t=this;return{search:{src_name:""},id:"",edit:{},modalEdit:!1,total:0,page:1,pageSize:30,columns1:[{title:"ID",key:"id",align:"center"},{title:"来源名称",key:"src_name",align:"center"},{title:"来源logo",key:"src_logo",align:"center",render:function(t,e){return t("div",[t("img",{attrs:{src:e.row.src_logo},style:{width:"50px",height:"50px",marginTop:"5px"}})])}},{title:"播放排序",key:"order",align:"center"},{title:"描述",key:"desc",align:"center"},{title:"操作",width:200,align:"center",render:function(e,a){return e("div",[e("Button",{props:{type:"primary",size:"small"},style:{marginRight:"5px"},on:{click:function(){t.modify(a.row)}}},"修改")])}}],data1:[]}},methods:{getTableList:function(){var t=this;this.$http(this.$config.BaseURL1+"/media/v2/priority/search/list?src_name="+this.src_name+"&page="+this.page+"&pageSize="+this.pageSize).then(function(e){1e4==e.data.errno&&(t.data1=e.data.data.list,t.total=e.data.data.total)})},query:function(){this.page=1,this.getTableList()},changePage:function(t){this.page=t,this.getTableList()},modify:function(t){this.edit=t,this.id=t.id,this.modalEdit=!0},okEdit:function(){var t=this;this.$http.post(this.$config.BaseURL1+"/media/v2/priority/search/edit?src_id="+this.id,this.edit).then(function(e){1e4==e.data.errno&&(t.modalEdit=!1,t.getTableList(),t.$Message.success("修改成功！"))})},modalEditBtn:function(){this.modalEdit=!1,this.getTableList()}}},n=r,l=(a("3698"),a("2877")),o=Object(l["a"])(n,i,s,!1,null,null,null);o.options.__file="search.vue";e["default"]=o.exports},3698:function(t,e,a){"use strict";var i=a("5c8b"),s=a.n(i);s.a},"5c8b":function(t,e,a){}}]);