import Document ,{Html, Head, Main, NextScript} from 'next/document'
import { ServerStyleSheet } from 'styled-components'

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = () =>
      originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        })

      const initialProps = await Document.getInitialProps(ctx)
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      }
    } finally {
      sheet.seal()
    }
  }

    render(){
        return(
            <Html lang='en'>
                <Head>
                    <meta charSet='UTF-8'/>
                    <meta name="keyword" content="organic organicVegetable freshfood"/>
                    <meta name="description" content="FreshVeg Ecommerce"></meta>
                    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet"></link>
                    <script  src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.10.2/dist/umd/popper.min.js"></script>
                    <script  src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.min.js"></script>
                    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" />
                    <script src={`https://www.paypal.com/sdk/js?client-id=${process.env.PAYPAL_CLIENT_ID}`}></script>
                    {/* ATl0zdn2faY-L-9IRA4YpmXCEiVFVBHn0rBQVrGh_4Jl6GFDPTQZwMFsqekFb4GA115j1zKmpX7DBd6F */}
                </Head>
                <Main />
                <NextScript />
            </Html>
        )
    }
    
}

