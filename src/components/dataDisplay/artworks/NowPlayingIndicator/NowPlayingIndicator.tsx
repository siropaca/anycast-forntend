export function NowPlayingIndicator() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black/50">
      <div className="flex items-end gap-1 h-8">
        <span
          className="w-1 h-full origin-bottom rounded-full bg-white"
          style={{ animation: 'now-playing-bar 0.8s ease-in-out infinite' }}
        />
        <span
          className="w-1 h-full origin-bottom rounded-full bg-white"
          style={{
            animation: 'now-playing-bar 0.8s ease-in-out 0.2s infinite',
          }}
        />
        <span
          className="w-1 h-full origin-bottom rounded-full bg-white"
          style={{
            animation: 'now-playing-bar 0.8s ease-in-out 0.4s infinite',
          }}
        />
      </div>
    </div>
  );
}
