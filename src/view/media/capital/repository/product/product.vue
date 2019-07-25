<style>
  .layout-product-size{
    font-family: SourceHanSansCN-Regular;
    font-size: 14px;
    color: #666666;
    line-height: 14px;
  }
  .layout-product-modify{
    font-family: SourceHanSansCN-Bold;
    font-size: 14px;
    color: #333333;
    line-height: 14px;
  }
  .layout-product-page{
    float: right;
    margin-top: 10px;
  }
</style>
<template>
  <div class="layout-product">
    <!-- 搜索 -->
    <div class="layout-product-search">
      <Form :model="search" inline>
        <FormItem label="节目集名称:" :label-width="80">
          <Input v-model="search.title" style="width:200px" placeholder="请输入节目集名称..."></Input>
        </FormItem>
        <FormItem label="分类:" :label-width="50">
          <Select v-model="search.categoryId" style="width:200px" placeholder="请输入分类...">
            <Option v-for="item in cityList" :value="item.id" :key="item.id">{{ item.name }}</Option>
          </Select>
        </FormItem>
        <FormItem label="创建时间:" :label-width="70">
          <DatePicker type="datetimerange" placement="bottom-end" placeholder="请选择创建时间..." style="width: 300px" v-model="timer"></DatePicker>
        </FormItem>
        <FormItem label="最后更新时间:" :label-width="100">
          <DatePicker type="datetimerange" placement="bottom-end" placeholder="请选择创建时间..." style="width: 300px" v-model="timer1"></DatePicker>
        </FormItem>
        <FormItem label="导演:" :label-width="45">
          <Input v-model="search.directors" style="width:200px" placeholder="请输入导演..."></Input>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="query">搜索</Button>
        </FormItem>
        <!-- <FormItem  :label-width="100">
          <Button @click="DrawerEdit = true" type="success">修改</Button>
        </FormItem> -->
      </Form>
    </div>
    <!-- 表格  -->
    <div class="layout-product-table">
      <Table border :columns="columns1" :data="data1"></Table>
    </div>
    <div class="layout-product-page">
      <Page :total="total" :current="page" :page-size='pageSize' @on-change="changePage" show-elevator />
    </div>
  </div>
</template>
<script>
  var moment = require("moment");
  export default {
    data() {
      return {
        search: {
          title: "",
          categoryId: "",
          directors: "",
          status: "",
          createStartTime: "",
          createEndTime: "",
          updateStartTime: "",
          updateEndTime: "",
          directors: ''
        },
        cityList: [],//分类下拉框
        //分页
        pageSize: 30,
        page: 1,
        total: 0,
        timer: [],
        timer1: [],
        DrawerEdit: false,
        edit: {},
        styles: {
          height: "calc(100% - 55px)",
          overflow: "auto",
          paddingBottom: "53px",
          position: "static"
        },
        columns1: [{
          title: "节目集ID",
          key: "id",
          align: "center"
        },
        {
          title: "节目集名称",
          key: "title",
          align: "center"
        },
        {
          title: "分类",
          key: "category_name",
          align: "center"
        },
        {
          title: "导演",
          key: "directors",
          align: "center"
        },
        {
          title: "热度",
          key: "heat",
          align: "center"
        },
        {
          title: "总集数",
          key: "total_episodes",
          align: "center"
        },
        {
          title: "状态",
          key: "ISstatus",
          align: "center"
        },
        {
          title: "创建时间",
          key: "Iscreate_time",
          align: "center"
        },
        {
          title: "操作",
          width: 160,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button", {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.modify(params.row);
                    }
                  }
                },
                "修改"
              )
            ]);
          }
        }
        ],
        data1: []
      };
    },
    methods: {
      getTableList() {
        let self = this;
        //开始时间
        let createStartTime = moment(self.timer[0]).format("X") * 1;
        //结束时间
        let createEndTime = moment(self.timer[1]).format("X") * 1;
        //开始时间
        let updateStartTime = moment(self.timer1[0]).format("X") * 1;
        //结束时间
        let updateEndTime = moment(self.timer1[1]).format("X") * 1;
        // if(createStartTime == NaN){
        //     createStartTime = ''
        // }
        if (isNaN(createStartTime)) {
          createStartTime = "";
        }
        if (isNaN(createEndTime)) {
          createEndTime = "";
        }
        if (isNaN(updateStartTime)) {
          updateStartTime = "";
        }
        if (isNaN(updateEndTime)) {
          updateEndTime = "";
        }

        self
          .$http(
            this.$config.BaseURL1 +
            "/media/v2/complete/program/list?title=" +
            self.search.title +
            "&categoryId=" +
            self.search.categoryId +
            "&directors=" +
            self.search.directors +
            "&status=" +
            self.search.status +
            "&createStartTime=" +
            createStartTime +
            "&createEndTime=" +
            createEndTime +
            "&updateStartTime=" +
            updateStartTime +
            "&updateEndTime=" +
            updateEndTime + '&directors=' + self.search.directors + '&page=' + self.page + '&pageSize=' + self.pageSize
          )
          .then(
            response => {
              if (response.data.errno == 10000) {
                console.log(response)
                if (typeof response.data.data.list == "undefined") {
                  return;
                }
                self.data1 = response.data.data.list;
                // 上线状态：1上线，2下线
                response.data.data.list.forEach(val => {
                  if (val.status == 1) {
                    val.ISstatus = "上线";
                  } else if (val.status == 0) {
                    val.ISstatus = "下线";
                  }
                  //时间转换
                  val.Iscreate_time = moment(val.create_time).format(
                    "YYYY-MM-DD HH:mm:ss"
                  );
                });

                self.total = response.data.data.total;
              }
            },
            response => { }
          );
      },
      getSelect() {
        let self = this;
        self.$http(this.$config.BaseURL1 + '/media/v2/category/list').then(response => {
          if (response.data.errno == 10000) {
            self.cityList = response.data.data.list;
          }
        }, response => { })
      },
      // 搜索
      query() {
        this.page =1;
        this.getTableList();
      },
      // 显示修改
      modify(row) {
        console.log(row);
        this.$router.push({
          path: '/qqq', query: {
            id: row.id,
            category_id:row.category_id
          }
        })
      },
      //分页
      changePage(page) {
        this.page = page;
        this.getTableList()
      }
    },
    mounted() {
      this.getSelect()
      this.getTableList();
    }
  };

</script>
<style scoped>
  table td {
    border: 1px solid #cccccc;
  }
</style>