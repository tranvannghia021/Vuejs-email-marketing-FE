<template>
	<div
		class="avatar"
		:class="{
			'avatar-primary': color == 'primary',
			'avatar-secondary': color == 'secondary',
		}">
		{{ this.avatar }}
	</div>
</template>

<script>
	export default {
		name: 'vue-avatar-by-name',
		props: ['name', 'color'],
		computed: {
			avatar() {
				let initials = this.name
					.split(' ')
					.map(function (str) {
						return str ? str[0].toUpperCase() : '';
					})
					.join('');

				return initials.length > 2
					? initials.slice(initials.length - 2)
					: initials;
			},
		},
	};
</script>

<style lang="scss" scoped>
	.avatar {
		width: 32px;
		height: 32px;
		background-color: $light-2-color;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		color: $dark-4-color;
		font-size: 13px;
		font-weight: 500;
		border: 2px solid #f2f2f5;

		&-primary {
			background: #003084;
			color: $light-4-color;
		}

		&-secondary {
			background: $light-2-color;
			color: $dark-2-color;
		}
	}
</style>
