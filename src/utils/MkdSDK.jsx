export class MkdSDK {
  constructor() {
    this._baseurl = "https://reacttask.mkdlabs.com";
    this._project_id = "reacttask";
    this._secret = "d9hedycyv6p7zw8xi34t9bmtsjsigy5t7";
    this._table = "";
    this._custom = "";
    this._method = "";
  }

  get base64Encode() {
    const raw = this._project_id + ":" + this._secret;
    const encodedString = btoa(raw)
    return encodedString
  }

  get getHeader() {
    return {
      Authorization: "Bearer " + localStorage.getItem("token"),
      "x-project": this.base64Encode,
    }
  }

  get baseUrl() {
    return this._baseurl
  }

  set setTable(table) {
    this._table = table
  }


  login = async (email, password, role) => {
    try {
      const response = await this.callRestAPI({ email, password, role }, "POST");
      const { token } = response;
      localStorage.setItem("token", token)
      localStorage.setItem("role", role)
    } catch(error) {
      console.log(error)
    }
  }

  callRestAPI = async (payload, method) => {
    const header = {
      "Content-Type": "application/json",
      "x-project": this.base64Encode,
      Authorization: "Bearer " + localStorage.getItem("token"),
    }

    switch(method) {
      case "GET":
      const getResult = await fetch(
        this._baseurl + `/v1/api/rest/${this._table}/GET`,
        {
          method: "POST",
          headers: header,
          body: JSON.stringify(payload),
        }
      );
      const jsonGet = await getResult.json();

      if (getResult.status === 401) {
        throw new Error(jsonGet.message);
      }

      if (getResult.status === 403) {
        throw new Error(jsonGet.message);
      }
      return jsonGet;

      case "POST":
        const postUser = await fetch(this._baseurl + `/v2/api/lambda/login`, {
          method: "POST",
          headers: header,
          body: JSON.stringify(payload)
        })
        
        const jsonUser = await postUser.json();

        if(postUser.status === 401) {
          throw new Error(jsonUser.message);
        }

        if(postUser.status === 403) {
          throw new Error(jsonUser.message);
        }

      return jsonUser;

      case "CHECK_USER":
        const checkUserIsValid = await fetch(this._baseurl + `/v2/api/lambda/check`, {
          method: "POST",
          headers: header,
          body: JSON.stringify(payload)
        })
        
        const jsonIsValidUser = await checkUserIsValid.json();

        if(jsonIsValidUser.status === 401) {
          throw new Error(jsonIsValidUser.message);
        }

        if(jsonIsValidUser.status === 403) {
          throw new Error(jsonIsValidUser.message);
        }

      return jsonIsValidUser;

      case "PAGINATE":
        if (!payload.page) {
          payload.page = 1;
        }
        if (!payload.limit) {
          payload.limit = 10;
        }
        const paginateResult = await fetch(
          this._baseurl + `/v1/api/rest/${this._table}/${method}`,
          {
            method: "POST",
            headers: header,
            body: JSON.stringify(payload),
          }
        );
        const jsonPaginate = await paginateResult.json();

        if (paginateResult.status === 401) {
          throw new Error(jsonPaginate.message);
        }

        if (paginateResult.status === 403) {
          throw new Error(jsonPaginate.message);
        }
        return jsonPaginate;
      
      default:
        break;
    }
  }

  check = async (role) => {
    const payload = { role }
    try {
      const response = await this.callRestAPI(payload, "CHECK_USER");
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }
}
