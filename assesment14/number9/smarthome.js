// Device Constructor
function Device(name, type, status = false) {
  this.name = name;
  this.type = type;
  this.status = status;
}

Device.prototype.turnOn = function () {
  this.status = true;
  console.log(`${this.name} is ON`);
};

Device.prototype.turnOff = function () {
  this.status = false;
  console.log(`${this.name} is OFF`);
};

Device.prototype.checkStatus = function () {
  console.log(`${this.name} is ${this.status ? "ON" : "OFF"}`);
};

// SmartDevice Constructor (inherits from Device)
function SmartDevice(name, type, brand, connectivity, status = false) {
  Device.call(this, name, type, status);
  this.brand = brand;
  this.connectivity = connectivity;
}

SmartDevice.prototype = Object.create(Device.prototype);
SmartDevice.prototype.constructor = SmartDevice;

SmartDevice.prototype.checkConnectivity = function () {
  console.log(
    `${this.name} is ${this.connectivity ? "connected" : "not connected"}`
  );
};

// SmartLight Constructor (inherits from SmartDevice)
function SmartLight(
  name,
  brand,
  connectivity,
  brightness = 50,
  color = "white",
  status = false
) {
  SmartDevice.call(this, name, "SmartLight", brand, connectivity, status);
  this.brightness = brightness;
  this.color = color;
}

SmartLight.prototype = Object.create(SmartDevice.prototype);
SmartLight.prototype.constructor = SmartLight;

SmartLight.prototype.adjustBrightness = function (level) {
  this.brightness = level;
  console.log(`${this.name} brightness is now ${this.brightness}`);
};

SmartLight.prototype.changeColor = function (newColor) {
  this.color = newColor;
  console.log(`${this.name} color is now ${this.color}`);
};

// SmartThermostat Constructor (inherits from SmartDevice)
function SmartThermostat(
  name,
  brand,
  connectivity,
  temperature = 22,
  mode = "cooling",
  status = false
) {
  SmartDevice.call(this, name, "SmartThermostat", brand, connectivity, status);
  this.temperature = temperature;
  this.mode = mode;
}

SmartThermostat.prototype = Object.create(SmartDevice.prototype);
SmartThermostat.prototype.constructor = SmartThermostat;

SmartThermostat.prototype.setTemperature = function (newTemperature) {
  this.temperature = newTemperature;
  console.log(`${this.name} temperature is now ${this.temperature}°C`);
};

SmartThermostat.prototype.changeMode = function (newMode) {
  this.mode = newMode;
  console.log(`${this.name} mode is now ${this.mode}`);
};

// User Constructor
function User(username, password) {
  this.username = username;
  this.password = password;
  this.smartHome = null;
}

User.prototype.authenticate = async function () {
  console.log(`Authenticating ${this.username}...`);
  // Simulating authentication delay
  await new Promise((resolve) => setTimeout(resolve, 1000));
  console.log(`${this.username} authenticated successfully.`);
};

User.prototype.addDevice = function (device) {
  if (this.smartHome) {
    this.smartHome.addDevice(device);
  } else {
    console.log(`No smart home associated with ${this.username}.`);
  }
};

// SmartHome Constructor
function SmartHome(owner) {
  this.owner = owner;
  this.devices = [];
}

SmartHome.prototype.addDevice = function (device) {
  this.devices.push(device);
  console.log(`${device.name} added to ${this.owner}'s home.`);
};

SmartHome.prototype.listDevices = function () {
  console.log(`${this.owner}'s devices:`);
  this.devices.forEach((device) => device.checkStatus());
};

// Example usage
const user = new User("john_doe", "password123");
const smartHome = new SmartHome("John Doe");
user.smartHome = smartHome;

const light = new SmartLight("Living Room Light", "Philips", true);
const thermostat = new SmartThermostat("Living Room Thermostat", "Nest", true);

user.authenticate().then(() => {
  user.addDevice(light);
  user.addDevice(thermostat);
  smartHome.listDevices();

  light.turnOn();
  light.adjustBrightness(75);
  light.changeColor("blue");

  thermostat.setTemperature(24);
  thermostat.changeMode("heating");
});
