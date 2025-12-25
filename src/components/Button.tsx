import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

type ButtonVariant = 'primary' | 'secondary'
type ButtonSize = 'sm' | 'md' | 'lg'

type ButtonProps = {
  variant?: ButtonVariant
  size?: ButtonSize
  children: React.ReactNode
  onClick?: () => void
  href?: string
  to?: string
  openInNewTab?: boolean
  className?: string
}

const sizeStyles: Record<ButtonSize, {
  padding: string
  text: string
}> = {
  sm: {
    padding: 'px-6 py-2',
    text: 'label-s',
  },
  md: {
    padding: 'px-6 py-3',
    text: 'label-m',
  },
  lg: {
    padding: 'px-6 py-4',
    text: 'label-l',
  },
}

const motionStyles: Record<ButtonVariant, {
  base: {
    backgroundColor: string
    borderColor: string
    color: string
  }
  hover: {
    backgroundColor: string
    borderColor: string
    color?: string
    scale: number
  }
}> = {
  primary: {
    base: {
      backgroundColor: 'var(--background-inverse)',
      borderColor: 'transparent',
      color: 'var(--content-primary-inverse)',
    },
    hover: {
      backgroundColor: 'var(--background-primary)',
      borderColor: 'var(--border-primary)',
      color: 'var(--content-primary)',
      scale: 1.09,
    },
  },
  secondary: {
    base: {
      backgroundColor: 'var(--background-secondary)',
      borderColor: 'transparent',
      color: 'var(--content-primary)',
    },
    hover: {
      backgroundColor: 'var(--background-primary)',
      borderColor: 'var(--border-primary)',
      scale: 1.09,
    },
  },
}

export default function Button({
  variant = 'primary',
  size = 'md',
  children,
  onClick,
  href,
  to,
  openInNewTab = false,
  className = '',
}: ButtonProps) {
  const variantStyles = motionStyles[variant]
  const sizing = sizeStyles[size]

  const baseClassName = [
    'appearance-none',
    'outline-none',
    'border',
    'bg-transparent',
    'inline-flex items-center justify-center',
    'rounded-xl',
    'select-none',
    'cursor-pointer',
    sizing.padding,
    sizing.text,
    className,
  ].join(' ')

  const motionConfig = {
    initial: variantStyles.base,
    animate: variantStyles.base,
    whileHover: variantStyles.hover,
    transition: {
      type: 'spring' as const,
      stiffness: 260,
      damping: 18,
      backgroundColor: { duration: 0.15 },
      borderColor: { duration: 0.15 },
      color: { duration: 0.1 },
    },
    style: {
      ...variantStyles.base,
      WebkitTapHighlightColor: 'transparent',
    },
  }

  if (href) {
    const MotionLink = motion.a
    return (
      <MotionLink
        {...motionConfig}
        href={href}
        target={openInNewTab ? '_blank' : undefined}
        rel={openInNewTab ? 'noopener noreferrer' : undefined}
        className={baseClassName}
      >
        {children}
      </MotionLink>
    )
  }

  if (to) {
    const MotionDiv = motion.div
    return (
      <MotionDiv {...motionConfig} className={baseClassName}>
        <Link to={to} className="w-full h-full flex items-center justify-center">
          {children}
        </Link>
      </MotionDiv>
    )
  }

  const MotionButton = motion.button
  return (
    <MotionButton
      {...motionConfig}
      onClick={onClick}
      className={baseClassName}
    >
      {children}
    </MotionButton>
  )
}