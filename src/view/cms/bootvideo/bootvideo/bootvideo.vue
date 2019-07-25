<style>
    .layout-bootvideo-add {
        float: right;
        margin-bottom: 10px;
    }

    .layout-bootvideo-table {
        clear: both;
    }

    .span {
        font-size: 14px;
        margin: 15px;
        color: #495060;
        padding-bottom: 20px;
    }

    .layout-bootvideo-page {
        float: right;
        margin-top: 10px;
    }

    .layout-bootvideo .ivu-poptip-confirm .ivu-poptip-body .ivu-icon {
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
    <div class="layout-bootvideo">
        <!-- 添加 -->
        <div class="layout-bootvideo-add">
            <Button type="success" @click="modalAdd = true;addUploadUrl=''">添加</Button>
            <Modal v-model="modalAdd" title="添加">
                <div slot="footer">
                    <a @click="addCancel" class="span">取消</a>
                    <Button @click="addOk" type="primary">确定</Button>
                </div>
                <Form :model="info" label-position="right" :label-width="100">
                    <FormItem label="视频名称:">
                        <Input v-model="info.title" placeholder="请输入视频名称..."></Input>
                    </FormItem>
                    <FormItem label="视频地址:">
                        <Upload :action="$config.BaseURLfile + '/common/upload/file'" ref="upload"
                            :on-success="handleSuccess1" :with-credentials="true">
                            <Button icon="ios-cloud-upload-outline">上传视频地址</Button>
                        </Upload>
                    </FormItem>
                    <FormItem label="视频格式:">
                        <Input v-model="info.videoFormat" placeholder="请输入视频格式..."></Input>
                    </FormItem>
                    <FormItem label="视频文件Md5值:">
                        <Input v-model="info.videoMd5" placeholder="请输入视频文件Md5值..."></Input>
                    </FormItem>
                    <!-- 1 启动 2 停用 -->
                    <FormItem label="状态:" prop="status">
                        <Select v-model="info.status" placeholder="请选择状态...">
                            <Option :value="1">上线</Option>
                            <Option :value="0">下线</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="排序:" prop="orderNum">
                        <Input v-model="info.orderNum" placeholder="请输入排序..."></Input>
                    </FormItem>
                    <FormItem label="开始投放时间:">
                        <!-- <Input v-model="info.startTime"></Input> -->
                        <DatePicker type="date" placeholder="请选择投放开始时间..." style="width: 390px"
                            v-model="info.IsstartTime"></DatePicker>
                    </FormItem>
                    <FormItem label="结束投放时间:">
                        <!-- <Input v-model="info.endTime"></Input> -->
                        <DatePicker type="date" placeholder="请选择结束投放时间..." style="width: 390px"
                            v-model="info.IsendTime"></DatePicker>
                    </FormItem>
                </Form>
            </Modal>
        </div>
        <!-- 表格 -->
        <div class="layout-bootvideo-table">
            <Table border :columns="columns1" :data="data1"></Table>
        </div>
        <div class="layout-bootvideo-page">
            <Page :total="total" :current="page" :page-size="pageSize" @on-change="changePage" show-elevator />
        </div>
        <!-- 修改 -->
        <div>
            <Modal v-model="modalEdit" title="修改">
                <div slot="footer">
                    <a @click="modalEdit=false" class="span">取消</a>
                    <Button @click="editOk" type="primary">确定</Button>
                </div>
                <Form :model="edit" label-position="right" :label-width="100">
                    <FormItem label="视频名称:">
                        <Input v-model="edit.title" placeholder="请输入视频名称..."></Input>
                    </FormItem>
                    <FormItem label="视频地址:">
                        <!-- <Input v-model="edit.videoUrl" placeholder="请输入视频地址..."></Input> -->
                        <Upload :action="$config.BaseURLfile + '/common/upload/file'" ref="upload"
                            :on-success="handleSuccess" :with-credentials="true">
                            <Button icon="ios-cloud-upload-outline">上传视频地址</Button>
                        </Upload>
                    </FormItem>
                    <FormItem label="视频格式:">
                        <Input v-model="edit.videoFormat" placeholder="请输入视频格式..."></Input>
                    </FormItem>
                    <FormItem label="视频文件Md5值:">
                        <Input v-model="edit.videoMd5" placeholder="请输入视频文件Md5值..."></Input>
                    </FormItem>
                    <FormItem label="状态:" prop="status">
                        <Select v-model="edit.status" placeholder="请选择状态...">
                            <Option :value="1">上线</Option>
                            <Option :value="0">下线</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="排序:" prop="orderNum">
                        <Input v-model="edit.orderNum" placeholder="请输入排序..."></Input>
                    </FormItem>
                    <FormItem label="开始投放时间:">
                        <DatePicker type="date" placeholder="请选择投放开始时间..." style="width: 390px"
                            v-model="edit.IsstartTime"></DatePicker>
                    </FormItem>
                    <FormItem label="结束投放时间:">
                        <DatePicker type="date" placeholder="请选择结束投放时间..." style="width: 390px"
                            v-model="edit.IsendTime"></DatePicker>
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
                //添加
                info: {},
                modalAdd: false,
                //修改
                edit: {},
                modalEdit: false,
                addUploadUrl: '',
                editUploadUrl: '',//修改保存图片
                //全局
                id: [],
                //分页
                pageSize: 30,
                page: 1,
                total: 0,

                columns1: [
                    {
                        type: 'index',
                        width: 70,
                        title: '序号',
                        align: 'center'
                    },
                    {
                        title: '开机视频名称',
                        key: 'title',
                        align: 'center'
                    },
                    {
                        title: '视频地址',
                        key: 'videoUrl',
                        align: 'center',
                        render: (h, params) => {
                            return h('a', {
                                attrs: {
                                    href: params.row.videoUrl,
                                    target: '_black'
                                }
                            }, '下载')
                        }
                    },
                    {
                        title: '视频格式',
                        key: 'videoFormat',
                        align: 'center'
                    },
                    {
                        title: '视频文件Md5值',
                        key: 'videoMd5',
                        align: 'center',
                        width: 350
                    },
                    {
                        title: '状态',
                        key: 'Isstatus',
                        align: 'center'
                    },
                    {
                        title: '排序',
                        key: 'orderNum',
                        align: 'center'
                    },
                    {
                        title: '开始投放时间',
                        key: 'IsstartTime',
                        align: 'center'
                    },
                    {
                        title: '结束投放时间',
                        key: 'IsendTime',
                        align: 'center'
                    },
                    {
                        title: '操作',
                        width: 200,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                // h('Button', {
                                //     props: {
                                //         type: 'warning',
                                //         size: 'small'
                                //     },
                                //     style: {
                                //         marginRight: '5px'
                                //     },
                                //     on: {
                                //         click: () => {
                                //             this.info1(params.index)
                                //         }
                                //     }
                                // }, '查看详情'),
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
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
            //修改上传成功
            handleSuccess(res, file) {
                console.log(res)
                this.editUploadUrl = res.data.url
                console.log(this.editUploadUrl);
            },
            //添加上传成功
            handleSuccess1(res, file) {
                console.log(res)
                this.addUploadUrl = res.data.url
                console.log(this.addUploadUrl);
            },
            //表格数据
            getTableList() {
                let self = this;
                self.$http(this.$config.BaseURL3 + '/common/bootvideo/list?page=' + self.page + '&count=' + self.pageSize).then(response => {
                    if (response.data.errno == 10000) {
                        console.log(response)
                        self.data1 = response.data.data.list;
                        //分页
                        self.total = response.data.data.total;

                        //时间转换
                        response.data.data.list.forEach(val => {
                            val.IsstartTime = moment(val.startTime * 1000).format(
                                "YYYY-MM-DD"
                            )
                            val.IsendTime = moment(val.endTime * 1000).format(
                                "YYYY-MM-DD"
                            )

                            if (val.status == 1) {
                                val.Isstatus = '上线'
                            } else if (val.status == 0) {
                                val.Isstatus = '下线'
                            }
                        });

                    }
                }, response => { })
            },
            //添加
            addOk() {
                let self = this;
                //时间转换
                self.info.startTime = moment(self.info.IsstartTime).format(
                    "X"
                )
                self.info.endTime = moment(self.info.IsendTime).format(
                    "X"
                )
                self.info.videoUrl = this.addUploadUrl;
                self.$http.post(this.$config.BaseURL3 + '/common/bootvideo/update', self.info).then(response => {
                    if (response.data.errno == 10000) {
                        this.info = {};
                        this.getTableList();
                        this.modalAdd = false;
                        this.$Message.success('添加成功！')
                    }
                }, response => { })
            },
            addCancel() {
                this.info = {};
                this.modalAdd = false;
            },
            //修改
            modify(row) {
                this.editUploadUrl = '';
                row = JSON.parse(JSON.stringify(row))
                this.modalEdit = true;
                this.edit = row;
                this.id = row.id;
                console.log(this.id)
            },
            //修改确定
            editOk() {
                let self = this;
                //时间转换
                self.edit.startTime = moment(self.edit.IsstartTime).format(
                    "X"
                )
                self.edit.endTime = moment(self.edit.IsendTime).format(
                    "X"
                )
                if (this.editUploadUrl != '') {
                    self.edit.videoUrl = this.editUploadUrl;
                }
                self.$http.post(this.$config.BaseURL3 + '/common/bootvideo/update?id=' + self.id, self.edit).then(response => {
                    if (response.data.errno == 10000) {
                        self.edit = {};
                        self.getTableList();
                        this.modalEdit = false;
                        self.$Message.success('修改成功！')
                    }
                }, response => { })
            },
            //删除
            remove(index) {
                let self = this;
                self.$http(this.$config.BaseURL3 + '/common/bootvideo/del?id=' + this.data1[index].id).then(response => {
                    if (response.data.errno == 10000) {
                        this.$Message.success("删除成功");
                        this.getTableList()
                    }
                }, response => { })
            },
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