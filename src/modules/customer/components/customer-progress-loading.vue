<template>
	<div class="vue-customer-loading">
		<div class="vue-customer-loading-progress">
			<span class="vue-customer-loading-progress-dot"></span>
			<svg>
				<circle
					cx="31"
					cy="31"
					r="25"></circle>
				<circle
					cx="31"
					cy="31"
					r="25"
					:style="{ '--percent': percent }"></circle>
				<defs>
					<linearGradient
						id="gradient"
						x1="0%"
						y1="0%"
						x2="0%"
						y2="100%">
						<stop
							offset="0%"
							stop-color="#003084" />
						<stop
							offset="100%"
							stop-color="#0294D7" />
					</linearGradient>
				</defs>
			</svg>
			<div class="vue-customer-loading-progress-number">
				<h3>{{ percent }}<span>%</span></h3>
			</div>
		</div>
		<span class="vue-customer-loading-desc"
			>Syncing customers from Shopify</span
		>
	</div>
</template>

<script>
	export default {
		name: 'CustomerProgressLoading',
		props: {
			percent: {
				type: Number,
				required: true,
			},
		},
	};
</script>

<style lang="scss" scoped>
	.vue-customer-loading {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		display: flex;
		align-items: center;
		flex-direction: column;
		row-gap: 16px;

		&-progress {
			position: relative;
			width: 62px;
			height: 62px;
			background-color: $light-2-color;

			& svg {
				position: relative;
				width: 62px;
				height: 62px;
				transform: rotate(-90deg);

				& circle {
					width: 100%;
					height: 100%;
					fill: none;
					stroke: $dark-gray-04;
					stroke-width: 6;
					stroke-linecap: round;
					transition: all 0.2s ease;

					&:last-of-type {
						--px: 156px;
						stroke-dasharray: var(--px);
						stroke-dashoffset: calc(
							var(--px) - (var(--px) * var(--percent)) / 100
						);
						stroke: url(#gradient);
					}
				}
			}

			&-number {
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
				font-weight: 700;
				font-size: 1.2rem;
				line-height: 1.5rem;
				color: $dark-2-color;

				& h3 {
					font-size: 1.2rem;
					line-height: 1.5rem;
					color: $dark-2-color;
				}
			}

			&-dot {
				position: absolute;
				top: 6px;
				left: 50%;
				transform: translate(-50%, -50%);
				width: 3.5px;
				height: 3.5px;
				border-radius: 50%;
				background-color: $white-color;
				z-index: 10;
			}
		}

		&-desc {
			color: $dark-gray-02;
		}
	}
</style>
