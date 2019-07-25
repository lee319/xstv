<style>
    .layout-layoutbucket-list {
        margin: 10px;
    }

    .template p {
        float: left;
        border: 5px solid #eeeeee;
        background-color: #fff;
    }

    /* .template2 {
        display: none;
    } */
</style>
<template>
    <div class="layout-layoutbucket">
        <div class="layout-layoutbucket-list">
            <Card style="width:100%;background-color: #eeeeee;margin: 10px;" v-for="item in list">
                <Row>
                    <Col span="2">
                    <Row>
                        <Col span="24">
                        <p>ID:{{item._index}}</p>
                        </Col>
                        <Col span="24">
                        <p>名称:{{item._name}}</p>
                        </Col>
                    </Row>
                    </Col>
                    <Col span="22">
                    <div class="template">
                        <!-- 模版1 -->
                        <div class="template1" v-if="item._index == 1">
                            <p style="width:280px;height:160px;"></p>
                            <p style="width:280px;height:160px;"></p>
                            <p style="width:280px;height:160px;"></p>
                            <p style="width:280px;height:160px;"></p>
                        </div>
                        <!-- 模版2 -->
                        <div class="template2" v-if="item._index == 2">
                            <p style="width:370px;height:150px;"></p>
                            <p style="width:370px;height:150px;"></p>
                            <p style="width:370px;height:150px;"></p>
                        </div>
                        <!-- 模版3 -->
                        <div class="template3" v-if="item._index == 3">
                            <p style="width:370px;height:150px;"></p>
                            <p style="width:370px;height:150px;"></p>
                            <p style="width:370px;height:150px;"></p>
                            <p style="width:370px;height:150px;"></p>
                            <p style="width:370px;height:150px;"></p>
                            <p style="width:370px;height:150px;"></p>
                        </div>
                        <!-- 模版4 -->
                        <!-- 模版5 -->

                    </div>
                    </Col>
                </Row>
            </Card>
        </div>
    </div>
</template>
<script>
export default {
  data () {
    return {
      list: []
    }
  },
  methods: {
    getList () {
      // /staticpromotion/layoutbucket/list
      let self = this
      self.$http(this.$config.BaseURL16 + '/staticpromotion/layoutbucket/list').then(response => {
        if (response.data.errno == 10000) {
          console.log(response)
          self.list = response.data.data
        }
      }, response => { })
    }
  },
  mounted () {
    this.getList()
  }
}
</script>
