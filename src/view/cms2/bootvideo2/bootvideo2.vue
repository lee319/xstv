<style>
    .layout-bootvideo2-search {
        float: left;
    }

    .layout-bootvideo2-add {
        float: right;
    }

    .layout-bootvideo2-table {
        clear: both;
    }

    .span {
        font-size: 14px;
        margin: 15px;
        color: #495060;
        padding-bottom: 20px;
    }

    .layout-bootvideo2-page {
        float: right;
        margin-top: 10px;
    }

    .layout-bootvideo2 .ivu-poptip-confirm .ivu-poptip-body .ivu-icon {
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
    <div class="layout-bootvideo2">
        <!-- 搜索 -->
        <div class="layout-bootvideo2-search">
            <Form :model="search" inline>
                <FormItem label="视频名称:" :label-width="70">
                    <Input v-model="search.title" style="width:200px;" placeholder="请输入视频名称..."></Input>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="query">搜索</Button>
                </FormItem>
            </Form>
        </div>
        <!-- 添加 -->
        <div class="layout-bootvideo2-add">
            <Button type="success" @click="modalAdd = true;addUploadUrl=''">添加</Button>
            <Modal v-model="modalAdd" title="添加">
                <div slot="footer">
                    <a @click="addCancel" class="span">取消</a>
                    <Button @click="addOk" type="primary">确定</Button>
                </div>
                <Form :model="info" label-position="right" :label-width="100" ref="info" :rules="ruleValidate">
                    <FormItem label="视频名称:" prop="title">
                        <Input v-model="info.title" placeholder="请输入视频名称..."></Input>
                    </FormItem>

                    <FormItem label="上传视频:">
                        <Upload :action="$config.BaseURLfile + '/common/upload/file'" ref="upload"
                            :on-success="handleSuccess1" :with-credentials="true">
                            <Button icon="ios-cloud-upload-outline">上传视频地址</Button>
                        </Upload>
                    </FormItem>
                    <FormItem label="视频格式:" prop="videoFormat">
                        <Input v-model="info.videoFormat" placeholder="请输入视频格式..."></Input>
                    </FormItem>
                    <FormItem label="文件md5值:">
                        <Input v-model="info.videoMd5" placeholder="请输入视频文件Md5值..."></Input>
                    </FormItem>
                    <!-- 1 启动 2 停用 -->
                    <FormItem label="状态:" prop="status">
                        <Select v-model="info.status" placeholder="请选择状态...">
                            <Option :value="1">启用</Option>
                            <Option :value="0">禁用</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="描述:">
                        <Input v-model="info.describe" type="textarea" :rows="4" placeholder="请输入描述..."></Input>
                    </FormItem>
                </Form>
            </Modal>
        </div>
        <div style="clear:both;"></div>
        <!-- 表格 -->
        <div class="layout-bootvideo2-table">
            <Table border :columns="columns1" :data="data1"></Table>
        </div>
        <div class="layout-bootvideo2-page">
            <Page :total="total" :current="page" :page-size="pageSize" @on-change="changePage" show-elevator />
        </div>
        <!-- 修改 -->
        <div>
            <Modal v-model="modalEdit" title="修改">
                <div slot="footer">
                    <a @click="modalEdit=false" class="span">取消</a>
                    <Button @click="editOk" type="primary">确定</Button>
                </div>
                <Form :model="edit" label-position="right" :label-width="100" ref="edit" :rules="ruleValidate">
                    <FormItem label="视频名称:" prop="title">
                        <Input v-model="edit.title" placeholder="请输入视频名称..."></Input>
                    </FormItem>
                    <FormItem label="文件地址:">
                        <Button type="primary">下载应用</Button>
                        <Input v-model="edit.videoUrl" disabled></Input>
                    </FormItem>
                    <FormItem label="视频地址:">
                        <!-- <Input v-model="edit.videoUrl" placeholder="请输入视频地址..."></Input> -->
                        <Upload :action="$config.BaseURLfile + '/common/upload/file'" ref="upload"
                            :on-success="handleSuccess" :with-credentials="true">
                            <Button icon="ios-cloud-upload-outline">上传视频地址</Button>
                        </Upload>
                    </FormItem>
                    <FormItem label="视频格式:" prop="videoFormat">
                        <Input v-model="edit.videoFormat" placeholder="请输入视频格式..."></Input>
                    </FormItem>
                    <FormItem label="文件Md5值:">
                        <Input v-model="edit.videoMd5" placeholder="请输入视频文件Md5值..."></Input>
                    </FormItem>
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
var moment = require('moment')
export default {
  data () {
    return {
      search: {
        title: ''
      },
      // 添加
      info: {},
      modalAdd: false,
      // 修改
      edit: {},
      modalEdit: false,
      addUploadUrl: '',
      editUploadUrl: '', // 修改保存图片
      // 全局
      id: '',
      // 分页
      pageSize: 30,
      page: 1,
      total: 0, // 分页

      columns1: [
        {
          type: 'index',
          width: 70,
          title: '序号',
          align: 'center'
        },
        {
          title: '视频ID',
          key: 'id',
          align: 'center'
        },
        {
          title: '视频名称',
          key: 'title',
          align: 'center'
        },
        {
          title: '视频格式',
          key: 'videoFormat',
          align: 'center'
        },
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
      // 验证
      ruleValidate: {
        title: [
          { required: true, message: '请输入视频名称...', trigger: 'blur' }
        ],
        videoFormat: [
          { required: true, message: '请输入视频格式...', trigger: 'blur' }
        ],
        // videoMd5: [
        //   { required: true, message: '请输入视频文件Md5值...', trigger: 'blur' }
        // ],
        status: [
          { required: true, message: '请输入状态...', trigger: 'blur', type: 'number' }
        ]
      }
    }
  },
  methods: {
    // 修改上传成功
    handleSuccess (res, file) {
      console.log(res)
      this.editUploadUrl = res.data.url
      console.log(this.editUploadUrl)
    },
    // 添加上传成功
    handleSuccess1 (res, file) {
      console.log(res)
      this.addUploadUrl = res.data.url
      console.log(this.addUploadUrl)
    },
    // 表格数据
    getTableList () {
      let self = this
      self.$http(this.$config.BaseURL15 + '/common/bootvideo/list?page=' + self.page + '&count=' + self.pageSize + '&title=' + this.search.title).then(response => {
        if (response.data.errno == 10000) {
          console.log(response)
          self.data1 = response.data.data.list
          // 分页
          self.total = response.data.data.total

          // 时间转换
          response.data.data.list.forEach(val => {
            val.IsstartTime = moment(val.startTime * 1000).format(
              'YYYY-MM-DD'
            )
            val.IsendTime = moment(val.endTime * 1000).format(
              'YYYY-MM-DD'
            )

            if (val.status == 1) {
              val.Isstatus = '上线'
            } else if (val.status == 0) {
              val.Isstatus = '下线'
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
    // 添加
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
      self.info.videoUrl = this.addUploadUrl
      self.$http.post(this.$config.BaseURL15 + '/common/bootvideo/update', self.info).then(response => {
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
      this.info = {}
      this.modalAdd = false
    },
    // 修改
    modify (row) {
      this.editUploadUrl = ''
      row = JSON.parse(JSON.stringify(row))
      this.edit = row
      this.id = row.id
      console.log(this.id)
      this.modalEdit = true
    },
    // 修改确定
    editOk () {
      let self = this
      if (this.editUploadUrl != '') {
        self.edit.videoUrl = this.editUploadUrl
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
      self.$http.post(this.$config.BaseURL15 + '/common/bootvideo/update?id=' + self.id, self.edit).then(response => {
        if (response.data.errno == 10000) {
          self.edit = {}
          self.getTableList()
          this.modalEdit = false
          self.$Message.success('修改成功！')
        }
      })
    },
    // 删除
    remove (index) {
      let self = this
      self.$http(this.$config.BaseURL15 + '/common/bootvideo/del?id=' + this.data1[index].id).then(response => {
        if (response.data.errno == 10000) {
          this.$Message.success('删除成功')
          this.getTableList()
        }
      })
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
