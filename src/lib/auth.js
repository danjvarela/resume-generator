import _ from './axios'

export const login = async (values) => {
  try {
    const {
      data: { data },
      headers,
    } = await _.post('/v1/auth/sign_in', values)
    return { data, headers, success: true }
  } catch (error) {
    return { errors: error.response.data.errors, success: false }
  }
}

export const signup = async (value) => {
  try {
    const { data } = await _.post('/v1/auth', value)
    return { data, success: true }
  } catch (error) {
    return { errors: error.response.data.errors, success: false }
  }
}

export const validateToken = async (headers) => {
  try {
    const { data } = await _.get('/v1/auth/validate_token', { headers })
    return { data, success: true }
  } catch (error) {
    return { errors: error.response.data.errors, success: false }
  }
}

export const signOut = async (headers) => {
  try {
    const { success } = await _.delete('/v1/auth/sign_out', { headers })
    return { success }
  } catch (error) {
    return { errors: error.response.data.errors, success: false }
  }
}
