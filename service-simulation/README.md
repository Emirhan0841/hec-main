# Service Simulation (JSON Server)

This folder contains the mock data for the risk analysis service.

## Tool
Use the slowed-down JSON server:
https://github.com/lwluc/slowed-down-json-server

## Start (local)
1) Install the server globally (one-time):
   npm install -g slowed-down-json-server
2) Start the server from this folder:
   slowed-down-json-server --watch db.json --port 3000

The server will be available at:
http://localhost:3000

## Example endpoints
GET /segments
GET /segments?id=A
GET /riskResults
GET /riskResults?analysisType=standard
GET /analysisRuns
GET /analysisRuns?id=101

## Camunda usage idea
- Use a REST connector or a job worker to request:
  GET http://localhost:3000/riskResults?analysisType=standard
- Pick the newest entry (by timestamp) and map to process variables.

## Optional: slow responses
The slowed-down server supports a delay parameter. Example:
GET http://localhost:3000/riskResults?analysisType=extended&delay=8000

This helps to test long-running analysis tasks and timeouts.
