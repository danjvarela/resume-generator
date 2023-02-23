import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import useAuthStore from '@stores/authStore'
import { login } from '@lib/auth'
import useAutoRedirect from '@hooks/useAutoRedirect'
import useAlertStore from '@stores/alertStore'
import LoginRenderer from './renderer'

export default function Login() {
  useAutoRedirect()

  const [showPassword, setShowPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
    setFocus,
    watch,
  } = useForm()

  const {
    message: alertMessage,
    setError,
    status: alertStatus,
    removeAlert,
  } = useAlertStore()

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
    const loginResponse = await login(data)

    if (loginResponse.success) {
      const { headers } = loginResponse
      useAuthStore.setState({
        headers: {
          'access-token': headers['access-token'],
          client: headers.client,
          expiry: headers.expiry,
          'token-type': headers['token-type'],
          uid: headers.uid,
        },
      })
    } else {
      setFocus('email')
      setError(loginResponse.errors[0])
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
  }

  return <LoginRenderer {...props} />
}