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
          <Input v-model="search.categoryId" style="width:200px" placeholder="请输入分类..."></Input>
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
    <!-- 修改 -->
    <div>
      <Drawer title="详情页" v-model="DrawerEdit" width="80" :styles="styles">
        <div v-if="DrawerEdit">
          <div>
            <img :src="edit.poster.url" alt="" style="width:156px;height:216px;float: left;">
            <div style="margin-left:170px">
              <div style="font-family: SourceHanSansCN-Bold; font-size: 22px; color: #333333; letter-spacing: 0;">{{edit.title}}</div>
              <!-- 基本信息 -->
              <div class="layout-product-size">
                <span>2018-11-29</span>&nbsp;&nbsp;&nbsp;|&nbsp;
                <span>中国香港</span>&nbsp;&nbsp;&nbsp;|&nbsp;
                <span>99分钟</span>
                <span style="margin-left:200px;">播放源:</span>
                <span><img :src="edit.poster.url" alt="" style="width:20px;heigit:20px;margin-left: 20px;"></span>
                <span><img :src="edit.poster.url" alt="" style="width:20px;heigit:20px;margin-left: 20px;"></span>
                <span><img :src="edit.poster.url" alt="" style="width:20px;heigit:20px;margin-left: 20px;"></span>
              </div>
              <div style="border-bottom:1px solid #E5E5E5;margin-top: 10px;"></div>
              <!-- 类型标签 -->
              <div class="layout-product-modify">
                <div style="margin-top:10px;font-family: SourceHanSansCN-Bold;font-size: 14px;color: #333333;">
                  <span>类型标签:
                    <span style="font-family: SourceHanSansCN-Regular;font-size: 14px; color: #666666;text-align: center;">动作;犯罪;</span>
                  </span>
                  <span style="margin-left:10px;"><Button type="primary" size="small">修改</Button></span>
                </div>
              </div>
            </div>
            <!-- <div>别名：{{edit.alias}}</div> -->
            <!-- <div>修改类型:</div>
            <div>新视频道:</div> -->

            <a href="javascript:;" @click="$router.push({path: '/capital/address', query: {edit: edit}})">修改海报</a>

          </div>
          <div style="clear: both;"></div>
          <!-- <div>
            导演：
            <a href="javascript:;" @click="updatePerson(1)">修改</a>
            <div v-for="(item,key) in edit.person.directors" :key="key">{{item.id}}-{{item.name}} -
              <img :src="item.portrait" alt="" style="width:50px;height:50px;border-radius: 50px;">
            </div>
          </div>
          <div>
            编剧：
            <a href="javascript:;" @click="updatePerson(2)">修改</a>
            <div v-for="(item,key) in edit.person.writers" :key="key">{{item.id}}-{{item.name}} -
              <img :src="item.portrait" alt="" style="width:50px;height:50px;border-radius: 50px;">
            </div>
          </div>
          <div>
            主演：
            <a href="javascript:;" @click="updatePerson(3)">修改</a>
            <div v-for="(item,key) in edit.person.main_actors" :key="key">{{item.id}}-{{item.name}} -
              <img :src="item.portrait" alt="" style="width:50px;height:50px;border-radius: 50px;">
            </div>
          </div>
          <div>
            配角：
            <a href="javascript:;" @click="updatePerson(4)">修改</a>
            <div v-for="(item,key) in edit.person.actors" :key="key">{{item.id}}-{{item.name}} -
              <img :src="item.portrait" alt="" style="width:50px;height:50px;border-radius: 50px;">
            </div>
          </div> -->
          <div style="font-family: SourceHanSansCN-Bold; font-size: 18px; color: #333333;letter-spacing: 0;line-height: 14px;margin-top:30px;">
            <span>基础信息：</span>
            <Button type="primary" size="small" @click="showUpdateBaseInfo">修改</Button>
            <div style="width:100%;height:100%;background-color: #fff;border: 1px solid #ccc;">
              <Row>
                <Col span="12" style="padding: 5px;">
                <span class="layout-product-modify">片名：</span>
                <span class="layout-product-size">{{edit.title}}</span>
                </Col>
                <Col span="12" style="padding: 5px;">
                <span class="layout-product-modify">又名：</span>
                <span class="layout-product-size">{{edit.alias}}</span>
                </Col>
                <Col span="12" style="padding: 5px;">
                <span class="layout-product-modify">英文名：</span>
                <span class="layout-product-size">{{edit.release_company}}</span>
                </Col>
                <Col span="12" style="padding: 5px;">
                <span class="layout-product-modify">分级信息：</span>
                <span class="layout-product-size">{{edit.Rating}}</span>
                </Col>
                <Col span="12" style="padding: 5px;">
                <span class="layout-product-modify">发行公司：</span>
                <span class="layout-product-size">{{edit.release_company}}</span>
                </Col>
                <Col span="12" style="padding: 5px;">
                <span class="layout-product-modify">发行年代：</span>
                <span class="layout-product-size">{{edit.release_year}}</span>
                </Col>
                <Col span="12" style="padding: 5px;">
                <span class="layout-product-modify">国家地区：</span>
                <span class="layout-product-size">{{edit.region}}</span>
                </Col>
                <Col span="12" style="padding: 5px;">
                <span class="layout-product-modify">节目时长：</span>
                <span class="layout-product-size">{{edit.duration}}</span>
                </Col>
                <Col span="12" style="padding: 5px;">
                <span class="layout-product-modify">语言：</span>
                <span class="layout-product-size">{{edit.language}}</span>
                </Col>
                <Col span="12" style="padding: 5px;">
                <span class="layout-product-modify">官方网站：</span>
                <span class="layout-product-size">{{edit.official_website}}</span>
                </Col>
                <Col span="12" style="padding: 5px;">
                <span class="layout-product-modify">上映时间：</span>
                <span class="layout-product-size">{{edit.release_time}}</span>
                </Col>
                <Col span="12" style="padding: 5px;">
                <span class="layout-product-modify">类型标签：</span>
                <span class="layout-product-size">{{edit.type}}</span>
                </Col>
                <Col span="12" style="padding: 5px;">
                <span class="layout-product-modify">系列节目名称：</span>
                <span class="layout-product-size">{{edit.series_name}}</span>
                </Col>
                <Col span="12" style="padding: 5px;">
                <span class="layout-product-modify">全球票房：</span>
                <span class="layout-product-size">{{edit.global_box_office}}</span>
                </Col>
                <Col span="12" style="padding: 5px;">
                <span class="layout-product-modify">中国票房：</span>
                <span class="layout-product-size">{{edit.chinese_box_office}}</span>
                </Col>
                <Col span="12" style="padding: 5px;">
                <span class="layout-product-modify">内容来源：</span>
                <span class="layout-product-size">{{edit.story_source}}</span>
                </Col>
                <Col span="12" style="padding: 5px;">
                <span class="layout-product-modify">是否翻拍：</span>
                <span class="layout-product-size">{{edit.is_remade}}</span>
                </Col>
                <Col span="12" style="padding: 5px;">
                <span class="layout-product-modify">一句话点评：</span>
                <span class="layout-product-size">{{edit.brief_comment}}</span>
                </Col>
                <Col span="24" style="padding: 5px;">
                <span class="layout-product-modify">剧情简介：</span>
                <span class="layout-product-size">{{edit.desc}}</span>
                </Col>
              </Row>
            </div>
          </div>
          <div style="font-family: SourceHanSansCN-Bold; font-size: 18px; color: #333333;letter-spacing: 0;line-height: 14px;margin-top:30px;">
            <span>运营信息：</span>
            <Button type="primary" size="small" @click="showUpdateOperateInfo">修改</Button>
            <table>
              <tr>
                <td>权重:</td>
                <td>{{edit.weight}}</td>
              </tr>
              <tr>
                <td>播放次数:</td>
                <td>{{edit.play_count}}</td>
              </tr>
              <tr>
                <td>原始评分:</td>
                <td>{{edit.origin_score}}</td>
              </tr>
              <tr>
                <td>豆瓣评分:</td>
                <td>{{edit.douban_score}}</td>
              </tr>
              <tr>
                <td>猫眼评分:</td>
                <td>{{edit.maoyan_score}}</td>
              </tr>
              <tr>
                <td>IMDB评分:</td>
                <td>{{edit.imdb_score}}</td>
              </tr>
              <tr>
                <td>豆瓣网址:</td>
                <td>{{edit.douban_url}}</td>
              </tr>
              <tr>
                <td>猫眼网址:</td>
                <td>{{edit.maoyan_url}}</td>
              </tr>
              <tr>
                <td>热度:</td>
                <td>{{edit.heat}}</td>
              </tr>
              <tr>
                <td>点赞数:</td>
                <td>{{edit.praises}}</td>
              </tr>
              <tr>
                <td>上线状态:</td>
                <td>{{edit.status}}</td>
              </tr>
              <tr>
                <td>备注:</td>
                <td>{{edit.notes}}</td>
              </tr>
            </table>
          </div>
          <!-- <div>
            标签信息：<a href="javascript:;" @click="showUpdateLabelInfo">修改</a>
            <table>
              <tr>
                <td>场景标签:</td>
                <td>{{edit.scene_tag}}</td>
              </tr>
              <tr>
                <td>时间标签:</td>
                <td>{{edit.time_tag}}</td>
              </tr>
              <tr>
                <td>人物标签:</td>
                <td>{{edit.role_tag}}</td>
              </tr>
              <tr>
                <td>内容描述标签:</td>
                <td>{{edit.scenario_tag}}</td>
              </tr>
              <tr>
                <td>内容描述:</td>
                <td>{{edit.scenario_desc}}</td>
              </tr>
            </table>
          </div> -->
          <div>
            播放信息：
            <Tabs v-if="edit.source.length > 0" :value="edit.source[0].id+''" @on-click="clickSubTab" type="card">
              <TabPane v-for="(item,key) in edit.source" :key="key" :label="item.src_name" :name="item.id+''">
                <table>
                  <tr>
                    <td>来源节目集ID：</td>
                    <td>{{item.src_media_id}}</td>
                    <td>来源名称：</td>
                    <td>{{item.src_name}}</td>
                  </tr>
                  <tr>
                    <td>最高清晰度：</td>
                    <td>{{item.best_resolution}}</td>
                    <td>节目特性：</td>
                    <td>{{item.play_feature}}</td>
                  </tr>
                  <tr>
                    <td>播放方式</td>
                    <td>{{item.best_resolution}}</td>
                    <td>来源详情ID:</td>
                    <td>{{item.play_feature}}</td>
                  </tr>
                </table>
                子集信息：
                <div>
                  <Table border :columns="sub_columns" :data="sub_data"></Table>
                </div>
              </TabPane>
            </Tabs>
          </div>
        </div>
        <!-- <Button style="margin-right: 8px" @click="DrawerEdit = false">取消</Button>
                    <Button type="primary" @click="DrawerEdit = false">关闭</Button> -->


        <!-- <div>别名：{{edit.alias}}</div>
                <div>别名：{{edit.alias}}</div> -->

        <div class="demo-drawer-footer">

        </div>
      </Drawer>
    </div>
    <!-- 表格  -->
    <div class="layout-product-table">
      <Table border :columns="columns1" :data="data1"></Table>
    </div>

    <Modal v-model="upPerson" title="修改导演" @on-ok="okUpPerson" :width="50">
      <Button type="primary" @click="showAddPerson">添加</Button>
      <Table border ref="upPersonSelection" :columns="columnPersons" :data="upPersonList"></Table>
    </Modal>

    <Modal v-model="addPerson" title="修改导演" @on-ok="okAddPerson" :width="50">
      <Input v-model="searchAddPersonName" search enter-button placeholder="人物名" @on-search="searchAddPerson" />
      <Table border ref="addPersonSelection" :columns="columnPersons" :data="addPersonList" @on-selection-change="selectionAddPersons"></Table>
    </Modal>

    <!-- 基础信息 -->
    <Modal v-model="showUpdateBaseInfoModel" title="修改基础信息" @on-ok="okUpdateBaseInfo" :width="50">
      <Form :model="baseInfo" label-position="right" :label-width="100">
        <FormItem label="片名:">
          <Input v-model="baseInfo.title"></Input>
        </FormItem>
        <FormItem label="又名:">
          <Input v-model="baseInfo.alias"></Input>
        </FormItem>
        <FormItem label="英文名:">
          <Input v-model="baseInfo.foreign_name"></Input>
        </FormItem>
        <FormItem label="分级信息:">
          <Input v-model="baseInfo.rating"></Input>
        </FormItem>
        <FormItem label="发行公司:">
          <Input v-model="baseInfo.company"></Input>
        </FormItem>
        <FormItem label="发行年代:">
          <Input v-model="baseInfo.release_year"></Input>
        </FormItem>
        <FormItem label="国家地区:">
          <Input v-model="baseInfo.region"></Input>
        </FormItem>
        <FormItem label="节目时长:">
          <Input v-model="baseInfo.duration"></Input>
        </FormItem>
        <FormItem label="语言:">
          <Input v-model="baseInfo.language"></Input>
        </FormItem>
        <FormItem label="官方网站:">
          <Input v-model="baseInfo.website"></Input>
        </FormItem>
        <FormItem label="上映时间:">
          <Input v-model="baseInfo.release_time"></Input>
        </FormItem>
        <FormItem label="类型标签：">
          <Row>
            <Col span="16"> 冒险
            </Col>
            <Col span="6" offset="1">
            <Button @click="updateType(baseInfo.type)">修改</Button>
            </Col>
          </Row>
        </FormItem>
        <FormItem label="系列节目名称:">
          <Input v-model="baseInfo.series_name"></Input>
        </FormItem>
        <FormItem label="全球票房:">
          <Input v-model="baseInfo.global_box_office"></Input>
        </FormItem>
        <FormItem label="中国票房:">
          <Input v-model="baseInfo.chinese_box_office"></Input>
        </FormItem>
        <FormItem label="内容来源:">
          <!-- <Input v-model="baseInfo.story_source"></Input> -->
          <Select v-model="baseInfo.story_source">
            <Option :value="1">原著改编</Option>
            <Option :value="2">网络小说改编</Option>
            <Option :value="0">不确定</Option>
          </Select>
        </FormItem>
        <FormItem label="是否翻拍:">
          <!-- <Input v-model="baseInfo.is_remade"></Input> -->
          <Select v-model="baseInfo.is_remade">
            <Option :value="0">否</Option>
            <Option :value="1">是</Option>
          </Select>
        </FormItem>
        <FormItem label="一句话点评:">
          <Input v-model="baseInfo.brief_comment" type="textarea" :rows="4"></Input>
        </FormItem>
        <FormItem label="剧情简:">
          <Input v-model="baseInfo.desc" type="textarea" :rows="4"></Input>
        </FormItem>
      </Form>
    </Modal>

    <Modal v-model="showUpdateTypeModel" title="修改标签" :width="30" @on-ok="okShowUpdateType">
      <Button type="primary" @click="showAddUpdateType">添加</Button>
      <Table border :columns="columnType1" :data="columnType1List"></Table>
    </Modal>

    <Modal v-model="showAddUpdateTypeModel" title="添加修改标签" :width="30" @on-ok="okAddUpdateType">
      <Input v-model="showAddUpdateTypeName" search enter-button placeholder="标签名" @on-search="searchAddUpdateType" />
      <Table border :columns="columnType2" :data="columnType2List" @on-selection-change="selectionAddUpdateType"></Table>
    </Modal>

    <!-- 修改子集信息 -->
    <Modal v-model="showSubUpdateBaseInfoModel" title="修改基础信息" @on-ok="okSubUpdateBaseInfo" :width="50">
      <Form :model="subBaseInfo" label-position="right" :label-width="100">
        <FormItem label="第三方子集ID:">
          <Input v-model="subBaseInfo.src_episode_id"></Input>
        </FormItem>
        <FormItem label="子集集数:">
          <Input v-model="subBaseInfo.order"></Input>
        </FormItem>
        <FormItem label="单集时长（分）:">
          <Input v-model="subBaseInfo.duration"></Input>
        </FormItem>
        <FormItem label="播放方式:">
          <Input v-model="subBaseInfo.src_episode_id"></Input>
        </FormItem>
        <FormItem label="播放ID/URL:">
          <Input v-model="subBaseInfo.src_episode_id"></Input>
        </FormItem>
        <FormItem label="子集类型:">
          <Input v-model="subBaseInfo.src_episode_id"></Input>
        </FormItem>
        <FormItem label="是否付费:">
          <Input v-model="subBaseInfo.src_episode_id"></Input>
        </FormItem>
        <FormItem label="第三方上线状态:">
          <Input v-model="subBaseInfo.src_episode_id"></Input>
        </FormItem>
        <FormItem label="上线状态:">
          <Select v-model="subBaseInfo.xstv_status">
            <Option :value="0">否</Option>
            <Option :value="1">是</Option>
          </Select>
        </FormItem>
        <FormItem label="类型标签：">
          <Row>
            <Col span="16"> {{ subBaseInfo.type }}
            </Col>
            <Col span="6" offset="1">
            <Button @click="updateSubType()">修改</Button>
            </Col>
          </Row>
        </FormItem>
        <FormItem label="剧情简介:">
          <Input v-model="subBaseInfo.src_episode_id" type="textarea" :rows="4"></Input>
        </FormItem>
        <FormItem label="创建时间:">
          <Input v-model="subBaseInfo.src_episode_id" disabled></Input>
        </FormItem>
        <FormItem label="更新时间:">
          <Input v-model="subBaseInfo.src_episode_id" disabled></Input>
        </FormItem>
      </Form>
    </Modal>

    <Modal v-model="showSubUpdateTypeModel" title="修改标签" :width="30" @on-ok="okShowSubUpdateType">
      <Button type="primary" @click="showSubAddUpdateType">添加</Button>
      <Table border :columns="columnType3" :data="columnType3List"></Table>
    </Modal>

    <Modal v-model="showSubUpdateTypeTagModel" title="修改标签" :width="30" @on-ok="okShowSubUpdateType">
      <Button type="primary" @click="showSubAddUpdateType">添加</Button>
      <Table border :columns="columnType3" :data="columnType3List"></Table>
    </Modal>

    <Modal v-model="showSubAddUpdateTypeModel" title="添加修改标签" :width="30" @on-ok="okSubAddUpdateType">
      <Input v-model="showSubAddUpdateTypeName" search enter-button placeholder="标签名" @on-search="searchSubAddUpdateType" />
      <Table border :columns="columnType5" :data="columnType5List" @on-selection-change="selectionSubAddUpdateType"></Table>
    </Modal>

    <!-- 运营信息 -->
    <Modal v-model="showUpdateOperateInfoModel" title="修改运营信息">
      <div slot="footer">
        <a @click="showUpdateOperateInfoModel=false" class="span">取消</a>
        <Button @click="okUpdateOperateInfo" type="primary">确定</Button>
      </div>
      <Form :model="edit" label-position="right" :label-width="100">
        <FormItem label="权重:">
          <Input v-model="edit.weight"></Input>
        </FormItem>
        <FormItem label="播放次数:">
          <Input v-model="edit.play_count"></Input>
        </FormItem>
        <FormItem label="原始评分:">
          <Input v-model="edit.origin_score"></Input>
        </FormItem>
        <FormItem label="豆瓣评分:">
          <Input v-model="edit.douban_score"></Input>
        </FormItem>
        <FormItem label="猫眼评分:">
          <Input v-model="edit.maoyan_score"></Input>
        </FormItem>
        <FormItem label="IMDB评分:">
          <Input v-model="edit.imdb_score"></Input>
        </FormItem>
        <FormItem label="豆瓣网址:">
          <Input v-model="edit.douban_url"></Input>
        </FormItem>
        <FormItem label="猫眼网址:">
          <Input v-model="edit.maoyan_url"></Input>
        </FormItem>
        <FormItem label="1905网址:">
          <Input v-model="edit.imdb_url"></Input>
        </FormItem>
        <FormItem label="热度:">
          <Input v-model="edit.heat"></Input>
        </FormItem>
        <FormItem label="点赞数:">
          <Input v-model="edit.praises"></Input>
        </FormItem>
        <FormItem label="上线状态:">
          <!-- <Input v-model="edit.status"></Input> -->
          <Select v-model="edit.status">
            <Option :value="0">否</Option>
            <Option :value="1">是</Option>
          </Select>
        </FormItem>
        <FormItem label="备注:">
          <Input v-model="edit.notes" type="textarea" :rows="4"></Input>
        </FormItem>
      </Form>
    </Modal>
    <!-- 标签 -->
    <Modal v-model="showUpdateLabelInfoModel" title="修改标签信息">
      <div slot="footer">
        <a @click="showUpdateLabelInfoModel=false" class="span">取消</a>
        <Button @click="okUpdateLabelInfo" type="primary">确定</Button>
      </div>
      <Form :model="edit" label-position="right" :label-width="100">
        <FormItem label="场景标签:">
          <Input v-model="edit.weight"></Input>
        </FormItem>
        <FormItem label="时间标签:">
          <Input v-model="edit.play_count"></Input>
        </FormItem>
        <FormItem label="人物标签:">
          <Input v-model="edit.origin_score"></Input>
        </FormItem>
        <FormItem label="内容描述标签:">
          <Input v-model="edit.douban_score"></Input>
        </FormItem>
        <FormItem label="内容描述:">
          <Input v-model="edit.maoyan_score"></Input>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>
