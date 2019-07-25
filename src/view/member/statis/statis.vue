<style>
    .layout-statis-page {
        float: right;
        margin-top: 10px;
    }
    .layout-statis-info{
        width: 100%;
        height: 100%;
        background-color: #d8d8d8;
        padding: 10px;
    }
</style>
<template>
    <div class="layout-statis">
        <div class="layout-statis-search">
            <Form :model="search" inline>
                <FormItem label="用户ID:" :label-width="60">
                    <Input v-model="search.userId" style="width:200px;" placeholder="请输入用户ID..."></Input>
                </FormItem>
                <FormItem label="首次会员时间:" :label-width="90">
                    <DatePicker type="datetimerange" style="width: 300px" placeholder="请选择首次会员时间..." v-model="timer"></DatePicker>
                </FormItem>
                <FormItem label="会员状态:" :label-width="70">
                    <Select v-model="search.status" style="width:200px" placeholder="请选择会员状态...">
                        <Option value="">全部</Option>
                        <Option :value="1">正常</Option>
                        <Option :value="2">过期</Option>
                    </Select>
                </FormItem>
                <FormItem label="用户昵称:" :label-width="70">
                    <Input v-model="search.nickname" style="width:200px;" placeholder="请输入用户昵称..."></Input>
                </FormItem>
                <FormItem label="会员过期时间:" :label-width="90">
                    <DatePicker type="datetimerange" style="width: 200px" placeholder="请选择首次会员时间..." v-model="timer1"></DatePicker>
                </FormItem>
                <FormItem label="手机号:" :label-width="60">
                    <Input v-model="search.mobile" style="width:200px;" placeholder="请输入手机号..."></Input>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="query">搜索</Button>
                </FormItem>
            </Form>
        </div>
        <div class="layout-statis-table">
            <Table border :columns="columns1" :data="data1"></Table>
        </div>
        <!-- 分页 -->
        <div class="layout-statis-page">
            <Page :total="total" :current="page" :page-size="pageSize" @on-change="changePage" show-elevator />
        </div>
        <!-- 详情 -->
        <Modal v-model="modalInfo" title="会员信息详情" width="1000">
            <div class="layout-statis-info">
                <Row>
                    <Col span="6">用户ID：{{news.userId}}</Col>
                    <Col span="6">用户昵称：{{news.nickname}}</Col>
                    <Col span="6">手机号：{{news.mobile}}</Col>
                    <Col span="6">会员状态：{{news.is_status}}</Col>
                    <Col span="8">首次会员时间：{{news.is_firstMemberTime}}</Col>
                    <Col span="8">会员过期时间：{{news.is_expire}}</Col>
                    <Col span="8">复购次数：{{news.repeatTimes}}</Col>
                </Row>
            </div>
            <div style="margin-top:20px;">
                <Table border :columns="columns2" :data="data2"></Table>
            </div>
        </Modal>
    </div>
