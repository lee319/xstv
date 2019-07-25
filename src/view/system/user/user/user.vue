<style>
    .layout-user-search {
        float: left;
    }

    .layout-user-add {
        float: right;
        margin-bottom: 10px;
    }

    .layout-user .ivu-poptip-confirm .ivu-poptip-body .ivu-icon {
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

    .layout-user-page {
        float: right;
        margin-top: 10px;
    }
    .ivu-table th,
    .ivu-table td {
        height: 40px;
    }
</style>
<template>
    <div class="layout-user">
        <!-- 搜索 -->
        <div class="layout-user-search">
            <Form :model="search" label-position="right" inline>
                <FormItem label="用户名" :label-width="50">
                    <Input v-model="search.username" placeholder="请输入用户名..." style="width: 200px;"></Input>
                </FormItem>
                <FormItem label="邮箱:" :label-width="50">
                    <Input v-model="search.email" placeholder="请输入邮箱..." style="width: 200px;"></Input>
                </FormItem>
                <!-- <FormItem label="真实姓名:" :label-width="70">
                    <Input v-model="search.realname" placeholder="请输入真实姓名..."></Input>
                </FormItem> -->
                <FormItem label="电话:" :label-width="50">
                    <Input v-model="search.tel" placeholder="请输入电话..." style="width: 200px;"></Input>
                </FormItem>
                <!-- <FormItem label="附加信息:" :label-width="70">
                    <Input v-model="search.extra" placeholder="请输入附加信息..."></Input>
                </FormItem> -->
                <FormItem>
                    <Button type="primary" @click="query">搜索</Button>
                </FormItem>
            </Form>
        </div>
        <div class="layout-user-add">
            <Button type="success" @click="modalAdd = true">添加</Button>
            <Modal v-model="modalAdd" title="添加">
                <div slot="footer">
                    <a @click="addCancel" class="span">取消</a>
                    <Button @click="addOk" type="primary">确定</Button>
                </div>
                <Form :model="info" label-position="right" ref="info" :rules="ruleValidate" :label-width="80">
                    <FormItem label="用户名:" prop="username">
                        <Input v-model="info.username" placeholder="请输入用户名..."></Input>
                    </FormItem>
                    <FormItem label="密码:" prop="passwd">
                        <Input v-model="info.passwd" placeholder="请输入密码..." type="password"></Input>
                    </FormItem>
                    <FormItem label="邮箱:" prop="email">
                        <Input v-model="info.email" placeholder="请输入邮箱..."></Input>
                    </FormItem>
                    <FormItem label="真实姓名:" prop="realname">
                        <Input v-model="info.realname" placeholder="请输入真实姓名..."></Input>
                    </FormItem>
                    <FormItem label="电话:" prop="tel">
                        <Input v-model="info.tel" placeholder="请输入电话..."></Input>
                    </FormItem>
                    <FormItem label="附加信息:" prop="extra">
                        <Input v-model="info.extra" placeholder="请输入附加信息..."></Input>
                    </FormItem>
                </Form>
            </Modal>
        </div>
        <div style="clear: both;"></div>
        <!-- 表格 -->
        <div class="layout-user-table">
            <Table border :columns="columns1" :data="data1"></Table>
        </div>
        <div class="layout-user-page">
            <Page :total="total" :page-size="pageSize" @on-change="changePage" show-elevator />
        </div>
        <!-- 修改 -->
        <Modal v-model="modalEdit" title="修改">
            <div slot="footer">
                <a @click="modalEdit=false" class="span">取消</a>
                <Button @click="editOk" type="primary">确定</Button>
            </div>
            <Form :model="edit" label-position="right" ref="edit" :rules="ruleValidate" :label-width="80">
                <FormItem label="用户名:" prop="username">
                    <Input v-model="edit.username" placeholder="请输入用户名..."></Input>
                </FormItem>
                <FormItem label="密码:" prop="passwd">
                    <Input v-model="edit.passwd" placeholder="请输入密码..." type="password"></Input>
                </FormItem>
                <FormItem label="邮箱:" prop="email">
                    <Input v-model="edit.email" placeholder="请输入邮箱..."></Input>
                </FormItem>
                <FormItem label="真实姓名:" prop="realname">
                    <Input v-model="edit.realname" placeholder="请输入真实姓名..."></Input>
                </FormItem>
                <FormItem label="电话:" prop="tel">
                    <Input v-model="edit.tel" placeholder="请输入电话..."></Input>
                </FormItem>
                <FormItem label="附加信息:" prop="extra">
                    <Input v-model="edit.extra" placeholder="请输入附加信息..."></Input>
                </FormItem>
            </Form>
        </Modal>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                //搜索
                search: {
                    username: '',
                    email: '',
                    realname: '',
                    tel: '',
                    extra: ''
                },
                //添加
                info: {},
                modalAdd: false,
                //修改
                edit: {
                    username:'', 
                    passwd:'',
                    email:'',
                    realname:'',
                    tel: '', 
                    extra:''                   
                },
                modalEdit: false,
                //分页
                pageSize: 30,
                total: 0,
                page: 1,
                id: [],
                //验证
                ruleValidate: {
                    username: [
                        { required: true, message: '请输入用户名...', trigger: 'blur' }
                    ],
                    // passwd: [
                    //     { required: true, message: '请输入密码...', trigger: 'blur' }
                    // ],
                    email: [
                        { required: true, message: '请输入邮箱...', trigger: 'blur' }
                    ],
                    realname: [
                        { required: true, message: '请输入真实姓名...', trigger: 'blur' }
                    ],
                    // tel: [
                    //     { required: true, message: '请输入电话...', trigger: 'blur',type:'number'}
                    // ],
                    // extra: [
                    //     { required: true, message: '请输入附加信息...', trigger: 'blur',type:'number' }
                    // ]
                },
                columns1: [
                    {
                        type: 'index',
                        width: 70,
                        title: '序号',
                        align: 'center'
                    },
                    {
                        title: '用户名',
                        key: 'username',
                        align: 'center'
                    },
                    {
                        title: '真实姓名',
                        key: 'realname',
                        align: 'center'
                    },
                    {
                        title: '状态',
                        key: 'Isstatus',
                        align: 'center',
                        width: 150
                    },
                    {
                        title: '邮箱',
                        key: 'email',
                        align: 'center'
                    },
                    {
                        title: '电话',
                        key: 'tel',
                        align: 'center'
                    },
                    {
                        title: '创建时间',
                        key: 'ctime',
                        align: 'center'
                    },
                    {
                        title: '附加信息',
                        key: 'extra',
                        align: 'center'
                    },
                    {
                        title: '操作',
                        width: 260,
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
                                            title: "确定要禁用吗！",
                                            type: "warning",
                                            size: "small",
                                            width: "150"
                                        },
                                        style: {
                                            marginRight: '5px'
                                        },
                                        on: {
                                            "on-ok": () => {
                                                this.disable(params.row);
                                            }
                                        }
                                    }, [
                                        h(
                                            "Button", {
                                                props: {
                                                    type: "warning",
                                                    size: "small",
                                                }
                                            },
                                            // "禁用"
                                            params.row.status == 0 ? '启用' : '禁用'
                                        )
                                    ]
                                ),
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
                data1: [
                ]
            }
        },
        methods: {
            //表格列表
            getTableList() {
                let self = this;
                //
                self.$http(this.$config.BaseURL5 + '/cmsuser/list?page=' + self.page + '&pageSize=' + self.pageSize + '&username=' + self.search.username + '&email=' + self.search.email + '&tel=' + self.search.tel).then(response => {
                    if (response.data.errno == 10000) {
                        console.log(response)
                        //表格数据
                        this.data1 = response.data.data.list;
                        response.data.data.list.forEach(val => {
                            // 1启用 0禁用
                            if (val.status == 1) {
                                val.Isstatus = '启用'
                            } else if (val.status == 0) {
                                val.Isstatus = '禁用'
                            }

                        });
                        //给分页赋值
                        self.total = response.data.data.total;
                    }
                }, response => { })
            },
            //搜索
            query() {
                this.getTableList();
            },
            //添加
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
                self.$http.post(this.$config.BaseURL5 + '/login/register', self.info).then(response => {
                    console.log(response)
                    if (response.data.errno == 10000) {
                        this.info = {};
                        this.getTableList();
                        this.modalAdd = false;
                        this.$Message.success('添加成功!');
                    }
                }, response => { })
            },
            addCancel() {
                this.modalAdd = false;
                this.edit ={}
            },
            //修改
            modify(row) {
                this.modalEdit = true;
                this.edit = row;
                this.id = row.id
            },
            //修改确定
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
                self.$http.post(this.$config.BaseURL5 + '/cmsuser/save?id=' + this.id, self.edit).then(response => {
                    console.log(self.edit)
                    if (response.data.errno == 10000) {
                        // this.edit = {};
                        this.getTableList();
                        this.modalEdit = false;
                        this.$Message.success('修改成功!');
                    }
                }, response => { })
            },
            //禁用
            disable(row) {
                console.log(row)
                let self = this;
                if (row.status == 0) {
                    row.status = 1
                } else {
                    row.status = 0
                }
                self.$http(this.$config.BaseURL5 + '/cmsuser/disable?id=' + row.id + '&status=' + row.status).then(response => {
                    // if (response.data.errno == 10000) {
                    console.log(response);
                    this.getTableList();
                }, response => {

                })
            },
            //删除
            remove(index) {
                let self = this;
                self.$http(this.$config.BaseURL5 + '/cmsuser/delete?id=' + this.data1[index].id).then(response => {
                    if (response.data.errno == 10000) {
                        this.getTableList();
                        this.$Message.success('删除成功!')
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