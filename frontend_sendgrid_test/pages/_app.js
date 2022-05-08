import '../styles/globals.css'
import { AuthProvider } from '../contexts/auth.context'
import { MailsProvider } from '../contexts/mails.context'

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <MailsProvider>
        <Component {...pageProps} />
      </MailsProvider>
    </AuthProvider>
  )
}

export default MyApp
