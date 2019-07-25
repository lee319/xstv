<style>
    .layout-tag-page {
        float: right;
        margin-top: 10px;
    }

    .layout-tag-search {
        float: left;
    }

    .layout-tag-add {
        float: right;
    }

    .span {
        font-size: 14px;
        margin: 15px;
        color: #495060;
        padding-bottom: 20px;
    }

    .layout-tag .ivu-poptip-confirm .ivu-poptip-body .ivu-icon {
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
    <div class="layout-tag">
        <!-- 搜索 -->
        <div class="layout-tag-search">
            <Form :model="search" label-position="right" inline>
                <FormItem label="标签名称:" :label-width="70">
                    <Input v-model="search.name" style="width: 200px;" placeholder="请输入标签名称..."></Input>
                </FormItem>
                <FormItem label="分类名称:" :label-width="70">
                    <Select v-model="search.category_id" style="width:200px">
                        <Option v-for="item in cityList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                    </Select>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="query">搜索</Button>
                </FormItem>
            </Form>
        </div>
        <!-- 添加 -->
        <div class="layout-tag-add">
            <Button type="success" @click="modalAdd = true">添加</Button>
            <Modal v-model="modalAdd" title="添加">
                <div slot="footer">
                    <a @click="addCancel" class="span">取消</a>
                    <Button @click="addOk" type="primary">确定</Button>
                </div>
                <Form :model="info" label-position="right" :label-width="100" ref="info" :rules="ruleValidate">
                    <FormItem label="标签名称:" prop="name">
                        <Input v-model="info.name" placeholder="请输入标签名称..."></Input>
                    </FormItem>
                    <FormItem label="标签别名:">
                        <Input v-model="info.alias" placeholder="请输入标签别名..."></Input>
                    </FormItem>
                    <FormItem label="分类名称:">
                        <Select v-model="info.categoryId">
                            <Option v-for="item in cityList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="描述:">
                        <Input v-model="info.desc" type="textarea" :autosize="{minRows: 6,maxRows: 5}" placeholder="请输入描述..."></Input>
                    </FormItem>
                </Form>
            </Modal>
        </div>
        <div style="clear: both;"></div>
        <!-- 表格 -->
        <div class="layout-tag-table">
            <Table border :columns="columns1" :data="data1"></Table>
        </div>
        <div class="layout-tag-page">
            <Page :total="total" :current="page" :page-size='pageSize' @on-change="changePage" show-elevator />
        </div>
        <!-- 修改 -->
        <div class="layout-tag-edit">
            <Modal v-model="modalEdit" title="修改">
                <div slot="footer">
                    <a @click="modalEdit=false" class="span">取消</a>
                    <Button @click="editOk" type="primary">确定</Button>
                </div>
                <Form :model="edit" label-position="right" :label-width="100" ref="edit" :rules="ruleValidate">
                    <FormItem label="ID:" prop="name">
                        <Input v-model="edit.id" disabled></Input>
                    </FormItem>
                    <FormItem label="标签名称:" prop="name">
                        <Input v-model="edit.name" placeholder="请输入标签名称..."></Input>
                    </FormItem>
                    <FormItem label="分类名称:">
                        <Input v-model="edit.category_name" disabled></Input>
                    </FormItem>
                    <FormItem label="标签别名:">
                        <Input v-model="edit.alias" placeholder="请输入标签别名..."></Input>
                    </FormItem>
                    <FormItem label="状态:">
                        <Select v-model="edit.status">
                            <Option :value="1">上线</Option>
                            <Option :value="2">删除</Option>
                            <Option :value="3">下线</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="描述:">
                        <Input v-model="edit.desc" type="textarea" :autosize="{minRows: 6,maxRows: 5}" placeholder="请输入描述..."></Input>
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
                    name: '',
                    category_id: '',
                },//搜索
                cityList: [],
                info: {},
                modalAdd: false,//添加
                page: 1,
                total: 0,
                pageSize: 30,//分页
                edit: {},
                modalEdit: false,//修改
                id: '',//一整行id
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
                        title: '标签别名',
                        key: 'alias',
                        align: 'center'
                    },
                    {
                        title: '分类',
                        key: 'category_name',
                        align: 'center'
                    },
                    {
                        title: '状态',
                        key: 'Isstatus',
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
                data1: [],
                ruleValidate: {
                    name: [
                        { required: true, message: '请输入标签名称...', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            //表格数据
            getTableList() {
                let self = this;
                self.$http(this.$config.BaseURL1 + '/media/v2/tag/list?name=' + self.search.name + '&category_id=' + self.search.category_id + '&page=' + self.page + '&pageSize=' + self.pageSize).then(response => {
                    if (response.data.errno == 10000) {
                        self.data1 = response.data.data.list;

                        response.data.data.list.forEach(val => {
                            if (val.status == 1) {
                                val.Isstatus = '上线'
                            } else if (val.status == 2) {
                                val.Isstatus = '删除'
                            } else if (val.status == 3) {
                                val.Isstatus = '下线'
                            }

                            //时间转换
                            val.Iscreate_time = moment(val.create_time * 1000).format(
                                "YYYY-MM-DD HH:mm:ss"
                            )

                            self.total  = response.data.data.total;
                        });

                    }
                }, response => { })
            },
            getSelectList() {
                let self = this;
                self.$http(this.$config.BaseURL1 + '/media/v2/category/list').then(response => {
                    if (response.data.errno == 10000) {
                        self.cityList = response.data.data.list;
                    } else { }
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
                self.$http.post(this.$config.BaseURL1 + '/media/v2/tag/modify', self.info).then(response => {
                    if (response.data.errno == 10000) {
                        self.modalAdd = false;
                        self.getTableList();
                        self.$Message.success('添加成功！')
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
                console.log(row)
                this.edit = row;
                this.modalEdit = true;
                this.id = row.id;
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
                self.$http.post(this.$config.BaseURL1 + '/media/v2/tag/modify?id=' + self.id, self.edit).then(response => {
                    if (response.data.errno == 10000) {
                        this.edit = {};
                        this.modalEdit = false;
                        this.getTableList();
                        this.$Message.success('修改成功！')
                    }
                }, response => { })
            },
            remove(row) {
                let self = this;
                if (row.status == 1) {
                    this.$Message.warning('节目是上线的不能删除！');
                    return;
                }
                self.$http.post(this.$config.BaseURL1 + '/media/v2/tag/delete', {
                    id: row.id
                }).then(response => {
                    if (response.data.errno == 10000) {
                        this.getTableList();
                        this.$Message.success('删除成功')
                    }
                }, response => { })
            },
            //搜索
            query() {
                this.page=1;
                this.getTableList();
            },
            //分页
            changePage(page) {
                this.page = page;
                this.getTableList();
            },

        },
        mounted() {
            this.getTableList();
            this.getSelectList();
        }
    }
</script>