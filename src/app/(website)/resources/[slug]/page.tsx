type Props = {
  params: {
    slug: string
  }
}

export default function Resource(props: Props) {
  return <div className="flex flex-col gap-4">
    <div className='text-sub-title leading-sub-title font-bold text-center'>Recurso gratuito para {props.params.slug}</div>
  </div>
}
