import { prendyAppStyles } from "../components/prendyAppStyles";
import { speechBubbleStyles } from "../components/gui/speech/speechBubbleStyles";

export default function loadStyles() {
  const stylesToUse = `
${prendyAppStyles}
${speechBubbleStyles}
`;
  const loadStylesStyleSheet = document.createElement("style");
  loadStylesStyleSheet.innerHTML = stylesToUse;
  document.head.appendChild(loadStylesStyleSheet);
}
