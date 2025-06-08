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
		search: "खोजें",
		cancel: "रद्द करें",
		ok: "ठीक है",
		unknown: "अज्ञात",
	},
	bottombar: {
		store: "स्टोर",
	},
	pages: {
		error: {
			title: "त्रुटि",
			description: "एक त्रुटि हुई।",
			data: {
				error: {
					title: "कुछ गलत हो गया",
					description: "हम डेटा प्राप्त नहीं कर पाए, कृपया ऐप पुनः लोड करें।",
				},
			},
		},
		errorInvalidEnv: {
			title: "अमान्य पर्यावरण",
			description:
				"यह ऐप Telegram Mini Apps पर्यावरण में चलाने के लिए डिज़ाइन किया गया है।",
		},
		profile: {
			history: "इतिहास",
			noHistory: {
				title: "अभी तक कोई इतिहास नहीं",
				description: "आइए इसे बदलते हैं",
			},
		},
		home: {
			search: {
				notFound: {
					title: "नहीं मिला",
					description: "यह शैली मौजूद नहीं है",
				},
			},
			notFound: {
				title: "कोई आइटम नहीं मिला",
				description: "हम अभी कुछ भी नहीं बेच रहे हैं",
			},
		},
		product: {
			inStock: "बचा हुआ",
			addToCart: "कार्ट में जोड़ें",
			buyNow: "अभी खरीदें",
			buyFor: "{{price}} {{currency}} में खरीदें",
			share: "क्या आपके पास बड़ा 🍆 है? इसे देखें!",
		},
		purchase: {
			success: {
				title: "आपको मिल गया!",
				description: "आपकी खरीदारी रास्ते में है",
				button: "शानदार",
			},
			failed: {
				title: "कुछ गलत हो गया!",
				description: "आपकी खरीदारी विफल रही",
				button: "!(शानदार)",
			},
		},
	},
	modals: {
		cart: {
			title: "कार्ट",
			noItems: {
				title: "कार्ट खाली है",
				description: "अभी तक कोई आइटम नहीं है",
			},
		},
		settings: {
			title: "सेटिंग्स",
			sections: {
				language: {
					title: "भाषा",
				},
				vibration: {
					title: "हैप्टिक फीडबैक",
				},
				motion: {
					title: "गति कम करें",
				},
				delay: {
					title: "धीमे नेटवर्क का अनुकरण करें",
				},
				empty: {
					title: "खाली आइटम का अनुकरण करें",
				},
				payment: {
					title: "सफल भुगतान का अनुकरण करें",
				},
				reload: "परिवर्तन प्रभावी होने के लिए ऐप को पुनः लोड करने की आवश्यकता है।",
			},
		},
	},
};

export { translation };
