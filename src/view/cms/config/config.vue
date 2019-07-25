<style>
    .layout-config-page {
        float: right;
        margin-top: 10px;
    }

    .span {
        font-size: 14px;
        margin: 15px;
        color: #495060;
        padding-bottom: 20px;
    }

    .layout-config .ivu-poptip-confirm .ivu-poptip-body .ivu-icon {
        font-size: 16px;
        color: #ff9900;
        line-height: 18px;
        position: absolute;
        margin-left: -50px;
    }
</style>
<template>
    <div class="layout-config">
        <div class="layout-config-search">
            <Form :model="search" inline>
                <FormItem label="渠道名称:" :label-width="70">
                    <Select v-model="search.channelId" style="width:210px" placeholder="请选择渠道名称...">
                        <Option v-for="item in cityList" :value="item.channelId" :key="item.channelId">{{
                            item.channelName }}</Option>
                    </Select>
                </FormItem>
                <FormItem label="mac:" :label-width="40">
                    <Input v-model="search.mac" placeholder="请输入mac..." style="width:210px"></Input>
                </FormItem>
                <FormItem label="配置方式:" :label-width="70">
                    <Select v-model="search.configWay" style="width:210px" placeholder="请选择配置方式...">
                        <Option value="">全部</Option>
                        <Option :value="1">渠道</Option>
                        <Option :value="2">mac</Option>
                    </Select>
                </FormItem>
                <FormItem label="配置名称:" :label-width="70">
                    <Input v-model="search.name" placeholder="请输入配置名称..." style="width:210px"></Input>
                </FormItem>
                <FormItem label="配置场景:" :label-width="70">
                    <Select v-model="search.sceneId" style="width:210px" placeholder="请选择配置场景...">
                        <Option v-for="item in cityList1" :value="item.id" :key="item.id">{{ item.name }}</Option>
                    </Select>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="query">搜索</Button>
                </FormItem>
                <FormItem :label-width="170">
                    <Button type="success" @click="modalAdd = true">添加</Button>
                    <Modal v-model="modalAdd" title="添加终端模板配置">
                        <div slot="footer">
                            <a @click="addCancel" class="span">取消</a>
                            <Button @click="okAdd" type="primary">确定</Button>
                        </div>
                        <Form :model="info" label-position="right" :label-width="100">
                            <FormItem label="配置名称:">
                                <Input v-model="info.name" placeholder="请输入配置名称..."></Input>
                            </FormItem>
                            <FormItem label="配置场景:">
                                <Select v-model="info.sceneId" placeholder="请选择配置场景...">
                                    <Option v-for="item in cityList1" :value="item.id" :key="item.id">{{ item.name }}
                                    </Option>
                                </Select>
                            </FormItem>
                            <FormItem label="配置方式:">
                                <RadioGroup v-model="info.configWay">
                                    <Radio :label="1">
                                        <span>渠道</span>
                                    </Radio>
                                    <Radio :label="2">
                                        <span>mac</span>
                                    </Radio>
                                </RadioGroup>
                            </FormItem>
                            <FormItem label="配置渠道:" v-if="info.configWay !=2">
                                <Select v-model="info.channelId" placeholder="请选择配置渠道...">
                                    <Option v-for="item in cityList" :value="item.channelId" :key="item.channelId">{{
                                        item.channelName }}</Option>
                                </Select>
                            </FormItem>
                            <FormItem label="配置mac:" v-if="info.configWay != 1">
                                <Input v-model="info.mac" placeholder="请输入配置mac,按照,分隔..." type="textarea"
                                    :rows="4"></Input>
                            </FormItem>
                            <FormItem label="描述:">
                                <Input v-model="info.description" placeholder="请输入描述..." type="textarea"
                                    :rows="4"></Input>
                            </FormItem>

                            <!--  -->
                        </Form>
                    </Modal>
                </FormItem>
            </Form>
        </div>
        <div class="layout-config-table">
            <Table border :columns="columns1" :data="data1"></Table>
        </div>
        <div class="layout-config-page">
            <Page :total="total" :current="page" :page-size="pageSize" @on-change="changePage" show-elevator />
        </div>
        <!-- 修改 -->
        <Modal v-model="modalEdit" title="修改终端模板配置">
            <div slot="footer">
                <a @click="modalEditbtn" class="span">取消</a>
                <Button @click="okEdit" type="primary">确定</Button>
            </div>
            <Form :model="edit" label-position="right" :label-width="100">
                <FormItem label="配置名称:">
                    <Input v-model="edit.name"></Input>
                </FormItem>
                <FormItem label="配置场景:">
                    <Select v-model="edit.sceneId" placeholder="请选择配置场景...">
                        <Option v-for="item in cityList1" :value="item.id" :key="item.id">{{ item.name }}</Option>
                    </Select>
                </FormItem>
                <FormItem label="配置方式:">
                    <Input v-model="edit.is_configWay" disabled></Input>
                </FormItem>
                <FormItem label="配置渠道:" v-if="edit.configWay !=2">
                    <Select v-model="edit.channelId" placeholder="请选择配置渠道...">
                        <Option v-for="item in cityList" :value="item.channelId" :key="item.channelId">{{item.channelName
                            }}</Option>
                    </Select>
                </FormItem>
                <FormItem label="配置mac:" v-if="edit.configWay !=1">
                    <Input v-model="edit.mac" placeholder="请输入配置mac..." type="textarea" :rows="4"></Input>
                </FormItem>
                <FormItem label="描述:">
                    <Input v-model="edit.description" placeholder="请输入描述..." type="textarea" :rows="4"></Input>
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
                    channelId: '',
                    mac: '',
                    configWay: '',
                    name: '',
                    sceneId: ''
                },//搜索
                total: 0,
                page: 1,
                pageSize: 30,//分页
                cityList: [],
                cityList1: [],//下拉框
                info: {},
                modalAdd: false,//添加
                edit: {},
                modalEdit: false,//修改
                id: '',
                columns1: [
                    {
                        title: 'ID',
                        key: 'id',
                        align: 'center'
                    },
                    {
                        title: '配置名称',
                        key: 'name',
                        align: 'center'
                    },
                    {
                        title: '渠道',
                        key: 'channelId',
                        align: 'center'
                    },
                    {
                        title: 'mac',
                        key: 'mac',
                        align: 'center'
                    },
                    {
                        title: '配置方式',
                        key: 'is_configWay',
                        align: 'center'
                    },
                    {
                        title: '配置场景',
                        key: 'sceneName',
                        align: 'center'
                    },
                    // {
                    //     title: '描述',
                    //     key: 'description',
                    //     align: 'center'
                    // },
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
                data1: []
            }
        },
        methods: {
            // 列表
            getTableList() {
                this.$http.get(this.$config.BaseURL + '/scene/config/list?channelId=' + this.search.channelId + '&mac=' + this.search.mac + '&configWay=' + this.search.configWay + '&name=' + this.search.name +
                    '&sceneId=' + this.search.sceneId + '&page=' + this.page + '&pageSize=' + this.pageSize).then(response => {
                        if (response.data.errno == 10000) {
                            console.log(response)
                            this.data1 = response.data.data.list;
                            // 配置方式：1渠道，2mac
                            response.data.data.list.forEach(val => {
                                if (val.configWay == 1) {
                                    val.is_configWay = "渠道"
                                } else if (val.configWay == 2) {
                                    val.is_configWay = "mac"
                                }
                            });
                            this.total = response.data.data.total;
                        }
                    })
            },
            // 渠道下拉框
            getChannelSelect() {
                this.$http.get(this.$config.BaseURL2 + '/tv/channel/list').then(response => {
                    if (response.data.errno == 10000) {
                        this.cityList = response.data.data.list;
                    }
                })
            },
            // 配置场景下拉框
            getSceneSelect() {
                this.$http.get(this.$config.BaseURL + '/scene/scene/list').then(response => {
                    if (response.data.errno == 10000) {
                        this.cityList1 = response.data.data.list;
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
            // 添加取消按钮
            addCancel() {
                this.info = {};
                this.modalAdd = false;
                this.getTableList();
            },
            //添加
            okAdd() {
                console.log(1111)
                this.$http.post(this.$config.BaseURL + '/scene/config/save', this.info).then(response => {
                    if (response.data.errno == 10000) {
                        this.info = {};
                        this.modalAdd = false;
                        this.getTableList();
                        this.$Message.success("添加成功");
                    }
                })
            },
            //修改
            modify(row) {
                console.log(row);
                if (row.configWay == 1) {
                    row.is_configWay = '渠道';
                } else if (row.configWay == 2) {
                    row.is_configWay = 'mac';
                }

                this.id = row.id;
                this.edit = row;
                this.modalEdit = true;
            },
            // 修改确定按钮
            okEdit() {
                this.edit.id = this.id
                this.$http.post(this.$config.BaseURL + '/scene/config/save', this.edit).then(response => {
                    if (response.data.errno == 10000) {
                        this.modalEdit = false;
                        this.getTableList();
                        this.$Message.success("修改成功");
                    }
                })
            },
            // 修改取消按钮
            modalEditbtn() {
                this.modalEdit = false;
                this.getTableList();
            },
            // 删除
            remove(row) {
                this.$http.get(this.$config.BaseURL + '/scene/config/delete?id=' + row.id).then(response => {
                    if (response.data.errno == 10000) {
                        this.getTableList();
                        this.$Message.success("删除成功");
                    }
                })
            }

        },
        mounted() {
            this.getTableList();
            this.getChannelSelect();
            this.getSceneSelect()
        }
    }
</script>