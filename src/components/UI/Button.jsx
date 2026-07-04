export default function Button({ children, variant = 'primary', className = '', ...props }) {
  const base = 'inline-flex items-center justify-center min-h-[52px] rounded-full px-6 font-black tracking-tight border border-transparent cursor-pointer transition-all duration-200'
  const variants = {
    primary: 'bg-gradient-to-br from-orange to-orange-2 text-[#130805] shadow-[0_22px_64px_rgba(255,91,21,.27)] hover:scale-[1.03] hover:shadow-[0_28px_72px_rgba(255,91,21,.35)] btn-shine',
    ghost: 'bg-white/[.07] border-white/[.16] backdrop-blur-[14px] hover:bg-white/[.12]',
  }
  return <button className={`${base} ${variants[variant]} ${className}`} {...props}>{children}</button>
}
