<style>
    .layout-wrap-search {
        float: left;
    }

    .layout-wrap-add {
        float: right;
    }

    .span {
        font-size: 14px;
        margin: 15px;
        color: #495060;
        padding-bottom: 20px;
    }

    .layout-wrap-page {
        float: right;
        margin-top: 10px;
    }

    .layout-wrap .ivu-poptip-confirm .ivu-poptip-body .ivu-icon {
        font-size: 16px;
        color: #ff9900;
        line-height: 18px;
        position: absolute;
        margin-left: -50px;
    }
</style>
<template>
    <div class="layout-wrap">
        <div class="layout-wrap-search">
            <Form :model="search" inline>
                <FormItem label="专题名称:" :label-width="70">
                    <Input v-model="search.name" placeholder="请输入专题名称..." style="width:200px;"></Input>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="query">搜索</Button>
                </FormItem>
            </Form>
        </div>
        <!-- 添加 -->
        <div class="layout-wrap-add">
            <Button type="success" @click="modalAddBtn">添加</Button>
            <Modal v-model="modalAdd" title="添加">
                <div slot="footer">
                    <a @click="addCancel" class="span">取消</a>
                    <Button @click="addOk" type="primary">确定</Button>
                </div>
                <Form :model="info" label-position="right" :label-width="100">
                    <FormItem label="专题名称:">
                        <Input v-model="info.name" placeholder="请输入专题名称..."></Input>
                    </FormItem>
                    <FormItem label="专题图:">
                        <Upload :action="$config.BaseURLfile + '/common/upload/file'" ref="uploadWrapInfoIcon"
                            :on-success="handleSuccessWrapInfoIcon" :format="['jpg','jpeg','png']" :max-size="2048"
                            :on-format-error="handleFormatErrorWrapInfoIcon"
                            :on-exceeded-size="handleMaxSizeWrapInfoIcon" :with-credentials="true">
                            <Button icon="ios-cloud-upload-outline">上传专题图</Button>
                        </Upload>
                    </FormItem>
                    <FormItem label="专题背景图:">
                        <Upload :action="$config.BaseURLfile + '/common/upload/file'" ref="uploadWrapInfoImg"
                            :on-success="handleSuccessWrapInfoImg" :format="['jpg','jpeg','png']" :max-size="2048"
                            :on-format-error="handleFormatErrorWrapInfoImg" :on-exceeded-size="handleMaxSizeWrapInfoImg"
                            :with-credentials="true">
                            <Button icon="ios-cloud-upload-outline">上传专题背景图</Button>
                        </Upload>
                    </FormItem>
                    <FormItem label="标签:">
                        <div style="float:left;">
                            <Input v-model="info.tagsList" placeholder="请输入类型标签..." style="width:300px;"></Input>
                        </div>
                        <Button type="primary" @click="updateType()">选择</Button>
                    </FormItem>
                    <FormItem label="描述:">
                        <Input v-model="info.desc" type="textarea" :rows="4" placeholder="请输入描述..."></Input>
                    </FormItem>
                </Form>
            </Modal>
        </div>
        <!-- 修改 -->
        <Modal v-model="modalEdit" title="修改">
            <div slot="footer">
                <a @click="editCancel" class="span">取消</a>
                <Button @click="editOk" type="primary">确定</Button>
            </div>
            <Form :model="edit" label-position="right" :label-width="100">
                <FormItem label="专题名称:">
                    <Input v-model="edit.name" placeholder="请输入专题名称..."></Input>
                </FormItem>
                <FormItem label="专题图:">
                    <!-- <Upload :action="$config.BaseURLfile + '/common/upload/file'" ref="uploadWrapEditIcon"
                        :on-success="handleSuccessWrapEditIcon" :format="['jpg','jpeg','png']" :max-size="2048"
                        :on-format-error="handleFormatErrorWrapInfoIcon" :on-exceeded-size="handleMaxSizeWrapInfoIcon"
                        :with-credentials="true">
                        <Button icon="ios-cloud-upload-outline">上传专题图</Button>
                    </Upload> -->
                    <Upload :action="$config.BaseURLfile + '/common/upload/file'" ref="uploadWrapEditIcon"
                        :on-success="handleSuccessWrapEditIcon" :format="['jpg','jpeg','png']" :max-size="2048"
                        :on-format-error="handleFormatErrorWrapEditIcon" :on-exceeded-size="handleMaxSizeWrapEditIcon"
                        :with-credentials="true">
                        <Button icon="ios-cloud-upload-outline">上传专题图</Button>
                    </Upload>
                </FormItem>
                <FormItem label="专题背景图:">
                    <Upload :action="$config.BaseURLfile + '/common/upload/file'" ref="uploadWrapEditImg"
                        :on-success="handleSuccessWrapEditImg" :format="['jpg','jpeg','png']" :max-size="2048"
                        :on-format-error="handleFormatErrorWrapEditImg" :on-exceeded-size="handleMaxSizeWrapEditImg"
                        :with-credentials="true">
                        <Button icon="ios-cloud-upload-outline">上传专题图</Button>
                    </Upload>
                </FormItem>
                <FormItem label="标签:">
                    <div style="float:left;">
                        <Input v-model="edit.tagsList" placeholder="请输入类型标签..." style="width:300px;"></Input>
                    </div>
                    <Button type="primary" @click="updateType()">选择</Button>
                </FormItem>
                <FormItem label="描述:">
                    <Input v-model="edit.desc" type="textarea" :rows="4" placeholder="请输入描述..."></Input>
                </FormItem>
            </Form>
        </Modal>
        <div style="clear:both;"></div>
        <div class="layout-wrap-table">
            <Table border :columns="columns1" :data="data1"></Table>
        </div>
        <div class="layout-wrap-page">
            <Page :total="total" :current="page" :page-size='pageSize' @on-change="changePage" show-elevator />
        </div>
        <!-- 类型标签 -->
        <Modal v-model="showUpdateTypeModel" title="修改标签" :width="30" @on-ok="okShowUpdateTypeModel">
            <Button type="primary" @click="showAddUpdateType">添加</Button>
            <Table border :columns="columnType1" :data="columnType1List"></Table>
        </Modal>
        <Modal v-model="showAddUpdateTypeModel" title="添加修改标签" :width="30" @on-ok="okAddUpdateType">
            <Input v-model="showAddUpdateTypeName" search enter-button placeholder="标签名"
                @on-search="searchAddUpdateType" />
            <Table border :columns="columnType2" :data="columnType2List" @on-selection-change="selectionAddUpdateType">
            </Table>
        </Modal>
        <!--内容维护 -->
        <Modal v-model="modalContent" title="内容维护" :width="1100">
            <div>
                <Form :model="searchContentAdd" inline>
                    <FormItem label="应用名称:" :label-width="70">
                        <Input v-model="searchContentAdd.name" placeholder="请输入应用名称..." width="190px;"></Input>
                    </FormItem>
                    <FormItem label="界面版式:" :label-width="70">
                        <Select v-model="searchContentAdd.screen" style="width:190px" placeholder="请选择界面版式...">
                            <!-- 0全部、1横屏、2，竖屏、3横竖屏兼容 -->
                            <Option :value="0">全部</Option>
                            <Option :value="1">横屏</Option>
                            <Option :value="2">竖屏</Option>
                            <Option :value="3">横竖屏兼容</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="内容是否付费:" :label-width="90">
                        <!-- 0免费、1付费、2分享后免费 -->
                        <Select v-model="searchContentAdd.model1" style="width:190px" placeholder="请选择内容是否付费...">
                            <Option value="">全部</Option>
                            <Option :value="0">免费</Option>
                            <Option :value="1">付费</Option>
                            <Option :value="2">免费+付费</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="一级分类:" :label-width="70">
                        <Select v-model="searchContentAdd.category_id" style="width:190px"
                            @on-change="changeSearchCategoryId" placeholder="请选择一级分类...">
                            <Option value="">全部</Option>
                            <Option v-for="item in cityList" :value="item.id" :key="item.id">{{ item.name }}
                            </Option>
                        </Select>
                    </FormItem>
                    <FormItem label="二级分类:" :label-width="70">
                        <Select v-model="searchContentAdd.category_sub_Id" style="width:200px" placeholder="请选择二级分类...">
                            <Option value="">全部</Option>
                            <Option v-for="item in cityList1" :value="item.id" :key="item.id"
                                v-if="item.parent_id == searchContentAdd.category_id || searchContentAdd.category_id == 0">
                                {{ item.name }}
                            </Option>
                        </Select>
                    </FormItem>
                    <FormItem>
                        <Button type="primary" @click="contentAddQuery">搜索</Button>
                    </FormItem>
                    <FormItem>
                        <Button type="success" @click="modalContentAdd =true;GroupList = [];">添加</Button>
                    </FormItem>
                </Form>
            </div>
            <div>
                <Table border :columns="columns2" :data="data2"></Table>
            </div>
            <!-- 内容维护添加 -->
            <Modal v-model="modalContentAdd" title="添加" :width="1100">
                <div slot="footer">
                    <a @click="addContentCancel" class="span">取消</a>
                    <Button @click="addContentOk" type="primary">确定</Button>
                </div>
                <div>
                    <Form :model="searchContentAdd" inline>
                        <FormItem label="应用名称:" :label-width="70">
                            <Input v-model="searchContentAdd.name" placeholder="请输入应用名称..." width="190px;"></Input>
                        </FormItem>
                        <FormItem label="界面版式:" :label-width="70">
                            <Select v-model="searchContentAdd.screen" style="width:190px" placeholder="请选择界面版式...">
                                <!-- 0全部、1横屏、2，竖屏、3横竖屏兼容 -->
                                <Option :value="0">全部</Option>
                                <Option :value="1">横屏</Option>
                                <Option :value="2">竖屏</Option>
                                <Option :value="3">横竖屏兼容</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="内容是否付费:" :label-width="90">
                            <!-- 0免费、1付费、2分享后免费 -->
                            <Select v-model="searchContentAdd.model1" style="width:190px" placeholder="请选择内容是否付费...">
                                <Option value="">全部</Option>
                                <Option :value="0">免费</Option>
                                <Option :value="1">付费</Option>
                                <Option :value="2">免费+付费</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="一级分类:" :label-width="70">
                            <Select v-model="searchContentAdd.category_id" style="width:190px"
                                @on-change="changeSearchCategoryId" placeholder="请选择一级分类...">
                                <Option value="">全部</Option>
                                <Option v-for="item in cityList" :value="item.id" :key="item.id">{{ item.name }}
                                </Option>
                            </Select>
                        </FormItem>
                        <FormItem label="二级分类:" :label-width="70">
                            <Select v-model="searchContentAdd.category_sub_Id" style="width:200px"
                                placeholder="请选择二级分类...">
                                <Option value="">全部</Option>
                                <Option v-for="item in cityList1" :value="item.id" :key="item.id"
                                    v-if="item.parent_id == searchContentAdd.category_id || searchContentAdd.category_id == 0">
                                    {{ item.name }}
                                </Option>
                            </Select>
                        </FormItem>
                        <FormItem>
                            <Button type="primary" @click="contentAddQuery">搜索</Button>
                        </FormItem>
                    </Form>
                </div>
                <div>
                    <Table border :columns="columns3" :data="data3" @on-select="checkBoxlist"
                        @on-select-cancel="checkBoxlistCancel" @on-select-all="checkBoxlist"></Table>
                </div>
            </Modal>
            <!-- 内容维护修改 -->
            <Modal v-model="modalContentEdit" title="应用修改">
                <div slot="footer">
                    <a @click="editContentCancel" class="span">取消</a>
                    <Button @click="editContentOk" type="primary">确定</Button>
                </div>
                <Form :model="contentEdit" label-position="right" :label-width="90">
                    <FormItem label="应用名称:">
                        <Input v-model="contentEdit.name" disabled></Input>
                    </FormItem>
                    <FormItem label="应用排序:">
                        <Input v-model="contentEdit.sort_id"></Input>
                    </FormItem>
                </Form>
            </Modal>
        </Modal>
    </div>
