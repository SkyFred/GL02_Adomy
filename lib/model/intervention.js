module.exports = function (day, time, duration, responsable, lieu) {
    if (day == null)
        throw new Error('day is missing');
    if (time == null)
        throw new Error('time is missing');
    if (duration == null)
        throw new Error('duration is missing');

    this.day = day; // integer (0: monday, 6: sunday)
    this.time = time; // integer (0: 12AM, 47: 11:30PM)
    this.duration = duration; // Half-hours
    this.intervenant = responsable; // string
    this.place = lieu; // string
};
