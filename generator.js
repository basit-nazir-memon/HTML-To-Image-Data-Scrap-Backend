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
                    <svg class="arrows right" width="80px" height="80px" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M8.29289 4.29289C8.68342 3.90237 9.31658 3.90237 9.70711 4.29289L16.7071 11.2929C17.0976 11.6834 17.0976 12.3166 16.7071 12.7071L9.70711 19.7071C9.31658 20.0976 8.68342 20.0976 8.29289 19.7071C7.90237 19.3166 7.90237 18.6834 8.29289 18.2929L14.5858 12L8.29289 5.70711C7.90237 5.31658 7.90237 4.68342 8.29289 4.29289Z" fill="#d3d3d3"/></svg>
                    <svg class="arrows left" width="80px" height="80px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M15.7071 4.29289C16.0976 4.68342 16.0976 5.31658 15.7071 5.70711L9.41421 12L15.7071 18.2929C16.0976 18.6834 16.0976 19.3166 15.7071 19.7071C15.3166 20.0976 14.6834 20.0976 14.2929 19.7071L7.29289 12.7071C7.10536 12.5196 7 12.2652 7 12C7 11.7348 7.10536 11.4804 7.29289 11.2929L14.2929 4.29289C14.6834 3.90237 15.3166 3.90237 15.7071 4.29289Z" fill="#d3d3d3"/></svg>
                    <div class="cardLabels pa">
                        ${data.isFeatured ? '<div class="cardLabel" style="background-color: rgb(67, 66, 68);">Featured</div>' : '' }
                        <div class="cardLabel" style="background-color: orange;">${data.rentalStatus}</div>
                    </div>
                    <p class="pa" style="top: 220px; color:aliceblue; left: 15px; font-weight: bold; font-size: 38px;">£${data.salesPrice}</p>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center; font-size: 20px;">
                    <p style="color: orange;">${data.propertyType}</p>
                    <div style="color: gray; display: flex; align-items: center;">
                        ${data.bedrooms}
                        <svg fill="#808080" width="30px" height="20px" viewBox="0 0 512 512" id="Layer_1" enable-background="new 0 0 512 512" xmlns="http://www.w3.org/2000/svg"><g><path d="m496 320c0-15.581 0-282.497 0-296 0-8.836-7.163-16-16-16s-16 7.164-16 16v16h-416v-16c0-8.836-7.164-16-16-16s-16 7.164-16 16v296c-8.836 0-16 7.164-16 16v152c0 8.836 7.164 16 16 16h56c6.061 0 11.601-3.424 14.311-8.845l19.578-39.155h300.223l19.578 39.155c2.71 5.421 8.25 8.845 14.311 8.845h56c8.837 0 16-7.164 16-16v-152c-.001-8.836-7.164-16-16.001-16zm-32-91.833c-11.449-7.679-25.209-12.167-40-12.167h-56v-32c0-35.29-28.71-64-64-64h-96c-35.29 0-64 28.71-64 64v32h-56c-14.791 0-28.551 4.488-40 12.167v-156.167h416zm-128-12.167h-160v-32c0-17.645 14.355-32 32-32h96c17.645 0 32 14.355 32 32zm-288 72c0-22.056 17.944-40 40-40h336c22.056 0 40 17.944 40 40v32h-416zm432 184h-30.111l-19.578-39.155c-2.71-5.421-8.25-8.845-14.311-8.845h-320c-6.061 0-11.601 3.424-14.311 8.845l-19.578 39.155h-30.111v-120h448z"/></g></svg>
                        |
                        ${data.bathrooms}
                        <svg fill="#808080" width="30px" height="20px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M22,12H5V5A2,2,0,0,1,7,3H9a2,2,0,0,1,1.838,1.214A3.5,3.5,0,0,0,8.5,7.5V9a1,1,0,0,0,1,1h5a1,1,0,0,0,1-1V7.5a3.5,3.5,0,0,0-2.6-3.368A4,4,0,0,0,9,1H7A4,4,0,0,0,3,5v7H2a1,1,0,0,0,0,2H3v4a3,3,0,0,0,2,2.816V22a1,1,0,0,0,2,0V21H17v1a1,1,0,0,0,2,0V20.816A3,3,0,0,0,21,18V14h1a1,1,0,0,0,0-2ZM13.5,7.5V8h-3V7.5a1.5,1.5,0,0,1,3,0ZM19,18a1,1,0,0,1-1,1H6a1,1,0,0,1-1-1V14H19Z"/></svg>
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