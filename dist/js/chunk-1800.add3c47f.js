(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1800"],{"386d":function(t,e,a){a("214f")("search",1,function(t,e,a){return[function(a){"use strict";var o=t(this),i=void 0==a?void 0:a[e];return void 0!==i?i.call(a,o):new RegExp(a)[e](String(o))},a]})},"3c38":function(t,e,a){"use strict";var o=a("5021"),i=a.n(o);i.a},5021:function(t,e,a){},dbdc:function(t,e,a){"use strict";a.r(e);var o=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"layout-bootvideo2"},[a("div",{staticClass:"layout-bootvideo2-search"},[a("Form",{attrs:{model:t.search,inline:""}},[a("FormItem",{attrs:{label:"视频名称:","label-width":70}},[a("Input",{staticStyle:{width:"200px"},attrs:{placeholder:"请输入视频名称..."},model:{value:t.search.title,callback:function(e){t.$set(t.search,"title",e)},expression:"search.title"}})],1),a("FormItem",[a("Button",{attrs:{type:"primary"},on:{click:t.query}},[t._v("搜索")])],1)],1)],1),a("div",{staticClass:"layout-bootvideo2-add"},[a("Button",{attrs:{type:"success"},on:{click:function(e){t.modalAdd=!0,t.addUploadUrl=""}}},[t._v("添加")]),a("Modal",{attrs:{title:"添加"},model:{value:t.modalAdd,callback:function(e){t.modalAdd=e},expression:"modalAdd"}},[a("div",{attrs:{slot:"footer"},slot:"footer"},[a("a",{staticClass:"span",on:{click:t.addCancel}},[t._v("取消")]),a("Button",{attrs:{type:"primary"},on:{click:t.addOk}},[t._v("确定")])],1),a("Form",{ref:"info",attrs:{model:t.info,"label-position":"right","label-width":100,rules:t.ruleValidate}},[a("FormItem",{attrs:{label:"视频名称:",prop:"title"}},[a("Input",{attrs:{placeholder:"请输入视频名称..."},model:{value:t.info.title,callback:function(e){t.$set(t.info,"title",e)},expression:"info.title"}})],1),a("FormItem",{attrs:{label:"上传视频:"}},[a("Upload",{ref:"upload",attrs:{action:t.$config.BaseURLfile+"/common/upload/file","on-success":t.handleSuccess1,"with-credentials":!0}},[a("Button",{attrs:{icon:"ios-cloud-upload-outline"}},[t._v("上传视频地址")])],1)],1),a("FormItem",{attrs:{label:"视频格式:",prop:"videoFormat"}},[a("Input",{attrs:{placeholder:"请输入视频格式..."},model:{value:t.info.videoFormat,callback:function(e){t.$set(t.info,"videoFormat",e)},expression:"info.videoFormat"}})],1),a("FormItem",{attrs:{label:"文件md5值:"}},[a("Input",{attrs:{placeholder:"请输入视频文件Md5值..."},model:{value:t.info.videoMd5,callback:function(e){t.$set(t.info,"videoMd5",e)},expression:"info.videoMd5"}})],1),a("FormItem",{attrs:{label:"状态:",prop:"status"}},[a("Select",{attrs:{placeholder:"请选择状态..."},model:{value:t.info.status,callback:function(e){t.$set(t.info,"status",e)},expression:"info.status"}},[a("Option",{attrs:{value:1}},[t._v("启用")]),a("Option",{attrs:{value:0}},[t._v("禁用")])],1)],1),a("FormItem",{attrs:{label:"描述:"}},[a("Input",{attrs:{type:"textarea",rows:4,placeholder:"请输入描述..."},model:{value:t.info.describe,callback:function(e){t.$set(t.info,"describe",e)},expression:"info.describe"}})],1)],1)],1)],1),a("div",{staticStyle:{clear:"both"}}),a("div",{staticClass:"layout-bootvideo2-table"},[a("Table",{attrs:{border:"",columns:t.columns1,data:t.data1}})],1),a("div",{staticClass:"layout-bootvideo2-page"},[a("Page",{attrs:{total:t.total,current:t.page,"page-size":t.pageSize,"show-elevator":""},on:{"on-change":t.changePage}})],1),a("div",[a("Modal",{attrs:{title:"修改"},model:{value:t.modalEdit,callback:function(e){t.modalEdit=e},expression:"modalEdit"}},[a("div",{attrs:{slot:"footer"},slot:"footer"},[a("a",{staticClass:"span",on:{click:function(e){t.modalEdit=!1}}},[t._v("取消")]),a("Button",{attrs:{type:"primary"},on:{click:t.editOk}},[t._v("确定")])],1),a("Form",{ref:"edit",attrs:{model:t.edit,"label-position":"right","label-width":100,rules:t.ruleValidate}},[a("FormItem",{attrs:{label:"视频名称:",prop:"title"}},[a("Input",{attrs:{placeholder:"请输入视频名称..."},model:{value:t.edit.title,callback:function(e){t.$set(t.edit,"title",e)},expression:"edit.title"}})],1),a("FormItem",{attrs:{label:"文件地址:"}},[a("Button",{attrs:{type:"primary"}},[t._v("下载应用")]),a("Input",{attrs:{disabled:""},model:{value:t.edit.videoUrl,callback:function(e){t.$set(t.edit,"videoUrl",e)},expression:"edit.videoUrl"}})],1),a("FormItem",{attrs:{label:"视频地址:"}},[a("Upload",{ref:"upload",attrs:{action:t.$config.BaseURLfile+"/common/upload/file","on-success":t.handleSuccess,"with-credentials":!0}},[a("Button",{attrs:{icon:"ios-cloud-upload-outline"}},[t._v("上传视频地址")])],1)],1),a("FormItem",{attrs:{label:"视频格式:",prop:"videoFormat"}},[a("Input",{attrs:{placeholder:"请输入视频格式..."},model:{value:t.edit.videoFormat,callback:function(e){t.$set(t.edit,"videoFormat",e)},expression:"edit.videoFormat"}})],1),a("FormItem",{attrs:{label:"文件Md5值:"}},[a("Input",{attrs:{placeholder:"请输入视频文件Md5值..."},model:{value:t.edit.videoMd5,callback:function(e){t.$set(t.edit,"videoMd5",e)},expression:"edit.videoMd5"}})],1),a("FormItem",{attrs:{label:"状态:",prop:"status"}},[a("Select",{attrs:{placeholder:"请选择状态..."},model:{value:t.edit.status,callback:function(e){t.$set(t.edit,"status",e)},expression:"edit.status"}},[a("Option",{attrs:{value:1}},[t._v("上线")]),a("Option",{attrs:{value:0}},[t._v("下线")])],1)],1),a("FormItem",{attrs:{label:"描述:"}},[a("Input",{attrs:{type:"textarea",rows:4,placeholder:"请输入描述..."},model:{value:t.edit.describe,callback:function(e){t.$set(t.edit,"describe",e)},expression:"edit.describe"}})],1)],1)],1)],1)])},i=[],l=(a("ac6a"),a("386d"),a("c1df")),s={data:function(){var t=this;return{search:{title:""},info:{},modalAdd:!1,edit:{},modalEdit:!1,addUploadUrl:"",editUploadUrl:"",id:"",pageSize:30,page:1,total:0,columns1:[{type:"index",width:70,title:"序号",align:"center"},{title:"视频ID",key:"id",align:"center"},{title:"视频名称",key:"title",align:"center"},{title:"视频格式",key:"videoFormat",align:"center"},{title:"状态",key:"Isstatus",align:"center"},{title:"描述",key:"describe",align:"center"},{title:"操作",width:200,align:"center",render:function(e,a){return e("div",[e("Button",{props:{type:"primary",size:"small"},style:{marginRight:"5px"},on:{click:function(){t.modify(a.row)}}},"修改"),e("Poptip",{props:{confirm:!0,title:"确定要删除吗！",type:"error",size:"small",width:"150"},on:{"on-ok":function(){t.remove(a.index)}}},[e("Button",{props:{type:"error",size:"small"}},"删除")])])}}],data1:[],ruleValidate:{title:[{required:!0,message:"请输入视频名称...",trigger:"blur"}],videoFormat:[{required:!0,message:"请输入视频格式...",trigger:"blur"}],status:[{required:!0,message:"请输入状态...",trigger:"blur",type:"number"}]}}},methods:{handleSuccess:function(t,e){console.log(t),this.editUploadUrl=t.data.url,console.log(this.editUploadUrl)},handleSuccess1:function(t,e){console.log(t),this.addUploadUrl=t.data.url,console.log(this.addUploadUrl)},getTableList:function(){var t=this;t.$http(this.$config.BaseURL15+"/common/bootvideo/list?page="+t.page+"&count="+t.pageSize+"&title="+this.search.title).then(function(e){1e4==e.data.errno&&(console.log(e),t.data1=e.data.data.list,t.total=e.data.data.total,e.data.data.list.forEach(function(t){t.IsstartTime=l(1e3*t.startTime).format("YYYY-MM-DD"),t.IsendTime=l(1e3*t.endTime).format("YYYY-MM-DD"),1==t.status?t.Isstatus="上线":0==t.status&&(t.Isstatus="下线")}))})},query:function(){this.page=1,this.getTableList()},addOk:function(){var t=this,e=this,a=!0;e.$refs["info"].validate(function(e){0==e&&(t.$Message.error("表单输入有误,请检查!"),a=!1)}),0!=a&&(e.info.videoUrl=this.addUploadUrl,e.$http.post(this.$config.BaseURL15+"/common/bootvideo/update",e.info).then(function(e){1e4==e.data.errno&&(t.info={},t.getTableList(),t.modalAdd=!1,t.$Message.success("添加成功！"))}))},addCancel:function(){this.info={},this.modalAdd=!1},modify:function(t){this.editUploadUrl="",t=JSON.parse(JSON.stringify(t)),this.edit=t,this.id=t.id,console.log(this.id),this.modalEdit=!0},editOk:function(){var t=this,e=this;""!=this.editUploadUrl&&(e.edit.videoUrl=this.editUploadUrl);var a=!0;e.$refs["edit"].validate(function(e){0==e&&(t.$Message.error("表单输入有误,请检查!"),a=!1)}),0!=a&&e.$http.post(this.$config.BaseURL15+"/common/bootvideo/update?id="+e.id,e.edit).then(function(a){1e4==a.data.errno&&(e.edit={},e.getTableList(),t.modalEdit=!1,e.$Message.success("修改成功！"))})},remove:function(t){var e=this,a=this;a.$http(this.$config.BaseURL15+"/common/bootvideo/del?id="+this.data1[t].id).then(function(t){1e4==t.data.errno&&(e.$Message.success("删除成功"),e.getTableList())})},changePage:function(t){this.page=t,this.getTableList()}},mounted:function(){this.getTableList()}},d=s,r=(a("3c38"),a("2877")),n=Object(r["a"])(d,o,i,!1,null,null,null);n.options.__file="bootvideo2.vue";e["default"]=n.exports}}]);