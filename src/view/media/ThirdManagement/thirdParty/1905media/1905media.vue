<style>
  .layout-1905media-page{
    float: right;
    margin-top:10px;
}

.ivu-table th,
.ivu-table td {
    height: 40px;
}
</style>
<template>
    <div class='layout-1905media'>
        <!-- 搜索 -->
        <div class='layout-1905media-search'>
            <Form :model="search" inline>
                <FormItem label="节目集名称:" :label-width="90">
                    <Input v-model="search.title" style="width:200px;" placeholder="请输入节目集名称..."></Input>
                </FormItem>
                 <FormItem label="付费类型:" :label-width="70">
                    <Select v-model='search.paytype' style="width:200px" placeholder="请选择上线状态...">
                        <Option value="">全部</Option>
                        <Option value="FREE">免费</Option>
                        <Option value="BASIC_PACKAGE">基础套餐</Option>
                        <Option value="ADDED_PACKAGE">VIP套餐</Option>
                        <Option value="SINGLE_CHIP">单片订购</Option>
                    </Select>
                </FormItem>
                <FormItem label="是否可播:" :label-width="70">
                    <Select v-model='search.status' style="width:200px" placeholder="请选择上线状态...">
                        <Option value="">全部</Option>
                        <Option :value="0">上线</Option>
                        <Option :value="1">下线</Option>
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
        <div class="layout-1905media-table">
            <Table border :columns="columns1" :data="data1"></Table>
        </div>
        <!-- 分页 -->
        <div class="layout-1905media-page">
            <Page :total="total" :current="page" :page-size='pageSize' @on-change="changePage" show-elevator />
        </div>
        <!-- 查看 -->
        <Modal v-model="modalSee" title="查看节目集信息" width="900">
            <Row>
                <Col span="12">
                节目ID:{{see.id}}
                </Col>
                <Col span="12">
                节目名称:{{see.name}}
                </Col>
                <Col span="12">
                节目类型:{{see.Isdrama_type}}
                </Col>
                <Col span="12">
                节目看点:{{see.watch}}
                </Col>
                <Col span="12">
                分类名称:{{see.classify_name}}
                </Col>
                <Col span="12">
                三级标签名称:{{see.classify_tag_names}}
                </Col>
                <Col span="12">
                提供商名称:{{see.provider_name}}
                </Col>
                <Col span="12">
                海报图:<img :src="see.poster_url" alt="" style="width:50px;height:50px;">
                </Col>
                <Col span="12">
                横版海报:<img :src="see.banner_poster" alt="" style="width:80px;height:50px;">
                </Col>
                <Col span="12">
                画质:{{see.definition}}
                </Col>
                <Col span="12">
                付费类型:{{see.Ispay_typs}}
                </Col>
                <Col span="12">
                上映时间:{{see.release_time}}
                </Col>
                <Col span="12">
                播放次数:{{see.plays}}
                </Col>
                <Col span="12">
                导演:{{see.director}}
                </Col>
               <Col span="12">
                主演:{{see.actor}}
                </Col>
                <Col span="12">
                剧集类型:{{see.drama_index}}
                </Col>
                <Col span="12">
                总集数:{{see.total_number}}
                </Col>
                <Col span="12">
                最大集数:{{see.max_number}}
                </Col>
                <Col span="12">
                最大期数:{{see.max_publish_time}}
                </Col>
                <Col span="12">
                视频原价:{{see.original_price}}
                </Col>
                <Col span="12">
                单片付费有效期:{{see.valid_time}}
                </Col>
                <Col span="12">
                节目标签:{{see.label}}
                </Col>
                <Col span="12">
                状态:{{see.is_status}}
                </Col>
                <Col span="12">
                节目介绍:{{see.introduction}}
                </Col>
            </Row>
        </Modal>
        <!-- 查看子集 -->
         <Modal v-model="modalTable" title="查看子集" width="1100">
            <Form :model="details" inline>
                <FormItem label="节目集名称:" :label-width="90">
                    <Input v-model="details.name" placeholder="请输入节目集名称..." style="width:200px;" disabled> </Input>
                </FormItem>
            </Form>
            <Table border :columns="columns2" :data="data2"></Table>
            <div class="layout-1905media-page">
                <Page :total="total1" :current="page1" :page-size='pageSize1' @on-change="changePage1" show-elevator />
            </div>
            <div style="margin-top:40px;"></div>
        </Modal>
        <Modal v-model="modalDetails" title="子集详情" width="900">
            <Row>
                <Col span="12">
                节目集ID:{{subset.videoid}}
                </Col>
                <Col span="12">
                子集ID:{{subset.id}}
                </Col>
                <Col span="12">
                播放时长:{{subset.playlength}}
                </Col>
                <Col span="12">
                试看类型:{{subset.Islooktype}}
                </Col>
                <Col span="12">
                剧集类型:{{subset.Isdramatype}}
                </Col>
                <Col span="12">
                分集信息:{{subset.name}}
                </Col>
                <Col span="12">
                第几集:{{subset.number}}
                </Col>
                <Col span="12">
                一句看点:{{subset.watch}}
                </Col>
                <Col span="12">
                图片:<img :src="subset.picture" alt="" style="width:50px;height:50px;">
                </Col>
                <Col span="12">
                状态:{{subset.is_status}}
                </Col>
            </Row>
        </Modal>
    </div>
