import {useContext} from 'react'
import AdminContext from "../../ContextApi/AdminContext"

function Dashboard() {

  const { admin } = useContext(AdminContext)
  console.log(admin)
  return (
    <div>
      <div>Dash Board</div>
      <h1>hi</h1>
      <div>{admin?.users?.length}</div>
    </div>
  )
}

export default Dashboard