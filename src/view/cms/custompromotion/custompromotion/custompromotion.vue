<style>
    .layout-custompromotion-add {
        float: right;
        margin-bottom: 10px;
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

    .layout-custompromotion .ivu-poptip-confirm .ivu-poptip-body .ivu-icon {
        font-size: 16px;
        color: #ff9900;
        line-height: 18px;
        position: absolute;
        margin-left: -50px;
    }
    .layout-bootvideo-page{
        float: right;
        margin-top: 10px;
    }
</style>
<template>
    <div class="layout-custompromotion">
        <!-- 添加 -->
        <div class="layout-custompromotion-add">
            <Button type="success" @click="modalAdd = true">添加</Button>
            <Modal v-model="modalAdd" title="添加">
                <div slot="footer">
                    <a @click="addCancel" class="span">取消</a>
                    <Button @click="addOk" type="primary">确定</Button>
                </div>
                <Form :model="info" label-position="right" :label-width="90" ref="info" :rules="ruleValidate">
                    <FormItem label="基础模版:">
                        <Select v-model="info.staticTemplateId">
                            <Option v-for="item in cityList" :value="item.id" :key="item.id">{{ item.title }}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="拓展模版名称:">
                        <Input v-model="info.title" placeholder="请输入拓展模版名称..."></Input>
                    </FormItem>
                    <FormItem label="渠道:">
                        <CheckboxGroup v-model="info.channel">
                            <Checkbox v-for="item in Checkboxlist" :label="item.channelId">{{item.channelName}}</Checkbox>
                        </CheckboxGroup>
                    </FormItem>
                    <FormItem label="描述:">
                        <Input v-model="info.description" type="textarea" :rows="4" placeholder="请输入描述..."></Input>
                    </FormItem>
                </Form>
            </Modal>
        </div>
        <div style="clear: both;"></div>
        <div class="layout-custompromotion-table">
            <Table border :columns="columns1" :data="data1"></Table>
        </div>
        <!-- 修改 -->
        <div class="layout-custompromotion-edit">
            <Modal v-model="modalEdit" title="修改">
                <div slot="footer">
                    <a @click="modalEditBtn" class="span">取消</a>
                    <Button @click="editOk" type="primary">确定</Button>
                </div>
                <Form :model="edit" label-position="right" :label-width="90">
                    <!-- <FormItem label="基础模版:">
                        <Select v-model="info.staticTemplateId" style="width:398px">
                            <Option v-for="item in cityList" :value="item.id" :key="item.id">{{ item.title }}</Option>
                        </Select>
                    </FormItem> -->
                    <FormItem label="拓展模版名称:">
                        <Input v-model="edit.title" placeholder="请输入拓展模版名称..."></Input>
                    </FormItem>
                    <FormItem label="描述:">
                        <Input v-model="edit.description" type="textarea" :rows="4" placeholder="请输入描述..."></Input>
                    </FormItem>
                </Form>
            </Modal>
        </div>
        <div class="layout-bootvideo-page">
            <Page :total="total" :current="page" :page-size="pageSize" @on-change="changePage" show-elevator />
        </div>
    </div>
</template>
<script>
    var moment = require("moment");
    export default {
        data() {
            return {
                info: {},
                modalAdd: false,//添加
                cityList: [],//基础模版

                edit: {},
                modalEdit: false,//修改

                id: '',
                //分页
                pageSize: 30,
                page: 1,
                total: 0,
                Checkboxlist: [],//  复选框
                columns1: [
                    {
                        title: '序号',
                        type: 'index',
                        width: 70,
                        align: 'center'
                    },
                    {
                        title: '模版ID',
                        key: 'id',
                        align: 'center'
                    },
                    {
                        title: '模版名称',
                        key: 'title',
                        align: 'center'
                    },
                    {
                        title: '基础模版ID',
                        key: 'staticTemplateId',
                        align: 'center'
                    },
                    {
                        title: '渠道',
                        key: 'channel',
                        align: 'center'
                    },
                    {
                        title: '创建时间',
                        key: 'IsaddTime',
                        align: 'center'
                    },
                    {
                        title: '描述',
                        key: 'description',
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
                //验证
                ruleValidate: {
                    title: [
                        { required: true, message: '请输入虚拟分类名称', trigger: 'blur' }
                    ]
                },
            }
        },
        methods: {
            //表格数据 
            getTableList() {
                let self = this;
                self.$http(this.$config.BaseURL + '/custompromotion/template/list?page=' + self.page + '&pageSize=' + self.pageSize).then(response => {
                    if (response.data.errno == 10000) {
                        console.log(response)
                        self.data1 = response.data.data.list;

                        response.data.data.list.forEach(val => {
                            val.IsaddTime = moment(val.addTime * 1000).format(
                                "YYYY-MM-DD HH:mm:ss"
                            );
                        });

                        self.total = response.data.data.total;
                    }
                })
            },
            // /staticpromotion/template/list
            getSelect() {
                let self = this;
                self.$http(this.$config.BaseURL + '/staticpromotion/template/list').then(response => {
                    if (response.data.errno == 10000) {
                        self.cityList = response.data.data.list;
                    }
                })
            },
            // /tv/channel/list
            getCheckbox() {
                let self = this;
                self.$http(this.$config.BaseURL2 + '/tv/channel/list').then(response => {
                    if (response.data.errno == 10000) {
                        console.log(response)
                        self.Checkboxlist = response.data.data.list;

                        console.log(self.Checkboxlist)
                    }
                }, response => { })
            },
            // 添加确定按钮
            addOk() {
                let self = this;
                self.$http.post(this.$config.BaseURL + '/custompromotion/template/save', self.info).then(response => {
                    if (response.data.errno == 10000) {
                        this.info = {};
                        this.getTableList();
                        this.modalAdd = false;
                        this.$Message.success('添加成功！');
                    }
                }, response => {

                })
            },
            addCancel() {
                this.info = {};
                this.modalAdd = false;
            },
            modify(row) {
                console.log(row);
                this.edit = row;
                this.modalEdit = true;
                this.id = row.id;
            },
            editOk() {
                let self = this;
                self.$http.post(this.$config.BaseURL + '/custompromotion/template/save?id=' + self.id, self.edit).then(response => {
                    if (response.data.errno == 10000) {
                        this.getTableList();
                        this.modalEdit = false;
                        this.$Message.success('修改成功！')
                    }
                }, response => { })
            },
            //修改取消按钮
            modalEditBtn() {
                this.getTableList();
                this.modalEdit = false;
            },
            //删除
            remove(row) {
                console.log(row);
                let self = this;
                self.$http(this.$config.BaseURL + '/custompromotion/template/delete?id=' + row.id).then(response => {
                    if (response.data.errno == 10000) {
                        this.getTableList();
                        this.$Message.success('删除成功！')
                    }
                }, response => { })
            },
            //分页
            changePage(page) {
                this.page = page;
                this.getTableList();
            }
        },
        mounted() {
            this.getTableList();
            this.getSelect();
            this.getCheckbox()
        }
    }
</script>