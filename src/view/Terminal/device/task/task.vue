<style>
    .layout-task-search {
        float: left;
    }

    .layout-task-add {
        float: right;
    }

    .layout-task-page {
        float: right;
        margin-top: 10px;
    }

    .span {
        font-size: 14px;
        margin: 15px;
        color: #495060;
        padding-bottom: 20px;
    }

    .layout-task .ivu-poptip-confirm .ivu-poptip-body .ivu-icon {
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
    <div class="layout-task">
        <!-- 搜索 -->
        <div class="layout-task-search">
            <Form :model="search" inline>
                <FormItem label="终端厂商:" :label-width="70">
                    <Select v-model="search.customerId" style="width:200px">
                        <Option v-for="item in cityList" :value="item._id" :key="item._id">{{ item.customerName }}</Option>
                    </Select>
                </FormItem>
                <FormItem label="商用型号:" :label-width="70">
                    <Select v-model="search.commercialId" style="width:200px">
                        <Option v-for="item in cityList55" :value="item._id" :key="item._id">{{ item.commercialName }}</Option>
                    </Select>
                </FormItem>
                <FormItem label="内部型号:" :label-width="70">
                    <Select v-model="search.insideId" style="width:200px">
                        <Option v-for="item in cityList22" :value="item._id" :key="item._id">{{ item.insideName }}</Option>
                    </Select>
                </FormItem>
                <FormItem label="创建时间:" :label-width="70">
                    <DatePicker type="datetimerange" placement="bottom-end" placeholder="请选择创建时间..." style="width: 350px"
                        v-model="timer"></DatePicker>
                </FormItem>
                <FormItem label="执行状态:" :label-width="70">
                    <Select v-model="search.status" style="width:200px">
                        <Option value="">全部</Option>
                        <Option :value="1">导入中</Option>
                        <Option :value="2">导入成功</Option>
                        <Option :value="3">导入失败</Option>
                    </Select>
                </FormItem>
                <FormItem label="任务名称:" :label-width="70">
                    <Input v-model="search.taskName" style="width: 200px;" placeholder="请输入任务名称..."></Input>
                </FormItem>
                <FormItem :label-width="10">
                    <Button type="primary" @click="query()">搜索</Button>
                </FormItem>
                <FormItem style="float: right;">
                    <Button type="success" @click="modalAdd = true">添加</Button>
                </FormItem>
            </Form>
        </div>
        <!-- 添加 -->
        <div class="layout-task-add">
            <Modal v-model="modalAdd" title="添加">
                <div slot="footer">
                    <a @click="addCancel" class="span">取消</a>
                    <Button @click="addOk" type="primary">确定</Button>
                </div>
                <Form :model="info" label-position="right" :label-width="100" ref="info" :rules="ruleValidate">
                    <FormItem label="任务名称:" prop="taskName">
                        <Input v-model="info.taskName" placeholder="请输入任务名称..."></Input>
                    </FormItem>
                    <FormItem label="任务描述:">
                        <Input v-model="info.taskDescribe" type="textarea" :rows="4" placeholder="请输入任务描述..."></Input>
                    </FormItem>
                    <FormItem label="批次:">
                        <Input v-model="info.batch" placeholder="请输入批次..."></Input>
                    </FormItem>
                    <FormItem label="订单号:">
                        <Input v-model="info.orderNumber" placeholder="请输入订单号..."></Input>
                    </FormItem>
                    <FormItem label="生产日期:">
                        <Col span="12">
                        <DatePicker type="date" placeholder="请选择生产日期..." style="width: 390px" v-model="info.Is_productionTime"></DatePicker>
                        </Col>
                    </FormItem>
                    <FormItem label="生产工厂:">
                        <Input v-model="info.productionFactory" placeholder="请输入生产工厂..."></Input>
                    </FormItem>
                    <FormItem label="终端厂商:" prop="customerId">
                        <Select v-model="info.customerId" placeholder="请选择终端厂商..." @on-change="getChange">
                            <Option v-for="item in cityList" :value="item._id" :key="item._id">{{ item.customerName }}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="商用型号:" prop="commercialId">
                        <Select v-model="info.commercialId" placeholder="请选择商用型号..." @on-change="getChange1">
                            <Option v-for="item in cityList1" :value="item._id" :key="item._id">{{ item.commercialName
                                }}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="内部型号:" prop="insideId">
                        <Select v-model="info.insideId" placeholder="请选择内部型号...">
                            <Option v-for="item in cityList2" :value="item._id" :key="item._id">{{ item.insideName }}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="渠道:" prop="channelId">
                        <Select v-model="info.channelId" placeholder="请选择渠道...">
                            <Option v-for="item in cityList3" :value="item._id" :key="item._id">{{ item.channelName }}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="会员套餐:" prop="membersPackage">
                        <Select v-model="info.membersPackage" placeholder="请选择会员套餐...">
                            <Option :value="1">无</Option>
                            <Option :value="2">一月</Option>
                            <Option :value="3">一季度</Option>
                            <Option :value="4">半年</Option>
                            <Option :value="5">一年</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="申请人:">
                        <Input v-model="info.applicant" placeholder="请输入申请人..."></Input>
                    </FormItem>
                    <FormItem label="上传终端附件:">
                        <Upload :action="$config.BaseURLfile + '/common/upload/file'" ref="upload" :on-success="handleSuccess"
                            :with-credentials="true" :format="['excel','xlsx']" :on-format-error="handleFormatError">
                            <Button icon="ios-cloud-upload-outline" style="float: left;">上传终端附件</Button>
                        </Upload>
                        <Button type="success" @click="downloadExcel">下载模版</Button>
                    </FormItem>
                </Form>
            </Modal>
        </div>
        <div style="clear: both;"></div>
        <!-- 表格 -->
        <div class="layout-task-table">
            <Table border :columns="columns1" :data="data1"></Table>
        </div>
        <!-- 分页 -->
        <div class="layout-task-page">
            <Page :total="total" :current="page" :page-size='pageSize' @on-change="changePage" show-elevator />
        </div>
        <!-- 详情 -->
        <div class="layout-task-info">
            <Modal v-model="modalInfo" title="详情" width="700">
                <Row>
                    <Col span="8"> 任务名称:{{news.taskName}}
                    </Col>

                    <Col span="8"> 批次:{{news.batch}}
                    </Col>
                    <Col span="8"> 订单号:{{news.orderNumber}}
                    </Col>
                    <Col span="8"> 生产日期:{{news.productionTime}}
                    </Col>
                    <Col span="8"> 生产工厂:{{news.productionFactory}}
                    </Col>
                    <Col span="8"> 终端厂商:{{news.customerName}}
                    </Col>
                    <Col span="8"> 商用型号:{{news.commercialName}}
                    </Col>
                    <Col span="8"> 内部型号:{{news.insideName}}
                    </Col>
                    <Col span="8"> 渠道:{{news.channelValue}}
                    </Col>
                    <Col span="8"> 申请人:{{news.applicant}}
                    </Col>
                    <Col span="8"> 执行结果:{{news.result}}
                    </Col>
                    <Col span="8"> 执行状态:{{news.ISstatus}}
                    </Col>
                    <Col span="8"> 创建人:{{news.createUser}}
                    </Col>
                    <Col span="8"> 创建时间:{{news.createTime}}
                    </Col>
                    <Col span="24">
                    <div style="word-break: break-all;word-wrap: break-word;">
                        任务描述:{{news.taskDescribe}}
                    </div>
                    </Col>
                </Row>
            </Modal>
        </div>
        <!-- 执行结果 -->
        <div>
            <Modal v-model="modalRes" title="执行结果" width="1100">
                <Table border :columns="columns2" :data="data2"></Table>
            </Modal>
        </div>
        <div class="layout-task-edit">
            <Modal v-model="modalEdit" title="修改">
                <div slot="footer">
                    <a @click="modalEdit=false" class="span">取消</a>
                    <Button @click="editOk" type="primary">确定</Button>
                </div>
                <Form :model="edit" label-position="right" :label-width="100" ref="edit" :rules="ruleValidate">
                    <FormItem label="任务名称:" prop="taskName">
                        <Input v-model="edit.taskName" placeholder="请输入任务名称..."></Input>
                    </FormItem>
                    <FormItem label="任务描述:">
                        <Input v-model="edit.taskDescribe" type="textarea" :rows="4" placeholder="请输入任务描述..."></Input>
                    </FormItem>
                    <FormItem label="批次:">
                        <Input v-model="edit.batch" placeholder="请输入批次..."></Input>
                    </FormItem>
                    <FormItem label="订单号:">
                        <Input v-model="edit.orderNumber" placeholder="请输入订单号..."></Input>
                    </FormItem>
                    <FormItem label="生产日期:">
                        <Col span="12">
                        <DatePicker type="date" placeholder="请选择生产日期..." style="width: 390px" v-model="edit.productionTime"></DatePicker>
                        </Col>
                    </FormItem>
                    <FormItem label="生产工厂:">
                        <Input v-model="edit.productionFactory" placeholder="请输入生产工厂..."></Input>
                    </FormItem>
                    <FormItem label="终端厂商:">
                        <Select v-model="edit.customerId" placeholder="请选择终端厂商..." @on-change="getChange">
                            <Option v-for="item in cityList" :value="item._id" :key="item._id">{{ item.customerName }}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="商用型号:">
                        <Select v-model="edit.commercialId" placeholder="请选择商用型号..." @on-change="getChange1">
                            <Option v-for="item in cityList1" :value="item._id" :key="item._id">{{
                                item.commercialName}}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="内部型号:">
                        <Select v-model="edit.insideId" placeholder="请选择内部型号...">
                            <Option v-for="item in cityList2" :value="item._id" :key="item._id">{{ item.insideName }}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="渠道:">
                        <Select v-model="edit.channelId" placeholder="请选择渠道...">
                            <Option v-for="item in cityList3" :value="item._id" :key="item._id">{{ item.channelName }}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="会员套餐:" prop="membersPackage">
                        <Select v-model="edit.membersPackage" placeholder="请选择会员套餐...">
                            <Option :value="1">无</Option>
                            <Option :value="2">一月</Option>
                            <Option :value="3">一季度</Option>
                            <Option :value="4">半年</Option>
                            <Option :value="5">一年</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="申请人:">
                        <Input v-model="edit.applicant" placeholder="请输入申请人..."></Input>
                    </FormItem>
                    <FormItem label="上传终端附件:">
                        <Upload :action="$config.BaseURLfile + '/common/upload/file'" ref="upload1" :on-success="handleSuccess1"
                            :with-credentials="true" :format="['excel','xlsx']" :on-format-error="handleFormatError">
                            <Button icon="ios-cloud-upload-outline">上传终端附件</Button>
                        </Upload>
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
                info: {},
                modalAdd: false,//添加
                news: {},
                modalInfo: false,//详情
                page: 1,
                total: 0,
                pageSize: 30,//分页
                cityList3: [],
                addUploadUrl: [],
                editUploadUrl: [],
                id: '',//一整行id
                edit: {},
                modalEdit: false,
                search: {
                    customerId: '',
                    channelId: '',
                    commercialId: '',
                    taskName: '',
                    status: '',
                    createTime: '',
                },
                timer: [],
                cityList: [],
                cityList1: [],
                cityList2: [],
                cityList5: [],
                cityList22: [],
                cityList55: [],
                modalRes: false,
                columns1: [
                    {
                        type: 'index',
                        width: 70,
                        align: 'center',
                        title: '序号'
                    },
                    {
                        title: '任务名称',
                        key: 'taskName',
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
                        title: '执行结果',
                        key: 'result',
                        align: 'center'
                    },
                    {
                        title: '执行状态',
                        key: 'ISstatus',
                        align: 'center'
                    },
                    {
                        title: '创建时间',
                        key: 'createTime',
                        align: 'center'
                    },
                    {
                        title: '操作',
                        width: 220,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'warning',
                                        size: 'small',
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.details(params.row)
                                        }
                                    }
                                }, '详情'),
                                h('Button', {
                                    props: {
                                        type: 'success',
                                        size: 'small',
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.results(params.row)

                                        }
                                    }
                                },
                                    params.row.status == '导入中' ? '导入中' : '异常结果'
                                ),
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
                                            this.Additional(params.row)
                                        }
                                    }
                                }, '追加任务')
                            ]);
                        }
                    }
                ],
                data1: [],
                columns2: [
                    {
                        title: 'mac',
                        key: 'mac'
                    },
                    {
                        title: '无线mac',
                        key: 'wirelessMac'
                    },
                    {
                        title: 'cpuid',
                        key: 'cpuId'
                    },
                    {
                        title: '板卡sn',
                        key: 'boardCardSn'
                    },
                    {
                        title: '整机sn',
                        key: 'completeMachineSn'
                    },
                    {
                        title: 'HDCPKey',
                        key: 'hdcpKey'
                    },
                    {
                        title: '导入结果',
                        key: 'result'
                    },
                    {
                        title: '失败原因',
                        key: 'failReason'
                    }
                ],
                data2: [],
                ruleValidate: {
                    taskName: [
                        { required: true, message: '请输入任务名称...', trigger: 'blur' }
                    ],
                    customerId: [
                        { required: true, message: '请选择终端厂商...', trigger: 'change' }
                    ],
                    commercialId: [
                        { required: true, message: '请选择商用型号...', trigger: 'change' }
                    ],
                    insideId: [
                        { required: true, message: '请选择内部型号...', trigger: 'change' }
                    ],
                    channelId: [
                        { required: true, message: '请选择渠道...', trigger: 'change' }
                    ],
                    membersPackage: [
                        { required: true, message: '请选择会员套餐...', trigger: 'blur', type: 'number' }
                    ]
                }
            }
        },
        methods: {
            //添加上传成功
            handleSuccess(res, file) {
                console.log(res)
                this.addUploadUrl = res.data.url;
                console.log(this.addUploadUrl)
            },
            // 上传格式验证
            handleFormatError(file) {
                this.$Notice.warning({
                    title: '文件格式不正确',
                    desc: '文件格式' + '文件名' + '不正确，请选择excel或xlsx格式'
                });
            },
            handleSuccess1(res, file) {
                console.log(res)
                this.editUploadUrl = res.data.url
                console.log(this.addUploadUrl);
            },
            //表格数据
            getTableList() {
                let self = this;
                //	创建开始时间
                let startTime = moment(self.timer[0]).format("X");
                //	创建结束时间
                let endTime = moment(self.timer[1]).format("X");
                if (this.search.status == undefined) {
                    this.search.status = ""
                }

                if (isNaN(startTime)) {
                    startTime = ''
                }
                if (isNaN(endTime)) {
                    endTime = ''
                }  
                self.$http(this.$config.BaseURL2 + '/tv/task/list?customerId=' + self.search.customerId + '&channelId=' + self.search.channelId
                    + '&commercialId=' + self.search.commercialId + '&taskName=' + self.search.taskName + '&status=' + self.search.status + '&startTime=' + startTime
                    + '&endTime=' + endTime + '&page=' + this.page + '&pageSize=' + self.pageSize).then(response => {
                        if (response.data.errno == 10000) {
                            console.log(response)
                            self.data1 = response.data.data.list;
                            //分页
                            self.total = response.data.data.total;
                            // 1导入中 2 导入成功 3 导入失败
                            response.data.data.list.forEach(val => {
                                if (val.status == 1) {
                                    val.ISstatus = "导入中"
                                } else if (val.status == 2) {
                                    val.ISstatus = "导入成功"
                                } else if (val.status == 3) {
                                    val.ISstatus = "导入失败"
                                }
                            });
                        }
                    })
            },
            //厂商下拉框
            getSelect() {
                let self = this;
                self.$http(this.$config.BaseURL2 + '/tv/customer/list').then(response => {
                    if (response.data.errno == 10000) {
                        console.log(response)
                        self.cityList = response.data.data.list;
                    }
                })
            },
            getSelect1() {
                let self = this;
                self.$http(this.$config.BaseURL2 + '/tv/commercialmodel/list').then(response => {
                    if (response.data.errno == 10000) {
                        console.log(response)
                        self.cityList55 = response.data.data.list;
                    }
                })
            },
            getSelect2() {
                let self = this;
                self.$http(this.$config.BaseURL2 + '/tv/insidemodel/list').then(response => {
                    if (response.data.errno == 10000) {
                        console.log(response)
                        self.cityList22 = response.data.data.list;
                    }
                })
            },
            getChange(val, clear) {
                console.log(1111)
                let self = this;
                if (typeof clear == 'undefined') {
                    this.edit.commercialId = '';
                }
                self.$http(this.$config.BaseURL2 + '/tv/commercialmodel/list?customerId=' + val).then(response => {
                    if (response.data.errno == 10000) {
                        console.log(response)
                        self.cityList1 = response.data.data.list;
                    }
                })
            },
            getChange1(val, clear) {
                let self = this;
                if (typeof clear == 'undefined') {
                    this.edit.insideId = '';
                }
                self.$http(this.$config.BaseURL2 + '/tv/insidemodel/list?commercialId=' + val).then(response => {
                    if (response.data.errno == 10000) {
                        self.cityList2 = response.data.data.list;
                    }
                })
            },
            getSelect3() {
                let self = this;
                self.$http(this.$config.BaseURL2 + '/tv/channel/list').then(response => {
                    if (response.data.errno == 10000) {
                        self.cityList3 = response.data.data.list;
                    }
                })
            },
            query() {
                this.getTableList();
            },
            //详情
            details(row) {
                console.log(row)
                if (row.status == 1) {
                    row.ISstatus = "导入中"
                } else if (row.status == 2) {
                    row.ISstatus = "导入成功"
                } else if (row.status == 3) {
                    row.ISstatus = "导入失败"
                }
                row.IsproductionTime = moment(row.productionTime).format(
                    "YYYY-MM-DD")
                this.news = row;

                this.modalInfo = true;
            },
            //执行结果
            results(row) {
                // console.log(row)
                let self = this;
                if (row.status == "导入中") {
                    this.$Message.warning('导入中不能点击！');
                    return;
                }
                self.$http(this.$config.BaseURL2 + '/tv/task/result?taskId=' + row._id).then(response => {
                    if (response.data.errno == 10000) {
                        console.log(response)
                        self.data2 = response.data.data.list;
                    }
                })

                this.modalRes = true;
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
                self.info.file = this.addUploadUrl;
                self.info.productionTime = moment(self.info.Is_productionTime).format(
                    "X")
                self.$http.post(this.$config.BaseURL2 + '/tv/device/importTask', self.info).then(response => {
                    if (response.data.errno == 10000) {
                        console.log(response)
                        self.info = {};
                        self.modalAdd = false;
                        self.getTableList();
                        self.$Message.success('添加成功！')
                    }
                })
            },
            //添加取消按钮
            addCancel() {
                this.info = {};
                this.modalAdd = false;
            },
            //分页
            changePage(page) {
                this.page = page;
                this.getTableList();
            },
            // 追加任务
            Additional(row) {
                console.log(row)
                this.editUploadUrl = '';
                row = JSON.parse(JSON.stringify(row))
                this.edit = row;
                this.id = row._id;
                this.modalEdit = true;
                this.getChange(row.customerId, true);
                this.getChange1(row.commercialId, true);
                this.$refs.upload1.clearFiles();
            },
            //追加任务确定按钮
            editOk() {
                let self = this;
                if (this.editUploadUrl != '') {
                    self.edit.file = this.editUploadUrl;
                }
                self.$http.post(this.$config.BaseURL2 + '/tv/device/importTask', self.edit).then(response => {
                    if (response.data.errno == 10000) {
                        self.modalEdit = false;
                        this.getTableList();
                        this.$Message.success('追加成功！')
                    }
                })
            },
            // 下载模版
            downloadExcel() {
                let self = this;
                window.open('http://static2.ptxstv.gitv.tv/upload/181127/xlsx/1756361e03398d8bb750b3a41bf4e3bc237da3.xlsx', '_blank')
            }
        },
        mounted() {
            this.getTableList();
            this.getSelect();
            this.getSelect1();
            this.getSelect2()
            this.getSelect3();
        }
    }
</script>