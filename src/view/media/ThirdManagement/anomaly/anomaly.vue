<style>
    .layout-anomaly-page {
        float: right;
        margin-top: 10px;
    }


    .span {
        font-size: 14px;
        margin: 15px;
        color: #495060;
        padding-bottom: 20px;
    }

    .layout-anomaly .ivu-poptip-confirm .ivu-poptip-body .ivu-icon {
        font-size: 16px;
        color: #ff9900;
        line-height: 18px;
        position: absolute;
        margin-left: -50px;
    }
</style>
<template>
    <div class="layout-anomaly">
        <div class="layout-anomaly-search">
            <Form :model="search" inline>
                <FormItem label="节目集名称:" :label-width="80">
                    <Input v-model="search.name" style="width: 210px;" placeholder="请输入节目集名称..."></Input>
                </FormItem>
                <FormItem label="分类:" :label-width="50">
                    <Input v-model="search.category_name" style="width: 210px;" placeholder="请输入分类..."></Input>
                </FormItem>
                <FormItem label="导演:" :label-width="50">
                    <Input v-model="search.director" style="width: 210px;" placeholder="请输入导演..."></Input>
                </FormItem>
                <FormItem label="创建时间:" :label-width="70">
                    <DatePicker type="datetimerange" placement="bottom-end" placeholder="请选择请求时间..." style="width: 390px"
                        v-model="timer"></DatePicker>
                </FormItem>
                <FormItem label="来源名称:" :label-width="70">
                    <Select v-model="search.cp_code" style="width:200px">
                        <Option v-for="item in SourceList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                    </Select>
                </FormItem>
                <FormItem :label-width="30">
                    <Button type="primary" @click="query()">搜索</Button>
                </FormItem>
            </Form>
        </div>
        <div style="clear: both;"></div>
        <div class="layout-anomaly-table">
            <Table border :columns="columns1" :data="data1"></Table>
        </div>
        <div class="layout-anomaly-page">
            <Page :total="total" :current="page" :page-size='pageSize' @on-change="changePage" show-elevator />
        </div>
        <!-- 修改 -->
        <div class="layout-anomaly-edit">
            <Modal v-model="modalEdit" title="修改">
                <div slot="footer">
                    <a @click="modalEdit=false" class="span">取消</a>
                    <Button @click="editOk" type="primary">确定</Button>
                </div>
                <Form :model="edit" label-position="right" :label-width="100">
                    <FormItem label="来源名称:">
                        <Input v-model="edit.cp_name" disabled></Input>
                    </FormItem>
                    <FormItem label="第三方ID:">
                        <Input v-model="edit.cp_code" disabled></Input>
                    </FormItem>
                    <FormItem label="节目名称:">
                        <Input v-model="edit.title"></Input>
                    </FormItem>
                    <FormItem label="分类:">
                        <Input v-model="edit.category_name"></Input>
                    </FormItem>
                    <FormItem label="标签:">
                        <Input v-model="edit.tags"></Input>
                    </FormItem>
                    <FormItem label="导演:">
                        <Input v-model="edit.directors"></Input>
                    </FormItem>
                    <FormItem label="主演:">
                        <Input v-model="edit.actors"></Input>
                    </FormItem>
                    <FormItem label="地区:">
                        <Input v-model="edit.area"></Input>
                    </FormItem>
                    <FormItem label="语言:">
                        <Input v-model="edit.language"></Input>
                    </FormItem>
                    <FormItem label="创建时间:">
                        <Input v-model="edit.create_time" disabled></Input>
                    </FormItem>
                    <FormItem label="最后更新时间:">
                        <Input v-model="edit.update_time" disabled></Input>
                    </FormItem>
                </Form>
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
                    category_name: '',
                    cp_code: '',
                    director: '',
                    start_time: '',
                    end_time: ''
                },
                SourceList: [],//来源名称
                timer: [],//创建时间
                edit: {},
                modalEdit: false,
                id: '',//一整行id
                total: 0,
                page: 1,
                pageSize: 30,//分页
                info: {},
                modalAdd: false,//添加
                columns1: [
                    {
                        title: '节目集ID',
                        key: 'album_id',
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
                        title: '来源名称',
                        key: 'cp_name',
                        align: 'center'
                    },
                    {
                        title: '异常原因',
                        key: 'ISclean_status',
                        align: 'center'
                    },
                    {
                        title: '创建时间',
                        key: 'Iscreate_time',
                        align: 'center',
                        width: 200
                    },
                    {
                        title: '操作',
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small',
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
                data1: []
            }
        },
        methods: {
            // 表格数据
            getTableList() {
                let self = this;

                //开始时间
                let StartTime = moment(self.timer[0]).format("X");
                //结束时间
                let EndTime = moment(self.timer[1]).format("X");

                if (isNaN(StartTime)) {
                    StartTime = ''
                }
                if (isNaN(EndTime)) {
                    EndTime = ''
                }

                self.$http(this.$config.BaseURL7 + '/media/v2/anomaly/list?page=' + self.page + '&pagesize=' + self.pageSize +
                    '&name=' + self.search.name + '&category_name=' + self.search.category_name + '&cp_code=' + self.search.cp_code +
                    '&director=' + self.search.director + '&start_time=' + StartTime + '&end_time=' + EndTime).then(response => {

                        if (response.data.errno == 10000) {
                            console.log(response)
                            self.data1 = response.data.data.list;

                            response.data.data.list.forEach(val => {
                                // 1:分类对应异常 2:地区对应异常3:语言对应异常4:类型标签对应异常
                                if (val.clean_status == 1) {
                                    val.ISclean_status = "分类对应异常"
                                } else if (val.clean_status == 2) {
                                    val.ISclean_status = "地区对应异常"
                                } else if (val.clean_status == 3) {
                                    val.ISclean_status = "语言对应异常"
                                } else if (val.clean_status == 4) {
                                    val.ISclean_status = "类型标签对应异常"
                                }

                                //时间转换
                                val.Iscreate_time = moment(val.create_time * 1000).format(
                                    "YYYY-MM-DD HH:mm:ss"
                                )
                            });

                            self.total = response.data.data.total;


                        }
                    }, response => { })
            },
            //搜索
            query() {
                this.page = 1;
                this.getTableList()
            },
            // 分类下拉框
            getSelectList() {
                let self = this;
                self.$http(this.$config.BaseURL1 + '/media/v2/origin/list').then(response => {
                    if (response.data.errno == 10000) {
                        self.SourceList = response.data.data.list;
                    }
                }, response => { })
            },
            //修改
            modify(row) {
                this.edit = row;
                console.log(this.edit)
                this.modalEdit = true;
                this.id = row.id;
            },
            editOk() {
                let self = this;
                self.$http.post(this.$config.BaseURL7 + '/media/v2/anomaly/modify?id=' + self.id, self.edit).then(response => {
                    if (response.data.errno == 10000) {
                        self.edit = {};
                        self.modalEdit = false;
                        self.getTableList();
                        self.$Message.success('修改成功！')
                    }
                }, response => { })
            },
            //分页
            changePage(page) {
                this.page = page;
                this.getTableList();
            }
        },
        mounted() {
            this.getTableList();
            this.getSelectList()
        }
    }
</script>