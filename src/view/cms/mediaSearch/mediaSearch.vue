<style>
    .layout-mediaSearch-page{
        float: right;
        margin-top:10px;
    }
</style>
<template>
    <div class="layout-mediaSearch">
        <!-- 搜索 -->
        <div class="layout-mediaSearch-search">
            <Form :model="search" inline>
                <FormItem label="节目名称:" :label-width="70">
                    <Input v-model="search.title" style="width:200px;" placeholder="请输入节目名称..."></Input>
                </FormItem>
                <FormItem label="年代:" :label-width="50">
                    <Input v-model="search.year" style="width:200px;" placeholder="请输入年代..."></Input>
                </FormItem>
                <FormItem label="导演:" :label-width="50">
                    <Input v-model="search.director" style="width:200px;" placeholder="请输入导演..."></Input>
                </FormItem>
                <FormItem label="分类:" :label-width="50">
                    <Select v-model="search.cid" style="width:200px">
                        <Option v-for="item in cidList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                    </Select>
                </FormItem>
                <FormItem label="节目状态:" :label-width="70">
                    <Select v-model="search.status" style="width:200px">
                        <!-- 0:下线；1:上线 -->
                        <Option value="">全部</Option>
                        <Option :value="1">上线</Option>
                        <Option :value="0">下线</Option>
                    </Select>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="query">搜索</Button>
                </FormItem>
            </Form>
        </div>
        <!-- 表格 -->
        <div class="layout-mediaSearch-table">
            <Table border :columns="columns1" :data="data1"></Table>
        </div>
        <!-- 分页 -->
        <div class="layout-mediaSearch-page">
            <Page :total="total" :current="page" :page-size='pageSize' @on-change="changePage" show-elevator />
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                search: {
                    title: '',
                    year: '',
                    director: '',
                    cid: '',
                    status: ''
                },
                cidList: [],
                page: 1,
                pageSize: 30,
                total: 0,
                columns1: [
                    {
                        title: '节目集ID',
                        key: 'id',
                        align: 'center'
                    },
                    {
                        title: '节目名称',
                        key: 'title',
                        align: 'center'
                    },
                    {
                        title: '节目分类',
                        key: 'category_name',
                        align: 'center'
                    },
                    {
                        title: '导演',
                        key: 'director',
                        align: 'center'
                    },
                    {
                        title: '上映年代',
                        key: 'release_year',
                        align: 'center'
                    },
                    {
                        title: '语言',
                        key: 'language',
                        align: 'center'
                    },
                    {
                        title: '节目状态',
                        key: 'is_status',
                        align: 'center'
                    }
                ],
                data1: []
            }
        },
        methods: {
            // 列表
            getTableList() {
                this.$http(this.$config.BaseURL8 + '/cms/media/search?title=' + this.search.title + '&year=' + this.search.year + '&director=' + this.search.director + '&cid=' + this.search.cid + '&status=' + this.search.status +
                    '&page=' + this.page + '&pageSize=' + this.pageSize).then(response => {
                        console.log(response)
                        if (response.data.errno == 10000) {
                            this.data1 = response.data.data.list;

                            response.data.data.list.forEach(val => {
                                // 节目状态，0:下线；1:上线
                                if (val.status == 0) {
                                    val.is_status = "下线"
                                } else if (val.status == 1) {
                                    val.is_status = "上线"
                                }
                            });

                            this.total = response.data.data.total;
                        }
                    })
            },
            // 下拉框
            getSelect() {
                this.$http(this.$config.BaseURL1 + '/media/v2/category/list').then(response => {
                    if (response.data.errno == 10000) {
                        this.cidList = response.data.data.list;
                    }
                })
            },
            // 搜索
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
            this.getSelect();
            this.getTableList();
        }
    }
</script>