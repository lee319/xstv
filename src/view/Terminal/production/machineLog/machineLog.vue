<style>
    .layout-machineLog-page {
        float: right;
        margin-top: 10px;
    }

    .ivu-table th,
    .ivu-table td {
        height: 40px;
    }
</style>
<template>
    <div class="layout-machineLog">
        <!-- 搜索 -->
        <div class="layout-machineLog-search">
            <Form :model="search" label-position="right" inline>
                <FormItem label="mac:" :label-width="40">
                    <Input v-model="search.mac" style="width: 200px;" placeholder="请输入mac..."></Input>
                </FormItem>
                <FormItem label="整机sn:" :label-width="60">
                    <Input v-model="search.completeMachineSn" style="width: 200px;" placeholder="请输入整机sn..."></Input>
                </FormItem>
                <FormItem label="cpuid:" :label-width="40">
                    <Input v-model="search.cpuId" style="width: 200px;" placeholder="请输入cpuid..."></Input>
                </FormItem>
                <FormItem label="板卡sn:" :label-width="60">
                    <Input v-model="search.boardCardSn" style="width: 200px;" placeholder="请输入板卡sn..."></Input>
                </FormItem>
                <FormItem label="激活状态:" :label-width="70">
                    <Select style="width: 200px;" placeholder="请选择激活状态..." v-model="search.status">
                        <Option value="">全部</Option>
                        <Option :value="0">激活失败</Option>
                        <Option :value="1">激活成功</Option>
                        <Option :value="2">已激活</Option>
                    </Select>
                </FormItem>
                <FormItem label="厂商:" :label-width="40">
                    <Input v-model="search.customerName" style="width: 200px;" placeholder="请输入厂商..."></Input>
                </FormItem>
                <FormItem label="销售机型:" :label-width="70">
                    <Input v-model="search.commercialName" style="width: 200px;" placeholder="请输入销售机型..."></Input>
                </FormItem>
                <FormItem label="请求时间:" :label-width="70">
                    <DatePicker type="datetimerange" placement="bottom-end" placeholder="请选择请求时间..." style="width: 200px" v-model="timer"></DatePicker>
                    <!-- <Input v-model="search.input2" style="width: 200px;" placeholder="请输入请求时间..."></Input> -->
                </FormItem>
                <FormItem label="请求IP:" :label-width="70">
                    <Input v-model="search.activationIp" style="width: 200px;" placeholder="请输入请求IP..."></Input>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="query()">搜索</Button>
                </FormItem>
                <FormItem :label-width="70">
                    <Button type="success"  @click="downloadExcel">excel导出</Button>
                </FormItem>
            </Form>
        </div>
        <!-- 表格 -->
        <div class="layout-machineLog-table">
            <Table border :columns="columns1" :data="data1"></Table>
        </div>
        <!-- 分页 -->
        <div class="layout-machineLog-page">
            <Page :total="total" :current="page" :page-size='pageSize' @on-change="changePage" show-elevator />
        </div>
        <!-- 详情 -->
        <div class="layout-machineLog-info">
            <Modal v-model="modalInfo" title="整机激活日志详情" width="700">
                <Row>
                    <Col span="8">
                    <p>
                        mac:{{news.mac}}
                    </p>
                    </Col>
                    <Col span="8">
                    <p>
                        无线mac:{{news.wirelessMac}}
                    </p>
                    </Col>
                    <Col span="8">
                    <p>
                        cpuid:{{news.cpuId}}
                    </p>
                    </Col>
                    <Col span="8">
                    <p>
                        板卡sn:{{news.boardCardSn}}
                    </p>
                    </Col>
                    <Col span="8">
                    <p>
                        hdcpKey:{{news.hdcpKey}}
                    </p>
                    </Col>
                    <Col span="8">
                    <p>
                        激活状态:{{news.Isstatus}}
                    </p>
                    </Col>
                    <Col span="8">
                    <p>
                        错误代码:{{news.statusNumber}}
                    </p>
                    </Col>
                    <Col span="8">
                    <p>
                        错误原因:{{news.errmsg}}
                    </p>
                    </Col>

                    <Col span="8">
                    <p>
                        请求时间:{{news.activationTime}}
                    </p>
                    </Col>
                    <Col span="8">
                    <p>
                        请求IP:{{news.activationIp}}
                    </p>
                    </Col>
                    <Col span="8">
                    <p>
                        整机sn:{{news.completeMachineSn}}
                    </p>
                    </Col>
                    <Col span="8">
                    <p>
                        厂商:{{news.customerName}}
                    </p>
                    </Col>
                    <Col span="8">
                    <p>
                        生产工厂:{{news.productionFactory}}
                    </p>
                    </Col>
                    <Col span="8">
                    <p>
                        销售机型:{{news.commercialName}}
                    </p>
                    </Col>
                    <Col span="8">
                    <p>
                        内部机型:{{news.insideName}}
                    </p>
                    </Col>
                    <Col span="8">
                    <p>
                        渠道:{{news.channelName}}
                    </p>
                    </Col>
                    <Col span="8">
                    <p>
                        批次:{{news.batch}}
                    </p>
                    </Col>
                    <Col span="8">
                    <p>
                        订单号:{{news.orderNumber}}
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
                //搜索
                search: {
                    mac: '',
                    cpuId: '',
                    boardCardSn: '',
                    completeMachineSn: '',
                    status: '',
                    startTime: '',
                    endTime: '',
                    customerName: '',
                    commercialName: '',
                    activationIp: ''
                },
                timer: [],
                //详情
                news: {},
                modalInfo: false,
                //分页
                total: 0,
                pageSize: 30,
                page: 1,
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
                        align: 'center',
                        width: 150
                    },
                    {
                        title: 'cpuid',
                        key: 'cpuId',
                        align: 'center',
                        width: 150
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
                        title: '厂商',
                        key: 'customerName',
                        align: 'center'
                    },
                    {
                        title: '销售机型',
                        key: 'commercialName',
                        align: 'center'
                    },
                    {
                        title: '激活状态',
                        key: 'Isstatus',
                        align: 'center'
                    },
                    {
                        title: '请求IP',
                        key: 'activationIp',
                        align: 'center'
                    },
                    {
                        title: '请求时间',
                        key: 'activationTime',
                        align: 'center',
                        width: 160
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
                                            this.info(params.row)
                                        }
                                    }
                                }, '详情')
                            ]);
                        }
                    }
                ],
                data1: []
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
                if (this.search.status == undefined) {
                    this.search.status = ""
                }
                self.$http(this.$config.BaseURL2 + '/tv/log/activationLog?mac=' + self.search.mac + '&cpuId=' + self.search.cpuId + '&boardCardSn=' + self.search.boardCardSn + '&completeMachineSn=' + self.search.completeMachineSn
                    + '&status=' + self.search.status + '&startTime=' + startTime + '&endTime=' + endTime + '&customerName=' + self.search.customerName + '&commercialName='
                    + self.search.commercialName + '&activationIp=' + self.search.activationIp + '&page=' + self.page + '&pageSize=' + self.pageSize).then(response => {
                        if (response.data.errno == 10000) {
                            console.log(response)
                            self.data1 = response.data.data.list;
                            //分页
                            self.total = response.data.data.total;
                            //status
                            response.data.data.list.forEach(val => {
                                if (val.status == 1) {
                                    val.Isstatus = '激活成功'
                                } else if (val.status == 0) {
                                    val.Isstatus = '激活失败'
                                }else if (val.status == 2) {
                                    val.Isstatus = '已激活'
                                }
                            });
                        }
                    }, response => {

                    })
            },
            //详情
            info(row) {
                console.log(row)
                // 1 未激活 2 已激活 3 全部
              
                this.news = row;
                if (row.status == 0) {
                    row.Isstatus = '激活失败'
                } else if (row.status == 1) {
                    row.Isstatus = '激活成功'
                } else if (row.status == 2) {
                    row.Isstatus = '已激活'
                }
                this.modalInfo = true;
            },
            //搜索
            query() {
                this.page = 1;
                this.getTableList();
            },
            changePage(page) {
                this.page = page;
                this.getTableList();
            },
            downloadExcel(){
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
                window.open(this.$config.BaseURL2 + '/tv/export/activationlog?mac=' + self.search.mac + '&cpuId=' + self.search.cpuId + '&boardCardSn=' + self.search.boardCardSn + '&completeMachineSn=' + self.search.completeMachineSn
                    + '&status=' + self.search.status + '&startTime=' + startTime + '&endTime=' + endTime + '&customerName=' + self.search.customerName + '&commercialName='
                    + self.search.commercialName + '&activationIp=' + self.search.activationIp , '_blank')
            }
        },
        mounted() {
            this.getTableList()
        }
    }
</script>