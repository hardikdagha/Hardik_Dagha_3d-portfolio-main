const withTrailingSlash = (value: string) =>
  value.endsWith("/") ? value : `${value}/`;

export const publicAssetUrl = (assetPath: string) => {
  const baseUrl = withTrailingSlash(import.meta.env.BASE_URL || "/");
  const normalizedPath = assetPath.replace(/^\/+/, "");
  return `${baseUrl}${normalizedPath}`;
};
