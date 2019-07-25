<style>
    .layout-terminal-page {
        float: right;
        margin-top: 10px;
    }
</style>
<template>
    <div class="layout-terminal">
        <div class="layout-terminal-search">
            <Form :model="search" label-position="right" inline>
                <FormItem label="类型:" :label-width="45">
                    <Select style="width:200px" v-model="search.type_id" placeholder="请选择类型...">
                        <Option v-for="item in typeId" :value="item.typename" :key="item.id">{{ item.typename }}</Option>
                    </Select>
                </FormItem>
                <FormItem label="厂商:" :label-width="40">
                    <Select style="width:200px" v-model="search.cus_id" placeholder="请选择厂商...">
                        <Option v-for="item in customerId" :value="item.cname" :key="item.id">{{ item.cname }}</Option>
                    </Select>
                </FormItem>
                <FormItem label="商用型号:" :label-width="80">
                    <Select style="width:200px" v-model="search.com_id" placeholder="请选择商用型号...">
                        <Option v-for="item in comodelId" :value="item.coname" :key="item.id">{{ item.coname }}</Option>
                    </Select>
                </FormItem>
                <FormItem label="内部型号:" :label-width="70">
                    <Select style="width:200px" v-model="search.ins_id" placeholder="请选择内部型号...">
                        <Option v-for="item in insmodelId" :value="item.insname" :key="item.id">{{ item.insname }}</Option>
                    </Select>
                </FormItem>
                <FormItem label="有线Mac:" :label-width="70">
                    <Input v-model="search.wiredmac" placeholder="请输入有线Mac..."></Input>
                </FormItem>
                <FormItem label="整机sn:" :label-width="60">
                    <Input v-model="search.wholesn" placeholder="请输入整机sn..."></Input>
                </FormItem>
                <FormItem label="生产日期:" :label-width="70">
                    <DatePicker type="date" placeholder="请选择生产日期..." style="width: 200px" v-model="search.startime"></DatePicker>
                </FormItem>
                <FormItem label="结束时间:" :label-width="70">
                    <DatePicker type="date" placeholder="请选择结束时间..." style="width: 200px" v-model="search.endtime"></DatePicker>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="query">搜索</Button>
                </FormItem>
            </Form>
        </div>
        <div class="layout-terminal-table">
            <Table border :columns="columns1" :data="data1"></Table>
        </div>
        <div class="layout-terminal-page">
            <Page :total="total" :current="1" :page-size="pageSize" @on-change="changePage" />
        </div>
        <Modal v-model="modalInfo" title="查看详情" width="700">
            <div>
                <div style="padding:10px">
                    <Row>
                        <Col span="8">
                        <p>无线Mac:{{news.wirelessmac}}</p>
                        </Col>
                        <Col span="8">
                        <p>板卡sn:{{news.boardsn}}</p>
                        </Col>
                        <Col span="8">
                        <p>整机sn:{{news.wholesn}}</p>
                        </Col>
                        <Col span="8">
                        <p>批次:{{news.batch}}</p>
                        </Col>
                        <Col span="8">
                        <p>订单号:{{news.order}}</p>
                        </Col>
                        <Col span="8">
                        <p>生产日期:{{news.protime}}</p>
                        </Col>
                        <Col span="8">
                        <p>生产工厂:{{news.channel}}</p>
                        </Col>
                        <Col span="8">
                        <p>ui版本:{{news.ui}}</p>
                        </Col>
                        <Col span="8">
                        <p>ssid:{{news.ssid}}</p>
                        </Col>
                        <Col span="8">
                        <p>固件版本:{{news.firmversion}}</p>
                        </Col>
                        <Col span="8">
                        <p>系统版本:{{news.sysversion}}</p>
                        </Col>
                        <Col span="8">
                        <p>系统版本:{{news.sysversion}}</p>
                        </Col>
                    </Row>
                </div>
            </div>
        </Modal>
    </div>
</template>
<script>
    var moment = require("moment");
    export default {
        data() {
            return {
                //搜索
                search: {
                    type_id: '',
                    cus_id: '',
                    com_id: '',
                    ins_id: '',
                    wholesn: '',
                    endtime: '',
                    startime: '',
                    wiredmac: ''
                },
                //分页
                total: 0,
                pageSize: 1,
                page: 1,
                //查看详情
                modalInfo: false,
                //一整行数据
                news: [],
                //搜索下拉框
                typeId: [],
                customerId: [],
                comodelId: [],
                insmodelId: [],
                //表格
                columns1: [
                    {
                        title: '序号',
                        type: 'index',
                        width: 70,
                        align: 'center'
                    },
                    {
                        title: '无线mac',
                        key: 'wirelessmac',
                        align: 'center'
                    },
                    {
                        title: 'cpuid',
                        key: 'cpuid',
                        align: 'center'
                    },
                    {
                        title: '板卡sn',
                        key: 'boardsn',
                        align: 'center'
                    },
                    {
                        title: '整机sn',
                        key: 'wholesn',
                        align: 'center'
                    },
                    {
                        title: '生产工厂',
                        key: 'channel',
                        align: 'center'
                    },
                    {
                        title: '量产激活日期',
                        key: 'activdata',
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
                                        icon: 'compose'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.info(params.index)
                                        }
                                    }
                                }, '查看详情')
                            ]);
                        }
                    }
                ],
                data1: []
            }
        },
        methods: {
            // tv/temp/query
            //表格数据
            getTableList() {
                let self = this;
                //时间转换
                self.search.startime = moment(self.search.startime).format(
                    "X"
                ) 
                self.search.endtime = moment(self.search.endtime).format(
                    "X"
                ) 
                let condition = JSON.stringify(self.search);
                self.$http(this.$config.BaseURL2 + '/tv/temp/query?condition=' + condition).then(response => {
                    console.log(response)
                    if (response.errno == 10000) {
                        //给表格赋值
                        self.data1 = response.data.data
                    } else {
                        self.$Message.info(response.data.errmsg)
                    }

                    //分页
                    self.total = response.data.data.total;

                }, response => { })
            },
            //搜索
            query() {
                this.getTableList()
            },
            //查看详情
            info(index) {
                this.news = this.data1[index]
                // console.log(this.news)
                this.modalInfo = true;
            },
            //类型下拉框
            getSelectList1() {
                // /tv/type/list
                let self = this;
                self.$http(this.$config.BaseURL2 + '/tv/type/list').then(response => {
                    self.typeId = response.data.data
                }, response => {

                })
            },
            //厂商下拉框
            getSelectList2() {
                // /tv/type/list
                let self = this;
                self.$http(this.$config.BaseURL2 + '/tv/customer/list').then(response => {
                    self.customerId = response.data.data
                }, response => {

                })
            },
            //商用型号下拉框
            getSelectList3() {
                // /tv/type/list
                let self = this;
                self.$http(this.$config.BaseURL2 + '/tv/comodel/list').then(response => {
                    self.comodelId = response.data.data
                }, response => {

                })
            },
            //内部型号下拉框
            getSelectList4() {
                // /tv/type/list
                let self = this;
                self.$http(this.$config.BaseURL2 + '/tv/insmodel/list').then(response => {
                    self.insmodelId = response.data.data
                }, response => {

                })
            },
            //分页
            changePage(page) {
                this.page = page;
                this.getTableList()
            }
        },
        mounted() {
            this.getTableList();
            this.getSelectList1();
            this.getSelectList2();
            this.getSelectList3();
            this.getSelectList4()
        }
    }
</script>