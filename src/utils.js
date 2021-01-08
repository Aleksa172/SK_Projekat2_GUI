var TEMP_JWT = "Basic eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJwZXJhQHAuY29tIiwiZXhwIjoxNjEwMjExMTcxfQ.ziX4-y-IGClOJhi9fpUvhCanyEts-adVFAOHdRW8Wg_1sbI6MiAyQMQhVjlk1gVoREkTmK1jtKsHsLfpwa1rzA"

var TOKEN_PREFIX = "Basic "

function parseJwt(jwt){
    var fullJwt = jwt.substring(TOKEN_PREFIX.length);
    var jwtParts = fullJwt.split(".");

    // Dekodujemo srednji deo koji sadrzi claim
    var claims = atob(jwtParts[1]);
    
    // parsiramo ga kao JSON
    return JSON.parse(claims);
}

function getTipKorisnika() {
    return "ADMIN";
}

export default {
    parseJwt,
    TEMP_JWT
}