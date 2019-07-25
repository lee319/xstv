<style>
    .layout-polymer-page {
        float: right;
        margin-top: 10px;
    }

    .span {
        font-size: 14px;
        margin: 15px;
        color: #495060;
        padding-bottom: 20px;
    }
    .layout-polymer .ivu-poptip-confirm .ivu-poptip-body .ivu-icon {
        font-size: 16px;
        color: #ff9900;
        line-height: 18px;
        position: absolute;
        margin-left: -50px;
    }

    .ivu-table th,
    .ivu-table td {
        height: 40px;
    }
</style>
<template>
    <div class="layout-polymer">
        <div class="layout-polymer-search">
            <Form :model="search" inline>
                <FormItem label="节目集名称:" :label-width="80">
                    <Input v-model="search.name" style="width: 200px;" placeholder="请输入节目集名称..."></Input>
                </FormItem>
                <FormItem label="创建时间:" :label-width="70">
                    <DatePicker type="datetimerange" placement="bottom-end" placeholder="请选择创建时间..." style="width: 292px"
                        v-model="timer"></DatePicker>
                </FormItem>
                <FormItem label="分类:" :label-width="50">
                    <Select v-model="search.category_id" style="width:200px">
                        <Option v-for="item in cityList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                    </Select>
                </FormItem>
                <FormItem label="导演:" :label-width="50">
                    <Input v-model="search.director" style="width: 200px;" placeholder="请输入导演..."></Input>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="query">搜索</Button>
                </FormItem>
            </Form>
        </div>
        <div class="layout-polymer-table">
            <Table border :columns="columns1" :data="data1"></Table>
        </div>
        <div class="layout-polymer-page">
            <Page :total="total" :current="page" :page-size='pageSize' @on-change="changePage" show-elevator />
        </div>
        <!-- 修改 -->
        <div class="layout-polymer-edit">
            <Modal v-model="modalEdit" title="修改" width='1200'>
                <!-- 确定按钮 -->
                <div slot="footer">
                    <a @click="modalEdit=false" class="span">取消</a>
                    <Button @click="editOk" type="primary">确定</Button>
                </div>
                <div>
                    <div>
                        <h3>成品媒资节目集信息</h3>
                        <div style="margin-top: 10px"></div>
                        <Table border :columns="columns2" :data="data2"></Table>
                    </div>
                    <div style="margin-top: 20px">
                        <h3>第三方节目集信息</h3>
                        <div style="margin-top: 10px"></div>
                        <Table border :columns="columns3" :data="data3"></Table>
                    </div>
                    <div style="margin-top: 20px">
                        <p>带聚合原因:{{news.ISpolymer_type}}</p>
                        <p>
                            <span>
                                处理结果:
                            </span>
                            <span>
                                <RadioGroup v-model="editNews.polystate">
                                    <Radio :label="1" v-if="editNews.media_id != 0">聚合</Radio>
                                    <Radio :label="2">不聚合</Radio>
                                    <Radio :label="4">与其他节目聚合</Radio>
                                </RadioGroup>
                            </span>
                        </p>
                        <p>
                            <Form :model="edit" label-position="right" inline>
                                <FormItem :label-width="0">
                                    <Input v-model="edit.title"></Input>
                                </FormItem>
                                <Button type="primary" @click="modalDetails = true">查看节目集</Button>
                            </Form>
                            <Modal v-model="modalDetails" title="查看节目集" width="1000">
                                <Form :model="search1" inline>
                                    <FormItem label="节目集名称:" :label-width="80">
                                        <Input v-model="search1.title" style="width: 150px;" placeholder="请输入节目集名称..."></Input>
                                    </FormItem>
                                    <FormItem label="导演:" :label-width="50">
                                        <Input v-model="search1.directors" style="width: 150px;" placeholder="请输入导演..."></Input>
                                    </FormItem>
                                    <FormItem label="分类:" :label-width="50">
                                        <Select v-model="search1.categoryId" style="width:150px" placeholder="请选择分类">
                                            <Option v-for="item in cityList" :value="item.id" :key="item.id">{{
                                                item.name }}</Option>
                                        </Select>
                                    </FormItem>
                                    <FormItem>
                                        <Button type="primary" @click="query1">搜索</Button>
                                    </FormItem>
                                </Form>
                                <Table border :columns="columns4" :data="data4" @on-row-click="qqq"></Table>
                            </Modal>
                        </p>
                        <p>
                            <Form :model="editNews" label-position="right" inline>
                                <FormItem label="处理意见:" :label-width="65">
                                    <Input v-model="editNews.opinion" type="textarea" :rows="4" placeholder="请输入处理意见..."></Input>
                                </FormItem>
                            </Form>
                        </p>
                    </div>
                </div>
            </Modal>
        </div>
    </div>
