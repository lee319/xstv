<style>
    .layout-scene-search{
        float: left;
    }
    .layout-scene-add{
        float: right;
    }
    .layout-scene-page{
        float: right;
        margin-top:10px;
    }
    .span {
        font-size: 14px;
        margin: 15px;
        color: #495060;
        padding-bottom: 20px;
    }
    .layout-scene .ivu-poptip-confirm .ivu-poptip-body .ivu-icon {
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
    <div class="layout-scene">
        <!-- 搜索 -->
        <div class="layout-scene-search">
            <Form :model="sceneSearch" inline>
                <FormItem label="场景名称" :label-width="65">
                    <Input v-model="sceneSearch.name" placeholder="请输入场景名称..." style="width:200px;"></Input>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="query">搜索</Button>
                </FormItem>
            </Form>
        </div>
        <!-- 添加 -->
        <div class="layout-scene-add">
            <Button type="success" @click="modalSceneAdd = true">添加</Button>
            <Modal v-model="modalSceneAdd" title="添加场景">
                <div slot="footer">
                    <a @click="addCancel" class="span">取消</a>
                    <Button @click="okSceneAdd" type="primary">确定</Button>
                </div>
                <Form :model="sceneInfo" label-position="right" :label-width="100">
                    <FormItem label="场景名称:">
                        <Input v-model="sceneInfo.name" placeholder="请输入场景名称..."></Input>
                    </FormItem>
                    <FormItem label="描述:">
                        <Input v-model="sceneInfo.description" type="textarea" :rows="4" placeholder="请输入描述..."></Input>
                    </FormItem>
                </Form>
            </Modal>
        </div>
        <!-- 修改 -->
        <div class="layout-scene-edit">
            <Modal v-model="modalSceneEdit" title="修改场景">
                <div slot="footer">
                    <a @click="SceneEditBtn" class="span">取消</a>
                    <Button @click="okSceneEdit" type="primary">确定</Button>
                </div>
                <Form :model="sceneEdit" label-position="right" :label-width="100">
                    <FormItem label="场景名称:">
                        <Input v-model="sceneEdit.name" placeholder="请输入场景名称..."></Input>
                    </FormItem>
                    <FormItem label="描述:">
                        <Input v-model="sceneEdit.description" type="textarea" :rows="4" placeholder="请输入描述..."></Input>
                    </FormItem>
                </Form>
            </Modal>
        </div>
        <div style="clear:both"></div>
        <!-- 表格 -->
        <div class="layout-scene-table">
            <Table border :columns="columns1" :data="data1"></Table>
        </div>
        <!--分页 -->
        <div class="layout-scene-page">
            <Page :total="total" :current="page" :page-size="pageSize" @on-change="changePage" show-elevator />
        </div>
        <!-- 场景内容 -->
        <Modal v-model="modalContent" title="场景内容" :width="1100">
            <div style="float:left;">
                <Form :model="news" :label-width="70">
                    <FormItem label="场景名称:">
                        <Input v-model="news.name" disabled style="width:200px;"></Input>
                    </FormItem>
                </Form>
            </div>
            <div style="float:right;">
                <Button type="success" @click="modalContentAddBtn()">添加</Button>
                <Modal v-model="modalContentAdd" title="添加场景内容">
                    <div slot="footer">
                        <a @click="contentAddCancel" class="span">取消</a>
                        <Button @click="okContentAdd" type="primary">确定</Button>
                    </div>
                    <Form :model="ContentInfo" label-position="right" :label-width="100">
                        <FormItem label="场景内容:">
                            <Input v-model="ContentInfo.name" placeholder="请输入场景内容..."></Input>
                        </FormItem>
                        <FormItem label="内容图片:">
                            <Upload :action="$config.BaseURLfile + '/common/upload/file'" ref="upload" :format="['jpg','jpeg','png']"
                                :on-success="handleSuccess" :on-format-error="handleFormatError" :with-credentials="true">
                                <Button icon="ios-cloud-upload-outline">上传图片</Button>
                            </Upload>
                        </FormItem>
                        <FormItem label="场景模板:">
                            <Select v-model="ContentInfo.customTemplateId">
                                <Option v-for="item in cityList" :value="item.id" :key="item.id">{{ item.title }}</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="场景类型:">
                                <Select v-model="ContentInfo.sceneTypeId">
                                    <Option v-for="item in cityList1" :value="item.sceneTypeId" :key="item.sceneTypeId">{{ item.sceneTypeName }}</Option>
                                </Select>
                            </FormItem>
                        <FormItem label="排序:">
                            <Input v-model="ContentInfo.sortId" placeholder="请输入场景内容..."></Input>
                        </FormItem>
                    </Form>
                </Modal>
            </div>
            <div style="clear:both;"></div>
            <Table border :columns="columns2" :data="data2"></Table>
        </Modal>
        <!-- 内容修改 -->
        <Modal v-model="modalContentdit" title="修改场景内容">
            <div slot="footer">
                <a @click="modalContentditBtn" class="span">取消</a>
                <Button @click="okContentEdit" type="primary">确定</Button>
            </div>
            <Form :model="ContentEdit" label-position="right" :label-width="100">
                <FormItem label="场景内容:">
                    <Input v-model="ContentEdit.name" placeholder="请输入场景内容..."></Input>
                </FormItem>
                <FormItem label="内容图片:">
                    <Upload :action="$config.BaseURLfile + '/common/upload/file'" ref="upload1" :on-success="handleSuccess1" :format="['jpg','jpeg','png']"  :on-format-error="handleFormatError"
                        :with-credentials="true">
                        <Button icon="ios-cloud-upload-outline">上传图片</Button>
                    </Upload>
                </FormItem>
                <FormItem label="场景模板:">
                    <Select v-model="ContentEdit.customTemplateId">
                        <Option v-for="item in cityList" :value="item.id" :key="item.id">{{ item.title }}</Option>
                    </Select>
                </FormItem>
                <FormItem label="场景类型:">
                        <Select v-model="ContentEdit.sceneTypeId">
                            <Option v-for="item in cityList1" :value="item.sceneTypeId" :key="item.sceneTypeId">{{ item.sceneTypeName }}</Option>
                        </Select>
                    </FormItem>
                <FormItem label="排序:">
                    <Input v-model="ContentEdit.sortId" placeholder="请输入场景内容..."></Input>
                </FormItem>
            </Form>
        </Modal>
    </div>
</template>
<script>
export default {
  data () {
    return {
      sceneSearch: {
        name: ''
      }, // 搜索
      sceneId: '', // 一整行id
      contnetId: '',
      sceneInfo: {},
      modalSceneAdd: false, // 添加
      sceneEdit: {},
      modalSceneEdit: false, // 修改
      news: {}, //
      modalContent: false, // 场景内容
      ContentInfo: {},
      addUploadUrl: '',
      editUploadUrl: '', // 保存图片
      modalContentAdd: false, // 场景内容添加
      cityList: [], // 场景模板
      ContentEdit: {},
      modalContentdit: false,
      cityList1: [], // 场景类型
      total: 0,
      page: 1,
      pageSize: 30,
      columns1: [
        {
          title: 'ID',
          key: 'id',
          align: 'center'
        },
        {
          title: '场景名称',
          key: 'name',
          align: 'center'
        },
        {
          title: '创建时间',
          key: 'addTime',
          align: 'center'
        },
        {
          title: '描述',
          key: 'description',
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
                    this.sceneContent(params.row)
                  }
                }
              }, '场景内容'),
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
      columns2: [
        {
          title: 'ID',
          key: 'id',
          align: 'center'
        },
        {
          title: '场景类型',
          key: 'sceneTypeName',
          align: 'center'
        },
        {
          title: '场景内容',
          key: 'name',
          align: 'center'
        },
        {
          title: '内容图片',
          key: 'pictureUrl',
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('img', {
                attrs: {
                  src: params.row.pictureUrl
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
          title: '排序',
          key: 'sortId',
          align: 'center'
        },
        {
          title: '场景模板',
          key: 'customTemplateTitle',
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
                    this.modifyContent(params.row)
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
                      this.remove1(params.row)
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
      data2: []
    }
  },
  methods: {
    // 添加上传
    handleSuccess (res, file) {
      console.log(res)
      this.addUploadUrl = res.data.url
      console.log(this.addUploadUrl)
    },
    // 上传格式验证
    handleFormatError (file) {
      this.$Notice.warning({
        title: '文件格式不正确',
        desc: '文件格式' + '文件名' + '不正确，请选择JPG或PNG'
      })
    },
    // 修改上传成功
    handleSuccess1 (res, file) {
      console.log(res)
      this.editUploadUrl = res.data.url
      console.log(this.editUploadUrl)
    },
    // 场景列表
    getTableList () {
      this.$http(this.$config.BaseURL16 + '/scene/scene/list?name=' + this.sceneSearch.name + '&page=' + this.page + '&pageSize=' + this.pageSize).then(response => {
        if (response.data.errno == 10000) {
          console.log(response)
          this.data1 = response.data.data.list
          this.total = response.data.data.total
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
    // 场景添加
    okSceneAdd () {
      this.$http.post(this.$config.BaseURL16 + '/scene/scene/save', this.sceneInfo).then(response => {
        if (response.data.errno == 10000) {
          this.sceneInfo = {}
          this.getTableList()
          this.modalSceneAdd = false
          this.$Message.success('添加成功！')
        }
      })
    },
    addCancel () {
      this.sceneInfo = {}
      this.modalSceneAdd = false
    },
    modify (row) {
      console.log(row)
      this.sceneEdit = row
      this.modalSceneEdit = true
    },
    // 修改
    okSceneEdit () {
      this.$http.post(this.$config.BaseURL16 + '/scene/scene/save', this.sceneEdit).then(response => {
        if (response.data.errno == 10000) {
          this.getTableList()
          this.modalSceneEdit = false
          this.$Message.success('修改成功！')
        }
      })
    },
    // SceneEditBtn
    SceneEditBtn () {
      this.modalSceneEdit = false
      this.getTableList()
    },
    remove (row) {
      this.$http.get(this.$config.BaseURL16 + '/scene/scene/delete?id=' + row.id).then(response => {
        if (response.data.errno == 10000) {
          this.getTableList()
          this.$Message.success('删除成功！')
        }
      })
    },
    // 内容场景
    sceneContent (row) {
      console.log(row)
      this.news = row
      this.sceneId = row.id
      this.getContentList()
      this.getSelect()
      this.getSelect1()
      this.modalContent = true
    },
    // 场景内容列表
    getContentList () {
      this.$http.get(this.$config.BaseURL16 + '/scene/content/list?sceneId=' + this.sceneId).then(response => {
        if (response.data.errno == 10000) {
          this.data2 = response.data.data.list
        }
      })
    },
    getSelect () {
      this.$http.get(this.$config.BaseURL16 + '/custompromotion/template/list').then(response => {
        if (response.data.errno == 10000) {
          this.cityList = response.data.data.list
        }
      })
    },
    getSelect1 () {
      this.$http.get(this.$config.BaseURL16 + '/scene/type/list').then(response => {
        if (response.data.errno == 10000) {
          this.cityList1 = response.data.data.list
        }
      })
    },
    // 内容维护添加弹框
    modalContentAddBtn () {
      this.addUploadUrl = ''
      this.modalContentAdd = true
      this.$refs.upload.clearFiles()
    },
    // 内容添加按钮
    okContentAdd () {
      this.ContentInfo.pictureUrl = this.addUploadUrl
      this.ContentInfo.sceneId = this.sceneId
      this.$http.post(this.$config.BaseURL16 + '/scene/content/save', this.ContentInfo).then(response => {
        if (response.data.errno == 10000) {
          this.ContentInfo = {}
          this.getContentList()
          this.modalContentAdd = false
          this.$Message.success('添加成功！')
        }
      })
    },
    // 内容添加取消按钮
    contentAddCancel () {
      this.ContentInfo = {}
      this.modalContentAdd = false
    },
    // 内容修改
    modifyContent (row) {
      this.editUploadUrl = ''
      row = JSON.parse(JSON.stringify(row))
      this.ContentEdit = row
      this.contnetId = row.id
      this.modalContentdit = true
    },
    // 内容维护修改
    okContentEdit () {
      if (this.editUploadUrl != '') {
        this.ContentEdit.pictureUrl = this.editUploadUrl
      }
      this.$http.post(this.$config.BaseURL16 + '/scene/content/save', this.ContentEdit).then(response => {
        if (response.data.errno == 10000) {
          this.getContentList()
          this.modalContentdit = false
          this.$Message.success('修改成功！')
        }
      })
    },
    modalContentditBtn () {
      this.modalContentdit = false
      this.getContentList()
    },
    // 内容维护删除
    remove1 (row) {
      this.$http.get(this.$config.BaseURL16 + '/scene/content/delete?id=' + row.id).then(response => {
        if (response.data.errno == 10000) {
          this.getContentList()
          this.$Message.success('删除成功！')
        }
      })
    }
  },
  mounted () {
    this.getTableList()
  }
}
</script>
