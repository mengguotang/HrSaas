<template>
  <el-dialog title="分配角色" :visible="showRoleDialog" @close="btnCancel">
    <!-- 分配角色 -->
    <el-checkbox-group v-model="roleIds">
      <el-checkbox
        v-for="item in list"
        :key="item.id"
        :label="item.id"
      >
        {{ item.name }}
      </el-checkbox>
    </el-checkbox-group>
    <el-row slot="footer" type="flex" justify="center">
      <el-col>
        <el-button
          type="primary"
          size="small"
          @click="btnOK"
        >
          确定
        </el-button>
        <el-button size="small" @click="btnCancel">取消</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import { getRoleList } from '@/api/setting'
import { getUserDetailById } from '@/api/user'
import { assignRoles } from '@/api/employees'
export default {
  props: {
    showRoleDialog: {
      type: Boolean,
      default: false
    },
    userId: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      list: [], // 存储角色列表
      roleIds: []
    }
  },
  created() {
    this.getRoleList() // 获取角色列表
  },
  methods: {
    // 获取角色列表
    async getRoleList() {
      const { rows } = await getRoleList()
      this.list = rows
    },
    async getUserDetailById(id) {
      const { roleIds } = await getUserDetailById(id)
      this.roleIds = roleIds
    },
    async btnOK() {
      await assignRoles({ id: this.userId, roleIds: this.roleIds })
      // 关闭弹窗
      this.$emit('update:showRoleDialog', false)
      this.$message({
        type: 'success',
        message: '操作成功'
      })
    },
    btnCancel() {
      // 清空数据
      this.roleIds = []
      this.$emit('update:showRoleDialog', false)
    }
  }
}
</script>

<style>

</style>