</template>
<script>
    var moment = require("moment");
    export default {
        data() {
            return {
                search: {
                    name: '',
                    category_id: '',
                    director: '',
                    create_startTime: '',
                    create_endTime: '',
                },
                search1: {
                    title: '',
                    directors: '',
                    categoryId: ''
                },//查看节目集搜索
                news: '',//待聚合原因
                polystate: false,
                timer: [],
                cityList: [],
                edit: {},//查看节目集
                edit1: {},
                modalEdit: false,
                modalDetails: false,
                total: 0,
                page: 1,
                pageSize:30,
                editNews: {},//修改参数
                columns1: [
                    {
                        title: '节目集ID',
                        key: 'id',
                        align: 'center'
                    },
                    {
                        title: '节目集名称',
                        key: 'title',
                        align: 'center'
                    },
                    {
                        title: '分类',
                        key: 'category_name',
                        align: 'center'
                    },
                    {
                        title: '导演',
                        key: 'directors',
                        align: 'center'
                    },
                    {
                        title: '聚合CP',
                        key: 'cp_name',
                        align: 'center'
                    },
                    {
                        title: '待聚合原因',
                        key: 'ISpolymer_type',
                        align: 'center'
                    },
                    {
                        title: '处理结果',
                        key: 'ISpolystate',
                        align: 'center'
                    },
                    {
                        title: '创建时间',
                        key: 'Iscreate_time',
                        align: 'center',
                        width: 180
                    },
                    {
                        title: '操作',
                        width: 200,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.modify(params.row)
                                        }
                                    }
                                }, '修改')
                            ]);
                        }
                    }
                ],
                data1: [],
                columns2: [
                    {
                        title: '节目集名称',
                        key: 'title',
                        align: 'center'
                    },
                    {
                        title: '导演',
                        key: 'directors',
                        align: 'center'
                    },
                    {
                        title: '年代',
                        key: 'release_year',
                        align: 'center'
                    },
                    {
                        title: '地区',
                        key: 'region',
                        align: 'center'
                    },
                    {
                        title: '主演',
                        key: 'main_actors',
                        align: 'center'
                    }
                ],
                data2: [],
                columns3: [
                    {
                        title: '节目集名称',
                        key: 'title',
                        align: 'center'
                    },
                    {
                        title: '导演',
                        key: 'directors',
                        align: 'center'
                    },
                    {
                        title: '年代',
                        key: 'publish_year',
                        align: 'center'
                    },
                    {
                        title: 'CP名称',
                        key: 'cp_name',
                        align: 'center'
                    },
                    {
                        title: '地区',
                        key: 'region',
                        align: 'center'
                    },
                    {
                        title: '主演',
                        key: 'actors',
                        align: 'center'
                    }
                ],
                data3: [],
                columns4: [
                    {
                        title: '节目集ID',
                        key: 'id',
                        align: 'center'
                    },
                    {
                        title: '节目集名称',
                        key: 'title',
                        align: 'center'
                    },
                    {
                        title: '分类',
                        key: 'category_name',
                        align: 'center'
                    },
                    {
                        title: '导演',
                        key: 'directors',
                        align: 'center'
                    },
                    {
                        title: '主演',
                        key: 'main_actors',
                        align: 'center'
                    },
                    {
                        title: '上映时间',
                        key: 'address',
                        align: 'center'
                    }
                ],
                data4: []
            }
        },
        methods: {
            // 表格数据
            getTableList() {
                let self = this;
                //整机开始时间
                let create_startTime = moment(self.timer[0]).format("X");
                //整机结束时间
                let create_endTime = moment(self.timer[1]).format("X");

                if (isNaN(create_startTime)) {
                    create_startTime = ''
                }
                if (isNaN(create_endTime)) {
                    create_endTime = ''
                }
                self.$http(this.$config.BaseURL7 + '/media/v2/polymer/list?name=' + self.search.name + '&category_id=' + self.search.category_id
                    + '&director=' + self.search.director + '&create_startTime=' + create_startTime + '&create_endTime=' + create_endTime + '&page=' + this.page + '&pageSize=' + this.pageSize).then(response => {
                        if (response.data.errno == 10000) {
                            console.log(response)

                            self.data1 = response.data.data.list;
                            
                            this.total = response.data.data.total;


                            response.data.data.list.forEach(val => {
                                // 待聚合原因：1:导演不匹配 2:年代不匹配
                                if (val.polymer_type == 1) {
                                    val.ISpolymer_type = '导演不匹配'
                                } else if (val.polymer_type == 2) {
                                    val.ISpolymer_type = '年代不匹配'
                                }
                                // 处理结果 1、聚合 2、不聚合 3、待处理

                                if (val.polystate == 1) {
                                    val.ISpolystate = "聚合"
                                } else if (val.polystate == 2) {
                                    val.ISpolystate = "不聚合"
                                } else if (val.polystate == 3) {
                                    val.ISpolystate = "待处理"
                                }
                                //时间转换
                                val.Iscreate_time = moment(val.create_time).format(
                                    "YYYY-MM-DD HH:mm:ss"
                                )
                            });

                        }
                    }, response => { })
            },
            //节目集列表
            getTableList1() {
                let self = this;
                self.$http(this.$config.BaseURL1 + '/media/v2/complete/program/list?title=' + self.search1.title + '&directors=' + self.search1.directors + '&categoryId=' + self.search1.categoryId).then(response => {
                    if (response.data.errno == 10000) {
                        self.data4 = response.data.data.list;
                    }
                }, response => { })
            },
            //分类下拉框
            getSelectList() {
                let self = this;
                self.$http(this.$config.BaseURL1 + '/media/v2/category/list').then(response => {
                    if (response.data.errno == 10000) {
                        self.cityList = response.data.data.list;
                    }
                }, response => { })
            },
            //搜索
            query() {
                this.page = 1;
                this.getTableList();
            },
            query1() {
                this.getTableList1();
            },
            //修改
            modify(row) {
                let self = this;
                this.getTableList1();
                this.news = row;
                this.editNews = row;
                console.log(this.editNews)
                console.log(this.news.media_id)
                // 1:导演不匹配 2:年代不匹配
                if (row.polymer_type == 1) {
                    row.ISpolymer_type = '导演不匹配'
                } else if (row.polymer_type == 2) {
                    row.ISpolymer_type = '年代不匹配'
                }


                // 第三方
                self.$http(this.$config.BaseURL7 + '/media/v2/polymer/list?source_id=' + row.source_id).then(response => {
                    if (response.data.errno == 10000) {
                        console.log(response)
                        self.data3 = response.data.data.list;
                    }
                })
                // 成品

                self.$http(this.$config.BaseURL1 + '/media/v2/complete/program/list?id=' + row.media_id).then(response => {
                    if (response.data.errno == 10000) {
                        if (row.media_id == 0) {
                            self.data2 = [];
                            return;
                        } else {
                            console.log(response)
                            self.data2 = response.data.data.list;
                            console.log(self.data2)
                        }
                    }
                });


                this.modalEdit = true;
            },
            editOk() {
                let self = this;
                self.editNews.create_time=self.editNews.create_time.replace(' ','T') + 'Z';

                self.editNews.update_time=self.editNews.update_time.replace(' ','T') + 'Z';

                self.$http.post(this.$config.BaseURL7 + '/media/v2/polymer/modify', self.editNews).then(response => {
                    console.log(response)
                    if (response.data.errno == 10000) {
                        this.modalEdit = false;
                        this.getTableList();
                    }
                })
            },
            changePage(page) {
                this.page = page;
                this.getTableList();
            },
            qqq(row) {
                this.edit = row;
                console.log(this.edit.title)
                console.log(row);
                this.modalDetails = false;
            }
        },
        mounted() {
            this.getTableList();
            this.getSelectList()
        }
    }
</script>