class MainApi {
    constructor({ baseUrl, headers }) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json()
        }
        return Promise.reject(new Error(`Ошибка ${res.status} : ${res.statusText}`))
    }

    checkToken(token) {
        return fetch(`${this._baseUrl}/check`, {
            credentials: "include",
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        }).then((res) => this._checkResponse(res));
    }

    createCard(data) {
        return fetch(`${this._baseUrl}/item`, {
            credentials: "include",
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "name": data.name,
                "mail": data.mail,
                "text": data.text,
                "status": data.status,
            })
        }).then((res) => this._checkResponse(res));
    }

    getCards() {
        return fetch(`${this._baseUrl}/items`, {
            credentials: "include",
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }).then((res) => this._checkResponse(res));
    }

    register(data) {
        return fetch(`${this._baseUrl}/signup`, {
            credentials: "include",
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                password: data.password,
            }),
        }).then((res) => this._checkResponse(res));
    }

    authorize(data) {
        return fetch(`${this._baseUrl}/signin`, {
            credentials: "include",
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                password: data.password,
            }),
        }).then((res) => this._checkResponse(res));
    }

    changeCard(data, id) {
        return fetch(`${this._baseUrl}/changeItem`, {
            credentials: "include",
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "text": data.text,
                "status": data.status,
                "id": id,
            })
        }).then((res) => this._checkResponse(res));
    }

}

const config = {
    baseUrl: "http://localhost:4000",
    headers: { "Content-Type": "application/json" },
};
const mainApi = new MainApi(config);
export default mainApi;