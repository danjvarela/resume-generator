import useAutoRedirect from '@hooks/useAutoRedirect'

export default function Home() {
  useAutoRedirect()

  return <div>Hello this is home</div>
}
