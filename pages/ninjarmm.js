import { Selector } from "testcafe";

class NinjaRMM {

    elements = {
        device: (name, type, capacity) => Selector('.device-info')
            .find('span').withText(name)
            .nextSibling('span').withText(type)
            .nextSibling('span').withText(capacity),

        editButton: (name) => Selector('span').withText(name).parent('div').nextSibling('div').find('a'),
        removeButton: (name) => Selector('span').withText(name).parent('div').nextSibling('div').find('button')

    };
    bodyr = [{
        system_name: "Renamed-Device",
        type: "WINDOWS WORKSTATION",
        hdd_capacity: "10"
    },];

    async checkDevices(t, devices) {
        for (const device of devices) {
            await t.expect(this.elements.device(device.system_name, device.type, device.hdd_capacity).visible).ok();
        }
    }

    async checkDeviceOptions(t, devices) {
        for (const device of devices) {
            await t.expect(this.elements.editButton(device.system_name).visible).ok();
            await t.expect(this.elements.removeButton(device.system_name).visible).ok();
        }
    }

    async getAllDevices(t) {
        const response = await t.request(`http://localhost:3000/devices`);
        await t.expect(response.status).eql(200);
        const devices = response.body;
        return devices;
    }

    async updateDevice(t, devices) {
        let id = devices[0].id;

        await t.request({
            url: 'http://localhost:3000/devices/' + id,
            method: 'PUT',
            body: this.bodyr[0]
        })

        await this.checkDevices(t, this.bodyr);
    }

    async deleteDevice(t, devices) {
        let id = devices[devices.length - 1].id;
        

        await t.request({
            url: 'http://localhost:3000/devices/' + id,
            method: 'DELETE'
        });
    }

    async checkNonExistingDevice(t, devices){
        let lastDevice = devices[devices.length - 1];

        const device = {
            name: lastDevice.system_name,
            type: lastDevice.type,
            capacity: lastDevice.hdd_capacity
        };
        await t.eval(() => location.reload());
        await t.expect(this.elements.device(device.name, device.type, device.capacity).visible).notOk();
    }

}

export const ninjarmm = new NinjaRMM();