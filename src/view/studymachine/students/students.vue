<style>
    .layout-students-page {
        float: right;
        margin-top: 10px;
    }
</style>
<template>
    <div class="layout-students">
        <div class="layout-students-search">
            <Form :model="search" inline>
                <FormItem label="设备mac:" :label-width="70">
                    <Input v-model="search.mac" style="width:200px;" placeholder="请输入设备mac..."></Input>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="query">搜索</Button>
                </FormItem>
            </Form>
        </div>
        <div class="layout-students-table">
            <Table border :columns="columns1" :data="data1"></Table>
        </div>
        <div class="layout-students-page">
            <Page :total="total" :current="page" :page-size='pageSize' @on-change="changePage" show-elevator />
        </div>
    </div>
</template>
<script>
    var moment = require("moment");
    export default {
        data() {
            return {
                search: {
                    mac: ""
                },
                total: 0,
                page: 1,
                pageSize: 30,//分页
                columns1: [
                    {
                        title: '设备mac',
                        key: 'mac',
                        align: 'center'
                    },
                    {
                        title: '学生头像',
                        key: 'headimgurl',
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('img', {
                                    attrs: {
                                        src: params.row.headimgurl
                                    },
                                    style: {
                                        width: '50px',
                                        height: '50px',
                                        marginTop: '5px'
                                    }
                                }),
                            ]);
                        }
                    },
                    {
                        title: '昵称',
                        key: 'nickname',
                        align: 'center'
                    },
                    {
                        title: '生日',
                        key: 'birthday',
                        align: 'center'
                    },
                    {
                        title: '性别',
                        key: 'is_sex',
                        align: 'center'
                    },
                    {
                        title: '学校',
                        key: 'school',
                        align: 'center'
                    },
                    {
                        title: '年级',
                        key: 'is_grade',
                        align: 'center'
                    },
                    {
                        title: '更新时间',
                        key: 'editortime',
                        align: 'center'
                    }
                ],
                data1: []
            }
        },
        methods: {
            getTableList() {
                this.$http.get(this.$config.BaseURL13 + '/admin/api/v1/students/list?mac=' + this.search.mac + '&page=' + this.page + '&pageSize=' + this.pageSize).then(response => {
                    console.log(response)
                    if (response.data.errno == 10000) {
                        this.data1 = response.data.data.list;

                        response.data.data.list.forEach(val => {

                            if (val.sex == 1) {
                                val.is_sex = "男"
                            } else if (val.sex == 2) {
                                val.is_sex = "女"
                            }

                            if (val.grade == 1) {
                                val.is_grade = "学龄前"
                            } else if (val.grade == 2) {
                                val.is_grade = "一年级"
                            } else if (val.grade == 3) {
                                val.is_grade = "二年级"
                            } else if (val.grade == 4) {
                                val.is_grade = "三年级"
                            } else if (val.grade == 5) {
                                val.is_grade = "四年级"
                            } else if (val.grade == 6) {
                                val.is_grade = "五年级"
                            } else if (val.grade == 7) {
                                val.is_grade = "六年级"
                            } else if (val.grade == 8) {
                                val.is_grade = "七年级"
                            } else if (val.grade == 9) {
                                val.is_grade = "八年级"
                            } else if (val.grade == 10) {
                                val.is_grade = "九年级"
                            } else if (val.grade == 11) {
                                val.is_grade = "高中一年级"
                            } else if (val.grade == 12) {
                                val.is_grade = "高中二年级"
                            } else if (val.grade == 13) {
                                val.is_grade = "高中三年级"
                            }
                        });

                        this.total = response.data.data.total;
                    }
                })
            },
            // 搜索
            query() {
                this.page = 1;
                this.getTableList();
            },
            //分页
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