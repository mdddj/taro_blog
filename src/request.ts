import DdServerApiByWeb from "dd_server_api/apis/blog";

class Api {

  static instance(): DdServerApiByWeb {
    const webApi = new DdServerApiByWeb()
    webApi.host = "https://itbug.shop"
    return webApi
  }

}

export default Api
