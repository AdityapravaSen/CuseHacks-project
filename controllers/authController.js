module.exports.signup_get = (req, res) => {
    res.render('signup');

    fetch('http://api.ipify.org/?format=json')
        .then(e => e.json())
        .then(res => {
            getLocation(res.ip);
        })
        .catch(err => {
            if (err)
                console.log(err);
        });

    function getLocation(ip) {
        fetch(`http://ipwhois.app/json/${ip}`)
            .then(e => e.json())
            .then(data => {
                coords.latitude = data.latitude;
                coords.longitude = data.longitude;
            })
            .catch(err => {
                if (err)
                    console.log(err);
            });
    }
}