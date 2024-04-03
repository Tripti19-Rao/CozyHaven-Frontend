import { useEffect, useReducer } from 'react'
import axios from 'axios'
import buildingsReducer from '../../Reducer/buildingsReducer'
import { jwtDecode } from 'jwt-decode'
import { useNavigate } from 'react-router-dom'
import HomeDisplay from './HomeDisplay'
import BuildingContext from '../../ContextApi/BuildingContext'

export default function Home() {
  const navigate = useNavigate()
  const buildingsInitialState = {
    data:[],
    serverError:[]
 }
  const [buildings, buildingsDispatch] = useReducer(buildingsReducer, buildingsInitialState)
  useEffect(()=>{

    (async()=>{
      const token = localStorage.getItem('token')
      if(token && typeof token === 'string'){
        const {id} = jwtDecode(token)
        const response = await axios.get(`http://localhost:3055/api/buildings/${id}`,{
          headers:{
            Authorization:token
          }})
        buildingsDispatch({type:'SET_BUILDINGS', payload:response.data})
      }else{
        navigate('/notfound')
      }
    })()
  },[])
  return (
    <BuildingContext.Provider value={{buildings, buildingsDispatch}}>
    <div>
      <h1>Buildings - {buildings.data.length}</h1>
      <HomeDisplay buildings={buildings}/>
      <button onClick={()=>{navigate('/display')}}> home</button>
    </div>
    </BuildingContext.Provider>
  )
}
