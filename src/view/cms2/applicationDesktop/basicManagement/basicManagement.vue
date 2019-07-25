<template>
  <div id="template" class="layout-templateList">
    <Form :model="search" label-position="right" inline>
      <FormItem label="基础模版名称:" :label-width='120'>
        <Select v-model="search.title" style="width:200px" @on-change="getChange">
          <Option value="">全部</Option>
          <Option v-for="item in templateName" :value="item.id" :key="item.id">{{ item.title }}</Option>
        </Select>
      </FormItem>
      <FormItem label="年级:" :label-width='90'>
        <Select v-model="search.grade" style="width:200px" @on-change="getgrade">
          <Option value="">全部</Option>
          <Option v-for="item in getgradeList" :value="item.id" :key="item.id">{{ item.title }}</Option>
        </Select>
      </FormItem>
      <FormItem label="学期:" :label-width='90'>
        <Select v-model="search.semester" style="width:200px" @on-change="getgradeDesc">
          <Option value="">全部</Option>
          <Option v-for="item in getgradeDescList" :value="item.id" :key="item.id">{{ item.title }}</Option>
        </Select>
      </FormItem>
    </Form>
    <Tabs type="card" @on-click='tabChange'>
      <TabPane :name="tab.id +''" v-for="tab in tabs" :key="tab.id" :label="tab.title+''">
        <Card style="width:100%;background-color: #eeeeee;">
          <div>
            <Row>
              <Col span="6">桌面ID:{{tab.id}}</Col>
              <Col span='7'>桌面图标:<img :src="tab.iconUrl" alt="" style='width:80px;height:50px'></Col>
              <Col sapn='7'>桌面背景：<img :src="tab.bgUrl" alt="" style='width:80px;height:50px'></Col>
              <Col span="6">频道排序:{{tab.sortId}}</Col>
              <Col span="7">状态:
              <span style="color: #69A341" v-if="tab.status == 1">上线</span>
              <span style="color: #69A341" v-if="tab.status == 0">下线</span>
              </Col>
              <Col span="7">发布状态:
              <span style="color: #69A341" v-if="tab.isRelease == 1">发布</span>
              <span style="color: #69A341" v-if="tab.isRelease == 0">未发布</span>
              </Col>
              <Col span="6">来源:
              <span style="color: #69A341" v-if="tab.type == 1">基础</span>
              <span style="color: #69A341" v-if="tab.type == 2">扩展</span>
              </Col>
              <Col span='7'>年级-学期:{{tab.gradeDesc}}</Col>
              <Col span="7">创建时间:{{tab.addTime}}</Col>
              <Col span="12">描述:{{tab.description}}</Col>
              <Button type="info" size="small" @click="DeskTopEditBtn(tab)" style="!important;">修改</Button>
              <Poptip confirm title="确定要删除吗?" @on-ok="removeOk(tab)" @on-cancel="cancel(tab)">
                <Button type="error" size="small" style="!important; margin-left:5px">删除</Button>
              </Poptip>
            </Row>
          </div>
        </Card>
      </TabPane>
      <div></div>
      <Button @click="handleTabsAdd" size="small" slot="extra">增加</Button>
    <!-- 增加桌面 -->
      <Modal v-model="TabsAdd" title="新建桌面">
        <div slot="footer">
          <a @click="TabsAdd=false" class="btnSpan">取消</a>
          <Button @click="TabsAddOk" type="primary">确定</Button>
        </div>
        <Form :model="TabsAddInfo" label-position="right" :label-width="100"  :rules="ruleValidate">
          <FormItem label="所属模版:">
            <Select style="width:390px" v-model="TabsAddInfo.templateId">
              <Option v-for="item in desktopTp1" :value="item.id" :key="item.id">{{ item.title }}</Option>
            </Select>
          </FormItem>
          <FormItem label="桌面名称:" prop='title'>
            <Input v-model="TabsAddInfo.title"></Input>
          </FormItem>
          <!-- <FormItem label="桌面图标:">
            <Input v-model="TabsAddInfo.iconUrl"></Input>
          </FormItem> -->
          <FormItem label="桌面图标:">
            <Upload :action="$config.BaseURLfile + '/common/upload/file'" :on-success="handleEditDesSuccess2"
              :with-credentials="true" :format="['jpg','jpeg','png']" :on-format-error="handleFormatError2">
              <Button icon="ios-cloud-upload-outline">上传桌面图标</Button>
            </Upload>
          </FormItem>
          <FormItem label="桌面背景:">
            <Upload :action="$config.BaseURLfile + '/common/upload/file'" :on-success="handleEditDesSuccess"
              :with-credentials="true" :format="['jpg','jpeg','png']" :on-format-error="handleFormatError">
              <Button icon="ios-cloud-upload-outline">上传桌面背景</Button>
            </Upload>
          </FormItem>
          <FormItem label="排序ID:">
            <InputNumber :max="10" :min="1" v-model="TabsAddInfo.sortId"></InputNumber>
          </FormItem>
          <FormItem label='年级-学期:'>
            <Tree :data="data2" show-checkbox></Tree>
          </FormItem>
          <FormItem label="状态:">
            <Select style="width:390px" v-model="TabsAddInfo.status">
              <Option :value="1">上线</Option>
              <Option :value="0">下线</Option>
            </Select>
          </FormItem>
          <FormItem label="描述:">
            <Input v-model="TabsAddInfo.description"></Input>
          </FormItem>
        </Form>
      </Modal>
    </Tabs>
    <!-- 修改桌面 -->
    <Modal v-model="DeskTopEdit" title="修改桌面">
      <div slot="footer">
        <a @click="DeskTopEdit=false" class="btnSpan">取消</a>
        <Button @click="editDeskTopOk" type="primary">确定</Button>
      </div>
      <Form :model="editDes" label-position="right" :label-width="100">
        <FormItem label="所属模版:">
          <Select style="width:390px" v-model="editDes.templateId">
            <Option v-for="item in desktopTp" :value="item.id" :key="item.id">{{ item.title }}</Option>
          </Select>
        </FormItem>
        <FormItem label="桌面名称:">
          <Input v-model="editDes.title"></Input>
        </FormItem>
        <!-- <FormItem label="桌面图标:">
          <Input v-model="editDes.iconUrl"></Input>
        </FormItem> -->
        <FormItem label="桌面图标:">
          <Upload :action="$config.BaseURLfile + '/common/upload/file'" :on-success="handleEditDesSuccess3"
            :with-credentials="true" :format="['jpg','jpeg','png']" :on-format-error="handleFormatError3">
            <Button icon="ios-cloud-upload-outline">上传桌面图标</Button>
          </Upload>
        </FormItem>
        <FormItem label="桌面背景:">
          <Upload :action="$config.BaseURLfile + '/common/upload/file'" :on-success="handleEditDesSuccess4"
            :with-credentials="true" :format="['jpg','jpeg','png']" :on-format-error="handleFormatError4">
            <Button icon="ios-cloud-upload-outline">上传桌面背景</Button>
          </Upload>
        </FormItem>
        <FormItem label="排序ID:">
          <InputNumber :max="10" :min="1" v-model="editDes.sortId"></InputNumber>
        </FormItem>
        <FormItem label='年级-学期:'>
          <Tree :data="data2" show-checkbox></Tree>
        </FormItem>
        <FormItem label="状态:">
          <Select style="width:390px" v-model="editDes.status">
            <Option :value="1" :key="1">上线</Option>
            <Option :value="0" :key="0">下线</Option>
          </Select>
        </FormItem>
        <FormItem label="描述:">
          <Input v-model="editDes.description"></Input>
        </FormItem>
      </Form>
    </Modal>
    <!-- 设置标题 -->
    <Modal v-model="modalTitle" title="设置">
      <div slot="footer">
        <a @click="modalTitleBtn" class="btnSpan">取消</a>
        <Button @click="editTitleOk" type="primary">确定</Button>
      </div>
      <Form :model="editTitle" label-position="right" :label-width="100">
        <FormItem label="是否展示标题:">
          <RadioGroup>
            <Radio label="隐藏标题" :true-value="1" :false-value="0" v-model="editTitle.isHideTitle"></Radio>
            <Radio label="显示标题" :true-value="0" :false-value="1" v-model="editTitle.isHideTitle"></Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="状态:">
          <Select v-model="editTitle.status" style="width:390px">
            <Option :value="0">下线</Option>
            <Option :value="1">下线</Option>
          </Select>
        </FormItem>
        <FormItem label="标题名称:">
          <Input v-model="editTitle.title"></Input>
        </FormItem>
      </Form>
    </Modal>
    <!-- end设置标题 -->
    <!-- 保存按钮 -->
    <div style="text-align: center;margin-left: 230px; margin-top: 10px;">
      <Button type="warning" size="small" @click="saveDesktopInfo">保存</Button>
    </div>
    <!-- 模版 -->
    <div class="tmp-main" v-for="(item, index) in desktopinfo" :key="index" v-if="typeof item.promotion != 'undefined' && item.promotion.length > 0">
      <meta name="referrer" content="never">
      <!-- 模版一 -->
      <div class="template1" v-if="item.template == 't1' && item.promotion.length > 0">
        <!-- 标题 -->
        <div style="margin-top: 10px;">
          <!-- 标题 -->
          <p style="font-size: 14px;margin-left: 5px;float: left;">{{item.title}}</p>
          <!-- 状态和 是否隐藏 -->
          <p style="float: left;margin-left: 10px;margin-top:2px;">{{item.isHideTitle == 1 ? '隐藏' :
            '显示'}}/{{item.status == 1 ? '上线' : '下线'}}</p>
          <p style="margin-left: 620px;">
            <Button @click="shwoModalTitle(item)" size="small" style="margin-right:5px;">设置</Button>
            <Button size="small" style="margin-right:5px;" @click="OperationUpward(index)">上移</Button>
            <Button size="small" @click="Operationdown(index)" style="margin-right:5px;">下移</Button>
            <Button @click="delDesktopInfo(index)" size="small">删除布局块</Button>
          </p>
        </div>
        <div style="clear: both;"></div>
        <div class="xstv-temp1-leftImg" @click="infoModal(180,275,item.promotion[0],0,index)">
          <div>
            <img :src="item.promotion[0].imgUrl" onerror="this.src='http://static.icloud.xstvos.cn/noPic.jpg'" width="275"
              height="180" alt="">
          </div>
          <div class="xstv-temp1-bgWenzi">
            <p>{{item.promotion[0].title}}</p>
          </div>
        </div>
        <div class="xstv-temp1-leftImg" @click="infoModal(180,275,item.promotion[1],1,index)" v-if="item.promotion.length > 1">
          <div>
            <img :src="item.promotion[1].imgUrl" onerror="this.src='http://static.icloud.xstvos.cn/noPic.jpg'" width="275"
              height="180" alt="">
          </div>
          <div class="xstv-temp1-bgWenzi">
            <p>{{item.promotion[1].title}}</p>
          </div>
        </div>
        <div class="xstv-temp1-centerImg" @click="infoModal(180,130,item.promotion[2],2,index)" v-if="item.promotion.length > 2">
          <div>
            <img :src="item.promotion[2].imgUrl" onerror="this.src='http://static.icloud.xstvos.cn/noPic.jpg'" width="130"
              height="180" alt="">
          </div>
          <div class="xstv-temp1-bgWenzi1">
            <p>{{item.promotion[2].title}}</p>
          </div>
        </div>
        <div class="xstv-temp1-rightImg" v-if="item.promotion.length > 3">
          <div class="xstv-temp1-right top" @click="infoModal(82.5,130,item.promotion[3],3,index)" v-if="item.promotion.length > 3">
            <img :src="item.promotion[3].imgUrl" onerror="this.src='http://static.icloud.xstvos.cn/noPic.jpg'" width="130"
              height="82.5" alt="">
          </div>
          <div class="xstv-temp1-bgWenzi2" v-if="item.promotion.length > 3">
            <p>{{item.promotion[3].title}}</p>
          </div>
          <div class="xstv-temp1-right bottom" @click="infoModal(82.5,130,item.promotion[4],4,index)" v-if="item.promotion.length > 4">
            <img :src="item.promotion[4].imgUrl" onerror="this.src='http://static.icloud.xstvos.cn/noPic.jpg'" width="130"
              height="82.5" alt="" style="margin-top: -30px;">
          </div>
          <div class="xstv-temp1-bgWenzi2" v-if="item.promotion.length > 4">
            <p>{{item.promotion[4].title}}</p>
          </div>
        </div>
      </div>
      <div style="clear: both;"></div>
      <div class="template3" v-if="item.template == 't3' && item.promotion.length > 0">
        <!-- 标题 -->
        <div style="margin-top: 10px;">
          <p style="font-size: 14px;margin-left: 5px;float: left;">{{item.title}}</p>
          <p style="float: left;margin-left: 10px;margin-top:2px;">{{item.isHideTitle == 1 ? '隐藏' :
            '显示'}}/{{item.status == 1 ? '上线' : '下线'}}</p>
          <p style="margin-left: 621px;">
            <Button @click="shwoModalTitle(item)" size="small" style="margin-right:5px;">设置</Button>
            <Button size="small" style="margin-right:5px;" @click="OperationUpward(index)">上移</Button>
            <Button size="small" @click="Operationdown(index)" style="margin-right:5px;">下移</Button>
            <Button @click="delDesktopInfo(index)" size="small">删除布局块</Button>
          </p>
        </div>

        <div class="xstv-temp3-img" @click="infoModal(82.5,134,promotionOne,indexP,index)" v-for="(promotionOne,indexP) in item.promotion"
          :key="indexP">
          <div>
            <img :src="promotionOne.imgUrl" width="134" height="82.5" alt="">
          </div>
          <div class="xstv-temp1-bgWenzi3">
            <p>{{promotionOne.title}}</p>
          </div>
        </div>
      </div>
      <div style="clear: both;"></div>
      <div class="template4" v-if="item.template == 't4' && item.promotion.length > 0">
        <!-- 标题 -->
        <div style="margin-top: 10px;">
          <p style="font-size: 14px;margin-left: 5px;float: left;">{{item.title}}</p>
          <p style="float: left;margin-left: 10px;margin-top:2px;">{{item.isHideTitle == 1 ? '隐藏' :
            '显示'}}/{{item.status == 1 ? '上线' : '下线'}}</p>
          <p style="margin-left: 610px;">
            <Button @click="shwoModalTitle(item)" size="small" style="margin-right:5px;">设置</Button>
            <Button size="small" style="margin-right:5px;" @click="OperationUpward(index)">上移</Button>
            <Button size="small" @click="Operationdown(index)" style="margin-right:5px;">下移</Button>
            <Button @click="delDesktopInfo(index)" size="small">删除布局块</Button>
          </p>
        </div>
        <div class="xstv-temp4-img" @click="infoModal(82.5,134,promotionOne,indexP,index)" v-for="(promotionOne,indexP) in item.promotion"
          :key="indexP">
          <div>
            <img :src="promotionOne.imgUrl" width="134" height="82.5" alt="">
          </div>
          <div class="xstv-temp1-bgWenzi4">
            <p>{{promotionOne.title}}</p>
          </div>
        </div>
      </div>
      <div style="clear: both;"></div>
      <div class="template5" v-if="item.template == 't5' && item.promotion.length > 0">
        <!-- 标题 -->
        <div style="margin-top: 10px;">
          <p style="font-size: 14px;margin-left: 5px;float: left;">{{item.title}}</p>
          <p style="float: left;margin-left: 10px;margin-top:2px;">{{item.isHideTitle == 1 ? '隐藏' :
            '显示'}}/{{item.status == 1 ? '上线' : '下线'}}</p>
          <p style="margin-left: 610px;">
            <Button @click="shwoModalTitle(item)" size="small" style="margin-right:5px;">设置</Button>
            <Button size="small" style="margin-right:5px;" @click="OperationUpward(index)">上移</Button>
            <Button size="small" @click="Operationdown(index)" style="margin-right:5px;">下移</Button>
            <Button @click="delDesktopInfo(index)" size="small">删除布局块</Button>
          </p>
        </div>
        <div v-for="(promotionOne,indexP) in item.promotion" :key="indexP">
          <div class="xstv-temp5-left" @click="infoModal(180,290,promotionOne,indexP,index)" v-if="indexP == 0">
            <div>
              <img :src="promotionOne.imgUrl" onerror="this.src='http://static.icloud.xstvos.cn/noPic.jpg'" width="290"
                height="180" alt="">
            </div>
            <div class="xstv-temp5-bgWenzi5">
              <p>{{promotionOne.title}}</p>
            </div>
          </div>
          <div class="xstv-temp5-right" @click="infoModal(180,130,promotionOne,indexP,index)" v-if="indexP > 0">
            <div>
              <img :src="promotionOne.imgUrl" width="130" height="180" alt="">
            </div>
            <div class="xstv-temp5-bgWenzi6">
              <p>{{promotionOne.title}}</p>
            </div>
          </div>
        </div>
      </div>
      <div style="clear: both;"></div>
      <div class="template6" v-if="item.template == 't6' && item.promotion.length > 0">
        <!-- 标题 -->
        <div style="margin-top: 10px;">
          <p style="font-size: 14px;margin-left: 5px;float: left;">{{item.title}}</p>
          <p style="float: left;margin-left: 10px;margin-top:2px;">{{item.isHideTitle == 1 ? '隐藏' :
            '显示'}}/{{item.status == 1 ? '上线' : '下线'}}</p>
          <p style="margin-left: 630px;">
            <Button @click="shwoModalTitle(item)" size="small" style="margin-right:5px;">设置</Button>
            <Button size="small" style="margin-right:5px;" @click="OperationUpward(index)">上移</Button>
            <Button size="small" @click="Operationdown(index)" style="margin-right:5px;">下移</Button>
            <Button @click="delDesktopInfo(index)" size="small">删除布局块</Button>
          </p>
        </div>
        <div class="xstv-temp6-img" @click="infoModal(180,275,promotionOne,indexP,index)" v-for="(promotionOne,indexP) in item.promotion"
          :key="indexP">
          <div>
            <img :src="promotionOne.imgUrl" onerror="this.src='http://static.icloud.xstvos.cn/noPic.jpg'" width="275"
              height="180" alt="">
          </div>
          <div class="xstv-temp6-bgWenzi7">
            <p>{{promotionOne.title}}</p>
          </div>
        </div>
      </div>
      <div style="clear: both;"></div>
      <div class="template7" v-if="item.template == 't7' && item.promotion.length > 0">
        <!-- 标题 -->
        <div style="margin-top: 10px;">
          <p style="font-size: 14px;margin-left: 5px;float: left;">{{item.title}}</p>
          <p style="float: left;margin-left: 10px;margin-top:2px;">{{item.isHideTitle == 1 ? '隐藏' :
            '显示'}}/{{item.status == 1 ? '上线' : '下线'}}</p>
          <p style="margin-left: 630px;">
            <Button @click="shwoModalTitle(item)" size="small" style="margin-right:5px;">设置</Button>
            <Button size="small" style="margin-right:5px;" @click="OperationUpward(index)">上移</Button>
            <Button size="small" @click="Operationdown(index)" style="margin-right:5px;">下移</Button>
            <Button @click="delDesktopInfo(index)" size="small">删除布局块</Button>
          </p>
        </div>
        <div v-for="(promotionOne,indexP) in item.promotion" :key="indexP">
          <div class="xstv-temp7-left" v-if="indexP < 2" @click="infoModal(180,275,promotionOne,indexP,index)">
            <div>
              <img :src="promotionOne.imgUrl" onerror="this.src='http://static.icloud.xstvos.cn/noPic.jpg'" width="275"
                height="180" alt="">
            </div>
            <div class="xstv-temp7-bgWenzi">
              <p>{{promotionOne.title}}</p>
            </div>
          </div>
          <div class="xstv-temp7-right" v-if="indexP > 1" @click="infoModal(180,135,promotionOne,indexP,index)">
            <div>
              <img :src="promotionOne.imgUrl" width="135" height="180" alt="">
            </div>
            <div class="xstv-temp7-bgWenzi1">
              <p>{{promotionOne.title}}</p>
            </div>
          </div>
        </div>
      </div>
      <div style="clear: both;"></div>
      <div class="template8" v-if="item.template == 't8' && item.promotion.length > 0">
        <!-- 标题 -->
        <div style="margin-top: 10px;">
          <p style="font-size: 14px;margin-left: 5px;float: left;">{{item.title}}</p>
          <p style="float: left;margin-left: 10px;margin-top:2px;">{{item.isHideTitle == 1 ? '隐藏' :
            '显示'}}/{{item.status == 1 ? '上线' : '下线'}}</p>
          <p style="margin-left: 610px;">
            <Button @click="shwoModalTitle(item)" size="small" style="margin-right:5px;">设置</Button>
            <Button size="small" style="margin-right:5px;" @click="OperationUpward(index)">上移</Button>
            <Button size="small" @click="Operationdown(index)" style="margin-right:5px;">下移</Button>
            <Button @click="delDesktopInfo(index)" size="small">删除布局块</Button>
          </p>
        </div>
        <div v-for="(promotionOne,indexP) in item.promotion" :key="indexP">
          <div class="xstv-temp1-leftImg" v-if="indexP == 0" @click="infoModal(180,275,promotionOne,indexP,index)">
            <div>
              <img :src="promotionOne.imgUrl" onerror="this.src='http://static.icloud.xstvos.cn/noPic.jpg'" width="275"
                height="180" alt="">
            </div>
            <div class="xstv-temp1-bgWenzi">
              <p>{{promotionOne.title}}</p>
            </div>
          </div>
          <div class="xstv-temp1-centerImg" v-if="indexP > 0 && indexP < item.promotion.length-2" @click="infoModal(180,130,promotionOne,indexP,index)">
            <div>
              <img :src="promotionOne.imgUrl" width="130" height="180" alt="">
            </div>
            <div class="xstv-temp1-bgWenzi1">
              <p>{{promotionOne.title}}</p>
            </div>
          </div>
        </div>
        <div class="xstv-temp1-rightImg" v-if="item.promotion.length > 4">
          <div class="xstv-temp1-right top" @click="infoModal(82.5,130,item.promotion[4],4,index)">
            <img :src="item.promotion[4].imgUrl" width="130" height="82.5" alt="">
          </div>
          <div class="xstv-temp1-bgWenzi2">
            <p>{{item.promotion[4].title}}</p>
          </div>
          <div class="xstv-temp1-right bottom" v-if="item.promotion.length > 5" @click="infoModal(82.5,130,item.promotion[5],5,index)">
            <img :src="item.promotion[5].imgUrl" width="130" height="82.5" alt="" style="margin-top: -30px;">
          </div>
          <div class="xstv-temp1-bgWenzi2" v-if="item.promotion.length > 5">
            <p>{{item.promotion[5].title}}</p>
          </div>
        </div>
      </div>
      <div style="clear: both;"></div>
      <div class="template9" v-if="item.template == 't9' && item.promotion.length > 0">
        <!-- 标题 -->
        <div style="margin-top: 10px;">
          <p style="font-size: 14px;margin-left: 5px;float: left;">{{item.title}}</p>
          <p style="float: left;margin-left: 10px;margin-top:2px;">{{item.isHideTitle == 1 ? '隐藏' :
            '显示'}}/{{item.status == 1 ? '上线' : '下线'}}</p>
          <p style="margin-left: 610px;">
            <Button @click="shwoModalTitle(item)" size="small" style="margin-right:5px;">设置</Button>
            <Button size="small" style="margin-right:5px;" @click="OperationUpward(index)">上移</Button>
            <Button size="small" @click="Operationdown(index)" style="margin-right:5px;">下移</Button>
            <Button @click="delDesktopInfo(index)" size="small">删除布局块</Button>
          </p>
        </div>
        <div class="xstv-temp4-img" v-for="(promotionOne,indexP) in item.promotion" :key="indexP" @click="infoModal(82.5,134,promotionOne,indexP,index)">
          <div>
            <img :src="promotionOne.imgUrl" width="134" height="180" alt="">
          </div>
          <div class="xstv-temp1-bgWenzi4">
            <p>{{promotionOne.title}}</p>
          </div>
        </div>
      </div>
      <div style="clear: both;"></div>
      <div class="template10" v-if="item.template == 't10' && item.promotion.length > 0">
        <!-- 标题 -->
        <div style="margin-top: 10px;">
          <p style="font-size: 14px;margin-left: 5px;float: left;">{{item.title}}</p>
          <p style="float: left;margin-left: 10px;margin-top:2px;">{{item.isHideTitle == 1 ? '隐藏' :
            '显示'}}/{{item.status == 1 ? '上线' : '下线'}}</p>
          <p style="margin-left: 625px;">
            <Button @click="shwoModalTitle(item)" size="small" style="margin-right:5px;">设置</Button>
            <Button size="small" style="margin-right:5px;" @click="OperationUpward(index)">上移</Button>
            <Button size="small" @click="Operationdown(index)" style="margin-right:5px;">下移</Button>
            <Button @click="delDesktopInfo(index)" size="small">删除布局块</Button>
          </p>
        </div>
        <div class="xstv-temp4-img" v-for="(promotionOne,indexP) in item.promotion" :key="indexP" @click="infoModal(180,134,promotionOne,indexP,index)">
          <div>
            <img :src="promotionOne.imgUrl" width="134" height="180" alt="">
          </div>
          <div class="xstv-temp1-bgWenzi4">
            <p>{{promotionOne.title}}</p>
          </div>
        </div>
      </div>
      <div style="clear: both;"></div>
      <div class="template11" v-if="item.template == 't11' && item.promotion.length > 0">
        <!-- 标题 -->
        <div style="margin-top: 10px;">
          <p style="font-size: 14px;margin-left: 5px;float: left;">{{item.title}}</p>
          <p style="float: left;margin-left: 10px;margin-top:2px;">{{item.isHideTitle == 1 ? '隐藏' :
            '显示'}}/{{item.status == 1 ? '上线' : '下线'}}</p>
          <p style="margin-left: 625px;">
            <Button @click="shwoModalTitle(item)" size="small" style="margin-right:5px;">设置</Button>
            <Button size="small" style="margin-right:5px;" @click="OperationUpward(index)">上移</Button>
            <Button size="small" @click="Operationdown(index)" style="margin-right:5px;">下移</Button>
            <Button @click="delDesktopInfo(index)" size="small">删除布局块</Button>
          </p>
        </div>
        <div class="xstv-temp4-img" v-for="(promotionOne,indexP) in item.promotion" :key="indexP" @click="infoModal(180,134,promotionOne,indexP,index)">
          <div>
            <img :src="promotionOne.imgUrl" width="134" height="180" alt="">
          </div>
          <div class="xstv-temp1-bgWenzi4">
            <p>{{promotionOne.title}}</p>
          </div>
        </div>
      </div>
      <div style="clear: both;"></div>
      <div class="template12" v-if="item.template == 't12' && item.promotion.length > 0">
        <!-- 标题 -->
        <div>
          <p style="font-size: 14px;margin-left: 5px;float: left;">{{item.title}}</p>
          <p style="float: left;margin-left: 10px;margin-top:2px;">{{item.isHideTitle == 1 ? '隐藏' :
            '显示'}}/{{item.status == 1 ? '上线' : '下线'}}</p>
          <p style="margin-left: 630px;">
            <Button @click="shwoModalTitle(item)" size="small" style="margin-right:5px;">设置</Button>
            <Button size="small" style="margin-right:5px;" @click="OperationUpward(index)">上移</Button>
            <Button size="small" @click="Operationdown(index)" style="margin-right:5px;">下移</Button>
            <Button @click="delDesktopInfo(index)" size="small">删除布局块</Button>
          </p>
        </div>
        <div v-for="(promotionOne,indexP) in item.promotion" :key="indexP">
          <div class="xstv-temp12-a" v-if="indexP == 0 || indexP == 3" @click="infoModal(180,275,promotionOne,indexP,index)">
            <div>
              <img :src="promotionOne.imgUrl" onerror="this.src='http://static.icloud.xstvos.cn/noPic.jpg'" width="275"
                height="180" alt="">
            </div>
            <div class="xstv-temp12-bgWenzi">
              <p>{{promotionOne.title}}</p>
            </div>
          </div>
          <div class="xstv-temp12-b" v-if="indexP == 1 || indexP == 2" @click="infoModal(180,135,promotionOne,indexP,index)">
            <div>
              <img :src="promotionOne.imgUrl" width="135" height="180" alt="">
            </div>
            <div class="xstv-temp12-bgWenzi1">
              <p>{{promotionOne.title}}</p>
            </div>
          </div>
        </div>
      </div>
      <div style="clear: both;"></div>
      <div class="template13" v-if="item.template == 't13' && item.promotion.length > 0">
        <!-- 标题 -->
        <div style="margin-top: 10px;">
          <p style="font-size: 14px;margin-left: 5px;float: left;">{{item.title}}</p>
          <p style="float: left;margin-left: 10px;margin-top:2px;">{{item.isHideTitle == 1 ? '隐藏' :
            '显示'}}/{{item.status == 1 ? '上线' : '下线'}}</p>
          <p style="margin-left: 610px;">
            <Button @click="shwoModalTitle(item)" size="small" style="margin-right:5px;">设置</Button>
            <Button size="small" style="margin-right:5px;" @click="OperationUpward(index)">上移</Button>
            <Button size="small" @click="Operationdown(index)" style="margin-right:5px;">下移</Button>
            <Button @click="delDesktopInfo(index)" size="small">删除布局块</Button>
          </p>
        </div>
        <div class="xstv-temp4-img" v-for="(promotionOne,indexP) in item.promotion" :key="indexP" @click="infoModal(130,134,promotionOne,indexP,index)">
          <div>
            <img :src="promotionOne.imgUrl" width="134" height="130" alt="">
          </div>
          <div class="xstv-temp1-bgWenzi4">
            <p>{{promotionOne.title}}</p>
          </div>
        </div>
      </div>
      <div style="clear: both;"></div>
      <div class="template14" v-if="item.template == 't14' && item.promotion.length > 0">
        <!-- 标题 -->
        <div style="margin-top: 10px;">
          <p style="font-size: 14px;margin-left: 5px;float: left;">{{item.title}}</p>
          <p style="float: left;margin-left: 10px;margin-top:2px;">{{item.isHideTitle == 1 ? '隐藏' :
            '显示'}}/{{item.status == 1 ? '上线' : '下线'}}</p>
          <p style="margin-left: 610px;">
            <Button @click="shwoModalTitle(item)" size="small" style="margin-right:5px;">设置</Button>
            <Button size="small" style="margin-right:5px;" @click="OperationUpward(index)">上移</Button>
            <Button size="small" @click="Operationdown(index)" style="margin-right:5px;">下移</Button>
            <Button @click="delDesktopInfo(index)" size="small">删除布局块</Button>
          </p>
        </div>
        <div class="xstv-temp14-img" v-for="(promotionOne,indexP) in item.promotion" :key="indexP" @click="infoModal(130,134,promotionOne,indexP,index)">
          <div>
            <img :src="promotionOne.imgUrl" width="202.5" height="110" alt="">
          </div>
          <div class="xstv-temp1-bgWenzi14">
            <p>{{promotionOne.title}}</p>
          </div>
        </div>
      </div>
      <div style="clear: both;"></div>
      <div class="template15" v-if="item.template == 't15' && item.promotion.length > 0">
        <!-- 标题 -->
        <div style="margin-top: 10px;">
          <p style="font-size: 14px;margin-left: 5px;float: left;">{{item.title}}</p>
          <p style="float: left;margin-left: 10px;margin-top:2px;">{{item.isHideTitle == 1 ? '隐藏' :
            '显示'}}/{{item.status == 1 ? '上线' : '下线'}}</p>
          <p style="margin-left: 610px;">
            <Button @click="shwoModalTitle(item)" size="small" style="margin-right:5px;">设置</Button>
            <Button size="small" style="margin-right:5px;" @click="OperationUpward(index)">上移</Button>
            <Button size="small" @click="Operationdown(index)" style="margin-right:5px;">下移</Button>
            <Button @click="delDesktopInfo(index)" size="small">删除布局块</Button>
          </p>
        </div>
        <div class="xstv-temp4-img" v-for="(promotionOne,indexP) in item.promotion" :key="indexP" @click="infoModal(82.5,134,promotionOne,indexP,index)">
          <div>
            <img :src="promotionOne.imgUrl" width="134" height="180" alt="">
          </div>
          <div class="xstv-temp1-bgWenzi4">
            <p>{{promotionOne.title}}</p>
          </div>
        </div>
      </div>
      <div style="clear: both;"></div>
      <!-- <div class="template16" v-if="item.template == 't16' && item.promotion.length > 0">
     
        <div style="margin-top: 10px;">
          <p style="font-size: 14px;margin-left: 5px;float: left;">{{item.title}}</p>
          <p style="float: left;margin-left: 10px;margin-top:2px;">{{item.isHideTitle == 1 ? '隐藏' :
            '显示'}}/{{item.status == 1 ? '上线' : '下线'}}</p>
          <p style="margin-left: 610px;">
            <Button @click="shwoModalTitle(item)" size="small" style="margin-right:5px;">设置</Button>
            <Button size="small" style="margin-right:5px;" @click="OperationUpward(index)">上移</Button>
            <Button size="small" @click="Operationdown(index)" style="margin-right:5px;">下移</Button>
            <Button @click="delDesktopInfo(index)" size="small">删除布局块</Button>
          </p>
        </div>
        <div class="xstv-temp4-img" v-for="(promotionOne,indexP) in item.promotion" :key="indexP" @click="infoModal(150,250,promotionOne,indexP,index)">
          <div>
            <img :src="promotionOne.imgUrl" width="250" height="150" alt="">
          </div>
          <div class="xstv-temp1-bgWenzi4" style='width:250px;'>
            <p>{{promotionOne.title}}</p>
          </div>
        </div>
      </div>   
      <div style="clear: both;"></div>
      <div class="template17" v-if="item.template == 't17' && item.promotion.length > 0">
       
        <div style="margin-top: 10px;">
          <p style="font-size: 14px;margin-left: 5px;float: left;">{{item.title}}</p>
          <p style="float: left;margin-left: 10px;margin-top:2px;">{{item.isHideTitle == 1 ? '隐藏' :
            '显示'}}/{{item.status == 1 ? '上线' : '下线'}}</p>
          <p style="margin-left: 625px;">
            <Button @click="shwoModalTitle(item)" size="small" style="margin-right:5px;">设置</Button>
            <Button size="small" style="margin-right:5px;" @click="OperationUpward(index)">上移</Button>
            <Button size="small" @click="Operationdown(index)" style="margin-right:5px;">下移</Button>
            <Button @click="delDesktopInfo(index)" size="small">删除布局块</Button>
          </p>
        </div>
        <div class="xstv-temp17-img" v-for="(promotionOne,indexP) in item.promotion" :key="indexP" @click="infoModal(120,260,promotionOne,indexP,index)">
          <div>
            <img :src="promotionOne.imgUrl" width="260" height="120" alt="">
          </div>
          <div class="xstv-temp1-bgWenzi4" style='width:260px;'>
            <p>{{promotionOne.title}}</p>
          </div>
        </div>
      </div>
      <div style="clear: both;"></div>
      <div class="template18" v-if="item.template == 't18' && item.promotion.length > 0">
       
        <div style="margin-top: 10px;">
          <p style="font-size: 14px;margin-left: 5px;float: left;">{{item.title}}</p>
          <p style="float: left;margin-left: 10px;margin-top:2px;">{{item.isHideTitle == 1 ? '隐藏' :
            '显示'}}/{{item.status == 1 ? '上线' : '下线'}}</p>
          <p style="margin-left: 625px;">
            <Button @click="shwoModalTitle(item)" size="small" style="margin-right:5px;">设置</Button>
            <Button size="small" style="margin-right:5px;" @click="OperationUpward(index)">上移</Button>
            <Button size="small" @click="Operationdown(index)" style="margin-right:5px;">下移</Button>
            <Button @click="delDesktopInfo(index)" size="small">删除布局块</Button>
          </p>
        </div>
      </div> -->
      <!-- 推荐位管理 -->
      <Modal v-model="modalEdit" title="推荐位管理">
        <div slot="footer">
          <a @click="modalEditBtn" class="btnSpan">取消</a>
          <Button @click="editOk" type="primary">确定</Button>
        </div>
        <Form :model="edit" label-position="right" :label-width="100">
          <FormItem label="主标题:">
            <Input v-model="edit.title" placeholder="主标题..."></Input>
          </FormItem>
          <FormItem label="副标题">
            <Input v-model="edit.title2" placeholder="副标题..."></Input>
          </FormItem>
          <FormItem label="图片1:">
            <Upload :on-success="handleSuccess" :with-credentials="true" :format="['jpg','jpeg','png']"
              :on-format-error="handleFormatError" :on-exceeded-size="handleMaxSize" :action="$config.BaseURLfile + '/common/upload/file'">
              <Button icon="ios-cloud-upload-outline">上传图片1</Button>
            </Upload>
            <div style="font-size:14px">
              请上传:
              <span>{{img_w}}</span> *
              <span>{{img_h}}</span>的图片
            </div>
          </FormItem>
          <FormItem label="图片2:">
            <Upload :on-success="handleSuccess1" :with-credentials="true" :format="['jpg','jpeg','png']" :max-size="2048"
              :on-format-error="handleFormatError" :on-exceeded-size="handleMaxSize" :action="$config.BaseURLfile + '/common/upload/file'">
              <Button icon="ios-cloud-upload-outline">上传图片2</Button>
            </Upload>
            <div style="font-size:14px">
              请上传:
              <span>{{img_w}}</span> *
              <span>{{img_h}}</span>的图片
            </div>
          </FormItem>
          <FormItem label="打开方式">
            <RadioGroup>
              <Radio label="内部跳转" :true-value="1" :false-value="2" v-model="edit.actionType"></Radio>
              <Radio label="第三方应用" :true-value="2" :false-value="1" v-model="edit.actionType"></Radio>
            </RadioGroup>
          </FormItem>
          <div v-if="edit.actionType == 2">
            <FormItem label="应用下载地址:">
              <Input v-model="edit.filePath" placeholder="应用下载地址..."></Input>
            </FormItem>
            <FormItem label="应用包md5:">
              <Input v-model="edit.fileMd5" placeholder="应用包md5..."></Input>
            </FormItem>
            <FormItem label="包名:">
              <Input v-model="edit.pkg" placeholder="包名..."></Input>
            </FormItem>
          </div>
          <FormItem label="ACTION:">
            <Select style="width:389px" v-model="edit.actionId">
              <Option v-for="item in cityList" :value="item.id" :key="item.id">{{ item.title }}</Option>
            </Select>
          </FormItem>
          <FormItem label="类型:">
            <RadioGroup @on-change="changeShowParameter">
              <Radio label="参数跳转" :true-value="0" :false-value="1" v-model="edit.type"></Radio>
              <Radio label="uri跳转" :true-value="1" :false-value="0" v-model="edit.type"></Radio>
            </RadioGroup>
          </FormItem>
          <div v-if="showParameter == 'B'">
            <FormItem label="跳转参数:">
              <Input v-model="edit.params" type="textarea" :rows="4" placeholder="跳转参数参数..."></Input>
            </FormItem>
            <FormItem label="版本要求:">
              <Input v-model="edit.version" placeholder="版本要求..."></Input>
            </FormItem>
          </div>
          <div v-if="showParameter == 'A'">
            <FormItem label="uri参数:">
              <Input v-model="edit.uri" type="textarea" :rows="4" placeholder="uri参数..."></Input>
            </FormItem>
            <FormItem label="版本要求:">
              <Input v-model="edit.version" placeholder="版本要求..."></Input>
            </FormItem>
          </div>
        </Form>
      </Modal>
    </div>
    <!-- 添加模版 -->
    <div>
      <div style="clear: both;"></div>
      <Button @click="modalAdd = true;list_select_index=-1;getTemplateList()" style="margin-left: 400px;">
        <span style="font-size: 14px;">
          <Icon type="md-add" />
        </span>
        添加布局块</Button>
      <Drawer v-model="modalAdd" title="选择布局块" :width="90">
        <Tabs value="name1">
          <TabPane label="空白布局" name="name1">
            <div class="layout-layoutbucket">
              <div class="layout-layoutbucket-list">
                <RadioGroup v-model="list_select_index" style="width:100%;">
                  <Card style="width:100%;background-color: #eeeeee;margin: 10px;" v-for="(item,index) in list" v-if='item._index!=2 && item._index!=4'>
                    <Row>
                      <Col span="1">
                      <Radio :label="index">
                        <span></span>
                      </Radio>
                      </Col>
                      <Col span="8">
                      <Row>
                        <Col span="24">
                        <p>ID:{{item._index}}</p>
                        </Col>
                        <Col span="24">
                        <p>名称:{{item._name}}</p>
                        </Col>
                      </Row>
                      </Col>
                      <Col span="15">
                      <div class="template">
                        <!-- 模版1 -->
                        <div v-if="item._index == 1">
                          <p style="width:275px;height: 180px;"></p>
                          <p style="width: 130px;height:180px;"></p>
                          <p style="width: 130px;height:180px;"></p>
                          <p style="width: 130px;height:180px;"></p>
                          <p style="width: 130px;height:180px;"></p>
                        </div>
                        <!-- 模版3 -->
                        <div v-if="item._index == 3">
                          <p style="width:132px;height: 82.5px;"></p>
                          <p style="width:132px;height: 82.5px;"></p>
                          <p style="width:132px;height: 82.5px;"></p>
                          <p style="width:132px;height: 82.5px;"></p>
                          <p style="width:132px;height: 82.5px;"></p>
                          <p style="width:132px;height: 82.5px;"></p>
                        </div>
                        <!-- 模版5 -->
                        <div v-if="item._index == 5">
                          <p style="width:275px;height: 180px;"></p>
                          <p style="width: 130px;height:180px;"></p>
                          <p style="width: 130px;height:180px;"></p>
                          <p style="width: 130px;height:180px;"></p>
                          <p style="width: 130px;height:180px;"></p>
                        </div>
                        <!-- 模版6 -->
                        <div v-if="item._index == 6">
                          <p style="width:266px;height: 180px;"></p>
                          <p style="width:266px;height: 180px;"></p>
                          <p style="width:266px;height: 180px;"></p>
                        </div>
                        <!-- 模版7 -->
                        <div v-if="item._index == 7">
                          <p style="width:268px;height: 180px;"></p>
                          <p style="width:268px;height: 180px;"></p>
                          <p style="width: 130px;height:180px;"></p>
                          <p style="width: 130px;height:180px;"></p>
                        </div>
                        <!-- 模版8 -->
                        <div v-if="item._index == 8">
                          <p style="width:275px;height: 180px;"></p>
                          <p style="width: 130px;height:180px;"></p>
                          <p style="width: 130px;height:180px;"></p>
                          <p style="width: 130px;height:180px;"></p>
                          <p style="width: 130px;height:85px;"></p>
                          <p style="width: 130px;height:85px;margin-top: 8px;"></p>
                        </div>
                        <!-- 模版9 -->
                        <div v-if="item._index == 9">
                          <p style="width: 133px;height:180px;"></p>
                          <p style="width: 133px;height:180px;"></p>
                          <p style="width: 133px;height:180px;"></p>
                          <p style="width: 133px;height:180px;"></p>
                          <p style="width: 133px;height:180px;"></p>
                          <p style="width: 133px;height:180px;"></p>
                        </div>
                        <!-- 模版10 -->
                        <div v-if="item._index == 10">
                          <p style="width: 130px;height:180px;"></p>
                          <p style="width: 130px;height:180px;"></p>
                          <p style="width: 130px;height:180px;"></p>
                          <p style="width: 130px;height:180px;"></p>
                          <p style="width:275px;height: 180px;"></p>
                        </div>
                        <!-- 模版11 -->
                        <div v-if="item._index == 11">
                          <p style="width: 130px;height:180px;"></p>
                          <p style="width: 130px;height:180px;"></p>
                          <p style="width:275px;height: 180px;"></p>
                          <p style="width: 130px;height:180px;"></p>
                          <p style="width: 130px;height:180px;"></p>
                        </div>
                        <!-- 模版12 -->
                        <div v-if="item._index ==12">
                          <p style="width:268px;height: 180px;"></p>
                          <p style="width: 130px;height:180px;"></p>
                          <p style="width: 130px;height:180px;"></p>
                          <p style="width:268px;height: 180px;"></p>
                        </div>
                        <!-- 模版13 -->
                        <div v-if="item._index ==13">
                          <p style="width: 133px;height:120px;"></p>
                          <p style="width: 133px;height:120px;"></p>
                          <p style="width: 133px;height:120px;"></p>
                          <p style="width: 133px;height:120px;"></p>
                          <p style="width: 133px;height:120px;"></p>
                          <p style="width: 133px;height:120px;"></p>
                        </div>
                        <!-- 模版14 -->
                        <div v-if="item._index ==14">
                          <p style="width: 202.5px;height:110px;"></p>
                          <p style="width: 202.5px;height:110px;"></p>
                          <p style="width: 202.5px;height:110px;"></p>
                          <p style="width: 202.5px;height:110px;"></p>
                        </div>
                        <!-- 模版15 -->
                        <div v-if="item._index ==15">
                          <p style="width:134px;height: 180px;"></p>
                          <p style="width: 134px;height:180px;"></p>
                          <p style="width: 134px;height:180px;"></p>
                          <p style="width:134px;height: 180px;"></p>
                          <p style="width: 134px;height:180px;"></p>
                          <p style="width:134px;height: 180px;"></p>
                        </div>
                        <!-- 模板16 -->
                        <!-- <div v-if="item._index == 16">
                          <p style="width:250px;height: 150px;"></p>
                          <p style="width:250px;height: 150px;"></p>
                          <p style="width:250px;height: 150px;"></p>
                          <p style="width:250px;height: 150px;"></p>
                        </div> -->
                        <!-- 模板17 -->
                        <!-- <div v-if="item._index == 17">
                          <p style="width:320px;height: 120px;"></p>
                          <p style="width:320px;height: 120px;"></p>
                          <p style="width:320px;height: 120px;"></p>
                          <p style="width:320px;height: 120px;"></p>
                          <p style="width:320px;height: 120px;"></p>
                          <p style="width:320px;height: 120px;"></p>
                        </div> -->
                        <!-- 模板18 -->
                        <!-- <div v-if="item._index == 18" style='display:flex;'>
                          <p>
                            <Icon type="ios-search-outline"  style='font-size:40px;color:#fff;height:74px;line-height:74px;position:absolute;left:20px;z-index:99;'/>
                            <div><input style='width:637px;height:74px;border-radius:41px;border:0;position:relative;background:#ccc;padding-left:60px;font-size:26px;' type="text" placeholder="搜索应用"></div>
                            <Icon type="ios-mic-outline" style='font-size:46px;color:#fff;background:#ccc;width:74px;height:74px;line-height:74px;
                            border-radius:100px;text-align:center;margin-left:10px;margin-top:5px;'/>
                          </p>
                        </div> -->
                      </div>
                      </Col>
                    </Row>
                  </Card>
                </RadioGroup>
              </div>
            </div>
          </TabPane>
          <TabPane label="主题布局" name="name2">
            <!-- 主题搜索 -->
            <div>
              <Form :model="themeSerch" inline>
                <FormItem label="主题名称:" :label-width="75">
                  <Input v-model="themeSerch.input1" placeholder="请输入主题名称..."></Input>
                </FormItem>
                <FormItem>
                  <Button type="primary">搜索</Button>
                </FormItem>
              </Form>
            </div>
            <div>
              <Card style="width:100%;background-color: #eeeeee;margin:1px 10px;">
                <div class="theme-template" v-for="item in templateList" :key='item'>
                  <Row>
                    <Col span="2">
                    {{item.layoutId}}
                    </Col>
                    <Col span="22">
                    <!-- 模版13 -->
                    <div class="theme-template-13" v-if="item.layoutId == 13">
                      <div class="theme-template-13-bolck">
                        <div class="theme-template-13-img">
                          <img src="http://static.icloud.xstvos.cn/noPic.jpg" onerror="this.src='http://static.icloud.xstvos.cn/noPic.jpg'"
                            width="175" height="220" alt="">
                        </div>
                        <div class="layout-theme-template13-wenzi">
                          <p></p>
                        </div>
                      </div>
                      <div class="theme-template-13-bolck">
                        <div class="theme-template-13-img">
                          <img src="http://static.icloud.xstvos.cn/noPic.jpg" onerror="this.src='http://static.icloud.xstvos.cn/noPic.jpg'"
                            width="175" height="220" alt="">
                        </div>
                        <div class="layout-theme-template13-wenzi">
                          <p></p>
                        </div>
                      </div>
                      <div class="theme-template-13-bolck">
                        <div class="theme-template-13-img">
                          <img src="http://static.icloud.xstvos.cn/noPic.jpg" onerror="this.src='http://static.icloud.xstvos.cn/noPic.jpg'"
                            width="175" height="220" alt="">
                        </div>
                        <div class="layout-theme-template13-wenzi">
                          <p></p>
                        </div>
                      </div>
                      <div class="theme-template-13-bolck">
                        <div class="theme-template-13-img">
                          <img src="http://static.icloud.xstvos.cn/noPic.jpg" onerror="this.src='http://static.icloud.xstvos.cn/noPic.jpg'"
                            width="175" height="220" alt="">
                        </div>
                        <div class="layout-theme-template13-wenzi">
                          <p></p>
                        </div>
                      </div>
                      <div class="theme-template-13-bolck">
                        <div class="theme-template-13-img">
                          <img src="http://static.icloud.xstvos.cn/noPic.jpg" onerror="this.src='http://static.icloud.xstvos.cn/noPic.jpg'"
                            width="175" height="220" alt="">
                        </div>
                        <div class="layout-theme-template13-wenzi">
                          <p></p>
                        </div>
                      </div>
                      <div class="theme-template-13-bolck">
                        <div class="theme-template-13-img">
                          <img src="http://static.icloud.xstvos.cn/noPic.jpg" onerror="this.src='http://static.icloud.xstvos.cn/noPic.jpg'"
                            width="175" height="220" alt="">
                        </div>
                        <div class="layout-theme-template13-wenzi">
                          <p></p>
                        </div>
                      </div>
                      <div class="theme-template-13-bolck">
                        <div class="theme-template-13-img">
                          <img src="http://static.icloud.xstvos.cn/noPic.jpg" onerror="this.src='http://static.icloud.xstvos.cn/noPic.jpg'"
                            width="175" height="220" alt="">
                        </div>
                        <div class="layout-theme-template13-wenzi">
                          <p></p>
                        </div>
                      </div>
                    </div>
                    <!-- 模版14 -->
                    </Col>
                  </Row>
                </div>
                <div style="clear:both;"></div>
              </Card>
            </div>
          </TabPane>
        </Tabs>
        <div slot="close">
          <Button style="margin-right: 8px" @click="modalAdd = false">关闭</Button>
          <Button type="primary" @click="modalAddOk">确定</Button>
        </div>
      </Drawer>
    </div>
  </div>
