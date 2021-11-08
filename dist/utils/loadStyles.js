import { backdopAppStyles } from ".././components/backdopAppStyles";
import { speechBubbleStyles } from "..//components/gui/SpeechBubbles/speechBubbleStyles";
export default function loadStyles() {
    var css = `
  ${backdopAppStyles}
  ${speechBubbleStyles}
  `, head = document.head || document.getElementsByTagName("head")[0], style = document.createElement("style");
    head.appendChild(style);
    style.type = "text/css";
    style.appendChild(document.createTextNode(css));
}
