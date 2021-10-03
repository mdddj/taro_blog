import DdServerApiByWeb from "dd_server_api/apis/blog";

class Api {

  static instance(): DdServerApiByWeb {
    const webApi = new DdServerApiByWeb()
    webApi.host = "http://192.168.100.15"
    return webApi
  }

}

export default Api
