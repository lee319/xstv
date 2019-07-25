<style>
    .layout-medialist-page{
        float: right;
        margin-top:10px;
    }
</style>

<template>
    <div class="layout-medialist">
        <div class="layout-medialist-search">
            <Form :model="search" inline>
                <FormItem label="节目集名称:" :label-width="90">
                    <Input v-model="search.title" style="width:200px;" placeholder="请输入节目集名称..."></Input>
                </FormItem>
                <FormItem label="分类:" :label-width="40">
                    <Select v-model="search.categoryid" style="width:200px">
                        <Option v-for="item in cityList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                    </Select>
                </FormItem>
                <FormItem label="导演:" :label-width="40">
                    <Input v-model="search.director" style="width:200px;" placeholder="请输入导演..."></Input>
                </FormItem>
                <FormItem label="创建时间:" :label-width="70">
                    <DatePicker type="datetimerange" placement="bottom-end" placeholder="请选择创建时间..." style="width: 300px"
                        v-model="timer"></DatePicker>
                </FormItem>
                <FormItem label="最后更新时间:" :label-width="100">
                    <DatePicker type="datetimerange" placement="bottom-end" placeholder="请选择创建时间..." style="width: 300px"
                        v-model="timer1"></DatePicker>
                </FormItem>
                <FormItem label="来源名称:" :label-width="70">
                    <Select v-model="search.cp_code" style="width:200px">
                        <Option v-for="item in cityList1" :value="item.id" :key="item.id">{{ item.name }}</Option>
                    </Select>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="query">搜索</Button>
                </FormItem>
            </Form>
        </div>
        <div class="layout-medialist-table">
            <Table border :columns="columns1" :data="data1"></Table>
        </div>
        <div class="layout-medialist-page">
            <Page :total="total" :current="page" :page-size='pageSize' @on-change="changePage" show-elevator />
        </div>
        <!-- 查看 -->
        <Modal v-model="modalInfo" title="查看节目信息" :width="800">
            <Row>
                <Col span="8">
                第三方ID:{{see.album_id}}
                </Col>
                <Col span="8">
                节目名称:{{see.title}}
                </Col>
                <Col span="8">
                分类:{{see.category_name}}
                </Col>
                <Col span="8">
                来源名称:{{see.cp_name}}
                </Col>
                <Col span="8">
                又名:{{see.short_title}}
                </Col>
                <Col span="8">
                上映时间:{{see.release_date}}
                </Col>
                <Col span="8">
                类型标签:{{see.tags}}
                </Col>
                <Col span="8">
                运营标签:{{see.label}}
                </Col>
                <Col span="8">
                导演:{{see.directors}}
                </Col>
                <Col span="8">
                编剧:{{see.writers}}
                </Col>
                <Col span="8">
                演员:{{see.actors}}
                </Col>
                <Col span="8">
                国家/地区:{{see.area}}
                </Col>
                <Col span="8">
                语言:{{see.language}}
                </Col>
                <Col span="8">
                片长:{{see.duration}}
                </Col>
                <Col span="8">
                制片人:{{see.makers}}
                </Col>
                <Col span="8">
                出品人:{{see.producers}}
                </Col>
                <Col span="8">
                是否独播:{{see.is_is_excl}}
                </Col>
                <Col span="8">
                介质标识:{{see.play_feature}}
                </Col>
                <Col span="8">
                发布时间:{{see.publish_date}}
                </Col>
                <Col span="8">
                最高清晰度:{{see.resolution}}
                </Col>
                <Col span="8">
                是否付费:{{see.is_is_vip}}
                </Col>
                <Col span="8">
                是否单片付费:{{see.is_is_tvod}}
                </Col>
                <Col span="8">
                上下线状态:{{see.is_status}}
                </Col>
                <Col span="8">
                评分:{{see.score}}
                </Col>
                <Col span="8">
                播放量:{{see.play_count}}
                </Col>
                <Col span="8">
                发行公司:{{see.publish_company}}
                </Col>
                <Col span="8">
                上映年代:{{see.release_year}}
                </Col>
                <Col span="8">
                创建时间:{{see.create_time}}
                </Col>
                <Col span="8">
                最后更新时间:{{see.update_time}}
                </Col>
                <Col span="8">
                海报图:
                <img :src="see.poster_image" alt="" style="width:50px;height:50px;margin-top:0px;">
                </Col>
                <Col span="24">
                描述:{{see.desc}}
                </Col>
            </Row>
        </Modal>
        <!-- 查看视频 -->
        <Modal v-model="modalVideo" title="查看视频" :width="1000">
            <Form :model="news" :label-width="75">
                <FormItem label="节目集名称">
                    <Input v-model="news.title" disabled style="width:200px;"></Input>
                </FormItem>
            </Form>
            <Table border :columns="columns2" :data="data2"></Table>
            <div class="layout-medialist-page">
                <Page :total="total1" :current="page1" :page-size='pageSize1' @on-change="changePage1" show-elevator />
            </div>
            <div style="margin-top:40px;"></div>
        </Modal>
        <!-- 查看子集 -->
        <Modal v-model="modalDetails" title="查看子集信息" :width="800">
            <Row>
                <Col span="8">
                子集名称:{{video.title}}
                </Col>
                <Col span="8">
                子集ID:{{video.episode_id}}
                </Col>
                <Col span="8">
                子集集数:{{video.id}}
                </Col>
                <Col span="8">
                分类:{{video.category_name}}
                </Col>
                <Col span="8">
                来源名称:{{video.cp_name}}
                </Col>
                <Col span="8">
                子集类型:{{video.is_content_type}}
                </Col>
                <Col span="8">
                子集播放地址:{{video.play_url}}
                </Col>
                <Col span="8">
                播放时长（分）:{{video.duration}}
                </Col>
                <Col span="8">
                视频VID:{{video.play_id}}
                </Col>
                <Col span="8">
                是否付费:{{video.is_is_vip}}
                </Col>
                <Col span="8">
                上下线状态:{{video.is_status}}
                </Col>
                <Col span="8">
                创建时间:{{video.create_time}}
                </Col>
                <Col span="8">
                最后更新时间:{{video.update_time}}
                </Col>
                <Col span="8">
                剧照:
                <img :src="video.cover_image" alt="" style="width:50px;height:50px;">
                </Col>
                <Col span="24">
                剧情简介:{{video.desc}}
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
                search: {
                    title: '',
                    createStart: '',
                    createEnd: '',
                    director: '',
                    cp_code: '',
                    categoryid: ''
                },//搜索
                total: 0,
                page: 1,
                pageSize: 30,//分页

                total1: 0,
                page1: 1,
                pageSize1: 10,//分页

                timer: [],//创建时间
                timer1: [],//最后更新时间
                cityList: [],//分类
                cityList1: [],//来源

                see: {},//查看
                news: {},//节目集名称
                modalInfo: false,

                subset_id: '',

                modalVideo: false,//查看视频
                video: {},
                modalDetails: false,//查看子集
                columns1: [
                    {
                        title: '节目集ID',
                        key: 'id',
                        align: 'center'
                    },
                    {
                        title: '节目集名称',
                        key: 'title',
                        align: 'center',
                        width: 190,
                    },
                {
                    title: '分类',
                    key: 'category_name',
                    align: 'center'
                },
                {
                    title: '导演',
                    key: 'directors',
                    align: 'center'
                },
                {
                    title: '来源名称',
                    key: 'cp_name',
                    align: 'center'
                },
                {
                    title: '总集数',
                    key: 'total_episodes',
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
                    align: 'center',
                    width: 170
                },
                {
                    title: '最后更新时间',
                    key: 'update_time',
                    align: 'center',
                    width: 170
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
                                        this.viewVideo(params.row)
                                    }
                                }
                            }, '查看视频'),
                        ]);
                    }
                }
                ],
            data1: [],
                columns2: [
                    {
                        title: '子集ID',
                        key: 'episode_id',
                        align: 'center'
                    },
                    {
                        title: '子集集数',
                        key: 'episode_order',
                        align: 'center'
                    },
                    {
                        title: '子集名称',
                        key: 'title',
                        align: 'center'
                    },
                    {
                        title: '子集类型',
                        key: 'is_content_type',
                        align: 'center'
                    },
                    {
                        title: '时长（分)',
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
                                            this.SeeDetails(params.row)
                                        }
                                    }
                                }, '查看')
                            ]);
                        }
                    }
                ],
                    data2: []
        }
    },
    methods: {
        //表格数据
        getTableList() {
            //创建时间
            let createStart = moment(this.timer[0]).format("X");
            //创建时间
            let createEnd = moment(this.timer[1]).format("X");

            //最后更新时间
            let updateStart = moment(this.timer1[0]).format("X");
            //最后更新时间
            let updateEnd = moment(this.timer1[1]).format("X");

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
            this.$http.get(this.$config.BaseURL7 + '/media/v2/stdmedia/medialist?page=' + this.page + '&pagesize=' + this.pageSize + '&title=' + this.search.title +
                '&director=' + this.search.director + '&createStart=' + this.search.createStart + '&createEnd=' + createEnd + '&updateStart=' + updateStart +
                '&updateEnd=' + updateEnd + '&cp_code=' + this.search.cp_code + '&categoryid=' + this.search.categoryid).then(response => {
                    if (response.data.errno == 10000) {
                        console.log(response)
                        this.data1 = response.data.data.list;
                        response.data.data.list.forEach(val => {
                            // 1、上线  2、下线
                            if (val.status == 1) {
                                val.is_status = "上线"
                            } else if (val.status == 2) {
                                val.is_status = "下线"
                            }
                        });

                        this.total = response.data.data.total;
                    }
                })
        },
        // 搜索
        query() {
            this.page = 1;
            this.getTableList()
        },
        // 分页
        changePage(page) {
            this.page = page;
            this.getTableList();
        },
        // 查看
        SeeModal(row) {
            console.log(row)
            // 上下线状态 1、上线 2、下线
            if (row.status == 1) {
                row.is_status = "上线"
            } else if (row.status == 2) {
                row.is_status = "下线"
            }
            //是否付费  1:是 0:否
            if (row.is_vip == 1) {
                row.is_is_vip = "是"
            } else if (row.is_vip == 0) {
                row.is_is_vip = "否"
            }
            // is_tvod 1:是 0:否
            if (row.is_tvod == 1) {
                row.is_is_tvod = "是"
            } else if (row.is_tvod == 0) {
                row.is_is_tvod = "否"
            }
            // 是否独播  1:是0:否
            if (row.is_excl == 0) {
                row.is_is_excl = '否'
            } else if (row.is_excl == 1) {
                row.is_is_excl = '是'
            }

            this.see = row;
            this.modalInfo = true;
        },
        // 查看视频
        viewVideo(row) {
            this.news = row;
            this.subset_id = row.album_id;
            console.log(this.subset_id)
            this.getMediaList()
            this.modalVideo = true;
        },
        // 子集列表
        getMediaList() {
            this.$http(this.$config.BaseURL7 + '/media/v2/stdmedia/medialist?page=' + this.page1 + '&pagesize=' + this.pageSize1 + '&subset_id=' + this.subset_id).then(response => {
                if (response.data.errno == 10000) {
                    console.log(response)
                    this.data2 = response.data.data.list;
                    response.data.data.list.forEach(val => {
                        // console.log(val)

                        // 1、上线  2、下线
                        if (val.status == 1) {
                            val.is_status = "上线"
                        } else if (val.status == 2) {
                            val.is_status = "下线"
                        }
                        // 1: 正片；2: 特辑；3: 预告片；4:片花；
                        // 5: 花絮；6: 宣传片；7: 片段；8:场景；9:镜头；
                        // 10:看点；11:音乐视频；12:专题；13:完整版；14:单曲音乐视频；
                        // 15:单曲现场；16:演唱会；17:新闻；18:访谈；19:音乐记录；20:音乐周边；
                        // 21:音乐节目；22:正片片段；23:段视频；24:精选视频；25:其他；26:视频封面
                        // content_type
                        if (val.content_type == 1) {
                            val.is_content_type = "正片";
                        } else if (val.content_type == 2) {
                            val.is_content_type = '特辑';
                        } else if (val.content_type == 3) {
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

                    this.total1 = response.data.data.total;
                }
            })
        },
        //分页
        changePage1(page) {
            this.page1 = page;
            this.getMediaList();
        },
        // 查看子集
        SeeDetails(row) {
            // 上下线状态1、上线  2、下线
            if (row.status == 1) {
                row.is_status = "上线"
            } else if (row.status == 2) {
                row.is_status = "下线"
            }
            // 是否付费 1:是 0:否
            if (row.is_vip == 1) {
                row.is_is_vip = "是"
            } else if (row.is_vip == 0) {
                row.is_is_vip = "否"
            }
            // 是否单片付费 1:是 0:否
            if (row.is_tvod == 1) {
                row.is_is_tvod = "是"
            } else if (row.is_tvod == 0) {
                row.is_is_tvod = "否"
            }

            if (row.content_type == 1) {
                row.is_content_type = "正片";
            } else if (row.content_type == 2) {
                row.is_content_type = '特辑';
            } else if (row.content_type == 3) {
                row.is_content_type = '预告片';
            } else if (row.content_type == 4) {
                row.is_content_type = '片花';
            } else if (row.content_type == 5) {
                row.is_content_type = '花絮';
            } else if (row.content_type == 6) {
                row.is_content_type = '宣传片';
            } else if (row.content_type == 7) {
                row.is_content_type = '片段';
            } else if (row.content_type == 8) {
                row.is_content_type = '场景';
            } else if (row.content_type == 9) {
                row.is_content_type = '镜头';
            } else if (row.content_type == 10) {
                row.is_content_type = '看点';
            } else if (row.content_type == 11) {
                row.is_content_type = '音乐视频';
            } else if (row.content_type == 12) {
                row.is_content_type = '专题';
            } else if (row.content_type == 13) {
                row.is_content_type = '完整版';
            } else if (row.content_type == 14) {
                row.is_content_type = '单曲音乐视频';
            } else if (row.content_type == 15) {
                row.is_content_type = '单曲现场';
            } else if (row.content_type == 16) {
                row.is_content_type = '演唱会';
            } else if (row.content_type == 17) {
                row.is_content_type = '新闻';
            } else if (row.content_type == 18) {
                row.is_content_type = '访谈';
            } else if (row.content_type == 19) {
                row.is_content_type = '音乐记录';
            } else if (row.content_type == 20) {
                row.is_content_type = '音乐周边';
            } else if (row.content_type == 21) {
                row.is_content_type = '音乐节目';
            } else if (row.content_type == 22) {
                row.is_content_type = '正片片段';
            } else if (row.content_type == 23) {
                row.is_content_type = '段视频';
            } else if (row.content_type == 24) {
                row.is_content_type = '精选视频';
            } else if (row.content_type == 25) {
                row.is_content_type = '其他';
            } else if (row.content_type == 26) {
                row.is_content_type = '视频封面';
            }
            this.video = row;
            this.modalDetails = true;
        },
        //分类搜索
        getSelect() {
            this.$http(this.$config.BaseURL1 + '/media/v2/category/list').then(response => {
                if (response.data.errno == 10000) {
                    this.cityList = response.data.data.list;
                }
            })
        },
        getSelect1() {
            this.$http(this.$config.BaseURL1 + '/media/v2/origin/list').then(response => {
                if (response.data.errno == 10000) {
                    this.cityList1 = response.data.data.list;
                }
            })
        },
    },
    mounted() {
        this.getTableList();
        this.getSelect();
        this.getSelect1()
    }
    }
</script>