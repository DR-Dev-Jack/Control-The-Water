//kijkt of het scherm breed genoeg is
function detectDevice() {
    if (window.matchMedia("(min-width: 1024px)").matches) {
        return 'pc';
    } else {
        return 'mobile';
    }
}


const deviceType = detectDevice();


console.log(deviceType)

//kijkt of het script al is geladen

if (deviceType === 'pc' && !window.windmillScriptLoaded) {
    const script = document.createElement('script');
    script.src = 'windmill.js';
    script.defer = true;
    document.head.appendChild(script);
    window.windmillScriptLoaded = true;
}
