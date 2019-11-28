const axios = require("axios")

class DeliveryApi {

  constructor(apiKey, workspace) {
    this.apiKey = apiKey;
    this.workspace = workspace;
  }

  getEntries(type, offset = 0, limit = 25, sort = '') {
    var params = []
    if (offset) {
      params['offset'] = offset;
    }
    if (offset) {
      params['limit'] = limit;
    }
    if (sort) {
      params['sort'] = sort;
    }

    var url = `https://delivery.seams-api.com/workspace/${this.workspace}/type/${type}/entries?`;
    url += Object.keys(params)
        .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
        .join('&');

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
      },
    };

    return axios(url, options).then((response) => {
      return response.data;
    }).then((body) => {
      return body.entries;
    }).catch((error) => {
      console.warn(error.message);
    });
  };
}

module.exports = DeliveryApi;
