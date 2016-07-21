import ajax from 'axios';

function csvToArray(string) {
    return string ? string.split(',') : [];
}

function getYoutubeId(videoUrl) {
    return videoUrl && (videoUrl.split('v=')[1] || false);
}

export function getOpportunities() {
    return new Promise((resolve) => {
        ajax.get('https://spreadsheets.google.com/feeds/list/1hetYu_LEuuim1efw0aFxv6lOYLjhU8-e7wkIZHupW_o/1/public/full?alt=json')
            .then(response => {
                const raw = response.data.feed.entry;
                const opportunities = raw
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
                            imageUrl: opportunity['gsx$image']['$t'] || 'https://www.placecage.com/600/400'
                        }
                    })
                    .filter((opportunity) => !!opportunity.title);

                resolve(opportunities);
            });
    });
}
