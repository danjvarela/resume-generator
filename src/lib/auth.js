import axios from 'axios'

const _ = axios.create({
  baseURL: 'http://127.0.0.1:3000',
})

const login = async (values) => {
  try {
    const {
      data: { data },
      headers,
    } = await _.post('/v1/auth/sign_in', values)
    return { data, headers }
  } catch (error) {
    console.log(error)
  }
}

export { login }
