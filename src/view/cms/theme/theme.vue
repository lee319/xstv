<style scoped>
    .layout-theme-search{
        float: left;
    }
    .layout-theme-add{
        float: right;  
    }
    .layout-theme-page{
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
    .layout-theme .ivu-poptip-confirm .ivu-poptip-body .ivu-icon {
        font-size: 16px;
        color: #ff9900;
        line-height: 18px;
        position: absolute;
        margin-left: -50px;
    }

    /* 模版 */
    .layout-theme-template{
        margin-top:10px;
    }
    /* .layout-theme-template13{
        width: 940px;
        height: 260px;
        background-color: #eeeeee;
    } */
    .layout-theme-template13 .layout-theme-template13-float{
        float: left;
        margin-left:5px;
        margin-bottom: -35px;

    }
    .layout-theme-template13 .layout-theme-template13-wenzi{
        position: relative;
        width:150px;
        height: 40px;
        top:-45px;
        line-height: 40px;
        text-align: center;
        background-color: rgba(0,0,0,0.5);
        opacity: 0.5;
        color:#ffffff;
    }
    .layout-theme-template14 .layout-theme-template14-float{
        float: left;
        margin-left:5px;
        margin-bottom: -35px;
    }
    .layout-theme-template14 .layout-theme-template14-top{
        float: left;
        margin-left:5px;
        margin-bottom: -35px;
    }
    .layout-theme-template14  .layout-theme-template14-wenzi{
        position: relative;
        width:300px;
        height: 40px;
        top:-45px;
        line-height: 40px;
        text-align: center;
        background-color: rgba(0,0,0,0.5);
        opacity: 0.5;
        color:#ffffff;
    }
    
    .layout-theme-template14-top-wenzi{
        position: relative;
        width:150px;
        height: 40px;
        top:-45px;
        line-height: 40px;
        text-align: center;
        background-color: rgba(0,0,0,0.5);
        opacity: 0.5;
        color:#ffffff;
    }

    .layout-theme-template15 .layout-theme-template15-float{
        float: left;
        margin-left:5px;
        margin-bottom: -35px;
    }
    .layout-theme-template15-wenzi{
        position: relative;
        width:450px;
        height: 40px;
        top:-45px;
        line-height: 40px;
        text-align: center;
        background-color: rgba(0,0,0,0.5);
        opacity: 0.5;
        color:#ffffff;
    }

    .layout-theme-template15-top{
        float: left;
        margin-left:5px;
        margin-bottom: -35px;
    }
    .layout-theme-template15-top-wenzi{
        position: relative;
        width:150px;
        height: 40px;
        top:-45px;
        line-height: 40px;
        text-align: center;
        background-color: rgba(0,0,0,0.5);
        opacity: 0.5;
        color:#ffffff;
    }
    .layout-theme-template16 .layout-theme-template16-float{
        float: left;
        margin-left:5px;
        margin-bottom: -35px;
    }
    .layout-theme-template16-wenzi{
        position: relative;
        width:600px;
        height: 40px;
        top:-45px;
        line-height: 40px;
        text-align: center;
        background-color: rgba(0,0,0,0.5);
        opacity: 0.5;
        color:#ffffff;
    }
    .layout-theme-template16-top{
        float: left;
        margin-left:5px;
        margin-bottom: -35px;
    }
    .layout-theme-template16-top-wenzi{
        position: relative;
        width:150px;
        height: 40px;
        top:-45px;
        line-height: 40px;
        text-align: center;
        background-color: rgba(0,0,0,0.5);
        opacity: 0.5;
        color:#ffffff;
    }
    .layout-theme-template21 .layout-theme-template21-float{
        float: left;
        margin-left:5px;
        margin-bottom: -35px;
    }
    .layout-theme-template21-wenzi{
        position: relative;
        width:300px;
        height: 40px;
        top:-45px;
        line-height: 40px;
        text-align: center;
        background-color: rgba(0,0,0,0.5);
        opacity: 0.5;
        color:#ffffff;
    }
    .layout-theme-template21-top{
        float: left;
        margin-left:5px;
        margin-bottom: -35px;
    }
    .layout-theme-template21-top-wenzi{
        position: relative;
        width:150px;
        height: 40px;
        top:-45px;
        line-height: 40px;
        text-align: center;
        background-color: rgba(0,0,0,0.5);
        opacity: 0.5;
        color:#ffffff;
    }
    .layout-theme-template22-float{
        float: left;
        margin-left:5px;
        margin-bottom: -35px;
    }
    .layout-theme-template22-wenzi{
        position: relative;
        width:300px;
        height: 40px;
        top:-45px;
        line-height: 40px;
        text-align: center;
        background-color: rgba(0,0,0,0.5);
        opacity: 0.5;
        color:#ffffff;
    }
    .layout-theme-template23-float{
        float: left;
        margin-left:5px;
        margin-bottom: -35px;
    }
    .layout-theme-template23-wenzi{
        position: relative;
        width:460px;
        height: 40px;
        top:-45px;
        line-height: 40px;
        text-align: center;
        background-color: rgba(0,0,0,0.5);
        opacity: 0.5;
        color:#ffffff;
    }
    .ivu-radio-group-default {
        width: 100%;
    }

    .span {
        font-size: 14px;
        margin: 15px;
        color: #495060;
        padding-bottom: 20px;
    }

    .layout-theme .ivu-poptip-confirm .ivu-poptip-body .ivu-icon {
        font-size: 16px;
        color: #ff9900;
        line-height: 18px;
        position: absolute;
        margin-left: -54px;
    }
    .ivu-table th,
    .ivu-table td {
        height: 40px;
    }
</style>
<template>
    <div class="layout-theme">
        <!-- 主题搜索 -->
        <div class="layout-theme-search">
            <Form :model="themeSearch" inline>
                <FormItem label="主题名称:" :label-width="70">
                    <Input v-model="themeSearch.theme_title" style="width:200px;" placeholder="请输入主题名称..."></Input>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="themeQuery">搜索</Button>
                </FormItem>
            </Form>
        </div>
        <!-- 主题添加 -->
        <div class="layout-theme-add">
            <Button type="success" @click="modalThemeAdd = true">添加</Button>
            <Modal v-model="modalThemeAdd" title="添加主题">
                <div slot="footer">
                    <a @click="addThemeCancel" class="span">取消</a>
                    <Button @click="addThemeOk" type="primary">确定</Button>
                </div>
                <Form :model="themeInfo" label-position="right" :label-width="100">
                    <FormItem label="主题名称:">
                        <Input v-model="themeInfo.theme_title" placeholder="请输入主题名称..."></Input>
                    </FormItem>
                    <FormItem label="显示名称:">
                        <Input v-model="themeInfo.display_title" placeholder="请输入显示名称..."></Input>
                    </FormItem>
                    <FormItem label="是否关联专题:">
                        <RadioGroup v-model="themeInfo.is_relate">
                            <Radio label="1">
                                <span>是</span>
                            </Radio>
                            <Radio label="0">
                                <span>否</span>
                            </Radio>
                        </RadioGroup>
                    </FormItem>
                    <FormItem label="专题名称:" v-if="themeInfo.is_relate !=0">
                        <Input v-model="themeInfo.wrap_title" placeholder="请输入专题名称..." disabled></Input>
                        <Button type="primary" size="small" @click="modalSpecialEdit = true;getSpecialList()">修改</Button>
                        <Modal v-model="modalSpecialEdit" title="专题" width="1100" @on-ok="okSpecialOne">
                            <Form :model="specialSearch" inline>
                                <FormItem label="专题名称:" :label-width="70">
                                    <Input v-model="specialSearch.wrap_name" placeholder="请输入专题名称..." style="width:200px;"></Input>
                                </FormItem>
                                <FormItem label="专题类型:" :label-width="70">
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
                            <Table border :columns="columns2" :data="data2" :highlight-row="true" @on-row-click="specialListOne"></Table>
                            <div class="layout-theme-page">
                                <Page :total="totalSpecial" :current="pageSpecial" :page-size='pageSizeSpecial'
                                    @on-change="changePageSpecial" show-elevator />
                            </div>
                            <div style="margin-top:40px;"></div>
                        </Modal>
                    </FormItem>
                    <FormItem label="描述:">
                        <Input v-model="themeInfo.desc" type="textarea" :rows="4" placeholder="请输入描述..."></Input>
                    </FormItem>
                </Form>
            </Modal>
        </div>
        <div style="clear:both;"></div>
        <!-- 主题表格 -->
        <div class="layout-theme-table">
            <Table border :columns="columns1" :data="data1"></Table>
        </div>
        <!-- 主题分页 -->
        <div class="layout-theme-page">
            <Page :total="total" :current="page" :page-size='pageSize' @on-change="changePage" show-elevator />
        </div>
        <!-- 主题修改 -->
        <Modal v-model="modalThemeEdit" title="修改主题">
            <div slot="footer">
                <a @click="editThemeCancel" class="span">取消</a>
                <Button @click="editThemeOk" type="primary">确定</Button>
            </div>
            <Form :model="themeEdit" label-position="right" :label-width="100">
                <FormItem label="主题名称:">
                    <Input v-model="themeEdit.theme_title"></Input>
                </FormItem>
                <FormItem label="显示名称:">
                    <Input v-model="themeEdit.display_title"></Input>
                </FormItem>
                <FormItem label="专题名称:">
                    <RadioGroup v-model="themeEdit.is_relate">
                        <Radio :label="1">
                            是
                        </Radio>
                        <Radio :label="0">
                            否
                        </Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem label="专题名称:" v-if="themeEdit.is_relate !=0">
                    <Input v-model="themeEdit.wrap_title" disabled></Input>
                    <Button type="primary" size="small" @click="modalSpecialEdit = true;okSpecialOne()">修改</Button>
                    <Modal v-model="modalSpecialEdit" title="专题" width="1100" @on-ok="okSpecialOne">
                        <Form :model="specialSearch" inline>
                            <FormItem label="专题名称:" :label-width="70">
                                <Input v-model="specialSearch.wrap_name" placeholder="请输入专题名称..." style="width:200px;"></Input>
                            </FormItem>
                            <FormItem label="专题类型:" :label-width="70">
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
                        <Table border :columns="columns2" :data="data2" :highlight-row="true" @on-row-click="specialListOne"></Table>
                        <div class="layout-theme-page">
                            <Page :total="totalSpecial" :current="pageSpecial" :page-size='pageSizeSpecial' @on-change="changePageSpecial"
                                show-elevator />
                        </div>
                        <div style="margin-top:40px;"></div>
                    </Modal>
                </FormItem>
                <FormItem label="上线状态:">
                    <Select v-model="themeEdit.status">
                        <Option :value="1">上线</Option>
                        <Option :value="0">下线</Option>
                    </Select>
                </FormItem>
                <FormItem label="描述:">
                    <Input v-model="themeEdit.desc" type="textarea" :rows="4"></Input>
                </FormItem>
            </Form>
        </Modal>
        <!-- 推荐维护 -->
        <Modal v-model="modalRecommended" title="主题推荐维护" width="970">
            <div style="margin-bottom:100px;">
                <div style="text-align: center;font-size: 14px;">
                    <p>
                        推荐名称：{{recommend.theme_title}}
                    </p>
                    <p>
                        显示名称：{{recommend.display_title}}
                    </p>
                </div>
                <!-- 内通维护 -->
                <div>
                    <div style="float:right;">
                        <Button @click="modalContentBtn">内容维护</Button>
                        <Modal v-model="modalContent" title="内容维护" width="1100">
                            <div style="float:left;">
                                <Form :model="contentSearch" inline>
                                    <FormItem label="节目名称:" :label-width="70">
                                        <Input v-model="contentSearch.title" placeholder="请输入节目名称..."></Input>
                                    </FormItem>
                                    <FormItem label="年代:" :label-width="50">
                                        <Input v-model="contentSearch.year" placeholder="请输入年代..."></Input>
                                    </FormItem>
                                    <FormItem label="导演:" :label-width="50">
                                        <Input v-model="contentSearch.director" placeholder="请输入导演..."></Input>
                                    </FormItem>
                                    <FormItem>
                                        <Button type="primary" @click="contentQuery">搜索</Button>
                                    </FormItem>
                                </Form>
                            </div>
                            <div style="float:right;">
                                <Button type="success" @click="modalContentAdd = true;selectionContentAdd=[]">添加</Button>
                                <Modal v-model="modalContentAdd" title="添加" width="1100" @on-ok="modalContentAddOk">
                                    <div>
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
                                    </div>
                                    <div>
                                        <Table border :columns="columnsContentAdd" :data="dataContentAdd"
                                            @on-selection-change="onSelectionContentAdd"></Table>
                                    </div>
                                    <div style="float:right;margin-top:10px;">
                                        <Page :total="totalContentAdd" :current="pageContentAdd" :page-size='pageSizeContentAdd'
                                            @on-change="changePageContentAdd" show-elevator />
                                    </div>
                                    <div style="margin-top:40px;"></div>
                                </Modal>
                                <!-- 内容维护修改 -->
                                <Modal v-model="modalContentEdit" title="修改" @on-ok="okContentEdit">
                                    <Form :model="ContentEdit" label-position="right" :label-width="100">
                                        <FormItem label="排序id:">
                                            <Input v-model="ContentEdit.rank"></Input>
                                        </FormItem>
                                    </Form>
                                </Modal>
                            </div>
                            <div style="clear:both;"></div>
                            <div>
                                <Table border :columns="columnsContent" :data="dataContent"></Table>
                            </div>
                            <div style="float:right;margin-top:10px;">
                                <Page :total="totalContent" :current="pageContent" :page-size='pageSizeContent'
                                    @on-change="changePageContent" show-elevator />
                            </div>
                            <div style="margin-top:40px;"></div>
                        </Modal>

                        <!-- 选择布局 -->
                        <Button style="margin-left:10px;" @click="modalLayout = true;promotionList()">选择布局</Button>
                        <Modal v-model="modalLayout" title="选择布局" width="1050">
                            <div slot="footer">
                                <a @click="addLayoutCancel" class="span">取消</a>
                                <Button @click="addLayoutOk" type="primary">确定</Button>
                            </div>
                            <RadioGroup v-model="layout_id" @on-change="layoutChange">
                                <div class="layout-theme-template">
                                    <!-- 模版13 -->
                                    <div class="layout-theme-template13">
                                        <Row>
                                            <Col span="2">
                                            <div style="line-height:180px;">
                                                <Radio :label="13">
                                                    <span></span>
                                                </Radio>
                                            </div>
                                            </Col>
                                            <Col span="22">
                                            <p>模版1</p>
                                            <div class="layout-theme-template13">
                                                <div class="layout-theme-template13-float">
                                                    <div class="layout-theme-template13-img">
                                                        <img src="http://static.icloud.xstvos.cn/noPic.jpg" onerror="this.src='http://static.icloud.xstvos.cn/noPic.jpg'"
                                                            width="150" height="220" alt="">
                                                    </div>
                                                    <div class="layout-theme-template13-wenzi">
                                                        <p></p>
                                                    </div>
                                                </div>
                                                <div class="layout-theme-template13-float">
                                                    <div class="layout-theme-template13-img">
                                                        <img src="http://static.icloud.xstvos.cn/noPic.jpg" onerror="this.src='http://static.icloud.xstvos.cn/noPic.jpg'"
                                                            width="150" height="220" alt="">
                                                    </div>
                                                    <div class="layout-theme-template13-wenzi">
                                                        <p></p>
                                                    </div>
                                                </div>
                                                <div class="layout-theme-template13-float">
                                                    <div class="layout-theme-template13-img">
                                                        <img src="http://static.icloud.xstvos.cn/noPic.jpg" onerror="this.src='http://static.icloud.xstvos.cn/noPic.jpg'"
                                                            width="150" height="220" alt="">
                                                    </div>
                                                    <div class="layout-theme-template13-wenzi">
                                                        <p> </p>
                                                    </div>
                                                </div>
                                                <div class="layout-theme-template13-float">
                                                    <div class="layout-theme-template13-img">
                                                        <img src="http://static.icloud.xstvos.cn/noPic.jpg" onerror="this.src='http://static.icloud.xstvos.cn/noPic.jpg'"
                                                            width="150" height="220" alt="">
                                                    </div>
                                                    <div class="layout-theme-template13-wenzi">
                                                        <p> </p>
                                                    </div>
                                                </div>
                                                <div class="layout-theme-template13-float">
                                                    <div class="layout-theme-template13-img">
                                                        <img src="http://static.icloud.xstvos.cn/noPic.jpg" onerror="this.src='http://static.icloud.xstvos.cn/noPic.jpg'"
                                                            width="150" height="220" alt="">
                                                    </div>
                                                    <div class="layout-theme-template13-wenzi">
                                                        <p> </p>
                                                    </div>
                                                </div>
                                                <div class="layout-theme-template13-float">
                                                    <div class="layout-theme-template13-img">
                                                        <img src="http://static.icloud.xstvos.cn/noPic.jpg" onerror="this.src='http://static.icloud.xstvos.cn/noPic.jpg'"
                                                            width="150" height="220" alt="">
                                                    </div>
                                                    <div class="layout-theme-template13-wenzi">
                                                        <p> </p>
                                                    </div>
                                                </div>
                                            </div>
                                            </Col>
                                        </Row>
                                    </div>
                                    <div style="clear:both;"></div>
                                    <!-- 模版14 -->
                                    <!-- v-if="recommend.layout_id == 14" -->
                                    <div class="layout-theme-template14">
                                        <Row>
                                            <Col span="2">
                                            <div style="line-height:180px;">
                                                <Radio :label="14">
                                                    <span></span>
                                                </Radio>
                                            </div>
                                            </Col>
                                            <Col span="22">
                                            <div>
                                                <p>模版2</p>
                                                <div class="layout-theme-template14-float">
                                                    <div class="layout-theme-template14-img">
                                                        <img src="http://static.icloud.xstvos.cn/noPic.jpg" onerror="this.src='http://static.icloud.xstvos.cn/noPic.jpg'"
                                                            width="300" height="220" alt="">
                                                    </div>
                                                    <div class="layout-theme-template14-wenzi">
                                                        <p>  </p>
                                                    </div>
                                                </div>
                                                <div class="layout-theme-template14-top">
                                                    <div class="layout-theme-template14-img">
                                                        <img src="http://static.icloud.xstvos.cn/noPic.jpg" onerror="this.src='http://static.icloud.xstvos.cn/noPic.jpg'"
                                                            width="150" height="220" alt="">
                                                    </div>
                                                    <div class="layout-theme-template14-top-wenzi">
                                                        <p> </p>
                                                    </div>
                                                </div>
                                                <div class="layout-theme-template14-top">
                                                    <div class="layout-theme-template14-img">
                                                        <img src="http://static.icloud.xstvos.cn/noPic.jpg" onerror="this.src='http://static.icloud.xstvos.cn/noPic.jpg'"
                                                            width="150" height="220" alt="">
                                                    </div>
                                                    <div class="layout-theme-template14-top-wenzi">
                                                        <p> </p>
                                                    </div>
                                                </div>
                                                <div class="layout-theme-template14-top">
                                                    <div class="layout-theme-template14-img">
                                                        <img src="http://static.icloud.xstvos.cn/noPic.jpg" onerror="this.src='http://static.icloud.xstvos.cn/noPic.jpg'"
                                                            width="150" height="220" alt="">
                                                    </div>
                                                    <div class="layout-theme-template14-top-wenzi">
                                                        <p> </p>
                                                    </div>
                                                </div>
                                                <div class="layout-theme-template14-top">
                                                    <div class="layout-theme-template14-img">
                                                        <img src="http://static.icloud.xstvos.cn/noPic.jpg" onerror="this.src='http://static.icloud.xstvos.cn/noPic.jpg'"
                                                            width="150" height="220" alt="">
                                                    </div>
                                                    <div class="layout-theme-template14-top-wenzi">
                                                        <p> </p>
                                                    </div>
                                                </div>
                                            </div>
                                            </Col>
                                        </Row>

                                    </div>
                                    <div style="clear:both;"></div>
                                    <!-- 模版15 -->
                                    <div class="layout-theme-template15">
                                        <Row>
                                            <Col span="2">
                                            <div style="line-height:180px;">
                                                <Radio :label="15">
                                                    <span></span>
                                                </Radio>
                                            </div>
                                            </Col>
                                            <Col span="22">
                                            <p>模版3</p>
                                            <div class="layout-theme-template15-float">
                                                <div class="layout-theme-template15-img">
                                                    <img src="http://static.icloud.xstvos.cn/noPic.jpg" onerror="this.src='http://static.icloud.xstvos.cn/noPic.jpg'"
                                                        width="450" height="220" alt="">
                                                </div>
                                                <div class="layout-theme-template15-wenzi">
                                                    <p>  </p>
                                                </div>
                                            </div>
                                            <div class="layout-theme-template15-top">
                                                <div class="layout-theme-template15-img">
                                                    <img src="http://static.icloud.xstvos.cn/noPic.jpg" onerror="this.src='http://static.icloud.xstvos.cn/noPic.jpg'"
                                                        width="150" height="220" alt="">
                                                </div>
                                                <div class="layout-theme-template15-top-wenzi">
                                                    <p>  </p>
                                                </div>
                                            </div>
                                            <div class="layout-theme-template15-top">
                                                <div class="layout-theme-template15-img">
                                                    <img src="http://static.icloud.xstvos.cn/noPic.jpg" onerror="this.src='http://static.icloud.xstvos.cn/noPic.jpg'"
                                                        width="150" height="220" alt="">
                                                </div>
                                                <div class="layout-theme-template15-top-wenzi">
                                                    <p>  </p>
                                                </div>
                                            </div>
                                            <div class="layout-theme-template15-top">
                                                <div class="layout-theme-template15-img">
                                                    <img src="http://static.icloud.xstvos.cn/noPic.jpg" onerror="this.src='http://static.icloud.xstvos.cn/noPic.jpg'"
                                                        width="150" height="220" alt="">
                                                </div>
                                                <div class="layout-theme-template15-top-wenzi">
                                                    <p>  </p>
                                                </div>
                                            </div>
                                            </Col>
                                        </Row>
                                    </div>
                                    <div style="clear:both;"></div>
                                    <!--  模版16 -->
                                    <div class="layout-theme-template16">
                                        <Row>
                                            <Col span="2">
                                            <div style="line-height:180px;">
                                                <Radio :label="16">
                                                    <span></span>
                                                </Radio>
                                            </div>
                                            </Col>
                                            <Col span="22">
                                            <p>模版4</p>
                                            <div class="layout-theme-template16-float">
                                                <div class="layout-theme-template16-img">
                                                    <img src="http://static.icloud.xstvos.cn/noPic.jpg" onerror="this.src='http://static.icloud.xstvos.cn/noPic.jpg'"
                                                        width="600" height="220" alt="">
                                                </div>
                                                <div class="layout-theme-template16-wenzi">
                                                    <p>  </p>
                                                </div>
                                            </div>
                                            <div class="layout-theme-template16-top">
                                                <div class="layout-theme-template16-img">
                                                    <img src="http://static.icloud.xstvos.cn/noPic.jpg" onerror="this.src='http://static.icloud.xstvos.cn/noPic.jpg'"
                                                        width="150" height="220" alt="">
                                                </div>
                                                <div class="layout-theme-template16-top-wenzi">
                                                    <p>  </p>
                                                </div>
                                            </div>
                                            <div class="layout-theme-template16-top">
                                                <div class="layout-theme-template16-img">
                                                    <img src="http://static.icloud.xstvos.cn/noPic.jpg" onerror="this.src='http://static.icloud.xstvos.cn/noPic.jpg'"
                                                        width="150" height="220" alt="">
                                                </div>
                                                <div class="layout-theme-template16-top-wenzi">
                                                    <p>  </p>
                                                </div>
                                            </div>
                                            </Col>
                                        </Row>

                                    </div>
                                    <div style="clear:both;"></div>
                                    <!-- 模版17 -->
                                    <div class="layout-theme-template17">
                                        <Row>
                                            <Col span="2">
                                            <div style="line-height:180px;">
                                                <Radio :label="17">
                                                    <span></span>
                                                </Radio>
                                            </div>
                                            </Col>
                                            <Col span="22">
                                            <p>模版5</p>
                                            <div class="layout-theme-template13">

                                                <div class="layout-theme-template13-float">
                                                    <div class="layout-theme-template13-img">
                                                        <img src="http://static.icloud.xstvos.cn/noPic.jpg" onerror="this.src='http://static.icloud.xstvos.cn/noPic.jpg'"
                                                            width="150" height="220" alt="">
                                                    </div>
                                                    <div class="layout-theme-template13-wenzi">
                                                        <p> </p>
                                                    </div>
                                                </div>
                                                <div class="layout-theme-template13-float">
                                                    <div class="layout-theme-template13-img">
                                                        <img src="http://static.icloud.xstvos.cn/noPic.jpg" onerror="this.src='http://static.icloud.xstvos.cn/noPic.jpg'"
                                                            width="150" height="220" alt="">
                                                    </div>
                                                    <div class="layout-theme-template13-wenzi">
                                                        <p> </p>
                                                    </div>
                                                </div>
                                                <div class="layout-theme-template13-float">
                                                    <div class="layout-theme-template13-img">
                                                        <img src="http://static.icloud.xstvos.cn/noPic.jpg" onerror="this.src='http://static.icloud.xstvos.cn/noPic.jpg'"
                                                            width="150" height="220" alt="">
                                                    </div>
                                                    <div class="layout-theme-template13-wenzi">
                                                        <p> </p>
                                                    </div>
                                                </div>
                                                <div class="layout-theme-template13-float">
                                                    <div class="layout-theme-template13-img">
                                                        <img src="http://static.icloud.xstvos.cn/noPic.jpg" onerror="this.src='http://static.icloud.xstvos.cn/noPic.jpg'"
                                                            width="150" height="220" alt="">
                                                    </div>
                                                    <div class="layout-theme-template13-wenzi">
                                                        <p> </p>
                                                    </div>
                                                </div>
                                                <div class="layout-theme-template13-float">
                                                    <div class="layout-theme-template13-img">
                                                        <img src="http://static.icloud.xstvos.cn/noPic.jpg" onerror="this.src='http://static.icloud.xstvos.cn/noPic.jpg'"
                                                            width="150" height="220" alt="">
                                                    </div>
                                                    <div class="layout-theme-template13-wenzi">
                                                        <p> </p>
                                                    </div>
                                                </div>
                                                <div class="layout-theme-template13-float">
                                                    <div class="layout-theme-template13-img">
                                                        <img src="http://static.icloud.xstvos.cn/noPic.jpg" onerror="this.src='http://static.icloud.xstvos.cn/noPic.jpg'"
                                                            width="150" height="220" alt="">
                                                    </div>
                                                    <div class="layout-theme-template13-wenzi">
                                                        <p> </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="layout-theme-template13">
                                                <div class="layout-theme-template13-float">
                                                    <div class="layout-theme-template13-img">
                                                        <img src="http://static.icloud.xstvos.cn/noPic.jpg" onerror="this.src='http://static.icloud.xstvos.cn/noPic.jpg'"
                                                            width="150" height="220" alt="">
                                                    </div>
                                                    <div class="layout-theme-template13-wenzi">
                                                        <p> </p>
                                                    </div>
                                                </div>
                                                <div class="layout-theme-template13-float">
                                                    <div class="layout-theme-template13-img">
                                                        <img src="http://static.icloud.xstvos.cn/noPic.jpg" onerror="this.src='http://static.icloud.xstvos.cn/noPic.jpg'"
                                                            width="150" height="220" alt="">
                                                    </div>
                                                    <div class="layout-theme-template13-wenzi">
                                                        <p> </p>
                                                    </div>
                                                </div>
                                                <div class="layout-theme-template13-float">
                                                    <div class="layout-theme-template13-img">
                                                        <img src="http://static.icloud.xstvos.cn/noPic.jpg" onerror="this.src='http://static.icloud.xstvos.cn/noPic.jpg'"
                                                            width="150" height="220" alt="">
                                                    </div>
                                                    <div class="layout-theme-template13-wenzi">
                                                        <p> </p>
                                                    </div>
                                                </div>
                                                <div class="layout-theme-template13-float">
                                                    <div class="layout-theme-template13-img">
                                                        <img src="http://static.icloud.xstvos.cn/noPic.jpg" onerror="this.src='http://static.icloud.xstvos.cn/noPic.jpg'"
                                                            width="150" height="220" alt="">
                                                    </div>
                                                    <div class="layout-theme-template13-wenzi">
                                                        <p> </p>
                                                    </div>
                                                </div>
                                                <div class="layout-theme-template13-float">
                                                    <div class="layout-theme-template13-img">
                                                        <img src="http://static.icloud.xstvos.cn/noPic.jpg" onerror="this.src='http://static.icloud.xstvos.cn/noPic.jpg'"
                                                            width="150" height="220" alt="">
                                                    </div>
                                                    <div class="layout-theme-template13-wenzi">
                                                        <p> </p>
                                                    </div>
                                                </div>
                                                <div class="layout-theme-template13-float">
                                                    <div class="layout-theme-template13-img">
                                                        <img src="http://static.icloud.xstvos.cn/noPic.jpg" onerror="this.src='http://static.icloud.xstvos.cn/noPic.jpg'"
                                                            width="150" height="220" alt="">
                                                    </div>
                                                    <div class="layout-theme-template13-wenzi">
                                                        <p> </p>
                                                    </div>
                                                </div>
                                            </div>
                                            </Col>
                                        </Row>
                                    </div>
                                    <div style="clear:both;"></div>
                                    <!-- 模版18 -->
                                    <div class="layout-theme-template18">
                                        <Row>
                                            <Col span="2">
                                            <div style="line-height:180px;">
                                                <Radio :label="18">
                                                    <span></span>
                                                </Radio>
                                            </div>
                                            </Col>
                                            <Col span="22">
                                            <p>模版6</p>
                                            <div class="layout-theme-template14">
                                                <div>
                                                    <div class="layout-theme-template14-float">
                                                        <div class="layout-theme-template14-img">
                                                            <img src="http://static.icloud.xstvos.cn/noPic.jpg" onerror="this.src='http://static.icloud.xstvos.cn/noPic.jpg'"
                                                                width="300" height="220" alt="">
                                                        </div>
                                                        <div class="layout-theme-template14-wenzi">
                                                            <p>  </p>
                                                        </div>
                                                    </div>
                                                    <div class="layout-theme-template14-top">
                                                        <div class="layout-theme-template14-img">
                                                            <img src="http://static.icloud.xstvos.cn/noPic.jpg" onerror="this.src='http://static.icloud.xstvos.cn/noPic.jpg'"
                                                                width="150" height="220" alt="">
                                                        </div>
                                                        <div class="layout-theme-template14-top-wenzi">
                                                            <p> </p>
                                                        </div>
                                                    </div>
                                                    <div class="layout-theme-template14-top">
                                                        <div class="layout-theme-template14-img">
                                                            <img src="http://static.icloud.xstvos.cn/noPic.jpg" onerror="this.src='http://static.icloud.xstvos.cn/noPic.jpg'"
                                                                width="150" height="220" alt="">
                                                        </div>
                                                        <div class="layout-theme-template14-top-wenzi">
                                                            <p> </p>
                                                        </div>
                                                    </div>
                                                    <div class="layout-theme-template14-top">
                                                        <div class="layout-theme-template14-img">
                                                            <img src="http://static.icloud.xstvos.cn/noPic.jpg" onerror="this.src='http://static.icloud.xstvos.cn/noPic.jpg'"
                                                                width="150" height="220" alt="">
                                                        </div>
                                                        <div class="layout-theme-template14-top-wenzi">
                                                            <p> </p>
                                                        </div>
                                                    </div>
                                                    <div class="layout-theme-template14-top">
                                                        <div class="layout-theme-template14-img">
                                                            <img src="http://static.icloud.xstvos.cn/noPic.jpg" onerror="this.src='http://static.icloud.xstvos.cn/noPic.jpg'"
                                                                width="150" height="220" alt="">
                                                        </div>
                                                        <div class="layout-theme-template14-top-wenzi">
                                                            <p> </p>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                            <div class="layout-theme-template13">
                                                <div class="layout-theme-template13-float">
                                                    <div class="layout-theme-template13-img">
                                                        <img src="http://static.icloud.xstvos.cn/noPic.jpg" onerror="this.src='http://static.icloud.xstvos.cn/noPic.jpg'"
                                                            width="150" height="220" alt="">
                                                    </div>
                                                    <div class="layout-theme-template13-wenzi">
                                                        <p> </p>
                                                    </div>
                                                </div>
                                                <div class="layout-theme-template13-float">
                                                    <div class="layout-theme-template13-img">
                                                        <img src="http://static.icloud.xstvos.cn/noPic.jpg" onerror="this.src='http://static.icloud.xstvos.cn/noPic.jpg'"
                                                            width="150" height="220" alt="">
                                                    </div>
                                                    <div class="layout-theme-template13-wenzi">
                                                        <p> </p>
                                                    </div>
                                                </div>
                                                <div class="layout-theme-template13-float">
                                                    <div class="layout-theme-template13-img">
                                                        <img src="http://static.icloud.xstvos.cn/noPic.jpg" onerror="this.src='http://static.icloud.xstvos.cn/noPic.jpg'"
                                                            width="150" height="220" alt="">
                                                    </div>
                                                    <div class="layout-theme-template13-wenzi">
                                                        <p> </p>
                                                    </div>
                                                </div>
                                                <div class="layout-theme-template13-float">
                                                    <div class="layout-theme-template13-img">
                                                        <img src="http://static.icloud.xstvos.cn/noPic.jpg" onerror="this.src='http://static.icloud.xstvos.cn/noPic.jpg'"
                                                            width="150" height="220" alt="">
                                                    </div>
                                                    <div class="layout-theme-template13-wenzi">
                                                        <p> </p>
                                                    </div>
                                                </div>
                                                <div class="layout-theme-template13-float">
                                                    <div class="layout-theme-template13-img">
                                                        <img src="http://static.icloud.xstvos.cn/noPic.jpg" onerror="this.src='http://static.icloud.xstvos.cn/noPic.jpg'"
                                                            width="150" height="220" alt="">
                                                    </div>
                                                    <div class="layout-theme-template13-wenzi">
                                                        <p> </p>
                                                    </div>
                                                </div>
                                                <div class="layout-theme-template13-float">
                                                    <div class="layout-theme-template13-img">
                                                        <img src="http://static.icloud.xstvos.cn/noPic.jpg" onerror="this.src='http://static.icloud.xstvos.cn/noPic.jpg'"
                                                            width="150" height="220" alt="">
                                                    </div>
                                                    <div class="layout-theme-template13-wenzi">
                                                        <p> </p>
                                                    </div>
                                                </div>
                                            </div>
                                            </Col>
                                        </Row>

                                    </div>
                                    <div style="clear:both;"></div>
                                    <!-- 模版19 -->
                                    <div class="layout-theme-template19">
                                        <Row>
                                            <Col span="2">
                                            <div style="line-height:180px;">
                                                <Radio :label="19">
                                                    <span></span>
                                                </Radio>
                                            </div>
                                            </Col>
                                            <Col span="22">
                                            <p>模版7</p>
                                            <div class="layout-theme-template15">
                                                <div class="layout-theme-template15-float">
                                                    <div class="layout-theme-template15-img">
                                                        <img src="http://static.icloud.xstvos.cn/noPic.jpg" onerror="this.src='http://static.icloud.xstvos.cn/noPic.jpg'"
                                                            width="450" height="220" alt="">
                                                    </div>
                                                    <div class="layout-theme-template15-wenzi">
                                                        <p>  </p>
                                                    </div>
                                                </div>
                                                <div class="layout-theme-template15-top">
                                                    <div class="layout-theme-template15-img">
                                                        <img src="http://static.icloud.xstvos.cn/noPic.jpg" onerror="this.src='http://static.icloud.xstvos.cn/noPic.jpg'"
                                                            width="150" height="220" alt="">
                                                    </div>
                                                    <div class="layout-theme-template15-top-wenzi">
                                                        <p>  </p>
                                                    </div>
                                                </div>
                                                <div class="layout-theme-template15-top">
                                                    <div class="layout-theme-template15-img">
                                                        <img src="http://static.icloud.xstvos.cn/noPic.jpg" onerror="this.src='http://static.icloud.xstvos.cn/noPic.jpg'"
                                                            width="150" height="220" alt="">
                                                    </div>
                                                    <div class="layout-theme-template15-top-wenzi">
                                                        <p>  </p>
                                                    </div>
                                                </div>
                                                <div class="layout-theme-template15-top">
                                                    <div class="layout-theme-template15-img">
                                                        <img src="http://static.icloud.xstvos.cn/noPic.jpg" onerror="this.src='http://static.icloud.xstvos.cn/noPic.jpg'"
                                                            width="150" height="220" alt="">
                                                    </div>
                                                    <div class="layout-theme-template15-top-wenzi">
                                                        <p>  </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="layout-theme-template13">
                                                <div class="layout-theme-template13-float">
                                                    <div class="layout-theme-template13-img">
                                                        <img src="http://static.icloud.xstvos.cn/noPic.jpg" onerror="this.src='http://static.icloud.xstvos.cn/noPic.jpg'"
                                                            width="150" height="220" alt="">
                                                    </div>
                                                    <div class="layout-theme-template13-wenzi">
                                                        <p> </p>
                                                    </div>
                                                </div>
                                                <div class="layout-theme-template13-float">
                                                    <div class="layout-theme-template13-img">
                                                        <img src="http://static.icloud.xstvos.cn/noPic.jpg" onerror="this.src='http://static.icloud.xstvos.cn/noPic.jpg'"
                                                            width="150" height="220" alt="">
                                                    </div>
                                                    <div class="layout-theme-template13-wenzi">
                                                        <p> </p>
                                                    </div>
                                                </div>
                                                <div class="layout-theme-template13-float">
                                                    <div class="layout-theme-template13-img">
                                                        <img src="http://static.icloud.xstvos.cn/noPic.jpg" onerror="this.src='http://static.icloud.xstvos.cn/noPic.jpg'"
                                                            width="150" height="220" alt="">
                                                    </div>
                                                    <div class="layout-theme-template13-wenzi">
                                                        <p> </p>
                                                    </div>
                                                </div>
                                                <div class="layout-theme-template13-float">
                                                    <div class="layout-theme-template13-img">
                                                        <img src="http://static.icloud.xstvos.cn/noPic.jpg" onerror="this.src='http://static.icloud.xstvos.cn/noPic.jpg'"
                                                            width="150" height="220" alt="">
                                                    </div>
                                                    <div class="layout-theme-template13-wenzi">
                                                        <p> </p>
                                                    </div>
                                                </div>
                                                <div class="layout-theme-template13-float">
                                                    <div class="layout-theme-template13-img">
                                                        <img src="http://static.icloud.xstvos.cn/noPic.jpg" onerror="this.src='http://static.icloud.xstvos.cn/noPic.jpg'"
                                                            width="150" height="220" alt="">
                                                    </div>
                                                    <div class="layout-theme-template13-wenzi">
                                                        <p> </p>
                                                    </div>
                                                </div>
                                                <div class="layout-theme-template13-float">
                                                    <div class="layout-theme-template13-img">
                                                        <img src="http://static.icloud.xstvos.cn/noPic.jpg" onerror="this.src='http://static.icloud.xstvos.cn/noPic.jpg'"
                                                            width="150" height="220" alt="">
                                                    </div>
                                                    <div class="layout-theme-template13-wenzi">
                                                        <p> </p>
                                                    </div>
                                                </div>
                                            </div>
                                            </Col>
                                        </Row>

                                    </div>
                                    <div style="clear:both;"></div>
                                    <!-- 模版20 -->
                                    <div class="layout-theme-template20">
                                        <Row>
                                            <Col span="2">
                                            <div style="line-height:180px;">
                                                <Radio :label="20">
                                                    <span></span>
                                                </Radio>
                                            </div>
                                            </Col>
                                            <Col span="22">
                                            <p>模版8</p>
                                            <div class="layout-theme-template16">
                                                <div class="layout-theme-template16-float">
                                                    <div class="layout-theme-template16-img">
                                                        <img src="http://static.icloud.xstvos.cn/noPic.jpg" onerror="this.src='http://static.icloud.xstvos.cn/noPic.jpg'"
                                                            width="600" height="220" alt="">
                                                    </div>
                                                    <div class="layout-theme-template16-wenzi">
                                                        <p>  </p>
                                                    </div>
                                                </div>
                                                <div class="layout-theme-template16-top">
                                                    <div class="layout-theme-template16-img">
                                                        <img src="http://static.icloud.xstvos.cn/noPic.jpg" onerror="this.src='http://static.icloud.xstvos.cn/noPic.jpg'"
                                                            width="150" height="220" alt="">
                                                    </div>
                                                    <div class="layout-theme-template16-top-wenzi">
                                                        <p>  </p>
                                                    </div>
                                                </div>
                                                <div class="layout-theme-template16-top">
                                                    <div class="layout-theme-template16-img">
                                                        <img src="http://static.icloud.xstvos.cn/noPic.jpg" onerror="this.src='http://static.icloud.xstvos.cn/noPic.jpg'"
                                                            width="150" height="220" alt="">
                                                    </div>
                                                    <div class="layout-theme-template16-top-wenzi">
                                                        <p>  </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="layout-theme-template13">
                                                <div class="layout-theme-template13-float">
                                                    <div class="layout-theme-template13-img">
                                                        <img src="http://static.icloud.xstvos.cn/noPic.jpg" onerror="this.src='http://static.icloud.xstvos.cn/noPic.jpg'"
                                                            width="150" height="220" alt="">
                                                    </div>
                                                    <div class="layout-theme-template13-wenzi">
                                                        <p> </p>
                                                    </div>
                                                </div>
                                                <div class="layout-theme-template13-float">
                                                    <div class="layout-theme-template13-img">
                                                        <img src="http://static.icloud.xstvos.cn/noPic.jpg" onerror="this.src='http://static.icloud.xstvos.cn/noPic.jpg'"
                                                            width="150" height="220" alt="">
                                                    </div>
                                                    <div class="layout-theme-template13-wenzi">
                                                        <p> </p>
                                                    </div>
                                                </div>
                                                <div class="layout-theme-template13-float">
                                                    <div class="layout-theme-template13-img">
                                                        <img src="http://static.icloud.xstvos.cn/noPic.jpg" onerror="this.src='http://static.icloud.xstvos.cn/noPic.jpg'"
                                                            width="150" height="220" alt="">
                                                    </div>
                                                    <div class="layout-theme-template13-wenzi">
                                                        <p> </p>
                                                    </div>
                                                </div>
                                                <div class="layout-theme-template13-float">
                                                    <div class="layout-theme-template13-img">
                                                        <img src="http://static.icloud.xstvos.cn/noPic.jpg" onerror="this.src='http://static.icloud.xstvos.cn/noPic.jpg'"
                                                            width="150" height="220" alt="">
                                                    </div>
                                                    <div class="layout-theme-template13-wenzi">
                                                        <p> </p>
                                                    </div>
                                                </div>
                                                <div class="layout-theme-template13-float">
                                                    <div class="layout-theme-template13-img">
                                                        <img src="http://static.icloud.xstvos.cn/noPic.jpg" onerror="this.src='http://static.icloud.xstvos.cn/noPic.jpg'"
                                                            width="150" height="220" alt="">
                                                    </div>
                                                    <div class="layout-theme-template13-wenzi">
                                                        <p> </p>
                                                    </div>
                                                </div>
                                                <div class="layout-theme-template13-float">
                                                    <div class="layout-theme-template13-img">
                                                        <img src="http://static.icloud.xstvos.cn/noPic.jpg" onerror="this.src='http://static.icloud.xstvos.cn/noPic.jpg'"
                                                            width="150" height="220" alt="">
                                                    </div>
                                                    <div class="layout-theme-template13-wenzi">
                                                        <p> </p>
                                                    </div>
                                                </div>
                                            </div>
                                            </Col>
                                        </Row>

                                    </div>
                                    <div style="clear:both;"></div>
                                    <!-- 模版21 -->
                                    <div class="layout-theme-template21">
                                        <Row>
                                            <Col span="2">
                                            <div style="line-height:180px;">
                                                <Radio :label="21">
                                                    <span></span>
                                                </Radio>
                                            </div>
                                            </Col>
                                            <Col span="22">
                                            <p>模版9</p>
                                            <div class="layout-theme-template21-float">
                                                <div class="layout-theme-template21-img">
                                                    <img src="http://static.icloud.xstvos.cn/noPic.jpg" onerror="this.src='http://static.icloud.xstvos.cn/noPic.jpg'"
                                                        width="300" height="220" alt="">
                                                </div>
                                                <div class="layout-theme-template21-wenzi">
                                                    <p>  </p>
                                                </div>
                                            </div>
                                            <div class="layout-theme-template21-float">
                                                <div class="layout-theme-template21-img">
                                                    <img src="http://static.icloud.xstvos.cn/noPic.jpg" onerror="this.src='http://static.icloud.xstvos.cn/noPic.jpg'"
                                                        width="300" height="220" alt="">
                                                </div>
                                                <div class="layout-theme-template21-wenzi">
                                                    <p>  </p>
                                                </div>
                                            </div>
                                            <div class="layout-theme-template21-top">
                                                <div class="layout-theme-template21-img">
                                                    <img src="http://static.icloud.xstvos.cn/noPic.jpg" onerror="this.src='http://static.icloud.xstvos.cn/noPic.jpg'"
                                                        width="150" height="220" alt="">
                                                </div>
                                                <div class="layout-theme-template21-top-wenzi">
                                                    <p>  </p>
                                                </div>
                                            </div>
                                            <div class="layout-theme-template21-top">
                                                <div class="layout-theme-template21-img">
                                                    <img src="http://static.icloud.xstvos.cn/noPic.jpg" onerror="this.src='http://static.icloud.xstvos.cn/noPic.jpg'"
                                                        width="150" height="220" alt="">
                                                </div>
                                                <div class="layout-theme-template21-top-wenzi">
                                                    <p>  </p>
                                                </div>
                                            </div>
                                            <div class="layout-theme-template13">
                                                <div class="layout-theme-template13-float">
                                                    <div class="layout-theme-template13-img">
                                                        <img src="http://static.icloud.xstvos.cn/noPic.jpg" onerror="this.src='http://static.icloud.xstvos.cn/noPic.jpg'"
                                                            width="150" height="220" alt="">
                                                    </div>
                                                    <div class="layout-theme-template13-wenzi">
                                                        <p> </p>
                                                    </div>
                                                </div>
                                                <div class="layout-theme-template13-float">
                                                    <div class="layout-theme-template13-img">
                                                        <img src="http://static.icloud.xstvos.cn/noPic.jpg" onerror="this.src='http://static.icloud.xstvos.cn/noPic.jpg'"
                                                            width="150" height="220" alt="">
                                                    </div>
                                                    <div class="layout-theme-template13-wenzi">
                                                        <p> </p>
                                                    </div>
                                                </div>
                                                <div class="layout-theme-template13-float">
                                                    <div class="layout-theme-template13-img">
                                                        <img src="http://static.icloud.xstvos.cn/noPic.jpg" onerror="this.src='http://static.icloud.xstvos.cn/noPic.jpg'"
                                                            width="150" height="220" alt="">
                                                    </div>
                                                    <div class="layout-theme-template13-wenzi">
                                                        <p> </p>
                                                    </div>
                                                </div>
                                                <div class="layout-theme-template13-float">
                                                    <div class="layout-theme-template13-img">
                                                        <img src="http://static.icloud.xstvos.cn/noPic.jpg" onerror="this.src='http://static.icloud.xstvos.cn/noPic.jpg'"
                                                            width="150" height="220" alt="">
                                                    </div>
                                                    <div class="layout-theme-template13-wenzi">
                                                        <p> </p>
                                                    </div>
                                                </div>
                                                <div class="layout-theme-template13-float">
                                                    <div class="layout-theme-template13-img">
                                                        <img src="http://static.icloud.xstvos.cn/noPic.jpg" onerror="this.src='http://static.icloud.xstvos.cn/noPic.jpg'"
                                                            width="150" height="220" alt="">
                                                    </div>
                                                    <div class="layout-theme-template13-wenzi">
                                                        <p> </p>
                                                    </div>
                                                </div>
                                                <div class="layout-theme-template13-float">
                                                    <div class="layout-theme-template13-img">
                                                        <img src="http://static.icloud.xstvos.cn/noPic.jpg" onerror="this.src='http://static.icloud.xstvos.cn/noPic.jpg'"
                                                            width="150" height="220" alt="">
                                                    </div>
                                                    <div class="layout-theme-template13-wenzi">
                                                        <p> </p>
                                                    </div>
                                                </div>
                                            </div>
                                            </Col>
                                        </Row>

                                    </div>
                                    <div style="clear:both;"></div>
                                    <!-- 模版22 -->
                                    <div class="layout-theme-template22">
                                        <Row>
                                            <Col span="2">
                                            <div style="line-height:180px;">
                                                <Radio :label="21">
                                                    <span></span>
                                                </Radio>
                                            </div>
                                            </Col>
                                            <Col span="22">
                                            <p>模版10</p>
                                            <div class="layout-theme-template22-float">
                                                <div class="layout-theme-template22-img">
                                                    <img src="http://static.icloud.xstvos.cn/noPic.jpg" onerror="this.src='http://static.icloud.xstvos.cn/noPic.jpg'"
                                                        width="300" height="220" alt="">
                                                </div>
                                                <div class="layout-theme-template22-wenzi">
                                                    <p>  </p>
                                                </div>
                                            </div>
                                            <div class="layout-theme-template22-float">
                                                <div class="layout-theme-template22-img">
                                                    <img src="http://static.icloud.xstvos.cn/noPic.jpg" onerror="this.src='http://static.icloud.xstvos.cn/noPic.jpg'"
                                                        width="300" height="220" alt="">
                                                </div>
                                                <div class="layout-theme-template22-wenzi">
                                                    <p>  </p>
                                                </div>
                                            </div>
                                            <div class="layout-theme-template22-float">
                                                <div class="layout-theme-template22-img">
                                                    <img src="http://static.icloud.xstvos.cn/noPic.jpg" onerror="this.src='http://static.icloud.xstvos.cn/noPic.jpg'"
                                                        width="300" height="220" alt="">
                                                </div>
                                                <div class="layout-theme-template22-wenzi">
                                                    <p>  </p>
                                                </div>
                                            </div>
                                            <div class="layout-theme-template13">
                                                <div class="layout-theme-template13-float">
                                                    <div class="layout-theme-template13-img">
                                                        <img src="http://static.icloud.xstvos.cn/noPic.jpg" onerror="this.src='http://static.icloud.xstvos.cn/noPic.jpg'"
                                                            width="150" height="220" alt="">
                                                    </div>
                                                    <div class="layout-theme-template13-wenzi">
                                                        <p> </p>
                                                    </div>
                                                </div>
                                                <div class="layout-theme-template13-float">
                                                    <div class="layout-theme-template13-img">
                                                        <img src="http://static.icloud.xstvos.cn/noPic.jpg" onerror="this.src='http://static.icloud.xstvos.cn/noPic.jpg'"
                                                            width="150" height="220" alt="">
                                                    </div>
                                                    <div class="layout-theme-template13-wenzi">
                                                        <p> </p>
                                                    </div>
                                                </div>
                                                <div class="layout-theme-template13-float">
                                                    <div class="layout-theme-template13-img">
                                                        <img src="http://static.icloud.xstvos.cn/noPic.jpg" onerror="this.src='http://static.icloud.xstvos.cn/noPic.jpg'"
                                                            width="150" height="220" alt="">
                                                    </div>
                                                    <div class="layout-theme-template13-wenzi">
                                                        <p> </p>
                                                    </div>
                                                </div>
                                                <div class="layout-theme-template13-float">
                                                    <div class="layout-theme-template13-img">
                                                        <img src="http://static.icloud.xstvos.cn/noPic.jpg" onerror="this.src='http://static.icloud.xstvos.cn/noPic.jpg'"
                                                            width="150" height="220" alt="">
                                                    </div>
                                                    <div class="layout-theme-template13-wenzi">
                                                        <p> </p>
                                                    </div>
                                                </div>
                                                <div class="layout-theme-template13-float">
                                                    <div class="layout-theme-template13-img">
                                                        <img src="http://static.icloud.xstvos.cn/noPic.jpg" onerror="this.src='http://static.icloud.xstvos.cn/noPic.jpg'"
                                                            width="150" height="220" alt="">
                                                    </div>
                                                    <div class="layout-theme-template13-wenzi">
                                                        <p> </p>
                                                    </div>
                                                </div>
                                                <div class="layout-theme-template13-float">
                                                    <div class="layout-theme-template13-img">
                                                        <img src="http://static.icloud.xstvos.cn/noPic.jpg" onerror="this.src='http://static.icloud.xstvos.cn/noPic.jpg'"
                                                            width="150" height="220" alt="">
                                                    </div>
                                                    <div class="layout-theme-template13-wenzi">
                                                        <p> </p>
                                                    </div>
                                                </div>
                                            </div>
                                            </Col>
                                        </Row>

                                    </div>
                                    <div style="clear:both;"></div>
                                    <!-- 模版23 -->
                                    <div class="layout-theme-template23">
                                        <Row>
                                            <Col span="2">
                                            <div style="line-height:180px;">
                                                <Radio :label="23">
                                                    <span></span>
                                                </Radio>
                                            </div>
                                            </Col>
                                            <Col span="22">
                                            <p>模版11</p>
                                            <div class="layout-theme-template23-float">
                                                <div class="layout-theme-template23-img">
                                                    <img src="http://static.icloud.xstvos.cn/noPic.jpg" onerror="this.src='http://static.icloud.xstvos.cn/noPic.jpg'"
                                                        width="460" height="220" alt="">
                                                </div>
                                                <div class="layout-theme-template23-wenzi">
                                                    <p>  </p>
                                                </div>
                                            </div>
                                            <div class="layout-theme-template23-float">
                                                <div class="layout-theme-template23-img">
                                                    <img src="http://static.icloud.xstvos.cn/noPic.jpg" onerror="this.src='http://static.icloud.xstvos.cn/noPic.jpg'"
                                                        width="460" height="220" alt="">
                                                </div>
                                                <div class="layout-theme-template23-wenzi">
                                                    <p>  </p>
                                                </div>
                                            </div>
                                            <div class="layout-theme-template13">
                                                <div class="layout-theme-template13-float">
                                                    <div class="layout-theme-template13-img">
                                                        <img src="http://static.icloud.xstvos.cn/noPic.jpg" onerror="this.src='http://static.icloud.xstvos.cn/noPic.jpg'"
                                                            width="150" height="220" alt="">
                                                    </div>
                                                    <div class="layout-theme-template13-wenzi">
                                                        <p> </p>
                                                    </div>
                                                </div>
                                                <div class="layout-theme-template13-float">
                                                    <div class="layout-theme-template13-img">
                                                        <img src="http://static.icloud.xstvos.cn/noPic.jpg" onerror="this.src='http://static.icloud.xstvos.cn/noPic.jpg'"
                                                            width="150" height="220" alt="">
                                                    </div>
                                                    <div class="layout-theme-template13-wenzi">
                                                        <p> </p>
                                                    </div>
                                                </div>
                                                <div class="layout-theme-template13-float">
                                                    <div class="layout-theme-template13-img">
                                                        <img src="http://static.icloud.xstvos.cn/noPic.jpg" onerror="this.src='http://static.icloud.xstvos.cn/noPic.jpg'"
                                                            width="150" height="220" alt="">
                                                    </div>
                                                    <div class="layout-theme-template13-wenzi">
                                                        <p> </p>
                                                    </div>
                                                </div>
                                                <div class="layout-theme-template13-float">
                                                    <div class="layout-theme-template13-img">
                                                        <img src="http://static.icloud.xstvos.cn/noPic.jpg" onerror="this.src='http://static.icloud.xstvos.cn/noPic.jpg'"
                                                            width="150" height="220" alt="">
                                                    </div>
                                                    <div class="layout-theme-template13-wenzi">
                                                        <p> </p>
                                                    </div>
                                                </div>
                                                <div class="layout-theme-template13-float">
                                                    <div class="layout-theme-template13-img">
                                                        <img src="http://static.icloud.xstvos.cn/noPic.jpg" onerror="this.src='http://static.icloud.xstvos.cn/noPic.jpg'"
                                                            width="150" height="220" alt="">
                                                    </div>
                                                    <div class="layout-theme-template13-wenzi">
                                                        <p> </p>
                                                    </div>
                                                </div>
                                                <div class="layout-theme-template13-float">
                                                    <div class="layout-theme-template13-img">
                                                        <img src="http://static.icloud.xstvos.cn/noPic.jpg" onerror="this.src='http://static.icloud.xstvos.cn/noPic.jpg'"
                                                            width="150" height="220" alt="">
                                                    </div>
                                                    <div class="layout-theme-template13-wenzi">
                                                        <p> </p>
                                                    </div>
                                                </div>
                                            </div>
                                            </Col>
                                        </Row>

                                    </div>
                                    <div style="clear:both;"></div>
                                </div>
                            </RadioGroup>
                        </Modal>
                        <Button style="margin-left:10px;" @click="removeLayoutBlock">删除</Button>
                    </div>
                    <div style="clear:both;"></div>
                    <div style="border-bottom:1px solid #ccc;margin-top:10px;"></div>
                </div>
                <div>
                    <!--布局块  -->
                    <div class="layout-theme-template">
                        <!-- 模版13 -->
                        <div class="layout-theme-template13" v-if="recommend.layout_id == 13">
                            <div class="layout-theme-template13-float">
                                <div class="layout-theme-template13-img">
                                    <img :src="promotion[0].img_url" onerror="this.src='http://static.icloud.xstvos.cn/noPic.jpg'"
                                        width="150" height="220" alt="">
                                </div>
                                <div class="layout-theme-template13-wenzi">
                                    <p>{{promotion[0].title}}</p>
                                </div>
                            </div>
                            <div class="layout-theme-template13-float">
                                <div class="layout-theme-template13-img">
                                    <img :src="promotion[1].img_url" onerror="this.src='http://static.icloud.xstvos.cn/noPic.jpg'"
                                        width="150" height="220" alt="">
                                </div>
                                <div class="layout-theme-template13-wenzi">
                                    <p>{{promotion[1].title}}</p>
                                </div>
                            </div>
                            <div class="layout-theme-template13-float">
                                <div class="layout-theme-template13-img">
                                    <img :src="promotion[2].img_url" onerror="this.src='http://static.icloud.xstvos.cn/noPic.jpg'"
                                        width="150" height="220" alt="">
                                </div>
                                <div class="layout-theme-template13-wenzi">
                                    <p>{{promotion[2].title}}</p>
                                </div>
                            </div>
                            <div class="layout-theme-template13-float">
                                <div class="layout-theme-template13-img">
                                    <img :src="promotion[3].img_url" onerror="this.src='http://static.icloud.xstvos.cn/noPic.jpg'"
                                        width="150" height="220" alt="">
                                </div>
                                <div class="layout-theme-template13-wenzi">
                                    <p>{{promotion[3].title}}</p>
                                </div>
                            </div>
                            <div class="layout-theme-template13-float">
                                <div class="layout-theme-template13-img">
                                    <img :src="promotion[4].img_url" onerror="this.src='http://static.icloud.xstvos.cn/noPic.jpg'"
                                        width="150" height="220" alt="">
                                </div>
                                <div class="layout-theme-template13-wenzi">
                                    <p>{{promotion[4].title}}</p>
                                </div>
                            </div>
                            <div class="layout-theme-template13-float" @click="infoModal(220,150,promotion[5])">
                                <div class="layout-theme-template13-img">
                                    <img :src="promotion[5].img_url" onerror="this.src='http://static.icloud.xstvos.cn/noPic.jpg'"
                                        width="150" height="220" alt="">
                                </div>
                                <div class="layout-theme-template13-wenzi">
                                    <p>{{promotion[5].title}}</p>
                                </div>
                            </div>
                        </div>
                        <div style="clear:both;"></div>
                        <!-- 模版14 -->
                        <!-- v-if="recommend.layout_id == 14" -->
                        <div class="layout-theme-template14" v-if="recommend.layout_id == 14">
                            <div>
                                <div class="layout-theme-template14-float" @click="infoModal(220,300,promotion[0])">
                                    <div class="layout-theme-template14-img">
                                        <img :src="promotion[0].img_url" onerror="this.src='http://static.icloud.xstvos.cn/noPic.jpg'"
                                            width="300" height="220" alt="">
                                    </div>
                                    <div class="layout-theme-template14-wenzi">
                                        <p>{{promotion[0].title}}</p>
                                    </div>
                                </div>
                                <div class="layout-theme-template14-top">
                                    <div class="layout-theme-template14-img">
                                        <img :src="promotion[1].img_url" onerror="this.src='http://static.icloud.xstvos.cn/noPic.jpg'"
                                            width="150" height="220" alt="">
                                    </div>
                                    <div class="layout-theme-template14-top-wenzi">
                                        <p>{{promotion[1].title}}</p>
                                    </div>
                                </div>
                                <div class="layout-theme-template14-top">
                                    <div class="layout-theme-template14-img">
                                        <img :src="promotion[2].img_url" onerror="this.src='http://static.icloud.xstvos.cn/noPic.jpg'"
                                            width="150" height="220" alt="">
                                    </div>
                                    <div class="layout-theme-template14-top-wenzi">
                                        <p>{{promotion[2].title}}</p>
                                    </div>
                                </div>
                                <div class="layout-theme-template14-top">
                                    <div class="layout-theme-template14-img">
                                        <img :src="promotion[3].img_url" onerror="this.src='http://static.icloud.xstvos.cn/noPic.jpg'"
                                            width="150" height="220" alt="">
                                    </div>
                                    <div class="layout-theme-template14-top-wenzi">
                                        <p>{{promotion[3].title}}</p>
                                    </div>
                                </div>
                                <div class="layout-theme-template14-top">
                                    <div class="layout-theme-template14-img">
                                        <img :src="promotion[4].img_url" onerror="this.src='http://static.icloud.xstvos.cn/noPic.jpg'"
                                            width="150" height="220" alt="">
                                    </div>
                                    <div class="layout-theme-template14-top-wenzi">
                                        <p>{{promotion[4].title}}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div style="clear:both;"></div>
                        <!-- 模版15 -->
                        <div class="layout-theme-template15" v-if="recommend.layout_id == 15">
                            <div class="layout-theme-template15-float" @click="infoModal(220,450,promotion[0])">
                                <div class="layout-theme-template15-img">
                                    <img :src="promotion[0].img_url" onerror="this.src='http://static.icloud.xstvos.cn/noPic.jpg'"
                                        width="450" height="220" alt="">
                                </div>
                                <div class="layout-theme-template15-wenzi">
                                    <p>{{promotion[0].title}}</p>
                                </div>
                            </div>
                            <div class="layout-theme-template15-top">
                                <div class="layout-theme-template15-img">
                                    <img :src="promotion[1].img_url" onerror="this.src='http://static.icloud.xstvos.cn/noPic.jpg'"
                                        width="150" height="220" alt="">
                                </div>
                                <div class="layout-theme-template15-top-wenzi">
                                    <p>{{promotion[1].title}}</p>
                                </div>
                            </div>
                            <div class="layout-theme-template15-top">
                                <div class="layout-theme-template15-img">
                                    <img :src="promotion[2].img_url" onerror="this.src='http://static.icloud.xstvos.cn/noPic.jpg'"
                                        width="150" height="220" alt="">
                                </div>
                                <div class="layout-theme-template15-top-wenzi">
                                    <p>{{promotion[2].title}}</p>
                                </div>
                            </div>
                            <div class="layout-theme-template15-top">
                                <div class="layout-theme-template15-img">
                                    <img :src="promotion[3].img_url" onerror="this.src='http://static.icloud.xstvos.cn/noPic.jpg'"
                                        width="150" height="220" alt="">
                                </div>
                                <div class="layout-theme-template15-top-wenzi">
                                    <p>{{promotion[3].title}}</p>
                                </div>
                            </div>
                        </div>
                        <div style="clear:both;"></div>
                        <!--  模版16 -->
                        <div class="layout-theme-template16" v-if="recommend.layout_id == 16">
                            <div class="layout-theme-template16-float" @click="infoModal(220,600,promotion[0])">
                                <div class="layout-theme-template16-img">
                                    <img :src="promotion[0].img_url" onerror="this.src='http://static.icloud.xstvos.cn/noPic.jpg'"
                                        width="600" height="220" alt="">
                                </div>
                                <div class="layout-theme-template16-wenzi">
                                    <p>{{promotion[0].title}}</p>
                                </div>
                            </div>
                            <div class="layout-theme-template16-top">
                                <div class="layout-theme-template16-img">
                                    <img :src="promotion[1].img_url" onerror="this.src='http://static.icloud.xstvos.cn/noPic.jpg'"
                                        width="150" height="220" alt="">
                                </div>
                                <div class="layout-theme-template16-top-wenzi">
                                    <p>{{promotion[1].title}}</p>
                                </div>
                            </div>
                            <div class="layout-theme-template16-top">
                                <div class="layout-theme-template16-img">
                                    <img :src="promotion[2].img_url" onerror="this.src='http://static.icloud.xstvos.cn/noPic.jpg'"
                                        width="150" height="220" alt="">
                                </div>
                                <div class="layout-theme-template16-top-wenzi">
                                    <p>{{promotion[2].title}}</p>
                                </div>
                            </div>
                        </div>
                        <div style="clear:both;"></div>
                        <!-- 模版17 -->
                        <!-- v-if="recommend.layout_id == 17" -->
                        <div class="layout-theme-template13" v-if="recommend.layout_id == 17">
                            <div class="layout-theme-template13-float">
                                <div class="layout-theme-template13-img">
                                    <img :src="promotion[0].img_url" onerror="this.src='http://static.icloud.xstvos.cn/noPic.jpg'"
                                        width="150" height="220" alt="">
                                </div>
                                <div class="layout-theme-template13-wenzi">
                                    <p>{{promotion[0].title}}</p>
                                </div>
                            </div>
                            <div class="layout-theme-template13-float">
                                <div class="layout-theme-template13-img">
                                    <img :src="promotion[1].img_url" onerror="this.src='http://static.icloud.xstvos.cn/noPic.jpg'"
                                        width="150" height="220" alt="">
                                </div>
                                <div class="layout-theme-template13-wenzi">
                                    <p>{{promotion[1].title}}</p>
                                </div>
                            </div>
                            <div class="layout-theme-template13-float">
                                <div class="layout-theme-template13-img">
                                    <img :src="promotion[2].img_url" onerror="this.src='http://static.icloud.xstvos.cn/noPic.jpg'"
                                        width="150" height="220" alt="">
                                </div>
                                <div class="layout-theme-template13-wenzi">
                                    <p>{{promotion[2].title}}</p>
                                </div>
                            </div>
                            <div class="layout-theme-template13-float">
                                <div class="layout-theme-template13-img">
                                    <img :src="promotion[3].img_url" onerror="this.src='http://static.icloud.xstvos.cn/noPic.jpg'"
                                        width="150" height="220" alt="">
                                </div>
                                <div class="layout-theme-template13-wenzi">
                                    <p>{{promotion[3].title}}</p>
                                </div>
                            </div>
                            <div class="layout-theme-template13-float">
                                <div class="layout-theme-template13-img">
                                    <img :src="promotion[4].img_url" onerror="this.src='http://static.icloud.xstvos.cn/noPic.jpg'"
                                        width="150" height="220" alt="">
                                </div>
                                <div class="layout-theme-template13-wenzi">
                                    <p>{{promotion[4].title}}</p>
                                </div>
                            </div>
                            <div class="layout-theme-template13-float">
                                <div class="layout-theme-template13-img">
                                    <img :src="promotion[5].img_url" onerror="this.src='http://static.icloud.xstvos.cn/noPic.jpg'"
                                        width="150" height="220" alt="">
                                </div>
                                <div class="layout-theme-template13-wenzi">
                                    <p>{{promotion[5].title}}</p>
                                </div>
                            </div>
                            <div class="layout-theme-template13-float">
                                <div class="layout-theme-template13-img">
                                    <img :src="promotion[6].img_url" onerror="this.src='http://static.icloud.xstvos.cn/noPic.jpg'"
                                        width="150" height="220" alt="">
                                </div>
                                <div class="layout-theme-template13-wenzi">
                                    <p>{{promotion[6].title}}</p>
                                </div>
                            </div>
                            <div class="layout-theme-template13-float">
                                <div class="layout-theme-template13-img">
                                    <img :src="promotion[7].img_url" onerror="this.src='http://static.icloud.xstvos.cn/noPic.jpg'"
                                        width="150" height="220" alt="">
                                </div>
                                <div class="layout-theme-template13-wenzi">
                                    <p>{{promotion[7].title}}</p>
                                </div>
                            </div>
                            <div class="layout-theme-template13-float">
                                <div class="layout-theme-template13-img">
                                    <img :src="promotion[8].img_url" onerror="this.src='http://static.icloud.xstvos.cn/noPic.jpg'"
                                        width="150" height="220" alt="">
                                </div>
                                <div class="layout-theme-template13-wenzi">
                                    <p>{{promotion[8].title}}</p>
                                </div>
                            </div>
                            <div class="layout-theme-template13-float">
                                <div class="layout-theme-template13-img">
                                    <img :src="promotion[9].img_url" onerror="this.src='http://static.icloud.xstvos.cn/noPic.jpg'"
                                        width="150" height="220" alt="">
                                </div>
                                <div class="layout-theme-template13-wenzi">
                                    <p>{{promotion[9].title}}</p>
                                </div>
                            </div>
                            <div class="layout-theme-template13-float">
                                <div class="layout-theme-template13-img">
                                    <img :src="promotion[10].img_url" onerror="this.src='http://static.icloud.xstvos.cn/noPic.jpg'"
                                        width="150" height="220" alt="">
                                </div>
                                <div class="layout-theme-template13-wenzi">
                                    <p>{{promotion[10].title}}</p>
                                </div>
                            </div>
                            <div class="layout-theme-template13-float">
                                <div class="layout-theme-template13-img">
                                    <img :src="promotion[11].img_url" onerror="this.src='http://static.icloud.xstvos.cn/noPic.jpg'"
                                        width="150" height="220" alt="">
                                </div>
                                <div class="layout-theme-template13-wenzi">
                                    <p>{{promotion[11].title}}</p>
                                </div>
                            </div>
                        </div>
                        <div style="clear:both;"></div>
                        <!-- 模版18 -->
                        <div class="layout-theme-template18" v-if="recommend.layout_id == 18">
                            <div class="layout-theme-template14">
                                <div>
                                    <div class="layout-theme-template14-float" @click="infoModal(220,300,promotion[0])">
                                        <div class="layout-theme-template14-img">
                                            <img :src="promotion[0].img_url" onerror="this.src='http://static.icloud.xstvos.cn/noPic.jpg'"
                                                width="300" height="220" alt="">
                                        </div>
                                        <div class="layout-theme-template14-wenzi">
                                            <p>{{promotion[0].title}}</p>
                                        </div>
                                    </div>
                                    <div class="layout-theme-template14-top">
                                        <div class="layout-theme-template14-img">
                                            <img :src="promotion[1].img_url" onerror="this.src='http://static.icloud.xstvos.cn/noPic.jpg'"
                                                width="150" height="220" alt="">
                                        </div>
                                        <div class="layout-theme-template14-top-wenzi">
                                            <p>{{promotion[1].title}}</p>
                                        </div>
                                    </div>
                                    <div class="layout-theme-template14-top">
                                        <div class="layout-theme-template14-img">
                                            <img :src="promotion[2].img_url" onerror="this.src='http://static.icloud.xstvos.cn/noPic.jpg'"
                                                width="150" height="220" alt="">
                                        </div>
                                        <div class="layout-theme-template14-top-wenzi">
                                            <p>{{promotion[2].title}}</p>
                                        </div>
                                    </div>
                                    <div class="layout-theme-template14-top">
                                        <div class="layout-theme-template14-img">
                                            <img :src="promotion[3].img_url" onerror="this.src='http://static.icloud.xstvos.cn/noPic.jpg'"
                                                width="150" height="220" alt="">
                                        </div>
                                        <div class="layout-theme-template14-top-wenzi">
                                            <p>{{promotion[3].title}}</p>
                                        </div>
                                    </div>
                                    <div class="layout-theme-template14-top">
                                        <div class="layout-theme-template14-img">
                                            <img :src="promotion[4].img_url" onerror="this.src='http://static.icloud.xstvos.cn/noPic.jpg'"
                                                width="150" height="220" alt="">
                                        </div>
                                        <div class="layout-theme-template14-top-wenzi">
                                            <p>{{promotion[4].title}}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="layout-theme-template13">
                                <div class="layout-theme-template13-float">
                                    <div class="layout-theme-template13-img">
                                        <img :src="promotion[5].img_url" onerror="this.src='http://static.icloud.xstvos.cn/noPic.jpg'"
                                            width="150" height="220" alt="">
                                    </div>
                                    <div class="layout-theme-template13-wenzi">
                                        <p>{{promotion[5].title}}</p>
                                    </div>
                                </div>
                                <div class="layout-theme-template13-float">
                                    <div class="layout-theme-template13-img">
                                        <img :src="promotion[6].img_url" onerror="this.src='http://static.icloud.xstvos.cn/noPic.jpg'"
                                            width="150" height="220" alt="">
                                    </div>
                                    <div class="layout-theme-template13-wenzi">
                                        <p>{{promotion[6].title}}</p>
                                    </div>
                                </div>
                                <div class="layout-theme-template13-float">
                                    <div class="layout-theme-template13-img">
                                        <img :src="promotion[7].img_url" onerror="this.src='http://static.icloud.xstvos.cn/noPic.jpg'"
                                            width="150" height="220" alt="">
                                    </div>
                                    <div class="layout-theme-template13-wenzi">
                                        <p>{{promotion[7].title}}</p>
                                    </div>
                                </div>
                                <div class="layout-theme-template13-float">
                                    <div class="layout-theme-template13-img">
                                        <img :src="promotion[8].img_url" onerror="this.src='http://static.icloud.xstvos.cn/noPic.jpg'"
                                            width="150" height="220" alt="">
                                    </div>
                                    <div class="layout-theme-template13-wenzi">
                                        <p>{{promotion[8].title}}</p>
                                    </div>
                                </div>
                                <div class="layout-theme-template13-float">
                                    <div class="layout-theme-template13-img">
                                        <img :src="promotion[9].img_url" onerror="this.src='http://static.icloud.xstvos.cn/noPic.jpg'"
                                            width="150" height="220" alt="">
                                    </div>
                                    <div class="layout-theme-template13-wenzi">
                                        <p>{{promotion[9].title}}</p>
                                    </div>
                                </div>
                                <div class="layout-theme-template13-float">
                                    <div class="layout-theme-template13-img">
                                        <img :src="promotion[10].img_url" onerror="this.src='http://static.icloud.xstvos.cn/noPic.jpg'"
                                            width="150" height="220" alt="">
                                    </div>
                                    <div class="layout-theme-template13-wenzi">
                                        <p>{{promotion[10].title}}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div style="clear:both;"></div>
                        <!-- 模版19 -->
                        <div class="layout-theme-template19" v-if="recommend.layout_id == 19">
                            <div class="layout-theme-template15">
                                <div class="layout-theme-template15-float" @click="infoModal(220,450,promotion[0])">
                                    <div class="layout-theme-template15-img">
                                        <img :src="promotion[0].img_url" onerror="this.src='http://static.icloud.xstvos.cn/noPic.jpg'"
                                            width="450" height="220" alt="">
                                    </div>
                                    <div class="layout-theme-template15-wenzi">
                                        <p>{{promotion[0].title}}</p>
                                    </div>
                                </div>
                                <div class="layout-theme-template15-top">
                                    <div class="layout-theme-template15-img">
                                        <img :src="promotion[1].img_url" onerror="this.src='http://static.icloud.xstvos.cn/noPic.jpg'"
                                            width="150" height="220" alt="">
                                    </div>
                                    <div class="layout-theme-template15-top-wenzi">
                                        <p>{{promotion[1].title}}</p>
                                    </div>
                                </div>
                                <div class="layout-theme-template15-top">
                                    <div class="layout-theme-template15-img">
                                        <img :src="promotion[2].img_url" onerror="this.src='http://static.icloud.xstvos.cn/noPic.jpg'"
                                            width="150" height="220" alt="">
                                    </div>
                                    <div class="layout-theme-template15-top-wenzi">
                                        <p>{{promotion[2].title}}</p>
                                    </div>
                                </div>
                                <div class="layout-theme-template15-top">
                                    <div class="layout-theme-template15-img">
                                        <img :src="promotion[3].img_url" onerror="this.src='http://static.icloud.xstvos.cn/noPic.jpg'"
                                            width="150" height="220" alt="">
                                    </div>
                                    <div class="layout-theme-template15-top-wenzi">
                                        <p>{{promotion[3].title}}</p>
                                    </div>
                                </div>
                            </div>
                            <div class="layout-theme-template13">
                                <div class="layout-theme-template13-float">
                                    <div class="layout-theme-template13-img">
                                        <img :src="promotion[4].img_url" onerror="this.src='http://static.icloud.xstvos.cn/noPic.jpg'"
                                            width="150" height="220" alt="">
                                    </div>
                                    <div class="layout-theme-template13-wenzi">
                                        <p>
                                            <p>{{promotion[4].title}}</p>
                                        </p>
                                    </div>
                                </div>
                                <div class="layout-theme-template13-float">
                                    <div class="layout-theme-template13-img">
                                        <img :src="promotion[5].img_url" onerror="this.src='http://static.icloud.xstvos.cn/noPic.jpg'"
                                            width="150" height="220" alt="">
                                    </div>
                                    <div class="layout-theme-template13-wenzi">
                                        <p>{{promotion[5].title}}</p>
                                    </div>
                                </div>
                                <div class="layout-theme-template13-float">
                                    <div class="layout-theme-template13-img">
                                        <img :src="promotion[6].img_url" onerror="this.src='http://static.icloud.xstvos.cn/noPic.jpg'"
                                            width="150" height="220" alt="">
                                    </div>
                                    <div class="layout-theme-template13-wenzi">
                                        <p>{{promotion[6].title}}</p>
                                    </div>
                                </div>
                                <div class="layout-theme-template13-float">
                                    <div class="layout-theme-template13-img">
                                        <img :src="promotion[7].img_url" onerror="this.src='http://static.icloud.xstvos.cn/noPic.jpg'"
                                            width="150" height="220" alt="">
                                    </div>
                                    <div class="layout-theme-template13-wenzi">
                                        <p>{{promotion[7].title}}</p>
                                    </div>
                                </div>
                                <div class="layout-theme-template13-float">
                                    <div class="layout-theme-template13-img">
                                        <img :src="promotion[8].img_url" onerror="this.src='http://static.icloud.xstvos.cn/noPic.jpg'"
                                            width="150" height="220" alt="">
                                    </div>
                                    <div class="layout-theme-template13-wenzi">
                                        <p>
                                            <p>{{promotion[8].title}}</p>
                                        </p>
                                    </div>
                                </div>
                                <div class="layout-theme-template13-float">
                                    <div class="layout-theme-template13-img">
                                        <img :src="promotion[9].img_url" onerror="this.src='http://static.icloud.xstvos.cn/noPic.jpg'"
                                            width="150" height="220" alt="">
                                    </div>
                                    <div class="layout-theme-template13-wenzi">
                                        <p>{{promotion[9].title}}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div style="clear:both;"></div>
                        <!-- 模版20 -->
                        <div class="layout-theme-template20" v-if="recommend.layout_id == 20">
                            <div class="layout-theme-template16">
                                <div class="layout-theme-template16-float" @click="infoModal(220,600,promotion[0])"> 
                                    <div class="layout-theme-template16-img">
                                        <img :src="promotion[0].img_url" onerror="this.src='http://static.icloud.xstvos.cn/noPic.jpg'"
                                            width="600" height="220" alt="">
                                    </div>
                                    <div class="layout-theme-template16-wenzi">
                                        <p>{{promotion[0].title}}</p>
                                    </div>
                                </div>
                                <div class="layout-theme-template16-top">
                                    <div class="layout-theme-template16-img">
                                        <img :src="promotion[1].img_url" onerror="this.src='http://static.icloud.xstvos.cn/noPic.jpg'"
                                            width="150" height="220" alt="">
                                    </div>
                                    <div class="layout-theme-template16-top-wenzi">
                                        <p>{{promotion[1].title}}</p>
                                    </div>
                                </div>
                                <div class="layout-theme-template16-top">
                                    <div class="layout-theme-template16-img">
                                        <img :src="promotion[2].img_url" onerror="this.src='http://static.icloud.xstvos.cn/noPic.jpg'"
                                            width="150" height="220" alt="">
                                    </div>
                                    <div class="layout-theme-template16-top-wenzi">
                                        <p>{{promotion[2].title}}</p>
                                    </div>
                                </div>
                            </div>
                            <div class="layout-theme-template13">
                                <div class="layout-theme-template13-float">
                                    <div class="layout-theme-template13-img">
                                        <img :src="promotion[3].img_url" onerror="this.src='http://static.icloud.xstvos.cn/noPic.jpg'"
                                            width="150" height="220" alt="">
                                    </div>
                                    <div class="layout-theme-template13-wenzi">
                                        <p>{{promotion[3].title}}</p>
                                    </div>
                                </div>
                                <div class="layout-theme-template13-float">
                                    <div class="layout-theme-template13-img">
                                        <img :src="promotion[4].img_url" onerror="this.src='http://static.icloud.xstvos.cn/noPic.jpg'"
                                            width="150" height="220" alt="">
                                    </div>
                                    <div class="layout-theme-template13-wenzi">
                                        <p>{{promotion[4].title}}</p>
                                    </div>
                                </div>
                                <div class="layout-theme-template13-float">
                                    <div class="layout-theme-template13-img">
                                        <img :src="promotion[5].img_url" onerror="this.src='http://static.icloud.xstvos.cn/noPic.jpg'"
                                            width="150" height="220" alt="">
                                    </div>
                                    <div class="layout-theme-template13-wenzi">
                                        <p>{{promotion[5].title}}</p>
                                    </div>
                                </div>
                                <div class="layout-theme-template13-float">
                                    <div class="layout-theme-template13-img">
                                        <img :src="promotion[6].img_url" onerror="this.src='http://static.icloud.xstvos.cn/noPic.jpg'"
                                            width="150" height="220" alt="">
                                    </div>
                                    <div class="layout-theme-template13-wenzi">
                                        <p>{{promotion[6].title}}</p>
                                    </div>
                                </div>
                                <div class="layout-theme-template13-float">
                                    <div class="layout-theme-template13-img">
                                        <img :src="promotion[7].img_url" onerror="this.src='http://static.icloud.xstvos.cn/noPic.jpg'"
                                            width="150" height="220" alt="">
                                    </div>
                                    <div class="layout-theme-template13-wenzi">
                                        <p>{{promotion[7].title}}</p>
                                    </div>
                                </div>
                                <div class="layout-theme-template13-float" @click="infoModal(220,150,promotion[8])">
                                    <div class="layout-theme-template13-img">
                                        <img :src="promotion[8].img_url" onerror="this.src='http://static.icloud.xstvos.cn/noPic.jpg'"
                                            width="150" height="220" alt="">
                                    </div>
                                    <div class="layout-theme-template13-wenzi">
                                        <p>{{promotion[8].title}}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div style="clear:both;"></div>
                        <!-- 模版21 -->
                        <div class="layout-theme-template21" v-if="recommend.layout_id == 21">
                            <div class="layout-theme-template21-float" @click="infoModal(220,300,promotion[0])">
                                <div class="layout-theme-template21-img">
                                    <img :src="promotion[0].img_url" onerror="this.src='http://static.icloud.xstvos.cn/noPic.jpg'"
                                        width="300" height="220" alt="">
                                </div>
                                <div class="layout-theme-template21-wenzi">
                                    <p>{{promotion[0].title}}</p>
                                </div>
                            </div>
                            <div class="layout-theme-template21-float" @click="infoModal(220,300,promotion[1])">
                                <div class="layout-theme-template21-img">
                                    <img :src="promotion[1].img_url" onerror="this.src='http://static.icloud.xstvos.cn/noPic.jpg'"
                                        width="300" height="220" alt="">
                                </div>
                                <div class="layout-theme-template21-wenzi">
                                    <p>{{promotion[1].title}}</p>
                                </div>
                            </div>
                            <div class="layout-theme-template21-top">
                                <div class="layout-theme-template21-img">
                                    <img :src="promotion[2].img_url" onerror="this.src='http://static.icloud.xstvos.cn/noPic.jpg'"
                                        width="150" height="220" alt="">
                                </div>
                                <div class="layout-theme-template21-top-wenzi">
                                    <p>{{promotion[2].title}}</p>
                                </div>
                            </div>
                            <div class="layout-theme-template21-top">
                                <div class="layout-theme-template21-img">
                                    <img :src="promotion[3].img_url" onerror="this.src='http://static.icloud.xstvos.cn/noPic.jpg'"
                                        width="150" height="220" alt="">
                                </div>
                                <div class="layout-theme-template21-top-wenzi">
                                    <p>{{promotion[3].title}}</p>
                                </div>
                            </div>
                            <div class="layout-theme-template13">
                                <div class="layout-theme-template13-float">
                                    <div class="layout-theme-template13-img">
                                        <img :src="promotion[4].img_url" onerror="this.src='http://static.icloud.xstvos.cn/noPic.jpg'"
                                            width="150" height="220" alt="">
                                    </div>
                                    <div class="layout-theme-template13-wenzi">
                                        <p>{{promotion[4].title}}</p>
                                    </div>
                                </div>
                                <div class="layout-theme-template13-float">
                                    <div class="layout-theme-template13-img">
                                        <img :src="promotion[5].img_url" onerror="this.src='http://static.icloud.xstvos.cn/noPic.jpg'"
                                            width="150" height="220" alt="">
                                    </div>
                                    <div class="layout-theme-template13-wenzi">
                                        <p>{{promotion[5].title}}</p>
                                    </div>
                                </div>
                                <div class="layout-theme-template13-float">
                                    <div class="layout-theme-template13-img">
                                        <img :src="promotion[6].img_url" onerror="this.src='http://static.icloud.xstvos.cn/noPic.jpg'"
                                            width="150" height="220" alt="">
                                    </div>
                                    <div class="layout-theme-template13-wenzi">
                                        <p>{{promotion[6].title}}</p>
                                    </div>
                                </div>
                                <div class="layout-theme-template13-float">
                                    <div class="layout-theme-template13-img">
                                        <img :src="promotion[7].img_url" onerror="this.src='http://static.icloud.xstvos.cn/noPic.jpg'"
                                            width="150" height="220" alt="">
                                    </div>
                                    <div class="layout-theme-template13-wenzi">
                                        <p>{{promotion[7].title}}</p>
                                    </div>
                                </div>
                                <div class="layout-theme-template13-float">
                                    <div class="layout-theme-template13-img">
                                        <img :src="promotion[8].img_url" onerror="this.src='http://static.icloud.xstvos.cn/noPic.jpg'"
                                            width="150" height="220" alt="">
                                    </div>
                                    <div class="layout-theme-template13-wenzi">
                                        <p>{{promotion[8].title}}</p>
                                    </div>
                                </div>
                                <div class="layout-theme-template13-float" @click="infoModal(220,150,promotion[9])">
                                    <div class="layout-theme-template13-img">
                                        <img :src="promotion[9].img_url" onerror="this.src='http://static.icloud.xstvos.cn/noPic.jpg'"
                                            width="150" height="220" alt="">
                                    </div>
                                    <div class="layout-theme-template13-wenzi">
                                        <p>{{promotion[9].title}}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div style="clear:both;"></div>
                        <!-- 模版22 -->
                        <div class="layout-theme-template22" v-if="recommend.layout_id == 22">
                            <div class="layout-theme-template22-float" @click="infoModal(220,300,promotion[0])">
                                <div class="layout-theme-template22-img">
                                    <img :src="promotion[0].img_url" onerror="this.src='http://static.icloud.xstvos.cn/noPic.jpg'"
                                        width="300" height="220" alt="">
                                </div>
                                <div class="layout-theme-template22-wenzi">
                                    <p>{{promotion[0].title}}</p>
                                </div>
                            </div>
                            <div class="layout-theme-template22-float" @click="infoModal(220,300,promotion[1])">
                                <div class="layout-theme-template22-img">
                                    <img :src="promotion[1].img_url" onerror="this.src='http://static.icloud.xstvos.cn/noPic.jpg'"
                                        width="300" height="220" alt="">
                                </div>
                                <div class="layout-theme-template22-wenzi">
                                    <p>{{promotion[1].title}}</p>
                                </div>
                            </div>
                            <div class="layout-theme-template22-float" @click="infoModal(220,300,promotion[2])">
                                <div class="layout-theme-template22-img">
                                    <img :src="promotion[2].img_url" onerror="this.src='http://static.icloud.xstvos.cn/noPic.jpg'"
                                        width="300" height="220" alt="">
                                </div>
                                <div class="layout-theme-template22-wenzi">
                                    <p>{{promotion[2].title}}</p>
                                </div>
                            </div>
                            <div class="layout-theme-template13">
                                <div class="layout-theme-template13-float">
                                    <div class="layout-theme-template13-img">
                                        <img :src="promotion[3].img_url" onerror="this.src='http://static.icloud.xstvos.cn/noPic.jpg'"
                                            width="150" height="220" alt="">
                                    </div>
                                    <div class="layout-theme-template13-wenzi">
                                        <p>{{promotion[3].title}}</p>
                                    </div>
                                </div>
                                <div class="layout-theme-template13-float">
                                    <div class="layout-theme-template13-img">
                                        <img :src="promotion[4].img_url" onerror="this.src='http://static.icloud.xstvos.cn/noPic.jpg'"
                                            width="150" height="220" alt="">
                                    </div>
                                    <div class="layout-theme-template13-wenzi">
                                        <p>{{promotion[4].title}}</p>
                                    </div>
                                </div>
                                <div class="layout-theme-template13-float">
                                    <div class="layout-theme-template13-img">
                                        <img :src="promotion[5].img_url" onerror="this.src='http://static.icloud.xstvos.cn/noPic.jpg'"
                                            width="150" height="220" alt="">
                                    </div>
                                    <div class="layout-theme-template13-wenzi">
                                        <p>{{promotion[5].title}}</p>
                                    </div>
                                </div>
                                <div class="layout-theme-template13-float">
                                    <div class="layout-theme-template13-img">
                                        <img :src="promotion[6].img_url" onerror="this.src='http://static.icloud.xstvos.cn/noPic.jpg'"
                                            width="150" height="220" alt="">
                                    </div>
                                    <div class="layout-theme-template13-wenzi">
                                        <p>{{promotion[6].title}}</p>
                                    </div>
                                </div>
                                <div class="layout-theme-template13-float">
                                    <div class="layout-theme-template13-img">
                                        <img :src="promotion[7].img_url" onerror="this.src='http://static.icloud.xstvos.cn/noPic.jpg'"
                                            width="150" height="220" alt="">
                                    </div>
                                    <div class="layout-theme-template13-wenzi">
                                        <p>{{promotion[7].title}}</p>
                                    </div>
                                </div>
                                <div class="layout-theme-template13-float" @click="infoModal(220,300,promotion[9])">
                                    <div class="layout-theme-template13-img">
                                        <img :src="promotion[8].img_url" onerror="this.src='http://static.icloud.xstvos.cn/noPic.jpg'"
                                            width="150" height="220" alt="">
                                    </div>
                                    <div class="layout-theme-template13-wenzi">
                                        <p>{{promotion[8].title}}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div style="clear:both;"></div>
                        <!-- 模版23 -->
                        <div class="layout-theme-template23" v-if="recommend.layout_id == 23">
                            <div class="layout-theme-template23-float"  @click="infoModal(220,460,promotion[0])">
                                <div class="layout-theme-template23-img">
                                    <img :src="promotion[0].img_url" onerror="this.src='http://static.icloud.xstvos.cn/noPic.jpg'"
                                        width="460" height="220" alt="">
                                </div>
                                <div class="layout-theme-template23-wenzi">
                                    <p>{{promotion[0].title}}</p>
                                </div>
                            </div>
                            <div class="layout-theme-template23-float"  @click="infoModal(220,460,promotion[1])">
                                <div class="layout-theme-template23-img">
                                    <img :src="promotion[1].img_url" onerror="this.src='http://static.icloud.xstvos.cn/noPic.jpg'"
                                        width="460" height="220" alt="">
                                </div>
                                <div class="layout-theme-template23-wenzi">
                                    <p>{{promotion[1].title}}</p>
                                </div>
                            </div>
                            <div class="layout-theme-template13">
                                <div class="layout-theme-template13-float">
                                    <div class="layout-theme-template13-img">
                                        <img :src="promotion[2].img_url" onerror="this.src='http://static.icloud.xstvos.cn/noPic.jpg'"
                                            width="150" height="220" alt="">
                                    </div>
                                    <div class="layout-theme-template13-wenzi">
                                        <p>{{promotion[2].title}}</p>
                                    </div>
                                </div>
                                <div class="layout-theme-template13-float">
                                    <div class="layout-theme-template13-img">
                                        <img :src="promotion[3].img_url" onerror="this.src='http://static.icloud.xstvos.cn/noPic.jpg'"
                                            width="150" height="220" alt="">
                                    </div>
                                    <div class="layout-theme-template13-wenzi">
                                        <p>{{promotion[3].title}}</p>
                                    </div>
                                </div>
                                <div class="layout-theme-template13-float">
                                    <div class="layout-theme-template13-img">
                                        <img :src="promotion[4].img_url" onerror="this.src='http://static.icloud.xstvos.cn/noPic.jpg'"
                                            width="150" height="220" alt="">
                                    </div>
                                    <div class="layout-theme-template13-wenzi">
                                        <p>{{promotion[4].title}}</p>
                                    </div>
                                </div>
                                <div class="layout-theme-template13-float">
                                    <div class="layout-theme-template13-img">
                                        <img :src="promotion[5].img_url" onerror="this.src='http://static.icloud.xstvos.cn/noPic.jpg'"
                                            width="150" height="220" alt="">
                                    </div>
                                    <div class="layout-theme-template13-wenzi">
                                        <p>{{promotion[5].title}}</p>
                                    </div>
                                </div>
                                <div class="layout-theme-template13-float">
                                    <div class="layout-theme-template13-img">
                                        <img :src="promotion[6].img_url" onerror="this.src='http://static.icloud.xstvos.cn/noPic.jpg'"
                                            width="150" height="220" alt="">
                                    </div>
                                    <div class="layout-theme-template13-wenzi">
                                        <p>{{promotion[6].title}}</p>
                                    </div>
                                </div>
                                <div class="layout-theme-template13-float" @click="infoModal(220,300,promotion[7])">
                                    <div class="layout-theme-template13-img">
                                        <img :src="promotion[7].img_url" onerror="this.src='http://static.icloud.xstvos.cn/noPic.jpg'"
                                            width="150" height="220" alt="">
                                    </div>
                                    <div class="layout-theme-template13-wenzi">
                                        <p>{{promotion[7].title}}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div style="clear:both;"></div>
                    </div>
                </div>
            </div>
        </Modal>
        <!-- 推荐位管理 -->
        <Modal v-model="modalRecommendEdit" title="推荐位管理">
            <div slot="footer">
                <Button @click="modalRecommendEditCancel" class="btnSpan">取消</Button>
                <Button @click="modalRecommendEditOk" type="primary">确定</Button>
            </div>
            <Form :model="recommendEdit" label-position="right" :label-width="100">
                <FormItem label="主标题:">
                    <Input v-model="recommendEdit.title" placeholder="主标题..."></Input>
                </FormItem>
                <FormItem label="副标题">
                    <Input v-model="recommendEdit.title2" placeholder="副标题..."></Input>
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
                    <Upload :on-success="handleSuccess1" :with-credentials="true" :format="['jpg','jpeg','png']"
                        :max-size="2048" :on-format-error="handleFormatError" :on-exceeded-size="handleMaxSize" :action="$config.BaseURLfile + '/common/upload/file'">
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
                        <Radio label="内部跳转" :true-value="1" :false-value="2" v-model="recommendEdit.actionType"></Radio>
                        <Radio label="第三方应用" :true-value="2" :false-value="1" v-model="recommendEdit.actionType"></Radio>
                    </RadioGroup>
                </FormItem>
                <div v-if="recommendEdit.actionType == 2">
                    <FormItem label="应用下载地址:">
                        <Input v-model="recommendEdit.filePath" placeholder="应用下载地址..."></Input>
                    </FormItem>
                    <FormItem label="应用包md5:">
                        <Input v-model="recommendEdit.fileMd5" placeholder="应用包md5..."></Input>
                    </FormItem>
                    <FormItem label="包名:">
                        <Input v-model="recommendEdit.pkg" placeholder="包名..."></Input>
                    </FormItem>
                </div>
                <FormItem label="ACTION:">
                    <Select style="width:389px" v-model="recommendEdit.actionId">
                        <Option v-for="item in cityList" :value="item.id" :key="item.id">{{ item.title }}</Option>
                    </Select>
                </FormItem>
                <FormItem label="类型:">
                    <RadioGroup @on-change="changeShowParameter">
                        <Radio label="参数跳转" :true-value="0" :false-value="1" v-model="recommendEdit.type"></Radio>
                        <Radio label="uri跳转" :true-value="1" :false-value="0" v-model="recommendEdit.type"></Radio>
                    </RadioGroup>
                </FormItem>
                <div v-if="showParameter == 'B'">
                    <FormItem label="跳转参数:">
                        <Input v-model="recommendEdit.params" type="textarea" :rows="4" placeholder="跳转参数参数..."></Input>
                    </FormItem>
                    <FormItem label="版本要求:">
                        <Input v-model="recommendEdit.version" placeholder="版本要求..."></Input>
                    </FormItem>
                </div>
                <div v-if="showParameter == 'A'">
                    <FormItem label="uri参数:">
                        <Input v-model="recommendEdit.uri" type="textarea" :rows="4" placeholder="uri参数..."></Input>
                    </FormItem>
                    <FormItem label="版本要求:">
                        <Input v-model="recommendEdit.version" placeholder="版本要求..."></Input>
                    </FormItem>
                </div>
            </Form>
        </Modal>
    </div>
</template>
<script>
    var moment = require("moment");
    export default {
        data() {
            return {

                recommendEdit: {},
                modalRecommendEdit: false,
                img_h: 0,
                img_w: 0,
                cityList: [],
                showParameter: 'A', // 弹框中切换参数类型
                themeSearch: {
                    theme_title: '',
                },
                themeId: '',//主题id
                themeInfo: {},
                modalThemeAdd: false,// 主题添加
                modalSpecialEdit: false,//专题名称修改
                specialSearch: {
                    wrap_name: '',
                    type: ''
                },//专题列表搜索
                themeEdit: {},
                modalThemeEdit: false,//主题修改
                modalRecommended: false,//推荐维护
                promotion: [],//推荐维护运营位
                recommend: {},//推荐名称

                page: 1,
                pageSize: 30,
                total: 0,//专题分页

                pageSpecial: 1,
                pageSizeSpecial: 1,
                totalSpecial: 0,//专题分页
                themeListId: '',

                modalContent: false,//内容维护
                contentSearch: {
                    title: '',
                    director: '',
                    year: ''
                },//内容维护搜索
                contentId: '',//内容维护id
                pageContent: 1,
                pageSizeContent: 30,
                totalContent: 0,//内容维护分页
                modalContentAdd: false,//内容维护添加
                ContentEdit: {},
                modalContentEdit: false,//内容维护修改
                topic_id: '',//内容维护修改一整行id
                ContentAddSearch: {
                    title: '',
                    year: '',
                    director: ''
                },//内容维护添加搜索
                pageContentAdd: 1,
                pageSizeContentAdd: 30,
                totalContentAdd: 0,//内容维护添加列表分页

                modalLayout: false,//选择布局块
                layout_id: 0,

                specialOneRow: {}, //是否关联媒资列表

                item: {},
                columns1: [
                    {
                        title: 'ID',
                        key: 'id',
                        align: 'center'
                    },
                    {
                        title: '主题名称',
                        key: 'theme_title',
                        align: 'center'
                    },
                    {
                        title: '显示名称',
                        key: 'display_title',
                        align: 'center'
                    },
                    {
                        title: '是否关联专题',
                        key: 'is_is_relate',
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
                        title: '操作',
                        width: 200,
                        align: 'center',
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
                                            this.recommended(params.row)
                                        }
                                    }
                                }, '推荐维护'),
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
                                            this.themeModify(params.row)
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
                                                this.themeRemove(params.row);
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
                        key: 'wrap_id',
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
                        title: '创建时间',
                        key: 'Iscreate_time',
                        align: 'center'
                    }
                ],
                data2: [],
                columnsContent: [
                    {
                        title: 'ID',
                        key: 'topic_id',
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
                        title: '上线时间',
                        key: 'Isupdate_time',
                        align: 'center'
                    },
                    {
                        title: '操作',
                        width: 200,
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
                                            this.contentModify(params.row)
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
                                                this.contentRemove(params.row);
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
                dataContent: [
                ],
                selectionContentAdd: [], // 选中的行列表
                columnsContentAdd: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center',
                        _checked: false
                    },
                    {
                        title: 'ID',
                        key: 'id',
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
                    }
                ],
                dataContentAdd: []
            }
        },
        methods: {
            //表格数据
            getTableList() {
                this.$http(this.$config.BaseURL8 + '/cms/theme/list?theme_title=' + this.themeSearch.theme_title + '&page=' + this.page + '&page_size=' + this.pageSize).then(response => {
                    if (response.data.errno == 10000) {
                        this.data1 = response.data.data.list;

                        response.data.data.list.forEach(val => {
                            // 是否关联：1是、0否
                            if (val.is_relate == 0) {
                                val.is_is_relate = "否"
                            } else if (val.is_relate == 1) {
                                val.is_is_relate = "是"
                            }
                            // 状态：1上线，0下线 
                            if (val.status == 0) {
                                val.is_status = "下线"
                            } else if (val.status == 1) {
                                val.is_status = "上线"
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
            // 搜索
            themeQuery() {
                this.page = 1;
                this.getTableList();
            },
            // 分页
            changePage(page) {
                this.page = page;
                this.getTableList();
            },
            // 主题添加确定按钮
            addThemeOk() {
                this.themeInfo.is_relate *= 1;
                this.$http.post(this.$config.BaseURL8 + '/cms/theme/modify', this.themeInfo).then(response => {
                    if (response.data.errno == 10000) {
                        this.themeInfo = {};
                        this.getTableList();
                        this.modalThemeAdd = false;
                        this.$Message.success('添加成功');
                    }
                })
            },
            // 主题添加取消按钮
            addThemeCancel() {
                this.themeInfo = {};
                this.getTableList();
                this.modalThemeAdd = false;
            },
            // 主题修改弹框
            themeModify(row) {
                console.log(row)
                this.themeEdit = row;
                this.themeId = row.id;
                this.modalThemeEdit = true;
            },
            //主题修改确定按钮
            editThemeOk() {
                this.themeEdit.id = this.themeId;
                this.$http.post(this.$config.BaseURL8 + '/cms/theme/modify', this.themeEdit).then(response => {
                    if (response.data.errno == 10000) {
                        this.modalThemeEdit = false;
                        this.getTableList();
                        this.$Message.success('修改成功！');
                    }
                })
            },
            //主题修改取消按钮
            editThemeCancel() {
                this.getTableList();
                this.modalThemeEdit = false;
            },
            // 主题删除
            themeRemove(row) {
                this.$http.post(this.$config.BaseURL8 + '/cms/theme/delete', {
                    id: row.id
                }).then(response => {
                    if (response.data.errno == 10000) {
                        this.getTableList();
                        this.$Message.success('删除成功！');
                    }
                })
            },
            // 添加修改关联媒资 专题列表接口
            getSpecialList() {
                this.$http.get(this.$config.BaseURL8 + '/cms/wrap/list?wrap_name=' + this.specialSearch.wrap_name + '&type=' + this.specialSearch.type + '&page=' + this.pageSpecial + '&page_size=' + this.pageSizeSpecial).then(response => {
                    if (response.data.errno == 10000) {
                        this.data2 = response.data.data.list;

                        response.data.data.list.forEach(val => {
                            // 专题类型：1、横版，2、竖版，3、竖版带布局
                            if (val.type == 1) {
                                val.is_type = '横版'
                            } else if (val.type == 2) {
                                val.is_type = '竖版'
                            } else if (val.type == 3) {
                                val.is_type = '竖版带布局'
                            }

                            //时间转换
                            val.Iscreate_time = moment(val.create_time * 1000).format(
                                "YYYY-MM-DD HH:mm:ss"
                            )
                        });

                        this.totalSpecial = response.data.data.total;
                    }
                })
            },
            // 专题搜素
            specialQuery() {
                this.pageSpecial = 1;
                this.getSpecialList();
            },
            // 分页
            changePageSpecial(page) {
                this.pageSpecial = page;
                this.getSpecialList();
            },
            // 表格添加一整行
            specialListOne(row, index) {
                console.log(row);
                console.log(index);
                this.specialOneRow = row;
                console.log(this.specialOneRow);
            },
            okSpecialOne() {
                this.themeInfo.wrap_id = this.specialOneRow.id;
                this.themeInfo.wrap_title = this.specialOneRow.wrap_title;

                this.themeEdit.wrap_id = this.specialOneRow.id;
                this.themeEdit.wrap_title = this.specialOneRow.wrap_title;
            },
            // 推荐维护
            recommended(row) {
                console.log(row);
                this.themeListId = row.id;
                this.promotionList();
                this.modalRecommended = true;
            },
            // 推荐维护运营位
            promotionList() {
                this.$http(this.$config.BaseURL8 + '/cms/theme/recommend/info?id=' + this.themeListId).then(response => {
                    if (response.data.errno == 10000) {
                        console.log(response)
                        this.recommend = response.data.data;
                        this.promotion = response.data.data.promotion;
                        console.log(this.recommend.id);
                    }
                })
            },
            // 内容维护
            modalContentBtn() {
                this.modalContent = true;
                this.getContentAddList();
                this.getContentList();
            },
            // 内容维护列表
            getContentList() {
                this.$http(this.$config.BaseURL8 + '/cms/theme/topic/list?id=' + this.themeListId + '&title=' + this.contentSearch.title + '&director=' + this.contentSearch.director + '&year=' + this.contentSearch.year + '&page=' + this.pageContent + '&page_size=' + this.pageSizeContent).then(response => {
                    console.log(response)
                    if (response.data.errno == 10000) {
                        this.dataContent = response.data.data.list;
                        response.data.data.list.forEach(val => {
                            //时间转换
                            val.Isupdate_time = moment(val.update_time * 1000).format(
                                "YYYY-MM-DD HH:mm:ss"
                            )
                        });
                        // update_time

                        this.totalContent = response.data.data.total;
                    }
                })
            },
            // 内容维护搜索
            contentQuery() {
                this.pageContent = 1;
                this.getContentList();
            },
            // 内容维护分页
            changePageContent(page) {
                this.pageContent = page;
                this.getContentList();
            },
            //内容维护修改弹框
            contentModify(row) {
                this.ContentEdit = row;
                this.topic_id = row.topic_id;
                this.modalContentEdit = true;
            },
            //修改确定按钮
            okContentEdit() {
                this.ContentEdit.topic_id = this.topic_id;
                this.ContentEdit.rank *= 1;
                this.$http.post(this.$config.BaseURL8 + '/cms/theme/topic/modify', this.ContentEdit).then(response => {
                    if (response.data.errno == 10000) {
                        this.modalContentEdit = false;
                        this.getContentList();
                        this.$Message.success('修改成功！');
                    }
                })
            },
            //内容维护删除
            contentRemove(row) {
                this.$http.post(this.$config.BaseURL8 + '/cms/theme/topic/remove', {
                    topic_id: row.topic_id
                }).then(response => {
                    if (response.data.errno == 10000) {
                        this.getContentList();
                        this.$Message.success('删除成功！');
                    }
                })
            },
            //内容维护添加列表
            getContentAddList() {
                this.$http(this.$config.BaseURL8 + '/cms/media/search?title=' + this.ContentAddSearch.title + '&year=' + this.ContentAddSearch.year + '&director=' + this.ContentAddSearch.director + '&page=' + this.pageContentAdd + '&pageSize=' + this.pageSizeContentAdd).then(response => {
                    console.log(response)
                    if (response.data.errno == 10000) {
                        this.dataContentAdd = response.data.data.list;
                        this.totalContentAdd = response.data.data.total;
                        // 如果已经选择，择选中
                        this.dataContentAdd.forEach(val => {
                            let isExt = false;
                            this.selectionContentAdd.forEach(val1 => {
                                if (val.id == val1.id) { // hehe
                                    isExt = true;
                                }
                            });
                            val._checked = isExt;
                        });
                    }
                })
            },
            //内容维护添加搜索
            contentAddQuery() {
                this.pageContentAdd = 1;
                this.getContentAddList();
            },
            // 内容维护添加分页
            changePageContentAdd(page) {
                this.pageContentAdd = page;
                this.getContentAddList();
            },
            //删除布局块
            removeLayoutBlock() {
                console.log(this.themeListId)
                this.$http.post(this.$config.BaseURL8 + '/cms/theme/recommend/remove', {
                    id: this.themeListId
                }).then(response => {
                    if (response.data.errno == 10000) {
                        this.promotionList();
                        this.$$Message.success("删除成功！");
                    }
                })
            },
            // 选择布局块
            layoutChange(val) {
                console.log(val);
            },
            // 选择布局块确定按钮
            addLayoutOk() {
                if (typeof this.layout_id == 'undefined') {
                    this.$Message.error('请选择布局块！');
                    return;
                }
                this.$http.post(this.$config.BaseURL8 + '/cms/theme/layout/save', {
                    id: this.themeListId,
                    layout_id: this.layout_id
                }).then(response => {
                    if (response.data.errno == 10000) {
                        this.promotionList();
                        this.modalLayout = false;
                        this.$Message.success('保存成功！')
                    }
                })
            },
            addLayoutCancel() { },


            // 编辑弹框
            // h 高
            // w 宽
            // promotion 点击的图片这一行数据
            infoModal(h, w, promotion) {
                this.getSelectList()
                console.log(promotion)
                this.modalRecommendEdit = true;
                this.img_w = w;
                this.img_h = h;

                this.recommendEdit = promotion;

                if (typeof this.recommendEdit.type == 'undefined') {
                    this.recommendEdit.type = 1
                }
                this.showParameter = this.recommendEdit.type == 1 ? 'A' : 'B'; // 默认参数类型
                console.log(this.showParameter)

            },


            // 取消推荐位编辑
            modalRecommendEditCancel() {
                this.modalRecommendEdit = false;
                this.promotionList();
            },
            // 确定保存推荐位
            modalRecommendEditOk() {
                console.log(this.recommendEdit);
                this.recommendEdit.id = this.themeListId;
                this.$http.post(`${this.$config.BaseURL8}/cms/theme/recommend/modify`, this.recommendEdit).then(response => {
                    console.log(response)
                    if (response.data.errno == 10000) {
                        this.promotionList();
                        this.modalRecommendEdit = false;
                        this.$Message.success('保存成功');
                    }
                });
            },

            // 切换类型
            changeShowParameter() {
                console.log(this.edit.type)
                this.showParameter = this.edit.type == 1 ? 'A' : 'B';
            },

            // 图片上传失败
            handleFormatError(error) {
                console.log(error);
                this.$Message.error('图片上传失败');
            },

            //上传文件大小验证
            handleMaxSize(file) {
                this.$Notice.warning({
                    title: '超过文件大小限制',
                    desc: '文件  ' + '文件名' + ' 太大，不超过2M.'
                });
            },

            // 图片1上传成功
            handleSuccess(res, file) {
                console.log(res);
                if (res.errno == 10000) {
                    file.url = res.data.url
                    file.name = ""
                    // this.bgurl = res.data.url;
                    this.recommendEdit.imgUrl = res.data.url
                }
            },

            // 图片2上传成功
            handleSuccess1(res, file) {
                console.log(res);
                if (res.errno == 10000) {
                    file.url = res.data.url
                    file.name = ""
                    this.bgurl = res.data.url;
                    this.recommendEdit.imgUrl2 = res.data.url
                }
            },
            //action下拉框 
            getSelectList() {
                let self = this;
                self.$http.get(this.$config.BaseURL + '/staticpromotion/action/list').then(response => {
                    console.log(response)
                    self.cityList = response.data.data.list;
                }, response => {

                })
            },
            /** 内容添加 */
            onSelectionContentAdd(selection) {
                // 这里为兼容翻页，循环添加不存在的
                selection.forEach(val => {
                    let isExt = false;
                    this.selectionContentAdd.forEach(val1 => {
                        if (val.id == val1.id) { // hehe
                            isExt = true;
                        }
                    });
                    if (isExt == false) {
                        this.selectionContentAdd.push(val);
                    }
                });

            },
            // 添加确定事件
            modalContentAddOk() {
                let ids = [];
                this.selectionContentAdd.forEach(val => {
                    ids.push(val.id); // hehe
                })
                if (ids.length == 0) {
                    return
                }
                this.$http.post(`${this.$config.BaseURL8}/cms/theme/topic/add`, {
                    id: this.themeListId,
                    media_id: ids,
                }).then(response => {
                    console.log(response)
                    if (response.data.errno == 10000) {
                        this.getContentList();
                    }
                });
            }
        },
        mounted() {
            this.getTableList();
            this.getSelectList();
        }
    }
</script>