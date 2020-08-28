export default {
    api: {
        baseUrl: 'https://randomuser.me/api/',
        seed: 'fe2020-1',
        user: {
            fields: ['name', 'gender', 'email', 'picture', 'dob'],
            allowedParams: ['page', 'seed', 'results', 'inc'],
        },
    },
};
