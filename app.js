const puppeteer = require('puppeteer');

const express = require('express')
const app = express()
const port = 3000

app.get('/singlepdf', (req, res) => {
    reg_id = req.query.reg_id;
    test_id = req.query.test_id;

    const createPDF = async (r, t) =>{
        try{
            const browser = await puppeteer.launch();
            const page = await browser.newPage();
            //var url = 'https://ezeelab.cztechasset.co.in/v1/private/spcl_print_pdf.php?reg_id=15324&test_id=376'
            var url = 'https://ezeelab.cztechasset.co.in/v1/private/spcl_print_pdf.php?reg_id=' + r + '&test_id=' + t;
    
            await page.goto(url, {waitUntil: 'networkidle2'})
    
            await page.pdf({
                path: 'pdf1.pdf',
                format: 'A4',
                printBackground: true
            });
    
            console.log('done');
            await browser.close();
            process.exit();
        }
        catch(e){
            console.log(e);
        }
    }

    createPDF(reg_id, test_id);

    res.send('All done');
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})