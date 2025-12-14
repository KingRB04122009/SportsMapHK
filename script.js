const translations = {
	en: {
		"mode-label-light": "Light Mode",
		"mode-label-dark": "Dark Mode",
		"language-label": "English",
		headline:
			"Have you ever felt confused and overwhelmed finding where to play your specific sport around Hong Kong?",
		intro:
			"Hong Kong is a large and diverse city with a wide variety of different sports scattered amongst the bustling city. This website was made to help find your sport near you!",
		step1: "Enter the sport you are interested in locating around Hong Kong.",
		step2: "Tick the boxes to filter your preferences for the type of sport conditions.",
		step3: "If you want to revisit a certain location, favourite it so you can come back to it.",
		"sport-label": "Enter a sport",
		"sport-placeholder": "Choose a sport",
		"sport-option-basketball": "Basketball",
		"sport-option-football": "Football",
		"sport-option-tennis": "Tennis",
		"sport-option-badminton": "Badminton",
		"sport-option-table-tennis": "Table Tennis",
		"sport-option-baseball": "Baseball",
		"sport-option-swimming": "Swimming",
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
		"mode-label-light": "Modo Claro",
		"mode-label-dark": "Modo Oscuro",
		"language-label": "Español",
		headline:
			"¿Te has sentido confundido y abrumado al intentar encontrar dónde practicar tu deporte en Hong Kong?",
		intro:
			"Hong Kong es una ciudad grande y diversa con una amplia variedad de deportes repartidos por la ciudad. ¡Este sitio web se creó para ayudarte a encontrar tu deporte cerca de ti!",
		step1: "Ingresa el deporte que deseas localizar en Hong Kong.",
		step2: "Marca las casillas para filtrar tus preferencias según las condiciones del deporte.",
		step3: "Si quieres volver a visitar un lugar, añádelo a favoritos para regresar fácilmente.",
		"sport-label": "Ingresa un deporte",
		"sport-placeholder": "Elige un deporte",
		"sport-option-basketball": "Baloncesto",
		"sport-option-football": "Fútbol",
		"sport-option-tennis": "Tenis",
		"sport-option-badminton": "Bádminton",
		"sport-option-table-tennis": "Tenis de mesa",
		"sport-option-baseball": "Béisbol",
		"sport-option-swimming": "Natación",
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
const modeLabelNode = document.querySelector('[data-text="mode-label"]');

let isDark = false;
let currentLang = "en";

const updateModeLabelText = () => {
	const modeKey = isDark ? "mode-label-dark" : "mode-label-light";
	if (modeLabelNode) {
		modeLabelNode.textContent = translations[currentLang][modeKey];
	}
};

const applyTranslations = (lang) => {
	textNodes.forEach((node) => {
		const key = node.dataset.text;
		if (key === "mode-label") return; // handled separately
		node.textContent = translations[lang][key];
	});
	updateModeLabelText();
};

const toggleTheme = () => {
	isDark = !isDark;
	document.body.classList.toggle("dark", isDark);
	updateModeLabelText();
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

// Map integration
let map;
const mapDiv = document.getElementById('map');
const placeholderDiv = document.querySelector('.map-placeholder');
const sportSelect = document.getElementById('sportSelect');
const showBtn = document.querySelector('.primary-btn');

showBtn.addEventListener('click', async () => {
  const sport = sportSelect.value;
  if (!sport) return;

  // Show map, hide placeholder
  mapDiv.style.display = 'block';
  placeholderDiv.style.display = 'none';

  // Initialize map if not already
  if (!map) {
    map = L.map('map').setView([22.3193, 114.1694], 10); // Center on Hong Kong
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
  }

  // Clear existing markers
  map.eachLayer((layer) => {
    if (layer instanceof L.Marker) {
      map.removeLayer(layer);
    }
  });

  // Define API endpoints for each sport (from HK LCSD open data via ArcGIS)
  let url;
  switch (sport) {
    case 'basketball':
      url = 'https://services3.arcgis.com/6j1KwZfY2fZrfNMR/arcgis/rest/services/Basketball_Courts_in_Hong_Kong/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json';
      break;
    case 'football':
      url = 'https://services3.arcgis.com/6j1KwZfY2fZrfNMR/arcgis/rest/services/Grass_Pitches_in_Hong_Kong/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json';
      break;
    case 'tennis':
      url = 'https://services3.arcgis.com/6j1KwZfY2fZrfNMR/arcgis/rest/services/Tennis_Court_in_Hong_Kong/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json';
      break;
    case 'badminton':
      url = 'https://services3.arcgis.com/6j1KwZfY2fZrfNMR/arcgis/rest/services/Badminton_Courts_in_Hong_Kong/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json';
      break;
    case 'table-tennis':
      url = 'https://services3.arcgis.com/6j1KwZfY2fZrfNMR/arcgis/rest/services/Table_Tennis_Tables_in_Hong_Kong/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json';
      break;
    case 'baseball':
      url = 'https://services3.arcgis.com/6j1KwZfY2fZrfNMR/arcgis/rest/services/Baseball_Pitches_Natural_Turf_Pitch_in_Hong_Kong/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json';
      break;
    case 'swimming':
      url = 'https://services3.arcgis.com/6j1KwZfY2fZrfNMR/arcgis/rest/services/Swimming_Pools_in_Hong_Kong/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json';
      break;
    default:
      return;
  }

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.features && data.features.length > 0) {
      data.features.forEach((feature) => {
        const geom = feature.geometry;
        let latlng;
        if (geom.rings) {
          // Polygon: use centroid (approximate)
          const ring = geom.rings[0];
          const x = ring.reduce((sum, coord) => sum + coord[0], 0) / ring.length;
          const y = ring.reduce((sum, coord) => sum + coord[1], 0) / ring.length;
          latlng = [y, x];
        } else if (geom.x && geom.y) {
          // Point
          latlng = [geom.y, geom.x];
        }
        if (latlng) {
          const name = feature.attributes.NAME_EN || feature.attributes.name_en || 'Unknown Location';
          const address = feature.attributes.ADDRESS_EN || feature.attributes.address_en || 'No address available';
          L.marker(latlng).addTo(map)
            .bindPopup(`<b>${name}</b><br>${address}`);
        }
      });
      // Fit map to markers if any
      if (map.getBounds().getNorthEast().lat !== map.getBounds().getSouthWest().lat) {
        map.fitBounds(map.getBounds().pad(0.1));
      }
    } else {
      console.warn('No features found for this sport.');
    }
  } catch (error) {
    console.error('Error fetching locations:', error);
    // Optionally show an error message in the UI
  }
});