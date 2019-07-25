<style>
    .layout-labelMana-search {
        float: left;
    }

    .layout-labelMana-add {
        float: right;
    }

    .layout-labelMana-page {
        float: right;
        margin-top: 10px;
    }

    .span {
        font-size: 14px;
        margin: 15px;
        color: #495060;
        padding-bottom: 20px;
    }

    .layout-labelMana .ivu-poptip-confirm .ivu-poptip-body .ivu-icon {
        font-size: 16px;
        color: #ff9900;
        line-height: 18px;
        position: absolute;
        margin-left: -50px;
    }
</style>
<template>
    <div class="layout-labelMana">
        <div class="layout-labelMana-search">
            <Form :model="search" inline>
                <FormItem label="标签名称:" :label-width="70">
                    <Input v-model="search.name" style="width:200px;" placeholder="请输入标签名称..."></Input>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="query">搜索</Button>
                </FormItem>
            </Form>
        </div>
        <!-- 添加 -->
        <div class="layout-labelMana-add">
            <Button type="success" @click="modalAdd = true">添加</Button>
            <Modal v-model="modalAdd" title="添加标签">
                <div slot="footer">
                    <a @click="addCancel" class="span">取消</a>
                    <Button @click="addOk" type="primary">确定</Button>
                </div>
                <Form :model="info" label-position="right" :label-width="100" ref="info" :rules="ruleValidate">
                    <FormItem label="标签名称:" prop="name">
                        <Input v-model="info.name" placeholder="请输入标签名称..."></Input>
                    </FormItem>
                    <FormItem label="标签描述:">
                        <Input v-model="info.describe" type="textarea" :rows="4" placeholder="请输入标签描述..."></Input>
                    </FormItem>
                </Form>
            </Modal>
        </div>
        <div style="clear:both;"></div>
        <!-- 表格 -->
        <div class="layout-labelMana-table">
            <Table border :columns="columns1" :data="data1"></Table>
        </div>
        <div class="layout-labelMana-page">
            <Page :total="total" :current="page" :page-size='pageSize' @on-change="changePage" show-elevator />
        </div>
        <!-- 修改 -->
        <Modal v-model="modalEdit" title="修改标签">
            <div slot="footer">
                <a @click="editCancel" class="span">取消</a>
                <Button @click="editOk" type="primary">确定</Button>
            </div>
            <Form :model="edit" label-position="right" :label-width="100" ref="edit" :rules="ruleValidate">
                <FormItem label="标签ID:">
                    <Input v-model="edit.id" placeholder="请输入标签名称..." disabled></Input>
                </FormItem>
                <FormItem label="标签名称:" prop="name">
                    <Input v-model="edit.name" placeholder="请输入标签名称..."></Input>
                </FormItem>
                <FormItem label="标签描述:">
                    <Input v-model="edit.describe" type="textarea" :rows="4" placeholder="请输入标签描述..."></Input>
                </FormItem>
                <FormItem label="创建时间:">
                    <Input v-model="edit.create_time" placeholder="请输入标签名称..." disabled></Input>
                </FormItem>
            </Form>
        </Modal>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                search: {
                    name: '',
                },//搜索
                page: 1,
                total: 0,
                pageSize: 30,//分页
                info: {},
                modalAdd: false,//添加
                edit: {},
                id: '',
                modalEdit: false,//修改
                columns1: [
                    {
                        title: '标签ID',
                        key: 'id',
                        align: 'center'
                    },
                    {
                        title: '标签名称',
                        key: 'name',
                        align: 'center'
                    },
                    {
                        title: '创建时间',
                        key: 'create_time',
                        align: 'center'
                    },
                    {
                        title: '操作',
                        align: 'center',
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
                ruleValidate: {
                    name: [
                        { required: true, message: '请输入分类名称...', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            // 表格数据
            getTableList() {
                this.$http.get(this.$config.BaseURL11 + '/appstore/admin/v1/label/list?name=' + this.search.name + '&page=' + this.page + '&pagesize=' + this.pageSize).then(response => {
                    console.log(response)
                    if (response.data.errno == 10000) {
                        this.data1 = response.data.data.list;
                        this.total = response.data.data.total;
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
            // 添加确定按钮
            addOk() {
                var isValid = true;
                this.$refs['info'].validate(valid => {
                    if (valid == false) {
                        this.$Message.error('表单输入有误,请检查!')
                        isValid = false;
                    }
                })
                if (isValid == false) {
                    return
                }
                this.$http.post(this.$config.BaseURL11 + '/appstore/admin/v1/lable/edit', this.info).then(response => {
                    if (response.data.errno == 10000) {
                        this.info = {};
                        this.modalAdd = false;
                        this.getTableList();
                        this.$Message.success('添加成功！');
                    }
                })
            },
            //添加取消按钮
            addCancel() {
                this.info = {};
                this.modalAdd = false;
                this.getTableList();
            },
            //修改弹框
            modify(row) {
                this.edit = row;
                this.modalEdit = true;
                this.id = row.id;
            },
            //修改确定按钮
            editOk() {
                var isValid = true;
                this.$refs['edit'].validate(valid => {
                    if (valid == false) {
                        this.$Message.error('表单输入有误,请检查!')
                        isValid = false;
                    }
                })
                if (isValid == false) {
                    return
                }
                this.$http.post(this.$config.BaseURL11 + '/appstore/admin/v1/lable/edit?id=' + this.id, this.edit).then(response => {
                    if (response.data.errno == 10000) {
                        this.modalEdit = false;
                        this.getTableList();
                        this.$Message.success('修改成功！');
                    }
                })
            },
            //修改取消按钮
            editCancel() {
                this.modalEdit = false;
                this.getTableList();
            },
            //删除
            remove(row) {
                this.$http.post(this.$config.BaseURL11 + '/appstore/admin/v1/label/del', {
                    id: row.id
                }).then(response => {
                    if (response.data.errno == 10000) {
                        this.getTableList();
                        this.$Message.success("删除成功！");
                    }
                })
            }
        },
        mounted() {
            this.getTableList();
        }
    }
</script>