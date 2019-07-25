<style>
  .layout-program-search {
    float: left;
    /* margin-bottom: 10px; */
  }

  .layout-program-table {
    clear: both;
  }

  .layout-program-page {
    float: right;
    margin-top: 10px;
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
  <div class="layout-program">
    <div class="layout-program-search">
      <Form :model="search" label-position="right" inline>
        <FormItem label="节目名称:" :label-width="70">
          <Input v-model="search.name" style="width: 200px;" placeholder="请输入节目名称..."></Input>
        </FormItem>
        <FormItem label="所属分类:" :label-width="70">
          <Select style="width:200px" v-model="search.category_id" placeholder="请选择所属分类...">
            <!-- <Option value="">全部</Option> -->
            <Option v-for="item in Taxonomy" :value="item.id" :key="item.id">{{item.name}}</Option>
          </Select>
        </FormItem>
        <!-- 0:下线；1:上线 -->
        <FormItem label="状态:" :label-width="50">
          <Select v-model="search.status" style="width:200px" placeholder="请选择状态...">
            <Option value="">全部</Option>
            <Option :value="2">下线</Option>
            <Option :value="1">上线</Option>
          </Select>
        </FormItem>
        <!-- ：0：免费；1：会员；2：单片购买 -->
        <FormItem label="付费方式:" :label-width="70">
          <Select v-model="search.cost_type" style="width:200px" placeholder="请选择付费方式...">
            <Option value="">全部</Option>
            <Option :value="0">免费</Option>
            <Option :value="1">会员</Option>
            <Option :value="2">单片购买</Option>
          </Select>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="query()">搜索</Button>
        </FormItem>
      </Form>
    </div>
    <div class="layout-program-table">
      <Table border :columns="columns1" :data="data1"></Table>
    </div>
    <div class="layout-program-page">
      <Page :total="total1" :current="page1" :page-size="pageSize1" @on-change="changePage1" show-elevator />
    </div>
    <!-- 修改 -->
    <div>
      <Modal v-model="modalEdit" title="修改">
        <div slot="footer">
          <a @click="modalEdit=false" class="span">取消</a>
          <Button @click="editOk" type="primary">确定</Button>
        </div>
        <Form :model="edit" label-position="right" :label-width="100" ref="edit" :rules="ruleValidate">
          <FormItem label="节目名称:" prop="title">
            <Input v-model="edit.title"></Input>
          </FormItem>
          <FormItem label="专辑短标题:">
            <Input v-model="edit.short_title"></Input>
          </FormItem>
          <FormItem label="是否用于学习机:">
            <!-- 0: 否；1: 是； -->
            <RadioGroup v-model="edit.child_usage">
              <Radio :label="0">否</Radio>
              <Radio :label="1">是</Radio>
            </RadioGroup>
          </FormItem>
          <!-- <FormItem label="单集标题:">
            <Input v-model="edit.episode_title"></Input>
          </FormItem> -->
          <FormItem label="评分:" prop="score">
            <Input v-model="edit.score"></Input>
          </FormItem>
          <FormItem label="标签:" prop="tag_names">
            <Input v-model="edit.tag_names"></Input>
          </FormItem>
          <FormItem label="地区:">
            <Input v-model="edit.region"></Input>
          </FormItem>
          <FormItem label="类型:">
            <Input v-model="edit.theme"></Input>
          </FormItem>
          <FormItem label="排序得分:">
            <Input v-model="edit.rank_score"></Input>
          </FormItem>
          <FormItem label="短语:">
            <Input v-model="edit.short_comment"></Input>
          </FormItem>
          <FormItem label="豆瓣评分:">
            <Input v-model="edit.douban_score"></Input>
          </FormItem>
          <FormItem label="热度:">
            <Input v-model="edit.heat"></Input>
          </FormItem>
          <FormItem label="关键字:">
            <Input v-model="edit.keywords"></Input>
          </FormItem>
          <FormItem label="自有标签:">
            <Input v-model="edit.xstv_tags"></Input>
          </FormItem>
          <FormItem label="描述:">
            <Input v-model="edit.desc" type="textarea" :rows="4"></Input>
          </FormItem>
        </Form>
      </Modal>
    </div>
    <!-- 查看详情 -->
    <div>
      <Modal v-model="modalInfo" title="查看详情" width="800">
        <Form :model="news" label-position="right" :label-width="100" inline>
          <Row>
            <Col span="8">
            <p>
              节目id:{{news.id}}
            </p>
            </Col>
            <Col span="8">
            <p>
              资源提供方名称:{{news.cp_name}}
            </p>
            </Col>
            <Col span="8">
            <p>
              父ID:{{news.parrent_id}}
            </p>
            </Col>
            <Col span="8">
            <p>
              分类名称:{{news.channel_name}}
            </p>
            </Col>
            <Col span="8">
            <p>
              是否用于学习机:{{news.is_child_usage}}
            </p>
            </Col>
            <Col span="8">
            <p>
              节目状态:{{news.status}}
            </p>
            </Col>
            <Col span="8">
            <p>
              节目名称:{{news.title}}
            </p>
            </Col>
            <Col span="8">
            <p>
              专辑短标题:{{news.short_title}}
            </p>
            </Col>
            <Col span="8">
            <p>
              上映年代:{{news.release_year}}
            </p>
            </Col>
            <Col span="8">
            <p>
              评分:{{news.score}}
            </p>
            </Col>
            <Col span="8">
            <p>
              评分来源:{{news.scored_by}}
            </p>
            </Col>
            <Col span="8">
            <p>
              总集数:{{news.total_episodes}}
            </p>
            </Col>
            <Col span="8">
            <p>
              已上线数量:{{news.curr_count}}
            </p>
            </Col>
            <Col span="8">
            <p>
              制片人姓名列表:{{news.makers}}
            </p>
            </Col>
            <Col span="8">
            <p>
              导演列表:{{news.directors}}
            </p>
            </Col>
            <Col span="8">
            <p>
              主演列表:{{news.main_actors}}
            </p>
            </Col>
            <Col span="8">
            <p>
              演员列表:{{news.actors}}
            </p>
            </Col>
            <Col span="8">
            <p>
              会员:{{news.is_vip}}
            </p>
            </Col>
            <Col span="8">
            <p>
              单片付费:{{news.is_tvod}}
            </p>
            </Col>
            <Col span="8">
            <p>
              点播视频:{{news.origin_price}}
            </p>
            </Col>
            <Col span="8">
            <p>
              地区:{{news.region}}
            </p>
            </Col>
            <Col span="8">
            <p>
              类型:{{news.theme}}
            </p>
            </Col>
            <Col span="8">
            <p>
              人员名字:{{news.persons}}
            </p>
            </Col>
            <Col span="8">
            <p>
              排序得分:{{news.rank_score}}
            </p>
            </Col>
            <Col span="8">
            <p>
              评论:{{news.comment}}
            </p>
            </Col>
            <Col span="8">
            <p>
              短语:{{news.short_comment}}
            </p>
            </Col>
            <Col span="6">
            <p>
              豆瓣评分:{{news.douban_score}}
            </p>
            </Col>
            <Col span="6">
            <p>
              热度:{{news.heat}}
            </p>
            </Col>
            <Col span="6">
            <p>
              关键字:{{news.keywords}}
            </p>
            </Col>
            <Col span="6">
            <p>
              自有标签:{{news.xstv_tags}}
            </p>
            </Col>
            <Col span="24">
            <p>
              单集标题:{{news.episode_title}}
            </p>
            </Col>
            <Col span="10">
            <p>
              标签:{{news.tag_names}}
            </p>
            </Col>
            <Col span="24">
            <p>
              专辑图片:
              <img :src="news.channel_img" alt="" style="width:50px;">
            </p>
            </Col>
            <Col span="24">
            <p>
              描述:{{news.desc}}
            </p>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
    <!-- 查看子集 -->
    <Modal v-model="modalSee" title="查看子集" width="1200">
      <Table border :columns="columns2" :data="data2"></Table>
      <div class="layout-program-page">
        <Page :total="total" :current="page" :page-size="pageSize" @on-change="changePage" show-elevator />
      </div>
      <div style="clear: both;"></div>
    </Modal>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        //搜索
        search: {
          name: '',
          category_id: 1,
          is_vip: '',
          status: ''
        },
        //下拉框
        Taxonomy: [],
        //修改
        edit: {
          episode_subtitle: '',
          keywords: '',
          heat: '',
          xstv_poster: '',
          xstv_tags: '',
          comment: ''
        },
        modalEdit: false,
        //分页
        total: 0,
        page: 1,
        pageSize: 30,
        //分页
        total1: 0,
        page1: 1,
        pageSize1: 30,
        //查看详情
        news: {},
        modalInfo: false,
        // 查看子集
        parrentId: [],
        modalSee: false,
        ruleValidate: {
          title: [
            { required: true, message: '请输入节目名称', trigger: 'blur' }
          ],
          score: [
            { required: true, message: '请输入评分', trigger: 'blur', type: 'number' }
          ],
          tag_names: [
            { required: true, message: '请输入标签', trigger: 'blur' }
          ]
        },
        //表格
        columns1: [{
          type: 'index',
          width: 70,
          title: '序号',
          align: 'center'
        },
        {
          title: '节目名称',
          key: 'title',
          width: 270,
          align: 'center'
        },
        {
          title: '分类名称',
          key: 'channel_name',
          align: 'center'
        },
        {
          title: '节目状态',
          key: 'Isstatus',
          align: 'center'
        },
        {
          title: '评分',
          key: 'score',
          align: 'center'
        },
        {
          title: '付款方式',
          key: 'Isis_vip',
          align: 'center'
        },
        {
          title: '上映年代',
          key: 'release_year',
          align: 'center'
        },
        {
          title: '操作',
          align: 'center',
          width: 280,
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
                    this.info(params.index)
                  }
                }
              }, '查看详情'),
              h('Button', {
                props: {
                  type: 'success',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.seeInfo(params.row)
                  }
                }
              }, '查看子集'),
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
              }, '修改')
            ]);
          }
        }
        ],
        data1: [],
        columns2: [{
          type: 'index',
          width: 70,
          title: '序号',
          align: 'center'
        },
        {
          title: '节目名称',
          key: 'title',
          width: 270,
          align: 'center'
        },
        {
          title: '分类名称',
          key: 'channel_name',
          align: 'center'
        },
        {
          title: '子集名称',
          key: 'episode_title',
          align: 'center'
        },
        {
          title: '节目状态',
          key: 'Isstatus',
          align: 'center'
        },
        {
          title: '评分',
          key: 'score',
          align: 'center'
        },
        {
          title: '付款方式',
          key: 'Isis_vip',
          align: 'center'
        },
        {
          title: '上映年代',
          key: 'release_year',
          align: 'center'
        },
        ],
        data2: []
      }
    },
    methods: {
      //表格数据
      getTableList() {
        let self = this;
        if (this.search.cost_type == undefined) {
          this.search.cost_type = ""
        }
        if (this.search.status == undefined) {
          this.search.status = ""
        }
        self.$http(this.$config.BaseURL4 + '/program/list?count=' + self.pageSize1 + '&page=' + self.page1 + '&name=' +
          self.search.name + '&category_id=' + self.search.category_id + '&cost_type=' + self.search.cost_type +
          '&status=' + self.search.status).then(response => {
            if (response.data.errno == 10000) {
              console.log(response)
              this.data1 = response.data.data.list;

              response.data.data.list.forEach(val => {
                // 1:上架 0下架
                if (val.status == 1) {
                  val.Isstatus = '上线'
                } else if (val.status == 2) {
                  val.Isstatus = '下线'
                }

                //付费方式0:免费、1:会员、2:付费
                if (val.is_vip == 0) {
                  val.Isis_vip = '免费'
                } else if (val.is_vip == 1) {
                  val.Isis_vip = '会员'
                } else if (val.is_vip == 2) {
                  val.Isis_vip = '单片购买'
                }
              });

              self.total1 = response.data.data.total;
            }

          })
      },
      //详情
      info(index) {

        this.modalInfo = true;
        this.news = this.data1[index];
        console.log(this.news)
        //判断会员
        if (this.news.is_vip == 0) {
          this.news.is_vip = "免费";
        } else if (this.news.is_vip == 1) {
          this.news.is_vip = "会员";
        } else if (this.news.is_vip == 2) {
          this.news.is_vip = "单片购买";
        }
        //状态
        if (this.news.status == 1) {
          this.news.status = '上线'
        } else if (this.news.status == 2) {
          this.news.status = '下线'
        }
        // 是否用于学习机：0: 否；1: 是；
        if (this.news.child_usage == 0) {
          this.news.is_child_usage = "否"
        } else if (this.news.child_usage == 1) {
          this.news.is_child_usage = "是"
        }
      },
      //搜索下拉框
      getSelectList() {
        let self = this;
        self.$http(this.$config.BaseURL1 + '/media/category/list').then(response => {
          self.Taxonomy = response.data.data.list || [];
          self.Taxonomy1 = response.data.data.list || [];
        })
      },
      //查看子集
      seeInfo(row) {
        this.modalSee = true;
        console.log(row)
        this.parrentId = row.parrent_id; //全局保存parrent_id
        this.getContenList()
      },
      //子集列表
      getContenList() {
        let self = this;
        self.$http(this.$config.BaseURL4 + '/program/list?parrent_id=' + self.parrentId + '&page=' + self.page +
          '&count=' + self.pageSize + '&category_id=' + self.search.category_id).then(response => {
            if (response.data.errno == 10000) {
              console.log(response)
              //表格数据
              self.data2 = response.data.data.list;
              response.data.data.list.forEach(val => {
                // 1:上架 2下架
                if (val.status == 1) {
                  val.Isstatus = '上线'
                } else if (val.status == 2) {
                  val.Isstatus = '下线'
                }


                //付费方式0:免费、1:会员、2:付费
                if (val.is_vip == 0) {
                  val.Isis_vip = '免费'
                } else if (val.is_vip == 1) {
                  val.Isis_vip = '会员'
                } else if (val.is_vip == 2) {
                  val.Isis_vip = '单片购买'
                }
              });
              //分页
              self.total = response.data.data.total
            }
          }, response => {

          })
      },
      //修改
      modify(row) {
        this.modalEdit = true;
        this.edit = row;
        console.log(row)
      },
      //修改确定按钮
      editOk() {
        let self = this;
        var isValid = true;
        self.edit.heat = self.edit.heat + ''
        self.$refs['edit'].validate(valid => {
          if (valid == false) {
            this.$Message.error('表单输入有误,请检查!')
            isValid = false;
          }
        })
        if (isValid == false) {
          return
        }
        self.$http.post(this.$config.BaseURL4 + '/program/edit', self.edit).then(response => {
          if (response.data.errno == 10000) {
            this.edit = {};
            this.modalEdit = false;
            this.getTableList();
            this.$Message.success('修改成功!')
          }
        })
      },
      //分页
      changePage(page) {
        this.page = page;
        this.getContenList()
      },
      //分页
      changePage1(page) {
        this.page1 = page;
        this.getTableList()
      },
      //搜索
      query() {

        this.page1 = 1
        this.getTableList();
      }
    },
    mounted() {
      this.getTableList();
      this.getSelectList()

    }
  }

</script>