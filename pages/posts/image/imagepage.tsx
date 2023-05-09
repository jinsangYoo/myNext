import Image from 'next/image'

const IndexPage = () => {
  return (
    <div>
      <div
        style={{
          width: 500,
          height: 200,
          position: 'relative',
        }}>
        <Image
          src='https://images.unsplash.com/photo-1605460375648-278bcbd579a6'
          layout='fill'
          objectFit='cover'
          alt='eng setter'
        />
      </div>
    </div>
  )
}

export default IndexPage
