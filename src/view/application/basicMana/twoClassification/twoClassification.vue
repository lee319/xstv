<style>
    .layout-twoClass-page {
        float: right;
        margin-top: 10px;
    }

    .layout-twoClass-search {
        float: left;
    }

    .layout-twoClass-add {
        float: right;
    }

    .span {
        font-size: 14px;
        margin: 15px;
        color: #495060;
        padding-bottom: 20px;
    }

    .layout-twoClass .ivu-poptip-confirm .ivu-poptip-body .ivu-icon {
        font-size: 16px;
        color: #ff9900;
        line-height: 18px;
        position: absolute;
        margin-left: -50px;
    }
</style>
<template>
    <div class="layout-twoClass">
        <div class="layout-twoClass-search">
            <Form :model="search" inline>
                <FormItem label="二级分类:" :label-width="70">
                    <Input v-model="search.name" style="width:200px;" placeholder="请输入二级分类..."></Input>
                </FormItem>
                <FormItem label="一级分类:" :label-width="70">
                    <Select v-model="search.one_id" style="width:200px" placeholder="请输入一级分类...">
                        <Option value="">全部</Option>
                        <Option v-for="item in cityList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                    </Select>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="query">搜索</Button>
                </FormItem>
            </Form>
        </div>
        <!-- 添加 -->
        <div class="layout-twoClass-add">
            <Button type="success" @click="modalAdd = true">添加</Button>
            <Modal v-model="modalAdd" title="添加二级分类">
                <div slot="footer">
                    <a @click="addCancel" class="span">取消</a>
                    <Button @click="addOk" type="primary">确定</Button>
                </div>
                <Form :model="info" label-position="right" :label-width="100" ref="info" :rules="ruleValidate">
                    <FormItem label="二级分类名称:" prop="name">
                        <Input v-model="info.name" placeholder="请输入二级分类名称..."></Input>
                    </FormItem>
                    <FormItem label="一级分类名称:" prop="parent_id">
                        <Select v-model="info.parent_id" placeholder="请选择一级分类名称...">
                            <Option v-for="item in infoName" :value="item.id" :key="item.id">{{ item.name }}
                            </Option>
                        </Select>
                    </FormItem>
                    <FormItem label="排序ID:">
                        <Input v-model="info.sortnumber" placeholder="请输入排序ID..."></Input>
                    </FormItem>
                    <FormItem label="二级分类描述:">
                        <Input v-model="info.describe" type="textarea" :rows="4" placeholder="请输入二级分类描述..."></Input>
                    </FormItem>
                </Form>
            </Modal>
        </div>
        <div style="clear:both;"></div>
        <div class="layout-twoClass-table">
            <Table border :columns="columns1" :data="data1"></Table>
        </div>
        <div class="layout-twoClass-page">
            <Page :total="total" :current="page" :page-size='pageSize' @on-change="changePage" show-elevator />
        </div>
        <!-- 修改 -->
        <Modal v-model="modalEdit" title="修改二级分类">
            <div slot="footer">
                <a @click="editCancel" class="span">取消</a>
                <Button @click="editOk" type="primary">确定</Button>
            </div>
            <Form :model="edit" label-position="right" :label-width="100" ref="edit" :rules="ruleValidate">
                <FormItem label="二级分类ID:">
                    <Input v-model="edit.id" placeholder="请输入二级分类ID..." disabled></Input>
                </FormItem>
                <FormItem label="二级分类名称:" prop="">
                    <Input v-model="edit.name" placeholder="请输入二级分类名称..."></Input>
                </FormItem>
                <FormItem label="一级分类名称:">
                    <Input v-model="edit.one_name" placeholder="请输入一级分类名称..." disabled></Input>
                </FormItem>
                <FormItem label="排序ID:">
                    <Input v-model="edit.sortnumber" placeholder="请输入排序ID..."></Input>
                </FormItem>
                <FormItem label="二级分类描述:">
                    <Input v-model="edit.describe" type="textarea" :rows="4" placeholder="请输入二级分类描述..."></Input>
                </FormItem>
                <FormItem label="创建时间:">
                    <Input v-model="edit.is_create_time" placeholder="请输入创建时间..." disabled></Input>
                </FormItem>
            </Form>
        </Modal>
    </div>
