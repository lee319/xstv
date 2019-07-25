<style>
  .layout-serviceUser-page {
    float: right;
    margin-top: 10px;
  }
</style>
<template>
  <div class="layout-serviceUser">
    <div class="layout-serviceUser-search">
      <Form :model="search" inline>
        <FormItem label="用户UID:" :label-width="70">
          <Input v-model="search.id" placeholder="请输入用户UID..." style="width:200px;"></Input>
        </FormItem>
        <FormItem label="用户昵称:" :label-width="70">
          <Input v-model="search.nickname" placeholder="请输入用户昵称..." style="width:200px;"></Input>
        </FormItem>
        <FormItem label="微信ID:" :label-width="70">
          <Input v-model="search.openId" placeholder="请输入微信ID..." style="width:200px;"></Input>
        </FormItem>
        <FormItem label="手机号:" :label-width="60">
          <Input v-model="search.mobile" placeholder="请输入手机号..." style="width:200px;"></Input>
        </FormItem>
        <FormItem label="最后登录MAC:" :label-width="100">
          <Input v-model="search.lastLoginMac" placeholder="请输入最后登录MAC..." style="width:200px;"></Input>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="query">搜索</Button>
        </FormItem>
      </Form>
    </div>
    <div class="layout-serviceUser-table">
      <Table border :columns="columns1" :data="data1"></Table>
    </div>
    <div class="layout-serviceUser-page">
      <Page :total="total" :current="page" :page-size='pageSize' @on-change="changePage" show-elevator />
    </div>
    <!-- 详情 -->
    <Modal v-model="modalDetails" title="详情" width="1000">
      <Row>
        <Col span="8">
        <p>
          用户UID:{{news.id}}
        </p>
        </Col>
        <Col span="8">
        <p>
          用户昵称:{{news.nickname}}
        </p>
        </Col>
        <Col span="8">
        <p>
          性别:{{news.is_sex}}
        </p>
        </Col>
        <Col span="8">
        <p>
          邮箱:{{news.email}}
        </p>
        </Col>
        <Col span="8">
        <p>
          手机号:{{news.mobile}}
        </p>
        </Col>
        <Col span="8">
        <p>
          微信ID:{{news.openId}}
        </p>
        </Col>
        <Col span="8">
        <p>
          注册来源:{{news.is_source}}
        </p>
        </Col>
        <Col span="8">
        <p>
          注册方式:{{news.registerWay}}
        </p>
        </Col>
        <Col span="8">
        <p>
          影视会员:{{news.is_member}}
        </p>
        </Col>
        <Col span="8">
        <p>
          账号状态:{{news.is_status}}
        </p>
        </Col>
        <Col span="8">
        <p>
          注册时间:{{news.is_registerTime}}
        </p>
        </Col>
        <Col span="8">
        <p>
          注册终端mac:{{news.registerMac}}
        </p>
        </Col>
        <Col span="8">
        <p>
          注册IP:{{news.registerIp}}
        </p>
        </Col>
        <Col span="8">
        <p>
          最后登录时间:{{news.is_lastLoginTime}}
        </p>
        </Col>
        <Col span="8">
        <p>
          最后登录mac:{{news.lastLoginMac}}
        </p>
        </Col>
        <Col span="8">
        <p>
          最后登录IP:{{news.lastLoginIp}}
        </p>
        </Col>
        <Col span="8">
        <p>
          头像:
          <img :src="news.headimgurl" alt="" style="width:50px;height:50px;">
        </p>
        </Col>
      </Row>
      <Tabs value="name1">
        <TabPane label="影视订单信息" name="name1">
          <div>
            <Table border :columns="columns2" :data="data2"></Table>
          </div>
        </TabPane>
        <TabPane label="影视订购关系" name="name2">
          <div>
            <p>会员订购关系:</p>
            <Table border :columns="columns3" :data="data3"></Table>
            <div class="layout-serviceUser-page">
              <Page :total="total1" :current="page1" :page-size='pageSize1' @on-change="changePage1" show-elevator />
            </div>
          </div>
          <div style="margin-top:50px;">
            <p>单片订购关系:</p>
            <Table border :columns="columns4" :data="data4"></Table>
            <div class="layout-serviceUser-page">
              <Page :total="total2" :current="page2" :page-size='pageSize2' @on-change="changePage2" show-elevator />
            </div>
          </div>
        </TabPane>
      </Tabs>
    </Modal>
  </div>
