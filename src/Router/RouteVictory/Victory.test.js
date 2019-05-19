const incidents = [{actions: "loading", application: "loading", description: "loading", end: "Jan 1 2019 5:07:00 GMT+0200 (SAST)", id: "INC1554937984145", impact: "loading", priority: "loading", reporter: "loading", resolver: "loading", start: "Jun 1 2019 6:47:00 GMT+0200 (SAST)"}, {actions: "loading", application: "loading", description: "loading", end: "November 1 2019 5:07:00 GMT+0200 (SAST)", id: "INC1554937984145", impact: "loading", priority: "loading", reporter: "loading", resolver: "loading", start: "November 1 2019 11:37:00 GMT+0200 (SAST)"}];

test("calculates the difference between two dates", () => {
    const endtime = new Date("Jun 1 2019 5:08:00 GMT+0200 (SAST)").getTime(), starttime = new Date("Jun 1 2019 5:07:00 GMT+0200 (SAST)").getTime();

    expect(Math.floor(endtime - starttime)).toBe(60000)
});

test("adds an incident to a month", () => {
    const yearAgo = new Date(new Date().setFullYear(new Date().getFullYear() - 1));
    let monthly = [];
    incidents.forEach(incident => {
        if (incident.end) {
            const incidentEndStart = new Date(Date.parse(incident.start));
            if (incidentEndStart > yearAgo) {
                monthly[incidentEndStart.getMonth] = monthly[incidentEndStart.getMonth] + incidentEndStart.getTime;
            }
        }
    });
    
    console.log(monthly)

    expect(monthly).toBe([])
});