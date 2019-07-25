<style>
    .layout-order-page {
        float: right;
        margin-top: 10px;
    }

    .ivu-table th,
    .ivu-table td {
        height: 40px;
    }
</style>
<template>
    <div class="layout-order">
        <!-- 搜索 -->
        <div class="layout-order-search">
            <Form :model="search" label-position="right" inline>
                <FormItem label="用户ID:" :label-width="60">
                    <Input v-model="search.userId" placeholder="请输入用户ID..." style="width: 200px;"></Input>
                </FormItem>
                <FormItem label="订单号:" :label-width="60">
                    <Input v-model="search.orderId" placeholder="请输入订单号..." style="width: 200px;"></Input>
                </FormItem>
                <FormItem label="支付状态:" :label-width="70">
                    <Select v-model="search.status" style="width:200px" aria-placeholder="请选择支付状态...">
                        <Option value="">全部</Option>
                        <Option :value="1">未支付</Option>
                        <Option :value="2">已支付</Option>
                    </Select>
                </FormItem>
                <FormItem label="创建时间:" :label-width="70">
                    <DatePicker type="datetimerange" placement="bottom-end" placeholder="请选择请求时间..."
                        style="width: 200px" v-model="timer"></DatePicker>
                </FormItem>
                <FormItem label="用户昵称:" :label-width="70">
                    <Input v-model="search.nickname" placeholder="请输入用户昵称..." style="width: 200px;"></Input>
                </FormItem>
                <FormItem label="商品名称:" :label-width="70">
                    <Input v-model="search.goodsName" placeholder="请输入商品名称..." style="width: 200px;"></Input>
                </FormItem>
                <FormItem label="商品类型:" :label-width="70">
                    <Select v-model="search.goodsClass" style="width:200px" placeholder="请选择商品类型...">
                        <Option value="">全部</Option>
                        <Option :value="1">点播视频</Option>
                        <Option :value="2">奇异果影视会员</Option>
                    </Select>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="query()">搜索</Button>
                </FormItem>
                <FormItem :label-width="95">
                    <Button type="success" @click="downloadExcel">导出excel</Button>
                </FormItem>
                <FormItem>
                </FormItem>
            </Form>
        </div>
        <!-- 表格 -->
        <div class="layout-order-table">
            <Table border :columns="columns1" :data="data1"></Table>
        </div>
        <!-- 详情 -->
        <div class='layout-order-info'>
            <Modal v-model="modalInfo" title='订单详情' width="700">
                <Row>
                    <Col span="12">
                    <p>
                        ID:{{details.id}}
                    </p>
                    </Col>
                    <Col span="12">
                    <p>
                        订单号:{{details.orderId}}
                    </p>
                    </Col>
                    <Col span="12">
                    <p>
                        商品类型:{{details.goodsClass}}
                    </p>
                    </Col>
                    <Col span="12" v-show="true ? details.contentId != '' : details.contentId == ''">
                    <p>
                        单片ID:{{details.contentId}}
                    </p>
                    </Col>
                    <Col span="12">
                    <p>
                        商品名称:{{details.goodsName}}
                    </p>
                    </Col>
                    <Col span="12">
                    <p>
                        用户ID:{{details.userId}}
                    </p>
                    </Col>
                    <Col span="12">
                    <p>
                        用户昵称:{{details.nickname}}
                    </p>
                    </Col>
                    <Col span="12">
                    <p>
                        原价(元):{{details.orgPrice}}
                    </p>
                    </Col>
                    <Col span="12">
                    <p>
                        支付金额(元):{{details.price}}
                    </p>
                    </Col>
                    <Col span="12">
                    <p>
                        购买渠道:
                    </p>
                    </Col>
                    <Col span="12">
                    <p>
                        创建时间:{{details.IscreateTime}}
                    </p>
                    </Col>
                    <Col span="12">
                    <p>
                        支付状态:{{details.Isstatus}}
                    </p>
                    </Col>
                    <Col span="12">
                    <p>
                        付款方式:{{details.paymentMethod}}
                    </p>
                    </Col>
                    <Col span="12">
                    <p>
                        使用终端mac:{{details.mac}}
                    </p>
                    </Col>
                    <Col span="12">
                    <p>
                        支付流水号:{{details.transactionId}}
                    </p>
                    </Col>
                    <Col span="12">
                    <p v-if="details.status !=1">
                        付款时间:{{details.IspayTime}}
                    </p>
                    </Col>
                    <Col span="12">
                    <p>
                        同步爱奇艺状态:{{details.state}}
                    </p>
                    </Col>
                </Row>
            </Modal>
        </div>
        <!-- 分页 -->
        <div class="layout-order-page">
            <Page :total="total" :current="page" :page-size="pageSize" @on-change="changePage" show-elevator />
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
                    userId: '',
                    orderId: '',
                    status: '',
                    createTimeStart: '',
                    createTimeEnd: '',
                    nickname: '',
                    goodsName: '',
                    goodsClass: '',
                },
                timer: [],
                //详情
                modalInfo: false,
                details: {},
                //分页
                pageSize: 30,
                page: 1,
                total: 0,
                columns1: [
                    {
                        title: '订单号',
                        key: 'orderId',
                        align: 'center'
                    },
                    {
                        title: '商品类型',
                        key: 'goodsClass',
                        align: 'center'
                    },
                    {
                        title: '商品名称',
                        key: 'goodsName',
                        align: 'center'
                    },
                    {
                        title: '用户ID',
                        key: 'userId',
                        align: 'center'
                    },
                    {
                        title: '用户昵称',
                        key: 'nickname',
                        align: 'center'
                    },
                    {
                        title: '支付金额',
                        key: 'price',
                        align: 'center'
                    },
                    {
                        title: '支付状态',
                        key: 'Isstatus',
                        align: 'center'
                    },
                    {
                        title: '付款方式',
                        key: 'Ispayment',
                        align: 'center'
                    },
                    {
                        title: '同步状态',
                        key: 'state',
                        align: 'center'
                    },
                    {
                        title: '创建时间',
                        key: 'IscreateTime',
                        align: 'center'
                    }, {
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
                            ])
                        }
                    }
                ],
                data1: [
                ]
            }
        },
        methods: {
            //列表数据
            getTableList() {
                let self = this;
                //开始时间
                let createTimeStart = moment(self.timer[0]).format("X");
                //结束时间
                let createTimeEnd = moment(self.timer[1]).format("X");

                if (this.search.status == undefined) {
                    this.search.status = ""
                }
                if (isNaN(createTimeStart)) {
                    createTimeStart = ''
                }
                if (isNaN(createTimeEnd)) {
                    createTimeEnd = ''
                }
                self.$http(this.$config.BaseURL10 + '/order/list?userId=' + self.search.userId + '&orderId=' + self.search.orderId + '&status=' +
                    self.search.status + '&nickname=' + self.search.nickname + '&goodsName=' + self.search.goodsName + '&goodsClass=' +
                    self.search.goodsClass + '&page=' + self.page + '&pageSize=' + self.pageSize + '&createTimeStart=' + createTimeStart
                    + '&createTimeEnd=' + createTimeEnd).then(response => {
                        console.log(response)
                        if (response.data.errno == 10000) {
                            this.data1 = response.data.data.list;
                            this.total = response.data.data.total;
                            response.data.data.list.forEach(val => {
                                //1、未支付  2、成功  3、失败
                                if (val.status == 1) {
                                    val.Isstatus = '未支付'
                                } else if (val.status == 2) {
                                    val.Isstatus = '已支付'
                                } else if (val.status == 3) {
                                    val.Isstatus = '支付失败'
                                };
                                // //支付方式  1、微信
                                if (val.payment == 1) {
                                    val.Ispayment = '微信'
                                }
                                //同步状态：1 未同步，2 同步中，3 完成同步， 4 同步失败
                                if (val.iqiyiStatus == 1) {
                                    val.state = '未同步'
                                } else if (val.iqiyiStatus == 2) {
                                    val.state = '同步中'
                                } else if (val.iqiyiStatus == 3) {
                                    val.state = '完成同步'
                                } else if (val.iqiyiStatus == 4) {
                                    val.state = '同步失败'
                                }
                                //转换时间
                                val.IscreateTime = moment(val.createTime * 1000).format(
                                    "YYYY-MM-DD HH:mm:ss"
                                )
                            });
                        }
                    })

            },
            //分页
            changePage(page) {
                this.page = page;
                this.getTableList()
            },
            //查询
            query() {
                this.page = 1;
                this.getTableList();
            },
            //导出excel
            downloadExcel() {
                let self = this;
                //开始时间
                let createTimeStart = moment(self.timer[0]).format("X");
                //结束时间
                let createTimeEnd = moment(self.timer[1]).format("X");

                if (this.search.status == undefined) {
                    this.search.status = ""
                }
                if (isNaN(createTimeStart)) {
                    createTimeStart = ''
                }
                if (isNaN(createTimeEnd)) {
                    createTimeEnd = ''
                }
                window.open(this.$config.BaseURL10 + '/order/export?userId=' + self.search.userId + '&orderId=' + self.search.orderId
                    + '&search.status=' + self.search.status + '&nickname=' + self.search.nickname + '&search.goodsName=' + self.search.goodsName
                    + '&goodsClass=' + self.search.goodsClass + '&createTimeStart=' + createTimeStart + '&createTimeEnd=' + createTimeEnd, '_blank')
            },
            //详情
            info(row) {
                console.log(row)
                this.details = row;
                this.modalInfo = true;
                //1、未支付  2、成功  3、失败
                if (row.status == 1) {
                    row.Isstatus = '未支付'
                } else if (row.status == 2) {
                    row.Isstatus = '已支付'
                } else if (row.status == 3) {
                    row.Isstatus = '支付失败'
                };
                //转换时间
                row.IscreateTime = moment(row.createTime * 1000).format(
                    "YYYY-MM-DD HH:mm:ss"
                );
                row.IspayTime = moment(row.payTime * 1000).format(
                    "YYYY-MM-DD HH:mm:ss"
                );
                //支付方式
                if (row.payment == 1) {
                    row.paymentMethod = '微信'
                }
                //同步状态：1 未同步，2 同步中，3 完成同步， 4 同步失败
                if (row.iqiyiStatus == 1) {
                    row.state = '未同步'
                } else if (row.iqiyiStatus == 2) {
                    row.state = '同步中'
                } else if (row.iqiyiStatus == 3) {
                    row.state = '完成同步'
                } else if (row.iqiyiStatus == 4) {
                    row.state = '同步失败'
                }
            },
        },
        mounted() {
            this.getTableList();
        }
    }


</script>