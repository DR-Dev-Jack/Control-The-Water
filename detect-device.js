// JavaScript om het type apparaat te detecteren
function detectDevice() {
    // Controleer of het apparaat een pc is op basis van de schermgrootte
    if (window.matchMedia("(min-width: 1024px)").matches) {
        return 'pc';
    } else {
        return 'mobile';
    }
}


// Voer functie uit om het apparaat te detecteren
const deviceType = detectDevice();

console.log(deviceType)

// Als het apparaat een pc is en het script nog niet is geladen, laad dan de windmolen
if (deviceType === 'pc' && !window.windmillScriptLoaded) {
    const script = document.createElement('script');
    script.src = 'windmill.js';
    script.defer = true;
    document.head.appendChild(script);
    window.windmillScriptLoaded = true; // Markeer het script als geladen
}
