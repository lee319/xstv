<style>
    .layout-youku-page {
        float: right;
        margin-top: 10px;
    }
</style>
<template>
    <div class="layout-youku">
        <!-- 搜索 -->
        <div class="layout-youku-search">
            <Form :model="search" inline>
                <FormItem label="节目集名称:" :label-width="80">
                    <Input v-model="search.title" style="width:200px;" placeholder="请输入节目集名称..."></Input>
                </FormItem>
                <FormItem label="地区:" :label-width="40">
                    <Input v-model="search.area" style="width:200px;" placeholder="请输入地区..."></Input>
                </FormItem>
                <FormItem label="上线状态:" :label-width="70">
                    <Select v-model="search.status" style="width:200px">
                        <Option value="">全部</Option>
                        <Option value="在线">在线</Option>
                        <Option value="下线">下线</Option>
                        <Option value="发布">发布</Option>
                    </Select>
                </FormItem>
                <FormItem label="创建时间" :label-width="70">
                    <DatePicker type="datetimerange" placeholder="请选择创建时间..." style="width: 300px" v-model="timer">
                    </DatePicker>
                </FormItem>
                <FormItem label="最后更新时间" :label-width="90">
                    <DatePicker type="datetimerange" placeholder="请选择最后更新时间..." style="width: 300px" v-model="timer1">
                    </DatePicker>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="query">搜索</Button>
                </FormItem>
            </Form>
        </div>
        <div>
            <span style="float:left;margin-top:13px;margin-right:20px;font-size:14px;">分类:</span>
            <Tabs @on-click='tabChange'>
                <TabPane :name="tab.id +''" v-for="tab in tabs" :key="tab.id" :label="tab.name+''"></TabPane>
            </Tabs>
        </div>
        <div style="clear:both;"></div>
        <div class="layout-youku-table">
            <Table border :columns="columns1" :data="data1"></Table>
        </div>
        <!-- 分页 -->
        <div class="layout-youku-page">
            <Page :total="total" :current="page" :page-size='pageSize' @on-change="changePage" show-elevator />
        </div>
        <!-- 查看 -->
        <Modal v-model="modalSee" title="查看节目集信息" width="800">
            <Row>
                <Col span="8">第三方节目集ID:{{news.id}}</Col>
                <Col span="8">节目名称:{{news.title}}</Col>
                <Col span="8">国家地区:{{news.area}}</Col>
                <Col span="8">分类:{{news.category}}</Col>
                <Col span="8">子分类:{{news.subcategory}}</Col>
                <Col span="8">正片数量:{{news.episodecount}}</Col>
                <Col span="8">是否付费:{{news.is_paid}}</Col>
                <Col span="8">节目状态:{{news.status}}</Col>
                <Col span="8">试看集数:{{news.tryepisodes}}</Col>
                <Col span="8">试看集长（秒）:{{news.trytime}}</Col>
                <Col span="8">试看类型:{{news.is_trytype}}</Col>
                <Col span="8">导演:{{news.director_list}}</Col>
                <Col span="8">牌照类型:{{news.license_list}}</Col>
                <Col span="8">海报（横板）:
                <img :src="news.thumburl" alt="" style="width:50px;height:50px;">
                </Col>
                <Col span="8">海报（竖版）:
                <img :src="news.vthumburl" alt="" style="width:50px;height:50px;"></Col>
                <Col span="24">演员列表:{{news.performer_list}}</Col>
                <Col span="24">主演列表:{{news.starring_list}}</Col>
                <Col span="24">描述:{{news.description}}</Col>
            </Row>
        </Modal>
        <!-- 查看子集 -->
        <Modal v-model="modalSubset" title="查看子集" width="1000">
            <Form :model="subsetsearch" :label-width="80">
                <FormItem label="节目集名称:">
                    <Input v-model="subsetsearch.title" disabled style="width:200px;"></Input>
                </FormItem>
            </Form>
            <Table border :columns="columns2" :data="data2"></Table>
            <div class="layout-youku-page">
                <Page :total="total1" :current="page1" :page-size='pageSize1' @on-change="changePage1" show-elevator />
            </div>
            <div style="margin-top:40px;"></div>
        </Modal>
        <!-- 子集详情 -->
        <Modal v-model="modalSubsetDetails" title="查看子集详情" width="800">
            <Row>
                <Col span="8">视频主分类:{{subset.category}}</Col>
                <Col span="8">视频时长（秒）:{{subset.duration}}</Col>
                <Col span="8">是否收费:{{subset.is_paid}}</Col>
                <Col span="8">推荐标题:{{subset.rctitle}}</Col>
                <Col span="8">节目中视频的集数或者期数:{{subset.sequence}}</Col>
                <Col span="8">节目ID:{{subset.sequence}}</Col>
                <Col span="8">视频来源:{{subset.sourcetype}}</Col>
                <Col span="8">数娱视频状态:{{subset.status}}</Col>
                <Col span="8">标题:{{subset.title}}</Col>
                <Col span="8">video_id:{{subset.videoid}}</Col>
                <Col span="8">牌照列表:{{subset.license_list}}</Col>
                <Col span="8">海报地址:
                <img :src="subset.thumburl" alt="" style="width:50px;height:50px;"></Col>
                <Col span="24">优酷PC主站地址:{{subset.weburl}}</Col>

            </Row>
        </Modal>
    </div>
