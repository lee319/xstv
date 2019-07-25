<style>
    .layout-moretv-page {
        float: right;
        margin-top: 10px;
    }
</style>
<template>
    <div class="layout-moretv">
        <div class="layout-moretv-search">
            <Form :model="search" inline>
                <FormItem label="节目集名称:" :label-width="80">
                    <Input v-model="search.title" style="width:200px;" placeholder="请输入节目集名称..."></Input>
                </FormItem>
                <FormItem label="地区:" :label-width="50">
                    <Input v-model="search.area" style="width:200px;" placeholder="请输入地区..."></Input>
                </FormItem>
                <FormItem label="上线状态:" :label-width="70">
                    <Select v-model="search.status" style="width:200px">
                        <Option value="">全部</Option>
                        <Option :value="0">下线</Option>
                        <Option :value="1">上线</Option>
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
        <div class="layout-moretv-table">
            <Table border :columns="columns1" :data="data1"></Table>
        </div>
        <!-- 分页 -->
        <div class="layout-moretv-page">
            <Page :total="total" :current="page" :page-size='pageSize' @on-change="changePage" show-elevator />
        </div>
        <!-- 查看 -->
        <Modal v-model="modalSee" title="查看节目集信息" width="900">
            <Row>
                <Col span="8">第三方节目集ID:{{news.id}}</Col>
                <Col span="8">节目类型:{{news.is_contenttype}}</Col>
                <Col span="8">标签:{{news.tag}}</Col>
                <Col span="8">导演:{{news.director}}</Col>

                <Col span="8">付费类型:{{news.is_paytype}}</Col>
                <Col span="8">来源:{{news.source}}</Col>
                <Col span="8">内容类型:{{news.is_videotype}}</Col>
                <Col span="8">总集数:{{news.episodecount}}</Col>
                <Col span="8">更新至多少集:{{news.episodeto}}</Col>
                <Col span="8">地区:{{news.area}}</Col>
                <Col span="8">年代:{{news.year}}</Col>
                <Col span="8">角标:{{news.markcode}}</Col>
                <Col span="8">评分:{{news.score}}</Col>
                <Col span="8">创建时间:{{news.create_time}}</Col>
                <Col span="8">更新时间:{{news.update_time}}</Col>
                <Col span="8">海报（横板）:
                <img :src="news.icon1" alt="" style="width:50px;height:50px;">
                </Col>
                <Col span="8">海报（竖版):
                <img :src="news.icon3" alt="" style="width:50px;height:50px;"></Col>
                <Col span="24">旧版跳转方式:{{news.linkdata}}</Col>
                <Col span="24">新版跳转方式:{{news.uridata}}</Col>
                <Col span="24">演员:{{news.cast}}</Col>
                <Col span="24">描述:{{news.info}}</Col>
            </Row>
        </Modal>
        <!-- 子集详情 -->
        <Modal v-model="modalSubset" title="子集详情" width="1100">
            <Form :model="subsetsearch" :label-width="80">
                <FormItem label="节目集名称:">
                    <Input v-model="subsetsearch.title" style="width:220px;" disabled></Input>
                </FormItem>
            </Form>
            <Table border :columns="columns2" :data="data2"></Table>
            <div class="layout-moretv-page">
                <Page :total="total1" :current="page1" :page-size='pageSize1' @on-change="changePage1" show-elevator />
            </div>
            <div style="margin-top:40px;"></div>
        </Modal>
        <!-- 子集详情/查看详情 -->
        <Modal v-model="modalSubsetDetails" title="查看子集" width="600">
            <Row>
                <Col span="12">第三方子集ID:{{subset.sid}}</Col>
                <Col span="12">标题:{{subset.title}}</Col>
                <Col span="12">集数:{{subset.episodeto}}</Col>
                <Col span="12">付费类型:{{subset.is_paytype}}</Col>
                <Col span="12">创建时间:{{subset.create_time}}</Col>
                <Col span="12">更新时间:{{subset.update_time}}</Col>

                <Col span="12">海报横图:
                <img :src="subset.icon1" alt="" style="width:50px;height:50px;">
                </Col>
                <Col span="12">海报竖图:
                <img :src="subset.icon3" alt="" style="width:50px;height:50px;">
                </Col>
                <Col span="24">状态:{{subset.is_status}}</Col>
                <Col span="24">旧版跳转方式:{{subset.linkdata}}</Col>
                <Col span="24">新版跳转方式:{{subset.uridata}}</Col>
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
                    updateEnd: ''
                },
                timer: [],
                timer1: [],
                page: 1,
                pageSize: 30,
                total: 0,//分页
                tabs: [],//标签页
                news: [],
                modalSee: false,//查看
                subsetsearch: {},
                id: '',
                page1: 1,
                pageSize1: 30,
                total1: 0,//分页
                modalSubset: false,//子集详情
                subset: [],
                modalSubsetDetails: false,//子集详情/查看子集
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
                        title: '地区',
                        key: 'area',
                        align: 'center'
                    },
                    {
                        title: '分类',
                        key: 'is_contenttype',
                        align: 'center'
                    },
                    {
                        title: '导演',
                        key: 'director',
                        align: 'center'
                    },
                    {
                        title: '上线状态',
                        key: 'is_status',
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
                        key: 'sid',
                        align: 'center'
                    },
                    {
                        title: '子集集数',
                        key: 'episodeto',
                        align: 'center'
                    },
                    {
                        title: '子集名称',
                        key: 'title',
                        align: 'center'
                    },
                    {
                        title: '子集类型',
                        key: 'type',
                        align: 'center'
                    },
                    {
                        title: '时长',
                        key: 'duration',
                        align: 'center'
                    },
                    {
                        title: '上线状态',
                        key: 'is_status',
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
                        width: 180,
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
            // 表格数据
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
                this.$http.get(this.$config.BaseURL7 + '/media/v2/original/moretv/media/list?title=' + this.search.title + '&categoryName=' + this.search.categoryName + '&area=' + this.search.area + '&status=' + this.search.status +
                    '&createStart=' + createStart + '&createEnd=' + createEnd + '&updateStart=' + updateStart + '&updateEnd=' + updateEnd + '&page=' + this.page + '&pagesize=' + this.pageSize).then(response => {
                        console.log(response)
                        if (response.data.errno == 10000) {
                            this.data1 = response.data.data.list;
                            this.total = response.data.data.total;
                            response.data.data.list.forEach(val => {
                                // 0=下线 1=上线
                                if (val.status == 0) {
                                    val.is_status = '下线'
                                } else if (val.status == 1) {
                                    val.is_status = '上线'
                                }

                                // 节目类型  comic=动漫 kids=少儿 movie=电影  tv=电视剧 zongyi=综艺 jilu=纪录片 hot=短视频资讯 mv=mv sports=体育 game=游戏
                                if (val.contenttype == "comic") {
                                    val.is_contenttype = '动漫';
                                } else if (val.contenttype == "kids") {
                                    val.is_contenttype = '少儿';
                                } else if (val.contenttype == "tv") {
                                    val.is_contenttype = '电视剧';
                                } else if (val.contenttype == "zongyi") {
                                    val.is_contenttype = '综艺';
                                } else if (val.contenttype == "jilu") {
                                    val.is_contenttype = '纪录片';
                                } else if (val.contenttype == "hot") {
                                    val.is_contenttype = '短视频资讯';
                                } else if (val.contenttype == "mv") {
                                    val.is_contenttype = 'mv';
                                } else if (val.contenttype == "sports") {
                                    val.is_contenttype = '体育';
                                } else if (val.contenttype == "game") {
                                    val.is_contenttype = '游戏';
                                }
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
            //获取分类tab页
            getTabList() {
                this.$http(this.$config.BaseURL7 + '/media/v2/original/moretv/category/list').then(response => {
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
            // 查看
            see(row) {
                console.log(row)
                this.news = row;
                this.modalSee = true;
                // 付费类型  .free=免费，vip=收费 
                if (row.paytype == 'free') {
                    row.is_paytype = "免费"
                } else if (row.paytype == 'vip') {
                    row.is_paytype = "收费"
                }

                // 内容类型： 0=单片 1=剧头 2=剧集
                if (row.videotype == 0) {
                    row.is_videotype = "单片"
                } else if (row.videotype == 1) {
                    row.is_videotype = "剧头"
                } else if (row.videotype == 2) {
                    row.is_videotype = "剧集"
                }

                // 节目类型  comic=动漫 kids=少儿 movie=电影  tv=电视剧 zongyi=综艺 jilu=纪录片 hot=短视频资讯 mv=mv sports=体育 game=游戏
                if (row.contenttype == "comic") {
                    row.is_contenttype = '动漫';
                } else if (row.contenttype == "kids") {
                    row.is_contenttype = '少儿';
                } else if (row.contenttype == "tv") {
                    row.is_contenttype = '电视剧';
                } else if (row.contenttype == "zongyi") {
                    row.is_contenttype = '综艺';
                } else if (row.contenttype == "jilu") {
                    row.is_contenttype = '纪录片';
                } else if (row.contenttype == "hot") {
                    row.is_contenttype = '短视频资讯';
                } else if (row.contenttype == "mv") {
                    row.is_contenttype = 'mv';
                } else if (row.contenttype == "sports") {
                    row.is_contenttype = '体育';
                } else if (row.contenttype == "game") {
                    row.is_contenttype = '游戏';
                }
            },
            //子集详情
            subsetDetails(row) {
                console.log(row);
                this.modalSubset = true;
                this.subsetsearch.title = row.title;
                this.id = row.id;
                this.getSubsetTableList();
            },
            // 子集详情列表
            getSubsetTableList() {
                this.$http.get(this.$config.BaseURL7 + '/media/v2/original/moretv/mediasubset/list?id=' + this.id + '&page=' + this.page1 + '&pageSize=' + this.pageSize1).then(response => {
                    console.log(response)
                    if (response.data.errno == 10000) {
                        this.data2 = response.data.data.list;
                        response.data.data.list.forEach(val => {
                            // 0=下线 1=上线
                            if (val.status == 0) {
                                val.is_status = '下线'
                            } else if (val.status == 1) {
                                val.is_status = '上线'
                            }
                        });
                        this.total1 = response.data.data.total;
                    }
                })
            },
            //子集详情分页
            changePage1(page) {
                this.page1 = page;
                this.getSubsetTableList();
            },
            //子集详情/查看子集
            subsetDetails1(row) {
                this.modalSubsetDetails = true;
                this.subset = row;
                // 节目状态 0 下线 1 上线
                if (row.status == 0) {
                    row.is_status = '下线';
                } else if (row.status == 1) {
                    row.is_status = '上线';
                }
                // 付费类型 free 免费，vip 收费
                if (row.paytype == "free") {
                    row.is_paytype = "免费"
                } else if (row.paytype == "vip") {
                    row.is_paytype = "收费"
                }
            }
        },
        mounted() {
            this.getTableList();
            this.getTabList();
        }
    }
</script>