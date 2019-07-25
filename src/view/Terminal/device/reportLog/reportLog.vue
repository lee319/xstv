<style>
    .layout-reportLog-page {
        float: right;
        margin-top: 10px;
    }
</style>
<template>
    <div class="layout-reportLog">
        <div class="layout-reportLog-search">
            <Form :model="search" label-position="right" inline>
                <FormItem label="mac" :label-width="40">
                    <Input v-model="search.mac" style="width: 180px;" placeholder="请输入mac..."></Input>
                </FormItem>
                <FormItem label="整机sn:" :label-width="60">
                    <Input v-model="search.completeMachineSn" style="width: 180px;" placeholder="请输入整机sn..."></Input>
                </FormItem>
                <FormItem label="cpuid:" :label-width="60">
                    <Input v-model="search.cpuId" style="width: 180px;" placeholder="请输入cpuid..."></Input>
                </FormItem>
                <FormItem label="板卡sn:" :label-width="60">
                    <Input v-model="search.boardCardSn" style="width: 180px;" placeholder="请输入板卡sn..."></Input>
                </FormItem>

                <FormItem label="请求时间:" :label-width="65">
                    <DatePicker type="datetimerange" placement="bottom-end" placeholder="请选择整机激活时间..." style="width: 300px"
                        v-model="timer"></DatePicker>
                </FormItem>
                <FormItem label="请求IP:" :label-width="55">
                    <Input v-model="search.lastVisitIp" style="width: 200px;" placeholder="请输入请求IP..."></Input>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="query()">搜索</Button>
                </FormItem>
                <FormItem :label-width="150">
                    <Button type="success" @click="downloadExcel">Excel导出</Button>
                </FormItem>
            </Form>
        </div>
        <div class="layout-reportLog-table">
            <Table border :columns="columns1" :data="data1"></Table>
        </div>
        <!-- 分页 -->
        <div class="layout-reportLog-page">
            <Page :total="total" :current="page" :page-size='pageSize' @on-change="changePage" show-elevator />
        </div>
        <!-- 详情 -->
        <Modal v-model="modalInfo" title="详情" width="700">
            <Row>
                <Col span="8"> mac:{{news.mac}}
                </Col>
                <Col span="8"> 无线mac:{{news.wirelessMac}}
                </Col>
                <Col span="8"> cpuid:{{news.cpuId}}
                </Col>
                <Col span="8"> 板卡sn:{{news.boardCardSn}}
                </Col>
                <Col span="8"> 整机sn:{{news.completeMachineSn}}
                </Col>
                <Col span="8"> 商用型号:{{news.commercialName}}
                </Col>
                <Col span="8"> 内部型号:{{news.insideName}}
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
                <Col span="8"> 请求时间:{{news.lastVisitTime}}
                </Col>
                <Col span="8"> 请求IP:{{news.lastVisitIp}}
                </Col>
            </Row>
        </Modal>
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
                    boardCardSn: '',
                    completeMachineSn: '',
                    lastVisitIp: '',
                    lastVisitTime: '',
                    endTime: '',
                    startTime: '',
                },//搜索
                timer: [],
                //分页
                total: 0,
                pageSize: 30,
                page: 1,
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
                        title: '请求IP',
                        key: 'lastVisitIp',
                        align: 'center'
                    },
                    {
                        title: '请求时间',
                        key: 'lastVisitTime',
                        align: 'center'
                    },
                    {
                        title: '操作',
                        width: 160,
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
                                            this.info(params.row)
                                        }
                                    }
                                }, '详情')
                            ]);
                        }
                    }
                ],
                data1: [],
                news: {},//详情
                modalInfo: false
            }
        },
        methods: {
            // 表格数据
            getTableList() {
                let self = this;
                //整机开始时间
                let startTime = moment(self.timer[0]).format("X");
                //整机结束时间
                let endTime = moment(self.timer[1]).format("X");
                if (isNaN(startTime)) {
                    startTime = ''
                }
                if (isNaN(endTime)) {
                    endTime = ''
                }

                self.$http(this.$config.BaseURL2 + '/tv/log/reportLog?mac=' + self.search.mac + '&cpuId=' + self.search.cpuId + '&boardCardSn=' + self.search.boardCardSn
                    + '&completeMachineSn=' + self.search.completeMachineSn + '&lastVisitIp=' + self.search.lastVisitIp +
                    '&startTime=' + startTime + '&endTime=' + endTime + '&page=' + self.page + '&pageSize=' + self.pageSize).then(response => {
                        if (response.data.errno == 10000) {
                            console.log(response)
                            // 给表格赋值
                            self.data1 = response.data.data.list;
                            // 分页
                            self.total = response.data.data.total;
                        }
                    }, response => { })
            },
            // 搜索
            query() {
                this.page = 1;
                this.getTableList()
            },
            //分页
            changePage(page) {
                this.page = page;
                this.getTableList()
            },
            //详情
            info(row) {
                console.log(row);
                this.news = row;
                this.modalInfo = true;
            },
            downloadExcel() {
                let self = this;
                let startTime = moment(self.timer[0]).format("X");
                //整机结束时间
                let endTime = moment(self.timer[1]).format("X");
                if (isNaN(startTime)) {
                    startTime = ''
                }
                if (isNaN(endTime)) {
                    endTime = ''
                }
                console.log(self.search.startTime)
                window.open(this.$config.BaseURL2 + '/tv/export/reportLog?mac=' + self.search.mac + '&cpuId=' + self.search.cpuId + '&boardCardSn=' + self.search.boardCardSn
                    + '&completeMachineSn=' + self.search.completeMachineSn + '&lastVisitIp=' + self.search.lastVisitIp +
                    '&startTime=' + startTime + '&endTime=' + endTime, '_blank')
            }
        },
        mounted() {
            this.getTableList()
        }
    }
</script>