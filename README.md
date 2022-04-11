# Mailer-Bot

<b>09-04-2022</b>: So we have the structure on how the bot is going to intake the data which is essential for the operation of the mailer-bot.\n
The new structure is much more efficient when it comes to intaking much more data in few seconds as compared as compared with the older structure 
which was taking a lot more time like hours to send data. Now, we should focus to make sure that data which is recived is appropiate and its ready to get in action. 

<b>11-04-2022</b>: We have successfully added the /error , /status and /start route. More tesing needed. We can start working on mailer module now. All the routes are working fine now, they are able to retrieve data from the given links. But due to handling of files, other modules are unable to access the same files. In order to fix this, we will create centralised file which will process all the function of reading json data, checking fetched data as well as writing fetched data. It will be imported to all the routes and all the variables will be accessable all over the other js files. It will make our job much more easy. 



