import blescan
import sys
import math
import time
import serial

import bluetooth._bluetooth as bluez

s = serial.Serial("/dev/ttyS2",9600)

def calcDistance(rssi):
    focal_point = -16;
    distance = math.pow(10, (focal_point + rssi) / (10 * 2));
    return float("{0:.2f}".format(distance));

def triangle(a,b,c):
    temp = (math.acos((math.pow(a, 2) + math.pow(c, 2) - math.pow(b, 2)) / (2 * a * c))) * (180 / math.pi)
    if temp > 90:
        return ["left",(math.cos(180 - temp) * a) + 15,math.tan(180 - temp) * a]
    elif temp <= 90 and temp >= 45:
        return ["middle",(math.cos(temp) * a),math.tan(temp) * a]
    elif temp < 45:
        return ["right",(math.cos(temp) * a),math.tan(temp) * a]

try:
    sensor_1 = bluez.hci_open_dev(0)
    sensor_2 = bluez.hci_open_dev(1)
    sensor_3 = bluez.hci_open_dev(2)

except:
    print "error accessing bluetooth device..."
    sys.exit(1)

blescan.hci_le_set_scan_parameters(sensor_1)
blescan.hci_enable_le_scan(sensor_1)
blescan.hci_le_set_scan_parameters(sensor_2)
blescan.hci_enable_le_scan(sensor_2)
blescan.hci_le_set_scan_parameters(sensor_3)
blescan.hci_enable_le_scan(sensor_3)

while True:

    output_1 = ''.join(map(str, blescan.parse_events(sensor_1, 1)))
    output_2 = ''.join(map(str, blescan.parse_events(sensor_2, 1)))
    output_3 = ''.join(map(str, blescan.parse_events(sensor_3, 1)))

    print output_1
    s.open()
    s.write("st\n") # Servo test command
    time.sleep(5) # Wait for 5 seconds
    s.write("serr\n") # Wrong command to stop servo test
    s.close()
    print output_2
    print output_3
