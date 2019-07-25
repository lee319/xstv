<style>
  .layout-series-search{
    float: left;
}
.layout-series-add{
    float: right;
}
.layout-series-maintain-table{
    margin-top:10px;
}
.layout-series-page{
    float: right;
    margin-top:10px;
}
</style>
<template>
  <div class="layout-series">
    <div class="layout-series-search">
      <Form :model="search" inline>
        <FormItem label="系列名称:" :label-width="70">
          <Input v-model="search.name" style="width:200px;" placeholder="请输入系列名称..."></Input>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="query">搜索</Button>
        </FormItem>
      </Form>
    </div>
    <!-- 添加 -->
    <div class="layout-series-add">
      <Button type="success" @click="modalAdd = true">添加</Button>
      <Modal v-model="modalAdd" title="添加" @on-ok="okAdd">
        <Form :model="info" label-position="right" :label-width="100">
          <FormItem label="系列名称:">
            <Input v-model="info.title" placeholder="请输入系列名称..."></Input>
          </FormItem>
          <FormItem label="描述:">
            <Input v-model="info.desc" type="textarea" :rows="4" placeholder="请输入描述..."></Input>
          </FormItem>
        </Form>
      </Modal>
    </div>
    <div style="clear:both"></div>
    <div class="layout-series-table">
      <Table border :columns="columns1" :data="data1"></Table>
    </div>
    <div class="layout-series-page">
      <Page :total="total1" :current="page1" :page-size='pageSize1' @on-change="changePage1" show-elevator />
    </div>
    <!-- 修改 -->
    <div class="layout-series-add">
      <Modal v-model="modalEdit" title="修改" @on-ok="okEdit">
        <Form :model="edit" label-position="right" :label-width="100">
          <FormItem label="系列名称:">
            <Input v-model="edit.title" placeholder="请输入系列名称..."></Input>
          </FormItem>
          <FormItem label="描述:">
            <Input v-model="edit.desc" type="textarea" :rows="4" placeholder="请输入描述..."></Input>
          </FormItem>
        </Form>
      </Modal>
    </div>
    <!-- 内容维护 -->
    <div class="layout-series-maintain">
      <Modal v-model="modalMaintain" title="内容维护" width="1100">
        <div class="layout-series-maintain-add">
          <Button type="success" @click="modalProgramAdd = true">添加</Button>
          <Modal v-model="modalProgramAdd" title="添加节目信息" @on-ok="okProgramAdd">
            <Form :model="programInfo" label-position="right" :label-width="100">
              <FormItem label="节目名称:">
                <Input v-model="programInfo.title" placeholder="请输入节目名称..."></Input>
              </FormItem>
              <FormItem label="导演:">
                <Input v-model="programInfo.directors" placeholder="请输入导演..."></Input>
              </FormItem>
              <FormItem label="年代:">
                <Input v-model="programInfo.publish_year" placeholder="请输入年代..."></Input>
              </FormItem>
              <FormItem label="排序:">
                <Input v-model="programInfo.rank" placeholder="请输入排序..."></Input>
              </FormItem>
              <FormItem label="关联媒资:">
                <Input v-model="programInfo.album_name" placeholder="请选择关联媒资..."></Input>
                <Button type="primary" size="small" @click="modalComplete = true;getCompleteList()">修改</Button>
                <Modal v-model="modalComplete" title="关联媒资" :width="1100" @on-ok="okProgramOne">
                  <Form :model="modalMainAddSearch" inline>
                    <FormItem label="节目名称:" :label-width="70">
                      <Input v-model="modalMainAddSearch.title" style="width:150px;" placeholder="请输入节目名称..."></Input>
                    </FormItem>
                    <FormItem label="年代:" :label-width="40">
                      <Input v-model="modalMainAddSearch.input2" style="width:150px;" placeholder="请输入年代..."></Input>
                    </FormItem>
                    <FormItem label="导演:" :label-width="40">
                      <Input v-model="modalMainAddSearch.directors" style="width:150px;" placeholder="请输入导演..."></Input>
                    </FormItem>
                    <FormItem>
                      <Button type="primary">搜索</Button>
                    </FormItem>
                    <Table border :columns="columns3" :data="data3" :highlight-row="true" @on-row-click="programListOne"></Table>
                    <div class="layout-series-page">
                      <Page :total="total" :current="page" :page-size='pageSize' @on-change="changePage" show-elevator />
                    </div>
                    <div style="margin-top:40px;"></div>
                  </Form>
                </Modal>
              </FormItem>
            </Form>
          </Modal>
        </div>
        <div class="layout-series-maintain-table">
          <Table border :columns="columns2" :data="data2"></Table>
        </div>
        <div class="layout-series-page">
          <Page :total="total2" :current="page2" :page-size='pageSize2' @on-change="changePage2" show-elevator />
        </div>
        <div style="margin-top:40px;"></div>
      </Modal>
      <Modal v-model="modalProgramEdit" title="修改" @on-ok="okProgramEdit">
        <!-- 内容维护修改 -->
        <Form :model="programEdit" label-position="right" :label-width="100">
          <FormItem label="节目名称:">
            <Input v-model="programEdit.title"></Input>
          </FormItem>
          <FormItem label="导演:">
            <Input v-model="programEdit.directors"></Input>
          </FormItem>
          <FormItem label="年代:">
            <Input v-model="programEdit.publish_year"></Input>
          </FormItem>
          <FormItem label="排序:">
            <Input v-model="programEdit.rank"></Input>
          </FormItem>
          <FormItem label="关联媒资:">
            <Input v-model="programEdit.album_name"></Input>
            <Button type="primary" size="small" @click="modalComplete = true;getCompleteList()">修改</Button>
            <Modal v-model="modalComplete" title="关联媒资" :width="1100" @on-ok="okProgramOne">
              <Form :model="modalMainAddSearch" inline>
                <FormItem label="节目名称:" :label-width="70">
                  <Input v-model="modalMainAddSearch.title" style="width:150px;" placeholder="请输入节目名称..."></Input>
                </FormItem>
                <FormItem label="年代:" :label-width="40">
                  <Input v-model="modalMainAddSearch.publish_year" style="width:150px;" placeholder="请输入年代..."></Input>
                </FormItem>
                <FormItem label="导演:" :label-width="40">
                  <Input v-model="modalMainAddSearch.directors" style="width:150px;" placeholder="请输入导演..."></Input>
                </FormItem>
                <FormItem>
                  <Button type="primary" @click="queryComplete">搜索</Button>
                </FormItem>
                <Table border :columns="columns3" :data="data3" :highlight-row="true" @on-row-click="programListOne"></Table>
                <div class="layout-series-page">
                  <Page :total="total" :current="page" :page-size='pageSize' @on-change="changePage" show-elevator />
                </div>
                <div style="margin-top:40px;"></div>
              </Form>
            </Modal>
          </FormItem>
        </Form>
      </Modal>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        search: {
          name: '',
        },
        modalAdd: false,
        info: {}, //添加
        modalEdit: false,
        edit: {},
        id: '', //一整行id
        seriesId: '', // 系列id
        modalMaintain: false, //内容维护
        programInfo: {},
        modalProgramAdd: false, //内容维护添加
        programEdit: {},
        modalProgramEdit: false, //内容维护修改
        modalMainAddSearch: {
          title: '',
          publish_year: '',
          directors: ''
        }, //内容维护添加搜索
        total: 0,
        page: 1,
        pageSize: 30, //分页

        total1: 0,
        page1: 1,
        pageSize1: 30, //分页

        total2: 0,
        page2: 1,
        pageSize2: 10, //分页

        //
        programId: '',
        programOneRow: {},
        modalComplete: false, //关联媒资
        columns1: [{
            title: '序号',
            type: 'index',
            align: 'center',
            width: 60
          },
          {
            title: '系列ID',
            key: 'id',
            align: 'center'
          },
          {
            title: '系列名称',
            key: 'title',
            align: 'center'
          },
          {
            title: '描述',
            key: 'desc',
            align: 'center'
          },
          {
            title: '创建时间',
            key: 'create_time',
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
                    size: 'small',
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
                  "Poptip", {
                    props: {
                      confirm: true,
                      title: "确定要删除吗！",
                      type: "error",
                      size: "small",
                      width: "150"
                    },
                    style: {
                      marginRight: '5px'
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
                ),
                h('Button', {
                  props: {
                    type: 'warning',
                    size: 'small',
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.maintain(params.row)
                    }
                  }
                }, '内容维护'),
              ]);
            }
          }
        ],
        data1: [],
        columns2: [{
            title: '序号',
            type: 'index',
            align: 'center',
            width: 60
          },
          {
            title: '节目名称',
            key: 'title',
            align: 'center'
          },
          {
            title: '排序ID',
            key: 'rank',
            align: 'center'
          },
          {
            title: '导演',
            key: 'directors',
            align: 'center'
          },
          {
            title: '上映年代',
            key: 'publish_year',
            align: 'center'
          },
          {
            title: '关联媒资',
            key: 'album_bool',
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
                    size: 'small',
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.modifyMaintain(params.row)
                    }
                  }
                }, '修改'),
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
                        this.remove1(params.row);
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
              ]);
            }
          }
        ],
        data2: [],
        columns3: [{
            title: '序号',
            type: 'index',
            align: 'center',
            width: 60
          },
          {
            title: '节目名称',
            key: 'title',
            align: 'center'
          },
          {
            title: '节目分类',
            key: 'category_name',
            align: 'center'
          },
          {
            title: '导演',
            key: 'directors',
            align: 'center'
          },
          {
            title: '上映年代',
            key: 'publish_year',
            align: 'center'
          },
          {
            title: '语言',
            key: 'language',
            align: 'center'
          }
        ],
        data3: []
      }
    },
    methods: {
      // 表格数据
      getTableList() {
        let self = this;
        self.$http(this.$config.BaseURL1 + '/media/v2/series/list?name=' + this.search.name + '&page=' + this.page1 +
          '&page_size=' + this.pageSize1).then(response => {
          if (response.data.errno == 10000) {
            console.log(response)
            self.data1 = response.data.data.list;
            self.total1 = response.data.data.total;
          }
        })
      },
      // 添加确定按钮
      okAdd() {
        let self = this;
        self.$http.post(this.$config.BaseURL1 + '/media/v2/series/modify', self.info).then(response => {
          if (response.data.errno == 10000) {
            this.info = {};
            this.getTableList();
            this.modalAdd = false;
            this.$Message.success('添加成功')
          }
        })
      },
      // 搜索
      query() {
        this.page1 = 1;
        this.getTableList()
      },
      // 系列分页
      changePage1(page) {
        this.page1 = page;
        this.getTableList();
      },
      // 修改
      modify(row) {
        console.log(row);
        this.edit = row;
        this.id = row.id;
        this.modalEdit = true;
      },
      // 修改确定按钮
      okEdit() {
        let self = this;
        self.$http.post(this.$config.BaseURL1 + '/media/v2/series/modify?id=' + this.id, self.edit).then(response => {
          if (response.data.errno == 10000) {
            this.getTableList();
            this.modalEdit = false;
            this.$Message.success('修改成功！')
          }
        })
      },
      //删除
      remove(row) {
        console.log(row)
        this.$http.post(this.$config.BaseURL1 + '/media/v2/series/delete', {
          id: row.id
        }).then(response => {
          if (response.data.errno == 10000) {
            this.getTableList();
            this.$Message.success('删除成功！')
          }
        })
      },
      // 内容维护modal
      maintain(row) {
        console.log(row)
        this.seriesId = row.id;
        console.log(this.seriesId)
        this.getProgramList()
        this.modalMaintain = true;
      },
      //内容维护列表
      getProgramList() {
        this.$http(this.$config.BaseURL1 + '/media/v2/series/program/list?id=' + this.seriesId + '&page=' + this.page2 +
          '&page_size=' + this.pageSize2).then(response => {
          if (response.data.errno == 10000) {
            this.data2 = response.data.data.list;
            this.total2 = response.data.data.total;
          }
        })
      },
      // 内容维护分页
      changePage2(page) {
        this.page2 = page;
        this.getProgramList();
      },
      //关联媒资
      getCompleteList() {
        this.$http(this.$config.BaseURL1 + '/media/v2/complete/program/list?page=' + this.page + '&pageSize=' + this.pageSize +
          '&title=' + this.modalMainAddSearch.title + '&publish_year=' + this.modalMainAddSearch.publish_year +
          '&directors=' + this.modalMainAddSearch.directors).then(response => {
          if (response.data.errno == 10000) {
            this.data3 = response.data.data.list;
            this.total = response.data.data.total;
          }
        })
      },
      // 搜索法国人🙆‍♂️而饿饿饿饿饿饿饿饿饿饿饿饿饿
      queryComplete() {
        this.page = 1;
        this.getCompleteList();
      },
      // 分页
      changePage(page) {
        this.page = page;
        this.getCompleteList();
      },
      programListOne(row, index) {
        console.log(index)
        console.log(row)
        this.programOneRow = row;
        console.log(this.programOneRow);
      },
      // 添加/修改确定按钮
      okProgramOne() {
        this.programInfo.album_name = this.programOneRow.title;
        this.programInfo.album_id = this.programOneRow.id;

        this.programEdit.media_name = this.programOneRow.title;
        this.programEdit.album_id = this.programOneRow.id;
      },
      // 添加确定按钮
      okProgramAdd() {
        console.log(this.seriesId);
        this.programInfo.publish_year *= 1;
        this.programInfo.rank *= 1;
        this.programInfo.pid = this.seriesId;
        this.$http.post(this.$config.BaseURL1 + '/media/v2/series/program/modify', this.programInfo).then(response => {
          if (response.data.errno == 10000) {
            this.programInfo = {};
            this.getProgramList();
            this.$Message.success('添加成功！')
          }
        })
      },
      //内容维护修改
      modifyMaintain(row) {
        console.log(row)
        this.programEdit = row;
        this.programId = row.id;
        this.modalProgramEdit = true;
      },
      // 修改
      okProgramEdit() {
        this.programEdit.pid = this.seriesId;
        this.programEdit.program_id = this.programId;
        this.programEdit.publish_year *= 1;
        this.programEdit.rank *= 1;
        console.log(this.programEdit.pid);
        this.$http.post(this.$config.BaseURL1 + '/media/v2/series/program/modify', this.programEdit).then(response => {
          if (response.data.errno == 10000) {
            this.getProgramList();
            this.$Message.success('修改成功！')
          }
        })
      },
      //内容维护删除
      remove1(row) {
        this.$http.post(this.$config.BaseURL1 + '/media/v2/series/program/delete', {
          program_id: row.id
        }).then(response => {
          if (response.data.errno == 10000) {
            this.getProgramList();
            this.$Message.success('删除成功！');
          }
        })
      }
    },
    mounted() {
      this.getTableList();
    }
  }

</script>
