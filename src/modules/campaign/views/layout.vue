<template>
	<router-view :key="$route.fullPath" />
</template>

<script>
	export default {
		name: 'LayoutCampaign',
	};
</script>

<style lang="scss" scoped></style>
