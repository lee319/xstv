<style>
  .layout-details-img {
  float: left;
  position: relative;
  
}

.layout-details-font {
  font-family: SourceHanSansCN-Bold;
  font-size: 14px;
  color: #333333;
  letter-spacing: 0;
}

.layout-details-font1 {
  font-family: SourceHanSansCN-Regular;
  font-size: 14px;
  color: #666666;
  letter-spacing: 0;
}

.layout-details-left {
  margin-left: 170px;
}
.layout-details-news {
  width: 100%;
  height: 100%;
  background-color: #fff;
  margin-top: 10px;
}
.layout-details-title {
  font-family: SourceHanSansCN-Bold;
  font-size: 18px;
  color: #333333;
  letter-spacing: 0;
  line-height: 14px;
}
</style>
<template>
  <div class="layout-details">
    <div class="layout-details-img" @mouseenter="moun()" @mouseleave="moun1()">
      <div><img :src="poster.url || 'http://static2.ptxstv.gitv.tv/upload/181205/png/16335130e9c5d29b1ea912fd24a3d6a8ae7062.png'"
          alt style="width:156px;height:216px;"></div>
      <div style="position:absolute;top:80px;right:55px;" @click="pushAddress()" v-if="modification">
        <span style="width:48px;height: 48px;background-color: #2d8cf0;display: block;text-align: center;padding-top:15px;border-radius:50%">
          <span style="margin-top:10px;color:#fff;">
            修改
          </span>
        </span>
      </div>
    </div>
    <div class="layout-details-left">
      <span style="font-family: SourceHanSansCN-Bold; font-size: 22px;color: #333333;letter-spacing: 0;">{{edit.title}}</span>
    </div>
    <div style="font-size:14px;" class="layout-details-left">
      <span>{{ edit.release_time }}</span>&nbsp;&nbsp;&nbsp;|&nbsp;
      <span>{{ edit.region }}</span>&nbsp;&nbsp;&nbsp;|&nbsp;
      <span>{{ edit.duration }}分钟</span>
      <span style="margin-left:200px;">播放源:</span>
      <span v-for="(item, key) in sourceList" :key="key">
        <img :src="item.logo" alt style="width:20px;height:20px;margin-left:20px;">
      </span>
      <span>
        <span style="margin-left:300px;margin-top:-10px;">
          <Button type="warning" size="small" @click="pushProduct()">返回列表</Button>
        </span>
      </span>
    </div>
    <div style="border-bottom:1px solid #E5E5E5;margin-left:170px;margin-top:10px;"></div>
    <div class="layout-details-left" style="padding:15px 0px;">
      <Row>
        <Col span="12">
        <span class="layout-details-font">
          类型标签:
          <span class="layout-details-font1">{{ edit.type }}</span>
        </span>
        </Col>
        <Col span="12">
        <span>
          <Button type="primary" size="small" @click="updateType()">修改</Button>
        </span>
        </Col>
        <Col span="24" style="margin-top:15px;">
        <span class="layout-details-font">
          新视标签:
          <span class="layout-details-font1">{{xstag.xstag}}</span>
        </span>
        </Col>
        <!-- <Col span="12" style="margin-top:15px;">
        <span>
          <Button type="primary" size="small" @click="modaltagEdit = true">修改</Button>
          <Modal v-model="modaltagEdit" title="修改新视标签" @on-ok="treeOkEdit">
            <Tree :data="data4" show-checkbox multiple @on-check-change="treeChange"></Tree>
          </Modal>
        </span>
        </Col> -->
        <Col span="12" style="margin-top:15px;">
        <span class="layout-details-font">
          关联影片:
          <span class="layout-details-font1" v-for="(item,key) in edit.namesakes" v-if="key<2" :key="item.id" @click="onNamesake(item)"
            style="padding-left:5px;">{{item.title }}</span>
        </span>
        </Col>
        <Col span="12" style="margin-top:15px;">
        <span>
          <Button type="primary" @click="modalFilm = true;getFilmList()" size="small">修改</Button>
          <Modal v-model="modalFilm" title="关联影片" width="1100" @on-ok="onModalFilm">
            <div style="float:left;">
              <Form :model="filmSearch" inline>
                <FormItem label="节目名称:" :label-width="70">
                  <Input v-model="filmSearch.title" placeholder="请输入节目名称..."></Input>
                </FormItem>
                <FormItem label="年代:" :label-width="40">
                  <Input v-model="filmSearch.publish_year" placeholder="请输入年代..."></Input>
                </FormItem>
                <FormItem label="类型标签:" :label-width="70">
                  <Input v-model="filmSearch.type" placeholder="请输入类型标签..."></Input>
                </FormItem>
                <FormItem>
                  <Button type="primary" @click="filmQuery">搜索</Button>
                </FormItem>
              </Form>
            </div>
            <div style="float:right">
              <Button type="success" @click="modalFilmAdd = true;getFilmAddList()">添加</Button>
              <Modal v-model="modalFilmAdd" title="添加" width="1100" @on-ok="onModalFilmAdd">
                <Form :model="filmSearch" inline>
                  <FormItem label="节目名称:" :label-width="70">
                    <Input v-model="filmSearchAdd.title" placeholder="请输入节目名称..."></Input>
                  </FormItem>
                  <FormItem label="年代:" :label-width="40">
                    <Input v-model="filmSearchAdd.publish_year" placeholder="请输入年代..."></Input>
                  </FormItem>
                  <FormItem label="类型标签:" :label-width="70">
                    <Input v-model="filmSearchAdd.type" placeholder="请输入类型标签..."></Input>
                  </FormItem>
                  <FormItem>
                    <Button type="primary" @click="filmAddQuery">搜索</Button>
                  </FormItem>
                </Form>
                <Table border :columns="columnsFilmAdd" :data="dataFilmAdd" @on-selection-change="onDataFilmAddSelected"></Table>
                <div style="float:right;margin-top:10px;">
                  <Page :total="totalFilmAdd" :current="pageFilmAdd" :page-size='pageSizeFilmAdd' @on-change="changePageFilmAdd"
                    show-elevator />
                </div>
                <div style="margin-top:40px;"></div>
              </Modal>
            </div>
            <div style="clear:both;"></div>
            <Table border :columns="columnsFilm" :data="dataFilm"></Table>
            <div style="float:right;margin-top:10px;">
              <Page :total="totalFilm" :current="pageFilm" :page-size='pageSizeFilm' @on-change="changePageFilm"
                show-elevator />
            </div>
            <div style="margin-top:40px;"></div>
          </Modal>
        </span>
        </Col>
        <Col span="24" style="margin-top:10px;">
        <span class="layout-details-font">
          系列节目名称:
          <span class="layout-details-font1">{{edit.series_name}}</span>
        </span>
        </Col>
      </Row>
    </div>
    <!-- 演职人员 -->

    <div style="float: left;">
      <p class="layout-details-title">演职人员</p>
      <div style="margin-top:20px;">
        <div style="width:220px;height:135px;background-color: #fff;padding:5px;float: left">
          <Row>
            <Col span="6">
            <span class="layout-details-font" style="position: relative;top:2px;">导演</span>
            </Col>
            <Col span="18">
            <Button type="primary" size="small" @click="updatePerson(1)">修改</Button>
            </Col>
            <div style="margin-left:20px;float: left;" v-for="(p, key) in directors" :key="key">
              <img :src="p.portrait || 'http://static2.ptxstv.gitv.tv/upload/181205/png/163429a9c1b3df063b1e03c85ac6b63ec2beea.png'"
                alt="" style="width:60px;height:60px;border:1px solid #ffffff;border-radius: 50%;margin-top:10px;">
              <p style="text-align: center;">{{ p.name }}</p>
            </div>
          </Row>
        </div>
        <div style="width:220px;height:135px;background-color: #fff;padding:5px;float: left;margin-left:10px;">
          <Row>
            <Col span="6">
            <span class="layout-details-font" style="position: relative;top:2px;">编剧</span>
            </Col>
            <Col span="18">
            <Button type="primary" size="small" @click="updatePerson(3)">修改</Button>
            </Col>
            <div style="margin-left:20px;float: left;" v-for="(p, key) in main_actors" :key="key">
              <img :src="p.portrait || 'http://static2.ptxstv.gitv.tv/upload/181205/png/163429a9c1b3df063b1e03c85ac6b63ec2beea.png'"
                alt="" style="width:60px;height:60px;border:1px solid #ffffff;border-radius: 50%;margin-top:10px;">
              <p style="text-align: center;">{{ p.name }}</p>
            </div>
          </Row>
        </div>
        <div style="width:600px;;height:135px;background-color: #fff;padding:5px;float: left;margin-left:10px;">
          <Row>
            <Col span="2">
            <span class="layout-details-font" style="position: relative;top:2px;">演员</span>
            </Col>
            <Col span="22">
            <Button type="primary" size="small" @click="updatePerson(2)">修改</Button>
            </Col>
            <div style="margin-left:20px;float: left;" v-for="(p, key) in writers" :key="key">
              <img :src="p.portrait || 'http://static2.ptxstv.gitv.tv/upload/181205/png/163429a9c1b3df063b1e03c85ac6b63ec2beea.png'"
                alt="" style="width:60px;height:60px;border:1px solid #ffffff;border-radius: 50%;margin-top:10px;">
              <p style="text-align: center;">{{ p.name }}</p>
            </div>
            <div style="margin-left:40px;float: left" @click="updatePerson(2)">
              <img src="../../../../../../public/more.png" alt="" style="width:60px;height:60px;border:1px solid #ffffff;border-radius: 50%;margin-top:10px;">
            </div>
          </Row>
        </div>
      </div>
    </div>
    <div style="clear:both"></div>
    <!-- 基础信息 -->
    <div style="margin-top:30px;">
      <p class="layout-details-title">
        <span>基础信息</span>
        <span style="margin-left:10px;">
          <Button type="primary" size="small" @click="showUpdateBaseInfo">修改</Button>
        </span>
      </p>
      <div class="layout-details-news">
        <Row>
          <Col span="12" style="padding:5px 10px">
          <span class="layout-details-font">片名：</span>
          <span class="layout-details-font1">{{edit.title}}</span>
          </Col>
          <Col span="12" style="padding:5px;">
          <span class="layout-details-font">又名：</span>
          <span class="layout-details-font1">{{edit.alias}}</span>
          </Col>
          <Col span="12" style="padding:5px 10px">
          <span class="layout-details-font">英文名：</span>
          <span class="layout-details-font1">{{edit.foreign_name}}</span>
          </Col>
          <Col span="12" style="padding:5px">
          <span class="layout-details-font">分级信息：</span>
          <span class="layout-details-font1">{{edit.rating}}</span>
          </Col>
          <Col span="12" style="padding:5px 10px">
          <span class="layout-details-font">出品公司：</span>
          <span class="layout-details-font1">{{edit.publish_company}}</span>
          </Col>
          <Col span="12" style="padding:5px">
          <span class="layout-details-font">发行年代：</span>
          <span class="layout-details-font1">{{edit.publish_year }}</span>
          </Col>
          <Col span="12" style="padding:5px 10px">
          <span class="layout-details-font">国家地区：</span>
          <span class="layout-details-font1">{{edit.region}}</span>
          </Col>
          <Col span="12" style="padding:5px">
          <span class="layout-details-font">节目时长：</span>
          <span class="layout-details-font1">{{edit.duration}}</span>
          </Col>
          <Col span="12" style="padding:5px 10px">
          <span class="layout-details-font">语言：</span>
          <span class="layout-details-font1">{{edit.language}}</span>
          </Col>
          <Col span="12" style="padding:5px">
          <span class="layout-details-font">官方网站：</span>
          <span class="layout-details-font1">{{edit.official_website}}</span>
          </Col>
          <Col span="12" style="padding:5px 10px">
          <span class="layout-details-font">上映时间：</span>
          <span class="layout-details-font1">{{edit.release_time}}</span>
          </Col>
          <Col span="12" style="padding:5px">
          <span class="layout-details-font">全球票房：</span>
          <span class="layout-details-font1">{{edit.global_box_office}}</span>
          </Col>
          <Col span="12" style="padding:5px 10px">
          <span class="layout-details-font">中国票房：</span>
          <span class="layout-details-font1">{{edit.chinese_box_office}}</span>
          </Col>
          <Col span="12" style="padding:5px">
          <span class="layout-details-font">内容来源：</span>
          <span class="layout-details-font1">{{edit.is_story_source}}</span>
          </Col>
          <Col span="12" style="padding:5px 10px">
          <span class="layout-details-font">是否翻拍：</span>
          <span class="layout-details-font1">{{edit.is_is_remade}}</span>
          </Col>
          <Col span="12" style="padding:5px">
          <span class="layout-details-font">一句话点评：</span>
          <span class="layout-details-font1">{{edit.brief_comment}}</span>
          </Col>
          <Col span="24" style="padding:5px 10px">
          <span class="layout-details-font">剧情简介：</span>
          <span class="layout-details-font1">{{edit.desc}}</span>
          </Col>
        </Row>
      </div>
    </div>
    <!-- 运营信息 -->
    <div style="margin-top:30px;">
      <p class="layout-details-title">
        <span>运营信息</span>
        <span style="margin-left:10px;">
          <Button type="primary" size="small" @click="showUpdateOperateInfoModel = true">修改</Button>
        </span>
      </p>
      <div class="layout-details-news">
        <Row>
          <Col span="12" style="padding:5px 10px">
          <span class="layout-details-font">权重:</span>
          <span class="layout-details-font1">{{edit.weight}}</span>
          </Col>
          <Col span="12" style="padding:5px 10px">
          <span class="layout-details-font">播放次数:</span>
          <span class="layout-details-font1">{{edit.play_count}}</span>
          </Col>
          <Col span="12" style="padding:5px 10px">
          <span class="layout-details-font">原始评分:</span>
          <span class="layout-details-font1">{{edit.origin_score}}</span>
          </Col>
          <Col span="12" style="padding:5px 10px">
          <span class="layout-details-font">豆瓣评分:</span>
          <span class="layout-details-font1">{{edit.douban_score}}</span>
          </Col>
          <Col span="12" style="padding:5px 10px">
          <span class="layout-details-font">猫眼评分:</span>
          <span class="layout-details-font1">{{edit.maoyan_score}}</span>
          </Col>
          <Col span="12" style="padding:5px 10px">
          <span class="layout-details-font">IMDB评分:</span>
          <span class="layout-details-font1">{{edit.imdb_score}}</span>
          </Col>
          <Col span="12" style="padding:5px 10px">
          <span class="layout-details-font">豆瓣网址:</span>
          <span class="layout-details-font1">{{edit.douban_url}}</span>
          </Col>
          <Col span="12" style="padding:5px 10px">
          <span class="layout-details-font">猫眼网址:</span>
          <span class="layout-details-font1">{{edit.maoyan_url}}</span>
          </Col>
          <Col span="12" style="padding:5px 10px">
          <span class="layout-details-font">IMDB网址:</span>
          <span class="layout-details-font1">{{edit.imbd_url}}</span>
          </Col>
          <Col span="12" style="padding:5px 10px">
          <span class="layout-details-font">热度:</span>
          <span class="layout-details-font1">{{edit.heat}}</span>
          </Col>
          <Col span="12" style="padding:5px 10px">
          <span class="layout-details-font">点赞数:</span>
          <span class="layout-details-font1">{{edit.praises}}</span>
          </Col>
          <Col span="12" style="padding:5px 10px">
          <span class="layout-details-font">上线状态:</span>
          <span class="layout-details-font1">{{edit.is_status}}</span>
          </Col>
          <Col span="24" style="padding:5px 10px">
          <span class="layout-details-font">备注:</span>
          <span class="layout-details-font1">{{edit.notes}}</span>
          </Col>
        </Row>
      </div>
    </div>
    <!-- 播放信息 -->
    <div style="margin-top:30px;">
      <p class="layout-details-title">
        <span>播放信息</span>
      </p>
      <div class="layout-details-news">
        <Tabs v-if="sourceList.length > 0" :value="sourceList[0].id+''" @on-click="clickSubTab" type="card">
          <TabPane v-for="(item, key) in sourceList" :key="key" :label="item.src_name" :name="item.id+''">
            <Row>
              <Col span="12" style="padding:5px 10px">
              <span class="layout-details-font">来源节目集ID：</span>
              <span class="layout-details-font1">{{item.src_media_id}}</span>
              </Col>
              <Col span="12" style="padding:5px 10px">
              <span class="layout-details-font">来源名称：</span>
              <span class="layout-details-font1">{{item.src_name}}</span>
              </Col>
              <Col span="12" style="padding:5px 10px">
              <span class="layout-details-font">最高清晰度：</span>
              <span class="layout-details-font1">{{item.best_resolution}}</span>
              </Col>
              <Col span="12" style="padding:5px 10px">
              <span class="layout-details-font">节目特性：</span>
              <span class="layout-details-font1">{{item.play_feature}}</span>
              </Col>
              <Col span="12" style="padding:5px 10px">
              <span class="layout-details-font">播放方式：</span>
              <span class="layout-details-font1">{{item.play_type}}</span>
              </Col>
              <Col span="12" style="padding:5px 10px">
              <span class="layout-details-font">来源详情ID：</span>
              <span class="layout-details-font1">{{item.play_id}}</span>
              </Col>
              <!-- <Col span="12" style="padding:5px 10px">
              <span class="layout-details-font">付费类型：</span>
              <span class="layout-details-font1">{{item.play_type}}</span>
              </Col> -->
              <Col span="12" style="padding:5px 10px">
              <span class="layout-details-font">是否会员付费：</span>
              <span class="layout-details-font1">{{item.is_is_vip}}</span>
              </Col>
              <Col span="12" style="padding:5px 10px">
              <span class="layout-details-font">是否单片付费：</span>
              <span class="layout-details-font1">{{item.is_is_tvod}}</span>
              </Col>
              <Col span="12" style="padding:5px 10px">
              <span class="layout-details-font">来源上下线状态：</span>
              <span class="layout-details-font1">{{item.is_status}}</span>
              </Col>
              <Col span="12" style="padding:5px 10px">
              <span class="layout-details-font">xstv上下线状态：</span>

              <span class="layout-details-font1">{{item.is_xstv_status}}</span>
              </Col>
              <Col span="12" style="padding:5px 10px">
              <span class="layout-details-font">价格（分）：</span>
              <span class="layout-details-font1">{{item.price}}</span>
              </Col>
            </Row>
            <div style="margin-left:10px;margin-top:20px;">
              <span>
                <Button type="primary" size="small" @click="showUpdateSourceInfo(item)">修改</Button>
              </span>
              <span style="margin-left:10px;">
                <Button type="warning" size="small" @click="polymerRelieveModel = true;polymerRelieve=item">解除聚合</Button>
              </span>
            </div>
            <p class="layout-details-font" style="margin-left:10px;margin-top:30px;">子集信息：</p>
            <div style="margin: 10px;">
              <Table border :columns="sub_columns" :data="sub_data"></Table>
              <div style="float:right;margin-top:10px;">
                <Page :total="subTotal" :current="sub_parameter.page" :page-size='sub_parameter.pageSize' @on-change="onSubPage"
                  show-elevator />
              </div>
              <div style="clear:both"></div>
            </div>
          </TabPane>
        </Tabs>
      </div>
    </div>
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
        <FormItem label="出品公司:">
          <Input v-model="baseInfo.publish_company"></Input>
        </FormItem>
        <FormItem label="发行年代:">
          <Input v-model="baseInfo.publish_year"></Input>
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
    <!-- end 基础信息 -->
    <!-- 运营信息 -->
    <Modal v-model="showUpdateOperateInfoModel" title="修改运营信息" @on-ok="okUpdateOperateInfo">
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
            <Option :value="0">下线</Option>
            <Option :value="1">上线</Option>
          </Select>
        </FormItem>
        <FormItem label="备注:">
          <Input v-model="edit.notes" type="textarea" :rows="4"></Input>
        </FormItem>
      </Form>
    </Modal>
    <!-- end 运营信息 -->
    <!-- 来源信息 -->
    <Modal v-model="showUpdateSourceInfoModel" title="修改播放来源信息" @on-ok="okUpdateSourceInfo">
      <Form :model="sourceEdit" label-position="right" :label-width="100">
        <FormItem label="来源节目集ID:">
          <Input v-model="sourceEdit.src_media_id" disabled></Input>
        </FormItem>
        <FormItem label="来源名称:">
          <Input v-model="sourceEdit.src_name" disabled></Input>
        </FormItem>
        <FormItem label="最高清晰度:">
          <Select v-model="sourceEdit.best_resolution" style="width:390px">
            <Option value="高清">高清</Option>
            <Option value="超清">超清</Option>
            <Option value="1080P">1080P</Option>
          </Select>
        </FormItem>
        <FormItem label="节目特性:">
          <CheckboxGroup v-model="sourceEdit.Is_play_feature">
            <Checkbox label="HDR">HDR</Checkbox>
            <Checkbox label="4K">4K</Checkbox>
            <Checkbox label="8k">8k</Checkbox>
            <Checkbox label="DOLBY">DOLBY</Checkbox>
            <Checkbox label="3D">3D</Checkbox>
          </CheckboxGroup>
        </FormItem>
        <FormItem label="播放方式:">
          <Select v-model="sourceEdit.play_type" style="width:390px" disabled>
            <Option :value="1">SDK</Option>
            <Option :value="2">APK</Option>
            <Option :value="3">CDN URL</Option>
          </Select>
        </FormItem>
        <FormItem label="来源详情ID:">
          {{ sourceEdit.play_id }}
        </FormItem>
        <FormItem label="是否会员付费:">
          <Select v-model="sourceEdit.is_vip" style="width:390px" disabled>
            <Option :value="1">是</Option>
            <Option :value="0">否</Option>
          </Select>
        </FormItem>
        <FormItem label="是否单片（点播）付费:">
          <Select v-model="sourceEdit.is_tvod" style="width:390px" disabled>
            <Option :value="1">是</Option>
            <Option :value="0">否</Option>
          </Select>
        </FormItem>
        <FormItem label="价格:">
          <Input v-model="sourceEdit.price" disabled></Input>
        </FormItem>
        <FormItem label="来源上下线状态:">
          <Select v-model="sourceEdit.status" disabled>
            <Option :value="0">下线</Option>
            <Option :value="1">上线</Option>
          </Select>
        </FormItem>
        <FormItem label="xstv上下线状态:">
          <Select v-model="sourceEdit.xstv_status">
            <Option :value="0">下线</Option>
            <Option :value="1">上线</Option>
          </Select>
        </FormItem>
      </Form>
    </Modal>
    <!-- 修改类型标签 -->
    <Modal v-model="showUpdateTypeModel" title="修改标签" :width="30" @on-ok="okShowUpdateType">
      <Button type="primary" @click="showAddUpdateType">添加</Button>
      <Table border :columns="columnType1" :data="columnType1List"></Table>
    </Modal>
    <Modal v-model="showAddUpdateTypeModel" title="添加修改标签" :width="30" @on-ok="okShowUpdateType">
      <Input v-model="showAddUpdateTypeName" search enter-button placeholder="标签名" @on-search="searchAddUpdateType" />
      <Table border :columns="columnType2" :data="columnType2List" @on-selection-change="selectionAddUpdateType"></Table>
    </Modal>

    <!-- 类型修改 -->
    <Modal v-model="modalEditTag" title="修改" @on-ok="okModalEditTag">
      <Form :model="EditTagRank" label-position="right" :label-width="100">
        <FormItem label="排序">
          <Input v-model="EditTagRank.rank"></Input>
        </FormItem>
      </Form>
    </Modal>
    <!-- end 修改类型标签 -->
    <!-- 修改子集信息 -->
    <Modal v-model="showSubUpdateBaseInfoModel" title="修改基础信息" @on-ok="okSubUpdateBaseInfo" :width="50">
      <Form :model="subBaseInfo" label-position="right" :label-width="100">
        <FormItem label="第三方子集ID:">
          <Input v-model="subBaseInfo.src_episode_id" disabled></Input>
        </FormItem>
        <FormItem label="子集集数:">
          <Input v-model="subBaseInfo.order" disabled></Input>
        </FormItem>
        <FormItem label="单集时长（分）:">
          <Input v-model="subBaseInfo.duration"></Input>
        </FormItem>
        <FormItem label="播放方式:">
          <Input v-model="subBaseInfo.play_type"></Input>
        </FormItem>
        <FormItem label="播放ID/URL:">
          <Input v-model="subBaseInfo.play_id" disabled></Input>
        </FormItem>
        <FormItem label="子集类型:">
          <Select v-model="subBaseInfo.content_type">
            <Option :value="1">正片</Option>
            <Option :value="2">特辑</Option>
            <Option :value="3">预告片</Option>
            <Option :value="4">片花</Option>
            <Option :value="5">花絮</Option>
            <Option :value="6">宣传片</Option>
            <Option :value="7">片段</Option>
            <Option :value="8">场景</Option>
            <Option :value="9">镜头</Option>
            <Option :value="10">看点</Option>
            <Option :value="11">音乐视频</Option>
            <Option :value="12">专题</Option>
            <Option :value="13">完整版</Option>
            <Option :value="14">单曲音乐视频</Option>
            <Option :value="15">单曲现场</Option>
            <Option :value="16">演唱会</Option>
            <Option :value="17">新闻</Option>
            <Option :value="18">访谈</Option>
            <Option :value="19">音乐记录</Option>
            <Option :value="20">音乐周边</Option>
            <Option :value="21">音乐节目</Option>
            <Option :value="22">正片片段</Option>
            <Option :value="23">段视频</Option>
            <Option :value="24">精选视频</Option>
            <Option :value="25">其他</Option>
            <Option :value="26">视频封面</Option>
          </Select>
        </FormItem>
        <FormItem label="是否付费:">
          <Input v-model="subBaseInfo.is_vip" disabled></Input>
        </FormItem>
        <FormItem label="第三方上线状态:">
          <Select v-model="subBaseInfo.status" disabled>
            <Option :value="0">下线</Option>
            <Option :value="1">上线</Option>
          </Select>
        </FormItem>
        <FormItem label="上线状态:">
          <Select v-model="subBaseInfo.xstv_status">
            <Option :value="0">下线</Option>
            <Option :value="1">上线</Option>
          </Select>
        </FormItem>
        <FormItem label="剧情简介:">
          <Input v-model="subBaseInfo.desc" type="textarea" :rows="4"></Input>
        </FormItem>
        <FormItem label="创建时间:">
          <Input v-model="subBaseInfo.create_time" disabled></Input>
        </FormItem>
        <FormItem label="更新时间:">
          <Input v-model="subBaseInfo.update_time" disabled></Input>
        </FormItem>
      </Form>
    </Modal>
    <!-- end 修改子集信息 -->
    <!-- 修改子集标签 -->
    <Modal v-model="showSubUpdateTypeTagModel" title="修改标签" :width="30" @on-ok="okShowSubUpdateType">
      <Button type="success" @click="showSubAddUpdateType">添加</Button>
      <Table border :columns="columnType3" :data="columnType3List"></Table>
    </Modal>
    <!-- end 修改子集标签 -->
    <Modal v-model="showSubAddUpdateTypeModel" title="添加修改标签" :width="30" @on-ok="okSubAddUpdateType">
      <Input v-model="showSubAddUpdateTypeName" search enter-button placeholder="标签名" @on-search="searchSubAddUpdateType" />
      <Table border :columns="columnType5" :data="columnType5List" @on-selection-change="selectionSubAddUpdateType"></Table>
    </Modal>
    <!-- 解除聚合 -->
    <Modal v-model="polymerRelieveModel" title="解除聚合" :width="30" @on-ok="okPolymerRelieve">
      <p>是否解除聚合</p>
    </Modal>

    <Modal v-model="upPerson" title="修改" @on-ok="okUpPerson" :width="50">
      <Button type="primary" @click="showAddPerson">添加</Button>
      <Table border ref="upPersonSelection" :columns="columnPersons" :data="upPersonList"></Table>
    </Modal>

    <Modal v-model="addPerson" title="修改" @on-ok="okAddPerson" :width="50">
      <Input v-model="searchAddPersonName" search enter-button placeholder="人物名" @on-search="searchAddPerson" />
      <Table border ref="addPersonSelection" :columns="columnAddPersons" :data="addPersonList" @on-selection-change="selectionAddPersons"></Table>
    </Modal>

  </div>
