
# Настройка авторизации LDAP


# Настройка сервера

https://computingforgeeks.com/install-and-configure-openldap-server-ubuntu/

`sudo apt -y install slapd ldap-utils`

Для повторной настройки сервера: `sudo dpkg-reconfigure slapd`

## Настройка клиента

https://computingforgeeks.com/how-to-configure-ubuntu-as-ldap-client/

`sudo apt -y install libnss-ldap libpam-ldap ldap-utils`

Для повторной настройки клиента: `sudo dpkg-reconfigure ldap-auth-config`

## ssh keys

https://openssh-ldap-pubkey.readthedocs.io/en/latest/openldap.html

Добавить аттрибут
```
curl -o openssh-lpk.ldif https://openssh-ldap-pubkey.readthedocs.io/en/latest/_downloads/484070d0b1da0579a2bc2dda709186fd/openssh-lpk.ldif.txt
sudo ldapadd -H ldapi:/// -Y EXTERNAL -f openssh-lpk.ldif
```

Создать файл /opt/bin/ldapauth.sh

```
#!/bin/bash
uid=$1
baseDN=ou=people,dc=iconicompany,dc=com
ldapsearch -x -b $baseDN -s sub "(&(objectclass=posixAccount)(uid=$uid))" | sed -n '/^ /{H;d};/sshPublicKey:/x;$g;s/\n *//g;s/sshPublicKey: //gp'
```

/etc/ssh/sshd_config.d/ldapauth.conf:

```
AuthorizedKeysCommand /opt/bin/ldapauth.sh
AuthorizedKeysCommandUser root
```

В конце:

`sudo service sshd restart`