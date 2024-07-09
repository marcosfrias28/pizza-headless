type SVGProps = React.SVGProps<SVGSVGElement>

function MinusIcon (props: SVGProps) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path d='M5 12h14' />
    </svg>
  )
}

export default MinusIcon
