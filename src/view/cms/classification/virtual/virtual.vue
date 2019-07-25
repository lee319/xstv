<style>
    .layout-virtual-search {
        float: left;
    }

    .layout-virtual-add {
        float: right;
    }

    .layout-virtual-table {
        clear: both;
    }

    .span {
        font-size: 14px;
        margin: 15px;
        color: #495060;
        padding-bottom: 20px;
    }

    .layout-virtual-page {
        float: right;
        margin-top: 10px;
    }

    .layout-virtual .ivu-poptip-confirm .ivu-poptip-body .ivu-icon {
        font-size: 16px;
        color: #ff9900;
        line-height: 18px;
        position: absolute;
        margin-left: -50px;
    }

    .ivu-table th,
    .ivu-table td {
        height: 40px;
    }
</style>
<template>
    <div class="layout-virtual">
        <div class="layout-virtual-search">
            <Form :model="search" inline>
                <FormItem label="分类:" :label-width="40">
                    <Input v-model="search.name" style="width: 200px" placeholder="请输入分类..."></Input>
                </FormItem>
                <FormItem label="类型:" :label-width="40">
                    <Select v-model="search.type" style="width:200px" placeholder="请选择类型...">
                        <Option value="">全部</Option>
                        <Option :value="1">媒资分类</Option>
                        <Option :value="2">虚拟分类</Option>
                    </Select>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="query">搜索</Button>
                </FormItem>
            </Form>
        </div>
        <!-- 添加 -->
        <div class="layout-virtual-add">
            <Button type="success" @click="modalAddBtn">添加</Button>
            <Modal v-model="modalAdd" title="添加">
                <div slot="footer">
                    <a @click="addCancel" class="span">取消</a>
                    <Button @click="addOk" type="primary">确定</Button>
                </div>
                <Form :model="info" label-position="right" :label-width="100" ref="info" :rules="ruleValidate">
                    <FormItem label="虚拟分类名称:" prop="name">
                        <Input v-model="info.name" placeholder="请输入虚拟分类名称..."></Input>
                    </FormItem>
                    <FormItem label="描述:" prop="desc">
                        <Input v-model="info.desc" type="textarea" :rows="4" placeholder="请输入描述..."></Input>
                    </FormItem>
                </Form>
            </Modal>
        </div>
        <!-- 修改 -->
        <div class="layout-virtual-edit">
            <Modal v-model="modalEdit" title="修改">
                <div slot="footer">
                    <a @click="modalEditBtn" class="span">取消</a>
                    <Button @click="editOk" type="primary">确定</Button>
                </div>
                <Form :model="edit" label-position="right" :label-width="100" :rules="ruleValidate" ref="edit">
                    <FormItem label="虚拟分类名称:" prop="name">
                        <Input v-model="edit.name" placeholder="请输入虚拟分类名称..."></Input>
                    </FormItem>
                    <FormItem label="描述:" prop="desc">
                        <Input v-model="edit.desc" type="textarea" :rows="4" placeholder="请输入描述..."></Input>
                    </FormItem>
                </Form>
            </Modal>
        </div>
        <div class="layout-virtual-table">
            <Table border :columns="columns1" :data="data1"></Table>
        </div>
        <div class="layout-virtual-page">
            <Page :total="total" :current="page" :page-size='pageSize' @on-change="changePage" show-elevator />
        </div>
    </div>
