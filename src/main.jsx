import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter } from 'react-router-dom'
import App from '@/App'
import authStore from '@stores/authStore'
import { validateToken } from '@lib/auth'
import { isEmpty } from '@utils'
import Cookies from 'universal-cookie'

const cookies = new Cookies()

// Check for headers in authStore, if there is one, validate it
const validate = async () => {
  const headers = cookies.get('auth-storage')?.state?.headers || {}
  if (!isEmpty(headers)) {
    const { success } = await validateToken(headers)
    authStore.setState({ isAuthenticated: success })
  } else {
    authStore.setState({ isAuthenticated: false })
  }
}

validate()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>
)
