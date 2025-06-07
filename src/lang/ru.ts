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
		search: "Поиск",
		cancel: "Отмена",
		ok: "ОК",
		unknown: "Неизвестно",
	},
	bottombar: {
		store: "Магазин",
	},
	pages: {
		error: {
			title: "Ошибка",
			description: "Произошла ошибка.",
			data: {
				error: {
					title: "Что-то пошло не так",
					description:
						"Не удалось получить данные, попробуйте перезагрузить приложение.",
				},
			},
		},
		errorInvalidEnv: {
			title: "Неверная среда",
			description:
				"Это приложение предназначено для работы в среде Telegram Mini Apps.",
		},
		profile: {
			history: "История",
			noHistory: {
				title: "Истории нет",
				description: "Давайте это исправим",
			},
		},
		home: {
			search: {
				notFound: {
					title: "Не найдено",
					description: "Такого стиля не существует",
				},
			},
			notFound: {
				title: "Товары не найдены",
				description: "В данный момент у нас ничего нет на продажу",
			},
		},
		product: {
			inStock: "осталось",
			addToCart: "Добавить в корзину",
			buyNow: "Купить сейчас",
			buyFor: "Купить за {{price}} {{currency}}",
			share: "У тебя большой 🍆? Зацени это!",
		},
		purchase: {
			success: {
				title: "Вы получили это!",
				description: "Ваша покупка в пути",
				button: "Отлично",
			},
			failed: {
				title: "Что-то пошло не так!",
				description: "Ваша покупка не прошла",
				button: "!(Отлично)",
			},
		},
	},
	modals: {
		cart: {
			title: "Корзина",
			noItems: {
				title: "Корзина пуста",
				description: "Пока что нет товаров",
			},
		},
		settings: {
			title: "Настройки",
			sections: {
				language: {
					title: "Язык",
				},
				vibration: {
					title: "Отклик при прикосновении",
				},
				motion: {
					title: "Уменьшить движение",
				},
				delay: {
					title: "Симуляция медленной сети",
				},
				empty: {
					title: "Симуляция пустых товаров",
				},
				reload: "Для применения изменений приложение нужно перезагрузить.",
			},
		},
	},
};

export { translation };