</template>
<script>
var moment = require('moment')
export default {
  data () {
    return {
      search: {
        title: '',
        status: '',
        paytype: '',
        categoryName: ''// tab页name
      },
      total: 0,
      page: 1,
      pageSize: 30, // 分页
      timer: [],
      timer1: [],
      tabs: [], // 标签页
      modalSee: false, // 查看
      modalTable: false, // 查看子集
      modalDetails: false, // 子集详情
      total1: 0,
      page1: 1,
      pageSize1: 30, // 分页
      subsetId: [],
      see: {}, // 查看子集信息
      details: {}, // 子集列表
      subset: {}, // 子集详情信息
      columns1: [
        {
          title: '节目集ID',
          key: 'id',
          align: 'center',
          width: 90
        },
        {
          title: '节目集名称',
          key: 'name',
          align: 'center'
        },
        {
          title: '付费类型',
          key: 'Ispay_typs',
          align: 'center',
          width: 90
        },
        {
          title: '导演',
          key: 'director',
          align: 'center',
          width: 90
        },
        {
          title: '上线状态',
          key: 'is_status',
          align: 'center',
          width: 90
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
          width: 160,
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
                    this.SeeModal(params.row)
                  }
                }
              }, '查看'),
              h('Button', {
                props: {
                  type: 'warning',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.viewSubset(params.row)
                  }
                }
              }, '查看子集')
            ])
          }
        }
      ],
      data1: [],
      // 子集列表
      columns2: [
        {
          title: '子集ID',
          key: 'id',
          align: 'center',
         
        },
        {
          title: '子集集数',
          key: 'number',
          align: 'center',
          width:90
        },
        {
          title: '子集名称',
          key: 'name',
          align: 'center',
       
        },
        {
          title: '子集类型',
          key: 'Isdramatype',
          align: 'center',
          width:100

        },
        {
          title: '时长',
          key: 'playlength',
          align: 'center',
          width:90
        },
        {
          title: '上线状态',
          key: 'Isstatus',
          align: 'center',
          width:90

        },
        {
          title: '创建时间',
          key: 'create_time',
          align: 'center',
          width:150
        },
        {
          title: '最后更新时间',
          key: 'update_time',
          align: 'center',
          width: 150
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
                  size: 'small'
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
            ])
          }
        }
      ],
      data2: []
    }
  },
  methods: {
    // 列表
    getTableList () {
      let self = this
      // 创建开始和结束时间
      let createStart = moment(this.timer[0]).format('X')

      let createEnd = moment(this.timer[1]).format('X')
      // 最后更新时间
      let updateStart = moment(this.timer1[0]).format('X')

      let updateEnd = moment(this.timer1[1]).format('X')

      if (this.search.status == undefined) {
        this.search.status = ''
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

      self.$http(this.$config.BaseURL7 + '/media/v2/original/1905tv/media/list?title=' + self.search.title + '&paytype=' + self.search.paytype + '&status=' + self.search.status + '&categoryName=' + self.search.categoryName +
                    '&createStart=' + createStart + '&createEnd=' + createEnd + '&updateStart=' + updateStart + '&updateEnd=' + updateEnd + '&page=' + self.page + '&pagesize=' + self.pageSize).then(response => {
        console.log(response, '列表')
       if (response.data.errno == 10000) {
          this.data1 = response.data.data.list
          this.total = response.data.data.total
          response.data.data.list.forEach(val => {
            if (val.status == 0) {
              val.is_status = '上线'
            } else if (val.status == 1) {
              val.is_status = '下线'
            }

            if(val.pay_type == 'FREE') {
                val.Ispay_typs = '免费'
            }else if(val.pay_type == 'BASIC_PACKAGE') {
                val.Ispay_typs = '基础套餐'
            }else if(val.pay_type == 'ADDED_PACKAGE') {
                val.Ispay_typs = 'VIP套餐'
            }else if(val.pay_type == 'SINGLE_CHIP') {
                val.Ispay_typs = '单片订购'
            }
          })
        }
      })
    },
    // 搜索
    query () {
      this.page = 1
      this.getTableList()
    },
    // 分页
    changePage (page) {
      this.page = page
      this.getTableList()
    },
    // 子集分页
    changePage1 (page1) {
      this.page1 = page
      this.getTableList()
    },
    // 获取分类页tabs
    getTabList () {
      //  /media/v2/original/1905tv/category/list
      let self = this
      self.$http.get(this.$config.BaseURL7 + '/media/v2/original/1905tv/category/list').then(response => {
        console.log(response, '分类')
        if (response.data.errno == 10000) {
          this.tabs = response.data.data
        }
      })
    },
    tabChange (name) {
      this.total = 0
      this.data1 = []
      this.search.categoryName = name
      // console.log(this.search.categoryName)
      this.getTableList()
    },
    // 查看
    SeeModal (row) {
        console.log(row,'查看')
      this.modalSee = true
      this.see = row
      if (row.status == 0) {
        row.is_status = '上线'
      } else if (row.status == 1) {
        row.is_status = '下线'
      }

      if(row.pay_type == 'FREE') {
          row.Ispay_typs = '免费'
      }else if(row.pay_type == 'BASIC_PACKAGE') {
          row.Ispay_typs = '基础套餐'
      }else if(row.pay_type == 'ADDED_PACKAGE') {
          row.Ispay_typs = 'VIP套餐'
      }else if(row.pay_type == 'SINGLE_CHIP') {
          row.Ispay_typs = '单片订购'
      };

      if(row.drama_type == 'POSITIVE') {
          row.Isdrama_type = '正片'
      }else if(row.drama_type == 'TRAILER') {
          row.Isdrama_type = '预告片'
      }else if(row.drama_type == 'TIDBITS') {
          row.Isdrama_type = '片花'
      }else if(row.drama_type == 'OTHER') {
          row.Isdrama_type = '其它'
      }
    //转换时间
    // row.Isrelease_time = moment(row.release_time * 1000).format(
    //     "YYYY-MM-DD HH:mm:ss"
    // );
    // row.Ismax_publish_time = moment(row.max_publish_time * 1000).format(
    //     "YYYY-MM-DD HH:mm:ss"
    // );
       
    },
    // 子集列表
    getTablesList () {
      let self = this
      // /media/v2/original/1905tv/mediasubset/list
      self.$http(this.$config.BaseURL7 + '/media/v2/original/1905tv/mediasubset/list?id=' + self.subsetId + '&page=' + self.page1 +
            '&pagesize=' + self.pageSize1).then(response => {
        if (response.data.errno == 10000) {
          console.log(response, '子集列表')
          this.data2 = response.data.data.list
          this.total2 = response.data.data.total
          response.data.data.list.forEach(val => {
            if (val.status == 0) {
              val.Isstatus = '上线'
            } else if (val.status == 1) {
              val.Isstatus = '下线'
            }
            if(val.dramatype == 'POSITIVE') {
                val.Isdramatype = '正片'
            }else if(val.dramatype == 'TRAILER') {
                val.Isdramatype = '预告片'
            }else if(val.dramatype == 'TIDBITS') {
                val.Isdramatype = '片花'
            }else if(val.dramatype == 'OTHER') {
                val.Isdramatype = '其它'
            }
          })
        }
      })
    },
    // 查看子集
    viewSubset (row) {
      console.log(row, '查看子集')
      this.modalTable = true
      this.subsetId = row.id
      this.getTablesList()
    },
    // 子集详情
    SubsetDetails (row) {
        this.modalDetails = true
        this.subset = row
        if (row.status == 0) {
            row.is_status = '上线'
        } else if (row.status == 1) {
            row.is_status = '下线'
        };
        if(row.pay_type == 'FREE') {
            row.Ispay_typs = '免费'
        }else if(row.pay_type == 'BASIC_PACKAGE') {
            row.Ispay_typs = '基础套餐'
        }else if(row.pay_type == 'ADDED_PACKAGE') {
            row.Ispay_typs = 'VIP套餐'
        }else if(row.pay_type == 'SINGLE_CHIP') {
            row.Ispay_typs = '单片订购'
        };
        if(row.dramatype == 'POSITIVE') {
            row.Isdramatype = '正片'
        }else if(row.dramatype == 'TRAILER') {
            row.Isdramatype = '预告片'
        }else if(row.dramatype == 'TIDBITS') {
            row.Isdramatype = '片花'
        }else if(row.dramatype == 'OTHER') {
            row.Isdramatype = '其它'
        };
        if(row.looktype == 'WHOLE') {
            row.Islooktype = '全部试看'
        }else if(row.looktype == 'SIX') {
            row.Islooktype = '6分钟'
        }else if(row.looktype == 'NONE') {
            row.Islooktype = '不能试看'
        };
     
        }
  },
  mounted () {
    this.getTableList()
    this.getTabList()
  }
}
</script>
