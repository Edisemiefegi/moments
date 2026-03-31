import { useStore } from '@/store/Store'

export default function Index() {
    const {currentUser} = useStore()
  return (
    <div className=''>Index

        {currentUser?.name}
    </div>
  )
}
