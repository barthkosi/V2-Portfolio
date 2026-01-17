import { motion, Variants } from "motion/react"
import { springSnappy, anim } from "../lib/transitions"
import { useLoading } from "../context/LoadingContext"

type InfoBlockVariant = 'default' | 'centered'

type InfoBlockProps = {
  title: string
  number: string | number
  description: string
  variant?: InfoBlockVariant
  onComplete?: () => void
}

export default function InfoBlock({
  title,
  number,
  description,
  variant = 'default',
  onComplete,
}: InfoBlockProps) {
  const isCentered = variant === 'centered'
  const { isContentReady } = useLoading()

  const mainContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.5,
      },
    },
  }

  const textContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
        when: "beforeChildren",
      },
    },
  }

  const letterVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: springSnappy,
    },
  }

  const animateText = (text: string) => {
    return text.split('').map((char, index) => (
      <motion.span
        key={`${char}-${index}`}
        variants={letterVariants}
        style={{ display: 'inline-block', whiteSpace: char === ' ' ? 'pre' : 'normal' }}
      >
        {char}
      </motion.span>
    ))
  }

  return (
    <motion.div
      className={[
        'flex flex-col gap-2',
        isCentered
          ? 'items-center text-center'
          : 'items-center lg:items-start text-center lg:text-left lg:sticky lg:top-[134px] lg:self-start',
      ].join(' ')}
      variants={mainContainerVariants}
      initial="hidden"
      animate={isContentReady ? "visible" : "hidden"}
    >
      <motion.div
        className={[
          'flex items-start',
          isCentered ? 'gap-0' : 'gap-2',
        ].join(' ')}
      >
        <motion.h2
          className={!isCentered ? 'whitespace-nowrap flex-shrink-0' : undefined}
          variants={textContainerVariants}
        >
          {animateText(title)}
        </motion.h2>

        <motion.p
          className={[
            'h6 text-[var(--content-primary)]',
            !isCentered ? 'whitespace-nowrap flex-shrink-0' : '',
          ].join(' ')}
          variants={textContainerVariants}
        >
          {animateText(String(number))}
        </motion.p>
      </motion.div>

      <motion.p
        className={[
          'text-[var(--content-secondary)]',
          isCentered
            ? 'body-m-medium'
            : 'body-m-medium max-w-[480px] lg:max-w-[335px]',
        ].join(' ')}
        variants={anim.fadeUp}
        onAnimationComplete={(definition) => {
          if (definition === 'visible') {
            onComplete?.()
          }
        }}
      >
        {description}
      </motion.p>
    </motion.div>
  )
}
