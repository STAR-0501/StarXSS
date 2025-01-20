import os

for a,b,c in os.walk('../devices'):
    for i in b:
        print(i)