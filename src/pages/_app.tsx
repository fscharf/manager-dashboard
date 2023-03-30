import { PageWrapper } from 'components/core'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import store from 'store'
import 'styles/index.scss'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <PageWrapper>
        <Component {...pageProps} />
      </PageWrapper>
    </Provider>
  )
}
