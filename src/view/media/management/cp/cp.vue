<style>
    .layout-cp-search {
        float: left;
    }

    .layout-cp-add {
        float: right;
    }

    .span {
        font-size: 14px;
        margin: 15px;
        color: #495060;
        padding-bottom: 20px;
    }

    .layout-cp .ivu-poptip-confirm .ivu-poptip-body .ivu-icon {
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
    .layout-cp-page{
        float: right;
        margin-top: 10px;
    }
</style>
<template>
    <div class="layout-cp">
        <!-- 搜索 -->
        <div class="layout-cp-search">
            <Form :model="search" inline>
                <FormItem label="CP名称" :label-width="60">
                    <Input v-model="search.name" style="width: 200px;" placeholder="请输入CP名称..."></Input>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="query()">搜索</Button>
                </FormItem>
            </Form>
        </div>
        <!-- 添加 -->
        <div class="layout-cp-add">
            <Button type="success" @click="modalAdd = true">添加</Button>
            <Modal v-model="modalAdd" title="添加">
                <div slot="footer">
                    <a @click="addCancel" class="span">取消</a>
                    <Button @click="addOk" type="primary">确定</Button>
                </div>
                <Form :model="info" label-position="right" :label-width="100" ref="info" :rules="ruleValidate">
                    <FormItem label="CP名称:" prop="name">
                        <Input v-model="info.name" placeholder="请输入CP名称..."></Input>
                    </FormItem>
                    <!-- <FormItem label="状态:">
                        <Select v-model="info.status" style="width:390px" placeholder="选择状态...">
                            <Option :value="1">上线</Option>
                            <Option :value="2">删除</Option>
                            <Option :value="3">下线</Option>
                        </Select>
                    </FormItem> -->
                    <FormItem label="描述:">
                        <Input v-model="info.desc" type="textarea" :rows="4" placeholder="请输入描述..."></Input>
                    </FormItem>
                </Form>
            </Modal>
        </div>
        <div style="clear: both;"></div>
        <div class="layout-cp-table">
            <Table border :columns="columns1" :data="data1"></Table>
        </div>
        <!-- 分页 -->
        <div class="layout-cp-page">
            <Page :total="total" :current="page" :page-size='pageSize' @on-change="changePage" show-elevator />
        </div>
        <!-- 修改 -->
        <div class="layout-cp-edit">
            <Modal v-model="modalEdit" title="修改">
                <div slot="footer">
                    <a @click="modalEdit=false" class="span">取消</a>
                    <Button @click="editOk" type="primary">确定</Button>
                </div>
                <Form :model="edit" label-position="right" :label-width="100" ref="edit" :rules="ruleValidate">
                    <FormItem label="CPID:">
                        <Input v-model="edit.id" disabled></Input>
                    </FormItem>
                    <FormItem label="CP名称:" prop="name">
                        <Input v-model="edit.name" placeholder="请输入CP名称..."></Input>
                    </FormItem>
                    <FormItem label="状态:">
                        <Select v-model="edit.status" placeholder="选择状态...">
                            <!-- 1上线，2删除，3下线 -->
                            <Option :value="1">上线</Option>
                            <Option :value="2">删除</Option>
                            <Option :value="3">下线</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="描述:">
                        <Input v-model="edit.desc" type="textarea" :rows="4" placeholder="请输入描述..."></Input>
                    </FormItem>
                    <FormItem label="创建时间:">
                        <Input v-model="edit.Iscreate_time" disabled></Input>
                    </FormItem>
                </Form>
            </Modal>
        </div>
    </div>
</template>
<script>
    var moment = require("moment");
    export default {
        data() {
            return {
                search: {
                    name: ''
                },
                info: {},
                modalAdd: false,//添加
                edit: {},
                modalEdit: false,//修改
                page: 1,
                total: 0,
                pageSize: 30,//分页
                id: '',
                ruleValidate: {
                    name: [
                        { type: 'string', required: true, message: '请输入CP名称...', trigger: 'blur' }
                    ]
                },
                columns1: [
                    {
                        title: 'CPID',
                        key: 'id',
                        align: 'center'
                    },
                    {
                        title: 'CP名称',
                        key: 'name',
                        align: 'center'
                    },
                    {
                        title: '状态',
                        key: 'ISstatus',
                        align: 'center'
                    },
                    {
                        title: '创建时间',
                        key: 'Iscreate_time',
                        align: 'center'
                    },
                    {
                        title: '描述',
                        key: 'desc',
                        align: 'center'
                    },
                    {
                        title: '操作',
                        width: 160,
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
                data1: []
            }
        },
        methods: {
            //表格
            getTableList() {
                let self = this;
                self.$http(this.$config.BaseURL1 + '/media/v2/cp/list?name=' + self.search.name + '&page=' + this.page + '&pageSize=' + self.pageSize).then(response => {
                    if (response.data.errno == 10000) {
                        self.data1 = response.data.data.list;
                        response.data.data.list.forEach(val => {
                            if (val.status == 1) {
                                val.ISstatus = '上线'
                            } else if (val.status == 2) {
                                val.ISstatus = '删除'
                            } else if (val.status == 3) {
                                val.ISstatus = '下线'
                            }

                            //时间转换
                            val.Iscreate_time = moment(val.create_time * 1000).format(
                                "YYYY-MM-DD HH:mm:ss"
                            )
                        });

                         //分页
                         self.total = response.data.data.total;
                    }
                }, response => { })
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
                self.$http.post(this.$config.BaseURL1 + '/media/v2/cp/modify', self.info).then(response => {
                    if (response.data.errno == 10000) {
                        this.info = {};
                        this.modalAdd = false;
                        this.getTableList();
                        this.$Message.success('添加成功！')
                    }
                }, response => { })
            },
            //添加取消按钮
            addCancel() {
                this.info = {};
                this.modalAdd = false;
            },
            //修改
            modify(row) {
                this.edit = row;
                this.id = row.id;
                this.modalEdit = true;
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
                self.$http.post(this.$config.BaseURL1 + '/media/v2/cp/modify?id=' + self.id, self.edit).then(response => {
                    if (response.data.errno == 10000) {
                        this.modalEdit = false;
                        this.getTableList();
                        this.$Message.success('修改成功！')
                    }
                }, response => { })
            },
            //删除
            remove(row) {
                let self = this;
                if (row.status == 1) {
                    this.$Message.warning('节目是上线的不能删除！');
                    return;
                }
                self.$http.post(this.$config.BaseURL1 + '/media/v2/cp/delete', {
                    id: row.id
                }).then(response => {
                    if (response.data.errno == 10000) {
                        this.getTableList();
                        this.$Message.success('删除成功!')
                    }
                }, response => { })
            },
            //搜索
            query() {
                this.page = 1;
                this.getTableList()
            },
            //分页
            changePage(page) {
                this.page = page;
                this.getTableList();
            },
        },
        mounted() {
            this.getTableList()
        }
    }
</script>