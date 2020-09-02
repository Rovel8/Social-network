import React from "react";
import {shallow} from "enzyme";
import News from "./News";

const setUp = (props = {}) => {
    const component = shallow(<News {...props} />)
    return component
}

const findByTestAtrr = (component: any, attr: any) => {
    const wrapper = component.find(`[data-test='${attr}']`)
    return wrapper
}

describe('Header Component', () => {

    let component: any;
    beforeEach(() => {
        component = setUp()
    })

    it('It should render without errors', () => {
        // const component = shallow((<News />))
        //const wrapper = component.find(`[data-test='NewsComponent']`)
        const wrapper = findByTestAtrr(component, 'NewsComponent')
        expect(wrapper.length).toBe(1)
    })
})