</template>
<script>
    var moment = require("moment");
    export default {
        data() {
            return {
                search: {
                    title: '',
                    area: '',
                    status: '',
                    categoryName: '',
                    createStart: '',
                    createEnd: '',
                    updateStart: '',
                    updateEnd: '',
                },//搜索
                timer: [],
                timer1: [],
                page: 1,
                pageSize: 30,
                total: 0,//分页
                tabs: [],//分类
                news: [],
                modalSee: false,//查看
                subsetsearch: {
                    title: '',
                },
                id: '',
                modalSubset: false,//查看子集
                subset: [],
                modalSubsetDetails: false,//子集/子集详情
                page1: 1,
                pageSize1: 30,
                total1: 0,//分页

                columns1: [
                    {
                        title: '节目集ID',
                        key: 'id',
                        align: 'center'
                    },
                    {
                        title: '节目集名称',
                        key: 'title',
                        align: 'center'
                    },
                    {
                        title: '分类',
                        key: 'category',
                        align: 'center'
                    },
                    {
                        title: '地区',
                        key: 'area',
                        align: 'center'
                    },
                    {
                        title: '导演',
                        key: 'director_list',
                        align: 'center',
                        width: 260,
                        ellipsis: 'true'
                    },
                    {
                        title: '上线状态',
                        key: 'status',
                        align: 'center',
                        width: 100
                    },
                    {
                        title: '创建时间',
                        key: 'create_time',
                        align: 'center'
                    },
                    {
                        title: '最后更新时间',
                        key: 'update_time',
                        align: 'center'
                    },
                    {
                        title: '操作',
                        width: 180,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
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
                                            this.see(params.row)
                                        }
                                    }
                                }, '查看'),
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
                                            this.subsetDetails(params.row)
                                        }
                                    }
                                }, '子集详情')
                            ]);
                        }
                    }
                ],
                data1: [],
                columns2: [
                    {
                        title: '子集ID',
                        key: 'videoid',
                        align: 'center'
                    },
                    {
                        title: '子集集数',
                        key: 'sequence',
                        align: 'center'
                    },
                    {
                        title: '子集名称',
                        key: 'title',
                        align: 'center'
                    },
                    {
                        title: '子集类型',
                        key: 'videotype',
                        align: 'center'
                    },
                    {
                        title: '时长',
                        key: 'duration',
                        align: 'center'
                    },
                    {
                        title: '上线状态',
                        key: 'status',
                        align: 'center'
                    },
                    {
                        title: '创建时间',
                        key: 'create_time',
                        align: 'center'
                    },
                    {
                        title: '最后更新时间',
                        key: 'update_time',
                        align: 'center'
                    },
                    {
                        title: '操作',
                        width: 120,
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
                                            this.subsetDetails1(params.row)
                                        }
                                    }
                                }, '子集详情')
                            ]);
                        }
                    }

                ],
                data2: []
            }
        },
        methods: {
            getTableList() {
                // 创建开始和结束时间
                let createStart = moment(this.timer[0]).format("X");

                let createEnd = moment(this.timer[1]).format("X");
                // 最后更新时间
                let updateStart = moment(this.timer1[0]).format("X");

                let updateEnd = moment(this.timer1[1]).format("X");


                if (this.search.status == undefined) {
                    this.search.status = ""
                }
                if (isNaN(createStart)) {
                    createStart = ''
                }
                if (isNaN(createEnd)) {
                    createEnd = ''
                }
                if (isNaN(updateStart)) {
                    updateStart = ''
                }
                if (isNaN(updateEnd)) {
                    updateEnd = ''
                }
                this.$http.get(this.$config.BaseURL7 + '/media/v2/original/youku/media/list?title=' + this.search.title + '&area=' + this.search.area + '&status=' + this.search.status + '&createStart=' + createStart + '&createEnd=' + createEnd + '&updateStart=' + updateStart + '&updateEnd=' + updateEnd +
                    '&page=' + this.page + '&pagesize=' + this.pageSize + '&categoryName=' + this.search.categoryName).then(response => {
                        if (response.data.errno == 10000) {
                            this.data1 = response.data.data.list;
                            this.total = response.data.data.total;
                        }
                    })
            },
            //获取分类tab页
            getTabList() {
                this.$http(this.$config.BaseURL7 + '/media/v2/original/youku/category/list').then(response => {
                    if (response.data.errno == 10000) {
                        console.log(response)
                        this.tabs = response.data.data
                    }
                })
            },
            //tab 切换
            tabChange(name) {
                this.total = 0;
                this.data1 = [];
                this.search.categoryName = name;
                this.getTableList();
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
            //查看
            see(row) {
                console.log(row)
                this.news = row;
                this.modalSee = true;
                // 是否收费，0=免费，1=收费
                if (row.paid == 0) {
                    row.is_paid = '免费';
                } else if (row.paid == 1) {
                    row.is_paid = '收费';
                }

                // 不支持试看(cannot) 节目按时长试看(time)节目按集数试看(episodes)
                if (row.trytype == 'cannot') {
                    row.is_trytype = "不支持试看"
                } else if (row.trytype == 'time') {
                    row.is_trytype = "节目按时长试看"
                } else if (row.trytype == 'episodes') {
                    row.is_trytype = "节目按集数试看"
                }
            },
            //查看子集
            subsetDetails(row) {
                console.log(row)
                this.modalSubset = true;
                this.id = row.id;
                this.subsetsearch.title = row.title;
                this.getSubsetTableList()
            },
            //子集列表
            getSubsetTableList() {
                this.$http.get(this.$config.BaseURL7 + '/media/v2/original/youku/mediasubset/list?id=' + this.id + '&page=' + this.page1 + '&pageSize=' + this.pageSize1).then(response => {
                    console.log(response)
                    if (response.data.errno == 10000) {
                        this.data2 = response.data.data.list;
                        this.total1 = response.data.data.total;
                    }
                })
            },
            //分页
            changePage1(page) {
                this.page1 = page;
                this.getSubsetTableList();
            },
            //子集/子集详情
            subsetDetails1(row) {
                console.log(row);
                this.subset = row;
                this.modalSubsetDetails = true;
                // 是否收付费 1=收费 0=免费
                if (row.paid == 0) {
                    row.is_paid = '免费';
                } else if (row.paid == 1) {
                    row.is_paid = '收费';
                }
            }
        },
        mounted() {
            this.getTableList();
            this.getTabList()
        }
    }
</script>