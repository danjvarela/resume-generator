import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { signup } from '@lib/auth'
import { useNavigate } from 'react-router-dom'
import useAlertStore from '@stores/alertStore'
import SignupRenderer from './renderer'
import omit from 'lodash-es/omit'

export default function Signup() {
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

  const onSubmit = async (data) => {
    const { success, errors } = await signup({
      ...data,
      confirm_success_url: `${import.meta.env.VITE_APP_BASE_URL}/login`,
    })

    if (success) {
      setSuccess(
        'Account created successfully. Please check your email for confirmation instructions.'
      )
      navigate('/login')
    } else {
      Object.keys(omit(errors, ['full_messages'])).forEach((key) => {
        setError(
          key,
          { type: 'custom', message: errors[key][0] },
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
    navigate,
  }

  return <SignupRenderer {...props} />
}
