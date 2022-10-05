import axios from 'axios'

export const getData = async (order, lang, token) => {
    try {
        const api = 'https://cf-endpoint-proxy.herokuapp.com/webapi/v1/stories'
        const res = await axios.get(`${api}?limit=20&languages=${lang}&order=${order}&page_token=${token}`)
        return res.data
    } catch (e) {
        console.log(e)
    }
}