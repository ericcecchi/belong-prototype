function booleanFilter(things, property) {
    return things.filter((thing) => thing[property]);
}

export default {
    category: function (opportunities, category) {
        return opportunities.filter((opportunity) => opportunity.categories && opportunity.categories.indexOf(category) > -1);
    },
    individual: (opportunities) => booleanFilter(opportunities, 'individual'),
    family: (opportunities) => booleanFilter(opportunities, 'family'),
    group: (opportunities) => booleanFilter(opportunities, 'group'),
    oneTime: (opportunities) => booleanFilter(opportunities, 'oneTime'),
    ongoing: (opportunities) => booleanFilter(opportunities, 'ongoing'),
};
