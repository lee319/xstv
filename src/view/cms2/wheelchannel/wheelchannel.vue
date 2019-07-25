<style>
    .layout-wheelchannel-page {
        float: right;
        margin-top: 10px;
    }
</style>
<template>
    <div class="layout-wheelchannel">
        <div class="layout-wheelchannel-search">
            <Form :model="search" inline>
                <FormItem label="频道名称:" :label-width="70">
                    <Input v-model="search.title" style="width:200px;" placeholder="请输入频道名称..."></Input>
                </FormItem>
                <FormItem label="频道状态:" :label-width="70">
                    <Select v-model="search.status" style="width:200px" placeholder="请输入频道状态...">
                        <Option value="">全部</Option>
                        <Option :value="0">下线</Option>
                        <Option :value="1">上线</Option>
                    </Select>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="query">搜索</Button>
                </FormItem>
                <FormItem>
                    <Button type="success" @click="modalAdd = true">添加</Button>
                </FormItem>
            </Form>
        </div>
        <Modal v-model="modalAdd" title="添加">
            <Form :model="info" label-position="right" :label-width="100">
                <FormItem label="频道名称:">
                    <Input v-model="info.title" placeholder="请输入频道名称..."></Input>
                </FormItem>
                <FormItem label="上传背景图:">
                    <Upload :action="$config.BaseURLfile + '/common/upload/file'" ref="upload"
                        :on-success="handleSuccessInfoBgcMap" :format="['jpg','jpeg','png']" :max-size="2048"
                        :on-format-error="handleFormatErrorInfoBgcMap" :on-exceeded-size="handleMaxSizeInfoBgcMap"
                        :with-credentials="true" clearFiles>
                        <Button icon="ios-cloud-upload-outline" :with-credentials="true">上传图片</Button>
                    </Upload>
                </FormItem>
                <FormItem label="上传海报图:">

                </FormItem>
                <FormItem label="台标:">
                </FormItem>
                <FormItem label="排序ID:">
                    <Input v-model="info.sortNumber" placeholder="请输入排序ID..."></Input>
                </FormItem>
                <FormItem label="频道状态:">
                    <Input v-model="info.input1" disabled>下线</Input>
                </FormItem>
                <FormItem label="频道跳转:">
                    <Input v-model="info.input2" type="textarea" :rows="4" placeholder="请输入频道跳转..."></Input>
                </FormItem>
                <FormItem label="描述:">
                    <Input v-model="info.input3" type="textarea" :rows="4" placeholder="请输入描述..."></Input>
                </FormItem>
            </Form>
        </Modal>
        <div class="layout-wheelchannel-table">
            <Table border :columns="columns1" :data="data1"></Table>
        </div>
        <div class="layout-wheelchannel-page">
            <Page :total="total" :current="page" :page-size='pageSize' @on-change="changePage" show-elevator />
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                search: {
                    title: '',
                    status: ''
                },//频道搜索
                total: 0,
                page: 1,
                pageSize: 30,//频道分页
                columns1: [
                    {
                        title: '频道ID',
                        key: 'id',
                        align: 'center'
                    },
                    {
                        title: '频道名称',
                        key: 'title',
                        align: 'center'
                    },
                    {
                        title: '排序ID',
                        key: 'sortNumber',
                        align: 'center'
                    },
                    {
                        title: '频道状态',
                        key: 'is_status',
                        align: 'center'
                    }
                ],
                data1: [],
                info: {},
                modalAdd: false,//添加
            }
        },
        methods: {
            // 频道列表
            getTableList() {
                if (this.search.status == undefined) {
                    this.search.status = ''
                }
                this.$http.get(this.$config.BaseURL16 + '/wheelchannel/list?title=' + this.search.title + '&status=' + this.search.status + '&page=' + this.page + '&pageSize=' + this.pageSize).then(response => {
                    if (response.data.errno == 10000) {
                        this.data1 = response.data.data.list;
                        response.data.data.list.forEach(val => {
                            // 频道状态 0 下线 1 上线
                            if (val.status == 0) {
                                val.is_status = "下线"
                            } else if (val.status == 1) {
                                val.is_status = "上线"
                            }
                        });

                        this.total = response.data.data.total;

                    }
                })
            },
            // 搜索
            query() {
                this.page = 1;
                this.getTableList();
            },
            //分页
            changePage(page) {
                this.page = page;
                this.getTableList();
            },
            // 上传背景图
            // 成功
            handleSuccessInfoBgcMap(res, file) { },
            // 上传格式验证
            handleFormatErrorInfoBgcMap(file) {
                this.$Notice.warning({
                    title: '文件格式不正确',
                    desc: '文件格式' + '文件名' + '不正确，请选择JPG或PNG'
                })
            },
            // 限制文件大小
            handleMaxSizeInfoBgcMap(file) {
                this.$Notice.warning({
                    title: '超过文件大小限制',
                    desc: '文件  ' + '文件名' + ' 太大，不超过2M.'
                })
            },
        },
        mounted() {
            this.getTableList();
        }
    }
</script>