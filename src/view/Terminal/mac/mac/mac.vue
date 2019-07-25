<style>
    .span {
        font-size: 14px;
        margin: 15px;
        color: #495060;
        padding-bottom: 20px;
    }

    .layout-mac .ivu-poptip-confirm .ivu-poptip-body .ivu-icon {
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
    <div>
        <div class="layout-mac">
            <div class="layout-mac-search">
                <Form :model="search" inline>
                    <FormItem label="终端厂商:" :label-width="65">
                        <Input v-model="search.customerName" style="width: 200px;" placeholder="请输入终端厂商..."></Input>
                    </FormItem>
                    <FormItem label="商用型号:" :label-width="70">
                        <Input v-model="search.commercialName" style="width: 200px;" placeholder="请输入商用型号..."></Input>
                    </FormItem>
                    <FormItem label="申请人:" :label-width="60">
                        <Input v-model="search.applicant" style="width: 200px;" placeholder="请输入申请人..."></Input>
                    </FormItem>
                    <FormItem label="申请时间:" :label-width="70">
                        <DatePicker type="datetimerange" placement="bottom-end" placeholder="请选择板卡激活时间..." style="width: 292px"
                            v-model="timer"></DatePicker>
                    </FormItem>
                    <FormItem label="mac:" :label-width="40">
                        <Input v-model="search.mac" style="width: 200px;" placeholder="请输入mac..."></Input>
                    </FormItem>
                    <FormItem>
                        <Button type="primary" @click="query()">搜索</Button>
                    </FormItem>
                    <FormItem :label-width="400">
                        <Button type="success" @click="modalAdd = true">添加</Button>
                    </FormItem>
                </Form>
            </div>
            <!-- 添加 -->
            <div class="layout-mac-add">
                <Modal v-model="modalAdd" title="添加">
                    <div slot="footer">
                        <a @click="addCancel" class="span">取消</a>
                        <Button @click="addOk" type="primary">确定</Button>
                    </div>
                    <Form :model="info" label-position="right" :label-width="100" ref="info" :rules="ruleValidate">
                        <FormItem label="终端厂商:" prop="customerName">
                            <Input v-model="info.customerName" placeholder="请输入终端厂商..."></Input>
                        </FormItem>
                        <FormItem label="商用型号:" prop="commercialName">
                            <Input v-model="info.commercialName" placeholder="请输入商用型号..."></Input>
                        </FormItem>
                        <FormItem label="申请人:" prop="applicant">
                            <Input v-model="info.applicant" placeholder="请输入申请人..."></Input>
                        </FormItem>
                        <FormItem label="申请时间:" prop="Is_applicantTime">
                            <DatePicker type="date" placeholder="请选择广告投放开始时间..." style="width: 390px" v-model="info.Is_applicantTime"></DatePicker>
                        </FormItem>
                        <FormItem label="开始mac:" prop="startMac">
                            <Input v-model="info.startMac" placeholder="请输入开始mac..."></Input>
                        </FormItem>
                        <FormItem label="结束mac:" prop="endMac">
                            <Input v-model="info.endMac" placeholder="请输入结束mac..."></Input>
                        </FormItem>
                        <FormItem label="描述">
                            <Input v-model="info.describe" type="textarea" :rows="4" placeholder="请输入描述..."></Input>
                        </FormItem>
                    </Form>
                </Modal>
            </div>
            <!-- 表格 -->
            <div class="layout-mac-table">
                <Table border :columns="columns1" :data="data1"></Table>
            </div>
            <!-- 详情 -->
            <Modal v-model="modalDetails" title="详情" width="900">
                <Row>
                    <Col span="24">
                    <p>
                        终端厂商:{{news.customerName}}
                    </p>
                    </Col>
                    <Col span="24">
                    <p>
                        商用型号:{{news.commercialName}}
                    </p>
                    </Col>
                    <Col span="24">
                    <p>
                        申请人:{{news.applicant}}
                    </p>
                    </Col>
                    <Col span="8">
                    <p>
                        开始mac:{{news.startMac}}
                    </p>
                    </Col>
                    <Col span="8">
                    <p>
                        结束mac:{{news.endMac}}
                    </p>
                    </Col>
                    <Col span="8">
                    <p>
                        领用数量:{{news.useNumber}}
                    </p>
                    </Col>
                    <Col span="24">
                    <p>
                        申请时间:{{news.applicantTime}}
                    </p>
                    </Col>
                    <Col span="24">
                    <p style="word-break: break-all;word-wrap: break-word;">
                        描述:{{news.describe}}
                    </p>
                    </Col>
                </Row>
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
                    customerName: '',
                    commercialName: '',
                    applicant: '',
                    applicantTime: '',
                    startTime: '',
                    endTime: '',
                    mac: '',

                },//搜索
                timer: [],
                modalDetails: false,
                info: {},
                modalAdd: false,
                news: [],
                columns1: [
                    {
                        title: '序号',
                        type: 'index',
                        width: 70,
                        align: 'center'
                    },
                    {
                        title: '开始mac',
                        key: 'startMac',
                        align: 'center'
                    },
                    {
                        title: '结束mac',
                        key: 'endMac',
                        align: 'center'
                    },
                    {
                        title: '领用数量',
                        key: 'useNumber',
                        align: 'center'
                    },
                    {
                        title: '商用型号',
                        key: 'commercialName',
                        align: 'center'
                    },
                    {
                        title: '终端厂商',
                        key: 'customerName',
                        align: 'center'
                    },
                    {
                        title: '申请人',
                        key: 'applicant',
                        align: 'center'
                    },
                    {
                        title: '申请时间',
                        key: 'applicantTime',
                        align: 'center'
                    },
                    {
                        title: '操作',
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'warning',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.details(params.row)
                                        }
                                    }
                                }, '详情'),
                                h(
                                    "Poptip", {
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
                                    }, [
                                        h(
                                            "Button", {
                                                props: {
                                                    type: "error",
                                                    size: "small",
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
                data1: [],
                ruleValidate: {
                    customerName: [
                        { required: true, message: '请输入终端厂商...', trigger: 'blur' }
                    ],
                    commercialName: [
                        { required: true, message: '请输入商用型号...', trigger: 'blur' }
                    ],
                    applicant: [
                        { required: true, message: '请输入申请人...', trigger: 'blur' }
                    ],
                    Is_applicantTime: [
                        { required: true, message: '请输入申请时间...', trigger: 'change', type: 'date' }
                    ],
                    startMac: [
                        { required: true, message: '请输入开始mac...', trigger: 'blur' }
                    ],
                    endMac: [
                        { required: true, message: '请输入结束mac...', trigger: 'blur' }
                    ]
                },
            }
        },
        methods: {
            //表格数据
            getTableList() {
                let self = this;
                //板卡开始时间
                let startTime = moment(self.timer[0]).format("X");
                //板卡结束时间
                let endTime = moment(self.timer[1]).format("X");

                if (isNaN(startTime)) {
                    startTime = ''
                }
                if (isNaN(endTime)) {
                    endTime = ''
                }
                self.$http(this.$config.BaseURL2 + '/tv/macuse/list?customerName=' + self.search.customerName + '&commercialName=' + self.search.commercialName
                    + '&applicant=' + self.search.applicant + '&applicantTime=' + self.search.applicantTime + '&startTime=' + startTime + '&endTime=' + endTime + '&mac=' + self.search.mac).then(response => {
                        if (response.data.errno == 10000) {
                            self.data1 = response.data.data.list;
                        }
                    }, response => { })
            },
            //添加确定按钮
            addOk() {
                let self = this;
                var isValid = true;
                self.$refs['info'].validate(valid => {
                    if (valid == false) {
                        this.$Message.error('表单输入有误,请检查!')
                        isValid = false;
                    }
                })
                if (isValid == false) {
                    return
                }
                self.info.applicantTime = moment(self.info.Is_applicantTime).format("X");
                self.$http.post(this.$config.BaseURL2 + '/tv/macuse/edit', self.info).then(response => {
                    if (response.data.errno == 10000) {
                        self.info = {};
                        self.getTableList();
                        self.modalAdd = false;
                        self.$Message.success('添加成功！')
                    }
                }, response => { })
            },
            addCancel() {
                this.info = {};
                this.modalAdd = false;
            },
            //详情
            details(row) {
                this.news = row;
                console.log(this.news);
                this.modalDetails = true;
            },
            //搜索
            query() {
                this.getTableList();
            },
            //删除
            remove(row) {
                let self = this;
                console.log(row)
                self.$http(this.$config.BaseURL2 + '/tv/macuse/del?_id=' + row._id).then(response => {
                    if (response.data.errno == 10000) {
                        this.getTableList();
                        this.$Message.success('删除成功！')
                    }
                }, response => { })
            }
        },
        mounted() {
            this.getTableList()
        }
    }
</script>