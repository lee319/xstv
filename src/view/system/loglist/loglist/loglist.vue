<style>
    .layout-loglist-page {
        float: right;
        margin-top: 10px;
    }
    .ivu-table th,
    .ivu-table td {
        height: 40px;
    }
</style>
<template>
    <div class="layout-loglist">
        <!-- 搜索 -->
        <div class="layout-loglist-search">
            <Form :model="search" label-position="right" inline>
                <FormItem label="用户ID" :label-width="50">
                    <Input v-model="search.userId" placeholder="请输入用户ID..." style="width: 200px;"></Input>
                </FormItem>
                <FormItem label="ota版本:" :label-width="70">
                    <Input v-model="search.version" placeholder="请输入邮箱..." style="width: 200px;"></Input>
                </FormItem>
                <FormItem label="设备唯一mac:" :label-width="100">
                    <Input v-model="search.mac" placeholder="请输入设备唯一mac..." style="width: 200px;"></Input>
                </FormItem>
                <FormItem label="用户手机号:" :label-width="80">
                    <Input v-model="search.mobile" placeholder="请输入用户手机号..." style="width: 200px;"></Input>
                </FormItem>
                <FormItem label="描述信息:" :label-width="65">
                    <Input v-model="search.message" placeholder="请输入描述信息..." style="width: 200px;"></Input>
                </FormItem>
                <FormItem label="更新时间:" :label-width="80">
                    <DatePicker type="datetimerange" placement="bottom-end" placeholder="请选择更新时间..." style="width: 300px"
                        v-model="timer"></DatePicker>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="query">搜索</Button>
                </FormItem>
            </Form>
        </div>
        <div class="layout-loglist-table">
            <Table border :columns="columns1" :data="data1"></Table>
        </div>
        <div class="layout-loglist-page">
            <Page :total="total" :current="page" :page-size="pageSize" @on-change="changePage" show-elevator />
        </div>
    </div>
</template>
<script>
    var moment = require("moment");
    export default {
        data() {
            return {
                //分页
                pageSize: 30,
                page: 1,
                total: 0,
                search: {
                    userId: '',
                    version: '',
                    mac: '',
                    mobile: '',
                    message: '',
                    startTime: '',
                    endTime: ''
                },
                timer: [],//时间
                columns1: [
                    {
                        type: 'index',
                        width: 70,
                        align: 'center',
                        title: '序号'
                    },
                    {
                        title: '用户ID',
                        key: 'userId',
                        align: 'center'
                    },
                    {
                        title: 'ota版本',
                        key: 'version',
                        align: 'center'
                    },
                    {
                        title: 'ui版本名',
                        key: 'versionName',
                        align: 'center'
                    },
                    {
                        title: '机型',
                        key: 'model',
                        align: 'center'
                    },
                    {
                        title: '销售渠道',
                        key: 'channel',
                        align: 'center'
                    },
                    {
                        title: 'ui版本',
                        key: 'ui',
                        align: 'center'
                    },
                    {
                        title: 'mac',
                        key: 'mac',
                        align: 'center'
                    },
                    {
                        title: '地域',
                        key: 'region',
                        align: 'center'
                    },
                    {
                        title: '语言',
                        key: 'user-prefer-language',
                        align: 'center'
                    },
                    {
                        title: '用户手机号',
                        key: 'mobile',
                        align: 'center'
                    },
                    {
                        title: '描述信息',
                        key: 'message',
                        align: 'center'
                    },
                    {
                        title: '日志地址',
                        key: 'logUrl',
                        align: 'center',
                        render: (h, params) => {
                            return h('a', {
                                attrs: {
                                    href: params.row.logUrl,
                                    target: '_black'
                                }
                            }, '下载')
                        }
                    },
                    {
                        title: '更新时间',
                        key: 'updateTime',
                        align: 'center',
                        width: 150
                    }
                ],
                data1: []
            }
        },
        methods: {
            //表格数据 
            getTabeList() {
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

                self.$http(this.$config.BaseURL9 + '/common/aliyunoss/loglist?page=' + self.page + '&pageSize=' + self.pageSize + '&userId='
                    + self.search.userId + '&version=' + self.search.version + '&mac=' + self.search.mac + '&mobile=' + self.search.mobile +
                    '&message=' + self.search.message + '&startTime=' + startTime + '&endTime=' + endTime).then(response => {
                        if (response.data.errno == 10000) {
                            console.log(response)
                            self.data1 = response.data.data.logList;

                            self.total = response.data.data.total;

                            response.data.data.logList.forEach(val => {
                                // val.updateTime = 
                                val.updateTime = moment(val.updateTime * 1000).format(
                                    "YYYY-MM-DD HH:mm:ss"
                                );
                            });
                        }
                    }, response => { })
            },
            changePage(page) {
                this.page = page;
                this.getTabeList()
            },
            query() {
                this.page = 1;
                this.getTabeList();
            }
        },
        mounted() {
            this.getTabeList()
        }
    }
</script>