<style>
    .layout-bootanimation2-search {
        float: left;
    }

    .layout-bootanimation2-add {
        float: right;
    }

    .layout-bootanimation2-table {
        clear: both;
    }

    .layout-bootvideo-page {
        float: right;
        margin-top: 10px;
    }

    .span {
        font-size: 14px;
        margin: 15px;
        color: #495060;
        padding-bottom: 20px;
    }

    .layout-bootanimation2 .ivu-poptip-confirm .ivu-poptip-body .ivu-icon {
        font-size: 16px;
        color: #ff9900;
        line-height: 18px;
        position: absolute;
        margin-left: -50px;
    }

    .ivu-table th,
    .ivu-table td {
        height: 40px;
    }
</style>
<template>
    <div class="layout-bootanimation2">
        <div class="layout-bootanimation2-search">
            <Form :model="search" inline>
                <FormItem label="动画名称:" :label-width="70">
                    <Input v-model="search.title" style="width:200px;" placeholder="请输入动画名称..."></Input>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="query">搜索</Button>
                </FormItem>
            </Form>
        </div>
        <!-- 添加 -->
        <div class="layout-bootanimation2-add">
            <Button type="success" @click="modalAdd = true">添加</Button>
            <Modal v-model="modalAdd" title="添加">
                <div slot="footer">
                    <a @click="addCancel" class="span">取消</a>
                    <Button @click="addOk" type="primary">确定</Button>
                </div>
                <Form :model="info" label-position="right" :label-width="90" ref="info" :rules="ruleValidate">
                    <FormItem label="动画名称:" prop="title">
                        <Input v-model="info.title" placeholder="请输入视频名称..."></Input>
                    </FormItem>
                    <FormItem label="上传动画:">
                        <!-- <Input v-model="info.input2" placeholder="请输入文件地址..."></Input> -->
                        <Upload :action="$config.BaseURLfile + '/common/upload/file'" :on-success="handleSuccess"
                            :format="['jpg','jpeg','png']" :max-size="2048" :on-format-error="handleFormatError"
                            :on-exceeded-size="handleMaxSize" :with-credentials="true">
                            <Button icon="ios-cloud-upload-outline">上传动画</Button>
                        </Upload>
                    </FormItem>
                    <FormItem label="文件Md5值:">
                        <Input v-model="info.fileMd5" placeholder="请输入文件Md5值..."></Input>
                    </FormItem>
                    <!-- <FormItem label="类型:">
                        <Select v-model="info.type" placeholder="请选择类型...">
                            <Option :value="1">动画</Option>
                            <Option :value="2">图片</Option>
                        </Select>
                    </FormItem> -->
                    <FormItem label="状态:" prop="status">
                        <Select v-model="info.status" placeholder="请选择状态...">
                            <Option :value="1">上线</Option>
                            <Option :value="0">下线</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="描述:">
                        <Input v-model="info.describe" type="textarea" :rows="4" placeholder="请输入描述..."></Input>
                    </FormItem>
                </Form>
            </Modal>
        </div>
        <!-- 表格 -->
        <div class="layout-bootanimation2-table">
            <Table border :columns="columns1" :data="data1"></Table>
        </div>
        <!-- 分页 -->
        <div class="layout-bootvideo-page">
            <Page :total="total" :current="page" :page-size="pageSize" @on-change="changePage" show-elevator />
        </div>
        <!-- 修改 -->
        <div>
            <Modal v-model="modalEdit" title="修改" @on-cancel="modalEditBtn">
                <div slot="footer">
                    <Button @click="editOk" type="primary">确定</Button>
                </div>
                <Form :model="edit" label-position="right" :label-width="90" ref="edit" :rules="ruleValidate">
                    <FormItem label="视频名称:" prop="title">
                        <Input v-model="edit.title" placeholder="请输入视频名称..."></Input>
                    </FormItem>
                    <FormItem label="文件地址:">
                        <Button type="primary">下载应用</Button>
                        <Input v-model="edit.fileUrl" placeholder="请输入视频名称..." disabled></Input>
                    </FormItem>
                    <FormItem label="上传动画:">
                        <!-- <Input v-model="info.input2" placeholder="请输入文件地址..."></Input> -->
                        <Upload :action="$config.BaseURLfile + '/common/upload/file'" :on-success="handleSuccess1"
                            :with-credentials="true">
                            <Button icon="ios-cloud-upload-outline">上传动画</Button>
                        </Upload>
                    </FormItem>
                    <FormItem label="文件Md5值:">
                        <Input v-model="edit.fileMd5" placeholder="请输入文件Md5值..."></Input>
                    </FormItem>
                    <!-- <FormItem label="类型:">
                        <Select v-model="edit.type" placeholder="请选择类型...">
                            <Option :value="1">动画</Option>
                            <Option :value="2">图片</Option>
                        </Select>
                    </FormItem> -->
                    <FormItem label="状态:" prop="status">
                        <Select v-model="edit.status" placeholder="请选择状态...">
                            <Option :value="1">上线</Option>
                            <Option :value="0">下线</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="描述:">
                        <Input v-model="edit.describe" type="textarea" :rows="4" placeholder="请输入描述..."></Input>
                    </FormItem>
                </Form>
            </Modal>
        </div>
    </div>
