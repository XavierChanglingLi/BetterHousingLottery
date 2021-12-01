'''
Benji Andrews
CS330 Fall 2021
roomdatagen.py: python script for generating dummy student data for the housing project.
'''

import os
import sys
import json
import random

f = open("namelist.txt")
names = []
for line in f:
    names.append(line.strip())
f.close()


student_dicts = []
room_dicts = []

for i in range(100):
    room_dicts.append({}) 
    room_dicts[i]["roomID"] = str(random.randint(0,350)).zfill(3)
    room_dicts[i]["building"] = random.choice(["roberts","foss","dana"])
    
    # handle occupancy 
    if random.random() > .6:
        room_dicts[i]["occupancy"] = 2
    elif random.random() > .8:
        room_dicts[i]["occupancy"] = 3
    elif random.random() > .9:
        room_dicts[i]["occupancy"] = 4
    else:
        room_dicts[i]["occupancy"] = 1

    room_dicts[i]["area"] = (room_dicts[i]["occupancy"] * 100 ) + random.randrange(0,75)

#build out student dicts 
for i in range(100):
    student_dicts.append({})
    student_dicts[i]["studentID"] = str(i).zfill(6)
    student_dicts[i]["name"] = names[i]
    student_dicts[i]["classYear"] = random.choice([2022, 2023, 2024, 2025])
    student_dicts[i]["housingType"] = "traditional"
    if random.random() > .8:
        student_dicts[i]["discipStatus"] = "probation"
    else:
        student_dicts[i]["discipStatus"] = "normal"
    student_dicts[i]["assignedRoom"] = None;
    student_dicts[i]["roomPicUrl"] = None;

    #randomly sample a random number of rooms from the student's desired room group type 
    same_occupancy = [x for x in room_dicts if x["occupancy"]==room_dicts[i]["occupancy"]]
    num_rooms = random.randint(0,5)
    if num_rooms > len(same_occupancy):
        num_rooms=len(same_occupancy)
    student_dicts[i]["queue"] = random.sample(same_occupancy, k=num_rooms)

if not os.path.isdir("rooms"):
    os.mkdir("rooms")
    os.mkdir("students")

for f in os.scandir("students"):
    os.remove(f)
for f in os.scandir("rooms"):
    os.remove(f.path)



for i in range(100):
    student_fout = open("students/student{}.json".format(i), "x")
    room_fout = open("rooms/room{}.json".format(i), "x")
    
    json.dump(student_dicts[i], student_fout)
    json.dump(room_dicts[i], room_fout)
    
    student_fout.close()
    room_fout.close()


