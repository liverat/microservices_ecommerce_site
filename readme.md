# Microservices project

## Set up

Open up /etc/hosts in a code editor and add the following:

<3127.0.0.1> ticketing.dev (If running on google cloud you will need to use the cluster IP address instead here)
127.0.0.1 kubernetes.docker.internal

Step to do only if you are running Docker/Kubernetes on your local machine (if you are using Google Cloud then skip this)

Change into the client directory at your terminal

Run docker build -t <YOURDOCKERID>/client .

Run docker push <YOURDOCKERID>/client

Change back to the root project directory.

Run skaffold dev

You will need to set up a secret key in order to create your jason web tokens for authentication.

kubectl create secret generic jwt-secret --from-literal JWT_KEY=asdf
