(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-66ff"],{2907:function(t,e,a){"use strict";var i=a("4018"),s=a.n(i);s.a},"386d":function(t,e,a){a("214f")("search",1,function(t,e,a){return[function(a){"use strict";var i=t(this),s=void 0==a?void 0:a[e];return void 0!==s?s.call(a,i):new RegExp(a)[e](String(i))},a]})},4018:function(t,e,a){},9241:function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"layout-distribute"},[a("div",{staticClass:"layout-distribute-search"},[a("Form",{attrs:{model:t.search,inline:""}},[a("FormItem",{attrs:{label:"业务名称:","label-width":70}},[a("Input",{staticStyle:{width:"200px"},attrs:{placeholder:"请输入业务名称..."},model:{value:t.search.name,callback:function(e){t.$set(t.search,"name",e)},expression:"search.name"}})],1),a("FormItem",{attrs:{label:"是否启用:","label-width":70}},[a("Select",{staticStyle:{width:"200px"},attrs:{"aria-placeholder":"请选择是否启用..."},model:{value:t.search.status,callback:function(e){t.$set(t.search,"status",e)},expression:"search.status"}},[a("Option",{attrs:{value:""}},[t._v("全部")]),a("Option",{attrs:{value:1}},[t._v("启用")]),a("Option",{attrs:{value:2}},[t._v("不启用")])],1)],1),a("FormItem",[a("Button",{attrs:{type:"primary"},on:{click:t.query}},[t._v("搜索")])],1)],1)],1),a("div",{staticClass:"layout-distribute-add"},[a("Button",{attrs:{type:"success"},on:{click:t.modalAddBtn}},[t._v("添加")]),a("Modal",{attrs:{title:"添加"},model:{value:t.modalAdd,callback:function(e){t.modalAdd=e},expression:"modalAdd"}},[a("div",{attrs:{slot:"footer"},slot:"footer"},[a("a",{staticClass:"span",on:{click:t.addCancel}},[t._v("取消")]),a("Button",{attrs:{type:"primary"},on:{click:t.addOk}},[t._v("确定")])],1),a("Form",{attrs:{model:t.info,"label-position":"right","label-width":100}},[a("FormItem",{attrs:{label:"业务名称:"}},[a("Input",{attrs:{placeholder:"请输入业务名称..."},model:{value:t.info.name,callback:function(e){t.$set(t.info,"name",e)},expression:"info.name"}})],1),a("FormItem",{attrs:{label:"下发来源:"}},[a("CheckboxGroup",{model:{value:t.info.cp_id,callback:function(e){t.$set(t.info,"cp_id",e)},expression:"info.cp_id"}},t._l(t.CheckboxList,function(e){return a("Checkbox",{attrs:{label:e.id}},[t._v(t._s(e.name))])}))],1),a("FormItem",{attrs:{label:"下发频道:"}},[a("CheckboxGroup",{model:{value:t.info.category_id,callback:function(e){t.$set(t.info,"category_id",e)},expression:"info.category_id"}},t._l(t.CheckboxList1,function(e){return a("Checkbox",{attrs:{label:e.id}},[t._v(t._s(e.name))])}))],1),a("FormItem",{attrs:{label:"描述:"}},[a("Input",{attrs:{type:"textarea",rows:4,placeholder:"请输入描述..."},model:{value:t.info.desc,callback:function(e){t.$set(t.info,"desc",e)},expression:"info.desc"}})],1)],1)],1)],1),a("div",{staticClass:"layout-distribute-edit"},[a("Modal",{attrs:{title:"修改分发业务信息"},model:{value:t.modalEdit,callback:function(e){t.modalEdit=e},expression:"modalEdit"}},[a("div",{attrs:{slot:"footer"},slot:"footer"},[a("a",{staticClass:"span",on:{click:t.editCancel}},[t._v("取消")]),a("Button",{attrs:{type:"primary"},on:{click:t.editOk}},[t._v("确定")])],1),a("Form",{attrs:{model:t.edit,"label-position":"right","label-width":100}},[a("FormItem",{attrs:{label:"业务ID:"}},[a("Input",{attrs:{disabled:"",placeholder:"请输入业务ID..."},model:{value:t.edit.id,callback:function(e){t.$set(t.edit,"id",e)},expression:"edit.id"}})],1),a("FormItem",{attrs:{label:"业务名称:"}},[a("Input",{attrs:{placeholder:"请输入业务名称..."},model:{value:t.edit.name,callback:function(e){t.$set(t.edit,"name",e)},expression:"edit.name"}})],1),a("FormItem",{attrs:{label:"下发来源:"}},[a("CheckboxGroup",{model:{value:t.edit.cp_id,callback:function(e){t.$set(t.edit,"cp_id",e)},expression:"edit.cp_id"}},t._l(t.CheckboxList2,function(e){return a("Checkbox",{attrs:{label:e.id}},[t._v(t._s(e.name))])}))],1),a("FormItem",{attrs:{label:"下发频道:"}},[a("CheckboxGroup",{model:{value:t.edit.category_id,callback:function(e){t.$set(t.edit,"category_id",e)},expression:"edit.category_id"}},t._l(t.CheckboxList3,function(e){return a("Checkbox",{attrs:{label:e.id}},[t._v(t._s(e.name))])}))],1),a("FormItem",{attrs:{label:"是否启用:"}},[a("RadioGroup",{model:{value:t.edit.status,callback:function(e){t.$set(t.edit,"status",e)},expression:"edit.status"}},[a("Radio",{attrs:{label:1}},[t._v("是")]),a("Radio",{attrs:{label:0}},[t._v("否")])],1)],1),a("FormItem",{attrs:{label:"描述"}},[a("Input",{attrs:{type:"textarea",rows:4,placeholder:"请输入描述..."},model:{value:t.edit.desc,callback:function(e){t.$set(t.edit,"desc",e)},expression:"edit.desc"}})],1)],1)],1)],1),a("div",{staticStyle:{clear:"both"}}),a("div",{staticClass:"layout-distribute-table"},[a("Table",{attrs:{border:"",columns:t.columns1,data:t.data1}})],1),a("div",{staticClass:"layout-distribute-page"},[a("Page",{attrs:{total:t.total,current:t.page,"page-size":t.pageSize,"show-elevator":""},on:{"on-change":t.changePage}})],1)])},s=[],o=(a("ac6a"),a("7f7f"),a("386d"),a("c1df")),n={data:function(){var t=this;return{search:{name:"",status:""},total:0,page:1,pageSize:30,info:{},themeInfo:{},modalAdd:!1,id:"",edit:{},modalEdit:!1,CheckboxList:[],CheckboxList1:[],CheckboxList2:[],CheckboxList3:[],columns1:[{title:"业务ID",key:"id",align:"center"},{title:"业务名称",key:"name",align:"center"},{title:"是否启用",key:"ISstatus",align:"center"},{title:"描述",key:"desc",align:"center"},{title:"创建时间",key:"is_create_time",align:"center"},{title:"操作",align:"center",render:function(e,a){return e("div",[e("Button",{props:{type:"primary",size:"small"},style:{marginRight:"5px"},on:{click:function(){t.modify(a.row)}}},"修改")])}}],data1:[]}},methods:{getTableList:function(){var t=this;void 0==this.search.status&&(this.search.status=""),t.$http(this.$config.BaseURL7+"/media/v2/distribute/list?name="+t.search.name+"&status="+t.search.status+"&page="+t.page+"&pagesize="+t.pageSize).then(function(e){console.log(e),1e4==e.data.errno&&(t.data1=e.data.data.list,t.total=e.data.data.total,e.data.data.list.forEach(function(t){1==t.status?t.ISstatus="启用":2==t.status&&(t.ISstatus="不启用"),t.is_create_time=o(t.create_time).format("YYYY-MM-DD HH:mm:ss")}))})},query:function(){this.page=1,this.getTableList()},changePage:function(t){this.page=t,this.getTableList()},getCheckboxList:function(){var t=this;t.$http(this.$config.BaseURL1+"/media/v2/origin/list").then(function(e){console.log(e),1e4==e.data.errno&&(t.CheckboxList=e.data.data.list,t.CheckboxList2=e.data.data.list)})},getCheckboxList1:function(){var t=this;t.$http(this.$config.BaseURL1+"/media/v2/category/list").then(function(e){console.log(e),1e4==e.data.errno&&(t.CheckboxList1=e.data.data.list,t.CheckboxList3=e.data.data.list)})},getCheckboxList2:function(){var t=this;t.$http(this.$config.BaseURL1+"/media/v2/origin/list").then(function(e){console.log(e),1e4==e.data.errno&&(t.CheckboxList2=e.data.data.list)})},getCheckboxList3:function(){var t=this;t.$http(this.$config.BaseURL1+"/media/v2/category/list").then(function(e){console.log(e),1e4==e.data.errno&&(t.CheckboxList3=e.data.data.list)})},modalAddBtn:function(){this.modalAdd=!0,this.getCheckboxList(),this.getCheckboxList1()},addOk:function(){var t=this,e=this;e.$http.post(this.$config.BaseURL7+"/media/v2/distribute/modify",e.info).then(function(e){1e4==e.data.errno&&(t.info={},t.getTableList(),t.modalAdd=!1,t.$Message.success("添加成功！"))})},addCancel:function(){this.modalAdd=!1,this.info={},this.getTableList()},modify:function(t){console.log(t),this.edit=t,this.id=t.id,this.getCheckboxList2(),this.getCheckboxList3(),this.modalEdit=!0},editOk:function(){var t=this,e=this;e.$http.post(this.$config.BaseURL7+"/media/v2/distribute/modify",e.edit).then(function(e){console.log(e,"response"),1e4==e.data.errno&&(t.modalEdit=!1,t.edit={},t.getTableList(),t.$Message.success("修改成功！"))})},editCancel:function(){this.getTableList(),this.edit={},this.modalEdit=!1}},mounted:function(){this.getTableList()}},l=n,c=(a("2907"),a("2877")),d=Object(c["a"])(l,i,s,!1,null,null,null);d.options.__file="distribute.vue";e["default"]=d.exports}}]);