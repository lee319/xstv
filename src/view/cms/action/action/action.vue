<style>
    .layout-action-add {
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
    .layout-action .ivu-poptip-confirm .ivu-poptip-body .ivu-icon {
        font-size: 16px;
        color: #ff9900;
        line-height: 18px;
        position: absolute;
        margin-left: -50px;
    }
</style>
<template>
    <div class="layout-action">
        <!-- 添加 -->
        <div class="layout-action-add">
            <Button type="success" @click="modalAdd = true">添加</Button>
            <Modal v-model="modalAdd" title="添加">
                <div slot="footer">
                    <a @click="addCancel" class="span">取消</a>
                    <Button @click="addOk" type="primary">确定</Button>
                </div>
                <Form :model="info" label-position="right" :label-width="90">
                    <FormItem label="标题:">
                        <Input v-model="info.title" placeholder="请输入标题..."></Input>
                    </FormItem>
                    <FormItem label="包名:">
                        <Input v-model="info.apk" placeholder="请输入包名..."></Input>
                    </FormItem>
                    <FormItem label="动作名:">
                        <Input v-model="info.action" placeholder="请输入动作名..."></Input>
                    </FormItem>
                    <FormItem label="描述:">
                        <Input v-model="info.description" type="textarea" :rows="4" placeholder="请输入描述..."></Input>
                    </FormItem>
                </Form>
            </Modal>
        </div>
        <!-- 修改 -->
        <div class="layout-action-add">
            <Modal v-model="modalEdit" title="修改">
                <div slot="footer">
                    <a @click="modalEditBtn" class="span">取消</a>
                    <Button @click="editOk" type="primary">确定</Button>
                </div>
                <Form :model="edit" label-position="right" :label-width="90">
                    <FormItem label="标题:">
                        <Input v-model="edit.title" placeholder="请输入标题..."></Input>
                    </FormItem>
                    <FormItem label="包名:">
                        <Input v-model="edit.apk" placeholder="请输入包名..."></Input>
                    </FormItem>
                    <FormItem label="动作名:">
                        <Input v-model="edit.action" placeholder="请输入动作名..."></Input>
                    </FormItem>
                    <FormItem label="描述:">
                        <Input v-model="edit.description" type="textarea" :rows="4" placeholder="请输入描述..."></Input>
                    </FormItem>
                </Form>
            </Modal>
        </div>
        <div style="clear: both;"></div>
        <div class="layout-action-table">
            <Table border :columns="columns1" :data="data1"></Table>
        </div>
    </div>
</template>
<script>
    var moment = require("moment");
    export default {
        data() {
            return {
                // 添加
                info: {},
                modalAdd: false,
                // 修改
                id: [],
                edit: {},
                modalEdit: false,
                columns1: [
                    {
                        title: '序号',
                        type: 'index',
                        width: 70,
                        align: 'center'
                    },
                    {
                        title: '名称',
                        key: 'title',
                        align: 'center'
                    },
                    {
                        title: '目标应用名',
                        key: 'apk',
                        align: 'center',
                        width: 160
                    },
                    {
                        title: '目标应用启动动作',
                        key: 'action',
                        align: 'center',
                        width: 240
                    },
                    {
                        title: '创建人',
                        key: 'addUser',
                        align: 'center'
                    },
                    {
                        title: '创建时间',
                        key: 'IsaddTime',
                        align: 'center'
                    },
                    {
                        title: '修改人',
                        key: 'updateUser',
                        align: 'center'
                    },
                    {
                        title: '修改时间',
                        key: 'IsupdateTime',
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
                                                this.remove(params.index);
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
                self.$http(this.$config.BaseURL + '/staticpromotion/action/list').then(response => {
                    if (response.data.errno == 10000) {
                        console.log(response)
                        self.data1 = response.data.data.list;

                        response.data.data.list.forEach(val => {
                            val.IsaddTime = moment(val.addTime * 1000).format(
                                "YYYY-MM-DD HH:mm:ss"
                            );
                            val.IsupdateTime = moment(val.updateTime * 1000).format(
                                "YYYY-MM-DD HH:mm:ss"
                            );
                        });
                    }
                }, response => { })
            },
            //添加确定按钮
            addOk() {
                let self = this;
                self.$http.post(this.$config.BaseURL + '/staticpromotion/action/save', self.info).then(response => {
                    if (response.data.errno == 10000) {
                        this.info = {};
                        this.modalAdd = false;
                        this.getTableList();
                        this.$Message.success("添加成功!");
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
                this.modalEdit = true;
                this.id = row.id;
                this.edit = row;
            },
            //修改确定按钮
            editOk() {
                let self = this;
                self.$http.post(this.$config.BaseURL + '/staticpromotion/action/save?id=' + self.id, self.edit).then(response => {
                    if (response.data.errno == 10000) {
                        this.edit = {};
                        self.modalEdit = false;
                        this.getTableList();
                        this.$Message.success('修改成功！')
                    }
                })
            },
            modalEditBtn() {
                this.modalEdit = false;
                this.getTableList();
            },
            // 删除
            remove(index) {
                let self = this;
                self.$http(this.$config.BaseURL + '/staticpromotion/action/delete?id=' + self.data1[index].id).then(response => {
                    if (response.data.errno == 10000) {
                        this.getTableList();
                        this.$Message.success("删除成功");
                    }
                }, response => { })
            }
        },
        mounted() {
            this.getTableList()
        }
    }
</script>