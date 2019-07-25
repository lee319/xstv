<style>
    .layout-group-search {
        float: left;
    }

    .layout-group-add {
        float: right;
    }

    .layout-group .ivu-poptip-confirm .ivu-poptip-body .ivu-icon {
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

    .layout-group-page {
        float: right;
        margin-top: 10px;
    }
</style>

<template>
    <div class="layout-group">
        <!-- 搜索 -->
        <div class="layout-group-search">
            <Form :model="search" label-position="right" inline>
                <FormItem label="分组名称:" :label-width="70">
                    <Input v-model="search.groupName" style="width:200px;" placeholder="请输入分组名称..."></Input>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click='query()'>搜索</Button>
                </FormItem>
            </Form>
        </div>
        <!-- 添加 -->
        <div class="layout-group-add">
            <Button type="success" @click="modalAdd = true">添加</Button>
            <Modal v-model="modalAdd" title="添加">
                <div slot="footer">
                    <a @click="addCancel" class="span">取消</a>
                    <Button @click="addOk" type="primary">确定</Button>
                </div>
                <Form :model="info" label-position="right" :label-width="100" ref="info" :rules="ruleValidate">
                    <FormItem label="分组名称:" prop="groupName">
                        <Input v-model="info.groupName" placeholder="请输入分组名称..."></Input>
                    </FormItem>
                    <FormItem label="描述:">
                        <Input v-model="info.desc" placeholder="请输入描述..." type="textarea" :rows="4"></Input>
                    </FormItem>
                </Form>
            </Modal>
        </div>
        <div style="clear: both;"></div>
        <div class="layout-group-table">
            <Table border :columns="columns1" :data="data1"></Table>
        </div>
        <!-- 修改 -->
        <div class="layout-group-edit">
            <Modal v-model="modalEdit" title="修改">
                <div slot="footer">
                    <a @click="modalEdit=false" class="span">取消</a>
                    <Button @click="editOk" type="primary">确定</Button>
                </div>
                <Form :model="edit" label-position="right" :label-width="100" ref="edit" :rules="ruleValidate">
                    <FormItem label="分组名称:" prop="groupName">
                        <Input v-model="edit.groupName" placeholder="请输入分组名称..."></Input>
                    </FormItem>
                    <FormItem label="描述:">
                        <Input v-model="edit.desc" placeholder="请输入描述..." type="textarea" :rows="4"></Input>
                    </FormItem>
                </Form>
            </Modal>
        </div>
        <div class="layout-group-page">
            <Page :total="total" :current="page" :page-size='pageSize' @on-change="changePage" show-elevator />
        </div>
        <!-- 分组终端 -->
        <div class="layout-group-group">
            <Modal v-model="modalGroup" title="分组终端" width="1400" :transfer="false">
                <Form :model="news" label-position="right" :label-width="70">
                    <FormItem label="分组名称:">
                        <Input v-model="news.groupName" style="width: 200px;" disabled></Input>
                    </FormItem>
                </Form>
                <div style="float: left;">
                    <Form :model="groupSearch" label-position="right" inline>
                        <FormItem label="终端厂商:" :label-width="80">
                            <Select v-model="groupSearch.customerId" style="width:200px" placeholder="请选择终端厂商...">
                                <Option v-for="item in cityList" :value="item._id" :key="item._id">{{item.customerName}}</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="商用型号:" :label-width="65">
                            <Select v-model="groupSearch.commercialId" style="width:200px" placeholder="请选择商用型号...">
                                <Option v-for="item in cityList1" :value="item._id" :key="item._id">{{
                                    item.commercialName }}</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="内部型号:" :label-width="80">
                            <Select v-model="groupSearch.insideId" style="width:200px" placeholder="请选择内部型号...">
                                <Option v-for="item in cityList2" :value="item._id" :key="item._id">{{ item.insideName
                                    }}</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="mac" :label-width="50">
                            <Input v-model="groupSearch.mac" style="width: 200px;" placeholder="请输入mac..."></Input>
                        </FormItem>
                        <FormItem>
                            <Button type="primary" @click='queryGroup()'>搜索</Button>
                        </FormItem>
                    </Form>
                </div>
                <div style="float: right;">
                    <Button type="success" @click="modalGroupAddBtn">添加</Button>
                    <Modal v-model="modalGroupAdd" title="添加" width="1400" @click="addOk1">
                        <div style="float: left;">
                            <Form :model="groupSearch1" label-position="right" inline>
                                <FormItem label="终端厂商:" :label-width="80">
                                    <Select v-model="groupSearch1.customerId" style="width:200px" placeholder="请选择终端厂商...">
                                        <Option v-for="item in cityList" :value="item._id" :key="item._id">{{item.customerName}}</Option>
                                    </Select>
                                </FormItem>
                                <FormItem label="商用型号:" :label-width="65">
                                    <Select v-model="groupSearch1.commercialId" style="width:200px" placeholder="请选择商用型号...">
                                        <Option v-for="item in cityList1" :value="item._id" :key="item._id">{{
                                            item.commercialName }}</Option>
                                    </Select>
                                </FormItem>
                                <FormItem label="内部型号:" :label-width="80">
                                    <Select v-model="groupSearch1.insideId" style="width:200px" placeholder="请选择内部型号...">
                                        <Option v-for="item in cityList2" :value="item._id" :key="item._id">{{
                                            item.insideName
                                            }}</Option>
                                    </Select>
                                </FormItem>
                                <FormItem label="mac" :label-width="50">
                                    <Input v-model="groupSearch1.mac" style="width: 200px;" placeholder="请输入mac..."></Input>
                                </FormItem>
                                <FormItem>
                                    <Button type="primary" @click='queryGroup1()'>搜索</Button>
                                </FormItem>
                            </Form>
                        </div>
                        <div style="clear: both;"></div>
                        <div>
                            <Table border ref="selection" :columns="columns2" :data="data2" @on-select="checkBoxlist"
                                @on-select-cancel="checkBoxlistCancel" @on-select-all="checkBoxlist"></Table>
                        </div>
                    </Modal>
                </div>
                <div style="clear: both;"></div>
                <div>
                    <Table border :columns="columns3" :data="data3"></Table>
                </div>
            </Modal>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                search: {
                    groupName: '',

                },//搜索
                info: {},//添加
                modalAdd: false,

                edit: {},//修改
                modalEdit: false,

                total: 0,//分页
                page: 1,
                pageSize: 30,

                modalGroup: false,
                //保存所有添加
                GroupList: [],
                id: '',//一整行
                news: {},//分组名称
                groupSearch: {
                    customerId: '',
                    insideId: '',
                    commercialId: '',
                    mac: ''
                }, //分组搜索

                infoGroup: {},
                modalGroupAdd: false, //终端添加

                groupSearch1: {
                    customerId: '',
                    insideId: '',
                    commercialId: '',
                    mac: ''
                },//终端添加搜索

                cityList: [],
                cityList1: [],
                cityList2: [],

                columns1: [
                    {
                        title: '序号',
                        type: 'index',
                        width: 70,
                        align: 'center'
                    },
                    {
                        title: '分组名称',
                        key: 'groupName',
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
                                            this.group(params.row)
                                        }
                                    }
                                }, '分组终端'),
                            ]);
                        }
                    }
                ],
                data1: [],
                columns2: [
                {
                        type: 'selection',
                        width: 60,
                        align: 'center',
                        _checked: false
                    },
                    {
                        title: 'mac',
                        key: 'mac',
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
                    }
                ],
                data2: [],
                columns3: [
                    {
                        type: 'index',
                        width: 70,
                        align: 'center',
                        title: '序号'
                    },
                    {
                        title: 'mac',
                        key: 'mac',
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
                        title: '创建时间',
                        key: 'importTime',
                        align: 'center'
                    },
                    {
                        title: '操作',
                        width: 300,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
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
                                                this.removeGroup(params.row);
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
                data3: [],
                ruleValidate: {
                    groupName: [
                        { required: true, message: '请输入分组名称...', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            //表格数据
            getTableList() {
                let self = this;
                self.$http(this.$config.BaseURL2 + '/tv/group/list?groupName=' + self.search.groupName + '&page=' + self.page + '&pageSize=' + self.pageSize).then(response => {
                    if (response.data.errno == 10000) {
                        self.data1 = response.data.data.list;

                        self.total = response.data.data.total;
                    }
                }, response => { })
            },
            // 搜索
            query() {
                this.page = 1;
                this.getTableList();
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
                self.$http.post(this.$config.BaseURL2 + '/tv/group/edit', self.info).then(response => {
                    if (response.data.errno == 10000) {
                        self.info = {};
                        self.modalAdd = false;
                        self.getTableList();
                        self.$Message.success('添加成功！')
                    }
                }, response => { })
            },
            // 添加取消按钮
            addCancel() {
                this.info = {};
                this.modalAdd = false;
            },
            modify(row) {
                let self = this;
                self.edit = row;
                self.id = row._id;
                self.modalEdit = true;
            },
            //修改确定按钮
            editOk() {
                let self = this;
                self.edit.groupName = self.edit.groupName + ''
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
                self.$http.post(this.$config.BaseURL2 + '/tv/group/edit?_id=' + self.id, self.edit).then(response => {
                    if (response.data.errno == 10000) {
                        self.modalEdit = false;
                        self.getTableList();
                        self.$Message.success("修改成功！");
                    }
                }, response => { })
            },
            //删除
            remove(row) {
                let self = this;
                self.$http(this.$config.BaseURL2 + '/tv/group/del?_id=' + row._id).then(response => {
                    if (response.data.errno == 10000) {
                        self.getTableList();
                        self.$Message.success('删除成功！')
                    }
                }, response => { })
            },
            changePage(page) {
                this.page = page;
                this.getTableList()
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
            //终端分组
            group(row) {
                let self = this;
                this.news = row;
                self.$http(this.$config.BaseURL2 + '/tv/device/list?groupId=' + row._id + '&customerId=' + self.groupSearch.customerId + '&commercialId=' + self.groupSearch.commercialId + '&insideId=' + self.groupSearch.insideId + '&mac=' + self.groupSearch.mac).then(response => {
                    if (response.data.errno == 10000) {
                        console.log(response)
                        self.data3 = response.data.data.list;
                    }
                }, response => { })
                this.modalGroup = true;
            },
            //终端搜索
            queryGroup() {
                this.group(this.news)
            },
            // 删除
            removeGroup(row) {
                console.log(row)
                let self = this;
                self.$http(this.$config.BaseURL2 + '/tv/group/deviceDel?deviceId=' + row._id).then(response => {
                    if (response.data.errno == 10000) {
                        this.group(this.news)
                    }
                }, response => { })
            },
            modalGroupAddBtn() {
                this.getTerminalList();//列表接口
                this.GroupList = [];
                this.modalGroupAdd = true;
            },
            // 分组数据列表
            getTerminalList() {
                let self = this;
                self.$http(this.$config.BaseURL2 + '/tv/group/notGrouped?customerId=' + self.groupSearch1.customerId + '&commercialId=' + self.groupSearch1.commercialId + '&insideId=' + self.groupSearch1.insideId + '&mac=' + self.groupSearch1.mac).then(response => {
                    if (response.data.errno == 10000) {
                        console.log(response)
                        self.data2 = response.data.data.list;
                        response.data.data.list.forEach(val => {
                            let sel = false;
                            this.GroupList.forEach(val1 => {
                                if (val.id == val1.id) {
                                    sel = true;
                                }
                            });
                            val._checked = sel;
                        });
                    }
                }, response => { })
            },
            queryGroup1() {
                this.getTerminalList()
            },
            //添加确定按钮
            addOk1() {
                let self = this;
                let postData = { list: [] };
                this.GroupList.forEach((val, key) => {
                    postData.list.push({
                        video_id: val.id,
                        video_order: key + 1
                    });
                });
                self.$http.post(this.$config.BaseURL1 + '/tv/group/addDevice' , postData).then(response => {
                    console.log(response)
                    if (response.data.errno == 10000) {

                        self.modalAdd1 = false;
                        this.getcontentList();
                        this.$Message.success('添加成功!');
                    }
                }, response => { })
            },
            // 选中
            checkBoxlist(selection, row) {
                console.log(selection);
                console.log(row)
                // this.GroupList.push(row)
                this.GroupList = selection;
            },
            // 取消选择
            checkBoxlistCancel(selection, row) {
                console.log(selection);
                console.log(row)
                let groupList = [];
                this.GroupList.forEach(val => {
                    if (val.id != row.id) {
                        groupList.push(val)
                    }
                });
                this.GroupList = groupList
            },

        },
        mounted() {
            this.getTableList();
            this.getSelect();
            this.getSelect1();
            this.getSelect2();
        }
    }
</script>