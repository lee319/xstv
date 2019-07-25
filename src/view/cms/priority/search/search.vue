<style>
    .layout-search-page{
        float: right;
        margin-top: 10px;
    }
    .span {
        font-size: 14px;
        margin: 15px;
        color: #495060;
        padding-bottom: 20px;
    }
    .layout-search .ivu-poptip-confirm .ivu-poptip-body .ivu-icon {
        font-size: 16px;
        color: #ff9900;
        line-height: 18px;
        position: absolute;
        margin-left: -50px;
    }
</style>
<template>
    <div class="layout-search">
        <div class="layout-search-search">
            <Form :model="search" inline>
                <FormItem label="来源名称:" :label-width="70">
                    <Input v-model="search.src_name" style="width:200px;" placeholder="请输入来源名称..."></Input>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="query">搜索</Button>
                </FormItem>
            </Form>
        </div>
        <div class="layout-search-table">
            <Table border :columns="columns1" :data="data1"></Table>
        </div>
        <div class="layout-search-page">
            <Page :total="total" :current="page" :page-size="pageSize" @on-change="changePage" show-elevator />
        </div>
        <!-- 修改 -->
        <Modal v-model="modalEdit" title="来源播放优先级">
            <div slot="footer">
                <a @click="modalEditBtn" class="span">取消</a>
                <Button @click="okEdit" type="primary">确定</Button>
            </div>
            <Form :model="edit" label-position="right" :label-width="100">
                <FormItem label="来源ID:">
                    <Input v-model="edit.id" disabled></Input>
                </FormItem>
                <FormItem label="来源名称:">
                    <Input v-model="edit.src_name" disabled></Input>
                </FormItem>
                <FormItem label="播放排序:">
                    <Input v-model="edit.order"></Input>
                </FormItem>
                <FormItem label="描述:">
                    <Input v-model="edit.desc" type="textarea" :rows="4"></Input>
                </FormItem>
            </Form>
        </Modal>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                search: {
                    src_name: ''
                },//搜索
                id: '',
                edit: {},
                modalEdit: false,
                total: 0,
                page: 1,
                pageSize: 30,//分页
                columns1: [
                    {
                        title: 'ID',
                        key: 'id',
                        align: 'center'
                    },
                    {
                        title: '来源名称',
                        key: 'src_name',
                        align: 'center'
                    },
                    {
                        title: '来源logo',
                        key: 'src_logo',
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('img', {
                                    attrs: {
                                        src: params.row.src_logo
                                    },
                                    style: {
                                        width: '50px',
                                        height: '50px',
                                        marginTop: '5px'
                                    }
                                }),
                            ]);
                        }
                    },
                    {
                        title: '播放排序',
                        key: 'order',
                        align: 'center'
                    },
                    {
                        title: '描述',
                        key: 'desc',
                        align: 'center'
                    },
                    {
                        title: '操作',
                        width: 200,
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
                this.$http(this.$config.BaseURL1 + '/media/v2/priority/search/list?src_name=' + this.src_name + '&page=' + this.page + '&pageSize=' + this.pageSize).then(response => {
                    if (response.data.errno == 10000) {
                        this.data1 = response.data.data.list;

                        this.total = response.data.data.total;
                    }
                })
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
            //修改弹框
            modify(row) {
                this.edit = row;
                this.id = row.id;
                this.modalEdit = true;
            },
            // 修改确定按钮
            okEdit() {
                this.$http.post(this.$config.BaseURL1 + '/media/v2/priority/search/edit?src_id=' + this.id, this.edit).then(response => {
                    if (response.data.errno == 10000) {
                        this.modalEdit = false;
                        this.getTableList();
                        this.$Message.success('修改成功！')
                    }
                })
            },
            //修改取消按钮
            modalEditBtn() {
                this.modalEdit = false;
                this.getTableList();
            }
        }
    }
</script>