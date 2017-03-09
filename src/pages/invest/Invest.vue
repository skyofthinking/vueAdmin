<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input v-model="filters.name" placeholder="名称"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="handleQuery">查询</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="handleInsert">新增</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<!--列表-->
		<el-table :data="dataList" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
			<el-table-column type="selection" width="55"></el-table-column>
			<el-table-column type="index" width="60"></el-table-column>
			<el-table-column prop="name" label="名称" width="120" sortable></el-table-column>
			<el-table-column prop="code" label="代码" width="100" sortable></el-table-column>
			<el-table-column label="操作" width="150">
				<template scope="scope">
					<el-button size="small" @click="handleUpdate(scope.$index, scope.row)">编辑</el-button>
					<el-button type="danger" size="small" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>

		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-button type="danger" @click="handleBatchDelete" :disabled="this.sels.length===0">批量删除</el-button>
			<el-pagination layout="prev, pager, next" @current-change="handlePage" :page-size="pageSize" :total="total" style="float:right;">
			</el-pagination>
		</el-col>

		<!--保存界面-->
		<el-dialog title="保存" v-model="saveFormVisible" :close-on-click-modal="false">
			<el-form :model="saveForm" label-width="80px" :rules="saveFormRules" ref="saveForm">
				<el-form-item label="名称" prop="name">
					<el-input v-model="saveForm.name" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="代码" prop="code">
					<el-input v-model="saveForm.code" auto-complete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="saveFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="saveSubmit" :loading="saveLoading">提交</el-button>
			</div>
		</el-dialog>
	</section>
</template>

<script>
	import util from '../../common/js/util'
	import NProgress from 'nprogress'
	import { pageInvest, deleteInvest, batchDeleteInvest, updateInvest, insertInvest } from '../../api/invest';

	export default {
		data() {
			return {
				filters: {
					name: ''
				},

				dataList: [],

				total: 0,
				pageSize: 0,
				page: 1,
				listLoading: false,
				sels: [], // 列表选中列

				saveFormVisible: false, // 编辑界面是否显示
				saveLoading: false,
				saveFormRules: {
					name: [
						{ required: true, message: '请输入名称', trigger: 'blur' }
					]
				},
				//编辑界面数据
				saveForm: {
					id: '',
					name: '',
					code: ''
				}
			}
		},
		methods: {
			// 分页查询
			handlePage(val) {
				this.page = val;
				this.handleQuery();
			},
			// 获取列表
			handleQuery() {
				let para = {
					page: this.page,
					name: this.filters.name
				};
				this.listLoading = true;
				NProgress.start();
				pageInvest(para).then((res) => {
					this.total = res.data.total;
					this.pageSize = res.data.pageSize;
					this.dataList = res.data.dataList;
					this.listLoading = false;
					NProgress.done();
				});
			},
			// 删除
			handleDelete: function (index, row) {
				this.$confirm('确认删除该记录吗?', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
					NProgress.start();
					let para = { objectId: row.objectId };
					deleteInvest(para).then((res) => {
						this.listMsg('成功', '删除成功', 'success');
					});
				}).catch(() => {

				});
			},
			// 显示编辑界面
			handleUpdate: function (index, row) {
				this.saveFormVisible = true;
				this.saveForm = Object.assign({}, row);
			},
			// 显示新增界面
			handleInsert: function () {
				this.saveFormVisible = true;
				this.saveForm = {
					objectId: '',
					name: '',
					code: ''
				};
			},
			//编辑
			saveSubmit: function () {
				this.$refs.saveForm.validate((valid) => {
					if (valid) {
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							this.saveLoading = true;
							NProgress.start();
							let para = Object.assign({}, this.saveForm);
							if (para.objectId != '') {
								updateInvest(para).then((res) => {
									this.saveOrUpdateMsg('成功', '修改提交成功', 'success');
								});
							} else {
								insertInvest(para).then((res) => {
									this.saveOrUpdateMsg('成功', '增加提交成功', 'success');
								});
							}
						});
					}
				});
			},
			selsChange: function (sels) {
				this.sels = sels;
			},
			//批量删除
			handleBatchDelete: function () {
				var objectIds = this.sels.map(item => item.objectId).toString();
				this.$confirm('确认删除选中记录吗？', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
					NProgress.start();
					let para = { objectIds: objectIds };
					batchDeleteInvest(para).then((res) => {
						this.listMsg('成功', '删除成功', 'success');
					});
				}).catch(() => {

				});
			},
			listMsg: function (title, message, type) {
				this.listLoading = false;
				NProgress.done();
				this.$notify({
					title: title,
					message: message,
					type: type
				});
				this.handleQuery();
			},
			saveOrUpdateMsg: function (title, message, type) {
				this.saveLoading = false;
				NProgress.done();
				this.$notify({
					title: title,
					message: message,
					type: type
				});
				this.$refs['saveForm'].resetFields();
				this.saveFormVisible = false;
				this.handleQuery();
			}
		},
		mounted() {
			this.handleQuery();
		}
	}

</script>

<style scoped>
</style>