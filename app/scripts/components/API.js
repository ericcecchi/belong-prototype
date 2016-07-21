import ajax from 'axios';

export function getOpportunities() {
    return new Promise((resolve) => {
        ajax.get('https://spreadsheets.google.com/feeds/list/1hetYu_LEuuim1efw0aFxv6lOYLjhU8-e7wkIZHupW_o/1/public/full?alt=json')
            .then(response => {
                const raw = response.data.feed.entry;
                const opportunities = raw
                    .map(opportunity => {
                        const categoriesString = opportunity['gsx$categories']['$t'];
                        const categories = categoriesString ? categoriesString.split(',') : [];
                        return {
                            id: opportunity['gsx$id']['$t'],
                            title: opportunity['gsx$title']['$t'],
                            organization: opportunity['gsx$organization']['$t'],
                            description: opportunity['gsx$description']['$t'],
                            location: opportunity['gsx$location']['$t'],
                            time: opportunity['gsx$time']['$t'],
                            categories,
                            family: !!opportunity['gsx$family']['$t'],
                            group: !!opportunity['gsx$group']['$t'],
                            individual: !!opportunity['gsx$individual']['$t'],
                            ongoing: !!opportunity['gsx$ongoing']['$t'],
                            oneTime: !!opportunity['gsx$one-time']['$t']
                        }
                    })
                    .filter((opportunity) => !!opportunity.title);

                resolve(opportunities);
            });
    });
}
