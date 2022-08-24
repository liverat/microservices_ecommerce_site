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

Give Skaffold a little time to start up. You should then be able to access the app in your browser at ticketing.dev.

Important - You can also use this zip file as a checkpoint. It includes all updates and fixes from previous lecture notes including the Auth service, Ingress, and Client service. If you would rather not code along, you can simply download the zip file, extract and run skaffold dev. This assumes that your ticketing secret had previously been set. If not, you will need to run:

kubectl create secret generic jwt-secret --from-literal JWT_KEY=asdf
