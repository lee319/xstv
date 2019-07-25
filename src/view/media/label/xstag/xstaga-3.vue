<style scoped>
    #jsmind_container {
        width: 100%;
        height: 100%;
    }
</style>


<template>
    <div style="width: 100%;height: 100%;">
        <!-- v-model="" -->
        <Tabs type="card" @on-click="tabChange">
            <TabPane label="电影"></TabPane>
            <TabPane label="电视剧"></TabPane>
            <TabPane label="综艺"></TabPane>
            <TabPane label="动漫"></TabPane>
            <TabPane label="纪录片"></TabPane>
        </Tabs>
        <Dropdown ref="menu" trigger="contextMenu" placement="right" @on-click="rightMenuClick">
            <dropdown-menu slot="list">
                <dropdown-item name="addNode">添加子标签</dropdown-item>
                <dropdown-item name="synonym" v-if="nodeType != 'category'">同义词</dropdown-item>
                <!-- <dropdown-item name="topList">top排行</dropdown-item> -->
                <dropdown-item name="upNode" v-if="nodeType != 'category'">修改标签</dropdown-item>
                <dropdown-item name="delNode" v-if="nodeType != 'category'">删除标签</dropdown-item>
            </dropdown-menu>
        </Dropdown>
        <!-- top排行榜 -->
        <div id="jsmind_container" @contextmenu.prevent="rightClick" @click="leftClick">
            <Drawer title="top排行" :closable="false" v-model="value1" width="600">
                <div style="float:right;">
                    <Button type="primary" @click="modalDetailsBtn">修改top榜</Button>
                    <Modal v-model="modalDetails" title="top榜" width="1100">
                        <Form :model="news" inline>
                            <FormItem label="标签:" :label-width="40">
                                <Input v-model="news.tag_id" disabled style="width:200px;"></Input>
                            </FormItem>
                        </Form>
                        <div style="float:left;">
                            <Form :model="search" inline>
                                <FormItem label="节目名称:" :label-width="70">
                                    <Input v-model="search.title" placeholder="请输入节目名称..."></Input>
                                </FormItem>
                                <FormItem label="年代:" :label-width="50">
                                    <Input v-model="search.year" placeholder="请输入年代..."></Input>
                                </FormItem>
                                <FormItem label="是否关联媒资:" :label-width="100">
                                    <Select v-model="search.is_relation" style="width:200px" placeholder="请选择是否关联媒资...">
                                        <Option value="">全部</Option>
                                        <Option :value="1">是</Option>
                                        <Option :value="2">否</Option>
                                    </Select>
                                </FormItem>
                                <FormItem>
                                    <Button type="primary" @click="query">搜索</Button>
                                </FormItem>
                            </Form>
                        </div>
                        <div style="float:right">
                            <Button type="success" @click="modalAdd = true;info.media_id=0;">添加</Button>
                            <Modal v-model="modalAdd" title="添加" @on-ok="okAdd">
                                <Form :model="info" label-position="right" :label-width="100">
                                    <FormItem label="标签:">
                                        <Input v-model="news.tag_id" disabled></Input>
                                    </FormItem>
                                    <FormItem label="节目分类:">
                                        <Input v-model="news.category_id" disabled></Input>
                                    </FormItem>
                                    <FormItem label="节目名称:">
                                        <Input v-model="info.title" placeholder="请输入节目名称..."></Input>
                                    </FormItem>
                                    <FormItem label="导演:">
                                        <Input v-model="info.director" placeholder="请输入导演..."></Input>
                                    </FormItem>
                                    <FormItem label="年代:">
                                        <Input v-model="info.year" placeholder="请输入年代..."></Input>
                                    </FormItem>
                                    <FormItem label="排序:">
                                        <Input v-model="info.sort" placeholder="请输入排序..."></Input>
                                    </FormItem>
                                    <FormItem label="关联媒资信息:" inline>
                                        <Input v-model="info.media_name" style="float:left;"></Input>
                                        <Button type="primary" @click="modalChange = true;getProductList()" size="small">修改</Button>
                                        <Modal v-model="modalChange" title="媒资信息" width="600" @on-ok="okProgramOne">
                                            <Table border :columns="columns3" :data="data3" :highlight-row="true"
                                                @on-row-click="programOne"></Table>
                                        </Modal>
                                    </FormItem>
                                </Form>
                            </Modal>
                        </div>
                        <!-- 修改 -->
                        <Modal v-model="modalEdit" title="修改" @on-ok="okEdit">
                            <Form :model="edit" label-position="right" :label-width="100">
                                <FormItem label="标签:">
                                    <Input v-model="edit.input1" disabled></Input>
                                </FormItem>
                                <FormItem label="节目名称:">
                                    <Input v-model="edit.title" placeholder="请输入节目名称..."></Input>
                                </FormItem>
                                <FormItem label="节目分类:">
                                    <Input v-model="edit.category_id" disabled></Input>
                                </FormItem>
                                <FormItem label="导演:">
                                    <Input v-model="edit.director" placeholder="请输入导演..."></Input>
                                </FormItem>
                                <FormItem label="年代:">
                                    <Input v-model="edit.year" placeholder="请输入年代..."></Input>
                                </FormItem>
                                <FormItem label="排序:">
                                    <Input v-model="edit.sort" placeholder="请输入排序..."></Input>
                                </FormItem>
                                <FormItem label="关联媒资信息:" inline>
                                    <Input v-model="edit.media_name" style="float:left;"></Input>
                                    <Button type="primary" @click="modalChange = true;getProductList()" size="small">修改</Button>
                                    <Modal v-model="modalChange" title="媒资信息" width="600" @on-ok="okProgramOne">
                                        <div>
                                            <Form :model="searchProgram" inline>
                                                <FormItem label="节目名称:" :label-width="70">
                                                    <Input v-model="searchProgram.title" placeholder="请输入节目名称..."></Input>
                                                </FormItem>
                                                <FormItem label="导演:" :label-width="40">
                                                    <Input v-model="searchProgram.directors" placeholder="请输入导演..."></Input>
                                                </FormItem>
                                                <FormItem>
                                                    <Button type="primary" @click="queryProgram">搜索</Button>
                                                </FormItem>
                                            </Form>
                                        </div>
                                        <Table border :columns="columns3" :data="data3" :highlight-row="true"
                                            @on-row-click="programOne"></Table>

                                        <div style="float:right;margin-top:10px;">
                                            <Page :total="total" :current="page" :page-size='pageSize' @on-change="changePage"
                                                show-elevator />
                                        </div>
                                        <div style="margin-top:30px;clear:both"></div>
                                    </Modal>
                                </FormItem>
                            </Form>
                        </Modal>

                        <div style="clear:both;"></div>
                        <div>
                            <Table border :columns="columns2" :data="data2"></Table>
                        </div>
                    </Modal>
                </div>
                <div style="clear:both;"></div>
                <div style="margin-top:10px;">
                    <Table border :columns="columns1" :data="data1"></Table>
                </div>
            </Drawer>
        </div>
        <!-- 添加子标签 -->
        <Modal v-model="addNodeModel" title="添加子标签" @on-ok="okAddNode">
            <Form :model="addNodeInfo" label-position="right" :label-width="100">
                <FormItem label="标签名称:">
                    <Input v-model="addNodeInfo.name" placeholder="请输入标签名称..."></Input>
                </FormItem>
                <FormItem label="上级标签:">
                    <Input v-model="addNodeInfo.parent" readonly></Input>
                </FormItem>
                <FormItem label="标签描述:">
                    <Input type="textarea" :rows="4" v-model="addNodeInfo.desc" placeholder="请输入标签描述..."></Input>
                </FormItem>
            </Form>
        </Modal>
        <!-- 修改同义词 -->
        <Modal v-model="synonymModel" title="修改同义词" @on-ok="okSynonym">
            <Form :model="synonymEdit" label-position="right" :label-width="100">
                <FormItem label="标签名称:">
                    <Input v-model="synonymEdit.name" placeholder="请输入标签名称..." disabled></Input>
                </FormItem>
                <FormItem label="同义词:">
                    <Input type="textarea" :rows="4" v-model="synonymEdit.tag_alias" placeholder="请输入同义词..."></Input>
                </FormItem>
            </Form>
        </Modal>
        <!-- 修改标签 -->
        <Modal v-model="upNodeModel" title="修改标签" @on-ok="okUpNode">
            <Form :model="upNodeEdit" label-position="right" :label-width="100">
                <FormItem label="标签名称:">
                    <Input v-model="upNodeEdit.name"></Input>
                </FormItem>
                <FormItem label="上级标签:">
                    <Input v-model="upNodeEdit.parent" readonly></Input>
                </FormItem>
                <FormItem label="标签描述:">
                    <Input type="textarea" :rows="4" v-model="upNodeEdit.desc"></Input>
                </FormItem>
            </Form>
        </Modal>

    </div>
