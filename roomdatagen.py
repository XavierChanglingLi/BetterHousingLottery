'''
Benji Andrews
CS330 Fall 2021
roomdatagen.py: python script for generating dummy student data for the housing project.
'''

import os
import sys
import json
import random
import string

f = open("namelist.txt")
names = []
for line in f:
    names.append(line.strip())
f.close()


student_dicts = []
room_dicts = []

#make building IDs unique
buildingIDs = {
    "foss":"000",
    "roberts":"001",
    "dana":"002"
}

for i in range(100):
    room_dicts.append({})
    room_dicts[i]["checked"] = False
    room_dicts[i]["building"] = random.choice(["roberts","foss","dana"])
    room_dicts[i]["roomID"] = buildingIDs[room_dicts[i]["building"]] + str(random.randint(0,350)).zfill(3)
    room_dicts[i]["roomPicUrl"] = None;
    
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
    student_dicts[i]["email"] = names[i].replace(" ", ".") + "@colby.edu"
    student_dicts[i]["password"] = ''.join(random.choices(string.ascii_uppercase + string.digits, k=10))
    student_dicts[i]["role"] = 0
    if random.random() > .8:
        student_dicts[i]["discipStatus"] = "probation"
    else:
        student_dicts[i]["discipStatus"] = "normal"
    student_dicts[i]["assignedRoom"] = None;

    #randomly sample a random number of rooms from the student's desired room group type 
    same_occupancy = [x for x in room_dicts if x["occupancy"]==room_dicts[i]["occupancy"]]
    num_rooms = random.randint(0,5)
    if num_rooms > len(same_occupancy):
        num_rooms=len(same_occupancy)
    student_dicts[i]["queue"] = random.sample(same_occupancy, k=num_rooms)

student_fout = open("students.json", "x")
room_fout = open("rooms.json","x")

student_fout.write("[")
room_fout.write("[")
for i in range(100):
    student_fout.write(json.dumps(student_dicts[i]))
    room_fout.write(json.dumps(room_dicts[i]))
    if i<99:
        student_fout.write(",")
        room_fout.write(",")
    
student_fout.write("]")
room_fout.write("]")



student_fout.close()
room_fout.close()