</template>
<script>
    var moment = require("moment");
    import Qs from 'qs'
    export default {
        data() {
            return {
                //搜索
                search: {
                    name: '',
                    type: ''
                },
                //添加
                info: {
                    name: '',
                    desc: ''
                },
                modalAdd: false,
                //修改
                edit: {},
                modalEdit: false,
                //分页
                pageSize: 3,
                page: 1,
                total: 0,
                id: '',//一整行id
                //验证
                ruleValidate: {
                    name: [
                        { required: true, message: '请输入虚拟分类名称', trigger: 'blur' }
                    ],
                    desc: [
                        { required: true, message: '请输入描述', trigger: 'blur' }
                    ]
                },
                columns1: [
                    {
                        title: '分类ID',
                        key: 'id',
                        align: 'center'
                    },
                    {
                        title: '分类名称',
                        key: 'name',
                        align: 'center'
                    },
                    {
                        title: '类型',
                        key: 'Istype',
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
                        width: 300,
                        render: (h, params) => {
                            return h('div', [
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
                                            this.topic()
                                        }
                                    }
                                }, 'topic管理 '),
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
                                }, '筛选管理'),
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
                data1: []
            }
        },
        methods: {
            //表格
            getTableList() {
                let self = this;
                if (this.search.type == undefined) {
                    this.search.type = ""
                }
                self.$http(this.$config.BaseURL8 + '/cms/category/lists?pageSize=' + self.pageSize + '&page=' + self.page + '&name=' + self.search.name + '&type=' + self.search.type).then(response => {
                    if (response.data.errno == 10000) {
                        console.log(response)
                        self.data1 = response.data.data.list;
                        response.data.data.list.forEach(val => {
                            val.create_time = moment(val.create_time).format(
                                "YYYY-MM-DD"
                            );

                            // 1媒资分类2虚拟分类
                            if (val.type == 1) {
                                val.Istype = '媒资分类'
                            } else if (val.type == 2) {
                                val.Istype = '虚拟分类'
                            }

                        });
                        self.total = response.data.data.total;
                    }
                })
            },
            // 搜索
            query() {
                this.page = 1;
                this.getTableList();
            },
            // 跳转topic
            topic() {
                this.$router.push({ path: 'recommend' })
            },
            // 筛选管理
            filter(row) {
                this.$router.push({
                    path: 'filter', query: {
                        id: row.id,
                        name:row.name
                    }
                })
            },
            //添加弹框
            // /media/vitrualCategory/create
            modalAddBtn() {
                this.modalAdd = true;
            },
            //添加确定按钮
            addOk() {
                let self = this;
                var isValid = true;
                self.$refs['info'].validate(valid => {
                    if (valid == false) {
                        this.$Message.error('表单输入有误,请检查!')
                        isValid = false;
                    }
                })
                if (isValid == false) {
                    return
                }
                self.$http.post(this.$config.BaseURL8 + '/cms/category/modify', self.info
                ).then(response => {
                    if (response.data.errno == 10000) {
                        console.log(response)
                        self.info = {};
                        self.getTableList();
                        self.modalAdd = false;
                        self.$Message.success("添加成功");
                    }
                })
            },
            //添加取消按钮
            addCancel() {
                this.modalAdd = false;
                this.info = {};
                this.$Message.info("点击了取消!");
            },
            //修改
            modify(row) {
                this.modalEdit = true;
                this.edit = row;
                this.id = row.id;
            },
            //修改确认按钮
            editOk() {
                let self = this;
                var isValid = true;
                self.$refs['edit'].validate(valid => {
                    if (valid == false) {
                        this.$Message.error('表单输入有误,请检查!')
                        isValid = false;
                    }
                })
                if (isValid == false) {
                    return
                }
                self.$http.post(this.$config.BaseURL8 + '/cms/category/modify?id=' + self.id, self.edit).then(response => {
                    if (response.data.errno == 10000) {
                        console.log(response);
                        self.getTableList();
                        self.modalEdit = false;
                        self.$Message.success("修改成功");
                    }
                })
            },
            modalEditBtn() {
                this.getTableList();
                this.modalEdit = false;
            },
            //删除
            remove(row) {
                let self = this;
                self.$http.post(this.$config.BaseURL8 + '/cms/category/delete', {
                    id: row.id
                }).then(response => {
                    if (response.data.errno == 10000) {
                        this.$Message.success("删除成功");
                        this.getTableList();
                    }
                })
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