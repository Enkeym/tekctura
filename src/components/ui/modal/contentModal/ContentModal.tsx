

interface ContentModalProps {
  title?: string
  children: React.ReactNode
}

export const ContentModal = ({ title, children }: ContentModalProps) => {
  return (
    <div className="flex flex-col gap-5 p-8 text-left max-md:gap-4 max-md:p-4">
      <h2 className="mx-auto text-base font-bold uppercase text-white max-md:text-sm text-center">
        {title}
      </h2>
      <div className="text-base leading-6 text-white/90 max-md:text-sm max-md:leading-6">
        {children}
      </div>
    </div>
  )
}
