bluetooth.startUartService()
let connected = 0
let uartData = ""
let pin_L = DigitalPin.P15
let pin_R = DigitalPin.P14
pins.setPull(pin_L, PinPullMode.PullNone)
pins.setPull(pin_R, PinPullMode.PullNone)
let whiteline = 1
