const getEmployers = async (stringToken, notExpired=true) => {
    const response = await fetch('http://localhost:8080/api/employers?notExpired='+notExpired, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'Authorization': 'Bearer '+stringToken
        }
    }).then((response)=>{
        if(response.ok){
            return response.json()
        } else{
            throw "Forbidden"
        }
    })
    let data = []
    response.map((employer)=>(
        data.push({
            id: employer.id,
            username: employer.username,
            name: employer.name,
            lastName: employer.lastName,
            age: employer.age,
            pessel: employer.pessel,
            position: employer.position,
            street: employer.street,
            cityCode: employer.cityCode,
            city: employer.city,
            phone: employer.phone,
            salary: employer.salary
        })
    ))
    console.log(response)
    console.log(data)
    return data
}

const postEmployer = async (register, stringToken) => {
    const employerDto = {
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
        password: register.password,
        role: register.role
    }
    const employer = await fetch('http://localhost:8080/api/employers', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'Authorization': 'Bearer '+stringToken
        },
        body: JSON.stringify(employerDto)
    }).then((response)=>{
        if(response.status === 200){
            return response.json()
        } else if(response.status === 403){
            throw "Forbidden"
        } else{
            alert('Niepoprawne dane')
            throw "BadRequest"
        }
    })
    return {
        id: employer.id,
        username: employer.username,
        name: employer.name,
        lastName: employer.lastName,
        age: employer.age,
        pessel: employer.pessel,
        position: employer.position,
        street: employer.street,
        cityCode: employer.cityCode,
        city: employer.city,
        phone: employer.phone,
        salary: employer.salary
    }
}

const putExpiringEmployer = async (id, notExpired, stringToken) => {
    const employerDto = {
        id: id,
        notExpired: notExpired
    }
    return await fetch('http://localhost:8080/api/employers', {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json',
            'Authorization': 'Bearer '+stringToken
        },
        body: JSON.stringify(employerDto)
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

const deleteEmployer = async (id, stringToken) => {
    return await fetch('http://localhost:8080/api/employers/'+id, {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json',
            'Authorization': 'Bearer '+stringToken
        }
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

export {
    getEmployers,
    postEmployer,
    putExpiringEmployer
}
