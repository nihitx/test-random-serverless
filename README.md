# Introduction

This is the Kwizie application code repository. Currently the Kwizie application is being developed as a proof of concept.
If the proof of concept suceeeds the repository will be used to further develop the code.

The code repository is built on serverless framework which allows the creation of the infrastructure and as well as the lambda functions 
which hosts the business logic

### FOR THIS TEST 
All prod env variable are removed so it can smoothly run from any laptop deployments.

## Expected System Design

![Alt text](architecture.png?raw=true "Title")

### Folder structure

    .
    ├── api                   # src directory hosting all the code
        ├── __tests__         # Hosts all the unit test for this application
        ├── common            # host response and dynamodb configuration
        ├── services          # services level middleware for all business logic
        ├── code              # Rest of the files are all lambda handlers
    ├── jest-dynamo-onfig
    └── jest.config.ts
    └── package.json
    └── tsconfig.json
    └── README.md
    └── serverless.yaml       # contains the code to build the infrastructure
    
    

# compiling

You can compile the ts files in this directory by 1st installing typescript via

`npm install -g typescript`

then

`npm i`


## Usage

The kwizie application proof of concept runs on the following methods.
A user is able to create a quiz
a user is able to retrieve a quiz
a user is able to search a quiz from elastic search
a user is able to allow other players to play quiz 

### 1) To run the application locally 
simply run `serverless offline --stage dev` to run the application locally on the dev environment
A list of function will show up showing the end point of the environment such as this 
Offline [http for lambda] listening on http://localhost:3000
                                             
   │   POST | http://localhost:3000/dev/quiz                                      │
   │   GET  | http://localhost:3000/dev/quiz/{id}                                 │
   │   GET  | http://localhost:3000/dev/quizzes/{id}                              │
   │   PUT  | http://localhost:3000/dev/quiz/{id}                                 │
   │   POST | http://localhost:3000/dev/play                                      │
   │   GET  | http://localhost:3000/dev/search                                    │

API docs after production will be found in https://stoplight.io/

### 2)  AWS environment 
The aws user account needs to be created where credentials such as 
"Access key" and "Secret acess id " are needed to deploy the serverless functions to the cloud as there is no database connected to it. 
Instructions to set up aws env with serverless can be found here https://www.serverless.com/framework/docs/providers/aws/guide/credentials
After AWS is set you can run 

`serverless deploy` 

This will deploy the application to ` region: eu-west-1`  where your lambda functions will exist. 
Thats it to run the application locally and in AWS.

### 2)  APIs
Mostly all services we are using are in AWS except OPENAI where we will be using a trained module. 
To use that module input your openai key to 
```sh
provider:
 environment:
  OPENAI: '<Your open ai key here>'
```

## Test

The testing of the application is done by Jest. 
To run test first you need to run is 
`npm test`
This will run jest under the hood.

### Important
To use the application from your home computer to use open search dashboard using KABANA
go to `serverless.yaml` file 
```sh
aws:sourceIp:
- "<ADD YOUR IP ADDRESS HERE> "
```
The authorizer does not work with serverless offline, so to test it you would need to just create a user in aws pool and then fire the creds with postman.

### TODO
Add typescript returns to functions. 
Add AWS Xray to test function load time
Cost optimize all services
Create CI/CD to serverlessframework
ADD env variables to serverlessframework CI/CD


