export const HeroPattern = () => {
  return (
    <div className="pointer-events-none absolute inset-0 hidden overflow-hidden lg:block select-none">
    
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:40px_40px]"
        style={{
          maskImage: 'radial-gradient(ellipse 60% 50% at 50% 0%, #000 70%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 60% 50% at 50% 0%, #000 70%, transparent 100%)'
        }}
      />
    </div>
  )
}
