<style>
    .layout-custompromotion2-search {
        float: left;
    }

    .layout-custompromotion2-add {
        float: right;
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

    .layout-custompromotion2 .ivu-poptip-confirm .ivu-poptip-body .ivu-icon {
        font-size: 16px;
        color: #ff9900;
        line-height: 18px;
        position: absolute;
        margin-left: -50px;
    }

    .layout-custompromotion2-page {
        float: right;
        margin-top: 10px;
    }
</style>
<template>
    <div class="layout-custompromotion2">
        <!-- 模版搜索 -->
        <div class="layout-custompromotion2-search">
            <Form :model="search" inline>
                <FormItem label="拓展模板名称:" :label-width="90">
                    <Input v-model="search.title" placeholder="请输入拓展模板名称..." style="width:200px;"></Input>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="query">搜索</Button>
                </FormItem>
            </Form>
        </div>
        <!-- 模版添加 -->
        <div class="layout-custompromotion2-add">
            <Button type="success" @click="modalAdd = true">添加</Button>
            <Modal v-model="modalAdd" title="添加拓展模板">
                <div slot="footer">
                    <a @click="addCancel" class="span">取消</a>
                    <Button @click="addOk" type="primary">确定</Button>
                </div>
                <Form :model="info" label-position="right" :label-width="100" ref="info" :rules="ruleValidate">
                    <FormItem label="拓展模版名称:" prop="title">
                        <Input v-model="info.title" placeholder="请输入拓展模版名称..."></Input>
                    </FormItem>
                    <FormItem label="基础模版:" prop="staticTemplateId">
                        <Select v-model="info.staticTemplateId">
                            <Option v-for="item in cityList" :value="item.id" :key="item.id">{{ item.title }}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="描述:">
                        <Input v-model="info.description" type="textarea" :rows="4" placeholder="请输入描述..."></Input>
                    </FormItem>
                </Form>
            </Modal>
        </div>
        <div style="clear: both;"></div>
        <div class="layout-custompromotion2-table">
            <Table border :columns="columns1" :data="data1"></Table>
        </div>
        <!-- 模版修改 -->
        <div class="layout-custompromotion2-edit">
            <Modal v-model="modalEdit" title="修改">
                <div slot="footer">
                    <a @click="modalEditBtn" class="span">取消</a>
                    <Button @click="editOk" type="primary">确定</Button>
                </div>
                <Form :model="edit" label-position="right" :label-width="110">
                    <FormItem label="拓展模版名称:">
                        <Input v-model="edit.title" placeholder="请输入拓展模版名称..."></Input>
                    </FormItem>
                    <FormItem label="基础模板:">
                        <Input v-model="edit.staticTemplateTitle" placeholder="请输入基础模板..." disabled></Input>
                    </FormItem>
                    <FormItem label="模板类型:">
                        <Input v-model="edit.is_type" placeholder="请输入模板类型..." disabled></Input>
                    </FormItem>
                    <FormItem label="描述:">
                        <Input v-model="edit.description" type="textarea" :rows="4" placeholder="请输入描述..."></Input>
                    </FormItem>
                </Form>
            </Modal>
        </div>
        <!-- 模版分页 -->
        <div class="layout-custompromotion2-page">
            <Page :total="total" :current="page" :page-size="pageSize" @on-change="changePage" show-elevator />
        </div>
        <!-- 应用桌面管理 -->
        <div class="layout-custompromotion2-management">
            <Modal v-model="modalManagement" title="应用桌面管理" width="1100">
                <!-- 搜索 -->
                <div>
                    <Form :model="managSearch" inline>
                        <FormItem label="桌面名称:" :label-width="70">
                            <Input v-model="managSearch.title" placeholder="请输入桌面名称..." style="width:190px;"></Input>
                        </FormItem>
                        <!-- 桌面类型，1 基础、2 扩展 -->
                        <FormItem label="桌面类型:" :label-width="70">
                            <Select v-model="managSearch.type" placeholder="请选择桌面类型..." style="width:190px;">
                                <Option :value="1">基础</Option>
                                <Option :value="2">扩展</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="发布状态:" :label-width="70">
                            <Select v-model="managSearch.isRelease" placeholder="请选择发布状态..." style="width:190px;">
                                <Option :value="1">基础</Option>
                                <Option :value="2">扩展</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="年级:" :label-width="50">
                            <Select v-model="managSearch.grade" style="width:190px;" placeholder="请选择年级...">
                                <Option v-for="item in gradeList" :value="item.id" :key="item.id">
                                    {{ item.name }}
                                </Option>
                            </Select>
                        </FormItem>
                        <FormItem label="学期:" :label-width="45">
                            <Select v-model="managSearch.semester" style="width:190px;" placeholder="请选择年级...">
                                <Option v-for="item in semesterList" :value="item.id" :key="item.id">
                                    {{ item.name }}
                                </Option>
                            </Select>
                        </FormItem>
                        <FormItem>
                            <Button type="primary" @click="managQuery">搜索</Button>
                        </FormItem>
                        <FormItem>
                            <Button type="success" @click="modalManagementAdd = true">添加</Button>
                        </FormItem>
                    </Form>
                </div>
                <div>
                    <Table border :columns="columns2" :data="data2"></Table>
                </div>
                <!-- <div class="layout-custompromotion2-page">
                            <Page :total="totalManagement" :current="pageManagement" :page-size='pageSizeManagement'
                                @on-change="changePageManagement" show-elevator />
                        </div> -->
                <!-- <div style="margin-top:40px;"></div> -->
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
                        <Input v-model="managementInfo.type" disabled></Input>
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
                    <FormItem label="发布状态:">
                        <Select v-model="managementInfo.isRelease" disabled>
                            <Option :value="0">未发布
                            </Option>
                            <Option :value="1">发布
                            </Option>
                        </Select>
                    </FormItem>
                    <FormItem label="描述:">
                        <Input v-model="managementInfo.description" type="textarea" :rows="4"
                            placeholder="请输入描述..."></Input>
                    </FormItem>
                </Form>
            </Modal>
            <!-- 应用桌面修改 -->
            <Modal v-model="modalManagementEdit" title="添加桌面">
                <div slot="footer">
                    <a @click="editManagementCancel" class="span">取消</a>
                    <Button @click="editManagementOk" type="primary">确定</Button>
                </div>
                <Form :model="managementEdit" label-position="right" :label-width="100">
                    <FormItem label="桌面名称:">
                        <Input v-model="managementEdit.title" placeholder="请输入桌面名称..."></Input>
                    </FormItem>
                    <FormItem label="桌面类型:">
                        <Input v-model="managementEdit.type" disabled></Input>
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
                        <Input v-model="managementEdit.sortId" placeholder="请输入排序..."></Input>
                    </FormItem>
                    <FormItem label="发布状态:">
                        <Select v-model="managementEdit.isRelease" disabled>
                            <Option :value="0">未发布
                            </Option>
                            <Option :value="1">发布
                            </Option>
                        </Select>
                    </FormItem>
                    <FormItem label="描述:">
                        <Input v-model="managementEdit.description" type="textarea" :rows="4"
                            placeholder="请输入描述..."></Input>
                    </FormItem>
                </Form>
            </Modal>
        </div>
        <!-- 影视桌面管理 -->
        <div class="layout-custompromotion2-movie">
            <Modal v-model="modalMovies" title="影视桌面管理" width="1100">
                <!-- 影视桌面管理搜索 -->
                <div>
                    <Form :model="moviesSearch" inline>
                        <FormItem label="桌面名称:" :label-width="70">
                            <Input v-model="moviesSearch.title" placeholder="请输入桌面名称..."></Input>
                        </FormItem>
                        <FormItem label="桌面类型:" :label-width="70">
                            <!-- 桌面类型，1 基础、2 扩展 -->
                            <Select v-model="moviesSearch.type" style="width:200px" placeholder="请输入桌面类型...">
                                <Option value="">全部</Option>
                                <Option :value="1">基础</Option>
                                <Option :value="2">扩展</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="发布状态:" :label-width="70">
                            <!-- 发布状态，0 未发布、1 发布 -->
                            <Select v-model="moviesSearch.isRelease" style="width:200px" placeholder="请输入发布状态...">
                                <Option value="">全部</Option>
                                <Option :value="0">未发布</Option>
                                <Option :value="1">发布</Option>
                            </Select>
                        </FormItem>
                        <FormItem>
                            <Button type="primary" @click="moviesQuery">搜索</Button>
                        </FormItem>
                        <FormItem>
                            <Button type="success" @click="modalMoviesAdd = true">添加</Button>
                        </FormItem>
                    </Form>
                </div>
                <div>
                    <Table border :columns="columns3" :data="data3"></Table>
                </div>
            </Modal>
            <!-- 影视桌面添加 -->
            <Modal v-model="modalMoviesAdd" title="影视桌面添加">
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
                    <FormItem label="发布状态:">
                        <Select v-model="moviesInfo.isRelease" disabled>
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
            <Modal v-model="modalMoviesEdit" title="影视桌面修改">
                <Form :model="moviesEdit" label-position="right" :label-width="100">
                    <FormItem label="桌面名称:">
                        <Input v-model="moviesEdit.title" placeholder="请输入桌面名称..."></Input>
                    </FormItem>
                    <FormItem label="桌面类型">
                        <Input v-model="moviesEdit.type" disabled></Input>
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
                        <Upload :action="$config.BaseURLfile + '/common/upload/file'" ref="uploadMoviesInfoImg"
                            :on-success="handleSuccessMoviesInfoImg" :format="['jpg','jpeg','png']" :max-size="2048"
                            :on-format-error="handleFormatErrorMoviesInfoImg"
                            :on-exceeded-size="handleMaxSizeMoviesInfoImg" :with-credentials="true">
                            <Button icon="ios-cloud-upload-outline">上传桌面背景图</Button>
                        </Upload>
                    </FormItem>
                    <FormItem label="排序:">
                        <Input v-model="moviesEdit.sortId" placeholder="请输入排序..."></Input>
                    </FormItem>
                    <FormItem label="基础桌面状态:" v-if="moviesEdit.type !=2">
                        <Select v-model="moviesEdit.status" disabled>
                            <Option :value="0">下线</Option>
                            <Option :value="1">上线</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="发布状态:">
                        <Select v-model="moviesEdit.isRelease">
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
    export default {
        data() {
            return {
                search: {
                    title: ''
                },
                info: {},
                modalAdd: false,//添加
                cityList: [],//基础模版

                edit: {},
                modalEdit: false,//修改

                id: '',
                //分页
                pageSize: 30,
                page: 1,
                total: 0,
                Checkboxlist: [],//  复选框
                columns1: [
                    {
                        title: '序号',
                        type: 'index',
                        width: 70,
                        align: 'center'
                    },
                    {
                        title: '拓展模板ID',
                        key: 'id',
                        align: 'center'
                    },
                    {
                        title: '拓展模板名称',
                        key: 'title',
                        align: 'center'
                    },
                    {
                        title: '基础模板名称',
                        key: 'staticTemplateTitle',
                        align: 'center'
                    },
                    {
                        title: '模板类型',
                        key: 'is_type',
                        align: 'center'
                    },
                    {
                        title: '创建时间',
                        key: 'IsaddTime',
                        align: 'center'
                    },
                    {
                        title: '操作',
                        width: 280,
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
                                ),
                                // h('Button', {
                                //     props: {
                                //         type: 'warning',
                                //         size: 'small',
                                //     },

                                //     on: {
                                //         click: () => {
                                //             this.management(params.row)
                                //         }
                                //     }
                                // }, '应用桌面管理'),
                                // h('Button', {
                                //     props: {
                                //         type: 'warning',
                                //         size: 'small',
                                //     },

                                //     on: {
                                //         click: () => {
                                //             this.movies(params.row)
                                //         }
                                //     }
                                // }, '影视桌面管理'),
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
                //验证
                ruleValidate: {
                    title: [
                        { required: true, message: '请输入拓展模版名称...', trigger: 'blur' }
                    ],
                    staticTemplateId: [
                        { required: true, message: '请选择基础模板...', trigger: 'blur' }
                    ]
                },
                customTemplateId: '',//所属的扩展模板ID
                managSearch: {
                    title: '',
                    type: '',
                    isRelease: '',
                    semester: '',
                    grade: ''
                },
                modalManagement: false,//应用桌面管理
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
                        title: '桌面类型',
                        key: 'is_type',
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
                    // {
                    //     title: '桌面背景图',
                    //     key: 'bgUrl',
                    //     align: 'center'
                    // },
                    {
                        title: '排序',
                        key: 'sortId',
                        align: 'center',
                    },
                    {
                        title: '年级-学期',
                        key: 'gradeDesc',
                        align: 'center'
                    },
                    {
                        title: '基础桌面状态',
                        key: 'is_status',
                        align: 'center'
                    },
                    {
                        title: '发布状态',
                        key: 'Release',
                        align: 'center'
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
                                )
                            ]);
                        }
                    }

                ],
                data2: [
                    {
                        id: 1
                    }
                ],

                gradeList: [],//年级
                semesterList: [],//学期

                totalManagement: 0,
                pageManagement: 1,
                pageSizeManagement: 30, //应用桌面分页

                managementInfo: {
                    isRelease: 0,
                    type: '拓展桌面'
                },
                modalManagementAdd: false,//应用桌面添加
                addUploadIcon: '',//icon
                addUploadImg: '',//背景图

                managementId: '',
                managementEdit: {},
                modalManagementEdit: false,//应用桌面修改


                modalMovies: false,//影视桌面
                moviesSearch: {
                    title: '',
                    isRelease: '',
                    type: ''
                }, //搜索
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
                        title: '桌面类型',
                        key: 'is_type',
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
                        title: '基础桌面状态',
                        key: 'is_status',
                        align: 'center'
                    },
                    {
                        title: '发布状态',
                        key: 'Release',
                        align: 'center'
                    },
                    {
                        title: '创建时间',
                        key: 'addTime',
                        align: 'center'
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
                    { id: 1 }
                ],

                moviesInfo: {
                    type: '拓展桌面',
                    isRelease: 0
                },
                modalMoviesAdd: false,//影视添加

                addUploadMoviesIcon: '',//icon
                addUploadMoviesImg: '',//img

                moviesEdit: {},
                modalMoviesEdit: false,//影视修改
                editUploadMoviesIcon: '',

                desktopType: {},//添加修改桌面类型

            }
        },
        methods: {
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
            //表格数据 
            getTableList() {
                let self = this;
                self.$http(this.$config.BaseURL + '/custompromotion/template/list?page=' + self.page + '&pageSize=' + self.pageSize + '&title=' + this.search.title).then(response => {
                    if (response.data.errno == 10000) {
                        console.log(response)
                        self.data1 = response.data.data.list;

                        response.data.data.list.forEach(val => {
                            val.IsaddTime = moment(val.addTime * 1000).format(
                                "YYYY-MM-DD HH:mm:ss"
                            );
                            // 类型：1 影视、2 应用
                            if (val.type == 1) {
                                val.is_type = "影视"
                            } else if (val.type == 2) {
                                val.is_type = "应用"
                            }
                        });

                        self.total = response.data.data.total;
                    }
                })
            },
            // 搜索
            query() {
                this.page = 1;
                this.getTableList();
            },
            // /staticpromotion/template/list
            getSelect() {
                let self = this;
                self.$http(this.$config.BaseURL + '/staticpromotion/template/list').then(response => {
                    console.log(response)
                    if (response.data.errno == 10000) {
                        self.cityList = response.data.data.list;
                    }
                })
            },
            // /tv/channel/list
            getCheckbox() {
                let self = this;
                self.$http(this.$config.BaseURL2 + '/tv/channel/list').then(response => {
                    if (response.data.errno == 10000) {
                        console.log(response)
                        self.Checkboxlist = response.data.data.list;
                        console.log(self.Checkboxlist)
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
            // 添加确定按钮
            addOk() {
                let self = this;
                self.$http.post(this.$config.BaseURL + '/custompromotion/template/save', self.info).then(response => {
                    if (response.data.errno == 10000) {
                        this.info = {};
                        this.getTableList();
                        this.modalAdd = false;
                        this.$Message.success('添加成功！');
                    }
                })
            },
            addCancel() {
                this.info = {};
                this.modalAdd = false;
            },
            // 修改弹框 
            modify(row) {
                console.log(row);
                // 类型：1 影视、2 应用
                if(row.type ==1){
                    this.is_type ="影视"
                }else if(row.type ==2){
                    this.is_type ="应用"
                }
                this.edit = row;
                this.modalEdit = true;
                this.id = row.id;
            },
            // 修改确定按钮
            editOk() {
                let self = this;
                self.$http.post(this.$config.BaseURL + '/custompromotion/template/save?id=' + self.id, self.edit).then(response => {
                    if (response.data.errno == 10000) {
                        this.getTableList();
                        this.modalEdit = false;
                        this.$Message.success('修改成功！')
                    }
                })
            },
            //修改取消按钮
            modalEditBtn() {
                this.getTableList();
                this.modalEdit = false;
            },
            //删除
            remove(row) {
                console.log(row);
                let self = this;
                self.$http(this.$config.BaseURL + '/custompromotion/template/delete?id=' + row.id).then(response => {
                    if (response.data.errno == 10000) {
                        this.getTableList();
                        this.$Message.success('删除成功！')
                    }
                })
            },
            //分页
            changePage(page) {
                this.page = page;
                this.getTableList();
            },
            // 应用桌面管理弹框
            management(row) {
                this.customTemplateId = row.id;
                this.getgradeList();
                this.getManagementTableList();
                this.modalManagement = true;
            },
            //应用桌面列表
            getManagementTableList() {
                // '&page=' + this.pageManagement + '&pageSize=' + pageSizeManagement + 
                this.$http.get(this.$config.BaseURL + '/custompromotion/desktop/list?title=' + this.managSearch.title + '&type=' + this.managSearch.type + '&semester=' + this.managSearch.semester + '&grade=' + this.managSearch.grade + '&isRelease=' + this.managSearch.isRelease +
                    '&customTemplateId=' + this.customTemplateId).then(response => {
                        if (response.data.errno == 10000) {
                            this.data2 = response.data.data;
                            response.data.data.forEach(val => {
                                // 桌面类型，1 基础、2 扩展
                                if (val.type == 1) {
                                    val.is_type = '基础'
                                } else if (val.type == 2) {
                                    val.is_type = '扩展'
                                }
                                // is_status 发布状态，0 未发布、1 发布
                                if (val.status == 0) {
                                    val.is_status = "未发布"
                                } else if (val.status == 1) {
                                    val.is_status = "发布"
                                }

                                // 状态 1 上线 0 下线
                                if (val.isRelease == 0) {
                                    val.Release = "下线"
                                } else if (val.isRelease == 1) {
                                    val.Release = "上线"
                                }
                            });

                            // this.totalManagement = response.data.data.total;
                        }
                    })
            },
            // 应用桌面搜索
            managQuery() {
                this.pageManagement = 1;
                this.getManagementTableList();
            },
            // // 应用桌面分页
            // changePageManagement(page) {
            //     this.pageManagement = page;
            //     this.getManagementTableList();
            // },
            // 应用桌面添加确定按钮
            addManagementOk() {
                this.managementInfo.iconUrl = this.addUploadIcon;
                this.managementInfo.bgUrl = this.addUploadImg;
                this.$http.post(this.$config.BaseURL + '/custompromotion/desktop/save', this.managementInfo).then(response => {
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
            //应用桌面修改弹框
            managModify(row) {
                this.managementEdit = row;
                this.modalManagementEdit = true;
                this.managementId = row.id;
            },
            // 应用桌面修改确定按钮
            editManagementOk() {
                this.$http.post(this.$config.BaseURL + '/custompromotion/desktop/save?id=' + this.managementId, this.managementEdit).then(response => {
                    if (response.data.errno == 10000) {
                        this.modalManagementEdit = false;
                        this.getManagementTableList();
                        this.$Message.success("修改成功！");
                    }
                })
            },
            //应用桌面修改取消按钮
            editManagementCancel() {
                this.modalManagementEdit = false;
                this.getManagementTableList();
            },
            //应用桌面删除
            managRemove(row) {
                this.$http.get(this.$config.BaseURL + '/custompromotion/desktop/delete?id=' + row.id).then(response => {
                    if (response.data.errno == 10000) {
                        this.getManagementTableList();
                        this.$Message.success("删除成功！");
                    }
                })
            },
            // 影视桌面
            movies(row) {
                this.customTemplateId = row.id;
                this.getDesktopType();//添加修改桌面类型
                this.getMoviesTableList();
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
            // 桌面管理添加背景图
            handleSuccessMoviesInfoImg(res, file) {
                this.addUploadMoviesImg = res.data.url;
                console.log(this.addUploadMoviesImg)
            },
            handleFormatErrorMoviesInfoImg(file) {
                this.$Notice.warning({
                    title: '文件格式不正确',
                    desc: '文件格式' + '文件名' + '不正确，请选择JPG或PNG'
                })
            },
            handleMaxSizeMoviesInfoImg(file) {
                this.$Notice.warning({
                    title: '超过文件大小限制',
                    desc: '文件  ' + '文件名' + ' 太大，不超过2M.'
                })
            },

            // 桌面管理修改icon
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
            // 应用桌面添加修改类型
            getDesktopType() {
                this.$http.get(this.$config.BaseURL + '/staticpromotion/desktop/typelist').then(response => {
                    console.log(response)
                    if (response.data.errno == 10000) {
                        this.desktopType = response.data.data.list;
                    }
                })
            },
            // 影视桌面列表
            getMoviesTableList() {
                this.$http.get(this.$config.BaseURL + '/custompromotion/desktop/list?title=' + this.moviesSearch.title + '&isRelease=' + this.moviesSearch.isRelease + '&type=' + this.moviesSearch.type + '&customTemplateId=' + this.customTemplateId).then(response => {
                    if (response.data.errno == 10000) {
                        this.data3 = response.data.data;
                        response.data.data.forEach(val => {
                            if (val.status == 0) {
                                val.is_status = "下线"
                            } else if (val.status == 1) {
                                val.is_status = "上线"
                            }

                            if (val.isRelease == 0) {
                                val.Release = "未发布"
                            } else if (val.isRelease == 1) {
                                val.Release = "发布"
                            }

                            if (val.type == 1) {
                                val.is_type = "基础"
                            } else if (val.type == 2) {
                                val.is_type = "扩展"
                            }
                        });
                    }
                })
            },
            // 搜索
            moviesQuery() {
                this.getMoviesTableList();
            },
            //影视添加确定按钮
            addMoviesOk() {
                this.moviesInfo.iconUrl = this.addUploadMoviesIcon;
                this.moviesInfo.bgUrl = this.addUploadMoviesImg;
                this.moviesInfo.customTemplateId = this.customTemplateId;
                this.$http.post(this.$config.BaseURL + '/custompromotion/desktop/save', this.moviesInfo).then(response => {
                    if (response.data.errno == 10000) {
                        this.moviesInfo = {};
                        this.modalMoviesAdd = false;
                        this.getMoviesTableList();
                        this.$Message.success('添加成功！');
                    }
                })
            },
            //影视添加取消按钮
            addMoviesCancel() {
                this.moviesInfo = {};
                this.modalMoviesAdd = false;
            },
            // 影视修改弹框
            moviesModify(row) {
                this.moviesEdit = row;
                this.modalMoviesEdit = true;
            },
            // 影视删除
            moviesRemove(row) {
                this.$http.get(this.$config.BaseURL + '/custompromotion/desktop/delete?id=' + row.id).then(response => {
                    if (response.data.errno == 10000) {
                        this.getMoviesTableList();
                        this.$Message.success('删除成功！');
                    }
                })
            }

        },
        mounted() {
            this.getTableList();
            this.getSelect();
            this.getCheckbox()
        }
    }
</script>