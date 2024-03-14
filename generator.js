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
        return 'Added ' + (hours === 1 ? 'an hour ago' : `${hours} hours ago`);
    } else if (days < 30) {
        return 'Added ' + (days === 1 ? 'a day ago' : `${days} days ago`);
    } else {
        return 'Added ' + (months === 1 ? 'a month ago' : `${months} months ago`);
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
            <link rel="preconnect" href="https://fonts.googleapis.com">
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
            <link href="https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200..1000;1,200..1000&display=swap" rel="stylesheet">
            <style>
                body{
                    margin: 0;
                    padding: 0;
                    width: 100%;
                    font-family: "Nunito", sans-serif;
                    font-size: 20px;
                    font-weight: 600;
                    color: #495057;
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
                    height: 330px;
                    border-radius: 10px;
                }
                .blackShadow{
                    width: 100%;
                    background-color: black;
                    height: 330px;
                    border-radius: 10px;
                    opacity: 15%;
                    position: absolute;
                    top: 0;
                }
                .arrows{
                    position: absolute;
                    top: 135px;
                }
                .right{
                    right: -5px;
                }
                .left{
                    left: -5px;
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
                    /* padding: 0 20px; */
                    display: flex;
                    justify-content: space-evenly;
                }
                .analytic{
                    text-align: center;
                }
        
            </style>
        </head>
        <body>
            <div class="card">
                <div class="imageSec">
                    <img src="${data?.imageUrls[0]}" alt="" srcset="">
                    <div class="blackShadow"></div>
                    <svg class="arrows right" width="60px" height="80px" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M8.29289 4.29289C8.68342 3.90237 9.31658 3.90237 9.70711 4.29289L16.7071 11.2929C17.0976 11.6834 17.0976 12.3166 16.7071 12.7071L9.70711 19.7071C9.31658 20.0976 8.68342 20.0976 8.29289 19.7071C7.90237 19.3166 7.90237 18.6834 8.29289 18.2929L14.5858 12L8.29289 5.70711C7.90237 5.31658 7.90237 4.68342 8.29289 4.29289Z" fill="#d3d3d3"/></svg>
                    <svg class="arrows left" width="60px" height="80px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M15.7071 4.29289C16.0976 4.68342 16.0976 5.31658 15.7071 5.70711L9.41421 12L15.7071 18.2929C16.0976 18.6834 16.0976 19.3166 15.7071 19.7071C15.3166 20.0976 14.6834 20.0976 14.2929 19.7071L7.29289 12.7071C7.10536 12.5196 7 12.2652 7 12C7 11.7348 7.10536 11.4804 7.29289 11.2929L14.2929 4.29289C14.6834 3.90237 15.3166 3.90237 15.7071 4.29289Z" fill="#d3d3d3"/></svg>
                    <div class="cardLabels pa">
                        ${data.isFeatured ? '<div class="cardLabel" style="background-color: #3e4c66;">Featured</div>' : ''}
                        ${(data.rentalStatus === 'Active') ? ('<div class="cardLabel" style="background-color: #ffa164;">' + data.rentalStatus + '</div>') : ''}
                    </div>
                    <p class="pa" style="top: 220px; color:aliceblue; left: 15px; font-weight: bold; font-size: 35px;">£${data.salesPrice}</p>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center; font-size: 20px;">
                    <p style="color: #ffa164;">${data.propertyType ? data.propertyType : ' '}</p>
                    <div style="color: #808080; display: flex; align-items: center;">
                        ${data.bedrooms ? data.bedrooms : 0}
                        <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 32 32" height="25px" width="30px" xmlns="http://www.w3.org/2000/svg"><path d="M 6 6 C 4.355469 6 3 7.355469 3 9 L 3 15.78125 C 2.390625 16.332031 2 17.121094 2 18 L 2 27 L 7 27 L 7 25 L 25 25 L 25 27 L 30 27 L 30 18 C 30 17.121094 29.609375 16.332031 29 15.78125 L 29 9 C 29 7.355469 27.644531 6 26 6 Z M 6 8 L 26 8 C 26.554688 8 27 8.445313 27 9 L 27 15 L 25 15 L 25 14 C 25 12.355469 23.644531 11 22 11 L 18 11 C 17.234375 11 16.53125 11.300781 16 11.78125 C 15.46875 11.300781 14.765625 11 14 11 L 10 11 C 8.355469 11 7 12.355469 7 14 L 7 15 L 5 15 L 5 9 C 5 8.445313 5.445313 8 6 8 Z M 10 13 L 14 13 C 14.554688 13 15 13.445313 15 14 L 15 15 L 9 15 L 9 14 C 9 13.445313 9.445313 13 10 13 Z M 18 13 L 22 13 C 22.554688 13 23 13.445313 23 14 L 23 15 L 17 15 L 17 14 C 17 13.445313 17.445313 13 18 13 Z M 5 17 L 27 17 C 27.554688 17 28 17.445313 28 18 L 28 25 L 27 25 L 27 23 L 5 23 L 5 25 L 4 25 L 4 18 C 4 17.445313 4.445313 17 5 17 Z"></path></svg>
                        |
                        ${data.bathrooms ? data.bathrooms : 0}
                        <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 256 256" height="25px" width="30px" xmlns="http://www.w3.org/2000/svg"><path d="M232,96H208a8,8,0,0,0-8-8H136a8,8,0,0,0-8,8H64V52A12,12,0,0,1,76,40a12.44,12.44,0,0,1,12.16,9.59,8,8,0,0,0,15.68-3.18A28.32,28.32,0,0,0,76,24,28,28,0,0,0,48,52V96H24A16,16,0,0,0,8,112v32a56.06,56.06,0,0,0,56,56v16a8,8,0,0,0,16,0V200h96v16a8,8,0,0,0,16,0V200a56.06,56.06,0,0,0,56-56V112A16,16,0,0,0,232,96Zm-40,8v32H144V104Zm40,40a40,40,0,0,1-40,40H64a40,40,0,0,1-40-40V112H128v32a8,8,0,0,0,8,8h64a8,8,0,0,0,8-8V112h24Z"></path></svg>
                    </div>
                </div>
                <p style="margin-top: 10px; margin-bottom: 25px; white-space: nowrap; overflow: hidden;text-overflow: ellipsis;display: inline-block; max-width: 100%;">${data.street ? data.street + ', ' : ''} ${data.city ? data.city + ', ' : ''} ${data.postcode ? data.postcode.slice(0, 3) : ''}</p>
        
                <div class="analytics" style="color: #495057;">
                    <div class="analytic">
                        <div style="font-weight: bold; font-size: 30px; ">£${formatNumber(data.grossIncome)}</div>
                        <div>Est. Revenue</div>
                    </div>
                    <div style="width: 3px; border-right: 3px solid lightgray;"></div>
                    <div class="analytic">
                        <div style="font-weight: bold; font-size: 30px; ">£${ data.adr - Math.floor(data.adr) >= 0.5 ? Math.ceil(data.adr) : Math.floor(data.adr)  }</div>
                        <div>Avg. Daily Rate</div>
                    </div>

                    ${data.airbnbRating || data.airbnbCompsFound > 0 || data.bookingDotComUrl || (data.airbnbUrl && data.rentalStatus === "Active") ? '<div style="width: 3px; border-right: 3px solid lightgray;"></div>' : '' }
        
                    
                    ${data.airbnbCompsFound > 0 && !(data.airbnbUrl && data.rentalStatus === "Active") ? `
                            <div style="display: flex; align-items: center; justify-content: space-around;">
                                <div style="width: 130px; text-align: center; color: #1864ab; font-weight: bold; ">View ${data.airbnbCompsFound} Comparables</div>
                                <div style="top: 0;">
                                    <svg width="25px" height="25px" viewBox="0 0 24 24" fill="##1864ab" xmlns="http://www.w3.or+g/2000/svg">
                                        <path d="M12 17.75C12.4142 17.75 12.75 17.4142 12.75 17V11C12.75 10.5858 12.4142 10.25 12 10.25C11.5858 10.25 11.25 10.5858 11.25 11V17C11.25 17.4142 11.5858 17.75 12 17.75Z" fill="##1864ab"/>
                                        <path d="M12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8C11 7.44772 11.4477 7 12 7Z" fill="##1864ab"/>
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75C6.06294 22.75 1.25 17.9371 1.25 12ZM12 2.75C6.89137 2.75 2.75 6.89137 2.75 12C2.75 17.1086 6.89137 21.25 12 21.25C17.1086 21.25 21.25 17.1086 21.25 12C21.25 6.89137 17.1086 2.75 12 2.75Z" fill="##1864ab"/>
                                    </svg>
                                </div>
                            </div>
                        `
                        : data.bookingDotComUrl ? `
                            <div style="display: flex; align-items: center; justify-content: space-around;">
                                <div style="width: 130px; text-align: center; color: #1864ab; font-weight: bold; ">View on Booking.com</div>
                            </div>
                        `
                        : data.airbnbRating ? `
                        <div class="analytic">
                            <div style="font-weight: bold; font-size: 30px; color: #1864ab;">${data.airbnbRating}</div>
                            <div>Airbnb Rating</div>
                        </div> ` : data.airbnbUrl && data.rentalStatus === "Active"  ? `
                        <div style="display: flex; align-items: center; justify-content: space-around;">
                            <div style="width: 130px; text-align: center; color: #1864ab; font-weight: bold; ">View on Airbnb</div>
                        </div>
                    ` : ''}
                </div>
        
                <hr style="margin-top: 25px; width: calc(100% + 30px); margin-left: -15px;">
                
                <div style="height: 52px; display: flex; justify-content: space-between; color: gray; margin-top: -10px;">
                    ${
                        data.agentName === "Airbuy & Sell" || data.agentName === null ? `
                            <p><b>Phone:</b> ${data.agentPhone ? data.agentPhone : 'Not added yet'}</p>
                        ` : '<p style="color: #ffa164; text-decoration: underline;">Enquire Now</p>'
                    }
                    <p>${getTimeDifference(data.addedOn)}</p>
                </div>
            </div>
        </body>
        </html>
    `
    return cardHtml;
}

module.exports = {generateHTML};



