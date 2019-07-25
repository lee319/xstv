<style>
    .layout-template-add {
        float: right;
        margin-bottom: 10px;
    }

    .layout-template-table {
        clear: both;
    }

    .span {
        font-size: 14px;
        margin: 15px;
        color: #495060;
        padding-bottom: 20px;
    }

    .layout-template-page {
        float: right;
        margin-top: 10px;
    }
    .ivu-table th,
    .ivu-table td {
        height: 40px;
    }

    .layout-template .ivu-poptip-confirm .ivu-poptip-body .ivu-icon {
        font-size: 16px;
        color: #ff9900;
        line-height: 18px;
        position: absolute;
        margin-left: -50px;
    }
</style>
<template>
    <div class="layout-template">
        <div class="layout-template-add">
            <Button type="success" @click="modalAdd = true">添加</Button>
            <Modal v-model="modalAdd" title="添加">
                <div slot="footer">
                    <a @click="addCancel" class="span">取消</a>
                    <Button @click="addOk" type="primary">确定</Button>
                </div>
                <Form :model="info" label-position="right" :label-width="100">
                    <FormItem label="模板名称:">
                        <Input v-model="info.title" placeholder="请输入模板名称..."></Input>
                    </FormItem>
                    <FormItem label="cp:">
                        <Select v-model="info.cp">
                            <Option v-for="item in cityList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="描述:">
                        <Input v-model="info.description" type="textarea" :rows="4" placeholder="请输入描述..."></Input>
                    </FormItem>
                </Form>
            </Modal>
        </div>
        <div class="layout-template-table">
            <Table border :columns="columns1" :data="data1"></Table>
        </div>
        <div class="layout-template-page">
            <Page :total="total" :current="1" :page-size='pageSize' @on-change="changePage" show-elevator />
        </div>
        <!-- 修改  -->
        <div class="layout-template-edit">
            <Modal v-model="modalEdit" title="修改">
                <div slot="footer">
                    <a @click="modalEditBtn" class="span">取消</a>
                    <Button @click="editOk" type="primary">确定</Button>
                </div>
                <Form :model="edit" label-position="right" :label-width="100">
                    <FormItem label="模板名称:">
                        <Input v-model="edit.title" placeholder="请输入模板名称..."></Input>
                    </FormItem>
                    <FormItem label="cp:">
                        <Select v-model="edit.cp">
                            <Option v-for="item in cityList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="描述:">
                        <Input v-model="edit.description" type="textarea" :rows="4" placeholder="请输入描述..."></Input>
                    </FormItem>
                </Form>
            </Modal>
        </div>
    </div>
</template>
<script>
import Qs from 'qs'
var moment = require('moment')
export default {
  data () {
    return {
      // 添加
      info: {},
      modalAdd: false,
      cityList: [],
      // 修改
      id: '',
      edit: {},
      modalEdit: false,
      // 分页
      pageSize: 30,
      page: 1,
      total: 0,
      columns1: [
        {
          title: '序号',
          type: 'index',
          width: 70,
          align: 'center'
        },
        {
          title: '模版名称',
          key: 'title',
          align: 'center'
        },
        {
          title: '创建人',
          key: 'addUser',
          align: 'center'
        },
        {
          title: '创建时间',
          key: 'addTime',
          align: 'center'
        },
        {
          title: '修改人',
          key: 'updateUser',
          align: 'center'
        },
        {
          title: '修改时间',
          key: 'updateTime',
          align: 'center'
        },
        {
          title: '描述',
          key: 'description',
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
                'Poptip', {
                  props: {
                    confirm: true,
                    title: '确定要删除吗！',
                    type: 'error',
                    size: 'small',
                    width: '150'
                  },
                  on: {
                    'on-ok': () => {
                      this.remove(params.index)
                    }
                  }
                }, [
                  h(
                    'Button', {
                      props: {
                        type: 'error',
                        size: 'small'
                      }
                    },
                    '删除'
                  )
                ]
              )
            ])
          }
        }
      ],
      data1: []
    }
  },
  methods: {
    // 表格
    getTableList () {
      let self = this
      self.$http(this.$config.BaseURL16 + '/staticpromotion/template/list?pageSize=' + self.pageSize + '&page=' + self.page).then(response => {
        if (response.data.errno == 10000) {
          self.data1 = response.data.data.list
          response.data.data.list.forEach(val => {
            val.addTime = moment(val.addTime * 1000).format(
              'YYYY-MM-DD'
            )
            val.updateTime = moment(val.updateTime * 1000).format(
              'YYYY-MM-DD'
            )
          })
          // 分页
          self.total = response.data.data.total
        }
      }, response => {

      })
    },
    //
    // http://promotion-admin.xstvos.com/staticpromotion/cp/list
    getSelectList () {
      let self = this
      self.$http(this.$config.BaseURL16 + '/staticpromotion/cp/list').then(response => {
        console.log(response)
        if (response.data.errno == 10000) {
          self.cityList = response.data.data
        }
      }, response => { })
    },
    // 添加
    addOk () {
      let self = this
      self.$http.post(this.$config.BaseURL16 + '/staticpromotion/template/save', self.info).then(response => {
        console.log(response)
        if (response.data.errno == 10000) {
          self.info = {}
          self.modalAdd = false
          self.getTableList()
          self.$Message.success('添加成功！')
        }
      }, response => { })
    },
    addCancel () {
      this.modalAdd = false
    },
    // 修改
    modify (row) {
      console.log(row)
      this.modalEdit = true
      this.edit = row
      this.id = row.id
    },
    // 修改确定按钮
    editOk () {
      let self = this
      self.$http.post(this.$config.BaseURL16 + '/staticpromotion/template/save?id=' + this.id, self.edit).then(response => {
        if (response.data.errno == 10000) {
          this.edit = {}
          this.modalEdit = false
          this.getTableList()
          this.$Message.success('修改成功！')
        }
      })
    },
    modalEditBtn () {
      this.modalEdit = false
      this.getTableList()
    },
    remove (index) {
      let self = this
      self.$http(this.$config.BaseURL16 + '/staticpromotion/template/delete?id=' + this.data1[index].id).then(response => {
        if (response.data.errno == 10000) {
          this.$Message.success('删除成功')
          this.getTableList()
        }
      }, response => { })
    },
    // 分页
    changePage (page) {
      this.page = page
      this.getTableList()
    }
  },
  mounted () {
    this.getTableList()
    this.getSelectList()
  }
}
</script>
