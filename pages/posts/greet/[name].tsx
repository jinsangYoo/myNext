import {GetServerSideProps} from 'next'
import {GreetParams} from '@/pages/types/greet-params'
import {FC} from 'react'
import {useRouter} from 'next/router'

export const getServerSideProps: GetServerSideProps<GreetParams> = async ({params}) => {
  const {name} = params as GreetParams
  return {
    props: {
      name,
    },
  }
}

// interface GreetProps {
//   name?: string
// }

// const Greet: FC<GreetProps> = props => {
//   return <h1>Hello, {props.name}!</h1>
// }

const Greet = () => {
  const {query} = useRouter()
  console.log(query)
  return <h1>Hello, {query.name}!</h1>
}

export default Greet
