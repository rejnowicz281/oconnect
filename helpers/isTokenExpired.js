import jwtDecode from "jwt-decode";

export default function isTokenExpired(token) {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) return true;

    return false;
}
