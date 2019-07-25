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
    <div class="layout-terminal1">
        <!-- 搜索 -->
        <div class="layout-terminal1-search">
            <Form :model="search" label-position="right" inline>
                <FormItem label="mac:" :label-width="45">
                    <Input v-model="search.mac" placeholder="请输入mac..." style="width: 210px;"></Input>
                </FormItem>
                <FormItem label="cpuid:" :label-width="50">
                    <Input v-model="search.cpuId" placeholder="请输入cupid..." style="width: 210px;"></Input>
                </FormItem>
                <FormItem label="板卡sn:" :label-width="60">
                    <Input v-model="search.boardCardSn" placeholder="请输入板卡sn..." style="width: 210px;"></Input>
                </FormItem>
                <FormItem label="厂商:" :label-width="60">
                    <Input v-model="search.customerName" placeholder="请输入厂商..." style="width: 210px;"></Input>
                </FormItem>
                <FormItem label="整机sn:" :label-width="60">
                    <Input v-model="search.completeMachineSn" placeholder="请输入整机sn..." style="width: 210px;"></Input>
                </FormItem>
                <FormItem label="整机激活:" :label-width="70">
                    <Select v-model="search.activationStatus" style="width:210px" placeholder="请选择整机激活...">
                        <Option :value="3">全部</Option>
                        <Option :value="1">未激活</Option>
                        <Option :value="2">已激活</Option>
                    </Select>
                </FormItem>
                <FormItem label="整机激活IP:" :label-width="80">
                    <Input v-model="search.activationIp" placeholder="请输入整机激活IP..." style="width: 210px;"></Input>
                </FormItem>
                <FormItem label="板卡激活时间:" :label-width="90">
                    <DatePicker type="datetimerange" placement="bottom-end" placeholder="请选择板卡激活时间..." style="width: 292px" v-model="timer"></DatePicker>
                </FormItem>
                <FormItem label="整机激活时间:" :label-width="90">
                    <DatePicker type="datetimerange" placement="bottom-end" placeholder="请选择整机激活时间..." style="width: 292px" v-model="timer1"></DatePicker>
                </FormItem>
                <FormItem label="销售机型:" :label-width="70">
                    <Input v-model="search.commercialName" placeholder="请输入销售机型..." style="width: 210px;"></Input>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="query()">搜索</Button>
                </FormItem>
                <FormItem :label-width="95">
                    <Button type="success" @click="downloadExcel">excel导出</Button>
                </FormItem>
            </Form>
        </div>
        <!-- 表格 -->
        <div class="layout-terminal1-table">
            <Table border :columns="columns1" :data="data1"></Table>
        </div>
        <!-- 详情 -->
        <div class="layout-terminal1-info">
            <Modal v-model="modalInfo" title="终端量产详情" width="700">
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
                        板卡激活时间:{{news.boardActivationTime}}
                    </p>
                    </Col>
                    <Col span="8">
                    <p>
                        整机sn:{{news.completeMachineSn}}
                    </p>
                    </Col>
                    <Col span="8">
                    <p>
                        板卡激活IP:{{news.boardActivationIp}}
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
                    <Col span="8">
                    <p>
                        整机激活状态:{{news.activationStatus}}
                    </p>
                    </Col>
                    <Col span="8">
                    <p>
                        整机激活时间:{{news.activationTime}}
                    </p>
                    </Col>
                    <Col span="8">
                    <p>
                        整机激活IP:{{news.activationIp}}
                    </p>
                    </Col>
                </Row>
            </Modal>
        </div>
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
                    completeMachineSn: '',
                    boardCardSn: '',
                    customerName: '',
                    commercialName: '',
                    activationIp: '',
                    activationStatus: '',
                    boardStartTime: '',
                    boardEndTime: '',
                    startTime: '',
                    endTime: ''
                },
                cityList: [],
                //详情 
                news: {},
                modalInfo: false,
                //分页
                total: 0,
                pageSize: 30,
                page: 1,
                //板卡时间
                timer: [],
                timer1: [],
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
                        align: 'center',
                        width: 160
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
                        title: '板卡激活时间',
                        key: 'boardActivationTime',
                        align: 'center',
                        width: 150
                    },
                    {
                        title: '整机激活IP',
                        key: 'activationIp',
                        align: 'center'
                    },
                    {
                        title: '整机激活时间',
                        key: 'activationTime',
                        align: 'center',
                        width: 150
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
                data1: [],
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
                //整机开始时间
                let startTime = moment(self.timer1[0]).format("X");
                //整机结束时间
                let endTime = moment(self.timer1[1]).format("X");

                if (isNaN(boardStartTime)) {
                    boardStartTime = ''
                }
                if (isNaN(boardEndTime)) {
                    boardEndTime = ''
                }
                if (isNaN(startTime)) {
                    startTime = ''
                }
                if (isNaN(endTime)) {
                    endTime = ''
                }
                self.$http(this.$config.BaseURL2 + '/tv/temporary/list?mac=' + self.search.mac + '&cpuId=' + self.search.cpuId + '&completeMachineSn='
                    + self.search.completeMachineSn + '&boardCardSn=' + self.search.boardCardSn
                    + '&customerName=' + self.search.customerName + '&commercialName='
                    + self.search.commercialName + '&activationIp=' + self.search.activationIp
                    + '&activationStatus=' + self.search.activationStatus + '&boardStartTime='
                    + boardStartTime + '&boardEndTime=' + boardEndTime + '&startTime='
                    + startTime + '&endTime=' + endTime + '&page=' + self.page + '&pageSize=' + self.pageSize).then(response => {
                        if (response.data.errno == 10000) {
                            console.log(response)
                            self.data1 = response.data.data.list;
                            self.total = response.data.data.total;
                        }
                    }, response => { })
            },
            //搜索
            query() {
                this.page = 1;
                this.getTableList()
            },
            //详情
            info(row) {
                this.modalInfo = true;
                this.news = row;
                //1 已激活  0 未激活
                if (this.news.activationStatus == 0) {
                    this.news.activationStatus = '未激活'
                } else if (this.news.activationStatus == 1) {
                    this.news.activationStatus = '已激活'
                }
            },
            // 分页
            changePage(page) {
                this.page = page;
                this.getTableList();
            },
            ExportData(data) {
                //定义文件内容，类型必须为Blob 否则createObjectURL会报错  
                let content = new Blob(data)
                //生成url对象  
                let urlObject = window.URL || window.webkitURL || window
                let url = urlObject.createObjectURL(content)
                //生成<a></a >DOM元素  
                let el = document.createElement('a')
                //链接赋值  
                el.href = url
                el.download = moment().second() + '.xlsx';
                //必须点击否则不会下载  
                el.click()
                //移除链接释放资源        
                urlObject.revokeObjectURL(url)
            },
            fileDownload(data, fileName) {
                let blob = new Blob([data], {
                    type: "application/octet-stream"
                });
                let filename = fileName || "filename.xls";
                if (typeof window.navigator.msSaveBlob !== "undefined") {
                    window.navigator.msSaveBlob(blob, filename);
                } else {
                    var blobURL = window.URL.createObjectURL(blob);
                    var tempLink = document.createElement("a");
                    tempLink.style.display = "none";
                    tempLink.href = blobURL;
                    tempLink.setAttribute("download", filename);
                    if (typeof tempLink.download === "undefined") {
                        tempLink.setAttribute("target", "_blank");
                    }
                    document.body.appendChild(tempLink);
                    tempLink.click();
                    document.body.removeChild(tempLink);
                    window.URL.revokeObjectURL(blobURL);
                }
            },
            //excel导出
            downloadExcel() {
                let self = this;
                //板卡开始时间
                let boardStartTime = moment(self.timer[0]).format("X");
                //板卡结束时间
                let boardEndTime = moment(self.timer[1]).format("X");
                //整机开始时间
                let startTime = moment(self.timer1[0]).format("X");
                //整机结束时间
                let endTime = moment(self.timer1[1]).format("X");

                if (isNaN(boardStartTime)) {
                    boardStartTime = ''
                }
                if (isNaN(boardEndTime)) {
                    boardEndTime = ''
                }
                if (isNaN(startTime)) {
                    startTime = ''
                }
                if (isNaN(endTime)) {
                    endTime = ''
                }
                window.open(this.$config.BaseURL2 + '/tv/export/temporary?mac=' + self.search.mac + '&cpuId=' + self.search.cpuId + '&completeMachineSn=' + self.search.completeMachineSn +
                    '&boardCardSn=' + self.search.boardCardSn + '&customerName=' + self.search.customerName + '&commercialName=' + self.search.commercialName +
                    '&startTime' + startTime + '&endTime=' + endTime + '&boardStartTime=' + boardStartTime + '&boardEndTime=' + boardEndTime +
                    '&activationIp=' + self.search.activationIp + '&activationStatus=' + self.search.activationStatus, '_blank')
            }
        },
        mounted() {
            this.getTableList()
        }
    }
</script>