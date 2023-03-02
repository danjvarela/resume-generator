import _ from './axios'

export const getAllResumes = async (headers) => {
  try {
    const {
      data: { data },
    } = await _.get('/v1/resumes', { headers })
    return { data, success: true }
  } catch (error) {
    const { data, status } = error.response
    return { errors: data.errors, status, success: false }
  }
}
