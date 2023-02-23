import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { signup } from '@lib/auth'
import { useNavigate } from 'react-router-dom'
import useAlertStore from '@stores/alertStore'
import useAutoRedirect from '@hooks/useAutoRedirect'
import SignupRenderer from './renderer'

export default function Signup() {
  useAutoRedirect()

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm()
  const navigate = useNavigate()
  const { setSuccess } = useAlertStore()

  useEffect(() => {
    console.log(errors)
  }, [errors])

  const onSubmit = async (data) => {
    const signupData = await signup({
      ...data,
      confirm_success_url: `${import.meta.env.VITE_APP_BASE_URL}/login`,
    })

    if (signupData.success) {
      setSuccess(
        'Account created successfully. Please check your email for confirmation instructions.'
      )
      navigate('/login')
    } else {
      Object.keys(signupData.errors).forEach((key) => {
        if (key === 'full_messages') {
          return
        }
        setError(
          key,
          { type: 'custom', message: signupData.errors[key][0] },
          { shouldFocus: true }
        )
      })
    }
  }

  const props = {
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    register,
    handleSubmit,
    onSubmit,
    errors,
    isSubmitting,
  }

  return <SignupRenderer {...props} />
}
