export const getMessagesByBbox = `query ByBbox($externalsourceid: String, $zoomLevel: Int!, $bbox: [Float]!, $conjunctivetopics: [String]!, $limit: Int!, $pageState: String, $fromDate: String!, $toDate: String!, $pipelinekeys: [String]!, $fulltextTerm: String) {
   messages: byBbox(externalsourceid: $externalsourceid, bbox: $bbox, conjunctivetopics: $conjunctivetopics, zoomLevel: $zoomLevel, limit: $limit, pageState: $pageState, fromDate: $fromDate, toDate: $toDate, pipelinekeys: $pipelinekeys, fulltextTerm: $fulltextTerm) {
...FortisDashboardView
}
}`;

export const getPopularTerms = `topTerms(bbox: $bbox, limit: $limit, fromDate: $fromDate, toDate: $toDate, pipelinekeys: $pipelinekeys, zoomLevel:$zoomLevel, periodType: $periodType, externalsourceid: $externalsourceid) {
    ... FortisPopularTermsView
}`;

export const getTopSources = `topSources(maintopic:$maintopic, bbox: $bbox, conjunctivetopics: $conjunctivetopics, limit: $limit, fromDate: $fromDate, toDate: $toDate, pipelinekeys: $topsourcespipelinekey, zoomLevel:$zoomLevel, periodType: $periodType) {
    ... FortisTopSourcesView
}`;

export const getTimeSeries = `timeSeries(maintopics:$timeseriesmaintopics, pipelinekeys: $pipelinekeys, fromDate: $fromDate, toDate: $toDate, periodType: $timePeriodType, bbox: $bbox, zoomLevel: $zoomLevel, externalsourceid: $externalsourceid, conjunctivetopics: $conjunctivetopics){
    ...FortisDashboardTimeSeriesView
}`;

export const getConjunctiveTerms = `conjunctiveTerms(maintopic:$maintopic, bbox: $bbox, fromDate: $fromDate, toDate: $toDate, pipelinekeys: $pipelinekeys, zoomLevel:$zoomLevel, periodType: $periodType, externalsourceid: $externalsourceid) {
    ... FortisDashboardConjunctiveTermsView
}`;

<<<<<<< HEAD
export const getHeatmapByTile = `heatmapFeaturesByTile(maintopic:$maintopic, tileid: $tileid, fromDate: $fromDate, toDate: $toDate, pipelinekeys: $pipelinekeys, zoomLevel:$zoomLevel, periodType: $periodType, externalsourceid: $externalsourceid, conjunctivetopics: $conjunctivetopics) {
    ...FortisHeatmapViewFeatures
}`;

export const getOsmPlaces = `geofenceplaces(bbox: $bbox) {
    {
        placeid
        name   
        layer
    }
}`;

export const getPopularPlaces = `topLocations(zoomLevel:$zoomLevel, maintopic:$maintopic, bbox: $bbox, limit: $limit, fromDate: $fromDate, toDate: $toDate, pipelinekeys: $pipelinekeys, conjunctivetopics:$conjunctivetopics, periodType: $periodType, externalsourceid: $externalsourceid) {
    ... FortisPopularPlacesView
}`;

export const getTopSourcesQuery = `query TopSources($maintopic: String!, $bbox: [Float]!, $zoomLevel: Int!, $conjunctivetopics: [String]!, $limit: Int!, $fromDate: String!, $toDate: String!, $topsourcespipelinekey: [String]!, $periodType: String!) {
    ${getTopSources}
}`;

=======
export const getHeatmapByTile = `heatmapFeaturesByTile(maintopic:$maintopic, tiley: $tiley, tilex: $tilex, fromDate: $fromDate, toDate: $toDate, pipelinekeys: $pipelinekeys, zoomLevel:$zoomLevel, periodType: $periodType, externalsourceid: $externalsourceid, conjunctivetopics: $conjunctivetopics) {
    ...FortisHeatmapViewFeatures
}`;

export const getOsmPlaces = `geofenceplaces(bbox: $bbox) {
    {
        placeid
        name   
        layer
    }
}`;

export const getPopularPlaces = `topLocations(maintopic:$maintopic, bbox: $bbox, limit: $limit, fromDate: $fromDate, toDate: $toDate, pipelinekeys: $pipelinekeys, conjunctivetopics:$conjunctivetopics, periodType: $periodType, externalsourceid: $externalsourceid) {
    ... FortisPopularPlacesView
}`;

export const getTopSourcesQuery = `query TopSources($maintopic: String!, $bbox: [Float]!, $zoomLevel: Int!, $conjunctivetopics: [String]!, $limit: Int!, $fromDate: String!, $toDate: String!, $topsourcespipelinekey: [String]!, $periodType: String!) {
    ${getTopSources}
}`;

>>>>>>> V2 dashboard rewrite to accomodate cassandra GQL services

export const getPopularTermsQuery = `query PopularTerms($bbox: [Float]!, $zoomLevel: Int!, $limit: Int!, $fromDate: String!, $toDate: String!, $pipelinekeys: [String]!, $periodType: String!, $externalsourceid: String!) {
    topics: ${getPopularTerms}
}`;

export const getPopularPlacesQuery = `query PopularPlaces($maintopic: String!, $bbox: [Float]!, $zoomLevel: Int!, $limit: Int!, $fromDate: String!, $toDate: String!, $pipelinekeys: [String]!, $periodType: String!, $externalsourceid: String!, $conjunctivetopics: [String]!) {
    ${getPopularPlaces}
}`;

export const DashboardQuery = `query DashboardQuery($bbox: [Float]!, $zoomLevel: Int!, $limit: Int!, $fromDate: String!, $toDate: String!, 
                        $pipelinekeys: [String]!, $timePeriodType: String!, $periodType: String!, $externalsourceid: String!, 
                        $maintopic: String!, $timeseriesmaintopics: [String]!, $conjunctivetopics: [String]!, $topsourcespipelinekey: [String]!) {
                            topics: ${getPopularTerms} , 
                            sources: ${getTopSources},
                            conjunctiveterms: ${getConjunctiveTerms},
                            timeSeries:${getTimeSeries},
                            locations: ${getPopularPlaces}
}`;

<<<<<<< HEAD
export const getHeatmapQuery = `query FetchTileHeatmap($maintopic: String!, $tileid: String!, $zoomLevel: Int!, $fromDate: String!, $toDate: String!, $pipelinekeys: [String]!, $periodType: String!, $externalsourceid: String!, $conjunctivetopics: [String]!) {
=======
export const getHeatmapQuery = `query FetchTileHeatmap($maintopic: String!, $tiley: Int!, $tilex: Int!, $zoomLevel: Int!, $fromDate: String!, $toDate: String!, $pipelinekeys: [String]!, $periodType: String!, $externalsourceid: String!, $conjunctivetopics: [String]!) {
>>>>>>> V2 dashboard rewrite to accomodate cassandra GQL services
        heatmap: ${getHeatmapByTile}
}`;