</template>
<script>
  var moment = require('moment')
  export default {
    data() {
      return {
        search: {
          id: '',
          openId: '',
          mobile: '',
          nickname: '',
          lastLoginMac: ''
        }, // 搜索
        total: 0,
        page: 1,
        pageSize: 30, // 分页

        total1: 0,
        page1: 1,
        pageSize1: 10, // 分页

        total2: 0,
        page2: 1,
        pageSize2: 10, // 分页

        news: [],
        modalDetails: false,
        columns1: [
          {
            title: '用户UID',
            key: 'id',
            align: 'center'
          },
          {
            title: '微信ID',
            key: 'openId',
            align: 'center'
          },
          {
            title: '用户昵称',
            key: 'nickname',
            align: 'center'
          },
          {
            title: '手机号',
            key: 'mobile',
            align: 'center'
          },
          {
            title: '用户类型',
            key: 'registerWay',
            align: 'center'
          },
          {
            title: '账号状态',
            key: 'is_status',
            align: 'center'
          },
          {
            title: '注册时间',
            key: 'is_registerTime',
            align: 'center'
          },
          {
            title: '最后登录时间',
            key: 'is_lastLoginTime',
            align: 'center'
          },
          {
            title: '最后登录mac',
            key: 'lastLoginMac',
            align: 'center'
          },
          {
            title: '操作',
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
                      this.details(params.row)
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
            title: '订单号',
            key: 'orderId',
            align: 'center'
          },
          {
            title: '商品类型',
            key: 'goodsClass',
            align: 'center'
          },
          {
            title: '商品名称',
            key: 'goodsName',
            align: 'center'
          },
          {
            title: '支付金额',
            key: 'price',
            align: 'center'
          },
          {
            title: '支付状态',
            key: 'is_status',
            align: 'center'
          },
          {
            title: '创建时间',
            key: 'is_createTime',
            align: 'center'
          }
        ],
        data2: [],
        columns3: [
          {
            title: '首次会员时间',
            key: 'is_firstTime',
            align: 'center'
          },
          {
            title: '会员状态',
            key: 'is_status',
            align: 'center'
          },
          {
            title: '复购次数',
            key: 'repeatTimes',
            align: 'center'
          },
          {
            title: '过期时间',
            key: 'is_expire',
            align: 'center'
          }
        ],
        data3: [],
        columns4: [
          {
            title: '影片ID',
            key: 'contentId',
            align: 'center'
          },
          {
            title: '影片名称',
            key: 'goodsName',
            align: 'center'
          },
          {
            title: '订购状态',
            key: 'is_status',
            align: 'center'
          },
          {
            title: '过期时间',
            key: 'is_expire',
            align: 'center'
          }
        ],
        data4: [],
        id: ''
      }
    },
    methods: {
      // 表格数据
      getTableList() {
        this.$http.get(this.$config.BaseURL10 + '/customer/user/list?id=' + this.search.id + '&openId=' + this.search.openId + '&mobile=' + this.search.mobile + '&nickname=' + this.search.nickname + '&lastLoginMac=' + this.search.lastLoginMac + '&page=' + this.page + '&pageSize=' + this.pageSize).then(response => {
          console.log(response)
          if (response.data.errno == 10000) {
            this.data1 = response.data.data.list

            response.data.data.list.forEach(val => {
              // 用户状态，0 正常、1 禁用
              if (val.status == 0) {
                val.is_status = '正常'
              } else if (val.status == 1) {
                val.is_status = '禁用'
              }


              val.is_registerTime = moment(val.registerTime * 1000).format(
                'YYYY-MM-DD HH:mm:ss'
              )

              val.is_lastLoginTime = moment(val.lastLoginTime * 1000).format(
                'YYYY-MM-DD HH:mm:ss'
              )
            })

            this.total = response.data.data.total;
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
      details(row) {
        console.log(row)

        // 性别，1为男性，2为女性
        if (row.sex == 1) {
          row.is_sex = '男'
        } else if (row.sex == 2) {
          row.is_sex = '女'
        }
        // 来源，1 TV
        if (row.source == 1) {
          row.is_source = 'TV'
        }
        // 影视会员，true 是、false 否
        if (row.member == true) {
          row.is_member = '是'
        } else if (row.member == false) {
          row.is_member = '否'
        }
        // 用户状态，0 正常、1 禁用
        if (row.status == 0) {
          row.is_status = '正常'
        } else if (row.status == 1) {
          row.is_status = '禁用'
        }
        row.is_registerTime = moment(row.registerTime * 1000).format(
          'YYYY-MM-DD hh:mm:ss'
        )

        row.is_lastLoginTime = moment(row.lastLoginTime * 1000).format(
          'YYYY-MM-DD hh:mm:ss'
        )

        this.news = row;
        // this.$http.get(this.$config.BaseURL10 + '/customer/user/list?id=' + row.id).then(response => {
        //   console.log(response)
        //   if (response.data.errno == 10000) {
        //     this.news = response.data.data.list
        //     console.log(this.news)
        //     // response.data.data.list.forEach(val => {

        //     // 性别，1为男性，2为女性
        //     if (this.news.sex == 1) {
        //       this.news.is_sex = '男'
        //     } else if (this.news.sex == 2) {
        //       this.news.is_sex = '女'
        //     }

        //     // 注册方式，1 微信,
        //     if (this.news.registerWay == 1) {
        //       this.news.is_registerWay = '微信'
        //     }

        //     // 来源，1 TV
        //     if (this.news.source == 1) {
        //       this.news.is_source = 'TV'
        //     }
        //     // 影视会员，true 是、false 否
        //     if (this.news.member == true) {
        //       this.news.is_member = '是'
        //     } else if (this.news.member == false) {
        //       this.news.is_member = '否'
        //     }
        //     // 用户状态，0 正常、1 禁用
        //     if (this.news.status == 0) {
        //       this.news.is_status = '正常'
        //     } else if (this.news.status == 1) {
        //       this.news.is_status = '禁用'
        //     }
        //     this.news.is_registerTime = moment(this.news.registerTime * 1000).format(
        //       'YYYY-MM-DD hh:mm:ss'
        //     )

        //     this.news.is_lastLoginTime = moment(this.news.lastLoginTime * 1000).format(
        //       'YYYY-MM-DD hh:mm:ss'
        //     )
        //     // });
        //   }
        // })
        this.id = row.id
        this.getOrderList()
        this.getMemberList()
        this.getVodlist()

        this.modalDetails = true
      },
      // 订单列表
      getOrderList() {
        this.$http.get(this.$config.BaseURL10 + '/order/list?pageSize=' + 10 + '&userId=' + this.id).then(response => {
          if (response.data.errno == 10000) {
            this.data2 = response.data.data.list
            response.data.data.list.forEach(val => {
              // 订单状态：1未支付，2成功，3失败
              if (val.status == 1) {
                val.is_status = '未支付'
              } else if (val.status == 2) {
                val.is_status = '成功'
              } else if (val.status == 3) {
                val.is_status = '失败'
              }

              val.is_createTime = moment(val.createTime * 1000).format(
                'YYYY-MM-DD hh:mm:ss'
              )
            })
          }
        })
      },

      // 会员列表member
      getMemberList() {
        this.$http.get(this.$config.BaseURL10 + '/customer/member/relation?id=' + this.id).then(response => {
          console.log(response)
          if (response.data.errno == 10000) {
            this.data3 = response.data.data.list

            response.data.data.list.forEach(val => {
              if (val.expire != '') {
                val.is_expire = moment(val.expire * 1000).format(
                  'YYYY-MM-DD hh:mm:ss'
                )
              }

              if (val.firstTime != '') {
                val.is_firstTime = moment(val.firstTime * 1000).format(
                  'YYYY-MM-DD hh:mm:ss'
                )
              }
            })

            this.total1 = response.data.data.total
          }
        })
      },
      changePage1(page) {
        this.page1 = page
        this.getMemberList()
      },
      // 单片列表
      getVodlist() {
        this.$http.get(this.$config.BaseURL10 + '/order/vodlist?page=' + this.page2 + '&pageSize=' + this.pageSize2 + '&userId=' + this.id).then(response => {
          if (response.data.errno == 10000) {
            this.data4 = response.data.data.list
            response.data.data.list.forEach(val => {
              // 订购状态1 正常 2 过期 3 未知
              if (val.status == 1) {
                val.is_status = '正常'
              } else if (val.status == 2) {
                val.is_status = '过期'
              } else if (val.status == 3) {
                val.is_status = '未知'
              }

              val.is_expire = moment(val.expire * 1000).format(
                'YYYY-MM-DD hh:mm:ss'
              )
            })

            this.total2 = response.data.data.total
          }
        })
      },
      changePage2(page) {
        this.page2 = page
        this.getVodlist()
      }
    },
    mounted() {
      this.getTableList()
    }
  }
</script>