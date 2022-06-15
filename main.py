bluetooth.start_uart_service()
connected = 0
uartData = ""
pin_L = DigitalPin.P15
pin_R = DigitalPin.P14
pins.set_pull(pin_L, PinPullMode.PULL_NONE)
pins.set_pull(pin_R, PinPullMode.PULL_NONE)
whiteline = 0


def on_bluetooth_connected():
    global connected, uartData, whiteline
    basic.show_icon(IconNames.HEART)
    connected = 1
    while connected == 1:
        print(1)
        uartData = bluetooth.uart_read_until(serial.delimiters(Delimiters.HASH))
        console.log_value("data", uartData)
        if uartData == "S":
            whiteline = 1
        if uartData == "U":
            whiteline = 2
bluetooth.on_bluetooth_connected(on_bluetooth_connected)

def on_bluetooth_disconnected():
    global connected
    connected = 0
bluetooth.on_bluetooth_disconnected(on_bluetooth_disconnected)

#Manuální řízení
def Manual():
    if uartData == "A":
        PCAmotor.motor_run(PCAmotor.Motors.M4, 140)
        PCAmotor.motor_run(PCAmotor.Motors.M1, 100)
    
    elif uartData == "C":
        PCAmotor.motor_run(PCAmotor.Motors.M4, 100)
        PCAmotor.motor_run(PCAmotor.Motors.M1, 20)

    elif uartData == "D":
        PCAmotor.motor_run(PCAmotor.Motors.M4, 20)
        PCAmotor.motor_run(PCAmotor.Motors.M1, 100)
    
    elif uartData == "B":
            PCAmotor.motor_run(PCAmotor.Motors.M4, -100)
            PCAmotor.motor_run(PCAmotor.Motors.M1, -100)

    elif uartData == "0":
        PCAmotor.motor_run(PCAmotor.Motors.M4, 0)
        PCAmotor.motor_run(PCAmotor.Motors.M1, 0)
    
#Sledování čáry
def line_following():
    
    if pins.digital_read_pin(pin_R) == 0 and pins.digital_read_pin(pin_L) == 0:
            PCAmotor.motor_run(PCAmotor.Motors.M1, 120)
            PCAmotor.motor_run(PCAmotor.Motors.M4, 150)

            
    elif pins.digital_read_pin(pin_R) == 1 and pins.digital_read_pin(pin_L) == 1:
            PCAmotor.motor_run(PCAmotor.Motors.M1, 120)
            PCAmotor.motor_run(PCAmotor.Motors.M4, 150)
            

    elif pins.digital_read_pin(pin_L) == 1:  
            PCAmotor.motor_run(PCAmotor.Motors.M1, 80)
            PCAmotor.motor_run(PCAmotor.Motors.M4, -60)
            
    elif pins.digital_read_pin(pin_R) == 1:
            PCAmotor.motor_run(PCAmotor.Motors.M1, -60)
            PCAmotor.motor_run(PCAmotor.Motors.M4, 80)
         
def on_forever():
    global whiteline
    if whiteline == 1:
        Manual()
    if whiteline == 2:
        line_following()
basic.forever(on_forever)

#def switch():
    #if uartData == "1":
        #line_following() #Spouští mód bez zasahování do jízdy

    #else:
        #manual()
