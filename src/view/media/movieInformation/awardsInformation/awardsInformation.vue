<style>
.layout-awards-page {
  float: right;
  margin-top: 10px;
}

.ivu-table th,
.ivu-table td {
  height: 40px;
}
.span {
    font-size: 14px;
    margin: 15px;
    color: #495060;
    padding-bottom: 20px;
}
 .layout-awards-add{
    float: right;
}
</style>
<template>
    <div class='layout-awards'>
        <!-- 搜索 -->
        <div class='layout-awards-search'>
            <Form :model="search" inline>
                <FormItem label="电影节名称:" :label-width="90">
                    <Input v-model='search.id' style="width:200px;" placeholder="请输入电影节名称..." disabled></Input>
                </FormItem>
                <FormItem label="关联媒资:" :label-width="110">
                    <Select v-model='search.related' style="width:200px" placeholder="请选择关联媒资...">
                        <Option value="">全部</Option>
                        <Option :value="1">已关联</Option>
                        <Option :value="0">未关联</Option>
                    </Select>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click='query()'>搜索</Button>
                </FormItem>
            </Form>
        </div>
        <!-- 分类-->
        <div>
            <span style="float:left;margin-top:13px;margin-right:20px;font-size:14px;">奖项年份:</span>
            <Tabs @on-click="tabChange">
                <TabPane :years="tab.id +''" v-for="tab in tabs" :key="tab.id" :label="tab.years+''"></TabPane>
            </Tabs>
            </div>
         <!-- 添加 -->
        <div class='layout-awards-add'>
            <Button type="success" @click="modalAdd=true">添加</Button>
            <Modal v-model="modalAdd" title="添加奖项信息" width="700">
                <div slot="footer">
                    <a @click="addCancel" class="span">取消</a>
                    <Button @click="addOk" type="primary">添加获奖信息</Button>
                </div>
                <Form :model="info" label-position="right" :label-width="130">
                    <FormItem label="电影节名称:">
                        <Input  v-model='info.award_name' placeholder="请输入电影节名称..."></Input>
                    </FormItem>
                    <FormItem label="奖项年份:">
                        <Input v-model="info.year" placeholder="请输入奖项年份..."></Input>
                    </FormItem>
                    <FormItem label="奖项名称:">
                        <Input v-model="info.award_name" placeholder="请输入奖项名称..."></Input>
                    </FormItem>
                    <FormItem label="奖项类别:">
                        <RadioGroup v-model='info.award_type'>
                        <Radio :label="1">节目</Radio>
                        <Radio :label="2">人物</Radio>
                    </RadioGroup>
                    </FormItem>
                    <FormItem  label="奖项信息" :label-width="180" style="border-bottom: 1px solid #cccccc;">
                        <FormItem  label="关联媒资" :label-width="160"></FormItem>
                    </FormItem> 
                    <FormItem :label-width='60'>  
                        <Input v-model='info.award_winners_info' style="width: 150px;margin-left: 5px;"></Input> 
                        <Input v-model='info.award_winners_info' style="width: 150px;margin-left: 10px;"></Input>
                        <Button type='warning' @click='choice' style='marginLeft:10px;'>选择</Button>
                        <Button type='error' @click='removes' style='marginLeft:10px;'>删除</Button>
                    </FormItem>
                    <!-- <FormItem :label-width='60'>
                        <Button type="primary" @click="addAttrOpsList">添加获奖信息</Button>
                    </FormItem>  -->
                </Form>
            </Modal>
        </div>
        <div style="clear:both;"></div>
        <!-- 列表 -->
        <div class="layout-awards-table">
            <Table border :columns="columns1" :data="data1"></Table>
        </div>
        <!-- 分页 -->
        <div class="layout-awards-page">
            <Page :total="total" :current="page" :page-size='page_size' @on-change="changePage" show-elevator />
        </div>
        <!-- 修改 -->
        <div class="layout-awards-edit">
            <Modal v-model="modalEdit" title="修改奖项信息" width="700">
                <div slot="footer">
                <a @click="modalEdit=false" class="span">取消</a>
                <Button @click="editOk" type="primary">添加获奖信息</Button>
                </div>
                <Form :model="edit" label-position="right" :label-width="130">
                    <FormItem label="电影节名称:">
                        <Input v-model="edit.award_name" placeholder="请输入电影节名称..."></Input>
                    </FormItem>
                    <FormItem label="奖项年份:">
                        <Input v-model="edit.year" placeholder="请输入奖项年份..."></Input>
                    </FormItem>
                    <FormItem label="奖项名称:">
                        <Input v-model="edit.award_name" placeholder="请输入奖项名称..."></Input>
                    </FormItem>
                    <FormItem label="奖项类别:">
                        <RadioGroup v-model='edit.award_type'>
                            <Radio :label="1">节目</Radio>
                            <Radio :label="2">人物</Radio>
                        </RadioGroup>
                    </FormItem>
                    <FormItem  label="奖项信息" :label-width="180" style="border-bottom: 1px solid #cccccc;">
                        <FormItem  label="节目ID" :label-width="120">
                            <FormItem  label="节目名称" :label-width="140"></FormItem>
                        </FormItem>  
                    </FormItem>  
                    <FormItem :label-width='60'>  
                        <Input v-model='edit.award_winners_info' style="width: 150px;margin-left: 5px;" ></Input> 
                        <Input v-model='edit.winner_id' style="width: 100px;margin-left: 5px;" disabled/></Input>
                        <Input style="width: 150px;margin-left: 5px;" disabled></Input>
                        <Button type='warning' @click='editChoice' style='marginLeft:5px;'>选择</Button>
                        <Button type='error' @click='editRemoves' style='marginLeft:5px;'>删除</Button>
                    </FormItem>
                    <!-- <FormItem :label-width='60'>
                        <Button type="primary" @click="addAttrOpsList1">添加获奖信息</Button>
                    </FormItem>  -->
                </Form>
            </Modal>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            search:{
                id:'',
                related:'',
                year:''//奖项年份
            },//搜索
            info:{},// 添加
            modalAdd:false,//添加
            edit:{},// 修改
            modalEdit:false,//修改
            tabs:[],
            award_winners_info:[],
            id:'',//整行
            total: 0,
            page: 1,
            page_size: 30,//分页
            columns1: [
          {
            title: "ID",
            key: "id",
            align: "center"
          },
          {
            title: "奖项年份",
            key: "year",
            align: "center"
          },
          {
            title: "奖项名称",
            key: "award_name",
            align: "center"
          },
          {
            title: "获奖信息",
            key: "award_winners",
            align: "center"
          },
          {
            title: "关联媒资",
            key: "related",
            align: "center"
          },
          {
            title: "操作",
            align: "center",
            width: 240,
            render: (h, params) => {
              return h("div", [
                h(
                  "Button",
                  {
                    props: {
                      type: "primary",
                      size: "small"
                    },
                    style: {
                      marginRight: "5px"
                    },
                    on: {
                      click: () => {
                        this.modify(params.row);
                      }
                    }
                  },
                  "修改"
                ),
                h(
                  "Poptip",
                  {
                    props: {
                      confirm: true,
                      title: "确定要删除吗！",
                      type: "error",
                      size: "small",
                      width: "150"
                    },
                    on: {
                      "on-ok": () => {
                        this.remove(params.row);
                      }
                    }
                  },
                  [
                    h(
                      "Button",
                      {
                        props: {
                          type: "error",
                          size: "small"
                        }
                      },
                      "删除"
                    )
                  ]
                )
              ]);
            }
          }
        ],
        data1:[
            {
                id:3
            }
        ],
        }
    },
    methods:{
        getTableList() {
            // /media/v2/award/list
            let self = this;
            if(this.search.related == undefined) {
                this.search.related = ''
            }
            this.search.id = 2;
            // self.$http(this.$config.BaseURL1 + '/media/v2/award/list?id=' + self.search.id + '&related=' + self.search.related +'&year=' 
            // + self.search.year +'&page=' + self.page + '&page_size=' + self.page_size).then(response => {
            //      if(response.data.errno == 10000) {
            //         console.log(response,'列表')
            //         this.data1 = response.data.data.list;
                       
            //         this.total = response.data.data.total;
            //      }
            //  })
        },
        //搜索
        query() {
            this.page = 1;
            this.getTableList()
        },
        // 分页
        changePage(page) {
            this.page = page;
            this.getTableList()
        },
        // 添加取消
        addCancel(){
            this.modalAdd = false;
            this.info = {};
        },
        // 添加确定
        addOk(){
            // /media/v2/award/edit
            let self = this;
            self.$http.post(this.$config.BaseURL1 + '/media/v2/award/edit', self.info).then(response => {
                if(response.data.errno == 10000) {
                    console.log(response,'添加')
                    this.modalAdd = false;
                    this.info = {};
                    this.getTableList();
                    this.$Message.success('添加成功！');
                }
            })
        },
        // 添加选择
        choice() {
            console.log('选择')
            // /media/v2/complete/program/list
            // let self = this;
            // self.$http.post(this.$config.BaseURL1 + '/media/v2/complete/program/list', self.info).then(response => {
            //     if(response.data.errno == 10000) {
            //         console.log(response,'添加选择')
            //         this.getTableList();
                  
            //     }
            // })
        },
        removes() {
            console.log('删除')
        },
        //修改弹框
        modify(row) {
            this.modalEdit = true;
            this.edit = row;
            this.id = row.id;
            console.log(this.id,'整行')
        },

        // 修改确定
        editOk(){
            // /media/v2/award/edit
            let self = this;
            
            self.$http.post(this.$config.BaseURL1 + '/media/v2/award/edit?id=' + self.id, self.edit).then(response => {
                if(response.data.errno == 10000) {
                   this.getTableList();
                   this.modalEdit = false;
                   this.$Message.success('修改成功！');
                }
            })
        },
        editChoice() {
            console.log('修改选择')
        },
        editRemoves() {
            console.log('修改删除')
        },
        // addAttrOpsList1() {
        //     console.log('添加获奖信息')
        // },
        // 删除
        remove(row) {
            // /media/v2/award/delete
            console.log('删除')
            this.$http.post(this.$config.BaseURL1 + '/media/v2/award/delete?id=' + row.id).then(response => {
                if(response.data.errno == 10000) {
                    this.getTableList();
                    this.$Message.success("删除成功！");
                }
            })

        },
        //奖项年份tab
        getTabList() {
        // /media/v2/award/years
            let self = this;
            self.$http( this.$config.BaseURL1 + "/media/v2/award/years?id=" + self.search.id).then(response => {
                if (response.data.errno == 10000) {
                    console.log(response,'奖项年份');
                    this.tabs = response.data.data.list;
                }
            });
    },
        //tab 切换
        tabChange(years) {
            console.log(years);
            this.total = 0;
            this.data1 = [];
            this.search.year = years;
            this.getTableList();
        },
    },
    mounted() {
        this.getTableList();
        this.getTabList();
    }
}
</script>


