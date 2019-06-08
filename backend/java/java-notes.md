# Use java8 because it is free!
## You can install java8 using homebrew

download java8 brew
brew cask install adoptopenjdk/openjdk/adoptopenjdk8

https://stackoverflow.com/questions/24342886/how-to-install-java-8-on-mac
install maven brew install maven
https://www.code2bits.com/how-to-install-maven-on-macos-using-homebrew/
mvnmvn
mvn eclipse:clean eclipse:eclipse
f5 refresh
mvn clean install -DskipTests (this is used alot)

download and install eclipse
make sure you are pointing the project to java8

had to use jdk 8

where is eclipse on mac
/Users/philiphowley/eclipse/java-2019-03/Eclipse.app/Contents/Eclipse

where is bin
mvn spring-boot:run
add breakpoints line 125 controller/AccountController
mongod
mongo
mvn spring-boot:run
mvn spring-boot:run
mvn clean install -DskipTests
mvn spring-boot:run


`$ mongo`

```
db.createUser({user:"epsso", pwd:"5jC2tBUnG3", roles:[{role:"userAdmin", db:"epsso_db"}]})
db.createUser({user:"admin", pwd:"password", roles:[{role:"root", db:"admin"}]})
use admin // change to user admin
show databases // to show
db.createUser({user:"admin", pwd:"password", roles:[{role:"root", db:"admin"}]})
db.createUser({user:"epsso", pwd:"5jC2tBUnG3", roles:[{role:"userAdmin", db:"epsso_db"}]})
use epsso_db
db.initial.insert({ column: "value" })
```

mongo studio 3t (mongod to run `$ mongo` to connect)
export URI(add this inside mongodb) - `mongodb://epsso@localhost:27017/epsso_db?connectTimeoutMS=10000&authSource=admin&authMechanism=SCRAM-SHA-1&3t.uriVersion=3&3t.connection.name=epsso&3t.databases=epsso_db`

## studio3T interface
`Server:` name epsso
`standard connection`
`members:` localhost:27017
Read Preference Primary
authentication username and password

Removing Java 8 JDK from Mac
https://www.azul.com/downloads/zulu/
Download OpenJDK Java Linux Windows macOS Alpine Java 11 Java 8
https://studio3t.com/download-thank-you/?OS=osx&email=howley.phil%40gmail.com&form=ok#gf_28

## View homer running
http://localhost:8080/sync-users
