<style>
    .layout-person-search {
        float: left;
    }

    .layout-person-add {
        float: right;
    }

    .layout-person-page {
        float: right;
        margin-top: 10px;
    }
</style>
<template>
    <div class="layout-person">
        <div class="layout-person-search">
            <Form :model="search" inline>
                <FormItem label="姓名:" :label-width="40">
                    <Input v-model="search.name" style="width:200px" placeholder="请输入姓名..."></Input>
                </FormItem>
                <FormItem label="性别:" :label-width="40">
                    <Select v-model="search.gender" style="width:200px" placeholder="请选择性别...">
                        <Option :value="1">男</Option>
                        <Option :value="2">女</Option>
                    </Select>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="query">搜索</Button>
                </FormItem>
            </Form>
        </div>
        <!-- 添加 -->
        <div class="layout-person-add">
            <Button type="success" @click="modalAdd = true">添加</Button>
            <Modal v-model="modalAdd" title="添加" width="800">
                <div slot="footer">
                    <a @click="addCancel" class="span">取消</a>
                    <Button @click="addOk" type="primary">确定</Button>
                </div>
                <Form :model="info" label-position="right" :label-width="100">
                    <Row>
                        <Col span="12">
                        <FormItem label="人物名称:">
                            <Input v-model="info.name" placeholder="请输入人物名称..."></Input>
                        </FormItem>
                        </Col>
                        <Col span="12">
                        <FormItem label="头像">
                            <Upload :action="$config.BaseURLfile + '/common/upload/file'" :on-success="handleSuccess">
                                <Button icon="ios-cloud-upload-outline">上传头像</Button>
                            </Upload>
                        </FormItem>
                        </Col>
                        <Col span="12">
                        <FormItem label="外文名:">
                            <Input v-model="info.foreign_name" placeholder="请输入外文名..."></Input>
                        </FormItem>
                        </Col>
                        <Col span="12">
                        <FormItem label="别名:">
                            <Input v-model="info.alias" placeholder="请输入别名..."></Input>
                        </FormItem>
                        </Col>
                        <Col span="12">
                        <FormItem label="性别:">
                            <Select v-model="info.gender" style="width:280px" placeholder="请选择性别...">
                                <Option :value="1">男</Option>
                                <Option :value="2">女</Option>
                            </Select>
                        </FormItem>
                        </Col>
                        <Col span="12">
                        <FormItem label="出生年月:">
                            <DatePicker type="date" placeholder="请选择出生年月..." style="width: 285px" v-model="info.birthday"></DatePicker>
                        </FormItem>
                        </Col>
                        <Col span="12">
                        <FormItem label="去世年月:">
                            <DatePicker type="date" placeholder="请选择去世年月..." style="width: 285px" v-model="info.deathday"></DatePicker>
                        </FormItem>
                        </Col>
                        <Col span="12">
                        <FormItem label="出生地:">
                            <Input v-model="info.birthplace" placeholder="请输入出生地..."></Input>
                        </FormItem>
                        </Col>
                        <Col span="12">
                        <FormItem label="国籍:">
                            <Input v-model="info.citizenship" placeholder="请输入国籍..."></Input>
                        </FormItem>
                        </Col>
                        <Col span="12">
                        <FormItem label="职业:">
                            <Input v-model="info.occupation" placeholder="请输入职业..."></Input>
                        </FormItem>
                        </Col>
                        <Col span="12">
                        <FormItem label="民族:">
                            <Input v-model="info.nationality" placeholder="请输入民族..."></Input>
                        </FormItem>
                        </Col>
                        <Col span="12">
                        <FormItem label="血型:">
                            <Input v-model="info.blood_group" placeholder="请输入血型..."></Input>
                        </FormItem>
                        </Col>
                        <Col span="12">
                        <FormItem label="身高:">
                            <Input v-model="info.height" placeholder="请输入身高..."></Input>
                        </FormItem>
                        </Col>
                        <Col span="12">
                        <FormItem label="体重:">
                            <Input v-model="info.weight" placeholder="请输入体重..."></Input>
                        </FormItem>
                        </Col>
                        <Col span="12">
                        <FormItem label="星座:">
                            <Input v-model="info.constellation" placeholder="请输入星座..."></Input>
                        </FormItem>
                        </Col>
                        <Col span="12">
                        <FormItem label="家庭成员:">
                            <Input v-model="info.relation" placeholder="请输入家庭成员..."></Input>
                        </FormItem>
                        </Col>
                        <Col span="12">
                        <FormItem label="出道时间:">
                            <DatePicker type="date" placeholder="请选择出道时间..." style="width: 285px" v-model="info.debut_time"></DatePicker>
                        </FormItem>
                        </Col>
                        <Col span="12">
                        <FormItem label="爱好:">
                            <Input v-model="info.hobby" placeholder="请输入爱好..."></Input>
                        </FormItem>
                        </Col>
                        <Col span="12">
                        <FormItem label="简介:">
                            <Input v-model="info.desc" type="textarea" :rows="4" placeholder="请输入简介..."></Input>
                        </FormItem>
                        </Col>
                        <Col span="12">
                        <FormItem label="备注:">
                            <Input v-model="info.notes" type="textarea" :rows="4" placeholder="请输入备注..."></Input>
                        </FormItem>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </div>
        <div style="clear: both;"></div>
        <div class="layout-person-table">
            <Table border :columns="columns1" :data="data1"></Table>
        </div>
        <!-- 分页 -->
        <div class="layout-person-page">
            <Page :total="total" :current="page" :page-size='pageSize' @on-change="changePage" show-elevator />
        </div>
        <!-- 修改 -->
        <div class="layout-person-edit">
            <Modal v-model="modalEdit" title="修改" width="800">
                <div slot="footer">
                    <a @click="modalEdit=false" class="span">取消</a>
                    <Button @click="editOk" type="primary">确定</Button>
                </div>
                <Form :model="edit" label-position="right" :label-width="100">
                    <Row>
                        <Col span="12">
                        <FormItem label="人物名称:">
                            <Input v-model="edit.name" placeholder="请输入人物名称..."></Input>
                        </FormItem>
                        </Col>
                        <Col span="12">
                        <FormItem label="头像">
                            <Upload :action="$config.BaseURLfile + '/common/upload/file'" :on-success="handleSuccess">
                                <Button icon="ios-cloud-upload-outline">上传头像</Button>
                            </Upload>
                        </FormItem>
                        </Col>
                        <Col span="12">
                        <FormItem label="外文名:">
                            <Input v-model="edit.foreign_name" placeholder="请输入外文名..."></Input>
                        </FormItem>
                        </Col>
                        <Col span="12">
                        <FormItem label="别名:">
                            <Input v-model="edit.alias" placeholder="请输入别名..."></Input>
                        </FormItem>
                        </Col>
                        <Col span="12">
                        <FormItem label="性别:">
                            <Select v-model="edit.gender" style="width:280px" placeholder="请选择性别...">
                                <Option :value="1">男</Option>
                                <Option :value="2">女</Option>
                            </Select>
                        </FormItem>
                        </Col>
                        <Col span="12">
                        <FormItem label="出生年月:">
                            <DatePicker type="date" placeholder="请选择出生年月..." style="width: 285px" v-model="edit.birthday"></DatePicker>
                        </FormItem>
                        </Col>
                        <Col span="12">
                        <FormItem label="去世年月:">
                            <DatePicker type="date" placeholder="请选择去世年月..." style="width: 285px" v-model="edit.deathday"></DatePicker>
                        </FormItem>
                        </Col>
                        <Col span="12">
                        <FormItem label="出生地:">
                            <Input v-model="edit.birthplace" placeholder="请输入出生地..."></Input>
                        </FormItem>
                        </Col>
                        <Col span="12">
                        <FormItem label="国籍:">
                            <Input v-model="edit.citizenship" placeholder="请输入国籍..."></Input>
                        </FormItem>
                        </Col>
                        <Col span="12">
                        <FormItem label="职业:">
                            <Input v-model="edit.occupation" placeholder="请输入职业..."></Input>
                        </FormItem>
                        </Col>
                        <Col span="12">
                        <FormItem label="民族:">
                            <Input v-model="edit.nationality" placeholder="请输入民族..."></Input>
                        </FormItem>
                        </Col>
                        <Col span="12">
                        <FormItem label="血型:">
                            <Input v-model="edit.blood_group" placeholder="请输入血型..."></Input>
                        </FormItem>
                        </Col>
                        <Col span="12">
                        <FormItem label="身高:">
                            <Input v-model="edit.height" placeholder="请输入身高..."></Input>
                        </FormItem>
                        </Col>
                        <Col span="12">
                        <FormItem label="体重:">
                            <Input v-model="edit.weight" placeholder="请输入体重..."></Input>
                        </FormItem>
                        </Col>
                        <Col span="12">
                        <FormItem label="星座:">
                            <Input v-model="edit.constellation" placeholder="请输入星座..."></Input>
                        </FormItem>
                        </Col>
                        <Col span="12">
                        <FormItem label="家庭成员:">
                            <Input v-model="edit.relation" placeholder="请输入家庭成员..."></Input>
                        </FormItem>
                        </Col>
                        <Col span="12">
                        <FormItem label="出道时间:">
                            <DatePicker type="date" placeholder="请选择出道时间..." style="width: 285px" v-model="edit.debut_time"></DatePicker>
                        </FormItem>
                        </Col>
                        <Col span="12">
                        <FormItem label="爱好:">
                            <Input v-model="edit.hobby" placeholder="请输入爱好..."></Input>
                        </FormItem>
                        </Col>
                        <Col span="12">
                        <FormItem label="简介:">
                            <Input v-model="edit.desc" type="textarea" :rows="4" placeholder="请输入简介..."></Input>
                        </FormItem>
                        </Col>
                        <Col span="12">
                        <FormItem label="备注:">
                            <Input v-model="edit.notes" type="textarea" :rows="4" placeholder="请输入备注..."></Input>
                        </FormItem>
                        </Col>
                    </Row>
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
                    name: '',
                    gender: ''
                },
                //保存图片url
                addUploadUrl: '',
                info: {},
                modalAdd: false,//添加
                edit: {},
                modalEdit: false,
                //分页
                pageSize: 30,
                page: 1,
                total: 0,
                id: '',//一整行id
                columns1: [
                    {
                        title: '人物ID',
                        key: 'person_id',
                        align: 'center'
                    },
                    {
                        title: '姓名',
                        key: 'name',
                        align: 'center'
                    },
                    {
                        title: '性别',
                        key: 'ISgender',
                        align: 'center'
                    },
                    {
                        title: '国籍',
                        key: 'citizenship',
                        align: 'center'
                    },
                    {
                        title: '出生日期',
                        key: 'Isbirthday',
                        align: 'center'
                    },
                    {
                        title: '职业',
                        key: 'occupation',
                        align: 'center'
                    },
                    {
                        title: '创建时间',
                        key: 'create_time',
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
                                            this.modify(params.row)
                                        }
                                    }
                                }, '修改')
                            ]);
                        }
                    }
                ],
                data1: []
            }
        },
        methods: {
            //添加上传成功
            handleSuccess(res, file) {
                console.log(res)
                this.addUploadUrl = res.data.url
                console.log(this.addUploadUrl);
            },
            getTableList() {
                let self = this;
                self.$http(this.$config.BaseURL1 + '/media/v2/person/list?name=' + self.search.name + '&gender=' + self.search.gender + '&page=' + self.page + '&pageSize=' + self.pageSize).then(response => {
                    if (response.data.errno == 10000) {
                        self.total = response.data.data.total;
                        self.data1 = response.data.data.list;
                        response.data.data.list.forEach(val => {
                            if (val.gender == 1) {
                                val.ISgender = '男'
                            } else if (val.gender == 2) {
                                val.ISgender = '女'
                            }

                            // //时间转换
                            val.Isbirthday = moment(val.birthday * 1000).format(
                                "YYYY-MM-DD HH:mm:ss"
                            )
                        });
                    } else {
                        // 提示 response.data.errmsg
                        this.$Message.info(response.data.errmsg)
                    }
                }, response => { })
            },
            query() {
                this.page = 1;
                this.getTableList()
            },
            //添加确定按钮
            addOk() {
                let self = this;
                self.info.portrait = this.addUploadUrl;

                //时间转换
                this.info.birthday = moment(this.info.birthday*1).format(
                    "X"
                )
                this.info.deathday = moment(this.info.deathday*1).format(
                    "X"
                )
                this.info.debut_time = moment(this.info.debut_time*1).format(
                    "X"
                )

                self.info.birthday = self.info.birthday * 1
                self.info.deathday = self.info.deathday * 1
                self.info.debut_time = self.info.debut_time * 1
                self.info.height = self.info.height * 1
                self.info.weight = self.info.weight * 1

                self.$http.post(this.$config.BaseURL1 + '/media/v2/person/modify', self.info).then(response => {
                    if (response.data.errno == 10000) {
                        this.info = {};
                        this.modalAdd = false;
                        this.getTableList();
                        this.$Message.info('添加成功!')
                    } else { }
                }, response => { })
            },
            // 添加取消按钮
            addCancel() {
                this.info = {};
                this.modalAdd = false;
            },
            //修改弹框
            modify(row) {
                console.log(row)
                let self = this;
                this.id = row.person_id;
                self.$http(this.$config.BaseURL1 + '/media/v2/person/detail?person_id=' + row.person_id).then(response => {
                    console.log(response)
                    if (response.data.errno == 10000) {
                        self.edit = response.data.data;
                    } else { }
                }, response => { })
                console.log(self.edit)
                // this.edit = row;
                this.modalEdit = true;
            },
            //修改确定按钮
            editOk() {
                let self = this;
                self.$http.post(this.$config.BaseURL1 + '/media/v2/person/modify?person_id=' + self.id, self.edit).then(response => {
                    if (response.data.errno == 10000) {
                        this.edit = {};
                        this.modalEdit = false;
                        this.$Message.success('修改成功！');
                    } else { }
                }, response => { })
            },
            //分页
            changePage(page) {
                this.page = page;
                this.getTableList()
            }
        },
        mounted() {
            this.getTableList()
        }
    }
</script>