import ajax from 'axios';
// import Categories from '../fixtures/Categories';
// import Opportunites from '../fixtures/Opportunities';
// import Organizations from '../fixtures/Organizations';

let Categories = [];
let Organizations = [];

function csvToArray(string) {
    return string ? string.split(',') : [];
}

function getYoutubeId(videoUrl) {
    return videoUrl && (videoUrl.split('v=')[1] || false);
}

export function getOrgById(id) {
    return Organizations.find((org) => org.id == id) || {};
}

export function getCategoryByName(name) {
    return Categories.find((category) => category.name == name) || {};
}

export function getCategoryById(id) {
    return Categories.find((category) => category.id == id) || {};
}

function sheetsToOpportunities(response) {
    const raw = response.data.feed.entry;
    return raw
        .map(opportunity => {
            return {
                id: opportunity['gsx$id']['$t'],
                title: opportunity['gsx$title']['$t'],
                organization: opportunity['gsx$organization']['$t'],
                description: opportunity['gsx$description']['$t'],
                location: opportunity['gsx$location']['$t'],
                time: opportunity['gsx$time']['$t'],
                categories: csvToArray(opportunity['gsx$categories']['$t']),
                family: !!opportunity['gsx$family']['$t'],
                group: !!opportunity['gsx$group']['$t'],
                individual: !!opportunity['gsx$individual']['$t'],
                ongoing: !!opportunity['gsx$ongoing']['$t'],
                oneTime: !!opportunity['gsx$one-time']['$t'],
                videoId: getYoutubeId(opportunity['gsx$video']['$t']),
                imageUrl: opportunity['gsx$image']['$t'] || 'https://placeholdit.imgix.net/~text?txtsize=75&bg=000000&txtclr=ffffff&txt=BELONG&w=640&h=360&txttrack=0'
            }
        })
        .filter((opportunity) => !!opportunity.title);
}

function wpToCategories(response) {
    return response.data
        .map(category => {
            return {
                id: category['id'],
                name: category['name']
            }
        })
        .filter((category) => !!category.name);
}

function wpToOpportunities(response) {
    return response.data
        .map(opportunity => {
            return {
                id: opportunity['id'],
                title: opportunity['title']['rendered'],
                organization: opportunity['organizations'][0],
                description: opportunity['content']['rendered'],
                location: opportunity['acf']['location'],
                time: opportunity['acf']['time'],
                categories: opportunity['categories'],
                family: opportunity['acf']['filters'].indexOf('family') > -1,
                group: opportunity['acf']['filters'].indexOf('group') > -1,
                individual: opportunity['acf']['filters'].indexOf('individual') > -1,
                ongoing: opportunity['acf']['filters'].indexOf('ongoing') > -1,
                oneTime: opportunity['acf']['filters'].indexOf('oneTime') > -1,
                videoId: getYoutubeId(opportunity['acf']['video']),
                imageUrl: (
                    opportunity._embedded &&
                    opportunity._embedded['wp:featuredmedia'] &&
                    opportunity._embedded['wp:featuredmedia'][0] &&
                    opportunity._embedded['wp:featuredmedia'][0]['source_url']
                ) || 'https://placeholdit.imgix.net/~text?txtsize=75&bg=000000&txtclr=ffffff&txt=BELONG&w=640&h=360&txttrack=0'
            }
        })
        .filter((opportunity) => !!opportunity.title);
}

function wpToOrganizations(response) {
    return response.data
        .map(org => {
            return {
                id: org['id'],
                name: org['name'],
                bio: org['description'],
                website: 'https://google.com', //org['acf']['website'],
                logo: 'https://google.com' //org['acf']['logo']
            }
        })
        .filter((org) => !!org.name);
}

export function getCatgories() {
    // const response = {
    //     data: Categories
    // };
    // return new Promise((resolve) => resolve(wpToCategories(response)));
    return new Promise((resolve) => {
        ajax.get('https://belong-marketplace.herokuapp.com/wp-json/wp/v2/categories')
            .then(response => {
                Categories = wpToCategories(response);
                resolve(Categories);
            });
    });
}

export function getOrganizations() {
    // const response = {
    //     data: Organizations
    // };
    // return new Promise((resolve) => resolve(wpToOrganizations(response)));
    return new Promise((resolve) => {
        ajax.get('https://belong-marketplace.herokuapp.com/wp-json/wp/v2/organizations?per_page=100')
            .then(response => {
                Organizations = wpToOrganizations(response);
                resolve(Organizations);
            });
    });
}

export function getOpportunities() {
    // const response = {
    //     data: Opportunites
    // };
    // return new Promise((resolve) => resolve(wpToOpportunities(response)));
    return new Promise((resolve) => {
        ajax.get('https://belong-marketplace.herokuapp.com/wp-json/wp/v2/opportunities?per_page=24&_embed')
            .then(response => {
                resolve(wpToOpportunities(response));
            });
    });
}
