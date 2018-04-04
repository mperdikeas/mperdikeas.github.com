KEYSTORE_FILE=mperdikeas-jboss-server.jks
PASSWORD=changeit

all: clean create-public-private-key-pair show-certificate show-public-key
create-public-private-key-pair:
	keytool -genkeypair -alias testkey \
                            -keyalg RSA \
                            -keysize 2048 \
                            -dname "CN=mperdikeas-jboss-server, OU=mperdikeas-laptop, O=mperdikeas, L=planet Earth, ST=N/A, C=N/A" \
                            -keypass changeit \
                            -validity 10000 \
                            -storetype JKS \
                            -keystore $(KEYSTORE_FILE) \
                            -storepass $(PASSWORD)

show-certificate:
	keytool -list -v -alias testkey -storetype JKS -keystore $(KEYSTORE_FILE) -storepass $(PASSWORD)

show-public-key:
	keytool -list -rfc -keystore $(KEYSTORE_FILE) -alias testkey -storepass $(PASSWORD)


clean:
	rm -f $(KEYSTORE_FILE)

