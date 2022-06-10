**Instructions:**

Setup SQL:
```
sql_start
mysql --host=127.0.0.1 < vent.sql
mysql --host=127.0.0.1
```
Grant Permissions:
```
GRANT ALL ON vent.* TO ''@'localhost';
```
Setup Express:
```
npm install
npm start
```
