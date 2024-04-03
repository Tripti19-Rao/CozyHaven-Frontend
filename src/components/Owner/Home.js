import { useEffect, useReducer } from 'react'
import axios from 'axios'
import buildingsReducer from '../../Reducer/buildingsReducer'
import { jwtDecode } from 'jwt-decode'

export default function Home() {
  const buildingsInitialState = {
    data:[],
    serverError:[]
 }
  const [buildings, buildingsDispatch] = useReducer(buildingsReducer, buildingsInitialState)
  useEffect(()=>{

    (async()=>{
      const token = localStorage.getItem('token')
      const {id} = jwtDecode(token)
      if(token){
        console.log(id)
      }
    })()
  },[])
  return (
    <div>Home</div>
  )
}
