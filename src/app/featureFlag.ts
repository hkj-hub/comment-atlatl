export const featureFlag = (() => {
  if (!global.window) {
    return { useUserFeature: false };
  }
  const params = new URLSearchParams(window.location.search);
  return {
    useUserFeature: params.get('useUserFeature') === 'true',
  };
})();
