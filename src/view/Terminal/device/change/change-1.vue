<style>
    .layout-change-search {
        float: left;
    }

    .layout-change-add {
        float: right;
    }
</style>
<template>
    <div class="layout-change">
        <div class="layout-change-search">
            <Form :model="search" inline>
                <FormItem label="任务名称:" :label-width="70">
                    <Input v-model="search.taskName" style="width:200px;" placeholder="请输入任务名称..."></Input>
                </FormItem>
                <FormItem label="变更类型:" :label-width="70">
                    <Select v-model="search.changeType" style="width:200px">
                        <Option value="">全部</Option>
                        <Option :value="1">内部型号</Option>
                        <Option :value="2">渠道</Option>
                        <Option :value="3">批次</Option>
                        <Option :value="4">订单号</Option>
                        <Option :value="5">生产日期</Option>
                        <Option :value="6">生产工厂</Option>
                    </Select>
                </FormItem>
                <FormItem label="创建时间:" :label-width="70">
                    <DatePicker type="datetimerange" placement="bottom-end" placeholder="请选择创建时间..." style="width: 350px" v-model="timer"></DatePicker>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="query">搜索</Button>
                </FormItem>
            </Form>
        </div>
        <div class="layout-change-add">
            <Button type="success" @click="modalAdd = true;fromType=1">添加</Button>
            <Modal v-model="modalAdd" title="添加" @on-ok="okForm">
                <Form :model="info" label-position="right" :label-width="100">
                    <FormItem label="任务名称:">
                        <Input v-model="info.input1" placeholder="请输入任务名称..."></Input>
                    </FormItem>
                    <FormItem label="任务描述:">
                        <Input v-model="info.input2" placeholder="请输入任务描述..."></Input>
                    </FormItem>
                    <FormItem label="变更类型:">
                        <RadioGroup v-model="info.changeType">
                            <Row>
                                <Col span="8">
                                <Radio label="1">
                                    内部型号
                                </Radio>
                                </Col>
                                <Col span="8">
                                <Radio label="2">
                                    渠道
                                </Radio>
                                </Col>
                                <Col span="8">
                                <Radio label="3">
                                    批次
                                </Radio>
                                </Col>
                                <Col span="8">
                                <Radio label="4">
                                    订单号
                                </Radio>
                                </Col>
                                <Col span="8">
                                <Radio label="5">
                                    生产日期
                                </Radio>
                                </Col>
                                <Col span="8">
                                <Radio label="6">
                                    生产工厂
                                </Radio>
                                </Col>
                            </Row>
                        </RadioGroup>
                    </FormItem>
                    <!-- 内部型号 -->
                    <div v-if="info.changeType == 1">
                        <FormItem label="终端厂商:">
                            <!--  -->
                            <Select v-model="info.customerId" filterable remote :remote-method="getCustomerList" :loading="customerLoading" @on-change="getCommercialList('');getInsideList('')">
                                <Option v-for="(item, index) in customerList" :value="item._id" :key="index">{{ item.customerName }}</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="商用型号:">
                            <Select v-model="info.commercialId" filterable remote :remote-method="getCommercialList" :loading="commercialLoading">
                                <Option v-for="item in commercialList" :value="item._id" :key="item._id">{{ item.commercialName }}</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="变更内部型号:">
                            <Select v-model="info.insideId" filterable remote :remote-method="getInsideList" :loading="insideLoading">
                                <Option v-for="item in insideList" :value="item._id" :key="item._id">{{ item.insideName }}</Option>
                            </Select>
                        </FormItem>
                        <FormItem>
                            <Upload :action="$config.BaseURLfile + '/common/upload/file'" :on-success="handleSuccess" :with-credentials="true">
                                <Button icon="ios-cloud-upload-outline">上传终端附件</Button>
                            </Upload>
                        </FormItem>
                    </div>
                    <!-- 渠道 -->
                    <div v-if="info.changeType == 2">
                        <FormItem label="渠道:">
                            <Select v-model="info.model1">
                                <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select>
                        </FormItem>
                    </div>
                    <!-- 批次 -->
                    <div v-if="info.changeType == 3">
                        <FormItem label="批次:">
                            <Input v-model="info.input1" placeholder="请输入批次..."></Input>
                        </FormItem>
                    </div>
                    <!-- 订单号 -->
                    <div v-if="info.changeType == 4">
                        <FormItem label="订单号:">
                            <Input v-model="info.input1" placeholder="请输入订单号..."></Input>
                        </FormItem>
                    </div>
                    <!-- 生产日期 -->
                    <div v-if="info.changeType == 5">
                        <FormItem label="变更生产日期:">
                            <DatePicker type="date" placeholder="请输入变更生产日期..." style="width: 390px"></DatePicker>
                        </FormItem>
                        <FormItem>
                            <Upload :action="$config.BaseURLfile + '/common/upload/file'" :on-success="handleSuccess" :with-credentials="true">
                                <Button icon="ios-cloud-upload-outline">上传终端附件</Button>
                            </Upload>
                        </FormItem>
                    </div>
                    <!-- 生产工厂 -->
                    <div v-if="info.changeType == 6">
                        <FormItem label="生产工厂:">
                            <Input v-model="info.input1" placeholder="请输入生产工厂..."></Input>
                        </FormItem>
                    </div>
                </Form>
            </Modal>
        </div>
        <div style="clear: both;"></div>
        <div class="layout-change-table">
            <Table border :columns="columns1" :data="data1"></Table>
        </div>
        <!-- 详情 -->
        <div class="layout-change-details">
            <Modal v-model="modalDetails" title="详情">
                <p>
                    任务名称:{{news.taskName}}
                </p>
                <p>
                    <!-- 任务描述:{{news.}} -->
                </p>
                <p>
                    变更类型：{{ news.ISchangeType }}
                    
                    <Form>
                        <!-- 内部型号 -->
                        <div v-if="news.changeType == 1">
                            <FormItem label="终端厂商:">
                                <Select v-model="edit.model1">
                                    <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                </Select>
                            </FormItem>
                            <FormItem label="商用型号:">
                                <Select v-model="info.model1">
                                    <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                </Select>
                            </FormItem>
                            <FormItem label="变更内部型号:">
                                <Select v-model="info.model1">
                                    <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                </Select>
                            </FormItem>
                            <FormItem>
                                <Upload :action="$config.BaseURLfile + '/common/upload/file'" :on-success="handleSuccess" :with-credentials="true">
                                    <Button icon="ios-cloud-upload-outline">上传终端附件</Button>
                                </Upload>
                            </FormItem>
                        </div>
                        <!-- 渠道 -->
                        <div v-if="news.changeType == 2">
                            <FormItem label="渠道:">
                                <Select v-model="info.model1">
                                    <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                </Select>
                            </FormItem>
                        </div>
                        <!-- 批次 -->
                        <div v-if="news.changeType == 3">
                            <FormItem label="批次:">
                                <Input v-model="info.input1" placeholder="请输入批次..."></Input>
                            </FormItem>
                        </div>
                        <!-- 订单号 -->
                        <div v-if="news.changeType == 4">
                            <FormItem label="订单号:">
                                <Input v-model="info.input1" placeholder="请输入订单号..."></Input>
                            </FormItem>
                        </div>
                        <!-- 生产日期 -->
                        <div v-if="news.changeType == 5">
                            <FormItem label="变更生产日期:">
                                <DatePicker type="date" placeholder="请输入变更生产日期..." style="width: 390px"></DatePicker>
                            </FormItem>
                            <FormItem>
                                <Upload :action="$config.BaseURLfile + '/common/upload/file'" :on-success="handleSuccess" :with-credentials="true">
                                    <Button icon="ios-cloud-upload-outline">上传终端附件</Button>
                                </Upload>
                            </FormItem>
                        </div>
                        <!-- 生产工厂 -->
                        <div v-if="news.changeType == 6">
                            <FormItem label="生产工厂:">
                                <Input v-model="info.input1" placeholder="请输入生产工厂..."></Input>
                            </FormItem>
                        </div>
                    </Form>

                </p>
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
                    taskName: '',
                    changeType: '',
                },//搜索
                timer: [],
                info: {
                    changeType: '1'
                },
                modalAdd: false,
                cityList: [],//
                news: [],
                edit:{},
                modalDetails: false,
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
                        title: '变更类型',
                        key: 'ISchangeType',
                        align: 'center'
                    },
                    {
                        title: '变更数据',
                        key: 'changeValue',
                        align: 'center'
                    },
                    {
                        title: '执行结果',
                        key: 'result',
                        align: 'center'
                    },
                    {
                        title: '执行状态',
                        key: 'staISresulttus',
                        align: 'center'
                    },
                    {
                        title: '创建时间',
                        key: 'createTime',
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
                                            this.details(params.row)
                                        }
                                    }
                                }, '详情'),
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
                                            this.editor(params.row)
                                        }
                                    }
                                }, '编辑'),
                            ]);
                        }
                    }
                ],
                data1: [],

                customerList:[], // 厂商列表
                customerLoading:false, // 是否加载中状态
                // customerName: '', // 模糊查询
                commercialList:[], // 商用型号
                commercialLoading:false,
                insideList:[], // 内部型号
                insideLoading:false,

                fromType:1, // 1 添加 2 编辑

            }
        },
        methods: {
            //添加上传
            handleSuccess() {

            },
            // 表格数据
            getTableList() {
                let self = this;
                //	创建开始时间
                let startTime = moment(self.timer[0]).format("X");
                //	创建结束时间
                let endTime = moment(self.timer[1]).format("X");

                if (isNaN(startTime)) {
                    startTime = ''
                }
                if (isNaN(endTime)) {
                    endTime = ''
                }
                self.$http(this.$config.BaseURL2 + '/tv/change/list?taskName=' + self.search.taskName + '&changeType=' + self.search.changeType +
                    '&startTime=' + startTime + '&endTime=' + endTime).then(response => {
                        if (response.data.errno == 10000) {
                            self.data1 = response.data.data.list;
                            response.data.data.list.forEach(val => {
                                // 1 内部型号 2 渠道 3 批次 4 订单号 5 生产日期 6 生产工厂
                                if (val.changeType == 1) {
                                    val.ISchangeType = '内部型号'
                                } else if (val.changeType == 2) {
                                    val.ISchangeType = '渠道'
                                } else if (val.changeType == 3) {
                                    val.ISchangeType = '批次'
                                } else if (val.changeType == 4) {
                                    val.ISchangeType = '订单号'
                                } else if (val.changeType == 5) {
                                    val.ISchangeType = '生产日期'
                                } else if (val.changeType == 6) {
                                    val.ISchangeType = '生产工厂'
                                }


                                if (val.result == 1) {
                                    val.ISresult = '成功'
                                } else if (val.result == 0) {
                                    val.ISresult = '失败'
                                }
                            });
                        }
                    }, response => { })
            },
            //搜索
            query() {
                this.page = 1;
                this.getTableList()
            },
            details(row) {
                this.news = row;
                console.log(this.news);
                this.modalDetails = true;

            },

            // 终端厂商列表
            getCustomerList(name){
                this.customerLoading = true;
                if (typeof name == ''){
                    name = '';
                }
                console.log(name);
                this.$http.get(`${this.$config.BaseURL2}/tv/customer/list?customerName=${name}&pageSize=100`).then(response=>{
                    if(response.data.errno == 10000){
                        this.customerList = response.data.data.list;
                    }
                    this.customerLoading = false;
                });
            },

            // 商用型号
            getCommercialList(name){
                if (typeof name == ''){
                    name = '';
                }
                if (typeof this.info.customerId == '' || this.info.customerId == ''){
                    this.$Message.info('请先选择厂商');
                    return
                }
                this.commercialLoading = true;
                this.$http.get(`${this.$config.BaseURL2}/tv/commercialmodel/list?customerId=${this.info.customerId}&insideName=${name}&pageSize=30`).then(response=>{
                    if(response.data.errno == 10000){
                        this.commercialList = response.data.data.list;
                    }
                    this.commercialLoading = false;
                });
            },

            // 内部型号管理
            getInsideList(name){
                if (typeof name == ''){
                    name = '';
                }
                if (typeof this.info.customerId == '' || this.info.customerId == ''){
                    this.$Message.info('请先选择厂商');
                    return
                }
                this.insideLoading = true;
                this.$http.get(`${this.$config.BaseURL2}/tv/insidemodel/list?customerId=${this.info.customerId}&insideName=${name}&pageSize=30`).then(response=>{
                    if(response.data.errno == 10000){
                        this.insideList = response.data.data.list;
                    }
                    this.insideLoading = false;
                });
            },

            // 编辑
            editor(row){
                this.fromType = 2;
                console.log(row);
            },

            // 表单保存
            okForm(){
                if(this.fromType == 1){
                    // 调用添加保存

                }else{
                    // 调用编辑保存
                    
                }
            }


        },
        mounted() {
            this.getTableList();
            this.getCustomerList('');
        }
    }
</script>