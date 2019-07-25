<style>
    .layout-recommendation-page {
        float: right;
        margin-top: 10px;
    }

    .span {
        font-size: 14px;
        margin: 15px;
        color: #495060;
        padding-bottom: 20px;
    }

    .layout-recommendation .ivu-poptip-confirm .ivu-poptip-body .ivu-icon {
        font-size: 16px;
        color: #ff9900;
        line-height: 18px;
        position: absolute;
        margin-left: -50px;
    }

    .layout-recommendation-application .ivu-poptip-confirm .ivu-poptip-body .ivu-icon {
        font-size: 16px;
        color: #ff9900;
        line-height: 18px;
        position: absolute;
        margin-left: -50px;
    }
</style>
<template>
    <div class="layout-recommendation">
        <div class="layout-recommendation-table">
            <Table border :columns="columns1" :data="data1"></Table>
        </div>
        <!-- 应用管理 -->
        <div class="layout-recommendation-application">
            <Modal v-model="modalApplication" title="应用管理" width="1100">
                <Button type="success" @click="modalApplicationAddBtn"
                    style="float:right;margin-bottom: 10px;">添加</Button>
                <div style="clear:both;"></div>
                <Table border :columns="columns2" :data="data2"></Table>
                <div class="layout-recommendation-page">
                    <Page :total="total1" :current="page1" :page-size='pageSize1' @on-change="changePage1"
                        show-elevator />
                </div>
                <div style="margin-top:40px;"></div>
            </Modal>
        </div>
        <!-- 应用管理修改 -->
        <Modal v-model="modalEdit" title="修改">
            <div slot="footer">
                <a @click="modalEditBtn" class="span">取消</a>
                <Button @click="editOk" type="primary">确定</Button>
            </div>
            <Form :model="edit" label-position="right" :label-width="100" ref="edit" :rules="ruleValidate">
                <FormItem label="排序id">
                    <Input v-model="edit.order"></Input>
                </FormItem>
            </Form>
        </Modal>
        <!--应用管理添加 -->
        <Modal v-model="modalApplicationAdd" title="添加" width="1100" @on-cancel="ApplicationAddCancel">
            <div slot="footer">
                <a @click="ApplicationAddCancel" class="span">取消</a>
                <Button @click="ApplicationAddOk" type="primary">确定</Button>
            </div>
            <div class="layout-recommendation-search">
                <Form :model="search" inline>
                    <FormItem label="应用名称:" :label-width="70">
                        <Input v-model="search.name" placeholder="请输入应用名称..."></Input>
                    </FormItem>
                    <FormItem label="一级分类:" :label-width="70">
                        <Select v-model="search.category_id" style="width:200px" placeholder="请选择一级分类..."
                            @on-change="changeSearchCategoryId">
                            <Option value="">全部</Option>
                            <Option v-for="item in cityList" :value="item.id" :key="item.id">{{ item.name }}
                            </Option>
                        </Select>
                    </FormItem>
                    <FormItem label="二级分类:" :label-width="70">
                        <Select v-model="search.category_sub_Id" style="width:200px" placeholder="请选择...">
                            <Option value="">全部</Option>
                            <Option v-for="item in cityList1" :value="item.id" :key="item.id"
                                v-if="item.parent_id == search.category_id || search.category_id == 0">{{ item.name }}
                            </Option>
                        </Select>
                    </FormItem>
                    <FormItem label="横竖屏:" :label-width="60">
                        <Select v-model="search.screen" style="width:200px" placeholder="请选择横竖屏...">
                            <Option :value="0">全部</Option>
                            <Option :value="1">横屏</Option>
                            <Option :value="2">竖屏</Option>
                            <Option :value="3">自适应</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="包含付费:" :label-width="70">
                        <Select v-model="search.free" style="width:200px" placeholder="请选择包含付费...">
                            <Option value="">全部</Option>
                            <Option :value="1">付费</Option>
                            <Option :value="0">免费</Option>
                            <Option :value="2">分享后免费</Option>
                        </Select>
                    </FormItem>
                    <FormItem>
                        <Button type="primary" @click="query">搜索</Button>
                    </FormItem>
                </Form>
            </div>
            <Table border :columns="columns3" :data="data3" @on-select="checkBoxlist"
                @on-select-cancel="checkBoxlistCancel" @on-select-all="checkBoxlist"></Table>
            <div class="layout-recommendation-page">
                <Page :total="total2" :current="page2" :page-size='pageSize2' @on-change="changePage2" show-elevator />
            </div>
            <div style="margin-top:40px;"></div>
        </Modal>
        <!-- 分页 -->
        <div class="layout-recommendation-page">
            <Page :total="total" :current="page" :page-size='pageSize' @on-change="changePage" show-elevator />
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                modalApplication: false,//应用管理
                modalApplicationAdd: false,//应用管理添加
                page: 1,
                pageSize: 30,
                total: 0,//分页

                page1: 1,
                pageSize1: 30,
                total1: 0,//应用管理分页

                sub_id: '',
                edit: {},
                modalEdit: false,//修改

                page2: 1,
                pageSize2: 30,
                total2: 0,//应用管理添加分页
                search: {
                    name: '',
                    category_id: '',
                    category_sub_Id: '',
                    screen: '',
                    free: ''
                },
                id: '',
                order: '',
                columns1: [
                    {
                        title: '序号',
                        key: 'sort_id',
                        align: 'center'
                    },
                    {
                        title: '名称',
                        key: 'name',
                        align: 'center'
                    },
                    {
                        title: '显示名称',
                        key: 'display_name',
                        align: 'center'
                    },
                    {
                        title: '操作',
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
                                            this.application(params.row)
                                        }
                                    }
                                }, '应用管理')
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
                        title: '应用名称',
                        key: 'app_name',
                        align: 'center'
                    },
                    {
                        title: '一级分类',
                        key: 'category_name',
                        align: 'center'
                    },
                    {
                        title: '排序ID',
                        key: 'order',
                        align: 'center'
                    },
                    {
                        title: '包含付费内容',
                        key: 'free',
                        align: 'center'
                    },
                    {
                        title: '发布时间',
                        key: 'create_time',
                        align: 'center'
                    },
                    {
                        title: '操作',
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
                data2: [],
                columns3: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center',
                        _checked: false
                    },
                    {
                        title: '应用ID',
                        key: 'id',
                        align: 'center'
                    },
                    {
                        title: '应用名称',
                        key: 'name',
                        align: 'center'
                    },
                    {
                        title: '一级分类',
                        key: 'category_name',
                        align: 'center'
                    },
                    {
                        title: '二级分类',
                        key: 'category_sub_str',
                        align: 'center'
                    },
                    {
                        title: '横竖屏',
                        key: 'is_screen',
                        align: 'center'
                    },
                    {
                        title: '包含付费',
                        key: 'is_free',
                        align: 'center'
                    },
                ],
                data3: [],
                recommend_id: '',//推荐id
                search: {
                    name: '',
                    category_id: '',
                    category_sub_Id: '',
                    screen: '',
                    free: '',
                    status: ''
                },//搜索
                cityList: [],
                cityList1: [],
                //保存所有添加
                GroupList: [],
                ruleValidate: {
                    order: [
                        { required: true, message: '请输入排序ID...', trigger: 'blur', type: 'number' }
                    ]
                }
            }
        },
        methods: {
            //表格数据
            getTableList() {
                this.$http.get(this.$config.BaseURL11 + '/appstore/admin/v1/app/recommend/info?page=' + this.page + '&page_size=' + this.pageSize).then(response => {
                    console.log(response)
                    if (response.data.errno == 10000) {
                        this.data1 = response.data.data.list;
                        this.total = response.data.data.total;

                        // response.data.data.list.forEach(val => {
                        //     this.data2 = val.app_info
                        //     console.log(val.app_info)
                        // });
                    }
                })
            },
            // 分页
            changePage(page) {
                this.page = page;
                this.getTableList();
            },
            // 应用管理弹框
            application(row) {
                console.log(row)
                this.recommend_id = row.id;
                this.id = row.sort_id;
                console.log(this.recommend_id)
                this.getApplicationtableList();
                this.modalApplication = true;
            },
            // 应用管理列表
            getApplicationtableList() {
                this.$http.get(this.$config.BaseURL11 + '/appstore/admin/v1/app/recommend/sub/list?recommend_id=' + this.recommend_id + '&page=' + this.page1 + '&page_size=' + this.pageSize1).then(response => {
                    if (response.data.errno == 10000) {
                        this.data2 = response.data.data.list;
                        this.total1 = response.data.data.total;
                    }
                })
            },
            // 应用管理分页
            changePage1(page) {
                this.page1 = page;
                this.getApplicationtableList();
            },
            // 修改
            modify(row) {
                console.log(row)
                this.modalEdit = true;
                this.edit = row;
                this.sub_id = row.sub_id;
                this.order = row.order;
            },
            //修改确定按钮
            editOk() {
                this.edit.order *= 1;
                console.log(this.edit.order)
                var isValid = true
                this.$refs['edit'].validate(valid => {
                    if (valid == false) {
                        this.$Message.error('表单输入有误,请检查!')
                        isValid = false
                    }
                })
                if (isValid == false) {
                    return
                }
                this.$http.post(this.$config.BaseURL11 + '/appstore/admin/v1/app/recommend/modify', {
                    sub_id: this.sub_id,
                    order: this.edit.order
                }).then(response => {
                    if (response.data.errno == 10000) {
                        this.modalEdit = false;
                        this.getApplicationtableList()
                        this.$Message.success("修改成功！");
                    }
                })
            },
            // 修改取消按钮
            modalEditBtn() {
                this.modalEdit = false;
                this.getApplicationtableList()
            },
            //  删除
            remove(row) {
                console.log(row)
                this.$http.post(this.$config.BaseURL11 + '/appstore/admin/v1/app/recommend/remove', {
                    sub_id: row.sub_id
                }).then(response => {
                    if (response.data.errno == 10000) {
                        this.getApplicationtableList();
                        this.$Message.success("删除成功！");
                    }
                })
            },
            modalApplicationAddBtn() {
                this.modalApplicationAdd = true;
                this.getApplicationAddTableList();
                this.getSelectList();
                this.getSelectList1()
            },
            // 应用管理列表添加列表
            getApplicationAddTableList() {
                if (this.search.free == undefined) {
                    this.search.free = ""
                }
                if (this.search.category_id == undefined) {
                    this.search.category_id = ""
                }
                if (this.search.category_sub_Id == undefined) {
                    this.search.category_sub_Id = ""
                }
                this.$http.get(this.$config.BaseURL11 + '/appstore/admin/v1/app/info?name=' + this.search.name + '&category_id=' + this.search.category_id + '&category_sub_Id=' + this.search.category_sub_Id + '&screen=' + this.search.screen + '&free=' + this.search.free + '&page=' + this.page2 + '&page_size=' + this.pageSize2).then(response => {
                    console.log(response)
                    if (response.data.errno == 10000) {
                        this.data3 = response.data.data.list;
                        response.data.data.list.forEach(val => {
                            this.category_id = val.category_id
                            console.log(this.category_id)
                            // 横竖屏ID：0全部、1横屏、2，竖屏、3横竖屏兼容
                            if (val.screen == 0) {
                                val.is_screen = "全部"
                            } else if (val.screen == 1) {
                                val.is_screen = "横屏"
                            } else if (val.screen == 2) {
                                val.is_screen = "竖屏"
                            } else if (val.screen == 3) {
                                val.is_screen = "自适应"
                            }

                            // 包含付费：0免费、1付费、2分享后免费
                            if (val.free == 0) {
                                val.is_free = "免费"
                            } else if (val.free == 1) {
                                val.is_free = "付费"
                            } else if (val.free == 2) {
                                val.is_free = "分享后免费"
                            }
                            let sel = false;
                            this.GroupList.forEach(val1 => {
                                if (val.id == val1.id) {
                                    sel = true;
                                }
                            });
                            val._checked = sel;
                        });
                        this.total2 = response.data.data.total;
                    }
                })
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
            //添加确定按钮
            ApplicationAddOk() {
                let self = this;
                let postData = {};
                let ids = [];
                this.GroupList.forEach((val, key) => {
                    console.log(val)
                    console.log(key)
                    ids.push(val.id);
                });
                postData['ids'] = ids;
                postData['id'] = this.id;
                this.$http.post(this.$config.BaseURL11 + '/appstore/admin/v1/app/recommend/add', postData).then(response => {
                    if (response.data.errno == 10000) {
                        this.modalApplicationAdd = false;
                        this.getApplicationtableList();
                        this.$Message.success("添加成功！");
                    }
                })
            },
            ApplicationAddCancel() {
                this.modalApplicationAdd = false;
                this.search.name = '',
                    this.search.category_id = [];
                this.search.category_sub_Id = [];
                this.search.screen = [];
                this.search.free = [];
                this.getApplicationtableList();
            },
            // 搜索
            query() {
                this.page2 = 1;
                this.getApplicationAddTableList();
            },
            // 应用管理添加分页
            changePage2(page) {
                this.page2 = page;
                this.getApplicationAddTableList();
            },
            // 一级分类下拉框
            getSelectList() {
                // 将二级分类置空 - 搜索
                this.search.category_sub_Id = ''
                this.$http.get(this.$config.BaseURL11 + '/appstore/admin/v1/category/list').then(response => {
                    if (response.data.errno == 10000) {
                        this.cityList = response.data.data.list;
                    }
                })
            },
            // 二级分类下拉
            getSelectList1() {

                this.$http.get(this.$config.BaseURL11 + '/appstore/admin/v1/categorytwo/list?pageSize=' + -1).then(response => {
                    if (response.data.errno == 10000) {
                        this.cityList1 = response.data.data.list;
                    }
                })
            },
            changeSearchCategoryId(val) {
                this.search.category_sub_Id = ''
            }

        },
        mounted() {
            this.getTableList();
        }
    }
</script>