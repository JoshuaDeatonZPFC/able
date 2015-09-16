import blescan
import sys
import math
import time
import serial

import bluetooth._bluetooth as bluez

s = serial.Serial("/dev/ttyS2",9600)

def calcDistance(rssi):
        focal_point = -16
        distance = math.pow(10, (focal_point - rssi) / (10 * 2))
        return float("{0:.2f}".format(distance))

def triangle(a,b):
    c = math.sqrt(math.pow(a,2)+math.pow(b,2));
    angle = (math.acos((math.pow(a, 2) + math.pow(c, 2) - math.pow(b, 2)) / (2 * a * c))) * (180 / math.pi)
    if angle > 90:
        return ["left",(math.cos(180 - angle) * a) + 15,math.tan(180 - angle) * a]
    elif angle <= 90 and angle >= 45:
        return ["middle",(math.cos(angle) * a),math.tan(angle) * a]
    elif angle < 45:
        return ["right",(math.cos(angle) * a),math.tan(angle) * a]

def triangulation(distance_from_beacon_to_a, distance_from_beacon_to_b, distance_from_beacon_to_c):
    default_position = [2500, 15, 1500]
    front = triangle(distance_from_beacon_to_a, distance_from_beacon_to_b)
    left = triangle(distance_from_beacon_to_a, distance_from_beacon_to_c)

    avg_z =(front[2] * left[2]) / 2;

    if avg_z < default_position[0]:
        s.write("st\n") # Servo test command

        s.write("serr\n") # Wrong command to stop servo test
    elif avg_z > default_position[0]:
        s.write("st\n") # Servo test command

        s.write("serr\n") # Wrong command to stop servo test
    if front[1] < default_position[1]:
        s.write("st\n") # Servo test command

        s.write("serr\n") # Wrong command to stop servo test
    elif front[1] > default_position[1]:
        s.write("st\n") # Servo test command

        s.write("serr\n") # Wrong command to stop servo test
    if left[1] < default_position[2]:
        s.write("st\n") # Servo test command

        s.write("serr\n") # Wrong command to stop servo test
    elif left[1] > default_position[2]:
        s.write("st\n") # Servo test command

        s.write("serr\n") # Wrong command to stop servo test

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

rssi_1 = []
rssi_2 = []
rssi_3 = []
distance_1 = 0
distance_2 = 0
distance_3 = 0

while True:

    output_1 = blescan.parse_events(sensor_1, 1)
    if len(rssi_1) < 5:
	distance_1 = 0
	if output_1 != '':
        	rssi_1.append(output_1)
    else:
	rssi_1.remove(min(rssi_1))
	rssi_1.remove(min(rssi_1))
        distance_1 = calcDistance(min(rssi_1))

    output_2 = blescan.parse_events(sensor_2, 1)
    if len(rssi_2) < 5:
	distance_2 = 0
	if output_2 != '':
        	rssi_2.append(output_2)
    else:
	rssi_2.remove(min(rssi_2))
	rssi_2.remove(min(rssi_2))
        distance_2 = calcDistance(min(rssi_2))

    output_3 = blescan.parse_events(sensor_3, 1)
    if len(rssi_3) < 5:
	distance_3 = 0
	if output_3 != '':
        	rssi_3.append(output_3)
    else:
	rssi_3.remove(min(rssi_3))
	rssi_3.remove(min(rssi_3))
        distance_3 = calcDistance(min(rssi_3))

    if distance_1 != 0 and distance_2 != 0 and distance_3 != 0:
    	triangulation(distance_1,distance_2,distance_3)
	rssi_1 = []
	rssi_2 = []
	rssi_3 = []
