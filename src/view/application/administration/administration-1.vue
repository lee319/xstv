<style>
  .layout-administration-page {
    float: right;
    margin-top: 10px;
  }

  .layout-administration .ivu-poptip-confirm .ivu-poptip-body .ivu-icon {
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

  .demo-upload-list {
    display: inline-block;
    width: 60px;
    height: 60px;
    text-align: center;
    line-height: 60px;
    border: 1px solid transparent;
    border-radius: 4px;
    overflow: hidden;
    background: #fff;
    position: relative;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
    margin-right: 4px;
  }

  .demo-upload-list img {
    width: 100%;
    height: 100%;
  }

  .demo-upload-list-cover {
    display: none;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.6);
  }

  .demo-upload-list:hover .demo-upload-list-cover {
    display: block;
  }

  .demo-upload-list-cover i {
    color: #fff;
    font-size: 20px;
    cursor: pointer;
    margin: 0 2px;
  }
</style>
<template>
  <div class="layout-administration">
    <!-- 搜索 -->
    <div class="layout-administration-search">
      <Form :model="search" inline>
        <FormItem label="应用名称:" :label-width="70">
          <Input v-model="search.name" style="width:240px" placeholder="请输入应用名称..."></Input>
        </FormItem>
        <FormItem label="一级分类:" :label-width="70">
          <Select v-model="search.category_id" style="width:200px" @on-change="changeSearchCategoryId"
            placeholder="请选择一级分类...">
            <Option value="">全部</Option>
            <Option v-for="item in cityList" :value="item.id" :key="item.id">{{ item.name }}</Option>
          </Select>
        </FormItem>
        <FormItem label="二级分类:" :label-width="70">
          <Select v-model="search.category_sub_Id" style="width:200px" placeholder="请选择二级分类...">
            <Option value="">全部</Option>
            <Option v-for="item in cityList1" :value="item.id" :key="item.id"
              v-if="item.parent_id == search.category_id || search.category_id == 0">
              {{ item.name }}</Option>
          </Select>
        </FormItem>
        <FormItem label="界面版式:" :label-width="70">
          <Select v-model="search.screen" style="width:200px" placeholder="请选择界面版式...">
            <!-- 0全部、1横屏、2，竖屏、3横竖屏兼容 -->
            <Option :value="0">全部</Option>
            <Option :value="1">横屏</Option>
            <Option :value="2">竖屏</Option>
            <Option :value="3">横竖屏兼容</Option>
          </Select>
        </FormItem>
        <FormItem label="包含付费:" :label-width="70">
          <Select v-model="search.free" style="width:200px" placeholder="请选择包含付费...">
            <!-- 0免费、1付费、2分享后免费 -->
            <Option value>全部</Option>
            <Option :value="1">付费</Option>
            <Option :value="0">免费</Option>
            <Option :value="2">分享后免费</Option>
          </Select>
        </FormItem>
        <FormItem label="上线状态:" :label-width="70">
          <Select v-model="search.status" style="width:200px" placeholder="请选择上线状态...">
            <!-- 0下线、1上线 -->
            <Option value>全部</Option>
            <Option :value="0">下线</Option>
            <Option :value="1">上线</Option>
          </Select>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="query">搜索</Button>
        </FormItem>
        <!-- <FormItem :label-width="170">
                    <Button type="success" @click="modalAdd = true">添加</Button>
        </FormItem>-->
      </Form>
    </div>
    <!-- 添加 -->
    <Modal v-model="modalAdd" title="添加应用" width="700">
      <Form :model="info" label-position="right" :label-width="130">
        <FormItem label="一级分类:">
          <Input v-model="info.input1" placeholder="请输入一级分类..."></Input>
        </FormItem>
        <FormItem label="二级分类:">
          <Input v-model="info.input2" placeholder="请输入二级分类..."></Input>
        </FormItem>
        <FormItem label="类型标签:">
          <Input v-model="info.input3" placeholder="请输入类型标签..."></Input>
        </FormItem>
        <FormItem label="应用名称:">
          <Input v-model="info.input1" placeholder="请输入应用名称..."></Input>
        </FormItem>
        <FormItem label="上传应用:">
          <Input v-model="info.input1"></Input>
        </FormItem>
        <FormItem label="应用包名:">
          <Input v-model="info.input1" placeholder="请输入应用包名..."></Input>
        </FormItem>
        <FormItem label="应用icon:">
          <Input v-model="info.input1"></Input>
        </FormItem>
        <FormItem label="版本名称:">
          <Input v-model="info.input1" placeholder="请输入版本名称..."></Input>
        </FormItem>
        <FormItem label="版本code:">
          <Input v-model="info.input1" placeholder="请输入版本code..."></Input>
        </FormItem>
        <FormItem label="应用大小:">
          <Input v-model="info.input1" placeholder="请输入应用大小..."></Input>
        </FormItem>
        <FormItem label="上传截图:">
          <Input v-model="info.input1"></Input>
        </FormItem>
        <FormItem label="截图显示:">
          <Input v-model="info.input1" placeholder="请输入截图显示..."></Input>
        </FormItem>
        <FormItem label="适用年级:">
          <Input v-model="info.input1" placeholder="请输入适用年级..."></Input>
        </FormItem>
        <FormItem label="内容是否付费:">
          <Input v-model="info.input1" placeholder="请输入内容是否付费..."></Input>
        </FormItem>
        <FormItem label="是否有广告:">
          <Input v-model="info.input1" placeholder="请输入是否有广告..."></Input>
        </FormItem>
        <FormItem label="界面版式:">
          <Input v-model="info.input1" placeholder="请输入界面版式..."></Input>
        </FormItem>
        <FormItem label="适用人群:">
          <Input v-model="info.input1" placeholder="请输入适用人群..."></Input>
        </FormItem>
        <FormItem label="应用宝下载量（万）:">
          <Input v-model="info.input1" placeholder="请输入应用宝下载量（万）..."></Input>
        </FormItem>
        <FormItem label="应用宝评分:">
          <Input v-model="info.input1" placeholder="请输入应用宝评分..."></Input>
        </FormItem>
        <FormItem label="苹果商店点评数（万):">
          <Input v-model="info.input1" placeholder="请输入苹果商店点评数（万）..."></Input>
        </FormItem>
        <FormItem label="苹果商店评分:">
          <Input v-model="info.input1" placeholder="请输入苹果商店评分..."></Input>
        </FormItem>
        <FormItem label="适用年级:">
          <Input v-model="info.input1" placeholder="请输入适用年级..."></Input>
        </FormItem>
        <FormItem label="品牌系列:">
          <Input v-model="info.input1" placeholder="请输入品牌系列..."></Input>
        </FormItem>
        <FormItem label="排序ID:">
          <Input v-model="info.input1" placeholder="请输入排序ID..."></Input>
        </FormItem>
        <FormItem label="开发商:">
          <Input v-model="info.input1" placeholder="请输入开发商..."></Input>
        </FormItem>
        <FormItem label="推荐话术:">
          <Input v-model="info.input1" type="textarea" :rows="4" placeholder="请输入推荐话术..."></Input>
        </FormItem>
        <FormItem label="权限信息:">
          <Input v-model="info.input1" type="textarea" :rows="4" placeholder="请输入权限信息..."></Input>
        </FormItem>
        <FormItem label="应用简介:">
          <Input v-model="info.input1" type="textarea" :rows="4" placeholder="请输入应用简介..."></Input>
        </FormItem>
      </Form>
    </Modal>
    <!-- 应用信息列表 -->
    <div class="layout-administration-table">
      <Table border :columns="columns1" :data="data1"></Table>
    </div>
    <!-- 应用信息分页 -->
    <div class="layout-administration-page">
      <Page :total="total" :current="page" :page-size="pageSize" @on-change="changePage" show-elevator />
    </div>
    <!-- 应用信息查看 -->
    <Modal v-model="modalSee" title="查看" width="800">
      <Row>
        <Col span="8">
        <p>一级分类:{{news.category_name}}</p>
        </Col>
        <Col span="8">
        <!-- <p>类型标签:{{news.}}</p> -->
        </Col>
        <Col span="8">
        <p>应用名称:{{news.name}}</p>
        </Col>
        <Col span="8">
        <p>应用包名:{{news.package}}</p>
        </Col>
        <Col span="8">
        应用icon:
        <img src="news.version" alt="" style="width:50px;height:50px;">
        </Col>
        <Col span="8">
        <p>版本名称:{{news.version_info.version}}</p>
        </Col>
        <Col span="8">
        <p>版本code:{{news.version_info.version_code}}</p>
        </Col>
        <Col span="8">
        <p>应用大小:{{news.version_info.file_size}}</p>
        </Col>
        <Col span="8">
        <p>内容是否付费:{{news.is_free}}</p>
        </Col>
        <Col span="8">
        <p>是否有广告:{{news.is_advert}}</p>
        </Col>
        <Col span="8">
        <p>界面版式:{{news.is_screen}}</p>
        </Col>
        <Col span="8">
        <p>适用人群:{{news.age_str}}</p>
        </Col>
        <Col span="8">
        <p>适用年级:{{news.grade_str}}</p>
        </Col>
        <Col span="8">
        <p>应用宝下载量（万）:{{news.downloads}}</p>
        </Col>
        <Col span="8">
        <p>应用宝评分:{{news.score}}</p>
        </Col>
        <Col span="8">
        <p>苹果商店点评数（万）:{{news.apple_comments}}</p>
        </Col>
        <Col span="8">
        <p>苹果商店评分:{{news.apple_score}}</p>
        </Col>
        <Col span="8">
        <p>排序ID:{{news.sort_id}}</p>
        </Col>
        <Col span="8">
        <p>开发商:{{news.developers}}</p>
        </Col>
        <Col span="8">
        <p>创建时间:{{news.create_time}}</p>
        </Col>
        <Col span="8">
        <p>版本最近更新时间:{{news.update_time}}</p>
        </Col>
        <Col span="8">
        <p>上下线状态:{{news.is_status}}</p>
        </Col>
        <Col span="8">
        <p>下线时间:{{news.offline_time}}</p>
        </Col>
        <Col span="16">
        <p>二级分类:{{news.category_sub_str}}</p>
        </Col>
        <Col span="24">
        <p>推荐话术:{{news.recommend_reason}}</p>
        </Col>
        <Col span="24">
        <p>权限信息:{{news.version_info.permission}}</p>
        </Col>
        <Col span="24">
        <p>应用简介:{{news.version_info.description}}</p>
        </Col>
      </Row>
    </Modal>
    <!-- 应用信息修改 -->
    <Modal v-model="modalEdit" title="修改" width="700">
      <div slot="footer">
        <a @click="editCancel" class="span">取消</a>
        <Button @click="editOk" type="primary">确定</Button>
      </div>
      <Form :model="edit" label-position="right" :label-width="130">
        <FormItem label="一级分类:">
          <Select v-model="edit.category_id" placeholder="请输入一级分类...">
            <Option v-for="item in cityList2" :value="item.id" :key="item.id">{{ item.name }}</Option>
          </Select>
        </FormItem>
        <FormItem label="二级分类:">
          <CheckboxGroup v-model="edit.category_sub_list">
            <Checkbox v-for="item in CheckboxList1" :label="item.id" :value="item.id"
              v-if="item.parent_id==edit.category_id">{{item.name}}</Checkbox>
          </CheckboxGroup>
        </FormItem>
        <FormItem label="类型标签:">
          <Input v-model="edit.tagsList" style="float:left;" placeholder="请输入类型标签..."></Input>
          <Button type="primary" size="small" @click="updateType()">修改</Button>
        </FormItem>
        <FormItem label="应用名称:">
          <Input v-model="edit.name" placeholder="请输入应用名称..."></Input>
        </FormItem>
        <FormItem label="内容是否付费:">
          <RadioGroup v-model="edit.free">
            <Radio :label="0">免费</Radio>
            <Radio :label="1">付费</Radio>
            <Radio :label="2">分享后免费</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="是否有广告:">
          <!-- 是否有广告：0无、1有启动广告、2有浮窗广告、3有内推广告、4有启动和浮窗广告 -->
          <RadioGroup v-model="edit.advert">
            <Radio :label="0">无</Radio>
            <Radio :label="1">有启动广告</Radio>
            <Radio :label="2">有浮窗广告</Radio>
            <Radio :label="3">有内推广告</Radio>
            <Radio :label="4">有启动和浮窗广告</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="界面版式:">
          <!-- 界面版式：1横屏、2，竖屏、3横竖屏兼容 -->
          <RadioGroup v-model="edit.screen">
            <Radio :label="1">横屏</Radio>
            <Radio :label="2">竖屏</Radio>
            <Radio :label="3">横竖屏兼容</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="适用人群:">
          <CheckboxGroup v-model="edit.age_info">
            <Checkbox v-for="item in CheckboxCrowd" :label="item.id" :value="item.id">{{item.name}}</Checkbox>
          </CheckboxGroup>
        </FormItem>
        <FormItem label="适用年级:">
          <CheckboxGroup v-model="edit.grade_info">
            <Checkbox v-for="item in Checkboxgrade" :label="item.id" :value="item.id">{{item.name}}</Checkbox>
          </CheckboxGroup>
        </FormItem>
        <FormItem label="应用宝下载量（万）:">
          <Input v-model="edit.downloads" placeholder="请输入应用宝下载量（万）..."></Input>
        </FormItem>
        <FormItem label="应用宝评分:">
          <Input v-model="edit.score" placeholder="请输入应用宝评分..."></Input>
        </FormItem>
        <FormItem label="苹果商店点评数（万):">
          <Input v-model="edit.apple_comments" placeholder="请输入苹果商店点评数（万）..."></Input>
        </FormItem>
        <FormItem label="苹果商店评分:">
          <Input v-model="edit.apple_score" placeholder="请输入苹果商店评分..."></Input>
        </FormItem>
        <FormItem label="推荐话术:">
          <Input v-model="edit.recommend_reason" type="textarea" :rows="4" placeholder="请输入推荐话术..."></Input>
        </FormItem>
        <FormItem label="排序ID:">
          <Input v-model="edit.sort_id" placeholder="请输入排序ID..."></Input>
        </FormItem>
        <FormItem label="开发商:">
          <Input v-model="edit.developers" placeholder="请输入开发商..."></Input>
        </FormItem>
        <FormItem label="权限信息:">
          <Input v-model="edit.version_info.permission" type="textarea" :rows="4" placeholder="请输入权限信息..."></Input>
        </FormItem>
        <FormItem label="创建时间:">
          <Input v-model="edit.create_time" placeholder="请输入创建时间..." disabled></Input>
        </FormItem>
        <FormItem label="版本最近更新时间:">
          <Input v-model="edit.update_time" placeholder="请输入版本最近更新时间..." disabled></Input>
        </FormItem>
        <FormItem label="上下线状态:">
          <!-- 上线状态：0下线、1上线 -->
          <Select v-model="edit.status">
            <Option :value="0">下线</Option>
            <Option :value="1">上线</Option>
          </Select>
        </FormItem>
        <FormItem label="下线时间:" v-if="edit.status == 0">
          <Input v-model="edit.offline_time" placeholder="请输入下线时间..." disabled></Input>
        </FormItem>
      </Form>
    </Modal>
    <!-- 类型标签 -->
    <Modal v-model="showUpdateTypeModel" title="修改标签" :width="30" @on-ok="okShowUpdateTypeModel">
      <Button type="primary" @click="showAddUpdateType">添加</Button>
      <Table border :columns="columnType1" :data="columnType1List"></Table>
    </Modal>
    <Modal v-model="showAddUpdateTypeModel" title="添加修改标签" :width="30" @on-ok="okAddUpdateType">
      <Input v-model="showAddUpdateTypeName" search enter-button placeholder="标签名" @on-search="searchAddUpdateType" />
      <Table border :columns="columnType2" :data="columnType2List" @on-selection-change="selectionAddUpdateType">
      </Table>
    </Modal>
    <!-- 版本信息 -->
    <div class="layout-administration-version">
      <Modal v-model="modalVersion" title="版本信息" width="1100">
        <div>
          <Form :model="versionSearch" inline>
            <FormItem label="应用名称:" :label-width="70">
              <Input v-model="rorList.name" disabled></Input>
            </FormItem>
            <FormItem label="版本名称:" :label-width="70">
              <Input v-model="versionSearch.version" placeholder="请输入版本名称..."></Input>
            </FormItem>
            <FormItem label="版本CODE:" :label-width="80">
              <Input v-model="versionSearch.version_code" placeholder="请输入版本CODE..."></Input>
            </FormItem>
            <FormItem label="发布状态" :label-width="70">
              <!-- 0:下线；1:上线 -->
              <Select v-model="versionSearch.status" style="width:150px" placeholder="请选择发布状态...">
                <Option value>全部</Option>
                <Option :value="0">失效</Option>
                <Option :value="1">发布中</Option>
              </Select>
            </FormItem>
            <FormItem>
              <Button type="primary" @click="versionQuery">搜索</Button>
            </FormItem>
            <FormItem>
              <Button type="success" @click="modalVersionAdd = true">添加</Button>
            </FormItem>
          </Form>
        </div>
        <Table border :columns="columns2" :data="data2"></Table>
        <div class="layout-administration-page">
          <Page :total="total1" :current="page1" :page-size="pageSize1" @on-change="changePage1" show-elevator />
        </div>
        <div style="margin-top:40px;"></div>
      </Modal>
      <!-- 版本信息添加 -->
      <Modal v-model="modalVersionAdd" title="添加">
        <div slot="footer">
          <a @click="versionAddCancel" class="span">取消</a>
          <Button @click="versionAddOk" type="primary">确定</Button>
        </div>
        <Form :model="versionInfo" label-position="right" :label-width="100">
          <FormItem label="应用名称:">
            <Input v-model="rorList.name" disabled></Input>
          </FormItem>
          <FormItem label="上传应用:">
            <input type="file" @change="addFileChange" accept=".apk">
          </FormItem>
          <FormItem label="应用包名:">
            <Input v-model="versionInfo.package" placeholder="请输入应用包名..."></Input>
          </FormItem>
          <FormItem label="应用icon:">
            <Upload :action="$config.BaseURLfile + '/common/upload/file'" ref="upload" :on-success="handleSuccess1"
              :format="['jpg','jpeg','png']" :max-size="2048" :on-format-error="handleFormatError1"
              :on-exceeded-size="handleMaxSize1" :with-credentials="true" clearFiles>
              <Button icon="ios-cloud-upload-outline" :with-credentials="true">上传图片</Button>
            </Upload>
          </FormItem>
          <FormItem label="版本名称:">
            <Input v-model="versionInfo.version" placeholder="请输入版本名称..."></Input>
          </FormItem>
          <FormItem label="版本code:">
            <Input v-model="versionInfo.version_code" placeholder="请输入版本code..."></Input>
          </FormItem>
          <FormItem label="应用大小:">
            <Input v-model="versionInfo.file_size" placeholder="请输入应用大小..."></Input>
          </FormItem>
          <FormItem label="上传截图:">
            <div class="demo-upload-list" v-for="item in uploadList">
              <template v-if="item.status === 'finished'">
                <img :src="item.url">
                <div class="demo-upload-list-cover">
                  <Icon type="ios-eye-outline" @click.native="handleView(item.name)"></Icon>
                  <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
                </div>
              </template>
              <template v-else>
                <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
              </template>
            </div>
            <Upload ref="upload" :show-upload-list="false" :on-success="handleSuccess" :format="['jpg','jpeg','png']"
              :max-size="2048" :on-format-error="handleFormatError" :on-exceeded-size="handleMaxSize"
              :before-upload="handleBeforeUpload" multiple type="drag"
              :action="$config.BaseURLfile + '/common/upload/file'" style="display: inline-block;width:58px;"
              :with-credentials="true">
              <div style="width: 58px;height:58px;line-height: 58px;">
                <Icon type="ios-camera" size="20"></Icon>
              </div>
            </Upload>
            <Modal title="查看图片" v-model="visible">
              <img :src="showImgUrl" v-if="visible" style="width: 100%">
            </Modal>
          </FormItem>
          <FormItem label="应用简介:">
            <Input v-model="versionInfo.description" type="textarea" :rows="4" placeholder="请输入应用简介..."></Input>
          </FormItem>
        </Form>
      </Modal>
      <!-- 版本信息修改 -->
      <Modal v-model="modalVersionEdit" title="修改">
        <div slot="footer">
          <a @click="editVersionCancel" class="span">取消</a>
          <Button @click="editVersionOk" type="primary">确定</Button>
        </div>
        <Form :model="versionEdit" label-position="right" :label-width="100">
          <FormItem label="应用名称:">
            <Input v-model="versionEdit.app_name" disabled></Input>
          </FormItem>
          <FormItem label="上传应用:">
            <input type="file" @change="editFileChange" accept=".apk">
          </FormItem>
          <FormItem label="应用包名:">
            <Input v-model="versionEdit.package" disabled></Input>
          </FormItem>
          <FormItem label="应用icon:">
            <div class="demo-upload-list" v-for="item in uploadList2">
              <template v-if="item.status === 'finished'">
                <img :src="item.url">
                <div class="demo-upload-list-cover">
                  <!-- <Icon type="ios-eye-outline" @click.native="handleView3(item.name)"></Icon>
                      <Icon type="ios-trash-outline" @click.native="handleRemove3(item)"></Icon> -->
                </div>
              </template>
              <template v-else>
                <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
              </template>
            </div>
            <Upload ref="upload2" :show-upload-list="false " :on-success="handleSuccess2" :format="['jpg','jpeg','png']"
              :max-size="2048" :on-format-error="handleFormatError2" :on-exceeded-size="handleMaxSize2"
              :default-file-list="defaultList2" multiple type="drag"
              :action="$config.BaseURLfile + '/common/upload/file'" style="display: inline-block;width:58px;"
              :with-credentials="true">
              <div style="width: 58px;height:58px;line-height: 58px;">
                <Icon type="ios-camera" size="20"></Icon>
              </div>
            </Upload>
            <!-- <Modal title="查看图片" v-model="visible2">
              <img :src="showImgUrl2" v-if="visible2" style="width: 100%">
            </Modal>
            <Upload :action="$config.BaseURLfile + '/common/upload/file'" ref="upload1" :on-success="handleSuccess2"
              :format="['jpg','jpeg','png']" :max-size="2048" :on-format-error="handleFormatError2"
              :on-exceeded-size="handleMaxSize2" :with-credentials="true" clearFiles>
              <Button icon="ios-cloud-upload-outline" :with-credentials="true">上传图片</Button>
            </Upload> -->
          </FormItem>
          <FormItem label="下载应用:">
            <Button type="primary" @click="downloadApplication()">下载应用</Button>
          </FormItem>
          <FormItem label="版本名称:">
            <Input v-model="versionEdit.version" disabled></Input>
          </FormItem>
          <FormItem label="版本code:">
            <Input v-model="versionEdit.version_code" disabled></Input>
          </FormItem>
          <FormItem label="应用大小:">
            <Input v-model="versionEdit.file_size" disabled></Input>
          </FormItem>
          <FormItem label="上传截图:">
            <div class="demo-upload-list" v-for="item in uploadList1">
              <template v-if="item.status === 'finished'">
                <img :src="item.url">
                <div class="demo-upload-list-cover">
                  <Icon type="ios-eye-outline" @click.native="handleView3(item.name)"></Icon>
                  <Icon type="ios-trash-outline" @click.native="handleRemove3(item)"></Icon>
                </div>
              </template>
              <template v-else>
                <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
              </template>
            </div>
            <Upload ref="upload3" :show-upload-list="false " :on-success="handleSuccess3" :format="['jpg','jpeg','png']"
              :max-size="2048" :on-format-error="handleFormatError3" :on-exceeded-size="handleMaxSize3"
              :default-file-list="defaultList1" :before-upload="handleBeforeUpload3" multiple type="drag"
              :action="$config.BaseURLfile + '/common/upload/file'" style="display: inline-block;width:58px;"
              :with-credentials="true">
              <div style="width: 58px;height:58px;line-height: 58px;">
                <Icon type="ios-camera" size="20"></Icon>
              </div>
            </Upload>
            <Modal title="查看图片" v-model="visible1">
              <img :src="showImgUrl1" v-if="visible1" style="width: 100%">
            </Modal>
          </FormItem>
          <FormItem label="应用简介:">
            <Input v-model="versionEdit.description" type="textarea" :rows="4" placeholder="请输入应用简介..."></Input>
          </FormItem>
        </Form>
      </Modal>
      <!-- 版本信息查看 -->
      <Modal v-model="modalVersionSee" title="查看" width="700">
        <Row>
          <Col span="8">
          <p>应用名称:{{seeVersion.app_name}}</p>
          </Col>
          <Col span="8">
          <p>应用包名:{{seeVersion.package}}</p>
          </Col>
          <Col span="8">
          <p>版本名称:{{seeVersion.version}}</p>
          </Col>
          <Col span="8">
          <p>版本code:{{seeVersion.version_code}}</p>
          </Col>
          <Col span="8">
          <p>应用大小:{{seeVersion.file_size}}</p>
          </Col>
          <Col span="8">
          <p>应用icon:
            <img :src="seeVersion.big_icon" alt style="width:50px;height:50px;">
          </p>
          </Col>
          <Col span="8">
          <p>
            <Button type="primary" @click="downloadApplication" size="small">下载应用</Button>
          </p>
          </Col>
          <Col span="8">截图显示:
          <div v-for="(one,index) in seeVersion.screen_shot">
            <img :src="one" alt style="width:50px;height:50px;float: left;">
          </div>
          </Col>
          <Col span="24">
          <p>应用简介:{{seeVersion.description}}</p>
          </Col>
        </Row>
      </Modal>
    </div>
  </div>
