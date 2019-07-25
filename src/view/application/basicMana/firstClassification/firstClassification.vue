<style>
  .layout-firstClass-search {
    float: left;
  }

  .layout-firstClass-add {
    float: right;
  }

  .layout-firstClass-page {
    float: right;
    margin-top: 10px;
  }

  .span {
    font-size: 14px;
    margin: 15px;
    color: #495060;
    padding-bottom: 20px;
  }

  .layout-firstClass .ivu-poptip-confirm .ivu-poptip-body .ivu-icon {
    font-size: 16px;
    color: #ff9900;
    line-height: 18px;
    position: absolute;
    margin-left: -50px;
  }
</style>
<template>
  <div class="layout-firstClass">
    <div class="layout-firstClass-search">
      <Form :model="search" inline>
        <FormItem label="分类名称:" :label-width="70">
          <Input v-model="search.name" style="width:200px;" placeholder="请输入分类名称..."></Input>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="query">搜索</Button>
        </FormItem>
      </Form>
    </div>
    <!-- 添加 -->
    <div class="layout-firstClass-add">
      <Button type="success" @click="modalAddBtn">添加</Button>
      <Modal v-model="modalAdd" title="添加分类">
        <div slot="footer">
          <a @click="addCancel" class="span">取消</a>
          <Button @click="addOk" type="primary">确定</Button>
        </div>
        <Form :model="info" label-position="right" :label-width="100" ref="info" :rules="ruleValidate">
          <FormItem label="分类名称:" prop="name">
            <Input v-model="info.name" placeholder="请输入分类名称..."></Input>
          </FormItem>
          <FormItem label="分类图片:">
            <!-- <Input v-model="info.icon" placeholder="请输入分类名称..."></Input> -->
            <Upload :action="$config.BaseURLfile + '/common/upload/file'" ref="upload" :on-success="handleSuccess"
              :format="['jpg','jpeg','png']" :max-size="2048" :on-format-error="handleFormatError"
              :on-exceeded-size="handleMaxSize" :with-credentials="true" clearFiles>
              <Button icon="ios-cloud-upload-outline">上传图片</Button>
            </Upload>
          </FormItem>
          <FormItem label="排序ID:">
            <Input v-model="info.sortnumber" placeholder="请输入排序ID..."></Input>
          </FormItem>
          <FormItem label="分类描述:">
            <Input v-model="info.describe" type="textarea" :rows="4" placeholder="请输入分类描述..."></Input>
          </FormItem>
        </Form>
      </Modal>
    </div>
    <div style="clear:both;"></div>
    <div class="layout-firstClass-table">
      <Table border :columns="columns1" :data="data1"></Table>
    </div>
    <!-- 分页 -->
    <div class="layout-firstClass-page">
      <Page :total="total" :current="page" :page-size='pageSize' @on-change="changePage" show-elevator />
    </div>
    <!-- 修改 -->
    <Modal v-model="modalEdit" title="修改分类">
      <div slot="footer">
        <a @click="editCancel" class="span">取消</a>
        <Button @click="editOk" type="primary">确定</Button>
      </div>
      <Form :model="edit" label-position="right" :label-width="100" ref="edit" :rules="ruleValidate">
        <FormItem label="分类ID:">
          <Input v-model="edit.id" placeholder="请输入分类名称..." disabled></Input>
        </FormItem>
        <FormItem label="分类名称:" prop="name">
          <Input v-model="edit.name" placeholder="请输入分类名称..."></Input>
        </FormItem>
        <FormItem label="分类图片:">
          <Upload :action="$config.BaseURLfile + '/common/upload/file'" ref="upload1" :on-success="handleSuccess1"
            :format="['jpg','jpeg','png']" :max-size="2048" :on-format-error="handleFormatError"
            :on-exceeded-size="handleMaxSize" :with-credentials="true">
            <Button icon="ios-cloud-upload-outline">上传图片</Button>
          </Upload>
        </FormItem>
        <FormItem label="排序ID:">
          <Input v-model="edit.sortnumber" placeholder="请输入分类名称..."></Input>
        </FormItem>
        <FormItem label="分类描述:">
          <Input v-model="edit.describe" type="textarea" :rows="4" placeholder="请输入分类描述..."></Input>
        </FormItem>
        <FormItem label="创建时间:">
          <Input v-model="edit.is_create_time" placeholder="请输入分类名称..." disabled></Input>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>
