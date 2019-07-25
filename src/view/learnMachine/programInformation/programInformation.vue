<style>
    .layout-learn-search {
        float: left;
    }

    .layout-learn-page {
        float: right;
        margin-top: 10px;
    }

    .ivu-table th,
    .ivu-table td {
        height: 40px;
    }

    .btnSpan {
        font-size: 14px;
        margin: 15px;
        color: #495060;
        padding-bottom: 20px;
    }

    .layout-learn-add {
        float: right;
    }
    .layout-learn .ivu-poptip-confirm .ivu-poptip-body .ivu-icon {
        font-size: 16px;
        color: #ff9900;
        line-height: 18px;
        position: absolute;
        margin-left: -50px;
    }
</style>
<template>
    <div class='layout-learn'>
        <!-- 搜索 -->
        <div class='layout-learn-search'>
            <Form :model="search" inline>
                <FormItem label="节目名称:" :label-width="70">
                    <Input v-model='search.title' placeholder="请输入节目名称..." style="width: 200px;"></Input>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="query()">查询</Button>
                </FormItem>
                <!-- <FormItem>
                    <Button type="success" @click="addBtn">添加</Button>
                </FormItem> -->
            </Form>
        </div>
        <!-- 添加 -->
        <div class='layout-learn-add'>
            <Button type="success" @click="addBtn">添加</Button>
            <Modal v-model="modalAdd" title="添加节目">
                <div slot="footer">
                    <a @click="addCancel" class="btnSpan">取消</a>
                    <Button @click="addOk" type="primary">确定</Button>
                </div>
                <Form :model='info' label-position="right" :label-width="100" ref="info" :rules="ruleValidate">
                    <FormItem label="节目名称:" prop="title">
                        <Input v-model="info.title" placeholder="请输入节目名称..."></Input>
                    </FormItem>
                    <FormItem label="节目时长:" prop="duration">
                        <Input v-model="info.duration" placeholder="请输入节目时长..."></Input>
                    </FormItem>
                    <FormItem label="播放地址:" prop="address">
                        <Input v-model="info.address" placeholder="请输入播放地址..."></Input>
                    </FormItem>
                    <FormItem label="描述:">
                        <Input v-model="info.describe" type="textarea" :rows="4" placeholder="请输入描述..."></Input>
                    </FormItem>
                </Form>
            </Modal>
        </div>
        <!-- 修改 -->
        <div class='layout-learn-edit'>
            <Modal v-model="modalEdit" title="修改节目">
                <div slot="footer">
                    <a @click="editCancel" class="btnSpan">取消</a>
                    <Button @click="editOk" type="primary">确定</Button>
                </div>
                <Form :model='edit' label-position="right" :label-width="100" ref="edit" :rules="ruleValidate">
                    <FormItem label="节目ID:">
                        <Input v-model="edit.id" placeholder="请输入节目ID..." disabled></Input>
                    </FormItem>
                    <FormItem label="节目名称:" prop="title">
                        <Input v-model="edit.title" placeholder="请输入节目名称..."></Input>
                    </FormItem>
                    <FormItem label="节目时长:" prop='duration'>
                        <Input v-model="edit.duration" placeholder="请输入节目时长..."></Input>
                    </FormItem>
                    <FormItem label="播放地址:" prop='address'>
                        <Input v-model="edit.address" placeholder="请输入播放地址..."></Input>
                    </FormItem>
                    <FormItem label="描述:">
                        <Input v-model="edit.describe" type="textarea" :rows="4" placeholder="请输入描述..."></Input>
                    </FormItem>
                </Form>
            </Modal>
        </div>
        <div style="clear: both;"></div>
        <!-- 表格 -->
        <div class="layout-learn-table">
            <Table border :columns="columns1" :data="data1"></Table>
        </div>
        <!-- 分页 -->
        <div class="layout-learn-page">
            <Page :total="total" :current="page" :page-size="pageSize" @on-change="changePage" show-elevator />
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                search: {
                    title: ''
                },
                //分页
                pageSize: 30,
                page: 1,
                total: 0,
                info: {},//添加
                modalAdd: false,//添加弹框
                edit: {},//修改
                modalEdit: false,//修改弹框
                id:'',//整行id
                columns1: [
                    {
                        title: '节目ID',
                        key: 'id',
                        align: 'center'
                    }, {
                        title: '节目名称',
                        key: 'title',
                        align: 'center'
                    }, {
                        title: '节目时长',
                        key: 'duration',
                        align: 'center'
                    }, {
                        title: '播放地址',
                        key: 'address',
                        align: 'center',
                        width:300
                    }, {
                        title: '描述',
                        key: 'describe',
                        align: 'center',
                        ellipsis:'true'
                    }, {
                        title: '操作',
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
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
                            ])
                        }
                    }
                ],
                data1: [],
                ruleValidate: {
                    title: [
                        { required: true, pattern: /.+/, message: '请输入节目名称...', trigger: 'blur' }
                    ],
                    duration: [
                        { required: true,  message: '请输入节目时长...', trigger: 'blur' }
                    ],
                    address: [
                        { required: true, pattern: /.+/, message: '请输入播放地址...', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            //数据列表
            getTableList() {
                // /program/list
                let self = this;
                self.$http(this.$config.BaseURL16 + '/program/list?title=' + self.search.title + '&page=' + self.page + '&pageSize=' + self.pageSize).then(response => {
                    if (response.data.errno == 10000) {
                        // console.log(response,'列表')
                        this.data1 = response.data.data.list;
                        this.total = response.data.data.total;
                    }
                })
            },
            // 分页
            changePage(page) {
                this.page = page;
                this.getTableList()
            },
            //查询
            query() {
                this.page = 1;
                this.getTableList()
            },
            //添加弹框
            addBtn() {
                this.modalAdd = true;
            },
            //添加取消
            addCancel() {
                this.modalAdd = false;
                this.info = {};
            },
            // 添加确定
            addOk() {
                // /program/edit
                let self = this;
                //表单验证
                this.$refs['info'].validate((valid) => {
                    if (valid) {
                        return
                    } else {
                        this.$Message.error('表单输入有误,请检查！');
                    }
                })
                self.$http.post(this.$config.BaseURL16 + '/program/edit', self.info).then(response => {
                    console.log(response, '添加')
                    if (response.data.errno == 10000) {
                        this.info = {};
                        this.modalAdd = false;
                        this.getTableList();
                        this.$Message.success("添加成功!")
                    }
                })
            },
            // 修改弹框
            modify(row) {
                // console.log(row, '修改')
                this.modalEdit = true;
                this.edit = row;
                this.id = row.id;
                // console.log(this.id,'整行id')

            },
            //修改取消
            editCancel() {
                this.modalEdit = false;
                this.getTableList();
            },
            // 修改确定
            editOk() {
                // /program/edit
                let self = this;
                //表单验证
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
                self.$http.post(this.$config.BaseURL16 + '/program/edit?id=' + self.id, self.edit).then(response => {
                    if (response.data.errno == 10000) {
                        this.modalEdit = false;
                        this.getTableList();
                        this.$Message.success('修改成功！');
                    }
                })
            },
            // 删除
            remove(row) {
                // /program/del
                this.$http.get(this.$config.BaseURL16 + '/program/del?id=' + row.id).then(response => {
                    if (response.data.errno == 10000) {
                        this.getTableList();
                        this.$Message.success("删除成功！");
                    }
                })
            }
        },
        mounted() {
            this.getTableList()
        }
    }
</script>