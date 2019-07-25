<template>
  <div class="user-avator-dropdown">
    <Dropdown @on-click="handleClick">
      <div style="float:left;">{{userName}}</div>
      <Icon :size="18" type="md-arrow-dropdown"></Icon>
      <DropdownMenu slot="list">
        <DropdownItem>
          <div @click="modalEditBtn">修改密码</div>
          <Modal v-model="modalEdit" title="修改密码">
            <div slot="footer">
              <a @click="modalEdit=false" class="span">取消</a>
              <Button @click="editOk" type="primary">确定</Button>
            </div>
            <Form :model="edit" label-position="right" :label-width="100">
              <FormItem label="ID">
                <Input v-model="edit.id" placeholder="请输入id..." disabled></Input>
              </FormItem>
              <FormItem label="用户名:">
                <Input v-model="edit.username" placeholder="请输入用户名..." disabled></Input>
              </FormItem>
              <FormItem label="密码:">
                <Input v-model="edit.passwd" placeholder="请输入密码..." type="password"></Input>
              </FormItem>
              </FormItem>
            </Form>
          </Modal>
        </DropdownItem>
        <DropdownItem name="logout">退出登录</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  </div>
</template>

<script>
  import './user.less'

  import { mapActions } from 'vuex'
  export default {
    data() {
      return {
        edit: {
          id: this.$store.state.user.userId,
          username: this.$store.state.user.userName
        },
        modalEdit: false
      }
    },
    name: 'User',
    props: {
      userName: {
        type: String,
        default: ''
      }
    },
    methods: {
      ...mapActions([
        'handleLogOut'
      ]),
      handleClick(name) {
        switch (name) {
          case 'logout':
            this.handleLogOut().then(() => {
              this.$router.push({
                name: 'login'
              })
            })
            break
        }
      },
      modalEditBtn() {
        this.modalEdit = true;
        this.edit.id = this.$store.state.user.userId;
        this.edit.username = this.$store.state.user.userName
      },
      //修改确定
      editOk() {
        let self = this; 
        self.$http.post(this.$config.BaseURL3 + '/cmsuser/changepasswd', self.edit).then(response => {
          console.log(self.edit)
          if (response.data.errno == 10000) {
            this.edit = {};
            this.modalEdit = false;
            this.$Message.success('修改成功!');
          }
        }, response => { })
      },
    }
  }
</script>