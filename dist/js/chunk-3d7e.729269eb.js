(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3d7e"],{"03c5":function(t,e,a){},"386d":function(t,e,a){a("214f")("search",1,function(t,e,a){return[function(a){"use strict";var i=t(this),l=void 0==a?void 0:a[e];return void 0!==l?l.call(a,i):new RegExp(a)[e](String(i))},a]})},"4bd6":function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"layout-anomaly"},[a("div",{staticClass:"layout-anomaly-search"},[a("Form",{attrs:{model:t.search,inline:""}},[a("FormItem",{attrs:{label:"节目集名称:","label-width":80}},[a("Input",{staticStyle:{width:"210px"},attrs:{placeholder:"请输入节目集名称..."},model:{value:t.search.name,callback:function(e){t.$set(t.search,"name",e)},expression:"search.name"}})],1),a("FormItem",{attrs:{label:"分类:","label-width":50}},[a("Input",{staticStyle:{width:"210px"},attrs:{placeholder:"请输入分类..."},model:{value:t.search.category_name,callback:function(e){t.$set(t.search,"category_name",e)},expression:"search.category_name"}})],1),a("FormItem",{attrs:{label:"导演:","label-width":50}},[a("Input",{staticStyle:{width:"210px"},attrs:{placeholder:"请输入导演..."},model:{value:t.search.director,callback:function(e){t.$set(t.search,"director",e)},expression:"search.director"}})],1),a("FormItem",{attrs:{label:"创建时间:","label-width":70}},[a("DatePicker",{staticStyle:{width:"390px"},attrs:{type:"datetimerange",placement:"bottom-end",placeholder:"请选择请求时间..."},model:{value:t.timer,callback:function(e){t.timer=e},expression:"timer"}})],1),a("FormItem",{attrs:{label:"来源名称:","label-width":70}},[a("Select",{staticStyle:{width:"200px"},model:{value:t.search.cp_code,callback:function(e){t.$set(t.search,"cp_code",e)},expression:"search.cp_code"}},t._l(t.SourceList,function(e){return a("Option",{key:e.id,attrs:{value:e.id}},[t._v(t._s(e.name))])}))],1),a("FormItem",{attrs:{"label-width":30}},[a("Button",{attrs:{type:"primary"},on:{click:function(e){t.query()}}},[t._v("搜索")])],1)],1)],1),a("div",{staticStyle:{clear:"both"}}),a("div",{staticClass:"layout-anomaly-table"},[a("Table",{attrs:{border:"",columns:t.columns1,data:t.data1}})],1),a("div",{staticClass:"layout-anomaly-page"},[a("Page",{attrs:{total:t.total,current:t.page,"page-size":t.pageSize,"show-elevator":""},on:{"on-change":t.changePage}})],1),a("div",{staticClass:"layout-anomaly-edit"},[a("Modal",{attrs:{title:"修改"},model:{value:t.modalEdit,callback:function(e){t.modalEdit=e},expression:"modalEdit"}},[a("div",{attrs:{slot:"footer"},slot:"footer"},[a("a",{staticClass:"span",on:{click:function(e){t.modalEdit=!1}}},[t._v("取消")]),a("Button",{attrs:{type:"primary"},on:{click:t.editOk}},[t._v("确定")])],1),a("Form",{attrs:{model:t.edit,"label-position":"right","label-width":100}},[a("FormItem",{attrs:{label:"来源名称:"}},[a("Input",{attrs:{disabled:""},model:{value:t.edit.cp_name,callback:function(e){t.$set(t.edit,"cp_name",e)},expression:"edit.cp_name"}})],1),a("FormItem",{attrs:{label:"第三方ID:"}},[a("Input",{attrs:{disabled:""},model:{value:t.edit.cp_code,callback:function(e){t.$set(t.edit,"cp_code",e)},expression:"edit.cp_code"}})],1),a("FormItem",{attrs:{label:"节目名称:"}},[a("Input",{model:{value:t.edit.title,callback:function(e){t.$set(t.edit,"title",e)},expression:"edit.title"}})],1),a("FormItem",{attrs:{label:"分类:"}},[a("Input",{model:{value:t.edit.category_name,callback:function(e){t.$set(t.edit,"category_name",e)},expression:"edit.category_name"}})],1),a("FormItem",{attrs:{label:"标签:"}},[a("Input",{model:{value:t.edit.tags,callback:function(e){t.$set(t.edit,"tags",e)},expression:"edit.tags"}})],1),a("FormItem",{attrs:{label:"导演:"}},[a("Input",{model:{value:t.edit.directors,callback:function(e){t.$set(t.edit,"directors",e)},expression:"edit.directors"}})],1),a("FormItem",{attrs:{label:"主演:"}},[a("Input",{model:{value:t.edit.actors,callback:function(e){t.$set(t.edit,"actors",e)},expression:"edit.actors"}})],1),a("FormItem",{attrs:{label:"地区:"}},[a("Input",{model:{value:t.edit.area,callback:function(e){t.$set(t.edit,"area",e)},expression:"edit.area"}})],1),a("FormItem",{attrs:{label:"语言:"}},[a("Input",{model:{value:t.edit.language,callback:function(e){t.$set(t.edit,"language",e)},expression:"edit.language"}})],1),a("FormItem",{attrs:{label:"创建时间:"}},[a("Input",{attrs:{disabled:""},model:{value:t.edit.create_time,callback:function(e){t.$set(t.edit,"create_time",e)},expression:"edit.create_time"}})],1),a("FormItem",{attrs:{label:"最后更新时间:"}},[a("Input",{attrs:{disabled:""},model:{value:t.edit.update_time,callback:function(e){t.$set(t.edit,"update_time",e)},expression:"edit.update_time"}})],1)],1)],1)],1)])},l=[],s=(a("ac6a"),a("386d"),a("7f7f"),a("c1df")),n={data:function(){var t=this;return{search:{name:"",category_name:"",cp_code:"",director:"",start_time:"",end_time:""},SourceList:[],timer:[],edit:{},modalEdit:!1,id:"",total:0,page:1,pageSize:30,info:{},modalAdd:!1,columns1:[{title:"节目集ID",key:"album_id",align:"center"},{title:"节目集名称",key:"title",align:"center"},{title:"分类",key:"category_name",align:"center"},{title:"导演",key:"directors",align:"center"},{title:"来源名称",key:"cp_name",align:"center"},{title:"异常原因",key:"ISclean_status",align:"center"},{title:"创建时间",key:"Iscreate_time",align:"center",width:200},{title:"操作",align:"center",render:function(e,a){return e("div",[e("Button",{props:{type:"primary",size:"small"},style:{marginRight:"5px"},on:{click:function(){t.modify(a.row)}}},"修改")])}}],data1:[]}},methods:{getTableList:function(){var t=this,e=s(t.timer[0]).format("X"),a=s(t.timer[1]).format("X");isNaN(e)&&(e=""),isNaN(a)&&(a=""),t.$http(this.$config.BaseURL7+"/media/v2/anomaly/list?page="+t.page+"&pagesize="+t.pageSize+"&name="+t.search.name+"&category_name="+t.search.category_name+"&cp_code="+t.search.cp_code+"&director="+t.search.director+"&start_time="+e+"&end_time="+a).then(function(e){1e4==e.data.errno&&(console.log(e),t.data1=e.data.data.list,e.data.data.list.forEach(function(t){1==t.clean_status?t.ISclean_status="分类对应异常":2==t.clean_status?t.ISclean_status="地区对应异常":3==t.clean_status?t.ISclean_status="语言对应异常":4==t.clean_status&&(t.ISclean_status="类型标签对应异常"),t.Iscreate_time=s(1e3*t.create_time).format("YYYY-MM-DD HH:mm:ss")}),t.total=e.data.data.total)},function(t){})},query:function(){this.page=1,this.getTableList()},getSelectList:function(){var t=this;t.$http(this.$config.BaseURL1+"/media/v2/origin/list").then(function(e){1e4==e.data.errno&&(t.SourceList=e.data.data.list)},function(t){})},modify:function(t){this.edit=t,console.log(this.edit),this.modalEdit=!0,this.id=t.id},editOk:function(){var t=this;t.$http.post(this.$config.BaseURL7+"/media/v2/anomaly/modify?id="+t.id,t.edit).then(function(e){1e4==e.data.errno&&(t.edit={},t.modalEdit=!1,t.getTableList(),t.$Message.success("修改成功！"))},function(t){})},changePage:function(t){this.page=t,this.getTableList()}},mounted:function(){this.getTableList(),this.getSelectList()}},c=n,o=(a("59d1"),a("2877")),r=Object(o["a"])(c,i,l,!1,null,null,null);r.options.__file="anomaly.vue";e["default"]=r.exports},"59d1":function(t,e,a){"use strict";var i=a("03c5"),l=a.n(i);l.a}}]);