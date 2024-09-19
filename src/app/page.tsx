import { verifySession } from '@/lib/dal'
import { redirect } from 'next/navigation'
import Patients from './(site)/offices/[slug]/queries/page'
import Dashboard from './(backoffice)/dashboard/[id]/home/page'

const Home = async() => {
  const session = await verifySession()
  const userRole = session?.user.role

  if(userRole === 'ADMIN' || userRole === 'USER') {
    return <Patients />
  }else if(userRole === 'BACKOFFICE') {
    return <Dashboard />
  }else{
    redirect('/login')
  }
  
}

export default Home