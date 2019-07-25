<style>
    .layout-insidemodel-search {
        float: left;
    }

    .layout-insidemodel-add {
        float: right;
    }

    .layout-insidemodel-page {
        float: right;
        margin-top: 10px;
    }

    .span {
        font-size: 14px;
        margin: 15px;
        color: #495060;
        padding-bottom: 20px;
    }

    .ivu-table th,
    .ivu-table td {
        height: 40px;
    }

    .layout-insidemodel .ivu-poptip-confirm .ivu-poptip-body .ivu-icon {
        font-size: 16px;
        color: #ff9900;
        line-height: 18px;
        position: absolute;
        margin-left: -50px;
    }
</style>
<template>
    <div class="layout-insidemodel">
        <!-- 搜素 -->
        <div class="layout-insidemodel-search">
            <Form :model="search" inline>
                <FormItem label="内部型号:" :label-width="70">
                    <Input v-model="search.insideName" style="width: 200px;" placeholder="请输入内部型号..."></Input>
                </FormItem>
                <FormItem label="终端厂商:" :label-width="70">
                    <Select v-model="search.customerId" style="width:200px">
                        <Option v-for="item in cityList" :value="item._id" :key="item._id">{{ item.customerName }}</Option>
                    </Select>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click='query()'>搜索</Button>
                </FormItem>
            </Form>
        </div>
        <!-- 添加 -->
        <div class="layout-insidemodel-add">
            <Button type="success" @click="modalAdd = true;getChange(true)">添加</Button>
            <Modal v-model="modalAdd" title="添加">
                <div slot="footer">
                    <a @click="addCancel" class="span">取消</a>
                    <Button @click="addOk" type="primary">确定</Button>
                </div>
                <Form :model="info" label-position="right" :label-width="100" ref="info" :rules="ruleValidate">
                    <FormItem label="内部型号:" prop="insideName">
                        <Input v-model="info.insideName" placeholder="请输入内部型号..."></Input>
                    </FormItem>
                    <FormItem label="所属厂商:" prop="customerId">
                        <Select v-model="info.customerId" placeholder="请输入所属厂商..." @on-change="getChange">
                            <Option v-for="item in cityList2" :value="item._id" :key="item._id">{{ item.customerName }}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="所属商用型号:" prop="commercialId">
                        <Select v-model="info.commercialId" placeholder="请输入所属商用型号...">
                            <Option v-for="item in cityList3" :value="item._id" :key="item.commercialId">{{
                                item.commercialName }}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="描述:">
                        <Input v-model="info.desc" type="textarea" :rows="4" placeholder="请输入描述..."></Input>
                    </FormItem>
                </Form>
            </Modal>
        </div>
        <div style="clear: both;"></div>
        <div class="layout-insidemodel-table">
            <Table border :columns="columns1" :data="data1"></Table>
        </div>
        <div class="layout-insidemodel-page">
            <Page :total="total" :current="page" :page-size='pageSize' @on-change="changePage" show-elevator />
        </div>
        <!--修改 -->
        <div class="layout-insidemodel-edit">
            <Modal v-model="modalEdit" title="修改">
                <div slot="footer">
                    <a @click="modalEdit=false" class="span">取消</a>
                    <Button @click="editOk" type="primary">确定</Button>
                </div>
                <Form :model="edit" label-position="right" :label-width="100" ref="edit" :rules="ruleValidate">
                    <FormItem label="ID:">
                        <Input v-model="edit._id" disabled></Input>
                    </FormItem>
                    <FormItem label="内部型号:" prop="insideName">
                        <Input v-model="edit.insideName" placeholder="请输入内部型号..."></Input>
                    </FormItem>
                    <FormItem label="所属厂商:" prop="customerId">
                        <Select v-model="edit.customerId" placeholder="请输入所属厂商..." @on-change="getChange">
                            <Option v-for="item in cityList2" :value="item._id" :key="item._id">{{ item.customerName }}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="所属商用型号:" prop="commercialId">
                        <Select v-model="edit.commercialId" placeholder="请输入所属商用型号...">
                            <Option v-for="item in cityList3" :value="item._id" :key="item._id">{{
                                item.commercialName }}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="创建时间:">
                        <Input placeholder="请输入描述..." v-model="edit.createTime" disabled></Input>
                    </FormItem>
                    <FormItem label="描述:">
                        <Input v-model="edit.desc" type="textarea" :rows="4" placeholder="请输入描述..."></Input>
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
                    insideName: '',
                    customerId: ''
                },//搜索
                total: 0, //分页
                pageSize: 30,
                page: 1,
                info: {},//添加
                modalAdd: false,

                cityList: [],
                cityList2: [],
                cityList3: [],
                //验证
                ruleValidate: {
                    insideName: [
                        { required: true, message: '请输入内部型号...', trigger: 'blur' }
                    ],
                    customerId: [
                        { required: true, message: '请选择所属厂商...', trigger: 'change'}
                    ],
                    commercialId: [
                        { required: true, message: '所属商用型号...', trigger: 'change' }
                    ]
                },
                edit: {},
                modalEdit: false,

                id: '',//一整行数据
                ids: '',

                columns1: [
                    {
                        title: '序号',
                        type: 'index',
                        width: 70,
                        align: 'center'
                    },
                    {
                        title: '内部型号',
                        key: 'insideName',
                        align: 'center'
                    },
                    {
                        title: '商用型号',
                        key: 'commercialName',
                        align: 'center'
                    },
                    {
                        title: '终端厂商',
                        key: 'customerName',
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
                self.$http(this.$config.BaseURL2 + '/tv/insidemodel/list?insideName=' + self.search.insideName + '&customerId=' + self.search.customerId + '&page=' + self.page + '&pageSize=' + self.pageSize).then(response => {
                    if (response.data.errno == 10000) {
                        console.log(response)
                        self.data1 = response.data.data.list;
                        //分页
                        self.total = response.data.data.total;
                    }
                })
            },
            //下拉框
            getSelect() {
                let self = this;
                self.$http(this.$config.BaseURL2 + '/tv/customer/list').then(response => {
                    if (response.data.errno == 10000) {
                        console.log(response)
                        self.cityList = response.data.data.list;
                        self.cityList2 = response.data.data.list;
                    }
                })
            },
            getChange(val,clear) {
                let self = this;
                if (typeof clear == 'undefined'){
                    this.info.commercialId = '';
                    this.edit.commercialId = '';
                }
                self.$http(this.$config.BaseURL2 + '/tv/commercialmodel/list?customerId=' + val).then(response => {
                    if (response.data.errno == 10000) {
                        console.log(response)
                        self.cityList3 = response.data.data.list;
                        console.log(self.cityList3);
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
                this.getTableList()
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
                self.$http.post(this.$config.BaseURL2 + '/tv/insidemodel/edit', self.info).then(response => {
                    if (response.data.errno == 10000) {
                        this.info = {};
                        this.modalAdd = false;
                        this.getTableList();
                        this.$Message.success('添加成功！')
                    }
                })
            },
            //添加取消按钮
            addCancel() {
                this.info = {};
                this.modalAdd = false;
            },
            modify(row) {
                console.log(row)
                this.modalEdit = true;
                this.edit = row;
                this.id = row._id;
                this.getChange(row.customerId,true);
            },
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
                self.$http.post(this.$config.BaseURL2 + '/tv/insidemodel/edit?_id=' + self.id, self.edit).then(response => {

                    if (response.data.errno == 10000) {
                        this.modalEdit = false;
                        this.getTableList();
                        this.$Message.success('修改成功！')
                    }
                })
            },
            //删除
            remove(row) {
                let self = this;
                self.$http(this.$config.BaseURL2 + '/tv/insidemodel/del?_id=' + row._id).then(response => {
                    if (response.data.errno == 10000) {
                        this.getTableList();
                        this.$Message.success('删除成功！');
                    }
                })
            }

        },
        mounted() {
            this.getTableList();
            this.getSelect();
        }
    }
</script>