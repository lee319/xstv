<style>
    .layout-rest-page {
        float: right;
        margin-top: 10px;
    }
</style>
<template>
    <div class="layout-rest">
        <div class="layout-rest-search">
            <Form :model="search" inline>
                <FormItem label="设备mac:" :label-width="70">
                    <Input v-model="search.mac" style="width:200px;" placeholder="请输入设备mac..."></Input>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="query">搜索</Button>
                </FormItem>
            </Form>
        </div>
        <div class="layout-rest-table">
            <Table border :columns="columns1" :data="data1"></Table>
        </div>
        <div class="layout-rest-page">
            <Page :total="total" :current="page" :page-size='pageSize' @on-change="changePage" show-elevator />
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                search: {
                    mac: ''
                },
                total: 0,
                page: 1,
                pageSize: 30,//分页

                columns1: [
                    {
                        type: 'index',
                        width: 70,
                        align: 'center',
                        title: '序号'
                    },
                    {
                        title: '设备mac',
                        key: 'mac',
                        align: 'center'
                    },
                    {
                        title: '定时休息',
                        key: 'is_regularRest',
                        align: 'center'
                    },
                    {
                        title: '单次使用时长',
                        key: 'usage',
                        align: 'center'
                    },
                    {
                        title: '单次休息时长',
                        key: 'rest',
                        align: 'center'
                    },
                    {
                        title: '定时关机',
                        key: 'is_regularShutdown',
                        align: 'center'
                    },
                    {
                        title: '关机时间',
                        key: 'shutdownTime',
                        align: 'center'
                    },
                    {
                        title: '重复',
                        key: 'is_repeat',
                        align: 'center'
                    },
                    {
                        title: '最新更新时间',
                        key: 'updateTime',
                        align: 'center'
                    }
                ],
                data1: []
            }
        },
        methods: {
            getTableList() {
                this.$http.get(this.$config.BaseURL13 + '/admin/api/v1/rest/list?mac=' + this.search.mac + '&page=' + this.page + '&pageSize=' + this.pageSize).then(response => {
                    console.log(response)
                    if (response.data.errno == 10000) {
                        this.data1 = response.data.data.list;

                        response.data.data.list.forEach(val => {
                            if (val.regularRest == 0) {
                                val.is_regularRest = "否"
                            } else if (val.regularRest == 1) {
                                val.is_regularRest = "是"
                            }

                            if (val.regularShutdown == 0) {
                                val.is_regularShutdown = '否'
                            } else if (val.regularShutdown == 1) {
                                val.is_regularShutdown = '是'
                            }

                            if (val.repeat == 0) {
                                val.is_repeat = "仅今天"
                            } else if (val.repeat == 1) {
                                val.is_repeat = "每天"
                            }
                        });

                        this.total = response.data.data.total;
                    }
                })
            },
            //搜索
            query() {
                this.page = 1;
                this.getTableList();
            },
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