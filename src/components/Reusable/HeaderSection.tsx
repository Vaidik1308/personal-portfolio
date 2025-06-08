import AnimatedElement from "./animated-element"

export const HeaderSection = ({children,description}: {children: React.ReactNode,description?: string}) => {
    return (
      <AnimatedElement variant='fadeInUp' delay={0.1} duration={0.5} once={true} className='flex flex-col gap-2 justify-center items-center w-full  border-dashed border-b-[3px] border-gray-600 pb-4'>
        <h2 className='text-4xl font-bold'>{children}</h2>
        {description && <p>{description}</p>}
      </AnimatedElement>
    )
  }