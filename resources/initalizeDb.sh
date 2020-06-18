#!/bin/bash
# ------------------------------------------------------------------
# [Author] Alberto Ielpo
#          Inizialize db
# ------------------------------------------------------------------
# database name: ielponet
# authenticated with: admin
# the passwords must be hashed (sha1) before the insertion
# {us:fe, pa:s20(fe)}
# {us:tito, pa:v3(ielpo.net,role)}
mongoimport -u "root" -p "0($<7k:jl3)*<f#8*" --authenticationDatabase "admin" --jsonArray --db ielponet --collection user --file userFile.json