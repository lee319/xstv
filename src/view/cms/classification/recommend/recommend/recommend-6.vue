<style>
    .layout-recommend-table {
        clear: both;
    }

    .layout-recommend-page {
        float: right;
        margin-top: 10px;
    }

    .span {
        font-size: 14px;
        margin: 15px;
        color: #495060;
        padding-bottom: 20px;
    }

    .layout-recommend .ivu-poptip-confirm .ivu-poptip-body .ivu-icon {
        font-size: 16px;
        color: #ff9900;
        line-height: 18px;
        position: absolute;
        margin-left: -50px;
    }
</style>
<template>
    <div class="layout-recommend">
        <!-- 搜索 -->
        <div class="layout-recommend-search">
            <div style="float: left;">
                <Form :model="search" label-position="right" inline>
                    <!-- <FormItem label="所属模版:" :label-width="70">
                        <Select style="width:200px">
                            <Option v-for="item in tampList" :value="item.title" :key="item.id">{{ item.title }}</Option>
                        </Select>
                    </FormItem> -->
                    <FormItem label="所属分类:" :label-width="70">
                        <Select style="width:200px" v-model="search.category_id" placeholder="请选择所属分类...">
                            <Option value="">全部</Option>
                            <Option v-for="item in Taxonomy" :value="item.id" :key="item.id">{{item.name}}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="名称" :label-width="50">
                        <Input v-model="search.name" style="width:200px" placeholder="请输入名称..."></Input>
                    </FormItem>
                    <FormItem label="状态:" :label-width="50">
                        <Select style="width:200px" v-model="search.status">
                            <Option value="">全部</Option>
                            <Option :value="0">下线</Option>
                            <Option :value="1">上线</Option>
                        </Select>
                    </FormItem>
                    <FormItem>
                        <Button type="primary" @click="query">搜索</Button>
                    </FormItem>
                </Form>
            </div>
            <div style="float: right;">
                <Button type="success" @click="modalAddBtn1">添加</Button>
                <Modal v-model="modalAdd" title="添加" width="600">
                    <div slot="footer">
                        <Button @click="addOk1" type="primary">确定</Button>
                    </div>
                    <Form :model="info" label-position="right" :label-width="100">
                        <!-- <FormItem label="所属模版:">
                            <Input v-model="info.input1"></Input>
                        </FormItem> -->
                        <!-- <FormItem label="分类/虚拟分类:">
                            <Input v-model="info.category_id"></Input>
                        </FormItem> -->
                        <FormItem label="所属分类:" :label-width="70">
                                <Select style="width:470px" v-model="info.category_id" placeholder="请选择所属分类...">
                                    <Option value="">全部</Option>
                                    <Option v-for="item in Taxonomy" :value="item.id" :key="item.id">{{item.name}}</Option>
                                </Select>
                            </FormItem>
                        <FormItem label="topic名称:">
                            <Input v-model="info.name"></Input>
                        </FormItem>
                        <FormItem label="显示名称:">
                            <Input v-model="info.title"></Input>
                        </FormItem>
                        <FormItem label="排序ID:">
                            <Input v-model="info.order"></Input>
                        </FormItem>
                        <FormItem label="状态:">
                            <Select style="width:470px" v-model="info.status">
                                <Option :value="0">下线</Option>
                                <Option :value="0">上线</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="描述:">
                            <Input v-model="info.desc"></Input>
                        </FormItem>
                        <FormItem label="自动关联数据" style="border-bottom: 1px solid #cccccc;">
                        </FormItem>
                        <FormItem inline v-for="(itema,k11) in addAttrOpsList" :key="k11">
                            <Select style="width:120px" @on-change="changeAttrOps" v-model="itema.attr_name">
                                <Option v-for="(item,kkk) in cityList" :value="item.attr_name" :key="kkk">{{ item.attr_name }}</Option>
                            </Select>
                            <Select style="width:120px;margin-left: 5px;" v-model="itema.ops">
                                <Option v-for="(item,kkk1) in attrOps" :value="item" :key="kkk1">{{ item }}</Option>
                            </Select>
                            <Input v-model="itema.val" style="width: 200px;margin-left: 5px;" />
                        </FormItem>
                        <FormItem>
                            <Button type="primary" @click="addAttrOpsList.push({attr_name:'',ops:'',val:''})">增加条件</Button>
                        </FormItem>

                    </Form>
                </Modal>
            </div>
        </div>
        <!-- 表格 -->
        <div class="layout-recommend-table">
            <Table border :columns="columns1" :data="data1"></Table>
        </div>
        <div class="layout-recommend-page">
            <Page :total="total" :current="1" :page-size="pageSize" @on-change="changePage" />
        </div>
        <!-- 内容维护 -->
        <div>
            <Modal v-model="modalMain" title="内容维护" width="1300" :transfer="false">
                <div>
                    <Button type="success" @click="modalAddBtn" style="float: right;margin-bottom: 10px">添加</Button>
                    <Modal v-model="modalAdd1" title="添加节目" :transfer="true" width="1200">
                        <div slot="footer">
                            <a @click="addCancel" class="span">取消</a>
                            <Button @click="addOk" type="primary">确定</Button>
                        </div>
                        <div>
                            <Form :model="search1" label-position="right" inline>
                                <FormItem label="所属分类:" :label-width="70">
                                    <Select style="width:200px" v-model="search1.category_id">
                                        <Option v-for="item in Taxonomy1" :value="item.id" :key="item.id">{{ item.name }}</Option>
                                    </Select>
                                </FormItem>
                                <FormItem label="名称" :label-width="40">
                                    <Input v-model="search1.keywords" style="width:200px"></Input>
                                </FormItem>
                                <FormItem label="是否付费" :label-width="70">
                                    <Select style="width:200px" v-model="search1.cost_type">
                                        <Option :value="0">是</Option>
                                        <Option :value="1">否</Option>
                                    </Select>
                                </FormItem>
                                <FormItem>
                                    <Button type="primary" @click="query1">搜索</Button>
                                </FormItem>
                            </Form>
                        </div>
                        <Table border ref="selection" :columns="columns3" :data="data3" @on-select="checkBoxlist" @on-select-cancel="checkBoxlistCancel"></Table>
                        <div class="layout-recommend-page">
                            <Page :total="total2" :current="1" :page-size="pageSize2" @on-change="changePage2" />
                        </div>
                        <div style="clear: both;"></div>
                    </Modal>
                </div>
                <Table border :columns="columns2" :data="data2" style="clear: both;"></Table>
                <div class="layout-recommend-page">
                    <Page :total="total1" :current="1" :page-size="pageSize1" @on-change="changePage1" />
                </div>
                <div style="clear: both;"></div>
            </Modal>
        </div>
        <!-- 修改 -->
        <Modal v-model="modalEdit" title="修改" width="600">
            <div slot="footer">
                <a @click="modalEdit=false" class="span">取消</a>
                <Button @click="editOk" type="primary">确定</Button>
            </div>
            <Form :model="edit" label-position="right" :label-width="100">
                <FormItem label="分类/虚拟分类:">
                    <Input v-model="edit.category_id"></Input>
                </FormItem>
                <FormItem label="topic名称:">
                    <Input v-model="edit.name"></Input>
                </FormItem>
                <FormItem label="显示名称:">
                    <Input v-model="edit.title"></Input>
                </FormItem>
                <FormItem label="排序ID:">
                    <Input v-model="edit.order"></Input>
                </FormItem>
                <FormItem label="状态:">
                    <Input v-model="edit.status"></Input>
                </FormItem>
                <FormItem label="自动关联数据" style="border-bottom: 1px solid #cccccc;">
                </FormItem>
                <FormItem inline v-for="(itema,k11) in upAttrOpsList" :key="k11">
                    <Select style="width:120px" @on-change="changeAttrOps" v-model="itema.attr_name">
                        <Option v-for="(item,kkk) in cityList" :value="item.attr_name" :key="kkk">{{ item.attr_name }}</Option>
                    </Select>
                    <Select style="width:120px;margin-left: 5px;" v-model="itema.ops">
                        <Option v-for="(item,kkk1) in attrOps" :value="item" :key="kkk1">{{ item }}</Option>
                    </Select>
                    <Input placeholder="Enter something..." v-model="itema.val" style="width: 200px;margin-left: 5px;" />
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="upAttrOpsList.push({attr_name:'',ops:'',val:''})">增加条件</Button>
                </FormItem>
                <!-- <FormItem label="描述:">
                    <Input v-model="edit.desc"></Input>
                </FormItem> -->
            </Form>
        </Modal>
    </div>
