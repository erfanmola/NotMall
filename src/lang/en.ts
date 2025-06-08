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
		search: "Search",
		cancel: "Cancel",
		ok: "OK",
		unknown: "Unknown",
	},
	bottombar: {
		store: "Store",
	},
	pages: {
		error: {
			title: "Error",
			description: "An error occurred.",
			data: {
				error: {
					title: "Something’s fucked up",
					description: "We couldn’t fetch data, try reloading the app.",
				},
			},
		},
		errorInvalidEnv: {
			title: "Invalid Environment",
			description:
				"This app is designed to run in Telegram Mini Apps environment.",
		},
		profile: {
			history: "History",
			noHistory: {
				title: "No history yet",
				description: "Let's change that",
			},
		},
		home: {
			search: {
				notFound: {
					title: "Not Found",
					description: "This style doesn't exist",
				},
			},
			notFound: {
				title: "No Items Found",
				description: "We don't sell shit at the moment",
			},
		},
		product: {
			inStock: "left",
			addToCart: "Add to cart",
			buyNow: "Buy now",
			buyFor: "Buy for {{price}} {{currency}}",
			share: "Have a big 🍆? Check this out!",
		},
		purchase: {
			success: {
				title: "You Got It!",
				description: "Your purchase is on the way",
				button: "Awesome",
			},
			failed: {
				title: "You Fucked Up!",
				description: "Your purchase is in my ass",
				button: "!(Awesome)",
			},
		},
	},
	modals: {
		cart: {
			title: "Cart",
			noItems: {
				title: "Cart’s cold",
				description: "No items yet",
			},
		},
		settings: {
			title: "Settings",
			sections: {
				language: {
					title: "Language",
				},
				vibration: {
					title: "Haptic Feedback",
				},
				motion: {
					title: "Reduce Motion",
				},
				delay: {
					title: "Simulate Slow Network",
				},
				empty: {
					title: "Simulate Empty Items",
				},
				payment: {
					title: "Simulate Successful Payment",
				},
				reload: "The app needs to be reloaded for the changes to take effect.",
			},
		},
	},
};

export { translation };
