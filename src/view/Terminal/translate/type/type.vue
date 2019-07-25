<style>
    .layout-type-search {
        float: left;
    }

    .layout-type-add {
        float: right;
    }

    .span {
        font-size: 14px;
        margin: 15px;
        color: #495060;
        padding-bottom: 20px;
    }

    .layout-type-page {
        float: right;
        margin-top: 10px;
    }

    .ivu-table th,
    .ivu-table td {
        height: 40px;
    }

    .layout-type .ivu-poptip-confirm .ivu-poptip-body .ivu-icon {
        font-size: 16px;
        color: #ff9900;
        line-height: 18px;
        position: absolute;
        margin-left: -50px;
    }
</style>
<template>
    <div class="layout-type">
        <div class="layout-type-search">
            <Form :model="search" inline>
                <FormItem label="类型名称:" :label-width="70">
                    <Input v-model="search.typeName" style="width: 200px;" placeholder="请输入类型名称..."></Input>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click='query()'>搜索</Button>
                </FormItem>
            </Form>
        </div>
        <!-- 添加 -->
        <div class="layout-type-add">
            <Button type="success" @click="modalAdd= true">添加</Button>
            <Modal v-model="modalAdd" title="添加">
                <div slot="footer">
                    <a @click="addCancel" class="span">取消</a>
                    <Button @click="addOk" type="primary">确定</Button>
                </div>
                <Form :model="info" label-position="right" :label-width="100" ref="info" :rules="ruleValidate">
                    <FormItem label="类型名称:" prop="typeName">
                        <Input v-model="info.typeName" placeholder="请输入类型名称..."></Input>
                    </FormItem>
                    <FormItem label="描述:">
                        <Input v-model="info.desc" type="textarea" :rows="4" placeholder="请输入描述..."></Input>
                    </FormItem>
                </Form>
            </Modal>
        </div>
        <div style="clear: both;"></div>
        <!--  表格 -->
        <div class="layout-type-table">
            <Table border :columns="columns1" :data="data1"></Table>
        </div>
        <div class="layout-type-page">
            <Page :total="total" :current="page" :page-size='pageSize' @on-change="changePage" show-elevator />
        </div>
        <!-- 修改 -->
        <div class="layout-type-edit">
            <Modal v-model="modalEdit" title="修改">
                <div slot="footer">
                    <a @click="modalEdit=false" class="span">取消</a>
                    <Button @click="editOk" type="primary">确定</Button>
                </div>
                <Form :model="edit" label-position="right" :label-width="100" ref="edit" :rules="ruleValidate">
                    <FormItem label="类型ID:">
                        <Input v-model="edit._id" placeholder="请输入类型名称..." disabled></Input>
                    </FormItem>
                    <FormItem label="类型名称:" prop="typeName">
                        <Input v-model="edit.typeName" placeholder="请输入类型名称..."></Input>
                    </FormItem>
                    <FormItem label="描述:">
                        <Input v-model="edit.desc" type="textarea" :rows="4" placeholder="请输入描述..."></Input>
                    </FormItem>
                    <FormItem label="创建时间:">
                        <Input placeholder="请输入描述..." v-model="edit.createTime" disabled></Input>
                    </FormItem>
                </Form>
            </Modal>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                //搜索
                search: {
                    typeName: ''
                },
                total: 0,//分页
                page: 1,
                pageSize: 30,
                //添加
                info: {},
                modalAdd: false,
                id: '',//一整行id
                //修改
                edit: {},
                modalEdit: false,
                //验证
                ruleValidate: {
                    typeName: [
                        { required: true, message: '请输入类型名称...', trigger: 'blur' }
                    ],
                },
                columns1: [
                    {
                        title: '序号',
                        type: 'index',
                        width: 70,
                        align: 'center'
                    },
                    {
                        title: '类型名称',
                        key: 'typeName',
                        align: 'center'
                    },
                    {
                        title: '创建时间',
                        key: 'createTime',
                        align: 'center'
                    },
                    {
                        title: '描述',
                        key: 'desc',
                        align: 'center'
                    },
                    {
                        title: '操作',
                        width: 300,
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
                                        style: {
                                            marginRight: '5px'
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
            //表格数据
            getTableList() {
                let self = this;
                self.$http(this.$config.BaseURL2 + '/tv/type/list?typeName=' + self.search.typeName + '&page=' + self.page + '&pageSize=' + self.pageSize).then(response => {
                    if (response.data.errno == 10000) {
                        console.log(response)
                        self.data1 = response.data.data.list;

                        self.total = response.data.data.total;
                    }
                }, response => { })
            },
            //搜索
            query() {
                this.page = 1;
                this.getTableList();
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
                self.$http.post(this.$config.BaseURL2 + '/tv/type/edit', self.info).then(response => {
                    if (response.data.errno == 10000) {
                        this.info = {};
                        this.getTableList();
                        this.modalAdd = false;
                        self.$Message.success("添加成功");
                    }
                }, response => { })
            },
            //添加取消按钮
            addCancel() {
                this.modalAdd = false;
                this.info = {};
            },
            modify(row) {
                console.log(row)
                this.modalEdit = true;
                this.edit = row;
                this.id = row._id;
                console.log(this.id)
            },
            //修改确定按钮
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
                self.$http.post(this.$config.BaseURL2 + '/tv/type/edit?_id' + this.id, self.edit).then(response => {
                    if (response.data.errno == 10000) {
                        self.edit = {};
                        this.getTableList()
                        self.modalEdit = false;
                        this.$Message.success("修改成功!")
                    }
                }, response => { })
            },
            //删除
            remove(row) {
                let self = this;
                console.log(row)
                self.$http(this.$config.BaseURL2 + '/tv/type/del?_id=' + row._id).then(response => {
                    if (response.data.errno == 10000) {
                        this.getTableList();
                        this.$Message.success("删除成功");
                    }
                }, response => {

                })
            },
            //分页
            changePage(page) {
                this.page = page;
                this.getTableList()
            }

        },
        mounted() {
            this.getTableList()
        }
    }
</script>