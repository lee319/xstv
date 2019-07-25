<style>
  .layout-screensaver-add {
    float: right;
    margin-bottom: 10px;
  }

  .layout-screensaver-table {
    clear: both;
  }

  .layout-screensaver .ivu-poptip-confirm .ivu-poptip-body .ivu-icon {
    font-size: 16px;
    color: #ff9900;
    line-height: 18px;
    position: absolute;
    margin-left: -50px;
  }

  .span {
    font-size: 14px;
    margin: 15px;
    color: #495060;
    padding-bottom: 20px;
  }

  .ivu-table th,
  .ivu-table td {
    height: 40px;
  }
</style>
<template>
  <div class="layout-screensaver">
    <!-- 添加 -->
    <div class="layout-screensaver-add">
      <Button type="success" @click="modalAddBtn()">添加</Button>
      <Modal v-model="modalAdd" title="添加">
        <div slot="footer">
          <a @click="addCancel" class="span">取消</a>
          <Button @click="addOk" type="primary">确定</Button>
        </div>
        <Form :model="info" label-position="right" :label-width="130" ref="info" :rules="ruleValidate">
          <FormItem label="广告名称:" prop="title">
            <Input v-model="info.title" placeholder="请输入广告名称..."></Input>
          </FormItem>
          <FormItem label="图片地址:">
            <!-- <Input v-model="info.url"></Input> -->
            <Upload :action="$config.BaseURLfile + '/common/upload/file'" ref="upload" :on-success="handleSuccess"
              :format="['jpg','jpeg','png']" :max-size="2048" :on-format-error="handleFormatError"
              :on-exceeded-size="handleMaxSize" :with-credentials="true">
              <Button icon="ios-cloud-upload-outline">上传图片</Button>
            </Upload>
          </FormItem>
          <FormItem label="跳转地址:" prop="jump">
            <Input v-model="info.jump" placeholder="请输入跳转地址..." type="textarea" :rows="4"></Input>
          </FormItem>
          <!-- 1 启动 2 停用 -->
          <FormItem label="状态:" prop="status">
            <Select v-model="info.status" placeholder="请选择状态...">
              <Option :value="1">上线</Option>
              <Option :value="0">下线</Option>
            </Select>
          </FormItem>
          <FormItem label="排序:" prop="orderNum">
            <Input v-model="info.orderNum" placeholder="请输入排序..."></Input>
          </FormItem>
          <FormItem label="广告投放开始时间:" prop="startTime">
            <DatePicker type="date" placeholder="请选择广告投放开始时间..." style="width: 360px" v-model="info.IsstartTime">
            </DatePicker>
          </FormItem>
          <FormItem label="广告投放结束时间:" prop="endTime">
            <DatePicker type="date" placeholder="请选择广告投放结束时间..." style="width: 360px" v-model="info.IsendTime">
            </DatePicker>
          </FormItem>
        </Form>
      </Modal>
    </div>
    <!-- 表格 -->
    <div class="layout-screensaver-table">
      <Table border :columns="columns1" :data="data1"></Table>
    </div>
    <!-- 查看详情 -->
    <Modal v-model="modalInfo" title="查看详情" width="700">
      <div>
        <div style="padding:10px">
          <Form :model="news" label-position="right" inline>
            <Row>
              <Col span="8">
              <p>
                广告ID:{{news.id}}
              </p>
              </Col>
              <Col span="8">
              <p>
                展示顺序:{{news.orderNum}}
              </p>
              </Col>
              <Col span="8">
              <p>
                该记录修改时间:{{news.updateTime}}
              </p>
              </Col>
              <Col span="8">
              <p>
                开始投放时间:{{news.IsstartTime}}
              </p>
              </Col>

              <Col span="8">
              <p>
                结束投放时间:{{news.IsendTime}}
              </p>
              </Col>
              <Col span="24">
              <p>
                通用跳转参数:{{news.jump}}
              </p>
              </Col>
              <Col span="8">
              <p style="float: left;margin-top: 5px;">
                图片地址:
                <img :src="news.url" alt="" style="width:50px;height:50px;">
              </p>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
    </Modal>
    <!-- 修改 -->
    <Modal v-model="modalEdit" title="修改" @on-cancel="modalEditBtn">
      <div slot="footer">
        <Button @click="editOk" type="primary">确定</Button>
      </div>
      <Form :model="edit" label-position="right" :label-width="130" ref="edit" :rules="ruleValidate1">
        <FormItem label="广告名称:" prop="title">
          <Input v-model="edit.title" placeholder="请输入广告名称..."></Input>
        </FormItem>
        <FormItem label="图片地址:">
          <!-- <Input v-model="info.url"></Input> -->
          <Upload :action="$config.BaseURLfile + '/common/upload/file'" ref="upload1" :on-success="handleSuccess1"
            :format="['jpg','jpeg','png']" :max-size="2048" :on-format-error="handleFormatError"
            :on-exceeded-size="handleMaxSize" :with-credentials="true">
            <Button icon="ios-cloud-upload-outline">上传图片</Button>
          </Upload>
        </FormItem>
        <FormItem label="跳转地址:" prop="jump">
          <Input v-model="edit.jump" placeholder="请输入跳转地址..." type="textarea" :rows="4"></Input>
        </FormItem>
        <!-- 1 启动 2 停用 -->
        <FormItem label="状态:" prop="status">
          <Select v-model="edit.status" placeholder="请选择状态...">
            <Option :value="1">上线</Option>
            <Option :value="0">下线</Option>
          </Select>
        </FormItem>
        <FormItem label="排序:" prop="orderNum">
          <Input v-model="edit.orderNum" placeholder="请输入排序..."></Input>
        </FormItem>
        <FormItem label="广告投放开始时间:" prop="startTime">
          <DatePicker type="date" placeholder="请选择广告投放开始时间..." style="width: 360px" v-model="edit.IsstartTime">
          </DatePicker>
        </FormItem>
        <FormItem label="广告投放结束时间:" prop="endTime">
          <DatePicker type="date" placeholder="请选择广告投放结束时间..." style="width: 360px" v-model="edit.IsendTime">
          </DatePicker>
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
        // 保存查看详情数据
        news: {},
        modalInfo: false,
        // 添加
        info: {
        },
        modalAdd: false,
        // 修改
        edit: {
        },
        modalEdit: false,
        columns1: [
          {
            title: '序号',
            type: 'index',
            width: 70,
            align: 'center'
          },
          {
            title: '广告ID',
            key: 'id',
            align: 'center'
          },
          {
            title: '展示顺序',
            key: 'orderNum',
            align: 'center'
          },

          {
            title: '图片地址',
            key: 'url',
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('img', {
                  attrs: {
                    src: params.row.url
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
            title: '通用跳转参数',
            key: 'jump',
            align: 'center',
            width: 270,
            render: (h, params) => {
              return h('span', {
                style: {
                  diaplay: 'inline-block',
                  width: '100px',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }
              }, params.row.jump)
            }
          },
          {
            title: '状态',
            key: 'Isstatus',
            align: 'center'
          },
          {
            title: '开始投放时间',
            key: 'IsstartTime',
            align: 'center'
          },
          {
            title: '结束投放时间',
            key: 'IsendTime',
            align: 'center'
          },
          {
            title: '该记录修改时间',
            key: 'updateTime',
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
                    type: 'warning',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.info1(params.index)
                    }
                  }
                }, '查看详情'),
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
        // 全局
        id: [],
        // 保存图片url
        addUploadUrl: '',
        editUploadUrl: '',
        ruleValidate: {
          title: [
            { required: true, message: '请输入广告名称...', trigger: 'blur' }
          ]

        },
        ruleValidate1: {
          title: [
            { required: true, message: '请输入广告名称...', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
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
      // 表格数据
      getTableList() {
        let self = this
        self.$http(this.$config.BaseURL3 + '/common/screensaver/list').then(response => {
          if (response.data.errno == 10000) {
            console.log(response)
            self.data1 = response.data.data.list

            response.data.data.list.forEach(val => {
              console.log(val.startTime)
              val.IsstartTime = moment(val.startTime * 1000).format(
                'YYYY-MM-DD'
              )
              // console.log(val.startTime1)
              val.IsendTime = moment(val.endTime * 1000).format(
                'YYYY-MM-DD'
              )
              val.updateTime = moment(val.updateTime * 1000).format(
                'YYYY-MM-DD'
              )

              if (val.status == 1) {
                val.Isstatus = '上线'
              } else if (val.status == 0) {
                val.Isstatus = '下线'
              }
            })
          }
        }, response => { })
      },
      // 查看详情
      info1(index) {
        this.modalInfo = true
        this.news = this.data1[index]
        console.log(this.news)
        // 时间转换
        this.news.IsstartTime = moment(this.news.startTime * 1000).format(
          'YYYY-MM-DD'
        )
        this.news.IsendTime = moment(this.news.endTime * 1000).format(
          'YYYY-MM-DD'
        )
      },
      modalAddBtn() {
        this.addUploadUrl = ''
        this.$refs.upload.clearFiles()
        this.modalAdd = true
      },
      // 添加确定按钮
      addOk() {
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
        // 时间转换
        self.info.startTime = moment(self.info.IsstartTime).format(
          'X'
        )
        self.info.endTime = moment(self.info.IsendTime).format(
          'X'
        )
        self.info.url = this.addUploadUrl

        self.$http.post(this.$config.BaseURL3 + '/common/screensaver/update', self.info).then(response => {
          console.log(response)
          if (response.data.errno == 10000) {
            this.info = {}
            this.modalAdd = false
            this.getTableList()
            this.$Message.success('添加成功')
          }
        })
      },
      // 添加取消按钮
      addCancel() {
        this.modalAdd = false
      },
      // 修改
      modify(row) {
        console.log(row)
        this.editUploadUrl = ''
        row = JSON.parse(JSON.stringify(row))
        this.modalEdit = true
        this.edit = row
        this.id = row.id
      },
      // 修改确定按钮
      editOk() {
        let self = this
        self.edit.orderNum = self.edit.orderNum + ''
        self.edit.startTime = self.edit.startTime + ''
        self.edit.endTime = self.edit.endTime + ''

        console.log(self.edit.url)
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
        // 时间转换
        self.edit.startTime = moment(self.edit.IstartTime).format(
          'X'
        )
        self.edit.endTime = moment(self.edit.IsendTime).format(
          'X'
        )
        if (this.editUploadUrl != '') {
          self.edit.url = this.editUploadUrl
        }
        console.log(self.edit.url)
        self.$http.post(this.$config.BaseURL3 + '/common/screensaver/update?id=' + this.id, self.edit).then(response => {
          console.log(response)
          if (response.data.errno == 10000) {
            this.edit = {}
            this.modalEdit = false
            this.getTableList()
            this.$Message.success('修改成功')
          }
        })
      },
      modalEditBtn() {
        this.modalEdit = false
        this.getTableList()
      },
      // 删除
      remove(index) {
        let self = this
        self.$http(this.$config.BaseURL3 + '/common/screensaver/del?id=' + self.data1[index].id).then(response => {
          if (response.data.errno == 10000) {
            this.$Message.success('删除成功')
            this.getTableList();
          }
        })
      }
    },
    mounted() {
      this.getTableList()
    }
  }
</script>