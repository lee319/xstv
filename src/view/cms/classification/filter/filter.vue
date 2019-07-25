<style>
    .layout-filter-search {
        float: left;
    }

    .layout-filter-add {
        float: right;
    }

    .span {
        font-size: 14px;
        margin: 15px;
        color: #495060;
        padding-bottom: 20px;
    }

    .layout-filter-page {
        float: right;
        margin-top: 10px;
    }
</style>
<template>
    <div class="layout-filter">
        <!-- 搜索 -->
        <div class="layout-filter-search">
            <Form :model="search" inline>
                <FormItem label="分类:" :label-width="40">
                    <Input v-model="search.name" disabled style="width:200px;"></Input>
                </FormItem>
            </Form>
        </div>
        <!-- 添加 -->
        <div class="layout-filter-add">
            <Button type="success" @click="modalAdd = true">添加</Button>
            <Modal v-model="modalAdd" title="添加筛选类型">
                <div slot="footer">
                    <a @click="addCancel" class="span">取消</a>
                    <Button @click="addOk" type="primary">确定</Button>
                </div>
                <Form :model="info" label-position="right" :label-width="100">
                    <FormItem label="类型名称:">
                        <Input v-model="info.name" placeholder="请输入类型名称..."></Input>
                    </FormItem>
                    <FormItem label="排序:">
                        <Input v-model="info.sort" placeholder="请输入排序..."></Input>
                    </FormItem>
                    <FormItem label="描述:">
                        <Input v-model="info.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}"
                            placeholder="请输入描述..."></Input>
                    </FormItem>
                </Form>
            </Modal>
        </div>
        <div style="clear:both;"></div>
        <!-- 表格 -->
        <div class="layout-filter-table">
            <Table border :columns="columns1" :data="data1"></Table>
        </div>
        <div class="layout-filter-page">
            <Page :total="total" :current="page" :page-size='pageSize' @on-change="changePage" show-elevator />
        </div>
        <!-- 修改 -->
        <Modal v-model="modalEdit" title="修改筛选类型">
            <div slot="footer">
                <a @click="editCancel" class="span">取消</a>
                <Button @click="editOk" type="primary">确定</Button>
            </div>
            <Form :model="edit" label-position="right" :label-width="100">
                <FormItem label="类型名称:">
                    <Input v-model="edit.name" placeholder="请输入类型名称..."></Input>
                </FormItem>
                <FormItem label="排序:">
                    <Input v-model="edit.sort" placeholder="请输入排序..."></Input>
                </FormItem>
                <FormItem label="描述:">
                    <Input v-model="edit.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}"
                        placeholder="请输入描述..."></Input>
                </FormItem>
            </Form>
        </Modal>
        <!-- 筛选项 -->
        <Modal v-model="modalFilter" title="筛选项" :width="1000">
            <div style="float:right">
                <Button type="success" @click="modalScreenFilter = true">添加</Button>
            </div>
            <div style="clear:both;"></div>
            <div>
                <Table border :columns="columns2" :data="data2"></Table>
            </div>
        </Modal>

        <!-- 筛选项添加 -->
        <Modal v-model="modalScreenFilter" title="添加">
            <p>Content of dialog</p>
            <p>Content of dialog</p>
            <p>Content of dialog</p>
        </Modal>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                search: {
                    name: '',
                    categoryid: ''
                },
                id: '',
                info: {},
                modalAdd: false,//添加
                page: 1,
                pageSize: 30,
                total: 0,//分页
                edit: {},
                modalEdit: false,//修改
                modalFilter: false,//筛选项
                columns1: [
                    {
                        title: '排序',
                        key: 'sort',
                        align: 'center'
                    },
                    {
                        title: '筛选类型',
                        key: 'name',
                        align: 'center'
                    },
                    {
                        title: '创建时间',
                        key: 'create_time',
                        align: 'center'
                    },
                    {
                        title: '描述',
                        key: 'desc',
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
                                            this.filter(params.row)
                                        }
                                    }
                                }, '筛选项'),
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small',
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.modify(params.row)
                                        }
                                    }
                                }, '修改'),
                                h(
                                    "Poptip", {
                                        props: {
                                            confirm: true,
                                            title: "确定要删除吗！",
                                            type: "error",
                                            size: "small",
                                            width: "150"
                                        },
                                        on: {
                                            "on-ok": () => {
                                                this.remove(params.row);
                                            }
                                        }
                                    }, [
                                        h(
                                            "Button", {
                                                props: {
                                                    type: "error",
                                                    size: "small",
                                                }
                                            },
                                            "删除"
                                        )
                                    ]
                                )
                            ]);
                        }
                    }
                ],
                data1: [],
                filterId: '',//分类筛选类型ID
                
                modalScreenFilter: false,//筛选项添加
                columns2: [
                    {
                        title: '排序',
                        key: 'sort',
                        align: 'center'
                    },
                    {
                        title: '排序',
                        key: 'name',
                        align: 'center'
                    },
                    {
                        title: '创建时间',
                        key: 'create_time',
                        align: 'center'
                    },
                    {
                        title: '描述',
                        key: 'desc',
                        align: 'center'
                    }
                ],
                data2: []
            }
        },
        methods: {
            // 列表数据
            getTableList() {
                this.$http.get(this.$config.BaseURL8 + '/cms/category/filter/list?id=' + this.$route.query.id + '&page=' + this.page + '&pageSize=' + this.pageSize).then(response => {
                    console.log(response)
                    if (response.data.errno == 10000) {
                        this.data1 = response.data.data.list;
                        this.total = response.data.data.total;
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
            },
            //添加确定按钮
            addOk() {
                this.info.sort *= 1;
                this.info.categoryid = this.search.categoryid;
                this.info.categoryid *= 1;
                this.$http.post(this.$config.BaseURL8 + '/cms/category/filter/modify', this.info).then(response => {
                    if (response.data.errno == 10000) {
                        this.info = {};
                        this.getTableList();
                        this.modalAdd = false;
                        this.$Message.success('添加成功！');
                    }
                })
            },
            // 添加取消按钮
            addCancel() {
                this.info = {};
                this.getTableList;
                this.modalAdd = false;
            },
            //修改弹框
            modify(row) {
                console.log(row);
                this.edit = row;
                this.modalEdit = true;
            },
            //修改确定按钮
            editOk() {
                this.edit.sort *= 1;
                this.$http.post(this.$config.BaseURL8 + '/cms/category/filter/modify', this.edit).then(response => {
                    if (response.data.errno == 10000) {
                        this.modalEdit = false;
                        this.getTableList();
                        this.$Message.success('修改成功！');
                    }
                })
            },
            // 修改取消按钮
            editCancel() {
                this.modalEdit = false;
                this.getTableList();
            },
            // 删除
            remove(row) {
                this.$http.post(this.$config.BaseURL8 + '/cms/category/filter/delete', {
                    id: row.id
                }).then(response => {
                    if (response.data.errno == 10000) {
                        this.getTableList();
                        this.$Message.success('删除成功！');
                    }
                })
            },
            //筛选项
            filter(row) {
                this.filterId = row.id;
                this.modalFilter = true;
            },
            // 分类筛选项列表
            getFilterTableList() {
                this.$http.get(this.$config.BaseURL8 + '/cms/category/filteritem/list?id=' + this.filterId).then(response => {
                    if (response.data.errno == 10000) {
                        this.data2 = response.data.data.lis
                    }
                })
            }
        },
        mounted() {
            this.getTableList();
            this.search.name = this.$route.query.name;
            this.search.categoryid = this.$route.query.id;
        }
    }
</script>