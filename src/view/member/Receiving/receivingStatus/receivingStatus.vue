<style>
  .layout-receivingStatus-page {
    float: right;
    margin-top: 10px;
  }

  .ivu-table th,
  .ivu-table td {
    height: 40px;
  }
</style>
<template>
  <div class='layout-receivingStatus'>
    <!-- 搜索 -->
    <div class='layout-receivingStatus-search'>
      <Form :model="search" inline>
        <FormItem label="mac:" :label-width="50">
          <Input v-model="search.mac" style="width:200px;" placeholder="请输入mac..."></Input>
        </FormItem>
        <FormItem label="会员套餐:" :label-width="70">
          <Select v-model='search.type' style="width:200px" aria-placeholder="请选择...">
            <Option value="">全部</Option>
            <Option :value="2">一月</Option>
            <Option :value="3">一季度</Option>
            <Option :value="4">半年</Option>
            <Option :value="5">一年</Option>
          </Select>
        </FormItem>
        <FormItem label="领用状态:" :label-width="70">
          <Select v-model='search.status' style="width:200px" aria-placeholder="请选择...">
            <Option value="">全部</Option>
            <Option :value="1">已领取</Option>
            <Option :value="0">未领取</Option>
            <Option :value="2">领取异常</Option>
          </Select>
        </FormItem>
        <FormItem label="领取时间:" :label-width="70">
          <DatePicker type="datetimerange" placement="bottom-end" placeholder="请选择领取时间..." style="width: 260px"
            v-model="timer"></DatePicker>
        </FormItem>
        <FormItem label="用户UID:" :label-width="70">
          <Input v-model='search.user_id' style="width:200px;" placeholder="请输入用户UID..."></Input>
        </FormItem>
        <FormItem label="手机号:" :label-width="60">
          <Input v-model='search.mobile' style="width:200px;" placeholder="请输入手机号..."></Input>
        </FormItem>
        <FormItem label="终端厂商:" :label-width="70">
          <Select v-model="search.customer_id" style="width:200px" placeholder="请选择终端厂商...">
            <Option value="">全部</Option>
            <Option v-for="item in OptionList1" :value='item._id' :key="item._id">{{item.customerName}}</Option>
          </Select>
        </FormItem>
        <FormItem label="商用型号:" :label-width="80">
          <Select v-model="search.commercial_id" style="width:200px" placeholder="请选择商用型号...">
            <Option value="">全部</Option>
            <Option v-for="item in OptionList2" :value='item._id' :key="item._id">{{ item.commercialName }}</Option>
          </Select>
        </FormItem>
        <FormItem label="内部型号:" :label-width="70">
          <Select v-model="search.inside_id" style="width:200px" placeholder="请选择内部型号...">
            <Option value="">全部</Option>
            <Option v-for="item in OptionList3" :value='item._id' :key="item._id">{{ item.insideName }}</Option>
          </Select>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="query">搜索</Button>
        </FormItem>
      </Form>
    </div>
    <div style="clear:both;"></div>
    <!-- 列表 -->
    <div class="layout-receivingStatus-table">
      <Table border :columns="columns1" :data="data1"></Table>
    </div>
    <!-- 详情 -->
    <div class='layout-receivingStatus-info'>
      <Modal v-model="modalInfo" title='领用成功详情' width="1000">
        <Row>
          <Col span="8">
          mac:{{details.mac}}
          </Col>
          <Col span="8">
          厂商:{{details.customer}}
          </Col>
          <Col span="8">
          商用型号:{{details.commercial}}
          </Col>
          <Col span="8">
          内部型号:{{details.inside}}
          </Col>
          <Col span="8">
          领用状态:{{details.status}}
          </Col>
          <Col span="8">
          领取时间:{{details.receive_time}}
          </Col>
          <Col span="8">
          用户UID:{{details.user_id}}
          </Col>
          <Col span="8">
          用户昵称:{{details.user_name}}
          </Col>
          <Col span="8">
          领取手机号:{{details.mobile}}
          </Col>
        </Row>
        <div class="layout-receivingStatus-table">
          <Table border :columns="columns2" :data="data2"></Table>
        </div>
      </Modal>
    </div>
    <!-- 分页 -->
    <div class="layout-receivingStatus-page">
      <Page :total="total" :current="page" :page-size='pageSize' @on-change="changePage" show-elevator />
    </div>
  </div>
