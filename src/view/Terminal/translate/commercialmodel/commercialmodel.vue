<style>
    .layout-commercialmodel-search {
        float: left;
    }

    .layout-commercialmodel-add {
        float: right;
    }

    .span {
        font-size: 14px;
        margin: 15px;
        color: #495060;
        padding-bottom: 20px;
    }

    .layout-commercialmodel-page {
        float: right;
        margin-top: 10px;
    }

    .ivu-table th,
    .ivu-table td {
        height: 40px;
    }

    .layout-commercialmodel .ivu-poptip-confirm .ivu-poptip-body .ivu-icon {
        font-size: 16px;
        color: #ff9900;
        line-height: 18px;
        position: absolute;
        margin-left: -50px;
    }
</style>
<template>
    <div class="layout-commercialmodel">
        <!-- 搜素 -->
        <div class="layout-commercialmodel-search">
            <Form :model="search" label-position="right" inline>
                <FormItem label="商用型号:" :label-width="70">
                    <Input v-model="search.commercialName" style="width:200px" placeholder="请输入商用型号..."></Input>
                </FormItem>
                <FormItem label="终端厂商:" :label-width="70">
                    <Select v-model="search.customerId" style="width:200px">
                        <Option v-for="item in cityList" :value="item._id" :key="item._id">{{ item.customerName }}</Option>
                    </Select>
                </FormItem>
                <FormItem label="主芯片:" :label-width="70">
                    <Select v-model="search.mainChipId" style="width:200px">
                        <Option v-for="item in cityList1" :value="item._id" :key="item._id">{{ item.mainChipName }}</Option>
                    </Select>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click='query()'>搜索</Button>
                </FormItem>
            </Form>
        </div>
        <!-- 添加 -->
        <div class="layout-commercialmodel-add">
            <Button type="success" @click="modalAdd = true">添加</Button>
            <Modal v-model="modalAdd" title="添加">
                <div slot="footer">
                    <a @click="addCancel" class="span">取消</a>
                    <Button @click="addOk" type="primary">确定</Button>
                </div>
                <Form :model="info" label-position="right" :label-width="100" ref="info" :rules="ruleValidate">
                    <FormItem label="商用型号:" prop="commercialName">
                        <Input v-model="info.commercialName" placeholder="请输入商用型号..."></Input>
                    </FormItem>
                    <FormItem label="所属厂商:" prop="customerId">
                        <Select v-model="info.customerId" placeholder="请输入所属厂商...">
                            <Option v-for="item in cityList2" :value="item._id" :key="item._id">{{ item.customerName }}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="终端类型:" prop="typeId">
                        <Select v-model="info.typeId" placeholder="请输入终端类型...">
                            <Option v-for="item in cityList4" :value="item._id" :key="item._id">{{ item.typeName }}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="主芯片:" prop="mainChipId">
                        <Select v-model="info.mainChipId" placeholder="请输入主芯片...">
                            <Option v-for="item in cityList3" :value="item._id" :key="item._id">{{ item.mainChipName }}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="描述:">
                        <Input v-model="info.desc" type="textarea" :rows="4" placeholder="请输入描述..."></Input>
                    </FormItem>
                </Form>
            </Modal>
        </div>
        <div style="clear: both;"></div>
        <!-- 表格 -->
        <div class="layout-commercialmodel-table">
            <Table border :columns="columns1" :data="data1"></Table>
        </div>
        <div class="layout-commercialmodel-page">
            <Page :total="total" :current="page" :page-size='pageSize' @on-change="changePage" show-elevator />
        </div>
        <!-- 修改 -->
        <div class="layout-commercialmodel-edit">
            <Modal v-model="modalEdit" title="修改">
                <div slot="footer">
                    <a @click="modalEdit=false" class="span">取消</a>
                    <Button @click="editOk" type="primary">确定</Button>
                </div>
                <Form :model="edit" label-position="right" :label-width="100" ref="edit" :rules="ruleValidate">
                    <FormItem label="ID:">
                        <Input v-model="edit._id" disabled></Input>
                    </FormItem>
                    <FormItem label="商用型号:" prop="commercialName">
                        <Input v-model="edit.commercialName" placeholder="请输入商用型号..."></Input>
                    </FormItem>
                    <FormItem label="所属厂商:">
                        <Select v-model="edit.customerId" placeholder="请输入所属厂商...">
                            <Option v-for="item in cityList2" :value="item._id" :key="item._id">{{ item.customerName }}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="终端类型:">
                        <Select v-model="edit.typeId" placeholder="请输入终端类型...">
                            <Option v-for="item in cityList4" :value="item._id" :key="item._id">{{ item.typeName }}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="主芯片:" prop="mainChipId">
                        <Select v-model="edit.mainChipId" placeholder="请输入主芯片...">
                            <Option v-for="item in cityList3" :value="item._id" :key="item._id">{{ item.mainChipName }}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="创建时间:">
                        <Input placeholder="请输入描述..." v-model="edit.createTime" disabled></Input>
                    </FormItem>
                    <FormItem label="描述:">
                        <Input v-model="edit.desc" type="textarea" :rows="4" placeholder="请输入描述..."></Input>
                    </FormItem>
                </Form>
            </Modal>
        </div>
        <!-- 终端修改 -->
        <div class="layout-commercialmodel-parameter">
            <Modal v-model="modalParameter" title="终端参数" width='650'>
                <div slot="footer">
                    <a @click="modalParameter=false" class="span">取消</a>
                    <Button @click="newsOk" type="primary">确定</Button>
                </div>
                <Form :model="news" label-position="right" :label-width="100" ref="news" :rules="ruleValidate">
                    <Row>
                        <Col span="12">
                        <FormItem label="商用型号:">
                            <Input v-model="news.commercialName" style="width: 200px;" disabled></Input>
                        </FormItem>
                        </Col>
                        <Col span="12">
                        <FormItem label="所属厂商:">
                            <Select v-model="news.customerId" style="width: 200px;" placeholder="请输入所属厂商..." disabled>
                                <Option v-for="item in cityList2" :value="item._id" :key="item._id">{{ item.customerName }}</Option>
                            </Select>
                        </FormItem>
                        </Col>
                        <Col span="12">
                        <FormItem label="终端类型:">
                            <Select v-model="news.typeId" style="width: 200px;" placeholder="请输入终端类型..." disabled>
                                <Option v-for="item in cityList4" :value="item._id" :key="item._id">{{ item.typeName }}</Option>
                            </Select>
                        </FormItem>
                        </Col>
                        <Col span="12">
                        <FormItem label="主芯片:">
                            <Select v-model="news.mainChipId" style="width: 200px;" placeholder="请输入主芯片..." disabled>
                                <Option v-for="item in cityList3" :value="item._id" :key="item._id">{{ item.mainChipName }}</Option>
                            </Select>
                        </FormItem>
                        </Col>
                    </Row>
                    <FormItem label="是否支持4K:" prop="support4k">
                        <RadioGroup>
                            <Radio label="是" :true-value="1" :false-value="0" v-model="news.support4k"></Radio>
                            <Radio label="否" :true-value="0" :false-value="1" v-model="news.support4k"></Radio>
                        </RadioGroup>
                    </FormItem>
                    <FormItem label="是否支持dolby:" prop="supportDolby">
                        <RadioGroup>
                            <Radio label="是" :true-value="1" :false-value="0" v-model="news.supportDolby"></Radio>
                            <Radio label="否" :true-value="0" :false-value="1" v-model="news.supportDolby"></Radio>
                        </RadioGroup>
                    </FormItem>
                    <FormItem label="是否支持dts:" prop="supportDts">
                        <RadioGroup>
                            <Radio label="是" :true-value="1" :false-value="0" v-model="news.supportDts"></Radio>
                            <Radio label="否" :true-value="0" :false-value="1" v-model="news.supportDts"></Radio>
                        </RadioGroup>
                    </FormItem>
                    <FormItem label="flash大小:" prop="flashSize">
                        <Input v-model="news.flashSize"></Input>
                    </FormItem>
                    <FormItem label="内存大小:" prop="memorySize">
                        <Input v-model="news.memorySize"></Input>
                    </FormItem>
                    <FormItem label="屏参:" prop="screenParameter">
                        <Input v-model="news.screenParameter"></Input>
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
                    commercialName: '',
                    customerId: '',
                    mainChipId: ''
                },//搜索
                cityList: [],//下拉框
                cityList1: [],
                cityList2: [],
                cityList3: [],
                cityList4: [],
                info: {},
                modalAdd: false, //添加 
                edit: {},
                modalEdit: false,

                id: '',//一整行id
                id1: '',
                //终端参数
                news: {},
                modalParameter: false,
                total: 0,//分页
                page: 1,
                pageSize: 30,
                //验证
                ruleValidate: {
                    commercialName: [
                        { required: true, message: '请输入商用型号...', trigger: 'blur' }
                    ],
                    customerId: [
                        // {required: true, message: '请选择所属厂商...', trigger: 'blur'}
                        { required: true, message: '请选择厂商类别...', trigger: 'change' }
                    ],
                    typeId: [
                        { required: true, message: '请选择终端类型...', trigger: 'change' }
                    ],
                    mainChipId: [
                        { required: true, message: '请选择主芯片...', trigger: 'blur' }
                    ],
                    // support4k: [
                    //     { required: true, message: '请选择是否支持4K...', trigger: 'change' }
                    // ],
                    // supportDolby: [
                    //     { required: true, message: '请选择是否支持dolby...', trigger: 'change' }
                    // ],
                    // supportDts: [
                    //     { required: true, message: '请选择是否支持dts...', trigger: 'change' }
                    // ],
                    // flashSize: [
                    //     { required: true, message: '请输入flash大小...', trigger: 'blur' }
                    // ],
                    // memorySize: [
                    //     { required: true, message: '请输入内存大小...', trigger: 'blur' }
                    // ],
                    // screenParameter: [
                    //     { required: true, message: '请输入屏参...', trigger: 'blur' }
                    // ]
                },
                columns1: [
                {
                        title: '序号',
                        type: 'index',
                        width: 70,
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
                        title: '主芯片',
                        key: 'mainChipName',
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
                                ),
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
                                            this.parameter(params.row)
                                        }
                                    }
                                }, '终端参数'),
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
                self.$http(this.$config.BaseURL2 + '/tv/commercialmodel/list?commercialName=' + self.search.commercialName +'&mainChipId=' + self.search.mainChipId + '&customerId=' +self.search.customerId+ '&page=' + self.page + '&pageSize=' + self.pageSize).then(response => {
                    if (response.data.errno == 10000) {
                        self.data1 = response.data.data.list;

                        self.total = response.data.data.total
                    }
                }, response => { })
            },
            //下拉框
            getSelect() {
                let self = this;
                self.$http(this.$config.BaseURL2 + '/tv/customer/list').then(response => {
                    if (response.data.errno == 10000) {
                        console.log(response)
                        self.cityList = response.data.data.list;
                        self.cityList2 = response.data.data.list;
                    }
                }, response => { })
            },
            getSelect1() {
                let self = this;
                self.$http(this.$config.BaseURL2 + '/tv/mainchip/list').then(response => {
                    if (response.data.errno == 10000) {
                        console.log(response)
                        self.cityList1 = response.data.data.list;
                        self.cityList3 = response.data.data.list;
                    }
                }, response => { })
            },
            getSelect2() {
                let self = this;

                self.$http(this.$config.BaseURL2 + '/tv/type/list').then(response => {
                    if (response.data.errno == 10000) {
                        console.log(response)
                        self.cityList4 = response.data.data.list;
                    }
                }, response => { })
            },
            //搜索
            query() {
                this.page = 1;
                this.getTableList()
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
                self.$http.post(this.$config.BaseURL2 + '/tv/commercialmodel/edit', self.info).then(response => {
                    if (response.data.errno == 10000) {
                        this.info = {};
                        this.getTableList()
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
                this.modalEdit = true;
                this.edit = row;
                console.log(this.edit)
                this.id = row._id;
            },
            //  修改确定按钮
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
                self.$http.post(this.$config.BaseURL2 + '/tv/commercialmodel/edit?_id=' + self.id, self.edit).then(response => {
                    if (response.data.errno == 10000) {
                        console.log(response)
                        this.edit = {};
                        this.getTableList();
                        this.modalEdit = false;
                        this.$Message.success('修改成功！')
                    }
                }, response => { })
            },
            //删除
            remove(row) {
                let self = this;
                self.$http(this.$config.BaseURL2 + '/tv/commercialmodel/del?_id=' + row._id).then(response => {
                    if (response.data.errno == 10000) {
                        this.getTableList();
                        this.$Message.success('删除成功！')
                    }
                }, response => { })
            },
            //终端参数
            parameter(row) {
                this.modalParameter = true;
                this.news = row;
                this.id1 = row._id
                console.log(this.news)
            },
            //终端修改
            newsOk() {
                let self = this;
                self.$http.post(this.$config.BaseURL2 + '/tv/commercialmodel/parameteredit?_id=' + self.id1, self.news).then(response => {
                    if (response.data.errno == 10000) {
                        console.log(response)
                        // this.edit = {};
                        this.getTableList()
                        this.modalParameter = false;
                        this.$Message.success('修改成功！')
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
            this.getTableList();
            this.getSelect();
            this.getSelect1();
            this.getSelect2()
        }
    }
</script>