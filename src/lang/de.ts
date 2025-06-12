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
		search: "Suchen",
		cancel: "Abbrechen",
		ok: "OK",
		unknown: "Unbekannt",
	},
	bottombar: {
		store: "Shop",
	},
	pages: {
		error: {
			title: "Fehler",
			description: "Ein Fehler ist aufgetreten.",
			data: {
				error: {
					title: "Etwas ist schiefgelaufen",
					description:
						"Wir konnten keine Daten abrufen, bitte lade die App neu.",
				},
			},
		},
		errorInvalidEnv: {
			title: "Ungültige Umgebung",
			description:
				"Diese App ist dafür ausgelegt, in der Telegram Mini Apps Umgebung zu laufen.",
		},
		profile: {
			history: "Verlauf",
			noHistory: {
				title: "Noch kein Verlauf",
				description: "Lass uns das ändern",
			},
		},
		home: {
			search: {
				notFound: {
					title: "Nicht gefunden",
					description: "Dieser Stil existiert nicht",
				},
			},
			notFound: {
				title: "Keine Artikel gefunden",
				description: "Wir verkaufen momentan nichts",
			},
		},
		product: {
			inStock: "verfügbar",
			addToCart: "In den Warenkorb",
			outOfStock: "Nicht auf Lager",
			soldOut: "Ausverkauft",
			buyNow: "Jetzt kaufen",
			buyFor: "Kaufen für {{price}} {{currency}}",
			share: "Hast du einen großen 🍆? Schau dir das an!",
		},
		purchase: {
			success: {
				title: "Du hast es!",
				description: "Dein Kauf ist unterwegs",
				button: "Super",
			},
			failed: {
				title: "Du hast es vermasselt!",
				description: "Dein Kauf ist fehlgeschlagen",
				button: "!(Super)",
			},
		},
	},
	modals: {
		cart: {
			title: "Warenkorb",
			noItems: {
				title: "Der Warenkorb ist leer",
				description: "Noch keine Artikel",
			},
		},
		settings: {
			title: "Einstellungen",
			sections: {
				language: {
					title: "Sprache",
				},
				vibration: {
					title: "Haptisches Feedback",
				},
				motion: {
					title: "Bewegungen reduzieren",
				},
				delay: {
					title: "Langsames Netzwerk simulieren",
				},
				empty: {
					title: "Leere Artikel simulieren",
				},
				payment: {
					title: "Erfolgreiche Zahlung simulieren",
				},
				reload:
					"Die App muss neu geladen werden, damit die Änderungen wirksam werden.",
			},
		},
	},
};

export { translation };
