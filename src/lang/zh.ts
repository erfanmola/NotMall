const translation = {
	locales: {
		en: "English",
		fa: "فارسی",
		ar: "العربية",
		ru: "Русский",
		es: "Español",
		de: "Deutsch",
		hi: "हिन्दी",
		zh: "中文",
	},
	general: {
		title: "Not Mall",
		search: "搜索",
		cancel: "取消",
		ok: "确定",
		unknown: "未知",
	},
	bottombar: {
		store: "商店",
	},
	pages: {
		error: {
			title: "错误",
			description: "发生了错误。",
			data: {
				error: {
					title: "出了点问题",
					description: "我们无法获取数据，请尝试重新加载应用。",
				},
			},
		},
		errorInvalidEnv: {
			title: "无效环境",
			description: "该应用设计用于在 Telegram Mini Apps 环境中运行。",
		},
		profile: {
			history: "历史记录",
			noHistory: {
				title: "暂无历史",
				description: "让我们改变这一点",
			},
		},
		home: {
			search: {
				notFound: {
					title: "未找到",
					description: "该样式不存在",
				},
			},
			notFound: {
				title: "未找到商品",
				description: "我们目前没有出售任何商品",
			},
		},
		product: {
			inStock: "剩余",
			addToCart: "加入购物车",
			outOfStock: "缺货",
			soldOut: "已售罄",
			buyNow: "立即购买",
			buyFor: "购买价格 {{price}} {{currency}}",
			share: "有大 🍆？快来看看！",
		},
		purchase: {
			success: {
				title: "购买成功！",
				description: "您的订单正在路上",
				button: "太棒了",
			},
			failed: {
				title: "购买失败！",
				description: "您的订单未完成",
				button: "!(太棒了)",
			},
		},
	},
	modals: {
		cart: {
			title: "购物车",
			noItems: {
				title: "购物车是空的",
				description: "暂无商品",
			},
		},
		settings: {
			title: "设置",
			sections: {
				language: {
					title: "语言",
				},
				vibration: {
					title: "触觉反馈",
				},
				motion: {
					title: "减少动画",
				},
				delay: {
					title: "模拟慢速网络",
				},
				empty: {
					title: "模拟空商品",
				},
				payment: {
					title: "模拟成功支付",
				},
				reload: "需要重新加载应用以使更改生效。",
			},
		},
	},
};

export { translation };
