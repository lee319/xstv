<style>
    .layout-vodlist-page{
    float: right;
    margin-top: 10px;
}
</style>
<template>
    <div class="layout-vodlist">
        <div class="layout-vodlist-search">
            <Form :model="search" inline>
                <FormItem label="用户ID:" :label-width="60">
                    <Input v-model="search.userId" style="width:200px;" placeholder="请输入用户ID..."></Input>
                </FormItem>
                <FormItem label="影片名称:" :label-width="70">
                    <Input v-model="search.goodsName" style="width:200px;" placeholder="请输入影片名称..."></Input>
                </FormItem>
                <FormItem label="订购状态:" :label-width="70">
                    <Select v-model="search.status" style="width:200px" placeholder="请输入订购状态...">
                        <Option value="">全部</Option>
                        <Option :value="1">正常</Option>
                        <Option :value="2">过期</Option>
                    </Select>
                </FormItem>
                <FormItem label="用户昵称:" :label-width="70">
                    <Input v-model="search.nickname" style="width:200px;" placeholder="请输入用户昵称..."></Input>
                </FormItem>
                <FormItem label="影片ID:" :label-width="60">
                    <Input v-model="search.contentId" style="width:200px;" placeholder="请输入影片ID..."></Input>
                </FormItem>
                <FormItem label="手机号:" :label-width="60">
                    <Input v-model="search.mobile" style="width:200px;" placeholder="请输入手机号..."></Input>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="query">搜索</Button>
                </FormItem>
            </Form>
        </div>
        <div class="layout-vodlist-table">
            <Table border :columns="columns1" :data="data1"></Table>
        </div>
        <div class="layout-vodlist-page">
            <Page :total="total" :current="page" :page-size="pageSize" @on-change="changePage" show-elevator />
        </div>
    </div>
</template>
<script>
    var moment = require("moment");
    export default {
        data() {
            return {
                search: {
                    userId: '',
                    goodsName: '',
                    nickname: '',
                    status: '',
                    contentId: '',
                    mobile:''
                },//搜索
                pageSize: 30,
                page: 1,
                total: 0,//分页

                columns1: [
                    {
                        type: 'index',
                        width: 70,
                        align: 'center',
                        title: '序号',
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
                        title: '手机号',
                        key: 'mobile',
                        align: 'center'
                    },
                    {
                        title: '影片ID',
                        key: 'contentId',
                        align: 'center'
                    },
                    {
                        title: '影片名称',
                        key: 'goodsName',
                        align: 'center'
                    },
                    {
                        title: '订购状态',
                        key: 'Is_status',
                        align: 'center'
                    },
                    {
                        title: '过期时间',
                        key: 'is_expire',
                        align: 'center'
                    }
                ],
                data1: []
            }
        },
        methods: {
            // 表格
            getTableList() {
                if (this.search.status == undefined) {
                    this.search.status = ""
                }
                this.$http.get(this.$config.BaseURL10 + '/order/vodlist?userId=' + this.search.userId + '&goodsName=' + this.search.goodsName + '&nickname=' + this.search.nickname + '&status=' + this.search.status + '&contentId=' + this.search.contentId +
                    '&page=' + this.page + '&pageSize=' + this.pageSize +'&mobile=' + this.search.mobile).then(response => {
                        if (response.data.errno == 10000) {
                            this.total = response.data.data.total;
                            this.data1 = response.data.data.list;

                            response.data.data.list.forEach(val => {
                                // 1 正常 2 过期
                                if (val.status == 1) {
                                    val.Is_status = '正常'
                                } else if (val.status == 2) {
                                    val.Is_status = '过期'
                                }else if (val.status == 3) {
                                    val.Is_status = '未知'
                                }

                                val.is_expire = moment(val.expire * 1000).format(
                                    "YYYY-MM-DD HH:mm:ss"
                                )
                            });
                        }
                    })
            },
            // 搜素
            query() {
                this.page = 1;
                this.getTableList();
            },
            // 分页
            changePage(page) {
                this.page = page;
                this.getTableList();
            }
        },
        mounted() {
            this.getTableList();
        }
    }
</script>