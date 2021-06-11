# sapper_4_11chat

 Version: 0.9.1

 Author  : Kouji Nakashima / kuc-arc-f.com

 date    : 2021/06/10

 update  :

***
## License
Licence : MIT License

***
### Summary

Sapper + svelte + Headless CMS , chat sample

***
### chat window

![img](https://github.com/kuc-arc-f/screen-img/blob/master/web/2021/chats/ss-chat-0611a1.png?raw=true "")

***
### Setup

* npm install

***
app_config.js

* MY_API_URL, MY_API_KEY, MY_SITE_ID change required

```
MY_API_URL : "http://localhost:3001",
MY_API_KEY: "1234",
MY_SITE_ID: "1234",      
MY_MAX_USER: 3, 
```

* if change max user, MY_MAX_USER change

***
### Start server
* start :

yarn dev

***
### Headless CMS

* headless-1 / mongoDB

https://github.com/kuc-arc-f/headless-1

***
Data (API comluns) , users, chats , chat_posts

### users
* name
* email
* password

### chats:
* name : text
* content : text
* user_id : text

### chat_posts:
* chat_id : text
* user_id : text
* title : text
* body : text
***
### Related:

***

