import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { login } from '@lib/auth'
import useAlertStore from '@stores/alertStore'
import { useNavigate, useSearchParams } from 'react-router-dom'
import LoginRenderer from './renderer'
import useAuthStore from '@stores/authStore'
import { shallow } from 'zustand/shallow'

export default function Login() {
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [setHeaders, setHeadersValidated, setLoggedUser] = useAuthStore(
    (state) => [
      state.setHeaders,
      state.setHeadersValidated,
      state.setLoggedUser,
    ],
    shallow
  )

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
    setFocus,
    watch,
  } = useForm()

  const [alertMessage, setError, setSuccess, alertStatus, removeAlert] =
    useAlertStore(
      (state) => [
        state.message,
        state.setError,
        state.setSuccess,
        state.status,
        state.removeAlert,
      ],
      shallow
    )

  useEffect(() => {
    if (searchParams.get('account_confirmation_success')) {
      setSuccess(
        'Your account has been confirmed. Login to start creating your resume!'
      )
    }
  }, [searchParams])

  // remove alert if user types on inputs
  useEffect(() => {
    const subscription = watch(({ email, password }) => {
      if (email || password) {
        removeAlert()
      }
    })
    return () => subscription.unsubscribe()
  }, [watch])

  // logs in user
  const onSubmit = async (data) => {
    const { success, headers, data: loggedUser, errors } = await login(data)

    if (success) {
      setHeaders({
        'access-token': headers['access-token'],
        client: headers.client,
        expiry: headers.expiry,
        'token-type': headers['token-type'],
        uid: headers.uid,
      })
      setLoggedUser(loggedUser)
      setHeadersValidated(true)
      navigate('/resumes')
    } else {
      setFocus('email')
      setError(errors[0])
      reset({ password: '', email: '' })
    }
  }

  const props = {
    showPassword,
    setShowPassword,
    register,
    handleSubmit,
    isSubmitting,
    alertMessage,
    alertStatus,
    onSubmit,
    navigate,
  }

  return <LoginRenderer {...props} />
}
