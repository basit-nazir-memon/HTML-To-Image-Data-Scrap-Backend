function formatNumber(num) {
    if (num >= 1000) {
        // Convert to k format
        return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
}

function getTimeDifference(dateString) {
    // Parse the input date string into a Date object
    const currentDate = new Date();
    const inputDate = new Date(dateString);

    // Calculate the difference in milliseconds
    const difference = currentDate - inputDate;

    // Convert milliseconds to days, hours, and months
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const months = Math.floor(days / 30);

    // Determine the appropriate message based on the difference
    if (days < 1) {
        return `${hours} hour${hours === 1 ? '' : 's'} ago`;
    } else if (days < 30) {
        return `${days} day${days === 1 ? '' : 's'} ago`;
    } else {
        return `${months} month${months === 1 ? '' : 's'} ago`;
    }
}


const generateHTML = (data) =>{
    const cardHtml = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
            <script src="./assets/js/kit.fontawesome.js" crossorigin="anonymous"></script>
            <link rel="stylesheet" href="./assets/css/font-awesome.min.css">
            <style>
                body{
                    margin: 0;
                    padding: 0;
                    width: 100%;
                    font-family: Calibri, 'Trebuchet MS', sans-serif;
                    font-size: 22px;
                }
                .card{
                    box-shadow: 0px 0px 7px 2px rgba(199, 198, 198, 0.97);
                    -webkit-box-shadow: 0px 0px 7px 2px rgba(199, 198, 198, 0.97);
                    -moz-box-shadow: 0px 0px 7px 2px rgba(199, 198, 198, 0.97);
                    width: (100% - 20px);
                    margin: 10px;
                    height: calc(100vh - 50px);
                    border-radius: 10px;
                    padding: 15px;
                }
                .imageSec{
                    position: relative;
                }
        
                .imageSec img{
                    width: 100%;
                    height: 320px;
                    border-radius: 10px;
                }
                .blackShadow{
                    width: 100%;
                    background-color: black;
                    height: 320px;
                    border-radius: 10px;
                    opacity: 15%;
                    position: absolute;
                    top: 0;
                }
                .arrows{
                    font-size: 50px;
                    color: lightgray;
                    position: absolute;
                    top: 135px;
                }
                .right{
                    right: 5px;
                }
                .left{
                    left: 5px;
                }
        
                .pa {
                    position: absolute;
                }
                .cardLabels{
                    margin-top: 10px;
                    width: 100%;
                    display: flex;
                    top: 0;
                }
                .cardLabel{
                    padding: 10px 20px;
                    font-size: 20px;
                    font-weight: bold;
                    color: white;
                    margin-left: 10px;
                    border-radius: 10px;
                    line-height: 18px;
                }
        
                .analytics{
                    padding: 0 20px;
                    display: flex;
                    justify-content: space-between;
                }
                .analytic{
                    text-align: center;
                }
        
            </style>
        </head>
        <body>
            <div class="card">
                <div class="imageSec">
                    <img src="${data?.imageUrls[0]}" alt="image">
                    <div class="blackShadow"></div>
                    <i class="fa-solid fa-angle-right arrows right"></i>
                    <i class="fa-solid fa-angle-left arrows left"></i>
                    <div class="cardLabels pa">
                        ${data.isFeatured ? '<div class="cardLabel" style="background-color: rgb(67, 66, 68);">Featured</div>' : '' }
                        <div class="cardLabel" style="background-color: orange;">${data.rentalStatus}</div>
                    </div>
                    <p class="pa" style="top: 220px; color:aliceblue; left: 15px; font-weight: bold; font-size: 38px;">£${data.salesPrice}</p>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center; font-size: 20px;">
                    <p style="color: orange;">${data.propertyType}</p>
                    <div style="color: gray;">
                        ${data.bedrooms}
                        <i class="fa-solid fa-bed"></i>
                        |
                        ${data.bathrooms}
                        <i class="fa-solid fa-bath"></i>
                    </div>
                </div>
                <p style="margin-top: 10px; margin-bottom: 25px;">${data.street ? data.street + ', ' : ''} ${data.city ? data.city + ', ' : ''} ${data.postCode ? data.postCode.substr(0,3) : ''}</p>
        
                <div class="analytics" style="color: rgb(56, 56, 56);">
                    <div class="analytic">
                        <div style="font-weight: bold; font-size: 30px; ">£${formatNumber(data.grossIncome)}</div>
                        <div>Est. Revenue</div>
                    </div>
                    <div class="analytic" style="padding: 0 50px; border-left: 3px solid lightgray; border-right: 3px solid lightgray;">
                        <div style="font-weight: bold; font-size: 30px; ">£${Math.ceil(data.adr)}</div>
                        <div>Avg. Daily Rate</div>
                    </div>
                    <div class="analytic">
                        <div style="font-weight: bold; font-size: 30px; color: rgb(47, 47, 170);">${data.airbnbRating}</div>
                        <div>Airbnb Rating</div>
                    </div>
                </div>
        
                <hr style="margin-top: 25px; width: calc(100% + 30px); margin-left: -15px;">
                
                <div style="height: 52px; display: flex; justify-content: space-between; color: gray; margin-top: -10px;">
                    <p><b>Phone:</b> ${data.owerPhone ? data.owerPhone : 'Not added yet'}</p>
                    <p>${getTimeDifference(data.addedOn)}</p>
                </div>
            </div>
        </body>
        </html>
    `;
    return cardHtml;
}

module.exports = {generateHTML};