</template>
<script>
  export default {
    data() {
      return {
        tag_id: '',
        EditTagRank: {},
        modalEditTag: false,//类型标签
        // 子集分页
        page: 1,
        pageSize: 30,
        subTotal: 0,
        modification: false,
        xstag: {},
        modaltagEdit: false,//新视标签
        treeData: {},//节点数据

        modalFilm: false,// 关联影片
        modalFilmAdd: false,//关联影片添加
        filmSearch: {
          title: '',
          publish_year: '',
          type: ''
        },//关联影片搜索

        filmSearchAdd: {
          title: '',
          publish_year: '',
          type: ''
        },

        pageFilm: 1,
        pageSizeFilm: 30,
        totalFilm: 0,

        pageFilmAdd: 1,
        pageSizeFilmAdd: 30,
        totalFilmAdd: 0,
        // 演员
        directors: [],
        main_actors: [],
        actors: [],
        writers: [],
        upPerson: false,
        addPerson: false,
        upPersonList: [], // 修改人物列表
        addPersonList: [], // 添加时的人物列表
        searchAddPersonName: "", // 搜索人物列表 - 人物名称
        addPersonPage: 1, // 添加人物列表页码
        personType: 0, // 当前修改的人物类型
        selectionAddPersonsList: [], // 添加时选中的列表
        columnPersons: [
          {
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
                        this.removePerson(params.row);
                      }
                    }
                  },
                  "删除"
                )
              ]);
            }
          }
        ],
        columnAddPersons: [
          {
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
          }
        ],
        // 关联影片
        columnsFilm: [
          {
            title: '节目名称',
            key: 'title',
            align: "center"
          },
          {
            title: '节目分类',
            key: 'category_name',
            align: "center"
          },
          {
            title: '类型标签',
            key: 'type',
            align: "center"
          },
          {
            title: '导演',
            key: 'directors',
            align: "center"
          },
          {
            title: '上映年代',
            key: 'publish_year',
            align: "center"
          },
          {
            title: '语言',
            key: 'language',
            align: "center"
          },
          {
            title: '操作',
            width: 160,
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
        dataFilm: [],

        columnsFilmAdd: [
          {
            type: 'selection',
            width: 60,
            align: 'center'
          },
          {
            title: '节目名称',
            key: 'title',
            align: "center"
          },
          {
            title: '节目分类',
            key: 'category_name',
            align: "center"
          },
          {
            title: '类型标签',
            key: 'type',
            align: "center"
          },
          {
            title: '导演',
            key: 'directors',
            align: "center"
          },
          {
            title: '上映年代',
            key: 'publish_year',
            align: "center"
          },
          {
            title: '语言',
            key: 'language',
            align: "center"
          }
        ],

        edit1111: {},
        dataFilmAdd: [],
        dataFilmAddSelected: [], // 选中行
        id: 0, // 当前页面详情
        edit: {}, // 当前编辑页信息
        poster: {}, // 海报信息

        showUpdateBaseInfoModel: false, // 修改基础信息弹框
        baseInfo: {}, // 修改基础信息

        showUpdateOperateInfoModel: false, // 运营信息弹框


        showUpdateSourceInfoModel: false,//来源信息弹框
        sourceEdit: {},

        showUpdateTypeModel: false, // 修改基础类型标签弹框
        showAddUpdateTypeModel: false, // 添加标签列表
        showAddUpdateTypeName: "", // 搜索标签名
        addTypeselections: [], // 添加标签选中的行
        columnType1List: [], // 修改标签列表
        columnType2List: [], // 添加标签弹框
        columnType3List: [], // 子集修改标签列表
        columnType5List: [], // 添加子集标签列表

        sourceList: [], // 播放信息列表

        showSubUpdateBaseInfoModel: false,
        showSubUpdateTypeTagModel: false,
        showSubAddUpdateTypeModel: false,
        showSubAddUpdateTypeName: "",
        sub_data: [], // 子集列表数据
        subBaseInfo: {}, // 修改子集信息
        subMediaInfo: {}, // 修改的子集
        polymerRelieveModel: false,
        polymerRelieve: {}, // 解除聚合

        // 子集表头
        sub_columns: [
          {
            title: "来源子集ID",
            key: "episode_id",
            align: 'center'
          },
          {
            title: "子集集数",
            key: "order",
            align: 'center'
          },
          {
            title: "子集名称",
            key: "title",
            align: 'center'
          },
          {
            title: "子集类型",
            key: "is_content_type",
            align: 'center'
          },
          {
            title: "时长（分）",
            key: "duration",
            align: 'center'
          },
          {
            title: "来源上线状态",
            key: "is_src_status",
            align: 'center'
          },
          {
            title: "xstv上线状态",
            key: "is_xstv_status",
            align: 'center'
          },
          {
            title: "操作",
            width: 160,
            align: "center",
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
        sub_parameter: {
          pageSize: 30
        },
        // 修改标签
        columnType1: [
          {
            title: '序号',
            type: 'index',
            width: 70,
          },
          {
            title: "标签名",
            key: "tag_name"
          },
          {
            title: "排序",
            key: "rank",
            editable: true
          },
          {
            title: "操作",
            width: 160,
            align: "center",
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
                        this.EditTag(params.row);
                      }
                    }
                  },
                  "修改"
                ),
                h(
                  "Button",
                  {
                    props: {
                      type: "error",
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
            title: "分类",
            key: "category_name"
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
        columnType3: [
          {
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
        columnType5: [
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
          {
            title: "别名",
            key: "alias"
          }
        ],

        columns1: [
          {
            title: "Name",
            key: "name"
          },
          {
            title: "Age",
            key: "age"
          },
          {
            title: "Address",
            key: "address"
          }
        ],
        data1: [
          {
            name: "John Brown",
            age: 18,
            address: "New York No. 1 Lake Park",
            date: "2016-10-03"
          }
        ],
        data4: [
          {
            title: 'parent 1',
            expand: true,
            selected: true,
            children: [
              {
                title: 'getTagTreelist',
                expand: true,
                children: [
                  {
                    title: 'leaf 1-1-1',
                    disabled: true
                  },
                  {
                    title: 'leaf 1-1-2'
                  }
                ]
              },
              {
                title: 'parent 1-2',
                expand: true,
                children: [
                  {
                    title: 'leaf 1-2-1',
                    checked: true
                  },
                  {
                    title: 'leaf 1-2-1'
                  }
                ]
              }
            ]
          }
        ]

      };
    },
    methods: {
      // 获取详情信息
      getProgramDetail() {
        this.$http
          .get(
            this.$config.BaseURL1 +
            "/media/v2/complete/program/detail?id=" +
            this.id
          )
          .then(response => {
            if (response.data.errno == 10000) {
              console.log(response);
              this.edit = response.data.data;

              this.edit1111 = response.data.data.namesakes;

              console.log(this.edit1111)
              // 是否翻拍 0: 否；1: 是，默认0
              if (this.edit.is_remade == 1) {
                this.edit.is_is_remade = "是"
              } else if (this.edit.is_remade == 0) {
                this.edit.is_is_remade = "否"
              }

              // 内容来源，1: 原著改编，2: 网络小说改编，0:不确定
              if (this.edit.story_source == 1) {
                this.edit.is_story_source = "原著改编"
              } else if (this.edit.story_source == 2) {
                this.edit.is_story_source = "网络小说改编"
              } else if (this.edit.story_source == 0) {
                this.edit.is_story_source = "不确定"
              }

              //运营信息 上下线状态 1、上线 2、下线
              if (this.edit.status == 1) {
                this.edit.is_status = "上线"
              } else if (this.edit.status == 1) {
                this.edit.is_status = "下线"
              }



              this.poster = this.edit.poster;
              console.log(this.edit);
              if (
                typeof this.edit.source != "undefined" &&
                this.edit.source.length > 0
              ) {
                this.sourceList = this.edit.source;
                console.log(this.sourceList)
                // 是否会员付费1:是；0:否
                if (this.sourceList[0].is_vip == 1) {
                  this.sourceList[0].is_is_vip = '是'
                } else if (this.sourceList[0].is_vip == 0) {
                  this.sourceList[0].is_is_vip = '否'
                }

                // 是否单片（点播）付费。1:是；0:否
                if (this.sourceList[0].is_tvod == 1) {
                  this.sourceList[0].is_is_tvod = '是'
                } else if (this.sourceList[0].is_tvod == 0) {
                  this.sourceList[0].is_is_tvod = '否'
                }

                // 来源上下线状态 1上线0下线
                if (this.sourceList[0].status == 1) {
                  this.sourceList[0].is_status = '上线'
                } else if (this.sourceList[0].status == 0) {
                  this.sourceList[0].is_status = '下线'
                }

                // sxtv下线状态 1上线0下线
                if (this.sourceList[0].xstv_status == 1) {
                  this.sourceList[0].is_xstv_status = '上线'
                } else if (this.sourceList[0].xstv_status == 0) {
                  this.sourceList[0].is_xstv_status = '下线'
                }

                this.clickSubTab(this.edit.source[0].id + "");
              }
              // 演员
              if (typeof this.edit.person != 'undefined') {
                this.directors = this.edit.person.directors || [];
                if (this.directors.length > 2) {
                  this.directors = [this.directors[0], this.directors[1]];
                }
                this.main_actors = this.edit.person.main_actors || [];
                if (this.main_actors.length > 2) {
                  this.main_actors = [this.main_actors[0], this.main_actors[1]];
                }
                this.actors = this.edit.person.actors || [];
                this.writers = this.edit.person.writers || [];
              }
            }
          });
      },
      // 基础信息确定按钮
      okUpdateBaseInfo() {
        this.baseInfo.publish_year *= 1;
        this.baseInfo.duration *= 1;
        this.baseInfo.release_time *= 1;
        this.$http
          .post(
            `${this.$config.BaseURL1}/media/v2/complete/program/base/modify`,
            this.baseInfo
          )
          .then(response => {
            if (response.data.errno == 10000) {
              this.showUpdateBaseInfoModel = false;
              this.getProgramDetail()
            }
          });
      },
      // 显示基础信息修改弹框
      showUpdateBaseInfo() {
        this.showUpdateBaseInfoModel = true;
        console.log(this.edit);
        this.baseInfo = this.edit;
        this.baseInfo.album_id = this.edit.id;
        console.log(this.baseInfo)
      },

      // 运营信息确定按钮
      okUpdateOperateInfo() {
        let self = this;
        self.edit.weight = self.edit.weight * 1;
        self.edit.praises = self.edit.praises * 1;

        self.edit.play_count = self.edit.play_count * 1;
        self.edit.status = self.edit.status * 1;

        self.edit.origin_score = self.edit.origin_score * 1;
        self.edit.douban_score = self.edit.douban_score * 1;
        self.edit.maoyan_score = self.edit.maoyan_score * 1;
        self.edit.imdb_score = self.edit.imdb_score * 1;

        self.edit.album_id = self.edit.id;
        self.$http
          .post(
            this.$config.BaseURL1 + "/media/v2/complete/program/operate/modify",
            this.edit
          )
          .then(response => {
            if (response.data.errno == 10000) {
              this.showUpdateOperateInfoModel = false;
              this.$Message.success("修改成功！");
            }
          });
      },

      //来源信息
      showUpdateSourceInfo(item) {
        console.log(item)
        this.sourceEdit = item;
        this.sourceEdit.Is_play_feature = this.sourceEdit.play_feature.split(";");
        this.showUpdateSourceInfoModel = true;
      },
      // 来源信息确定按钮
      okUpdateSourceInfo() {
        let self = this;
        //this.sourceEdit.price =  this.sourceEdit.price*1
        self.$http.post(`${this.$config.BaseURL1}/media/v2/complete/program/source/modify`, {
          id: this.sourceEdit.id,
          resolution: this.sourceEdit.best_resolution,
          feature: this.sourceEdit.Is_play_feature,
          xstv_status: this.sourceEdit.xstv_status
        }).then(response => {
          if (response.data.errno == 10000) {
            this.showUpdateSourceInfoModel = false;
            this.getProgramDetail();
            this.$Message.success("修改成功！");
          }
        })
      },
      // 类型标签修改
      updateType() {
        this.showUpdateTypeModel = true;
        this.columnType1List = [];
        // 查询该节目的标签列表 columnType1List
        this.$http
          .get(
            this.$config.BaseURL1 +
            "/media/v2/complete/program/tag/list?albumId=" +
            this.id + '&category_id=' + this.category_id
          )
          .then(response => {
            if (response.data.errno == 10000) {
              this.columnType1List = response.data.data.list;
              // 更新标签列表
              let typeList = [];
              this.columnType1List.forEach(val => {
                typeList.push(val.tag_name);
              });
              this.edit.type = typeList.join(";");
              console.log(this.edit.type);
            }
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
        this.edit.type = typeList.join(";");
        console.log(this.edit.type);
      },
      // 添加标签
      showAddUpdateType() {
        this.showAddUpdateTypeModel = true;
        this.showAddUpdateTypeName = "";
        this.getShowAddUpdateTypeList();
      },
      // 确定更新类型标签
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
            this.showAddUpdateTypeName + '&category_id=' + this.category_id
          )
          .then(response => {
            if (response.data.errno == 10000) {
              this.columnType2List = response.data.data.list;
            }
          });
      },
      // 添加表格复选框选中
      selectionAddUpdateType(selections) {
        this.addTypeselections = selections;
      },
      // 确定修改标签列表
      okShowUpdateType() {
        // 11.1.1.7
        let tagIds = [];
        this.columnType1List.forEach(val => {
          tagIds.push(val.tag_id);
        });
        let body = {
          albumId: this.id * 1,
          tagIds: tagIds,
          category_id: this.category_id * 1
        };
        this.$http
          .post(
            `${this.$config.BaseURL1}/media/v2/complete/program/tag/add`,
            body
          )
          .then(response => {
            if (response.data.errno == 10000) {
              this.updateType();
              this.showUpdateTypeModel = false;
              this.$Message.success('标签修改成功！');
            }
          });
      },
      // 切换子集tab页
      clickSubTab(name) {
        console.log(name);
        // 查找到选中子集
        let sub = {};
        this.edit.source.forEach(val => {
          if (val.id == name) {
            sub = val;
          }
        });
        this.sub_parameter = {
          albumId: this.id,
          srcCode: sub.src_code,
          page: 1,
          pageSize: 30
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
        this.$http
          .get(
            this.$config.BaseURL1 +
            `/media/v2/complete/program/sub/list?albumId=${
            this.edit.id
            }&srcCode=${this.sub_parameter.srcCode}&page=${
            this.sub_parameter.page
            }&pageSize=${this.sub_parameter.pageSize}`
          )
          .then(response => {
            if (response.data.errno == 10000) {
              console.log(response);
              this.sub_data = response.data.data.list;

              this.subTotal = response.data.data.total;

              response.data.data.list.forEach(val => {
                // 子集类型
                if (val.content_type == 1) {
                  val.is_content_type = "正片";
                } else if (val.content_type == 2) {
                  val.is_content_type = '特辑';
                } else if (val.content_type == 3) {
                  val.is_content_type = '预告片';
                } else if (val.content_type == 4) {
                  val.is_content_type = '片花';
                } else if (val.content_type == 5) {
                  val.is_content_type = '花絮';
                } else if (val.content_type == 6) {
                  val.is_content_type = '宣传片';
                } else if (val.content_type == 7) {
                  val.is_content_type = '片段';
                } else if (val.content_type == 8) {
                  val.is_content_type = '场景';
                } else if (val.content_type == 9) {
                  val.is_content_type = '镜头';
                } else if (val.content_type == 10) {
                  val.is_content_type = '看点';
                } else if (val.content_type == 11) {
                  val.is_content_type = '音乐视频';
                } else if (val.content_type == 12) {
                  val.is_content_type = '专题';
                } else if (val.content_type == 13) {
                  val.is_content_type = '完整版';
                } else if (val.content_type == 14) {
                  val.is_content_type = '单曲音乐视频';
                } else if (val.content_type == 15) {
                  val.is_content_type = '单曲现场';
                } else if (val.content_type == 16) {
                  val.is_content_type = '演唱会';
                } else if (val.content_type == 17) {
                  val.is_content_type = '新闻';
                } else if (val.content_type == 18) {
                  val.is_content_type = '访谈';
                } else if (val.content_type == 19) {
                  val.is_content_type = '音乐记录';
                } else if (val.content_type == 20) {
                  val.is_content_type = '音乐周边';
                } else if (val.content_type == 21) {
                  val.is_content_type = '音乐节目';
                } else if (val.content_type == 22) {
                  val.is_content_type = '正片片段';
                } else if (val.content_type == 23) {
                  val.is_content_type = '段视频';
                } else if (val.content_type == 24) {
                  val.is_content_type = '精选视频';
                } else if (val.content_type == 25) {
                  val.is_content_type = '其他';
                } else if (val.content_type == 26) {
                  val.is_content_type = '视频封面';
                }

                // 来源上线状态
                if (val.src_status == 1) {
                  val.is_src_status = "上线"
                } else if (val.src_status == 0) {
                  val.is_src_status = "下线"
                }

                // xstv上线状态
                if (val.xstv_status == 1) {
                  val.is_xstv_status = "上线"
                } else if (val.xstv_status == 0) {
                  val.is_xstv_status = "下线"
                }
              });
              console.log(this.sub_data);
            }
          });
      },

      onSubPage(page) {
        this.sub_parameter.page = page;
        this.getSubTableList()
      },

      /* 子集信息操作 */
      updateSubMedia(row) {
        console.log(row);
        this.subMediaInfo = row;
        this.showSubUpdateBaseInfoModel = true;
        // 请求列表
        this.$http
          .get(
            `${
            this.$config.BaseURL1
            }/media/v2/complete/program/sub/detail?episode_id=${
            row.episode_id
            }&src_code=${this.sub_parameter.srcCode}`
          )
          .then(
            response => {
              if (response.data.errno == 10000) {
                this.subBaseInfo = response.data.data;
              }
            },
            response => { }
          );
      },
      // 保存子集信息 11.1.2.3 子集编辑接口
      okSubUpdateBaseInfo() {
        this.subBaseInfo.duration *= 1;
        this.$http
          .post(
            `${this.$config.BaseURL1}/media/v2/complete/program/sub/modify`,
            this.subBaseInfo
          )
          .then(
            response => {
              if (response.data.errno == 10000) {
                this.getSubTableList();
                this.showSubUpdateTypeTagModel = false;
                this.$Message.success('修改成功！')
              }
            }
          );
      },
      // 保存子集标签列表
      okShowSubUpdateType() {
        console.log(this.subBaseInfo);
        let tagIds = [];
        this.columnType3List.forEach(val => {
          tagIds.push(val.tag_id);
        });
        // 请求列表
        this.$http
          .post(
            `${this.$config.BaseURL1}/media/v2/complete/program/sub/tag/modify`,
            {
              episode_id: this.subBaseInfo.episode_id,
              tagIds: tagIds,
              src_code: this.sub_parameter.srcCode
            }
          )
          .then(response => {
            if (response.data.errno == 10000) {
              this.$Message.info(`保存成功:${response.data.data.count}`);
              this.updateSubMedia(this.subMediaInfo);
            }
          });
      },

      // 添加子集标签
      showSubAddUpdateType() {
        this.showSubAddUpdateTypeModel = true;
        this.showSubAddUpdateTypeName = "";
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
            this.showSubAddUpdateTypeName + '&category_id=' + this.category_id
          )
          .then(
            response => {
              if (response.data.errno == 10000) {
                this.columnType5List = response.data.data.list;
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
        console.log(selections);
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
      // // 运营信息确定按钮
      // okUpdateOperateInfo() {
      //   let self = this;
      //   this.edit.weight = this.edit.weight * 1;
      //   self.edit.album_id = self.edit.id;
      //   self.$http
      //     .post(
      //       this.$config.BaseURL1 + "/media/v2/complete/program/operate/modify",
      //       self.edit
      //     )
      //     .then(
      //       response => {
      //         if (response.data.errno == 10000) {
      //           this.showUpdateOperateInfoModel = false;
      //           this.$Message.success("修改成功！");
      //         }
      //       },
      //       response => { }
      //     );
      // },

      // 修改子集信息中修改标签
      updateSubType() {
        this.showSubUpdateTypeTagModel = true;
        // 请求列表
        this.$http
          .get(
            `${
            this.$config.BaseURL1
            }/media/v2/complete/program/sub/tag/list?episode_id=${
            this.subBaseInfo.episode_id
            }`
          )
          .then(
            response => {
              if (response.data.errno == 10000) {
                this.columnType3List = response.data.data.list;
              }
            }
          );
      },

      // 解除聚合
      okPolymerRelieve() {
        this.$http
          .post(
            `${
            this.$config.BaseURL1
            }/media/v2/polymer/relieve`, {
              id: this.polymerRelieve.id,
              media_id: this.polymerRelieve.xs_media_id, // ### 不知字段对不对
              source_id: this.polymerRelieve.src_media_id * 1, // ### 不知字段对不对
              polymer_type: this.polymerRelieve.polymer_type,
              polystate: this.polymerRelieve.polystate
            }
          )
          .then(
            response => {
              if (response.data.errno == 10000) {
                this.$Message.info('解除成功');
                this.getProgramDetail();
              }
            }
          );
      },
      // 返回列表页
      pushProduct() {
        this.$router.push({ path: "/product" });
      },
      // 跳转海报管理
      pushAddress() {
        console.log(111)
        this.$router.push({ path: '/capital/address', query: { edit: this.edit } });
      },
      // 修改海报鼠标移入
      moun() {
        this.modification = true;
      },
      // 修改海报鼠标移出
      moun1() {
        this.modification = false;
      },
      // 人物修改
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
              }
            }
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
            this.$config.BaseURL1 + "/media/v2/complete/program/person/modify",
            {
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
                this.getProgramDetail();
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
      // 删除人物
      removePerson(row) {
        console.log(row);
        let personList = [];
        this.upPersonList.forEach(val => {
          if (val.person_id != row.person_id) {
            personList.push(val);
          }
        });
        this.upPersonList = personList;
      },
      // 修改新视标签
      getTaglist() {
        console.log(this.edit)
        this.$http.get(this.$config.BaseURL7 + '/media/v2/xsmedia/taglist?id=' + this.id).then(response => {
          if (response.data.errno == 10000) {
            console.log(response);
            this.xstag = response.data.data;
          }
        })
      },
      // 修改新视标签 树形
      getTagTreelist() {
        this.$http(this.$config.BaseURL7 + '/media/v2/xstag/list?category_id=' + this.category_id).then(response => {
          if (response.data.errno == 10000) {
            this.data4 = response.data.data;
          }
        })
      },
      treeChange(val) {
        console.log(val)
        this.treeData = val;
        console.log(this.treeData.aid)
      },
      //修改确定按钮
      // /media/v2/xsmedia/tagmodify
      treeOkEdit() {
        let aidList = [];
        this.treeData.forEach(val => {
          if (val.children && val.children.length == 0) {
            aidList.push(val.aid);
          }
        });
        console.log(aidList);

        this.$http.post(this.$config.BaseURL7 + '/media/v2/xsmedia/tagmodify', {
          id: this.id * 1,
          xs_tag: aidList.join(',')
        }, this.treeData).then(response => {
          if (response.data.errno == 10000) {
            this.modaltagEdit = false;
            this.getTaglist()
          }
        })
      },
      //关联影片列表
      getFilmList() {
        this.$http(this.$config.BaseURL1 + '/media/v2/complete/program/sakes/list?albumId=' + this.id + '&title=' + this.filmSearch.title + '&publish_year=' + this.filmSearch.publish_year + '&type=' + this.filmSearch.type +
          '&page=' + this.pageFilm + '&pageSize=' + this.pageSizeFilm).then(response => {
            if (response.data.errno == 10000) {
              console.log(response)
              this.dataFilm = response.data.data.list;

              this.totalFilm = response.data.data.total;
            }
          })
      },
      changePageFilm(page) {
        this.pageFilm = page;
        this.getFilmList()
      },
      // 搜索
      filmQuery() {
        this.pageFilm = 1;
        this.getFilmList();
      },
      //关联影片添加
      getFilmAddList() {
        this.$http.get(this.$config.BaseURL1 + '/media/v2/complete/program/list?title=' + this.filmSearchAdd.title + '&publish_year=' + this.filmSearchAdd.publish_year + '&type=' + this.filmSearchAdd.type +
          '&page=' + this.pageFilmAdd + '&pageSize=' + this.pageSizeFilmAdd).then(response => {
            if (response.data.errno == 10000) {
              console.log(response)
              this.dataFilmAdd = response.data.data.list;

              this.totalFilmAdd = response.data.data.total;
            }
          })
      },
      // 搜索
      filmAddQuery() {
        this.getFilmAddList()
      },
      changePageFilmAdd(page) {
        this.pageFilmAdd = page;
        this.getFilmAddList()
      },
      //删除
      remove(row) {
        console.log(row)
        this.$http.post(this.$config.BaseURL1 + '/media/v2/complete/program/sakes/delete', {
          albumId: this.id * 1,
          sake_id: row.sakes_id
        }).then(response => {
          if (response.data.errno == 10000) {
            this.getFilmList();
            this.$Message.success('删除成功!');
          }
        })
      },
      // 选中行
      onDataFilmAddSelected(selection) {
        this.dataFilmAddSelected = selection;
        // this.dataFilm.concat(selection);
        console.log(this.dataFilmAddSelected)
      },
      // 确定添加
      onModalFilmAdd() {
        // this.dataFilmAddSelected = this.dataFilmAddSelected || [];
        this.dataFilm = this.dataFilm.concat(this.dataFilmAddSelected);
        console.log(this.dataFilm)
      },
      // 确定保存数据
      onModalFilm() {
        let sakesIds = [];
        this.dataFilm.forEach(val => {
          console.log(val);
          sakesIds.push(val.id || val.sakes_id);
        });
        this.$http.post(this.$config.BaseURL1 + '/media/v2/complete/program/sakes/modify', {
          albumId: this.id * 1,
          sakes_id: sakesIds
        }).then(response => {
          if (response.data.errno == 10000) {
            this.$Message.success('成功!');
            this.getProgramDetail();
          }
        })
      },
      //关联影片跳转
      onNamesake(item) {
        console.log(item);
        this.id = item.id;
        this.getProgramDetail();
        this.getTaglist();
        this.getTagTreelist()
      },
      //标签修改排序弹框
      EditTag(row) {
        console.log(row);
        this.tag_id = row.tag_id;
        this.EditTagRank = row;
        this.modalEditTag = true;
      },
      // 修改排序确定按钮
      okModalEditTag() {
        this.EditTagRank.albumId = this.id * 1;
        this.EditTagRank.tag_id = this.tag_id;
        this.EditTagRank.rank *=1;
        this.$http.post(this.$config.BaseURL1 + '/media/v2/complete/program/tag/modify', this.EditTagRank).then(response => {
          if (response.data.errno == 10000) {
            this.modalEditTag = false;
            // this.updateType();
            this.$Message.success('修改成功！')
          }
        })
      }


    },
    mounted() {
      this.id = this.$route.query.id;
      this.category_id = this.$route.query.category_id;
      this.getProgramDetail();
      this.getTaglist();
      this.getTagTreelist()
      console.log(this.$route.query.id);
      console.log(this.$route.query.category_id);
    }

  };
</script>