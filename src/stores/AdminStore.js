import Fluxxor from 'fluxxor';
import { Actions } from '../actions/Actions';
// eslint-disable-next-line
import ReactDataGridPlugins from 'react-data-grid-addons';

// eslint-disable-next-line
const Filters = window.ReactDataGridPlugins.Filters;
const POPULATED_TOWN = 50000;
const PLACE_SOURCE_KEYS = {"openstreetmap.org": "osm", "naturalearthdata.com": "ned"};
const POPULATED_CITY = 100000;

export const AdminStore = Fluxxor.createStore({
    initialize() {
        this.dataStore = {
            settings: {},
            siteList: [],
            loading: false,
            twitterAccounts: [],
            trustedTwitterAccounts: [],
            termGridColumns: [],
            facebookPages: [],
            osmPlaceGroups: new Map(),
            blacklist: [],
            locationGridColumns: [],
            locations: new Map(),
            watchlist: [],
            action: false,
            error: null
        };

        this.bindActions(
            Actions.constants.ADMIN.LOAD_KEYWORDS, this.handleLoadTerms,
            Actions.constants.ADMIN.LOAD_FB_PAGES, this.handleLoadFacebookPages,
            Actions.constants.ADMIN.LOAD_LOCALITIES, this.handleLoadLocalities,
            Actions.constants.ADMIN.LOAD_SETTINGS, this.handleLoadSettings,
            Actions.constants.ADMIN.LOAD_PLACES, this.handleLoadPlaces,
            Actions.constants.ADMIN.LOAD_TWITTER_ACCTS, this.handleLoadTwitterAccts,
            Actions.constants.ADMIN.LOAD_TRUSTED_TWITTER_ACCTS, this.handleLoadTrustedTwitterAccts,
            Actions.constants.ADMIN.LOAD_FAIL, this.handleLoadPayloadFail,
            Actions.constants.ADMIN.CREATE_SITE, this.handleCreateSite,
            Actions.constants.ADMIN.LOAD_BLACKLIST, this.handleLoadBlacklist,
            Actions.constants.ADMIN.PUBLISHED_EVENTS, this.handlePublishedCustomEvents
        );
    },

    getState() {
        return this.dataStore;
    },

    handleLoadPayload(payload) {
        this.dataStore.settings = Object.assign(this.dataStore.settings, payload);
        this.emit("change");
    },

    handleLoadTwitterAccts(response){
        this.dataStore.twitterAccounts = response.streams.accounts;
        this.dataStore.action = response.action || false;
        this.emit("change");
    },

    handleLoadTrustedTwitterAccts(response){
        this.dataStore.trustedTwitterAccounts = response.accounts.accounts || [];
        this.dataStore.action = response.action || false;
        this.emit("change");
    },

    handleLoadFacebookPages(response){
        this.dataStore.facebookPages = response.pages.pages || [];
        this.dataStore.action = response.action || false;
        this.emit("change");
    },

    handleLoadBlacklist(response){
        if(response.filters.filters){
            this.dataStore.blacklist = response.filters.filters.map(filter=>Object.assign({}, filter, {filteredTerms: JSON.stringify(filter.filteredTerms)}));
        }
        this.dataStore.action = response.action || false;
        this.emit("change");
    },

    handleLoadTerms(response){
        this.dataStore.watchlist = response.response;
        this.dataStore.action = response.action || false;
        this.emit("change");
    },

    handleLoadLocalities(response){
        this.dataStore.locations.clear();
        response.response.forEach(location => {
            this.dataStore.locations.set(location.name.toLowerCase(), Object.assign({}, location, {coordinates: location.coordinates.join(",")}));
        });

        if(response.mutatedSiteDefintion && response.mutatedSiteDefintion.name){
            this.dataStore.settings.properties.targetBbox = response.mutatedSiteDefintion.targetBbox;
        }

        this.dataStore.action = response.action || false;
        this.emit("change");
    },

    handlePublishedCustomEvents(response){
        this.dataStore.action = response.action || false;
        this.emit("change");
    },

    handleCreateSite(response){
        const {siteName, action} = response;
        this.dataStore.siteList.push({name: siteName});
        this.dataStore.action = action;
        this.emit("change");
    },

    handleLoadSettings(response){
        const {settings, action, siteList, originalSiteName} = response;
        this.dataStore.settings = settings;
        this.dataStore.action = action;
        if(!siteList){
            this.dataStore.siteList = this.dataStore.siteList.map(site => {
                if(site.name === originalSiteName){
                    return Object.assign({}, site, {name: settings.name});
                }else{
                    return site;
                }
            });
        }else{
            this.dataStore.siteList = siteList;
        }
        
        this.loadTermColumns(settings.properties.supportedLanguages);
        this.loadLocalitiesColumns(settings.properties.supportedLanguages);
        this.emit("change");
    },

    handleLoadPlaces(response){
        this.dataStore.osmPlaceGroups.clear();

        response.features.features.forEach(feature => {
            let keyName = feature.kind;
            const {population, source, kind, id, coordinates} = feature;
            const originalsource = PLACE_SOURCE_KEYS[source];
            const name = feature.name.toLowerCase();
            const name_ar = feature.name_ar.toLowerCase();
            const name_de = feature.name_de.toLowerCase();
            const name_ur = feature.name_ur.toLowerCase();
            const name_id = feature.name_id.toLowerCase();
            const RowKey = `${id}`;
            const properties = {population, RowKey, kind, name, name_ar, name_id, name_ur, originalsource};
            const geometry = { "type": "Point", "coordinates": coordinates};

            if(keyName === 'town' && population >= POPULATED_TOWN){
                keyName = "Populated Towns";
            }else if(keyName === 'city' && population >= POPULATED_CITY){
                keyName = "Populated Cities";
            }else if(keyName === 'town'){
                keyName = "Small Towns";
            }else if(keyName === 'city'){
                keyName = "Small Cities";
            }

            let featureList = this.dataStore.osmPlaceGroups.get(keyName) || [];
            featureList.push(Object.assign({}, {properties}, {geometry}, {"type": "Feature"}));
            this.dataStore.osmPlaceGroups.set(keyName, featureList);
        });

        this.emit("change");
    },

    loadLocalitiesColumns(languages){
        const defaultColDef = {
                    editable:true,
                    sortable : true,
                    filterable: true,
                    resizable: true
        };
        let columns = [];
        columns.push(Object.assign({}, defaultColDef, {filterable: false, compositeKey: true, editable: false, key: "RowKey", name: "Id"}));
        languages.forEach(lang => {
            columns.push(Object.assign({}, defaultColDef, {
                                                           key: lang !== "en" ? `name_${lang}` : 'name', 
                                                           name: lang !== "en" ? `name_${lang}` : 'name'
                                                          }))            
        });
        columns.push(Object.assign({}, defaultColDef, {filterable: true, editable: false, key: "originalsource", name: "Source"}));
        columns.push(Object.assign({}, defaultColDef, {filterable: true, editable: true, key: "region", name: "Region"}));
        columns.push(Object.assign({}, defaultColDef, {filterable: false, editable: true, key: "alternatenames", name: "Alternate Name(s)"}));
        columns.push(Object.assign({}, defaultColDef, {filterable: true, editable: false, key: "country_iso", name: "Country Code"}));
        columns.push(Object.assign({}, defaultColDef, {filterable: false, editable: false, key: "coordinates", name: "Coordinates"}));
        columns.push(Object.assign({}, defaultColDef, {filterable: true, editable: true, key: "aciiname", name: "Ascii Name"}));
        columns.push(Object.assign({}, defaultColDef, {key: "population", name: "Population", filterRenderer: Filters.NumericFilter}));

        this.dataStore.locationGridColumns = columns;
        this.emit("change");
    },

    loadTermColumns(languages){
        const defaultColDef = {
                    editable:true,
                    sortable : true,
                    filterable: true,
                    resizable: true
        };
        let columns = [];
        columns.push(Object.assign({}, defaultColDef, {editable: false, key: "RowKey", name: "Term ID"}));
        languages.forEach(lang => {
            columns.push(Object.assign({}, defaultColDef, {
                                                           compositeKey: true, 
                                                           key: lang !== "en" ? `name_${lang}` : 'name', 
                                                           name: lang !== "en" ? `name_${lang}` : 'name'
                                                          }))
        });
              
        this.dataStore.termGridColumns = columns;
    },

    handleLoadPayloadFail(payload) {
        this.dataStore.error = payload.error;
    }

});