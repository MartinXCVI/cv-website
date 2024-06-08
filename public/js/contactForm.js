const form = document.getElementById('contact-form')
const successPara = document.querySelector('.success-para')
const errorPara = document.querySelector('.error-para')

form.addEventListener('submit', function(e) {
  e.preventDefault()
  const formData = new FormData(form)
  const object = Object.fromEntries(formData)
  const json = JSON.stringify(object)

    fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: json
        })
        .then(async (response) => {
            let json = await response.json()

            if (response.status == 200) {
                successPara.innerHTML = json.message
            } else {
                console.log(response)
                errorPara.innerHTML = json.message
            }
        })
        .catch(error => {
            console.log(error);
            errorPara.innerHTML = "Something went wrong! Try again later"
        })
        .then(function() {
            form.reset();
            setTimeout(() => {
                successPara.style.display = "none"
                errorPara.style.display = "none"
            }, 3000);
        });
});