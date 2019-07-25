<style>
    .layout-template2-search {
        float: left;
    }

    .layout-template2-add {
        float: right;
    }

    .layout-template2-table {
        clear: both;
    }

    .span {
        font-size: 14px;
        margin: 15px;
        color: #495060;
        padding-bottom: 20px;
    }

    .layout-template2-page {
        float: right;
        margin-top: 10px;
    }

    .ivu-table th,
    .ivu-table td {
        height: 40px;
    }

    .layout-template2 .ivu-poptip-confirm .ivu-poptip-body .ivu-icon {
        font-size: 16px;
        color: #ff9900;
        line-height: 18px;
        position: absolute;
        margin-left: -50px;
    }

    .layout-management-search {
        float: left;
    }

    .layout-management-add {
        float: right;
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
        box-shadow: 0 1px 1px rgba(0, 0, 0, .2);
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
        background: rgba(0, 0, 0, .6);
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
    <div class="layout-template2">
        <!-- 搜索 -->
        <div class="layout-template2-search">
            <Form :model="search" inline>
                <FormItem label="模板名称:" :label-width="70">
                    <Input v-model="search.title" placeholder="请输入模板名称..." style="width:200px;"></Input>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="query">搜索</Button>
                </FormItem>
            </Form>
        </div>
        <!-- 添加 -->
        <div class="layout-template2-add">
            <Button type="success" @click="modalAdd = true">添加</Button>
            <Modal v-model="modalAdd" title="添加">
                <div slot="footer">
                    <a @click="addCancel" class="span">取消</a>
                    <Button @click="addOk" type="primary">确定</Button>
                </div>
                <Form :model="info" label-position="right" :label-width="100" ref="info" :rules="ruleValidate">
                    <FormItem label="模板名称:">
                        <Input v-model="info.title" placeholder="请输入模板名称..."></Input>
                    </FormItem>
                    <FormItem label="模板类型:">
                        <RadioGroup v-model="info.type">
                            <Radio label="1">影视</Radio>
                            <Radio label="2">应用</Radio>
                        </RadioGroup>
                    </FormItem>
                    <FormItem label="内容来源:" v-if="info.type !=2">
                        <Select v-model="info.cp" placeholder="请输入内容来源...">
                            <Option v-for="item in cityList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="描述:">
                        <Input v-model="info.description" type="textarea" :rows="4" placeholder="请输入描述..."></Input>
                    </FormItem>
                </Form>
            </Modal>
        </div>
        <div class="layout-template2-table">
            <Table border :columns="columns1" :data="data1"></Table>
        </div>
        <div class="layout-template2-page">
            <Page :total="total" :current="page" :page-size='pageSize' @on-change="changePage" show-elevator />
        </div>
        <!-- 修改  -->
        <div class="layout-template2-edit">
            <Modal v-model="modalEdit" title="修改">
                <div slot="footer">
                    <a @click="modalEditBtn" class="span">取消</a>
                    <Button @click="editOk" type="primary">确定</Button>
                </div>
                <Form :model="edit" label-position="right" :label-width="100">
                    <FormItem label="模板名称:">
                        <Input v-model="edit.title" placeholder="请输入模板名称..."></Input>
                    </FormItem>
                    <FormItem label="模板类型:">
                        <RadioGroup v-model="edit.type">
                            <Radio :label="1">影视</Radio>
                            <Radio :label="2">应用</Radio>
                        </RadioGroup>
                    </FormItem>
                    <FormItem label="内容来源:" v-if="edit.type !=2">
                        <Select v-model="edit.cp" placeholder="请输入内容来源...">
                            <Option v-for="item in cityList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="描述:">
                        <Input v-model="edit.description" type="textarea" :rows="4" placeholder="请输入描述..."></Input>
                    </FormItem>
                </Form>
            </Modal>
        </div>
        <!-- 应用桌面管理 -->
        <div class="layout-template2-management">
            <Modal v-model="modalManagement" title="应用桌面管理" width="1100">
                <div class="layout-management-search">
                    <Form :model="managSearch" inline>
                        <FormItem label="桌面名称:" :label-width="70">
                            <Input v-model="managSearch.title" placeholder="请输入桌面名称..." style="width:160px;"></Input>
                        </FormItem>
                        <FormItem label="状态:" :label-width="50">
                            <Select v-model="managSearch.status" style="width:160px" placeholder="请选择状态...">
                                <Option value="">全部</Option>
                                <Option :value="0">下线</Option>
                                <Option :value="1">上线</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="年级:" :label-width="50">
                            <Select v-model="managSearch.grade" style="width:170px;" placeholder="请选择年级...">
                                <Option value="">全部</Option>
                                <Option v-for="item in gradeList" :value="item.id" :key="item.id">
                                    {{ item.title }}
                                </Option>
                            </Select>
                        </FormItem>
                        <FormItem label="学期:" :label-width="50">
                            <Select v-model="managSearch.semester" style="width:170px;" placeholder="请选择学期...">
                                <Option value="">全部</Option>
                                <Option v-for="item in semesterList" :value="item.id" :key="item.id">
                                    {{ item.title }}
                                </Option>
                            </Select>
                        </FormItem>
                        <FormItem>
                            <Button type="primary" @click="manageQuery">搜索</Button>
                        </FormItem>
                    </Form>
                </div>
                <div class="layout-management-add">
                    <Button type="success" @click="modalManagementAdd = true">添加</Button>
                </div>
                <div style="clear:both;"></div>
                <Table border :columns="columns2" :data="data2"></Table>
                <div class="layout-template2-page">
                    <Page :total="totalManagement" :current="pageManagement" :page-size='pageSizeManagement'
                        @on-change="changePageManagement" show-elevator />
                </div>
                <div style="margin-top:40px;"></div>
            </Modal>
            <!-- 应用桌面添加 -->
            <Modal v-model="modalManagementAdd" title="添加桌面">
                <div slot="footer">
                    <a @click="addManagementCancel" class="span">取消</a>
                    <Button @click="addManagementOk" type="primary">确定</Button>
                </div>
                <Form :model="managementInfo" label-position="right" :label-width="100">
                    <FormItem label="桌面名称:">
                        <Input v-model="managementInfo.title" placeholder="请输入桌面名称..."></Input>
                    </FormItem>
                    <FormItem label="桌面类型:">
                        <Select v-model="managementInfo.typeId" placeholder="请选择桌面类型...">
                            <Option v-for="item in desktopType" :value="item.id" :key="item.id">{{ item.title}}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="桌面图标:">
                        <Upload :action="$config.BaseURLfile + '/common/upload/file'" ref="uploadInfoIcon"
                            :on-success="handleSuccessInfoIcon" :format="['jpg','jpeg','png']" :max-size="2048"
                            :on-format-error="handleFormatErrorInfoIcon" :on-exceeded-size="handleMaxSizeInfoIcon"
                            :with-credentials="true">
                            <Button icon="ios-cloud-upload-outline">上传桌面图标</Button>
                        </Upload>
                    </FormItem>
                    <FormItem label="桌面背景图:">
                        <Upload :action="$config.BaseURLfile + '/common/upload/file'" ref="uploadInfoImg"
                            :on-success="handleSuccessInfoImg" :format="['jpg','jpeg','png']" :max-size="2048"
                            :on-format-error="handleFormatErrorInfoImg" :on-exceeded-size="handleMaxSizeInfoImg"
                            :with-credentials="true">
                            <Button icon="ios-cloud-upload-outline">上传桌面背景图</Button>
                        </Upload>
                    </FormItem>
                    <FormItem label="排序:">
                        <Input v-model="managementInfo.sortId" placeholder="请输入排序..."></Input>
                    </FormItem>
                    <FormItem label="状态:">
                        <Select v-model="managementInfo.status" placeholder="请选择状态...">
                            <Option :value="1">上线</Option>
                            <Option :value="0">下线</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="年级-学期:">
                        <Tree :data="dataTree" show-checkbox></Tree>
                    </FormItem>
                    <FormItem label="描述">
                        <Input v-model="managementInfo.description" type="textarea" :rows="4"
                            placeholder="请输入描述..."></Input>
                    </FormItem>
                </Form>
            </Modal>
            <!-- 应用桌面修改 -->
            <Modal v-model="modalManagementEdit" title="修改桌面">
                <div slot="footer">
                    <a @click="editManagementCancel" class="span">取消</a>
                    <Button @click="editManagementOk" type="primary">确定</Button>
                </div>
                <Form :model="managementEdit" label-position="right" :label-width="100">
                    <FormItem label="桌面名称:">
                        <Input v-model="managementEdit.title" placeholder="请输入桌面名称..."></Input>
                    </FormItem>
                    <FormItem label="桌面类型:">
                        <Input v-model="managementEdit.typeTitle" placeholder="请输入桌面类型..." disabled></Input>
                    </FormItem>
                    <FormItem label="桌面图标:">
                        <Upload :action="$config.BaseURLfile + '/common/upload/file'" ref="uploadEditIcon"
                            :on-success="handleSuccessEditIcon" :format="['jpg','jpeg','png']" :max-size="2048"
                            :on-format-error="handleFormatErrorEditIcon" :on-exceeded-size="handleMaxSizeEditIcon"
                            :with-credentials="true">
                            <Button icon="ios-cloud-upload-outline">上传桌面图标</Button>
                        </Upload>
                    </FormItem>
                    <FormItem label="桌面背景图:">
                        <div class="demo-upload-list" v-for="item in uploadList">
                            <template v-if="item.status === 'finished'">
                                <img :src="item.url">
                                <div class="demo-upload-list-cover">
                                    <Icon type="ios-eye-outline" @click.native="handleViewEditImg(item.name)"></Icon>
                                    <Icon type="ios-trash-outline" @click.native="handleRemoveEditImg(item)"></Icon>
                                </div>
                            </template>
                            <template v-else>
                                <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
                            </template>
                        </div>
                        <Upload ref="upload" :show-upload-list="false" :on-success="handleSuccessEditImg"
                            :format="['jpg','jpeg','png']" :max-size="2048" :on-format-error="handleFormatErrorEditImg"
                            :on-exceeded-size="handleMaxSizeEditImg" :before-upload="handleBeforeUploadEditImg" multiple
                            type="drag" :action="$config.BaseURLfile + '/common/upload/file'"
                            style="display: inline-block;width:58px;" :with-credentials="true">
                            <div style="width: 58px;height:58px;line-height: 58px;">
                                <Icon type="ios-camera" size="20"></Icon>
                            </div>
                        </Upload>
                        <Modal title="查看图片" v-model="visible">
                            <img :src="showImgUrl" v-if="visible" style="width: 100%">
                        </Modal>
                    </FormItem>
                    <FormItem label="排序:">
                        <Input v-model="managementEdit.sortId" placeholder="请输入排序..."></Input>
                    </FormItem>
                    <FormItem label="状态:">
                        <Select v-model="managementEdit.status" placeholder="请选择状态...">
                            <Option :value="1">上线</Option>
                            <Option :value="0">下线</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="年级-学期:">
                        <Tree :data="dataTree" show-checkbox></Tree>
                    </FormItem>
                    <FormItem label="描述">
                        <Input v-model="managementEdit.description" type="textarea" :rows="4"
                            placeholder="请输入描述..."></Input>
                    </FormItem>
                </Form>
            </Modal>
            <!-- 应用桌面复制 -->
            <Modal v-model="modalManagementCopy" title="复制桌面">
                <div slot="footer">
                    <a @click="copyManagementCancel" class="span">取消</a>
                    <Button @click="copyManagementOk" type="primary">确定</Button>
                </div>
                <Form :model="managementCopy" label-position="right" :label-width="100">
                    <FormItem label="桌面名称:">
                        <Input v-model="managementCopy.title" placeholder="请输入桌面名称..."></Input>
                    </FormItem>
                    <FormItem label="桌面类型:">
                        <Input v-model="managementCopy.typeTitle" placeholder="请输入桌面类型..." disabled></Input>
                    </FormItem>
                    <FormItem label="桌面图标:">
                        <Upload :action="$config.BaseURLfile + '/common/upload/file'" ref="uploadCopyIcon"
                            :on-success="handleSuccessCopyIcon" :format="['jpg','jpeg','png']" :max-size="2048"
                            :on-format-error="handleFormatErrorCopyIcon" :on-exceeded-size="handleMaxSizeCopyIcon"
                            :with-credentials="true">
                            <Button icon="ios-cloud-upload-outline">上传桌面图标</Button>
                        </Upload>
                    </FormItem>
                    <FormItem label="桌面背景图:">
                        <div class="demo-upload-list" v-for="item in uploadListCopy">
                            <template v-if="item.status === 'finished'">
                                <img :src="item.url">
                                <div class="demo-upload-list-cover">
                                    <Icon type="ios-eye-outline" @click.native="handleViewCopyImg(item.name)"></Icon>
                                    <Icon type="ios-trash-outline" @click.native="handleRemoveCopyImg(item)"></Icon>
                                </div>
                            </template>
                            <template v-else>
                                <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
                            </template>
                        </div>
                        <Upload ref="upload" :show-upload-list="false" :on-success="handleSuccessCopyImg"
                            :format="['jpg','jpeg','png']" :max-size="2048" :on-format-error="handleFormatErrorCopyImg"
                            :on-exceeded-size="handleMaxSizeCopyImg" :before-upload="handleBeforeUploadCopyImg" multiple
                            type="drag" :action="$config.BaseURLfile + '/common/upload/file'"
                            style="display: inline-block;width:58px;" :with-credentials="true">
                            <div style="width: 58px;height:58px;line-height: 58px;">
                                <Icon type="ios-camera" size="20"></Icon>
                            </div>
                        </Upload>
                        <Modal title="查看图片" v-model="visibleCopy">
                            <img :src="showImgUrlCopy" v-if="visibleCopy" style="width: 100%">
                        </Modal>
                    </FormItem>
                    <FormItem label="排序:">
                        <Input v-model="managementCopy.sortId" placeholder="请输入排序..."></Input>
                    </FormItem>
                    <FormItem label="状态:">
                        <Select v-model="managementCopy.status" placeholder="请选择状态...">
                            <Option :value="1">上线</Option>
                            <Option :value="0">下线</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="年级-学期:">
                        <Tree :data="dataTree" multiple @on-check-change="treeChange"></Tree>
                    </FormItem>
                    <FormItem label="描述">
                        <Input v-model="managementCopy.description" type="textarea" :rows="4"
                            placeholder="请输入描述..."></Input>
                    </FormItem>
                </Form>
            </Modal>
        </div>
        <!-- 影视桌面管理 -->
        <div class="layout-template2-movies">
            <!-- 搜索列表 -->
            <Modal v-model="modalMovies" title="影视模板桌面" width="1100">
                <Form :model="moviesSearch" inline>
                    <FormItem label="桌面名称:" :label-width="70">
                        <Input v-model="moviesSearch.title" placeholder="请输入桌面名称..." style="width:200px;"></Input>
                    </FormItem>
                    <FormItem label="状态:" :label-width="50">
                        <Select v-model="moviesSearch.status" style="width:200px" placeholder="请选择状态...">
                            <Option value="">全部</Option>
                            <Option :value="0">下线</Option>
                            <Option :value="1">上线</Option>
                        </Select>
                    </FormItem>
                    <FormItem>
                        <Button type="primary" @click="moviesQuery">搜索</Button>
                    </FormItem>
                    <FormItem>
                        <Button type="success" @click="modalMoviesAdd = true">添加</Button>
                    </FormItem>
                </Form>
                <Table border :columns="columns3" :data="data3"></Table>
                <div class="layout-template2-page">
                    <Page :total="totalMovies" :current="pageMovies" :page-size='pageSizeMovies'
                        @on-change="changePageMovies" show-elevator />
                </div>
                <div style="margin-top:40px;"></div>
            </Modal>
            <!-- 影视桌面添加 -->
            <Modal v-model="modalMoviesAdd" title="添加桌面">
                <div slot="footer">
                    <a @click="addMoviesCancel" class="span">取消</a>
                    <Button @click="addMoviesOk" type="primary">确定</Button>
                </div>
                <Form :model="moviesInfo" label-position="right" :label-width="100">
                    <FormItem label="桌面名称:">
                        <Input v-model="moviesInfo.title" placeholder="请输入桌面名称..."></Input>
                    </FormItem>
                    <FormItem label="桌面类型:">
                        <Select v-model="moviesInfo.typeId" placeholder="请选择桌面类型...">
                            <Option v-for="item in desktopType" :value="item.id" :key="item.id">{{ item.title}}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="桌面图标:">
                        <Upload :action="$config.BaseURLfile + '/common/upload/file'" ref="uploadMoviesInfoIcon"
                            :on-success="handleSuccessMoviesInfoIcon" :format="['jpg','jpeg','png']" :max-size="2048"
                            :on-format-error="handleFormatErrorMoviesInfoIcon"
                            :on-exceeded-size="handleMaxSizeMoviesInfoIcon" :with-credentials="true">
                            <Button icon="ios-cloud-upload-outline">上传桌面图标</Button>
                        </Upload>
                    </FormItem>
                    <FormItem label="桌面背景图:">
                        <Upload :action="$config.BaseURLfile + '/common/upload/file'" ref="uploadMoviesInfoImg"
                            :on-success="handleSuccessMoviesInfoImg" :format="['jpg','jpeg','png']" :max-size="2048"
                            :on-format-error="handleFormatErrorMoviesInfoImg"
                            :on-exceeded-size="handleMaxSizeMoviesInfoImg" :with-credentials="true">
                            <Button icon="ios-cloud-upload-outline">上传桌面背景图</Button>
                        </Upload>
                    </FormItem>
                    <FormItem label="排序:">
                        <Input v-model="moviesInfo.sortId" placeholder="请输入排序..."></Input>
                    </FormItem>
                    <FormItem label="状态:">
                        <Select v-model="moviesInfo.status" disabled>
                            <Option :value="0">下线</Option>
                            <Option :value="1">上线</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="描述:">
                        <Input v-model="moviesInfo.description" type="textarea" :rows="4"
                            placeholder="请输入描述..."></Input>
                    </FormItem>
                </Form>
            </Modal>
            <!-- 影视桌面修改 -->
            <Modal v-model="modalMoviesEdit" title="修改桌面">
                <div slot="footer">
                    <a @click="editMoviesCancel" class="span">取消</a>
                    <Button @click="editMoviesOk" type="primary">确定</Button>
                </div>
                <Form :model="moviesEdit" label-position="right" :label-width="100">
                    <FormItem label="桌面名称:">
                        <Input v-model="moviesEdit.title" placeholder="请输入桌面名称..."></Input>
                    </FormItem>
                    <FormItem label="桌面类型:">
                        <Input v-model="moviesEdit.typeTitle" placeholder="请输入桌面类型..." disabled></Input>
                    </FormItem>
                    <FormItem label="桌面图标:">
                        <Upload :action="$config.BaseURLfile + '/common/upload/file'" ref="uploadMoviesEditIcon"
                            :on-success="handleSuccessMoviesEditIcon" :format="['jpg','jpeg','png']" :max-size="2048"
                            :on-format-error="handleFormatErrorMoviesEditIcon"
                            :on-exceeded-size="handleMaxSizeMoviesEditIcon" :with-credentials="true">
                            <Button icon="ios-cloud-upload-outline">上传桌面图标</Button>
                        </Upload>
                    </FormItem>
                    <FormItem label="桌面背景图:">
                        <!-- <Upload :action="$config.BaseURLfile + '/common/upload/file'" ref="uploadMoviesEditImg"
                            :on-success="handleSuccessMoviesEditImg" :format="['jpg','jpeg','png']" :max-size="2048"
                            :on-format-error="handleFormatErrorMoviesEditImg"
                            :on-exceeded-size="handleMaxSizeMoviesEditImg" :with-credentials="true">
                            <Button icon="ios-cloud-upload-outline">上传桌面背景图</Button>
                        </Upload> -->

                        <div class="demo-upload-list" v-for="item in uploadListMovies">
                            <template v-if="item.status === 'finished'">
                                <img :src="item.url">
                                <div class="demo-upload-list-cover">
                                    <Icon type="ios-eye-outline" @click.native="handleViewMoviesEditImg(item.name)">
                                    </Icon>
                                    <Icon type="ios-trash-outline" @click.native="handleRemoveMoviesEditImg(item)">
                                    </Icon>
                                </div>
                            </template>
                            <template v-else>
                                <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
                            </template>
                        </div>
                        <Upload ref="upload" :show-upload-list="false" :on-success="handleSuccessMoviesEditImg"
                            :format="['jpg','jpeg','png']" :max-size="2048" :on-format-error="handleFormatMoviesEditImg"
                            :on-exceeded-size="handleMaxSizeMoviesEditImg"
                            :before-upload="handleBeforeUploadMoviesEditImg" multiple type="drag"
                            :action="$config.BaseURLfile + '/common/upload/file'"
                            style="display: inline-block;width:58px;" :with-credentials="true">
                            <div style="width: 58px;height:58px;line-height: 58px;">
                                <Icon type="ios-camera" size="20"></Icon>
                            </div>
                        </Upload>
                        <Modal title="查看图片" v-model="moviesVisible">
                            <img :src="showMoviesImgUrl" v-if="moviesVisible" style="width: 100%">
                        </Modal>
                    </FormItem>
                    <FormItem label="排序:">
                        <Input v-model="moviesEdit.sortId" placeholder="请输入排序..."></Input>
                    </FormItem>
                    <FormItem label="状态:">
                        <Select v-model="moviesEdit.status">
                            <Option :value="0">下线</Option>
                            <Option :value="1">上线</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="描述:">
                        <Input v-model="moviesEdit.description" type="textarea" :rows="4"
                            placeholder="请输入描述..."></Input>
                    </FormItem>
                </Form>
            </Modal>
        </div>
    </div>
</template>
<script>
    var moment = require("moment");
    import Qs from 'qs'
    export default {
        data() {
            return {
                search: {
                    title: ''
                },//搜索
                //添加
                info: {},
                modalAdd: false,
                cityList: [],
                //修改
                id: '',
                edit: {},
                modalEdit: false,
                //分页
                pageSize: 30,
                page: 1,
                total: 0,
                columns1: [
                    {
                        title: '序号',
                        type: 'index',
                        width: 70,
                        align: 'center'
                    },
                    {
                        title: '模板ID',
                        key: 'id',
                        align: 'center'
                    },
                    {
                        title: '模版名称',
                        key: 'title',
                        align: 'center'
                    },
                    {
                        title: '模板类型',
                        key: 'is_type',
                        align: 'center'
                    },
                    {
                        title: '创建时间',
                        key: 'addTime',
                        align: 'center'
                    },
                    {
                        title: '操作',
                        width: 260,
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
                                                this.remove(params.index);
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
                                h(
                                    'Button',
                                    {
                                        props: {
                                            type: 'warning',
                                            size: 'small'
                                        },
                                        style: {
                                            marginRight: '5px'
                                        },
                                        on: {
                                            click: () => {
                                                // 1 影视、2 应用
                                                // this.versionModify(params.row)
                                                if (params.row.type == 1) {
                                                    this.movies(params.row)
                                                } else if (params.row.type == 2) {
                                                    this.management(params.row)
                                                }
                                            }
                                        }
                                    },
                                    (function () {

                                        console.log(params.row)
                                        if (params.row.type == 1) {
                                            return '影视桌面管理'
                                        } else if (params.row.type == 2) {
                                            return '应用桌面管理'
                                        }
                                    })()
                                )
                            ]);
                        }
                    }
                ],
                data1: [],
                columns2: [
                    {
                        title: '序号',
                        type: 'index',
                        width: 70,
                        align: 'center'
                    },
                    {
                        title: '桌面名称',
                        key: 'title',
                        align: 'center'
                    },
                    {
                        title: '桌面图标',
                        key: 'iconUrl',
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('img', {
                                    attrs: {
                                        src: params.row.iconUrl
                                    },
                                    style: {
                                        width: '50px',
                                        height: '50px',
                                        marginTop: '5px'
                                    }
                                })
                            ])
                        }
                    },
                    {
                        title: '桌面背景图',
                        key: 'bgUrl',
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('img', {
                                    attrs: {
                                        src: params.row.bgUrl
                                    },
                                    style: {
                                        width: '50px',
                                        height: '50px',
                                        marginTop: '5px'
                                    }
                                })
                            ])
                        }
                    },
                    {
                        title: '排序',
                        key: 'sortId',
                        align: 'center'
                    },
                    {
                        title: '年级-学期',
                        key: 'gradeDesc',
                        align: 'center'
                    },
                    {
                        title: '状态',
                        key: 'is_status',
                        align: 'center'
                    },
                    {
                        title: '创建时间',
                        key: 'addTime',
                        align: 'center'
                    },
                    {
                        title: '操作',
                        width: 220,
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
                                            this.managModify(params.row)
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
                                                this.managRemove(params.row);
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
                                    on: {
                                        click: () => {
                                            this.copy(params.row)
                                        }
                                    }
                                }, '复制'),

                            ]);
                        }
                    }
                ],
                data2: [
                    {
                        id: 1
                    }
                ],
                ruleValidate: {
                    name: [
                        { required: true, message: 'The name cannot be empty', trigger: 'blur' }
                    ]
                },
                modalManagement: false,
                managSearch: {
                    title: '',
                    status: '',
                    grade: '',
                    semester: '',

                },//桌面搜索
                templateId: '',//所属的模板ID
                pageSizeManagement: 30,
                pageManagement: 1,
                totalManagement: 0,

                managementInfo: {},
                modalManagementAdd: false,
                addUploadIcon: '',
                addUploadImg: '',//桌面添加

                id: '',
                modalManagementEdit: false,
                managementEdit: {},
                editUploadIcon: '',
                editUploadImg: '',//桌面修改
                uploadList: [],//修改上传桌面背景图
                visible: false,

                uploadListCopy: [],//修改上传桌面背景图
                visibleCopy: false,
                copyUploadIcon: '',
                managementCopy: {},
                modalManagementCopy: false,//桌面复制

                dataTree: [],//tree
                semesterList: [],//学期
                gradeList: [],//年级

                desktopType: {},//添加修改桌面类型


                modalMovies: false,//影视桌面
                moviesSearch: {
                    title: '',
                    status: ''
                },//影视搜索

                columns3: [
                    {
                        title: '序号',
                        type: 'index',
                        width: 70,
                        align: 'center'
                    },
                    {
                        title: '桌面名称',
                        key: 'title',
                        align: 'center'
                    },
                    {
                        title: '桌面图标',
                        key: 'iconUrl',
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('img', {
                                    attrs: {
                                        src: params.row.iconUrl
                                    },
                                    style: {
                                        width: '50px',
                                        height: '50px',
                                        marginTop: '5px'
                                    }
                                })
                            ])
                        }
                    },
                    {
                        title: '桌面背景图',
                        key: 'bgUrl',
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('img', {
                                    attrs: {
                                        src: params.row.bgUrl
                                    },
                                    style: {
                                        width: '50px',
                                        height: '50px',
                                        marginTop: '5px'
                                    }
                                })
                            ])
                        }
                    },
                    {
                        title: '排序',
                        key: 'sortId',
                        align: 'center'
                    },
                    {
                        title: '状态',
                        key: 'is_status',
                        align: 'center'
                    },
                    {
                        title: '创建时间',
                        key: 'addTime',
                        align: 'center',
                        width: 160
                    },
                    {
                        title: '操作',
                        width: 160,
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
                                            this.moviesModify(params.row)
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
                                                this.moviesRemove(params.row);
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
                data3: [
                    {
                        id: 1
                    }
                ],

                pageSizeMovies: 30,
                pageMovies: 1,
                totalMovies: 0,//影视分页

                moviesInfo: {
                    status: 0
                },
                modalMoviesAdd: false,//影视添加
                addUploadMoviesIcon: '',//icon
                addUploadMoviesImg: '',//img

                moviesEdit: {},
                modalMoviesEdit: false,//影视修改
                editUploadMoviesIcon: '',//icon
                editUploadMoviesImg: '',//img
                moviesId: '',//id
                moviesVisible: false,
                uploadListMovies: [],
            }
        },
        methods: {
            //表格
            getTableList() {
                let self = this;
                self.$http(this.$config.BaseURL + '/staticpromotion/template/list?pageSize=' + self.pageSize + '&page=' + self.page + '&title=' + this.search.title).then(response => {
                    if (response.data.errno == 10000) {
                        self.data1 = response.data.data.list;
                        response.data.data.list.forEach(val => {
                            val.addTime = moment(val.addTime * 1000).format(
                                "YYYY-MM-DD HH:mm:ss"
                            );
                            // 类型：1 影视、2 应用
                            if (val.type == 1) {
                                val.is_type = "影视"
                            } else if (val.type == 2) {
                                val.is_type = "应用"
                            }
                        });
                        //分页
                        self.total = response.data.data.total
                    }
                })
            },
            // 搜索
            query() {
                this.page = 1;
                this.getTableList();
            },
            // 来源
            getSelectList() {
                let self = this;
                self.$http(this.$config.BaseURL + '/staticpromotion/cp/list').then(response => {
                    console.log(response)
                    if (response.data.errno == 10000) {
                        self.cityList = response.data.data;
                    }
                })
            },
            treeChange(val) {
                console.log(1111)
            },
            //Tree
            getTreeList() {
                this.$http.get(this.$config.BaseURL + '/staticpromotion/grade/tree').then(response => {
                    console.log(response)
                    if (response.data.errno == 10000) {
                        this.dataTree = response.data.data.list;
                    }
                })
            },
            // 年级
            getgradeList() {
                this.$http.get(this.$config.BaseURL + '/staticpromotion/grade/list').then(response => {
                    console.log(response)
                    if (response.data.errno == 10000) {
                        this.gradeList = response.data.data.list;
                    }
                })
            },
            // 学期
            getsemesterList() {
                this.$http.get(this.$config.BaseURL + '/staticpromotion/semester/list').then(response => {
                    if (response.data.errno == 10000) {
                        this.semesterList = response.data.data.list;
                    }
                })
            },
            //添加
            addOk() {
                let self = this;
                this.info.type *= 1;
                self.$http.post(this.$config.BaseURL + '/staticpromotion/template/save', self.info).then(response => {
                    console.log(response)
                    if (response.data.errno == 10000) {
                        self.info = {};
                        self.modalAdd = false;
                        self.getTableList();
                        self.$Message.success("添加成功！")
                    }
                })
            },
            addCancel() {
                this.info = {};
                this.modalAdd = false;
            },
            //修改
            modify(row) {
                console.log(row);
                this.edit = row;
                this.id = row.id;
                this.getSelectList();
                this.modalEdit = true;
            },
            //修改确定按钮
            editOk() {
                let self = this;
                self.$http.post(this.$config.BaseURL + '/staticpromotion/template/save?id=' + this.id, self.edit).then(response => {
                    if (response.data.errno == 10000) {
                        this.modalEdit = false;
                        this.getTableList();
                        this.$Message.success('修改成功！')
                    }
                })
            },
            modalEditBtn() {
                this.modalEdit = false;
                this.getTableList();
            },
            // 删除
            remove(index) {
                let self = this;
                self.$http(this.$config.BaseURL + '/staticpromotion/template/delete?id=' + this.data1[index].id).then(response => {
                    if (response.data.errno == 10000) {
                        this.$Message.success("删除成功");
                        this.getTableList()
                    }
                })
            },
            //分页
            changePage(page) {
                this.page = page;
                this.getTableList()
            },
            // 应用桌面管理
            management(row) {
                console.log(row)
                this.templateId = row.id;
                this.getgradeList();//年级
                this.getsemesterList();//学期
                this.getTreeList();//年级数
                this.getManagementTableList();
                this.getDesktopType();//添加修改桌面类型
                this.modalManagement = true;
            },
            // 应用桌面管理列表
            getManagementTableList() {
                if (this.managSearch.status == undefined) {
                    this.managSearch.status = '';
                }
                if (this.managSearch.semester == undefined) {
                    this.managSearch.semester = '';
                }
                if (this.managSearch.grade == undefined) {
                    this.managSearch.grade = '';
                }
                this.$http.get(this.$config.BaseURL + '/staticpromotion/desktop/list?templateId=' + this.templateId + '&title=' + this.managSearch.title + '&status=' + this.managSearch.status + '&grade=' + this.managSearch.grade + '&semester=' + this.managSearch.semester).then(response => {
                    console.log(response)
                    if (response.data.errno == 10000) {
                        this.data2 = response.data.data;

                        response.data.data.forEach(val => {
                            if (val.status == 1) {
                                val.is_status = "上线"
                            } else if (val.status == 0) {
                                val.is_status = "下线"
                            }
                        });
                    }
                })
            },
            // 应用桌面搜索
            manageQuery() {
                this.pageManagement = 1;
                this.getManagementTableList();
            },
            // 应用桌面分页
            changePageManagement(page) {
                this.pageManagement = page;
                this.getManagementTableList();
            },
            // 桌面管理添加icon
            handleSuccessInfoIcon(res, file) {
                console.log(res)
                this.addUploadIcon = res.data.url
                console.log(this.addUploadIcon)
            },
            // 上传格式验证
            handleFormatErrorInfoIcon(file) {
                this.$Notice.warning({
                    title: '文件格式不正确',
                    desc: '文件格式' + '文件名' + '不正确，请选择JPG或PNG'
                })
            },
            // 上传文件大小验证
            handleMaxSizeInfoIcon(file) {
                this.$Notice.warning({
                    title: '超过文件大小限制',
                    desc: '文件  ' + '文件名' + ' 太大，不超过2M.'
                })
            },
            // 桌面管理添加背景图
            handleSuccessInfoImg(res, file) {
                this.addUploadImg = res.data.url;
                console.log(this.addUploadImg)
            },
            handleFormatErrorInfoImg(file) {
                this.$Notice.warning({
                    title: '文件格式不正确',
                    desc: '文件格式' + '文件名' + '不正确，请选择JPG或PNG'
                })
            },
            handleMaxSizeInfoImg(file) {
                this.$Notice.warning({
                    title: '超过文件大小限制',
                    desc: '文件  ' + '文件名' + ' 太大，不超过2M.'
                })
            },
            // 桌面管理修改icon
            handleSuccessEditIcon(res, file) {
                console.log(res)
                this.editUploadIcon = res.data.url
                console.log(this.editUploadIcon)
            },
            // 上传格式验证
            handleFormatErrorEditIcon(file) {
                this.$Notice.warning({
                    title: '文件格式不正确',
                    desc: '文件格式' + '文件名' + '不正确，请选择JPG或PNG'
                })
            },
            // 上传文件大小验证
            handleMaxSizeEditIcon(file) {
                this.$Notice.warning({
                    title: '超过文件大小限制',
                    desc: '文件  ' + '文件名' + ' 太大，不超过2M.'
                })
            },
            // 桌面管理修改背景图片
            // 显示图片
            handleViewEditImg(name) {
                this.imgName = name
                this.visible = true
                this.uploadList.forEach(val => {
                    if (val.name == name) {
                        this.showImgUrl = val.url
                    }
                })
            },
            // 删除
            handleRemoveEditImg(file) {
                console.log(file)
                this.uploadList = this.uploadList.filter(item => {
                    if (item.name != file.name) {
                        return true
                    }
                })
            },
            handleSuccessEditImg(res, file) {
                console.log(res)
                file.url = res.data.url
                file.name = file.name
                this.managementEdit.bgUrl = res.data.url
                this.uploadList = [file]
            },
            // 上传格式验证
            handleFormatErrorEditImg(file) {
                this.$Notice.warning({
                    title: '文件格式不正确',
                    desc: '文件格式' + '文件名' + '不正确，请选择JPG或PNG'
                })
            },
            // 上传文件大小验证
            handleMaxSizeEditImg(file) {
                this.$Notice.warning({
                    title: '超过文件大小限制',
                    desc: '文件  ' + '文件名' + ' 太大，不超过2M.'
                })
            },
            //限制张数
            handleBeforeUploadEditImg() {
                const check = this.uploadList.length < 5
                if (!check) {
                    this.$Notice.warning({
                        title: '最多可上传5张图片！'
                    })
                }
                return check
            },
            // 应用桌面添加确定按钮
            addManagementOk() {
                this.managementInfo.iconUrl = this.addUploadIcon;
                this.managementInfo.bgUrl = this.addUploadImg;
                this.managementInfo.templateId = this.templateId;
                this.$http.post(this.$config.BaseURL + '/staticpromotion/desktop/save', this.managementInfo).then(response => {
                    if (response.data.errno == 10000) {
                        this.managementInfo = {};
                        this.modalManagementAdd = false;
                        this.getManagementTableList();
                        this.$Message.success('添加成功！');
                    }
                })
            },
            //应用桌面添加取消按钮
            addManagementCancel() {
                this.managementInfo = {};
                this.modalManagementAdd = false;
            },
            // 应用桌面修改弹框
            managModify(row) {
                this.editUploadIcon = ''
                this.editUploadImg = ''
                row = JSON.parse(JSON.stringify(row));
                this.id = row.id;
                this.managementEdit = row;
                this.modalManagementEdit = true;
            },
            // 应用桌面修改确定按钮
            editManagementOk() {
                // icon
                if (this.editUploadIcon != '') {
                    this.managementEdit.iconUrl = this.editUploadIcon;
                }
                this.$http.post(this.$config.BaseURL + '/staticpromotion/desktop/save?id=' + this.id, this.managementEdit).then(response => {
                    if (response.data.errno == 10000) {
                        this.modalManagementEdit = false;
                        this.getManagementTableList();
                        this.$Message.success('修改成功！')
                    }
                })
            },
            // 应用桌面修改取消按钮
            editManagementCancel() {
                this.modalManagementEdit = false;
                this.getManagementTableList();
            },
            // 应用桌面删除
            managRemove(row) {
                console.log(row)
                this.$http.get(this.$config.BaseURL + '/staticpromotion/desktop/delete?id=' + row.id).then(response => {
                    if (response.data.errno == 10000) {
                        this.getManagementTableList();
                        this.$Message.success("删除成功！");
                    }
                })
            },
            // 桌面管理复制icon
            handleSuccessCopyIcon(res, file) {
                console.log(res)
                this.copyUploadIcon = res.data.url
                console.log(this.copyUploadIcon)
            },
            // 上传格式验证
            handleFormatErrorCopyIcon(file) {
                this.$Notice.warning({
                    title: '文件格式不正确',
                    desc: '文件格式' + '文件名' + '不正确，请选择JPG或PNG'
                })
            },
            // 上传文件大小验证
            handleMaxSizeCopyIcon(file) {
                this.$Notice.warning({
                    title: '超过文件大小限制',
                    desc: '文件  ' + '文件名' + ' 太大，不超过2M.'
                })
            },
            // copy桌面管理修改背景图片
            // 显示图片
            handleViewCopyImg(name) {
                this.imgName = name
                this.visibleCopy = true
                this.uploadListCopy.forEach(val => {
                    if (val.name == name) {
                        this.showImgUrlCopy = val.url
                    }
                })
            },
            // 删除
            handleRemoveCopyImg(file) {
                console.log(file)
                this.uploadListCopy = this.uploadListCopy.filter(item => {
                    if (item.name != file.name) {
                        return true
                    }
                })
            },
            handleSuccessCopyImg(res, file) {
                console.log(res)
                file.url = res.data.url
                file.name = file.name
                this.managementCopy.bgUrl = res.data.url
                this.uploadListCopy = [file]
            },
            // 上传格式验证
            handleFormatErrorCopyImg(file) {
                this.$Notice.warning({
                    title: '文件格式不正确',
                    desc: '文件格式' + '文件名' + '不正确，请选择JPG或PNG'
                })
            },
            // 上传文件大小验证
            handleMaxSizeCopyImg(file) {
                this.$Notice.warning({
                    title: '超过文件大小限制',
                    desc: '文件  ' + '文件名' + ' 太大，不超过2M.'
                })
            },
            //限制张数
            handleBeforeUploadCopyImg() {
                const check = this.uploadListCopy.length < 5
                if (!check) {
                    this.$Notice.warning({
                        title: '最多可上传5张图片！'
                    })
                }
                return check
            },
            // 桌面复制
            copy(row) {
                this.managementCopy = row;
                //tree
                this.getSelectList();
                this.modalManagementCopy = true;
            },
            // 应用桌面复制确定按钮
            copyManagementOk() {
                // icon
                if (this.copyUploadIcon != '') {
                    this.managementCopy.iconUrl = this.copyUploadIcon;
                }
                this.$http.post(this.$config.BaseURL + '/staticpromotion/desktop/copy', this.managementCopy).then(response => {
                    if (response.data.errno == 10000) {
                        this.modalManagementCopy = false;
                        this.getManagementTableList();
                        this.$Message.success("桌面复制成功！");
                    }
                })
            },
            // 复制取消按钮
            copyManagementCancel() {
                this.modalManagementCopy = false;
                this.getManagementTableList();
            },
            // 影视桌面管理
            movies(row) {
                this.templateId = row.id;
                this.getMoviesTableList();
                this.getDesktopType();//添加修改桌面类型
                this.modalMovies = true;
            },
            // 桌面管理添加icon
            handleSuccessMoviesInfoIcon(res, file) {
                console.log(res)
                this.addUploadMoviesIcon = res.data.url
                console.log(this.addUploadMoviesIcon)
            },
            // 上传格式验证
            handleFormatErrorMoviesInfoIcon(file) {
                this.$Notice.warning({
                    title: '文件格式不正确',
                    desc: '文件格式' + '文件名' + '不正确，请选择JPG或PNG'
                })
            },
            // 上传文件大小验证
            handleMaxSizeMoviesInfoIcon(file) {
                this.$Notice.warning({
                    title: '超过文件大小限制',
                    desc: '文件  ' + '文件名' + ' 太大，不超过2M.'
                })
            },
            // 桌面管理添加img
            handleSuccessMoviesInfoImg(res, file) {
                console.log(res)
                this.addUploadMoviesImg = res.data.url
                console.log(this.addUploadMoviesImg)
            },
            // 上传格式验证
            handleFormatErrorMoviesInfoImg(file) {
                this.$Notice.warning({
                    title: '文件格式不正确',
                    desc: '文件格式' + '文件名' + '不正确，请选择JPG或PNG'
                })
            },
            // 上传文件大小验证
            handleMaxSizeMoviesInfoImg(file) {
                this.$Notice.warning({
                    title: '超过文件大小限制',
                    desc: '文件  ' + '文件名' + ' 太大，不超过2M.'
                })
            },
            // 影视管理修改icon
            handleSuccessMoviesEditIcon(res, file) {
                console.log(res)
                this.editUploadMoviesIcon = res.data.url
                console.log(this.editUploadMoviesIcon)
            },
            // 上传格式验证
            handleFormatErrorMoviesEditIcon(file) {
                this.$Notice.warning({
                    title: '文件格式不正确',
                    desc: '文件格式' + '文件名' + '不正确，请选择JPG或PNG'
                })
            },
            // 上传文件大小验证
            handleMaxSizeMoviesEditIcon(file) {
                this.$Notice.warning({
                    title: '超过文件大小限制',
                    desc: '文件  ' + '文件名' + ' 太大，不超过2M.'
                })
            },

            //影视桌面修改背景图
            handleViewMoviesEditImg(name) {
                this.imgName = name
                this.moviesVisible = true
                this.uploadListMovies.forEach(val => {
                    if (val.name == name) {
                        this.showMoviesImgUrl = val.url
                    }
                })
            },
            // 删除
            handleRemoveMoviesEditImg(file) {
                console.log(file)
                this.uploadListMovies = this.uploadListMovies.filter(item => {
                    if (item.name != file.name) {
                        return true
                    }
                })
            },
            handleSuccessMoviesEditImg(res, file) {
                console.log(res)
                file.url = res.data.url
                file.name = file.name
                this.moviesEdit.bgUrl = res.data.url
                this.uploadListMovies = [file]
            },
            // 上传格式验证
            handleFormatMoviesEditImg(file) {
                this.$Notice.warning({
                    title: '文件格式不正确',
                    desc: '文件格式' + '文件名' + '不正确，请选择JPG或PNG'
                })
            },
            // 上传文件大小验证
            handleMaxSizeMoviesEditImg(file) {
                this.$Notice.warning({
                    title: '超过文件大小限制',
                    desc: '文件  ' + '文件名' + ' 太大，不超过2M.'
                })
            },
            //限制张数
            handleBeforeUploadMoviesEditImg() {
                const check = this.uploadListMovies.length < 5
                if (!check) {
                    this.$Notice.warning({
                        title: '最多可上传5张图片！'
                    })
                }
                return check
            },
            // 应用桌面添加修改类型
            getDesktopType() {
                this.$http.get(this.$config.BaseURL + '/staticpromotion/desktop/typelist').then(response => {
                    console.log(response)
                    if (response.data.errno == 10000) {
                        this.desktopType = response.data.data.list;
                    }
                })
            },
            //影视桌面列表
            getMoviesTableList() {
                if (this.moviesSearch.status == undefined) {
                    this.moviesSearch.status = ''
                }
                this.$http.get(this.$config.BaseURL + '/staticpromotion/desktop/list?title=' + this.moviesSearch.title + '&status=' + this.moviesSearch.status + '&page=' + this.pageMovies + '&pageSize=' + this.pageSizeMovies + '&templateId=' + this.templateId).then(response => {
                    console.log(response)
                    if (response.data.errno == 10000) {
                        this.data3 = response.data.data;
                        response.data.data.forEach(val => {
                            if (val.status == 1) {
                                val.is_status = "上线"
                            } else if (val.status == 0) {
                                val.is_status = "下线"
                            }
                        });
                        this.totalMovies = response.data.data.total;
                    }
                })
            },
            // 影视桌面搜索
            moviesQuery() {
                this.pageMovies = 1;
                this.getMoviesTableList();
            },
            // 影视桌面分页
            changePageMovies(page) {
                this.pageMovies = page;
                this.getMoviesTableList();
            },
            // 影视桌面添加确定按钮
            addMoviesOk() {
                this.moviesInfo.iconUrl = this.addUploadMoviesIcon;
                this.moviesInfo.bgUrl = this.addUploadMoviesImg;
                this.moviesInfo.templateId = this.templateId;
                this.$http.post(this.$config.BaseURL + '/staticpromotion/desktop/save', this.moviesInfo).then(response => {
                    if (response.data.errno == 10000) {
                        this.moviesInfo = {};
                        this.modalMoviesAdd = false;
                        this.getMoviesTableList();
                        this.$Message.success("添加成功！");
                    }
                })
            },
            // 影视桌面添加取消按钮
            addMoviesCancel() {
                this.moviesInfo = {};
                this.modalMoviesAdd = false;
            },
            //影视桌面修改
            moviesModify(row) {
                this.editUploadMoviesIcon = '';
                this.editUploadMoviesImg = ''
                row = JSON.parse(JSON.stringify(row))
                this.moviesEdit = row;
                this.moviesId = row.id;
                this.modalMoviesEdit = true;
            },
            //影视修改确定
            editMoviesOk() {
                if (this.editUploadMoviesIcon != '') {
                    this.moviesEdit.iconUrl = this.editUploadMoviesIcon
                }
                this.moviesEdit.sortId *= 1;
                this.$http.post(this.$config.BaseURL + '/staticpromotion/desktop/save?id=' + this.moviesId, this.moviesEdit).then(response => {
                    if (response.data.errno == 10000) {
                        this.modalMoviesEdit = false;
                        this.getMoviesTableList();
                        this.$Message.success("修改成功！");
                    }
                })
            },
            //影视修改取消
            editMoviesCancel() {
                this.modalMoviesEdit = false;
                this.getMoviesTableList();
            },
            // 影视删除
            moviesRemove(row) {
                console.log(row)
                this.$http.get(this.$config.BaseURL + '/staticpromotion/desktop/delete?id=' + row.id).then(response => {
                    if (response.data.errno == 10000) {
                        this.getMoviesTableList();
                        this.$Message.success("删除成功！");
                    }
                })
            }
        },
        mounted() {
            this.getTableList();
            this.getSelectList();
        }
    }
</script>