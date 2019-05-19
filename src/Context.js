import React, { useState, useEffect, createContext } from "react";
import moment from "moment";
import firebase from "./Fire";

export const UserContext = createContext([null, () => {}]);
export const IncidentsContext = createContext([null, () => {}]);
export const MonthlyContext = createContext([null, () => {}]);

export const UserProvider = ({children}) => {
    const [user, setUser] = useState(null);

    useEffect(() => firebase.auth().onAuthStateChanged(user => {
        if (user) {
            setUser(user);
        } else {
            setUser(null);
        }
    }));
    
    return <UserContext.Provider value={[user, setUser]}>
        {children}
    </UserContext.Provider>
}

export const IncidentsProvider = ({children}) => {
    const [incidents, setIncidents] = useState([{actions: "loading", application: "loading", description: "loading", end: "Jun 1 2019 5:07:00 GMT+0200 (SAST)", id: "INC1554937984145", impact: "loading", priority: "loading", reporter: "loading", resolver: "loading", start: "Jun 1 2019 5:07:00 GMT+0200 (SAST)"}]);
    const [monthly, setMonthly] = useState([]);
    // let lineOptions = {};
    let updateMonthly = [{name:"Jan",out:0},{name:"Feb",out:0},{name:"Mar",out:0},{name:"Apr",out:0},{name:"May",out:0},{name:"Jun",out:0},{name:"Jul",out:0},{name:"Aug",out:0},{name:"Sep",out:0},{name:"Oct",out:0},{name:"Nov",out:0},{name:"Dec",out:0}]

    useEffect(() => firebase.database().ref().child("incidents").on("value", snap => {
        let snapshotArray = Object.values(snap.val());

        const calcTime = (start,end) => {
            const endtime = new Date(end).getTime(), starttime = new Date(start).getTime();
            return Math.floor(endtime - starttime);
        };

        snapshotArray = snapshotArray.map(item => {
            let outageText = "Open", startText = "", endText = "", totalOut = 0;

            const endtime = new moment(new Date(item.end)), starttime = new moment(new Date(item.start));
            const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };

            const time1 = new Date(Date.parse(item.start));
            startText = time1.toLocaleDateString("en-US", options);
            const time2 = new Date(Date.parse(item.end));
            endText = time2.toLocaleDateString("en-US", options);

            const yearAgo = new Date(new Date().setFullYear(new Date().getFullYear() - 1));

            if (item.end) {
                totalOut = calcTime(item.start,item.end);
                outageText = `Resolved ${endtime.from(starttime)}`;

                if (time1 > yearAgo) updateMonthly[time1.getMonth()].out += totalOut;
            } else {outageText = "Open"};

            return {...item, outageText: outageText, startText: startText, endText: endText, totalOut: totalOut};
        });
        snapshotArray.sort((a, b) => (a.id < b.id) ? 1 : -1);
        setIncidents(snapshotArray);

        const currentMonth = (new Date()).getMonth();
    
        const monthlyArray = updateMonthly;
        for (let x=0; x<currentMonth+1; x++) {
            monthlyArray.push(monthlyArray.shift());
        }
        setMonthly(monthlyArray.reverse());
    }), []);
    
    return <IncidentsContext.Provider value={{incidents, setIncidents, monthly}}>
        {children}
    </IncidentsContext.Provider>
}