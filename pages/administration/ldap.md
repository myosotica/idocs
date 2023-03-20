
# Настройка авторизации LDAP


# Настройка сервера

https://computingforgeeks.com/install-and-configure-openldap-server-ubuntu/

`sudo apt -y install slapd ldap-utils`

Для повторной настройки сервера: `sudo dpkg-reconfigure slapd`

## Настройка клиента

https://computingforgeeks.com/how-to-configure-ubuntu-as-ldap-client/

`sudo apt -y install libnss-ldap libpam-ldap ldap-utils`

Для повторной настройки клиента: `sudo dpkg-reconfigure ldap-auth-config`
