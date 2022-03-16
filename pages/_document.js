import Document ,{Html, Head, Main, NextScript} from 'next/document'

class MyDocument extends Document {
    render(){
        return(
            <Html lang='en'>
                <Head>
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

export default MyDocument
