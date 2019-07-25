<style>
    .layout-manage-page {
        float: right;
        margin-top: 10px;
    }
</style>
<template>
    <div class="layout-manage">
        <!-- 搜索 -->
        <div class="layout-manage-search">
            <Form :model="search" inline>
                <FormItem label="电台名称:" :label-width="70">
                    <Input v-model="search.name" placeholder="请输入电台名称..." style="width: 200px;"></Input>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="query">搜索</Button>
                </FormItem>
            </Form>
        </div>
        <!-- 表格 -->
        <div class="layout-manage-table">
            <Table border :columns="columns1" :data="data1"></Table>
        </div>
        <!-- 分页 -->
        <div class="layout-manage-page">
            <Page :total="total" :current="page" :page-size='pageSize' @on-change="changePage" show-elevator />
        </div>
        <!-- 修改 -->
        <div class="layout-manage-edit">
            <Modal v-model="modalEdit" title="修改">
                <div slot="footer">
                    <a @click="modalEdit=false" class="span">取消</a>
                    <Button @click="editOk" type="primary">确定</Button>
                </div>
                <Form :model="edit" label-position="right" :label-width="120">
                    <FormItem label="ID:">
                        <Input v-model="edit.id" disabled></Input>
                    </FormItem>
                    <FormItem label="电台ID:">
                        <Input v-model="edit.station_id" disabled></Input>
                    </FormItem>
                    <FormItem label="电台名称:">
                        <Input v-model="edit.name" disabled></Input>
                    </FormItem>
                    <FormItem label="支持得码率列表:">
                        <Input v-model="edit.rate_bill" disabled></Input>
                    </FormItem>
                    <FormItem label="电台封面小图:">
                        <img :src="edit.thumbnail_url" alt="" style="width:40px;height: 40px;">
                    </FormItem>
                    <FormItem label="电台封面大图:">
                        <img :src="edit.logo_url" alt="" style="width:40px;height: 40px;">
                    </FormItem>
                    <FormItem label="电台累计收听次数:">
                        <Input v-model="edit.play_count" disabled></Input>
                    </FormItem>
                    <FormItem label="更新时间:">
                        <Input v-model="edit.update_time" disabled></Input>
                    </FormItem>
                    <FormItem label="第三方状态:">
                        <Input v-model="edit.origin_status" disabled></Input>
                    </FormItem>
                    <FormItem label="上线状态:">
                        <Select v-model="edit.status" style="width:370px">
                            <Option :value="1">上线</Option>
                            <Option :value="2">下线</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="电台简介:">
                        <Input v-model="edit.desc" type="textarea" :rows="4"></Input>
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
                    name: ''
                },//搜索
                page: 1,
                total: 0,
                pageSize: 30,
                edit: {},
                modalEdit: false,
                id: '',//一整行id
                columns1: [
                    {
                        title: '电台ID',
                        key: 'station_id',
                        align: 'center'
                    },
                    {
                        title: '电台名称',
                        key: 'name',
                        align: 'center'
                    },
                    {
                        title: '第三方状态',
                        key: 'is_origin_status',
                        align: 'center'
                    },
                    {
                        title: '状态',
                        key: 'ISstatus',
                        align: 'center'
                    },
                    {
                        title: '电台简介',
                        key: 'desc',
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
                data1: [
                    {
                        id: 1
                    }
                ]
            }
        },
        methods: {
            getTableList() {
                let self = this;
                self.$http(this.$config.BaseURL1 + '/media/v2/audio/manage/list?name=' + self.search.name + '&page=' + self.page + '&pageSize=' + self.pageSize).then(response => {
                    if (response.data.errno == 10000) {
                        console.log(response)
                        //分页
                        self.total = response.data.data.total;
                        self.data1 = response.data.data.list;

                        response.data.data.list.forEach(val => {
                            // 1上线，2下线
                            if (val.origin_status == 1) {
                                val.is_origin_status = '上线'
                            } else if (val.origin_status == 2) {
                                val.is_origin_status = '下线'
                            }
                            // 1上线，2下线
                            if (val.status == 1) {
                                val.ISstatus = '上线'
                            } else if (val.status == 2) {
                                val.ISstatus = '下线'
                            }
                        });
                    }
                })
            },
            //搜索
            query() {
                this.page = 1;
                this.getTableList()
            },
            changePage(page) {
                this.page = page;
                this.getTableList()
            },
            //修改
            modify(row) {
                this.edit = row;
                this.id = row.id;
                this.modalEdit = true;
            },
            //修改确定按钮
            editOk() {
                let self = this;
                self.$http.post(this.$config.BaseURL1 + '/media/v2/audio/manage/modify?id=' + self.id, self.edit).then(response => {
                    if (response.data.errno == 10000) {
                        this.modalEdit = false;
                        self.getTableList();
                        self.$Message.success('修改成功！')
                    }
                }, response => { })
            }
        },
        mounted() {
            this.getTableList()
        }
    }
</script>