</template>

<script>
    import "jsmind/style/jsmind.css";
    import jsMind from "jsmind";
    export default {
        data: function () {
            return {
                addNodeModel: false,
                addNodeInfo: {}, //添加子节点
                synonymModel: false,
                synonymEdit: {}, //修改同义词
                upNodeModel: false,
                upNodeEdit: {}, //修改标签
                tabId: 1, //tab页id
                nodeType: '', // 右键菜单时，父级类型
                selectdNode: null, // 选中的节点
                aaa: null,

                total: 0,//分页
                page: 1,
                pageSize: 10,

                programOneRow: {},
                news: {
                    tag_id: '',
                    category_id: ''
                }, //标签
                search: {
                    title: '',
                    year: '',
                    is_relation: ''
                }, //top榜搜索
                searchProgram: {
                    title: '',
                    directors: ''
                },//成品搜索
                modalDetails: false, //修改top榜
                info: {},
                modalAdd: false, //添加
                modalChange: false,
                edit: {},
                modalEdit: false, //修改
                // 全局拓扑对象
                jm: {},
                value1: false,
                mind: {
                    // 3 data formats were supported ...
                    // see Documents for more information
                    meta: {
                        "name": "test",
                        "author": "vivi",
                        "version": 'v1.0.0'
                    },
                    format: "node_tree",
                    data: {
                        id: "root",
                        topic: "电影",
                        children: []
                    }
                },
                options: {
                    container: 'jsmind_container',
                    theme: 'orange',
                    editable: true,
                    default_event_handle: {
                        enable_dblclick_handle: false
                    }
                },
                columns1: [{
                    title: '节目名称',
                    key: 'title',
                    align: 'center',
                    width: 130
                },
                {
                    title: '导演',
                    key: 'director',
                    align: 'center'
                },
                {
                    title: '上映年代',
                    key: 'year',
                    align: 'center'
                },
                {
                    title: '关联媒资',
                    key: 'is_is_relation',
                    align: 'center'
                }
                ],
                data1: [],
                columns2: [{
                    title: '序号',
                    type: 'index',
                    width: 70,
                    align: 'center'
                },
                {
                    title: '节目名称',
                    key: 'title',
                    align: 'center',
                    width: 130
                },
                {
                    title: '排序ID',
                    key: 'sort',
                    align: 'center'
                },
                {
                    title: '导演',
                    key: 'director',
                    align: 'center'
                },
                {
                    title: '上映年代',
                    key: 'year',
                    align: 'center'
                },
                {
                    title: '关联媒资',
                    key: 'is_is_relation',
                    align: 'center'
                },
                {
                    title: '操作',
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
                            )
                        ]);
                    }
                }
                ],
                data2: [],
                columns3: [{
                    title: '序号',
                    type: 'index',
                    width: 70,
                    align: 'center'
                },
                {
                    title: '节目名称',
                    key: 'title',
                    align: 'center',
                    width: 130
                },
                {
                    title: '导演',
                    key: 'directors',
                    align: 'center'
                },
                {
                    title: '年代',
                    key: 'publish_year',
                    align: 'center'
                },
                {
                    title: '语言',
                    key: 'language',
                    align: 'center'
                }
                ],
                data3: []
            }
        },

        methods: {
            //tab切换
            tabChange(name) {
                let self = this;
                if (name == 0) {
                    self.tabId = 1;
                } else if (name == 1) {
                    self.tabId = 2;
                } else if (name == 2) {
                    self.tabId = 6;
                } else if (name == 3) {
                    self.tabId = 4
                } else if (name == 4) {
                    self.tabId = 3;
                }
                console.log(name);
                this.getjsMindList()
            },
            rightClick: function (event) {
                let selectdNode = this.jm.get_selected_node();
                if (!selectdNode) {
                    return;
                }
                console.log(selectdNode)
                console.log(event)
                this.nodeType = selectdNode.data.type;
                // console.log(this.nodeType)
                //每次展开前重置visible状态测试无效，但控制台直接调用却有效
                //_this.$refs.menu.currentVisible = false;
                this.$refs.menu.$refs.reference = event.target;
                this.$refs.menu.currentVisible = true;


            },
            // 右键菜单点击
            rightMenuClick(name) {
                let selectdNode = this.jm.get_selected_node();
                if (!selectdNode) {
                    return;
                }
                this.selectdNode = selectdNode; // 保存右键选择节点



                switch (name) {
                    case 'addNode':
                        this.addNodeModel = true;
                        this.addNode();
                        break;
                    case 'synonym':
                        this.synonymModel = true;
                        this.synonym()
                        break;
                    case 'upNode':
                        this.upNodeModel = true;
                        this.upNode()
                        break;
                    case 'delNode':
                        this.delNode()
                        break;
                    default:
                        break;
                }

            },
            // 添加节点
            addNode() {
                this.addNodeInfo = {
                    name: '',
                    parent: this.selectdNode.topic,
                    desc: ''
                };
                console.log(this.selectdNode);
            },
            // 修改同义词
            synonym() {
                this.synonymEdit = {
                    tag_id: this.selectdNode.data.aid,
                    name: this.selectdNode.topic,
                    tag_alias: '',
                };
                console.log(this.selectdNode);
            },
            // 修改标签
            upNode() {
                this.upNodeEdit = {
                    name: this.selectdNode.topic,
                    desc: this.selectdNode.data.desc,
                    cid: this.selectdNode.data.cid,
                    parrent_id: this.selectdNode.data.parrent_id,
                    id: this.selectdNode.data.aid,
                    parent: this.selectdNode.parent.topic
                };
                console.log(this.selectdNode);
            },
            // 添加弹框确定按钮事件
            okAddNode() {
                if (this.addNodeInfo.name == '') {
                    this.$Message.info('节点名不能为空');
                    return;
                }
                this.addNodeInfo.cid = this.selectdNode.data.cid;
                this.addNodeInfo.parrent_id = this.selectdNode.data.aid;
                this.$http.post(this.$config.BaseURL7 + '/media/v2/xstag/modify', this.addNodeInfo).then(response => {
                    if (response.data.errno == 10000) {
                        this.getjsMindList();
                        this.$Message.success('添加成功！')
                    }
                })
            },
            // 修改同义词确定按钮
            okSynonym() {
                this.$http.post(this.$config.BaseURL7 + '/media/v2/xstag/synonym', this.synonymEdit).then(response => {
                    if (response.data.errno == 10000) {
                        this.getjsMindList();
                        this.$Message.success('修改成功！')
                    }
                })
            },
            // 修改标签确定按钮
            okUpNode() {
                this.$http.post(this.$config.BaseURL7 + '/media/v2/xstag/modify', this.upNodeEdit).then(response => {
                    if (response.data.errno == 10000) {
                        this.getjsMindList();
                        this.$Message.success('修改成功！')
                    }
                })
            },
            // 拓扑图数据
            getjsMindList() {
                let self = this;
                self.$http(this.$config.BaseURL7 + '/media/v2/xstag/list?category_id=' + self.tabId).then(response => {
                    if (response.data.errno == 10000) {
                        console.log(response)
                        self.mind.data = response.data.data[0];
                        console.log(self.mind.data.children)
                        this.mind.data.children.forEach((v, k) => {
                            v.direction = k % 2 == 0 ? "right" : "left";
                            this.mind.data.children[k] = v;
                        });
                        this.jm.show(this.mind);
                        // console.log(this.mind.data)
                    }
                })
            },
            //删除
            delNode() {
                this.$http.post(this.$config.BaseURL7 + '/media/v2/xstag/delete', {
                    id: this.selectdNode.data.aid
                }).then(response => {
                    if (response.data.errno == 10000) {
                        this.getjsMindList();
                        this.$Message.success('删除成功！')
                    }
                })
            },
            // 点击节点
            leftClick() {
                let selectdNode = this.jm.get_selected_node();
                if (!selectdNode) {
                    return;
                }
                this.aaa = selectdNode;
                this.getTableList();
                console.log(this.aaa)
                // this.$Message.info("点击了", selectdNode.topic)
                this.value1 = true;
            },
            //top榜表格数据
            getTableList() {
                if (this.search.status == undefined) {
                    this.search.status = ""
                }
                this.$http(this.$config.BaseURL7 + '/media/v2/xstag/toplist?tag_id=' + this.aaa.data.aid + '&title=' + this.search
                    .title + '&year=' + this.search.year + '&is_relation=' + this.search.is_relation).then(response => {
                        if (response.data.errno == 10000) {
                            console.log(response);
                            this.data1 = response.data.data.list;
                            this.data2 = response.data.data.list
                            response.data.data.list.forEach(val => {
                                // 1:是 2:否
                                if (val.is_relation == 1) {
                                    val.is_is_relation = "是"
                                } else if (val.is_relation == 2) {
                                    val.is_is_relation = "否"
                                }

                            });
                        }
                    })
            },
            // 搜索
            query() {
                this.getTableList()
            },
            // 修改top榜按钮
            modalDetailsBtn() {
                this.news.tag_id = this.aaa.topic;
                this.news.category_id = this.tabId;
                console.log(this.news);
                this.modalDetails = true;
            },
            //   成品媒资
            getProductList() {
                this.$http(this.$config.BaseURL1 + "/media/v2/complete/program/list?title=" + this.searchProgram.title + '&directors=' + this.searchProgram.directors + '&page=' + this.page + '&pageSize=' + this.pageSize).then(response => {
                    if (response.data.errno == 10000) {
                        console.log(response);
                        this.data3 = response.data.data.list;

                        this.total = response.data.data.total;
                    }
                })
            },
            // 搜索
            queryProgram() {
                this.page = 1;
                this.getProductList();
            },
            //分页
            changePage(page) {
                this.page = page;
                this.getProductList();
            },
            programOne(row, index) {
                console.log(row);
                this.programOneRow = row;
            },
            //修改确定按钮
            okProgramOne() {
                this.info.media_name = this.programOneRow.title;
                this.info.media_id = this.programOneRow.id;

                this.edit.media_name = this.programOneRow.title;
                this.edit.media_id = this.programOneRow.id;
            },
            //添加确定按钮
            okAdd() {
                if (this.info.media_id == 0) {
                    this.info.is_relation = 2
                } else {
                    this.info.is_relation = 1
                }
                this.info.year *= 1;
                this.info.sort *= 1;
                this.info.tag_id = this.aaa.data.aid;
                this.info.category_id = this.aaa.data.cid;
                this.$http.post(this.$config.BaseURL7 + '/media/v2/xstag/topmodify', this.info).then(response => {
                    if (response.data.errno == 10000) {
                        this.info = {};
                        this.getTableList();
                        this.$Message.success('添加成功！')
                    }
                })
            },
            //   修改弹框
            modify(row) {
                console.log(row)
                this.edit = row;
                this.modalEdit = true;

            },
            //   修改确定
            okEdit() {
                if (this.edit.media_id == 0) {
                    this.edit.is_relation = 2
                } else {
                    this.edit.is_relation = 1
                }

                this.$http.post(this.$config.BaseURL7 + '/media/v2/xstag/topmodify', this.edit).then(response => {
                    if (response.data.errno == 10000) {
                        this.getTableList();
                        this.$Message.success('修改成功！')
                    }
                })
            },
            //删除
            remove(row) {
                this.$http.post(this.$config.BaseURL7 + '/media/v2/xstag/topdelete', {
                    id: row.id
                }).then(response => {
                    if (response.data.errno == 10000) {
                        this.getTableList();
                        this.$Message.success('删除成功！')
                    }
                })
            }
        },
        mounted() {
            this.jm = new jsMind(this.options);
            this.getjsMindList();
            // this.getTableList();

        }
    }

</script>