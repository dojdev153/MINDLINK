export default function City3DBackground() {
  return (
    <iframe
      src="/city-3d/dist/index.html"
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        border: 'none',
        zIndex: 0,
        pointerEvents: 'none',
      }}
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      loading="eager"
      title="CITY-3D Background"
    />
  );
}
