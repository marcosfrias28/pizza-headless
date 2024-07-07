
interface ButtonProps {
  className?: string
  onClick?: () => void
  children: React.ReactNode
}

function Button (props: ButtonProps) {
  const { className, onClick } = props

  return (
    <button
      className={`h-[44px] rounded-[5px] bg-[#f6ce40] px-10 text-black font-semibold text-left text-base flex items-center justify-center ${className}`}
      onClick={onClick}
    >
      {props.children}
    </button>
  )
}

export default Button
