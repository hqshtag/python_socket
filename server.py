import socket

s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

hostname = socket.gethostname()
local_ip = socket.gethostbyname(hostname)

s.bind((local_ip,1337)) #server hostname
print('server IP Address is ', local_ip, ":1337") # host name of the server
s.listen(5) #number of possible  Connection to clients
print('waiting to connect')

while True:
    # now our endpoint knows about the OTHER endpoint.
    clientsocket, address = s.accept() #clientsocket and client adress
    print(f"Connection from client {address} has been established.")
    while True :
        data= input('command:') #give commands , data
        if (data == 'end') :
            clientsocket.close() #close socket
            break
        clientsocket.send(data.encode("utf-8")) #send data to the client

