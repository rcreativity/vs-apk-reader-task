import React, { useState, useEffect } from 'react'
import axios from 'axios'

export default function ShowAllApk() {
  const [state, setstate] = useState({
    loading: true,
    data: [],
    error: false
  })

  useEffect(()=>{

    setstate({
      ...state,
      loading: true
    })
    axios.get('http://localhost:3000/apk')
    .then(function (response) {
      setstate({
        ...state,
        loading: false,
        data: response.data
      })
    })
    .catch(function (error) {
      console.log(error);
      setstate({
        ...state,
        error: true,
        loading: false,
      })
    });

  }, [])

  const { loading, data, error } = state;

  return (
    <div>
      { loading && <h1>Loading</h1> }
      { error && !loading && <h1>Something went wrong, Please try again</h1> }
      { data.length > 0 && (
        JSON.stringify(data, 4)
      ) }
    </div>
  )
}
