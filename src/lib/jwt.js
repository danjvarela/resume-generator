import * as jose from 'jose'

// encrypts data into JWT
const signJWT = async (payload) => {
  const secret = new TextEncoder().encode(import.meta.env.VITE_APP_JWT_SECRET)
  const alg = 'HS256'

  try {
    return await new jose.SignJWT(payload)
      .setProtectedHeader({ alg })
      .sign(secret)
  } catch (err) {
    // don't do anything
  }
}

// decrypts JWT
const verifyJWT = async (jwt) => {
  const secret = new TextEncoder().encode(import.meta.env.VITE_APP_JWT_SECRET)
  try {
    const { payload, protectedHeader } = await jose.jwtVerify(jwt, secret)
    return { payload, protectedHeader }
  } catch (err) {
    // don't do anything
  }
}

export { signJWT, verifyJWT }
