import { backdopAppStyles } from "../components/backdopAppStyles";
import { speechBubbleStyles } from "../components/gui/SpeechBubbles/speechBubbleStyles";
export default function loadStyles() {
    const stylesToUse = `
${backdopAppStyles}
${speechBubbleStyles}
`;
    const loadStylesStyleSheet = document.createElement("style");
    loadStylesStyleSheet.innerHTML = stylesToUse;
    document.head.appendChild(loadStylesStyleSheet);
}
