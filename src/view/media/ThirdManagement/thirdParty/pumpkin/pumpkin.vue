<style>
.layout-pumpkin-page {
  float: right;
  margin-top: 10px;
}

.ivu-table th,
.ivu-table td {
  height: 40px;
}
</style>
<template>
  <div class="layout-pumpkin">
    <!-- 搜索 -->
    <div class="layout-pumpkin-search">
      <Form :model="search" inline>
        <FormItem label="节目集名称:" :label-width="90">
          <Input v-model="search.name" style="width:200px;" placeholder="请输入节目集名称..."></Input>
        </FormItem>
        <FormItem label="地区:" :label-width="60">
          <Input v-model="search.country" style="width:200px;" placeholder="请输入地区名称..."></Input>
        </FormItem>
        <FormItem label="上线状态:" :label-width="70">
          <Select v-model="search.status" style="width:200px" aria-placeholder="请选择上线状态...">
            <Option value>全部</Option>
            <Option :value="2">下线</Option>
            <Option :value="1">上线</Option>
          </Select>
        </FormItem>
        <FormItem label="创建时间:" :label-width="70">
          <DatePicker
            type="datetimerange"
            placement="bottom-end"
            placeholder="请选择创建时间..."
            style="width: 260px"
            v-model="timer"
          ></DatePicker>
        </FormItem>
        <FormItem label="最后更新时间:" :label-width="100">
          <DatePicker
            type="datetimerange"
            placement="bottom-end"
            placeholder="请选择最后更新时间..."
            style="width: 260px"
            v-model="timer1"
          ></DatePicker>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="query">搜索</Button>
        </FormItem>
      </Form>
    </div>
    <!-- 分类 -->
    <div>
      <span style="float:left;margin-top:13px;margin-right:20px;font-size:14px;">分类:</span>
      <Tabs @on-click="tabChange">
        <TabPane :name="tab.id +''" v-for="tab in tabs" :key="tab.id" :label="tab.name+''"></TabPane>
      </Tabs>
    </div>
    <div style="clear:both;"></div>
    <!-- 列表 -->
    <div class="layout-pumpkin-table">
      <Table border :columns="columns1" :data="data1"></Table>
    </div>
    <!-- 分页 -->
    <div class="layout-pumpkin-page">
      <Page :total="total" :current="page" :page-size="pageSize" @on-change="changePage" show-elevator/>
    </div>
    <!-- 查看 -->
    <Modal v-model="modalSee" title="查看节目集信息" width="800">
      <Row>
        <Col span="12">第三方节目集ID:{{see.id}}</Col>
        <Col span="12">电影名称:{{see.name}}</Col>
        <Col span="12">电影标题:{{see.title}}</Col>
        <Col span="12">电影别名：{{see.alias}}</Col>
        <Col span="12">电影英文名:{{see.name_english}}</Col>
        <Col span="12">电影导演:{{see.director}}</Col>
        <Col span="12">电影国家:{{see.country}}</Col>
        <Col span="12">电影语言:{{see.language}}</Col>
        <Col span="12">电影年份:{{see.year}}</Col>
        <Col span="12">电影类型:{{see.MovieType}}</Col>
        <Col span="12">电影海报/剧照:<img :src="see.poster" alt style="width:50px;height:50px;"></Col>
        <Col span="12">电影市场:{{see.duration}}</Col>
        <Col span="12">电影主演:{{see.actor}}</Col>
        <Col span="12">电影集数:{{see.episode_num}}</Col>
        <Col span="12">
          <div v-for="(one,index) in see.image_list" :key ='index.images_list'>
          电影海报[0]:竖版海报[1]:横版海报:
          <img :src="one" alt style="width:50px;height:50px;">
           <img :src="one" alt style="width:50px;height:50px;">
          </div>
        </Col>
      </Row>
    </Modal>
  </div>
