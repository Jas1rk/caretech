import React, { useEffect } from 'react'
import useFetchDoctor from '../../../Hooks/UseFetchDoctor'
import { useLocation } from 'react-router-dom'

const Doctordetails = () => {
    const location = useLocation()
    const queryparams = new URLSearchParams(location.search)
    const doctorid = queryparams.get('doctorid')
    const {doctor} = useFetchDoctor(doctorid)
    console.log('ddkkdkd',doctor)
    
  return (
    <div>
     hfjfjjkjjkjkjkjkjkjkjkjjk
    </div>
  )
}

export default Doctordetails
