<style>
    .span {
        font-size: 14px;
        margin: 15px;
        color: #495060;
        padding-bottom: 20px;
    }

    .layout-deviceNews .ivu-poptip-confirm .ivu-poptip-body .ivu-icon {
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

    .layout-deviceNews-page {
        float: right;
        margin-top: 10px;
    }
</style>
<template>
    <div class="layout-deviceNews">
        <div class="layout-deviceNews-search">
            <Form :model="search" inline>
                <FormItem label="mac:" :label-width="40">
                    <Input v-model="search.mac" style="width: 200px;" placeholder="请输入mac..."></Input>
                </FormItem>
                <FormItem label="cpuid:" :label-width="60">
                    <Input v-model="search.cpuId" style="width: 200px;" placeholder="请输入cpuid..."></Input>
                </FormItem>
                <FormItem label="板卡sn:" :label-width="60">
                    <Input v-model="search.boardCardSn" style="width: 200px;" placeholder="请输入板卡sn..."></Input>
                </FormItem>
                <FormItem label="整机sn:" :label-width="60">
                    <Input v-model="search.completeMachineSn" style="width: 200px;" placeholder="请输入整机sn..."></Input>
                </FormItem>
                <FormItem label="终端厂商:" :label-width="80">
                    <Select v-model="search.customerId" style="width:200px">
                        <Option v-for="item in cityList" :value="item._id" :key="item._id">{{ item.customerName }}</Option>
                    </Select>
                </FormItem>
                <FormItem label="商用型号:" :label-width="65">
                    <Select v-model="search.commercialId" style="width:200px">
                        <Option v-for="item in cityList1" :value="item._id" :key="item._id">{{ item.commercialName }}</Option>
                    </Select>
                </FormItem>
                <FormItem label="内部型号:" :label-width="70">
                    <Select v-model="search.insideId" style="width:200px">
                        <Option v-for="item in cityList2" :value="item._id" :key="item._id">{{ item.insideName }}</Option>
                    </Select>
                </FormItem>
                <FormItem label="渠道:" :label-width="50">
                    <Select v-model="search.channelId" style="width:200px">
                        <Option v-for="item in cityList3" :value="item._id" :key="item._id">{{ item.channelName }}</Option>
                    </Select>
                </FormItem>
                <FormItem label="用户激活:" :label-width="70">
                    <Select v-model="search.userActivationStatus" style="width:200px" placeholder="请选择用户激活...">
                        <Option value="">全部</Option>
                        <Option :value="1">已激活</Option>
                        <Option :value="0">未激活</Option>
                    </Select>
                </FormItem>
                <FormItem label="激活IP:" :label-width="70">
                    <Input v-model="search.userActivationIp" style="width: 200px;" placeholder="请输入激活IP..."></Input>
                </FormItem>
                <FormItem label="最后访问IP:" :label-width="75">
                    <Input v-model="search.lastVisitIp" style="width: 200px;" placeholder="请输入激活IP..."></Input>
                </FormItem>
                <FormItem label="激活时间:" :label-width="70">
                    <DatePicker type="datetimerange" placement="bottom-end" placeholder="请选择整机激活时间..." style="width: 300px"
                        v-model="timer"></DatePicker>
                </FormItem>
                <FormItem label="最后访问时间:" :label-width="90">
                    <DatePicker type="datetimerange" placement="bottom-end" placeholder="请选择整机激活时间..." style="width: 300px"
                        v-model="timer1"></DatePicker>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="query()">搜索</Button>
                </FormItem>
                <FormItem :label-width="90">
                    <Button type="success" @click="downloadExcel">导出excel</Button>
                </FormItem>
            </Form>
        </div>
        <div class="layout-deviceNews-table">
            <Table border :columns="columns1" :data="data1"></Table>
        </div>
        <!-- 分页 -->
        <div class="layout-deviceNews-page">
            <Page :total="total" :current="page" :page-size='pageSize' @on-change="changePage" show-elevator />
        </div>
        <!-- 详情 -->
        <div class="layout-deviceNews-info">
            <Modal v-model="modalInfo" title="详情" width="900">
                <Row>
                    <Col span="8"> mac:{{news.mac}}
                    </Col>
                    <Col span="8"> 无线mac:{{news.wirelessMac}}
                    </Col>
                    <Col span="8"> cpuid:{{news.cpuId}}
                    </Col>

                    <Col span="8"> 整机sn:{{news.completeMachineSn}}
                    </Col>
                    <Col span="8"> 批次:{{news.batch}}
                    </Col>
                    <Col span="8"> 订单号:{{news.orderNumber}}
                    </Col>
                    <Col span="8"> 生产日期:{{news.productionTime}}
                    </Col>
                    <Col span="8"> 生产工厂:{{news.productionFactory}}
                    </Col>
                    <Col span="8"> 终端厂商:{{news.customerName}}
                    </Col>
                    <Col span="8"> 商用型号:{{news.commercialName}}
                    </Col>
                    <Col span="8"> 内部型号:{{news.insideName}}
                    </Col>
                    <Col span="8"> 渠道:{{news.channelValue}}
                    </Col>
                    <Col span="8"> 任务ID:{{news.taskId}}
                    </Col>
                    <Col span="8"> 录入时间:{{news.importTime}}
                    </Col>
                    <Col span="8"> hdcpKey:{{news.hdcpKey}}
                    </Col>
                    <Col span="8"> UI版本:{{news.uiVersion}}
                    </Col>
                    <Col span="8"> 固件版本:{{news.firmwareVersion}}
                    </Col>
                    <Col span="8"> 系统版本:{{news.systemVersion}}
                    </Col>
                    <Col span="8"> 联网方式:{{news.networkingMode}}
                    </Col>
                    <Col span="8"> SSID:{{news.ssid}}
                    </Col>
                    <Col span="8"> 激活时间:{{news.userActivationTime}}
                    </Col>
                    <Col span="8"> 激活IP:{{news.userActivationIp}}
                    </Col>
                    <Col span="8"> 最后请求时间:{{news.lastVisitTime}}
                    </Col>
                    <Col span="8"> 最后请求IP:{{news.lastVisitIp}}
                    </Col>
                    <Col span="12"> 板卡sn:{{news.boardCardSn}}
                    </Col>
                    <Col span="12"> 描述:{{news.describe}}
                    </Col>
                </Row>
            </Modal>
        </div>
        <!-- 修改 -->
        <div class="layout-deviceNews-edit">
            <Modal v-model="modalEdit" title="修改">
                <div slot="footer">
                    <a @click="modalEdit=false" class="span">取消</a>
                    <Button @click="editOk" type="primary">确定</Button>
                </div>
                <Form :model="edit" label-position="right" :label-width="80" ref="edit" :rules="ruleValidate">
                    <FormItem label="mac:" prop="mac">
                        <Input v-model="edit.mac"></Input>
                    </FormItem>
                    <FormItem label="无线mac:" prop="wirelessMac">
                        <Input v-model="edit.wirelessMac"></Input>
                    </FormItem>
                    <FormItem label="板卡sn:" prop="boardCardSn">
                        <Input v-model="edit.boardCardSn"></Input>
                    </FormItem>
                    <FormItem label="整机sn:" prop="completeMachineSn">
                        <Input v-model="edit.completeMachineSn"></Input>
                    </FormItem>
                    <FormItem label="渠道:" prop="completeMachineSn">
                        <Select v-model="edit.channelId">
                            <Option v-for="item in editChannel" :value="item._id" :key="item._id">{{ item.channelName
                                }}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="描述:">
                        <Input v-model="edit.describe"></Input>
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
                    mac: '',
                    cpuId: '',
                    completeMachineSn: '',
                    boardCardSn: '',
                    customerId: '',
                    channelId: '',
                    commercialId: '',
                    insideId: '',
                    userActivationIp: '',
                    lastVisitIp: '',
                    endTime: '',
                    startTime: '',
                    endVisitTime: '',
                    startVisitTime: '',
                    userActivationStatus: ''
                },
                page: 1,
                total: 0,
                pageSize: 30,//分页
                cityList: [],
                cityList1: [],
                cityList2: [],
                cityList3: [],
                timer: [],
                timer1: [],
                news: [],//详情
                modalInfo: false,
                edit: {},
                modalEdit: false,//修改
                id: '',//一整行id
                editChannel: [],
                columns1: [
                    {
                        title: '序号',
                        type: 'index',
                        width: 70,
                        align: 'center'
                    },
                    {
                        title: 'mac',
                        key: 'mac',
                        align: 'center'
                    },
                    {
                        title: 'cpuid',
                        key: 'cpuId',
                        align: 'center'
                    },
                    {
                        title: '板卡sn',
                        key: 'boardCardSn',
                        align: 'center'
                    },
                    {
                        title: '整机sn',
                        key: 'completeMachineSn',
                        align: 'center'
                    },
                    {
                        title: '内部型号',
                        key: 'insideName',
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
                        title: '操作',
                        width: 220,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'warning',
                                        size: 'small',
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
                                }, '修改 '),
                                h(
                                    "Poptip", {
                                        props: {
                                            confirm: true,
                                            title: "确定要删除吗！",
                                            type: "error",
                                            size: "small",
                                            width: "150"
                                        },
                                        style: {
                                            marginRight: '5px'
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
                    mac: [
                        { required: true, message: '请输入mac...', trigger: 'blur' }
                    ],
                    boardCardSn: [
                        { required: true, message: '请输入板卡sn...', trigger: 'blur' }
                    ],
                    completeMachineSn: [
                        { required: true, message: '请输入整机sn...', trigger: 'blur' }
                    ],
                }
            }
        },
        methods: {
            //表格数据
            getTableList() {
                let self = this;
                //	激活开始时间
                let startTime = moment(self.timer[0]).format("X");
                //	激活结束时间
                let endTime = moment(self.timer[1]).format("X");

                //	激活开始时间
                let startVisitTime = moment(self.timer1[0]).format("X");
                //	激活结束时间
                let endVisitTime = moment(self.timer1[1]).format("X");

                if (isNaN(startTime)) {
                    startTime = ''
                }
                if (isNaN(endTime)) {
                    endTime = ''
                }
                if (isNaN(startVisitTime)) {
                    startVisitTime = ''
                }
                if (isNaN(endVisitTime)) {
                    endVisitTime = ''
                }
                self.$http(this.$config.BaseURL2 + '/tv/device/list?mac=' + self.search.mac + '&cpuId=' + self.search.cpuId + '&completeMachineSn=' + self.search.completeMachineSn
                    + '&boardCardSn=' + self.search.boardCardSn + '&customerId=' + self.search.customerId + '&boardCardSn=' + self.search.boardCardSn +
                    '&customerId=' + self.search.customerId + '&channelId=' + self.search.channelId + '&commercialId=' + self.search.commercialId +
                    '&insideId=' + self.search.insideId + '&userActivationIp=' + self.search.userActivationIp + '&lastVisitIp=' + self.search.lastVisitIp
                    + '&startTime=' + startTime + '&endTime=' + endTime + '&startVisitTime=' + startVisitTime + '&endVisitTime=' + endVisitTime + '&page=' + this.page + '&pageSize=' + self.pageSize +
                    '&userActivationStatus=' + self.search.userActivationStatus).then(response => {
                        if (response.data.errno == 10000) {
                            console.log(response)
                            self.data1 = response.data.data.list;
                            //分页
                            self.total = response.data.data.total;
                        }
                    }, response => { })
            },
            //厂商下拉框
            getSelect() {
                let self = this;
                self.$http(this.$config.BaseURL2 + '/tv/customer/list').then(response => {
                    if (response.data.errno == 10000) {
                        console.log(response)
                        this.cityList = response.data.data.list;
                    }
                }, response => { })
            },
            getSelect1() {
                let self = this;
                self.$http(this.$config.BaseURL2 + '/tv/commercialmodel/list').then(response => {
                    if (response.data.errno == 10000) {
                        console.log(response)
                        this.cityList1 = response.data.data.list;
                    }
                }, response => { })
            },
            getSelect2() {
                let self = this;
                self.$http(this.$config.BaseURL2 + '/tv/insidemodel/list').then(response => {
                    if (response.data.errno == 10000) {
                        self.cityList2 = response.data.data.list;
                    }
                }, response => {

                })
            },
            getSelect3() {
                let self = this;
                self.$http(this.$config.BaseURL2 + '/tv/channel/list').then(response => {
                    if (response.data.errno == 10000) {
                        self.cityList3 = response.data.data.list;
                    }
                }, response => { })
            },

            // 搜索
            query() {
                this.getTableList()
            },
            //详情
            details(row) {
                console.log(row)
                this.news = row;
                console.log(this.news)
                this.modalInfo = true;
            },
            //修改
            modify(row) {
                console.log(row);
                this.id = row._id
                console.log(this.id)
                this.edit = row;
                this.modalEdit = true;
                this.$http(this.$config.BaseURL2 + '/tv/channel/list?channelId=' + row._id).then(response => {
                    if (response.data.errno == 10000) {
                        this.editChannel = response.data.data.list;
                    }
                }, response => { })
            },
            //修改确定按钮
            editOk() {
                let self = this;
                self.$http.post(this.$config.BaseURL2 + '/tv/device/edit', self.edit).then(response => {
                    if (response.data.errno == 10000) {
                        this.modalEdit = false;
                        this.getTableList();
                        this.$Message.success('修改成功！')
                    }
                }, response => { })
            },
            //删除
            remove(row) {
                let self = this;
                self.$http(this.$config.BaseURL2 + '/tv/device/del?_id=' + row._id).then(response => {
                    if (response.data.errno == 10000) {
                        this.getTableList();
                        this.$Message.success('删除成功！');
                    }
                }, response => { })
            },
            //分页
            changePage(page) {
                this.page = page;
                this.getTableList();
            },
            downloadExcel() {
                let self = this;
                let startTime = moment(self.timer[0]).format("X");
                //	激活结束时间
                let endTime = moment(self.timer[1]).format("X");

                //	激活开始时间
                let startVisitTime = moment(self.timer1[0]).format("X");
                //	激活结束时间
                let endVisitTime = moment(self.timer1[1]).format("X");

                if (isNaN(startTime)) {
                    startTime = ''
                }
                if (isNaN(endTime)) {
                    endTime = ''
                }
                if (isNaN(startVisitTime)) {
                    startVisitTime = ''
                }
                if (isNaN(endVisitTime)) {
                    endVisitTime = ''
                }
                window.open(this.$config.BaseURL2 + '/tv/export/devicelist?mac=' + self.search.mac + '&cpuId=' + self.search.cpuId + '&completeMachineSn=' + self.search.completeMachineSn
                    + '&boardCardSn=' + self.search.boardCardSn + '&customerId=' + self.search.customerId + '&boardCardSn=' + self.search.boardCardSn +
                    '&customerId=' + self.search.customerId + '&channelId=' + self.search.channelId + '&commercialId=' + self.search.commercialId +
                    '&insideId=' + self.search.insideId + '&userActivationIp=' + self.search.userActivationIp + '&lastVisitIp=' + self.search.lastVisitIp
                    + '&startTime=' + startTime + '&endTime=' + endTime + '&startVisitTime=' + startVisitTime + '&endVisitTime=' + endVisitTime, '_blank')
            }
        },
        mounted() {
            this.getTableList()
            this.getSelect();
            this.getSelect1();
            this.getSelect2();
            this.getSelect3();
        }
    }
</script>