</template>
<script>
  var moment = require('moment')
  export default {
    data() {
      return {
        // 搜索
        search: {
          mac: '',
          type: '',
          status: '',
          user_id: '',
          customer_id: '',
          mobile: '',
          commercial_id: '',
          inside_id: '',
          start_time: '',
          end_time: ''
        },
        // 下拉框
        OptionList1: [],
        OptionList2: [],
        OptionList3: [],
        page: 1,
        pageSize: 30, // 分页
        total: 0,
        timer: [],
        modalInfo: false,
        details: {},
        mac: '', 
        columns1: [
          {
            title: 'mac',
            key: 'mac',
            align: 'center',
            width: 140
          },
          {
            title: '内部型号',
            key: 'inside',
            align: 'center',
          
          },
          {
            title: '领用状态',
            key: 'status',
            align: 'center',
         
          },
          {
            title: '用户UID',
            key: 'user_id',
            align: 'center'
          
          },
          {
            title: '领用时间',
            key: 'receive_time',
            align: 'center'
          },
          {
            title: '新视会员',
            key: 'ISxstvUser',
            align: 'center'
         
          },
          {
            title: '优酷会员',
            key: 'ISyouku_user',
            align: 'center'
          }, 
          {
            title: '电视猫会员',
            key: 'ISmoretv_user',
            align: 'center'
       

          },
          {
            title: '1905会员',
            key: 'IS1905_user',
            align: 'center'
         

          },
          {
            title: '南瓜会员',
            key: 'ISpumpkin_user',
            align: 'center'
        
          },
          {
            title: '操作',
            align: 'center',
            width: 140,
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
                      this.info(params.row)
                    }
                  }
                }, '详情')
              ])
            }
          }
        ],
        data1: [],
        columns2: [
          {
            title: '序号',
            key: 'id',
            align: 'center'
          },
          {
            title: '领用订单号',
            key: 'order_no',
            align: 'center'
          },
          {
            title: '合作方',
            key: 'cp',
            align: 'center'
          },
          {
            title: '会员套餐',
            key: 'type_desc',
            align: 'center'
          },
          {
            title: '领取状态',
            key: 'status_desc',
            align: 'center'
          },
          {
            title: '请求时间',
            key: 'request_time',
            align: 'center'
          },
          {
            title: '领取成功时间',
            key: 'response_time',
            align: 'center'
          },
          {
            title: '失败原因',
            key: 'message',
            align: 'center'
          }
        ],
        data2: []
      }
    },
    methods: {
      // 列表数据
      getTableList() {
        let self = this
        // 开始时间
        let start_time = moment(self.timer[0]).format('X')
        // 结束时间
        let end_time = moment(self.timer[1]).format('X')

        if (isNaN(start_time)) {
          start_time = ''
        }
        if (isNaN(end_time)) {
          end_time = ''
        }

        if (this.search.type == undefined) {
          this.search.type = ''
        }

        if (this.search.status == undefined) {
          this.search.status = ''
        }
        self.$http(this.$config.BaseURL10 + '/user/v2/members/authorize?mac=' + self.search.mac + '&type=' + self.search.type + '&status=' + self.search.status +
          '&start_time=' + start_time + '&end_time=' + end_time + '&user_id=' + self.search.user_id + '&mobile=' + self.search.mobile + '&customer_id=' + self.search.customer_id +
          '&inside_id=' + self.search.inside_id + '&commercial_id=' + self.search.commercial_id + '&page=' + self.page + '&pagesize=' + self.pageSize).then(response => {
            if (response.data.errno == 10000) {
              console.log(response, '列表')
              self.data1 = response.data.data.list
              self.total = response.data.data.total
              response.data.data.list.forEach(val => {
                // 领用状态 0.未领取   1.已领取   2.领取异常

                // 会员套餐：2、一个月，3、一个季度，4、半年，5、一年

                // 新视家会员领取状态：1、成功，0、失败
                if (val.xstv_user == 1) {
                  val.ISxstvUser = '成功'
                } else if (val.xstv_user == 0) {
                  val.ISxstvUser = '失败'
                }
                // 优酷
                if (val.youku_user == 0) {
                  val.ISyouku_user = '失败'
                } else if (val.youku_user == 1) {
                  val.ISyouku_user = '成功'
                }
                // 电视猫
                if (val.moretv_user == 0) {
                  val.ISmoretv_user = '失败'
                } else if (val.moretv_user == 1) {
                  val.ISmoretv_user = '成功'
                }
                // 南瓜会员
                if (val.pumpkin_user == 0) {
                  val.ISpumpkin_user = '失败'
                } else if (val.pumpkin_user == 1) {
                  val.ISpumpkin_user = '成功'
                }
                // 1905
                if (val['1905_user'] == 0) {
                  val.IS1905_user = '失败'
                } else if (val['1905_user'] == 1) {
                  val.IS1905_user = '成功'
                }
              })
            }
          })
      },

      // 终端厂商
      getSelectList() {
        let self = this
        self.$http(this.$config.BaseURL2 + '/tv/customer/list').then(response => {
          if (response.data.errno == 10000) {
            // console.log(response,'终端厂商')
            self.OptionList1 = response.data.data.list
          }
        })
      },
      // 商用型号下拉框
      getSelectList1() {
        let self = this
        self.$http(this.$config.BaseURL2 + '/tv/commercialmodel/list').then(response => {
          if (response.data.errno == 10000) {
            // console.log(response,'商用型号')
            self.OptionList2 = response.data.data.list
          }
        })
      },
      // 内部型号下拉框
      getSelectList2() {
        let self = this
        self.$http(this.$config.BaseURL2 + '/tv/insidemodel/list').then(response => {
          if (response.data.errno == 10000) {
            //  console.log(response,'内部型号')
            self.OptionList3 = response.data.data.list
          }
        })
      },
      // 搜索
      query() {
        this.page = 1
        this.getTableList()
      },
      // 分页
      changePage(page) {
        this.page = page
        this.getTableList()
      },
      // 详情
      info(row) {
        this.modalInfo = true
        this.details = row
        // this.mac = row.mac;
        console.log(row, 'row')
        this.getInfoTableList()
        //  //新视家会员领取状态：1、成功，0、失败
        //             if (row.xstv_user == 1) {
        //                 row.ISxstvUser = '成功'
        //             } else if (row.xstv_user == 0) {
        //                 row.ISxstvUser = '失败'
        //             }
        //             //优酷
        //             if(row.youku_user == 0){
        //                 row.youku_user = '失败'
        //             }else if (row.youku_user == 1) {
        //                 row.ISyouku_user = '成功'
        //             }
        //             //电视猫
        //             if(row.moretv_user == 0) {
        //                 row.ISmoretv_user = '失败'
        //             }else if (row.moretv_user == 1){
        //                 row.ISmoretv_user = '成功'
        //             }
        //             //南瓜会员
        //             if(row.pumpkin_user == 0) {
        //                 row.ISpumpkin_user = '失败'
        //             } else if(row.pumpkin_user == 1) {
        //                 row.ISpumpkin_user = '成功'
        //             }

        //             //1905
        //             if(row['1905_user'] == 0) {
        //                 row.IS1905_user = '失败'
        //             } else if(row['1905_user'] == 1) {
        //                 row.IS1905_user = '成功'
        //             }
      },
      // 详情列表
      getInfoTableList() {
        let self = this
        // 开始时间
        let start_time = moment(self.timer[0]).format('X')
        // 结束时间
        let end_time = moment(self.timer[1]).format('X')

        if (isNaN(start_time)) {
          start_time = ''
        }
        if (isNaN(end_time)) {
          end_time = ''
        }
        self.$http(this.$config.BaseURL10 + '/user/v2/members/authorize?mac=' + self.mac).then(response => {
          if (response.data.errno == 10000) {
            self.data2 = response.data.data.list[0].detail_list
            console.log(response.data.data.list[0].detail_list, '详情列表')
            response.data.data.list.forEach(val => {
              // 新视家会员领取状态：1、成功，0、失败
              if (val.xstv_user == 1) {
                val.ISxstvUser = '成功'
              } else if (val.xstv_user == 0) {
                val.ISxstvUser = '失败'
              }
              // 优酷
              if (val.youku_user == 0) {
                val.ISyouku_user = '失败'
              } else if (val.youku_user == 1) {
                val.ISyouku_user = '成功'
              }
              // 电视猫
              if (val.moretv_user == 0) {
                val.ISmoretv_user = '失败'
              } else if (val.moretv_user == 1) {
                val.ISmoretv_user = '成功'
              }
              // 南瓜会员
              if (val.pumpkin_user == 0) {
                val.ISpumpkin_user = '失败'
              } else if (val.pumpkin_user == 1) {
                val.ISpumpkin_user = '成功'
              }
              // 1905
              if (val['1905_user'] == 0) {
                val.IS1905_user = '失败'
              } else if (val['1905_user'] == 1) {
                val.IS1905_user = '成功'
              }
            })
          }
        })
      }

    },
    mounted() {
      this.getTableList()
      this.getInfoTableList()
      this.getSelectList()
      this.getSelectList1()
      this.getSelectList2()
    }
  }
</script>