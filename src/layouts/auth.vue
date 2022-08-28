<template>
	<div class="auth">
		<div class="auth-header">
			<img
				class="logo"
				src="../assets/images/logo.png"
				alt="" />
		</div>
		<div class="auth-size-left">
			<div class="mg-left-140">
				<router-view></router-view>
			</div>
		</div>
		<div class="auth-size-right">
			<div class="auth-body">
				<img
					src="../assets/images/art_work.png"
					alt="" />
				<div class="auth-welcome">
					<div class="auth-title">Welcome back</div>
					<div class="auth-subtitle">
						Shopify customer management system
					</div>
				</div>
			</div>
			<div class="auth-footer">
				<p>Copyright @ Firegroup.vn</p>
				<p>
					<a
						href="#"
						class="link"
						>Term of use</a
					>
					•
					<a
						href="#"
						class="link"
						>Privacy policy</a
					>
					•
					<a
						href="#"
						class="link"
						>Help center</a
					>
				</p>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
	.link {
		color: $light-4-color;
	}
</style>
