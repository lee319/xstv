<style>
    .layout-members-page{
    float: right;
    margin-top:10px;
}

    .ivu-table th,
    .ivu-table td {
        height: 40px;
    }
</style>
<template>
    <div class='layout-members'>
        <!-- 搜索 -->
        <div class='layout-members-search'>
            <Form :model="search" inline>
                <FormItem label="mac:" :label-width="50">
                    <Input v-model="search.mac" style="width:210px;" placeholder="请输入mac..."></Input>
                </FormItem>
                <FormItem label="用户UID:" :label-width="70">
                    <Input v-model='search.user_id' style="width:210px;" placeholder="请输入用户UID..."></Input>
                </FormItem>
                <FormItem label="手机号:" :label-width="60">
                    <Input v-model="search.mobile" style="width:210px;" placeholder="请输入手机号..."></Input>
                </FormItem>
                <FormItem label="合作方:" :label-width="60">
                    <Select v-model="search.cp_code" style="width:210px" aria-placeholder="请选择合作方...">
                        <Option value="">全部</Option>
                        <Option :value="0">优酷</Option>
                        <Option :value="1">新视</Option>
                        <Option :value="2">电视猫</Option>
                    </Select>
                </FormItem>
                <FormItem label="领取状态:" :label-width="70">
                    <Select v-model="search.status" style="width:210px" aria-placeholder="请选择领取状态...">
                        <Option value="">全部</Option>
                        <Option :value="1">成功</Option>
                        <Option :value="0">失败</Option>
                        <Option :value="2">已请求</Option>
                    </Select>
                </FormItem>
                <FormItem label="请求时间:" :label-width="90">
                    <DatePicker type="datetimerange" placement="bottom-end" placeholder="请选择创建时间..." style="width: 260px"
                        v-model="timer"></DatePicker>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="query">搜索</Button>
                </FormItem>
            </Form>

        </div>
         <div style="clear:both;"></div>
        <!-- 列表 -->
        <div class="layout-members-table">
            <Table border :columns="columns1" :data="data1"></Table>
        </div>
         <!-- 详情 -->
        <div class='layout-members-info'>
            <Modal v-model="modalInfo" title='领用记录详情' width="600">
                <Row>
                    <Col span="12">
                    领用订单号:{{details.order_no}}
                    </Col>
                    <Col span="12">
                    mac:{{details.mac}}
                    </Col>
                    <Col span="12">
                    厂商:{{details.customer}}
                    </Col>
                    <Col span="12">
                    商用型号:{{details.commercial}}
                    </Col>
                    <Col span="12">
                    内部型号:{{details.inside}}
                    </Col>
                    <Col span="12">
                    用户UID:{{details.user_id}}
                    </Col>
                    <Col span="12">
                    手机号:{{details.mobile}}
                    </Col>
                    <Col span="12">
                    合作方:{{details.cp}}
                    </Col>
                    <Col span="12">
                    领取时长:{{details.type}}
                    </Col>
                    <Col span="12">
                    领取状态:{{details.status}}
                    </Col>
                    <Col span="12">
                    请求时间:{{details.request_time}}
                    </Col>
                    <Col span="12">
                    领取成功时间:{{details.response_time}}
                    </Col>
                    <Col span="12">
                    领取失败原因:{{details.message}}
                    </Col>
                </Row>
            </Modal>
        </div>
        <!-- 分页 -->
        <div class="layout-members-page">
            <Page :total="total" :current="page" :page-size='pageSize' @on-change="changePage" show-elevator />
        </div>

    </div>
</template>
<script>
var moment = require('moment')
export default {
  data () {
    return {
      search: {
        mac: '',
        user_id: '',
        mobile: '',
        cp_code: '',
        status: '',
        start_time: '',
        end_time: ''
      }, // 搜索
      page: 1,
      pageSize: 30, // 分页
      total: 0,
      timer: [],
      // 详情
      details: {},
      modalInfo: false,
      columns1: [
        {
          title: '领取订单号',
          key: 'order_no',
          align: 'center'
        },
        {
          title: 'mac',
          key: 'mac',
          align: 'center'
        },
        {
          title: '新视UID',
          key: 'user_id',
          align: 'center'
        },
        {
          title: '手机号',
          key: 'mobile',
          align: 'center'
        },
        {
          title: '合作方',
          key: 'cp',
          align: 'center'
        },
        {
          title: '领取时长',
          key: 'type',
          align: 'center'
        },
        {
          title: '领取状态',
          key: 'status',
          align: 'center',
          width: 100
        },
        {
          title: '请求时间',
          key: 'request_time',
          align: 'center',
          width: 150
        },
        {
          title: '操作',
          align: 'center',
          width: 180,
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
              }, '详情'),
              h('Button', {
                props: {
                  type: 'warning',
                  size: 'small'
                },
                style: {
                  marginRight: '5px',
                  display: (params.row.status == '已请求') ? 'inline-block' : 'none'
                },
                on: {
                  click: () => {
                    this.syncs(params.row)
                  }
                }
              }, '同步')
            ])
          }
        }
      ],
      data1: []
    }
  },
  methods: {
    getTableList () {
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

      if (this.search.cp_code == undefined) {
        this.search.cp_code = ''
      }
      if (this.search.status == undefined) {
        this.search.status = ''
      }
      self.$http(this.$config.BaseURL10 + '/user/v2/members/log?mac=' + self.search.mac + '&user_id=' + self.search.user_id + '&mobile=' + self.search.mobile +
            '&cp_code=' + self.search.cp_code + '&status=' + self.search.status + '&start_time=' + start_time + '&end_time=' + end_time + '&page=' + self.page + '&pagesize=' +
            self.pageSize).then(response => {
        if (response.data.errno == 10000) {
          console.log(response)
          self.data1 = response.data.data.list
          self.total = response.data.data.total
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
    // 详情
    info (row) {
      this.modalInfo = true
      this.details = row
      // console.log(row, '详情')
    },
    // 同步
    syncs (row) {
      // console.log(row,'row')
      this.$http(this.$config.BaseURL10 + '/user/v2/members/sync?id=' + row.id).then(response => {
        // console.log(response, '同步')
        if (response.data.errno == 10000) {
          this.getTableList()
        }
      }, response => {
      })
    }
  },
  mounted () {
    this.getTableList()
  }
}
</script>
