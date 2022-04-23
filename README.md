# Mailer-Bot

/install : It will create all the required JSON files before starting the Process. 

/sender : It will accept a JSON file which will have all the sender user ids and password for sending mails. 

/email : It will accept a JSON file which will have all the email list for mail sending. 

/template : This will recieve all the templates which will send 

/status : Here we can check all the logs 

/errors : Here all the errors are logged for us to check if required. 

/start : This will help us to check if all the requirements are fullfiled to start the mailer. 

/process : This route will help us to setup a destination for sending all the error reports as well as all the other logs. 

--------------------------------------------------------------------------------------------------------------------------------------------------------------
/install : This will be the first route which need to accessed, to start the mailer-bot.  No qery params will be required. 

=============================================================================================================================================================
/process : The process route will accept, two query params . one is status and another will be link. 
The status will either have param active or inactive, if it will be active, it must supply a link to send logs or if the status 
will be inactive then link is not required. The link provided must include http or https and port if required. It must have logger route to accept 
the log information. It will send params like ip, which will have ip address of the server, id which will be id of the error and status which will be error or log as required also message ,which will have description of the error or log. 

/process can be sent status "inactive" if no log information is required, which will not check for link query.

/process?status=active&link=https://128.0.0.01:3000/ 
==============================================================================================================================================================

/sender : This route will accept a two query params, data which should have sender as param while src should have a json file as param. It copy those senders for 
starting the mailer. 
  example:  /sender?data=sender&src=http://postal.webtobuzz.com:5000/json/sender.json  
  Sender json schema example: https://gist.github.com/dhirendralive9/6002f7cb09bd22116c53fbb8a565b1a1

==============================================================================================================================================================

/email: This route will accept two query params. data which should have list as param while the src should have link to json list which have list of emails where emails need to be send. The json file link in the src query must have email, param in the json objects. as in the example. 

request example: /email?data=list&src=http://postal.webtobuzz.com:5000/json/list.json
Email List Schema Example: https://gist.github.com/dhirendralive9/baefcc2c8e30fa99164f7523230bf81e

==============================================================================================================================================================

/template: This route will accept two query data and src, where data will have templates as value while src query will have list as a value which should be a json file where. there must a file with template which will be used in the mailer. 

request example: /template?data=templates&src=http://postal.webtobuzz.com:5000/json/templates.json
Template List Schema Example: https://gist.github.com/dhirendralive9/d95af5cbff039bdfa0a1fc1472422c04

=================================================================================================================================================================

/status: This route can be used to check all the logs manually in the individual server. 

===============================================================================================================================================================

/errors: This route can be used to check all the error logs manually in the individual server. 

==============================================================================================================================================================

/start : This route can be visited, to check if all the requirements are fullfiled in order to start the mailer when route is visited without any query param.

/start?mailer=active : This route will active the mailer and start sending mails while sending log and error details if activated. 

=====================================================================================================================================================================
