import axios from 'axios'
import { useState, useEffect, useCallback } from 'react'

const UseAxios = ({ method, url, params = {}, headers, data = null} ) => {

  const [response, setResponse] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)


  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await axios({
        method,
        url,
        params,
        headers,
        data,
      });
      // console.log(result.data.fact);
      // console.log(result.data);
      // setResponse(result.data.fact);
      setResponse(result.data);
    }
    catch (error) {
      console.log(error.message)
      setError(error);
    }
    finally {
      setLoading(false);
    }
  }, [method, url, params, headers, data]);

  useEffect(() => {
    fetchData();
      
  }, []);


  return [response, loading, error, fetchData];
}

export default UseAxios
