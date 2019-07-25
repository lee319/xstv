<style>
    .layout-category-page {
        margin-top: 10px;
        float: right;
    }

    .span {
        font-size: 14px;
        margin: 15px;
        color: #495060;
        padding-bottom: 20px;
    }

    .layout-category .ivu-poptip-confirm .ivu-poptip-body .ivu-icon {
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
    <div class="layout-category">
        <div class="layout-category-table">
            <Table border :columns="columns1" :data="data1"></Table>
        </div>
        <Modal v-model="modalNew" title="内容管理" width="1200" :transfer="false">
            <div class="layout-category-add">
                <Button type="success" @click="modalAddBtn" style="float: right;margin-bottom: 10px;">添加</Button>
                <Modal v-model="modalAdd" title="添加节目" :transfer="true" width="1200">
                    <div slot="footer">
                        <a @click="addCancel" class="span">取消</a>
                        <Button @click="addOk" type="primary">确定</Button>
                    </div>
                    <Form :model="search" label-position="right" inline>
                        <FormItem label="所属分类:" :label-width="70">
                            <Select style="width:200px" v-model="search.category_id" placeholder="请选择所属分类...">
                                <Option value="">全部</Option>
                                <Option v-for="item in Taxonomy" :value="item.id" :key="item.id">{{ item.name }}</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="名称:" :label-width="50">
                            <Input v-model="search.keywords" style="width:200px" placeholder="请输入名称搜索..."></Input>
                        </FormItem>
                        <FormItem label="付费类型:" :label-width="80">
                            <Select style="width:200px" v-model="search.cost_type" placeholder="请选择是否付费...">
                                <Option value="">全部</Option>
                                <Option :value="1">会员</Option>
                                <Option :value="0">免费</Option>
                                <Option :value="2">单片购买</Option>
                            </Select>
                        </FormItem>
                        <FormItem>
                            <Button type="primary" @click="query">搜索</Button>
                        </FormItem>
                    </Form>
                    <Table border ref="selection" :columns="columns3" :data="data3" @on-select="checkBoxlist" @on-select-cancel="checkBoxlistCancel"
                        @on-select-all="checkBoxlist"></Table>
                    <div class="layout-category-page">
                        <Page :total="total1" :current="page" :page-size="pageSize1" @on-change="changePage1" show-elevator />
                    </div>
                    <div style="clear: both;"></div>
                </Modal>
            </div>
            <Table border :columns="columns2" :data="data2" style="clear: both;"></Table>
            <div class="layout-category-page">
                <Page :total="total" :current="page" :page-size="pageSize" @on-change="changePage" show-elevator />
            </div>
            <div style="clear: both;"></div>
        </Modal>
        <Modal v-model="modalInfo" title="查看详情" width="700">
            <div>
                <div style="padding:10px">
                </div>
            </div>
        </Modal>
        <Modal v-model="modalEdit" title="修改">
            <div slot="footer">
                <a @click="modalEdit1=false" class="span">取消</a>
                <Button @click="editOk" type="primary">确定</Button>
            </div>
            <Form :model="edit" label-position="right" :label-width="100" ref="edit" :rules="ruleValidate">
                <FormItem label="排序id" prop="recommend_order">
                    <Input v-model="edit.recommend_order"></Input>
                </FormItem>
            </Form>
        </Modal>
    </div>
</template>
<script>

    export default {
        data() {
            return {
                //内容管理
                modalNew: false,
                //添加
                modalAdd: false,
                // list_id
                listId: '',
                //添加搜索
                search: {
                    keywords: '',
                    category_id: ''
                },
                //所属分类
                Taxonomy: [],
                //数据总数	
                total: 0,
                //每页条数
                pageSize: 50,
                page: 1,

                //添加里面分页
                total1: 0,
                pageSize1: 10,
                page1: 1,
                //查看详情
                news: [],
                modalInfo: false,
                videoId: '',
                //保存所有添加
                GroupList: [],
                //修改
                edit: {},
                modalEdit: false,
                listId1: '',
                videoId1: '',
                //验证
                ruleValidate: {
                    recommend_order: [
                        { required: true, message: '请输入排序id', trigger: 'blur' }
                    ]
                },
                columns1: [
                    {
                        type: 'index',
                        width: 70,
                        align: 'center',
                        title: '序号'
                    },
                    {
                        title: '名称',
                        key: 'name',
                        align: 'center'
                    },
                    {
                        title: '显示名称',
                        key: 'title',
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
                                }, '内容管理')
                            ]);
                        }
                    }
                ],
                data1: [],
                columns2: [
                    {
                        type: 'index',
                        width: 70,
                        align: 'center',
                        title: '序号'
                    },
                    {
                        title: '节目名称',
                        key: 'title',
                        align: 'center'
                    },
                    {
                        title: '节目分类',
                        key: 'category_name',
                        align: 'center'
                    },
                    {
                        title: '排序ID',
                        key: 'recommend_order',
                        align: 'center'
                    },
                    {
                        title: '排序ID(全局排序)',
                        key: 'global_order',
                        align: 'center'
                    },
                    {
                        title: '类型',
                        key: 'Iscost_type',
                        align: 'center'
                    },
                    {
                        title: '导演',
                        key: 'persons',
                        align: 'center'
                    },
                    {
                        title: '上映年代',
                        key: 'release_year',
                        align: 'center'
                    },
                    {
                        title: '操作',
                        width: 170,
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
                                            this.modify1(params.row)
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
                                                    size: "small"
                                                }
                                            }, "删除"
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
            //内容管理
            show(row) {
                this.modalNew = true;
                this.listId = row.list_id; //全局list_id
                this.getContentList()
            },
            //手工推荐管理列表
            getTabList() {
                let self = this;
                self.$http(this.$config.BaseURL1 + '/media/recommend/lists').then(response => {
                    if (response.data.errno == 10000) {
                        console.log(response)
                        self.data1 = response.data.data.list
                        response.data.data.list.forEach(val => {
                            self.list_id = val.list_id
                        });
                    }

                }, response => {

                })
            },
            //内容管理列表
            getContentList() {
                let self = this;
                self.$http(this.$config.BaseURL1 + '/media/recommend/detail?list_id=' + self.listId + '&pageSize=' + self.pageSize + '&page=' + self.page).then(response => {
                    console.log(response)
                    if (response.data.errno == 10000) {
                        //给表格赋值
                        self.data2 = response.data.data.list;
                        //判断类型
                        response.data.data.list.forEach(val => {
                            if (val.cost_type == 0) {
                                val.Iscost_type = "免费"
                            } else if (val.cost_type == 1) {
                                val.Iscost_type = "会员"
                            } else if (val.cost_type == 2) {
                                val.Iscost_type = "单片购买"
                            }
                        });
                        //分页
                        self.total = response.data.data.total;
                    } 
                }, response => {

                })
            },
            //添加弹框
            modalAddBtn() {
                this.modalAdd = true;
                //添加表格
                this.getAddList();
                this.getSelectList()
                this.GroupList = [];

            },
            //添加确定按钮
            addOk() {
                let self = this;
                let postData = { list: [] };
                this.GroupList.forEach((val, key) => {
                    postData.list.push({
                        video_id: val.id,
                        order: key + 1
                    });
                });
                self.$http.post(this.$config.BaseURL1 + '/media/recommend/add?list_id=' + self.listId, postData).then(response => {
                    if (response.data.errno == 10000) {
                        self.modalAdd = false;
                        this.getContentList()
                        this.$Message.success('添加成功!')
                    }
                }, response => {

                })
            },
            //确定取消按钮
            addCancel() {
                this.modalAdd = false;
                this.$Message.info("点击了取消!");
            },
            //修改排序id
            modify1(row) {
                this.modalEdit = true;
                this.edit = row;
                console.log(row)
                this.videoId1 = row.id;
                // this.listId1 = row.;
            },
            editOk() {
                let self = this;
                self.$http.post(this.$config.BaseURL1 + '/media/recommend/videoreorder?list_id=' + self.listId + '&video_id=' + self.videoId1 + '&new_order=' + self.edit.recommend_order, self.edit, {
                    transformRequest: [function (data) {
                        let ret = ''
                        for (let it in data) {
                            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                        }
                        return ret
                    }],
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }).then(response => {
                    if (response.data.errno == 10000) {
                        console.log(response)
                        self.edit = {};
                        self.getContentList();
                        self.modalEdit = false;
                        self.$Message.success("修改成功");
                    }

                }, response => { })
            },
            //添加里面表格
            getAddList() {
                let self = this;
                if(this.search.cost_type == undefined){
                    this.search.cost_type = ""
                }
                self.$http(this.$config.BaseURL1 + '/media/search?keywords=' + self.search.keywords + '&pageSize=' + self.pageSize1 + '&page=' + self.page1 + '&category_id=' + self.search.category_id + '&cost_type=' + self.search.cost_type).then(response => {
                    if (response.data.errno == 10000) {
                        console.log(response)
                        // 给表格赋值
                        self.data3 = response.data.data.list || [];
                        //分页
                        self.total1 = response.data.data.total || [];

                        // Iscost_type
                        response.data.data.list.forEach(val => {
                            if (val.cost_type == 0) {
                                val.Iscost_type = "免费";
                            } else if (val.cost_type == 1) {
                                val.Iscost_type = "会员";
                            } else if (val.cost_type == 2) {
                                val.Iscost_type = "单片购买";
                            }
                            let sel = false;
                            this.GroupList.forEach(val1 => {
                                if (val.id == val1.id) {
                                    sel = true;
                                }
                            });
                            val._checked = sel;
                        });
                    }


                }, response => {

                })
            },
            //所属分类下拉框
            getSelectList() {
                let self = this;
                self.$http(this.$config.BaseURL1 + '/media/category/list').then(response => {
                    if (response.data.errno == 10000) {
                        console.log(response)
                        self.Taxonomy = response.data.data.list;
                    }

                }, response => {

                })
            },
            //内容管理分页
            changePage(page) {
                this.page = page
                this.getContentList();
            },
            //添加分页
            changePage1(page) {
                this.page1 = page
                this.getAddList()
            },
            //搜索
            query() {
                this.page = 1
                this.getAddList();
            },
            // 选中
            checkBoxlist(selection, row) {
                console.log(selection);
                console.log(row)
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
            //查看详情
            info() {
                this.modalInfo = true;
            },
            //删除
            remove(row) {
                let self = this;
                self.$http.post(this.$config.BaseURL1 + '/media/recommend/remove?list_id=' + self.listId + '&video_id=' + row.id).then(response => {
                    if (response.data.errno == 10000) {
                        this.$Message.success("删除成功");
                        this.getContentList()
                    }

                }, response => {

                })
            }
        },
        mounted() {
            this.getTabList()
        }
    }
</script>