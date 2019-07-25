<style>
    .layout-terminal1-page {
        float: right;
        margin-top: 10px;
    }

    .ivu-table th,
    .ivu-table td {
        height: 40px;
    }
</style>
<template>
    <div class="layout-activationLog">
        <!-- 搜索 -->
        <div class="layout-activationLog-search">
            <Form :model="search" label-position="right" inline>
                <FormItem label="mac:" :label-width="45">
                    <Input v-model="search.mac" placeholder="请输入mac..." style="width: 200px;"></Input>
                </FormItem>
                <FormItem label="请求ip:" :label-width="50">
                    <Input v-model="search.boardActivationIp" placeholder="请输入请求ip..." style="width: 200px;"></Input>
                </FormItem>
                <FormItem label="cpuid:" :label-width="50">
                    <Input v-model="search.cpuId" placeholder="请输入cpuid..." style="width: 200px;"></Input>
                </FormItem>
                <FormItem label="板卡sn:" :label-width="60">
                    <Input v-model="search.boardCardSn" placeholder="请输入板卡sn..." style="width: 200px;"></Input>
                </FormItem>
                </FormItem>
                <FormItem label="请求时间:" :label-width="70">
                    <DatePicker type="datetimerange" placement="bottom-end" placeholder="请选择请求时间..." style="width: 260px"
                        v-model="timer"></DatePicker>
                </FormItem>
                <FormItem label="激活状态:" :label-width="70">
                    <Select style="width: 200px;" placeholder="请选择激活状态..." v-model="search.status">
                        <Option value="">全部</Option>
                        <Option :value="1">激活成功</Option>
                        <Option :value="0">激活失败</Option>
                        <Option :value="2">已激活</Option>
                    </Select>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="query()">搜索</Button>
                </FormItem>
                <FormItem :label-width="95">
                    <Button type="success" @click="downloadExcel">导出excel</Button>
                </FormItem>
            </Form>
        </div>
        <!-- 表格 -->
        <div class="layout-activationLog-table">
            <Table border :columns="columns1" :data="data1"></Table>
        </div>
        <!-- 详情 -->
        <div class="layout-activationLog-info">
            <Modal v-model="modalInfo" title="板卡激活日志详情" width="700">
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
                        请求时间:{{news.boardActivationTime}}
                    </p>
                    </Col>
                    <Col span="8">
                    <p>
                        请求IP:{{news.boardActivationIp}}
                    </p>
                    </Col>
                </Row>
            </Modal>
        </div>
        <!-- 分页 -->
        <div class="layout-terminal1-page">
            <Page :total="total" :current="page" :page-size='pageSize' @on-change="changePage" show-elevator />
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
                    boardActivationIp: '',
                    status: '',
                    boardStartTime: '',
                    boardEndTime: ''
                },
                //  详情
                news: {},
                modalInfo: false,
                //分页
                total: 0,
                pageSize: 30,
                page: 1,
                timer: [],
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
                        align: 'center',
                        width: 200
                    },
                    {
                        title: '激活状态',
                        key: 'Isstatus',
                        align: 'center'
                    },
                    {
                        title: '请求IP',
                        key: 'boardActivationIp',
                        align: 'center'
                    },
                    {
                        title: '请求时间',
                        key: 'boardActivationTime',
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
                let boardStartTime = moment(self.timer[0]).format("X");
                //板卡结束时间
                let boardEndTime = moment(self.timer[1]).format("X");

                if (this.search.status == undefined) {
                    this.search.status = ""
                }
                if (isNaN(boardStartTime)) {
                    boardStartTime = ''
                }
                if (isNaN(boardEndTime)) {
                    boardEndTime = ''
                }
                self.$http(this.$config.BaseURL2 + '/tv/log/boardActivationLog?mac=' + self.search.mac + '&cpuId='
                    + self.search.cpuId + '&boardCardSn=' + self.search.boardCardSn + '&boardActivationIp=' + self.search.boardActivationIp
                    + '&status=' + self.search.status + '&boardStartTime=' + boardStartTime
                    + '&boardEndTime=' + boardEndTime + '&page=' + self.page + '&pageSize=' + self.pageSize).then(response => {
                        if (response.data.errno == 10000) {
                            console.log(response)
                            this.data1 = response.data.data.list;

                            this.total = response.data.data.total;
                            response.data.data.list.forEach(val => {
                                if (val.status == 0) {
                                    val.Isstatus = '激活失败'
                                } else if (val.status == 1) {
                                    val.Isstatus = '激活成功'
                                } else if (val.status == 2) {
                                    val.Isstatus = '已激活'
                                }
                            });
                        }
                    }, response => { })
            },
            //详情
            info(row) {
                console.log(row)
                this.news = row;
                // 0 未激活 1 已激活 3 全部
                if (row.status == 1) {
                    row.Isstatus = '激活成功'
                } else if (row.status == 0) {
                    row.Isstatus = '激活失败'
                } else if (row.status == 2) {
                    row.Isstatus = '已激活'
                }
                this.modalInfo = true;
            },
            //搜索
            query() {
                this.page = 1;
                this.getTableList()
            },
            // 分页
            changePage(page) {
                this.page = page;
                this.getTableList();
            },
            downloadExcel() {
                let self = this;
                    //板卡开始时间
                    let boardStartTime = moment(self.timer[0]).format("X");
                //板卡结束时间
                let boardEndTime = moment(self.timer[1]).format("X");

                if (this.search.status == undefined) {
                    this.search.status = ""
                }
                if (isNaN(boardStartTime)) {
                    boardStartTime = ''
                }
                if (isNaN(boardEndTime)) {
                    boardEndTime = ''
                }
                   
                window.open(this.$config.BaseURL2 + '/tv/export/boardactivationlog?mac=' + self.search.mac + '&cpuId='
                    + self.search.cpuId + '&boardCardSn=' + self.search.boardCardSn + '&boardActivationIp=' + self.search.boardActivationIp
                    + '&status=' + self.search.status + '&boardStartTime=' + boardStartTime
                    + '&boardEndTime=' + boardEndTime, '_blank')
            }

        },
        mounted() {
            this.getTableList()
        }
    }
</script>