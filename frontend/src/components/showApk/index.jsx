import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Table from './styled'

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
      { data.length === 0 && !loading && <h2>No Data</h2>}
      { data.length > 0 && (
        <>
          <h2>All APK submitted files Data</h2>
          <Table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Version</th>
                  <th>Size</th>
                </tr>
              </thead>
              <tbody>
              { data.map((value, index) => {
                return (
                  <tr>
                    <td>{value.name}</td>
                    <td>{value.description}</td>
                    <td>{value.version}</td>
                    <td>{value.size}</td>
                  </tr>
                  )
                }) }
              </tbody>
            </Table>
        </>
      ) }
    </div>
  )
}
