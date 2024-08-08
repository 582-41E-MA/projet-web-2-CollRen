import compareObjects from "./compareObjects";
export default function itemExists(haystack, needle) {

    for (var i = 0; i < haystack.length; i++) if (compareObjects(haystack[i], needle)) return true;
    return false;
}