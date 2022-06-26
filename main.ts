function SEND_ACK (name: string) {
    serial.writeString("!" + name + ":" + "A" + ":" + "0" + "#")
}
serial.onDataReceived(serial.delimiters(Delimiters.Hash), function () {
    name_device = serial.readUntil(serial.delimiters(Delimiters.Colon))
    cmd = serial.readUntil(serial.delimiters(Delimiters.Hash))
    SEND_ACK(name_device)
    if (cmd == "0") {
        radio.sendValue(name_device, 0)
    } else if (cmd == "1") {
        radio.sendValue(name_device, 1)
    } else if (cmd == "2") {
        radio.sendValue(name_device, 2)
    } else if (cmd == "3") {
        radio.sendValue(name_device, 3)
    } else if (cmd == "A") {
        flag_ACK = 1
    }
})
radio.onReceivedValue(function (name, value) {
    flag_ACK = 0
    serial.writeString("!" + name + ":" + value + "#")
    time = input.runningTime()
    control.waitForEvent(flag_ACK, 1)
    basic.showNumber(value)
})
let cmd = ""
let name_device = ""
let flag_ACK = 0
let time = 0
let id = 0
time = input.runningTime()
radio.setGroup(68)
flag_ACK = 0
