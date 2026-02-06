export function NowPlayingIndicator() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black/50">
      <div className="flex items-end gap-1 h-8">
        <span
          className="w-1 h-full origin-bottom rounded-full bg-white"
          style={{ animation: 'now-playing-bar 1.2s ease-in-out infinite' }}
        />
        <span
          className="w-1 h-full origin-bottom rounded-full bg-white"
          style={{
            animation: 'now-playing-bar 1.2s ease-in-out 0.3s infinite',
          }}
        />
        <span
          className="w-1 h-full origin-bottom rounded-full bg-white"
          style={{
            animation: 'now-playing-bar 1.2s ease-in-out 0.6s infinite',
          }}
        />
      </div>
    </div>
  );
}
