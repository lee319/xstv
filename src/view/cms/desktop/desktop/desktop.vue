<style>
    .layout-desktop-search {
        float: left;
    }

    .layout-desktop-add {
        float: right;
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
    .layout-desktop .ivu-poptip-confirm .ivu-poptip-body .ivu-icon {
        font-size: 16px;
        color: #ff9900;
        line-height: 18px;
        position: absolute;
        margin-left: -50px;
    }
</style>
<template>
    <div class="layout-desktop">
        <!-- 搜索 -->
        <div class="layout-desktop-search">
            <Form :model="search" label-position="right" inline>
                <FormItem label="所属模版:" :label-width="70">
                    <Select style="width:200px" v-model="search.templateId" placeholder="请选择所属模版...">
                        <Option v-for="item in tampList" :value="item.id" :key="item.id">{{ item.title }}</Option>
                    </Select>
                </FormItem>
                <FormItem label="状态:" :label-width="40">
                    <Select v-model="search.status" style="width:200px" placeholder="请选择状态...">
                        <Option value="">全部</Option>
                        <Option :value="0">下线</Option>
                        <Option :value="1">上线</Option>
                    </Select>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="query()">搜索</Button>
                </FormItem>
            </Form>
        </div>
        <!-- 添加 -->
        <div class="layout-desktop-add">
            <Button type="success" @click="modalAddBtn()">添加</Button>
            <Modal v-model="modalAdd" title="添加">
                <div slot="footer">
                    <a @click="addCancel" class="span">取消</a>
                    <Button @click="addOk" type="primary">确定</Button>
                </div>
                <Form :model="info" label-position="right" :label-width="100">
                    <FormItem label="所属模版:">
                        <Select v-model="info.templateId" placeholder="请选择所属模版...">
                            <Option v-for="item in tampList" :value="item.id" :key="item.id">{{ item.title }}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="桌面名称:">
                        <Input v-model="info.title" placeholder="请输入桌面名称..."></Input>
                    </FormItem>
                    <FormItem label="桌面图标:">
                        <Upload :action="$config.BaseURLfile + '/common/upload/file'" ref="upload" :on-success="handleSuccess"
                            :format="['jpg','jpeg','png']" :max-size="2048" :on-format-error="handleFormatError"
                            :on-exceeded-size="handleMaxSize" :with-credentials="true">
                            <Button icon="ios-cloud-upload-outline">上传桌面图标</Button>
                        </Upload>
                    </FormItem>
                    <FormItem label="桌面背景:">
                        <Upload :action="$config.BaseURLfile + '/common/upload/file'" ref="upload1" :on-success="handleSuccess1"
                            :format="['jpg','jpeg','png']" :max-size="2048" :on-format-error="handleFormatError1"
                            :on-exceeded-size="handleMaxSize1" :with-credentials="true">
                            <Button icon="ios-cloud-upload-outline">上传桌面背景</Button>
                        </Upload>
                    </FormItem>
                    <FormItem label="排序Id:">
                        <Input v-model="info.sortId" placeholder="请输入排序Id..."></Input>
                    </FormItem>
                    <FormItem label="状态:">
                        <Select v-model="info.status" placeholder="请选择所属模版...">
                            <Option :value="0">下线</Option>
                            <Option :value="1">上线</Option>
                        </Select>
                        <!-- <Input v-model="info.status"></Input> -->
                    </FormItem>
                    <FormItem label="描述:">
                        <Input v-model="info.description" type="textarea" :rows="4" placeholder="请输入描述..."></Input>
                    </FormItem>
                </Form>
            </Modal>
        </div>
        <!-- 修改 -->
        <div class="layout-desktop-edit">
            <Modal v-model="modalEdit" title="修改">
                <div slot="footer">
                    <a @click="modalEditBtn" class="span">取消</a>
                    <Button @click="editOk" type="primary">确定</Button>
                </div>
                <Form :model="edit" label-position="right" :label-width="100">
                    <FormItem label="所属模版:">
                        <Select v-model="edit.templateId" placeholder="请选择所属模版...">
                            <Option v-for="item in tampList" :value="item.id" :key="item.id">{{ item.title }}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="桌面名称:">
                        <Input v-model="edit.title"></Input>
                    </FormItem>
                    <FormItem label="桌面图标:">
                        <Upload :action="$config.BaseURLfile + '/common/upload/file'" ref="upload2" :on-success="handleSuccess"
                            :format="['jpg','jpeg','png']" :max-size="2048" :on-format-error="handleFormatError"
                            :on-exceeded-size="handleMaxSize" :with-credentials="true">
                            <Button icon="ios-cloud-upload-outline">上传桌面图标</Button>
                        </Upload>
                    </FormItem>
                    <FormItem label="桌面背景:">
                        <Upload :action="$config.BaseURLfile + '/common/upload/file'" ref="upload3" :on-success="handleSuccess1"
                            :format="['jpg','jpeg','png']" :max-size="2048" :on-format-error="handleFormatError1"
                            :on-exceeded-size="handleMaxSize1" :with-credentials="true">
                            <Button icon="ios-cloud-upload-outline">上传桌面背景</Button>
                        </Upload>
                    </FormItem>
                    <FormItem label="排序Id:">
                        <Input v-model="edit.sortId"></Input>
                    </FormItem>
                    <FormItem label="状态:">
                        <Select style="width:390px" placeholder="请选择状态...">
                            <Option :value="1">上线</Option>
                            <Option :value="0">下线</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="描述:">
                        <Input v-model="edit.description" type="textarea" :rows="4"></Input>
                    </FormItem>
                </Form>
            </Modal>
        </div>
        <div style="clear: both;"></div>
        <!-- 表格 -->
        <div class="layout-desktop-table">
            <Table border :columns="columns1" :data="data1"></Table>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                //搜索
                search: {
                    templateId: '',
                    status: '',
                },
                tampList: [],
                //添加
                info: {},
                modalAdd: false,
                //修改
                edit: {
                    status: ''
                },
                id: [],
                modalEdit: false,
                columns1: [
                    {
                        title: '序号',
                        type: 'index',
                        width: 70,
                        align: 'center'
                    },
                    {
                        title: '桌面名称',
                        key: 'title',
                        align: 'center'
                    },
                    {
                        title: '图标地址',
                        key: 'iconUrl',
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('img', {
                                    attrs: {
                                        src: params.row.iconUrl
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
                        title: '背景图地址',
                        key: 'bgUrl',
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('img', {
                                    attrs: {
                                        src: params.row.bgUrl
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
                        title: '频道排序',
                        key: 'sortId',
                        align: 'center'
                    },
                    {
                        title: '状态',
                        key: 'Isstatus',
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
            handleSuccess(res, file) {
                console.log(res)
                if (res.errno == 10000) {
                    file.url = res.data.url
                    file.name = ""
                    // this.bgurl = res.data.url;
                    this.info.iconUrl = res.data.url;
                    console.log(this.info.iconUrl)
                }
            },
            // 上传格式验证
            handleFormatError(file) {
                this.$Notice.warning({
                    title: '文件格式不正确',
                    desc: '文件格式' + '文件名' + '不正确，请选择JPG或PNG'
                });
            },
            //上传文件大小验证
            handleMaxSize(file) {
                this.$Notice.warning({
                    title: '超过文件大小限制',
                    desc: '文件  ' + '文件名' + ' 太大，不超过2M.'
                });
            },

            handleSuccess1(res, file) {
                console.log(res)
                if (res.errno == 10000) {
                    file.url = res.data.url
                    file.name = ""
                    // this.bgurl = res.data.url;
                    this.info.bgUrl = res.data.url
                    console.log(this.info.bgUrl)
                }
            },
            // 上传格式验证
            handleFormatError1(file) {
                this.$Notice.warning({
                    title: '文件格式不正确',
                    desc: '文件格式' + '文件名' + '不正确，请选择JPG或PNG'
                });
            },
            //上传文件大小验证
            handleMaxSize1(file) {
                this.$Notice.warning({
                    title: '超过文件大小限制',
                    desc: '文件  ' + '文件名' + ' 太大，不超过2M.'
                });
            },
            //表格数据
            getTableList() {
                let self = this;
                if (self.search.status == undefined) {
                    self.search.status = ''
                }
                self.$http(this.$config.BaseURL + '/staticpromotion/desktop/list?templateId=' + self.search.templateId + '&status=' + self.search.status).then(response => {
                    console.log(response)
                    if (response.data.errno == 10000) {
                        self.data1 = response.data.data;

                        response.data.data.forEach(val => {
                            if (val.status == 0) {
                                val.Isstatus = "下线"
                            } else if (val.status == 1) {
                                val.Isstatus = "上线"
                            }
                        });
                    }
                })
            },
            //下拉框
            getSelectList() {
                let self = this;
                self.$http(this.$config.BaseURL + '/staticpromotion/template/list').then(response => {
                    if (response.data.errno == 10000) {
                        console.log(response)
                        self.tampList = response.data.data.list;
                    }
                })
            },
            //搜索
            query() {
                this.getTableList()
            },
            modalAddBtn(){
                this.modalAdd = true;
                this.$refs.upload.clearFiles();
                this.$refs.upload1.clearFiles();
            },
            //添加确定按钮
            addOk() {
                console.log(111)
                let self = this;
                self.$http.post(this.$config.BaseURL + '/staticpromotion/desktop/save', self.info).then(response => {
                    console.log(response)
                    if (response.data.errno == 10000) {
                        this.info = {};
                        this.modalAdd = false;
                        this.getTableList();
                        this.$Message.success("添加成功!")
                    }
                })
            },
            //添加取消按钮
            addCancel() {
                this.info = {}
                this.modalAdd = false;
            },
            //修改
            modify(row) {
                console.log(row)
                this.modalEdit = true;
                this.edit = row;
                this.id = row.id
                console.log(this.edit.status)

            },
            // 修改确定按钮
            editOk() {
                let self = this;
                self.$http.post(this.$config.BaseURL + '/staticpromotion/desktop/save?id=' + self.id, self.edit).then(response => {
                    if (response.data.errno == 10000) {
                        this.edit = {};
                        this.modalEdit = false;
                        this.getTableList();
                        this.$Message.success("修改成功");
                    }
                }, response => { })
            },
            // 修改取消按钮
            modalEditBtn() {
                this.modalEdit = false;
                this.getTableList();
            },
            // 删除
            remove(index) {
                let self = this;
                self.$http(this.$config.BaseURL + '/staticpromotion/desktop/delete?id=' + self.data1[index].id).then(response => {
                    if (response.data.errno == 10000) {
                        this.$Message.success("删除成功");
                        this.getTableList()
                    }
                })
            }
        },
        mounted() {
            this.getTableList();
            this.getSelectList()
        }
    }
</script>