</template>
<script>
    var moment = require("moment");
    export default {
        data() {
            return {
                search: {
                    memberStratTime: '',
                    memberEndTime: '',
                    nickname: '',
                    status: '',
                    userId: '',
                    expireStratTime: '',
                    expireEndTime: '',
                    mobile: ''
                },//搜索
                timer: [],
                timer1: [],
                pageSize: 30,
                page: 1,
                total: 0,//分页
                news: {},
                modalInfo: false,//详情
                userId: '',//详情用户id
                columns1: [
                    {
                        type: 'index',
                        width: 70,
                        title: '序号',
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
                        title: '首次会员时间',
                        key: 'is_firstMemberTime',
                        align: 'center'
                    },
                    {
                        title: '会员状态',
                        key: 'is_status',
                        align: 'center'
                    },
                    {
                        title: '复购次数',
                        key: 'repeatTimes',
                        align: 'center'
                    },
                    {
                        title: '会员过期时间',
                        key: 'is_expire',
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
                data1: [],
                columns2: [
                    {
                        type: 'index',
                        width: 70,
                        title: '序号',
                        align: 'center'
                    },
                    {
                        title: '订单号',
                        key: 'orderId',
                        align: 'center'
                    },
                    {
                        title: '商品名称',
                        key: 'goodsName',
                        align: 'center'
                    },
                    {
                        title: '支付金额',
                        key: 'price',
                        align: 'center'
                    },
                    {
                        title: '订单支付时间',
                        key: 'is_payTime',
                        align: 'center'
                    },
                    {
                        title: '会员过期时间',
                        key: 'is_expire',
                        align: 'center'
                    }
                ],
                data2: []
            }
        },
        methods: {
            // 表格
            getTableList() {
                //首次会员时间 开始时间
                let memberStratTime = moment(this.timer[0]).format("X");
                //首次会员时间 结束时间
                let memberEndTime = moment(this.timer[1]).format("X");

                //会员过期时间 开始时间
                let expireStratTime = moment(this.timer1[0]).format("X");
                //会员过期时间 结束时间
                let expireEndTime = moment(this.timer1[1]).format("X");

                if (this.search.status == undefined) {
                    this.search.status = ""
                }
                if (isNaN(memberStratTime)) {
                    memberStratTime = ''
                }
                if (isNaN(memberEndTime)) {
                    memberEndTime = ''
                }
                if (isNaN(expireStratTime)) {
                    expireStratTime = ''
                }
                if (isNaN(expireEndTime)) {
                    expireEndTime = ''
                }
                this.$http.get(this.$config.BaseURL10 + '/member/statis?page=' + this.page + '&pageSize=' + this.pageSize + '&memberEndTime=' + memberEndTime + '&memberStratTime=' + memberStratTime +
                    '&userId=' + this.search.userId + '&status=' + this.search.status + '&nickname=' + this.search.nickname + '&expireStratTime=' + expireStratTime + '&expireEndTime=' + expireEndTime + '&mobile=' + this.search.mobile).then(response => {
                        console.log(response)
                        if (response.data.errno == 10000) {
                            this.data1 = response.data.data.list;
                            this.total = response.data.data.total;

                            response.data.data.list.forEach(val => {
                                if (val.status == 1) {
                                    val.is_status = "正常"
                                } else if (val.status == 2) {
                                    val.is_status = "过期"
                                }

                                val.is_firstMemberTime = moment(val.firstMemberTime * 1000).format(
                                    "YYYY-MM-DD HH:mm:ss"
                                )

                                val.is_expire = moment(val.expire * 1000).format(
                                    "YYYY-MM-DD HH:mm:ss"
                                )
                            });
                        }
                    })
            },
            //搜索
            query() {
                this.page = 1;
                this.getTableList();
            },
            //分页
            changePage(page) {
                this.page = page;
                this.getTableList();
            },
            //详情
            info(row) {
                console.log(row);
                this.userId = row.userId;
                this.news = row;
                if (row.status == 1) {
                    row.is_status = "正常"
                } else if (row.status == 2) {
                    row.is_status = "过期"
                }

                row.is_firstMemberTime = moment(row.firstMemberTime * 1000).format(
                    "YYYY-MM-DD HH:mm:ss"
                )

                row.is_expire = moment(row.expire * 1000).format(
                    "YYYY-MM-DD HH:mm:ss"
                )
                this.getInfoTableList()
                this.modalInfo = true;
            },
            //详情列表数据
            getInfoTableList() {
                this.$http.get(this.$config.BaseURL10 + '/member/statisinfo?userId=' + this.userId).then(response => {
                    if (response.data.errno == 10000) {
                        this.data2 = response.data.data.list;
                        response.data.data.list.forEach(val => {
                            //时间转换
                            val.is_payTime = moment(val.payTime * 1000).format(
                                "YYYY-MM-DD HH:mm:ss"
                            )

                            val.is_expire = moment(val.expire * 1000).format(
                                "YYYY-MM-DD HH:mm:ss"
                            )
                        });
                    }
                })
            }
        },
        mounted() {
            this.getTableList();
        }
    }
</script>