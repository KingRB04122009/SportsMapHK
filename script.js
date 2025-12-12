const translations = {
	en: {
		"mode-label": "Light Mode",
		"language-label": "English",
		headline:
			"Have you ever felt confused and overwhelmed finding where to play your specific sport around Hong Kong?",
		intro:
			"Hong Kong is a large and diverse city with a wide variety of different sports scattered amongst the bustling city. This website was made to help find your sport near you!",
		step1: "Enter the sport you are interested in locating around Hong Kong.",
		step2: "Tick the boxes to filter your preferences for the type of sport conditions.",
		step3: "If you want to revisit a certain location, favourite it so you can come back to it.",
		"sport-label": "Enter a sport",
		"filters-label": "Tick the Filters:",
		"filter-outdoor": "Outdoor",
		"filter-half": "Half-Court",
		"filter-indoor": "Indoor",
		"filter-public": "Public",
		"filter-full": "Full-Court",
		"filter-private": "Private",
		cta: "Show Locations",
		"map-placeholder": "Interactive map placeholder"
	},
	es: {
		"mode-label": "Modo Claro",
		"language-label": "Español",
		headline:
			"¿Te has sentido confundido y abrumado al intentar encontrar dónde practicar tu deporte en Hong Kong?",
		intro:
			"Hong Kong es una ciudad grande y diversa con una amplia variedad de deportes repartidos por la ciudad. ¡Este sitio web se creó para ayudarte a encontrar tu deporte cerca de ti!",
		step1: "Ingresa el deporte que deseas localizar en Hong Kong.",
		step2: "Marca las casillas para filtrar tus preferencias según las condiciones del deporte.",
		step3: "Si quieres volver a visitar un lugar, añádelo a favoritos para regresar fácilmente.",
		"sport-label": "Ingresa un deporte",
		"filters-label": "Marca los filtros:",
		"filter-outdoor": "Exterior",
		"filter-half": "Media cancha",
		"filter-indoor": "Interior",
		"filter-public": "Público",
		"filter-full": "Cancha completa",
		"filter-private": "Privado",
		cta: "Mostrar ubicaciones",
		"map-placeholder": "Marcador de posición del mapa interactivo"
	}
};

const textNodes = document.querySelectorAll("[data-text]");
const themeToggle = document.getElementById("themeToggle");
const languageToggle = document.getElementById("languageToggle");

let isDark = false;
let currentLang = "en";

const applyTranslations = (lang) => {
	textNodes.forEach((node) => {
		const key = node.dataset.text;
		node.textContent = translations[lang][key];
	});
};

const toggleTheme = () => {
	isDark = !isDark;
	document.body.classList.toggle("dark", isDark);
	const modeLabelKey = "mode-label";
	document.querySelector(`[data-text="${modeLabelKey}"]`).textContent =
		translations[currentLang][modeLabelKey];
	themeToggle.firstChild.textContent = isDark ? "🌙 " : "🌤️ ";
};

const toggleLanguage = () => {
	currentLang = currentLang === "en" ? "es" : "en";
	applyTranslations(currentLang);
	languageToggle.firstChild.textContent = currentLang === "en" ? "🌐 " : "🌍 ";
};

themeToggle.addEventListener("click", toggleTheme);
languageToggle.addEventListener("click", toggleLanguage);

applyTranslations(currentLang);
