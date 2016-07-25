// Configuration file for api host settings

// Placeholder object because we want to make the config const
// but a const variable only lets you assign variables in the constructor.
var placeholder = {};
placeholder.baseUrl = 'https://gordon360api.gordon.edu';
placeholder.apiUrl = placeholder.baseUrl + '/api';
placeholder.tokenUrl = placeholder.baseUrl + '/token';

// Yay const!
const Config = placeholder;


export default Config;
