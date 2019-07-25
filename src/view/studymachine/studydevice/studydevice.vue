<style>
    .layout-studydevice-page {
        float: right;
        margin-top: 10px;
    }

    .span {
        font-size: 14px;
        margin: 15px;
        color: #495060;
        padding-bottom: 20px;
    }

    .layout-studydevice .ivu-poptip-confirm .ivu-poptip-body .ivu-icon {
        font-size: 16px;
        color: #ff9900;
        line-height: 18px;
        position: absolute;
        margin-left: -50px;
    }
</style>
<template>
    <div class="layout-studydevice">
        <div class="layout-studydevice-search">
            <Form :model="search" inline>
                <FormItem label="微信名称:" :label-width="70">
                    <!-- <Input v-model="search.nickname" placeholder="请输入微信名称..." style="width:200px;"></Input> -->
                    <Select v-model="search.nickname" filterable remote :remote-method="remoteMethod1"
                        :loading="loading1" style="width:200px;" placeholder="请输入微信名称...">
                        <Option v-for="(option, index) in options1" :value="option.id" :key="index">{{option.nickname}}
                        </Option>
                    </Select>
                </FormItem>
                <FormItem label="mac:" :label-width="50">
                    <Input v-model="search.mac" placeholder="请输入mac..." style="width:200px;"></Input>
                </FormItem>
                <FormItem label="整机sn:" :label-width="70">
                    <Input v-model="search.sn" placeholder="请输入整机sn..." style="width:200px;"></Input>
                </FormItem>
                <FormItem label="绑定时间" :label-width="70">
                    <DatePicker type="datetimerange" placeholder="请选择绑定时间..." style="width: 300px" v-model="timer">
                    </DatePicker>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="query">搜索</Button>
                </FormItem>
            </Form>
        </div>
        <div class="layout-studydevice-table">
            <Table border :columns="columns1" :data="data1"></Table>
        </div>
        <!-- 分页 -->
        <div class="layout-studydevice-page">
            <Page :total="total" :current="page" :page-size='pageSize' @on-change="changePage" show-elevator />
        </div>
        <!-- 详情 -->
        <Modal v-model="modalInfo" title="终端绑定详情" width="700">
            <Row>
                <Col span="8">
                <p>
                    微信名称:{{news.nickName}}
                </p>
                </Col>
                <Col span="8">
                <p>
                    微信openid:{{news.openid}}
                </p>
                </Col>
                <Col span="8">
                <p>
                    绑定设备mac:{{news.mac}}
                </p>
                </Col>
                <Col span="8">
                <p>
                    绑定设备cpuid:{{news.cpuId}}
                </p>
                </Col>
                <Col span="8">
                <p>
                    绑定时间:{{news.is_bindTime}}
                </p>
                </Col>
                <Col span="8">
                <p>
                    绑定IP:{{news.bindIp}}
                </p>
                </Col>
                <Col span="12">
                <p>
                    板卡sn:{{news.boardCardSn}}
                </p>
                </Col>
                <Col span="12">
                <p>
                    整机sn:{{news.sn}}
                </p>
                </Col>
                <Col span="12">
                <p>
                    微信头像:
                    <img :src="news.avatarUrl" alt="" style="width:50px;height:50px;">
                </p>
                </Col>
            </Row>
        </Modal>
        <!-- 应用管理 -->
        <Modal v-model="modalApplication" title="应用管理" width="1000">
            <div>
                <Form :model="applicationSearch" inline>
                    <FormItem label="设备mac:" :label-width="70">
                        <Input v-model="applicationInfo.mac" disabled></Input>
                    </FormItem>
                    <FormItem label="应用名称:" :label-width="70">
                        <Input v-model="applicationSearch.appName" style="width:200px;"
                            placeholder="请输入应用名称..."></Input>
                    </FormItem>
                    <FormItem label="应用状态:" :label-width="70">
                        <Select v-model="applicationSearch.status" style="width:200px" placeholder="请选择应用状态...">
                            <Option value="">全部</Option>
                            <Option :value="0">禁用</Option>
                            <Option :value="1">使用</Option>
                        </Select>
                    </FormItem>
                    <FormItem>
                        <Button type="primary" @click="applicationQuery">搜索</Button>
                    </FormItem>
                </Form>
            </div>
            <div>
                <Table border :columns="columns2" :data="data2"></Table>
            </div>
            <div class="layout-studydevice-page">
                <Page :total="total1" :current="page1" :page-size='pageSize1' @on-change="changePage1" show-elevator />
            </div>
            <div style="margin-top:40px;"></div>
        </Modal>

    </div>
