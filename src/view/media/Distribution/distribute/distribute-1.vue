<style>
    .span {
        font-size: 14px;
        margin: 15px;
        color: #495060;
        padding-bottom: 20px;
    }

    .layout-distribute .ivu-poptip-confirm .ivu-poptip-body .ivu-icon {
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

    .layout-distribute-page {
        float: right;
        margin-top: 10px;
    }

    .layout-distribute-search {
        float: left;
    }

    .layout-distribute-add {
        float: right;
    }
    .layout-distribute-modify {
        float: right;
    }
</style>
<template>
    <div class="layout-distribute">
        <!-- 搜索 -->
        <div class="layout-distribute-search">
            <Form :model="search" inline>
                <FormItem label="业务名称:" :label-width="70">
                    <Input v-model="search.name" style="width:200px;" placeholder="请输入业务名称..."></Input>
                </FormItem>
                <FormItem label="是否启用:" :label-width="70">
                    <Select v-model="search.status" style="width:200px" aria-placeholder="请选择是否启用...">
                        <Option value="">全部</Option>
                        <Option :value="1">启用</Option>
                        <Option :value="2">不启用</Option>
                    </Select>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="query">搜索</Button>
                </FormItem>
            </Form>
        </div>
        <!-- 添加 -->
        <div class="layout-distribute-add">
            <Button type="success" @click="modalAddBtn">添加</Button>
            <Modal v-model="modalAdd" title="添加">
                <div slot="footer">
                    <a @click="addCancel" class="span">取消</a>
                    <Button @click="addOk" type="primary">确定</Button>
                </div>
                <Form :model="info" label-position="right" :label-width="100">
                    <FormItem label="业务名称:">
                        <Input v-model="info.name"></Input>
                    </FormItem>
                    <FormItem label="下发来源:">
                        <CheckboxGroup v-model="info.cp_id">
                            <Checkbox v-for="item in CheckboxList" :label="item.id">{{item.name}}</Checkbox>
                        </CheckboxGroup>
                    </FormItem>
                    <FormItem label="下发频道:">
                        <CheckboxGroup v-model="info.category_id">
                            <Checkbox v-for="item in CheckboxList1" :label="item.id">{{item.name}}</Checkbox>
                        </CheckboxGroup>
                    </FormItem>
                    <FormItem label="描述:">
                        <Input v-model="info.desc" type="textarea" :rows="4" placeholder="请输入描述..."></Input>
                    </FormItem>
                </Form>
            </Modal>
        </div>
        <!-- 修改 -->
        <div class="layout-distribute-edit">
            <Modal v-model="modalEdit" title="修改分发业务信息">
                <div slot="footer">
                    <a @click="editCancel" class="span">取消</a>
                    <Button @click="editOk" type="primary">确定</Button>
                </div>
                <Form :model="edit" label-position="right" :label-width="100">
                    <FormItem label="业务ID:">
                        <Input v-model="edit.id" disabled></Input>
                    </FormItem>
                    <FormItem label="业务名称:">
                        <Input v-model="edit.name"></Input>
                    </FormItem>
                    <FormItem label="下发来源:">
                        <CheckboxGroup v-model="edit.cp_id">
                            <Checkbox v-for="item in CheckboxList2" :label="item.id">{{item.name}}</Checkbox>
                        </CheckboxGroup>
                    </FormItem>
                    <FormItem label="下发频道:">
                        <CheckboxGroup v-model="edit.category_id">
                            <Checkbox v-for="item in CheckboxList3" :label="item.id">{{item.name}}</Checkbox>
                        </CheckboxGroup>
                    </FormItem>
                    <FormItem label='是否启用:'>
                        <RadioGroup v-model="edit.status">
                            <Radio :label="1">是</Radio>
                            <Radio :label="0">否</Radio>
                        </RadioGroup>
                    </FormItem>
                    <FormItem label="描述">
                        <Input v-model="edit.desc" type="textarea" :rows="4"></Input>
                    </FormItem>
                </Form>
            </Modal>
        </div>
        <div style="clear: both;"></div>
        <div class="layout-distribute-table">
            <Table border :columns="columns1" :data="data1"></Table>
        </div>
        <div class="layout-distribute-page">
            <Page :total="total" :current="page" :page-size='pageSize' @on-change="changePage" show-elevator />
        </div>
    </div>
</template>
<script>
    var moment = require("moment");
    export default {
        data() {
            return {
                search: {
                    name: '',
                    status: '',
                },
                total: 0,
                page: 1,
                pageSize: 30,
                info: {},
                themeInfo: {},
                modalAdd: false,//添加
                id: '',
                edit: {},
                modalEdit: false,//修改
                CheckboxList: [],
                CheckboxList1: [],
                CheckboxList2: [],
                CheckboxList3: [],
                columns1: [
                    {
                        title: '业务ID',
                        key: 'id',
                        align: 'center'
                    },
                    {
                        title: '业务名称',
                        key: 'name',
                        align: 'center'
                    },
                    {
                        title: '是否启用',
                        key: 'ISstatus',
                        align: 'center'
                    },
                    {
                        title: '描述',
                        key: 'desc',
                        align: 'center'
                    },
                    {
                        title: '创建时间',
                        key: 'is_create_time',
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
                                            this.modify(params.row)
                                        }
                                    }
                                }, '修改')
                            ]);
                        }
                    }
                ],
                data1: []
            }
        },
        methods: {
            // 表格数据
            getTableList() {
                let self = this;
                
                self.$http(this.$config.BaseURL7 + '/media/v2/distribute/list?name=' + self.search.name + '&status=' + self.search.status +
                    '&page=' + self.page + '&pagesize=' + self.pageSize).then(response => {
                        console.log(response)
                        if (response.data.errno == 10000) {
                            self.data1 = response.data.data.list;
                            // 分页
                            self.total = response.data.data.total;
                            // 1:启用 2:不启用
                            response.data.data.list.forEach(val => {
                                if (val.status == 1) {
                                    val.ISstatus = '启用'
                                } else if (val.status == 2) {
                                    val.ISstatus = '不启用'
                                }
                                //转换时间
                                val.is_create_time = moment(val.create_time).format(
                                    "YYYY-MM-DD HH:mm:ss"
                                )
                            });
                        }
                    })
            },
            //搜索
            query() {
                this.page = 1;
                this.getTableList();
            },
            //分页
            changePage(page) {
                this.page = page;
                this.getTableList();
            },
             // 添加复选框
            getCheckboxList() {
                let self = this;
                self.$http(this.$config.BaseURL1 + '/media/v2/origin/list').then(response => {
                    console.log(response)
                    if (response.data.errno == 10000) {
                        self.CheckboxList = response.data.data.list;
                        self.CheckboxList2 = response.data.data.list;
                    }
                })
            },
            getCheckboxList1() {
                let self = this;
                self.$http(this.$config.BaseURL1 + '/media/v2/category/list').then(response => {
                    console.log(response)
                    if (response.data.errno == 10000) {
                        self.CheckboxList1 = response.data.data.list;
                        self.CheckboxList3 = response.data.data.list;
                    }
                })
            },
            // 添加弹框
            modalAddBtn() {
                this.modalAdd = true;
                this.getCheckboxList();
                this.getCheckboxList1();

            },
            //  添加确定按钮
            addOk() {
                let self = this;
                this.info.cp_id *= 1;
                this.info.category_id *= 1;
                self.$http.post(this.$config.BaseURL7 + '/media/v2/distribute/modify', self.info).then(response => {
                    // console.log(response)
                    if (response.data.errno == 10000) {
                        this.info = {};
                        this.getTableList();
                        this.modalAdd = false;
                        this.$Message.success("添加成功！");
                    }
                })
            },
            // 添加取消按钮
            addCancel() {
                this.modalAdd = false;
                this.info = {};
                this.getTableList();
            },
            //修改
            modify(row) {
                console.log(row);
                this.edit = row;
                this.id = row.id;
                this.getCheckboxList();
                this.getCheckboxList1();
                this.modalEdit = true;
            },
            //修改确定按钮
            editOk() {
                let self = this;
                self.$http.post(this.$config.BaseURL7 + '/media/v2/distribute/modify',self.edit).then(response => {
                    console.log(response,'response')
                    if (response.data.errno == 10000) {
                        this.modalEdit = false;
                        this.getTableList();
                        this.$Message.success('修改成功！');
                    }
                })
            },
            // 修改取消按钮
            editCancel() {
                this.getTableList();
                this.modalEdit = false;
            }
        },
        mounted() {
            this.getTableList();
        }
    }
</script>