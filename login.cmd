echo "Logging in"

curl --insecure -v -d "@login.json" POST -H "Content-Type:application/json" http://localhost:3000/login 

@REM curl -v https://dev.stedi.me/validate/5bb368ac-7ed6-4c4b-bc77-3a8fc5e25044
