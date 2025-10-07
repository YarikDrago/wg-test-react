const ARROW_HEIGHT = 44;
const ARROW_WIDTH = 68;
const BORDER_WIDTH = 1;

export function clipForm(
  isFullscreen: boolean,
  isBelow: boolean,
  arrowPos: number,
  simBorder: HTMLDivElement,
  contentElem: HTMLDivElement
) {
  console.log('CLIP', isFullscreen);
  if (isFullscreen) {
    console.log('set none');
    contentElem.style.clipPath = 'none';
    simBorder.style.clipPath = 'none';
    return;
  }
  if (!simBorder || !contentElem) return;
  if (isBelow) {
    contentElem.style.clipPath = `polygon(
        0 ${ARROW_HEIGHT}px,
        calc(${arrowPos}% - ${ARROW_WIDTH / 2}px) ${ARROW_HEIGHT}px,
        ${arrowPos}% 0,
        calc(${arrowPos}% + ${ARROW_WIDTH / 2}px) ${ARROW_HEIGHT}px,
        100% ${ARROW_HEIGHT}px,
        100% 100%,
        0 100%
      )`;
    simBorder.style.clipPath = `polygon(
      0 ${ARROW_HEIGHT}px,
      0 calc(${ARROW_HEIGHT}px + ${BORDER_WIDTH}px),
      calc(${arrowPos}% - ${ARROW_WIDTH / 2}px + ${BORDER_WIDTH}px) calc(${ARROW_HEIGHT}px + ${BORDER_WIDTH}px),
      ${arrowPos}% ${BORDER_WIDTH}px,
        calc(${arrowPos}% + ${ARROW_WIDTH / 2}px - ${BORDER_WIDTH}px) calc(${ARROW_HEIGHT}px + ${BORDER_WIDTH}px),
      100% calc(${ARROW_HEIGHT}px + ${BORDER_WIDTH}px),
      100% ${ARROW_HEIGHT}px,
      calc(${arrowPos}% + ${ARROW_WIDTH / 2}px) ${ARROW_HEIGHT}px,
      ${arrowPos}% 0,
      calc(${arrowPos}% - ${ARROW_WIDTH / 2}px) ${ARROW_HEIGHT}px
    )`;
  } else {
    contentElem.style.clipPath = `polygon(
        0 0,
        100% 0,
        100% calc(100% - ${ARROW_HEIGHT}px),
        calc(${arrowPos}% + ${ARROW_WIDTH / 2}px) calc(100% - ${ARROW_HEIGHT}px),
        ${arrowPos}% 100%,
        calc(${arrowPos}% - ${ARROW_WIDTH / 2}px) calc(100% - ${ARROW_HEIGHT}px),
        0 calc(100% - ${ARROW_HEIGHT}px)
      )`;
    simBorder.style.clipPath = `polygon(
      0 calc(100% - ${ARROW_HEIGHT}px),
      0 calc(100% - ${ARROW_HEIGHT}px - ${BORDER_WIDTH}px),
      calc(${arrowPos}% - ${ARROW_WIDTH / 2}px + ${BORDER_WIDTH}px) calc(100% - ${ARROW_HEIGHT}px - ${BORDER_WIDTH}px),
      ${arrowPos}% calc(100% - ${BORDER_WIDTH}px), 
      calc(${arrowPos}% + ${ARROW_WIDTH / 2}px - ${BORDER_WIDTH}px) calc(100% - ${ARROW_HEIGHT}px - ${BORDER_WIDTH}px),
      100% calc(100% - ${ARROW_HEIGHT}px - ${BORDER_WIDTH}px),
      100% calc(100% - ${ARROW_HEIGHT}px),
      calc(${arrowPos}% + ${ARROW_WIDTH / 2}px) calc(100% - ${ARROW_HEIGHT}px),
      ${arrowPos}% 100%,
      calc(${arrowPos}% - ${ARROW_WIDTH / 2}px) calc(100% - ${ARROW_HEIGHT}px)
    )`;
  }
}
