<style>
    .layout-iqiyi-page{
    float: right;
    margin-top:10px;
}
</style>
<template>
    <div class="layout-iqiyi">
        <div class="layout-iqiyi-search">
            <Form :model="search" inline>
                <FormItem label="节目集名称:" :label-width="80">
                    <Input v-model="search.title" style="width:200px;" placeholder="请输入节目集名称..."></Input>
                </FormItem>
                <FormItem label="导演:" :label-width="40">
                    <Input v-model="search.director" style="width:200px;" placeholder="请输入导演..."></Input>
                </FormItem>
                <FormItem label="上线状态:" :label-width="70">
                    <Select v-model="search.status" style="width:200px" aria-placeholder="请选择上线状态...">
                        <Option value="">全部</Option>
                        <Option :value="2">下线</Option>
                        <Option :value="1">上线</Option>
                    </Select>
                </FormItem>
                <FormItem label="创建时间:" :label-width="70">
                    <DatePicker type="datetimerange" placement="bottom-end" placeholder="请选择创建时间..." style="width: 260px"
                        v-model="timer"></DatePicker>
                </FormItem>
                <FormItem label="最后更新时间:" :label-width="90">
                    <DatePicker type="datetimerange" placement="bottom-end" placeholder="请选择最后更新时间..." style="width: 260px"
                        v-model="timer1"></DatePicker>
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
        <div class="layout-iqiyi-table">
            <Table border :columns="columns1" :data="data1"></Table>
        </div>
        <div class="layout-iqiyi-page">
            <Page :total="total" :current="page" :page-size='pageSize' @on-change="changePage" show-elevator />
        </div>
        <!-- 查看 -->
        <Modal v-model="modalSee" title="查看节目集信息" width="800">
            <Row>
                <Col span="8">
                第三方节目集ID:{{see.name}}
                </Col>
                <Col span="8">
                节目集名称:{{see.name}}
                </Col>
                <Col span="8">
                一句话看点:{{see.focusName}}
                </Col>
                <Col span="8">
                评分:{{see.score}}
                </Col>
                <Col span="8">
                播放次数:{{see.playCount}}
                </Col>
                <Col span="8">
                是否多集剧:{{see.is_seriesType}}
                </Col>
                <Col span="8">
                所属频道名称:{{see.cname}}
                </Col>
                <Col span="8">
                标签:{{see.tagNames}}
                </Col>
                <Col span="8">
                作曲:{{see.composer}}
                </Col>
                <Col span="8">
                主持人:{{see.hoster}}
                </Col>
                <Col span="8">
                配音:{{see.dubber}}
                </Col>
                <Col span="8">
                制片人:{{see.maker}}
                </Col>
                <Col span="8">
                明星:{{see.star}}
                </Col>
                <Col span="8">
                出品人:{{see.producer}}
                </Col>
                <Col span="8">
                作词:{{see.songWriter}}
                </Col>
                <Col span="8">
                嘉宾:{{see.guester}}
                </Col>
                <Col span="8">
                编剧:{{see.writer}}
                </Col>
                <Col span="8">
                导演:{{see.director}}
                </Col>
                <Col span="12">
                主演/演唱者/主持人/配音:{{see.mainActor}}
                </Col>
                <Col span="12">
                演员/MV演员/嘉宾/配音角色:{{see.actor}}
                </Col>
                <Col span="8">
                短标题:{{see.sname}}
                </Col>
                <Col span="8">
                是否独播:{{see.is_excl}}
                </Col>
                <Col span="8">
                专辑的类型:{{see.is_stype}}
                </Col>
                <Col span="8">
                是否3D:{{see.is_type3d}}
                </Col>
                <Col span="8">
                总剧集:{{see.total}}
                </Col>
                <Col span="8">
                已上线最大集数:{{see.currCount}}
                </Col>
                <Col span="8">
                首次上线时间:{{see.initIssueTime}}
                </Col>
                <Col span="8">
                上下线状态:{{see.is_effective}}
                </Col>
                <Col span="8">
                是否会员视频:{{see.is_isVip}}
                </Col>
                <Col span="8">
                是否点播视频:{{see.is_epIsTvod}}
                </Col>
                <Col span="8">
                是否点播劵视频:{{see.is_isCoupon}}
                </Col>
                <Col span="8">
                是否点播套餐视频:{{see.is_isPkg}}
                </Col>
                <Col span="8">
                点播视频原价（分):{{see.orgPrc}}
                </Col>
                <Col span="8">
                有效期:{{see.validTime}}
                </Col>
                <Col span="8">
                drm:{{see.drm}}
                </Col>
                <Col span="8">
                跟播剧更新策略:{{see.strategy}}
                </Col>
                <Col span="8">
                HDR字段:{{see.dyRanges}}
                </Col>
                <Col span="8">
                杜比音效类型:{{see.dolbyAudioChnType}}
                </Col>
                <Col span="6">
                创建时间:{{see.createtime}}
                </Col>
                <Col span="6">
                最后更新时间:{{see.updatetime}}
                </Col>
                <Col span="12">
                码流名称列表:{{see.streams}}
                </Col>
                <Col span="8">
                专辑图:
                <img :src="see.picUrl" alt="" style="width:50px;height:50px;">
                </Col>
                <Col span="8">
                海报图:
                <img :src="see.posterUrl" alt="" style="width:50px;height:50px;">
                </Col>
                <Col span="24">
                描述:{{see.desc}}
                </Col>
            </Row>
        </Modal>
        <!-- 查看子集 -->
        <Modal v-model="modalTable" title="查看子集" width="1100">
            <Form :model="details" inline>
                <FormItem label="节目集名称:" :label-width="80">
                    <Input v-model="details.name" placeholder="请输入节目集名称..." style="width:200px;" disabled> </Input>
                </FormItem>
            </Form>
            <Table border :columns="columns2" :data="data2"></Table>
            <div class="layout-iqiyi-page">
                <Page :total="total1" :current="page1" :page-size='pageSize1' @on-change="changePage1" show-elevator />
            </div>
            <div style="margin-top:40px;"></div>
        </Modal>
        <!-- 子集详情 -->
        <Modal v-model="modalDetails" title="查看子集信息" width="800">
            <Row>
                <Col span="8">
                视频名称:{{news.epName}}
                </Col>
                <Col span="8">
                所属专辑名称:{{news.cname}}
                </Col>
                <Col span="8">
                视频集数:{{news.epOrder}}
                </Col>
                <Col span="2">
                试看类型:{{news.is_epProbation}}
                </Col>
                <Col span="10">
                首次上线时间/第几期:{{news.initIssueTime}}
                </Col>
                <Col span="12">
                码流名称列表:{{news.streams}}
                </Col>
                <Col span="8">
                视频ID:{{news.eqId}}
                </Col>
                <Col span="8">
                视频VID:{{news.eqVid}}
                </Col>
                <Col span="8">
                播放时长（秒）:{{news.duration}}
                </Col>
                <Col span="8">
                视频类型:{{news.is_content_type}}
                </Col>
                <Col span="8">
                上下线状态:{{news.is_effective}}
                </Col>
                <Col span="8">
                是否会员视频:{{news.is_epIsVip}}
                </Col>
                <Col span="8">
                是否点播视频:{{news.is_epIsTvod}}
                </Col>
                <Col span="8">
                是否点播劵视频:{{news.is_epIsCoupon}}
                </Col>
                <Col span="8">
                是否点播套餐视频:{{news.is_epIsPkg}}
                </Col>
                <Col span="8">
                点播视频原价（分）:{{news.is_orgPrc}}
                </Col>
                <Col span="8">
                有效期:{{news.validTime}}
                </Col>
                <Col span="8">
                drm:{{news.drm}}
                </Col>
                <Col span="8">
                HDR字段:{{news.dyRanges}}
                </Col>
                <Col span="8">
                杜比音效类型:{{news.dolbyAudioChnType}}
                </Col>
                <Col span="8">
                是否允许下载:{{news.is_epIsDown}}
                </Col>
                <Col span="8">
                视频一句话看点:{{news.focusName}}
                </Col>
                <Col span="8">
                视频短标题:{{news.sname}}
                </Col>
                <Col span="8">
                视频副标题:{{news.epFocus}}
                </Col>
                <Col span="8">
                作曲:{{news.composer}}
                </Col>
                <Col span="8">
                主持人:{{news.hoster}}
                </Col>
                <Col span="8">
                配音:{{news.dubber}}
                </Col>
                <Col span="8">
                制片人:{{news.maker}}
                </Col>
                <Col span="8">
                明星:{{news.star}}
                </Col>
                <Col span="8">
                出品人:{{news.producer}}
                </Col>
                <Col span="8">
                作词:{{news.songWriter}}
                </Col>
                <Col span="8">
                嘉宾:{{news.guester}}
                </Col>
                <Col span="8">
                编剧:{{news.writer}}
                </Col>
                <Col span="8">
                导演:{{news.director}}
                </Col>
                <Col span="8">
                创建时间:{{news.createtime}}
                </Col>
                <Col span="24">
                主演/演唱者/主持人/配音:{{news.mainActor}}
                </Col>
                <Col span="16">
                演员/MV演员/嘉宾/配音角色:{{news.actor}}
                </Col>
                <Col span="8">
                最后更新时间:{{news.updatetime}}
                </Col>
                <Col span="24">
                视频描述:{{news.desc}}
                </Col>
            </Row>
        </Modal>
    </div>