</template>
<script>
    var moment = require("moment");
    export default {
        data() {
            return {
                search: {
                    name: ''
                },
                total: 0,
                page: 1,
                pageSize: 30,//分页

                addUploadWrapInfoIcon: '',//专题图
                addUploadWrapInfoImg: '',//专题背景图
                info: {},
                modalAdd: false,//添加
                showUpdateTypeModel: false, // 修改基础类型标签弹框
                showAddUpdateTypeModel: false, // 添加标签列表
                showAddUpdateTypeName: '', // 搜索标签名
                columnType1: [
                    {
                        title: '标签id',
                        key: 'id',
                        align: 'center'
                    },
                    {
                        title: '标签名',
                        key: 'name',
                        align: 'center'
                    },
                    {
                        title: '操作',
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h(
                                    'Poptip', {
                                        props: {
                                            confirm: true,
                                            title: '确定要删除吗！',
                                            type: 'error',
                                            size: 'small',
                                            width: '150'
                                        },
                                        on: {
                                            'on-ok': () => {
                                                this.removeTagList(params.row)
                                            }
                                        }
                                    }, [
                                        h(
                                            'Button', {
                                                props: {
                                                    type: 'error',
                                                    size: 'small'
                                                }
                                            },
                                            '删除'
                                        )
                                    ]
                                )
                            ])
                        }
                    }
                ],
                columnType1List: [], // 修改标签列表
                columnType2: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '标签ID',
                        key: 'id'
                    },
                    {
                        title: '标签名',
                        key: 'name'
                    }

                ],
                columnType2List: [], // 添加标签弹框

                edit: {},
                modalEdit: false,//修改
                columns1: [
                    {
                        title: '专题ID',
                        key: 'id',
                        align: 'center'
                    },
                    {
                        title: '专题名称',
                        key: 'name',
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
                                })
                            ])
                        }
                    },
                    {
                        title: '状态',
                        key: 'is_status',
                        align: 'center'
                    },
                    {
                        title: '创建时间',
                        key: 'is_create_time',
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
                                            this.maintenance(params.row)
                                        }
                                    }
                                }, '内容维护'),
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
                                    'Poptip', {
                                        props: {
                                            confirm: true,
                                            title: '确定要删除吗！',
                                            type: 'error',
                                            size: 'small',
                                            width: '150'
                                        },
                                        on: {
                                            'on-ok': () => {
                                                this.remove(params.row)
                                            }
                                        }
                                    }, [
                                        h(
                                            'Button', {
                                                props: {
                                                    type: 'error',
                                                    size: 'small'
                                                }
                                            },
                                            '删除'
                                        )
                                    ]
                                )
                            ])
                        }
                    }

                ],
                data1: [],

                modalContent: false,//内容维护
                cityList: [],
                cityList1: [],
                columns2: [
                    {
                        title: '应用ID',
                        key: 'id',
                        align: 'center'
                    },
                    {
                        title: '应用名称',
                        key: 'name',
                        align: 'center'
                    },
                    {
                        title: '一级分类',
                        key: 'category_name',
                        align: 'center'
                    },
                    {
                        title: '二级分类',
                        key: 'category_sub_str',
                        align: 'center'
                    },
                    {
                        title: '适用人群',
                        key: 'age_str',
                        align: 'center'
                    },
                    {
                        title: '适用年级',
                        key: 'grade_str',
                        align: 'center'
                    },
                    {
                        title: '内容是否付费',
                        key: 'is_free',
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
                                            this.modifyContent(params.row)
                                        }
                                    }
                                }, '修改'),
                                h(
                                    'Poptip', {
                                        props: {
                                            confirm: true,
                                            title: '确定要删除吗！',
                                            type: 'error',
                                            size: 'small',
                                            width: '150'
                                        },
                                        on: {
                                            'on-ok': () => {
                                                this.removeContent(params.row)
                                            }
                                        }
                                    }, [
                                        h(
                                            'Button', {
                                                props: {
                                                    type: 'error',
                                                    size: 'small'
                                                }
                                            },
                                            '删除'
                                        )
                                    ]
                                )
                            ])
                        }
                    }

                ],
                data2: [],
                specialId: '', // 专题id
                modalContentAdd: false,//内容维护添加
                searchContentAdd: {
                    name: '',
                    category_id: '',
                    category_sub_Id: '',
                    screen: '',
                    free: ''
                },//内容维护添加搜索
                columns3: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '应用ID',
                        key: 'id',
                        align: 'center'
                    },
                    {
                        title: '应用名称',
                        key: 'name',
                        align: 'center'
                    },
                    {
                        title: '一级分类',
                        key: 'category_name',
                        align: 'center'
                    },
                    {
                        title: '二级分类',
                        key: 'category_sub_str',
                        align: 'center'
                    },
                    {
                        title: '适用人群',
                        key: 'age_str',
                        align: 'center'
                    },
                    {
                        title: '适用年级',
                        key: 'grade_str',
                        align: 'center'
                    },
                    {
                        title: '内容是否付费',
                        key: 'is_free',
                        align: 'center'
                    }
                ],
                data3: [],
                contentEdit: {},
                modalContentEdit: false,//内容维护修改
                applicationId: '',//应用id

                //保存所有添加
                GroupList: [],
                id: '',//

                editUploadUrl: '',//修改上传专题图片
                editImgUploadUrl: ''
            }
        },
        methods: {
            // 列表
            getTableList() {
                this.$http.get(this.$config.BaseURL11 + '/appstore/admin/v1/wrap/list?name=' + this.search.name + '&page=' + this.page + '&page_size=' + this.pageSize).then(response => {
                    console.log(response)
                    if (response.data.errno == 10000) {
                        this.data1 = response.data.data.list;

                        response.data.data.list.forEach(val => {
                            // 1上线，0下线
                            if (val.status == 0) {
                                val.is_status = "下线"
                            } else if (val.status == 1) {
                                val.is_status = "上线"
                            }

                            val.is_create_time = moment(val.create_time * 1000).format(
                                "YYYY-MM-DD HH:mm:ss"
                            );
                        });

                        this.total = response.data.data.total;
                    }
                })
            },
            // 搜索
            query() {
                this.page = 1;
                this.getTableList();
            },
            // 分页
            changePage(page) {
                this.page = page;
                this.getTableList();
            },
            // 添加上传专题图
            handleSuccessWrapInfoIcon(res, file) {
                console.log(res)
                this.addUploadWrapInfoIcon = res.data.url
                console.log(this.addUploadWrapInfoIcon)
            },
            // 上传格式验证
            handleFormatErrorWrapInfoIcon(file) {
                this.$Notice.warning({
                    title: '文件格式不正确',
                    desc: '文件格式' + '文件名' + '不正确，请选择JPG或PNG'
                })
            },
            // 上传文件大小验证
            handleMaxSizeWrapInfoIcon(file) {
                this.$Notice.warning({
                    title: '超过文件大小限制',
                    desc: '文件  ' + '文件名' + ' 太大，不超过2M.'
                })
            },
            // 添加上传专题背景图
            handleSuccessWrapInfoImg(res, file) {
                console.log(res)
                this.addUploadWrapInfoImg = res.data.url
                console.log(this.addUploadWrapInfoImg)
            },
            // 上传格式验证
            handleFormatErrorWrapInfoImg(file) {
                this.$Notice.warning({
                    title: '文件格式不正确',
                    desc: '文件格式' + '文件名' + '不正确，请选择JPG或PNG'
                })
            },
            // 上传文件大小验证
            handleMaxSizeWrapInfoImg(file) {
                this.$Notice.warning({
                    title: '超过文件大小限制',
                    desc: '文件  ' + '文件名' + ' 太大，不超过2M.'
                })
            },
            // 修改弹框
            modify(row) {
                console.log(row);
                this.edit = row;
                this.id = row.id;
                this.label_id = this.id
                // 标签
                let tagsNames = []
                console.log(this.edit.label_info)
                this.edit.label_info.forEach(val => {
                    tagsNames.push(val.name)
                })
                this.edit.tagsList = tagsNames.join(';')
                this.modalEdit = true;
            },
            //标签列表
            updateType() {
                this.showUpdateTypeModel = true
                this.columnType1List = []
                // 查询该节目的标签列表 columnType1List
                if (this.label_id != '') {
                    this.id = this.label_id
                }
                this.$http
                    .get(
                        this.$config.BaseURL11 +
                        '/appstore/admin/v1/wrap/label/list?id=' + this.id
                    )
                    .then(response => {
                        if (response.data.errno == 10000) {
                            this.columnType1List = response.data.data.list
                            // 更新标签列表
                            let typeList = []
                            this.columnType1List.forEach(val => {
                                console.log(val)
                                typeList.push(val.tag_name)
                            })
                            this.info.label_info = typeList.join(';');
                            this.edit.label_info = typeList.join(';');
                            console.log(this.edit.label_info)
                            console.log(this.info.label_info)
                        }
                    })
            },
            // 添加标签
            showAddUpdateType() {
                this.showAddUpdateTypeModel = true
                this.showAddUpdateTypeName = ''
                this.getShowAddUpdateTypeList()
            },
            // 确定更新类型标签
            okAddUpdateType() {
                console.log(this.addTypeselections)
                let tagIds = [] // 添加标签
                this.addTypeselections.forEach(val => {
                    let isExt = false
                    this.columnType1List.forEach(v => {
                        if (v.id == val.id) {
                            isExt = true
                            console.log('dddd')
                        }
                    })
                    if (isExt == false) {
                        tagIds.push(val.id)
                        this.columnType1List.push(val)
                    }
                })

                if (tagIds.length > 0) {
                    let body = {
                        id: this.id * 1,
                        label_ids: tagIds
                    }
                    this.$http
                        .post(`${this.$config.BaseURL11}/appstore/admin/v1/wrap/label/add`, body)
                        .then(response => {
                            if (response.data.errno == 10000) {
                                this.label_id = response.data.data.Id
                                console.log(this.label_id)
                                // this.updateType();
                                // this.showUpdateTypeModel = false;
                                this.$Message.success('标签修改成功！')
                            }
                        })
                }
            },
            // 修改标签弹框确定按钮
            okShowUpdateTypeModel() {
                let tagsNames = []
                let ladelEdits = []
                this.columnType1List.forEach(val => {
                    tagsNames.push(val.name)
                    ladelEdits.push(
                        {
                            id: val.id
                            // name: val.name,
                        }
                    )
                })
                this.edit.tagsList = tagsNames.join(';');
                this.edit.label_info = ladelEdits
                // 添加
                let tagsNames1 = []
                let ladelInfos = []
                this.columnType1List.forEach(val => {
                    tagsNames1.push(val.name)
                    ladelInfos.push(
                        {
                            id: val.id
                            // name: val.name,
                        }
                    )
                })

                this.info.tagsList = tagsNames1.join(';')
                this.info.label_info = ladelInfos
            },
            // 过滤添加标签列表
            searchAddUpdateType() {
                this.getShowAddUpdateTypeList()
            },
            // 添加表格复选框选中
            selectionAddUpdateType(selections) {
                this.addTypeselections = selections
            },
            // 获取要添加的标签列表
            getShowAddUpdateTypeList() {
                this.$http
                    .get(this.$config.BaseURL11 + '/appstore/admin/v1/label/list?name=' + this.showAddUpdateTypeName)
                    .then(response => {
                        if (response.data.errno == 10000) {
                            this.columnType2List = response.data.data.list;
                        }
                    })
            },
            // 删除标签
            removeTagList(row) {
                console.log(row)
                this.$http.post(this.$config.BaseURL11 + '/appstore/admin/v1/wrap/label/remove', {
                    id: this.id,
                    label_id: row.id
                }).then(response => {
                    if (response.data.errno == 10000) {
                        this.updateType();
                        this.$Message.success('删除成功！')
                    }
                })
            },
            // 添加弹框
            modalAddBtn() {
                this.modalAdd = true;
                this.$refs.uploadWrapInfoImg.clearFiles();
                this.$refs.uploadWrapInfoIcon.clearFiles();
            },
            // 添加确定按钮
            addOk() {
                // this.$refs.upload.clearFiles();
                this.info.wrap_img = this.addUploadWrapInfoIcon;
                this.info.wrap_backdrop = this.addUploadWrapInfoImg;
                this.$http.post(this.$config.BaseURL11 + '/appstore/admin/v1/wrap/modify', this.info).then(response => {
                    if (response.data.errno == 10000) {
                        this.info = {};
                        this.modalAdd = false;
                        this.getTableList();
                        this.$Message.success('添加成功！');
                    }
                })
            },
            //添加取消按钮
            addCancel() {
                this.info = {};
                this.modalAdd = false;
            },
            // 修改专题图片
            handleSuccessWrapEditIcon(res, file) {
                console.log(res)
                this.editUploadUrl = res.data.url
                console.log(this.editUploadUrl)
            },
            // 上传文件大小验证
            handleMaxSizeWrapEditIcon(file) {
                this.$Notice.warning({
                    title: '超过文件大小限制',
                    desc: '文件  ' + '文件名' + ' 太大，不超过2M.'
                })
            },
            // 上传格式验证
            handleFormatErrorWrapEditIcon(file) {
                this.$Notice.warning({
                    title: '文件格式不正确',
                    desc: '文件格式' + '文件名' + '不正确，请选择JPG或PNG'
                })
            },

            // 修改专题背景图
            handleSuccessWrapEditImg(res, file) {
                console.log(res)
                this.editImgUploadUrl = res.data.url
                console.log(this.editImgUploadUrl)
            },
            // 上传文件大小验证
            handleMaxSizeWrapEditImg(file) {
                this.$Notice.warning({
                    title: '超过文件大小限制',
                    desc: '文件  ' + '文件名' + ' 太大，不超过2M.'
                })
            },
            // 上传格式验证
            handleFormatErrorWrapEditImg(file) {
                this.$Notice.warning({
                    title: '文件格式不正确',
                    desc: '文件格式' + '文件名' + '不正确，请选择JPG或PNG'
                })
            },
            //修改确定按钮
            editOk() {
                if (this.editUploadUrl != '') {
                    this.edit.wrap_img = this.editUploadUrl
                }

                if (this.editImgUploadUrl != '') {
                    this.edit.wrap_backdrop = this.editImgUploadUrl
                }
                this.$http.post(this.$config.BaseURL11 + '/appstore/admin/v1/wrap/modify', this.edit).then(response => {
                    if (response.data.errno == 10000) {
                        this.modalEdit = false;
                        this.getTableList();
                        this.$Message.success("修改成功！");
                    }
                })
            },
            //修改取消按钮
            editCancel() {
                this.modalEdit = false;
                this.getTableList();
            },
            // 删除
            remove(row) {
                this.$http.post(this.$config.BaseURL11 + '/appstore/admin/v1/wrap/remove', {
                    id: row.id
                }).then(response => {
                    if (response.data.errno == 10000) {
                        this.getTableList();
                        this.$Message.success('删除成功！');
                    }
                })
            },
            //内容维护一级分类
            getCategoryIdList() {
                this.searchContentAdd.category_sub_Id = ''
                this.$http.get(this.$config.BaseURL11 + '/appstore/admin/v1/category/list').then(response => {
                    if (response.data.errno == 10000) {
                        this.cityList = response.data.data.list;
                    }
                })
            },
            //内容维护二级分类 
            // /appstore/admin/v1/categorytwo/list
            getCategorySubIdList() {
                this.$http.get(this.$config.BaseURL11 + '/appstore/admin/v1/categorytwo/list').then(response => {
                    if (response.data.errno == 10000) {
                        this.cityList1 = response.data.data.list;
                    }
                })
            },
            changeSearchCategoryId(val) {
                this.searchContentAdd.category_sub_Id = ''
            },
            //内容维护
            maintenance(row) {
                this.getCategoryIdList();
                this.getCategorySubIdList();
                this.specialId = row.id;
                this.getContentTableList();
                this.modalContent = true;
            },
            // 内容维护列表
            getContentTableList() {
                this.$http.get(this.$config.BaseURL11 + '/appstore/admin/v1/wrap/detail/list?id=' + this.specialId + '&name=' + this.searchContentAdd.name + '&category_id=' + this.searchContentAdd.category_id +
                    '&category_sub_Id=' + this.searchContentAdd.category_sub_Id + '&screen=' + this.searchContentAdd.screen + '&free=' + this.searchContentAdd.free).then(response => {
                        console.log(response)
                        if (response.data.errno == 10000) {
                            this.data2 = response.data.data.list;
                            this.data3 = response.data.data.list;
                            // 包含付费：0免费、1付费、2分享后免费
                            response.data.data.list.forEach(val => {
                                if (val.free == 0) {
                                    val.is_free = "免费"
                                } else if (val.free == 1) {
                                    val.is_free = "付费"
                                } else if (val.free == 2) {
                                    val.is_free = "免费 + 付费"
                                }

                                let sel = false;
                                this.GroupList.forEach(val1 => {
                                    if (val.id == val1.id) {
                                        sel = true;
                                    }
                                });
                                val._checked = sel;
                            });
                        }
                    })
            },
            contentAddQuery() {
                this.getContentTableList();
            },
            // 内容维护修改
            modifyContent(row) {
                this.contentEdit = row;
                this.applicationId = row.id;
                this.modalContentEdit = true;
            },
            // 内容维护修改确定按钮
            editContentOk() {
                this.contentEdit.sort_id *= 1;
                this.$http.post(this.$config.BaseURL11 + '/appstore/admin/v1/wrap/detail/modify', {
                    id: this.applicationId,
                    sort_id: this.contentEdit.sort_id
                }).then(response => {
                    if (response.data.errno == 10000) {
                        this.modalContentEdit = false;
                        this.getContentTableList();
                        this.$Message.success('修改成功！');
                    }
                })
            },
            //内容维护修改取消按钮
            editContentCancel() {
                this.modalContentEdit = false;
                this.getContentTableList();
            },
            //内容维护删除
            removeContent(row) {
                this.$http.post(this.$config.BaseURL11 + '/appstore/admin/v1/wrap/detail/remove', {
                    id: row.id
                }).then(response => {
                    if (response.data.errno == 10000) {
                        this.getContentTableList();
                        this.$Message.success('删除成功！');
                    }
                })
            },

            //内容维护添加
            // 选中
            checkBoxlist(selection, row) {
                console.log(selection);
                console.log(row)
                // this.GroupList.push(row)
                this.GroupList = selection;
            },
            // 取消选择
            checkBoxlistCancel(selection, row) {
                console.log(selection);
                console.log(row)
                let groupList = [];
                this.GroupList.forEach(val => {
                    if (val.id != row.id) {
                        groupList.push(val)
                    }
                });
                this.GroupList = groupList
            },
            //内容维护添加确定按钮
            addContentOk() {
                let self = this;
                let labelIds = [];
                this.GroupList.forEach((val, key) => {
                    labelIds.push(val.id);
                });
                let postData = {
                    'ids': labelIds,
                    'id': this.specialId
                };
                self.$http.post(this.$config.BaseURL11 + '/appstore/admin/v1/wrap/detail/add', postData).then(response => {
                    if (response.data.errno == 10000) {
                        this.modalContentAdd = false;
                        this.getContentTableList()
                        this.$Message.success('添加成功!')
                    }
                })
            },
            addContentCancel() {
                this.modalContentAdd = false;
            }
        },
        mounted() {
            this.getTableList();
        }
    }
</script>