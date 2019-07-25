<style>
  .span {
    font-size: 14px;
    margin: 15px;
    color: #495060;
    padding-bottom: 20px;
  }
</style>
<template>
  <div class="layout-display">
    <div class="layout-display-search">
      <Form :model="search" inline>
        <FormItem label="配置名称:" :label-width="70">
          <Input v-model="search.title" style="width:200px;" placeholder="请输入配置名称..."></Input>
        </FormItem>
        <FormItem label="配置方式" :label-width="70">
          <Select v-model="search.type" style="width:200px" placeholder="请选择配置方式...">
            <Option value="">全部</Option>
            <Option :value="1">mac</Option>
            <Option :value="2">型号+渠道</Option>
            <Option :value="3">型号</Option>
            <Option :value="4">渠道</Option>
          </Select>
        </FormItem>
        <FormItem label="渠道:" :label-width="60">
          <Select v-model="search.model" style="width:200px" placeholder="请选择渠道...">
            <Option value="">全部</Option>
            <Option v-for="item in cityList" :value="item.channelId" :key="item.channelId">{{ item.channelName }}
            </Option>
          </Select>
        </FormItem>
        <FormItem label="机型:" :label-width="60">
          <Select v-model="search.channelId" style="width:200px" placeholder="请选择机型...">
            <Option value="">全部</Option>
            <Option v-for="item in cityList1" :value="item._id" :key="item._id">{{ item.insideName }}
            </Option>
          </Select>
        </FormItem>
        <FormItem label="mac:" :label-width="60">
          <Input v-model="search.mac" placeholder="请输入mac..."></Input>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="query">搜索</Button>
        </FormItem>
        <FormItem>
          <Button type="success" @click="modalAdd= true;">添加</Button>
        </FormItem>
      </Form>
    </div>
    <!-- 添加 -->
    <div class="layout-display-add">
      <Modal v-model="modalAdd" title="添加">
        <div slot="footer">
          <a @click="addCancel" class="span">取消</a>
          <Button @click="addOk" type="primary">确定</Button>
        </div>
        <Form :model="info" label-position="right" :label-width="100">
          <FormItem label="配置名称:">
            <Input v-model="info.title" placeholder="请输入配置名称..."></Input>
          </FormItem>
          <FormItem label="配置方式:">
            <Select v-model="info.type" placeholder="请选择配置方式...">
              <Option :value="1">mac</Option>
              <Option :value="2">型号+渠道</Option>
              <Option :value="3">型号</Option>
              <Option :value="4">渠道</Option>
            </Select>
          </FormItem>
          <FormItem label="配置mac:" v-if="info.type ==1 ">
            <Input v-model="info.mac" placeholder="请输入配置mac..." type="textarea" :rows="4"></Input>
          </FormItem>
          <FormItem label="配置渠道:" v-if="info.type ==2 || info.type == 4">
            <CheckboxGroup v-model="info.channelId">
              <Checkbox v-for="item in cityList" :label="item.channelId">{{item.channelName}}</Checkbox>
            </CheckboxGroup>
          </FormItem>
          <FormItem label="配置型号:" v-if="info.type == 3 || info.type == 2">
            <CheckboxGroup v-model="info.modal">
              <div v-for="item in CheckboxList">
                <p>{{item.customerName}}:</p>
                <Checkbox v-for="item1 in item.insideModelInfo" :label="item1._id" :value="item1.insideName">{{item1.insideName}}
                </Checkbox>
              </div>
            </CheckboxGroup>
          </FormItem>
          <FormItem label="描述:">
            <Input v-model="info.describe" placeholder="请输入描述..." type="textarea" :rows="4"></Input>
          </FormItem>
        </Form>
      </Modal>
    </div>
    <!-- 修改 -->
    <div class="layout-display-edit">
      <Modal v-model="modalEdit" title="添加">
        <div slot="footer">
          <a @click="editCancel" class="span">取消</a>
          <Button @click="editOk" type="primary">确定</Button>
        </div>
        <Form :model="edit" label-position="right" :label-width="100">
          <FormItem label="配置名称:">
            <Input v-model="edit.title" placeholder="请输入配置名称..."></Input>
          </FormItem>
          <FormItem label="配置方式:">
            <Input v-model="edit.is_type" placeholder="请输入配置名称..." disabled></Input>
          </FormItem>
          <FormItem label="配置mac:" v-if="edit.type ==1 ">
            <Input v-model="edit.mac" placeholder="请输入配置mac..." type="textarea" :rows="4"></Input>
          </FormItem>
          <FormItem label="配置渠道:" v-if="edit.type ==2 || edit.type == 4">
            <Select v-model="edit.channelId">
              <Option v-for="item in cityList" :value="item.channelId" :key="item.channelId">{{ item.channelName }}
              </Option>
            </Select>
          </FormItem>
          <FormItem label="配置型号:" v-if="edit.type == 3 || edit.type == 2">
            <Select v-model="edit.model">
              <Option v-for="item in cityList1" :value="item._id" :key="item._id">{{ item.insideName }}
              </Option>
            </Select>
          </FormItem>
          <FormItem label="描述:">
            <Input v-model="edit.describe" placeholder="请输入描述..." type="textarea" :rows="4"></Input>
          </FormItem>
        </Form>
      </Modal>
    </div>
    <!-- 配置 -->
    <div class="layout-display-config">
      <Modal v-model="modalConfig" title="配置管理" :width="1000">
        
        <Form :model="managConfig" label-position="right" :label-width="100">
          <FormItem label="配置名称:">
            <Input v-model="managConfig.title" disabled></Input>
          </FormItem>
          <FormItem label="开机动画:">
            <div style="float:left;">
              <Input v-model="managConfig.animationName" placeholder="请选择开机动画..." style="width:510px;"></Input>
            </div>
            <Button type="primary" @click="modalChange = true;getProductList()">修改</Button>
          </FormItem>
          <FormItem label="开机视频:">
            <div style="float:left;">
              <Input v-model="managConfig.videoName" placeholder="请选择开机视频..." style="width:510px;"></Input>
            </div>
            <Button type="primary" @click="modalChangeVideo = true;getProductListVideo()">修改</Button>
          </FormItem>
        </Form>
      </Modal>
    </div>
    <!-- 开机动画 -->
    <Modal v-model="modalChange" title="开机动画" width="600" @on-ok="okProgramOne">
      <Table border :columns="columns3" :data="data3" :highlight-row="true" @on-row-click="programOne"></Table>
    </Modal>
    <!-- 开机视频-->
    <Modal v-model="modalChangeVideo" title="开机视频" width="800" @on-ok="okProgramOneVideo">
      <Table border :columns="columns4" :data="data4" :highlight-row="true" @on-row-click="programOneVideo"></Table>
    </Modal>
    <div class="layout-display-table">
      <Table border :columns="columns1" :data="data1"></Table>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        search: {
          title: '',
          type: '',
          model: '',
          channelId: '',
          mac: ''
        },//搜索
        CheckboxList: [],
        info: {
          type: 1
        },
        modalAdd: false,//添加
        edit: {},
        modalEdit: false,//修改

        managConfig: {},
        modalConfig: false,//配置
        modalChange: false,//开机动画
        programOneRow: {},
        columns3: [{
          title: '序号',
          type: 'index',
          width: 70,
          align: 'center'
        },
        {
          title: '开机动画名称',
          key: 'title',
          align: 'center'
        },
        {
          title: '类型',
          key: 'is_type',
          align: 'center'
        }
        ],
        data3: [],

        programOneRowVideo: {},
        modalChangeVideo: false,//开机视频 
        columns4: [{
          title: '序号',
          type: 'index',
          width: 70,
          align: 'center'
        },
        {
          title: '开机视频名称',
          key: 'title',
          align: 'center'
        },
        {
          title: '视频地址',
          key: 'videoUrl',
          align: 'center',
          render: (h, params) => {
            return h('a', {
              attrs: {
                href: params.row.videoUrl,
                target: '_black'
              }
            }, '下载')
          }
        },
        {
          title: '视频格式',
          key: 'videoFormat',
          align: 'center'
        }
        ],
        data4: [],
        cityList: [],
        cityList1: [],
        columns1: [
          {
            title: '配置ID',
            key: 'id',
            align: 'center'
          },
          {
            title: '配置名称',
            key: 'title',
            align: 'center'
          },
          {
            title: '配置方式',
            key: 'is_type',
            align: 'center'
          },
          {
            title: '配置参数',
            key: 'value',
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
                      this.configure(params.row)
                    }
                  }
                }, '配置'),
                h(
                  "Poptip", {
                    props: {
                      confirm: true,
                      title: "确定要删除吗！",
                      type: "error",
                      size: "small",
                      width: "150"
                    },
                    on: {
                      "on-ok": () => {
                        this.remove(params.row);
                      }
                    }
                  }, [
                    h(
                      "Button", {
                        props: {
                          type: "error",
                          size: "small",
                        }
                      },
                      "删除"
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
      // 列表
      getTableList() {
        if (this.search.type == undefined) {
          this.search.type = ''
        }

        if (this.search.model == undefined) {
          this.search.model = ''
        }

        if (this.search.channelId == undefined) {
          this.search.channelId = ''
        }
        this.$http.get(this.$config.BaseURL15 + '/common/display/list?title=' + this.search.title + '&type=' + this.search.type + '&model=' + this.search.model + '&channelId=' + this.search.channelId + '&mac=' + this.search.mac).then(response => {
          if (response.data.errno == 10000) {
            this.data1 = response.data.data.list;

            response.data.data.list.forEach(val => {
              if (val.type == 1) {
                val.is_type = 'mac'
              } else if (val.type == 2) {
                val.is_type = '型号+渠道'
              } else if (val.type == 3) {
                val.is_type = '型号'
              } else if (val.type == 4) {
                val.is_type = '渠道'
              }
            });
          }
        })
      },
      // 渠道
      getSelectList() {
        this.$http.get(this.$config.BaseURL2 + '/tv/channel/list').then(response => {
          console.log(response)
          if (response.data.errno == 10000) {
            this.cityList = response.data.data.list;
          }
        })
      },
      // 机型
      getCustomerList() {
        this.$http.get(this.$config.BaseURL2 + '/tv/insidemodel/list').then(response => {
          console.log(response)
          if (response.data.errno == 10000) {
            this.cityList1 = response.data.data.list;
          }
        })
      },
      //搜索
      query() {
        this.getTableList();
      },
      // 添加确定按钮
      addOk() {
        this.$http.post(this.$config.BaseURL15 + '/common/display/update', this.info).then(response => {
          if (response.data.errno == 10000) {
            this.info = {};
            this.modalAdd = false;
            this.getTableList();
            this.$Message.success("添加成功！");
          }
        })
      },
      //添加取消按钮
      addCancel() {
        this.info = {};
        this.modalAdd = false;
      },
      //修改
      modify(row) {
        console.log(row)
        if (row.type == 1) {
          row.is_type = "mac"
        } else if (row.type == 2) {
          row.is_type = "型号+渠道"
        } else if (row.type == 3) {
          row.is_type = "型号"
        } else if (row.type == 4) {
          row.is_type = "渠道"
        }
        this.getSelectList();//渠道
        this.getCustomerList();//机型
        this.edit = row;
        this.modalEdit = true;
      },
      //修改确定按钮
      editOk() { },
      editCancel() { },
      //删除
      remove(row) {
        this.$http.get(this.$config.BaseURL15 + '/common/display/del?id=' + row.id).then(response => {
          if (response.data.errno == 10000) {
            this.getTableList();
            this.$Message.success("删除成功！")
          }
        })
      },
      //配置弹框
      configure(row) {
        this.managConfig = row;
        this.modalConfig = true;
      },
      //修改确定按钮
      okProgramOne() {
        this.managConfig.animationName = this.programOneRow.title;
        this.managConfig.animationId = this.programOneRow.id;
      },
      programOne(row, index) {
        console.log(row);
        this.programOneRow = row;
      },
      // 开机动画列表
      getProductList() {
        this.$http(this.$config.BaseURL15 + "/common/bootanimation/list").then(response => {
          if (response.data.errno == 10000) {
            console.log(response);
            this.data3 = response.data.data.list;
            response.data.data.list.forEach(val => {
              // 1 动画，2 图片
              if (val.type == 1) {
                val.is_type = "动画"
              } else if (val.type == 2) {
                val.is_type = "图片"
              }
            });

            this.total = response.data.data.total;
          }
        })
      },
      // 开始视频列表
      getProductListVideo() {
        this.$http.get(this.$config.BaseURL15 + '/common/bootvideo/list').then(response => {
          if (response.data.errno == 10000) {
            this.data4 = response.data.data.list;
          }
        })
      },
      //开机视频确定按钮
      okProgramOneVideo() {
        this.managConfig.videoName = this.programOneRowVideo.title;
        this.managConfig.videoId = this.programOneRowVideo.id;
      },
      programOneVideo(row, index) {
        console.log(row);
        this.programOneRowVideo = row;
      },
      //配置方式 型号 + 渠道
      getCheckboxList() {
        this.$http.get(this.$config.BaseURL2 + '/tv/insidemodel/alllist').then(response => {
          console.log(response)
          if (response.data.errno == 10000) {
            this.CheckboxList = response.data.data.list;
          }
        })
      }
    },
    mounted() {
      this.getTableList();
      this.getSelectList();//渠道
      this.getCustomerList();//机型
      this.getCheckboxList();//型号+渠道
    }
  }
</script>