<script>
  var moment = require('moment')
  export default {
    data() {
      return {
        search: {
          name: ''
        }, // 搜索
        page: 1,
        total: 0,
        pageSize: 30, // 分页
        info: {},
        modalAdd: false, // 添加
        id: '',
        edit: {},
        modalEdit: false, // 修改
        // 保存图片url
        addUploadUrl: '',
        editUploadUrl: '',
        columns1: [
          {
            title: '分类ID',
            key: 'id',
            align: 'center'
          },
          {
            title: '分类名称',
            key: 'name',
            align: 'center'
          },
          {
            title: '图标',
            key: 'icon',
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('img', {
                  attrs: {
                    src: params.row.icon
                  },
                  style: {
                    width: '50px',
                    height: '50px',
                    marginTop: '5px'
                  }
                })
              ])
            }

          },
          {
            title: '排序ID',
            key: 'sortnumber',
            align: 'center'
          },
          {
            title: '创建时间',
            key: 'is_create_time',
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
                        this.remove(params.row)
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
        data1: [],
        ruleValidate: {
          name: [
            { required: true, message: '请输入分类名称...', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      // 表格数据
      getTableList() {
        this.$http.get(this.$config.BaseURL11 + '/appstore/admin/v1/category/list?name=' + this.search.name + '&page=' + this.page + '&pageSize=' + this.pageSize).then(response => {
          if (response.data.errno == 10000) {
            this.data1 = response.data.data.list
            response.data.data.list.forEach(val => {
              val.is_create_time = moment(val.create_time * 1000).format(
                'YYYY-MM-DD hh:mm:ss'
              )
            })
            this.total = response.data.data.total
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
      // 添加上传成功
      handleSuccess(res, file) {
        console.log(res)
        this.addUploadUrl = res.data.url
        console.log(this.addUploadUrl)
      },
      // 修改上传成功
      handleSuccess1(res, file) {
        console.log(res)
        this.editUploadUrl = res.data.url
        console.log(this.editUploadUrl)
      },
      // 上传格式验证
      handleFormatError1(file) {
        this.$Notice.warning({
          title: '文件格式不正确',
          desc: '文件格式' + '文件名' + '不正确，请选择JPG或PNG'
        })
      },
      // 上传文件大小验证
      handleMaxSize1(file) {
        this.$Notice.warning({
          title: '超过文件大小限制',
          desc: '文件  ' + '文件名' + ' 太大，不超过2M.'
        })
      },
      // 上传格式验证
      handleFormatError(file) {
        this.$Notice.warning({
          title: '文件格式不正确',
          desc: '文件格式' + '文件名' + '不正确，请选择JPG或PNG'
        })
      },
      // 上传文件大小验证
      handleMaxSize(file) {
        this.$Notice.warning({
          title: '超过文件大小限制',
          desc: '文件  ' + '文件名' + ' 太大，不超过2M.'
        })
      },
      // 添加弹框
      modalAddBtn() {
        this.modalAdd = true
        this.$refs.upload.clearFiles()
      },
      // 添加确定按钮
      addOk() {
        var isValid = true
        this.$refs['info'].validate(valid => {
          if (valid == false) {
            this.$Message.error('表单输入有误,请检查!')
            isValid = false
          }
        })
        if (isValid == false) {
          return
        }
        this.info.sortnumber *= 1
        this.info.icon = this.addUploadUrl
        this.$http.post(this.$config.BaseURL11 + '/appstore/admin/v1/category/edit', this.info).then(response => {
          if (response.data.errno == 10000) {
            this.info = {}
            this.getTableList()
            this.modalAdd = false
            this.$Message.success('添加成功！')
          }
        })
      },
      // 添加取消按钮
      addCancel() {
        this.info = {}
        this.getTableList()
        this.modalAdd = false
      },
      // 修改弹框
      modify(row) {
        this.edit = row
        this.modalEdit = true
        this.id = row.id
        row.is_create_time = moment(row.create_time * 1000).format(
          'YYYY-MM-DD hh:mm:ss'
        )
        this.$refs.upload1.clearFiles()
      },
      // 修改确定按钮
      editOk() {
        var isValid = true
        this.$refs['edit'].validate(valid => {
          if (valid == false) {
            this.$Message.error('表单输入有误,请检查!')
            isValid = false
          }
        })
        if (isValid == false) {
          return
        }
        if (this.editUploadUrl != '') {
          this.edit.icon = this.editUploadUrl
        }
        this.edit.sortnumber *= 1
        this.$http.post(this.$config.BaseURL11 + '/appstore/admin/v1/category/edit?id=' + this.id, this.edit).then(response => {
          if (response.data.errno == 10000) {
            this.modalEdit = false
            this.getTableList()
            this.$Message.success('修改成功！')
          }
        })
      },
      // 修改取消按钮
      editCancel() {
        this.modalEdit = false
        this.getTableList()
      },
      // 删除
      remove(row) {
        this.$http.get(this.$config.BaseURL11 + '/appstore/admin/v1/category/del?id=' + row.id).then(response => {
          if (response.data.errno == 10000) {
            this.getTableList()
            this.$Message.success('删除成功！')
          }
        })
      }
    },
    mounted() {
      this.getTableList()
    }
  }
</script>