"use client";

export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Primary gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted" />
      
      {/* Animated blobs */}
      <div className="absolute -top-40 -right-40 size-80 rounded-full bg-primary/20 blur-3xl animate-blob" />
      <div className="absolute -bottom-40 -left-40 size-80 rounded-full bg-blue-500/20 blur-3xl animate-blob animation-delay-2000" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-80 rounded-full bg-purple-500/20 blur-3xl animate-blob animation-delay-4000" />
      
      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02]" 
        style={{
          backgroundImage: `linear-gradient(to right, hsl(var(--foreground)) 1px, transparent 1px),
                           linear-gradient(to bottom, hsl(var(--foreground)) 1px, transparent 1px)`,
          backgroundSize: '4rem 4rem',
        }}
      />
    </div>
  );
}