</template>
<script>
import './basicManagement.less'
export default {
  data () {
    return {
      //验证
      ruleValidate: {
          title: [
              { required: true, message: '请输入桌面名称', trigger: 'blur' }
          ]
      },
      data2:[],//年级树
      getgradeList:[],//年级
      getgradeDescList:[],//学期
      modalAdd: false, // 添加布局块
      list: [],
      single: false,

      TabsAddInfo: {},
      TabsAdd: false, // 添加
      search: {
        title: ''
      }, // 基础模版名称
      showParameter: 'A', // 弹框中切换参数类型
      // 修改桌面
      DeskTopEdit: false,
      editDes: {},
      // desktopList: [],
      // 排序id
      value1: 1,
      // 下拉框
      cityList: [],
      desktopTp: [],
      desktopTp1: [],
      // tab分组
      tabs: [],
      // 添加弹框
      modalEdit: false,
      info: {},

      edit: {
        actionId: ''
      },
      promotionIndex: 0, // 图片是第几个
      templateIndex: 0, // 模版是第几个
      tabId: '',

      // 添加里面排序id
      value1: 1,
      // 上传
      bgurl: '',
      defaultList: [],
      imgName: '',
      visible: false,
      uploadList: [],
      // 上传参数
      data: {
        'path': 'desktop'
      },
      img_w: '',
      img_h: '',
      desktopinfo: [], // 桌面各tpl列表
      templateName: [], // 基础模版名称

      editTitle: {}, // 设置
      modalTitle: false,

      list_select_index: -1,

      templateList: [],
      themeSerch: {}, // 专题布局块搜索
      templateListId: {}
    }
  },
  methods: {
    changeShowParameter () {
      console.log(this.edit.type)
      this.showParameter = this.edit.type == 1 ? 'A' : 'B'
    },
    // action下拉框
    getSelectList () {
      let self = this
      self.$http.get(this.$config.BaseURL + '/staticpromotion/action/list').then(response => {
        console.log(response)
        self.cityList = response.data.data.list
      }, response => {

      })
    },
    // 所属模版下拉框
    getSelectList1 () {
      let self = this
      self.$http(this.$config.BaseURL + '/staticpromotion/template/list').then(response => {
        console.log(response)
        self.desktopTp = response.data.data.list

        self.desktopTp1 = response.data.data.list
        console.log(self.desktopTp)
      })
    },
    // 修改桌面弹框
    DeskTopEditBtn (tab) {
      console.log(tab)
      this.editDes = tab
      console.log(this.editDes)
      this.DeskTopEdit = true
      // 所属模版下拉框
      this.getSelectList1()
    },
    // 修改桌面确定按钮
    editDeskTopOk () {
      let self = this
      // this.editDes.templateId = this.editDes
      self.$http.post(`${this.$config.BaseURL}/staticpromotion/desktop/save`, this.editDes).then(response => {
        if (response.data.errno == 10000) {
          this.DeskTopEdit = false
        }
        console.log(response)
      })
    },
    // 编辑弹框
    // h 高
    // w 宽
    // promotion 点击的图片这一行数据
    // indexP 图片是第几个，从0开始数
    // index 是这个桌面的第几个模版
    infoModal (h, w, promotion, indexP, index) {
      this.getSelectList()
      console.log(promotion)
      // if (indexP == 0) {
      //   return
      // }
      this.modalEdit = true
      this.img_w = w
      this.img_h = h
      this.promotionIndex = indexP
      this.templateIndex = index

      this.edit = promotion

      if (typeof this.edit.type === 'undefined') {
        this.edit.type = 1
      }
      this.showParameter = this.edit.type == 1 ? 'A' : 'B' // 默认参数类型
      console.log(this.showParameter)
    },
    // 编辑确认按钮
    editOk () {
      var self = this
      // let promotionData = JSON.stringify(this.edit);

      console.log(this.edit)
      // console.log(`/staticpromotion/desktop/savepromotion?id=${this.tabId}&listId=${this.templateIndex}&promotionId=${this.promotionIndex}&promotionData=${promotionData}`);
      // return;
      var data = {
        id: this.tabId,
        listId: this.templateIndex,
        promotionId: this.promotionIndex,
        promotionData: this.edit
      }
      console.log(data)

      self.$http.post(this.$config.BaseURL +
          `/staticpromotion/desktop/savepromotion`, data
      ).then(response => {
        // 请判断errno
        if (response.data.errno == 10000) {
          this.modalEdit = false
          this.getList()
          this.$Message.success('修改成功！')
        }
      })
    },
    // 编辑取消按钮
    modalEditBtn () {
      this.modalEdit = false
      this.getList()
    },
    // 上传查看
    handleView () {
      this.visible = true
    },
    // 桌面背景上传成功
    handleEditDesSuccess (res, file) {
      console.log(res)
      if (res.errno == 10000) {
        file.url = res.data.url
        file.name = ''
        this.editDes.bgUrl = res.data.url
      }
    },
    //桌面背景图标上传成功
    handleEditDesSuccess2 (res, file) {
      console.log(res)
      if (res.errno == 10000) {
        file.url = res.data.url
        file.name = ''
        this.editDes.bgUrl = res.data.url
      }
    },
    // 上传格式验证
     handleFormatError2 (file) {
      this.$Notice.warning({
        title: '文件格式不正确',
        desc: '文件格式' + '文件名' + '不正确，请选择JPG或PNG'
      })
    },
     //修改桌面背景图标上传成功
    handleEditDesSuccess3 (res, file) {
      console.log(res)
      if (res.errno == 10000) {
        file.url = res.data.url
        file.name = ''
        this.editDes.bgUrl = res.data.url
      }
    },
    // 上传格式验证
     handleFormatError3 (file) {
      this.$Notice.warning({
        title: '文件格式不正确',
        desc: '文件格式' + '文件名' + '不正确，请选择JPG或PNG'
      })
    },
     //修改桌面背景图标上传成功
    handleEditDesSuccess4 (res, file) {
      console.log(res)
      if (res.errno == 10000) {
        file.url = res.data.url
        file.name = ''
        this.editDes.bgUrl = res.data.url
      }
    },
    // 上传格式验证
     handleFormatError4 (file) {
      this.$Notice.warning({
        title: '文件格式不正确',
        desc: '文件格式' + '文件名' + '不正确，请选择JPG或PNG'
      })
    },
    // 上传成功
    handleSuccess (res, file) {
      console.log(res)
      if (res.errno == 10000) {
        file.url = res.data.url
        file.name = ''
        // this.bgurl = res.data.url;
        this.edit.imgUrl = res.data.url
      }
    },
    //  //上传成功
    handleSuccess1 (res, file) {
      console.log(res)
      if (res.errno == 10000) {
        file.url = res.data.url
        file.name = ''
        this.bgurl = res.data.url
        this.edit.imgUrl2 = res.data.url
      }
    },
    // 上传格式验证
    handleFormatError (file) {
      this.$Notice.warning({
        title: '文件格式不正确',
        desc: '文件格式' + '文件名' + '不正确，请选择JPG或PNG'
      })
    },
    // 上传文件大小验证
    handleMaxSize (file) {
      this.$Notice.warning({
        title: '超过文件大小限制',
        desc: '文件  ' + '文件名' + ' 太大，不超过2M.'
      })
    },
    // tab导航请求接口
    getList () {    
      // /custompromotion/desktop/list                       
      let self = this
      if (self.search.title == '') {
        return
      }
      self.$http.get(this.$config.BaseURL + '/custompromotion/desktop/list?customTemplateId=' + self.search.title).then(response => {
        console.log(response)
        if (response.data.errno == 10000) {
          // 给tab导航赋值
          this.tabs = response.data.data
          if (this.tabs.length > 0) {
            this.tabChange(this.tabs[0].id)
          } else {
            this.desktopinfo = []
          }
        }
      })
    },
    // tab切换
    tabChange (tab) {
      this.id = tab
      this.tabId = tab
      this.$http.get(this.$config.BaseURL + '/staticpromotion/desktop/getdesktopinfo?id=' + tab).then(response => {
        console.log(response)
        if (response.data.errno == 10000) {
          this.desktopinfo = response.data.data.list
        }
      })
    },

    // 基础模版名称
    getTemplateName () {
      let self = this
      self.$http(this.$config.BaseURL + '/staticpromotion/template/list').then(response => {
        if (response.data.errno == 10000) {
          console.log(response,'基础模板名称')
          self.templateName = response.data.data.list

          if (typeof this.templateName !== 'undefined' && this.templateName.length > 0) {
            this.search.title = this.templateName[0].id
            this.getList()
          }
        }
      }, response => { })
    },

    // 显示设置弹框
    shwoModalTitle (item) {
      this.modalTitle = true
      this.editTitle = item
      console.log(this.editTitle)
    },
    // 设置
    editTitleOk () {
      let self = this
      this.editTitle.id = this.tabId
      self.$http.post(this.$config.BaseURL + '/staticpromotion/desktop/setlayout', this.editTitle).then(response => {
        if (response.data.errno == 10000) {
          console.log(response)
          // this.editTitle = {};
          this.modalTitle = false
          this.$Message.success('设置成功！')
        }
      })
    },
    // 设置取消按钮
    modalTitleBtn () {
      this.getList()
      this.modalTitle = false
    },
    handleTabsAdd () {
      console.log(111)
      this.TabsAdd = true
      this.getSelectList1()
    },
    // 添加
    TabsAddOk () {
      let self = this
      self.$http.post(this.$config.BaseURL + '/staticpromotion/desktop/save', self.TabsAddInfo).then(response => {
        // if (response.data.errno == 10000) {
        self.TabsAddInfo = {}
        this.getList()
        self.TabsAdd = false
        console.log(122222)
        self.$Message.success('添加成功！')
        // }
      })
    },
    // 下拉框切换
    getChange () {
      console.log(111)
      this.getList()
    },
    // 向上
    OperationUpward (index) {
      if (index == 0) {
        return
      }

      let temporaryIndex = this.desktopinfo[index]
      this.$set(this.desktopinfo, index, this.desktopinfo[index - 1])
      this.$set(this.desktopinfo, index - 1, temporaryIndex)
      // console.log(this.desktopinfo)
    },
    // 下移
    Operationdown (index) {
      if (this.desktopinfo.length - 1 == index) {
        return
      }
      let temporaryIndex = this.desktopinfo[index]
      this.$set(this.desktopinfo, index, this.desktopinfo[index + 1]) // 2
      this.$set(this.desktopinfo, index + 1, temporaryIndex)
    },
    // 保存模版列表
    saveDesktopInfo () {
      let self = this
      self.$http.post(this.$config.BaseURL + '/staticpromotion/desktop/savedata', {
        id: self.tabId,
        data: {
          list: self.desktopinfo
        }
      }).then(response => {
        if (response.data.errno == 10000) {
          console.log(111)
          this.tabChange(self.tabId)
          this.$Message.success('保存成功!')
        }
      })
    },
    // 添加布局块
    getLayoutList () {
      // /staticpromotion/layoutbucket/list
      let self = this
      self.$http(this.$config.BaseURL + '/staticpromotion/layoutbucket/list').then(response => {
        if (response.data.errno == 10000) {
          console.log(response)
          self.list = response.data.data
        }
      })
    },
    // 添加模版确定
    modalAddOk () {
      if (this.list_select_index < 0) {
        this.$Message.error('请选择布局块！')
        return
      }
      console.log(this.list_select_index)
      console.log(this.list[this.list_select_index])
      let promotion = []
      for (let i = 0; i < this.list[this.list_select_index]._count; i++) {
        promotion.push({
          imgUrl: 'http://static.icloud.xstvos.cn/noPic.jpg',
          title: ''
        })
      }
      if (typeof this.desktopinfo === 'undefined') {
        this.desktopinfo = []
      }
      this.desktopinfo.push({
        // "layoutId": this.tabId,
        'title': '',
        'template': `t${this.list[this.list_select_index]._index}`,
        'orderNum': 0,
        'promotion': promotion
      })
      console.log(this.desktopinfo)
    },
    // 删除布局块
    delDesktopInfo (index) {
      // console.log(this.desktopinfo[index]);
      // this.desktopinfo = this.desktopinfo.filter((t,k) => console.log(k != index))
      this.desktopinfo = this.desktopinfo.filter((t, k) => k != index)
    },
    // 主题模版
    getTemplateList () {
      this.$http(this.$config.BaseURL8 + '/cms/theme/desktop/getthemeinfo').then(response => {
        console.log(response)
        if (response.data.errno == 10000) {
          this.templateList = response.data.data.list
          console.log(this.templateList)
        }
      })
    },
    cancel () {
      //  console.log('cancel')
    },
    // 删除桌面
    DesktopDelBtn (tab) {
      let self = this
      self.$http(this.$config.BaseURL + '/staticpromotion/desktop/delete?id=' + tab.id).then(response => {
        console.log(response, '删除')
        if (response.data.errno == 10000) {
          console.log(response)
          // self.list = response.data.data;
          this.getList()
        }
      })
    },
    //年级树
    getgradeTree() {
        // /staticpromotion/grade/tree
        let self = this;
        self.$http(this.$config.BaseURL + '/staticpromotion/grade/tree').then(response => {
          console.log(response,'年级树');
          if(response.data.errno == 10000) {
            this.data2 = response.data.data.list;
          }
      })
    },
    //获取年级
      getgrade() {
        let self = this;
         self.$http(this.$config.BaseURL + '/staticpromotion/grade/list').then(response => {
            console.log(response,'年级');
            if(response.data.errno == 10000) {
              this.getgradeList = response.data.data.list;
            }
         
        })
      },
      // 获取学期
      getgradeDesc() {
        let self = this;
        self.$http(this.$config.BaseURL + '/staticpromotion/semester/list').then(response => {
            console.log(response,'学期');
            if(response.data.errno == 10000) {
              this.getgradeDescList = response.data.data.list;
            }
         
        })
      },
  },
    
 
  // 页面加载被调用
  mounted () {
    this.getList()
    this.getTemplateName()
    this.getLayoutList();
    // this.getgrade();
    // this.getgradeDesc();
    // this.getgradeTree();
  }
}

</script>
