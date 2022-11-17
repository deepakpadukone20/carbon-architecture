const https = require("https");
const postcode = process.stdin;
postcode.setEncoding('utf-8');
console.log("Please enter the post code");
postcode.on('data', function (data) {
    if (data === 'exit\n') {
        process.exit();
    } else {
        search(data);
    }
});

function search(postcode) {
    const url = `https://uk.api.just-eat.io/restaurants/bypostcode/${postcode}`;
    const request = https.get(url, function (response) {
        if(response.statusCode !== 200){
            console.log("Failed to reach Just Eats Server");
            process.exit();
        }
        let buffer = "",
            data;

        response.on("data", function (chunk) {
            buffer += chunk;
        });

        response.on("end", function (err) {
            data = JSON.parse(buffer);
            data = data['Restaurants'];
            let list = [];
            data.map(i => {
                if (
                    (parseFloat(i['RatingAverage']) > 4.5) && (parseInt(i['Rating'] && i['Rating']['Count']) >= 100) && //(1)
                    (parseInt(i['DeliveryEtaMinutes'] && i['DeliveryEtaMinutes']['RangeUpper']) <= 45) &&   //(2)
                    (i['Cuisines'].filter(i => i.Name === 'Pizza').length) //(3)
                ) {
                    list.push({
                        name: i['Name'],
                        url: i['Url'],
                        address: `${i['Address'] &&
                            i['Address']['FirstLine'] || 'NA'} - ${i['Postcode'].split(' ')[0] || 'NA'}`
                    })
                }
            })
            console.log(`Found ${list.length} restaurants for postcode ${postcode} \n`)
            console.log(list)
            process.exit();

        });
    }).on('error', (e) => {
        console.log("Failed to reach Just Eats API.")
        console.error(e);
        process.exit();
    });;
}

