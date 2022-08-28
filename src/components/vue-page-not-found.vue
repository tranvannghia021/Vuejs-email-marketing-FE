<template>
	<div class="vue-not-found">
		<h1>Oops!</h1>
		<h3>The {{ resource }} you're looking for is not here.</h3>
		<router-link
			class="vue-not-found-link"
			:to="{ name: 'Customer' }"
			>Back to the home page</router-link
		>
	</div>
</template>

<script>
	export default {
		name: 'PageNotFound',
		props: {
			resource: {
				type: String,
				default: 'page',
			},
		},
	};
</script>

<style lang="scss">
	.vue-not-found {
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
