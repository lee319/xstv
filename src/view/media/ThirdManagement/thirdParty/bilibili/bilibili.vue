<style>
  .layout-bilibili-page{
    float: right;
    margin-top:10px;
}

.ivu-table th,
.ivu-table td {
    height: 40px;
}
</style>
<template>
    <div class='layout-bilibili'>
        <!-- 搜索 -->
        <div class='layout-bilibili-search'>
            <Form :model="search" inline>
                <FormItem label="节目集名称:" :label-width="90">
                    <Input v-model="search.title" style="width:200px;" placeholder="请输入节目集名称..."></Input>
                </FormItem>
                <FormItem label="地区:" :label-width="50">
                    <Input v-model='search.area' style="width:200px;" placeholder="请输入地区名称..."></Input>
                </FormItem>
                <FormItem label="是否可播:" :label-width="70">
                    <Select v-model='search.status' style="width:200px" aria-placeholder="请选择上线状态...">
                        <Option value="">全部</Option>
                        <Option :value="1">true</Option>
                        <Option :value="2">false</Option>
                    </Select>
                </FormItem>
                <FormItem label="创建时间:" :label-width="70">
                    <DatePicker type="datetimerange" placement="bottom-end" placeholder="请选择创建时间..." style="width: 260px"
                        v-model="timer"></DatePicker>
                </FormItem>
                <FormItem label="最后更新时间:" :label-width="100">
                    <DatePicker type="datetimerange" placement="bottom-end" placeholder="请选择最后更新时间..." style="width: 260px"
                        v-model="timer1"></DatePicker>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="query">搜索</Button>
                </FormItem>
            </Form>
        </div>
        <!-- 分类-->
        <div>
            <span style="float:left;margin-top:13px;margin-right:20px;font-size:14px;">分类:</span>
            <Tabs @on-click='tabChange'>
                <TabPane :name="tab.id +''" v-for="tab in tabs" :key="tab.id" :label="tab.name+''"></TabPane>
            </Tabs>
        </div>
        <div style="clear:both;"></div>
        <!-- 列表 -->
        <div class="layout-bilibili-table">
            <Table border :columns="columns1" :data="data1"></Table>
        </div>
        <!-- 查看 -->
        <Modal v-model="modalSee" title="查看节目集" width="900">
            <Row>
                <Col span="12">
                第三方节目集ID:{{see.id}}
                </Col>
                <Col span="12">
                标题:{{see.name}}
                </Col>
                <Col span="12">
                原名(日文):{{see.originname}}
                </Col>
                <Col span="12">
                别名(日文):{{see.alias}}
                </Col>
                <Col span="12">
                封面:<img :src="see.cover" alt="" style="width:80px;height:50px;">
                </Col>
                <Col span="12">
                横封面:{{see.epcover}}
                </Col>
                 <Col span="12">
                更新信息:{{see.upinfo}}
                </Col>
                 <Col span="12">
                分类:{{see.category}}
                </Col>
                <Col span="12">
                地区:{{see.area}}
                </Col>
                <Col span="12">
                发布时间:{{see.playtime}}
                </Col>
                <Col span="12">
                风格:{{see.style}}
                </Col>
                <Col span="12">
                总集数:{{see.totalnum}}
                </Col>
                <Col span="12">
                最新正片集数:{{see.newestnb}}
                </Col>
                <Col span="12">
                节目类型:{{see.official}}
                </Col>
                <Col span="12">
                付费状态:{{see.Ispaystatus}}
                </Col>
                 <Col span="12">
                工作人员信息:{{see.staff}}
                </Col>
                <Col span="12">
                是否可播:{{see.autorised}}
                </Col>
                <Col span="12">
                最近修改时间:{{see.update_time}}
                </Col>
                <Col span="12">
                主角信息:{{see.role}}
                </Col>
                <Col span="12">
                描述:{{see.desc}}
                </Col>
            </Row>
        </Modal>
        <!-- 查看子集 -->
        <Modal v-model="modalTable" title="查看子集" width="1100">
            <Form :model="details" inline>
                <FormItem label="节目集名称:" :label-width="90">
                    <Input v-model="details.title" placeholder="请输入节目集名称..." style="width:200px;" disabled> </Input>
                </FormItem>
            </Form>
            <Table border :columns="columns2" :data="data2"></Table>
            <div class="layout-bilibili-page">
                <Page :total="total1" :current="page1" :page-size='pageSize1' @on-change="changePage1" show-elevator />
            </div>
            <div style="margin-top:40px;"></div>
        </Modal>
        <!-- 分页 -->
        <div class="layout-bilibili-page">
            <Page :total="total" :current="page" :page-size='pageSize' @on-change="changePage" show-elevator />
        </div>
         <Modal v-model="modalDetails" title="查看子集信息" width="600">
            <Row>
                <Col span="24">
                第三方子集ID:{{subset.epid}}
                </Col>
                <Col span="24">
                第三方节目集ID:{{subset.sid}}
                </Col>
                <Col span='24'>
                封面:<img :src="subset.cover" alt="" style="width:50px;height:50px;"/>
                </Col>
                <Col span='24'>
                标题:{{subset.title}}
                </Col>
                <Col span='24'>
                副标题:{{subset.subtitle}}
                </Col>
                <Col span='24'>
                付费状态:{{subset.ISpaystatus}}
                </Col>
                <Col span='24'>
                是否可播:{{subset.autorised}}
                </Col>
                <Col span='24'>
                最近修改时间:{{subset.updatetime}}
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
            search:{
                title:'',
                area:'',
                status:'',
                categoryName:''//tab页name
            },//搜索
            total: 0,
            page: 1,
            pageSize: 30,//分页

            total1: 0,
            page1: 1,
            pageSize1: 30,//查看子集分页

            timer: [],
            timer1: [],
            tabs: [],//标签页
            modalSee:false,
            see:{},//查看
            modalTable:false,//查看子集
            details:{},
            subsetId:[],
            modalDetails:false,//子集详情
            columns1:[
                {
                    title: '节目集ID',
                    key: 'id',
                    align: 'center',
                    width:90
                },
                {
                    title: '节目集名称',
                    key: 'title',
                    align: 'center'
                },
                {
                    title: '分类',
                    key: 'category',
                    align: 'center',
                    width:90
                },
                {
                    title: '发布时间',
                    key: 'playtime',
                    align: 'center'
                },
                {
                    title: '地区',
                    key: 'area',
                    align: 'center',
                    width:90
                },
                {
                    title: '总集数',
                    key: 'totalnum',
                    align: 'center',
                    width:90
                },
                {
                    title: '是否可播',
                    key: 'autorised',
                    align: 'center',
                    width:90
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
                    align: 'center',
                     width:160,
                        render: (h, params) => {
                            return h('div',[
                                h('Button',{
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
                                },'查看'),
                                h('Button',{
                                    props:{
                                        type:'warning',
                                        size:'small',
                                    },
                                    style:{
                                        marginRight:'5px'
                                    },
                                    on:{
                                        click:() => {
                                            this.viewSubset(params.row)
                                        }
                                    }
                                },'查看子集')
                            ])
                        }
                    }
            ],
            subset:{},
            data1:[],
            columns2:[
                {
                    title: '子集ID',
                    key: 'epid',
                    align: 'center',
                    width:90
                },
                
                {
                    title: '子集集数',
                    key: 'sequence',
                    align: 'center',
                        width:90
                },
                { 
                    title: '子集名称',
                    key: 'title',
                    align: 'center'
                },
                {
                    title: '子集类型',
                    key: 'type',
                    align: 'center',
                    width:90
                },
                {
                    title: '时长',
                    key: 'duration',
                    align: 'center',
                    width:90
                },
                {
                    title: '上线状态',
                    key: '',
                    align: 'center',
                    width:90
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
                                        this.SubsetDetails(params.row)
                                    }
                                }
                            }, '子集详情')
                        ]);
                    }
                }
            ],
            data2:[]
            
        }
        
    },
    methods:{
        //列表
        getTableList(){
            let self = this;
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
                                              
            self.$http(this.$config.BaseURL7 + '/media/v2/original/bilibili/media/list?title=' + self.search.title + '&area=' + self.search.area + '&status=' + self.search.status + '&categoryName=' + self.search.categoryName + 
                    '&createStart=' + createStart + '&createEnd=' + createEnd + '&updateStart=' + updateStart + '&updateEnd=' + updateEnd + '&page=' + self.page + '&pagesize=' + self.pageSize).then(response =>{
                if(response.data.errno == 10000) {
                     console.log(response)
                    this.data1 = response.data.data.list;
                    this.total = response.data.data.total;
                //     response.data.data.list.forEach(val => {

                // });
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
            this.getTableList()
        },
        //子集分页
        changePage1(page1) {
            this.page1 = page;
            this.getTablesList()
        },
        //查看
        SeeModal(row) {
            console.log(row,'查看')
            this.see = row;
            this.modalSee = true;
             //付费状态 2免费 ,6付费 ,7付费抢先 ,8非正片付费, 9全付费抢先, 12霹雳付费, 13 大会员专享 
            if(row.paystatus == 2) {
                row.Ispaystatus = '免费'
            } else if(row.paystatus == 6) {
                row.Ispaystatus = '付费'
            } else if(row.paystatus == 7) {
                row.Ispaystatus = '付费抢先'
            } else if(row.paystatus == 8) {
                row.Ispaystatus = '非正片付费'
            } else if(row.paystatus == 9) {
                row.Ispaystatus = '全付费抢先'
            } else if(row.paystatus == 12) {
                row.Ispaystatus = '霹雳付费'
            } else if(row.paystatus == 13) {
                row.Ispaystatus = '大会员专享'
            }
        },
         //分类页获取tab
         getTabList() {
            let self = this;   
             self.$http(this.$config.BaseURL7 + '/media/v2/original/bilibili/category/list').then(response => {
                if (response.data.errno == 10000) {
                    console.log(response)
                    this.tabs = response.data.data
                }
            })
        },
        // 切换
        tabChange(name) {
            this.total = 0;
            this.data1 = [];
            this.search.categoryName = name;
            console.log(this.search.categoryName)
            this.getTableList();
        },
        //查看子集
        viewSubset(row) {
            console.log(row,'查看子集');
            this.details = row
            this.subsetId = row.id;
            this.modalTable = true;
            this.getTablesList()
        },
        // 子集列表
        getTablesList(){
            let self = this;                       
            self.$http(this.$config.BaseURL7 + '/media/v2/original/bilibili/mediasubset/list?id='+ self.subsetId + '&page=' + self.page1 + 
            '&pagesize='+ self.pageSize1).then(response =>{
                if(response.data.errno == 10000) {
                    console.log(response,'子集列表')
                    this.data2 = response.data.data.list;
                    this.total1 = response.data.data.total;
                }
                response.data.data.list.forEach(val => {
                    //转换时间
                    val.updatetime = moment(val.mtime * 1000).format(
                        "YYYY-MM-DD HH:mm:ss"
                    )          
                });
            })
        },
        //子集详情
        SubsetDetails(row) {
            console.log(row,'子集详情')
            this.subset = row;
            this.modalDetails = true;
            //转换时间
            row.updatetime = moment(row.mtime * 1000).format(
                "YYYY-MM-DD HH:mm:ss"
            ) 
            //付费状态 2免费 ,6付费 ,7付费抢先 ,8非正片付费, 9全付费抢先, 12霹雳付费, 13 大会员专享 
            if(row.paystatus == 2) {
                row.ISpaystatus = '免费'
            } else if(row.paystatus == 6) {
                row.ISpaystatus = '付费'
            } else if(row.paystatus == 7) {
                row.ISpaystatus = '付费抢先'
            } else if(row.paystatus == 8) {
                row.ISpaystatus = '非正片付费'
            } else if(row.paystatus == 9) {
                row.ISpaystatus = '全付费抢先'
            } else if(row.paystatus == 12) {
                row.ISpaystatus = '霹雳付费'
            } else if(row.paystatus == 13) {
                row.ISpaystatus = '大会员专享'
            }
        }

    },
    mounted() {
        this.getTableList()
        this.getTabList()
    }
}
</script>


