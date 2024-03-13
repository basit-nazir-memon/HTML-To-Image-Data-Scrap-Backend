const express = require('express');
const puppeteer = require('puppeteer');
const { generateHTML } = require('./generator');
require('dotenv').config();
const app = express();
const port = 3000;
const cors = require('cors');
const fs = require('fs');

app.use(express.json());
app.use(cors());

let existingData = [];

// Set CORS headers for the /convert endpoint
app.options('/convert', cors());

// Route to convert HTML/CSS card to JPEG and PNG images
app.post('/convert', async (req, res) => {
    let {linkText, Imgtype} = req.body;

    if (!linkText){
        return res.status(404).json({message: 'Empty Link'});
    }

    if (!Imgtype){
        return res.status(404).json({message: 'Empty Type'});
    }

    const url = new URL(linkText);
    const pathParts = url.pathname.split('/');
    const identifier = pathParts[pathParts.length - 1];

    console.log("ID", identifier)

    var totalPages = 1;
    var listingData;

    const listingInfo = existingData.find(v => v.id === identifier);

    const dataUrl = listingInfo ? `https://app.airbuyandsell.co/api/listing?location=${listingInfo.city?listingInfo.city:''}&minPrice=0&maxPrice=2000000&minBathrooms=${listingInfo.bathrooms ? listingInfo.bathrooms :0}&maxBathrooms=${listingInfo.bathrooms ? listingInfo.bathrooms :20}&minBedrooms=${listingInfo.bedrooms ? listingInfo.bedrooms :0}&maxBedrooms=${listingInfo.bedrooms ? listingInfo.bedrooms :20}&page=`
                    : 'https://app.airbuyandsell.co/api/listing?location=&minPrice=0&maxPrice=2000000&minBathrooms=0&maxBathrooms=20&minBedrooms=0&maxBedrooms=20&page=';
                    
    for (let i = 1; i <= totalPages && !listingData; i++) {
        try {
            const response = await fetch(dataUrl + i);
            const data = await response.json();
            console.log("DataUrl", dataUrl + i);
            const listings = data.results;
            totalPages = data.totalPages;
            console.log("Total Pages", totalPages);
            listingData = listings.find(listing => {
                return listing.id === identifier;
            });
            if (listingData)
                break;
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    if (listingData) {
        // Launch a headless browser
        const browser = await puppeteer.launch({ 
            args: [
                "--disable-setuid-sandbox",
                "--no-sandbox",
                "--single-process",
                "--no-zygote",
            ],
            executablePath: process.env.NODE_ENV === 'production' 
                                ? process.env.PUPPETEER_EXECUTABLE_PATH
                                : puppeteer.executablePath() 
        });
        
        try{
            const page = await browser.newPage();

            // Set the viewport width
            await page.setViewport({ width: 640, height: 650 });

            // Set the HTML content
            const cardHtml = generateHTML(listingData);

            // Set the HTML content and wait for it to render
            await page.setContent(cardHtml);

            // Wait for 2 seconds for the content to render
            await new Promise(resolve => setTimeout(resolve, 3000));
            
            const buffer = await page.screenshot({type: Imgtype === "PNG" ? "png" : "jpeg"})
            res.set('Content-Type', Imgtype === "PNG" ? 'image/png' : 'image/jpeg');
            res.send(buffer);
        }catch(e){
            console.error(e);
        } finally {
            await browser.close();
        }

        
    }else{
        res.status(404).json({
            message: "Listing Not Found"
        })
    }
});

// Start the server
app.listen(port, () => {
    try {
        existingData = JSON.parse(fs.readFileSync('data.json'));
        console.log("JSON File Data READ Successfully");
    } catch (error) {
        console.error('Error reading data from JSON file:', error);
    }
    console.log(`Server running at http://localhost:${port}`);

});
