

module.exports = {

    getCurrentMonth() {
        var currentDate = new Date(Date.now());
        return currentDate.getMonth();
    },

    parseMonth(month) {

        switch (month) {
            case 0: return "Январь"
            case 1: return "Февраль"
            case 2: return "Март"
            case 3: return "Апрель"
            case 4: return "Май"
            case 5: return "Июнь"
            case 6: return "Июль"
            case 7: return "Август"
            case 8: return "Сентябрь"
            case 9: return "Октябрь"
            case 10: return "Ноябрь"
            case 11: return "Дакабрь"
        }
    }
}
