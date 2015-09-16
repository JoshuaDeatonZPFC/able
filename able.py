import blescan
import sys

import bluetooth._bluetooth as bluez

try:
    sensor_1 = bluez.hci_open_dev(0)
    sensor_2 = bluez.hci_open_dev(1)

except:
    print "error accessing bluetooth device..."
    sys.exit(1)

blescan.hci_le_set_scan_parameters(sensor_1)
blescan.hci_enable_le_scan(sensor_1)
blescan.hci_le_set_scan_parameters(sensor_2)
blescan.hci_enable_le_scan(sensor_2)

while True:
    returnedList = blescan.parse_events(sensor_1, 1)
    for beacon in returnedList:
        print "Sensor_1"
        print "UUID: "+beacon[len(beacon)-49]+beacon[len(beacon)-48]+beacon[len(beacon)-47]+beacon[len(beacon)-46]+beacon[len(beacon)-45]+beacon[len(beacon)-44]+beacon[len(beacon)-43]+beacon[len(beacon)-42]+beacon[len(beacon)-41]+beacon[len(beacon)-40]+beacon[len(beacon)-39]+beacon[len(beacon)-38]+beacon[len(beacon)-37]+beacon[len(beacon)-36]+beacon[len(beacon)-35]+beacon[len(beacon)-34]+beacon[len(beacon)-33]+beacon[len(beacon)-32]+beacon[len(beacon)-31]+beacon[len(beacon)-30]+beacon[len(beacon)-29]+beacon[len(beacon)-28]+beacon[len(beacon)-27]+beacon[len(beacon)-26]+beacon[len(beacon)-25]+beacon[len(beacon)-24]+beacon[len(beacon)-23]+beacon[len(beacon)-22]+beacon[len(beacon)-21]+beacon[len(beacon)-20]+beacon[len(beacon)-19]+beacon[len(beacon)-18]
        print "Major: "+beacon[len(beacon)-16]+beacon[len(beacon)-15]+beacon[len(beacon)-14]
        print "Minor: "+beacon[len(beacon)-12]+beacon[len(beacon)-11]+beacon[len(beacon)-10]+beacon[len(beacon)-9]
        print "RSSI: "+beacon[len(beacon)-3]+beacon[len(beacon)-2]+beacon[len(beacon)-1]

    returnedList = blescan.parse_events(sensor_2, 1)
    for beacon in returnedList:
        print "Sensor_2"
        print "UUID: "+beacon[len(beacon)-49]+beacon[len(beacon)-48]+beacon[len(beacon)-47]+beacon[len(beacon)-46]+beacon[len(beacon)-45]+beacon[len(beacon)-44]+beacon[len(beacon)-43]+beacon[len(beacon)-42]+beacon[len(beacon)-41]+beacon[len(beacon)-40]+beacon[len(beacon)-39]+beacon[len(beacon)-38]+beacon[len(beacon)-37]+beacon[len(beacon)-36]+beacon[len(beacon)-35]+beacon[len(beacon)-34]+beacon[len(beacon)-33]+beacon[len(beacon)-32]+beacon[len(beacon)-31]+beacon[len(beacon)-30]+beacon[len(beacon)-29]+beacon[len(beacon)-28]+beacon[len(beacon)-27]+beacon[len(beacon)-26]+beacon[len(beacon)-25]+beacon[len(beacon)-24]+beacon[len(beacon)-23]+beacon[len(beacon)-22]+beacon[len(beacon)-21]+beacon[len(beacon)-20]+beacon[len(beacon)-19]+beacon[len(beacon)-18]
        print "Major: "+beacon[len(beacon)-16]+beacon[len(beacon)-15]+beacon[len(beacon)-14]
        print "Minor: "+beacon[len(beacon)-12]+beacon[len(beacon)-11]+beacon[len(beacon)-10]+beacon[len(beacon)-9]
        print "RSSI: "+beacon[len(beacon)-3]+beacon[len(beacon)-2]+beacon[len(beacon)-1]

