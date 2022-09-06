# Microservices project

## Set up

Open up /etc/hosts in a code editor and add the following:

<127.0.0.1> ticketing.dev
127.0.0.1 kubernetes.docker.internal
(Note that if you're running your containers on google cloud, you'd use your cluster ip address instead of localhost's 127.0.0.1)

Change into the client directory at your terminal

Run docker build -t <YOURDOCKERID>/client .

Run docker push <YOURDOCKERID>/client

Change into orders directory
Run docker build -t <YOURDOCKERID>/orders .

Run docker push <YOURDOCKERID>/orders

change into auth directory
Run docker build -t <YOURDOCKERID>/auth .
Run docker push <YOURDOCKERID>/auth

Change back to the root project directory.

Run `skaffold dev`

Note that you may need to have docker running on your machine even if you are running your kubernetes clusters on the cloud.

You will need to set up a secret key in order to create your jason web tokens for authentication.

kubectl create secret generic jwt-secret --from-literal JWT_KEY=<Insert a secret key here (can use any random string)>
kubectl create secret generic stripe-secret --from-literal STRIPE_KEY=<Instert stripe s
ecret api key here (need to sign up at stripe.com)>