</template>
<script>
  import AliOSS from "@/alioss/alioss";
  export default {
    data() {
      return {
        search: {
          name: "",
          category_id: "",
          category_sub_Id: "",
          screen: "",
          free: "",
          status: ""
        }, //搜索
        cityList1: [],
        cityList: [],
        cityList2: [],
        page: 1,
        total: 0,
        pageSize: 30, //分页
        info: {},
        modalAdd: false, //添加
        addFile: null,
        edit: {
          version_info: {
            version: 1,
            version_code: 1,
            file_size: 1,
            description: 1,
            permission: 1,
            small_icon: 1,
            screen_shot: 1
          }
        }, //修改
        modalEdit: false, //修改
        modalVersion: false, //版本信息
        page1: 1,
        total1: 0,
        pageSize1: 30, //版本信息分页分页
        versionSearch: {
          version: "",
          version_code: "",
          status: ""
        }, //版本信息搜索
        rorList: [],
        CheckboxList1: [], //二级分类
        versionInfo: {},
        modalVersionAdd: false, //版本信息添加
        versionEdit: {},
        modalVersionEdit: false, //版本信息修改
        columns1: [
          {
            title: "应用ID",
            key: "id",
            align: "center"
          },
          {
            title: "应用名称",
            key: "name",
            align: "center"
          },
          {
            title: "一级分类",
            key: "category_name",
            align: "center"
          },
          {
            title: "二级分类",
            key: "category_sub_str",
            align: "center"
          },
          {
            title: "界面版式",
            key: "is_screen",
            align: "center"
          },
          {
            title: "包含付费",
            key: "is_free",
            align: "center"
          },
          {
            title: "上线状态",
            key: "is_status",
            align: "center"
          },
          {
            title: "操作",
            align: "center",
            width: 240,
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
                        this.modify(params.row);
                      }
                    }
                  },
                  "修改"
                ),
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
                        this.see(params.row);
                      }
                    }
                  },
                  "查看"
                ),
                h(
                  "Button",
                  {
                    props: {
                      type: "warning",
                      size: "small"
                    },
                    style: {
                      marginRight: "5px"
                    },
                    on: {
                      click: () => {
                        this.version(params.row);
                      }
                    }
                  },
                  "版本管理"
                ),
                h(
                  "Poptip",
                  {
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
                  },
                  [
                    h(
                      "Button",
                      {
                        props: {
                          type: "error",
                          size: "small"
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
            title: "序号",
            key: "id",
            align: "center"
          },
          {
            title: "版本CODE",
            key: "version_code",
            align: "center"
          },
          {
            title: "版本名称",
            key: "version",
            align: "center"
          },
          {
            title: "文件大小",
            key: "file_size",
            align: "center"
          },
          {
            title: "发布状态",
            key: "is_status",
            align: "center"
          },
          {
            title: "应用下载",
            key: "cdn_path",
            align: "center",
            width: 190
          },
          {
            title: "创建时间",
            key: "create_time",
            align: "center"
          },
          {
            title: "发布时间",
            key: "update_time",
            align: "center"
          },
          {
            title: "操作",
            align: "center",
            width: 200,
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
                        // 0:失效；1:发布中
                        // this.versionModify(params.row)
                        if (params.row.status == 0) {
                          this.versionSee(params.row);
                        } else if (params.row.status == 1) {
                          this.versionModify(params.row);
                        }
                      }
                    }
                  },
                  (function () {
                    console.log(params.row);
                    if (params.row.status == 0) {
                      return "查看";
                    } else if (params.row.status == 1) {
                      return "修改";
                    }
                  })()
                ),
                h(
                  "Poptip",
                  {
                    props: {
                      confirm: true,
                      title: "确定要删除吗！",
                      type: "error",
                      size: "small",
                      width: "150"
                    },
                    on: {
                      "on-ok": () => {
                        this.versionRemove(params.row);
                      }
                    }
                  },
                  [
                    h(
                      "Button",
                      {
                        props: {
                          type: "error",
                          size: "small"
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
        category_sub_list: "",
        news: {
          version_info: {
            version: 1,
            version_code: 1,
            file_size: 1,
            description: 1,
            permission: 1,
            small_icon: 1,
            screen_shot: 1
          },
          grade_info: {
            name: 1
          },
          age_info: {
            id: 1
          }
        },
        modalSee: false, //查看
        id: "",
        CheckboxCrowd: [], //适用人群
        Checkboxgrade: [],

        seeVersion: [],
        modalVersionSee: false, //版本信息查看

        addUploadUrl: "", //保存应用icon
        imgName: "",
        visible: false,
        uploadList: [],
        showImgUrl: "", //添加上传截图
        app_id: "", //应用id

        editUploadUrl: "",
        imgName1: "",
        visible1: false,
        uploadList1: [],
        defaultList1: [],
        showImgUrl1: "", //修改上传截图
        code_id: "", //版本id

        uploadList2: [],
        visible2: false,
        showImgUrl2: "", //修改应用icon
        defaultList2: [],

        showUpdateTypeModel: false, // 修改基础类型标签弹框
        // 修改标签
        columnType1: [
          {
            title: "标签id",
            key: "id",
            align: "center"
          },
          {
            title: "标签名",
            key: "name",
            align: "center"
          },
          {
            title: '操作',
            align: 'center',
            render: (h, params) => {
              return h('div', [
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
                        this.removeTagList(params.row);
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
        columnType1List: [], // 修改标签列表
        showAddUpdateTypeModel: false, // 添加标签列表
        showAddUpdateTypeName: "", // 搜索标签名
        columnType2List: [], // 添加标签弹框
        columnType2: [
          {
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


        ]
      };
    },
    methods: {
      // 版本信息添加应用icon
      handleSuccess1(res, file) {
        console.log(res);
        this.addUploadUrl = res.data.url;
        console.log(this.addUploadUrl);
      },
      // 上传格式验证
      handleFormatError1(file) {
        this.$Notice.warning({
          title: "文件格式不正确",
          desc: "文件格式" + "文件名" + "不正确，请选择JPG或PNG"
        });
      },
      handleMaxSize1(file) {
        this.$Notice.warning({
          title: "超出文件大小限制",
          desc: "文件  " + "文件名" + " 太大，不超过2M."
        });
      },
      // 结束
      // 一级分类下拉
      // getSelectList() {
      //   this.$http
      //     .get(this.$config.BaseURL11 + "/appstore/admin/v1/category/list")
      //     .then(response => {
      //       if (response.data.errno == 10000) {
      //         this.cityList = response.data.data.list;
      //         // this.infoName = response.data.data.list;
      //       }
      //     });
      // },
      // 表格数据
      getTableList() {
        if (this.search.status == undefined) {
          this.search.status = "";
        }
        if (this.search.category_id == undefined) {
          this.search.category_id = "";
        }
        if (this.search.category_sub_Id == undefined) {
          this.search.category_sub_Id = "";
        }
        if (this.search.free == undefined) {
          this.search.free = "";
        }
        this.$http
          .get(
            this.$config.BaseURL11 +
            "/appstore/admin/v1/app/info?name=" +
            this.search.name +
            "&category_id=" +
            this.search.category_id +
            "&category_sub_Id=" +
            this.search.category_sub_Id +
            "&screen=" +
            this.search.screen +
            "&free=" +
            this.search.free +
            "&status=" +
            this.search.status + '&page=' + this.page + '&page_size=' + this.pageSize
          )
          .then(response => {
            console.log(response);
            if (response.data.errno == 10000) {
              this.data1 = response.data.data.list;
              response.data.data.list.forEach(val => {
                // 横竖屏ID：0全部、1横屏、2，竖屏、3横竖屏兼容
                if (val.screen == 0) {
                  val.is_screen = "全部";
                } else if (val.screen == 1) {
                  val.is_screen = "横屏";
                } else if (val.screen == 2) {
                  val.is_screen = "竖屏";
                } else if (val.screen == 3) {
                  val.is_screen = "横竖屏兼容";
                }

                // 包含付费：0免费、1付费、2分享后免费
                if (val.free == 0) {
                  val.is_free = "免费";
                } else if (val.free == 1) {
                  val.is_free = "付费";
                } else if (val.free == 2) {
                  val.is_free = "分享后免费";
                }

                if (val.status == 0) {
                  val.is_status = "下线";
                } else if (val.status == 1) {
                  val.is_status = "上线";
                }
              });

              this.total = response.data.data.total;
            }
          });
      },
      //搜索
      query() {
        this.page = 1;
        this.getTableList();
      },
      //分页
      changePage(page) {
        this.page = page;
        this.getTableList();
      },
      // 应用信息查看
      see(row) {
        console.log(row);
        this.news = row;
        this.modalSee = true;
        // 界面版式：1横屏、2，竖屏、3横竖屏兼容
        if (row.screen == 1) {
          row.is_screen = "横屏";
        } else if (row.screen == 2) {
          row.is_screen = "竖屏";
        } else if (row.screen == 3) {
          row.is_screen = "横竖屏兼容";
        }

        // 内容是否付：0免费、1付费、2分享后免费

        if (row.free == 0) {
          row.is_free = "免费";
        } else if (row.free == 1) {
          row.is_free = "付费";
        } else if (row.free == 2) {
          row.is_free = "分享后免费";
        }

        // 是否有广告：0无、1有启动广告、2有浮窗广告、3有内推广告、4有启动和浮窗广告
        if (row.advert == 0) {
          row.is_advert = "无";
        } else if (row.advert == 1) {
          row.is_advert = "有启动广告";
        } else if (row.advert == 2) {
          row.is_advert = "有浮窗广告";
        } else if (row.advert == 3) {
          row.is_advert = "有内推广告";
        } else if (row.advert == 4) {
          row.is_advert = "有启动和浮窗广告";
        }

        // 上线状态：0下线、1上线
        if (row.status == 0) {
          row.is_status = "下线";
        } else if (row.status == 1) {
          row.is_status = "上线";
        }
      },
      //应用信息修改
      modify(row) {
        console.log(row);
        this.edit = row;

        // 标签
        let tagsNames = [];
        this.edit.label_info.forEach(val => {
          tagsNames.push(val.name);
        });
        this.edit.tagsList = tagsNames.join(';');

        this.getSelectList();
        this.modalEdit = true;
        this.category_sub_list = row.category_sub_list;
        this.getChange1();
        this.id = row.id; //应用id
        this.getCrowdList(); //使用人群和适用年纪
      },
      // 适用人群
      getCrowdList() {
        this.$http
          .get(this.$config.BaseURL11 + "/appstore/admin/v1/filters/list")
          .then(response => {
            console.log(response);
            if (response.data.errno == 10000) {
              this.CheckboxCrowd = response.data.data.age;
              this.Checkboxgrade = response.data.data.grade;
            }
          });
      },
      //应用信息修改确定按钮
      editOk() {
        this.edit.status *= 1;
        this.edit.downloads *= 1;
        this.edit.score *= 1;
        this.edit.apple_comments *= 1;
        this.edit.apple_score *= 1;
        this.$http
          .post(
            this.$config.BaseURL11 + "/appstore/admin/v1/app/modify",
            this.edit
          )
          .then(response => {
            if (response.data.errno == 10000) {
              this.modalEdit = false;
              this.getTableList();
              this.$Message.success("修改成功！");
            }
          });
      },
      // 应用信息修改取消按钮
      editCancel() {
        this.modalEdit = false;
        this.getTableList();
      },
      //应用信息删除
      remove(row) {
        this.$http
          .post(this.$config.BaseURL11 + "/appstore/admin/v1/app/remove", {
            id: row.id
          })
          .then(response => {
            if (response.data.errno == 10000) {
              this.getTableList();
              this.$Message.success("删除成功！");
            }
          });
      },
      //版本管理弹框
      version(row) {
        console.log(row);
        this.modalVersion = true;
        this.rorList = row;
        this.getVersionTableList();
        this.app_id = row.id;
      },
      //版本管理列表
      getVersionTableList() {
        if (this.versionSearch.status == undefined) {
          this.versionSearch.status = "";
        }
        this.$http
          .get(
            this.$config.BaseURL11 +
            "/appstore/admin/v1/app/version/info?version=" +
            this.versionSearch.version +
            "&version_code=" +
            this.versionSearch.version_code +
            "&status=" +
            this.versionSearch.status +
            "&page=" +
            this.page1 +
            "&page_size=" +
            this.pageSize1 +
            "&app_id=" +
            this.rorList.id
          )
          .then(response => {
            console.log(response);
            if (response.data.errno == 10000) {
              this.data2 = response.data.data.list;
              response.data.data.list.forEach(val => {
                if (val.status == 0) {
                  val.is_status = "失效";
                } else if (val.status == 1) {
                  val.is_status = "发布中";
                }
              });
            }
          });
      },
      //版本管理搜索
      versionQuery() {
        this.page1 = 1;
        this.getVersionTableList();
      },
      //版本管理分页
      changePage1(page) {
        this.page1 = page;
        this.getVersionTableList();
      },
      // 版本管理添加确定按钮
      versionAddOk() {
        this.versionInfo.version_code *= 1;
        this.versionInfo.screen_shot = [];
        // 上传icon
        this.versionInfo.big_icon = this.addUploadUrl;
        // 上传截图
        let imgUrls = [];
        this.uploadList.forEach(val => {
          console.log(val);
          imgUrls.push(val.url);
        });
        this.versionInfo.screen_shot = imgUrls;
        this.versionInfo.app_id = this.app_id;
        console.log(this.versionInfo);
        this.$http
          .post(
            this.$config.BaseURL11 + "/appstore/admin/v1/app/version/modify",
            this.versionInfo
          )
          .then(response => {
            if (response.data.errno == 10000) {
              this.versionInfo = {};
              this.getVersionTableList();
              this.modalVersionAdd = false;
              this.$Message.success("添加成功！");
            }
          });
      },
      // 版本管理添加取消按钮
      versionAddCancel() {
        this.versionInfo = {};
        this.modalVersionAdd = false;
      },
      // 版本管理修改弹框
      versionModify(row) {
        console.log(row);
        this.editUploadUrl = "";
        row = JSON.parse(JSON.stringify(row));
        this.versionEdit = row;
        this.modalVersionEdit = true;
        this.code_id = row.id;
        let defaultList = [];
        this.versionEdit.screen_shot.forEach((val, key) => {
          console.log(val);
          defaultList.push({
            'name': key + 'name',
            'url': val,
            'status': 'finished'
          });
        });
        this.uploadList1 = defaultList
      },
      // 版本管理修改确定按钮
      editVersionOk() {
        if (this.editUploadUrl != "") {
          this.versionEdit.big_icon = this.editUploadUrl;
        }
        this.versionEdit.id = this.code_id;
        this.$http
          .post(
            this.$config.BaseURL11 + "/appstore/admin/v1/app/version/modify",
            this.versionEdit
          )
          .then(response => {
            if (response.data.errno == 10000) {
              this.modalVersionEdit = false;
              this.getVersionTableList();
              this.$Message.success("修改成功！");
            }
          });
      },
      // 版本管理修改取消按钮
      editVersionCancel() {
        this.modalVersionEdit = false;
        this.getVersionTableList();
      },
      // 查看
      versionSee(row) {
        console.log(row);
        this.seeVersion = row;
        this.modalVersionSee = true;
        console.log(this.seeVersion.screen_shot);
      },
      // 版本管理删除
      versionRemove(row) {
        this.$http
          .post(
            this.$config.BaseURL11 + "/appstore/admin/v1/app/version/remove",
            {
              id: row.id
            }
          )
          .then(response => {
            if (response.data.errno == 10000) {
              this.getVersionTableList();
              this.$Message.success("删除成功！");
            }
          });
      },
      //搜索一级分类下拉框
      getSelectList() {
        // 将二级分类置空 - 搜索
        this.search.category_sub_Id = '';


        this.$http
          .get(this.$config.BaseURL11 + "/appstore/admin/v1/category/list")
          .then(response => {
            if (response.data.errno == 10000) {
              this.cityList = response.data.data.list;
              // this.cityList2 = response.data.data.list;
            }
          });
      },
      changeSearchCategoryId(val) {
        this.search.category_sub_Id = '';
      },
      //搜索二级分类
      getChange() {
        this.$http
          .get(
            this.$config.BaseURL11 +
            "/appstore/admin/v1/categorytwo/list?pageSize=" + -1
          )
          .then(response => {
            console.log(response);
            if (response.data.errno == 10000) {
              this.cityList1 = response.data.data.list;
            }
          });
      },
      // 应用信息添加二级分类下拉
      getChange1() {
        this.$http
          .get(
            this.$config.BaseURL11 +
            "/appstore/admin/v1/categorytwo/list"
          )
          .then(response => {
            if (response.data.errno == 10000) {
              this.CheckboxList1 = response.data.data.list;
            }
          });
      },
      // 版本信息添加上传应用
      addFileChange(e) {
        let files = e.target.files || e.dataTransfer.files;
        if (!files.length) {
          console.log("为选择文件");
          return;
        }
        new AliOSS(this.$http).OssUpload(files[0], uploadUrl => {
          this.versionInfo.cdn_path = uploadUrl;
        });
      },
      // 版本信息修改上传应用
      editFileChange(e) {
        let files = e.target.files || e.dataTransfer.files;
        if (!files.length) {
          console.log("为选择文件");
          return;
        }
        new AliOSS(this.$http).OssUpload(files[0], uploadUrl => {
          this.versionEdit.cdn_path = uploadUrl;
        });
      },
      //版本信息添加上传截图
      // 显示图片
      handleView(name) {
        this.imgName = name;
        this.visible = true;
        this.uploadList.forEach(val => {
          if (val.name == name) {
            this.showImgUrl = val.url;
          }
        });
      },
      // 删除
      handleRemove(file) {
        console.log(file);
        const fileList = this.$refs.upload.fileList;
        this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
      },
      // 上传成功
      handleSuccess(res, file) {
        console.log(res);
        console.log(file);
        file.url = res.data.url;
        file.name = file.name;
        console.log(file.name);
      },
      handleFormatError(file) {
        this.$Notice.warning({
          title: "文件格式不正确",
          desc: "文件格式" + "文件名" + "不正确，请选择JPG或PNG"
        });
      },
      handleMaxSize(file) {
        this.$Notice.warning({
          title: "超出文件大小限制",
          desc: "文件  " + "文件名" + " 太大，不超过2M."
        });
      },
      // 限制张数
      handleBeforeUpload() {
        const check = this.uploadList.length < 5;
        if (!check) {
          this.$Notice.warning({
            title: "最多可上传5张图片！"
          });
        }
        return check;
      },

      //版本信息添加上传截图
      // 显示图片
      handleView3(name) {
        this.imgName1 = name;
        this.visible1 = true;
        this.uploadList1.forEach(val => {
          if (val.name == name) {
            this.showImgUrl1 = val.url;
          }
        });
      },
      // 删除
      handleRemove3(file) {
        console.log(file);
        const fileList = this.$refs.upload3.fileList;
        this.$refs.upload3.fileList.splice(fileList.indexOf(file), 1);
      },
      // 上传成功
      handleSuccess3(res, file) {
        console.log(res);
        console.log(file);
        file.url = res.data.url;
        file.name = file.name;
        console.log(file.name);
      },
      // 验证格式
      handleFormatError3(file) {
        this.$Notice.warning({
          title: "文件格式不正确",
          desc: "文件格式" + "文件名" + "不正确，请选择JPG或PNG"
        });
      },
      handleMaxSize3(file) {
        this.$Notice.warning({
          title: "超出文件大小限制",
          desc: "文件  " + "文件名" + " 太大，不超过2M."
        });
      },
      // 限制张数
      handleBeforeUpload3() {
        const check = this.uploadList1.length < 5;
        if (!check) {
          this.$Notice.warning({
            title: "最多可上传5张图片！"
          });
        }
        return check;
      },


      // 上传icon成功
      handleSuccess2(res, file) {
        console.log(res);
        console.log(file);
        file.url = res.data.url;
        file.name = file.name;
        console.log(file.name);
      },
      // 验证格式
      handleFormatError2(file) {
        this.$Notice.warning({
          title: "文件格式不正确",
          desc: "文件格式" + "文件名" + "不正确，请选择JPG或PNG"
        });
      },
      handleMaxSize2(file) {
        this.$Notice.warning({
          title: "超出文件大小限制",
          desc: "文件  " + "文件名" + " 太大，不超过2M."
        });
      },
      //下载应用
      downloadApplication() {
        console.log(this.versionEdit.cdn_path);
        window.open(this.versionEdit.cdn_path, "_blank");
      },
      // 类型标签修改
      updateType() {
        this.showUpdateTypeModel = true;
        this.columnType1List = [];
        // 查询该节目的标签列表 columnType1List
        this.$http
          .get(
            this.$config.BaseURL11 +
            "/appstore/admin/v1/app/label/list?id=" +
            this.id
          )
          .then(response => {
            if (response.data.errno == 10000) {
              this.columnType1List = response.data.data.list;
              // 更新标签列表
              let typeList = [];
              this.columnType1List.forEach(val => {
                console.log(val)
                typeList.push(val.tag_name);
              });
              this.versionEdit.label_info = typeList.join(";");
              console.log(this.versionEdit.label_info);
            }
          });
      },
      // 添加标签
      showAddUpdateType() {
        this.showAddUpdateTypeModel = true;
        this.showAddUpdateTypeName = "";
        this.getShowAddUpdateTypeList();
      },
      // 确定更新类型标签
      okAddUpdateType() {
        console.log(this.addTypeselections);
        let tagIds = []; // 添加标签
        this.addTypeselections.forEach(val => {
          let isExt = false;
          this.columnType1List.forEach(v => {
            if (v.id == val.id) {
              isExt = true;
              console.log("dddd");
            }
          });
          if (isExt == false) {
            tagIds.push(val.id);
            this.columnType1List.push(val);
          }
        });

        if (tagIds.length > 0) {
          let body = {
            id: this.id * 1,
            label_ids: tagIds
          };
          this.$http
            .post(`${this.$config.BaseURL11}/appstore/admin/v1/app/label/add`, body)
            .then(response => {
              if (response.data.errno == 10000) {
                // this.updateType();
                // this.showUpdateTypeModel = false;
                this.$Message.success("标签修改成功！");
              }
            });
        }
      },
      // 修改标签弹框确定按钮
      okShowUpdateTypeModel() {
        let tagsNames = [];
        this.columnType1List.forEach(val => {
          tagsNames.push(val.name);
        });
        this.edit.tagsList = tagsNames.join(';');
      },
      // 过滤添加标签列表
      searchAddUpdateType() {
        this.getShowAddUpdateTypeList();
      },
      // 添加表格复选框选中
      selectionAddUpdateType(selections) {
        this.addTypeselections = selections;
      },
      // 获取要添加的标签列表
      getShowAddUpdateTypeList() {
        this.$http
          .get(this.$config.BaseURL11 + "/appstore/admin/v1/label/list?name=" + this.showAddUpdateTypeName)
          .then(response => {
            if (response.data.errno == 10000) {
              this.columnType2List = response.data.data.list;
            }
          });
      },
      // 删除标签 
      removeTagList(row) {
        console.log(row)
        this.$http.post(this.$config.BaseURL11 + '/appstore/admin/v1/app/label/remove', {
          id: this.id,
          label_id: row.id
        }).then(response => {
          if (response.data.errno == 10000) {
            this.updateType();
            this.$Message.success("删除成功！")
          }
        })
      }
    },
    mounted() {
      this.getTableList();
      this.getSelectList();
      this.getChange();
      // 添加上传截图
      this.uploadList = this.$refs.upload.fileList;
      //修改上传截图
      this.uploadList1 = this.$refs.upload3.fileList;
    }
  };
</script>