</template>
<script>
    var moment = require("moment");
    export default {
        data() {
            return {
                tabs: [],//标签页
                search: {
                    title: '',
                    director: '',
                    status: '',
                    createStart: '',
                    createEnd: '',
                    updateStart: '',
                    updateEnd: '',
                    categoryName: '' // tab页name
                },
                total: 0,
                page: 1,
                pageSize: 30,//分页

                total1: 0,
                page1: 1,
                pageSize1: 30,//分页

                timer: [],
                timer1: [],
                news: {
                },//子集
                details: {},
                subset_id: '',//节目集id
                see: {},
                modalSee: false,//查看
                modalTable: false,//查看子集
                Details: {},
                modalDetails: false,//子集详情
                columns1: [

                    {
                        title: '节目集ID',
                        key: 'id',
                        align: 'center'
                    },
                    {
                        title: '节目集名称',
                        key: 'name',
                        align: 'center'
                    },
                    {
                        title: '分类',
                        key: 'cname',
                        align: 'center'
                    },
                    {
                        title: '导演',
                        key: 'director',
                        align: 'center'
                    },
                    {
                        title: '总集数',
                        key: 'total',
                        align: 'center'
                    },
                    {
                        title: '上线状态',
                        key: 'is_effective',
                        align: 'center'
                    },
                    {
                        title: '创建时间',
                        key: 'createtime',
                        align: 'center'
                    },
                    {
                        title: '最后更新时间',
                        key: 'updatetime',
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
                                            this.SeeModal(params.row)
                                        }
                                    }
                                }, '查看'),
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
                                            this.viewSubset(params.row)
                                        }
                                    }
                                }, '查看子集'),
                            ]);
                        }
                    }
                ],
                data1: [],
                columns2: [

                    {
                        title: '子集ID',
                        key: 'eqId',
                        align: 'center'
                    },
                    {
                        title: '子集集数',
                        key: 'epOrder',
                        align: 'center'
                    },
                    {
                        title: '子集名称',
                        key: 'epName',
                        align: 'center'
                    },
                    {
                        title: '子集类型',
                        key: 'is_content_type',
                        align: 'center'
                    },
                    {
                        title: '时长',
                        key: 'eqLen',
                        align: 'center'
                    },
                    {
                        title: '上线状态',
                        key: 'is_effective',
                        align: 'center'
                    },
                    {
                        title: '创建时间',
                        key: 'createtime',
                        align: 'center'
                    },
                    {
                        title: '最后更新时间',
                        key: 'updatetime',
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
                                            this.subsetDetails(params.row)
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
                this.$http.get(this.$config.BaseURL7 + '/media/v2/original/iqiyi/media/list?title=' + this.search.title + '&categoryName=' + this.search.categoryName + '&director=' + this.search.director + '&status=' + this.search.status +
                    '&createStart=' + createStart + '&createEnd=' + createEnd + '&updateStart=' + updateStart + '&updateEnd=' + updateEnd + '&page=' + this.page + '&pagesize=' + this.pageSize).then(response => {
                        if (response.data.errno == 10000) {
                            console.log(response)
                            this.data1 = response.data.data.list;

                            this.total = response.data.data.total;

                            response.data.data.list.forEach(val => {
                                // 1:上线 2:下线
                                if (val.effective == 1) {
                                    val.is_effective = "上线"
                                } else if (val.effective == 2) {
                                    val.is_effective = "下线"
                                }
                            });
                        }
                    })
            },
            // 搜索
            query() {
                this.page = 1;
                this.getTableList();
            },
            // 分页
            changePage(page) {
                this.page = page;
                this.getTableList();
            },

            // 查看
            SeeModal(row) {
                console.log(row)
                this.see = row;
                //上下线状态  1:上线 2:下线
                if (row.effective == 1) {
                    row.is_effective = "上线"
                } else if (row.effective == 1) {
                    row.is_effective = "下线"
                }

                // 是否多剧集 0:单集 1:多集
                if (row.seriesType == 1) {
                    row.is_seriesType = "多集"
                } else if (row.seriesType == 0) {
                    row.is_seriesType = "单集"
                }

                // 是否独播  1:是 0:否
                if (row.excl == 1) {
                    row.is_excl = "是"
                } else if (row.excl == 0) {
                    row.is_excl = "否"
                }

                // 专辑的类型 1 来源专辑 0 普通专辑
                if (row.stype == 0) {
                    row.is_stype = "普通专辑"
                } else if (row.stype == 1) {
                    row.is_stype = "来源专辑"
                }

                // 是否3D1:是 0:否
                if (row.type3d == 0) {
                    row.is_type3d = "否"
                } else if (row.type3d == 1) {
                    row.is_type3d = "是"
                }

                // 是否会员视频0 非会员 1会员
                if (row.isVip == 0) {
                    row.is_isVip = "非会员"
                } else if (row.isVip == 1) {
                    row.is_isVip = "会员"
                }

                // 是否点播视频 0 非点播  1 点播
                if (row.epIsTvod == 0) {
                    row.is_epIsTvod = "非点播"
                } else if (row.epIsTvod == 1) {
                    row.is_epIsTvod = "点播"
                }

                // 是否点播劵视频  0 非点播券 1 点播券
                if (row.isCoupon == 0) {
                    row.is_isCoupon = "非点播券"
                } else if (row.isCoupon == 1) {
                    row.is_isCoupon = "点播券"
                }

                // 是否点播套餐视频 0 非点播套餐  1 点播套餐
                if (row.isPkg == 0) {
                    row.is_isPkg = "非点播套餐"
                } else if (row.isPkg == 1) {
                    row.is_isPkg = "点播套餐"
                }


                this.modalSee = true;
            },
            //查看子集
            viewSubset(row) {
                console.log(row)
                this.details = row;
                this.subset_id = row.id;
                this.getTablesList();
                this.modalTable = true;
            },
            //子集详情
            subsetDetails(row) {
                // 上下线状态 :上线 2:下线
                if (row.effective == 1) {
                    row.is_effective = "上线"
                } else if (row.effective == 2) {
                    row.is_effective = "下线"
                }


                // 试看类型 0 :没有试看  1 :表示全集试看 2 :表示试看 6 分钟
                if (row.epProbation == 0) {
                    row.is_epProbation = '没有试看'
                } else if (row.epProbation == 1) {
                    row.is_epProbation = '表示全集试看'
                } else if (row.epProbation == 3) {
                    row.is_epProbation = '表示试看6分钟'
                }


                // 是否会员视频 0 非会员 1 会员
                if (row.epIsVip == 0) {
                    row.is_epIsVip = '非会员'
                } else if (row.epIsVip == 1) {
                    row.is_epIsVip = '会员'
                }

                // 是否点播视频  0  非点播 1 点播
                if (row.epIsTvod == 0) {
                    row.is_epIsTvod = "非点播"
                } else if (row.epIsTvod == 1) {
                    row.is_epIsTvod = "点播"
                }

                // 是否点播券视频: 0 非点播券 1 点播券
                if (row.epIsCoupon == 0) {
                    row.is_epIsCoupon = '非点播券'
                } else if (row.epIsCoupon == 1) {
                    row.is_epIsCoupon = '点播券'
                }


                // 是否点播套餐视频:  0 非点播套餐 1 点播套餐
                if (row.epIsPkg == 0) {
                    row.is_epIsPkg = '非点播套餐'
                } else if (row.epIsPkg == 1) {
                    row.is_epIsPkg = '点播套餐'
                }

                // 视频是否允许下载  0 :都不可下载 1 :是所有人可以下载 2 :只有会员账号才可以下载 
                if (row.epIsDown == 0) {
                    row.is_epIsDown = "都不可下载"
                } else if (row.epIsDown == 1) {
                    row.is_epIsDown = "所有人可以下载"
                } else if (row.epIsDown == 2) {
                    row.is_epIsDown = "只有会员账号才可以下载"
                }

                this.news = row;

                this.modalDetails = true;
            },
            //获取分类tab页
            getTabList() {
                this.$http(this.$config.BaseURL7 + '/media/v2/original/iqiyi/category/list').then(response => {
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
            //子集列表
            getTablesList() {
                this.$http.get(this.$config.BaseURL7 + '/media/v2/original/iqiyi/media/list?subset_id=' + this.subset_id + '&page=' + this.page1
                    + '&pagesize=' + this.pageSize1).then(response => {
                        if (response.data.errno == 10000) {
                            console.log(response)
                            this.data2 = response.data.data.list;

                            this.total1 = response.data.data.total;
                            response.data.data.list.forEach(val => {
                                // 1:上线 2:下线
                                if (val.effective == 1) {
                                    val.is_effective = "上线"
                                } else if (val.effective == 2) {
                                    val.is_effective = "下线"
                                }

                                if (val.content_type == 1) {
                                    val.is_content_type = "正片";
                                } else if (val.content_type == 2) {
                                    val.is_content_type = '特辑';
                                } else if (val.content_type = 3) {
                                    val.is_content_type = '预告片';
                                } else if (val.content_type == 4) {
                                    val.is_content_type = '片花';
                                } else if (val.content_type == 5) {
                                    val.is_content_type = '花絮';
                                } else if (val.content_type == 6) {
                                    val.is_content_type = '宣传片';
                                } else if (val.content_type == 7) {
                                    val.is_content_type = '片段';
                                } else if (val.content_type == 8) {
                                    val.is_content_type = '场景';
                                } else if (val.content_type == 9) {
                                    val.is_content_type = '镜头';
                                } else if (val.content_type == 10) {
                                    val.is_content_type = '看点';
                                } else if (val.content_type == 11) {
                                    val.is_content_type = '音乐视频';
                                } else if (val.content_type == 12) {
                                    val.is_content_type = '专题';
                                } else if (val.content_type == 13) {
                                    val.is_content_type = '完整版';
                                } else if (val.content_type == 14) {
                                    val.is_content_type = '单曲音乐视频';
                                } else if (val.content_type == 15) {
                                    val.is_content_type = '单曲现场';
                                } else if (val.content_type == 16) {
                                    val.is_content_type = '演唱会';
                                } else if (val.content_type == 17) {
                                    val.is_content_type = '新闻';
                                } else if (val.content_type == 18) {
                                    val.is_content_type = '访谈';
                                } else if (val.content_type == 19) {
                                    val.is_content_type = '音乐记录';
                                } else if (val.content_type == 20) {
                                    val.is_content_type = '音乐周边';
                                } else if (val.content_type == 21) {
                                    val.is_content_type = '音乐节目';
                                } else if (val.content_type == 22) {
                                    val.is_content_type = '正片片段';
                                } else if (val.content_type == 23) {
                                    val.is_content_type = '段视频';
                                } else if (val.content_type == 24) {
                                    val.is_content_type = '精选视频';
                                } else if (val.content_type == 25) {
                                    val.is_content_type = '其他';
                                } else if (val.content_type == 26) {
                                    val.is_content_type = '视频封面';
                                }


                            });
                        }
                    })
            },
            changePage1(page) {
                this.page1 = page;
                this.getTablesList();
            },
        },
        mounted() {
            // this.getTableList();
            this.getTabList()
        }
    }
</script>