</template>
<script>
export default {
  data () {
    return {
      search: {
        title: ''
      },
      // 添加
      info: {
        // status: 2,
      },
      modalAdd: false,
      // 修改
      edit: {
        type: '',
        status: ''
      },
      modalEdit: false,
      // 分页
      pageSize: 30,
      page: 1,
      total: 0,
      // 全局id
      id: [],
      columns1: [
        {
          type: 'index',
          width: 70,
          title: '序号',
          align: 'center'
        },
        {
          title: '动画ID',
          key: 'id',
          align: 'center'
        },
        {
          title: '动画名称',
          key: 'title',
          align: 'center'
        },
        // {
        //     title: '类型',
        //     key: 'Istype',
        //     align: 'center'
        // },
        {
          title: '状态',
          key: 'Isstatus',
          align: 'center'
        },
        {
          title: '描述',
          key: 'describe',
          align: 'center'
        },
        {
          title: '操作',
          width: 200,
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
      data1: [],
      ruleValidate: {
        title: [
          { required: true, message: '请输入动画名称...', trigger: 'blur'}

        ],
        // fileMd5: [
        //   { required: true, message: '请输入文件md5值...', trigger: 'blur' }
        // ],
        status: [
          { required: true, message: '请输入状态...', trigger: 'blur', type: 'number' }
        ]
      },
      editUploadUrl: ''// 保存图片
    }
  },
  methods: {
    // 添加上传成功
    handleSuccess (res, file) {
      console.log(res)
      this.info.fileUrl = res.data.url
    }, // 上传格式验证
    handleFormatError (file) {
      this.$Notice.warning({
        title: '文件格式不正确',
        desc: '文件格式' + '文件名' + '不正确，请选择JPG或PNG'
      })
    },
    // 上传文件大小验证
    handleMaxSize (file) {
      this.$Notice.warning({
        title: '超过文件大小限制',
        desc: '文件  ' + '文件名' + ' 太大，不超过2M.'
      })
    },
    // 修改上传成功
    handleSuccess1 (res, file) {
      console.log(res)
      this.editUploadUrl = res.data.url
    },
    // 表格数据
    getTableList () {
      let self = this
      self.$http(this.$config.BaseURL15 + '/common/bootanimation/list?page=' + self.page + '&count=' + self.pageSize + '&title=' + this.search.title).then(response => {
        if (response.data.errno == 10000) {
          console.log(response)
          self.data1 = response.data.data.list

          response.data.data.list.forEach(val => {
            if (val.status == 1) {
              val.Isstatus = '上线'
            } else if (val.status == 0) {
              val.Isstatus = '下线'
            }

            if (val.type == 1) {
              val.Istype = '动画'
            } else if (val.type == 2) {
              val.Istype = '图片'
            }
          })

          self.total = response.data.data.total
        }
      }, response => {

      })
    },
    query () {
      this.page = 1
      this.getTableList()
    },
    // 添加确定按钮
    addOk () {
      let self = this
      var isValid = true
      self.$refs['info'].validate(valid => {
        if (valid == false) {
          this.$Message.error('表单输入有误,请检查!')
          isValid = false
        }
      })
      if (isValid == false) {
        return
      }
      self.$http.post(this.$config.BaseURL15 + '/common/bootanimation/update', self.info).then(response => {
        if (response.data.errno == 10000) {
          this.info = {}
          this.getTableList()
          this.modalAdd = false
          this.$Message.success('添加成功！')
        }
      })
    },
    // 添加取消按钮
    addCancel () {
      this.modalAdd = false
    },
    // 修改
    modify (row) {
      console.log(row)
      this.editUploadUrl = ''
      row = JSON.parse(JSON.stringify(row))
      this.edit = row
      this.id = row.id
      this.modalEdit = true
    },
    // 修改确定按钮
    editOk () {
      let self = this
      this.edit.title += ''
      if (this.editUploadUrl != '') {
        self.edit.fileUrl = this.editUploadUrl
      }
      var isValid = true
      self.$refs['edit'].validate(valid => {
        if (valid == false) {
          this.$Message.error('表单输入有误,请检查!')
          isValid = false
        }
      })
      if (isValid == false) {
        return
      }
      self.$http.post(this.$config.BaseURL15 + '/common/bootanimation/update?id=' + self.id, self.edit).then(response => {
        if (response.data.errno == 10000) {
          self.edit = {}
          self.getTableList()
          this.modalEdit = false
          self.$Message.success('修改成功！')
        }
      }, response => { })
    },
    modalEditBtn () {
      this.getTableList()
      this.modalEdit = false
    },
    // 删除
    remove (index) {
      let self = this
      self.$http(this.$config.BaseURL15 + '/common/bootanimation/del?id=' + this.data1[index].id).then(response => {
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
  }
}
</script>
