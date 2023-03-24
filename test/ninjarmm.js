import { createDevice } from "../pages/create-device";
import { ninjarmm } from "../pages/ninjarmm";
import { createData } from "../tasks/generate-data";

fixture`Ninja RMM devices`

let devices = null;

test.meta({tag: 'getDevices'})('Get devices from server', async t => {
    devices = await ninjarmm.getAllDevices(t);
});

test.meta({tag: 'checkAllDevices'})('Check all devices correctly displayed in DOM', async t => {
    await ninjarmm.checkDevices(t, devices);
}).page(`http://localhost:3001/`);

test.meta({tag: 'chekcDevicesOptions'})('Check all devices options are displayed', async t => {
    await ninjarmm.checkDeviceOptions(t, devices);
}).page(`http://localhost:3001/`);

test.meta({tag: 'addDevice'})('Add new device and verify is now visible', async t => {
    await createDevice.AddDevice(t);
    await createDevice.CheckNewDevice(t);
}).page(`http://localhost:3001/`);

test.meta({tag: 'updateDevice'})('Update and validate device', async t => {
    await ninjarmm.updateDevice(t, devices);
}).page(`http://localhost:3001/`);

test.meta({tag: 'deleteDevice'})('Delete and validate device', async t => {
    await ninjarmm.deleteDevice(t, devices);
    await ninjarmm.checkNonExistingDevice(t, devices);
}).page(`http://localhost:3001/`);
