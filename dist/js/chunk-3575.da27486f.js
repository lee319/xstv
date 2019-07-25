(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3575"],{"0837":function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"layout-virtual"},[a("div",{staticClass:"layout-virtual-search"},[a("Form",{attrs:{model:t.search,inline:""}},[a("FormItem",{attrs:{label:"分类:","label-width":40}},[a("Input",{staticStyle:{width:"200px"},attrs:{placeholder:"请输入分类..."},model:{value:t.search.name,callback:function(e){t.$set(t.search,"name",e)},expression:"search.name"}})],1),a("FormItem",{attrs:{label:"类型:","label-width":40}},[a("Select",{staticStyle:{width:"200px"},attrs:{placeholder:"请选择类型..."},model:{value:t.search.type,callback:function(e){t.$set(t.search,"type",e)},expression:"search.type"}},[a("Option",{attrs:{value:""}},[t._v("全部")]),a("Option",{attrs:{value:1}},[t._v("媒资分类")]),a("Option",{attrs:{value:2}},[t._v("虚拟分类")])],1)],1),a("FormItem",[a("Button",{attrs:{type:"primary"},on:{click:t.query}},[t._v("搜索")])],1)],1)],1),a("div",{staticClass:"layout-virtual-add"},[a("Button",{attrs:{type:"success"},on:{click:t.modalAddBtn}},[t._v("添加")]),a("Modal",{attrs:{title:"添加"},model:{value:t.modalAdd,callback:function(e){t.modalAdd=e},expression:"modalAdd"}},[a("div",{attrs:{slot:"footer"},slot:"footer"},[a("a",{staticClass:"span",on:{click:t.addCancel}},[t._v("取消")]),a("Button",{attrs:{type:"primary"},on:{click:t.addOk}},[t._v("确定")])],1),a("Form",{ref:"info",attrs:{model:t.info,"label-position":"right","label-width":100,rules:t.ruleValidate}},[a("FormItem",{attrs:{label:"虚拟分类名称:",prop:"name"}},[a("Input",{attrs:{placeholder:"请输入虚拟分类名称..."},model:{value:t.info.name,callback:function(e){t.$set(t.info,"name",e)},expression:"info.name"}})],1),a("FormItem",{attrs:{label:"描述:",prop:"desc"}},[a("Input",{attrs:{type:"textarea",rows:4,placeholder:"请输入描述..."},model:{value:t.info.desc,callback:function(e){t.$set(t.info,"desc",e)},expression:"info.desc"}})],1)],1)],1)],1),a("div",{staticClass:"layout-virtual-edit"},[a("Modal",{attrs:{title:"修改"},model:{value:t.modalEdit,callback:function(e){t.modalEdit=e},expression:"modalEdit"}},[a("div",{attrs:{slot:"footer"},slot:"footer"},[a("a",{staticClass:"span",on:{click:t.modalEditBtn}},[t._v("取消")]),a("Button",{attrs:{type:"primary"},on:{click:t.editOk}},[t._v("确定")])],1),a("Form",{ref:"edit",attrs:{model:t.edit,"label-position":"right","label-width":100,rules:t.ruleValidate}},[a("FormItem",{attrs:{label:"虚拟分类名称:",prop:"name"}},[a("Input",{attrs:{placeholder:"请输入虚拟分类名称..."},model:{value:t.edit.name,callback:function(e){t.$set(t.edit,"name",e)},expression:"edit.name"}})],1),a("FormItem",{attrs:{label:"描述:",prop:"desc"}},[a("Input",{attrs:{type:"textarea",rows:4,placeholder:"请输入描述..."},model:{value:t.edit.desc,callback:function(e){t.$set(t.edit,"desc",e)},expression:"edit.desc"}})],1)],1)],1)],1),a("div",{staticClass:"layout-virtual-table"},[a("Table",{attrs:{border:"",columns:t.columns1,data:t.data1}})],1),a("div",{staticClass:"layout-virtual-page"},[a("Page",{attrs:{total:t.total,current:t.page,"page-size":t.pageSize,"show-elevator":""},on:{"on-change":t.changePage}})],1)])},s=[],o=(a("ac6a"),a("7f7f"),a("386d"),a("4328"),a("c1df")),n={data:function(){var t=this;return{search:{name:"",type:""},info:{name:"",desc:""},modalAdd:!1,edit:{},modalEdit:!1,pageSize:3,page:1,total:0,id:"",ruleValidate:{name:[{required:!0,message:"请输入虚拟分类名称",trigger:"blur"}],desc:[{required:!0,message:"请输入描述",trigger:"blur"}]},columns1:[{title:"分类ID",key:"id",align:"center"},{title:"分类名称",key:"name",align:"center"},{title:"类型",key:"Istype",align:"center"},{title:"创建时间",key:"create_time",align:"center"},{title:"描述",key:"desc",align:"center"},{title:"操作",align:"center",width:300,render:function(e,a){return e("div",[e("Button",{props:{type:"primary",size:"small"},style:{marginRight:"5px"},on:{click:function(){t.topic()}}},"topic管理 "),e("Button",{props:{type:"warning",size:"small"},style:{marginRight:"5px"},on:{click:function(){t.filter(a.row)}}},"筛选管理"),e("Button",{props:{type:"primary",size:"small"},style:{marginRight:"5px"},on:{click:function(){t.modify(a.row)}}},"修改"),e("Poptip",{props:{confirm:!0,title:"确定要删除吗！",type:"error",size:"small",width:"150"},on:{"on-ok":function(){t.remove(a.row)}}},[e("Button",{props:{type:"error",size:"small"}},"删除")])])}}],data1:[]}},methods:{getTableList:function(){var t=this;void 0==this.search.type&&(this.search.type=""),t.$http(this.$config.BaseURL8+"/cms/category/lists?pageSize="+t.pageSize+"&page="+t.page+"&name="+t.search.name+"&type="+t.search.type).then(function(e){1e4==e.data.errno&&(console.log(e),t.data1=e.data.data.list,e.data.data.list.forEach(function(t){t.create_time=o(t.create_time).format("YYYY-MM-DD"),1==t.type?t.Istype="媒资分类":2==t.type&&(t.Istype="虚拟分类")}),t.total=e.data.data.total)})},query:function(){this.page=1,this.getTableList()},topic:function(){this.$router.push({path:"recommend"})},filter:function(t){this.$router.push({path:"filter",query:{id:t.id,name:t.name}})},modalAddBtn:function(){this.modalAdd=!0},addOk:function(){var t=this,e=this,a=!0;e.$refs["info"].validate(function(e){0==e&&(t.$Message.error("表单输入有误,请检查!"),a=!1)}),0!=a&&e.$http.post(this.$config.BaseURL8+"/cms/category/modify",e.info).then(function(t){1e4==t.data.errno&&(console.log(t),e.info={},e.getTableList(),e.modalAdd=!1,e.$Message.success("添加成功"))})},addCancel:function(){this.modalAdd=!1,this.info={},this.$Message.info("点击了取消!")},modify:function(t){this.modalEdit=!0,this.edit=t,this.id=t.id},editOk:function(){var t=this,e=this,a=!0;e.$refs["edit"].validate(function(e){0==e&&(t.$Message.error("表单输入有误,请检查!"),a=!1)}),0!=a&&e.$http.post(this.$config.BaseURL8+"/cms/category/modify?id="+e.id,e.edit).then(function(t){1e4==t.data.errno&&(console.log(t),e.getTableList(),e.modalEdit=!1,e.$Message.success("修改成功"))})},modalEditBtn:function(){this.getTableList(),this.modalEdit=!1},remove:function(t){var e=this,a=this;a.$http.post(this.$config.BaseURL8+"/cms/category/delete",{id:t.id}).then(function(t){1e4==t.data.errno&&(e.$Message.success("删除成功"),e.getTableList())})},changePage:function(t){this.page=t,this.getTableList()}},mounted:function(){this.getTableList()}},l=n,r=(a("33c2"),a("2877")),c=Object(r["a"])(l,i,s,!1,null,null,null);c.options.__file="virtual.vue";e["default"]=c.exports},"22d5":function(t,e,a){},"33c2":function(t,e,a){"use strict";var i=a("22d5"),s=a.n(i);s.a},"386d":function(t,e,a){a("214f")("search",1,function(t,e,a){return[function(a){"use strict";var i=t(this),s=void 0==a?void 0:a[e];return void 0!==s?s.call(a,i):new RegExp(a)[e](String(i))},a]})}}]);