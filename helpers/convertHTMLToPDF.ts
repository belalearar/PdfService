const puppeteer = require('puppeteer');
export class Helpers {
    public async convertHTMLToPDF(html: string, options: any = null, puppeteerArgs = null, remoteContent = true) {
        if (typeof html !== 'string' && !html) {
            throw new Error(
                'Invalid Argument: HTML expected as type of string and received a value of a different type. Check your request body and request headers.'
            );
        }
        let browser;
        console.log("launch browser")
        if (puppeteerArgs) {
            browser = await puppeteer.launch(puppeteerArgs);
        } else {
            browser = await puppeteer.launch();
        }
        console.log("creating page")
        const page = await browser.newPage();
        await page.setDefaultNavigationTimeout(0);

        if (!options) {
            options = { format: 'Letter' };
        }
        options.timeout = 0;

        if (remoteContent === true) {
            await page.goto(`data:text/html;base64,${Buffer.from(html).toString('base64')}`, {
                waitUntil: 'networkidle0',
                timeout: 0

            });
        } else {
            //page.setContent will be faster than page.goto if html is a static
            console.log("setting page content")
            await page.setContent(html);
        }
        console.log("creating pdf stream")
        const pdf = await page.pdf(options);
        console.log("closing browser")
        await browser.close();
        console.log("returning pdf stream")
        return pdf;
    };

}