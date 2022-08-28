<template>
	<div class="auth-form">
		<form
			class="auth-form-body"
			@submit.stop.prevent="on_submit">
			<div class="auth-form-title">
				<h1 class="auth-title">Login</h1>
				<p class="auth-subtitle">
					Please enter your Shopify URL to login
				</p>
			</div>
			<vue-input
				size="big"
				placeholder="Store Name"
				v-model="account">
				<template slot="content-right"> .myshopify.com </template>
			</vue-input>
			<vue-button
				class="btn-primary btn-full-width"
				:is_loading="is_loading">
				Login
			</vue-button>
		</form>
		<div class="auth-form-footer">
			<span>
				Don't have a
				<img
					src="../../../assets/images/shopify.svg"
					alt="" />
				store yet?
				<a
					href="https://accounts.shopify.com/signup"
					class="text-primary"
					>Create Now!</a
				>
			</span>
		</div>
	</div>
</template>

<script>
	import VueButton from '@/components/vue-button.vue';
	import VueInput from '@/components/vue-input.vue';
	import { mapActions } from 'vuex';

	export default {
		name: 'LoginComponent',
		components: {
			'vue-button': VueButton,
			'vue-input': VueInput,
		},
		data() {
			return {
				account: '',
				is_loading: false,
			};
		},
		methods: {
			...mapActions('auth', ['login']),
			...mapActions('notification', ['add']),
			// HANDLE SUBMIT FORM
			async on_submit() {
				try {
					if (this.is_loading) return;
					if (!this.validate_input()) return;
					this.is_loading = true;
					const res = await this.login({
						domain: this.account,
					});
					if (res?.success) {
						const { success, link, message } = res;
						if (success && link) {
							window.location.href = link;
						}
					}
					this.is_loading = false;
				} catch (error) {
					this.is_loading = false;
					this.add({
						type: 'error',
						message:
							error.data.message || 'Server error. Try again!!',
					});
				}
			},
			validate_input() {
				if (!this.account) {
					this.add({
						type: 'error',
						message: 'Store name is required.',
					});
					return false;
				} else {
					if (this.account.length < 4) {
						this.add({
							type: 'error',
							message:
								'Store name requires minimum 4 characters.',
						});
						return false;
					}
					if (this.account.length >= 66) {
						this.add({
							type: 'error',
							message:
								'Store name requires maximum 66 characters.',
						});
						return false;
					}
					const specialChars = /[^-a-z0-9]/g;
					if (specialChars.test(this.account)) {
						this.add({
							type: 'error',
							message: 'Store name is invalid.',
						});
						return false;
					}
				}
				return true;
			},
		},
	};
</script>

<style lang="scss" scoped></style>
