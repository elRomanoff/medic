const API = "http://192.168.1.3:3000"

export const getPacientes = async () => {
    const res = await fetch(API)
    return await res.json()
}

