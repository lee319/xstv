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
                <dropdown-item name="synonym">同义词</dropdown-item>
                <!-- <dropdown-item name="topList">top排行</dropdown-item> -->
                <dropdown-item name="upNode">修改标签</dropdown-item>
                <dropdown-item name="delNode">删除标签</dropdown-item>
            </dropdown-menu>
        </Dropdown>

        <div id="jsmind_container" @contextmenu.prevent="rightClick">
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
                    <Input v-model="synonymEdit.tag_id" placeholder="请输入标签名称..."></Input>
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
                addNodeInfo: {},//添加子节点
                synonymModel: false,
                synonymEdit: {},//修改同义词
                upNodeModel: false,
                upNodeEdit: {},//修改标签
                tabId: 1,//tab页id
                // 全局拓扑对象
                jm: {},
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
                        id: "root", topic: "电影", children: []
                    }
                },
                options: {
                    container: 'jsmind_container',
                    theme: 'orange',
                    editable: true,
                    default_event_handle: { enable_dblclick_handle: false }
                }
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
                this.getjsMindList()
            },
            rightClick: function (event) {
                let selectdNode = this.jm.get_selected_node();
                if (!selectdNode) {
                    return;
                }
                console.log(event)
                //每次展开前重置visible状态测试无效，但控制台直接调用却有效
                //_this.$refs.menu.currentVisible = false;
                this.$refs.menu.$refs.reference = event.target;
                this.$refs.menu.currentVisible = true;
            },
            // 右键菜单点击
            rightMenuClick(name) {
                // let selectdNode = this.jm.get_selected_node();
                // if(!selectdNode){
                //     return;
                // }
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
                    default:
                        break;
                }

            },
            // 添加节点
            addNode() {
                let selectdNode = this.jm.get_selected_node();
                if (!!selectdNode) {
                    // this.$Message.info(selectdNode.topic);
                    this.addNodeInfo = {
                        name: '',
                        parent: selectdNode.topic,
                        selectdNode: selectdNode,
                        desc: ''
                    };
                }
                console.log(selectdNode);
            },
            // 修改同义词
            synonym() {
                let selectdNode = this.jm.get_selected_node();
                if (!!selectdNode) {
                    // this.$Message.info(selectdNode.topic);
                    this.synonymEdit = {
                        tag_id: '',
                        tag_alias: '',
                        selectdNode: selectdNode
                    };
                }
                console.log(selectdNode);
            },
            // 修改标签
            upNode() {
                let selectdNode = this.jm.get_selected_node();
                if (!!selectdNode) {
                    // this.$Message.info(selectdNode.topic);
                    this.upNodeEdit = {
                        name: '',
                        selectdNode: selectdNode,
                        desc: ''
                    };
                }
                console.log(selectdNode);
            },
            // 添加弹框确定按钮事件
            okAddNode() {
                let self = this;
                if (this.addNodeInfo.name == '') {
                    this.$Message.info('节点名不能为空');
                    return;
                }
                self.$http.post(this.$config.BaseURL7 + '/media/v2/xstag/modify', self.addNodeInfo).then(response => {
                    if (response.data.errno == 10000) {
                        this.addNodeInfo = '';
                        this.getjsMindList();
                        this.$Message.success('添加成功！')
                    }
                })

                let nodeid = jsMind.util.uuid.newid();
                this.jm.add_node(this.addNodeInfo.selectdNode, nodeid, this.addNodeInfo.name);
            },
            // 修改同义词确定按钮
            okSynonym() { },
            // 修改标签确定按钮
            okUpNode() { },
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
            }
        },
        mounted() {
            this.jm = new jsMind(this.options);
            this.getjsMindList();
        }
    }
</script>