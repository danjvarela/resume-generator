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

export const createResume = async (values, headers) => {
  try {
    const {
      data: { data },
    } = await _.post('/v1/resumes', { resume: values }, { headers })
    return { data, success: true }
  } catch (error) {
    const { data, status } = error.response
    return { errors: data.errors, status, success: false }
  }
}
