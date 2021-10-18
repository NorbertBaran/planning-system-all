const postRegistrationData = async (register) => {
    const RegistrationDto = {
        employer: {
            username: register.username,
            name: register.name,
            lastName: register.lastName,
            age: register.age,
            pessel: register.pessel,
            street: register.street,
            cityCode: register.cityCode,
            city: register.city,
            phone: register.phone,
            position: register.position,
            salary: register.salary,
            password: register.password
        },
        company: {
            name: register.companyName
        }
    }
    console.log(RegistrationDto)
    return await fetch('http://localhost:8080/api/auth/signup/create', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(RegistrationDto)
    }).then((response)=>{
        if(response.status === 200){
            return response.json()
        } else if(response.status === 403){
            throw "Forbidden"
        } else{
            throw "BadRequest"
        }
    })
}

const postLoginData = async (username, password) => {
    const employer = {
        username: username,
        password: password
    }
    return await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(employer)
    }).then((response)=>{
        if(response.status === 200){
            return response.json()
        } else if(response.status === 403){
            throw "Forbidden"
        } else{
            throw response
        }
    })
}

export {
    postRegistrationData,
    postLoginData
}