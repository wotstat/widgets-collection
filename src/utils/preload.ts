

export function preloadImage(href: string) {
  const img = new Image();
  img.src = href;

  img.onload = () => {
    img.onload = null;
  }

  return img;
}