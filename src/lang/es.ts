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
		search: "Buscar",
		cancel: "Cancelar",
		ok: "OK",
		unknown: "Desconocido",
	},
	bottombar: {
		store: "Tienda",
	},
	pages: {
		error: {
			title: "Error",
			description: "Ocurrió un error.",
			data: {
				error: {
					title: "Algo salió mal",
					description: "No pudimos obtener datos, intenta recargar la app.",
				},
			},
		},
		errorInvalidEnv: {
			title: "Entorno inválido",
			description:
				"Esta aplicación está diseñada para ejecutarse en el entorno de Telegram Mini Apps.",
		},
		profile: {
			history: "Historial",
			noHistory: {
				title: "Sin historial aún",
				description: "Vamos a cambiar eso",
			},
		},
		home: {
			search: {
				notFound: {
					title: "No encontrado",
					description: "Este estilo no existe",
				},
			},
			notFound: {
				title: "No se encontraron artículos",
				description: "No vendemos nada en este momento",
			},
		},
		product: {
			inStock: "restantes",
			addToCart: "Agregar al carrito",
			buyNow: "Comprar ahora",
			buyFor: "Comprar por {{price}} {{currency}}",
			share: "¿Tienes un 🍆 grande? ¡Mira esto!",
		},
		purchase: {
			success: {
				title: "¡Lo tienes!",
				description: "Tu compra está en camino",
				button: "Genial",
			},
			failed: {
				title: "¡Fallaste!",
				description: "Tu compra no se realizó",
				button: "!(Genial)",
			},
		},
	},
	modals: {
		cart: {
			title: "Carrito",
			noItems: {
				title: "El carrito está vacío",
				description: "Aún no hay artículos",
			},
		},
		settings: {
			title: "Configuraciones",
			sections: {
				language: {
					title: "Idioma",
				},
				vibration: {
					title: "Retroalimentación Háptica",
				},
				motion: {
					title: "Reducir movimiento",
				},
				delay: {
					title: "Simular red lenta",
				},
				empty: {
					title: "Simular artículos vacíos",
				},
				payment: {
					title: "Simular pago exitoso",
				},
				reload:
					"La aplicación necesita recargarse para que los cambios surtan efecto.",
			},
		},
	},
};

export { translation };
