import { PageWrapper } from 'components/core'
import type { AppProps } from 'next/app'
import dynamic from 'next/dynamic'
import { Provider } from 'react-redux'
import store from 'store'
import 'styles/index.scss'

function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <PageWrapper>
        <Component {...pageProps} />
      </PageWrapper>
    </Provider>
  )
}

export default dynamic(() => Promise.resolve(App), { ssr: false })
