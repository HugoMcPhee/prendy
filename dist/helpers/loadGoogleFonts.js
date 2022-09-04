import { forEach } from "chootils/dist/loops";
export default function loadGoogleFonts(fontNames) {
    let styleStrng = "@import url('https://fonts.googleapis.com/css2?";
    forEach(fontNames, (fontName, index) => {
        if (index !== 0) {
            styleStrng += "&";
        }
        styleStrng += "family=" + fontName.replaceAll(" ", "+");
    });
    styleStrng += "&display=swap')";
    const loadFontsStyleSheet = document.createElement("style");
    loadFontsStyleSheet.innerHTML = styleStrng;
    document.head.appendChild(loadFontsStyleSheet);
}
