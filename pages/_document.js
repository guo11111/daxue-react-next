/* eslint-disable class-methods-use-this */
import React from 'react';
import Document, {
    Html, Head, Main, NextScript
} from 'next/document';
import customConfigs from 'custom.config';

export default class MyDocument extends Document {
    render() {
        // eslint-disable-next-line prefer-destructuring
        const staticCdnPrefix = customConfigs.staticCdnPrefix;
        // console.log('staticCdnPrefix', staticCdnPrefix);
        return (
            <Html lang="en">
                <Head>
                    <link
                        rel="icon"
                        href="/favicon.ico"
                    />
                    <link
                        rel="stylesheet"
                        type="text/css"
                        href={`${staticCdnPrefix}/framework/css/global.css`}
                    />
                    <script
                        type="text/javascript"
                        src={`${staticCdnPrefix}/project/xdf-analysis-log/1.x/js/page.bundle.js`}
                    >
                    </script>
                    <script
                        type="text/javascript"
                        src={`${staticCdnPrefix}/framework/js/global.js`}
                    >
                    </script>
                    {/* <script type="text/javascript"> */}
                    {/* var g_header_host = {'domains.sso': 'https://login.neibu.koolearn.com/sso';}; */}
                    {/* </script> */}
                    <script
                        type="text/javascript"
                        src={`${staticCdnPrefix}/project/header/1.x/common/common-mix/common-mix.bundle.js`}
                    >
                    </script>
                    <script
                        type="text/javascript"
                        src={`${staticCdnPrefix}/project/header/1.x/common/dialog-mini-login/dialog-mini-login.bundle.js`}
                    >
                    </script>
                </Head>
                <body>
                    <Main />
                    <NextScript />
                    <script
                        type="text/javascript"
                        id="jg-plus-helping-2"
                        data-type="www"
                        data-hide-dialog="true"
                        data-query=".zixun"
                        src={`${staticCdnPrefix}/project/teach/1.x/common/plus-helping/2.x/plus-helping-single.bundle.js`}
                        defer
                        async
                    >
                    </script>
                </body>
            </Html>
        );
    }
}
