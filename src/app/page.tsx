import { verifySession } from '@/lib/dal'
import { redirect } from 'next/navigation'
import Dashboard from './(backoffice)/dashboard/[id]/home/page'

const Home = async() => {
  const session = await verifySession()
  const userRole = session?.user.role

  if(userRole === 'ADMIN' || userRole === 'USER') {
    redirect(`offices/${session?.user.officeId}/queries`)
  }else if(userRole === 'BACKOFFICE') {
    return <Dashboard />
  }else{
    redirect('/login')
  }
  
}

export default Home