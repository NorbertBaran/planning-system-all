const get = async (address, stringToken) => {
    return await fetch(address, {
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
}

const post = async (address, dto, stringToken) => {
    return await fetch(address, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'Authorization': 'Bearer '+stringToken
        },
        body: JSON.stringify(dto)
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

const put = async (address, dto, stringToken) => {
    return await fetch(address, {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json',
            'Authorization': 'Bearer '+stringToken
        },
        body: JSON.stringify(dto)
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

const del = async (address, stringToken) => {
    return await fetch(address, {
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
    get,
    post,
    put,
    del
}