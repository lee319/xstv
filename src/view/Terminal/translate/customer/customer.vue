<style>
    .layout-customer-search {
        float: left;
    }

    .layout-customer-add {
        float: right;
    }

    .span {
        font-size: 14px;
        margin: 15px;
        color: #495060;
        padding-bottom: 20px;
    }

    .layout-customer-page {
        float: right;
        margin-top: 10px;
    }

    .ivu-table th,
    .ivu-table td {
        height: 40px;
    }

    .layout-customer .ivu-poptip-confirm .ivu-poptip-body .ivu-icon {
        font-size: 16px;
        color: #ff9900;
        line-height: 18px;
        position: absolute;
        margin-left: -50px;
    }
</style>
<template>
    <div class="layout-customer">
        <div class="layout-customer-search">
            <Form :model="search" label-position="right" inline>
                <FormItem label="厂商名称:" :label-width="70">
                    <Input v-model="search.customerName" style="width: 200px;" placeholder="请输入厂商名称..."></Input>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click='query()'>搜索</Button>
                </FormItem>
            </Form>
        </div>
        <!-- 添加 -->
        <div class="layout-customer-add">
            <Button type="success" @click="modalAdd = true">添加</Button>
            <Modal v-model="modalAdd" title="添加">
                <div slot="footer">
                    <a @click="addCancel" class="span">取消</a>
                    <Button @click="addOk" type="primary">确定</Button>
                </div>
                <Form :model="info" label-position="right" :label-width="100" :rules="ruleValidate" ref="info">
                    <FormItem label="厂商名称:" prop="customerName">
                        <Input v-model="info.customerName" placeholder="请输入厂商名称..."></Input>
                    </FormItem>
                    <FormItem label="厂商类别:" prop="customerType">
                        <Select v-model="info.customerType" placeholder="请选择厂商类别...">
                            <Option :value="1">自有厂商</Option>
                            <Option :value="2">合作厂商</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="描述:">
                        <Input v-model="info.desc" type="textarea" :rows="4" placeholder="请输入描述..."></Input>
                    </FormItem>
                </Form>
            </Modal>
        </div>
        <div style="clear: both;"></div>
        <!-- 表格 -->
        <div class="layout-customer-table">
            <Table border :columns="columns1" :data="data1"></Table>
        </div>
        <div class="layout-customer-page">
            <Page :total="total" :current="page" :page-size='pageSize' @on-change="changePage" show-elevator />
        </div>
        <!-- 修改 -->
        <div class="layout-customer-edit">
            <Modal v-model="modalEdit" title="修改">
                <div slot="footer">
                    <a @click="modalEdit=false" class="span">取消</a>
                    <Button @click="editOk" type="primary">确定</Button>
                </div>
                <Form :model="edit" label-position="right" :label-width="100" :rules="ruleValidate1" ref="edit">
                    <FormItem label="厂商ID:">
                        <Input v-model="edit._id" placeholder="请输入厂商名称..." disabled></Input>
                    </FormItem>
                    <FormItem label="厂商名称:" prop="customerName">
                        <Input v-model="edit.customerName" placeholder="请输入厂商名称..."></Input>
                    </FormItem>
                    <FormItem label="厂商类别:" prop="customerType">
                        <Select v-model="edit.customerType" placeholder="请选择厂商类别...">
                            <!-- <Option value="">全部</Option> -->
                            <Option :value="1">自有厂商</Option>
                            <Option :value="2">合作厂商</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="描述:">
                        <Input v-model="edit.desc" type="textarea" :rows="4" placeholder="请输入描述..."></Input>
                    </FormItem>
                    <FormItem label="创建时间:">
                        <Input v-model="edit.createTime" disabled></Input>
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
                search: {
                    customerName: ''
                },//搜索
                info: {},
                modalAdd: false,//添加
                edit: {},
                modalEdit: false, //修改
                id: '',//一整行id

                total: 0,//分页
                page: 1,
                pageSize: 30,

                columns1: [
                    {
                        title: '序号',
                        type: 'index',
                        width: 70,
                        align: 'center'
                    },
                    {
                        title: '厂商名称',
                        key: 'customerName',
                        align: 'center'
                    },
                    {
                        title: '厂商类别',
                        key: 'IscustomerType',
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
                data1: [],
                //验证
                ruleValidate: {
                    customerName: [
                        { required: true, message: '请输入厂商名称...', trigger: 'blur' }
                    ],
                    customerType: [
                        { required: true, message: '请选择厂商类别...', trigger: 'change', type: 'number' }
                    ],

                },
                //验证
                ruleValidate1: {
                    customerName: [
                        { required: true, message: '请输入厂商名称...', trigger: 'blur' }
                    ],
                    customerType: [
                        { required: true, message: '请选择厂商类别...', trigger: 'blur', type: 'number' }
                    ],

                }
            }
        },
        methods: {
            //表格数据
            getTableList() {
                let self = this;
                self.$http(this.$config.BaseURL2 + '/tv/customer/list?customerName=' + self.search.customerName + '&page=' + self.page + '&pageSize=' + self.pageSize).then(response => {
                    if (response.data.errno == 10000) {
                        self.data1 = response.data.data.list;

                        self.total = response.data.data.total

                        response.data.data.list.forEach(val => {
                            if (val.customerType == 1) {
                                val.IscustomerType = "自有厂商"
                            } else if (val.customerType == 2) {
                                val.IscustomerType = "合作厂商"
                            }
                        });
                    }
                }, response => {

                })
            },
            //搜索
            query() {
                this.page = 1;
                this.getTableList()
            },
            //添加确定
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
                self.$http.post(this.$config.BaseURL2 + '/tv/customer/edit', self.info).then(response => {
                    if (response.data.errno == 10000) {
                        this.info = {};
                        this.getTableList();
                        this.modalAdd = false;
                        this.$Message.success('添加成功!')
                    }
                }, response => { })
            },
            //添加取消
            addCancel() {
                this.info = {};
                this.modalAdd = false;
            },
            //修改
            modify(row) {
                console.log(row)
                this.modalEdit = true;
                this.edit = row;
                this.id = row._id
            },
            //修改
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
                self.$http.post(this.$config.BaseURL2 + '/tv/customer/edit', self.edit).then(response => {
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
                self.$http(this.$config.BaseURL2 + '/tv/customer/del?_id=' + row._id).then(response => {
                    if (response.data.errno == 10000) {
                        this.getTableList();
                        this.$Message.success("删除成功");
                    }
                }, response => { })
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