<style>
  .layout-special-search{
    float: left;
    }
    .layout-special-add{
    float: right;
    }
    .layout-special-page{
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
    .layout-special .ivu-poptip-confirm .ivu-poptip-body .ivu-icon {
        font-size: 16px;
        color: #ff9900;
        line-height: 18px;
        position: absolute;
        margin-left: -50px;
    }
</style>
<template>
  <div class="layout-special">
    <div class="layout-special-search">
      <Form :model="specialSearch" inline>
        <FormItem label="专题名称:" :label-width="70">
          <Input v-model="specialSearch.wrap_title" style="width:200px" placeholder="请输入专题名称..."></Input>
        </FormItem>
        <FormItem label="专题类型:" :label-width="70">
          <!-- 1横版，2竖版，3竖版带布局 -->
          <Select v-model="specialSearch.type" style="width:200px" placeholder="请选择专题类型...">
            <Option :value="1">横版专题</Option>
            <Option :value="2">竖版专题</Option>
            <Option :value="3">竖版-带布局</Option>
          </Select>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="specialQuery">搜索</Button>
        </FormItem>
      </Form>
    </div>
    <!-- 专题添加 -->
    <div class="layout-special-add">
      <Button type="success" @click="modalThemeAddBtn">添加</Button>
      <Modal v-model="modalThemeAdd" title="添加专题" width="600">
        <div slot="footer">
          <a @click="addThemeCancel" class="span">取消</a>
          <Button @click="addThemeOk" type="primary">确定</Button>
        </div>
        <Form :model="themeInfo" label-position="right" :label-width="120">
          <FormItem label="专题名称:">
            <Input v-model="themeInfo.wrap_title" placeholder="请输入专题名称..."></Input>
          </FormItem>
          <!-- 是否关联新视标签 1是、0否  -->
          <FormItem label="是否关联新视标签:">
            <RadioGroup v-model="themeInfo.tag_relate">
              <Radio :label="1">是</Radio>
              <Radio :label="0">否</Radio>
            </RadioGroup>
          </FormItem>
          <FormItem label="新视标签:" v-if="themeInfo.tag_relate ==1">
            <Input v-model="themeInfo.tag_name"></Input>
            <Button type="primary" size="small" @click="modalXstvTag = true;getTagTreelist()">选择</Button>
          </FormItem>
          <FormItem label="专题类型:" v-if="themeInfo.tag_relate ==1">
            <Select v-model="themeInfo.type">
              <Option :value="1">横版专题</Option>
              <Option :value="2">竖版专题</Option>
            </Select>
          </FormItem>
          <FormItem label="专题类型:" v-if="themeInfo.tag_relate ==0">
            <Select v-model="themeInfo.type">
              <Option :value="1">横版专题</Option>
              <Option :value="2">竖版专题</Option>
              <Option :value="3">竖版-带布局</Option>
            </Select>
          </FormItem>
          <FormItem label="专题图:">
            <Upload :action="$config.BaseURLfile + '/common/upload/file'" ref="upload" :on-success="handleSuccess"
              :format="['jpg','jpeg','png']" :max-size="2048" :on-format-error="handleFormatError" :on-exceeded-size="handleMaxSize"
              :with-credentials="true">
              <Button icon="ios-cloud-upload-outline">上传专题图</Button>
            </Upload>
          </FormItem>
          <FormItem label="专题背景图:">
            <Upload :action="$config.BaseURLfile + '/common/upload/file'" ref="upload1" :on-success="handleSuccess1"
              :format="['jpg','jpeg','png']" :max-size="2048" :on-format-error="handleFormatError1" :on-exceeded-size="handleMaxSize1"
              :with-credentials="true">
              <Button icon="ios-cloud-upload-outline">上传专题背景图</Button>
            </Upload>
          </FormItem>
          <FormItem label="描述:">
            <Input v-model="themeInfo.desc" type="textarea" :rows="4" placeholder="请输入描述..."></Input>
          </FormItem>
          <!-- <div v-if="themeInfo.tag_relate !=1">
            <p>
              自动关联内容
            </p>
            <p style="border-bottom:1px solid #ccc;margin-bottom:5px;"></p>
            <FormItem inline>
              <Select v-model="themeInfo.model1" style="width:120px">
                <Option v-for="item in cityList" :value="item.attr_name" :key="item.attr_name">{{
                  item.attr_name }}</Option>
              </Select>
              <Select v-model="themeInfo.model1" style="width:120px;margin-left: 5px;">
                <Option v-for="item in cityList1" :value="item.value" :key="item.value">{{ item.label
                  }}</Option>
              </Select>
              <Input placeholder="请输入值..." style="width: 150px;margin-left: 5px;" />
              <Button icon="ios-close"></Button>
            </FormItem>
          </div> -->
        </Form>
      </Modal>
    </div>
    <!-- 专题修改 -->
    <Modal v-model="modalThemeEdit" title="修改">
      <div slot="footer">
        <a @click="editThemeCancel" class="span">取消</a>
        <Button @click="editThemeOk" type="primary">确定</Button>
      </div>
      <Form :model="themeEdit" label-position="right" :label-width="120">
        <FormItem label="专题名称:">
          <Input v-model="themeEdit.wrap_title"></Input>
        </FormItem>
        <FormItem label="是否关联新视标签:">
          <Input v-model="themeEdit.is_tag_relate" disabled></Input>
        </FormItem>
        <!-- 1是、0否 -->
        <FormItem label="新视标签:" v-if="themeEdit.tag_relate == 1">
          <Input v-model="themeEdit.tag_name"></Input>
          <Button type="primary" size="small" @click="modalXstvTag = true;getTagTreelist()">选择</Button>
        </FormItem>
        <FormItem label="专题类型:">
          <Input v-model="themeEdit.is_type" disabled></Input>
        </FormItem>
        <FormItem label="专题图:">
          <Upload :action="$config.BaseURLfile + '/common/upload/file'" ref="upload" :on-success="handleSuccess2"
            :format="['jpg','jpeg','png']" :max-size="2048" :on-format-error="handleFormatError" :on-exceeded-size="handleMaxSize"
            :with-credentials="true">
            <Button icon="ios-cloud-upload-outline">上传专题图</Button>
          </Upload>
        </FormItem>
        <FormItem label="专题背景图:">
          <Upload :action="$config.BaseURLfile + '/common/upload/file'" ref="upload1" :on-success="handleSuccess3"
            :format="['jpg','jpeg','png']" :max-size="2048" :on-format-error="handleFormatError1" :on-exceeded-size="handleMaxSize1"
            :with-credentials="true">
            <Button icon="ios-cloud-upload-outline">上传专题背景图</Button>
          </Upload>
        </FormItem>
        <FormItem label="描述:">
          <Input v-model="themeEdit.desc" type="textarea" :rows="4"></Input>
        </FormItem>
      </Form>
    </Modal>
    <!-- 新视标签 -->
    <Modal v-model="modalXstvTag" title="新视标签">
      <Tree :data="data4" show-checkbox multiple @on-check-change="treeChange"></Tree>
    </Modal>
    <div style="clear:both;"></div>
    <div class="layout-special-table">
      <Table border :columns="columns1" :data="data1"></Table>
    </div>
    <!-- 专题分页 -->
    <div class="layout-special-page">
      <Page :total="total" :current="page" :page-size='pageSize' @on-change="changePage" show-elevator />
    </div>
    <!-- 专题管理 -->
    <Modal v-model="modalThematicAdd" title="专题管理" :width="1015">
      <div>
        <Form :model="ThematicInfo" :label-width="70">
          <FormItem label="专题名称:">
            <Input v-model="ThematicInfo.wrap_title" disabled></Input>
          </FormItem>
          <FormItem label="专题类型:">
            <Input v-model="ThematicInfo.type_desc" disabled></Input>
          </FormItem>
        </Form>
        <p style="display:block;border-bottom:1px solid #eeeeee;margin-left:10px;">专题布局</p>

        <!-- 设置弹框 -->
        <!-- 内容维护弹框结束 -->
        <Modal v-model="modalSetUp" title="设置" @on-ok="okSetUpEdit" width="800">
          <Form :model="modalSetUpEdit" label-position="right" :label-width="100">
            <FormItem label="是否展现标题:">
              <RadioGroup v-model="modalSetUpEdit.show_title">
                <Radio :label="1">隐藏标题</Radio>
                <Radio :label="0">显示标题</Radio>
              </RadioGroup>
            </FormItem>
            <FormItem label="标题名称:">
              <Input v-model="modalSetUpEdit.wrap_sub_title"></Input>
            </FormItem>
            <FormItem label="状态:">
              <Select v-model="modalSetUpEdit.wrap_sub_status">
                <Option :value="1" key="1">上线</Option>
                <Option :value="0" key="0">下线</Option>
              </Select>
            </FormItem>
          </Form>
          <div>
            <div style="margin:0px 100px;">
                <Row v-for="(c, ck) in setUpConditions" :key="ck" :gutter="36">
                    <Col span="6">
                    <Select v-model="c.field_name" style="width:150px">
                      <Option value="publish_year" key="publish_year">年代</Option>
                    </Select>
                    </Col>
                    <Col span="6">
                    <Select v-model="c.attr_ops" style="width:150px">
                      <Option value="=" key="=">等于</Option>
                    </Select>
                    </Col>
                    <Col span="6">
                    <Input v-model="c.value" placeholder="值" style="width:150px" />
                    </Col>
                    <Col span="6">
                    <Button @click="delSetUpCondition(ck)">X</Button>
                    </Col>
                  </Row>
            </div>
            <Button type="primary" @click="addSetUpCondition" v-if="modalSetUpEdit.has_topic == 1" style="margin: 5px 100px;">添加条件</Button>
          </div>
        </Modal>
        <!-- end 设置弹框 -->

        <Modal v-model="modalSpecialContent" title="内容维护" width="1000">
          <!-- 1.16 -->
          <!-- 搜索 -->
          <div style="float:left;">
            <Form :model="specialContentSearch" inline>
              <FormItem label="节目名称:" :label-width="70">
                <Input v-model="specialContentSearch.title" placeholder="请输入节目名称..."></Input>
              </FormItem>
              <FormItem label="导演:" :label-width="40">
                <Input v-model="specialContentSearch.director" placeholder="请输入导演..."></Input>
              </FormItem>
              <FormItem label="年代:" :label-width="40">
                <Input v-model="specialContentSearch.year" placeholder="请输入年代..."></Input>
              </FormItem>
              <FormItem>
                <Button type="primary" @click="specialContentQuery">搜索</Button>
              </FormItem>
            </Form>
          </div>
          <!-- 添加 -->
          <div style="float:right;">
            <Button type="success" @click="specialContentAddBtn()">添加</Button>
            <Modal v-model="specialContentAdd" title="添加" width="1000">
              <div slot="footer">
                <Button @click="modalspecialContentAddCancel" class="btnSpan">取消</Button>
                <Button @click="modalspecialContentAddOk" type="primary">确定</Button>
              </div>
              <div>
                <Form :model="specialContentAddSearch" inline>
                  <FormItem label="节目名称:" :label-width="70">
                    <Input v-model="specialContentAddSearch.title" placeholder="请输入节目名称..."></Input>
                  </FormItem>
                  <FormItem label="年代:" :label-width="40">
                    <Input v-model="specialContentAddSearch.year" placeholder="请输入年代..."></Input>
                  </FormItem>
                  <FormItem label="导演:" :label-width="40">
                    <Input v-model="specialContentAddSearch.director" placeholder="请输入导演..."></Input>
                  </FormItem>
                  <FormItem>
                    <Button type="primary" @click="specialContentAddQuery">搜索</Button>
                  </FormItem>
                </Form>
              </div>
              <Table border :columns="columns7" :data="data7" @on-selection-change="checkBoxlist1"></Table>
              <div class="layout-special-page">
                <Page :total="total5" :current="page5" :page-size='pageSize5' @on-change="changePage5" show-elevator />
              </div>
              <div style="margin-top:30px;"></div>
            </Modal>
          </div>
          <!-- 修改 -->
          <Modal v-model="modalSpecialContentEdit" title="修改">
            <div slot="footer">
              <a @click="specialContentBtn" class="span">取消</a>
              <Button @click="okSpecialContentEdit" type="primary">确定</Button>
            </div>
            <Form :model="specialContentEdit" label-position="right" :label-width="100">
              <FormItem label="排序id:">
                <Input v-model="specialContentEdit.rank"></Input>
              </FormItem>
            </Form>
          </Modal>
          <div style="clear:both;"></div>
          <Table border :columns="columns6" :data="data6"></Table>
          <div class="layout-special-page">
            <Page :total="total4" :current="page4" :page-size='pageSize4' @on-change="changePage4" show-elevator />
          </div>
          <div style="margin-top:30px;"></div>
          <!-- 1.16 -->
        </Modal>
        <!-- end 内容维护弹框结束 -->
        <div v-for="(item, itemKey) in wrap_sub_idList" :key="itemKey">
          <p style="margin:10px;">
            <Row :gutter="10">
              <Col span="18">
              {{item.wrap_sub_title}}
              </Col>
              <Col span="2">
              <Button @click="modalSpecialContent = true;getthematicList(item)" size="small" v-if="item.has_topic == 1">内容维护</Button>
              </Col>
              <!-- 设置标题 -->
              <Col span="1"><Button size="small" @click="onSetUp(item)">设置</Button></Col>
              <Col span="1"><Button size="small" @click="moveListUp(itemKey)">上移</Button></Col>
              <Col span="1"><Button size="small" @click="moveListDown(itemKey)">下移</Button></Col>
              <!-- 1.17 -->
              <Col span="1"><Button size="small" @click="specialTemplateDelete(item)">删除</Button></Col>
            </Row>
            <div style="width:100%;height:180px;background-color:#eeeeee;padding:10px;" v-if="item.layout_id == 13">
              <p style="width:150px;height:150px;background-color:#fff;float: left;margin:5px;"></p>
              <p style="width:150px;height:150px;background-color:#fff;float: left;margin:5px;"></p>
              <p style="width:150px;height:150px;background-color:#fff;float: left;margin:5px;"></p>
              <p style="width:150px;height:150px;background-color:#fff;float: left;margin:5px;"></p>
              <p style="width:150px;height:150px;background-color:#fff;float: left;margin:5px;"></p>
              <p style="width:150px;height:150px;background-color:#fff;float: left;margin:5px;"></p>
            </div>
            <div style="width:100%;height:180px;background-color:#eeeeee;padding:10px;" v-if="item.layout_id == 16">
              <p style="width:150px;height:150px;background-color:#fff;float: left;margin:5px;"></p>
              <p style="width:150px;height:150px;background-color:#fff;float: left;margin:5px;"></p>
              <p style="width:150px;height:150px;background-color:#fff;float: left;margin:5px;"></p>
              <p style="width:150px;height:150px;background-color:#fff;float: left;margin:5px;"></p>
              <p style="width:150px;height:150px;background-color:#fff;float: left;margin:5px;"></p>
              <p style="width:150px;height:150px;background-color:#fff;float: left;margin:5px;"></p>
            </div>
          </p>
        </div>
      </div>
      <!-- 添加布局  -->
      <p style="display:block;text-align: center;font-size: 16px;margin-top:20px;">
        <Button @click="addTemplate = true"><Icon type="ios-add"/>添加布局</Button>
        <Modal v-model="addTemplate" title="选择布局" width="1100" @on-ok="okAddTemplate">
          <RadioGroup v-model="single">
            <Tabs value="name1">
              <TabPane label="空白布局" name="name1">
                <p>

                </p>
                <Row>
                  <div style="width:100%;height:180px;background-color:#eeeeee;padding:10px;">
                    <Col span="2">
                    <div style="line-height:150px;">
                      <Radio :label="13"><span></span></Radio>
                    </div>
                    </Col>
                    <Col span="22">
                    <p style="width:150px;height:150px;background-color:#fff;float: left;margin:5px;"></p>
                    <p style="width:150px;height:150px;background-color:#fff;float: left;margin:5px;"></p>
                    <p style="width:150px;height:150px;background-color:#fff;float: left;margin:5px;"></p>
                    <p style="width:150px;height:150px;background-color:#fff;float: left;margin:5px;"></p>
                    <p style="width:150px;height:150px;background-color:#fff;float: left;margin:5px;"></p>
                    <p style="width:150px;height:150px;background-color:#fff;float: left;margin:5px;"></p>
                    </Col>
                  </div>

                </Row>
              </TabPane>
              <TabPane label="推荐内容布局" name="name2">
                <p>
                  标题:xxxx
                </p>
                <Row>
                  <div style="width:100%;height:180px;background-color:#eeeeee;padding:10px;">
                    <Col span="2">
                    <div style="line-height:150px;">
                      <Radio :label="16"><span></span></Radio>
                    </div>
                    </Col>
                    <Col span="22">
                    <p style="width:150px;height:150px;background-color:#fff;float: left;margin:5px;"></p>
                    <p style="width:150px;height:150px;background-color:#fff;float: left;margin:5px;"></p>
                    <p style="width:150px;height:150px;background-color:#fff;float: left;margin:5px;"></p>
                    <p style="width:150px;height:150px;background-color:#fff;float: left;margin:5px;"></p>
                    <p style="width:150px;height:150px;background-color:#fff;float: left;margin:5px;"></p>
                    <p style="width:150px;height:150px;background-color:#fff;float: left;margin:5px;"></p>
                    </Col>
                  </div>

                </Row>
              </TabPane>
            </Tabs>
          </RadioGroup>
        </Modal>
      </p>
    </Modal>
    <!-- 内容维护 -->
    <Modal v-model="modalMaintenance" title="内容维护" :width="1000">
      <div style="float:left">
        <Form :model="maintenanceSearch" inline>
          <FormItem label="节目名称:" :label-width="70">
            <Input v-model="maintenanceSearch.title" placeholder="请输入节目名称..."></Input>
          </FormItem>
          <FormItem label="年代:" :label-width="40">
            <Input v-model="maintenanceSearch.year" placeholder="请输入年代..."></Input>
          </FormItem>
          <FormItem label="导演:" :label-width="40">
            <Input v-model="maintenanceSearch.director" placeholder="请输入导演..."></Input>
          </FormItem>
          <FormItem>
            <Button type="primary" @click="maintenanceQuery">搜索</Button>
          </FormItem>
        </Form>
      </div>
      <div style="float:right">
        <Button type="success" @click="modalMaintenanceAdd = true;getContentList()">添加</Button>
        <Modal v-model="modalMaintenanceAdd" title="添加" :width="1000">
          <div slot="footer">
            <Button @click="modalMaintenanceAddCancel" class="btnSpan">取消</Button>
            <Button @click="modalMaintenanceAddOk" type="primary">确定</Button>
          </div>
          <Form :model="ContentAddSearch" inline>
            <FormItem label="节目名称:" :label-width="70">
              <Input v-model="ContentAddSearch.title" placeholder="请输入节目名称..."></Input>
            </FormItem>
            <FormItem label="年代:" :label-width="50">
              <Input v-model="ContentAddSearch.year" placeholder="请输入年代..."></Input>
            </FormItem>
            <FormItem label="导演:" :label-width="50">
              <Input v-model="ContentAddSearch.director" placeholder="请输入导演..."></Input>
            </FormItem>
            <FormItem>
              <Button type="primary" @click="contentAddQuery">搜索</Button>
            </FormItem>
          </Form>
          <Table border :columns="columns3" :data="data3" @on-selection-change="checkBoxlist"></Table>
          <div class="layout-special-page">
            <Page :total="total2" :current="page2" :page-size='pageSize2' @on-change="changePage2" show-elevator />
          </div>
          <div style="margin-top:30px;"></div>
        </Modal>
      </div>
      <Table border :columns="columns2" :data="data2" style="clear:both;"></Table>
      <div class="layout-special-page">
        <Page :total="total1" :current="page1" :page-size='pageSize1' @on-change="changePage1" show-elevator />
      </div>
      <div style="margin-top:30px;"></div>
      <!-- 内容维护修改 -->
      <Modal v-model="modalMaintenanceEdit" title="修改">
        <div slot="footer">
          <Button @click="modalMaintenanceEditCancel" class="btnSpan">取消</Button>
          <Button @click="modalMaintenanceEditOk" type="primary">确定</Button>
        </div>
        <Form :model="maintenanceEdit" label-position="right" :label-width="100">
          <FormItem label="排序">
            <Input v-model="maintenanceEdit.rank"></Input>
          </FormItem>
        </Form>
      </Modal>
    </Modal>
    <!-- 内容查看 -->
    <Modal v-model="modalView" title="内容查看" width="1000">
      <div>
        <Form :model="modalViewSearch" inline>
          <FormItem label="节目名称:" :label-width="70">
            <Input v-model="modalViewSearch.title" placeholder="请输入节目名称..."></Input>
          </FormItem>
          <FormItem label="年代:" :label-width="40">
            <Input v-model="modalViewSearch.year" placeholder="请输入年代..."></Input>
          </FormItem>
          <FormItem>
            <Button type="primary" @click="modalViewQuery">搜索</Button>
          </FormItem>
        </Form>
      </div>
      <Table border :columns="columns5" :data="data5"></Table>
      <div class="layout-special-page">
        <Page :total="total3" :current="page3" :page-size='pageSize3' @on-change="changePage3" show-elevator />
      </div>
      <div style="margin-top:30px;"></div>
    </Modal>
  </div>
</template>
<script>
  var moment = require("moment");
  export default {
    data() {
      return {
        addUploadUrl: '', //保存图片
        specialSearch: {
          wrap_title: '',
          type: ''
        }, //搜索
        cityList: [],
        cityList1: [],
        themeInfo: {
          tag_relate: 0
        },
        modalThemeAdd: false, //添加
        themeEdit: {},
        wrap_id: '', //修改的专题id
        wrap_idlist: '', //内容维护的专题id
        modalThemeEdit: false, //修改
        ThematicInfo: {},
        modalThematicAdd: false, //专题管理
        addTemplate: false, //添加布局快
        modalMaintenance: false, //内容维护
        modalMaintenanceAdd: false, //内容维护添加
        maintenanceEdit: {},
        modalMaintenanceEdit: false, //内容维护修改
        //保存所有添加
        GroupList: [],
        topic_id: '', //topicid
        topic_id1: '',
        ContentAddSearch: {
          title: '',
          year: '',
          director: ''
        }, //内容维护添加搜索
        maintenanceSearch: {
          title: '',
          year: '',
          director: ''
        }, //内容维护搜索

        modalView: false, //内容查看
        modalViewSearch: {
          title: '',
          year: ''
        }, //内容查看搜索
        wrap_id_view: '',//内容查看专题id


        modalSpecialContent: false,//专题管理内容维护
        is_wrap_id: '',// 专题id
        wrap_sub_id: '',//标题id
        wrap_sub_idList: [],//专题
        modalSetUpEdit: {},
        modalSetUp: false,//专题管理设置弹框
        setUpConditions: [], // 关联规则列表

        // 1.16
        specialContentSearch: {
          title: '',
          director: '',
          year: ''
        },//专题管理内容维护搜索
        GroupList1: [],
        specialContentAdd: false,//专题管理内容维护 添加
        specialContentEdit: {},
        modalSpecialContentEdit: false,//专题管理内容维护 修改
        specialContentAddSearch: {
          title: '',
          year: '',
          director: ''
        },//专题管理内容维护 添加搜索
        wrap_sub_idAdd: '',//添加标签id
        page4: 1,
        pageSize4: 30,
        total4: 0, //专题管理内容维护分页

        page5: 1,
        pageSize5: 30,
        total5: 0, //专题管理内容维护添加分页


        // 内容维护保存item
        getthematicListItem: {},


        // 1.16

        single: 0,
        page: 1,
        pageSize: 30,
        total: 0, //专题分页

        page1: 1,
        pageSize1: 30,
        total1: 0, //内容维护分页

        page2: 1,
        pageSize2: 30,
        total2: 0, //内容维护添加分页

        page3: 1,
        pageSize3: 30,
        total3: 0, //内容查看分页

        columns1: [

          {
            title: 'ID',
            key: 'wrap_id',
            width: 60,
            align: 'center'
          },
          {
            title: '专题名称',
            key: 'wrap_title',
            align: 'center'
          },
          {
            title: '专题类型',
            key: 'is_type',
            align: 'center'
          },
          {
            title: '专题图',
            key: 'wrap_img',
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('img', {
                  attrs: {
                    src: params.row.wrap_img
                  },
                  style: {
                    width: '50px',
                    height: '50px',
                    marginTop: '5px'
                  }
                }),
              ]);
            }
          },
          {
            title: '新视标签',
            key: 'tag_name',
            align: 'center'
          },
          {
            title: '状态',
            key: 'is_status',
            align: 'center'
          },
          {
            title: '创建时间',
            key: 'Iscreate_time',
            align: 'center'
          },
          {
            title: '描述',
            key: 'desc',
            align: 'center'
          },
          {
            title: '操作',
            align: 'center',
            width: 260,
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
                      // 1横版，2竖版，3竖版带布局
                      if (params.row.type == 1) {
                        if (params.row.tag_relate == 0) {
                          this.maintenance(params.row)
                        } else if (params.row.tag_relate == 1) {
                          this.contentView(params.row);
                        }
                      } else if (params.row.type == 2) {
                        if (params.row.tag_relate == 0) {
                          this.maintenance(params.row)
                        } else if (params.row.tag_relate == 1) {
                          this.contentView(params.row);
                        }
                      } else if (params.row.type == 3) {
                        this.thematic(params.row)
                      }
                    }
                  }
                }, function () {
                  console.log(params.row)
                  if (params.row.type == 1) {
                    if (params.row.tag_relate == 0) {
                      return '内容维护';
                    } else if (params.row.tag_relate == 1) {
                      return '内容查看';
                    }
                  } else if (params.row.type == 2) {
                    if (params.row.tag_relate == 0) {
                      return '内容维护';
                    } else if (params.row.tag_relate == 1) {
                      return '内容查看';
                    }
                  } else if (params.row.type == 3) {
                    return '专题管理';
                  }
                }()),
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
              ]);
            }
          }
        ],
        data1: [],
        columns2: [

          {
            title: 'ID',
            key: 'topic_id',
            width: 60,
            align: 'center'
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
            title: '排序',
            key: 'rank',
            align: 'center'
          },
          {
            title: '导演',
            key: 'director',
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
          },
          {
            title: '时间',
            key: 'is_update_time',
            align: 'center'
          },
          {
            title: '操作',
            align: 'center',
            width: 150,
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
                      this.maintenanceModify(params.row)
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
                        this.maintenanceRemove(params.row);
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
        modalXstvTag: false,
        data4: [],
        columns3: [

          {
            type: 'selection',
            width: 60,
            align: 'center',
            _checked: false
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
            key: 'director',
            align: 'center'
          },
          {
            title: '上映年代',
            key: 'release_year',
            align: 'center'
          },
          {
            title: '语言',
            key: 'language',
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
            width: 150,
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
                      this.maintenanceModify(params.row)
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
                        this.maintenanceRemove(params.row);
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
        data3: [],
        columns5: [

          {
            type: 'index',
            width: 70,
            align: 'center',
            title: '序号',
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
            title: '排序ID',
            key: 'rank',
            align: 'center'
          },
          {
            title: '导演',
            key: 'director',
            align: 'center'
          },
          {
            title: '上映年代',
            key: 'publish_year',
            align: 'center'
          }
        ],
        data5: [],
        columns6: [

          {
            title: 'ID',
            key: 'topic_id',
            width: 60,
            align: 'center'
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
            title: '排序',
            key: 'rank',
            align: 'center'
          },
          {
            title: '导演',
            key: 'director',
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
          },
          {
            title: '时间',
            key: 'is_update_time',
            align: 'center'
          },
          {
            title: '操作',
            align: 'center',
            width: 150,
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
                      this.maintenanceModify1(params.row)
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
                        this.maintenanceRemove1(params.row);
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
        data6: [],
        columns7: [
          {
            type: 'selection',
            width: 60,
            align: 'center'
          },
          {
            title: 'ID',
            type: 'index',
            width: 60,
            align: 'center'
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
            key: 'director',
            align: 'center'
          },
          {
            title: '上映年代',
            key: 'release_year',
            align: 'center'
          },
          {
            title: '语言',
            key: 'language',
            align: 'center'
          },
          {
            title: '创建时间时间',
            key: 'create_time',
            align: 'center'
          }
        ],
        data7: [],
      }
    },
    methods: {
      // 添加上传
      //添加上传成功
      handleSuccess(res, file) {
        console.log(res)
        this.addUploadUrl = res.data.url
        console.log(this.addUploadUrl);
      },
      //添加改上传成功
      handleSuccess1(res, file) {
        console.log(res)
        this.editUploadUrl = res.data.url
        console.log(this.editUploadUrl);
      },
      //修改上传成功
      handleSuccess2(res, file) {
        console.log(res)
        this.editUploadUrl = res.data.url
        console.log(this.editUploadUrl);
      },
      //修改上传成功
      handleSuccess3(res, file) {
        console.log(res)
        this.editUploadUrl = res.data.url
        console.log(this.editUploadUrl);
      },
      handleFormatError() {
        this.$Notice.warning({
          title: '文件格式不正确',
          desc: '文件格式' + '文件名' + '不正确，请选择JPG或PNG'
        });
      },
      handleFormatError1() {
        this.$Notice.warning({
          title: '文件格式不正确',
          desc: '文件格式' + '文件名' + '不正确，请选择JPG或PNG'
        });
      },
      handleMaxSize() {
        this.$Notice.warning({
          title: '超过文件大小限制',
          desc: '文件  ' + '文件名' + ' 太大，不超过2M.'
        })
      },
      handleMaxSize1() {
        this.$Notice.warning({
          title: '超过文件大小限制',
          desc: '文件  ' + '文件名' + ' 太大，不超过2M.'
        })
      },
      // 专题列表
      getTableList() {
        this.$http(this.$config.BaseURL8 + '/cms/wrap/list?wrap_title=' + this.specialSearch.wrap_title + '&type=' +
          this.specialSearch.type + '&page=' + this.page + '&page_size=' + this.pageSize).then(response => {
            if (response.data.errno == 10000) {
              this.data1 = response.data.data.list;

              response.data.data.list.forEach(val => {
                // 状态：1、上线，0下线
                if (val.status == 0) {
                  val.is_status = "下线"
                } else if (val.status == 1) {
                  val.is_status = "上线"
                }
                // 专题类型：1横版，2竖版，3竖版带布局
                if (val.type == 1) {
                  val.is_type = "横版"
                } else if (val.type == 2) {
                  val.is_type = "竖版"
                } else if (val.type == 3) {
                  val.is_type = "竖版带布局"
                }

                //时间转换
                val.Iscreate_time = moment(val.create_time * 1000).format(
                  "YYYY-MM-DD HH:mm:ss"
                )
              });

              this.total = response.data.data.total;
            }
          })
      },
      // 专题搜索
      specialQuery() {
        this.page = 1;
        this.getTableList();
      },
      // 专题分页
      changePage(page) {
        this.page = page;
        this.getTableList();
      },
      // 专题添加按钮
      modalThemeAddBtn() {
        this.getSelectList();
        this.addUploadUrl = '';
        this.$refs.upload.clearFiles();
        this.$refs.upload1.clearFiles();
        this.modalThemeAdd = true;
      },
      //专题添加按钮
      addThemeOk() {
        this.themeInfo.wrap_img = this.addUploadUrl;
        this.themeInfo.wrap_backdrop = this.addUploadUrl;
        this.themeInfo.tag_relate *= 1;
        console.log(111)
        this.$http.post(this.$config.BaseURL8 + '/cms/wrap/add', this.themeInfo).then(response => {
          console.log(response)
          if (response.data.errno == 10000) {
            this.themeInfo = {};
            this.getTableList();
            this.modalThemeAdd = false;
            this.$Message.success("添加成功！");
          }
        })
      },
      // 专题取消按钮
      addThemeCancel() {
        this.modalThemeAdd = false;
        this.getTableList();
      },
      // 专题内容关联
      getSelectList() {
        this.$http(this.$config.BaseURL8 + '/cms/filter/list').then(response => {
          if (response.data.errno == 10000) {
            this.cityList = response.data.data.list;
          }
        })
      },
      // 新视标签选择树形
      getTagTreelist() {
        this.$http(
          this.$config.BaseURL7 +
          "/media/v2/xstag/list?category_id=0"
        ).then(response => {
          if (response.data.errno == 10000) {
            this.data4 = response.data.data;
          }
        });
      },
      // 树形添加
      treeChange(val) {
        console.log(val);
        let treeData = [];
        val.forEach(key => {
          treeData.push(key.title);

        });
        this.themeInfo.tag_name = treeData.join(',')
      },
      // 修改弹框
      modify(row) {
        console.log(row);
        this.wrap_id = row.wrap_id
        this.themeEdit = row;
        this.modalThemeEdit = true;
        // 是否关联新视标签
        if (row.tag_relate == 0) {
          row.is_tag_relate = "否";
        } else if (row.tag_relate == 1) {
          row.is_tag_relate = "是";
        }
        // 专题类型 type 1横版，2竖版，3竖版带布局
        if (row.type == 1) {
          row.is_type = "横版";
        } else if (row.type == 2) {
          row.is_type = "竖版";
        } else if (row.type == 3) {
          row.is_type = "竖版带布局";
        }
      },
      // 修改确定按钮
      editThemeOk() {
        this.themeEdit.wrap_id = this.wrap_id;
        this.$http.post(this.$config.BaseURL8 + '/cms/wrap/modify', this.themeEdit).then(response => {
          if (response.data.errno == 10000) {
            this.getTableList();
            this.modalThemeEdit = false;
            this.$Message.success("修改成功！");
          }
        })
      },
      // 修改取消按钮
      editThemeCancel() {
        this.getTableList();
        this.modalThemeEdit = false;
      },
      // 专题删除
      remove(row) {
        console.log(row)
        this.$http.post(this.$config.BaseURL8 + '/cms/wrap/remove', {
          wrap_id: row.wrap_id
        }).then(response => {
          if (response.data.errno == 10000) {
            this.getTableList();
            this.$Message.success("删除成功！");
          }
        })
      },
      //内容维护
      maintenance(row) {
        this.wrap_idlist = row.wrap_id;
        this.modalMaintenance = true;
        this.getMaintenanceList();
      },
      // 内容维护列表
      getMaintenanceList() {
        this.$http(this.$config.BaseURL8 + '/cms/wrap/topic/list?wrap_id=' + this.wrap_idlist + '&page=' + this.page1 +
          '&page_size=' + this.pageSize1 + '&title=' + this.maintenanceSearch.title + '&year=' + this.maintenanceSearch
            .year + '&director=' + this.maintenanceSearch.director).then(response => {
              console.log(response)
              if (response.data.errno == 10000) {
                this.data2 = response.data.data.list;

                response.data.data.list.forEach(val => {
                  val.is_update_time = moment(val.update_time * 1000).format(
                    "YYYY-MM-DD HH:mm:ss"
                  )
                });
                this.total1 = response.data.data.total;
              }
            })
      },
      // 内容维护搜索
      maintenanceQuery() {
        this.page1 = 1;
        this.getMaintenanceList();
      },
      //  内容维护分页
      changePage1(page) {
        this.page1 = page;
        this.getMaintenanceList();
      },
      //  内容维护添加列表
      getContentList() {
        this.$http(this.$config.BaseURL8 + '/cms/media/search?title=' + this.ContentAddSearch.title + '&year=' + this.ContentAddSearch
          .year + '&director=' + this.ContentAddSearch.director + '&page=' + this.page2 + '&pageSize=' + this.pageSize2
        ).then(response => {

          if (response.data.errno == 10000) {
            this.data3 = response.data.data.list;
            // 添加过的选中
            // response.data.data.list.forEach(val => {
            //   this.data2.forEach(val1 => {
            //     if (val.topic_id == val1.id) {
            //       console.log(9999);
            //       val._checked = true;
            //       if (val._checked == true) {
            //         val._disabled = true;
            //       }
            //     }
            //   });

            // });
            this.total2 = response.data.data.total;
          }
        })
      },
      // 内容维护添加搜索
      contentAddQuery() {
        this.page2 = 1;
        this.getContentList();
      },
      // 内容维护添加分页
      changePage2(page) {
        this.page2 = page;
        this.getContentList();
      },
      //添加选择
      checkBoxlist(selection) {
        console.log(selection);
        this.GroupList = selection;
        console.log(this.GroupList);
      },
      // 内容维护添添加确定按钮
      modalMaintenanceAddOk() {
        let postData = {
          wrap_id: this.wrap_idlist,
          media_id: []
        };
        this.GroupList.forEach((val, key) => {
          postData.media_id.push(val.id);
        });
        this.$http.post(this.$config.BaseURL8 + '/cms/wrap/topic/add', postData).then(response => {
          if (response.data.errno == 10000) {
            this.modalMaintenanceAdd = false;
            this.getMaintenanceList();
            this.$Message.success('添加成功!');
          }
        })
      },
      // 内容维护添添加取消按钮
      modalMaintenanceAddCancel() {
        this.modalMaintenanceAdd = false;
        this.getContentList();
      },
      //修改弹框
      maintenanceModify(row) {
        console.log(row);
        this.topic_id = row.topic_id;
        this.maintenanceEdit = row;
        this.modalMaintenanceEdit = true;
      },
      // 修改确定按钮
      modalMaintenanceEditOk() {
        this.maintenanceEdit.topic_id = this.topic_id;
        this.maintenanceEdit.rank *= 1;
        this.$http.post(this.$config.BaseURL8 + '/cms/wrap/topic/modify', this.maintenanceEdit).then(response => {
          if (response.data.errno == 10000) {
            this.modalMaintenanceEdit = false;
            this.getContentList();
            this.$Message.success('修改成功！');
          }
        })
      },
      // 修改取消按钮
      modalMaintenanceEditCancel() {
        this.modalMaintenanceEdit = false;
        this.getContentList();
      },
      //内容维护删除
      maintenanceRemove(row) {
        console.log(row)
        this.$http.post(this.$config.BaseURL8 + '/cms/wrap/topic/remove', {
          topic_id: row.topic_id
        }).then(response => {
          if (response.data.errno == 10000) {
            this.getMaintenanceList();
            this.$Message.success("删除成功!");
          }
        })
      },
      // 内容查看
      contentView(row) {
        this.wrap_id_view = row.wrap_id;
        this.modalView = true;
        this.getContentView();
      },
      // 内容查看列表
      getContentView() {
        this.$http(this.$config.BaseURL8 + '/cms/wrap/topic/list?page=' + this.page3 + '&page_size=' + this.pageSize3 + '&wrap_id=' + this.wrap_id_view + '&title=' + this.modalViewSearch.title + '&year=' + this.modalViewSearch.year).then(
          response => {
            console.log(response)
            if (response.data.errno == 10000) {
              this.data5 = response.data.data.list;
              this.total3 = response.data.data.total;
            }
          })
      },
      // 内容查看搜索
      modalViewQuery() {
        this.page3 = 1;
        this.getContentView();
      },
      //内容查看分页
      changePage3(page) {
        this.page3 = page;
        this.getContentView();
      },
      // 专题管理
      thematic(row) {
        console.log(row)
        this.is_wrap_id = row.wrap_id;
        this.modalThematicAdd = true;
        this.getlayoutList();
      },
      // 专题布局列表
      getlayoutList() {
        this.$http.get(this.$config.BaseURL8 + '/cms/wrap/layout/list?wrap_id=' + this.is_wrap_id).then(response => {
          if (response.data.errno == 10000) {
            console.log(response);
            this.ThematicInfo = response.data.data;
            console.log(this.ThematicInfo);
            this.wrap_sub_idList = response.data.data.list;
          }
        })
      },

      // 1.16
      // 专题管理 内容维护列表
      getthematicList(item) {
        this.getthematicListItem = item;
        this.$http(this.$config.BaseURL8 + '/cms/wrap/topic/list?wrap_id=' + this.is_wrap_id + '&wrap_sub_id=' + item.wrap_sub_id + '&title=' + this.specialContentSearch.title + '&director=' + this.specialContentSearch.director + '&year=' + this.specialContentSearch.year +
          '&page=' + this.page4 + '&page_size=' + this.pageSize4).then(response => {
            console.log(response)
            if (response.data.errno == 10000) {
              this.data6 = response.data.data.list;

              response.data.data.list.forEach(val => {
                //时间转换
                val.is_update_time = moment(val.update_time * 1000).format(
                  "YYYY-MM-DD HH:mm:ss"
                )
              });
              this.total4 = response.data.data.total;
            }
          })
      },
      //专题管理 内容维护搜索
      specialContentQuery() {
        this.page4 = 1;
        this.getthematicList(this.getthematicListItem);
      },
      // 专题管理 内容维护分页
      changePage4(page) {
        this.page4 = page;
        this.getthematicList(this.getthematicListItem);
      },
      // 专题内容维护，添加
      specialContentAddList() {
        this.$http.get(this.$config.BaseURL8 + '/cms/media/search?title=' + this.specialContentAddSearch.title + '&year=' + this.specialContentAddSearch.year + '&director=' + this.specialContentAddSearch.director +
          '&page=' + this.page5 + '&pageSize=' + this.pageSize5).then(response => {
            console.log(response)
            if (response.data.errno == 10000) {
              this.data7 = response.data.data.list;
              this.total5 = response.data.data.total;
            }
          })
      },
      // 专题内容维护，添加搜索
      specialContentAddQuery() {
        this.page5 = 1;
        this.specialContentAddList();
      },
      //分页
      changePage5(page) {
        this.page5 = page;
        this.specialContentAddList();
      },
      //专题管理 内容维护修改
      maintenanceModify1(row) {
        this.specialContentEdit = row;
        this.topic_id1 = row.topic_id;
        this.modalSpecialContentEdit = true;
      },
      // 专题管理 内容维护修改确定按钮
      okSpecialContentEdit() {
        this.specialContentEdit.rank *= 1;
        this.$http.post(this.$config.BaseURL8 + '/cms/wrap/topic/modify?topic_id=' + this.topic_id1, this.specialContentEdit).then(response => {
          if (response.data.errno == 10000) {
            this.modalSpecialContentEdit = false;
            this.getthematicList(this.getthematicListItem);
            this.$Message.success('修改成功！');
          }
        })
      },
      // 专题管理 内容维护修改取消按钮
      specialContentBtn() {
        this.getthematicList(this.getthematicListItem);
        this.modalSpecialContentEdit = false;
      },
      // 删除
      maintenanceRemove1(row) {
        this.$http.post(this.$config.BaseURL8 + '/cms/wrap/topic/remove', {
          topic_id: row.topic_id
        }).then(response => {
          if (response.data.errno == 10000) {
            this.modalSpecialContentEdit = false;
            this.getthematicList(this.getthematicListItem);
            this.$Message.success("删除成功！");
          }
        })
      },
      // 专题/内容维护添加弹框
      specialContentAddBtn() {
        this.wrap_sub_idAdd = this.getthematicListItem.wrap_sub_id;
        console.log(this.wrap_sub_idAdd);
        this.specialContentAdd = true;
        this.specialContentAddList();
      },
      //添加选择
      checkBoxlist1(selection) {
        console.log(selection);
        this.GroupList1 = selection;
        console.log(this.GroupList1);
      },
      // 内容维护添添加确定按钮
      modalspecialContentAddOk() {
        console.log(this.is_wrap_id);
        let postData1 = {
          wrap_id: this.is_wrap_id,
          media_id: [],
          wrap_sub_id: this.wrap_sub_idAdd
        };
        this.GroupList1.forEach((val, key) => {
          postData1.media_id.push(val.id);
        });
        this.$http.post(this.$config.BaseURL8 + '/cms/wrap/topic/add', postData1).then(response => {
          if (response.data.errno == 10000) {
            this.specialContentAdd = false;
            this.getthematicList(this.getthematicListItem);
            this.$Message.success('添加成功!');
          }
        })
      },
      // 内容维护添添加取消按钮
      modalspecialContentAddCancel() {
        this.specialContentAdd = false;
        this.getthematicList(this.getthematicListItem);
      },
      // 专题管理，删除布局块
      specialTemplateDelete(item) {
        console.log(item);
        this.$http.post(this.$config.BaseURL8 + '/cms/wrap/layout/remove', {
          wrap_sub_id: item.wrap_sub_id
        }).then(response => {
          if (response.data.errno == 10000) {
            console.log(11111)
            this.getlayoutList();
            this.$Message.success('删除成功！')
          }
        })
      },



      // 设置
      onSetUp(item) {
        this.modalSetUp = true;
        console.log(item);
        this.setUpConditions = item.condition;
        this.modalSetUpEdit = item;
      },

      // 添加一个关系
      addSetUpCondition() {
        this.setUpConditions.push({
          field_name: '',
          attr_ops: '',
          value: ''
        });
      },

      // 删除条件
      delSetUpCondition(ck) {
        let setUpConditions = [];
        this.setUpConditions.forEach((val, key) => {
          if (key != ck) {
            setUpConditions.push(val);
          }
        });
        this.setUpConditions = setUpConditions;
      },

      // 设置确定按钮
      okSetUpEdit() {
        console.log(this.modalSetUpEdit)
        console.log(this.setUpConditions)
        let conditions = [];
        this.setUpConditions.forEach(val => {
          if (val.value == '') {
            return
          }
          if (val.attr_ops == '' || typeof val.attr_ops == 'undefined') {
            return
          }
          if (val.field_name == '' || typeof val.field_name == 'undefined') {
            return
          }
          conditions.push(`${val.field_name} ${val.attr_ops} ${val.value}`);
        });

        this.$http.post(this.$config.BaseURL8 + '/cms/wrap/layout/setup', {
          show_title: this.modalSetUpEdit.show_title,
          wrap_sub_id: this.modalSetUpEdit.wrap_sub_id,
          wrap_sub_status: this.modalSetUpEdit.wrap_sub_status,
          wrap_sub_title: this.modalSetUpEdit.wrap_sub_title,
          condition: conditions
        }).then(response => {
          console.log(response)
          if (response.data.errno == 10000) {
            this.setUpConditions = [];
          }
        })

      },

      // 上移
      moveListUp(itemKey) {
        // wrap_sub_idList
        if (itemKey == 0) {
          return
        }

        let currentItem = this.wrap_sub_idList[itemKey];
        let currentItemUp = this.wrap_sub_idList[itemKey - 1];

        this.wrap_sub_idList[itemKey - 1] = currentItem;
        this.wrap_sub_idList[itemKey] = currentItemUp;

        this.wrap_sub_idList = JSON.parse(JSON.stringify(this.wrap_sub_idList));

        // console.log(this.wrap_sub_idList)
      },

      // 下移
      moveListDown(itemKey) {
        if (itemKey == (this.wrap_sub_idList.length - 1)) {
          return
        }
        let currentItem = this.wrap_sub_idList[itemKey];
        let currentItemUp = this.wrap_sub_idList[itemKey + 1];

        this.wrap_sub_idList[itemKey + 1] = currentItem;
        this.wrap_sub_idList[itemKey] = currentItemUp;

        this.wrap_sub_idList = JSON.parse(JSON.stringify(this.wrap_sub_idList));
      },

      // 添加布局块确定
      okAddTemplate() {
        console.log(this.single);
        console.log(this.is_wrap_id);
        this.$http.post(`${this.$config.BaseURL8}/cms/wrap/layout/add`, {
          wrap_id: this.is_wrap_id,
          layout_id: this.single,
        }).then(response => {
          if (response.data.errno == 10000) {
            this.getlayoutList();
          }
        })
      }




    },
    mounted() {
      this.getTableList();
    }
  }

</script>