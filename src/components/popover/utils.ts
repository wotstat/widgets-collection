

export type Placement = 'top' | 'bottom' | 'left' | 'right' | 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end' | 'left-start' | 'left-end' | 'right-start' | 'right-end';

export type Params = {
  target: { x: number, y: number, width: number, height: number }
  popup: { width: number, height: number }
}

export function isParamsEqual(left: Params, right: Params) {
  if (!left || !right) return false;
  return left.target.x === right.target.x &&
    left.target.y === right.target.y &&
    left.target.width === right.target.width &&
    left.target.height === right.target.height &&
    left.popup.width === right.popup.width &&
    left.popup.height === right.popup.height;
}

export function getParams(target: HTMLElement | null, popup: HTMLElement | null) {

  if (!target || !popup) return null

  const targetRect = target.getBoundingClientRect();
  const popupRect = popup.getBoundingClientRect();

  return {
    target: {
      x: targetRect.x,
      y: targetRect.y,
      width: targetRect.width,
      height: targetRect.height
    },
    popup: {
      width: popupRect.width,
      height: popupRect.height
    }
  } as Params;
}

export type OffsetValue =
  number |
  [number] |
  [number, number] |
  [number, number, number] |
  [number, number, number, number] |
  { x?: number, y?: number } |
  { top?: number, left?: number, right?: number, bottom?: number };

type Offset = { top: number, left: number, right: number, bottom: number }

export function generateOffset(value: OffsetValue): Offset {
  if (typeof value === 'number') {
    return { top: value, left: value, right: value, bottom: value };
  }

  if (Array.isArray(value)) {
    switch (value.length) {
      case 1:
        return { top: value[0], left: value[0], right: value[0], bottom: value[0] };
      case 2:
        return { top: value[0], left: value[1], right: value[1], bottom: value[0] };
      case 3:
        return { top: value[0], left: value[1], right: value[1], bottom: value[2] };
      case 4:
        return { top: value[0], left: value[1], right: value[2], bottom: value[3] };
    }
  }

  if (typeof value === 'object') {
    if ('x' in value || 'y' in value) {
      return {
        top: 'y' in value ? value.y ?? 0 : 0,
        left: 'x' in value ? value.x ?? 0 : 0,
        right: 'x' in value ? value.x ?? 0 : 0,
        bottom: 'y' in value ? value.y ?? 0 : 0
      };
    }

    return {
      top: 'top' in value ? value.top ?? 0 : 0,
      left: 'left' in value ? value.left ?? 0 : 0,
      right: 'right' in value ? value.right ?? 0 : 0,
      bottom: 'bottom' in value ? value.bottom ?? 0 : 0
    };
  }

  return { top: 0, left: 0, right: 0, bottom: 0 };
}

type Bbox = {
  left: number;
  top: number;
  right: number;
  bottom: number;
}

export function generateBbox(bbox?: DOMRect | 'window' | false | null): Bbox | null {
  if (bbox === 'window') {
    return {
      left: 0,
      top: 0,
      right: window.innerWidth,
      bottom: window.innerHeight
    };
  }

  if (bbox instanceof DOMRect) {
    return {
      left: bbox.left,
      top: bbox.top,
      right: bbox.right,
      bottom: bbox.bottom
    };
  }

  return null;
}

const horizontalPlacements = new Set<Placement>(['left', 'right', 'left-start', 'left-end', 'right-start', 'right-end']);
const verticalPlacements = new Set<Placement>(['top', 'bottom', 'top-start', 'top-end', 'bottom-start', 'bottom-end']);

export function calculatePopoverPosition(params: Params, placement: Placement,
  options: {
    bbox?: DOMRect | 'window' | false | null
    offset: Offset
  }): { x: number, y: number } {

  const { target, popup } = params;
  const { offset } = options;

  const bbox = generateBbox(options.bbox);

  let x = 0
  let y = 0

  const targetCenterX = target.x + target.width / 2;
  const targetCenterY = target.y + target.height / 2;

  switch (placement) {
    case 'top':
      x = targetCenterX - popup.width / 2;
      y = target.y - popup.height - offset.bottom;
      break;
    case 'bottom':
      x = targetCenterX - popup.width / 2;
      y = target.y + target.height + offset.top;
      break;
    case 'left':
      x = target.x - popup.width - offset.right;
      y = targetCenterY - popup.height / 2;
      break;
    case 'right':
      x = target.x + target.width + offset.left;
      y = targetCenterY - popup.height / 2;
      break;
    case 'top-start':
      x = target.x;
      y = target.y - popup.height - offset.bottom;
      break;
    case 'top-end':
      x = target.x + target.width - popup.width;
      y = target.y - popup.height - offset.bottom;
      break;
    case 'bottom-start':
      x = target.x;
      y = target.y + target.height + offset.top;
      break;
    case 'bottom-end':
      x = target.x + target.width - popup.width;
      y = target.y + target.height + offset.top;
      break;
    case 'left-start':
      x = target.x - popup.width - offset.right;
      y = target.y;
      break;
    case 'left-end':
      x = target.x - popup.width - offset.right;
      y = target.y + target.height - popup.height;
      break;
    case 'right-start':
      x = target.x + target.width + offset.left;
      y = target.y;
      break;
    case 'right-end':
      x = target.x + target.width + offset.left;
      y = target.y + target.height - popup.height;
      break;
  }

  if (bbox) {
    if (!verticalPlacements.has(placement)) {
      if (y + popup.height > bbox.bottom - offset.bottom) {
        y = bbox.bottom - offset.bottom - popup.height;
      } else if (y < bbox.top + offset.top) {
        y = bbox.top + offset.top;
      }
    }

    if (!horizontalPlacements.has(placement)) {
      if (x + popup.width > bbox.right - offset.right) {
        x = bbox.right - offset.right - popup.width;
      } else if (x < bbox.left + offset.left) {
        x = bbox.left + offset.left;
      }
    }
  }

  return { x, y };
}