import socket
import os
import gzip

# directorul in care se afla fisierele de continut
continut_dir = "C:\\proiect-1-SergiuCeica\\continut\\"

# creeaza un server socket
serversocket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

# specifica ca serverul va rula pe portul 5678, accesibil de pe orice ip al serverului
serversocket.bind(('', 5678))

# serverul poate accepta conexiuni; specifica cati clienti pot astepta la coada
serversocket.listen(5)

while True:
    print('#########################################################################')
    print('Serverul asculta potentiali clienti.')

    # asteapta conectarea unui client la server
    # metoda `accept` este blocanta => clientsocket, care reprezinta socket-ul corespunzator clientului conectat
    (clientsocket, address) = serversocket.accept()
    print("S-a conectat un client.")
    
    # se proceseaza cererea si se citeste prima linie de text
    cerere = ''
    linieDeStart = ''
    while True:
        data = clientsocket.recv(1024)
        cerere = cerere + data.decode()
        print('S-a citit mesajul: \n---------------------------\n' + cerere + '\n---------------------------')
        pozitie = cerere.find('\r\n')
        if (pozitie > -1):
            linieDeStart = cerere[0:pozitie]
            print('S-a citit linia de start din cerere: ##### ' + linieDeStart + '#####')
            break
    print('S-a terminat cititrea.')
    
    # TODO interpretarea sirului de caractere `linieDeStart` pentru a extrage numele resursei cerute
    vector = linieDeStart.split(' ')
    nume = vector[1][1:]

    # TODO trimiterea răspunsului HTTP
    #raspuns = "HTTP/1.1 200 OK\r\n"
    raspuns = "HTTP/1.1 200 OK\r\n\r\nHello World - " + nume + "\r\n"

    # deschide fisierul pentru citire
    fisier = open(continut_dir + nume, 'rb')
    continut = fisier.read()
    fisier.close()

    if nume.endswith('.html'):
        raspuns += 'Content-Type: text/html\r\n'
    elif nume.endswith('.css'):
        raspuns += 'Content-Type: text/css\r\n'
    elif nume.endswith('.js'):
        raspuns += 'Content-Type: application/js\r\n'
    elif nume.endswith('.png'):
        raspuns += 'Content-Type: text/png\r\n'
    elif nume.endswith('.jpg') or nume.endswith('.jpeg'):
        raspuns += 'Content-Type: text/jpeg\r\n'
    elif nume.endswith('.gif'):
        raspuns += 'Content-Type: text/gif\r\n'
    elif nume.endswith('.ico'):
        raspuns += 'Content-Type: image/x-icon\r\n'

    # compresam continutul cu gzip
    continut_gzip = gzip.compress(continut)

    raspuns += "Content-Length: " + str(len(continut_gzip)) + "\r\n"
    raspuns += "Content-Encoding: gzip\r\n"

    clientsocket.sendall(raspuns.encode())
    

    clientsocket.close()
    print('S-a terminat comunicarea cu clientul.')