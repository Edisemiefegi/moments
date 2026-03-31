import { useStore } from '@/store/Store'

export default function Index() {
    const {currentUser} = useStore()
  return (
    <div>Index

        {currentUser?.name}
    </div>
  )
}
