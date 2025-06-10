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
		title: "نات مال",
		search: "جستجو",
		cancel: "لغو",
		ok: "تأیید",
		unknown: "ناشناخته",
	},
	bottombar: {
		store: "فروشگاه",
	},
	pages: {
		error: {
			title: "خطا",
			description: "یک خطا رخ داده است.",
			data: {
				error: {
					title: "مشکلی پیش آمده",
					description:
						"نتوانستیم داده‌ها را دریافت کنیم، لطفا برنامه را دوباره بارگذاری کنید.",
				},
			},
		},
		errorInvalidEnv: {
			title: "محیط نامعتبر",
			description: "این برنامه برای اجرا در محیط تلگرام مینی‌اپ طراحی شده است.",
		},
		profile: {
			history: "تاریخچه",
			noHistory: {
				title: "تاریخچه‌ای وجود ندارد",
				description: "بیایید این را تغییر دهیم",
			},
		},
		home: {
			search: {
				notFound: {
					title: "یافت نشد",
					description: "این سبک وجود ندارد",
				},
			},
			notFound: {
				title: "هیچ موردی یافت نشد",
				description: "فعلاً چیزی برای فروش نداریم",
			},
		},
		product: {
			inStock: "مانده",
			addToCart: "افزودن به سبد خرید",
			outOfStock: "ناموجود",
			buyNow: "همین حالا بخر",
			buyFor: "خرید به قیمت {{price}} {{currency}}",
			share: "یه 🍆 بزرگ داری؟ اینو ببین!",
		},
		purchase: {
			success: {
				title: "خرید موفق!",
				description: "خرید شما در راه است",
				button: "عالیه",
			},
			failed: {
				title: "اشتباه شد!",
				description: "خرید شما انجام نشد",
				button: "!(عالی نیست)",
			},
		},
	},
	modals: {
		cart: {
			title: "سبد خرید",
			noItems: {
				title: "سبد خرید خالی است",
				description: "هیچ موردی اضافه نشده",
			},
		},
		settings: {
			title: "تنظیمات",
			sections: {
				language: {
					title: "زبان",
				},
				vibration: {
					title: "بازخورد لمسی",
				},
				motion: {
					title: "کاهش حرکت",
				},
				delay: {
					title: "شبیه‌سازی شبکه کند",
				},
				empty: {
					title: "شبیه‌سازی آیتم‌های خالی",
				},
				payment: {
					title: "شبیه‌سازی پرداخت موفق",
				},
				reload: "برای اعمال تغییرات، برنامه باید دوباره بارگذاری شود.",
			},
		},
	},
};

export { translation };
