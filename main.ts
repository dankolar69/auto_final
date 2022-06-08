bluetooth.startUartService()
let connected = 0
let uartData = ""
let pin_L = DigitalPin.P15
let pin_R = DigitalPin.P14
pins.setPull(pin_L, PinPullMode.PullNone)
pins.setPull(pin_R, PinPullMode.PullNone)
let whiteline = 1
bluetooth.onBluetoothConnected(function on_bluetooth_connected() {
    
    basic.showIcon(IconNames.Heart)
    connected = 1
    while (connected == 1) {
        console.log(1)
        uartData = bluetooth.uartReadUntil(serial.delimiters(Delimiters.Hash))
        console.logValue("data", uartData)
        Manual()
    }
})
// Spouští mód bez zasahování do jízdy
bluetooth.onBluetoothDisconnected(function on_bluetooth_disconnected() {
    
    basic.showIcon(IconNames.Sad)
    connected = 0
    while (connected == 0) {
        line_following()
    }
})
// Manuální řízení
function Manual() {
    if (uartData == "A") {
        PCAmotor.MotorRun(PCAmotor.Motors.M4, 100)
        PCAmotor.MotorRun(PCAmotor.Motors.M1, 100)
    } else if (uartData == "C") {
        PCAmotor.MotorRun(PCAmotor.Motors.M4, 100)
        PCAmotor.MotorRun(PCAmotor.Motors.M1, 20)
    } else if (uartData == "D") {
        PCAmotor.MotorRun(PCAmotor.Motors.M4, 20)
        PCAmotor.MotorRun(PCAmotor.Motors.M1, 100)
    } else if (uartData == "B") {
        PCAmotor.MotorRun(PCAmotor.Motors.M4, -100)
        PCAmotor.MotorRun(PCAmotor.Motors.M1, -100)
    } else if (uartData == "0") {
        PCAmotor.MotorRun(PCAmotor.Motors.M4, 0)
        PCAmotor.MotorRun(PCAmotor.Motors.M1, 0)
    }
    
}

// Sledování čáry
function line_following() {
    if (pins.digitalReadPin(pin_R) == 0 && pins.digitalReadPin(pin_L) == 0) {
        PCAmotor.MotorRun(PCAmotor.Motors.M1, 80)
        PCAmotor.MotorRun(PCAmotor.Motors.M4, 100)
    } else if (pins.digitalReadPin(pin_R) == 1 && pins.digitalReadPin(pin_L) == 1) {
        PCAmotor.MotorRun(PCAmotor.Motors.M1, 80)
        PCAmotor.MotorRun(PCAmotor.Motors.M4, 100)
    } else if (pins.digitalReadPin(pin_L) == 1) {
        PCAmotor.MotorRun(PCAmotor.Motors.M1, 60)
        PCAmotor.MotorRun(PCAmotor.Motors.M4, -60)
    } else if (pins.digitalReadPin(pin_R) == 1) {
        PCAmotor.MotorRun(PCAmotor.Motors.M1, -60)
        PCAmotor.MotorRun(PCAmotor.Motors.M4, 60)
    }
    
    basic.pause(50)
}