</template>
<script>
    var moment = require("moment");
    export default {
        data() {
            return {
                search: {
                    name: '',
                    one_id: '',
                },//搜索
                cityList: [],
                page: 1,
                pageSize: 30,
                total: 0,//分页
                info: {},
                infoName: [],
                modalAdd: false,//添加
                edit: {},
                id: '',
                modalEdit: false,//修改
                columns1: [
                    {
                        title: '二级分类ID',
                        key: 'id',
                        align: 'center'
                    },
                    {
                        title: '二级分类',
                        key: 'name',
                        align: 'center'
                    },
                    {
                        title: '一级分类',
                        key: 'one_name',
                        align: 'center'
                    },
                    {
                        title: '排序ID',
                        key: 'sortnumber',
                        align: 'center'
                    },
                    {
                        title: '创建时间',
                        key: 'is_create_time',
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
                data1: [
                    {
                        name: 'John Brown',
                        age: 18,
                        address: 'New York No. 1 Lake Park',
                        date: '2016-10-03'
                    }
                ],
                ruleValidate: {
                    name: [
                        { required: true, message: '请输入二级分类名称...', trigger: 'blur' }
                    ],
                    parent_id: [
                        { required: true, message: '请输入一级分类名称...', trigger: 'blur', type: 'number' }
                    ]
                }
            }
        },
        methods: {
            // 表格数据
            getTableList() {
                if (this.search.one_id == undefined) {
                    this.search.one_id = ''
                }
                this.$http.get(this.$config.BaseURL11 + '/appstore/admin/v1/categorytwo/list?name=' + this.search.name + '&one_id=' + this.search.one_id + '&page=' + this.page + '&pageSize=' + this.pageSize).then(response => {
                    if (response.data.errno == 10000) {
                        this.data1 = response.data.data.list;

                        response.data.data.list.forEach(val => {
                            val.is_create_time = moment(val.create_time * 1000).format(
                                "YYYY-MM-DD hh:mm:ss"
                            )
                        });
                        this.total = response.data.data.total;
                    }
                })
            },
            //搜索
            query() {
                this.page = 1;
                this.getTableList();
            },
            // 分页
            changePage(page) {
                this.page = page;
                this.getTableList();
            },
            // 一级分类下拉
            getSelectList() {
                this.$http.get(this.$config.BaseURL11 + '/appstore/admin/v1/category/list').then(response => {
                    if (response.data.errno == 10000) {
                        this.cityList = response.data.data.list;
                        this.infoName = response.data.data.list;
                    }
                })
            },
            //添加确定按钮
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
                this.info.sortnumber *= 1;
                this.$http.post(this.$config.BaseURL11 + '/appstore/admin/v1/categorytwo/edit', this.info).then(response => {
                    if (response.data.errno == 10000) {
                        this.info = {};
                        this.modalAdd = false;
                        this.getTableList();
                        this.$Message.success("添加成功！");
                    }
                })
            },
            //添加修改按钮
            addCancel() {
                this.info = {};
                this.modalAdd = false;
            },
            //修改弹框
            modify(row) {
                this.edit = row;
                this.modalEdit = true;
                this.id = row.id;
                row.is_create_time = moment(row.create_time * 1000).format(
                    "YYYY-MM-DD HH:mm:ss"
                )
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
                this.edit.sortnumber *= 1;
                this.$http.post(this.$config.BaseURL11 + '/appstore/admin/v1/categorytwo/edit?id=' + this.id, this.edit).then(response => {
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
                this.$http.get(this.$config.BaseURL11 + '/appstore/admin/v1/categorytwo/del?id=' + row.id).then(response => {
                    if (response.data.errno == 10000) {
                        this.getTableList();
                        this.$Message.success("删除成功！");
                    }
                })
            },
        },
        mounted() {
            this.getTableList();
            this.getSelectList();
        }
    }
</script>