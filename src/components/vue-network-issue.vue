<template>
	<div class="vue-network-issue">
		<h1>Uh-Oh!</h1>
		<h3>
			It looks like you're experiencing some network issues, please click
			the back button and try again.
		</h3>
		<router-link
			class="vue-network-issue-link"
			:to="{ name: 'Customer' }"
			>Or go back to the home page</router-link
		>
	</div>
</template>
<style lang="scss" scoped>
	.vue-network-issue {
		width: 100%;
		height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		row-gap: 12px;

		& h1 {
			font-size: 22px;
		}

		&-link {
			color: $primary-color;

			&:hover {
				text-decoration: underline;
			}
		}
	}
</style>
