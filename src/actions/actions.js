import state from '../state/state'
import { getData } from '../firebase'


export const TEST_ACTION = 'TEST_ACTION';

export function setState() {
  return {
    type: 'SETSTATE',
    payload:state
  }
}
export function searchData (data){
  return {
    type:'SEARCH',
    payload:data
  }
}

const get = new getData()
export const sectionsData = () => dispatch  =>{
   dispatch({type:'LOADING'})
   get.getDataUser( (data) =>{ 
      dispatch({
        type:'DATA_SECTIONS',
        payload:data
      })
    }).then( ()=>dispatch({type:'LOADED'}) )  
}

export const getPruebas = (id) => dispatch  =>{
  dispatch({type:'LOADING'})
  get.getDataPrubebas(id, (data) =>{ 
     dispatch({
       type:'DATA_PRUEBAS',
       payload:data
     })
  }).then(()=> dispatch({type:'LOADED'}))
}

export const isVerify = () => dispatch  =>{
  dispatch({type:'LOADING'})
  get.verifyUsers((data) =>{ 
    dispatch({
      type:'VERIFYING',
      payload:data
    })
  } ,
  ()=>{
    get.getDataUser( (data) =>{ 
      dispatch({
        type:'DATA_SECTIONS',
        payload:data
      })
   }
  ).then(()=>{
    dispatch({type:'LOADED'})
  })}
  )
}


export const getResult = (values , message) => dispatch =>{
  get.getResult(values, (data)=>{
    dispatch({
      type:'GET_ALL_RESULT',
      payload: data
    })
  },
   message
  )
}

export const resetAll =()=>{
  return{
    type:'RESET_ALL'
  }
}