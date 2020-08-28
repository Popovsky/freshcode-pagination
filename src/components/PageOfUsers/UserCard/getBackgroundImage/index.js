const getBackgroundImage = (date) => {
    const month = new Date(date).getMonth();
    switch (month) {
        case 11:
        case 0:
        case 1:
            return 'bg-winter';
        case 2:
        case 3:
        case 4:
            return 'bg-spring';
        case 5:
        case 6:
        case 7:
            return 'bg-summer';
        case 8:
        case 9:
        case 10:
            return 'bg-autumn';
        default:
            return 'bg-default';
    }
}

export default getBackgroundImage;