</template>
<script>
var moment = require("moment");
export default {
  data() {
    return {
      imageList: [], //海报
      tabs: [], //标签页
      search: {
        name: "",
        status: "",
        country: "",
        createStart: "",
        createEnd: "",
        updateStart: "",
        updateEnd: "",
        categoryName: "" //tab页name
      }, //搜索
      total: 0,
      page: 1,
      pageSize: 30, //分页
      total: 0,
      timer: [],
      timer1: [],
      see: {},
      modalSee: false, //查看
      columns1: [
        {
          title: "节目集ID",
          key: "id",
          align: "center",
          width:90
        },
        {
          title: "节目集名称",
          key: "name",
          align: "center",
          // width: 100
        },
        {
          title: "分类",
          key: "MovieType",
          align: "center",
          width:90
        },
        {
          title: "发行年代",
          key: "year",
          align: "center",
          width:90
        },
        {
          title: "地区",
          key: "country",
          align: "center",
          width:90
        },
        {
          title: "导演",
          key: "director",
          align: "center", 
          width:200,
          ellipsis:'true'

        },
        {
          title: "上线状态",
          key: "Isstatus",
          align: "center",
          width:90
        },
        {
          title: "创建时间",
          key: "create_time",
          align: "center",
          // width: 140
        },
        {
          title: "最后更新时间",
          key: "update_time",
          align: "center",
          // width: 140
        },
        {
          title: "操作",
          align: "center",
          width: 100,
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.SeeModal(params.row);
                    }
                  }
                },
                "查看"
              )
            ]);
          }
        }
      ],
      data1: []
    };
  },
  methods: {
    // 表格数据
    getTableList() {
      let self = this;
      // 创建开始和结束时间
      let createStart = moment(self.timer[0]).format("X");

      let createEnd = moment(self.timer[1]).format("X");
      // 最后更新时间
      let updateStart = moment(self.timer1[0]).format("X");

      let updateEnd = moment(self.timer1[1]).format("X");
      if (this.search.status == undefined) {
        this.search.status = "";
      }
      if (isNaN(createStart)) {
        createStart = "";
      }
      if (isNaN(createEnd)) {
        createEnd = "";
      }
      if (isNaN(updateStart)) {
        updateStart = "";
      }
      if (isNaN(updateEnd)) {
        updateEnd = "";
      }
      self.$http(this.$config.BaseURL7 +"/media/v2/original/pumpkin/media/list?name=" + self.search.name +"&country=" + self.search.country + "&status=" +self.search.status +
            "&categoryName=" + self.search.categoryName +"&createStart=" + createStart +"&createEnd=" + createEnd + "&updateStart=" + updateStart +"&updateEnd=" +
            updateEnd +"&page=" + self.page + "&pagesize=" + self.pageSize ).then(response => {
                if (response.data.errno == 10000) {
                    console.log(response);
                    this.data1 = response.data.data.list;
                    this.total = response.data.data.total;
                    this.imageList =  response.data.data.list;
                    console.log(this.imageList)
                    response.data.data.list.forEach(val => {
                    // 1:上线 2:下线
                        if (val.status == 1) {
                            val.Isstatus = "上线";
                        } else if (val.status == 2) {
                            val.Isstatus = "下线";
                        }
                        if (val.movie_type == 1) {
                            val.MovieType = "电影";
                        } else if (val.movie_type == 2) {
                            val.MovieType = "电视剧";
                        }
                    });
                }
        });
    },
    // 搜索
    query() {
      this.page = 1;
      this.getTableList();
    },
    // 分页
    changePage(page) {
      this.page = page;
      this.getTableList();
    },
    //分类页获取tab
    getTabList() {
        let self = this;
        self.$http( this.$config.BaseURL7 + "/media/v2/original/pumpkin/category/list").then(response => {
            if (response.data.errno == 10000) {
                console.log(response);
                this.tabs = response.data.data;
            }
        });
    },
    //tab 切换
    tabChange(name) {
      console.log(name);
      this.total = 0;
      this.data1 = [];
      this.search.categoryName = name;
      this.getTableList();
    },
    // 查看
    SeeModal(row) {
      console.log(row);
      this.see = row;
      this.modalSee = true;
      //分类类型   1.电影   2.电视剧
      if (row.movie_type == 1) {
        row.MovieType = "电影";
      } else if (row.movie_type == 1) {
        row.MovieType = "电视剧";
      }
    }
  },
  mounted() {
    this.getTabList();
    this.getTableList();
  }
};
</script>


 