</template>
<script>
    var moment = require("moment")
    export default {
        data() {
            return {
                search: {
                    nickname: '',
                    mac: '',
                    sn: '',
                    userId: ''

                },//搜索

                options1: [],//微信名称搜索
                loading1: false,

                timer: [],

                total: 0,
                page: 1,
                pageSize: 30,//分页
                news: {},
                modalInfo: false,//详情

                applicationSearch: {
                    status: '',
                    appName: '',
                },
                total1: 0,
                page1: 1,
                pageSize1: 30,//分页
                mac: '',
                applicationInfo: {},//设备mac
                modalApplication: false,//应用管理
                columns1: [
                    {
                        type: 'index',
                        width: 70,
                        align: 'center',
                        title: '序号'
                    },
                    {
                        title: 'mac',
                        key: 'mac',
                        align: 'center'
                    },
                    {
                        title: 'UID',
                        key: 'id',
                        align: 'center'
                    },
                    {
                        title: '整机sn',
                        key: 'sn',
                        align: 'center'
                    },
                    {
                        title: '微信头像',
                        key: 'avatarUrl',
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('img', {
                                    attrs: {
                                        src: params.row.avatarUrl
                                    },
                                    style: {
                                        width: '50px',
                                        height: '50px',
                                        marginTop: '5px'
                                    }
                                }),
                            ]);
                        }
                    },
                    {
                        title: '微信名称',
                        key: 'userId',
                        align: 'center'
                    },
                    {
                        title: '绑定时间',
                        key: 'is_bindTime',
                        align: 'center'
                    },
                    {
                        title: '操作',
                        width: 260,
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
                                            this.info(params.row)
                                        }
                                    }
                                }, '详情'),
                                h(
                                    "Poptip", {
                                        props: {
                                            confirm: true,
                                            title: "确定要解绑吗！",
                                            type: "error",
                                            size: "small",
                                            width: "150"
                                        },
                                        on: {
                                            "on-ok": () => {
                                                this.untying(params.row);
                                            }
                                        }
                                    }, [
                                        h(
                                            "Button", {
                                                props: {
                                                    type: "error",
                                                    size: "small",
                                                },
                                                style: {
                                                    marginRight: '5px'
                                                }
                                            },
                                            "解绑"
                                        )
                                    ]
                                ),
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
                                            this.application(params.row)
                                        }
                                    }
                                }, '应用管理')
                            ]);
                        }
                    }
                ],
                data1: [],
                columns2: [
                    {
                        type: 'index',
                        width: 70,
                        align: 'center',
                        title: '序号'
                    },
                    {
                        title: '应用名称',
                        key: 'appName',
                        align: 'center'
                    },
                    {
                        title: '应用状态',
                        key: 'is_status',
                        align: 'center'
                    },
                    {
                        title: '最后更新时间',
                        key: 'updateTime',
                        align: 'center'
                    }
                ],
                data2: [],
                list: [],
            }
        },
        methods: {
            // 表格列表
            getTabelList() {

                //	绑定开始时间
                let startBindTime = moment(this.timer[0]).format("X");
                //	绑定结束时间
                let endBindTime = moment(this.timer[1]).format("X");

                this.$http.get(this.$config.BaseURL13 + '/admin/api/v1/studydevice/list?page=' + this.page + '&pageSize=' + this.pageSize + '&nickname=' + this.search.nickname + '&mac=' + this.search.mac + '&sn=' + this.search.sn + '&startBindTime=' + startBindTime + '&endBindTime=' + endBindTime).then(response => {
                    if (response.data.errno == 10000) {
                        this.data1 = response.data.data.list;

                        response.data.data.list.forEach(val => {
                            val.is_bindTime = moment(val.bindTime * 1000).format(
                                "YYYY-MM-DD HH:mm:ss"
                            )
                        });
                        this.total = response.data.data.total;
                    }
                })
            },
            // 搜索
            query() {
                this.page = 1;
                this.getTabelList();
            },
            // 分页
            changePage(page) {
                this.page = page;
                this.getTabelList();
            },
            // 详情
            info(row) {
                if (row.bindTime == 0) {
                    row.bindTime = ""
                } else {
                    row.is_bindTime = moment(row.bindTime * 1000).format(
                        "YYYY-MM-DD HH:mm:ss")
                }
                this.news = row;
                this.modalInfo = true;
            },
            //解绑
            untying(row) {
                console.log(row);
                this.$http.get(this.$config.BaseURL13 + '/admin/api/v1/studydevice/unbind?mac=' + row.mac).then(response => {
                    if (response.data.errno == 10000) {
                        this.getTabelList();
                        this.$Message.success("解绑成功！");
                    }
                })
            },
            //应用管理
            application(row) {
                this.applicationInfo = row;
                this.modalApplication = true;
                this.mac = row.mac;
                this.getapplicationTableList();
            },
            // 应用管理列表
            getapplicationTableList() {
                if (this.applicationSearch.status == undefined) {
                    this.applicationSearch.status = ''
                }
                this.$http.get(this.$config.BaseURL13 + '/admin/api/v1/studydevice/applist?page=' + this.page1 + '&pageSize=' + this.pageSize1 + '&mac=' + this.mac + '&appName=' + this.applicationSearch.appName + '&status=' + this.applicationSearch.status).then(response => {
                    if (response.data.errno == 10000) {
                        this.data2 = response.data.data.list;
                        response.data.data.list.forEach(val => {
                            if (val.status == 0) {
                                val.is_status = "未禁用"
                            } else if (val.status == 1) {
                                val.is_status = "禁用"
                            }
                        });

                        this.total1 = response.data.data.total;
                    }
                })
            },
            //应用管理搜索
            applicationQuery() {
                this.page1 = 1;
                this.getapplicationTableList();
            },
            changePage1(page) {
                this.page1 = page;
                this.getapplicationTableList();
            },
            //微信名称搜索
            remoteMethod1(query) {
                this.$http.get(this.$config.BaseURL10 + '/customer/user/list?nickname=' + query).then(response => {
                    if (response.data.errno == 10000) {
                        this.options1 = response.data.data.list;
                    }
                })
            }
        },
        mounted() {
            this.getTabelList();
        }
    }
</script>