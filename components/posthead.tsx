import Head from 'next/head'
import {FC} from 'react'

interface PostHeadProps {
  title?: string
  subtitle?: string
  image?: string
  description?: string
}

const PostHead: FC<PostHeadProps> = props => {
  return (
    <Head>
      <title>{props.title}</title>
      <meta name='description' content={props.subtitle}></meta>

      <meta property='og:title' content={props.title}></meta>
      <meta property='og:description' content={props.subtitle}></meta>
      <meta property='og:image' content={props.image}></meta>

      <meta property='twitter:card' content='summary'></meta>
      <meta property='twitter:title' content={props.title}></meta>
      <meta property='twitter:description' content={props.description}></meta>
      <meta property='twitter:image' content={props.image}></meta>
    </Head>
  )
}

export default PostHead
