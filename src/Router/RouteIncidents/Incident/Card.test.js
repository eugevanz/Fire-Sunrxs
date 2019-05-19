import React from "react";
import renderer from 'react-test-renderer';

describe("Incident", () => {
    const incident = {actions: "loading", application: "loading", description: "loading", end: "Jun 1 2019 5:07:00 GMT+0200 (SAST)", id: "INC1554937984145", impact: "loading", priority: "loading", reporter: "loading", resolver: "loading", start: "Jun 1 2019 5:07:00 GMT+0200 (SAST)"};

    it("displays the title", () => {
        const component = renderer.create(<h5 className="card-title">{incident.application}</h5>);
        const renderedComponent = component.toJSON();

        expect(renderedComponent.children).toEqual(["loading"]);
    });
    it("sets the time to localestring", () => {
        const time = new Date(Date.parse(incident.start));
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const component = renderer.create(<small className="text-muted">{time.toLocaleDateString("en-US", options)}</small>);
        const renderedComponent = component.toJSON();
        
        expect(renderedComponent.children).toEqual([ 'Saturday, June 1, 2019' ]);
    });
    it("displays the impact", () => {
        const component = renderer.create(<p className="card-text">{incident.impact}</p>);
        const renderedComponent = component.toJSON();

        expect(renderedComponent.children).toEqual(["loading"]);
    });
    it("displays the description", () => {
        const component = renderer.create(<small className="text-muted">{incident.description}</small>);
        const renderedComponent = component.toJSON();

        expect(renderedComponent.children).toEqual(["loading"]);
    });
    
                
});