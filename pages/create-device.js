import { Selector } from "testcafe";
import { createData } from "../tasks/generate-data";
import { ninjarmm } from "./ninjarmm";

class CreateDevice {

    elements = {
        addDeviceButton: () => Selector('.submitButton'),
        systemNameInput: () => Selector('#system_name'),
        typeList: () => Selector('#type'),
        capacityInput: () => Selector('#hdd_capacity'),
        option: (i) => this.elements.typeList().find('option').nth(i),
        savebutton: () => Selector('.submitButton')
    };
    
    newDevice = [{
        system_name: createData.device.name,
        type: createData.device.type,
        hdd_capacity: createData.device.capacity
    }];

    async AddDevice(t) {
        await t.click(this.elements.addDeviceButton());
        await t.typeText(this.elements.systemNameInput(), this.newDevice[0].system_name);
        await t.click(this.elements.typeList())
            .click(this.elements.option(this.newDevice[0].type));
        await t.typeText(this.elements.capacityInput(), this.newDevice[0].hdd_capacity);
        await t.click(this.elements.savebutton());
    }

    async CheckNewDevice(t){
        this.newDevice[0].type == 0 ? this.newDevice[0].type = 'WINDOWS WORKSTATION' :
        this.newDevice[0].type == 1 ? this.newDevice[0].type = 'WINDOWS_SERVER' : this.newDevice[0].type = 'MAC';
        await ninjarmm.checkDevices(t, this.newDevice);
    }

}

export const createDevice = new CreateDevice();