<style>
    .layout-channel-search {
        float: left;
    }

    .layout-channel-add {
        float: right;
    }

    .layout-channel-page {
        float: right;
        margin-top: 10px;
    }

    .layout-channel .ivu-poptip-confirm .ivu-poptip-body .ivu-icon {
        font-size: 16px;
        color: #ff9900;
        line-height: 18px;
        position: absolute;
        margin-left: -50px;
    }

    .span {
        font-size: 14px;
        margin: 15px;
        color: #495060;
        padding-bottom: 20px;
    }
</style>
<template>
    <div class="layout-channel">
        <div class="layout-channel-search">
            <Form :model="search" inline>
                <FormItem label="渠道名称:" :label-width="65">
                    <Input v-model="search.channelName" style="width:200px;" placeholder="请输入渠道名称..."></Input>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click='query()'>搜索</Button>
                </FormItem>
            </Form>
        </div>
        <!-- 添加 -->
        <div class="layout-channel-add">
            <Button type="success" @click="modalAdd = true">添加</Button>
            <Modal v-model="modalAdd" title="添加">
                <div slot="footer">
                    <a @click="addCancel" class="span">取消</a>
                    <Button @click="addOk" type="primary">确定</Button>
                </div>
                <Form :model="info" label-position="right" :label-width="100" ref="info" :rules="ruleValidate">
                    <FormItem label="渠道ID:" prop="channelId">
                        <Input v-model="info.channelId" placeholder="请输入渠道ID..."></Input>
                    </FormItem>
                    <FormItem label="渠道名称:" prop="channelName">
                        <Input v-model="info.channelName" placeholder="请输入渠道名称..."></Input>
                    </FormItem>
                    <FormItem label="描述:">
                        <Input v-model="info.desc" type="textarea" :rows="4" placeholder="请输入描述..."></Input>
                    </FormItem>
                </Form>
            </Modal>
        </div>
        <div style="clear: both;"></div>
        <div class="layout-channel-table">
            <Table border :columns="columns1" :data="data1"></Table>
        </div>
        <!-- 修改 -->
        <div class="layout-channel-edit">
            <Modal v-model="modalEdit" title="修改">
                <div slot="footer">
                    <a @click="modalEditBtn" class="span">取消</a>
                    <Button @click="editOk" type="primary">确定</Button>
                </div>
                <Form :model="edit" label-position="right" :label-width="100" ref="edit" :rules="ruleValidate">
                    <FormItem label="渠道ID:">
                        <Input v-model="edit.channelId" placeholder="请输入渠道名称..." disabled></Input>
                    </FormItem>
                    <FormItem label="渠道名称:" prop="channelName">
                        <Input v-model="edit.channelName" placeholder="请输入渠道名称..."></Input>
                    </FormItem>
                    <FormItem label="描述:">
                        <Input v-model="edit.desc" type="textarea" :rows="4" placeholder="请输入描述..."></Input>
                    </FormItem>
                    <FormItem label="渠道名称:">
                        <Input v-model="edit.createTime" disabled></Input>
                    </FormItem>
                </Form>
            </Modal>
        </div>
        <div class="layout-channel-page">
            <Page :total="total" :current="page" :page-size='pageSize' @on-change="changePage" show-elevator />
        </div>

    </div>
</template>
<script>
    export default {
        data() {
            return {
                search: {
                    channelName: ''
                },//搜索
                info: {},//添加 
                modalAdd: false,

                edit: {},//修改
                modalEdit: false,

                id: '',//一整行

                total: 0,//分页
                page: 1,
                pageSize: 30,

                columns1: [
                    {
                        type: 'index',
                        width: 70,
                        align: 'center',
                        title: '序号'
                    },
                    {
                        title: '渠道ID',
                        key: 'channelId',
                        align: 'center'
                    },
                    {
                        title: '渠道名称',
                        key: 'channelName',
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
                ruleValidate: {
                    channelId: [
                        { required: true, message: '请输入渠道ID...', trigger: 'blur' },
                        { max: 5, min: 5, message: '请输入5位数字！', trigger: 'blur' }
                    ],
                    channelName: [
                        {
                            required: true, message: '请输入渠道名称...', trigger: 'blur'
                        }
                    ]
                }
            }
        },
        methods: {
            //表格数据
            getTableList() {
                let self = this;
                self.$http(this.$config.BaseURL2 + '/tv/channel/list?channelName=' + self.search.channelName + '&page=' + self.page + '&pageSize=' + self.pageSize).then(response => {
                    if (response.data.errno == 10000) {
                        self.data1 = response.data.data.list;

                        self.total = response.data.data.total;
                    }
                })
            },
            //搜索
            query() {
                this.page = 1;
                this.getTableList();
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
                self.$http.post(this.$config.BaseURL2 + '/tv/channel/edit', self.info).then(response => {
                    if (response.data.errno == 10000) {
                        this.info = {};
                        this.modalAdd = false;
                        this.getTableList();
                        this.$Message.success("添加成功！")
                    }
                })
            },
            //添加取消按钮
            addCancel() {
                this.info = {};
                this.modalAdd = false;
            },
            //修改弹框
            modify(row) {
                this.id = row._id;
                this.edit = row;
                this.modalEdit = true;
            },
            //修改确定按钮
            editOk() {
                let self = this;
                self.edit.channelId = self.edit.channelId + ''
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
                self.$http.post(this.$config.BaseURL2 + '/tv/channel/edit?_id=' + self.id, self.edit).then(response => {
                    if (response.data.errno == 10000) {
                        this.modalEdit = false;
                        this.getTableList();
                        this.$Message.success('修改成功！')
                    }
                })
            },
            // 修改取消按钮
            modalEditBtn() {
                this.modalEdit = false;
                this.getTableList();
            },
            //删除
            remove(row) {
                let self = this;
                self.$http(this.$config.BaseURL2 + '/tv/channel/del?_id=' + row._id).then(response => {
                    if (response.data.errno == 10000) {
                        this.getTableList();
                        this.$Message.success('删除成功！')
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