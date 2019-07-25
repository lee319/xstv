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
                        <Input  placeholder="请输入应用名称..."></Input>
                    </FormItem>
                    <FormItem label="一级分类:" :label-width="70">
                        <Select  style="width:200px" placeholder="请选择一级分类..."
                            @on-change="changeSearchCategoryId">
                            <Option value="">全部</Option>
                            <!-- <Option v-for="item in cityList" :value="item.id" :key="item.id">{{ item.name }} -->
                            </Option>
                        </Select>
                    </FormItem>
                    <FormItem label="二级分类:" :label-width="70">
                        <Select style="width:200px" placeholder="请选择...">
                            <Option value="">全部</Option>
                            <!-- <Option v-for="item in cityList1" :value="item.id" :key="item.id"
                                
                            </Option> -->
                        </Select>
                    </FormItem>
                    <FormItem label="横竖屏:" :label-width="60">
                        <Select style="width:200px" placeholder="请选择横竖屏...">
                            <Option :value="0">全部</Option>
                            <Option :value="1">横屏</Option>
                            <Option :value="2">竖屏</Option>
                            <Option :value="3">自适应</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="包含付费:" :label-width="70">
                        <Select  style="width:200px" placeholder="请选择包含付费...">
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
                <!-- <Page :total="total2" :current="page2" :page-size='pageSize2' @on-change="changePage2" show-elevator /> -->
            </div>
            <div style="margin-top:40px;"></div>
        </Modal>
        <!-- 分页 -->
        <div class="layout-recommendation-page">
            <!-- <Page :total="total" :current="page" :page-size='pageSize' @on-change="changePage" show-elevator /> -->
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
                   
                },
                id: '',
                order: '',
                columns1: [
                    {
                        title: '序号',
                        key: '',
                        align: 'center'
                    },
                    {
                        title: '名称',
                        key: '',
                        align: 'center'
                    },
                    {
                        title: '显示名称',
                        key: '',
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
                        key: '',
                        align: 'center'
                    },
                    {
                        title: '一级分类',
                        key: '',
                        align: 'center'
                    },
                    {
                        title: '排序ID',
                        key: '',
                        align: 'center'
                    },
                    {
                        title: '包含付费内容',
                        key: '',
                        align: 'center'
                    },
                    {
                        title: '发布时间',
                        key: '',
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
                        align: 'center',
                        _checked: false
                    },
                    {
                        title: '应用ID',
                        key: '',
                        align: 'center'
                    },
                    {
                        title: '应用名称',
                        key: '',
                        align: 'center'
                    },
                    {
                        title: '一级分类',
                        key: '',
                        align: 'center'
                    },
                    {
                        title: '二级分类',
                        key: '',
                        align: 'center'
                    },
                    {
                        title: '横竖屏',
                        key: '',
                        align: 'center'
                    },
                    {
                        title: '包含付费',
                        key: '',
                        align: 'center'
                    },
                ],
                data3: [],
                recommend_id: '',//推荐id
                search: {
                   
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
                
            },
            // 分页
            changePage(page) {
                this.page = page;
                this.getTableList();
            },
            // 应用管理弹框
            application() {
               
                this.modalApplication = true;
            },
            // 应用管理列表
            getApplicationtableList() {
               
            },
            // 应用管理分页
            changePage1(page) {
                this.page1 = page;
                this.getApplicationtableList();
            },
            // 修改
            modify() {
               
                this.modalEdit = true;
              
            },
            //修改确定按钮
            editOk() {
               
            },
            // 修改取消按钮
            modalEditBtn() {
                this.modalEdit = false;
              
            },
            //  删除
            remove() {
               
            },
            modalApplicationAddBtn() {
                
            },
            // 应用管理列表添加列表
            getApplicationAddTableList() {
               
            },
            // 选中
            checkBoxlist() {
               
               
            },
            // 取消选择
            checkBoxlistCancel() {
               
            },
            //添加确定按钮
            ApplicationAddOk() {
               
            },
            ApplicationAddCancel() {
               
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
              
            },
            // 二级分类下拉
            getSelectList1() {

               
            },
            changeSearchCategoryId() {
               
            }

        },
        mounted() {
            this.getTableList();
        }
    }
</script>