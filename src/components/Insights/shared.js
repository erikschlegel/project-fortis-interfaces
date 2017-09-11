function fetchTermFromMap(termMap, termLookup, selectedLanguage, defaultLanguage) {
    const name = termLookup.toLowerCase();

    return termMap.get(name) || { name: name, translatedname: name };
}

function fromMapToArray(termMap, termLookup) {
    const name = termLookup.toLowerCase();

    return Array.from(termMap.values())
        .filter(topic => topic.translatedname.toLowerCase().indexOf(name) > -1);
}

function innerJoin(arr1, arr2) {
    let out = new Set();

    arr1.forEach(item => {
        if (arr2.indexOf(item) > -1) {
            out.add(item);
        }
    });

    return Array.from(out);
}

function hasChanged(prevProps, nextProps) {
    if (prevProps && prevProps.bbox &&
        nextProps.bbox === prevProps.bbox &&
        nextProps.zoomLevel === Math.max(nextProps.defaultZoom, prevProps.zoomLevel) &&
        nextProps.fromDate === prevProps.fromDate &&
        nextProps.toDate === prevProps.toDate &&
        nextProps.maintopic === prevProps.maintopic &&
        nextProps.externalsourceid === prevProps.externalsourceid &&
        nextProps.conjunctiveTermsLength === prevProps.conjunctiveTermsLength &&
        nextProps.dataSource === prevProps.dataSource) {
        
        return false;
      }

    return true;
}

module.exports = {
    fetchTermFromMap,
    fromMapToArray,
    innerJoin,
    hasChanged
}