import { verifySession } from '@/lib/dal'
import { redirect } from 'next/navigation'
import Patients from './(site)/patients/page'
import Dashboard from './(backoffice)/dashboard/page'

const Home = async() => {
  const session = await verifySession()
  const userRole = session?.user.role

  console.log("TESTE")
  if(userRole === 'ADMIN' || userRole === 'USER') {
    return <Patients />
  }else if(userRole === 'BACKOFFICE') {
    return <Dashboard />
  }else{
    redirect('/login')
  }
  
}

export default Home