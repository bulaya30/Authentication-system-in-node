const register = document.querySelector('#register');
const login = document.querySelector('#login');
const update = document.querySelector('#user-update-form');
const inputs = document.querySelectorAll('#register input');
if(register) {
    
    register.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = register.name.value;
        const email = register.email.value;
        const password = register.password.value;    
        try {
            const res = await fetch('/register', {
                method: 'POST',
                body: JSON.stringify({name, email, password}),
                headers: {'content-type': 'application/json'}
            })
            let data = await res.json();
            if(data.errors) {
                let keys = Object.keys(data.errors)
                let er = document.querySelectorAll('.register-errors')
                for(let i in inputs) {
                    er[i].style.display = 'none';
                    er[i].innerText = '';
                    if(inputs[i].id === keys[i]) {
                        if(data.errors[keys[i]] !== '') {
                            let errorDiv = inputs[i].parentNode.lastElementChild;
                            errorDiv.innerText = data.errors[keys[i]];
                            errorDiv.style.display = 'block';
                            inputs[i].focus;
                        }
                    } 
                }
            }
            if(data.user) {
                location.assign('/')
            }
        } catch (error) {
            console.log(error)
        }
    })
}
if(login) {
    const error = document.querySelector('.login-error');
    login.addEventListener('submit', async (e) => {
        e.preventDefault();
        error.innerText = ''
        const email = login.email.value;
        const password = login.password.value;
        error.style.display = 'none'
        try {
            const res = await fetch('/login', {
                method: 'POST',
                body: JSON.stringify({email, password}),
                headers: {'content-type': 'application/json'}
            })
            let data = await res.json();
            login.password.value = '';
            if(data.errors) {
                error.innerText = data.errors
                error.style.display = 'block'
            }            
            if(data.user) {
                location.assign('/')
            }
        } catch (error) {
            console.log(error)
        }
    })
}
if(update) {
    const error = document.querySelector('.user-alert-message');
    update.addEventListener('submit', async (e) => {
        e.preventDefault();
        error.innerText = ''
        const fname = update.fname.value;
        const lname = update.lname.value;
        const contact = update.contact.value;
        const address = update.address.value;
        const town = update.town.value;
        const country = update.country.value;
        const email = update.email.value;
        error.classList.remove('danger');
        error.style.display = 'none';

        try {
            const res = await fetch('/process', {
                method: 'POST',
                body: JSON.stringify({fname, lname, contact, address, town, country, email}),
                headers: {'content-type': 'application/json'}
            })
            let data = await res.json();
            if(data.errors) {
                error.classList.add('danger');
                error.innerText = data.errors;
                error.style.display = 'block';
            }
            if(data.user) {
                error.innerText = 'User information updated successfully';
                error.style.display = 'block';
                setData(data.user)
            }
        } catch (error) {
            console.log(error)
        }
    })
}
function setData(data = []) {
    if(data) {
        let userName = document.querySelector('.user-name').innerText = data.firstName +' '+data.lastName;
        let contact = document.querySelector('.contact').innerText = data.contact;
        let address = document.querySelector('.address').innerText = data.country +' | '+data.town+' | '+data.address;
        let email = document.querySelector('.email').innerText = data.email;
    }

}