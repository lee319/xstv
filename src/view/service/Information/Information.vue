<style>
    .layout-Information-page {
        float: right;
        margin-top: 10px;
    }
</style>
<template>
    <div class="layout-Information">
        <div class="layout-Information-search">
            <Form :model="search" inline>
                <FormItem label="mac" :label-width="50">
                    <Input v-model="search.mac" style="width:200px;" placeholder="请输入mac..."></Input>
                </FormItem>
                <FormItem label="整机sn:" :label-width="70">
                    <Input v-model="search.completeMachineSn" style="width:200px;" placeholder="请输入整机sn..."></Input>
                </FormItem>
                <FormItem label="板卡SN:" :label-width="70">
                    <Input v-model="search.boardCardSn" style="width:200px;" placeholder="请输入板卡SN..."></Input>
                </FormItem>
                <FormItem label="CPUID:" :label-width="70">
                    <Input v-model="search.cpuId" style="width:200px;" placeholder="请输入CPUID..."></Input>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="query">搜索</Button>
                </FormItem>
            </Form>
        </div>
        <div class="layout-Information-table">
            <Table border :columns="columns1" :data="data1"></Table>
        </div>
        <div class="layout-Information-page">
            <Page :total="total" :current="page" :page-size='pageSize' @on-change="changePage" show-elevator />
        </div>
        <!-- 详情 -->
        <Modal v-model="modalDetails" title="详情" width="1000">
            <Row>
                <Col span="8">
                <p>
                    mac:{{news.mac}}
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
                    整机sn:{{news.completeMachineSn}}
                </p>
                </Col>
                <Col span="8">
                <p>
                    终端厂商:{{news.customerName}}
                </p>
                </Col>
                <Col span="8">
                <p>
                    商用型号:{{news.commercialName}}
                </p>
                </Col>
                <Col span="8">
                <p>
                    内部型号:{{news.insideName}}
                </p>
                </Col>
                <Col span="8">
                <p>
                    渠道:{{news.channelValue}}
                </p>
                </Col>
            </Row>
            <div>
                <Tabs value="name1">
                    <TabPane label="基础信息" name="name1">
                        <Row>
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
                                生产日期:{{news.productionTime}}
                            </p>
                            </Col>
                            <Col span="8">
                            <p>
                                生产工厂:{{news.productionFactory}}
                            </p>
                            </Col>
                            <Col span="8">
                            <p>
                                录入时间:{{news.importTime}}
                            </p>
                            </Col>
                            <Col span="8">
                            <p>
                                hdcpKey:{{news.hdcpKey}}
                            </p>
                            </Col>
                            <Col span="8">
                            <p>
                                UI版本:{{news.uiVersion}}
                            </p>
                            </Col>
                            <Col span="8">
                            <p>
                                固件版本:{{news.firmwareVersion}}
                            </p>
                            </Col>
                            <Col span="8">
                            <p>
                                系统版本:{{news.systemVersion}}
                            </p>
                            </Col>
                            <Col span="8">
                            <p>
                                联网方式:{{news.networkingMode}}
                            </p>
                            </Col>
                            <Col span="8">
                            <p>
                                SSID:{{news.ssid}}
                            </p>
                            </Col>
                            <Col span="8">
                            <p>
                                激活时间:{{news.userActivationTime}}
                            </p>
                            </Col>
                            <Col span="8">
                            <p>
                                激活IP:{{news.userActivationIp}}
                            </p>
                            </Col>
                            <Col span="8">
                            <p>
                                最后请求时间:{{news.lastVisitTime}}
                            </p>
                            </Col>
                            <Col span="8">
                            <p>
                                最后请求IP:{{news.lastVisitIp}}
                            </p>
                            </Col>
                            <Col span="24">
                            <p>
                                描述:{{news.describe}}
                            </p>
                            </Col>
                        </Row>
                    </TabPane>
                    <!-- <TabPane label="定位信息" name="name2"></TabPane>
                    <TabPane label="用户信息" name="name3"></TabPane> -->
                </Tabs>
            </div>
        </Modal>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                search: {
                    mac: '',
                    cpuId: '',
                    boardCardSn: '',
                    completeMachineSn: ''
                },//搜索
                total: 0,
                page: 1,
                pageSize: 30,//分页
                news: [],
                modalDetails: false,//详情
                columns1: [
                    {
                        type: 'index',
                        width: 70,
                        title: '序号',
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
                                }, '详情')
                            ]);
                        }
                    }
                ],
                data1: []
            }
        },
        methods: {
            // 表格列表
            getTableList() {
                this.$http.get(this.$config.BaseURL2 + '/tv/device/list?mac=' + this.search.mac + '&completeMachineSn=' + this.search.completeMachineSn + '&boardCardSn=' + this.search.boardCardSn + '&cpuId=' + this.search.cpuId + '&page=' + this.page + '&pageSize=' + this.pageSize).then(response => {
                    if (response.data.errno == 10000) {
                        this.data1 = response.data.data.list;
                    }
                })
            },
            //搜索
            query() {
                this.page = 1;
                this.getTableList();
            },
            // 分页
            changePage(page) {
                this.page = page;
                this.getTableList();
            },
            //详情
            details(row) {
                this.news = row;
                this.modalDetails = true;
            }
        },
        mounted() {
            this.getTableList();
        }
    }
</script>