</template>
<script>
    var moment = require("moment");
    export default {
        data() {
            return {
                addAttrOpsList: [],//添加条件列表
                upAttrOpsList: [], // 修改条件列表
                attrOps: [], // 第二个下拉框
                //搜索
                search: {
                    category_id: '',
                    name: '',
                    status: ''
                },
                search1: {
                    category_id: '',
                    keywords: '',
                },
                //添加
                info: {},
                modalAdd: false,
                //搜索下拉框
                tampList: [],
                Taxonomy: [],
                Taxonomy1: [],
                //内容维护
                modalMain: false,
                //表格添加
                modalAdd1: false,
                cityList: [],
                cityList1: [],
                cityList2: [],
                //分页
                total: 0,
                pageSize: 10,
                page: 1,

                total1: 0,
                pageSize1: 10,
                page1: 1,

                total2: 0,
                pageSize2: 10,
                page1: 1,

                //修改
                edit: {},
                modalEdit: false,
                //全局topicId
                topicId: '',
                topicIdEdit: '',
                //保存所有添加
                GroupList: [],
                columns1: [
                    {
                        title: '序号',
                        type: 'index',
                        width: 70,
                        align: 'center'
                    },
                    {
                        title: '分类/虚拟分类',
                        key: 'category_id',
                        align: 'center'
                    },
                    {
                        title: 'topic名称',
                        key: 'name',
                        align: 'center'
                    },
                    {
                        title: '显示名称',
                        key: 'title',
                        align: 'center'
                    },
                    {
                        title: '排序ID',
                        key: 'order',
                        align: 'center'
                    },
                    {
                        title: '状态',
                        key: 'Isstatus',
                        align: 'center'
                    },
                    {
                        title: '创建时间',
                        key: 'create_time',
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
                                h(
                                    "Poptip", {
                                        props: {
                                            confirm: true,
                                            title: "确定要下线吗！",
                                            type: "error",
                                            size: "small",
                                            width: "150"
                                        },
                                        style: {
                                            marginRight: '5px'
                                        },
                                        on: {
                                            "on-ok": () => {
                                                this.show1(params.row);
                                            }
                                        }
                                    }, [
                                        h(
                                            "Button", {
                                                props: {
                                                    type: "success",
                                                    size: "small",
                                                }
                                            },
                                            params.row.Isstatus == '下线' ? '上线' : '下线'
                                        )
                                    ]
                                ),
                                h('Button', {
                                    props: {
                                        type: 'warning',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            console.log(params)
                                            this.show(params.row)
                                        }
                                    }
                                }, '内容维护')
                            ]);
                        }
                    }
                ],
                data1: [],
                columns2: [
                    {
                        title: '序号',
                        type: 'index',
                        width: 70,
                        align: 'center'
                    },
                    {
                        title: '节目名称',
                        key: 'title',
                        align: 'center',
                        width: 200
                    },
                    {
                        title: '节目分类',
                        key: 'category_name',
                        align: 'center'
                    },
                    {
                        title: '排序ID',
                        key: 'rank_score',
                        align: 'center'
                    },
                    {
                        title: '类型',
                        key: 'theme',
                        align: 'center'
                    },
                    {
                        title: '导演',
                        key: 'director',
                        align: 'center'
                    },
                    {
                        title: '上映年代',
                        key: 'release_year',
                        align: 'center'
                    },
                    {
                        title: '操作',
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
                                                this.remove1(params.row);
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
                data2: [],
                columns3: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center',
                        _checked: false
                    },
                    {
                        title: '节目名称',
                        key: 'title',
                        align: 'center'
                    },
                    {
                        title: '节目分类',
                        key: 'channel_name',
                        align: 'center'
                    },
                    {
                        title: '排序ID',
                        key: 'id',
                        align: 'center'
                    },
                    {
                        title: '类型',
                        key: 'Iscost_type',
                        align: 'center'
                    },
                    // {
                    //     title: '影人',
                    //     key: 'persons',
                    //     align: 'center'
                    // },
                    {
                        title: '导演',
                        key: 'persons',
                        align: 'center'
                    },
                    {
                        title: '上映年代',
                        key: 'release_time',
                        align: 'center'
                    }
                ],
                data3: []
            }
        },
        methods: {
            changeAttrOps(val) {
                this.cityList.forEach(v => {
                    if (v.attr_name == val) {
                        this.attrOps = v.attr_ops;
                    }
                });
            },
            addOk1() {
                console.log(333)
                let opsList = [];
                this.addAttrOpsList.forEach(val => {
                    opsList.push(`${val.attr_name} ${val.ops} ${val.val}`)
                });
                this.info.conditions = opsList;
                console.log(this.info);
                let self = this;
                this.info.category_id = this.info.category_id * 1
                this.info.order = this.info.order * 1
                this.info.status = this.info.status * 1
                self.$http.post(this.$config.BaseURL1 + '/media/topic/create', self.info).then(response => {
                    // if (response.errno == 10000) {
                    console.log(response)
                    self.info = {};
                    self.getTableList();
                    self.modalAdd = false;
                    self.$Message.success("添加成功");
                    // }k
                }, response => { })
            },

            //内容维护
            show(row) {
                this.modalMain = true;
                this.topicId = row.topic_id;
                this.getcontentList();
            },
            //添加弹框
            modalAddBtn() {
                this.modalAdd1 = true;
                this.getAddList();
                this.GroupList = [];
                this.getSelectList2()
            },
            //表格数据
            // /media/topic/list
            getTableList() {
                let self = this;
                self.$http(this.$config.BaseURL1 + '/media/topic/list?pageSize=' + self.pageSize + '&page=' + self.page + '&status=' + self.search.status + '&category_id=' + self.search.category_id + '&name=' + self.search.mame).then(response => {
                    console.log(response)
                    self.data1 = response.data.data.list;
                    response.data.data.list.forEach(val => {
                        if (val.status == 1) {
                            val.Isstatus = '上线'
                        } else if (val.status == 0) {
                            val.Isstatus = '下线'
                        }

                        //时间转换
                        val.create_time = moment(val.create_time).format(
                            "YYYY-MM-DD"
                        );
                    });
                    //分页
                    self.total = response.data.data.total

                    // 搜索默认值
                    if (self.data1.length > 0) {
                        self.search.category_id = self.data1[0].category_id;
                    }
                }, response => {

                })
            },
            //内容维护管理
            getcontentList() {
                let self = this;
                self.$http(this.$config.BaseURL1 + '/media/topic/detail?topic_id=' + self.topicId + '&pageSize=' + self.pageSize1 + '&page=' + self.page1).then(response => {
                    console.log(response)
                    self.data2 = response.data.data.list || [];
                    self.total1 = response.data.data.total;
                }, response => {

                })
            },
            //添加表格 
            getAddList() {
                let self = this;
                self.$http(this.$config.BaseURL1 + '/media/search?keywords=' + self.search1.keywords + '&page=' + self.page2 + '&pageSize=' + self.search1 + '&cost_type=' + self.search1.cost_type + '&category_id=' + self.search1.category_id).then(response => {
                    self.data3 = response.data.data.list;

                    // Iscost_type 判断类型
                    response.data.data.list.forEach(val => {

                        if (val.cost_type == 0) {
                            val.Iscost_type = "免费";
                        } else if (val.cost_type == 1) {
                            val.Iscost_type = "会员";
                        } else if (val.cost_type == 2) {
                            val.Iscost_type = "付费";
                        }

                        let sel = false;
                        this.GroupList.forEach(val1 => {
                            if (val.id == val1.id) {
                                sel = true;
                            }
                        });
                        val._checked = sel;
                    });

                    //分页
                    self.total2 = response.data.data.total;
                }, response => {

                })
            },
            //搜索下拉框
            getSelectList() {
                let self = this;
                self.$http(this.$config.BaseURL1 + '/media/category/list').then(response => {
                    self.Taxonomy = response.data.data.list || [];
                    self.Taxonomy1 = response.data.data.list || [];
                }, response => { })
            },
            getSelectList1() {
                let self = this;
                self.$http(this.$config.BaseURL + '/staticpromotion/template/list').then(response => {
                    console.log(response)
                    self.tampList = response.data.data.list;
                }, response => { })
            },
            //添加条件下拉框 
            getSelectList2() {
                let self = this;
                self.$http(this.$config.BaseURL1 + '/media/filter/list').then(response => {
                    // console.log(response)
                    this.cityList = response.data.data.list;
                    this.cityList1 = response.data.data.list;
                }, response => { })
            },
            // 添加取消按钮
            addCancel() {
                this.modalAdd1 = false;
            },
            //添加确定按钮
            addOk() {
                console.log(111)
                let self = this;
                let postData = { list: [] };
                this.GroupList.forEach((val, key) => {
                    postData.list.push({
                        video_id: val.id,
                        video_order: key + 1
                    });
                });
                self.$http.post(this.$config.BaseURL1 + '/media/topic/additem?topic_id=' + self.topicId, postData).then(response => {
                    if (response.data.errno == 10000) {
                        self.modalAdd1 = false;
                    } else {
                        // 提示 response.data.errmsg
                        this.$Message.info(response.data.errmsg)
                    }
                }, response => { })
            },
            //修改
            modify(row) {
                console.log(row)
                this.getSelectList2();
                this.modalEdit = true;
                this.edit = row;
                this.topicIdEdit = row.topic_id;

                // 条件列表
                let upAttrOpsList = [];
                if (typeof this.edit.conditions == 'undefined' || this.edit.conditions == null) {
                    this.edit.conditions = [];
                }
                this.edit.conditions.forEach(val => {
                    let arr = val; //.split(' ');
                    if (arr.length == 3) {
                        let attrOps = [];
                        this.cityList.forEach(v => {
                            if (v.attr_name == arr[0]) {
                                attrOps = v.attr_ops;
                            }
                        });
                        this.attrOps = attrOps;
                        upAttrOpsList.push({
                            attr_name: arr[0],
                            ops: arr[1],
                            attrOps: attrOps,
                            val: arr[2]
                        })
                    }
                });
                this.upAttrOpsList = upAttrOpsList;
            },
            //修改确认按钮
            editOk() {
                let self = this;

                let opsList = [];
                this.upAttrOpsList.forEach(val => {
                    opsList.push(`${val.attr_name} ${val.ops} ${val.val}`)
                });
                this.edit.conditions = opsList;

                self.$http.post(this.$config.BaseURL1 + '/media/topic/edit?topic_id=' + this.topicIdEdit, self.edit).then(response => {
                    console.log(this.topicIdEdit)
                    self.edit = {};
                    self.getTableList();
                    self.modalEdit = false;
                    self.$Message.success("修改成功");
                }, response => { })
            },
            //内容维护删除
            remove1(row) {
                console.log(row)
                let self = this;
                self.$http.post(this.$config.BaseURL1 + '/media/topic/removeitem?topic_id=' + self.topicId + '&video_id=' + row.video_id).then(response => {
                    this.$Message.success("删除成功");
                    this.getcontentList()
                }, response => {

                })
            },
            //表格删除
            remove(row) {
                console.log(row)
                let self = this;
                self.$http.post(this.$config.BaseURL1 + '/media/topic/delete?topic_id=' + row.topic_id).then(response => {
                    this.$Message.success("删除成功");
                    this.getTableList()
                    console.log(response)
                }, response => {

                })
            },
            //分页
            changePage(page) {
                this.page = page;
                this.getTableList()
            },
            //分页
            changePage1(page) {
                this.page1 = page;
                this.getcontentList()
            },
            //分页
            changePage2(page) {
                this.page2 = page;
                this.getAddList()
            },
            //搜索
            query() {
                this.getTableList()
            },
            //添加里面搜索
            query1() {
                this.getAddList()
            },
            // 选中
            checkBoxlist(selection, row) {
                console.log(selection);
                console.log(row)
                this.GroupList.push(row)
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
            show1(row) {
                let self = this;
                console.log(row)
                self.$http.post(this.$config.BaseURL1 + '/media/topic/setstatus?topic_id=' + row.topic_id + '&status=' + Math.abs(row.status - 1)).then(response => {
                    this.getTableList()
                    if (response.errno == 10000) {
                        this.getTableList()
                        this.$Message.info(刷新成功)
                    } else {
                        this.$Message.info(response.data.errmsg)
                    }
                }, response => {

                })
            },
            modalAddBtn1() {
                this.modalAdd = true;
                this.getSelectList2();
            }
        },
        mounted() {
            //表格数据
            this.getTableList()
            this.getSelectList();
            this.getSelectList1()
        }
    }
</script>