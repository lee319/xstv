<style>
    .layout-origin-serch {
        float: left;
    }

    .layout-origin-add {
        float: right;
    }

    .span {
        font-size: 14px;
        margin: 15px;
        color: #495060;
        padding-bottom: 20px;
    }

    .layout-origin .ivu-poptip-confirm .ivu-poptip-body .ivu-icon {
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

    .layout-origin-page {
        float: right;
        margin-top: 10px;
    }
</style>
<template>
    <div class="layout-origin">
        <div class="layout-origin-serch">
            <Form :model="search" inline>
                <FormItem label="来源名称:" :label-width="70">
                    <Input v-model="search.name" style="width: 200px;" placeholder="请输入来源名称..."></Input>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="query()">搜索</Button>
                </FormItem>
            </Form>
        </div>
        <!-- 添加 -->
        <div class="layout-origin-add">
            <Button type="success" @click="modalAddBtn">添加</Button>
            <Modal v-model="modalAdd" title="添加">
                <div slot="footer">
                    <a @click="addCancel" class="span">取消</a>
                    <Button @click="addOk" type="primary">确定</Button>
                </div>
                <Form :model="info" label-position="right" :label-width="100" ref="info" :rules="ruleValidate">
                    <FormItem label="来源名称:" prop="name">
                        <Input v-model="info.name" placeholder="请输入来源名称..."></Input>
                    </FormItem>
                    <FormItem label="来源logo:">
                        <Upload :action="$config.BaseURLfile + '/common/upload/file'" ref="upload" :on-success="handleSuccess"
                            :with-credentials="true" :format="['jpg','jpeg','png']" :on-format-error="handleFormatError">
                            <Button icon="ios-cloud-upload-outline">上传图片</Button>
                        </Upload>
                    </FormItem>
                    <FormItem label="来源代号:">
                        <Input v-model="info.src_code" placeholder="请输入来源代号..."></Input>
                    </FormItem>
                    <FormItem label="描述:">
                        <Input v-model="info.desc" type="textarea" :rows="4" placeholder="请输入描述..."></Input>
                    </FormItem>
                </Form>
            </Modal>
        </div>
        <div style="clear: both;"></div>
        <div class="layout-origin-table">
            <Table border :columns="columns1" :data="data1"></Table>
        </div>
        <!-- 分页 -->
        <div class="layout-origin-page">
            <Page :total="total" :current="page" :page-size='pageSize' @on-change="changePage" show-elevator />
        </div>
        <!-- 修改 -->
        <div class="layout-origin-edit">
            <Modal v-model="modalEdit" title="修改">
                <div slot="footer">
                    <a @click="modalEdit=false" class="span">取消</a>
                    <Button @click="editOk" type="primary">确定</Button>
                </div>
                <Form :model="edit" label-position="right" :label-width="100" ref="edit" :rules="ruleValidate">
                    <FormItem label="来源ID:">
                        <Input v-model="edit.id" disabled></Input>
                    </FormItem>
                    <FormItem label="来源名称:" prop="name">
                        <Input v-model="edit.name" placeholder="请输入来源名称..."></Input>
                    </FormItem>
                    <FormItem label="来源代号:">
                        <Input v-model="edit.src_code" placeholder="请输入来源代号..."></Input>
                    </FormItem>
                    <FormItem label="来源logo:">
                        <Upload :action="$config.BaseURLfile + '/common/upload/file'" :on-success="handleSuccess1"
                            :with-credentials="true" :format="['jpg','jpeg','png']"  :on-format-error="handleFormatError">
                            <Button icon="ios-cloud-upload-outline">上传图片</Button>
                        </Upload>
                    </FormItem>
                    <FormItem label="状态:">
                        <Select v-model="edit.status">
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
                modalEdit: false,
                page: 1,
                total: 0,
                pageSize: 30,//分页
                id: '',
                ruleValidate: {
                    name: [
                        { type: 'string', required: true, message: '请输入来源名称...', trigger: 'blur' }
                    ]
                },
                //保存图片url
                addUploadUrl: '',
                editUploadUrl: '',
                columns1: [
                    {
                        title: '来源ID',
                        key: 'id',
                        align: 'center'
                    },
                    {
                        title: '来源名称',
                        key: 'name',
                        align: 'center'
                    },
                    {
                        title: '来源代号',
                        key: 'src_code',
                        align: 'center'
                    },
                    {
                        title: '来源logo',
                        key: 'logo',
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('img', {
                                    attrs: {
                                        src: params.row.logo
                                    },
                                    style: {
                                        width: '50px',
                                        height: '50px',
                                        marginTop: '5px'
                                    }
                                }),
                            ]);
                        }
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
                data1: []
            }
        },
        methods: {
            // 表格
            getTableList() {
                let self = this;
                self.$http(this.$config.BaseURL1 + '/media/v2/origin/list?name=' + self.search.name + '&page=' + this.page + '&pageSize=' + self.pageSize).then(response => {
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

                        });

                        //分页
                        self.total = response.data.data.total;
                    }
                }, response => { })
            },
            //添加上传成功
            handleSuccess(res, file) {
                console.log(res)
                this.addUploadUrl = res.data.url
                console.log(this.addUploadUrl);
            },
            // 上传格式验证
            handleFormatError(file) {
                this.$Notice.warning({
                    title: '文件格式不正确',
                    desc: '文件格式' + '文件名' + '不正确，请选择JPG或PNG'
                });
            },
            handleSuccess1(res, file) {
                console.log(res)
                this.editUploadUrl = res.data.url
                console.log(this.editUploadUrl);
            },
            // 添加弹框
            modalAddBtn(){
                this.modalAdd = true;
                this.$refs.upload.clearFiles();
            },
            //添加确定按钮
            addOk() {
                let self = this;
                // 开始时间
                self.info.startTime = moment(self.info.startTime).format(
                    "X"
                )
                // 结束时间
                self.info.endTime = moment(self.info.endTime).format(
                    "X"
                )
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

                this.info.level = this.info.level * 1
                this.info.startTime = this.info.startTime * 1
                this.info.endTime = this.info.endTime * 1


                self.info.logo = this.addUploadUrl;


                self.$http.post(this.$config.BaseURL1 + '/media/v2/origin/modify', self.info).then(response => {
                    if (response.data.errno == 10000) {
                        this.info = {};
                        this.modalAdd = false;
                        this.getTableList();
                        this.$Message.success('添加成功!')
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
                this.editUploadUrl = '';
                row = JSON.parse(JSON.stringify(row))
                this.edit = row;
                this.id = row.id;
                this.modalEdit = true;
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

                if (this.editUploadUrl != '') {
                    self.edit.logo = this.editUploadUrl;
                }
                self.$http.post(this.$config.BaseURL1 + '/media/v2/origin/modify?id=' + self.id, self.edit).then(response => {
                    if (response.data.errno == 10000) {
                        this.edit = {};
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
                    this.$Message.warning('状态为上线不能删除!');
                    return;
                }
                self.$http.post(this.$config.BaseURL1 + '/media/v2/origin/delete', {
                    id: row.id
                }).then(response => {
                    if (response.data.errno == 10000) {
                        this.getTableList();
                        this.$Message.success('删除成功！')
                    }
                }, response => { })
            },
            //搜索
            query() {
                this.page = 1;
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
        }
    }
</script>