<script>
  var moment = require("moment");
  export default {
    data() {
      return {
        // 修改人物
        upPerson: false,
        addPerson: false,
        upPersonList: [], // 修改人物列表
        addPersonList: [], // 添加时的人物列表
        searchAddPersonName: "", // 搜索人物列表 - 人物名称
        addPersonPage: 1, // 添加人物列表页码
        personType: 0, // 当前修改的人物类型
        selectionAddPersonsList: [], // 添加时选中的列表

        baseInfo: {}, // 修改基础信息
        showUpdateBaseInfoModel: false, // 修改基础信息弹框
        showUpdateTypeModel: false, // 修改标签弹框
        showAddUpdateTypeModel: false, // 添加标签列表

        columnType1List: [], // 修改标签列表
        columnType2List: [], // 添加标签弹框
        columnType3List: [], // 子集修改标签列表
        columnType5List: [], // 添加子集标签列表

        showSubUpdateTypeModel: false,
        showSubUpdateBaseInfoModel: false,
        showSubAddUpdateTypeModel: false,
        showSubUpdateTypeTagModel: false,
        subBaseInfo: {}, // 修改子集信息
        showSubAddUpdateTypeName: '', // 子集标签筛选

        showAddUpdateTypeName: "",
        addTypeselections: [], // 添加标签选中的行
        addSubTypeselections: [], // 子集添加标签选中的行

        showUpdateOperateInfoModel: false, //修改运营信息

        showUpdateLabelInfoModel: false, //标签


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
        data1: [],
        // 子集表头
        sub_columns: [{
          title: "来源子集ID",
          key: "episode_id"
        },
        {
          title: "子集集数",
          key: "total_episodes"
        },
        {
          title: "子集名称",
          key: "title"
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
                      this.updateSubMedia(params.row);
                    }
                  }
                },
                "子集详情"
              )
            ]);
          }
        }
        ],
        sub_data: [], // 子集列表数据
        sub_parameter: {
          pageSize: 10
        }, // 子集参数
        columnPersons: [{
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "人物id",
          key: "person_id",
          align: "center"
        },
        {
          title: "名称",
          key: "name",
          align: "center"
        },
        {
          title: "图片",
          align: "center",
          render: (h, params) => {
            return h("img", {
              attrs: {
                src: params.row.portrait
              },
              style: {
                width: "50px"
              }
            });
          }
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
        // 修改标签
        columnType1: [{
          title: "标签ID",
          key: "tag_id"
        },
        {
          title: "标签名",
          key: "tag_name"
        },
        {
          title: "排序",
          key: "rank"
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
                      this.removeTag(params.row);
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
        ],
        columnType2: [{
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "标签ID",
          key: "id"
        },
        {
          title: "标签名",
          key: "name"
        },
        {
          title: "别名",
          key: "alias"
        }
        ],
        columnType3: [{
          title: "标签ID",
          key: "tag_id"
        },
        {
          title: "标签名",
          key: "tag_name"
        },
        {
          title: "排序",
          key: "rank"
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
                      this.removeSubTag(params.row);
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
        ],
        columnType5: [{
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "标签ID",
          key: "id"
        },
        {
          title: "标签名",
          key: "name"
        },
        {
          title: "别名",
          key: "alias"
        }
        ]
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
            updateEndTime + '&directors=' + self.search.directors
          )
          .then(
            response => {
              if (response.data.errno == 10000) {
                if (typeof response.data.data.list == "undefined") {
                  return;
                }
                self.data1 = response.data.data.list;
                // 上线状态：1上线，2下线
                response.data.data.list.forEach(val => {
                  if (val.status == 1) {
                    val.ISstatus = "上线";
                  } else if (val.status == 2) {
                    val.ISstatus = "下线";
                  }
                  //时间转换
                  val.Iscreate_time = moment(val.create_time).format(
                    "YYYY-MM-DD HH:mm:ss"
                  );
                });
              } else { }
            },
            response => { }
          );
      },
      query() {
        this.getTableList();
      },
      // 显示修改
      modify(row) {
        this.$router.push({
          path: '/qqq', query: {
            id: row.id
          }
        })
        // this.DrawerEdit = true;
        // 请求修改信息
        this.$http
          .get(
            this.$config.BaseURL1 +
            "/media/v2/complete/program/detail?id=" +
            row.id
          )
          .then(
            response => {
              console.log(response);
              if (response.data.errno == 10000) {
                this.edit = response.data.data;
                if (typeof this.edit.source != 'undefined' && this.edit.source.length > 0) {
                  this.clickSubTab(this.edit.source[0].id + '');
                }


              } else {
                this.DrawerEdit = false;
                this.$Message.error(response.data.errmsg);
              }
            },
            response => {
              this.DrawerEdit = false;
              this.$Message.error("网络请求错误");
            }
          );
      },
      // 切换子集tab页
      clickSubTab(name) {
        console.log(name);
        // 查找到选中子集
        let sub = {};

        // if (typeof this.edit.source != 'unxxx') {
        //     xxx.data.list.foreach(xx => { });
        // }

        this.edit.source.forEach(val => {
          if (val.id == name) {
            sub = val;
          }
        });
        this.sub_parameter = {
          albumId: sub.xs_media_id,
          srcCode: sub.src_code,
          page: 1
        };
        console.log(sub);
        this.getSubTableList();
      },
      // 子集分页
      onSubPage(page) {
        this.sub_parameter.page = page;
        this.getSubTableList();
      },
      // 获取子集列表
      getSubTableList() {
        // srcCode=sub.src_media_id  albumId=
        this.$http
          .get(
            this.$config.BaseURL1 +
            `/media/v2/complete/program/sub/list?albumId=${
            this.edit.id
            }&srcCode=${this.sub_parameter.srcCode}&page=${
            this.sub_parameter.page
            }&pageSize=30`
          )
          .then(
            response => {
              if (response.data.errno == 10000) {
                this.sub_data = response.data.data.list;
                console.log(this.sub_data);
              } else {
                this.$Message.error(response.data.errmsg);
              }
            },
            response => {
              this.$Message.error("网络请求错误");
            }
          );
      },
      // 修改人物
      updatePerson(personType) {
        console.log(this.edit);
        this.upPerson = true;
        this.personType = personType;
        this.getUpdatePerson();
      },
      // 获取当前要修改的已存在的人物列表 - 分页时调用
      getUpdatePerson() {
        let self = this;
        this.$http
          .get(
            this.$config.BaseURL1 +
            "/media/v2/complete/program/person/list?personType=" +
            this.personType +
            "&albumId=" +
            this.edit.id
          )
          .then(
            response => {
              console.log(response);
              if (response.data.errno == 10000) {
                self.upPersonList = response.data.data.list;
                console.log(self.upPersonList);
              } else { }
            },
            response => { }
          );
      },
      // 修改人物列表
      okUpPerson() {
        console.log(this.upPersonList);
        // 请求接口保存
        let personIds = [];
        console.log(this.upPersonList);
        this.upPersonList.forEach(val => {
          personIds.push(val.person_id);
        });
        this.$http
          .post(
            this.$config.BaseURL1 + "/media/v2/complete/program/person/modify", {
              albumId: this.edit.id,
              personIds: personIds,
              personType: this.personType
            }
          )
          .then(
            response => {
              console.log(response);
              if (response.data.errno == 10000) {
                this.$Message.info("保存成功");
                this.getUpdatePerson();
              } else {
                this.$Message.info(response.data.errmsg);
              }
            },
            response => { }
          );
      },
      // 添加人物
      showAddPerson() {
        this.addPerson = true;
        this.searchAddPersonName = "";
        this.addPersonPage = 1;
        this.getAddPersonList();
      },
      // 添加人物确定
      okAddPerson() {
        // ## 此处需要去重
        this.selectionAddPersonsList.forEach(val => {
          let isExt = false;
          this.upPersonList.forEach(v => {
            if (v.person_id == val.person_id) {
              isExt = true;
              console.log("dddd");
            }
          });
          if (isExt == false) {
            this.upPersonList.push(val);
          }
        });
        // this.upPersonList = this.upPersonList.concat(this.selectionAddPersonsList);
        console.log(this.upPersonList);
      },
      // 搜索人物
      searchAddPerson() {
        this.addPersonPage = 1;
        this.getAddPersonList();
      },
      // 获取人物列表
      getAddPersonList() {
        let name = this.searchAddPersonName || "";
        // 请求人物列表
        this.$http
          .get(
            this.$config.BaseURL1 +
            "/media/v2/person/list?name=" +
            name +
            "&page=" +
            this.addPersonPage
          )
          .then(
            response => {
              if (response.data.errno == 10000) {
                this.addPersonList = response.data.data.list;
              } else {
                // 提示 response.data.errmsg
                this.$Message.info(response.data.errmsg);
              }
            },
            response => {
              this.$Message.error("请求人物列表错误：" + response);
            }
          );
      },
      // 人物选中
      selectionAddPersons(selections) {
        console.log(selections);
        this.selectionAddPersonsList = selections || [];
      },
      // 显示基础信息修改弹框
      showUpdateBaseInfo() {
        this.showUpdateBaseInfoModel = true;
        console.log(this.edit);
        this.baseInfo = this.edit;
        this.baseInfo.albumId = this.edit.id;
        //  {
        //   albumId: this.edit.id,
        //   title: this.edit.title,
        //   type: this.edit.type
        // };
      },
      // 基础信息确定按钮
      okUpdateBaseInfo() {
        this.$http.post(`${this.$config.BaseURL1}/media/v2/complete/program/base/modify`, this.baseInfo).then(response => {
          if (response.data.errno == 10000) {
            this.showUpdateBaseInfoModel = false;
          } else {
            this.$Message.info(response.data.errmsg);
          }
        }, response => {
          // this.$Message.error("请求错误：" + response);
        });
      },
      // 基础信息 类型标签 修改按钮
      updateType() {
        this.showUpdateTypeModel = true;
        this.columnType1List = [];
        // 查询该节目的标签列表 columnType1List
        this.$http
          .get(
            this.$config.BaseURL1 +
            "/media/v2/complete/program/tag/list?albumId=" +
            this.baseInfo.albumId
          )
          .then(
            response => {
              if (response.data.errno == 10000) {
                this.columnType1List = response.data.data.list;
                // 更新标签列表
                let typeList = [];
                this.columnType1List.forEach(val => {
                  typeList.push(val.tag_name);
                });
                this.baseInfo.type = typeList.join(";");
                console.log(this.baseInfo)
                // this.baseInfo.forEach((v,k) => {
                //   this.edit[k] = v;
                // });
                console.log(this.baseInfo.type);
              } else {
                this.$Message.info(response.data.errmsg);
              }
            },
            response => {
              this.$Message.error("请求错误：" + response);
            }
          );
      },
      // 添加标签
      showAddUpdateType() {
        this.showAddUpdateTypeModel = true;
        this.showAddUpdateTypeName = "";
        this.getShowAddUpdateTypeList();
      },
      // 过滤添加标签列表
      searchAddUpdateType() {
        this.getShowAddUpdateTypeList();
      },
      // 获取要添加的标签列表
      getShowAddUpdateTypeList() {
        this.$http
          .get(
            this.$config.BaseURL1 +
            "/media/v2/tag/list?name=" +
            this.showAddUpdateTypeName
          )
          .then(
            response => {
              if (response.data.errno == 10000) {
                this.columnType2List = response.data.data.list;
              } else {
                this.$Message.info(response.data.errmsg);
              }
            },
            response => {
              this.$Message.error("请求错误：" + response);
            }
          );
      },
      // 添加表格复选框选中
      selectionAddUpdateType(selections) {
        this.addTypeselections = selections;
      },
      okAddUpdateType() {
        this.addTypeselections.forEach(val => {
          let isExt = false;
          this.columnType1List.forEach(v => {
            if (v.tag_id == val.id) {
              isExt = true;
              console.log("dddd");
            }
          });
          if (isExt == false) {
            this.columnType1List.push({
              tag_id: val.id,
              tag_name: val.name
            });
          }
        });
      },
      // 确定修改标签列表
      okShowUpdateType() {
        // 11.1.1.7
        let tagIds = [];
        this.columnType1List.forEach(val => {
          tagIds.push(val.tag_id);
        });
        let body = {
          albumId: this.baseInfo.albumId,
          tagIds: tagIds
        }
        // console.log(tagIds)
        this.$http.post(`${this.$config.BaseURL1}/media/v2/complete/program/tag/modify`, body).then(response => {
          if (response.data.errno == 10000) {
            this.updateType();
            this.showUpdateTypeModel = false;
          } else {
            this.$Message.info(response.data.errmsg);
          }
        }, response => {
          console.log(response)
          // this.$Message.error("请求错误：" + response);
        });
      },
      // 删除标签
      removeTag(row) {
        console.log(row);
        let newTagList = [];
        this.columnType1List.forEach(val => {
          if (val.tag_id != row.tag_id) {
            newTagList.push(val);
          }
        });
        this.columnType1List = newTagList;
        let typeList = [];
        this.columnType1List.forEach(val => {
          typeList.push(val.tag_name);
        });
        this.baseInfo.type = typeList.join(";");
        console.log(this.baseInfo.type);

        // this.$http.post(`${this.$config.BaseURL1}/media/v2/complete/program/tag/delete`,{
        //   albumId:this.baseInfo.albumId,
        //   tagId:row.tag_id
        // }).then(response=>{
        //     if (response.data.errno == 10000) {
        //       this.$Message.info("ok");
        //       this.updateType();
        //     } else {
        //       this.$Message.info(response.data.errmsg);
        //     }
        // },response=>{
        //   // this.$Message.error("请求错误：" + response);
        // });
      },



      /* 子集信息操作 */
      updateSubMedia(row) {
        console.log(row)
        this.showSubUpdateBaseInfoModel = true;
        // 请求列表
        this.$http.get(
          `${this.$config.BaseURL1}/media/v2/complete/program/sub/detail?episode_id=${row.episode_id}&src_code=${this.sub_parameter.srcCode}`
        ).then(
          response => {
            if (response.data.errno == 10000) {
              this.subBaseInfo = response.data.data;
            } else {
              this.$Message.info(response.data.errmsg);
            }
          }, response => {

          });
      },

      // 修改子集信息中修改标签
      updateSubType() {
        this.showSubUpdateTypeTagModel = true;
        // 请求列表
        this.$http.get(
          `${this.$config.BaseURL1}/media/v2/complete/program/sub/tag/list?episode_id=${this.subBaseInfo.episode_id}`
        ).then(
          response => {
            if (response.data.errno == 10000) {
              this.columnType3List = response.data.data.list;
            } else {
              this.$Message.info(response.data.errmsg);
            }
          }, response => {

          });
      },

      // 保存子集信息 11.1.2.3 子集编辑接口
      okSubUpdateBaseInfo() {
        this.$http.post(`${this.$config.BaseURL1}/media/v2/complete/program/sub/modify`, this.subBaseInfo).then(
          response => {
            if (response.data.errno == 10000) {
              this.showSubUpdateTypeTagModel = false;
            } else {
              this.$Message.info(response.data.errmsg);
            }
          }, response => {
            // this.$Message.error("请求错误：" + response);
          });
      },

      // 保存子集标签列表
      okShowSubUpdateType() {
        console.log(this.subBaseInfo);
        let tagIds = [];
        this.columnType3List.forEach(val => {
          tagIds.push(val.tag_id);
        });
        // 请求列表
        this.$http.post(`${this.$config.BaseURL1}/media/v2/complete/program/sub/tag/modify`, {
          episode_id: this.subBaseInfo.episode_id,
          tagIds: tagIds,
          src_code: this.sub_parameter.srcCode
        }).then(response => {
          if (response.data.errno == 10000) {
            this.$Message.info(`保存成功:${response.data.data.count}`);
          } else {
            this.$Message.info(response.data.errmsg);
          }
        }, response => {

        });
      },
      // 添加子集标签
      showSubAddUpdateType() {
        this.showSubAddUpdateTypeModel = true;
        this.showSubAddUpdateTypeName = '';
        this.getShowSubAddUpdateType();
      },
      searchSubAddUpdateType() {
        this.getShowSubAddUpdateType();
      },
      getShowSubAddUpdateType() {
        this.$http
          .get(
            this.$config.BaseURL1 +
            "/media/v2/tag/list?name=" +
            this.showSubAddUpdateTypeName
          )
          .then(
            response => {
              if (response.data.errno == 10000) {
                this.columnType5List = response.data.data.list;
              } else {
                this.$Message.info(response.data.errmsg);
              }
            },
            response => {
              // this.$Message.error("请求错误：" + response);
            }
          );
      },
      okSubAddUpdateType() {
        this.addSubTypeselections.forEach(val => {
          let isExt = false;
          this.columnType3List.forEach(v => {
            if (v.tag_id == val.id) {
              isExt = true;
              console.log("eeee");
            }
          });
          if (isExt == false) {
            this.columnType3List.push({
              tag_id: val.id,
              tag_name: val.name
            });
          }
        });
      },
      selectionSubAddUpdateType(selections) {
        console.log(selections)
        this.addSubTypeselections = selections;
      },
      removeSubTag(row) {
        console.log(row);
        let newTagList = [];
        this.columnType3List.forEach(val => {
          if (val.tag_id != row.tag_id) {
            newTagList.push(val);
          }
        });
        this.columnType3List = newTagList;

      },

      //显示运营信息修改弹框
      showUpdateOperateInfo() {
        this.showUpdateOperateInfoModel = true;
      },
      // 运营信息确定按钮
      okUpdateOperateInfo() {
        let self = this;
        this.edit.weight = this.edit.weight * 1;
        self.edit.albumId = self.edit.id;
        self.$http.post(this.$config.BaseURL1 + '/media/v2/complete/program/operate/modify', self.edit).then(
          response => {
            if (response.data.errno == 10000) {
              this.showUpdateOperateInfoModel = false;
              this.$Message.success('修改成功！')
            } else { }
          },
          response => { })
      },
      showUpdateLabelInfo() {
        this.showUpdateLabelInfoModel = true;

      },
      okUpdateLabelInfo() { }
    },
    mounted() {
      this.getTableList();
    }
  };

</script>
<style scoped>
  table td {
    border: 1px solid #cccccc;
  }
</style>