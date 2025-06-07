const translation = {
	locales: {
		en: "English",
		fa: "فارسي",
		ar: "العربية",
		ru: "Русский",
		es: "Español",
		de: "Deutsch",
		hi: "हिन्दी",
		zh: "中文",
	},
	general: {
		title: "نوت مول",
		search: "بحث",
		cancel: "إلغاء",
		ok: "موافق",
		unknown: "غير معروف",
	},
	bottombar: {
		store: "المتجر",
	},
	pages: {
		error: {
			title: "خطأ",
			description: "حدث خطأ ما.",
			data: {
				error: {
					title: "هناك مشكلة",
					description: "لم نتمكن من جلب البيانات، حاول إعادة تحميل التطبيق.",
				},
			},
		},
		errorInvalidEnv: {
			title: "بيئة غير صالحة",
			description:
				"تم تصميم هذا التطبيق للعمل في بيئة تطبيقات تليجرام المصغرة.",
		},
		profile: {
			history: "السجل",
			noHistory: {
				title: "لا يوجد سجل حتى الآن",
				description: "دعنا نغير ذلك",
			},
		},
		home: {
			search: {
				notFound: {
					title: "غير موجود",
					description: "هذا النمط غير موجود",
				},
			},
			notFound: {
				title: "لا توجد عناصر",
				description: "نحن لا نبيع أي شيء حالياً",
			},
		},
		product: {
			inStock: "متبقي",
			addToCart: "أضف إلى السلة",
			buyNow: "اشترِ الآن",
			buyFor: "اشترِ مقابل {{price}} {{currency}}",
			share: "هل لديك 🍆 كبير؟ تحقق من هذا!",
		},
		purchase: {
			success: {
				title: "تم الشراء!",
				description: "طلبك في الطريق",
				button: "رائع",
			},
			failed: {
				title: "حدث خطأ!",
				description: "فشل الشراء",
				button: "!(رائع)",
			},
		},
	},
	modals: {
		cart: {
			title: "السلة",
			noItems: {
				title: "السلة فارغة",
				description: "لا توجد عناصر حتى الآن",
			},
		},
		settings: {
			title: "الإعدادات",
			sections: {
				language: {
					title: "اللغة",
				},
				vibration: {
					title: "ردود اللمس",
				},
				motion: {
					title: "تقليل الحركة",
				},
				delay: {
					title: "محاكاة شبكة بطيئة",
				},
				empty: {
					title: "محاكاة العناصر الفارغة",
				},
				crash: {
					title: "دعها تتحطم!",
				},
				reload: "يجب إعادة تحميل التطبيق لتفعيل التغييرات.",
			},
		},
	},
};

export { translation };
