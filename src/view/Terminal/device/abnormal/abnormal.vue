<style>
    .layout-abnormal-page {
        float: right;
        margin-top: 10px;
    }

    .span {
        font-size: 14px;
        margin: 15px;
        color: #495060;
        padding-bottom: 20px;
    }

    .layout-abnormal .ivu-poptip-confirm .ivu-poptip-body .ivu-icon {
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
    <div class="layout-abnormal">
        <div class="layout-abnormal-search">
            <Form :model="search" label-position="right" inline>
                <FormItem label="mac:" :label-width="40">
                    <Input v-model="search.mac" style="width: 200px;" placeholder="请输入mac..."></Input>
                </FormItem>
                <FormItem label="整机sn:" :label-width="60">
                    <Input v-model="search.completeMachineSn" style="width: 200px;" placeholder="请输入整机sn..."></Input>
                </FormItem>
                <FormItem label="cpuid:" :label-width="50">
                    <Input v-model="search.cpuId" style="width: 200px;" placeholder="请输入cpuid..."></Input>
                </FormItem>
                <FormItem label="板卡sn:" :label-width="60">
                    <Input v-model="search.boardCardSn" style="width: 200px;" placeholder="请输入板卡sn..."></Input>
                </FormItem>
                <FormItem label="终端厂商:" :label-width="80">
                    <Select v-model="search.customerId" style="width:200px" placeholder="请选择终端厂商...">
                        <Option v-for="item in cityList" :value="item._id" :key="item._id">{{item.customerName}}</Option>
                    </Select>
                </FormItem>
                <FormItem label="商用型号:" :label-width="65">
                    <Select v-model="search.commercialId" style="width:200px" placeholder="请选择商用型号...">
                        <Option v-for="item in cityList1" :value="item._id" :key="item._id">{{ item.commercialName }}</Option>
                    </Select>
                </FormItem>
                <FormItem label="内部型号:" :label-width="80">
                    <Select v-model="search.insideId" style="width:200px" placeholder="请选择内部型号...">
                        <Option v-for="item in cityList2" :value="item._id" :key="item._id">{{ item.insideName }}</Option>
                    </Select>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="query()">搜索</Button>
                </FormItem>
            </Form>
        </div>
        <div class="layout-abnormal-table">
            <Table border :columns="columns1" :data="data1"></Table>
        </div>
        <div class="layout-abnormal-page">
            <Page :total="total" :current="page" :page-size='pageSize' @on-change="changePage" show-elevator />
        </div>
        <!-- 修改 -->
        <div class="layout-abnormal-edit">
            <Modal v-model="modalEdit" title="变更">
                <div slot="footer">
                    <a @click="modalEditBtn" class="span">取消</a>
                    <Button @click="editOk" type="primary">变更</Button>
                </div>
                <Form :model="edit" label-position="right" :label-width="100">
                    <FormItem label="cpuid">
                        <Input v-model="edit.cpuId" disabled></Input>
                    </FormItem>
                    <FormItem label="商用型号:">
                        <Input v-model="edit.commercialId" disabled></Input>
                    </FormItem>
                    <FormItem label="mac:">
                        <Input v-model="edit.mac" disabled></Input>
                    </FormItem>
                    <FormItem label="无线mac:">
                        <Input v-model="edit.wirelessMac" disabled></Input>
                    </FormItem>
                    <FormItem label="板卡sn:">
                        <Input v-model="edit.boardCardSn" disabled></Input>
                    </FormItem>
                    <FormItem label="整机sn:">
                        <Input v-model="edit.completeMachineSn" disabled></Input>
                    </FormItem>
                    <FormItem label="内部型号:">
                        <Input v-model="edit.insideId" disabled></Input>
                    </FormItem>
                    <FormItem label="异常原因:">
                        <Input v-model="edit.abnormalReason" disabled></Input>
                    </FormItem>
                    <FormItem label="上报mac:">
                        <Input v-model="EditList.mac" disabled></Input>
                    </FormItem>
                    <FormItem label="上报无线mac:">
                        <Input v-model="EditList.wirelessMac" disabled></Input>
                    </FormItem>
                    <FormItem label="上报板卡sn:">
                        <Input v-model="EditList.boardCardSn" disabled></Input>
                    </FormItem>
                    <FormItem label="上报整机sn:">
                        <Input v-model="EditList.completeMachineSn" disabled></Input>
                    </FormItem>
                </Form>
            </Modal>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                search: {
                    customerId: '',
                    insideId: '',
                    commercialId: '',
                    completeMachineSn: '',
                    boardCardSn: '',
                    cpuId: '',
                    mac: ''
                },
                cityList: [],
                cityList1: [],
                cityList2: [],
                edit: {},
                modalEdit: false,//修改
                page: 1,
                pageSize: 30,
                total: 0,//分页
                cpuListId: '',//一整行id
                EditList: [],
                columns1: [
                    {
                        type: 'index',
                        width: 70,
                        align: 'center',
                        title: '序号'
                    },
                    {
                        title: 'mac',
                        key: 'mac',
                        align: 'center',
                        width: 120
                    },
                    {
                        title: 'cpuid',
                        key: 'cpuId',
                        align: 'center',
                        width: 170
                    },
                    {
                        title: '板卡sn',
                        key: 'boardCardSn',
                        align: 'center',
                        width: 130
                    },
                    {
                        title: '整机sn',
                        key: 'completeMachineSn',
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
                        title: '异常原因',
                        key: 'abnormalReason',
                        align: 'center'
                    },
                    {
                        title: '最后上报时间',
                        key: 'lastVisitTime',
                        align: 'center',
                        width: 170
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
                                }, '变更'),
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
                        },
                    }
                ],
                data1: []
            }
        },
        methods: {
            //表格
            getTableList() {
                let self = this;
                self.$http(this.$config.BaseURL2 + '/tv/abnormal/list?mac=' + self.search.mac + '&cpuId=' + self.search.cpuId
                    + '&boardCardSn=' + self.search.boardCardSn + '&completeMachineSn=' + self.search.completeMachineSn
                    + '&commercialId=' + self.search.commercialId + '&insideId=' + self.search.insideId + '&customerId=' + self.search.customerId
                    + '&page=' + self.page + '&pageSize=' + self.pageSize).then(response => {
                        if (response.data.errno == 10000) {
                            console.log(response)
                            self.data1 = response.data.data.list;

                            self.total = response.data.data.total;
                        }
                    }, response => { })
            },
            //厂商下拉框
            getSelect() {
                let self = this;
                self.$http(this.$config.BaseURL2 + '/tv/customer/list').then(response => {
                    if (response.data.errno == 10000) {
                        console.log(response)
                        this.cityList = response.data.data.list;
                    }
                }, response => { })
            },
            getSelect1() {
                let self = this;
                self.$http(this.$config.BaseURL2 + '/tv/commercialmodel/list').then(response => {
                    if (response.data.errno == 10000) {
                        console.log(response)
                        this.cityList1 = response.data.data.list;
                    }
                }, response => { })
            },
            getSelect2() {
                let self = this;
                self.$http(this.$config.BaseURL2 + '/tv/insidemodel/list').then(response => {
                    if (response.data.errno == 10000) {
                        self.cityList2 = response.data.data.list;
                    }
                }, response => { })
            },
            //搜索
            query() {
                this.page = 1;
                this.getTableList()
            },
            //分页
            changePage(page) {
                this.page = page;
                this.getTableList()
            },
            //变更
            modify(row) {
                console.log(row)
                let self = this;
                this.cpuListId = row.cpuId;
                self.$http(this.$config.BaseURL2 + '/tv/device/list?cpuId=' + row.cpuId).then(response => {
                    if (response.data.errno == 10000) {
                        console.log(response)
                        this.edit = response.data.data.list[0];
                    }
                }, response => { })
                this.EditList = row;
                this.modalEdit = true;
            },
            //变更数据接口
            editOk() {
                let self = this;
                self.$http.post(this.$config.BaseURL2 + '/tv/abnormal/change?cpuId=' + this.cpuListId, self.edit).then(response => {
                    if (response.data.errno == 10000) {
                        this.modalEdit = false;
                        this.getTableList();
                        this.$Message.success('变更成功！')
                    }
                }, response => [])
            },
            // 
            modalEditBtn() {
                this.modalEdit = false;
                this.getTableList();
            },
            // 删除
            remove(row) {
                let self = this;
                self.$http(this.$config.BaseURL2 + '/tv/abnormal/del?_id=' + row._id).then(response => {
                    if (response.data.errno == 10000) {
                        this.getTableList();
                        this.$Message.success('删除成功！');
                    }
                }, response => { })
            }
        },
        mounted() {
            this.getTableList();
            this.getSelect();
            this.getSelect1();
            this.getSelect2();
            // this.getChangeList() 
        }
    }
</script>