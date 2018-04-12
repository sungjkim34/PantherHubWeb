export const formatDays = (days) => {
    var sorter = {
        "monday": 1,
        "tuesday": 2,
        "wednesday": 3,
        "thursday": 4,
        "friday": 5,
        "saturday": 6,
        "sunday": 7
      }
      var formattedDays = days.sort(function sortByDay(a, b) {
        var day1 = a.toLowerCase();
        var day2 = b.toLowerCase();
        return sorter[day1] > sorter[day2];
      })
    formattedDays.forEach((day, i) => {
        switch(day) {
            case 'monday':
                formattedDays[i] = 'M';
                break;
            case 'tuesday':
                formattedDays[i] = 'T';
                break;
            case 'wednesday':
                formattedDays[i] = 'W';
                break;
            case 'thursday':
                formattedDays[i] = 'R';
                break;
            case 'friday':
                formattedDays[i] = 'F';
                break;
            case 'saturday':
                formattedDays[i] = 'S';
                break;
            default:
                break;
        }
    });
    return JSON.stringify(formattedDays).replace(/[",[\]]/g,'');
}